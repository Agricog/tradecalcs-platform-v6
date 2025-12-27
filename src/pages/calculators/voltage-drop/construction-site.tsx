import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, HardHat } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'construction-site',
  title: 'Construction Site Voltage Drop Calculator',
  metaTitle: 'Construction Site Voltage Drop Calculator UK | Temporary Supply | BS 7671 Section 704 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for construction site temporary installations. BS 7671 Section 704 compliant for site power, distribution boards, welfare units and temporary supplies.',
  heroDescription: 'Calculate voltage drop for construction site temporary electrical installations',
  
  defaults: {
    cableSize: '16',
    length: '50',
    current: '63',
    circuitType: 'power' as const,
    phase: 'three' as const
  },

  keyFacts: [
    'BS 7671 Section 704 covers construction and demolition site installations',
    'Reduced low voltage (110V CTE) required for portable tools in most situations',
    'Site distribution boards must be robust (IP44 minimum) and clearly identified',
    'All socket outlets require 30mA RCD protection - no exceptions',
    'Cable routes must be protected against mechanical damage from site activities'
  ],

  symptomChecks: [
    { symptom: 'Main site supply to welfare (30m 3Ø)', recommendation: '63A with 16mm² (2.8 mV/A/m). At 30m 3Ø: (2.8 × 63 × 30 × 0.866) ÷ 1000 = 4.58V (1.15% on 400V) ✓' },
    { symptom: 'Tower crane supply (60m 3Ø)', recommendation: '100A with 35mm² (1.25 mV/A/m). At 60m 3Ø: (1.25 × 100 × 60 × 0.866) ÷ 1000 = 6.50V (1.63% on 400V) ✓' },
    { symptom: '110V transformer feed (40m)', recommendation: '32A with 6mm² (7.3 mV/A/m). At 40m: (7.3 × 32 × 40) ÷ 1000 = 9.34V (4.06%) ✓' },
    { symptom: 'Site hoist supply (50m 3Ø)', recommendation: '63A with 25mm² (1.75 mV/A/m). At 50m 3Ø: (1.75 × 63 × 50 × 0.866) ÷ 1000 = 4.78V (1.19% on 400V) ✓' },
    { symptom: 'Portable distribution board (80m run)', recommendation: '32A with 10mm² (4.4 mV/A/m). At 80m: (4.4 × 32 × 80) ÷ 1000 = 11.26V (4.90%) ⚠ borderline' }
  ],

  costEstimates: [
    { scenario: 'Temporary site supply connection', material: '£500-1500', labour: '£600-1200', total: '£1100-2700' },
    { scenario: 'Main site distribution board', material: '£800-2000', labour: '£500-1000', total: '£1300-3000' },
    { scenario: 'Sub-distribution board (per unit)', material: '£300-700', labour: '£200-400', total: '£500-1100' },
    { scenario: '110V transformer (5kVA)', material: '£400-800', labour: '£150-300', total: '£550-1100' },
    { scenario: 'Site rewire/relocation', material: '£200-600', labour: '£300-600', total: '£500-1200' }
  ],

  defined: {
    term: 'BS 7671 Section 704 Requirements',
    definition: 'Section 704 applies to temporary installations for construction and demolition work. Key requirements include: all socket outlets protected by 30mA RCDs, reduced low voltage (110V CTE) for portable hand tools, robust equipment suitable for site conditions (IP44 minimum), and cables protected against mechanical damage. Supplies are temporary but must still meet full safety standards.'
  },

  defined2: {
    term: '110V Centre-Tapped Earth (CTE) System',
    definition: 'The 110V CTE system provides 55V to earth from any conductor - significantly safer than 230V if contact occurs. Yellow 110V equipment is standard for UK construction sites. The transformer has a centre-tapped secondary with 110V across the outer conductors. 16A (yellow) and 32A (yellow) plugs/sockets have different configurations to prevent cross-connection with 230V.'
  },

  defined3: {
    term: 'Site Distribution Board Requirements',
    definition: 'Site distribution boards must be: robustly constructed for site conditions, rated IP44 minimum (higher for exposed locations), clearly marked with voltage and purpose, equipped with main isolation, protected by RCDs on all socket circuits, and positioned to minimise cable runs while remaining accessible. Boards should be secured against theft and vandalism.'
  },

  defined4: {
    term: 'Cable Protection on Sites',
    definition: 'Construction sites present multiple cable damage risks: vehicles, excavation, moving materials, and general site activity. Cables must be protected by: burial (600mm min with markers), overhead routing clear of traffic, robust conduit or trunking at ground level, or routing away from high-risk areas. Cables across access routes need heavy-duty protection or ramped covers.'
  },

  faqs: [
    {
      q: 'Do I always need 110V on construction sites?',
      a: 'For portable hand-held tools - yes, 110V CTE is required (Regulation 704.410.3.10). Fixed equipment, welfare facilities, and site offices can use 230V with appropriate protection. Site-specific risk assessment may identify additional requirements.'
    },
    {
      q: 'What RCD protection is required on sites?',
      a: 'All socket outlets need 30mA RCD protection (Regulation 704.410.3.10). This applies to both 230V and 110V circuits. Fixed equipment may use other protective measures but RCD protection is strongly recommended throughout.'
    },
    {
      q: 'What IP rating for site electrical equipment?',
      a: 'Minimum IP44 for general site use (protected against objects >1mm and water splash). Exposed locations may need IP55 or IP65. Equipment in welfare units can be standard domestic rating if the unit itself provides environmental protection.'
    },
    {
      q: 'How often should site installations be inspected?',
      a: 'BS 7671 recommends 3-month intervals for construction site installations (Appendix 3). More frequent visual inspections are prudent - weekly or after any incident. Installations should be tested after any modification or relocation.'
    },
    {
      q: 'What about voltage drop for 110V circuits?',
      a: 'Same 5% limit applies - that\'s 5.5V maximum drop on a 110V circuit. Because current is higher for the same power (110V draws more current than 230V), voltage drop is more critical. Size cables generously or keep runs short.'
    },
    {
      q: 'Can I use domestic extension leads on site?',
      a: 'No. Site extension leads must be industrial grade, appropriately rated, and in good condition. 110V leads use yellow connectors (16A or 32A). 230V should be avoided for portable equipment but if used, requires proper industrial-rated leads with RCD protection.'
    },
    {
      q: 'How do I get temporary site supply?',
      a: 'Contact your DNO for a temporary builder\'s supply. They\'ll install a meter and supply point - you\'re responsible for distribution from there. Allow 6-12 weeks lead time. For short works, generator supply may be more practical.'
    },
    {
      q: 'What about generator supplies?',
      a: 'Generators must be properly earthed (usually via the frame/neutral bond). Large generators often provide 400V three-phase for site distribution with transformers for 110V. Smaller generators may be 230V - still need RCD protection and careful load management.'
    },
    {
      q: 'Do site offices need 110V?',
      a: 'No, fixed site offices and welfare units can use 230V for fixed equipment (lighting, heating, kitchen appliances) with standard RCD protection. Portable equipment used in these spaces still benefits from 110V where practical.'
    },
    {
      q: 'What cable type for site distribution?',
      a: 'Armoured cable (SWA) for buried or permanent runs. Heavy-duty rubber-sheathed flexible cable (H07RN-F) for surface runs and temporary connections. Standard PVC cables are not suitable for site conditions unless fully protected.'
    },
    {
      q: 'How do I handle site rewiring as work progresses?',
      a: 'Plan distribution with site progression in mind. Use sub-distribution boards that can be repositioned. Label all circuits clearly. Document changes and test after any modification. Consider future crane, hoist, and welfare locations from the start.'
    },
    {
      q: 'What about PAT testing on sites?',
      a: 'Portable appliance testing is essential on construction sites. Test before first use and regularly thereafter (monthly or quarterly depending on equipment type and use). Keep records. Remove damaged or failed equipment from service immediately.'
    }
  ]
}

