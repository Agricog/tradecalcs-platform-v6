import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Warehouse } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'warehouse',
  title: 'Warehouse & Industrial Voltage Drop Calculator',
  metaTitle: 'Warehouse Voltage Drop Calculator UK | Industrial Distribution | Long Runs | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for warehouse and industrial installations. BS 7671 compliant for long cable runs, high bay lighting, three-phase distribution and heavy machinery.',
  heroDescription: 'Calculate voltage drop for warehouse and industrial installations with long cable runs',
  
  defaults: {
    cableSize: '25',
    length: '100',
    current: '63',
    circuitType: 'power' as const,
    phase: 'three' as const
  },

  keyFacts: [
    'Industrial installations often have cable runs of 100m+ requiring careful voltage drop calculation',
    'Three-phase distribution reduces cable size requirements and voltage drop for same power',
    'High bay lighting circuits use 3% limit - power circuits use 5% limit',
    'SWA cable is standard for industrial environments - provides mechanical protection',
    'Busbar trunking systems can reduce voltage drop in large installations'
  ],

  symptomChecks: [
    { symptom: 'Main distribution - DB to sub-DB (80m 3Ø)', recommendation: '100A with 35mm² (1.25 mV/A/m). At 80m 3Ø: (1.25 × 100 × 80 × 0.866) ÷ 1000 = 8.66V (2.17% on 400V) ✓' },
    { symptom: 'High bay lighting circuit (60m)', recommendation: '16A with 4mm² (11 mV/A/m). At 60m: (11 × 16 × 60) ÷ 1000 = 10.56V (4.59%) ✗ exceeds 3% for lighting' },
    { symptom: 'Dock leveller motor (40m)', recommendation: '32A with 6mm² (7.3 mV/A/m). At 40m: (7.3 × 32 × 40) ÷ 1000 = 9.34V (4.06%) ✓' },
    { symptom: 'Racking area socket outlets (75m)', recommendation: '32A with 10mm² (4.4 mV/A/m). At 75m: (4.4 × 32 × 75) ÷ 1000 = 10.56V (4.59%) ✓ just under 5%' },
    { symptom: 'Compressor room supply (50m 3Ø)', recommendation: '63A with 16mm² (2.8 mV/A/m). At 50m 3Ø: (2.8 × 63 × 50 × 0.866) ÷ 1000 = 7.64V (1.91% on 400V) ✓' }
  ],

  costEstimates: [
    { scenario: 'Sub-distribution board installation', material: '£2000-5000', labour: '£1500-3500', total: '£3500-8500' },
    { scenario: 'Three-phase SWA run (per 50m)', material: '£800-2000', labour: '£600-1200', total: '£1400-3200' },
    { scenario: 'Busbar trunking system (per 50m)', material: '£3000-8000', labour: '£1500-3500', total: '£4500-11500' },
    { scenario: 'High bay lighting installation (per bay)', material: '£500-1200', labour: '£300-600', total: '£800-1800' },
    { scenario: 'Complete warehouse fit-out (1000m²)', material: '£15000-40000', labour: '£12000-30000', total: '£27000-70000' }
  ],

  defined: {
    term: 'Three-Phase Distribution in Warehouses',
    definition: 'Large warehouses use three-phase 400V distribution for efficiency. Three-phase allows smaller cables for the same power: a 100A three-phase supply delivers 69kW versus 23kW for single-phase. The 0.866 factor (√3/2) reduces voltage drop calculation. Main feeders are three-phase; final circuits may be single-phase balanced across the three phases.'
  },

  defined2: {
    term: 'SWA Cable for Industrial Environments',
    definition: 'Steel Wire Armoured (SWA) cable is standard for industrial installations. The steel armour provides mechanical protection against impact, crushing, and rodent damage. SWA can be surface-mounted on cable tray, buried directly, or run through conduit for extra protection. The armour can serve as the circuit protective conductor (CPC) if properly terminated with brass glands.'
  },

  defined3: {
    term: 'Busbar Trunking Systems',
    definition: 'For high-power distribution over long distances, busbar trunking (busduct) offers lower voltage drop than cable. Prefabricated sections bolt together with tap-off units at intervals for sub-distribution. Though more expensive initially, busbar systems are expandable, have lower losses, and simplify future modifications. Common in large warehouses, data centres, and manufacturing facilities.'
  },

  defined4: {
    term: 'Maximum Demand and Diversity',
    definition: 'Industrial installations have varying loads throughout the day. Maximum demand calculations consider diversity - not all loads operate simultaneously. Typical industrial diversity: lighting 90%, socket outlets 40%, fixed machinery 70-80% (depending on process). Size main cables for maximum demand after diversity, not total connected load.'
  },

  faqs: [
    {
      q: 'How do I calculate voltage drop for a 150m cable run?',
      a: 'Long runs require larger cables. For 63A at 150m three-phase with 25mm² (1.75 mV/A/m): (1.75 × 63 × 150 × 0.866) ÷ 1000 = 14.31V (3.58% on 400V) ✓. Single-phase would be significantly worse.'
    },
    {
      q: 'Should I use single-phase or three-phase for warehouse distribution?',
      a: 'Three-phase is almost always better for warehouses. It delivers more power with smaller cables, has lower voltage drop, and balances load on the supply. Use three-phase main distribution with single-phase final circuits balanced across phases.'
    },
    {
      q: 'What about voltage drop for high bay LED lighting?',
      a: 'High bay lighting uses the 3% limit, which is challenging with long warehouse runs. For a 60m circuit at 16A, you need 6mm² cable minimum. Consider sub-distribution boards positioned to reduce final circuit lengths.'
    },
    {
      q: 'How does cable tray affect voltage drop?',
      a: 'Cable tray itself doesn\'t affect voltage drop calculation. However, multiple cables on a tray require grouping factor derating for current capacity. This may require larger cables anyway, which will reduce voltage drop.'
    },
    {
      q: 'When should I consider busbar trunking instead of cable?',
      a: 'Consider busbar trunking for: runs over 100A and 50m+, installations requiring multiple tap-offs along the route, future expansion requirements, or where voltage drop with cable would require very large sizes. Busbar has lower losses but higher initial cost.'
    },
    {
      q: 'What cable size for a warehouse main incomer?',
      a: 'Depends on maximum demand. A typical 200A three-phase incomer might use 95mm² or 120mm² for short runs. For longer runs (30m+) from transformer, upsize for voltage drop. Always calculate both current capacity and voltage drop.'
    },
    {
      q: 'How do I handle voltage drop with multiple sub-distribution boards?',
      a: 'Voltage drop is cumulative through the distribution system. If main feeder has 2% drop and final circuit has 2.5%, total is 4.5%. Design each stage to allow headroom for downstream circuits. Total from origin to final equipment must not exceed limits.'
    },
    {
      q: 'What about dock door and loading bay circuits?',
      a: 'Dock equipment (levellers, dock locks, lights) typically runs from dedicated circuits near the dock. Motors may need Type D MCBs for starting current. Consider local distribution boards to minimise cable runs to multiple dock positions.'
    },
    {
      q: 'Do I need special cables for cold storage warehouses?',
      a: 'Cold stores require cables rated for low temperature operation. Standard PVC becomes brittle below -5°C. Use cables with XLPE or LSF insulation rated for the operating temperature. Voltage drop calculation is unchanged.'
    },
    {
      q: 'How do I calculate voltage drop for variable speed drives?',
      a: 'VSDs draw their rated current fairly constantly regardless of motor speed. Size cables for VSD input current (check VSD nameplate, not motor). VSDs are sensitive to supply voltage - keep voltage drop to 2-3% maximum for reliable operation.'
    },
    {
      q: 'What about emergency lighting in warehouses?',
      a: 'Warehouse emergency lighting needs careful planning for long distances. Self-contained units at each exit/route are often simpler than central battery systems which need fire-rated cables. Calculate voltage drop for the central battery option carefully.'
    },
    {
      q: 'How does power factor correction affect voltage drop?',
      a: 'Power factor correction capacitors reduce current draw for the same real power, which reduces voltage drop in upstream cables. Install correction at the main incomer or at large individual loads. Note that capacitors themselves don\'t need voltage drop calculation.'
    }
  ]
}

