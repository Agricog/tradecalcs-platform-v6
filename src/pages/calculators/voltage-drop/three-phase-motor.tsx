import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Settings } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'three-phase-motor',
  title: 'Three-Phase Motor Voltage Drop Calculator',
  metaTitle: 'Three-Phase Motor Voltage Drop Calculator UK | Industrial Motors | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for three-phase motors. Check BS 7671 compliance for industrial motors, pumps, compressors using official Table 4D1B mV/A/m values with 0.866 factor.',
  heroDescription: 'Calculate voltage drop for three-phase motors with starting current considerations',
  
  defaults: {
    cableSize: '16',
    length: '50',
    current: '63',
    circuitType: 'power' as const,
    phase: 'three' as const
  },

  keyFacts: [
    'Three-phase voltage drop uses 0.866 factor (√3/2) on tabulated mV/A/m values',
    'Motor starting current typically 6-8× full load current (FLC) for DOL start',
    'Star-delta starting reduces inrush to ~2× FLC but requires 6-wire connection',
    'BS 7671 allows transient voltage drop during starting - design for running current',
    'Large motors may need voltage drop <3% for reliable starting'
  ],

  symptomChecks: [
    { symptom: '11kW motor - short run (30m)', recommendation: '22A FLC with 6mm² (7.3 mV/A/m). At 30m 3Ø: (7.3 × 22 × 30 × 0.866) ÷ 1000 = 4.17V (1.04% on 400V) ✓' },
    { symptom: '22kW motor - medium run (50m)', recommendation: '42A FLC with 10mm² (4.4 mV/A/m). At 50m: (4.4 × 42 × 50 × 0.866) ÷ 1000 = 8.00V (2.00%) ✓' },
    { symptom: '37kW motor - industrial (75m)', recommendation: '69A FLC with 25mm² (1.75 mV/A/m). At 75m: (1.75 × 69 × 75 × 0.866) ÷ 1000 = 7.84V (1.96%) ✓' },
    { symptom: '55kW motor - long run (100m)', recommendation: '100A FLC with 35mm² (1.25 mV/A/m). At 100m: (1.25 × 100 × 100 × 0.866) ÷ 1000 = 10.83V (2.71%) ✓' },
    { symptom: '75kW+ motor with soft starter', recommendation: 'Soft starters limit inrush to 3-4× FLC. Size cable for running current, verify starting torque adequate for load.' }
  ],

  costEstimates: [
    { scenario: 'Small motor circuit (<15kW)', material: '£200-400', labour: '£300-500', total: '£500-900' },
    { scenario: 'Medium motor (15-37kW)', material: '£400-800', labour: '£500-800', total: '£900-1600' },
    { scenario: 'Large motor (37-75kW)', material: '£800-1500', labour: '£700-1200', total: '£1500-2700' },
    { scenario: 'Soft starter installation', material: '£600-2000', labour: '£400-800', total: '£1000-2800' },
    { scenario: 'VFD/inverter drive', material: '£1000-5000', labour: '£500-1000', total: '£1500-6000' }
  ],

  defined: {
    term: 'Three-Phase Voltage Drop Calculation',
    definition: 'Three-phase circuits use the same mV/A/m values from Table 4D1B but apply a 0.866 factor (√3/2). This accounts for the phase relationship in balanced three-phase systems. Formula: VD = (mV/A/m × I × L × 0.866) ÷ 1000. The percentage is calculated against 400V line voltage, not 230V phase voltage.'
  },

  defined2: {
    term: 'Motor Starting Current Impact',
    definition: 'Direct-on-line (DOL) motor starting draws 6-8 times full load current for several seconds. A 22kW motor (42A FLC) may draw 250-340A during starting. This transient causes significant voltage drop that can affect other equipment. While BS 7671 doesn\'t set limits for starting voltage drop, excessive drop prevents motors starting or causes contactors to drop out.'
  },

  faqs: [
    {
      q: 'Why use the 0.866 factor for three-phase calculations?',
      a: 'The mV/A/m values in Table 4D1B are for single-phase circuits. For balanced three-phase, multiply by √3/2 (0.866) to convert. This accounts for the 120° phase displacement between conductors which reduces effective voltage drop per phase.'
    },
    {
      q: 'Should I calculate voltage drop for starting or running current?',
      a: 'Size cables for running (full load) current with normal voltage drop limits (5%). Check starting voltage drop separately - motors typically need >80% of rated voltage to start reliably. If starting drop is excessive, consider star-delta or soft starter.'
    },
    {
      q: 'What voltage drop is acceptable during motor starting?',
      a: 'BS 7671 doesn\'t specify, but motors generally need 80%+ voltage to develop adequate starting torque. Industry practice keeps starting voltage drop under 15-20% total. Sensitive equipment on the same supply may need tighter limits.'
    },
    {
      q: 'How does star-delta starting affect cable sizing?',
      a: 'Star-delta starting reduces starting current to approximately 1/3 of DOL (about 2× FLC). However, it requires 6 conductors to the motor and only works with motors designed for it. Starting torque is also reduced to 1/3.'
    },
    {
      q: 'What is a soft starter and how does it help?',
      a: 'Soft starters use thyristors to gradually increase voltage to the motor, limiting starting current to 3-4× FLC. They reduce mechanical stress on driven equipment and electrical stress on the supply. More expensive than DOL but cheaper than VFDs.'
    },
    {
      q: 'When should I use a VFD instead of DOL starting?',
      a: 'Variable Frequency Drives (VFDs/inverters) are ideal when: speed control is needed, energy savings are important (pumps, fans), very soft starting is required, or supply is weak. VFDs draw approximately FLC during starting.'
    },
    {
      q: 'How do I find motor full load current?',
      a: 'Check the motor nameplate for rated current at rated voltage. Alternatively, estimate: FLC ≈ kW × 1.9 for standard efficiency motors at 400V. A 22kW motor draws approximately 42A FLC.'
    },
    {
      q: 'Does power factor affect voltage drop calculations?',
      a: 'The mV/A/m values in Table 4D1B assume resistive loads. Motors have lower power factor (typically 0.8-0.85), which slightly increases voltage drop. For critical installations, use manufacturer\'s data or add 10-15% margin.'
    },
    {
      q: 'What cable type for three-phase motor circuits?',
      a: 'SWA (Steel Wire Armoured) is standard for industrial motors. Use 4-core (3 phase + earth) or 5-core (3 phase + neutral + earth) depending on whether neutral is required. Armour can serve as CPC if correctly terminated.'
    },
    {
      q: 'Do I need to consider neutral current for motor circuits?',
      a: 'Balanced three-phase motor loads have zero neutral current, so 3-core + earth is sufficient. If non-linear loads or single-phase loads share the circuit, neutral sizing becomes important and 4-core + earth is needed.'
    },
    {
      q: 'What protection is required for motor circuits?',
      a: 'Motor circuits need: overcurrent protection (MCCB or fuses), motor overload relay (thermal or electronic), short circuit protection, and often earth fault protection. Type D MCBs may be needed to handle starting inrush without tripping.'
    },
    {
      q: 'How does ambient temperature affect motor cable sizing?',
      a: 'High ambient temperatures require cable derating. In a 40°C environment, cable capacity reduces by approximately 10%. Industrial environments often need larger cables than the calculation suggests due to ambient conditions.'
    }
  ],

  defined3: {
    term: 'DOL vs Reduced Voltage Starting',
    definition: 'Direct-on-line (DOL) starting is simplest but causes maximum inrush current and voltage drop. Star-delta reduces inrush to ~33% but needs special motor winding configuration. Soft starters offer adjustable ramp-up (typically 3-4× FLC). VFDs provide smoothest starting (~1× FLC) plus speed control but highest cost. Choice depends on supply capacity, driven load requirements, and budget.'
  },

  defined4: {
    term: 'Motor Circuit Discrimination',
    definition: 'Motor circuits must coordinate with upstream protection to ensure only the faulty circuit trips during a fault. This "discrimination" prevents a motor fault from tripping the main incomer. Use time-graded or current-graded discrimination. Motor protection relays typically have adjustable trip times to achieve coordination.'
  }
}

