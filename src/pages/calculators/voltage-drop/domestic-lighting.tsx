import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Lightbulb } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'domestic-lighting',
  title: 'Domestic Lighting Voltage Drop Calculator',
  metaTitle: 'Lighting Circuit Voltage Drop Calculator UK | 3% Limit | BS 7671 | TradeCalcs',
  metaDescription: 'Free lighting circuit voltage drop calculator for UK electricians. BS 7671 compliant with 3% voltage drop limit for lighting. Calculate domestic and indoor lighting circuits.',
  heroDescription: 'Calculate voltage drop for indoor lighting circuits - stricter 3% limit applies',
  
  defaults: {
    cableSize: '1.5',
    length: '25',
    current: '6',
    circuitType: 'lighting' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'Lighting circuits have STRICTER 3% voltage drop limit (vs 5% for power)',
    'Standard domestic lighting: 1.5mm² cable, 6A MCB, radial circuit',
    'LED lighting draws much less current than traditional - often <1A per circuit',
    'Voltage drop affects LED dimming performance and can cause flicker',
    'Maximum 12 lighting points per circuit (guidance, not regulation)'
  ],

  symptomChecks: [
    { symptom: 'Single floor lighting (20m) - 6A', recommendation: '6A with 1.5mm² (29 mV/A/m). At 20m: (29 × 6 × 20) ÷ 1000 = 3.48V (1.51%) ✓' },
    { symptom: 'Two-storey house circuit (35m)', recommendation: '6A with 1.5mm² at 35m: (29 × 6 × 35) ÷ 1000 = 6.09V (2.65%) ✓ within 3%' },
    { symptom: 'Long run to garage lighting (40m)', recommendation: '6A with 2.5mm² (18 mV/A/m). At 40m: (18 × 6 × 40) ÷ 1000 = 4.32V (1.88%) ✓' },
    { symptom: 'LED circuit - actual load 2A (25m)', recommendation: '2A with 1.5mm² at 25m: (29 × 2 × 25) ÷ 1000 = 1.45V (0.63%) ✓ plenty of margin' },
    { symptom: 'Kitchen downlights (30m total run)', recommendation: '6A with 1.5mm² at 30m: (29 × 6 × 30) ÷ 1000 = 5.22V (2.27%) ✓' }
  ],

  costEstimates: [
    { scenario: 'New lighting circuit - single room', material: '£50-100', labour: '£150-280', total: '£200-380' },
    { scenario: 'Full floor lighting rewire', material: '£150-300', labour: '£350-600', total: '£500-900' },
    { scenario: 'Kitchen downlights (6 lights)', material: '£200-400', labour: '£300-500', total: '£500-900' },
    { scenario: 'Dimmer switch installation', material: '£30-80', labour: '£60-120', total: '£90-200' },
    { scenario: 'Emergency lighting circuit', material: '£200-400', labour: '£250-450', total: '£450-850' }
  ],

  defined: {
    term: 'Why 3% for Lighting?',
    definition: 'BS 7671 specifies a stricter 3% voltage drop limit for lighting circuits (vs 5% for power). This protects against visible dimming, flicker, and reduced light output. Historically set for incandescent lamps which dim noticeably with voltage drop, the limit remains relevant for LED driver performance and dimming stability.'
  },

  defined2: {
    term: 'LED Lighting and Voltage Drop',
    definition: 'LED drivers typically accept a voltage range (e.g., 200-240V) and regulate output to the LEDs. However, excessive voltage drop can cause: reduced efficiency, dimmer incompatibility, flickering at low voltage, and premature driver failure. Quality LED drivers tolerate more variation, but budget fittings may be sensitive to voltage drop.'
  },

  defined3: {
    term: 'Lighting Circuit Design',
    definition: 'Domestic lighting circuits typically use 1.5mm² cable with 6A MCB protection. The circuit feeds multiple lighting points in a radial configuration using loop-in, loop-out wiring. Switch drops use 1mm² or 1.5mm² cable. Modern practice increasingly uses LED-compatible dimmers and separate circuits for high-power areas like kitchens.'
  },

  defined4: {
    term: 'Calculating Lighting Load',
    definition: 'For voltage drop, use actual or expected load, not the circuit rating. A 6A lighting circuit might only draw 2A with LED lighting. However, design for potential future load - someone might replace LEDs with higher-power fittings. For new installations, calculate at circuit rating; for verification, actual load is acceptable.'
  },

  faqs: [
    {
      q: 'Why is the voltage drop limit different for lighting?',
      a: 'The 3% limit protects against visible dimming. A 5% drop on 230V lighting would be noticeable (11.5V). The stricter limit ensures consistent light output across all fittings on the circuit, from closest to furthest from the consumer unit.'
    },
    {
      q: 'Does LED lighting really need the 3% limit?',
      a: 'Yes, the regulation still applies. While LED drivers can handle voltage variation, the 3% limit ensures dimmer compatibility, prevents flicker, and allows for future changes. You can\'t assume the next owner won\'t install more demanding fittings.'
    },
    {
      q: 'What cable size for domestic lighting?',
      a: '1.5mm² is standard for domestic lighting circuits. For long runs (over 30m) or where voltage drop is marginal, 2.5mm² provides better margin. The 6A MCB protects either size adequately.'
    },
    {
      q: 'How many lights on one circuit?',
      a: 'Guidance suggests maximum 12 lighting points per circuit, but this isn\'t a hard regulation. With LED lighting drawing minimal current, more points are electrically possible. Consider practicality - too many on one circuit means large areas go dark with one MCB trip.'
    },
    {
      q: 'Should I use separate circuits for kitchen lighting?',
      a: 'Recommended. Kitchens often have many downlights (6-12+) and higher total load. A dedicated circuit ensures adequate capacity, keeps lighting on if a socket circuit trips, and simplifies future modifications.'
    },
    {
      q: 'How does voltage drop affect dimmers?',
      a: 'LED dimmers are sensitive to supply voltage. Excessive voltage drop can cause: reduced dimming range, flickering at low dim levels, buzzing from the dimmer, and incompatibility with certain LED fittings. Quality dimmers and adequate cable sizing prevent these issues.'
    },
    {
      q: 'What about three-core-and-earth for two-way switching?',
      a: 'Three-core-and-earth (1.5mm² or 1mm²) is used for two-way and intermediate switching. The additional conductors (strappers) carry switching signals, not load current. Voltage drop calculation uses the main feed cable length, not switch wire length.'
    },
    {
      q: 'Can I use the 5% limit for LED lighting?',
      a: 'No - BS 7671 specifies 3% for lighting regardless of lamp type. The regulation doesn\'t distinguish between LED, halogen, or other technologies. Apply the 3% limit for all lighting circuit calculations.'
    },
    {
      q: 'How do I calculate voltage drop for loop-in wiring?',
      a: 'Calculate to the furthest light fitting on the circuit. The total cable length is from consumer unit, through each ceiling rose (loop-in connections), to the final light. Include all segments of the radial run.'
    },
    {
      q: 'What causes LED flicker from voltage drop?',
      a: 'When voltage drops near the LED driver\'s minimum input, the driver may struggle to regulate output, causing visible flicker. This is worse with trailing-edge dimmers and budget LED fittings. Adequate supply voltage (staying within 3% drop) prevents this.'
    },
    {
      q: 'Should emergency lighting be on the same circuit?',
      a: 'No - emergency lighting should have independent supply, typically from a separate circuit or with battery backup. This ensures lights remain operational during power failures or when main lighting circuits are isolated for maintenance.'
    },
    {
      q: 'What about 12V LED lighting systems?',
      a: 'Low-voltage (12V/24V) LED systems have their own voltage drop considerations on the secondary side. Calculate the 230V supply to the transformer using standard methods, then separately consider voltage drop in the 12V wiring from transformer to fittings.'
    }
  ]
}

