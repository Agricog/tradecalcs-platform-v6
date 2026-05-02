#!/usr/bin/env node
/**
 * TradeCalcs prerender script.
 *
 * Visits every public route in headless Chromium, waits for React +
 * react-helmet-async to populate the document head, then writes a real
 * per-route HTML file under dist/ so Google's first crawl pass sees the
 * proper title, meta description and JSON-LD without needing JavaScript.
 *
 * Browser: @sparticuz/chromium ships a self-contained Chromium binary
 * built for serverless/container environments.
 */

import chromium from '@sparticuz/chromium'
import puppeteer from 'puppeteer-core'
import http from 'node:http'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createReadStream, statSync } from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST_DIR = path.resolve(__dirname, '..', 'dist')

const ROUTES = [
  '/',
  '/electrical-calculators',
  '/cable-sizing-calculators',
  '/house-rewire-cost-uk',
  '/leadfortress',
  '/privacy-policy',
  '/terms-of-service',
  '/cookie-policy',
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
  '/calculators/cis-calculator',
  '/calculators/stgo-calculator',
  '/calculators/scaffold-calculator',
  '/calculators/insulation-calculator',
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
  '/calculators/insulation-calculator/loft-insulation',
  '/calculators/insulation-calculator/cavity-wall-insulation',
  '/calculators/insulation-calculator/solid-wall-internal',
  '/calculators/insulation-calculator/solid-wall-external',
  '/calculators/insulation-calculator/floor-insulation',
  '/calculators/insulation-calculator/room-in-roof',
  '/calculators/insulation-calculator/flat-roof',
  '/calculators/insulation-calculator/new-build-walls',
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
  '/calculators/voltage-drop/submain-outbuilding',
  '/calculators/voltage-drop/ev-charger',
  '/calculators/voltage-drop/garden-lighting',
  '/calculators/voltage-drop/shower-circuit',
  '/calculators/voltage-drop/cooker-circuit',
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
        try { stat = statSync(filePath) } catch { stat = null }
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

async function main() {
  console.log(`\n🔧 Prerendering ${ROUTES.length} routes from ${DIST_DIR}\n`)

  try {
    await fs.access(path.join(DIST_DIR, 'index.html'))
  } catch {
    console.error(`❌ ${DIST_DIR}/index.html not found. Run "vite build" first.`)
    process.exit(1)
  }

  const { server, port } = await startServer(DIST_DIR)
  const baseUrl = `http://127.0.0.1:${port}`

  let browser
  const failures = []
  const emptyRoutes = []
  let successCount = 0

  try {
    const executablePath = await chromium.executablePath()

    browser = await puppeteer.launch({
      args: [
        ...chromium.args,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ],
      defaultViewport: { width: 1280, height: 800 },
      executablePath,
      headless: chromium.headless
    })

    const page = await browser.newPage()
    await page.setUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    )
    await page.setBypassCSP(true)

    await page.setRequestInterception(true)
    page.on('request', (req) => {
      const url = req.url()
      if (
        url.includes('googletagmanager.com') ||
        url.includes('google-analytics.com') ||
        url.includes('app.smartsuite.com') ||
        url.includes('clerk.accounts.dev')
      ) {
        return req.abort()
      }
      req.continue()
    })

    // Capture page console errors and uncaught exceptions for diagnosis
    const pageErrors = []
    page.on('pageerror', (err) => {
      pageErrors.push(`PAGEERROR: ${err.message}`)
    })
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        pageErrors.push(`CONSOLE: ${msg.text()}`)
      }
    })

    for (const route of ROUTES) {
      const url = `${baseUrl}${route}`
      const label = route.padEnd(60, ' ')

      pageErrors.length = 0

      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 })

        // Wait for React Helmet to populate document head with a
        // page-specific title (anything that's not the index.html default).
        let helmetFired = true
        try {
          await page.waitForFunction(
            () => {
              const t = document.title || ''
              return t.length > 0 && t !== 'TradeCalcs - Free Trade Calculators'
            },
            { timeout: 15_000 }
          )
        } catch {
          helmetFired = false
        }

        // Also check that <div id="root"> is non-empty (React mounted).
        const rootHasContent = await page.evaluate(() => {
          const root = document.getElementById('root')
          return !!(root && root.innerHTML.trim().length > 0)
        })

        // Homepage legitimately uses the default title — accept it as long
        // as React mounted content into #root.
        const isHomepage = route === '/'
        const ok = isHomepage ? rootHasContent : (helmetFired && rootHasContent)

        if (!ok) {
          emptyRoutes.push({
            route,
            helmetFired,
            rootHasContent,
            errors: [...pageErrors]
          })
          process.stdout.write(`✗  ${label}  (helmet=${helmetFired} root=${rootHasContent} errs=${pageErrors.length})\n`)
          if (pageErrors.length > 0) {
            for (const e of pageErrors.slice(0, 3)) {
              process.stdout.write(`     ${e}\n`)
            }
          }
          continue
        }

        const html = await page.content()

        const cleanHtml = html
          .replace(/<script id="vite-plugin-pwa:register-sw"[^>]*><\/script>/g, '')
          .replace(
            /<\/head>/,
            `<meta name="x-prerendered-at" content="${new Date().toISOString()}" /></head>`
          )

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

  // Write full diagnostic report to dist/ so we can read it via HTTP
  // after deploy (Railway's log UI truncates long output).
  const report = {
    timestamp: new Date().toISOString(),
    total: ROUTES.length,
    succeeded: successCount,
    emptyCount: emptyRoutes.length,
    failedCount: failures.length,
    emptyRoutes: emptyRoutes.map(r => ({
      route: r.route,
      helmetFired: r.helmetFired,
      rootHasContent: r.rootHasContent,
      errors: r.errors
    })),
    failures
  }
  await fs.writeFile(
    path.join(DIST_DIR, '__prerender-report.json'),
    JSON.stringify(report, null, 2),
    'utf-8'
  )
  console.log(`📄 Report written to dist/__prerender-report.json`)

  console.log(`\n📊 Prerendered ${successCount}/${ROUTES.length} routes`)

  if (emptyRoutes.length > 0) {
    console.error(`\n⚠️  ${emptyRoutes.length} route(s) rendered empty (skipped, will fall back to SPA shell):`)
    for (const r of emptyRoutes.slice(0, 5)) {
      console.error(`   ${r.route}  helmet=${r.helmetFired} root=${r.rootHasContent}`)
      for (const e of r.errors.slice(0, 2)) {
        console.error(`     ${e}`)
      }
    }
    if (emptyRoutes.length > 5) {
      console.error(`   … and ${emptyRoutes.length - 5} more`)
    }
  }

  if (failures.length > 0) {
    console.error(`\n❌ ${failures.length} route(s) hard-failed:`)
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
