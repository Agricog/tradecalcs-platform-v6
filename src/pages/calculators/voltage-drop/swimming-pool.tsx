import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Waves } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'swimming-pool',
  title: 'Swimming Pool Voltage Drop Calculator',
  metaTitle: 'Swimming Pool Voltage Drop Calculator UK | Pool Electrical | BS 7671 Section 702 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for swimming pool installations. BS 7671 Section 702 compliant for pool pumps, lighting, heating and spa equipment with zone requirements.',
  heroDescription: 'Calculate voltage drop for swimming pool electrical installations with zone requirements',
  
  defaults: {
    cableSize: '6',
    length: '25',
    current: '25',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'BS 7671 Section 702 defines zones around pools with specific equipment restrictions',
    'Zone 0/1/2 have strict limitations on electrical equipment installation',
    'SELV (Safety Extra-Low Voltage) required for underwater equipment - max 12V AC',
    '30mA RCD protection mandatory for all pool circuits',
    'Supplementary equipotential bonding of all metalwork within 2m of pool'
  ],

  symptomChecks: [
    { symptom: 'Pool pump (1.5kW) - plant room 15m away', recommendation: '10A with 2.5mm² (18 mV/A/m). At 15m: (18 × 10 × 15) ÷ 1000 = 2.70V (1.17%) ✓' },
    { symptom: 'Pool pump (3kW) - plant room 25m away', recommendation: '16A with 4mm² (11 mV/A/m). At 25m: (11 × 16 × 25) ÷ 1000 = 4.40V (1.91%) ✓' },
    { symptom: 'Electric pool heater (9kW) - 20m run', recommendation: '40A with 10mm² (4.4 mV/A/m). At 20m: (4.4 × 40 × 20) ÷ 1000 = 3.52V (1.53%) ✓' },
    { symptom: 'Poolside lighting (Zone 2)', recommendation: 'Must be IP65 minimum, RCD protected. Calculate as lighting circuit (3% max). Check zone distances from pool edge.' },
    { symptom: 'Spa/hot tub supply (6kW)', recommendation: '26A with 6mm² (7.3 mV/A/m). At 15m: (7.3 × 26 × 15) ÷ 1000 = 2.85V (1.24%) ✓' }
  ],

  costEstimates: [
    { scenario: 'Pool pump circuit installation', material: '£300-600', labour: '£400-700', total: '£700-1300' },
    { scenario: 'Pool heater electrical supply', material: '£400-900', labour: '£500-900', total: '£900-1800' },
    { scenario: 'Poolside lighting (6-10 fittings)', material: '£800-2000', labour: '£600-1200', total: '£1400-3200' },
    { scenario: 'Complete pool plant room', material: '£1500-4000', labour: '£1200-2500', total: '£2700-6500' },
    { scenario: 'Supplementary bonding system', material: '£200-500', labour: '£300-600', total: '£500-1100' }
  ],

  defined: {
    term: 'BS 7671 Section 702 Pool Zones',
    definition: 'Section 702 defines zones around swimming pools: Zone 0 is inside the pool basin. Zone 1 extends 2m horizontally from pool edge and 2.5m vertically. Zone 2 extends a further 1.5m horizontally from Zone 1. Each zone has specific requirements for equipment IP ratings and what equipment is permitted. Only SELV equipment (12V AC max) is allowed in Zone 0. Equipment in Zone 1 must be specifically rated for the purpose.'
  },

  defined2: {
    term: 'SELV (Safety Extra-Low Voltage) for Pools',
    definition: 'SELV systems for pool installations use maximum 12V AC or 30V ripple-free DC. The transformer supplying SELV must be outside Zones 0, 1, and 2, typically in the plant room. Underwater lighting and other Zone 0/1 equipment must be SELV. This voltage level is considered safe even in water immersion conditions, providing shock protection even if insulation fails.'
  },

  defined3: {
    term: 'Supplementary Equipotential Bonding',
    definition: 'All exposed and extraneous conductive parts within Zones 0, 1, and 2 must be connected by supplementary bonding conductors. This includes: pool structure reinforcement, ladders, handrails, diving boards, water pipes, heating pipes, metallic cable sheaths, and any metalwork within 2m of the pool. Bonding equalises potential, preventing dangerous voltage differences between touchable surfaces.'
  },

  defined4: {
    term: 'Pool Plant Room Requirements',
    definition: 'Pool plant rooms house pumps, heaters, and control equipment outside the zoned areas. All equipment should be located here where possible - transformers for SELV lighting, heat pump units, dosing equipment, and the main distribution board for pool circuits. The plant room provides a safe location for electrical equipment with proper access for maintenance.'
  },

  faqs: [
    {
      q: 'What are the pool electrical zones and why do they matter?',
      a: 'Zone 0 is inside the pool - only 12V SELV equipment allowed. Zone 1 is 2m from pool edge - very restricted equipment. Zone 2 is 1.5m beyond Zone 1 - less restricted but still special requirements. Zone distances determine what equipment can be installed where.'
    },
    {
      q: 'What is SELV and why is it required for pools?',
      a: 'Safety Extra-Low Voltage (SELV) uses maximum 12V AC, which is safe even if you\'re immersed in water. At this voltage, dangerous current cannot flow through the body. All underwater equipment (lights, pumps in-pool) must be SELV with the transformer outside the zoned areas.'
    },
    {
      q: 'Can I install 230V socket outlets near a pool?',
      a: 'Socket outlets must be at least 3.5m from the pool edge (outside Zone 2). If closer is required for specific equipment, use SELV outlets only. All socket outlets near pools need 30mA RCD protection regardless of distance.'
    },
    {
      q: 'What IP rating is required for poolside equipment?',
      a: 'Zone 0: IPX8 minimum. Zone 1: IPX5 minimum (or IPX4 if splashing unlikely). Zone 2: IPX4 minimum for indoor, IPX5 for outdoor pools. Higher ratings are always acceptable and often preferred.'
    },
    {
      q: 'Do I need supplementary bonding for a fibreglass pool?',
      a: 'Fibreglass pool shells are non-conductive, but bonding is still required for all metalwork within the zones - ladders, handrails, reinforcement mesh, pipework, etc. The bonding system connects to the main earthing terminal.'
    },
    {
      q: 'What cable size for a pool pump?',
      a: 'Depends on pump power and cable length. A typical 1.5kW pump draws about 7A - 2.5mm² is adequate for short runs. For 3kW pumps (13A) or longer runs, use 4mm². Always check voltage drop, especially with longer plant room distances.'
    },
    {
      q: 'Can I run cables under the pool deck?',
      a: 'Cables in Zone 1 must be limited to those supplying equipment in that zone. Use mechanical protection (conduit or armoured cable). Avoid joints in zoned areas. Route cables to minimise length through zones where possible.'
    },
    {
      q: 'What about electric pool heaters?',
      a: 'Electric pool heaters (typically 6-18kW) are high-current loads located in the plant room. Size cables for both current and voltage drop. Three-phase may be needed for larger heaters. Heat pump pool heaters are more efficient but still need adequate supply cables.'
    },
    {
      q: 'Are hot tubs and swim spas covered by Section 702?',
      a: 'Yes, Section 702 applies to all basins for swimming including hot tubs, swim spas, paddling pools, and similar. The zone distances are measured from the edge of the water. Factory-built hot tubs may have reduced zone requirements if specifically designed and tested.'
    },
    {
      q: 'What RCD protection is required for pool circuits?',
      a: 'All circuits in Zones 0, 1, and 2 require 30mA RCD protection (Section 702.411.3.3). This includes lighting, pumps, and any other equipment. Socket outlets need individual RCDs. Consider supply from a dedicated pool distribution board with overall RCD.'
    },
    {
      q: 'Can I install an electric sauna near a pool?',
      a: 'Saunas near pools must comply with both Section 702 (pools) and Section 703 (saunas). Keep sauna equipment outside pool zones. The sauna heater has its own special requirements for temperature ratings and installation distances.'
    },
    {
      q: 'How often should pool electrical systems be tested?',
      a: 'BS 7671 recommends maximum 1-year inspection intervals for swimming pools (Appendix 3). Visual checks of bonding connections and RCD function tests should be more frequent - monthly is good practice. Professional inspection annually.'
    }
  ]
}

