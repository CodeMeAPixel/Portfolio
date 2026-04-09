import { createServer } from 'node:http'
import { stat } from 'node:fs/promises'
import { createReadStream, existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pipeline } from 'node:stream/promises'
import { Readable } from 'node:stream'
import { createGzip, createBrotliCompress, constants as zlibConstants } from 'node:zlib'

/* ─── Config ───────────────────────────────────────────── */

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PORT = Number(process.env.PORT || 3000)
const HOST = process.env.HOST || '0.0.0.0'
const CLIENT_DIR = join(__dirname, 'dist', 'client')
const PUBLIC_DIR = join(__dirname, 'public')
const NODE_ENV = process.env.NODE_ENV || 'production'
const LOG_LEVEL = process.env.LOG_LEVEL || (NODE_ENV === 'production' ? 'info' : 'debug')
const MAX_BODY = 4 * 1024 * 1024  // 4 MB request body limit
const HEALTH_PATH = '/_health'

/* ─── Logger ───────────────────────────────────────────── */

const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 }
const currentLevel = LOG_LEVELS[LOG_LEVEL] ?? LOG_LEVELS.info

const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
}

function timestamp() {
  return new Date().toISOString()
}

const log = {
  debug(msg, meta) {
    if (currentLevel > LOG_LEVELS.debug) return
    const line = `${COLORS.gray}${timestamp()} ${COLORS.dim}DBG${COLORS.reset} ${msg}`
    meta ? console.debug(line, meta) : console.debug(line)
  },
  info(msg, meta) {
    if (currentLevel > LOG_LEVELS.info) return
    const line = `${COLORS.gray}${timestamp()} ${COLORS.cyan}INF${COLORS.reset} ${msg}`
    meta ? console.info(line, meta) : console.info(line)
  },
  warn(msg, meta) {
    if (currentLevel > LOG_LEVELS.warn) return
    const line = `${COLORS.gray}${timestamp()} ${COLORS.yellow}WRN${COLORS.reset} ${msg}`
    meta ? console.warn(line, meta) : console.warn(line)
  },
  error(msg, meta) {
    const line = `${COLORS.gray}${timestamp()} ${COLORS.red}ERR${COLORS.reset} ${msg}`
    meta ? console.error(line, meta) : console.error(line)
  },
}

/* ─── Request ID ───────────────────────────────────────── */

let requestCounter = 0
function nextRequestId() {
  return `req-${++requestCounter}`
}

/* ─── Helpers ──────────────────────────────────────────── */

function statusColor(code) {
  if (code < 300) return COLORS.green
  if (code < 400) return COLORS.cyan
  if (code < 500) return COLORS.yellow
  return COLORS.red
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / 1048576).toFixed(1)}MB`
}

function formatDuration(ms) {
  if (ms < 1) return `${(ms * 1000).toFixed(0)}µs`
  if (ms < 1000) return `${ms.toFixed(1)}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

function logRequest(reqId, method, pathname, status, duration, tag) {
  const statusClr = statusColor(status)
  log.info(
    `[${reqId}] ${COLORS.dim}${method}${COLORS.reset} ${pathname} ` +
    `${statusClr}${status}${COLORS.reset} ${COLORS.dim}${formatDuration(duration)}${COLORS.reset}` +
    (tag ? ` ${COLORS.dim}(${tag})${COLORS.reset}` : '')
  )
}

/** True for expected network-level errors not worth reporting to Sentry. */
function isClientDisconnect(err) {
  return (
    err?.code === 'ERR_STREAM_DESTROYED' ||
    err?.code === 'ECONNRESET' ||
    err?.code === 'EPIPE' ||
    err?.code === 'ECONNABORTED'
  )
}

/* ─── MIME Types ───────────────────────────────────────── */

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.wasm': 'application/wasm',
}

/* ─── Compression ──────────────────────────────────────── */

// Response content types worth compressing.
const COMPRESSIBLE = /^(text\/|application\/(javascript|json|xml)|image\/svg\+xml)/

function negotiateEncoding(acceptEncoding) {
  if (!acceptEncoding) return null
  if (acceptEncoding.includes('br')) return 'br'
  if (acceptEncoding.includes('gzip')) return 'gzip'
  return null
}

function makeCompressor(encoding) {
  if (encoding === 'br') {
    return createBrotliCompress({ params: { [zlibConstants.BROTLI_PARAM_QUALITY]: 5 } })
  }
  if (encoding === 'gzip') return createGzip({ level: 6 })
  return null
}

/* ─── Security Headers ─────────────────────────────────── */

// Applied to every SSR response; cannot be overridden by the app.
const SECURITY_HEADERS = {
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'SAMEORIGIN',
  'referrer-policy': 'strict-origin-when-cross-origin',
}

/* ─── Static File Server ──────────────────────────────── */

/**
 * Streams a static file to the response without buffering it in Node memory.
 * Returns the HTTP status code (200 or 304) when served, or 0 when not found.
 */
