import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const PORT = Number(process.env.PORT || 3000)
const HOST = process.env.HOST || '0.0.0.0'
const CLIENT_DIR = join(__dirname, 'dist', 'client')
const PUBLIC_DIR = join(__dirname, 'public')

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

// Detect actual image type from file bytes (handles mismatched extensions)
function sniffImageMime(buffer, fallback) {
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) return 'image/jpeg'
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) return 'image/png'
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) return 'image/gif'
  if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
      buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) return 'image/webp'
  return fallback
}

async function tryServeStatic(pathname, res) {
  // Try dist/client first, then public/
  for (const dir of [CLIENT_DIR, PUBLIC_DIR]) {
    const filePath = join(dir, pathname)
    // Prevent directory traversal
    if (!filePath.startsWith(dir)) continue
    try {
      const s = await stat(filePath)
      if (!s.isFile()) continue
      const ext = extname(filePath)
      let mime = MIME_TYPES[ext] || 'application/octet-stream'
      const data = await readFile(filePath)
      // Sniff actual image type to handle mismatched extensions (e.g. JPEG saved as .png)
      if (mime.startsWith('image/') && data.length >= 12) {
        mime = sniffImageMime(data, mime)
      }
      const headers = { 'Content-Type': mime, 'Content-Length': data.length }
      // Cache assets with hashes for 1 year
      if (pathname.startsWith('/assets/')) {
        headers['Cache-Control'] = 'public, max-age=31536000, immutable'
      }
      res.writeHead(200, headers)
      res.end(data)
      return true
    } catch { /* file not found, try next */ }
  }
  return false
}

async function main() {
  const { default: app } = await import('./dist/server/server.js')

  const server = createServer(async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || `${HOST}:${PORT}`}`)

    // Serve static files first
    if (req.method === 'GET' || req.method === 'HEAD') {
      const served = await tryServeStatic(url.pathname, res)
      if (served) return
    }

    try {
      // Collect body for non-GET/HEAD
      let body = null
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        body = Buffer.concat(chunks)
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
      if (response.body) {
        const reader = response.body.getReader()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          res.write(value)
        }
      }
      res.end()
    } catch (err) {
      console.error('Server error:', err)
      if (!res.headersSent) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
      }
      res.end('Internal Server Error')
    }
  })

  server.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`)
  })
}

main().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
