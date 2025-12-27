import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Zap, Cable, Gauge, Calculator, ChevronDown, ChevronUp, Building2, Home, Factory, Waves, Sun, Car, Flame } from 'lucide-react'
import { useState } from 'react'

export default function ElectricalCalculators() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What electrical calculations do UK electricians need to perform?',
      a: 'UK electricians regularly calculate voltage drop (BS 7671 Regulation 525), cable sizing for current capacity, earth fault loop impedance (Zs), prospective fault current, and diversity for maximum demand. All calculations must comply with BS 7671:2018+A2:2022 (18th Edition Wiring Regulations).'
    },
    {
      q: 'How do I calculate voltage drop for a circuit?',
      a: 'Use the BS 7671 formula: VD = (mV/A/m × Current × Length) ÷ 1000. The mV/A/m values come from Table 4D1B and already account for both conductors. Limits are 3% for lighting and 5% for power circuits.'
    },
    {
      q: 'What cable size do I need for a 32A circuit?',
      a: 'It depends on installation method and cable length. For short runs in typical conditions, 4mm² handles 32A. For longer runs or where voltage drop is a concern, 6mm² provides better margin. Always verify both current capacity and voltage drop compliance.'
    },
    {
      q: 'Are these calculators compliant with 18th Edition?',
      a: 'Yes, all our electrical calculators use values and methods from BS 7671:2018+A2:2022 including Table 4D1B for voltage drop, current-carrying capacities from Section 4, and compliance limits from Regulation 525.'
    },
    {
      q: 'Can I use these calculators for commercial installations?',
      a: 'Yes, the same BS 7671 regulations apply to domestic and commercial installations. Our calculators cover single-phase and three-phase circuits, with specific tools for commercial lighting, warehouses, server rooms, and industrial motors.'
    },
    {
      q: 'What\'s the difference between cable sizing and voltage drop?',
      a: 'Cable sizing determines the minimum cable size for safe current carrying (thermal limits). Voltage drop checks whether the cable is large enough to deliver adequate voltage to the load. A cable might pass current capacity but fail voltage drop on long runs - both must be satisfied.'
    },
    {
      q: 'Do I need to calculate voltage drop for every circuit?',
      a: 'Best practice is yes, especially for circuits over 10m or with significant load. BS 7671 requires compliance but doesn\'t mandate documentation for every circuit. However, failing an EICR due to excessive voltage drop is costly to remedy after installation.'
    },
    {
      q: 'How accurate are online electrical calculators?',
      a: 'Our calculators use official BS 7671 Table 4D1B values and formulas. Results match manual calculations using the same data. For complex scenarios (multiple cables, high ambient temperature, grouping factors), always verify with full design calculations.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Electrical Calculator UK | Free BS 7671 Calculators | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free electrical calculators for UK electricians. Voltage drop, cable sizing, and BS 7671 compliance tools. Professional calculations for domestic, commercial and industrial installations." 
        />
        <meta name="keywords" content="electrical calculator, electrical calculators UK, BS 7671 calculator, voltage drop calculator, cable sizing calculator, wire size calculator, electrician calculator, electrical design calculator" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Electrical Calculator UK | Free BS 7671 Calculators" />
        <meta property="og:description" content="Free electrical calculators for UK electricians. Voltage drop, cable sizing, BS 7671 compliance. Professional tools for all installation types." />
        <meta property="og:url" content="https://tradecalcs.co.uk/electrical-calculators" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/electrical-calculators-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Electrical Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free BS 7671 electrical calculators. Voltage drop, cable sizing, compliance tools for UK electricians." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/electrical-calculators-og.jpg" />

        <link rel="canonical" href="https://tradecalcs.co.uk/electrical-calculators" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#7c3aed" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Electrical Calculators', 'item': 'https://tradecalcs.co.uk/electrical-calculators' }
                ]
              },
              {
                '@type': 'CollectionPage',
                'name': 'Electrical Calculator UK',
                'description': 'Free electrical calculators for UK electricians including voltage drop, cable sizing, and BS 7671 compliance tools.',
                'url': 'https://tradecalcs.co.uk/electrical-calculators',
                'mainEntity': {
                  '@type': 'ItemList',
                  'itemListElement': [
                    { '@type': 'ListItem', 'position': 1, 'name': 'Voltage Drop Calculator', 'url': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                    { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'url': 'https://tradecalcs.co.uk/cable-sizing-calculator' }
                  ]
                }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': faqs.map(faq => ({
                  '@type': 'Question',
                  'name': faq.q,
                  'acceptedAnswer': { '@type': 'Answer', 'text': faq.a }
                }))
              },
              {
                '@type': 'Organization',
                'name': 'TradeCalcs',
                'url': 'https://tradecalcs.co.uk',
                'logo': 'https://tradecalcs.co.uk/logo.png',
                'contactPoint': { '@type': 'ContactPoint', 'contactType': 'Customer Support', 'email': 'mick@tradecalcs.co.uk' }
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

        {/* HERO */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-12 h-12" />
              <Calculator className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Electrical Calculators UK</h1>
            <p className="text-xl opacity-95 max-w-3xl mx-auto">
              Free BS 7671 compliant calculators for UK electricians. Voltage drop, cable sizing, and circuit design tools for domestic, commercial and industrial installations.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          
          {/* MAIN CALCULATORS */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Gauge className="w-7 h-7 text-purple-600" />
              Core Electrical Calculators
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/voltage-drop-calculator" className="block p-6 bg-white border-2 border-purple-200 rounded-xl hover:shadow-lg hover:border-purple-400 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Voltage Drop Calculator</h3>
                    <p className="text-sm text-gray-500">BS 7671 Regulation 525</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">Calculate voltage drop using Table 4D1B mV/A/m values. Verify 3% lighting and 5% power circuit compliance instantly.</p>
                <p className="text-purple-600 font-semibold text-sm">27 use-case calculators available →</p>
              </Link>

              <Link to="/cable-sizing-calculator" className="block p-6 bg-white border-2 border-purple-200 rounded-xl hover:shadow-lg hover:border-purple-400 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <Cable className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Cable Sizing Calculator</h3>
                    <p className="text-sm text-gray-500">Current Carrying Capacity</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">Size cables for current capacity with installation method, grouping and ambient temperature factors. BS 7671 Section 4 compliant.</p>
                <p className="text-purple-600 font-semibold text-sm">Calculate cable size →</p>
              </Link>
            </div>
          </section>

          {/* DOMESTIC CIRCUITS */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Home className="w-7 h-7 text-green-600" />
              Domestic Circuit Calculators
            </h2>
            <p className="text-gray-600 mb-6">Voltage drop calculators for common household circuits and installations.</p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link to="/calculators/voltage-drop/ring-circuit" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Ring Circuit</h3>
                <p className="text-sm text-gray-600">UK ring main - divide by 4 method</p>
              </Link>

              <Link to="/calculators/voltage-drop/radial-circuit" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Radial Circuit</h3>
                <p className="text-sm text-gray-600">20A and 32A socket circuits</p>
              </Link>

              <Link to="/calculators/voltage-drop/domestic-lighting" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Domestic Lighting</h3>
                <p className="text-sm text-gray-600">Indoor lighting - 3% limit</p>
              </Link>

              <Link to="/calculators/voltage-drop/shower-circuit" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Shower Circuit</h3>
                <p className="text-sm text-gray-600">8.5kW to 10.5kW electric showers</p>
              </Link>

              <Link to="/calculators/voltage-drop/cooker-circuit" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Cooker Circuit</h3>
                <p className="text-sm text-gray-600">Electric ovens, hobs, ranges</p>
              </Link>

              <Link to="/calculators/voltage-drop/immersion-heater" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Immersion Heater</h3>
                <p className="text-sm text-gray-600">3kW hot water circuits</p>
              </Link>

              <Link to="/calculators/voltage-drop/underfloor-heating" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Underfloor Heating</h3>
                <p className="text-sm text-gray-600">Electric UFH mats and cables</p>
              </Link>

              <Link to="/calculators/voltage-drop/garden-lighting" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Garden Lighting</h3>
                <p className="text-sm text-gray-600">Outdoor and landscape lighting</p>
              </Link>
            </div>
          </section>

          {/* OUTBUILDINGS & EV */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Building2 className="w-7 h-7 text-cyan-600" />
              Outbuildings, EV & Renewable Energy
            </h2>
            <p className="text-gray-600 mb-6">Submains, EV charging, solar PV and battery storage calculations.</p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link to="/calculators/voltage-drop/submain-outbuilding" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-cyan-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Submain to Outbuilding</h3>
                <p className="text-sm text-gray-600">Garages, offices, workshops</p>
              </Link>

              <Link to="/calculators/voltage-drop/swa-armoured-cable" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-cyan-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">SWA Armoured Cable</h3>
                <p className="text-sm text-gray-600">Buried and external runs</p>
              </Link>

              <Link to="/calculators/voltage-drop/workshop" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-cyan-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Workshop & Garage</h3>
                <p className="text-sm text-gray-600">Welders, compressors, machinery</p>
              </Link>

              <Link to="/calculators/voltage-drop/annex" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-cyan-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Annex & Granny Flat</h3>
                <p className="text-sm text-gray-600">Separate dwelling supplies</p>
              </Link>

              <Link to="/calculators/voltage-drop/ev-charger" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-green-300 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <Car className="w-4 h-4 text-green-600" />
                  <h3 className="font-bold text-gray-900">EV Charger</h3>
                </div>
                <p className="text-sm text-gray-600">7kW and 22kW charging points</p>
              </Link>

              <Link to="/calculators/voltage-drop/solar-pv" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-amber-300 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-gray-900">Solar PV</h3>
                </div>
                <p className="text-sm text-gray-600">Inverter to consumer unit</p>
              </Link>

              <Link to="/calculators/voltage-drop/battery-storage" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-emerald-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Home Battery Storage</h3>
                <p className="text-sm text-gray-600">Tesla, GivEnergy, hybrid</p>
              </Link>

              <Link to="/calculators/voltage-drop/heat-pump" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-cyan-300 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-cyan-600" />
                  <h3 className="font-bold text-gray-900">Heat Pump</h3>
                </div>
                <p className="text-sm text-gray-600">ASHP & GSHP - MCS compliant</p>
              </Link>
            </div>
          </section>

          {/* COMMERCIAL & INDUSTRIAL */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Factory className="w-7 h-7 text-slate-600" />
              Commercial & Industrial
            </h2>
            <p className="text-gray-600 mb-6">Three-phase, long runs, and heavy industrial applications.</p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link to="/calculators/voltage-drop/three-phase-motor" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Three-Phase Motor</h3>
                <p className="text-sm text-gray-600">0.866 factor, starting current</p>
              </Link>

              <Link to="/calculators/voltage-drop/commercial-lighting" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-yellow-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Commercial Lighting</h3>
                <p className="text-sm text-gray-600">Offices, retail, emergency</p>
              </Link>

              <Link to="/calculators/voltage-drop/warehouse" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-slate-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Warehouse & Industrial</h3>
                <p className="text-sm text-gray-600">Long runs, distribution</p>
              </Link>

              <Link to="/calculators/voltage-drop/server-room" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-indigo-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Server Room / Data Centre</h3>
                <p className="text-sm text-gray-600">UPS, critical power, 2-3%</p>
              </Link>

              <Link to="/calculators/voltage-drop/agricultural" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-lime-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Agricultural & Farm</h3>
                <p className="text-sm text-gray-600">Section 705 requirements</p>
              </Link>

              <Link to="/calculators/voltage-drop/construction-site" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-orange-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Construction Site</h3>
                <p className="text-sm text-gray-600">Section 704, 110V CTE</p>
              </Link>
            </div>
          </section>

          {/* SPECIAL LOCATIONS */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Waves className="w-7 h-7 text-blue-600" />
              Special Locations (BS 7671 Part 7)
            </h2>
            <p className="text-gray-600 mb-6">Locations with additional requirements under BS 7671 Section 700+.</p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link to="/calculators/voltage-drop/swimming-pool" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-sky-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Swimming Pool</h3>
                <p className="text-sm text-gray-600">Section 702 - zones, SELV</p>
              </Link>

              <Link to="/calculators/voltage-drop/hot-tub" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-violet-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Hot Tub & Spa</h3>
                <p className="text-sm text-gray-600">Outdoor dedicated circuits</p>
              </Link>

              <Link to="/calculators/voltage-drop/marina" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Marina Shore Power</h3>
                <p className="text-sm text-gray-600">Section 709 - 3% limit</p>
              </Link>

              <Link to="/calculators/voltage-drop/caravan-site" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-green-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Caravan & Camping</h3>
                <p className="text-sm text-gray-600">Section 708 pitch supplies</p>
              </Link>
            </div>
          </section>

          {/* LOW VOLTAGE / DC */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Zap className="w-7 h-7 text-sky-600" />
              Low Voltage & DC Systems
            </h2>
            <p className="text-gray-600 mb-6">12V systems for caravans, boats, solar and garden applications.</p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link to="/calculators/voltage-drop/12v-dc-systems" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-sky-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">12V DC Systems</h3>
                <p className="text-sm text-gray-600">Caravans, boats, solar, garden</p>
              </Link>
            </div>
          </section>

          {/* WHY USE THESE CALCULATORS */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use BS 7671 Electrical Calculators?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-green-900 mb-2">✓ Pass EICR First Time</h3>
                <p className="text-sm text-green-800">Verify compliance during design, not after installation. Avoid costly remedial work and failed certifications.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-blue-900 mb-2">✓ 18th Edition Compliant</h3>
                <p className="text-sm text-blue-800">All calculators use BS 7671:2018+A2:2022 values and methods. Table 4D1B mV/A/m data included.</p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-purple-900 mb-2">✓ Mobile Friendly</h3>
                <p className="text-sm text-purple-800">Use on-site from your phone. Quick calculations between jobs without carrying reference books.</p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <h3 className="font-bold text-amber-900 mb-2">✓ Professional Documentation</h3>
                <p className="text-sm text-amber-800">Show your working to inspectors and clients. Generate quotes directly from calculation results.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-700">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT FORM */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a Custom Electrical Calculator?</h3>
              <p className="text-gray-700">
                Looking for a specific calculation tool we don't have? We build bespoke calculators for contractors, merchants and training providers.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ElectricalCalculatorsHub" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Electrical Calculator Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>

          {/* CTA FOOTER */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Start Calculating</h2>
            <p className="mb-6 opacity-95">Choose a calculator above or start with our most popular tool:</p>
            <Link to="/voltage-drop-calculator" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 inline-block">
              Open Voltage Drop Calculator
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
