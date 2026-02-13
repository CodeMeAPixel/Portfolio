import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'

/* ─── Config ───────────────────────────────────────────── */

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PORT = Number(process.env.PORT || 3000)
const HOST = process.env.HOST || '0.0.0.0'
const CLIENT_DIR = join(__dirname, 'dist', 'client')
const PUBLIC_DIR = join(__dirname, 'public')
const NODE_ENV = process.env.NODE_ENV || 'production'
const LOG_LEVEL = process.env.LOG_LEVEL || (NODE_ENV === 'production' ? 'info' : 'debug')

/* ─── Logger ───────────────────────────────────────────── */

const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 }
const currentLevel = LOG_LEVELS[LOG_LEVEL] ?? LOG_LEVELS.info

const COLORS = {
  reset: '\x1b[0m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
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

/* ─── Status color helper ──────────────────────────────── */

function statusColor(code) {
  if (code < 300) return COLORS.green
  if (code < 400) return COLORS.cyan
  if (code < 500) return COLORS.yellow
  return COLORS.red
}

/* ─── MIME Types ───────────────────────────────────────── */

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.wasm': 'application/wasm',
}

/* ─── MIME Sniffing ────────────────────────────────────── */

function sniffImageMime(buffer, fallback) {
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) return 'image/jpeg'
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) return 'image/png'
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) return 'image/gif'
  if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
      buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) return 'image/webp'
  return fallback
}

/* ─── Static File Server ──────────────────────────────── */

async function tryServeStatic(pathname, res, reqId) {
  for (const dir of [CLIENT_DIR, PUBLIC_DIR]) {
    const filePath = join(dir, pathname)
    if (!filePath.startsWith(dir)) {
      log.warn(`[${reqId}] Directory traversal blocked: ${pathname}`)
      continue
    }
    try {
      const s = await stat(filePath)
      if (!s.isFile()) continue
      const ext = extname(filePath)
      let mime = MIME_TYPES[ext] || 'application/octet-stream'
      const data = await readFile(filePath)
      if (mime.startsWith('image/') && data.length >= 12) {
        const sniffed = sniffImageMime(data, mime)
        if (sniffed !== mime) {
          log.debug(`[${reqId}] MIME sniff corrected ${pathname}: ${mime} → ${sniffed}`)
        }
        mime = sniffed
      }
      const headers = { 'Content-Type': mime, 'Content-Length': data.length }
      if (pathname.startsWith('/assets/')) {
        headers['Cache-Control'] = 'public, max-age=31536000, immutable'
      }
      res.writeHead(200, headers)
      res.end(data)
      log.debug(`[${reqId}] Static ${pathname} (${mime}, ${formatBytes(data.length)})`)
      return true
    } catch { /* file not found in this dir, try next */ }
  }
  return false
}

/* ─── Utilities ────────────────────────────────────────── */

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

/* ─── Sentry Helper ────────────────────────────────────── */