export default function DomesticLightingVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="lighting circuit voltage drop, 3% voltage drop, domestic lighting calculator, LED lighting voltage drop, BS 7671 lighting, indoor lighting circuit, lighting circuit design, dimmer voltage drop" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/domestic-lighting-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/domestic-lighting-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#f59e0b" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Domestic Lighting', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Lighting Circuit Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '734' }
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
          <Link to="/electrical-calculators" className="inline-flex items-center text-amber-600 hover:text-amber-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-12 px-4">
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
                <p className="font-bold text-amber-900">💡 LIGHTING = 3% VOLTAGE DROP LIMIT (NOT 5%)</p>
                <p className="text-sm text-amber-800">BS 7671 specifies stricter limits for lighting circuits to prevent visible dimming and LED flicker. Maximum 6.9V drop on 230V supply.</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Lighting Circuit Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-900">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
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

          <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-900 mb-3">📐 3% Voltage Drop Calculation</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-yellow-900">Lighting (25m, 6A, 1.5mm²)</p>
                <p className="text-yellow-800">= (29 × 6 × 25) ÷ 1000</p>
                <p className="text-yellow-800">= 4.35V (1.89%)</p>
                <p className="text-yellow-800 font-bold">✓ Under 3% limit</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-yellow-900">Maximum length at 3%</p>
                <p className="text-yellow-800">6.9V = (29 × 6 × L) ÷ 1000</p>
                <p className="text-yellow-800">L = 6900 ÷ 174 = 39.7m</p>
                <p className="text-yellow-800 font-bold">Max ~40m with 1.5mm² at 6A</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need Lighting Circuit Work?</h3>
                <p className="text-purple-100">Get quotes from qualified domestic electricians</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Lighting Circuit Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-amber-900 mb-3">Related Lighting Calculations</h3>
            <p className="text-sm text-amber-800 mb-4">
              For outdoor lighting, see <Link to="/calculators/voltage-drop/garden-lighting" className="text-amber-600 font-semibold hover:underline">garden lighting</Link>. Commercial installations: <Link to="/calculators/voltage-drop/commercial-lighting" className="text-amber-600 font-semibold hover:underline">commercial lighting</Link>. For 12V systems: <Link to="/calculators/voltage-drop/12v-dc-systems" className="text-amber-600 font-semibold hover:underline">12V DC voltage drop</Link>. Use our <Link to="/cable-sizing-calculator" className="text-amber-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity.
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-amber-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-amber-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Lighting Circuit Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for domestic lighting work.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-amber-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. LED fitting costs are additional to circuit installation.</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-yellow-800">{usecaseData.defined2.definition}</p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-orange-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-orange-800">{usecaseData.defined3.definition}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-red-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-red-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-amber-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-amber-700">Size cables for lighting circuits</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-yellow-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-yellow-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for lighting circuit installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=DomesticLightingVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Domestic Lighting Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-amber-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-amber-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
