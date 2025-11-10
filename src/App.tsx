import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VIPBanner from './components/VIPBanner';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Pricing from './pages/Pricing';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CableCalculator from './components/CableCalculator';
import VoltageDropCalculator from './components/VoltageDropCalculator';
import BSPThreadFinder from './components/BSPThreadFinder';
import RoofingCalculator from './components/RoofingCalculator';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <VIPBanner />
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/tools/cable-calculator" element={<CableCalculator />} />
            <Route path="/tools/voltage-drop" element={<VoltageDropCalculator />} />
            <Route path="/tools/bsp-finder" element={<BSPThreadFinder />} />
            <Route path="/tools/roofing" element={<RoofingCalculator />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
