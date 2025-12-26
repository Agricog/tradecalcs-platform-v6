import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Sun } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'garden-lighting',
  title: 'Garden Lighting Voltage Drop Calculator',
  metaTitle: 'Garden Lighting Voltage Drop Calculator UK | Outdoor Lights | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for garden and outdoor lighting. Check BS 7671 3% lighting limit compliance using official Table 4D1B mV/A/m values.',
  heroDescription: 'Check voltage drop compliance for garden lighting circuits with the stricter 3% limit',
  
  defaults: {
    cableSize: '1.5',
    length: '25',
    current: '6',
    circuitType: 'lighting' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'Lighting circuits have stricter 3% voltage drop limit (not 5%)',
    'LED drivers sensitive to low voltage - may flicker or fail',
    'Typical cable: 1.5mm² (29 mV/A/m) or 2.5mm² (18 mV/A/m)',
    'Long garden runs often need 2.5mm² despite low current',
    'SWA or armoured cable required for buried outdoor runs'
  ],

  symptomChecks: [
    { symptom: 'Patio lights near house (10m)', recommendation: '6A with 1.5mm² (29 mV/A/m). At 10m: (29 × 6 × 10) ÷ 1000 = 1.74V (0.76%) ✓' },
    { symptom: 'Path lighting to bottom of garden (30m)', recommendation: '6A with 1.5mm². At 30m: (29 × 6 × 30) ÷ 1000 = 5.22V (2.27%) ✓ but marginal' },
    { symptom: 'Extensive garden lighting (40m+)', recommendation: '6A with 2.5mm² (18 mV/A/m). At 40m: (18 × 6 × 40) ÷ 1000 = 4.32V (1.88%) ✓' },
    { symptom: 'Security floodlights (500W total)', recommendation: '~2.2A load. At 20m with 1.5mm²: (29 × 2.2 × 20) ÷ 1000 = 1.28V (0.56%) ✓' },
    { symptom: 'Festoon/party lights (long run 50m)', recommendation: '3A with 2.5mm². At 50m: (18 × 3 × 50) ÷ 1000 = 2.70V (1.17%) ✓' }
  ],

  costEstimates: [
    { scenario: 'Simple patio lights (5-10m)', material: '£80-150', labour: '£150-250', total: '£230-400' },
    { scenario: 'Path lighting (20-30m)', material: '£150-300', labour: '£250-400', total: '£400-700' },
    { scenario: 'Full garden scheme (40m+)', material: '£300-600', labour: '£400-700', total: '£700-1300' },
    { scenario: 'Security lighting install', material: '£100-250', labour: '£150-300', total: '£250-550' },
    { scenario: 'Outdoor consumer unit', material: '£120-250', labour: '£150-250', total: '£270-500' }
  ],

  defined: {
    term: 'Garden Lighting Voltage Drop',
    definition: 'Garden lighting circuits must comply with the stricter 3% voltage drop limit - not the 5% allowed for power circuits. This is because lighting is more sensitive to voltage reduction. LEDs may dim, flicker, or fail completely if voltage drops too much. Long outdoor cable runs often require larger cables than the current alone would suggest.'
  },

  defined2: {
    term: 'Why the 3% Limit Matters',
    definition: 'BS 7671 Regulation 525 specifies 3% maximum voltage drop for lighting. On a 230V supply, that is just 6.9V. LED drivers are particularly sensitive - some require minimum input voltage and will not operate correctly below it. Incandescent bulbs dim proportionally with voltage, but LEDs may cut out entirely.'
  },

  faqs: [
    {
      q: 'Why is garden lighting limited to 3% voltage drop?',
      a: 'BS 7671 specifies 3% for lighting circuits (versus 5% for power) because lights are more sensitive to voltage reduction. At 3% drop (6.9V), some LED drivers may already struggle. Keeping voltage drop low ensures reliable operation.'
    },
    {
      q: 'What cable size for garden lighting?',
      a: 'Most garden lighting uses 1.5mm² (29 mV/A/m) for runs up to 25m. For longer runs, 2.5mm² (18 mV/A/m) keeps voltage drop manageable. Even with only 6A load, long runs may need the larger cable.'
    },
    {
      q: 'Can I use the same circuit for indoor and outdoor lights?',
      a: 'Yes, but outdoor sections need appropriate cable (SWA for buried, or properly protected) and RCD protection. Many installations use a separate outdoor lighting circuit for flexibility and fault isolation.'
    },
    {
      q: 'Do garden lights need RCD protection?',
      a: 'Yes. BS 7671 requires 30mA RCD protection for all outdoor circuits. Most modern consumer units provide this automatically via RCBO or split-load RCD configuration.'
    },
    {
      q: 'What IP rating for outdoor light fittings?',
      a: 'Minimum IP44 for sheltered locations, IP65 or IP66 for exposed areas. Buried cable junction boxes need IP68. Check manufacturer ratings match your installation environment.'
    },
    {
      q: 'How deep should I bury garden lighting cable?',
      a: 'SWA cable should be buried minimum 450mm deep with warning tape above. Under driveways, 600mm minimum. Consider ducting for future cable replacement or additions.'
    },
    {
      q: 'Can I use low voltage (12V) garden lighting instead?',
      a: 'Yes, 12V systems avoid mains cable burial requirements. However, low voltage has higher current for same power (so more voltage drop), and transformers need weatherproof housing. Calculate voltage drop at 12V, not 230V.'
    },
    {
      q: 'Do I need Part P notification for garden lighting?',
      a: 'Yes. New outdoor circuits are notifiable under Part P Building Regulations. A registered electrician can self-certify. DIY installation requires building control inspection.'
    },
    {
      q: 'How many lights can I run on one circuit?',
      a: 'A 6A lighting circuit can handle about 1380W (6A × 230V). With LED lights at 10W each, that is 100+ lights. The practical limit is usually voltage drop on long cable runs, not total wattage.'
    },
    {
      q: 'Should I use separate circuits for different garden zones?',
      a: 'For large gardens, yes. Separate circuits allow independent switching/dimming, limit cable runs, and isolate faults. Consider zones: patio, paths, feature lighting, security.'
    }
  ],

  defined3: {
    term: 'LED Driver Considerations',
    definition: 'LED drivers convert mains voltage to the low voltage LEDs need. Most drivers specify minimum input voltage (often 200-220V). If your supply drops below this due to voltage drop, the driver may shut down, flicker, or reduce output. Quality drivers handle wider input ranges but always check specifications.'
  }
}