export default function WarehouseVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="warehouse voltage drop, industrial cable sizing, three phase distribution, SWA cable sizing, busbar trunking, high bay lighting, long cable run, BS 7671 industrial" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/warehouse-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/warehouse-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#64748b" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Warehouse Industrial', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Warehouse Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '276' }
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-slate-600 hover:text-slate-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-slate-600 to-slate-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Warehouse className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-slate-50 border-l-4 border-slate-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Warehouse className="w-5 h-5" />
              Warehouse & Industrial Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
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
                <p className="text-purple-100">Get quotes from contractors experienced in warehouse installations</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Warehouse Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-3">Related Industrial Calculations</h3>
            <p className="text-sm text-slate-800 mb-4">
              For <Link to="/calculators/voltage-drop/three-phase-motor" className="text-slate-600 font-semibold hover:underline">three-phase motor circuits</Link> with starting current considerations. <Link to="/calculators/voltage-drop/commercial-lighting" className="text-slate-600 font-semibold hover:underline">Commercial lighting</Link> uses the stricter 3% limit. Use our <Link to="/cable-sizing-calculator" className="text-slate-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity verification.
            </p>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-gray-100 border border-slate-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-slate-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Warehouse Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for warehouse and industrial installations.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Industrial installations vary significantly by scale and specification.</p>
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
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-slate-50 to-gray-100 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-slate-700">Size cables for industrial current capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-gray-50 to-slate-100 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-gray-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Industrial Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your warehouse or industrial project? Tell us about your project and we'll connect you with experienced contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=WarehouseVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Warehouse Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-slate-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-slate-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
