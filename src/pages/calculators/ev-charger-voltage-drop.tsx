import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Car } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'ev-charger',
  title: 'EV Charger Voltage Drop Calculator',
  metaTitle: 'EV Charger Voltage Drop Calculator UK | 7kW & 22kW | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for EV charger installations. Check BS 7671 compliance for 7kW and 22kW home charging using official Table 4D1B mV/A/m values.',
  heroDescription: 'Check voltage drop compliance for 7kW and 22kW EV charger installations',
  
  defaults: {
    cableSize: '6',
    length: '20',
    current: '32',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    '7kW charger draws 32A continuously - requires dedicated radial circuit',
    '22kW three-phase draws 32A per phase - uses 0.866 factor for voltage drop',
    'Voltage drop affects charging speed - smart chargers may throttle if voltage low',
    'Standard cable: 6mm² (7.3 mV/A/m) for short runs, 10mm² (4.4 mV/A/m) for longer',
    'Part P notifiable - must be installed by registered electrician'
  ],

  symptomChecks: [
    { symptom: '7kW charger - short driveway (10-15m)', recommendation: '32A with 6mm² (7.3 mV/A/m). At 15m: (7.3 × 32 × 15) ÷ 1000 = 3.50V (1.52%) ✓' },
    { symptom: '7kW charger - long driveway (25-30m)', recommendation: '32A with 10mm² (4.4 mV/A/m). At 30m: (4.4 × 32 × 30) ÷ 1000 = 4.22V (1.84%) ✓' },
    { symptom: '22kW three-phase charger (20m)', recommendation: '32A per phase with 6mm². (7.3 × 32 × 20 × 0.866) ÷ 1000 = 4.04V (1.01% on 400V) ✓' },
    { symptom: 'Charger in detached garage (40m)', recommendation: '32A with 10mm² SWA. At 40m: (4.4 × 32 × 40) ÷ 1000 = 5.63V (2.45%) ✓' },
    { symptom: 'Workplace charger - long run (50m+)', recommendation: '32A with 16mm² (2.8 mV/A/m). At 60m: (2.8 × 32 × 60) ÷ 1000 = 5.38V (2.34%) ✓' }
  ],

  costEstimates: [
    { scenario: 'Simple install - charger near CU', material: '£400-600', labour: '£200-300', total: '£600-900' },
    { scenario: 'Standard install (15-25m run)', material: '£500-800', labour: '£300-450', total: '£800-1250' },
    { scenario: 'Long run to garage (30m+)', material: '£700-1100', labour: '£400-600', total: '£1100-1700' },
    { scenario: 'Three-phase 22kW installation', material: '£1200-2000', labour: '£500-800', total: '£1700-2800' },
    { scenario: 'CU upgrade required', material: '+£300-600', labour: '+£200-400', total: '+£500-1000' }
  ],

  defined: {
    term: 'EV Charger Voltage Drop',
    definition: 'EV chargers draw high current continuously for extended periods - often 4-8 hours overnight. Unlike intermittent loads, this sustained draw means voltage drop is a critical design factor. Smart chargers monitor incoming voltage and may reduce charging power if it drops too low.'
  },

  defined2: {
    term: 'Why EV Charger Voltage Drop Matters',
    definition: 'Unlike typical domestic loads, EV chargers draw their rated current continuously for hours. A 7kW charger pulling 32A for 6 hours generates significant heat in the cable. Smart chargers actively monitor voltage and reduce power output if it drops below acceptable levels - meaning you might only get 5-6kW from a 7kW charger if voltage drop is excessive.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a 7kW EV charger?',
      a: 'A 7kW charger draws 32A continuously. For runs up to 20m, 6mm² (7.3 mV/A/m) gives: (7.3 × 32 × 20) ÷ 1000 = 4.67V (2.03%) ✓. For longer runs (25m+), consider 10mm² (4.4 mV/A/m) for better margin.'
    },
    {
      q: 'What cable size for a 22kW three-phase EV charger?',
      a: 'A 22kW charger draws 32A per phase. Three-phase calculations use the 0.866 factor. For 20m with 6mm²: (7.3 × 32 × 20 × 0.866) ÷ 1000 = 4.04V (1.01% on 400V) ✓. Three-phase has lower percentage drop.'
    },
    {
      q: 'Does voltage drop affect EV charging speed?',
      a: 'Yes. If voltage drops too low, some chargers reduce output power to protect themselves. Smart chargers may throttle from 7kW to 6kW or less. Keeping voltage drop under 3% ensures full charging speed.'
    },
    {
      q: 'Can I use the existing ring main for an EV charger?',
      a: 'No. EV chargers need a dedicated circuit from the consumer unit. A 32A charger drawing continuously would overload a ring main designed for intermittent socket loads. BS 7671 requires a dedicated radial circuit.'
    },
    {
      q: 'What about the OZEV grant for home charger installation?',
      a: 'The OZEV (formerly OLEV) grant provides up to £350 towards installation costs for eligible properties. The charger must be smart-enabled with off-peak charging capability. Check gov.uk for current eligibility criteria.'
    },
    {
      q: 'Do I need a separate consumer unit for an EV charger?',
      a: 'Not usually. Most domestic installations can accommodate a new 40A MCB for the EV circuit. However, if your existing CU is full or has insufficient spare capacity, a separate enclosure may be needed.'
    },
    {
      q: 'What MCB rating for an EV charger circuit?',
      a: 'Use a 40A Type B or C MCB for a 32A charger. The 40A rating provides the required 125% continuous load capacity (32A × 1.25 = 40A). Some installations use 32A MCB if diversity can be demonstrated.'
    },
    {
      q: 'Can I install an EV charger myself?',
      a: 'No. EV charger installation is notifiable work under Part P Building Regulations. It must be done by a registered electrician (NICEIC, NAPIT, etc.) who can self-certify the work and provide an electrical installation certificate.'
    },
    {
      q: 'How far can I run cable to a driveway charger?',
      a: 'With 6mm² cable at 32A, you can run approximately 30m before hitting 3% drop: (7.3 × 32 × 30) ÷ 1000 = 7.01V (3.05%). For longer runs, use 10mm² which allows 50m+: (4.4 × 32 × 50) = 7.04V (3.06%).'
    },
    {
      q: 'What earthing arrangement is required for EV chargers?',
      a: 'Most EV chargers require PME earthing to be confirmed safe or a separate earth electrode installed. The charger manufacturer specifies requirements. Some chargers have built-in earth fault protection.'
    }
  ],

  defined3: {
    term: 'PME Earthing Considerations',
    definition: 'Most UK supplies use PME (Protective Multiple Earthing). Some EV charger manufacturers require additional earth electrodes or specific protective devices for PME supplies. Check manufacturer requirements and consult a qualified electrician.'
  }
}

