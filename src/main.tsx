import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'
import { registerServiceWorker, setupConnectionListener } from './sw-register'

// Register Service Worker for offline support
registerServiceWorker()

// Listen to connection changes
setupConnectionListener((online: boolean) => {
  const status = online ? 'ONLINE' : 'OFFLINE'
  console.log(`📡 Connection status: ${status}`)
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
)

