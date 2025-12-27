import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Server } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'server-room',
  title: 'Server Room & Data Centre Voltage Drop Calculator',
  metaTitle: 'Server Room Voltage Drop Calculator UK | Data Centre UPS | Critical Power | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for server rooms and data centres. BS 7671 compliant for UPS feeds, PDUs, critical power and redundant distribution. Keep voltage drop under 2-3%.',
  heroDescription: 'Calculate voltage drop for server rooms and data centres with critical power requirements',
  
  defaults: {
    cableSize: '35',
    length: '30',
    current: '100',
    circuitType: 'power' as const,
    phase: 'three' as const
  },

  keyFacts: [
    'IT equipment is sensitive to voltage - keep voltage drop under 2-3% (stricter than BS 7671 minimum)',
    'UPS systems have input voltage tolerances - check manufacturer specifications',
    'Redundant A+B feeds mean double the cabling but ensure continuous operation',
    'PDU (Power Distribution Unit) location affects final circuit voltage drop',
    'Three-phase distribution is standard for server rooms over 10kW'
  ],

  symptomChecks: [
    { symptom: 'UPS input feed (20m from main DB)', recommendation: '100A with 35mm² (1.25 mV/A/m). At 20m 3Ø: (1.25 × 100 × 20 × 0.866) ÷ 1000 = 2.17V (0.54% on 400V) ✓ excellent' },
    { symptom: 'PDU feed from UPS output (15m)', recommendation: '63A with 16mm² (2.8 mV/A/m). At 15m 3Ø: (2.8 × 63 × 15 × 0.866) ÷ 1000 = 2.29V (0.57% on 400V) ✓' },
    { symptom: 'Rack PDU to server (3m single-phase)', recommendation: '16A with 2.5mm² (18 mV/A/m). At 3m: (18 × 16 × 3) ÷ 1000 = 0.86V (0.37%) ✓' },
    { symptom: 'Cooling system feed (25m 3Ø)', recommendation: '40A with 10mm² (4.4 mV/A/m). At 25m 3Ø: (4.4 × 40 × 25 × 0.866) ÷ 1000 = 3.81V (0.95% on 400V) ✓' },
    { symptom: 'Long run to remote comms room (50m)', recommendation: '32A with 10mm² (4.4 mV/A/m). At 50m: (4.4 × 32 × 50) ÷ 1000 = 7.04V (3.06%) ⚠ borderline for IT' }
  ],

  costEstimates: [
    { scenario: 'Small server room (10kVA UPS)', material: '£3000-6000', labour: '£2000-4000', total: '£5000-10000' },
    { scenario: 'Medium server room (30kVA UPS)', material: '£8000-15000', labour: '£5000-10000', total: '£13000-25000' },
    { scenario: 'Data centre row (100kVA)', material: '£25000-50000', labour: '£15000-30000', total: '£40000-80000' },
    { scenario: 'Redundant A+B distribution', material: '£15000-35000', labour: '£10000-20000', total: '£25000-55000' },
    { scenario: 'CRAC/cooling system electrical', material: '£5000-12000', labour: '£3000-8000', total: '£8000-20000' }
  ],

  defined: {
    term: 'Critical Power Distribution',
    definition: 'Server rooms require reliable power with minimal voltage variation. Critical power distribution typically includes: UPS (Uninterruptible Power Supply) to bridge mains failures, STS (Static Transfer Switch) for source changeover, and redundant A+B feeds to racks. Voltage drop in this chain must be minimised - equipment may malfunction at the edges of its input voltage tolerance.'
  },

  defined2: {
    term: 'UPS Input Voltage Requirements',
    definition: 'UPS systems have input voltage windows, typically 176-276V for single-phase or 304-478V for three-phase. Outside this range, the UPS transfers to battery (or fails to sync for double-conversion units). Excessive voltage drop on the UPS input can cause unnecessary battery cycling or transfer failures. Keep UPS input voltage drop under 2% for reliable operation.'
  },

  defined3: {
    term: 'Redundant A+B Power Distribution',
    definition: 'Critical IT equipment has dual power supplies fed from independent A and B distribution paths. Each path typically has its own UPS, distribution board, and cabling. If one path fails, the other maintains power without interruption. Both paths must be sized for full load (no diversity) as either may carry all equipment during maintenance or failure scenarios.'
  },

  defined4: {
    term: 'PDU Types and Positioning',
    definition: 'Power Distribution Units (PDUs) distribute power within racks. Basic PDUs are glorified power strips; intelligent PDUs provide metering and remote switching. Floor-mount or rack-mount PDUs can be positioned to minimise final circuit lengths to servers. Horizontal PDUs in each rack give shortest server connections. Voltage drop from building distribution to PDU input must be calculated.'
  },

  faqs: [
    {
      q: 'Why is 2-3% voltage drop recommended for server rooms instead of 5%?',
      a: 'IT equipment power supplies have narrower input voltage tolerances than general equipment. Servers may report power warnings or shut down near the edges of their operating range. Keeping voltage drop under 2-3% provides margin for supply voltage variation and UPS transfer events.'
    },
    {
      q: 'How do I size cables for UPS input feeds?',
      a: 'Size for UPS rated input current at full load plus any battery charging current. Check UPS specifications - some units draw higher current when simultaneously running load and charging batteries. Apply the stricter 2% voltage drop target, not the BS 7671 5% limit.'
    },
    {
      q: 'Does the UPS affect voltage drop to IT equipment?',
      a: 'Online double-conversion UPS regenerates clean output regardless of input voltage drop (within tolerance). The UPS output is a new starting point for downstream voltage drop calculation. Total drop from UPS output to server should be under 2%.'
    },
    {
      q: 'How do I calculate power requirements for a server room?',
      a: 'Sum the rated power of all IT equipment (servers, storage, network). Add 20-30% for future growth. Add cooling load (typically 0.5-1.0× IT load for CRAC units). The result is total electrical load - UPS and distribution must handle this plus any power factor considerations.'
    },
    {
      q: 'What about voltage drop in raised floor cable runs?',
      a: 'Cables routed under raised floors often take indirect paths around other services. Measure actual cable route length, not straight-line distance. Add margin for future cable movement or re-routing during maintenance.'
    },
    {
      q: 'Should I use single-phase or three-phase distribution?',
      a: 'Three-phase distribution is standard for server rooms over 10kW. It reduces cable sizes, improves efficiency, and provides better voltage regulation. Most UPS systems above 10kVA are three-phase. Single-phase is acceptable for small comms rooms.'
    },
    {
      q: 'How do I handle redundant A+B power sizing?',
      a: 'Each A and B path must be capable of carrying the entire load independently - there\'s no diversity between redundant paths. If server room draws 50A per phase, both A and B distributions need 50A capacity each (100A total installed, but only 50A maximum simultaneous load).'
    },
    {
      q: 'What cable type for server room power distribution?',
      a: 'LSOH (Low Smoke Zero Halogen) cable is preferred in enclosed spaces with valuable equipment. Fire-rated cables may be required for supplies crossing fire compartments. SWA is used for main feeds; flex for final connections to equipment.'
    },
    {
      q: 'How does power factor correction affect server room design?',
      a: 'Modern server power supplies have active PFC (Power Factor Correction) with PF close to unity. Older equipment may have poor power factor (0.7-0.8), increasing current draw for the same real power. Check equipment specifications and size accordingly.'
    },
    {
      q: 'What about earth leakage in server room circuits?',
      a: 'IT equipment can have significant earth leakage current (typically 1-3mA per device) due to EMC filters. Cumulative leakage from many devices may trip 30mA RCDs. Use Type B RCDs for DC leakage capability, or design circuits to limit devices per RCD.'
    },
    {
      q: 'How do I maintain power during electrical work?',
      a: 'Redundant A+B distribution allows one path to be isolated while the other maintains power. Ensure IT equipment automatically transfers load (most do). Plan work carefully - the remaining path must have adequate capacity. Never work on both paths simultaneously.'
    },
    {
      q: 'What monitoring is needed for server room power?',
      a: 'Monitor: mains supply voltage and frequency, UPS input/output/battery status, PDU current per phase, and individual outlet power on intelligent PDUs. Alarms should trigger for voltage excursions, overload conditions, and UPS transfer events.'
    }
  ]
}

