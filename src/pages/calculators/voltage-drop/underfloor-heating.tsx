import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Flame } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'underfloor-heating',
  title: 'Electric Underfloor Heating Voltage Drop Calculator',
  metaTitle: 'Electric Underfloor Heating Voltage Drop Calculator UK | UFH Circuit | BS 7671 | TradeCalcs',
  metaDescription: 'Free electric underfloor heating voltage drop calculator for UK electricians. Calculate cable size for UFH mats and loose wire systems. BS 7671 compliant circuit sizing.',
  heroDescription: 'Calculate voltage drop for electric underfloor heating circuits - mats, loose wire and heating cable systems',
  
  defaults: {
    cableSize: '2.5',
    length: '15',
    current: '10',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'UFH is resistive load - typically 150-200W/m² for primary heating, 100-150W/m² for comfort',
    'Standard bathroom UFH (3-5m²): 450-1000W = 2-4.5A - usually on lighting circuit',
    'Large areas need dedicated circuits - 16A MCB with 2.5mm² common',
    'Heating mats/cables connect via cold tail to thermostat location',
    'All UFH circuits require RCD protection (30mA) per BS 7671'
  ],

  symptomChecks: [
    { symptom: 'Bathroom UFH (600W) - 8m to thermostat', recommendation: '2.6A with 1.5mm² (29 mV/A/m). At 8m: (29 × 2.6 × 8) ÷ 1000 = 0.60V (0.26%) ✓' },
    { symptom: 'Kitchen UFH (1500W) - 12m cable run', recommendation: '6.5A with 2.5mm² (18 mV/A/m). At 12m: (18 × 6.5 × 12) ÷ 1000 = 1.40V (0.61%) ✓' },
    { symptom: 'Large room (3000W) - 20m to CU', recommendation: '13A with 2.5mm² at 20m: (18 × 13 × 20) ÷ 1000 = 4.68V (2.03%) ✓' },
    { symptom: 'Whole floor UFH (5000W) - 15m', recommendation: '21.7A with 4mm² (11 mV/A/m). At 15m: (11 × 21.7 × 15) ÷ 1000 = 3.58V (1.56%) ✓' },
    { symptom: 'Conservatory UFH (2000W) - 25m run', recommendation: '8.7A with 2.5mm² at 25m: (18 × 8.7 × 25) ÷ 1000 = 3.92V (1.70%) ✓' }
  ],

  costEstimates: [
    { scenario: 'Bathroom UFH circuit (<10m)', material: '£60-120', labour: '£120-220', total: '£180-340' },
    { scenario: 'Kitchen/utility UFH circuit', material: '£80-160', labour: '£150-280', total: '£230-440' },
    { scenario: 'Multi-zone UFH system', material: '£200-400', labour: '£350-600', total: '£550-1000' },
    { scenario: 'UFH thermostat installation', material: '£80-200', labour: '£80-150', total: '£160-350' },
    { scenario: 'Smart UFH controller setup', material: '£150-350', labour: '£100-200', total: '£250-550' }
  ],

  defined: {
    term: 'Electric UFH Power Requirements',
    definition: 'Electric underfloor heating uses resistive heating elements (mats or loose wire) embedded in screed or tile adhesive. Power density varies: 100-150W/m² for comfort heating (supplementary), 150-200W/m² for primary heating. A 10m² bathroom at 150W/m² = 1500W (6.5A). Larger installations may need multiple zones on separate circuits.'
  },

  defined2: {
    term: 'UFH Circuit Design',
    definition: 'Small UFH systems (under 1000W) can often share a lighting circuit via FCU. Larger systems need dedicated radial circuits - typically 16A MCB with 2.5mm² cable. The circuit feeds the thermostat/controller location; heating cables connect via manufacturer\'s cold tail. Multiple zones can share one circuit if total load permits, with zone thermostats controlling each area.'
  },

  defined3: {
    term: 'RCD and Safety Requirements',
    definition: 'All UFH circuits require 30mA RCD protection per BS 7671 - the heating elements are in direct contact with floor construction and people walk on them. Additional RCD at the thermostat (RCD spur) provides extra protection. Earth continuity to any metallic screens in heating cables must be maintained. Insulation resistance testing before screed/tile installation is essential.'
  },

  defined4: {
    term: 'Thermostat and Control Wiring',
    definition: 'UFH thermostats typically need: permanent live (supply), switched live (to heating), neutral, earth, and floor sensor connections. The supply circuit runs to the thermostat location; the heating mat cold tail connects to thermostat output. Smart thermostats may need neutral (most UFH stats already do) and WiFi connectivity. Floor sensors are typically 3m thermistor leads embedded with the heating element.'
  },

  faqs: [
    {
      q: 'What size circuit for bathroom UFH?',
      a: 'Most bathroom UFH (3-6m²) draws 450-1200W (2-5A). This can often be fed from a 6A lighting circuit via fused connection unit. For larger bathrooms or where the lighting circuit is heavily loaded, a dedicated 16A radial is better practice.'
    },
    {
      q: 'Can I put UFH on a ring circuit?',
      a: 'Yes, via a fused connection unit (FCU) with 13A or 3A fuse depending on load. However, dedicated circuits are preferred for larger installations - they provide clearer fault discrimination and don\'t affect socket availability during UFH faults.'
    },
    {
      q: 'How do I calculate UFH load?',
      a: 'Area (m²) × power density (W/m²) = total watts. Divide by 230V for current. Example: 8m² bathroom at 150W/m² = 1200W = 5.2A. Manufacturer datasheets give exact mat/cable ratings - use these for accurate calculation.'
    },
    {
      q: 'Why does UFH need RCD protection?',
      a: 'Heating elements are embedded in floors where they could be damaged by drilling, nails, or water ingress. People are in direct contact (bare feet on bathroom floors). RCD protection detects earth faults before they become dangerous. BS 7671 mandates 30mA RCD for all floor heating.'
    },
    {
      q: 'What happens if voltage drop is too high?',
      a: 'UFH is resistive - power output is proportional to voltage squared. 5% voltage drop reduces heating by about 10%. The floor still heats but takes longer and uses slightly more energy (longer run time). Keep voltage drop under 3% for efficient operation.'
    },
    {
      q: 'Can multiple UFH zones share one circuit?',
      a: 'Yes, if total load is within circuit capacity. Each zone has its own thermostat (wired in parallel to the supply) controlling its heating mat. A 16A circuit can feed about 3500W total - enough for several small zones. Larger installations need multiple circuits.'
    },
    {
      q: 'What about three-phase UFH for large areas?',
      a: 'Commercial or very large domestic UFH (over 7kW) may use three-phase supply, with heating zones balanced across phases. Each phase is a separate circuit calculation. Single-phase is adequate for most domestic installations.'
    },
    {
      q: 'How do I test UFH before tiling?',
      a: 'Measure heating cable resistance (should match manufacturer spec ±5%). Test insulation resistance to earth (minimum 1MΩ, ideally >10MΩ). Check floor sensor resistance. Document all readings before and after tile/screed installation for warranty and fault-finding.'
    },
    {
      q: 'Can I add UFH to an existing circuit?',
      a: 'Depends on spare capacity. Calculate existing load plus UFH load. If total exceeds circuit rating, you need a new circuit. For small UFH (<1000W), a spur from ring or radial via FCU often works. For larger loads, dedicated circuit is required.'
    },
    {
      q: 'What cable size from consumer unit to thermostat?',
      a: '2.5mm² is standard for dedicated UFH circuits up to 16A. For small loads on lighting circuit spurs, 1.5mm² is adequate. Calculate voltage drop for your specific run length and load - upgrade to 4mm² for long runs or high loads.'
    },
    {
      q: 'Do I need building regulations approval?',
      a: 'UFH installation is notifiable under Part P if you\'re adding a new circuit. Minor works (adding to existing circuit) may be exempt. The electrical work requires certification regardless. Floor construction may also involve Part L (energy efficiency) considerations.'
    },
    {
      q: 'How does UFH affect fault loop impedance?',
      a: 'The circuit to the thermostat is what matters for fault loop (Zs) - the heating element is on the load side. Calculate Zs at the thermostat location. Ensure it meets maximum Zs for the MCB type and rating to achieve required disconnection time.'
    }
  ]
}

