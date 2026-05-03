#!/usr/bin/env node
/**
 * TradeCalcs prerender script.
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

const BLOCKED_DOMAINS = [
  'googletagmanager',
  'google-analytics',
  'smartsuite',
  'clerk.accounts'
]

// Routes mapped to keywords that MUST appear in document.title for the
// prerender to be considered successful. Keyword is case-insensitive
// and chosen to be distinctive to that page (so the homepage's title
// won't satisfy it). Empty string means "accept any title" (used for
// the homepage and pages that legitimately use the default).
const ROUTES = [
  ['/', ''],
  ['/electrical-calculators', 'electrical calculator'],
  ['/cable-sizing-calculators', 'cable sizing'],
  ['/house-rewire-cost-uk', 'rewire'],
  ['/leadfortress', 'leadfortress'],
  ['/privacy-policy', 'privacy'],
  ['/terms-of-service', 'terms'],
  ['/cookie-policy', 'cookie'],
  ['/cable-sizing-calculator', 'cable sizing'],
  ['/voltage-drop-calculator', 'voltage drop'],
  ['/electrical-load-calculator', 'electrical load'],
  ['/conduit-fill-calculator', 'conduit'],
  ['/radiator-btu-calculator', 'radiator'],
  ['/boiler-sizing-calculator', 'boiler'],
  ['/bsp-thread-calculator', 'bsp'],
  ['/roofing-insurance-calculator', 'roofing'],
  ['/drainage-calculator', 'drainage'],
  ['/concrete-calculator', 'concrete'],
  ['/plasterer-calculator', 'plaster'],
  ['/joinery-calculator', 'joinery'],
  ['/brick-block-calculator', 'brick'],
  ['/tiling-calculator', 'tiling'],
  ['/paint-calculator', 'paint'],
  ['/calculators/cis-calculator', 'cis'],
  ['/calculators/stgo-calculator', 'stgo'],
  ['/calculators/scaffold-calculator', 'scaffold'],
  ['/calculators/insulation-calculator', 'insulation'],
  ['/calculators/brick-calculator/garden-wall', 'garden wall'],
  ['/calculators/brick-calculator/house-extension', 'extension'],
  ['/calculators/brick-calculator/boundary-wall', 'boundary'],
  ['/calculators/brick-calculator/retaining-wall', 'retaining'],
  ['/calculators/brick-calculator/garage', 'garage'],
  ['/calculators/brick-calculator/raised-bed', 'raised bed'],
  ['/calculators/brick-calculator/bbq-outdoor-kitchen', 'bbq'],
  ['/calculators/brick-calculator/chimney', 'chimney'],
  ['/calculators/brick-calculator/pier-pillar', 'pier'],
  ['/calculators/brick-calculator/single-skin', 'single skin'],
  ['/calculators/brick-calculator/cavity-wall', 'cavity'],
  ['/calculators/brick-calculator/decorative-feature', 'decorative'],
  ['/calculators/insulation-calculator/loft-insulation', 'loft'],
  ['/calculators/insulation-calculator/cavity-wall-insulation', 'cavity wall'],
  ['/calculators/insulation-calculator/solid-wall-internal', 'solid wall'],
  ['/calculators/insulation-calculator/solid-wall-external', 'solid wall'],
  ['/calculators/insulation-calculator/floor-insulation', 'floor'],
  ['/calculators/insulation-calculator/room-in-roof', 'room in roof'],
  ['/calculators/insulation-calculator/flat-roof', 'flat roof'],
  ['/calculators/insulation-calculator/new-build-walls', 'new build'],
  ['/calculators/cable-sizing/ev-charger-cable-sizing', 'ev charger'],
  ['/calculators/cable-sizing/electric-shower-cable-sizing', 'shower'],
  ['/calculators/cable-sizing/cooker-circuit-cable-sizing', 'cooker'],
  ['/calculators/cable-sizing/garden-office-cable-sizing', 'garden office'],
  ['/calculators/cable-sizing/hot-tub-cable-sizing', 'hot tub'],
  ['/calculators/cable-sizing/immersion-heater-cable-sizing', 'immersion'],
  ['/calculators/cable-sizing/solar-pv-battery-cable-sizing', 'solar'],
  ['/calculators/cable-sizing/air-source-heat-pump-cable-sizing', 'air source'],
  ['/calculators/cable-sizing/underfloor-heating-cable-sizing', 'underfloor'],
  ['/calculators/cable-sizing/garage-workshop-cable-sizing', 'garage'],
  ['/calculators/cable-sizing/sauna-cable-sizing', 'sauna'],
  ['/calculators/cable-sizing/air-conditioning-cable-sizing', 'air conditioning'],
  ['/calculators/cable-sizing/swimming-pool-cable-sizing', 'swimming pool'],
  ['/calculators/cable-sizing/electric-gates-cable-sizing', 'gate'],
  ['/calculators/cable-sizing/cctv-security-cable-sizing', 'cctv'],
  ['/calculators/cable-sizing/annex-granny-flat-cable-sizing', 'annex'],
  ['/calculators/cable-sizing/shed-summer-house-cable-sizing', 'shed'],
  ['/calculators/cable-sizing/outdoor-lighting-cable-sizing', 'outdoor lighting'],
  ['/calculators/cable-sizing/electric-storage-heater-cable-sizing', 'storage heater'],
  ['/calculators/cable-sizing/ring-main-socket-circuit-cable-sizing', 'ring main'],
  ['/calculators/cable-sizing/commercial-kitchen-cable-sizing', 'commercial kitchen'],
  ['/calculators/cable-sizing/server-room-cable-sizing', 'server'],
  ['/calculators/cable-sizing/caravan-marina-hookup-cable-sizing', 'caravan'],
  ['/calculators/cable-sizing/farm-agricultural-cable-sizing', 'farm'],
  ['/calculators/cable-sizing/shop-retail-unit-cable-sizing', 'retail'],
  ['/calculators/cable-sizing/ground-source-heat-pump-cable-sizing', 'ground source'],
  ['/calculators/cable-sizing/battery-storage-cable-sizing', 'battery'],
  ['/calculators/cable-sizing/commercial-ev-charging-cable-sizing', 'commercial ev'],
  ['/calculators/voltage-drop/submain-outbuilding', 'submain'],
  ['/calculators/voltage-drop/ev-charger', 'ev charger'],
  ['/calculators/voltage-drop/garden-lighting', 'garden lighting'],
  ['/calculators/voltage-drop/shower-circuit', 'shower'],
  ['/calculators/voltage-drop/cooker-circuit', 'cooker'],
  ['/calculators/voltage-drop/three-phase-motor', 'three-phase'],
  ['/calculators/voltage-drop/solar-pv', 'solar'],
  ['/calculators/voltage-drop/heat-pump', 'heat pump'],
  ['/calculators/voltage-drop/marina', 'marina'],
  ['/calculators/voltage-drop/caravan-site', 'caravan'],
  ['/calculators/voltage-drop/commercial-lighting', 'commercial lighting'],
  ['/calculators/voltage-drop/warehouse', 'warehouse'],
  ['/calculators/voltage-drop/server-room', 'server'],
  ['/calculators/voltage-drop/agricultural', 'agricultural'],
  ['/calculators/voltage-drop/swimming-pool', 'swimming pool'],
  ['/calculators/voltage-drop/hot-tub', 'hot tub'],
  ['/calculators/voltage-drop/battery-storage', 'battery'],
  ['/calculators/voltage-drop/workshop', 'workshop'],
  ['/calculators/voltage-drop/annex', 'annex'],
  ['/calculators/voltage-drop/construction-site', 'construction'],
  ['/calculators/voltage-drop/ring-circuit', 'ring circuit'],
  ['/calculators/voltage-drop/radial-circuit', 'radial'],
  ['/calculators/voltage-drop/domestic-lighting', 'lighting circuit'],
  ['/calculators/voltage-drop/immersion-heater', 'immersion'],
  ['/calculators/voltage-drop/12v-dc-systems', '12v'],
  ['/calculators/voltage-drop/swa-armoured-cable', 'swa'],
  ['/calculators/voltage-drop/underfloor-heating', 'underfloor']
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
      if (BLOCKED_DOMAINS.some((d) => url.includes(d))) {
        return req.abort()
      }
      req.continue()
    })

    const pageErrors = []
    page.on('pageerror', (err) => {
      pageErrors.push(`PAGEERROR: ${err.message}`)
    })
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        pageErrors.push(`CONSOLE: ${msg.text()}`)
      }
    })

    for (const [route, requiredKeyword] of ROUTES) {
      const url = `${baseUrl}${route}`
      const label = route.padEnd(60, ' ')

      pageErrors.length = 0

      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30_000 })

        // Wait for the page-specific title to appear. We require the
        // title to contain the route-specific keyword — this prevents
        // capturing the homepage's Helmet title when the sub-page's
        // own Helmet hasn't run yet.
        let titleMatched = true
        let observedTitle = ''
        try {
          await page.waitForFunction(
            (kw) => {
              const t = (document.title || '').toLowerCase()
              if (!kw) {
                // No keyword required — just wait for ANY non-empty
                // title that isn't the raw shell default.
                return t.length > 0 && t !== 'tradecalcs - free trade calculators'
              }
              return t.includes(kw.toLowerCase())
            },
            { timeout: 15_000 },
            requiredKeyword
          )
        } catch {
          titleMatched = false
        }

        observedTitle = await page.evaluate(() => document.title || '')

        const rootHasContent = await page.evaluate(() => {
          const root = document.getElementById('root')
          return !!(root && root.innerHTML.trim().length > 0)
        })

        const ok = titleMatched && rootHasContent

        if (!ok) {
          emptyRoutes.push({
            route,
            requiredKeyword,
            observedTitle,
            titleMatched,
            rootHasContent,
            errors: [...pageErrors]
          })
          process.stdout.write(`x  ${label}  (titleMatched=${titleMatched} root=${rootHasContent} title="${observedTitle.slice(0, 50)}")\n`)
          if (pageErrors.length > 0) {
            for (const e of pageErrors.slice(0, 3)) {
              process.stdout.write(`     ${e}\n`)
            }
          }
          continue
        }

        const html = await page.content()

        // Re-validate against the captured HTML, not just the live page.
        // Catches race conditions where Helmet briefly set the right title
        // but React re-rendered the homepage before the snapshot.
        if (requiredKeyword) {
          const lowerHtml = html.toLowerCase()
          if (!lowerHtml.includes(requiredKeyword.toLowerCase())) {
            emptyRoutes.push({
              route,
              requiredKeyword,
              observedTitle,
              titleMatched: true,
              rootHasContent,
              htmlContainedKeyword: false,
              errors: [...pageErrors]
            })
            process.stdout.write(`x  ${label}  (HTML missing keyword "${requiredKeyword}" — homepage captured)\n`)
            continue
          }
        }

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
        process.stdout.write(`ok ${label}\n`)
      } catch (err) {
        failures.push({ route, error: err.message })
        process.stdout.write(`x  ${label}  (${err.message})\n`)
      }
    }
  } finally {
    if (browser) await browser.close()
    server.close()

    try {
      const report = {
        timestamp: new Date().toISOString(),
        total: ROUTES.length,
        succeeded: successCount,
        emptyCount: emptyRoutes.length,
        failedCount: failures.length,
        emptyRoutes,
        failures
      }
      await fs.writeFile(
        path.join(DIST_DIR, '__prerender-report.json'),
        JSON.stringify(report, null, 2),
        'utf-8'
      )
      console.log(`Report written to dist/__prerender-report.json`)
    } catch (e) {
      console.error(`Failed to write report: ${e.message}`)
    }
  }

  console.log(`\nPrerendered ${successCount}/${ROUTES.length} routes`)

  if (emptyRoutes.length > 0) {
    console.error(`\n${emptyRoutes.length} route(s) rendered empty (skipped, will fall back to SPA shell):`)
    for (const r of emptyRoutes.slice(0, 10)) {
      console.error(`   ${r.route}  expected="${r.requiredKeyword}" observed="${r.observedTitle.slice(0, 60)}"`)
    }
    if (emptyRoutes.length > 10) {
      console.error(`   ... and ${emptyRoutes.length - 10} more`)
    }
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} route(s) hard-failed:`)
    for (const f of failures) {
      console.error(`   ${f.route}: ${f.error}`)
    }
    console.error(`(Continuing build despite failures so report is accessible)`)
  }

  console.log('\nPrerender complete.\n')
}

main().catch((err) => {
  console.error('\nPrerender script crashed:', err)
  process.exit(1)
})
