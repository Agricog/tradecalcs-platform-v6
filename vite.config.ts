import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import prerender from 'vite-plugin-prerender'

const prerenderRoutes = [
  '/',
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
  '/electrical-calculators',
  '/cable-sizing-calculators',
  '/house-rewire-cost-uk',
  '/leadfortress',
  '/calculators/cis-calculator',
  '/calculators/stgo-calculator',
  '/calculators/scaffold-calculator',
  '/calculators/insulation-calculator',
  // Brick use-cases
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
  // Voltage drop use-cases
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
  '/calculators/voltage-drop/underfloor-heating',
]

export default defineConfig({
  plugins: [
    react(),
    prerender({ routes: prerenderRoutes }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'TradeCalcs - Professional Trade Calculators',
        short_name: 'TradeCalcs',
        description: 'Free professional calculators for UK trades. Works offline on-site.',
        theme_color: '#7c3aed',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/android-launchericon-192-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/android-launchericon-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/android-launchericon-192-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/android-launchericon-512-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2,ttf,eot}']
      }
    })
  ]
})