let Sentry = null
async function loadSentry() {
  try {
    Sentry = await import('@sentry/tanstackstart-react')
    if (Sentry?.isInitialized?.()) {
      log.info('Sentry is active and initialized')
    } else {
      log.debug('Sentry module loaded but not initialized (DSN may be missing)')
      Sentry = null
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
    Sentry.withScope((scope) => {
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

  // Validate build output exists
  const serverEntry = join(__dirname, 'dist', 'server', 'server.js')
  if (!existsSync(serverEntry)) {
    log.error(`Build output not found: ${serverEntry}`)
    log.error('Run "bun run build" before starting the server.')
    process.exit(1)
  }
  if (!existsSync(CLIENT_DIR)) {
    log.warn(`Client directory not found: ${CLIENT_DIR}`)
  }

  // Load Sentry for error capturing
  await loadSentry()

  // Import the TanStack app handler
  log.debug('Loading TanStack server handler...')
  const { default: app } = await import('./dist/server/server.js')
  log.debug('TanStack server handler loaded')

  const server = createServer(async (req, res) => {
    const reqId = nextRequestId()
    const start = performance.now()
    const url = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`)

    // Serve static files first
    if (req.method === 'GET' || req.method === 'HEAD') {
      const served = await tryServeStatic(url.pathname, res, reqId)
      if (served) {
        const duration = performance.now() - start
        log.info(
          `[${reqId}] ${COLORS.dim}${req.method}${COLORS.reset} ${url.pathname} ` +
          `${statusColor(200)}200${COLORS.reset} ${COLORS.dim}${formatDuration(duration)}${COLORS.reset} ${COLORS.dim}(static)${COLORS.reset}`
        )
        return
      }
    }

    try {
      // Collect body for non-GET/HEAD
      let body = null
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        body = Buffer.concat(chunks)
        log.debug(`[${reqId}] Request body: ${formatBytes(body.length)}`)
      }

      const headers = new Headers()
      for (const [key, val] of Object.entries(req.headers)) {
        if (val) headers.set(key, Array.isArray(val) ? val.join(', ') : val)
      }

      const response = await app.fetch(
        new Request(url.href, { method: req.method, headers, body }),
      )

      // Write status + headers
      const resHeaders = {}
      response.headers.forEach((v, k) => { resHeaders[k] = v })
      res.writeHead(response.status, resHeaders)

      // Stream the body
      let responseSize = 0
      if (response.body) {
        const reader = response.body.getReader()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          responseSize += value.byteLength
          res.write(value)
        }
      }
      res.end()

      const duration = performance.now() - start
      const statusClr = statusColor(response.status)
      log.info(
        `[${reqId}] ${COLORS.dim}${req.method}${COLORS.reset} ${url.pathname} ` +
        `${statusClr}${response.status}${COLORS.reset} ${COLORS.dim}${formatDuration(duration)}${COLORS.reset}` +
        (responseSize ? ` ${COLORS.dim}${formatBytes(responseSize)}${COLORS.reset}` : '')
      )

      // Log client/server errors at higher severity
      if (response.status >= 500) {
        log.error(`[${reqId}] Server error response: ${response.status} ${req.method} ${url.pathname}`)
      } else if (response.status >= 400) {
        log.warn(`[${reqId}] Client error response: ${response.status} ${req.method} ${url.pathname}`)
      }

    } catch (err) {
      const duration = performance.now() - start
      captureError(err, {
        message: `[${reqId}] Unhandled request error: ${req.method} ${url.pathname}`,
        reqId,
        method: req.method,
        url: url.pathname,
        duration: formatDuration(duration),
        userAgent: req.headers['user-agent'],
      })

      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
      }
      res.end('Internal Server Error')

      log.info(
        `[${reqId}] ${COLORS.dim}${req.method}${COLORS.reset} ${url.pathname} ` +
        `${COLORS.red}500${COLORS.reset} ${COLORS.dim}${formatDuration(duration)}${COLORS.reset} ${COLORS.red}(crash)${COLORS.reset}`
      )
    }
  })

  // ─── Graceful Shutdown ────────────────────────────────

  let isShuttingDown = false

  async function shutdown(signal) {
    if (isShuttingDown) return
    isShuttingDown = true
    log.info(`${signal} received — shutting down gracefully...`)

    server.close(() => {
      const uptime = process.uptime()
      log.info(`Server closed after ${formatDuration(uptime * 1000)} uptime (${requestCounter} requests served)`)
      if (Sentry) {
        Sentry.close(2000).then(() => process.exit(0))
      } else {
        process.exit(0)
      }
    })

    // Force exit after 10s
    setTimeout(() => {
      log.warn('Forced exit after shutdown timeout (10s)')
      process.exit(1)
    }, 10_000).unref()
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))

  // ─── Global Error Handlers ────────────────────────────

  process.on('uncaughtException', (err) => {
    captureError(err, { message: 'Uncaught exception', fatal: true })
    process.exit(1)
  })

  process.on('unhandledRejection', (reason) => {
    const err = reason instanceof Error ? reason : new Error(String(reason))
    captureError(err, { message: 'Unhandled promise rejection' })
  })

  // ─── Start Listening ──────────────────────────────────

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
