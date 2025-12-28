import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Flame } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'sauna-cable-sizing',
  title: 'Sauna Cable Sizing Calculator',
  metaTitle: 'Sauna Cable Size Calculator UK | Electric Sauna Heater | BS 7671 | TradeCalcs',
  metaDescription: 'Free sauna cable sizing calculator for UK electricians. Calculate correct cable size for electric sauna heaters 4.5kW to 18kW. BS 7671 compliant with heat-resistant cable requirements.',
  heroDescription: 'Calculate the correct cable size for electric sauna heater installations',
  
  defaults: {
    loadType: 'kw' as const,
    current: '',
    kW: '9',
    length: '12',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'Domestic saunas typically 4.5kW-9kW (20A-40A)',
    'Commercial saunas may need 12kW-18kW (52A-78A)',
    'Heat-resistant cable required within sauna room',
    'Dedicated circuit with local isolator essential',
    'External sauna control unit for temperature regulation'
  ],

  symptomChecks: [
    { symptom: 'Small home sauna (4.5kW)', recommendation: '20A MCB, 4mm² standard cable to control, heat-resistant within sauna' },
    { symptom: 'Medium home sauna (6-9kW)', recommendation: '32A-40A MCB, 6mm² or 10mm² cable depending on length' },
    { symptom: 'Large home sauna (9-12kW)', recommendation: '40A-50A MCB, 10mm² cable, may need consumer unit upgrade' },
    { symptom: 'Commercial sauna (12-18kW)', recommendation: '63A+ circuit, possibly 3-phase for larger units' },
    { symptom: 'Outdoor/garden sauna cabin', recommendation: 'SWA cable for buried run, heat-resistant within cabin' }
  ],

  costEstimates: [
    { scenario: 'Small sauna (4.5kW), short run', material: '£100-180', labour: '£180-300', total: '£280-480' },
    { scenario: 'Medium sauna (6-9kW), typical install', material: '£150-280', labour: '£250-400', total: '£400-680' },
    { scenario: 'Large sauna (9-12kW)', material: '£200-350', labour: '£300-480', total: '£500-830' },
    { scenario: 'Outdoor sauna cabin with SWA', material: '£300-500', labour: '£400-600', total: '£700-1100' },
    { scenario: 'Heat-resistant cable (per metre)', material: '£8-15', labour: 'Included', total: '£8-15/m' }
  ],

  defined: {
    term: 'Sauna Cable Sizing',
    definition: 'Sauna cable sizing determines the conductor cross-sectional area (mm²) needed to safely supply an electric sauna heater. Saunas have specific requirements: heat-resistant cable within the hot room (rated 170°C+), external control unit positioning, and appropriate circuit protection. The supply cable to the control unit can be standard cable.'
  },

  defined2: {
    term: 'Heat-Resistant Sauna Cable',
    definition: 'Standard PVC cables are rated to 70°C and will fail in sauna conditions (80-100°C). Within the sauna room, heat-resistant silicone or PTFE insulated cable rated to 170-180°C must be used. This special cable runs from the control unit to the heater. Standard cable can be used from the consumer unit to the control unit outside the hot room.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a 9kW sauna?',
      a: 'A 9kW sauna draws 39A at 230V. You need 10mm² cable on a 40A or 45A circuit for most installations. For runs over 20m, check voltage drop. Heat-resistant cable is only needed for the section within the sauna room itself.'
    },
    {
      q: 'Do I need special cable inside the sauna?',
      a: 'Yes, heat-resistant cable rated to 170°C+ is essential within the sauna room. Standard PVC cable (70°C rating) will degrade and fail. The heat-resistant section runs from the control unit (outside) to the heater (inside). It\'s typically silicone insulated.'
    },
    {
      q: 'Where should the sauna control unit be located?',
      a: 'The control unit must be outside the sauna room in a dry location. Typically mounted on the wall just outside the sauna door or in an adjacent room. This keeps electronics cool and allows temperature adjustment without entering the hot room.'
    },
    {
      q: 'What MCB rating for a sauna heater?',
      a: 'MCB rating depends on heater power: 4.5kW = 20A, 6kW = 32A, 9kW = 40A, 12kW = 50A. Type B MCBs are suitable for resistive heating loads. Larger saunas may need Type C if motor-driven controls are included.'
    },
    {
      q: 'Do saunas need RCD protection?',
      a: 'Yes, 30mA RCD protection is required. Some sauna control units include integrated RCD protection, but external RCD at the consumer unit is still recommended. For outdoor saunas, RCD protection is mandatory for the outdoor circuit.'
    },
    {
      q: 'Can I install a sauna on a standard 13A socket?',
      a: 'Only very small portable saunas (up to about 2.5kW) can use 13A sockets. Most fixed sauna heaters require hardwired connections on dedicated circuits. A proper installation with appropriate cable sizing and protection is essential for safety.'
    },
    {
      q: 'What about outdoor or garden saunas?',
      a: 'Outdoor saunas need SWA cable for the buried run to the cabin, then heat-resistant cable within. An outdoor isolator switch is required. The installation must comply with both outdoor circuit requirements and sauna-specific requirements.'
    },
    {
      q: 'Do I need three-phase for a large sauna?',
      a: 'Commercial saunas over 12kW may benefit from three-phase supply, spreading the load across phases. Most domestic saunas up to 12kW work on single-phase. Check if your property has three-phase available before specifying large commercial heaters.'
    },
    {
      q: 'Is Part P notification required for sauna installation?',
      a: 'Yes, installing a new sauna circuit is notifiable under Part P Building Regulations. The work involves a new circuit and potentially special location requirements. It must be done by a registered competent person or inspected by Building Control.'
    },
    {
      q: 'How long should heat-resistant cable be?',
      a: 'Only the section within the sauna room needs heat-resistant cable - typically 2-4 metres from where the cable enters the room to the heater terminals. The cable from consumer unit to the control unit (outside the room) can be standard cable.'
    }
  ],

  defined3: {
    term: 'Sauna Heater Power Sizing',
    definition: 'Sauna heater power is typically calculated at 1kW per cubic metre of sauna room volume, with adjustments for insulation quality and window area. A 2m × 2m × 2m sauna (8m³) typically needs an 8-9kW heater. Undersized heaters struggle to reach temperature; oversized heaters waste energy.'
  },

  defined4: {
    term: 'Sauna Electrical Safety',
    definition: 'Sauna installations must comply with BS 7671 and manufacturer requirements. Key safety points: heat-resistant cable within hot zone, control unit outside hot room, local isolation switch, RCD protection, and appropriate IP-rated accessories. The combination of heat and humidity requires careful equipment selection.'
  }
}

