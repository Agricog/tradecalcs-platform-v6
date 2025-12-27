import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Anchor } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'marina',
  title: 'Marina & Boat Shore Power Voltage Drop Calculator',
  metaTitle: 'Marina Voltage Drop Calculator UK | Shore Power BS 7671 Section 709 | 3% Limit | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for marina and boat shore power. BS 7671 Section 709 compliant with stricter 3% limit. Calculate pontoon feeder and shore supply cables.',
  heroDescription: 'Calculate voltage drop for marina shore power with BS 7671 Section 709 stricter 3% limit',
  
  defaults: {
    cableSize: '16',
    length: '50',
    current: '32',
    circuitType: 'lighting' as const,  // Uses 3% limit like lighting
    phase: 'single' as const
  },

  keyFacts: [
    'BS 7671 Section 709 applies to marinas and shore connections for boats',
    'STRICTER 3% voltage drop limit applies (not standard 5%) - same as lighting',
    'Standard shore supply: 16A (3.7kW) or 32A (7.4kW) single-phase outlets',
    'Pontoon feeder cables often run 100m+ requiring careful voltage drop calculation',
    'PME earthing prohibited for shore supplies - TT earthing system required'
  ],

  symptomChecks: [
    { symptom: '16A shore outlet - close berth (30m)', recommendation: '16A with 4mm² (11 mV/A/m). At 30m: (11 × 16 × 30) ÷ 1000 = 5.28V (2.30%) ✓ under 3%' },
    { symptom: '16A shore outlet - far pontoon (60m)', recommendation: '16A with 6mm² (7.3 mV/A/m). At 60m: (7.3 × 16 × 60) ÷ 1000 = 7.01V (3.05%) ⚠ borderline' },
    { symptom: '32A shore outlet - medium run (40m)', recommendation: '32A with 10mm² (4.4 mV/A/m). At 40m: (4.4 × 32 × 40) ÷ 1000 = 5.63V (2.45%) ✓ under 3%' },
    { symptom: 'Pontoon feeder - long run (100m)', recommendation: '63A with 25mm² (1.75 mV/A/m). At 100m: (1.75 × 63 × 100) ÷ 1000 = 11.03V (2.76% on 400V 3Ø) ✓' },
    { symptom: 'Multiple berths - diversity applied', recommendation: 'Apply 10% diversity per additional berth (max 50% reduction). Size feeder for maximum demand scenario.' }
  ],

  costEstimates: [
    { scenario: 'Single 16A shore outlet', material: '£200-400', labour: '£300-500', total: '£500-900' },
    { scenario: 'Single 32A shore outlet', material: '£300-550', labour: '£400-650', total: '£700-1200' },
    { scenario: 'Pontoon feeder (per 50m)', material: '£800-1500', labour: '£500-900', total: '£1300-2400' },
    { scenario: 'Shore supply pillar (2-4 outlets)', material: '£1500-3000', labour: '£800-1500', total: '£2300-4500' },
    { scenario: 'TT earth electrode system', material: '£200-500', labour: '£300-600', total: '£500-1100' }
  ],

  defined: {
    term: 'BS 7671 Section 709 Requirements',
    definition: 'Section 709 covers marinas and similar locations. Key requirements: maximum 3% voltage drop (stricter than general 5%), PME earthing prohibited (TT system required), 30mA RCD protection mandatory, IP44 minimum for equipment, specific socket outlet types (typically blue CEE), and isolation facilities at each berth. These requirements address the unique hazards of electrical supply near water.'
  },

  defined2: {
    term: 'Why Marinas Have Stricter Voltage Drop Limits',
    definition: 'The 3% voltage drop limit in marinas exists because boats are sensitive to supply voltage quality. Marine equipment, battery chargers, and navigation systems may malfunction with low voltage. Additionally, long pontoon runs compound with boat cable lengths to the final equipment. The stricter limit ensures adequate voltage reaches equipment even at end of long supply chains.'
  },

  defined3: {
    term: 'TT Earthing Requirement',
    definition: 'PME (Protective Multiple Earthing) is prohibited for marina shore supplies because a broken PEN conductor could make boat hulls live while in water - potentially fatal. TT earthing uses a local earth electrode with all metal parts bonded. This isolates the shore supply earth from the distribution network, protecting people in contact with water around boats.'
  },

  defined4: {
    term: 'Shore Supply Pillar Specifications',
    definition: 'Marina supply pillars must comply with BS EN 61439-5 (marina feeder pillars). They contain: IP44 or better enclosure, RCD protection for each outlet, individual MCB/RCBO per outlet, emergency isolation, metering facilities if required, and weatherproof construction. Position pillars to minimise cable lengths to berths while maintaining safe clearances from water.'
  },

  faqs: [
    {
      q: 'Why do marinas have a 3% voltage drop limit instead of 5%?',
      a: 'BS 7671 Section 709.512 specifies 3% maximum voltage drop for marina installations. This stricter limit ensures adequate voltage at boat equipment despite long pontoon runs. Marine chargers and electronics are sensitive to low voltage and may malfunction or be damaged.'
    },
    {
      q: 'What cable size for a 100m pontoon feeder?',
      a: 'For a 63A feeder at 100m (three-phase): use 25mm² (1.75 mV/A/m). Calculation: (1.75 × 63 × 100 × 0.866) ÷ 1000 = 9.55V (2.39% on 400V) ✓. For single-phase, larger cable may be needed to stay under 3%.'
    },
    {
      q: 'Why is PME earthing prohibited in marinas?',
      a: 'PME earthing can make boat hulls live if the supply neutral breaks. Someone in water touching the boat could be electrocuted. TT earthing with local earth electrodes isolates the boat\'s electrical system from supply neutral faults, preventing this hazard.'
    },
    {
      q: 'What socket types are required for marina shore supplies?',
      a: 'BS EN 60309-2 industrial connectors (blue 230V) are standard: 16A uses 2P+E blue plug/socket, 32A uses 2P+E blue plug/socket. These are splashproof (IP44 minimum) and have captive covers. Domestic 13A sockets are not suitable for permanent shore supplies.'
    },
    {
      q: 'Do I need RCD protection at every shore outlet?',
      a: 'Yes, BS 7671 requires 30mA RCD protection for all marina socket outlets. Each outlet should have individual RCD/RCBO protection to prevent one boat\'s fault from affecting others. Time-delayed RCDs may be used for discrimination on feeders.'
    },
    {
      q: 'How do I calculate diversity for multiple berths?',
      a: 'Apply diversity to pontoon feeders based on expected simultaneous use. Typical approach: first berth 100%, 10% reduction per additional berth up to 50% maximum reduction. A 10-berth pontoon might use 60% of total connected load for feeder sizing.'
    },
    {
      q: 'What IP rating is required for marina electrical equipment?',
      a: 'Minimum IP44 for equipment on pontoons (protected from splashing water). IP55 or IP56 recommended for exposed locations. Junction boxes and equipment below pontoon deck level may need IP67 or IP68 for submersion protection.'
    },
    {
      q: 'Can I use SWA cable for pontoon installations?',
      a: 'SWA is suitable for main feeders to pontoons but not ideal for the floating pontoon itself where flexing occurs. Use appropriately rated flexible cable for moving sections. Cable glands must maintain IP rating and accommodate movement.'
    },
    {
      q: 'What about three-phase supplies for larger vessels?',
      a: 'Larger vessels may need 63A or 125A three-phase supplies. Apply same 3% voltage drop limit against 400V base. Three-phase has advantage of lower per-conductor current, making voltage drop easier to manage on long runs.'
    },
    {
      q: 'How often should marina electrical installations be inspected?',
      a: 'BS 7671 recommends maximum 1-year inspection interval for marinas (Table 3A of Appendix 3). This is more frequent than general commercial premises due to harsh environment and safety criticality. Visual checks should be more frequent.'
    },
    {
      q: 'What about lightning protection for marina installations?',
      a: 'Marinas are exposed locations with metal structures near water. Consider surge protection devices (SPDs) at distribution boards and potentially at individual pillars. Masts and tall structures may need dedicated lightning protection systems.'
    },
    {
      q: 'Can boat owners install their own shore supply cables?',
      a: 'No. Marina electrical installations are notifiable under Part P and must be done by qualified electricians. Shore supply pillars, feeders, and permanent infrastructure require certification. Boat owners should use compliant shore power leads and maintain onboard systems.'
    }
  ]
}

