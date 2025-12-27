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
import BrickCalculatorGardenWall from './pages/calculators/garden-wall'
import BrickCalculatorHouseExtension from './pages/calculators/house-extension'
import BrickCalculatorBoundaryWall from './pages/calculators/boundary-wall'
import BrickCalculatorRetainingWall from './pages/calculators/retaining-wall'
import BrickCalculatorGarage from './pages/calculators/garage'
import BrickCalculatorRaisedBed from './pages/calculators/raised-bed'
import BrickCalculatorBBQ from './pages/calculators/bbq-outdoor-kitchen'
import BrickCalculatorChimney from './pages/calculators/chimney'
import BrickCalculatorPier from './pages/calculators/pier-pillar'
import BrickCalculatorSingleSkin from './pages/calculators/single-skin'
import BrickCalculatorCavity from './pages/calculators/cavity-wall'
import BrickCalculatorDecorative from './pages/calculators/decorative-feature'
import LoftInsulation from './pages/calculators/loft-insulation'
import CavityWallInsulation from './pages/calculators/cavity-wall-insulation'
import SolidWallInternal from './pages/calculators/solid-wall-internal'
import SolidWallExternal from './pages/calculators/solid-wall-external'
import FloorInsulation from './pages/calculators/floor-insulation'
import RoomInRoof from './pages/calculators/room-in-roof'
import FlatRoof from './pages/calculators/flat-roof'
import NewBuildWalls from './pages/calculators/new-build-walls'
import EVChargerCableSizing from './pages/calculators/ev-charger-cable-sizing'
import ElectricShowerCableSizing from './pages/calculators/electric-shower-cable-sizing'
import CookerCircuitCableSizing from './pages/calculators/cooker-circuit-cable-sizing'
import GardenOfficeCableSizing from './pages/calculators/garden-office-cable-sizing'
import HotTubCableSizing from './pages/calculators/hot-tub-cable-sizing'
import ImmersionHeaterCableSizing from './pages/calculators/immersion-heater-cable-sizing'
import SolarPVBatteryCableSizing from './pages/calculators/solar-pv-battery-cable-sizing'
import AirSourceHeatPumpCableSizing from './pages/calculators/air-source-heat-pump-cable-sizing'
import UnderfloorHeatingCableSizing from './pages/calculators/underfloor-heating-cable-sizing'
import GarageWorkshopCableSizing from './pages/calculators/garage-workshop-cable-sizing'
import SaunaCableSizing from './pages/calculators/sauna-cable-sizing'
import AirConditioningCableSizing from './pages/calculators/air-conditioning-cable-sizing'
import SwimmingPoolCableSizing from './pages/calculators/swimming-pool-cable-sizing'
import ElectricGatesCableSizing from './pages/calculators/electric-gates-cable-sizing'
import CCTVSecurityCableSizing from './pages/calculators/cctv-security-cable-sizing'
import AnnexGrannyFlatCableSizing from './pages/calculators/annex-granny-flat-cable-sizing'
import ShedSummerHouseCableSizing from './pages/calculators/shed-summer-house-cable-sizing'
import OutdoorLightingCableSizing from './pages/calculators/outdoor-lighting-cable-sizing'
import ElectricStorageHeaterCableSizing from './pages/calculators/electric-storage-heater-cable-sizing'
import RingMainSocketCircuitCableSizing from './pages/calculators/ring-main-socket-circuit-cable-sizing'
import CommercialKitchenCableSizing from './pages/calculators/commercial-kitchen-cable-sizing'
import ServerRoomCableSizing from './pages/calculators/server-room-cable-sizing'
import CaravanMarinaHookupCableSizing from './pages/calculators/caravan-marina-hookup-cable-sizing'
import FarmAgriculturalCableSizing from './pages/calculators/farm-agricultural-cable-sizing'
import ShopRetailUnitCableSizing from './pages/calculators/shop-retail-unit-cable-sizing'
import GroundSourceHeatPumpCableSizing from './pages/calculators/ground-source-heat-pump-cable-sizing'
import BatteryStorageCableSizing from './pages/calculators/battery-storage-cable-sizing'
import CommercialEVChargingCableSizing from './pages/calculators/commercial-ev-charging-cable-sizing'
import SubmainOutbuildingVoltageDrop from './pages/calculators/submain-outbuilding-voltage-drop'
import EVChargerVoltageDrop from './pages/calculators/ev-charger-voltage-drop'
import GardenLightingVoltageDrop from './pages/calculators/garden-lighting-voltage-drop'
import ShowerCircuitVoltageDrop from './pages/calculators/shower-circuit-voltage-drop'
import CookerCircuitVoltageDrop from './pages/calculators/cooker-circuit-voltage-drop'
import ThreePhaseMotorVoltageDrop from './pages/calculators/voltage-drop/three-phase-motor-voltage-drop'
import SolarPVVoltageDrop from './pages/calculators/voltage-drop/solar-pv-voltage-drop'
import HeatPumpVoltageDrop from './pages/calculators/voltage-drop/heat-pump-voltage-drop'
import MarinaVoltageDrop from './pages/calculators/voltage-drop/marina-voltage-drop'
import CaravanSiteVoltageDrop from './pages/calculators/voltage-drop/caravan-site-voltage-drop'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <HelmetProvider>
      <Router>
       <ScrollToTop />
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
          <Route path="/calculators/brick-calculator/garden-wall" element={<BrickCalculatorGardenWall />} />
          <Route path="/calculators/brick-calculator/house-extension" element={<BrickCalculatorHouseExtension />} />
          <Route path="/calculators/brick-calculator/boundary-wall" element={<BrickCalculatorBoundaryWall />} />
          <Route path="/calculators/brick-calculator/retaining-wall" element={<BrickCalculatorRetainingWall />} />
          <Route path="/calculators/brick-calculator/garage" element={<BrickCalculatorGarage />} />
          <Route path="/calculators/brick-calculator/raised-bed" element={<BrickCalculatorRaisedBed />} />
          <Route path="/calculators/brick-calculator/bbq-outdoor-kitchen" element={<BrickCalculatorBBQ />} />
          <Route path="/calculators/brick-calculator/chimney" element={<BrickCalculatorChimney />} />
          <Route path="/calculators/brick-calculator/pier-pillar" element={<BrickCalculatorPier />} />
          <Route path="/calculators/brick-calculator/single-skin" element={<BrickCalculatorSingleSkin />} />
          <Route path="/calculators/brick-calculator/cavity-wall" element={<BrickCalculatorCavity />} />
          <Route path="/calculators/brick-calculator/decorative-feature" element={<BrickCalculatorDecorative />} />
          <Route path="/calculators/insulation-calculator/loft-insulation" element={<LoftInsulation />} />
          <Route path="/calculators/insulation-calculator/cavity-wall-insulation" element={<CavityWallInsulation />} />
          <Route path="/calculators/insulation-calculator/solid-wall-internal" element={<SolidWallInternal />} />
          <Route path="/calculators/insulation-calculator/solid-wall-external" element={<SolidWallExternal />} />
          <Route path="/calculators/insulation-calculator/floor-insulation" element={<FloorInsulation />} />
          <Route path="/calculators/insulation-calculator/room-in-roof" element={<RoomInRoof />} />
          <Route path="/calculators/insulation-calculator/flat-roof" element={<FlatRoof />} />
          <Route path="/calculators/insulation-calculator/new-build-walls" element={<NewBuildWalls />} />
          <Route path="/calculators/cable-sizing/ev-charger-cable-sizing" element={<EVChargerCableSizing />} />
          <Route path="/calculators/cable-sizing/ev-charger-cable-sizing" element={<EVChargerCableSizing />} />
          <Route path="/calculators/cable-sizing/electric-shower-cable-sizing" element={<ElectricShowerCableSizing />} />
          <Route path="/calculators/cable-sizing/cooker-circuit-cable-sizing" element={<CookerCircuitCableSizing />} />
          <Route path="/calculators/cable-sizing/garden-office-cable-sizing" element={<GardenOfficeCableSizing />} />
          <Route path="/calculators/cable-sizing/hot-tub-cable-sizing" element={<HotTubCableSizing />} />
          <Route path="/calculators/cable-sizing/immersion-heater-cable-sizing" element={<ImmersionHeaterCableSizing />} />
          <Route path="/calculators/cable-sizing/solar-pv-battery-cable-sizing" element={<SolarPVBatteryCableSizing />} />
          <Route path="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" element={<AirSourceHeatPumpCableSizing />} />
          <Route path="/calculators/cable-sizing/underfloor-heating-cable-sizing" element={<UnderfloorHeatingCableSizing />} />
          <Route path="/calculators/cable-sizing/garage-workshop-cable-sizing" element={<GarageWorkshopCableSizing />} />
          <Route path="/calculators/cable-sizing/sauna-cable-sizing" element={<SaunaCableSizing />} />
          <Route path="/calculators/cable-sizing/air-conditioning-cable-sizing" element={<AirConditioningCableSizing />} />
          <Route path="/calculators/cable-sizing/swimming-pool-cable-sizing" element={<SwimmingPoolCableSizing />} />
          <Route path="/calculators/cable-sizing/electric-gates-cable-sizing" element={<ElectricGatesCableSizing />} />
          <Route path="/calculators/cable-sizing/cctv-security-cable-sizing" element={<CCTVSecurityCableSizing />} />
          <Route path="/calculators/cable-sizing/annex-granny-flat-cable-sizing" element={<AnnexGrannyFlatCableSizing />} />
          <Route path="/calculators/cable-sizing/shed-summer-house-cable-sizing" element={<ShedSummerHouseCableSizing />} />
          <Route path="/calculators/cable-sizing/outdoor-lighting-cable-sizing" element={<OutdoorLightingCableSizing />} />
          <Route path="/calculators/cable-sizing/electric-storage-heater-cable-sizing" element={<ElectricStorageHeaterCableSizing />} />
          <Route path="/calculators/cable-sizing/ring-main-socket-circuit-cable-sizing" element={<RingMainSocketCircuitCableSizing />} />
          <Route path="/calculators/cable-sizing/commercial-kitchen-cable-sizing" element={<CommercialKitchenCableSizing />} />
          <Route path="/calculators/cable-sizing/server-room-cable-sizing" element={<ServerRoomCableSizing />} />
          <Route path="/calculators/cable-sizing/caravan-marina-hookup-cable-sizing" element={<CaravanMarinaHookupCableSizing />} />
          <Route path="/calculators/cable-sizing/farm-agricultural-cable-sizing" element={<FarmAgriculturalCableSizing />} />
          <Route path="/calculators/cable-sizing/shop-retail-unit-cable-sizing" element={<ShopRetailUnitCableSizing />} />
          <Route path="/calculators/cable-sizing/ground-source-heat-pump-cable-sizing" element={<GroundSourceHeatPumpCableSizing />} />
          <Route path="/calculators/cable-sizing/battery-storage-cable-sizing" element={<BatteryStorageCableSizing />} />
          <Route path="/calculators/cable-sizing/commercial-ev-charging-cable-sizing" element={<CommercialEVChargingCableSizing />} />
          <Route path="/calculators/voltage-drop/submain-outbuilding" element={<SubmainOutbuildingVoltageDrop />} />
          <Route path="/calculators/voltage-drop/ev-charger" element={<EVChargerVoltageDrop />} />
          <Route path="/calculators/voltage-drop/garden-lighting" element={<GardenLightingVoltageDrop />} />
          <Route path="/calculators/voltage-drop/shower-circuit" element={<ShowerCircuitVoltageDrop />} />
          <Route path="/calculators/voltage-drop/cooker-circuit" element={<CookerCircuitVoltageDrop />} />
          <Route path="/calculators/voltage-drop/three-phase-motor" element={<ThreePhaseMotorVoltageDrop />} />
          <Route path="/calculators/voltage-drop/solar-pv" element={<SolarPVVoltageDrop />} />
          <Route path="/calculators/voltage-drop/heat-pump" element={<HeatPumpVoltageDrop />} />
          <Route path="/calculators/voltage-drop/marina" element={<MarinaVoltageDrop />} />
          <Route path="/calculators/voltage-drop/caravan-site" element={<CaravanSiteVoltageDrop />} />
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







































