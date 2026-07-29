// Production static server for Azure App Service (Linux, Node).
//
// The app is a static Vite build, but App Service expects a Node process listening on $PORT.
// This serves dist/ with SPA fallback and has no npm dependencies, so the deployment package
// is just dist/ + this file + package.json — nothing to install on the server.

import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createGzip } from 'node:zlib'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist')
const PORT = Number(process.env.PORT) || 8080
const INDEX = path.join(ROOT, 'index.html')

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
}

const COMPRESSIBLE = /^(?:text\/|application\/json|image\/svg)/

function contentType(file) {
  return TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream'
}

async function statFile(file) {
  try {
    const s = await stat(file)
    return s.isFile() ? s : null
  } catch {
    return null
  }
}

function send(req, res, file, stats, status = 200) {
  const type = contentType(file)
  const headers = {
    'Content-Type': type,
    'X-Content-Type-Options': 'nosniff',
    // Vite fingerprints everything under /assets/, so those are safe to cache hard.
    'Cache-Control': file.includes(`${path.sep}assets${path.sep}`)
      ? 'public, max-age=31536000, immutable'
      : 'no-cache',
  }

  const acceptsGzip = /\bgzip\b/.test(req.headers['accept-encoding'] || '')
  const compress = acceptsGzip && COMPRESSIBLE.test(type)

  if (compress) {
    headers['Content-Encoding'] = 'gzip'
    headers['Vary'] = 'Accept-Encoding'
  } else {
    headers['Content-Length'] = stats.size
  }

  res.writeHead(status, headers)
  if (req.method === 'HEAD') return res.end()

  const stream = createReadStream(file)
  stream.on('error', () => res.destroy())
  if (compress) stream.pipe(createGzip()).pipe(res)
  else stream.pipe(res)
}

const server = createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' })
    return res.end('Method Not Allowed')
  }

  let pathname
  try {
    pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname)
  } catch {
    res.writeHead(400)
    return res.end('Bad Request')
  }

  if (pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' })
    return res.end('ok')
  }

  const target = path.join(ROOT, pathname)
  // Block traversal outside dist/.
  if (target !== ROOT && !target.startsWith(ROOT + path.sep)) {
    res.writeHead(403)
    return res.end('Forbidden')
  }

  const direct = pathname === '/' ? null : await statFile(target)
  if (direct) return send(req, res, target, direct)

  // A missing asset must 404 rather than fall back to index.html, otherwise a broken
  // script tag returns HTML with a 200 and the failure is much harder to spot.
  if (pathname.startsWith('/assets/') || path.extname(pathname)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    return res.end('Not Found')
  }

  const index = await statFile(INDEX)
  if (!index) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    return res.end('Build output missing: dist/index.html was not deployed.')
  }
  send(req, res, INDEX, index)
})

server.listen(PORT, () => {
  console.log(`RAA Travel Solution Guide listening on port ${PORT}, serving ${ROOT}`)
})

const shutdown = (signal) => () => {
  console.log(`${signal} received, shutting down.`)
  server.close(() => process.exit(0))
}
process.on('SIGTERM', shutdown('SIGTERM'))
process.on('SIGINT', shutdown('SIGINT'))
