import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Waves } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'swimming-pool-cable-sizing',
  title: 'Swimming Pool Cable Sizing Calculator',
  metaTitle: 'Swimming Pool Cable Size Calculator UK | Pool Pump Heater | BS 7671 Section 702 | TradeCalcs',
  metaDescription: 'Free swimming pool cable sizing calculator for UK electricians. Calculate correct cable size for pool pumps, heaters, and lighting. BS 7671 Section 702 compliant.',
  heroDescription: 'Calculate the correct cable size for swimming pool pumps, heaters, and equipment',
  
  defaults: {
    loadType: 'amps' as const,
    current: '32',
    kW: '',
    length: '20',
    method: 'D',
    lighting: false
  },

  keyFacts: [
    'BS 7671 Section 702 covers swimming pool electrical requirements',
    'Zone system defines equipment placement restrictions',
    'Supplementary equipotential bonding essential',
    'Pool pumps typically 0.5-3HP (0.4-2.2kW)',
    'Electric pool heaters 3-18kW - major load consideration'
  ],

  symptomChecks: [
    { symptom: 'Pool pump only (0.75-1.5kW)', recommendation: '16A circuit, 2.5mm² or 4mm² cable depending on distance' },
    { symptom: 'Pool pump + filter system', recommendation: '16A-20A circuit, consider dedicated pool board' },
    { symptom: 'Electric pool heater (6-12kW)', recommendation: '32A-50A dedicated circuit, 6mm²-10mm² cable' },
    { symptom: 'Full pool system (pump, heater, lights)', recommendation: 'Dedicated pool consumer unit, submain supply' },
    { symptom: 'Swim spa / endless pool', recommendation: 'Check manufacturer specs - typically 32A-63A supply' }
  ],

  costEstimates: [
    { scenario: 'Pool pump circuit only', material: '£100-200', labour: '£200-350', total: '£300-550' },
    { scenario: 'Pool heater circuit (6-12kW)', material: '£150-300', labour: '£250-400', total: '£400-700' },
    { scenario: 'Pool consumer unit + submain', material: '£300-500', labour: '£400-650', total: '£700-1150' },
    { scenario: 'Underwater lighting circuit', material: '£150-300', labour: '£250-400', total: '£400-700' },
    { scenario: 'Equipotential bonding', material: '£100-200', labour: '£150-300', total: '£250-500' }
  ],

  defined: {
    term: 'Swimming Pool Cable Sizing',
    definition: 'Pool cable sizing determines the conductor cross-sectional area (mm²) needed for pool equipment while complying with BS 7671 Section 702. Pools are special locations with specific zone requirements, bonding requirements, and restrictions on equipment placement. Cable routes must avoid zones 0, 1, and 2 where possible.'
  },

  defined2: {
    term: 'Pool Zone System (BS 7671 Section 702)',
    definition: 'Zone 0 is inside the pool basin. Zone 1 extends 2m horizontally from pool edge and 2.5m above floor level. Zone 2 extends a further 1.5m horizontally. Each zone has restrictions on what equipment and wiring can be installed. Only SELV (12V) equipment in zones 0 and 1.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a pool pump?',
      a: 'Most domestic pool pumps (0.75-1.5kW) need 2.5mm² or 4mm² cable on a 16A circuit. Distance is important - pools are often 15-30m from the house. Calculate voltage drop for the cable length. Type C MCB recommended for motor loads.'
    },
    {
      q: 'Do I need a separate consumer unit for the pool?',
      a: 'For comprehensive pool installations (pump, heater, lights, covers), a dedicated pool consumer unit is recommended. It provides local isolation, easier fault finding, and room for expansion. Connect via submain from the house.'
    },
    {
      q: 'What is supplementary equipotential bonding?',
      a: 'All extraneous conductive parts within zones 0, 1, and 2 must be bonded together. This includes pool ladders, handrails, reinforcement in concrete, metal pipes, and equipment. Use 4mm² minimum bonding conductors connected to the main earthing terminal.'
    },
    {
      q: 'Can I use standard lighting near a pool?',
      a: 'No, lighting in zones 0 and 1 must be SELV (Safety Extra Low Voltage - typically 12V). The transformer must be outside zones 0, 1, and 2. Zone 2 can have IP rated mains lighting. Standard domestic lighting fixtures are not suitable.'
    },
    {
      q: 'What about electric pool heaters?',
      a: 'Electric pool heaters are 3-18kW depending on pool size. A 12kW heater needs a 50A circuit with 10mm² cable. They run for extended periods so voltage drop is critical. Heat pumps are more efficient alternatives with lower electrical loads.'
    },
    {
      q: 'Do pool circuits need RCD protection?',
      a: 'Yes, all circuits in pool areas require 30mA RCD protection. This includes pump circuits, lighting, and any socket outlets. The RCD can be at the main consumer unit or in a dedicated pool board.'
    },
    {
      q: 'What IP rating is needed for pool equipment?',
      a: 'Zone 0: IPX8 minimum. Zone 1: IPX5 minimum (IPX4 if no water jets). Zone 2: IPX4 minimum for indoor pools, IPX5 for outdoor. Equipment must be suitable for the specific zone it\'s installed in.'
    },
    {
      q: 'Can I install sockets near the pool?',
      a: 'Socket outlets are not permitted in zones 0, 1, or 2. In zone 2, only sockets supplying fixed equipment are allowed. General purpose sockets must be at least 3.5m from the pool edge (outside zone 2).'
    },
    {
      q: 'What about outdoor pools and SWA cable?',
      a: 'Outdoor pool installations typically use SWA cable for buried runs to the pool equipment housing. Minimum burial depth 450mm in gardens, 600mm under paths. Cable routes should avoid zones where possible.'
    },
    {
      q: 'Is Part P notification required for pool electrics?',
      a: 'Yes, swimming pool electrical work is notifiable under Part P as pools are special locations under BS 7671 Section 702. Work must be done by a registered competent person or inspected by Building Control.'
    }
  ],

  defined3: {
    term: 'Pool Heat Pump vs Electric Heater',
    definition: 'Electric resistance heaters are simple but expensive to run (COP of 1). Pool heat pumps have COP of 4-6, meaning 4-6kW heat output per 1kW electrical input. A heat pump needs smaller electrical supply than equivalent heating capacity electric heater, plus lower running costs.'
  },

  defined4: {
    term: 'SELV Pool Lighting',
    definition: 'Safety Extra Low Voltage (SELV) systems operate at 12V AC or DC, limiting shock risk in wet environments. Pool lights in zones 0 and 1 must be SELV. The transformer supplying SELV must be outside zones 0, 1, and 2, with the secondary circuit having no connection to earth.'
  }
}