export default function EVChargerVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="EV charger voltage drop, electric vehicle charger cable size, 7kW charger installation, 22kW charger, BS 7671 EV charging, home charger cable" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/ev-charger-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/ev-charger-voltage-drop-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'EV Charger', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'EV Charger Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '523' }
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
              <Car className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <Car className="w-5 h-5" />
              EV Charger Quick Facts
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
                <h3 className="text-xl font-bold mb-1">Need a Qualified Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted, OZEV-approved installers in your area</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common EV Charger Scenarios</h2>
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
            <h3 className="font-bold text-green-900 mb-3">Complete Your EV Installation</h3>
            <p className="text-sm text-green-800 mb-4">
              Installing in a <Link to="/calculators/voltage-drop/submain-outbuilding" className="text-green-600 font-semibold hover:underline">detached garage or outbuilding</Link>? Check submain voltage drop too. Need to size the cable? Use our <Link to="/cable-sizing-calculator" className="text-green-600 font-semibold hover:underline">cable sizing calculator</Link>. For the full voltage drop calculator with all options, see our <Link to="/voltage-drop-calculator" className="text-green-600 font-semibold hover:underline">main voltage drop tool</Link>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-green-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">EV Charger Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs. OZEV grant may cover up to £350 for eligible installations.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Excludes charger unit cost (£300-1000 depending on brand).</p>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-emerald-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-emerald-800">{usecaseData.defined2.definition}</p>
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
                <p className="text-sm text-green-700">Size cables for EV charger current capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-emerald-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-emerald-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your EV charger installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=EVChargerVoltageDrop" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite EV Charger Voltage Drop Inquiry Form"
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
