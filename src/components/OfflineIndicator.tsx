import { useEffect, useState } from 'react'
import { Wifi2 } from 'lucide-react'

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-50 to-amber-50 border-b-2 border-yellow-400 px-4 py-3 flex items-center justify-center gap-3 shadow-md">
      <div className="flex items-center gap-2">
        <Wifi2 className="w-5 h-5 text-yellow-600 animate-pulse" />
        <span className="text-sm font-semibold text-yellow-800">
          📴 You're offline – all calculators still work with cached data
        </span>
      </div>
    </div>
  )
}
