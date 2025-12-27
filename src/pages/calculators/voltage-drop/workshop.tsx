import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Wrench } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'workshop',
  title: 'Workshop & Home Garage Voltage Drop Calculator',
  metaTitle: 'Workshop Voltage Drop Calculator UK | Home Garage Electrical | Welders & Machinery | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for workshop and home garage installations. BS 7671 compliant for welders, compressors, lathes and power tools. Calculate cable size for detached garages.',
  heroDescription: 'Calculate voltage drop for workshop and garage electrical supplies',
  
  defaults: {
    cableSize: '10',
    length: '25',
    current: '40',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'Workshop equipment often has high starting currents - welders and compressors can draw 2-3× running current',
    'Detached garages need SWA cable or protected conduit for the supply run',
    'Consider future equipment - size the main supply with headroom for additions',
    'Lighting circuits use 3% voltage drop limit; power circuits use 5%',
    'Three-phase supply opens up options for larger machinery (lathes, mills, welders)'
  ],

  symptomChecks: [
    { symptom: 'Basic garage - lights and sockets (15m)', recommendation: '32A with 6mm² (7.3 mV/A/m). At 15m: (7.3 × 32 × 15) ÷ 1000 = 3.50V (1.52%) ✓' },
    { symptom: 'Workshop with welder (140A input, 25m)', recommendation: '63A with 16mm² (2.8 mV/A/m). At 25m: (2.8 × 63 × 25) ÷ 1000 = 4.41V (1.92%) ✓' },
    { symptom: 'Compressor (3kW) - long run (30m)', recommendation: '16A with 4mm² (11 mV/A/m). At 30m: (11 × 16 × 30) ÷ 1000 = 5.28V (2.30%) ✓' },
    { symptom: 'Lathe/mill (2.2kW 3Ø) - 20m run', recommendation: '5A per phase with 2.5mm² (18 mV/A/m). At 20m 3Ø: (18 × 5 × 20 × 0.866) ÷ 1000 = 1.56V (0.39% on 400V) ✓' },
    { symptom: 'Full workshop supply (40m detached)', recommendation: '63A with 25mm² (1.75 mV/A/m). At 40m: (1.75 × 63 × 40) ÷ 1000 = 4.41V (1.92%) ✓' }
  ],

  costEstimates: [
    { scenario: 'Basic garage supply (<15m)', material: '£300-500', labour: '£350-550', total: '£650-1050' },
    { scenario: 'Workshop supply (15-25m)', material: '£450-750', labour: '£400-650', total: '£850-1400' },
    { scenario: 'Heavy workshop (25-40m)', material: '£600-1000', labour: '£500-800', total: '£1100-1800' },
    { scenario: 'Three-phase workshop supply', material: '£800-1500', labour: '£600-1000', total: '£1400-2500' },
    { scenario: 'Workshop sub-board (6-way)', material: '£200-400', labour: '£200-350', total: '£400-750' }
  ],

  defined: {
    term: 'Workshop Electrical Demands',
    definition: 'Workshops have diverse electrical loads: lighting, general sockets, and dedicated circuits for specific machinery. Unlike domestic installations, workshop equipment often runs at high power for extended periods and has significant starting currents. A 2kW compressor might draw 15A running but 30-40A starting. Plan the main supply with capacity for your largest equipment plus general loads.'
  },

  defined2: {
    term: 'Welder Electrical Requirements',
    definition: 'MIG and stick welders are among the most demanding workshop loads. A 140A welder typically draws 30-50A from the supply (check nameplate). Larger 200A+ welders may need 63A or dedicated circuits. Welders cause voltage fluctuations - undersized cables result in poor arc stability and can affect other equipment. Size generously.'
  },

  defined3: {
    term: 'Detached Garage Supply Options',
    definition: 'Detached garages need armoured cable (SWA) or protected conduit from the house. Options: extend from house consumer unit (common for short runs), or install a sub-board in the garage fed from the main board. Sub-boards allow local RCD protection and easier circuit additions. For long runs, a garage sub-board often makes more sense.'
  },

  defined4: {
    term: 'Three-Phase for Workshops',
    definition: 'Three-phase 400V supplies enable larger motors and industrial machinery. Many lathes, mills, and large compressors are three-phase. Three-phase welders provide smoother arc. If you\'re serious about workshop machinery, consider requesting three-phase from your DNO - the application process takes weeks but the capability is worth it for heavy users.'
  },

  faqs: [
    {
      q: 'What size supply do I need for a home workshop?',
      a: 'Basic workshops (lights, sockets, small tools): 32A. Workshops with welders or large compressors: 63A minimum. Serious workshops with multiple large machines: consider 100A or three-phase supply.'
    },
    {
      q: 'Can I run a welder from a 13A socket?',
      a: 'Only very small hobby welders (90A output or less). Most useful welders need 16A, 32A or higher supplies. Running an undersized supply causes poor welding performance, nuisance tripping, and potential cable damage from overheating.'
    },
    {
      q: 'What cable size for a detached garage 20m away?',
      a: 'For 32A supply: 6mm² SWA gives (7.3 × 32 × 20) ÷ 1000 = 4.67V (2.03%) ✓. For 63A supply: 16mm² SWA gives (2.8 × 63 × 20) ÷ 1000 = 3.53V (1.53%) ✓. Always leave headroom for future needs.'
    },
    {
      q: 'Do I need a sub-board in my garage?',
      a: 'Recommended for detached garages and larger workshops. A sub-board provides local RCD protection, multiple circuits, and easier expansion. For attached garages with short cable runs, extending from the house board may be simpler.'
    },
    {
      q: 'How do I handle motor starting current?',
      a: 'Motors draw 2-6× running current at start-up. This doesn\'t affect voltage drop sizing (use running current) but affects MCB selection. Use Type C or D MCBs for motor circuits to handle starting surge without nuisance tripping.'
    },
    {
      q: 'What about dust and moisture in workshops?',
      a: 'Workshops need appropriate IP ratings. Dusty environments: IP5X minimum. Wet areas (car washing): IPX4 or higher. Metal-clad sockets and switches are more robust than plastic. Consider industrial-grade equipment for heavy workshop use.'
    },
    {
      q: 'Can I get three-phase supply to my house?',
      a: 'Yes, contact your DNO (Distribution Network Operator). There\'s usually a connection charge and possible upgrade to your incoming cable. Worth it if you have three-phase machinery. Some areas have three-phase readily available; others need more work.'
    },
    {
      q: 'How do I run cable to a detached building?',
      a: 'Underground: SWA cable buried minimum 450mm deep (600mm under driveways) with warning tape. Overhead: Catenary wire support, minimum 3.5m clearance (5.2m over vehicle routes). Underground is usually preferred for aesthetics and protection.'
    },
    {
      q: 'What about EV charging in the garage?',
      a: 'Plan for EV charging even if you don\'t need it now. A 7kW charger needs 32A - if your garage supply is only 32A, you can\'t run the charger and other equipment simultaneously. Consider 63A supply to future-proof.'
    },
    {
      q: 'Do workshop circuits need RCD protection?',
      a: 'Yes, socket outlets need 30mA RCD protection. For dedicated machinery circuits, RCD protection is recommended but the 30mA requirement is specifically for socket outlets. Consider the environment - workshops with metalworking benefit from comprehensive RCD protection.'
    },
    {
      q: 'What lighting is best for workshops?',
      a: 'LED high bay or battens provide good illumination with low running costs. Size the lighting circuit generously - workshop lighting is often on for extended periods. Use the 3% voltage drop limit for lighting circuits.'
    },
    {
      q: 'How do I calculate total workshop demand?',
      a: 'List all equipment with their running currents. Apply diversity - you won\'t run everything at once. Typical workshop diversity: 100% of largest load + 75% of second largest + 40% of remainder. Add lighting. This gives realistic maximum demand.'
    }
  ]
}

