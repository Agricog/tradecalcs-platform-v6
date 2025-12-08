import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
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
            src: '/android-launchericon-48-48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/android-launchericon-72-72.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: '/android-launchericon-96-96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: '/android-launchericon-144-144.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: '/192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/android-launchericon-192-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/android-launchericon-512-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2,ttf,eot}']
      }
    })
  ]
})