async function tryServeStatic(pathname, method, req, res, reqId) {
  for (const dir of [CLIENT_DIR, PUBLIC_DIR]) {
    const filePath = join(dir, pathname)

    // Path-traversal guard — join() normalises separators; startsWith rejects escapes.
    if (!filePath.startsWith(dir)) {
      log.warn(`[${reqId}] Directory traversal blocked: ${pathname}`)
      continue
    }

    let s
    try {
      s = await stat(filePath)
      if (!s.isFile()) continue
    } catch {
      continue
    }

    const ext = extname(filePath).toLowerCase()
    const mime = MIME_TYPES[ext] || 'application/octet-stream'
    const isImmutable = pathname.startsWith('/assets/')

    const headers = { 'Content-Type': mime, 'Content-Length': s.size }

    if (isImmutable) {
      // Hashed Vite output — safe to cache forever in the browser.
      headers['Cache-Control'] = 'public, max-age=31536000, immutable'
    } else {
      // Public-dir files — use ETags for efficient conditional requests.
      const etag = `"${s.mtimeMs.toString(36)}-${s.size.toString(36)}"`
      headers['ETag'] = etag
      headers['Last-Modified'] = s.mtime.toUTCString()
      headers['Cache-Control'] = 'public, max-age=0, must-revalidate'

      if (req.headers['if-none-match'] === etag) {
        res.writeHead(304)
        res.end()
        log.debug(`[${reqId}] 304 ${pathname}`)
        return 304
      }
    }

    // HEAD: send headers only — never open the file.
    if (method === 'HEAD') {
      res.writeHead(200, headers)
      res.end()
      return 200
    }

    // GET: stream the file directly to the socket; no full-buffer allocation.
    res.writeHead(200, headers)
    await pipeline(createReadStream(filePath), res)
    log.debug(`[${reqId}] Static ${pathname} (${mime}, ${formatBytes(s.size)})`)
    return 200
  }

  return 0
}

/* ─── Sentry Helper ────────────────────────────────────── */

let Sentry = null

async function loadSentry() {
  try {
    const mod = await import('@sentry/tanstackstart-react')
    // getClient() is the correct Sentry v10 API to check initialisation.
    if (mod?.getClient?.()) {
      Sentry = mod
      log.info('Sentry is active and initialized')
    } else {
      log.debug('Sentry loaded but not initialized (DSN may be missing)')
    }
  } catch {
    log.debug('Sentry SDK not available — error reporting disabled')
  }
}

function captureError(err, context = {}) {
  log.error(context.message || err.message, {
    error: err.message,
    stack: err.stack,
    ...context,
  })
  if (Sentry) {
    Sentry.withScope?.((scope) => {
      for (const [key, value] of Object.entries(context)) {
        scope.setExtra(key, value)
      }
      Sentry.captureException(err)
    })
  }
}

/* ─── Main ─────────────────────────────────────────────── */

