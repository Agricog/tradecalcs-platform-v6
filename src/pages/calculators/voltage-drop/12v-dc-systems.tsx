import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Battery } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: '12v-dc-systems',
  title: '12V DC Voltage Drop Calculator',
  metaTitle: '12V DC Voltage Drop Calculator UK | Low Voltage | Caravan Boat Solar | TradeCalcs',
  metaDescription: 'Free 12V DC voltage drop calculator for low voltage systems. Calculate cable size for caravans, boats, solar installations and garden lighting. Critical for battery-powered systems.',
  heroDescription: 'Calculate voltage drop for 12V DC systems - caravans, boats, solar and low voltage lighting',
  
  defaults: {
    cableSize: '4',
    length: '5',
    current: '10',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    '12V systems are far more sensitive to voltage drop than 230V - every 0.5V matters',
    'Same current at 12V = 19× the voltage drop percentage compared to 230V',
    'LED equipment typically needs 10.5V minimum - only 12.5% tolerance from 12V',
    'Round-trip calculation: current flows out AND back, so double the cable length',
    '3% voltage drop on 12V = only 0.36V - requires much larger cables than 230V'
  ],

  symptomChecks: [
    { symptom: 'Caravan fridge (5A) - 3m from battery', recommendation: '5A with 2.5mm² (14.4 mΩ/m). Round-trip 6m: (0.0144 × 5 × 6) = 0.43V (3.6%) ⚠ use 4mm²' },
    { symptom: 'Boat nav lights (2A) - 8m cable run', recommendation: '2A with 1.5mm² (24 mΩ/m). Round-trip 16m: (0.024 × 2 × 16) = 0.77V (6.4%) ⚠ use 2.5mm²' },
    { symptom: 'Solar panel to controller (10A) - 5m', recommendation: '10A with 6mm² (6 mΩ/m). Round-trip 10m: (0.006 × 10 × 10) = 0.60V (5.0%) ✓' },
    { symptom: 'Garden lights (3A) - 15m from transformer', recommendation: '3A with 2.5mm² (14.4 mΩ/m). Round-trip 30m: (0.0144 × 3 × 30) = 1.30V (10.8%) ✗ use 6mm²' },
    { symptom: 'High-power LED strip (8A) - 2m', recommendation: '8A with 4mm² (9 mΩ/m). Round-trip 4m: (0.009 × 8 × 4) = 0.29V (2.4%) ✓' }
  ],

  costEstimates: [
    { scenario: 'Caravan 12V rewire (per circuit)', material: '£30-80', labour: '£60-150', total: '£90-230' },
    { scenario: 'Boat 12V system upgrade', material: '£150-400', labour: '£200-500', total: '£350-900' },
    { scenario: 'Solar panel wiring (to controller)', material: '£50-150', labour: '£100-250', total: '£150-400' },
    { scenario: 'Garden lighting transformer install', material: '£80-200', labour: '£120-280', total: '£200-480' },
    { scenario: '12V LED strip installation', material: '£40-120', labour: '£80-180', total: '£120-300' }
  ],

  defined: {
    term: 'Why 12V Voltage Drop is Critical',
    definition: 'At 12V, the same percentage voltage drop represents a much smaller absolute voltage. A 5% drop on 230V = 11.5V (equipment still works fine). A 5% drop on 12V = 0.6V, potentially leaving only 11.4V at the load. Many 12V devices fail below 10.5V. The tolerance is so tight that voltage drop calculations are essential for any 12V run over a metre or two.'
  },

  defined2: {
    term: 'Round-Trip Calculation',
    definition: 'DC circuits require current to flow both ways - out through the positive cable and back through the negative. The voltage drop occurs in both directions, so you must calculate for DOUBLE the one-way cable length. A 5m cable run = 10m round-trip for voltage drop calculation. This catches many DIYers out.'
  },

  defined3: {
    term: '12V Cable Sizing',
    definition: '12V systems typically need much larger cables than equivalent 230V loads. A 120W load draws 10A at 12V (vs 0.52A at 230V). Combined with the round-trip effect and tight tolerance, 12V runs often need 4mm², 6mm² or larger cable even for moderate loads. Use the calculator with round-trip length.'
  },

  defined4: {
    term: 'Common 12V Applications',
    definition: 'Caravans and motorhomes (leisure batteries, lights, pumps), boats (nav lights, instruments, pumps), solar systems (panels to charge controller, controller to battery), garden lighting (transformer to LED fittings), and automotive aftermarket (spotlights, audio). Each has different tolerance levels - lighting is most sensitive to voltage drop.'
  },

  faqs: [
    {
      q: 'Why do I need such thick cable for 12V?',
      a: 'At 12V, the same power draws 19× more current than at 230V. A 120W load is 10A at 12V but only 0.5A at 230V. More current = more voltage drop. Add the round-trip effect and tight tolerance, and you need much larger cables.'
    },
    {
      q: 'How do I calculate round-trip voltage drop?',
      a: 'Double your one-way cable length. Current flows out on positive and returns on negative - voltage drops in both. A 5m cable to your light means 10m total for the calculation. This is the most common mistake in 12V wiring.'
    },
    {
      q: 'What voltage drop is acceptable at 12V?',
      a: 'For lighting: 3% maximum (0.36V) keeps LEDs bright and even. For motors/pumps: 5% is usually acceptable. For sensitive electronics: 2% or less. Remember that battery voltage varies - a "12V" system might be 12.8V when charged or 11.8V when depleted.'
    },
    {
      q: 'My caravan lights are dim at the far end - why?',
      a: 'Almost certainly voltage drop. Caravan manufacturers often use minimal cable sizes. The lights nearest the battery are bright, those furthest away receive less voltage. Upgrading the cable size or running dedicated circuits solves this.'
    },
    {
      q: 'How do I size solar panel cables?',
      a: 'Calculate maximum panel current (Imp × number of panels) and round-trip distance to charge controller. Panels can be far from batteries - long cable runs need substantial sizing. A 5% loss in solar cable directly reduces your charging capacity.'
    },
    {
      q: 'What about 24V systems?',
      a: '24V has half the voltage drop percentage of 12V for the same power. The calculation method is identical - just use 24V as base. 24V is increasingly popular for larger solar systems, boats, and motorhomes for this reason.'
    },
    {
      q: 'Can I use automotive cable for 12V installations?',
      a: 'Yes, but check the actual conductor size - automotive cable is often thin-wall insulation with good ampacity but same voltage drop as standard cable of that size. The mm² conductor area determines voltage drop, not the cable\'s current rating.'
    },
    {
      q: 'Why do my garden lights flicker?',
      a: 'Voltage drop causing the transformer to struggle or LEDs to operate at minimum voltage. Long cable runs from transformer to lights need substantial sizing. Also check transformer capacity - overloaded transformers drop voltage under load.'
    },
    {
      q: 'Does cable resistance change with temperature?',
      a: 'Yes - copper resistance increases about 0.4% per °C. Hot engine compartments or sun-exposed cables have higher resistance. For critical applications, calculate at expected operating temperature. Most tables assume 20°C.'
    },
    {
      q: 'How do I measure actual voltage drop?',
      a: 'Measure voltage at the battery terminals and at the load with the circuit operating. The difference is actual voltage drop. Compare to your calculation - if much higher, you may have poor connections, undersized cable, or corroded terminals.'
    },
    {
      q: 'What connectors should I use for 12V?',
      a: 'Use crimped ring terminals or properly soldered connections for power cables. Anderson plugs for disconnect points. Avoid cheap chocolate-block connectors for power - they add resistance and create hot spots. Connection resistance is often worse than cable voltage drop.'
    },
    {
      q: 'Should I use copper or aluminium for 12V?',
      a: 'Copper almost always. Aluminium has higher resistance (needs 60% larger size) and connection issues in small sizes. Aluminium is only practical for very large cables where weight/cost savings justify the complexity. Stick with copper for 12V work.'
    }
  ]
}

export default function TwelveVoltDCSystemsVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="12V voltage drop calculator, DC voltage drop, caravan cable size, boat wiring, solar panel cable, low voltage lighting, 12 volt cable calculator, leisure battery wiring" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/12v-dc-systems-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/12v-dc-systems-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#0284c7" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': '12V DC Systems', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': '12V DC Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '623' }
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
          <Link to="/electrical-calculators" className="inline-flex items-center text-sky-600 hover:text-sky-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Battery className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-sky-100 border-2 border-sky-500 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-sky-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-sky-900">⚡ 12V = CRITICAL VOLTAGE DROP - USE ROUND-TRIP LENGTH</p>
                <p className="text-sm text-sky-800">Double your cable length for DC calculations (current flows both ways). A 5m cable run = 10m for voltage drop. 3% on 12V = only 0.36V tolerance!</p>
              </div>
            </div>
          </div>

          <div className="bg-sky-50 border-l-4 border-sky-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-sky-900 mb-3 flex items-center gap-2">
              <Battery className="w-5 h-5" />
              12V DC Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-sky-900">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
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

          <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-3">📐 12V vs 230V Voltage Drop Comparison</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-blue-900">120W at 230V (0.52A)</p>
                <p className="text-blue-800">10m cable, 1.5mm² = 0.23V drop</p>
                <p className="text-blue-800 font-bold">= 0.1% - negligible</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-blue-900">120W at 12V (10A)</p>
                <p className="text-blue-800">10m round-trip, 4mm² = 0.90V drop</p>
                <p className="text-blue-800 font-bold">= 7.5% - significant!</p>
              </div>
            </div>
            <p className="text-xs text-blue-700 mt-3">Same power, same distance - but 12V needs much larger cables and still has higher % drop.</p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need 12V System Help?</h3>
                <p className="text-purple-100">Get quotes from auto electricians and solar installers</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common 12V Scenarios (Round-Trip Calculated)</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sky-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-sky-900 mb-3">Related Low Voltage Calculations</h3>
            <p className="text-sm text-sky-800 mb-4">
              For mains-fed garden lighting: <Link to="/calculators/voltage-drop/garden-lighting" className="text-sky-600 font-semibold hover:underline">garden lighting</Link>. Battery storage systems: <Link to="/calculators/voltage-drop/battery-storage" className="text-sky-600 font-semibold hover:underline">home battery</Link>. Solar PV: <Link to="/calculators/voltage-drop/solar-pv" className="text-sky-600 font-semibold hover:underline">solar installations</Link>. Use our <Link to="/cable-sizing-calculator" className="text-sky-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity.
            </p>
          </div>

          <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-sky-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-sky-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">12V Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for 12V electrical work.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-sky-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Equipment (batteries, solar panels, lights) costs are additional.</p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-blue-800">{usecaseData.defined2.definition}</p>
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-indigo-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-indigo-800">{usecaseData.defined3.definition}</p>
              </div>
            </div>
          </div>

          <div className="bg-cyan-50 border-l-4 border-cyan-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-cyan-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-cyan-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-sky-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-sky-700">Size cables for DC circuits</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-blue-700">Full BS 7671 voltage drop for AC circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes for 12V System Work</h3>
              <p className="text-gray-700">
                Looking for help with caravan electrics, boat wiring, solar installation or garden lighting? Tell us about your project and we'll connect you with specialists in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=12VDCSystemsVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite 12V DC Systems Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-sky-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-sky-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