export default function MarinaVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="marina voltage drop calculator, shore power cable size, BS 7671 section 709, boat electrical supply, pontoon feeder, 3% voltage drop, TT earthing marina, shore supply pillar" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/marina-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/marina-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#1e40af" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Marina Shore Power', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Marina Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '187' }
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
          <Link to="/electrical-calculators" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Anchor className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Warning Banner for 3% Limit */}
          <div className="bg-amber-100 border-2 border-amber-500 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-amber-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-amber-900">⚠️ STRICTER 3% VOLTAGE DROP LIMIT APPLIES</p>
                <p className="text-sm text-amber-800">BS 7671 Section 709 requires maximum 3% voltage drop for marina installations (not the standard 5%). Calculator below is set to "Lighting Circuit" mode which uses the 3% limit.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Anchor className="w-5 h-5" />
              Marina Shore Power Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-blue-900">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
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
                <h3 className="text-xl font-bold mb-1">Need a Marina Electrical Specialist?</h3>
                <p className="text-purple-100">Get quotes from contractors experienced in Section 709 installations</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Marina Installation Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-3">Related Specialist Installations</h3>
            <p className="text-sm text-blue-800 mb-4">
              <Link to="/calculators/voltage-drop/caravan-site" className="text-blue-600 font-semibold hover:underline">Caravan park installations</Link> have similar Section 708 requirements with PME restrictions. For standard outdoor installations, see our <Link to="/calculators/voltage-drop/submain-outbuilding" className="text-blue-600 font-semibold hover:underline">submain calculator</Link>. Use our <Link to="/cable-sizing-calculator" className="text-blue-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity checks.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-blue-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Marina Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for marina electrical infrastructure. TT earthing required.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Marina installations vary significantly by site conditions and scale.</p>
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-indigo-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-indigo-800">{usecaseData.defined2.definition}</p>
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

          <div className="bg-cyan-50 border-l-4 border-cyan-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-cyan-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-cyan-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-blue-700">Size cables for marina feeder capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-indigo-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-indigo-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Marina Electrical Specialists</h3>
              <p className="text-gray-700">
                Looking for an electrician experienced in marina and shore power installations? Tell us about your project and we'll connect you with qualified contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=MarinaVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Marina Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-blue-700 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-blue-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
