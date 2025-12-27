import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Lightbulb } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'commercial-lighting',
  title: 'Commercial Lighting Voltage Drop Calculator',
  metaTitle: 'Commercial Lighting Voltage Drop Calculator UK | 3% Limit | Emergency Lighting | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for commercial lighting installations. BS 7671 3% limit for lighting circuits. Office, retail, warehouse and emergency lighting cable sizing.',
  heroDescription: 'Calculate voltage drop for commercial lighting with the stricter 3% BS 7671 limit',
  
  defaults: {
    cableSize: '2.5',
    length: '40',
    current: '10',
    circuitType: 'lighting' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'Commercial lighting circuits have STRICTER 3% voltage drop limit (not 5%)',
    'LED drivers are sensitive to voltage - excessive drop causes flickering or failure',
    'Emergency lighting circuits must maintain voltage under all conditions',
    'Large installations often use three-phase distribution with single-phase final circuits',
    'Lighting control systems (DALI, DMX) may have additional wiring requirements'
  ],

  symptomChecks: [
    { symptom: 'Office lighting circuit - 20 LED fittings (25m)', recommendation: '6A with 1.5mm² (29 mV/A/m). At 25m: (29 × 6 × 25) ÷ 1000 = 4.35V (1.89%) ✓' },
    { symptom: 'Retail high bay - 15 fittings (40m)', recommendation: '10A with 2.5mm² (18 mV/A/m). At 40m: (18 × 10 × 40) ÷ 1000 = 7.20V (3.13%) ⚠ borderline' },
    { symptom: 'Warehouse lighting - long run (60m)', recommendation: '16A with 4mm² (11 mV/A/m). At 60m: (11 × 16 × 60) ÷ 1000 = 10.56V (4.59%) ✗ exceeds 3%' },
    { symptom: 'Emergency lighting circuit (50m)', recommendation: '3A with 1.5mm² (29 mV/A/m). At 50m: (29 × 3 × 50) ÷ 1000 = 4.35V (1.89%) ✓' },
    { symptom: 'Car park lighting - external (80m)', recommendation: '10A with 4mm² (11 mV/A/m). At 80m: (11 × 10 × 80) ÷ 1000 = 8.80V (3.83%) ✗ use 6mm²' }
  ],

  costEstimates: [
    { scenario: 'Small office lighting circuit', material: '£150-300', labour: '£200-400', total: '£350-700' },
    { scenario: 'Retail unit complete rewire', material: '£2000-5000', labour: '£3000-6000', total: '£5000-11000' },
    { scenario: 'Warehouse lighting installation', material: '£5000-15000', labour: '£4000-10000', total: '£9000-25000' },
    { scenario: 'Emergency lighting system', material: '£1500-4000', labour: '£1500-3500', total: '£3000-7500' },
    { scenario: 'Lighting control system (DALI)', material: '£3000-8000', labour: '£2000-5000', total: '£5000-13000' }
  ],

  defined: {
    term: 'Why Lighting Has a 3% Voltage Drop Limit',
    definition: 'BS 7671 Regulation 525.1 specifies maximum 3% voltage drop for lighting circuits versus 5% for power circuits. This stricter limit exists because lighting is sensitive to voltage variation - incandescent lamps dim noticeably, fluorescent tubes may fail to strike, and LED drivers can malfunction or flicker. The 3% limit ensures consistent light output across the installation.'
  },

  defined2: {
    term: 'LED Driver Voltage Sensitivity',
    definition: 'Modern LED luminaires contain electronic drivers that regulate current to the LEDs. These drivers have specific input voltage ranges (typically 220-240V). Excessive voltage drop can cause: visible flicker, reduced light output, driver overheating, premature failure, and inconsistent dimming. Quality LED fittings tolerate wider voltage ranges, but staying within 3% drop ensures reliable operation.'
  },

  defined3: {
    term: 'Emergency Lighting Requirements',
    definition: 'Emergency lighting must operate when normal supply fails. BS 5266 and BS EN 50172 specify requirements. Self-contained units have integral batteries; central battery systems need dedicated circuits with careful voltage drop calculation. Emergency circuits should have margin below the 3% limit as batteries provide lower voltage during discharge. Fire-rated cables (FP200) are required for central systems.'
  },

  defined4: {
    term: 'Three-Phase Lighting Distribution',
    definition: 'Large commercial buildings often use three-phase distribution boards with single-phase final circuits balanced across phases. This reduces main cable sizes and losses. Voltage drop calculation applies to each single-phase circuit from its distribution board. Three-phase luminaires (rare) would use the 0.866 factor. Balance loads evenly to prevent neutral overload.'
  },

  faqs: [
    {
      q: 'Why is the voltage drop limit 3% for lighting instead of 5%?',
      a: 'Lighting is more sensitive to voltage variation than power equipment. At reduced voltage, lamps dim noticeably, fluorescent tubes may not start reliably, and LED drivers can malfunction. The 3% limit ensures consistent illumination throughout the building.'
    },
    {
      q: 'How do I calculate lighting circuit current?',
      a: 'Add the wattage of all fittings on the circuit, then divide by 230V. For example, 20 × 30W LED panels = 600W ÷ 230V = 2.6A. Allow margin for inrush current - LED drivers can draw 2-3× running current at switch-on.'
    },
    {
      q: 'Do LED lights have inrush current issues?',
      a: 'Yes. LED driver capacitors cause high inrush current at switch-on, typically 20-100A per fitting for a few milliseconds. This can trip MCBs rated for the running current. Use Type C MCBs or limit fittings per circuit (typically 10-15 LEDs per 10A Type B MCB).'
    },
    {
      q: 'What cable size for a 50m lighting circuit?',
      a: 'Depends on current. For 6A at 50m with 3% limit (6.9V max): using 1.5mm² gives (29 × 6 × 50) ÷ 1000 = 8.7V (3.78%) ✗. Need 2.5mm²: (18 × 6 × 50) ÷ 1000 = 5.4V (2.35%) ✓'
    },
    {
      q: 'Should emergency lighting be on a separate circuit?',
      a: 'Yes. Emergency lighting requires its own circuit(s) from a dedicated MCB. For central battery systems, use fire-resistant cable (FP200 or equivalent). Self-contained units can be on normal lighting circuits but must have permanent live feed to charging circuit.'
    },
    {
      q: 'What is DALI and does it affect cable sizing?',
      a: 'DALI (Digital Addressable Lighting Interface) is a control protocol using dedicated two-core cable alongside power cables. DALI control wiring has different requirements (max 300m loop length, any topology). Power cable sizing follows normal BS 7671 rules.'
    },
    {
      q: 'How do I handle voltage drop for external lighting?',
      a: 'External lighting often has longer cable runs. Calculate voltage drop carefully and upsize cables as needed. SWA cable is typically required. Consider separate distribution boards closer to external areas to reduce final circuit lengths.'
    },
    {
      q: 'What about three-phase LED drivers?',
      a: 'Three-phase LED drivers are uncommon in commercial lighting. Most installations use single-phase luminaires balanced across three phases at the distribution board. If you do have three-phase fittings, apply the 0.866 factor to voltage drop calculation.'
    },
    {
      q: 'Can voltage drop cause LED flicker?',
      a: 'Yes. Poor quality LED drivers or drivers operating outside their input voltage range can produce visible flicker. This is more likely at the end of long circuits with marginal voltage drop. Staying well within the 3% limit prevents this.'
    },
    {
      q: 'What about lighting circuits in warehouses with high ceilings?',
      a: 'High bay installations need cable running up to and across ceiling level - this adds significant length. A 10m high warehouse with 50m horizontal run needs 60m+ cable. Calculate voltage drop for total route length, not just horizontal distance.'
    },
    {
      q: 'Do lighting controls need special consideration?',
      a: 'Lighting controls (PIR sensors, daylight linking, scene setting) are typically low current and don\'t affect power cable sizing. Control wiring (DALI, DMX, 0-10V) has its own requirements. Ensure control gear has adequate voltage at end of circuit.'
    },
    {
      q: 'How does power factor affect lighting calculations?',
      a: 'LED drivers typically have power factor of 0.9 or better (requirement for most commercial fittings). The mV/A/m values assume resistive loads - LED power factor slightly increases actual voltage drop. For critical installations, add 10% margin.'
    }
  ]
}