export default function ThreePhaseMotorVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="three phase motor voltage drop, industrial motor cable size, motor starting current, DOL starting, star delta, soft starter, VFD cable sizing, BS 7671 motor, 400V motor" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/three-phase-motor-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/three-phase-motor-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
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
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Three-Phase Motor', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Three-Phase Motor Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '287' }
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Settings className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Three-Phase Motor Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-purple-900">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
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
                <h3 className="text-xl font-bold mb-1">Need an Industrial Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted contractors for motor installations</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Motor Installation Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-3">Related Industrial Calculations</h3>
            <p className="text-sm text-purple-800 mb-4">
              For single-phase motor loads, use our <Link to="/voltage-drop-calculator" className="text-purple-600 font-semibold hover:underline">main voltage drop calculator</Link>. Need to size cable for current capacity first? Try our <Link to="/cable-sizing-calculator" className="text-purple-600 font-semibold hover:underline">cable sizing calculator</Link>. For heat pump compressors specifically, see our <Link to="/calculators/voltage-drop/heat-pump" className="text-purple-600 font-semibold hover:underline">heat pump voltage drop guide</Link>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-purple-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Motor Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK industrial installation costs. Excludes motor cost.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-purple-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Industrial installations vary significantly by site conditions.</p>
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-indigo-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-indigo-800">{usecaseData.defined2.definition}</p>
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

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-blue-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-purple-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-purple-700">Size cables for motor current capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-indigo-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-indigo-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Industrial Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your motor installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ThreePhaseMotorVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Three-Phase Motor Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-purple-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-purple-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