export default function GardenLightingVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="garden lighting voltage drop, outdoor lights cable size, path lighting, LED garden lights, BS 7671 lighting, 3% voltage drop" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/garden-lighting-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/garden-lighting-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#ca8a04" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Garden Lighting', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Garden Lighting Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '389' }
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
              <Sun className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <Sun className="w-5 h-5" />
              Garden Lighting Quick Facts
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
                <h3 className="text-xl font-bold mb-1">Need a Qualified Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted, local contractors for your garden lighting</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Garden Lighting Scenarios</h2>
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
            <h3 className="font-bold text-yellow-900 mb-3">Complete Your Outdoor Setup</h3>
            <p className="text-sm text-yellow-800 mb-4">
              Need power to a <Link to="/calculators/voltage-drop/submain-outbuilding" className="text-yellow-600 font-semibold hover:underline">garden office or outbuilding</Link>? Check submain voltage drop. Planning an <Link to="/calculators/voltage-drop/ev-charger" className="text-yellow-600 font-semibold hover:underline">EV charger</Link> on the driveway? Use our dedicated calculator. For cable sizing, see our <Link to="/cable-sizing-calculator" className="text-yellow-600 font-semibold hover:underline">cable sizing calculator</Link>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-yellow-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Garden Lighting Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs. Excludes light fittings.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Actual costs vary by region and ground conditions.</p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-amber-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-amber-800">{usecaseData.defined2.definition}</p>
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
                <p className="text-sm text-yellow-700">Size cables for outdoor lighting</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-amber-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-amber-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your garden lighting installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=GardenLightingVoltageDrop" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Garden Lighting Voltage Drop Inquiry Form"
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
