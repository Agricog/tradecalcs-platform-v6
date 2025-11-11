import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sparkles, Mail } from 'lucide-react'
import Home from './pages/Home'
import CableSizingCalculatorPage from './pages/CableSizingCalculatorPage'
import VoltageDropCalculatorPage from './pages/VoltageDropCalculatorPage'
import BSPThreadIdentifierPage from './pages/BSPThreadIdentifierPage'
import RoofingCalculatorPage from './pages/RoofingCalculatorPage'
import ConcreteToBagsPage from './pages/ConcreteToBagsPage'
import PlastererCalculatorsPage from './pages/PlastererCalculatorsPage'
import JoineryCalculatorPage from './pages/JoineryCalculatorPage'
import BrickBlockCalculatorPage from './pages/BrickBlockCalculatorPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <a 
          href="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE" 
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

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cable-calculator" element={<CableSizingCalculatorPage />} />
            <Route path="/voltage-drop" element={<VoltageDropCalculatorPage />} />
            <Route path="/bsp-thread" element={<BSPThreadIdentifierPage />} />
            <Route path="/roofing-insurance" element={<RoofingCalculatorPage />} />
            <Route path="/concrete-calculator" element={<ConcreteToBagsPage />} />
            <Route path="/plasterer-calculators" element={<PlastererCalculatorsPage />} />
            <Route path="/joinery-calculator" element={<JoineryCalculatorPage />} />
            <Route path="/brick-block-calculator" element={<BrickBlockCalculatorPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>

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
              <div className="flex items-center gap-2 mt-4">
                <Mail className="w-4 h-4" />
                <a href="mailto:mick@tradecalcs.co.uk" className="text-sm hover:text-white">
                  mick@tradecalcs.co.uk
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-white">Home</a></li>
                <li><a href="/#custom" className="hover:text-white">Custom Tools</a></li>
                <li><a href="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/#custom" className="hover:text-white">Custom Development</a></li>
                <li><a href="/#custom" className="hover:text-white">White-Label</a></li>
                <li><a href="/#custom" className="hover:text-white">API Access</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="hover:text-white">Terms of Service</a></li>
                <li><a href="/cookie-policy" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-xs max-w-5xl mx-auto">
            <p>TradeCalcs is committed to providing accurate, BS-compliant calculations for UK tradespeople. Always verify critical calculations with qualified professionals.</p>
            <p className="mt-2">Built by Tradespeople, for Tradespeople</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}


