export default function SwimmingPoolVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="swimming pool voltage drop, pool electrical installation, BS 7671 section 702, pool pump cable size, SELV pool lighting, hot tub electrical, pool zones, supplementary bonding pool" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/swimming-pool-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/swimming-pool-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#0ea5e9" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Swimming Pool', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Swimming Pool Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '156' }
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-sky-600 hover:text-sky-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Waves className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-red-100 border-2 border-red-500 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-red-900">⚠️ SPECIAL LOCATION - BS 7671 SECTION 702 APPLIES</p>
                <p className="text-sm text-red-800">Swimming pools are special locations with zone restrictions, SELV requirements, supplementary bonding, and 30mA RCD protection mandatory. Qualified electricians only.</p>
              </div>
            </div>
          </div>

          <div className="bg-sky-50 border-l-4 border-sky-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-sky-900 mb-3 flex items-center gap-2">
              <Waves className="w-5 h-5" />
              Swimming Pool Quick Facts
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

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need a Pool Electrical Specialist?</h3>
                <p className="text-purple-100">Get quotes from contractors experienced in Section 702 installations</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Pool Installation Scenarios</h2>
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
            <h3 className="font-bold text-sky-900 mb-3">Related Special Locations</h3>
            <p className="text-sm text-sky-800 mb-4">
              <Link to="/calculators/voltage-drop/marina" className="text-sky-600 font-semibold hover:underline">Marina installations</Link> have similar safety requirements with stricter 3% voltage drop. For <Link to="/calculators/voltage-drop/garden-lighting" className="text-sky-600 font-semibold hover:underline">garden lighting</Link> around pool areas. Use our <Link to="/cable-sizing-calculator" className="text-sky-600 font-semibold hover:underline">cable sizing calculator</Link> for pump circuit capacity.
            </p>
          </div>

          <div className="bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-sky-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-sky-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Swimming Pool Electrical Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for pool electrical installations.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-sky-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Pool installations vary by size and complexity.</p>
          </div>

          <div className="bg-cyan-50 border-l-4 border-cyan-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-cyan-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-cyan-800">{usecaseData.defined2.definition}</p>
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

          <div className="bg-teal-50 border-l-4 border-teal-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-teal-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-teal-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-sky-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-sky-700">Size cables for pool pump capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Pool Electrical Specialists</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your swimming pool or hot tub project? Tell us about your project and we'll connect you with experienced contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=SwimmingPoolVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Swimming Pool Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-sky-500 text-white rounded-lg p-8 text-center">
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