async function main() {
  const startTime = performance.now()

  log.info(`Starting server (node ${process.version}, env=${NODE_ENV}, log=${LOG_LEVEL})`)

  // Validate build output before binding a port.
  const serverEntry = join(__dirname, 'dist', 'server', 'server.js')
  if (!existsSync(serverEntry)) {
    log.error(`Build output not found: ${serverEntry}`)
    log.error('Run "bun run build" before starting the server.')
    process.exit(1)
  }
  if (!existsSync(CLIENT_DIR)) {
    log.warn(`Client directory not found: ${CLIENT_DIR}`)
  }

  await loadSentry()

  log.debug('Loading TanStack server handler...')
  const { default: app } = await import('./dist/server/server.js')
  log.debug('TanStack server handler loaded')

  const server = createServer(async (req, res) => {
    const reqId = nextRequestId()
    const start = performance.now()
    const url = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`)
    const { method } = req

    // ── Health check ─────────────────────────────────────────
    // Lightweight probe for Railway / load-balancer liveness checks.
    if (url.pathname === HEALTH_PATH) {
      const body = JSON.stringify({
        status: 'ok',
        uptime: Math.floor(process.uptime()),
        requests: requestCounter,
      })
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
      res.end(body)
      return
    }

    // ── Static files ──────────────────────────────────────────
    if (method === 'GET' || method === 'HEAD') {
      try {
        const status = await tryServeStatic(url.pathname, method, req, res, reqId)
        if (status > 0) {
          logRequest(reqId, method, url.pathname, status, performance.now() - start, 'static')
          return
        }
      } catch (err) {
        if (isClientDisconnect(err)) {
          log.debug(`[${reqId}] Client disconnected (static): ${url.pathname}`)
          return
        }
        captureError(err, { message: `[${reqId}] Static serve error`, reqId, path: url.pathname })
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end('Internal Server Error')
        }
        logRequest(reqId, method, url.pathname, 500, performance.now() - start, 'static-err')
        return
      }
    }

    // ── SSR via TanStack Start ────────────────────────────────
    try {
      // Collect the request body with an enforced size cap.
      let body = null
      if (method !== 'GET' && method !== 'HEAD') {
        const chunks = []
        let received = 0
        for await (const chunk of req) {
          received += chunk.length
          if (received > MAX_BODY) {
            req.destroy()
            res.writeHead(413, { 'Content-Type': 'text/plain' })
            res.end('Payload Too Large')
            log.warn(`[${reqId}] Body exceeded ${formatBytes(MAX_BODY)}: ${method} ${url.pathname}`)
            return
          }
          chunks.push(chunk)
        }
        body = Buffer.concat(chunks)
      }

      // Forward all incoming headers to the app handler.
      const reqHeaders = new Headers()
      for (const [key, val] of Object.entries(req.headers)) {
        if (val) reqHeaders.set(key, Array.isArray(val) ? val.join(', ') : val)
      }

      const response = await app.fetch(
        new Request(url.href, { method, headers: reqHeaders, body }),
      )

      // Negotiate content encoding for compressible response types.
      const contentType = response.headers.get('content-type') || ''
      const canCompress =
        COMPRESSIBLE.test(contentType) &&
        response.status !== 204 &&
        response.body != null
      const encoding = canCompress ? negotiateEncoding(req.headers['accept-encoding']) : null

      // Merge app headers, then enforce security headers on top.
      const resHeaders = {}
      response.headers.forEach((v, k) => { resHeaders[k] = v })
      Object.assign(resHeaders, SECURITY_HEADERS)

      if (encoding) {
        resHeaders['content-encoding'] = encoding
        // Append to an existing Vary header rather than replacing it.
        resHeaders['vary'] = resHeaders['vary']
          ? `${resHeaders['vary']}, Accept-Encoding`
          : 'Accept-Encoding'
        // Compression changes the byte count; drop the declared size.
        delete resHeaders['content-length']
      }

      res.writeHead(response.status, resHeaders)

      if (response.body) {
        const src = Readable.fromWeb(response.body)
        const compressor = makeCompressor(encoding)
        if (compressor) {
          await pipeline(src, compressor, res)
        } else {
          await pipeline(src, res)
        }
      } else {
        res.end()
      }

      const duration = performance.now() - start
      logRequest(reqId, method, url.pathname, response.status, duration, encoding ?? undefined)

      if (response.status >= 500) {
        log.error(`[${reqId}] Server error: ${response.status} ${method} ${url.pathname}`)
      }
    } catch (err) {
      const duration = performance.now() - start

      if (isClientDisconnect(err)) {
        log.debug(`[${reqId}] Client disconnected: ${method} ${url.pathname}`)
        return
      }

      captureError(err, {
        message: `[${reqId}] Unhandled request error: ${method} ${url.pathname}`,
        reqId,
        method,
        url: url.pathname,
        duration: formatDuration(duration),
        userAgent: req.headers['user-agent'],
      })

      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
      }
      res.end('Internal Server Error')
      logRequest(reqId, method, url.pathname, 500, duration, 'crash')
    }
  })

  // ── Server connection timeouts ─────────────────────────────
  // keepAliveTimeout slightly exceeds the common Railway LB idle timeout (60s).
  server.keepAliveTimeout = 65_000
  // headersTimeout must exceed keepAliveTimeout to avoid a race condition.
  server.headersTimeout = 66_000
  // Cap how long Node waits for the full request to arrive.
  server.requestTimeout = 30_000

  // ── Graceful shutdown ──────────────────────────────────────

  let isShuttingDown = false

  async function shutdown(signal) {
    if (isShuttingDown) return
    isShuttingDown = true
    log.info(`${signal} received — shutting down gracefully...`)

    server.close(() => {
      const uptime = process.uptime()
      log.info(
        `Server closed after ${formatDuration(uptime * 1000)} uptime ` +
        `(${requestCounter} requests served)`
      )
      if (Sentry) {
        Sentry.close?.(2000).then(() => process.exit(0))
      } else {
        process.exit(0)
      }
    })

    // Force-exit if graceful close stalls.
    setTimeout(() => {
      log.warn('Forced exit after shutdown timeout (10s)')
      process.exit(1)
    }, 10_000).unref()
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))

  // ── Global error handlers ──────────────────────────────────

  process.on('uncaughtException', (err) => {
    captureError(err, { message: 'Uncaught exception', fatal: true })
    process.exit(1)
  })

  process.on('unhandledRejection', (reason) => {
    const err = reason instanceof Error ? reason : new Error(String(reason))
    captureError(err, { message: 'Unhandled promise rejection' })
  })

  // ── Start listening ────────────────────────────────────────

  server.listen(PORT, HOST, () => {
    const bootTime = performance.now() - startTime
    log.info(`Server running at http://${HOST}:${PORT} (boot: ${formatDuration(bootTime)})`)
    log.info(`Static dirs: client=${CLIENT_DIR}, public=${PUBLIC_DIR}`)
    log.debug(`PID: ${process.pid}, Node: ${process.version}, Platform: ${process.platform}`)
  })
}

main().catch((err) => {
  log.error('Failed to start server', { error: err.message, stack: err.stack })
  process.exit(1)
})