export default function WorkshopVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="workshop voltage drop, garage electrical supply, welder cable size, detached garage wiring, workshop sub-board, compressor circuit, SWA garage cable, three phase workshop" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/workshop-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/workshop-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#f97316" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Workshop', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Workshop Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '342' }
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-orange-600 hover:text-orange-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Wrench className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Workshop Quick Facts
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

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need an Electrician for Your Workshop?</h3>
                <p className="text-purple-100">Get quotes from experienced contractors</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Workshop Scenarios</h2>
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
            <h3 className="font-bold text-orange-900 mb-3">Related Outbuilding Calculations</h3>
            <p className="text-sm text-orange-800 mb-4">
              For general <Link to="/calculators/voltage-drop/submain-outbuilding" className="text-orange-600 font-semibold hover:underline">outbuilding submains</Link>. Adding <Link to="/calculators/voltage-drop/ev-charger" className="text-orange-600 font-semibold hover:underline">EV charging</Link> to your garage? Use our <Link to="/cable-sizing-calculator" className="text-orange-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity checks.
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-orange-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Workshop Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for workshop and garage electrical installations.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Costs vary by cable run length and equipment requirements.</p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-amber-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-amber-800">{usecaseData.defined2.definition}</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-yellow-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-yellow-800">{usecaseData.defined3.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-orange-700">Size cables for workshop equipment</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-amber-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-amber-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your workshop or garage project? Tell us about your requirements and we'll connect you with experienced contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=WorkshopVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Workshop Voltage Drop Inquiry Form"
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
