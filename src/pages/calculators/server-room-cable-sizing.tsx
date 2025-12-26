import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Server } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'server-room-cable-sizing',
  title: 'Server Room & Comms Room Cable Sizing Calculator',
  metaTitle: 'Server Room Cable Size Calculator UK | Data Centre Electrical | BS 7671 | TradeCalcs',
  metaDescription: 'Free server room and comms room cable sizing calculator for UK electricians. Calculate correct cable size for IT equipment, UPS systems, and cooling. BS 7671 compliant.',
  heroDescription: 'Calculate the correct cable size for server rooms, data centres, and IT infrastructure',
  
  defaults: {
    loadType: 'amps' as const,
    current: '32',
    kW: '',
    length: '20',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'Server rooms need clean, filtered power supplies',
    'UPS systems require dedicated high-capacity circuits',
    'Cooling typically equals IT load (1:1 ratio)',
    'Redundant power feeds (A+B) standard for critical systems',
    'PDUs (Power Distribution Units) distribute to rack equipment'
  ],

  symptomChecks: [
    { symptom: 'Small office server room (2-4 racks)', recommendation: '32A-63A supply, single UPS, dedicated 32A circuits per rack' },
    { symptom: 'Medium data room (5-10 racks)', recommendation: '100A+ supply, dual UPS, A+B feeds to each rack' },
    { symptom: 'UPS system (10-20kVA)', recommendation: 'Dedicated 63A-100A circuit, bypass facility, battery room if separate' },
    { symptom: 'Precision cooling unit', recommendation: 'Dedicated circuit matching unit rating, typically 16A-32A per unit' },
    { symptom: 'Comms room (network equipment only)', recommendation: '16A-32A supply, small UPS, lower cooling requirement' }
  ],

  costEstimates: [
    { scenario: 'Small comms room (single rack)', material: '£500-1000', labour: '£600-1000', total: '£1100-2000' },
    { scenario: 'Server room (2-4 racks) electrical', material: '£2000-4000', labour: '£2500-4500', total: '£4500-8500' },
    { scenario: 'UPS installation (10kVA)', material: '£800-1500', labour: '£800-1400', total: '£1600-2900' },
    { scenario: 'Dual feed (A+B) installation', material: '£1500-3000', labour: '£1500-2500', total: '£3000-5500' },
    { scenario: 'Full server room fit-out (medium)', material: '£8000-15000', labour: '£8000-15000', total: '£16000-30000' }
  ],

  defined: {
    term: 'Server Room Cable Sizing',
    definition: 'Server room cable sizing calculates conductor sizes for IT infrastructure power distribution. Unlike standard commercial, data environments require clean power, redundancy, and capacity for peak loads plus cooling. Total load includes: IT equipment, UPS losses, cooling systems, and lighting - often 2-3x the IT load alone.'
  },

  defined2: {
    term: 'UPS and Power Conditioning',
    definition: 'Uninterruptible Power Supplies (UPS) provide battery backup and power conditioning for servers. Online UPS systems continuously condition power through inverters. UPS circuits must handle full load plus charging current. Bypass facilities allow maintenance without shutdown. Battery systems may need ventilated rooms.'
  },

  faqs: [
    {
      q: 'What size electrical supply does a server room need?',
      a: 'Depends on IT load and cooling. Rule of thumb: IT load in kW × 2.5 = total supply in kW (covers IT, cooling, UPS losses, and headroom). A 20kW IT load needs about 50kW supply, or approximately 72A three-phase. Always design for future growth.'
    },
    {
      q: 'How do I calculate server room power requirements?',
      a: 'Sum all IT equipment loads (from data sheets or power meters), add cooling (typically 1:1 with IT load), add UPS efficiency losses (10-15%), and add 30-50% growth headroom. A server drawing 2kW needs 2kW cooling plus UPS overhead.'
    },
    {
      q: 'What is A+B power distribution?',
      a: 'Critical servers have dual power supplies fed from independent sources (A and B feeds). Each feed must handle full load if the other fails. Separate circuits from separate UPS systems or utility feeds provide redundancy. Both feeds are live simultaneously.'
    },
    {
      q: 'What cable size for a server rack?',
      a: 'Modern racks vary from 3-20kW. A typical rack might draw 5-8kW (22-35A single phase, or 7-12A per phase on 3-phase). Most racks use 32A commando connections. High-density racks may need 63A or multiple 32A feeds.'
    },
    {
      q: 'Does each server need its own circuit?',
      a: 'No - servers connect to PDUs (Power Distribution Units) in the rack, which connect to the building power. Each rack typically has 1-2 PDUs on separate circuits (A+B). Critical servers have dual PSUs connecting to both PDUs for redundancy.'
    },
    {
      q: 'What about cooling power requirements?',
      a: 'Cooling power roughly equals IT power for traditional CRAC units (Coefficient of Performance ~1). Modern precision cooling achieves COP 2-3, reducing cooling power. A 20kW IT load needs 10-20kW cooling power depending on efficiency.'
    },
    {
      q: 'How do I size UPS circuits?',
      a: 'UPS input circuit must handle: protected load + battery charging current + UPS losses. A 10kVA UPS protecting 8kW load might draw 12kW during recharge (52A single phase). Oversize input circuit for inrush and charging periods.'
    },
    {
      q: 'What earthing is required for server rooms?',
      a: 'Clean earth for IT equipment, separate from building protective earth where possible. Equipment earth bars in each rack, master earth bar for room. Lightning protection and surge protection on incoming supplies. Attention to EMC and earth loops.'
    },
    {
      q: 'Do server rooms need special cable types?',
      a: 'Standard cables are fine for power distribution. Consider: LSOH (Low Smoke Zero Halogen) for fire safety, armoured cables if routing through other areas, and appropriate fire ratings. Structured cabling for data is separate discipline.'
    },
    {
      q: 'What regulations apply to server room electrical?',
      a: 'BS 7671 Wiring Regulations, plus: EN 50600 series for data centre infrastructure, ASHRAE guidelines for cooling, TIA-942 for data centre standards. Fire suppression integration and emergency power-off (EPO) requirements may apply.'
    }
  ],

  defined3: {
    term: 'Power Usage Effectiveness (PUE)',
    definition: 'PUE measures data centre energy efficiency: Total Facility Power ÷ IT Equipment Power. PUE of 2.0 means 50% of power goes to IT, 50% to cooling/overhead. Modern facilities target PUE 1.2-1.5. Electrical design impacts PUE through efficient distribution and cooling integration.'
  },

  defined4: {
    term: 'Emergency Power Off (EPO)',
    definition: 'EPO systems provide rapid power disconnection in emergencies (fire, flood, electrical fault). Red mushroom buttons at exits disconnect all power to the room. Must be carefully designed to not cause more damage than the emergency. UPS bypass may be integrated with EPO.'
  }
}