export default function ServerRoomVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="server room voltage drop, data centre cable sizing, UPS power distribution, PDU installation, critical power, redundant power, IT power, comms room electrical" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/server-room-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/server-room-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#6366f1" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Server Room', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Server Room Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '198' }
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Server className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-violet-100 border-2 border-violet-500 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-violet-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-violet-900">⚠️ TIGHTER VOLTAGE DROP RECOMMENDED FOR IT EQUIPMENT</p>
                <p className="text-sm text-violet-800">While BS 7671 allows 5%, IT equipment works best with under 2-3% voltage drop. Calculate total drop from supply to rack.</p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <Server className="w-5 h-5" />
              Server Room Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-indigo-900">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
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
                <h3 className="text-xl font-bold mb-1">Need a Data Centre Electrician?</h3>
                <p className="text-purple-100">Get quotes from contractors experienced in critical power installations</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Server Room Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-indigo-900 mb-3">Related Power Calculations</h3>
            <p className="text-sm text-indigo-800 mb-4">
              For <Link to="/calculators/voltage-drop/three-phase-motor" className="text-indigo-600 font-semibold hover:underline">cooling system motors</Link> and CRAC units. <Link to="/calculators/voltage-drop/warehouse" className="text-indigo-600 font-semibold hover:underline">Warehouse distribution</Link> principles apply to large data halls. Use our <Link to="/cable-sizing-calculator" className="text-indigo-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity.
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 border border-indigo-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-indigo-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-indigo-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Server Room Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for server room and data centre electrical installations.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-indigo-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. UPS and cooling equipment costs are additional.</p>
          </div>

          <div className="bg-violet-50 border-l-4 border-violet-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-violet-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-violet-800">{usecaseData.defined2.definition}</p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-purple-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-purple-800">{usecaseData.defined3.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-indigo-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-indigo-700">Size cables for critical power capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-violet-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-violet-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Data Centre Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your server room or data centre project? Tell us about your project and we'll connect you with experienced contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ServerRoomVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Server Room Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-indigo-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
