import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { OfflineIndicator } from './components/OfflineIndicator'
import Footer from './components/Footer'
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
import DrainageCalculatorPage from './pages/DrainageCalculatorPage'


function App() {
  return (
    <HelmetProvider>
      <Router>
        <OfflineIndicator />
        
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
          
          {/* Drainage - new URL + old redirect */}
          <Route path="/drainage-calculator" element={<DrainageCalculatorPage />} />
          <Route path="/drainage" element={<DrainageCalculatorPage />} />
          
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

        {/* Footer */}
        <Footer />
      </Router>
    </HelmetProvider>
  )
}

export default App







































