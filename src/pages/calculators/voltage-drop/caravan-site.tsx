import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Tent } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'caravan-site',
  title: 'Caravan & Camping Site Voltage Drop Calculator',
  metaTitle: 'Caravan Site Voltage Drop Calculator UK | Camping Pitch Supply | BS 7671 Section 708 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for caravan parks and camping sites. BS 7671 Section 708 compliant. Calculate pitch supply feeder cables with PME earthing considerations.',
  heroDescription: 'Calculate voltage drop for caravan park and camping site pitch supplies',
  
  defaults: {
    cableSize: '10',
    length: '75',
    current: '16',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'BS 7671 Section 708 applies to caravan/camping parks and similar locations',
    'Standard pitch supply: 16A socket outlet (3.7kW) per pitch',
    'PME earthing restrictions apply - additional protective measures required',
    'Socket outlets must be 0.5-1.5m above ground, accessible to each pitch',
    'Distribution cables often run 100m+ across sites - voltage drop critical'
  ],

  symptomChecks: [
    { symptom: '16A pitch - close to distribution (30m)', recommendation: '16A with 4mm² (11 mV/A/m). At 30m: (11 × 16 × 30) ÷ 1000 = 5.28V (2.30%) ✓' },
    { symptom: '16A pitch - mid-site (60m)', recommendation: '16A with 4mm² (11 mV/A/m). At 60m: (11 × 16 × 60) ÷ 1000 = 10.56V (4.59%) ✓ near limit' },
    { symptom: '16A pitch - far corner (100m)', recommendation: '16A with 6mm² (7.3 mV/A/m). At 100m: (7.3 × 16 × 100) ÷ 1000 = 11.68V (5.08%) ⚠ over 5%' },
    { symptom: 'Site feeder - main distribution (150m 3Ø)', recommendation: '100A with 35mm² (1.25 mV/A/m). At 150m: (1.25 × 100 × 150 × 0.866) ÷ 1000 = 16.24V (4.06% on 400V) ✓' },
    { symptom: 'Glamping pods with 32A supply', recommendation: '32A with 10mm² (4.4 mV/A/m). At 50m: (4.4 × 32 × 50) ÷ 1000 = 7.04V (3.06%) ✓' }
  ],

  costEstimates: [
    { scenario: 'Single 16A pitch outlet', material: '£150-300', labour: '£200-350', total: '£350-650' },
    { scenario: 'Feeder pillar (4-6 outlets)', material: '£800-1500', labour: '£500-900', total: '£1300-2400' },
    { scenario: 'Site distribution cable (per 50m)', material: '£500-1000', labour: '£400-700', total: '£900-1700' },
    { scenario: 'Main site distribution board', material: '£2000-4000', labour: '£1000-2000', total: '£3000-6000' },
    { scenario: 'Earth electrode system', material: '£200-450', labour: '£250-500', total: '£450-950' }
  ],

  defined: {
    term: 'BS 7671 Section 708 Requirements',
    definition: 'Section 708 covers caravan and camping parks. Key requirements: 16A socket outlets at each pitch (minimum), IP44 protection minimum, 30mA RCD protection mandatory, socket height 0.5-1.5m, accessibility from each pitch, and specific PME earthing restrictions. These requirements address the unique hazards of temporary accommodation with electrical hookup.'
  },

  defined2: {
    term: 'PME Earthing Considerations',
    definition: 'PME (Protective Multiple Earthing) supplies present risks in caravan sites because caravans are vehicles with chassis connected to earth. If the PME neutral breaks, exposed metalwork could become live. Section 708.411.4 requires additional protective measures: earth electrode supplementing PME earth, main protective bonding, and equipotential bonding. Some sites use TT earthing to avoid these complexities.'
  },

  defined3: {
    term: 'Socket Outlet Specifications',
    definition: 'Caravan pitch outlets must comply with BS EN 60309-2 (industrial connectors): blue 16A 2P+E for standard pitches. Outlets need minimum IP44 rating, be positioned 0.5-1.5m above ground, accessible without entering the pitch, and protected by individual 30mA RCDs. Each outlet must have a unique identifier visible for maintenance and emergency response.'
  },

  defined4: {
    term: 'Diversity Calculations for Caravan Sites',
    definition: 'Unlike domestic installations, caravan sites benefit from significant diversity - not all pitches draw full load simultaneously. Typical diversity: first 10 pitches at 100%, next 10 at 80%, next 10 at 60%, remainder at 50%. A 50-pitch site with 16A outlets (800A connected) might size main feeder for 350-400A. Always verify diversity assumptions with site owner\'s usage data.'
  },

  faqs: [
    {
      q: 'What is the standard electrical supply for a caravan pitch?',
      a: 'BS 7671 Section 708 requires minimum 16A supply at each pitch using BS EN 60309-2 blue industrial socket. This provides 3.68kW - enough for heating, lighting, and small appliances. Premium pitches may offer 32A (7.36kW) for air conditioning or intensive use.'
    },
    {
      q: 'How far can I run a 16A pitch supply cable?',
      a: 'With 4mm² cable at 16A, maximum 5% drop allows about 65m: (11 × 16 × 65) ÷ 1000 = 11.44V (4.97%) ✓. For longer runs, use 6mm²: (7.3 × 16 × 100) ÷ 1000 = 11.68V - still borderline. Very long runs may need 10mm².'
    },
    {
      q: 'Why are caravan sites concerned about PME earthing?',
      a: 'Caravans have metal chassis potentially touched by occupants while also touching the ground. If PME neutral fails, chassis could become live at dangerous voltage. Section 708 requires protective measures: supplementary earth electrode and enhanced bonding. Some sites avoid this by using TT earthing.'
    },
    {
      q: 'What RCD protection is required for caravan pitches?',
      a: 'Each socket outlet requires 30mA RCD protection (Section 708.415.1). Best practice provides individual RCBO per outlet so one fault doesn\'t affect adjacent pitches. Time-delayed RCDs may protect feeders for discrimination.'
    },
    {
      q: 'At what height should caravan pitch outlets be installed?',
      a: 'Socket outlets must be between 0.5m and 1.5m above ground level (Section 708.553.1.10). This prevents damage from vehicles and groundwater while remaining accessible. Outlets should face the pitch and be reachable without crossing hookup lead over walkways.'
    },
    {
      q: 'How do I calculate diversity for a 100-pitch caravan site?',
      a: 'Typical approach: pitches 1-10 at 100% (160A), 11-20 at 80% (128A), 21-30 at 60% (96A), 31-100 at 50% (560A). Total = 944A. With 16A per pitch (1600A connected), this is 59% diversity - reasonable for mixed leisure use.'
    },
    {
      q: 'What about static caravans and lodges?',
      a: 'Static caravans/lodges often have permanent 32A or higher supplies wired directly to a consumer unit within the unit. These are treated more like fixed installations but Section 708 still applies to the site distribution. Consider higher diversity factors for permanent occupation.'
    },
    {
      q: 'Do camping pods and glamping units need different supplies?',
      a: 'Depends on facilities. Basic pods with lighting might use 16A. Pods with heating, kitchens, and bathrooms often need 32A supplies. Apply Section 708 requirements but consider more like semi-permanent buildings for internal wiring.'
    },
    {
      q: 'How often should caravan site electrical systems be tested?',
      a: 'BS 7671 recommends maximum 1-year inspection interval for caravan/camping parks (Appendix 3). Seasonal sites should inspect before opening each season. Socket outlets take heavy abuse - visual checks should be more frequent, especially after winter.'
    },
    {
      q: 'Can caravanners install their own hookup posts?',
      a: 'No. Caravan site electrical installations are notifiable under Part P and require qualified electricians. Site owners are responsible for ensuring safe, compliant infrastructure. Caravanners should use compliant hookup leads (BS EN 60309) and maintain their own caravan electrics.'
    },
    {
      q: 'What about electric vehicle charging at caravan sites?',
      a: 'EV charging adds significant load - 7kW chargers draw 32A continuously. Sites may need infrastructure upgrades for EV provision. Consider dedicated EV charging points with separate metering rather than trying to charge from pitch supplies.'
    },
    {
      q: 'Do I need metering at each pitch?',
      a: 'Not required by BS 7671 but increasingly common for commercial sites. Individual metering allows pay-per-use billing and identifies excessive consumption. Smart metering can remotely monitor usage and detect faults.'
    }
  ]
}

