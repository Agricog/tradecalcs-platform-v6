import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Sparkles, Menu, X } from 'lucide-react'
import { useState } from 'react'

// Pages
import Home from './pages/Home'
import CableCalculator from './pages/CableCalculator'
import VoltageDropCalculator from './pages/VoltageDropCalculator'
import BSPThreadPage from './pages/BSPThreadPage'
import RoofingPage from './pages/RoofingPage'

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <BrowserRouter>
      {/* ANIMATED STRAP LINE - CLICKABLE */}
      <a 
        href="https://app.smartsuite.com/YOUR-FORM-URL" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white py-3 px-4 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
          <Sparkles className="w-4 h-4 flex-shrink-0 animate-spin" />
          <p className="font-semibold text-sm md:text-base">
            ✨ Get VIP Access to New Tools + We Build Bespoke Web Apps for Your Business Problems ✨
          </p>
          <Sparkles className="w-4 h-4 flex-shrink-0 animate-spin" />
        </div>
      </a>

      {/* NAVIGATION */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              TC
            </div>
            <span className="font-bold text-lg text-gray-900">TradeCalcs</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-700 hover:text-gray-900 font-medium">Home</a>
            <a href="/tools" className="text-gray-700 hover:text-gray-900 font-medium">Calculators</a>
            <a href="https://app.smartsuite.com/YOUR-FORM-URL" target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold">
              Contact Us
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 px-4">
            <a href="/" className="block text-gray-700 hover:text-gray-900 font-medium py-2">Home</a>
            <a href="/tools" className="block text-gray-700 hover:text-gray-900 font-medium py-2">Calculators</a>
            <a href="https://app.smartsuite.com/YOUR-FORM-URL" target="_blank" rel="noopener noreferrer" className="block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold mt-2 text-center">
              Contact Us
            </a>
          </div>
        )}
      </nav>

      {/* MAIN CONTENT */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<Home />} />
          <Route path="/tools/cable-calculator" element={<CableCalculator />} />
          <Route path="/tools/voltage-drop" element={<VoltageDropCalculator />} />
          <Route path="/tools/bsp-thread" element={<BSPThreadPage />} />
          <Route path="/tools/roofing" element={<RoofingPage />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                TC
              </div>
              <span className="font-bold text-white">TradeCalcs</span>
            </div>
            <p className="text-sm">Professional calculators and tools for UK tradespeople. Built by traders, for traders.</p>
            <p className="text-xs mt-4">© 2025 TradeCalcs. All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/tools" className="hover:text-white">Tools</a></li>
              <li><a href="https://app.smartsuite.com/YOUR-FORM-URL" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#custom" className="hover:text-white">Custom Development</a></li>
              <li><a href="#custom" className="hover:text-white">White-Label</a></li>
              <li><a href="#custom" className="hover:text-white">API Access</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-xs max-w-5xl mx-auto">
          <p>TradeCalcs is committed to providing accurate, BS-compliant calculations for UK tradespeople. Always verify critical calculations with qualified professionals.</p>
          <p className="mt-2">Built by Tradespeople, for Tradespeople</p>
        </div>
      </footer>
    </BrowserRouter>
  )
}


