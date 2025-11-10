import { Sparkles } from 'lucide-react'
export default function VIPBanner() {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center text-sm">
          <Sparkles className="w-4 h-4 mr-2" />
          <span className="font-medium">✨ Get VIP Access to New Tools + We Build Bespoke Web Apps for Your Business Problems ✨</span>
          <Sparkles className="w-4 h-4 ml-2" />
        </div>
      </div>
    </div>
  )
}