export default function ServerRoomCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="server room cable size, data centre electrical, comms room power, UPS cable sizing, IT room electrical, rack power distribution, PDU installation, BS 7671 data centre" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/server-room-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/server-room-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#4f46e5" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Server Room Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Server Room Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
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
                '@type': 'HowTo',
                'name': 'How to Size Cables for Server Room Installation',
                'description': 'Step-by-step guide to calculating cable sizes for server room and data centre electrical installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Calculate IT load', 'text': 'Sum all server, storage, and network equipment power requirements' },
                  { '@type': 'HowToStep', 'name': 'Add cooling load', 'text': 'Typically 1:1 ratio with IT load for traditional cooling' },
                  { '@type': 'HowToStep', 'name': 'Size UPS systems', 'text': 'Select UPS capacity with runtime requirements and efficiency losses' },
                  { '@type': 'HowToStep', 'name': 'Design distribution', 'text': 'Plan A+B feeds, PDU layout, and circuit allocation' },
                  { '@type': 'HowToStep', 'name': 'Size cables', 'text': 'Calculate cable sizes for each circuit with growth allowance' }
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

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Server className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <Server className="w-5 h-5" />
              Server Room Cable Quick Facts
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
            <CableSizingCalculatorCore
              defaultLoadType={usecaseData.defaults.loadType}
              defaultCurrent={usecaseData.defaults.current}
              defaultKW={usecaseData.defaults.kW}
              defaultLength={usecaseData.defaults.length}
              defaultMethod={usecaseData.defaults.method}
              defaultLighting={usecaseData.defaults.lighting}
            />
          </div>

          {/* CONTRACTOR LEAD CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need a Data Centre Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted contractors for your server room installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Server Room Installations</h2>
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

          {/* Internal linking section */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-3">Related Commercial & Cooling Calculations</h3>
            <p className="text-sm text-purple-800 mb-4">
              Server room cooling shares principles with <Link to="/calculators/cable-sizing/air-conditioning-cable-sizing" className="text-purple-600 font-semibold hover:underline">commercial air conditioning</Link> systems. For office spaces housing your comms room, see our <Link to="/calculators/cable-sizing/ring-main-socket-circuit-cable-sizing" className="text-purple-600 font-semibold hover:underline">socket circuit calculator</Link>. Larger facilities may need <Link to="/calculators/cable-sizing/commercial-kitchen-cable-sizing" className="text-purple-600 font-semibold hover:underline">three-phase distribution</Link> similar to commercial kitchens.
            </p>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-indigo-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-indigo-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Server Room Electrical Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs for electrical infrastructure. Excludes IT equipment and structured cabling.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Costs vary significantly by redundancy level and capacity requirements.</p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-purple-800">{usecaseData.defined2.definition}</p>
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

          <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-indigo-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-indigo-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/calculators/cable-sizing/air-conditioning-cable-sizing" className="block p-4 bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-sky-900 mb-1">Air Conditioning</h3>
                <p className="text-sm text-sky-700">Cooling system electrics</p>
              </Link>
              <Link to="/calculators/cable-sizing/cctv-security-cable-sizing" className="block p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-indigo-900 mb-1">CCTV & Security</h3>
                <p className="text-sm text-indigo-700">Server room security</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Critical for IT power quality</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Specialist Electricians</h3>
              <p className="text-gray-700">
                Looking for an electrician experienced in server room installations? Tell us about your project and we'll connect you with vetted contractors. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ServerRoomCableSizing" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="Get Electrician Quotes"
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
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
