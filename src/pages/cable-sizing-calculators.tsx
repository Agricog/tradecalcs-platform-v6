import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Cable, Zap, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Home, Building2, Car, Sun, Waves, Factory } from 'lucide-react'

export default function CableSizingCalculators() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openGlossary, setOpenGlossary] = useState<number | null>(null)

  const faqs = [
    {
      q: "How do I calculate cable size for a circuit?",
      a: "Cable sizing follows BS 7671 Appendix 4. First, determine your design current (Ib). Then apply correction factors for ambient temperature (Ca), grouping (Cg), and thermal insulation (Ci). The minimum current-carrying capacity required is It = Ib ÷ (Ca × Cg × Ci). Select a cable from Table 4D1A or 4D2A where Iz ≥ It. Finally, verify voltage drop compliance."
    },
    {
      q: "What size cable do I need for a 32A circuit?",
      a: "For a 32A circuit, you typically need 4mm² or 6mm² cable depending on installation method and cable run length. Clipped direct (Method C), 4mm² T&E is rated at 37A. In conduit or trunking, you may need 6mm². Always check voltage drop for runs over 10m and apply correction factors for your specific installation."
    },
    {
      q: "What's the difference between Ib, In, It, and Iz?",
      a: "Ib is design current (the actual load). In is the protective device rating (MCB/fuse size). It is the minimum cable rating required after applying correction factors. Iz is the actual current-carrying capacity of your chosen cable. The relationship must be: Ib ≤ In ≤ Iz for a compliant installation."
    },
    {
      q: "Which BS 7671 tables do I use for cable sizing?",
      a: "Table 4D1A covers single-core and multicore thermoplastic (PVC) cables including T&E. Table 4D2A covers multicore armoured cables. Table 4E1A covers single-core thermosetting (XLPE) cables. Table 4E2A covers multicore thermosetting cables. Each table lists current ratings by installation method (Reference Methods A, B, C, etc.)."
    },
    {
      q: "What are the BS 7671 installation methods?",
      a: "Reference Method A: enclosed in conduit in thermally insulating wall. Method B: enclosed in conduit on wall or in trunking. Method C: clipped direct to surface. Method D: in underground ducts. Method E: in free air on cable tray. Method F: touching on cable tray. The method affects current-carrying capacity significantly."
    },
    {
      q: "How does ambient temperature affect cable sizing?",
      a: "Higher ambient temperatures reduce cable current-carrying capacity. BS 7671 Table 4B1 provides correction factors (Ca). At 30°C (standard), Ca = 1.0. At 40°C, Ca = 0.87 for PVC cables. At 50°C, Ca = 0.71. Divide your required current by Ca to find the derated capacity needed."
    },
    {
      q: "What is the grouping correction factor (Cg)?",
      a: "When cables are grouped together, they share heat and each cable's capacity is reduced. Table 4C1 provides Cg values. Two circuits touching: Cg = 0.80. Three circuits: Cg = 0.70. Six circuits: Cg = 0.57. Apply Cg when cables run together for more than 500mm."
    },
    {
      q: "When do I apply the thermal insulation factor (Ci)?",
      a: "Apply Ci when cables pass through or are surrounded by thermal insulation. If surrounded for up to 100mm, Ci = 0.89. For 200mm, Ci = 0.81. For 400mm+, Ci = 0.68. If totally surrounded (e.g., in a loft), Ci = 0.5. This is one of the most commonly missed factors."
    },
    {
      q: "What size cable for an electric shower?",
      a: "Electric showers require dedicated circuits: 7.5kW needs 6mm² (33A), 8.5kW needs 6mm² (37A), 9.5kW needs 10mm² (41A), 10.5kW needs 10mm² (46A). Always verify voltage drop for longer runs and consider using 10mm² for future-proofing if replacing an older shower."
    },
    {
      q: "What size cable for an EV charger?",
      a: "A 7kW home charger draws 32A continuously and typically requires 6mm² for runs up to 15m, or 10mm² for longer runs. The continuous load rating means the cable operates at full capacity for hours, so voltage drop and thermal considerations are critical. Many installers specify 10mm² as standard."
    },
    {
      q: "What size cable for a cooker circuit?",
      a: "Most domestic cookers are 10-13kW but use diversity. A 6mm² cable on a 32A MCB suits most cookers with diversity applied. For large range cookers (15kW+) or where cooker and hob are separate circuits, 10mm² on a 45A MCB may be required. Check manufacturer specifications."
    },
    {
      q: "What size cable for a submain to an outbuilding?",
      a: "Submain sizing depends on total load and distance. For a garage/workshop with 32A capacity at 20m, 6mm² SWA is typical. For 40m+, consider 10mm² to manage voltage drop. For a garden office with 63A supply at 30m, 16mm² or 25mm² SWA is common. Always calculate voltage drop."
    },
    {
      q: "How do I check voltage drop for cable sizing?",
      a: "After selecting a cable for current capacity, verify voltage drop using Table 4D1B (mV/A/m values). Formula: VD = (mV/A/m × Ib × L) ÷ 1000. BS 7671 limits: 3% for lighting (6.9V), 5% for power (11.5V). If exceeded, increase cable size to get a lower mV/A/m value."
    },
    {
      q: "What's the difference between T&E and SWA cable?",
      a: "Twin & Earth (T&E) is for internal use only - in walls, ceilings, under floors. Steel Wire Armoured (SWA) has mechanical protection for external, underground, or exposed runs. SWA can be buried directly or surface-mounted outdoors. Use SWA for outbuilding supplies, external circuits, and anywhere cables need physical protection."
    },
    {
      q: "Can I use these calculators for three-phase circuits?",
      a: "Yes, our three-phase calculators apply the √3 factor (1.732) for line voltage and adjust current calculations accordingly. For three-phase motors, we also consider power factor and starting current. Three-phase voltage drop uses 0.866 multiplier. Select the three-phase option in the relevant calculator."
    }
  ]

  const glossary = [
    { term: "Ib (Design Current)", definition: "The actual current the circuit is designed to carry under normal operating conditions. This is your starting point for cable sizing." },
    { term: "In (Nominal Current)", definition: "The rated current of the protective device (MCB, fuse, RCBO). Must be equal to or greater than Ib." },
    { term: "It (Tabulated Current)", definition: "The minimum current-carrying capacity required from the cable after applying all correction factors. It = Ib ÷ (Ca × Cg × Ci)." },
    { term: "Iz (Current-Carrying Capacity)", definition: "The actual current-carrying capacity of the selected cable for the specific installation method. Must be ≥ It." },
    { term: "Ca (Ambient Temperature Factor)", definition: "Correction factor applied when ambient temperature differs from 30°C. Higher temperatures reduce cable capacity." },
    { term: "Cg (Grouping Factor)", definition: "Correction factor applied when multiple cables are grouped together, as they share heat and each has reduced capacity." },
    { term: "Ci (Thermal Insulation Factor)", definition: "Correction factor applied when cables pass through or are surrounded by thermal insulation material." },
    { term: "Reference Method", definition: "BS 7671 installation methods (A, B, C, D, E, F) that define how cables are installed. Each method has different current ratings." },
    { term: "T&E (Twin & Earth)", definition: "Flat thermoplastic cable with two insulated conductors and a bare earth. Standard cable for domestic fixed wiring." },
    { term: "SWA (Steel Wire Armoured)", definition: "Cable with steel wire armour providing mechanical protection. Used for external, underground, and exposed installations." },
    { term: "XLPE (Cross-Linked Polyethylene)", definition: "Thermosetting insulation rated at 90°C. Higher current capacity than PVC (70°C) for the same cable size." },
    { term: "mV/A/m", definition: "Millivolts per amp per metre - the voltage drop value from BS 7671 tables used to calculate total voltage drop." },
    { term: "CPC (Circuit Protective Conductor)", definition: "The earth conductor. In T&E it's the bare copper. In SWA the armour often serves as CPC." },
    { term: "MCB (Miniature Circuit Breaker)", definition: "Overcurrent protective device that trips on overload or short circuit. Common ratings: 6A, 10A, 16A, 20A, 32A, 40A, 50A, 63A." },
    { term: "RCBO", definition: "Combined RCD and MCB in one device. Provides both overcurrent and earth fault protection for individual circuits." },
    { term: "Diversity", definition: "Allowance for the fact that not all loads operate simultaneously at full power. Applied to cookers, socket circuits, etc." },
    { term: "Continuous Load", definition: "A load that operates at full current for 3+ hours (e.g., EV charger, immersion heater). Cables must be sized for sustained operation." },
    { term: "Volt Drop", definition: "The reduction in voltage between the origin and the load due to cable resistance. Expressed as voltage or percentage." },
    { term: "Derating", definition: "Reducing the cable's rated capacity due to installation conditions (temperature, grouping, insulation contact)." },
    { term: "Appendix 4", definition: "The section of BS 7671 containing current-carrying capacity tables, correction factors, and voltage drop data." }
  ]

  return (
    <>
      <Helmet>
        <title>Cable Size Calculator UK | Free BS 7671 Cable Sizing Calculators | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free cable sizing calculators for UK electricians. Calculate cable size using BS 7671 current capacity tables, correction factors, and voltage drop. 29 use-case calculators for showers, cookers, EV chargers, submains, and more." 
        />
        <meta name="keywords" content="cable size calculator, cable sizing calculator, BS 7671 cable sizing, what size cable, current carrying capacity, wire size calculator, cable calculator UK, electrical cable sizing, T&E cable size, SWA cable size" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cable Size Calculator UK | BS 7671 Cable Sizing | TradeCalcs" />
        <meta property="og:description" content="Free cable sizing calculators using BS 7671 current capacity tables. Calculate cable size for any circuit with correction factors and voltage drop verification." />
        <meta property="og:url" content="https://tradecalcs.co.uk/cable-sizing-calculators" />
        <meta property="og:site_name" content="TradeCalcs" />
        <meta property="og:locale" content="en_GB" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cable Size Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free BS 7671 cable sizing calculators. 29 use-case calculators for UK electricians." />

        <link rel="canonical" href="https://tradecalcs.co.uk/cable-sizing-calculators" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tradecalcs.co.uk" },
                  { "@type": "ListItem", "position": 2, "name": "Cable Sizing Calculators", "item": "https://tradecalcs.co.uk/cable-sizing-calculators" }
                ]
              },
              {
                "@type": "CollectionPage",
                "name": "Cable Sizing Calculators UK",
                "description": "Complete collection of BS 7671 compliant cable sizing calculators for UK electricians",
                "url": "https://tradecalcs.co.uk/cable-sizing-calculators",
                "mainEntity": {
                  "@type": "ItemList",
                  "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Electric Shower Cable Sizing", "url": "https://tradecalcs.co.uk/calculators/electric-shower-cable-sizing" },
                    { "@type": "ListItem", "position": 2, "name": "EV Charger Cable Sizing", "url": "https://tradecalcs.co.uk/calculators/ev-charger-cable-sizing" },
                    { "@type": "ListItem", "position": 3, "name": "Cooker Circuit Cable Sizing", "url": "https://tradecalcs.co.uk/calculators/cooker-circuit-cable-sizing" },
                    { "@type": "ListItem", "position": 4, "name": "Immersion Heater Cable Sizing", "url": "https://tradecalcs.co.uk/calculators/immersion-heater-cable-sizing" },
                    { "@type": "ListItem", "position": 5, "name": "Ring Main Cable Sizing", "url": "https://tradecalcs.co.uk/calculators/ring-main-socket-circuit-cable-sizing" },
                    { "@type": "ListItem", "position": 6, "name": "Hot Tub Cable Sizing", "url": "https://tradecalcs.co.uk/calculators/hot-tub-cable-sizing" },
                    { "@type": "ListItem", "position": 7, "name": "Garden Office Cable Sizing", "url": "https://tradecalcs.co.uk/calculators/garden-office-cable-sizing" },
                    { "@type": "ListItem", "position": 8, "name": "Garage Workshop Cable Sizing", "url": "https://tradecalcs.co.uk/calculators/garage-workshop-cable-sizing" },
                    { "@type": "ListItem", "position": 9, "name": "Solar PV Cable Sizing", "url": "https://tradecalcs.co.uk/calculators/solar-pv-battery-cable-sizing" },
                    { "@type": "ListItem", "position": 10, "name": "Heat Pump Cable Sizing", "url": "https://tradecalcs.co.uk/calculators/air-source-heat-pump-cable-sizing" }
                  ]
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": { "@type": "Answer", "text": faq.a }
                }))
              },
              {
                "@type": "WebApplication",
                "name": "Cable Size Calculator UK",
                "description": "Professional BS 7671 cable sizing calculators for UK electricians with current capacity tables, correction factors, and voltage drop verification",
                "url": "https://tradecalcs.co.uk/cable-sizing-calculators",
                "applicationCategory": "Utility",
                "operatingSystem": "Any",
                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "GBP" },
                "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "1923" }
              },
              {
                "@type": "Organization",
                "name": "TradeCalcs",
                "url": "https://tradecalcs.co.uk",
                "logo": "https://tradecalcs.co.uk/logo.png",
                "contactPoint": { "@type": "ContactPoint", "contactType": "Customer Support", "email": "mick@tradecalcs.co.uk" }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        {/* BACK LINK */}
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link to="/" className="text-purple-600 hover:text-purple-800 font-semibold text-sm">
            ← Back to All Calculators
          </Link>
        </div>

        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <Cable className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cable Size Calculator UK</h1>
            <p className="text-xl opacity-95 mb-8 max-w-3xl mx-auto">
              Free BS 7671 cable sizing calculators for UK electricians. Calculate the correct cable size using current capacity tables, correction factors, and voltage drop verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/cable-sizing-calculator" 
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-flex items-center justify-center gap-2"
              >
                <Cable className="w-5 h-5" />
                Main Cable Sizing Calculator
              </Link>
              <Link 
                to="/electrical-calculators" 
                className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-400 transition inline-flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                All Electrical Calculators
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* STATS BAR */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">29</p>
              <p className="text-sm text-gray-600">Use-Case Calculators</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">BS 7671</p>
              <p className="text-sm text-gray-600">18th Edition Compliant</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">100%</p>
              <p className="text-sm text-gray-600">Free to Use</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 text-center">
              <p className="text-3xl font-bold text-blue-600">Mobile</p>
              <p className="text-sm text-gray-600">Ready for Site</p>
            </div>
          </div>

          {/* WHAT IS CABLE SIZING */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Cable Sizing and Why Does It Matter?</h2>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">
                Cable sizing is the process of selecting the correct cross-sectional area (mm²) for an electrical cable to safely carry the required current without overheating, while keeping voltage drop within acceptable limits. In the UK, cable sizing must comply with BS 7671:2018+A2:2022 (IET Wiring Regulations, 18th Edition).
              </p>
              <p className="mb-4">
                Getting cable size wrong has serious consequences. <strong>Undersized cables</strong> overheat, degrade insulation, cause fires, and fail EICR inspections. <strong>Oversized cables</strong> waste money and are harder to terminate. Correct sizing balances safety, compliance, and cost-effectiveness.
              </p>
              <p className="mb-4">
                The sizing process follows BS 7671 Appendix 4: determine design current (Ib), apply correction factors for temperature (Ca), grouping (Cg), and insulation (Ci), then select a cable with sufficient current-carrying capacity (Iz) from the appropriate table. Finally, verify voltage drop compliance.
              </p>
            </div>
          </section>

          {/* WHICH CALCULATOR DO I NEED */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Which Cable Sizing Calculator Do I Need?</h2>
            <p className="text-gray-600 mb-6">Select based on what you're trying to size cable for:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-900 mb-2">💡 "I know the load current"</h3>
                <p className="text-sm text-blue-700 mb-2">Use our main cable sizing calculator with correction factors</p>
                <Link to="/cable-sizing-calculator" className="text-blue-600 font-semibold text-sm hover:underline">→ Cable Sizing Calculator</Link>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-900 mb-2">🚿 "Shower, cooker, or appliance"</h3>
                <p className="text-sm text-green-700 mb-2">Pre-configured calculators with typical values</p>
                <Link to="/calculators/electric-shower-cable-sizing" className="text-green-600 font-semibold text-sm hover:underline">→ Shower Cable Sizing</Link>
              </div>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h3 className="font-bold text-emerald-900 mb-2">🔌 "EV charger installation"</h3>
                <p className="text-sm text-emerald-700 mb-2">7kW/22kW chargers with continuous load rating</p>
                <Link to="/calculators/ev-charger-cable-sizing" className="text-emerald-600 font-semibold text-sm hover:underline">→ EV Charger Cable Sizing</Link>
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-bold text-amber-900 mb-2">🏠 "Submain to outbuilding"</h3>
                <p className="text-sm text-amber-700 mb-2">SWA cable sizing for garages, offices, annexes</p>
                <Link to="/calculators/garden-office-cable-sizing" className="text-amber-600 font-semibold text-sm hover:underline">→ Garden Office Cable Sizing</Link>
              </div>
              
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-bold text-orange-900 mb-2">☀️ "Solar PV or heat pump"</h3>
                <p className="text-sm text-orange-700 mb-2">Renewable energy circuit sizing</p>
                <Link to="/calculators/solar-pv-battery-cable-sizing" className="text-orange-600 font-semibold text-sm hover:underline">→ Solar PV Cable Sizing</Link>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h3 className="font-bold text-purple-900 mb-2">📏 "Check voltage drop"</h3>
                <p className="text-sm text-purple-700 mb-2">Verify cable meets BS 7671 voltage drop limits</p>
                <Link to="/voltage-drop-calculator" className="text-purple-600 font-semibold text-sm hover:underline">→ Voltage Drop Calculator</Link>
              </div>
            </div>
          </section>

          {/* DOMESTIC CIRCUITS */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Home className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Domestic Circuit Cable Sizing</h2>
            </div>
            <p className="text-gray-600 mb-6">Common household circuits with pre-configured typical values:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/calculators/electric-shower-cable-sizing" className="block p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Electric Shower</h3>
                <p className="text-sm text-blue-700">7.5kW to 10.5kW showers</p>
                <p className="text-xs text-gray-500 mt-1">6mm² - 10mm² • 32A - 45A</p>
              </Link>

              <Link to="/calculators/cooker-circuit-cable-sizing" className="block p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Cooker Circuit</h3>
                <p className="text-sm text-orange-700">Ovens, hobs, range cookers</p>
                <p className="text-xs text-gray-500 mt-1">6mm² - 10mm² • 32A - 45A</p>
              </Link>

              <Link to="/calculators/immersion-heater-cable-sizing" className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-red-900 mb-1">Immersion Heater</h3>
                <p className="text-sm text-red-700">3kW hot water cylinders</p>
                <p className="text-xs text-gray-500 mt-1">2.5mm² - 4mm² • 16A - 20A</p>
              </Link>

              <Link to="/calculators/ring-main-socket-circuit-cable-sizing" className="block p-4 bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-violet-900 mb-1">Ring Main Circuit</h3>
                <p className="text-sm text-violet-700">Socket ring final circuits</p>
                <p className="text-xs text-gray-500 mt-1">2.5mm² T&E • 32A</p>
              </Link>

              <Link to="/calculators/electric-storage-heater-cable-sizing" className="block p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-amber-900 mb-1">Storage Heaters</h3>
                <p className="text-sm text-amber-700">Night storage heater circuits</p>
                <p className="text-xs text-gray-500 mt-1">2.5mm² - 4mm² • Off-peak</p>
              </Link>

              <Link to="/calculators/underfloor-heating-cable-sizing" className="block p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Underfloor Heating</h3>
                <p className="text-sm text-orange-700">Electric UFH mats and cables</p>
                <p className="text-xs text-gray-500 mt-1">2.5mm² - 6mm² • Zone sizing</p>
              </Link>

              <Link to="/calculators/outdoor-lighting-cable-sizing" className="block p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-yellow-900 mb-1">Outdoor Lighting</h3>
                <p className="text-sm text-yellow-700">Garden and security lighting</p>
                <p className="text-xs text-gray-500 mt-1">1.5mm² - 2.5mm² • 3% limit</p>
              </Link>

              <Link to="/calculators/air-conditioning-cable-sizing" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Air Conditioning</h3>
                <p className="text-sm text-cyan-700">Split system AC units</p>
                <p className="text-xs text-gray-500 mt-1">2.5mm² - 6mm² • Starting current</p>
              </Link>
            </div>
          </section>

          {/* OUTBUILDINGS */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-8 h-8 text-amber-600" />
              <h2 className="text-2xl font-bold text-gray-900">Outbuildings & Submains</h2>
            </div>
            <p className="text-gray-600 mb-6">SWA cable sizing for external supplies to detached structures:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/calculators/garden-office-cable-sizing" className="block p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-amber-900 mb-1">🏠 Garden Office</h3>
                <p className="text-sm text-amber-700">Home office, studio, cabin</p>
                <p className="text-xs text-gray-500 mt-1">6mm² - 16mm² SWA • 32A - 63A</p>
              </Link>

              <Link to="/calculators/garage-workshop-cable-sizing" className="block p-4 bg-gradient-to-br from-slate-50 to-gray-100 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-900 mb-1">Garage / Workshop</h3>
                <p className="text-sm text-slate-700">Power tools, welders, machinery</p>
                <p className="text-xs text-gray-500 mt-1">6mm² - 16mm² SWA • 32A - 63A</p>
              </Link>

              <Link to="/calculators/shed-summer-house-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">Shed / Summer House</h3>
                <p className="text-sm text-green-700">Light duty supplies</p>
                <p className="text-xs text-gray-500 mt-1">4mm² - 6mm² SWA • 16A - 32A</p>
              </Link>

              <Link to="/calculators/annex-granny-flat-cable-sizing" className="block p-4 bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-pink-900 mb-1">Annex / Granny Flat</h3>
                <p className="text-sm text-pink-700">Separate dwelling supplies</p>
                <p className="text-xs text-gray-500 mt-1">16mm² - 25mm² SWA • 63A - 100A</p>
              </Link>

              <Link to="/calculators/bbq-outdoor-kitchen" className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-red-900 mb-1">BBQ / Outdoor Kitchen</h3>
                <p className="text-sm text-red-700">External cooking areas</p>
                <p className="text-xs text-gray-500 mt-1">6mm² - 10mm² • Weatherproof</p>
              </Link>

              <Link to="/calculators/electric-gates-cable-sizing" className="block p-4 bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-1">Electric Gates</h3>
                <p className="text-sm text-gray-700">Gate motors and intercoms</p>
                <p className="text-xs text-gray-500 mt-1">2.5mm² - 4mm² • Long runs</p>
              </Link>
            </div>
          </section>

          {/* EV & RENEWABLE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Car className="w-8 h-8 text-green-600" />
              <Sun className="w-8 h-8 text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900">EV Charging & Renewables</h2>
            </div>
            <p className="text-gray-600 mb-6">Future-focused installations requiring careful cable selection:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/calculators/ev-charger-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">⚡ EV Charger (Domestic)</h3>
                <p className="text-sm text-green-700">7kW home charging points</p>
                <p className="text-xs text-gray-500 mt-1">6mm² - 10mm² • 32A continuous</p>
              </Link>

              <Link to="/calculators/commercial-ev-charging-cable-sizing" className="block p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-emerald-900 mb-1">EV Charger (Commercial)</h3>
                <p className="text-sm text-emerald-700">22kW three-phase chargers</p>
                <p className="text-xs text-gray-500 mt-1">10mm² - 16mm² • 32A 3-phase</p>
              </Link>

              <Link to="/calculators/solar-pv-battery-cable-sizing" className="block p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-amber-900 mb-1">☀️ Solar PV & Battery</h3>
                <p className="text-sm text-amber-700">Inverter to consumer unit</p>
                <p className="text-xs text-gray-500 mt-1">6mm² - 16mm² • DC & AC sides</p>
              </Link>

              <Link to="/calculators/air-source-heat-pump-cable-sizing" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Air Source Heat Pump</h3>
                <p className="text-sm text-cyan-700">ASHP outdoor units</p>
                <p className="text-xs text-gray-500 mt-1">6mm² - 16mm² • MCS compliant</p>
              </Link>

              <Link to="/calculators/ground-source-heat-pump-cable-sizing" className="block p-4 bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-teal-900 mb-1">Ground Source Heat Pump</h3>
                <p className="text-sm text-teal-700">GSHP installations</p>
                <p className="text-xs text-gray-500 mt-1">10mm² - 25mm² • Higher loads</p>
              </Link>

              <Link to="/calculators/battery-storage-cable-sizing" className="block p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-purple-900 mb-1">Battery Storage</h3>
                <p className="text-sm text-purple-700">Home battery systems</p>
                <p className="text-xs text-gray-500 mt-1">6mm² - 16mm² • Hybrid inverters</p>
              </Link>
            </div>
          </section>

          {/* SPECIAL LOCATIONS */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Waves className="w-8 h-8 text-sky-600" />
              <h2 className="text-2xl font-bold text-gray-900">Special Locations (BS 7671 Part 7)</h2>
            </div>
            <p className="text-gray-600 mb-6">Locations with additional requirements under BS 7671:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/calculators/hot-tub-cable-sizing" className="block p-4 bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-violet-900 mb-1">Hot Tub / Spa</h3>
                <p className="text-sm text-violet-700">Section 702 compliance</p>
                <p className="text-xs text-gray-500 mt-1">6mm² - 10mm² • 32A - 40A</p>
              </Link>

              <Link to="/calculators/swimming-pool-cable-sizing" className="block p-4 bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-sky-900 mb-1">Swimming Pool</h3>
                <p className="text-sm text-sky-700">Pumps, heaters, lighting</p>
                <p className="text-xs text-gray-500 mt-1">Section 702 • Zones apply</p>
              </Link>

              <Link to="/calculators/sauna-cable-sizing" className="block p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Sauna</h3>
                <p className="text-sm text-orange-700">Section 703 compliance</p>
                <p className="text-xs text-gray-500 mt-1">Heat-resistant cable • 6mm² - 10mm²</p>
              </Link>

              <Link to="/calculators/caravan-marina-hookup-cable-sizing" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Caravan / Marina</h3>
                <p className="text-sm text-blue-700">Section 708/709 supplies</p>
                <p className="text-xs text-gray-500 mt-1">Pitch supplies • PME restrictions</p>
              </Link>
            </div>
          </section>

          {/* COMMERCIAL & INDUSTRIAL */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Factory className="w-8 h-8 text-slate-600" />
              <h2 className="text-2xl font-bold text-gray-900">Commercial & Industrial</h2>
            </div>
            <p className="text-gray-600 mb-6">Larger installations and specialist applications:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/calculators/commercial-kitchen-cable-sizing" className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-red-900 mb-1">Commercial Kitchen</h3>
                <p className="text-sm text-red-700">Catering equipment circuits</p>
                <p className="text-xs text-gray-500 mt-1">Three-phase • High loads</p>
              </Link>

              <Link to="/calculators/shop-retail-unit-cable-sizing" className="block p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-purple-900 mb-1">Shop / Retail Unit</h3>
                <p className="text-sm text-purple-700">Retail premises supplies</p>
                <p className="text-xs text-gray-500 mt-1">Distribution boards • Lighting</p>
              </Link>

              <Link to="/calculators/server-room-cable-sizing" className="block p-4 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-indigo-900 mb-1">Server Room</h3>
                <p className="text-sm text-indigo-700">Data centre power</p>
                <p className="text-xs text-gray-500 mt-1">UPS feeds • Redundancy</p>
              </Link>

              <Link to="/calculators/farm-agricultural-cable-sizing" className="block p-4 bg-gradient-to-br from-lime-50 to-green-50 border border-lime-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lime-900 mb-1">Farm / Agricultural</h3>
                <p className="text-sm text-lime-700">Section 705 compliance</p>
                <p className="text-xs text-gray-500 mt-1">Long runs • Harsh environment</p>
              </Link>

              <Link to="/calculators/cctv-security-cable-sizing" className="block p-4 bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-1">CCTV / Security</h3>
                <p className="text-sm text-gray-700">Camera and alarm systems</p>
                <p className="text-xs text-gray-500 mt-1">Low voltage • Long runs</p>
              </Link>
            </div>
          </section>

          {/* BS 7671 CURRENT CAPACITY TABLE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">BS 7671 Table 4D1A - Current-Carrying Capacity</h2>
            <p className="text-sm text-gray-600 mb-4">Single and multicore thermoplastic (PVC) insulated cables, copper conductors at 70°C. Reference Method C (clipped direct) is most common for domestic T&E.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-blue-100 border-b">
                    <th className="px-3 py-2 text-left font-semibold">Cable Size</th>
                    <th className="px-3 py-2 text-left font-semibold">Method A (enclosed)</th>
                    <th className="px-3 py-2 text-left font-semibold">Method B (conduit)</th>
                    <th className="px-3 py-2 text-left font-semibold">Method C (clipped)</th>
                    <th className="px-3 py-2 text-left font-semibold">Typical Use</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-semibold">1.0mm²</td>
                    <td className="px-3 py-2">11A</td>
                    <td className="px-3 py-2">13A</td>
                    <td className="px-3 py-2">15A</td>
                    <td className="px-3 py-2">Lighting (6A MCB)</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-3 py-2 font-semibold">1.5mm²</td>
                    <td className="px-3 py-2">14A</td>
                    <td className="px-3 py-2">17A</td>
                    <td className="px-3 py-2">20A</td>
                    <td className="px-3 py-2">Lighting (10A MCB)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-semibold">2.5mm²</td>
                    <td className="px-3 py-2">18A</td>
                    <td className="px-3 py-2">23A</td>
                    <td className="px-3 py-2">27A</td>
                    <td className="px-3 py-2">Ring final, radial 20A</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-3 py-2 font-semibold">4mm²</td>
                    <td className="px-3 py-2">24A</td>
                    <td className="px-3 py-2">30A</td>
                    <td className="px-3 py-2">37A</td>
                    <td className="px-3 py-2">Immersion, radial 32A</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-semibold">6mm²</td>
                    <td className="px-3 py-2">31A</td>
                    <td className="px-3 py-2">38A</td>
                    <td className="px-3 py-2">47A</td>
                    <td className="px-3 py-2">Cooker, shower, EV</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-3 py-2 font-semibold">10mm²</td>
                    <td className="px-3 py-2">42A</td>
                    <td className="px-3 py-2">52A</td>
                    <td className="px-3 py-2">64A</td>
                    <td className="px-3 py-2">Large shower, small submain</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-3 py-2 font-semibold">16mm²</td>
                    <td className="px-3 py-2">56A</td>
                    <td className="px-3 py-2">69A</td>
                    <td className="px-3 py-2">85A</td>
                    <td className="px-3 py-2">Submain, large loads</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-3 py-2 font-semibold">25mm²</td>
                    <td className="px-3 py-2">73A</td>
                    <td className="px-3 py-2">90A</td>
                    <td className="px-3 py-2">112A</td>
                    <td className="px-3 py-2">Main supply, large submain</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">Source: BS 7671:2018+A2:2022 Table 4D1A. Values shown are for two-core + earth cables (single-phase). Apply correction factors Ca, Cg, Ci as required.</p>
          </section>

          {/* CORRECTION FACTORS */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">BS 7671 Correction Factors Explained</h2>
            <p className="text-gray-600 mb-6">When installation conditions differ from standard (30°C, single circuit, not in insulation), apply these factors:</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              {/* Ca - Ambient Temperature */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-bold text-red-900 mb-2">Ca - Ambient Temperature</h3>
                <p className="text-sm text-red-700 mb-3">Table 4B1 - When ambient exceeds 30°C</p>
                <div className="text-xs space-y-1 text-gray-700">
                  <p>30°C: Ca = 1.00</p>
                  <p>35°C: Ca = 0.94</p>
                  <p>40°C: Ca = 0.87</p>
                  <p>45°C: Ca = 0.79</p>
                  <p>50°C: Ca = 0.71</p>
                </div>
              </div>

              {/* Cg - Grouping */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-bold text-amber-900 mb-2">Cg - Grouping Factor</h3>
                <p className="text-sm text-amber-700 mb-3">Table 4C1 - When cables grouped &gt;500mm</p>
                <div className="text-xs space-y-1 text-gray-700">
                  <p>1 circuit: Cg = 1.00</p>
                  <p>2 circuits: Cg = 0.80</p>
                  <p>3 circuits: Cg = 0.70</p>
                  <p>4 circuits: Cg = 0.65</p>
                  <p>6 circuits: Cg = 0.57</p>
                </div>
              </div>

              {/* Ci - Thermal Insulation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-900 mb-2">Ci - Thermal Insulation</h3>
                <p className="text-sm text-blue-700 mb-3">Reg 523.7 - Cable in/through insulation</p>
                <div className="text-xs space-y-1 text-gray-700">
                  <p>Not touching: Ci = 1.00</p>
                  <p>Up to 100mm: Ci = 0.89</p>
                  <p>Up to 200mm: Ci = 0.81</p>
                  <p>Up to 400mm: Ci = 0.68</p>
                  <p>Totally surrounded: Ci = 0.50</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border-l-4 border-blue-600 p-4 rounded mt-6">
              <p className="text-sm font-mono text-gray-800 mb-2"><strong>Cable Sizing Formula:</strong></p>
              <p className="text-sm font-mono text-gray-700">It = Ib ÷ (Ca × Cg × Ci)</p>
              <p className="text-xs text-gray-600 mt-2">Select a cable from the tables where Iz ≥ It</p>
            </div>
          </section>

          {/* SUCCESS BOX */}
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-green-900 mb-2">✓ Pass Inspections & EICR Every Time</p>
                <p className="text-sm text-green-800">Correct cable sizing during design prevents costly remedial work. Use these calculators to verify your cable selection meets BS 7671 current capacity requirements and voltage drop limits before installation. Document your calculations to prove compliance to inspectors.</p>
              </div>
            </div>
          </div>

          {/* FAQ SECTION */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-4 py-3 text-left font-semibold text-gray-800 flex justify-between items-center hover:bg-gray-50"
                  >
                    {faq.q}
                    {openFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-sm text-gray-700">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* GLOSSARY */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cable Sizing Glossary</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {glossary.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenGlossary(openGlossary === index ? null : index)}
                    className="w-full px-4 py-3 text-left font-semibold text-gray-800 flex justify-between items-center hover:bg-gray-50 text-sm"
                  >
                    {item.term}
                    {openGlossary === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {openGlossary === index && (
                    <div className="px-4 pb-3 text-sm text-gray-700">
                      {item.definition}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* IMPORTANT NOTES */}
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-3">⚡ Important Notes</h3>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li>• All calculations based on BS 7671:2018+A2:2022 (18th Edition with Amendment 2)</li>
                  <li>• Calculators provide guidance only - always verify with a qualified electrician</li>
                  <li>• Apply ALL relevant correction factors for your specific installation</li>
                  <li>• Always verify voltage drop compliance after selecting cable size</li>
                  <li>• Consider future load growth when sizing cables for long-term installations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a Custom Calculator?</h3>
              <p className="text-gray-700">
                Can't find a calculator for your specific application? Let us know what you need and we'll build it.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=CableSizingCalculators" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Contact Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>

          {/* CTA FOOTER */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Complete Your Electrical Design</h2>
            <p className="mb-6 opacity-95">After sizing cables, verify voltage drop and check our other electrical calculators for a compliant installation.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/voltage-drop-calculator" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
                Voltage Drop Calculator
              </Link>
              <Link to="/electrical-calculators" className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-400 inline-block">
                All Electrical Calculators
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
