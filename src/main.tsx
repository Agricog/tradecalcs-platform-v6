import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App'
import './index.css'
import { registerServiceWorker, setupConnectionListener } from './sw-register'
import { initializeSentry } from './utils/errorTracking'

// Initialize error tracking
initializeSentry()

// Get Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  console.warn('Missing VITE_CLERK_PUBLISHABLE_KEY - auth will not work')
}

// Register Service Worker for offline support
registerServiceWorker()

// Listen to connection changes
setupConnectionListener((online: boolean) => {
  const status = online ? 'ONLINE' : 'OFFLINE'
  console.log(`📡 Connection status: ${status}`)
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY || ''}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </ClerkProvider>
  </React.StrictMode>
)

