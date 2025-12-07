/**
 * Service Worker Registration with offline fallback
 * Works with react-router-dom and Vite PWA plugin
 */

export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers not supported in this browser')
    return
  }

  try {
    const registration = await navigator.serviceWorker.register(
      import.meta.env.MODE === 'production' 
        ? '/sw.js' 
        : '/dev-sw.js?dev-sw',
      { scope: '/' }
    )

    console.log('✅ Service Worker registered:', registration)

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing
      if (!newWorker) return

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('📦 New version available. Page will update on next visit.')
          window.dispatchEvent(new CustomEvent('sw-update-available'))
        }
      })
    })

    // Check for updates every 6 hours
    setInterval(() => {
      registration.update().catch(err => console.error('Update check failed:', err))
    }, 6 * 60 * 60 * 1000)

  } catch (error) {
    console.error('❌ Service Worker registration failed:', error)
  }
}

/**
 * Check if device is online
 */
export function isOnline(): boolean {
  return navigator.onLine
}

/**
 * Listen to online/offline status changes
 */
export function setupConnectionListener(
  callback: (online: boolean) => void
): () => void {
  const handleOnline = () => {
    callback(true)
    console.log('🌐 Back online')
  }

  const handleOffline = () => {
    callback(false)
    console.log('📴 Offline mode active')
  }

  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}
