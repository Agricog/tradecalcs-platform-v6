import { Link } from 'react-router-dom'
import { Calculator } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-white p-2 rounded-lg">
                <Calculator className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xl font-bold">TradeCalcs</span>
            </div>
            <p className="text-purple-200 text-sm mb-4">Professional calculation tools built specifically for UK trades. Fast, accurate, and compliant with British Standards.</p>
            <p className="text-purple-300 text-sm">✉️ mick@tradecalcs.co.uk</p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE" target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-purple-200 hover:text-white transition block py-2">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-purple-200 hover:text-white transition block py-2">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-purple-700 mt-8 pt-8 text-center">
          <p className="text-purple-300 text-sm">© 2025 TradeCalcs. All rights reserved.</p>
          <p className="text-purple-400 text-xs mt-2">Built by <a href="https://autaimate.co.uk" target="_blank" rel="noopener noreferrer" className="text-purple-300 hover:text-white underline transition">Autaimate</a></p>
        </div>
      </div>
    </footer>
  )
}