export default function UnderfloorHeatingVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="underfloor heating voltage drop, UFH circuit calculator, electric underfloor heating cable size, UFH wiring, bathroom underfloor heating circuit, BS 7671 UFH, heating mat calculator" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/underfloor-heating-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/underfloor-heating-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#ea580c" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Underfloor Heating', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Electric Underfloor Heating Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '412' }
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
          <Link to="/electrical-calculators" className="inline-flex items-center text-orange-600 hover:text-orange-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Flame className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Electric UFH Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-orange-900">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
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

          <div className="bg-red-100 border-2 border-red-400 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-red-900 mb-3">📐 UFH Load Calculation</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-red-900">Bathroom (5m²)</p>
                <p className="text-red-800">5 × 150W/m² = 750W</p>
                <p className="text-red-800 font-bold">= 3.3A</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-red-900">Kitchen (12m²)</p>
                <p className="text-red-800">12 × 150W/m² = 1800W</p>
                <p className="text-red-800 font-bold">= 7.8A</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-red-900">Large room (25m²)</p>
                <p className="text-red-800">25 × 150W/m² = 3750W</p>
                <p className="text-red-800 font-bold">= 16.3A (needs 20A)</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need UFH Wiring Help?</h3>
                <p className="text-purple-100">Get quotes from qualified electricians</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common UFH Installation Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-3">Related Heating Calculations</h3>
            <p className="text-sm text-orange-800 mb-4">
              For whole-house heating: <Link to="/calculators/voltage-drop/heat-pump" className="text-orange-600 font-semibold hover:underline">heat pump circuits</Link>. Hot water: <Link to="/calculators/voltage-drop/immersion-heater" className="text-orange-600 font-semibold hover:underline">immersion heater</Link>. Towel rails: typically same calculation as small UFH. Use our <Link to="/cable-sizing-calculator" className="text-orange-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity.
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-orange-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">UFH Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for UFH electrical work (excludes heating mats/cables).</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-50 border-b">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Work Type</th>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Heating mats, cables and floor preparation costs are additional.</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-red-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-red-800">{usecaseData.defined2.definition}</p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-amber-800">{usecaseData.defined3.definition}</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-yellow-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-orange-700">Size cables for UFH circuits</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-red-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-red-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes for UFH Wiring</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for underfloor heating installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=UnderfloorHeatingVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Underfloor Heating Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-orange-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