export default function ConstructionSiteVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="construction site voltage drop, temporary electrical supply, BS 7671 section 704, 110V site power, site distribution board, builder supply, welfare unit electrical, crane power supply" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/construction-site-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/construction-site-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#eab308" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Construction Site', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Construction Site Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '234' }
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

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <HardHat className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-yellow-100 border-2 border-yellow-500 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-yellow-900">⚠️ BS 7671 SECTION 704 APPLIES - TEMPORARY INSTALLATIONS</p>
                <p className="text-sm text-yellow-800">Construction sites require 110V CTE for portable tools, 30mA RCD on all sockets, IP44 minimum equipment rating, and 3-monthly inspection intervals.</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <HardHat className="w-5 h-5" />
              Construction Site Quick Facts
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
                <h3 className="text-xl font-bold mb-1">Need Site Electrical Contractors?</h3>
                <p className="text-purple-100">Get quotes from experienced temporary installation specialists</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Construction Site Scenarios</h2>
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
            <h3 className="font-bold text-yellow-900 mb-3">Related Industrial Calculations</h3>
            <p className="text-sm text-yellow-800 mb-4">
              For <Link to="/calculators/voltage-drop/three-phase-motor" className="text-yellow-600 font-semibold hover:underline">three-phase motor circuits</Link> powering cranes and hoists. <Link to="/calculators/voltage-drop/warehouse" className="text-yellow-600 font-semibold hover:underline">Warehouse distribution</Link> principles apply to large site compounds. Use our <Link to="/cable-sizing-calculator" className="text-yellow-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-yellow-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Construction Site Electrical Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for construction site temporary installations.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. DNO connection charges are additional. Costs vary significantly by site size.</p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-orange-800">{usecaseData.defined2.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-yellow-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-yellow-700">Size cables for site distribution capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-orange-50 to-yellow-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-orange-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Site Electrical Contractors</h3>
              <p className="text-gray-700">
                Looking for temporary electrical installation specialists for your construction site? Tell us about your project and we'll connect you with experienced contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ConstructionSiteVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Construction Site Voltage Drop Inquiry Form"
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
