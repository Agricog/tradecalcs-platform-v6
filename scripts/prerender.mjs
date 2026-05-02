#!/usr/bin/env node
/**
 * TradeCalcs prerender script.
 *
 * Run after `vite build`. Visits every public route in headless Chrome,
 * waits for React + react-helmet-async to populate the document head,
 * then writes a real per-route HTML file under dist/ so Google's first
 * crawl pass sees the proper title, meta description and JSON-LD without
 * needing to render JavaScript.
 *
 * Architecture:
 *   1. Spin up a tiny static server against ./dist on a free port.
 *   2. Launch headless Chrome (Playwright's bundled Chromium).
 *   3. For each route, navigate, wait for hydration, snapshot the DOM,
 *      strip the runtime <script id="vite-plugin-pwa:register-sw"> hooks
 *      that are not needed for crawl, and save as <route>/index.html.
 *   4. Tear down browser + server. Exit non-zero on any failure.
 *
 * Why a script and not a plugin: zero supply-chain risk from abandoned
 * Vite plugins; full control over wait conditions and HTML scrubbing;
 * trivially debuggable.
 */

import { chromium } from 'playwright-chromium'
import http from 'node:http'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createReadStream, statSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.resolve(__dirname, '..', 'dist')

// ─── Routes to prerender ──────────────────────────────────────────────────
// Public, indexable routes only. Auth-gated routes (Projects, Settings,
// quote/preview, etc.) are intentionally excluded — they should not be
// indexed and prerendering them would either crash the build or capture
// a misleading signed-out state.
const ROUTES = [
  // Top-level pages
  '/',
  '/electrical-calculators',
  '/cable-sizing-calculators',
  '/house-rewire-cost-uk',
  '/leadfortress',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',

  // Main calculators
  '/cable-sizing-calculator',
  '/voltage-drop-calculator',
  '/electrical-load-calculator',
  '/conduit-fill-calculator',
  '/radiator-btu-calculator',
  '/boiler-sizing-calculator',
  '/bsp-thread-calculator',
  '/roofing-insurance-calculator',
  '/drainage-calculator',
  '/concrete-calculator',
  '/plasterer-calculator',
  '/joinery-calculator',
  '/brick-block-calculator',
  '/tiling-calculator',
  '/paint-calculator',

  // /calculators/* main pages
  '/calculators/cis-calculator',
  '/calculators/stgo-calculator',
  '/calculators/scaffold-calculator',
  '/calculators/insulation-calculator',

  // Brick calculator use-cases
  '/calculators/brick-calculator/garden-wall',
  '/calculators/brick-calculator/house-extension',
  '/calculators/brick-calculator/boundary-wall',
  '/calculators/brick-calculator/retaining-wall',
  '/calculators/brick-calculator/garage',
  '/calculators/brick-calculator/raised-bed',
  '/calculators/brick-calculator/bbq-outdoor-kitchen',
  '/calculators/brick-calculator/chimney',
  '/calculators/brick-calculator/pier-pillar',
  '/calculators/brick-calculator/single-skin',
  '/calculators/brick-calculator/cavity-wall',
  '/calculators/brick-calculator/decorative-feature',

  // Insulation use-cases
  '/calculators/insulation-calculator/loft-insulation',
  '/calculators/insulation-calculator/cavity-wall-insulation',
  '/calculators/insulation-calculator/solid-wall-internal',
  '/calculators/insulation-calculator/solid-wall-external',
  '/calculators/insulation-calculator/floor-insulation',
  '/calculators/insulation-calculator/room-in-roof',
  '/calculators/insulation-calculator/flat-roof',
  '/calculators/insulation-calculator/new-build-walls',

  // Cable sizing use-cases
  '/calculators/cable-sizing/ev-charger-cable-sizing',
  '/calculators/cable-sizing/electric-shower-cable-sizing',
  '/calculators/cable-sizing/cooker-circuit-cable-sizing',
  '/calculators/cable-sizing/garden-office-cable-sizing',
  '/calculators/cable-sizing/hot-tub-cable-sizing',
  '/calculators/cable-sizing/immersion-heater-cable-sizing',
  '/calculators/cable-sizing/solar-pv-battery-cable-sizing',
  '/calculators/cable-sizing/air-source-heat-pump-cable-sizing',
  '/calculators/cable-sizing/underfloor-heating-cable-sizing',
  '/calculators/cable-sizing/garage-workshop-cable-sizing',
  '/calculators/cable-sizing/sauna-cable-sizing',
  '/calculators/cable-sizing/air-conditioning-cable-sizing',
  '/calculators/cable-sizing/swimming-pool-cable-sizing',
  '/calculators/cable-sizing/electric-gates-cable-sizing',
  '/calculators/cable-sizing/cctv-security-cable-sizing',
  '/calculators/cable-sizing/annex-granny-flat-cable-sizing',
  '/calculators/cable-sizing/shed-summer-house-cable-sizing',
  '/calculators/cable-sizing/outdoor-lighting-cable-sizing',
  '/calculators/cable-sizing/electric-storage-heater-cable-sizing',
  '/calculators/cable-sizing/ring-main-socket-circuit-cable-sizing',
  '/calculators/cable-sizing/commercial-kitchen-cable-sizing',
  '/calculators/cable-sizing/server-room-cable-sizing',
  '/calculators/cable-sizing/caravan-marina-hookup-cable-sizing',
  '/calculators/cable-sizing/farm-agricultural-cable-sizing',
  '/calculators/cable-sizing/shop-retail-unit-cable-sizing',
  '/calculators/cable-sizing/ground-source-heat-pump-cable-sizing',
  '/calculators/cable-sizing/battery-storage-cable-sizing',
  '/calculators/cable-sizing/commercial-ev-charging-cable-sizing',

  // Voltage drop use-cases — parent URL pattern
  '/calculators/submain-outbuilding-voltage-drop',
  '/calculators/ev-charger-voltage-drop',
  '/calculators/garden-lighting-voltage-drop',
  '/calculators/shower-circuit-voltage-drop',
  '/calculators/cooker-circuit-voltage-drop',

  // Voltage drop use-cases — subdirectory pattern
  '/calculators/voltage-drop/three-phase-motor',
  '/calculators/voltage-drop/solar-pv',
  '/calculators/voltage-drop/heat-pump',
  '/calculators/voltage-drop/marina',
  '/calculators/voltage-drop/caravan-site',
  '/calculators/voltage-drop/commercial-lighting',
  '/calculators/voltage-drop/warehouse',
  '/calculators/voltage-drop/server-room',
  '/calculators/voltage-drop/agricultural',
  '/calculators/voltage-drop/swimming-pool',
  '/calculators/voltage-drop/hot-tub',
  '/calculators/voltage-drop/battery-storage',
  '/calculators/voltage-drop/workshop',
  '/calculators/voltage-drop/annex',
  '/calculators/voltage-drop/construction-site',
  '/calculators/voltage-drop/ring-circuit',
  '/calculators/voltage-drop/radial-circuit',
  '/calculators/voltage-drop/domestic-lighting',
  '/calculators/voltage-drop/immersion-heater',
  '/calculators/voltage-drop/12v-dc-systems',
  '/calculators/voltage-drop/swa-armoured-cable',
  '/calculators/voltage-drop/underfloor-heating'
]