export default function SaunaCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="sauna cable size, electric sauna heater cable, sauna electrical installation, heat resistant cable, sauna electrician, BS 7671 sauna, home sauna electrical" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/sauna-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/sauna-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#1d4ed8" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Sauna Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Sauna Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '412' }
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
                '@type': 'HowTo',
                'name': 'How to Size Cable for Sauna Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for electric sauna heater installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Determine heater size', 'text': 'Check sauna heater kW rating from manufacturer specifications' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run', 'text': 'Measure from consumer unit to control unit location' },
                  { '@type': 'HowToStep', 'name': 'Calculate standard cable size', 'text': 'Size cable for the run to the control unit' },
                  { '@type': 'HowToStep', 'name': 'Specify heat-resistant cable', 'text': 'Measure heat-resistant cable needed within sauna room' },
                  { '@type': 'HowToStep', 'name': 'Plan protection and isolation', 'text': 'Specify MCB rating, RCD, and local isolator switch' }
                ]
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
          <Link to="/cable-sizing-calculators" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Cable Sizing Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Flame className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Sauna Cable Quick Facts
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
            <CableSizingCalculatorCore
              defaultLoadType={usecaseData.defaults.loadType}
              defaultCurrent={usecaseData.defaults.current}
              defaultKW={usecaseData.defaults.kW}
              defaultLength={usecaseData.defaults.length}
              defaultMethod={usecaseData.defaults.method}
              defaultLighting={usecaseData.defaults.lighting}
            />          </div>

          {/* CONTRACTOR LEAD CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need a Qualified Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted, local contractors for your sauna installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Sauna Installations</h2>
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

          {/* Internal linking section */}
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-cyan-900 mb-3">Complete Your Wellness Installation</h3>
            <p className="text-sm text-cyan-800 mb-4">
              Saunas often pair with <Link to="/calculators/cable-sizing/hot-tub-cable-sizing" className="text-cyan-600 font-semibold hover:underline">hot tub installations</Link> for complete home wellness. For outdoor sauna cabins, our <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="text-cyan-600 font-semibold hover:underline">garden building cable guide</Link> covers SWA burial requirements. Electric <Link to="/calculators/cable-sizing/electric-shower-cable-sizing" className="text-cyan-600 font-semibold hover:underline">shower circuits</Link> use similar sizing principles.
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-amber-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-amber-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sauna Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK electrical installation costs. Does not include sauna cabin or heater unit.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-amber-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Heat-resistant cable is more expensive than standard cable.</p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-orange-800">{usecaseData.defined2.definition}</p>
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

          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-purple-800">{usecaseData.defined4.definition}</p>
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
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/calculators/cable-sizing/hot-tub-cable-sizing" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Hot Tub & Spa</h3>
                <p className="text-sm text-cyan-700">Complete wellness installation</p>
              </Link>
              <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">Garden Buildings</h3>
                <p className="text-sm text-green-700">Outdoor sauna cabin supplies</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-blue-700">Check long cable runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your sauna installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=SaunaCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Sauna Cable Sizing Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
             <p className="text-center text-sm text-gray-600">
  <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
</p>
            </div>
          </div>

          <div className="bg-amber-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-amber-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
