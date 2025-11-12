import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Homepage from './pages/Home'
import CableSizingCalculatorPage from './pages/CableSizingCalculatorPage'
import VoltageDropCalculatorPage from './pages/VoltageDropCalculatorPage'
import BSPThreadIdentifierPage from './pages/BSPThreadIdentifierPage'
import RoofingCalculatorPage from './pages/RoofingCalculatorPage'
import ConcreteToBagsPage from './pages/ConcreteToBagsPage'
import PlastererCalculatorsPage from './pages/PlastererCalculatorsPage'
import JoineryCalculatorPage from './pages/JoineryCalculatorPage'
import BrickBlockCalculatorPage from './pages/BrickBlockCalculatorPage'
import TilerCalculatorPage from './pages/TilerCalculatorPage'
import PainterCalculatorPage from './pages/PainterCalculatorPage'
import LeadFortressPage from './pages/LeadFortressPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'

function App() {
  return (
    <Router>
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-purple-600 font-bold text-xl">TC</span>
            </div>
            <div>
              <h1 className="font-bold text-xl">TradeCalcs</h1>
              <p className="text-xs opacity-75">Professional Trade Calculators</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/leadfortress" className="hover:underline">LeadFortress</Link>
            <a href="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Custom Development
            </a>
          </nav>
        </div>
      </header>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/cable-sizing" element={<CableSizingCalculatorPage />} />
        <Route path="/voltage-drop" element={<VoltageDropCalculatorPage />} />
        <Route path="/bsp-thread" element={<BSPThreadIdentifierPage />} />
        <Route path="/roofing" element={<RoofingCalculatorPage />} />
        <Route path="/concrete" element={<ConcreteToBagsPage />} />
        <Route path="/plasterer" element={<PlastererCalculatorsPage />} />
        <Route path="/joinery" element={<JoineryCalculatorPage />} />
        <Route path="/brick-block" element={<BrickBlockCalculatorPage />} />
        <Route path="/tiling" element={<TilerCalculatorPage />} />
        <Route path="/paint" element={<PainterCalculatorPage />} />
        <Route path="/leadfortress" element={<LeadFortressPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>

      {/* Footer (only shows on calculator pages, Home has its own) */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                TC
              </div>
              <span className="font-bold text-white">TradeCalcs</span>
            </div>
            <p className="text-sm">Professional calculators and tools for UK tradespeople. Built by tradespeople, for tradespeople.</p>
            <p className="text-xs mt-4">© 2025 TradeCalcs. All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><a href="/#calculators" className="hover:text-white">All Calculators</a></li>
              <li><Link to="/leadfortress" className="hover:text-white">LeadFortress</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE" target="_blank" rel="noopener noreferrer" className="hover:text-white">Custom Development</a></li>
              <li><Link to="/leadfortress" className="hover:text-white">Lead Management</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-xs max-w-5xl mx-auto">
          <p>TradeCalcs is committed to providing accurate, BS-compliant calculations for UK tradespeople.</p>
          <p className="mt-2">Built by Tradespeople, for Tradespeople</p>
        </div>
      </footer>
    </Router>
  )
}

export default App





