// ─── Tiny static server ───────────────────────────────────────────────────
// Serves dist/, falling back to index.html for any unknown path so the
// React Router routes resolve client-side as they would in production.

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json'
}

function startServer(rootDir) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      try {
        const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
        let filePath = path.join(rootDir, urlPath)

        let stat
        try {
          stat = statSync(filePath)
        } catch {
          stat = null
        }

        // Fall back to index.html for SPA routes
        if (!stat || stat.isDirectory()) {
          filePath = path.join(rootDir, 'index.html')
        }

        const ext = path.extname(filePath).toLowerCase()
        res.writeHead(200, { 'Content-Type': MIME[ext] ?? 'application/octet-stream' })
        createReadStream(filePath).pipe(res)
      } catch (err) {
        res.writeHead(500)
        res.end(String(err))
      }
    })

    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address()
      resolve({ server, port })
    })
  })
}

// ─── Main ────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔧 Prerendering ${ROUTES.length} routes from ${DIST_DIR}\n`)

  // Sanity check
  try {
    await fs.access(path.join(DIST_DIR, 'index.html'))
  } catch {
    console.error(`❌ ${DIST_DIR}/index.html not found. Run "vite build" first.`)
    process.exit(1)
  }

  const { server, port } = await startServer(DIST_DIR)
  const baseUrl = `http://127.0.0.1:${port}`

  let browser
  let failures = []
  let successCount = 0

  try {
    browser = await chromium.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const context = await browser.newContext({
      // A real-looking UA. Some build environments behave oddly under the
      // default headless UA string.
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 800 },
      bypassCSP: true
    })

    // Block third-party noise during prerender so it can't slow the build.
    // We don't need analytics, fonts CDN pixels, or smartsuite during a
    // build-time render of our own pages.
    await context.route('**/*', (route) => {
      const url = route.request().url()
      if (
        url.includes('googletagmanager.com') ||
        url.includes('google-analytics.com') ||
        url.includes('app.smartsuite.com') ||
        url.includes('clerk.accounts.dev')
      ) {
        return route.abort()
      }
      return route.continue()
    })

    const page = await context.newPage()

    for (const route of ROUTES) {
      const url = `${baseUrl}${route}`
      const label = route.padEnd(60, ' ')

      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 })

        // Wait for React Helmet to actually populate the document head.
        // We poll for a non-default <title> with a generous timeout.
        await page.waitForFunction(
          () => {
            const t = document.title || ''
            return t.length > 0 && t !== 'TradeCalcs - Free Trade Calculators'
          },
          { timeout: 10_000 }
        ).catch(() => {
          // Homepage and a couple of other routes legitimately keep the
          // default title. Don't fail on this — just note it.
        })

        const html = await page.content()

        // Strip the PWA service-worker registration script from the
        // prerendered HTML. Service workers will still be installed by the
        // main bundle on the client; we don't want to register them at
        // crawl time.
        const cleanHtml = html
          .replace(
            /<script id="vite-plugin-pwa:register-sw"[^>]*><\/script>/g,
            ''
          )
          // Add a generated-at marker for debugging
          .replace(
            /<\/head>/,
            `<meta name="x-prerendered-at" content="${new Date().toISOString()}" /></head>`
          )

        // Resolve target path: /foo/bar  ->  dist/foo/bar/index.html
        // Root /              ->  dist/index.html
        let outPath
        if (route === '/') {
          outPath = path.join(DIST_DIR, 'index.html')
        } else {
          outPath = path.join(DIST_DIR, route, 'index.html')
        }

        await fs.mkdir(path.dirname(outPath), { recursive: true })
        await fs.writeFile(outPath, cleanHtml, 'utf-8')

        successCount++
        process.stdout.write(`✓  ${label}\n`)
      } catch (err) {
        failures.push({ route, error: err.message })
        process.stdout.write(`✗  ${label}  (${err.message})\n`)
      }
    }
  } finally {
    if (browser) await browser.close()
    server.close()
  }

  console.log(`\n📊 Prerendered ${successCount}/${ROUTES.length} routes`)

  if (failures.length > 0) {
    console.error(`\n❌ ${failures.length} route(s) failed:`)
    for (const f of failures) {
      console.error(`   ${f.route}: ${f.error}`)
    }
    process.exit(1)
  }

  console.log('\n✅ Prerender complete.\n')
}

main().catch((err) => {
  console.error('\n❌ Prerender script crashed:', err)
  process.exit(1)
})