export default function CommercialLightingVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="commercial lighting voltage drop, LED lighting cable size, 3% voltage drop limit, emergency lighting circuit, office lighting installation, retail lighting, warehouse high bay, DALI lighting" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/commercial-lighting-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/commercial-lighting-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#eab308" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Commercial Lighting', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Commercial Lighting Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '312' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': usecaseData.faqs.map(faq => ({
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
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-yellow-600 hover:text-yellow-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Lightbulb className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-amber-100 border-2 border-amber-500 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-amber-900">⚠️ STRICTER 3% VOLTAGE DROP LIMIT APPLIES</p>
                <p className="text-sm text-amber-800">BS 7671 requires maximum 3% voltage drop for lighting circuits. Calculator below is set to "Lighting Circuit" mode which applies the 3% limit.</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Commercial Lighting Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-yellow-900">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg mb-8">
            <VoltageDropCalculatorCore
              defaultCableSize={usecaseData.defaults.cableSize}
              defaultLength={usecaseData.defaults.length}
              defaultCurrent={usecaseData.defaults.current}
              defaultCircuitType={usecaseData.defaults.circuitType}
              defaultPhase={usecaseData.defaults.phase}
            />
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need a Commercial Electrician?</h3>
                <p className="text-purple-100">Get quotes from contractors experienced in commercial lighting</p>
              </div>
              <a 
                href="#get-quotes" 
                className="bg-white text-purple-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 text-center whitespace-nowrap"
              >
                Get Free Quotes
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Commercial Lighting Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-900 mb-3">Related Commercial Calculations</h3>
            <p className="text-sm text-yellow-800 mb-4">
              For <Link to="/calculators/voltage-drop/warehouse" className="text-yellow-600 font-semibold hover:underline">warehouse and industrial lighting</Link> with very long runs. Need three-phase distribution? See our <Link to="/calculators/voltage-drop/three-phase-motor" className="text-yellow-600 font-semibold hover:underline">three-phase calculator</Link>. Use our <Link to="/cable-sizing-calculator" className="text-yellow-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity checks.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-yellow-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Commercial Lighting Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for commercial lighting installations.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-yellow-50 border-b">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Installation Scenario</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Materials</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Labour</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {usecaseData.costEstimates.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-gray-800">{row.scenario}</td>
                      <td className="px-4 py-3 text-gray-600">{row.material}</td>
                      <td className="px-4 py-3 text-gray-600">{row.labour}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Commercial installations vary significantly by specification.</p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-amber-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-amber-800">{usecaseData.defined2.definition}</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-red-800">{usecaseData.defined3.definition}</p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-orange-800">{usecaseData.defined4.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {usecaseData.faqs.map((faq, i) => (
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
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Electrical Calculators</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-yellow-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-yellow-700">Size cables for lighting circuit capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-amber-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-amber-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Commercial Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your commercial lighting project? Tell us about your project and we'll connect you with experienced contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=CommercialLightingVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Commercial Lighting Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-yellow-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-yellow-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