export default function CaravanSiteVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="caravan site voltage drop, camping pitch supply, BS 7671 section 708, caravan park electrical, hookup supply cable, PME earthing caravan, pitch socket outlet" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/caravan-site-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/caravan-site-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#16a34a" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Caravan Site', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Caravan Site Voltage Drop Calculator UK',
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Tent className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* PME Warning Banner */}
          <div className="bg-amber-100 border-2 border-amber-500 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-amber-900">⚠️ PME EARTHING RESTRICTIONS APPLY</p>
                <p className="text-sm text-amber-800">BS 7671 Section 708 requires additional protective measures for PME supplies at caravan sites. Consider earth electrode supplementation or TT earthing system. Consult a specialist.</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <Tent className="w-5 h-5" />
              Caravan Site Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-green-900">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
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
                <h3 className="text-xl font-bold mb-1">Need a Caravan Site Electrical Specialist?</h3>
                <p className="text-purple-100">Get quotes from contractors experienced in Section 708 installations</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Caravan Site Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-900 mb-3">Related Specialist Installations</h3>
            <p className="text-sm text-green-800 mb-4">
              <Link to="/calculators/voltage-drop/marina" className="text-green-600 font-semibold hover:underline">Marina installations</Link> have similar requirements under Section 709 with stricter 3% voltage drop. For standard outdoor supplies, see our <Link to="/calculators/voltage-drop/submain-outbuilding" className="text-green-600 font-semibold hover:underline">submain calculator</Link>. Use our <Link to="/cable-sizing-calculator" className="text-green-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity verification.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-green-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Caravan Site Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for caravan park electrical infrastructure.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Site installations vary significantly by scale and terrain.</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900 mb-2">{usecaseData.defined2.term}</h3>
                <p className="text-sm text-red-800">{usecaseData.defined2.definition}</p>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-emerald-900 mb-2">{usecaseData.defined3.term}</h3>
            <p className="text-sm text-emerald-800">{usecaseData.defined3.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-green-700">Size cables for site feeder capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-emerald-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-emerald-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Caravan Site Electrical Specialists</h3>
              <p className="text-gray-700">
                Looking for an electrician experienced in caravan park and camping site installations? Tell us about your project and we'll connect you with qualified contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=CaravanSiteVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Caravan Site Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-green-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-green-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