export default function SwimmingPoolCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="swimming pool cable size, pool pump cable calculator, pool heater electrical, BS 7671 Section 702, pool electrician, pool bonding, underwater lighting" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/swimming-pool-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/swimming-pool-cable-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Swimming Pool Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Swimming Pool Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '378' }
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
                'name': 'How to Size Cable for Swimming Pool Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for swimming pool electrical equipment.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'List pool equipment', 'text': 'Identify all electrical loads - pump, heater, lights, covers' },
                  { '@type': 'HowToStep', 'name': 'Calculate total load', 'text': 'Add up equipment loads with appropriate diversity' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run', 'text': 'Measure from house to pool equipment location' },
                  { '@type': 'HowToStep', 'name': 'Size cables', 'text': 'Size individual circuits and submain if needed' },
                  { '@type': 'HowToStep', 'name': 'Plan zones and bonding', 'text': 'Identify zone boundaries and bonding requirements' }
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
          <Link to="/cable-sizing-calculator" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Cable Sizing Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Waves className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Special location warning */}
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-red-900 mb-2">BS 7671 Section 702 - Special Location</h2>
                <p className="text-sm text-red-800">Swimming pools are classified as special locations with specific zone requirements, bonding requirements, and equipment restrictions. This calculator helps with cable sizing - full compliance requires understanding of all Section 702 requirements.</p>
              </div>
            </div>
          </div>

          <div className="bg-cyan-50 border-l-4 border-cyan-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-cyan-900 mb-3 flex items-center gap-2">
              <Waves className="w-5 h-5" />
              Swimming Pool Cable Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-cyan-900">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
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
                <p className="text-purple-100">Get quotes from vetted, local contractors for your swimming pool installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Pool Installations</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-700 font-bold text-sm">{i + 1}</span>
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
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-amber-900 mb-3">Complete Pool Area Installations</h3>
            <p className="text-sm text-amber-800 mb-4">
              Pool areas often include <Link to="/calculators/cable-sizing/hot-tub-cable-sizing" className="text-amber-600 font-semibold hover:underline">hot tubs and spas</Link> with similar zone requirements. For pool heating efficiency, consider our <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="text-amber-600 font-semibold hover:underline">heat pump calculator</Link> - pool heat pumps need smaller electrical supplies than resistance heaters. Pool houses may need <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="text-amber-600 font-semibold hover:underline">outbuilding electrical supplies</Link>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-cyan-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-cyan-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pool Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK electrical installation costs. Does not include pool equipment.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-cyan-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Complex installations with multiple circuits cost more.</p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-blue-800">{usecaseData.defined2.definition}</p>
          </div>

          <div className="bg-teal-50 border-l-4 border-teal-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-teal-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-teal-800">{usecaseData.defined3.definition}</p>
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
                <p className="text-sm text-cyan-700">Similar zone requirements</p>
              </Link>
              <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">Pool House Supply</h3>
                <p className="text-sm text-green-700">Outbuilding submains</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-blue-700">Essential for long pool runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your swimming pool installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=SwimmingPoolCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Swimming Pool Cable Sizing Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
  <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
</p>
            </div>
          </div>

          <div className="bg-cyan-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-cyan-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
