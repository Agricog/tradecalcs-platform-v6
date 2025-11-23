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
import CISCalculatorPage from './pages/CISCalculatorPage'
import STGOCalculatorPage from './pages/STGOCalculatorPage'
import ScaffoldCalculatorPage from './pages/ScaffoldCalculatorPage'
import InsulationCalculatorPage from './pages/InsulationCalculatorPage'


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
        
        {/* Cable Sizing - new URL + old redirect */}
        <Route path="/cable-sizing-calculator" element={<CableSizingCalculatorPage />} />
        <Route path="/cable-sizing" element={<CableSizingCalculatorPage />} />
        
        {/* Voltage Drop - new URL + old redirect */}
        <Route path="/voltage-drop-calculator" element={<VoltageDropCalculatorPage />} />
        <Route path="/voltage-drop" element={<VoltageDropCalculatorPage />} />
        
        {/* BSP Thread - new URL + old redirect */}
        <Route path="/bsp-thread-calculator" element={<BSPThreadIdentifierPage />} />
        <Route path="/bsp-thread" element={<BSPThreadIdentifierPage />} />
        
        {/* Roofing Insurance - new URL + old redirect */}
        <Route path="/roofing-insurance-calculator" element={<RoofingCalculatorPage />} />
        <Route path="/roofing" element={<RoofingCalculatorPage />} />
        
        {/* Concrete - new URL + old redirect */}
        <Route path="/concrete-calculator" element={<ConcreteToBagsPage />} />
        <Route path="/concrete" element={<ConcreteToBagsPage />} />
        
        {/* Plasterer - new URL + old redirect */}
        <Route path="/plasterer-calculator" element={<PlastererCalculatorsPage />} />
        <Route path="/plasterer" element={<PlastererCalculatorsPage />} />
        
        {/* Joinery - new URL + old redirect */}
        <Route path="/joinery-calculator" element={<JoineryCalculatorPage />} />
        <Route path="/joinery" element={<JoineryCalculatorPage />} />
        
        {/* Brick Block - new URL + old redirect */}
        <Route path="/brick-block-calculator" element={<BrickBlockCalculatorPage />} />
        <Route path="/brick-block" element={<BrickBlockCalculatorPage />} />
        
        {/* Tiling - new URL + old redirect */}
        <Route path="/tiling-calculator" element={<TilerCalculatorPage />} />
        <Route path="/tiling" element={<TilerCalculatorPage />} />
        
        {/* Paint - new URL + old redirect */}
        <Route path="/paint-calculator" element={<PainterCalculatorPage />} />
        <Route path="/paint" element={<PainterCalculatorPage />} />
        
        <Route path="/calculators/cis-calculator" element={<CISCalculatorPage />} />
        <Route path="/calculators/stgo-calculator" element={<STGOCalculatorPage />} />
        <Route path="/stgo-calculator" element={<STGOCalculatorPage />} />
        <Route path="/calculators/scaffold-calculator" element={<ScaffoldCalculatorPage />} />
        <Route path="/scaffold-calculator" element={<ScaffoldCalculatorPage />} />
        <Route path="/calculators/insulation-calculator" element={<InsulationCalculatorPage />} />
        <Route path="/insulation-calculator" element={<InsulationCalculatorPage />} />
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

        <div className="border-t border-gray-700 pt-8 max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <p className="text-sm mb-2">Need help or have questions?</p>
            <a 
              href="mailto:mick@tradecalcs.co.uk" 
              className="text-purple-400 hover:text-purple-300 transition font-semibold text-sm"
            >
              mick@tradecalcs.co.uk
            </a>
          </div>
          
          <div className="text-center text-xs">
            <p>TradeCalcs is committed to providing accurate, BS-compliant calculations for UK tradespeople.</p>
            <p className="mt-2">Built by Tradespeople, for Tradespeople</p>
          </div>
        </div>
      </footer>
    </Router>
  )
}

export default App


































