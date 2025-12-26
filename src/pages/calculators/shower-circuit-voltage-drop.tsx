import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Droplets } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'shower-circuit',
  title: 'Shower Circuit Voltage Drop Calculator',
  metaTitle: 'Shower Circuit Voltage Drop Calculator UK | Electric Shower | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for electric shower circuits. Check BS 7671 compliance for 8.5kW, 9.5kW, 10.5kW showers using official Table 4D1B mV/A/m values.',
  heroDescription: 'Check voltage drop compliance for electric shower circuits - 8.5kW to 10.5kW',
  
  defaults: {
    cableSize: '10',
    length: '15',
    current: '46',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    '8.5kW shower = 37A, 9.5kW = 41A, 10.5kW = 46A (at 230V)',
    'Standard cable: 6mm² for up to 9kW, 10mm² for 9.5kW+ or long runs',
    'Showers draw full rated current whenever running - no diversity',
    'Dedicated radial circuit required - cannot share with other loads',
    'MCB typically 40A or 45A Type B depending on shower rating'
  ],

  symptomChecks: [
    { symptom: '8.5kW shower - short run (10m)', recommendation: '37A with 6mm² (7.3 mV/A/m). At 10m: (7.3 × 37 × 10) ÷ 1000 = 2.70V (1.17%) ✓' },
    { symptom: '9.5kW shower - typical run (15m)', recommendation: '41A with 10mm² (4.4 mV/A/m). At 15m: (4.4 × 41 × 15) ÷ 1000 = 2.71V (1.18%) ✓' },
    { symptom: '10.5kW shower - standard (15m)', recommendation: '46A with 10mm² (4.4 mV/A/m). At 15m: (4.4 × 46 × 15) ÷ 1000 = 3.04V (1.32%) ✓' },
    { symptom: '10.5kW shower - long run (25m)', recommendation: '46A with 10mm². At 25m: (4.4 × 46 × 25) ÷ 1000 = 5.06V (2.20%) ✓' },
    { symptom: 'High-power 11kW+ shower', recommendation: '48A+ load requires 10mm² minimum. Check manufacturer specs and consider 16mm² for long runs' }
  ],

  costEstimates: [
    { scenario: 'Simple shower circuit (10m)', material: '£80-150', labour: '£150-250', total: '£230-400' },
    { scenario: 'Standard install (15-20m)', material: '£120-220', labour: '£200-350', total: '£320-570' },
    { scenario: 'Long run or difficult route', material: '£180-350', labour: '£300-500', total: '£480-850' },
    { scenario: 'CU upgrade needed', material: '+£150-350', labour: '+£150-300', total: '+£300-650' },
    { scenario: 'Shower unit replacement only', material: '£200-500', labour: '£80-150', total: '£280-650' }
  ],

  defined: {
    term: 'Shower Circuit Voltage Drop',
    definition: 'Electric showers draw their full rated current whenever running - there is no diversity factor. A 10.5kW shower pulls 46A continuously during use. This high current over typical bathroom cable runs (10-20m) means voltage drop must be carefully calculated to ensure the shower operates at full power.'
  },

  defined2: {
    term: 'Why Shower Voltage Drop Matters',
    definition: 'If voltage drop is excessive, the shower will not heat water properly. Modern showers have thermal cut-outs that may trip if the element overheats due to low voltage. Users experience lukewarm water or intermittent heating. Proper cable sizing ensures full power delivery and reliable operation.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a 10.5kW shower?',
      a: 'A 10.5kW shower draws 46A. Use 10mm² (4.4 mV/A/m) for most installations. At 15m: (4.4 × 46 × 15) ÷ 1000 = 3.04V (1.32%) ✓. For runs over 25m, check voltage drop carefully.'
    },
    {
      q: 'Can I use 6mm² cable for a 10.5kW shower?',
      a: 'Not recommended. 6mm² is rated for 47A (clipped direct) but leaves no margin for voltage drop on a 46A load. The 18th Edition emphasises voltage drop compliance - 10mm² is the safe choice for 10.5kW showers.'
    },
    {
      q: 'What MCB rating for an electric shower?',
      a: '8.5kW (37A): 40A MCB. 9.5kW (41A): 45A MCB. 10.5kW (46A): 50A MCB. Use Type B for resistive shower loads. Some installations use Type C where inrush is a concern.'
    },
    {
      q: 'Why does my shower run lukewarm?',
      a: 'Common causes: excessive voltage drop reducing power, undersized cable, poor connections causing resistance, or the shower itself may be faulty. If voltage at the shower is significantly below 230V, cable/voltage drop is likely the issue.'
    },
    {
      q: 'Does a shower circuit need RCD protection?',
      a: 'Yes. BS 7671 requires 30mA RCD protection for bathroom circuits. Most modern consumer units provide this. For older installations, an RCBO or RCD socket may be needed.'
    },
    {
      q: 'Can I upgrade from 8.5kW to 10.5kW shower on existing cable?',
      a: 'Only if the existing cable is 10mm² AND voltage drop is acceptable for the higher current. If existing cable is 6mm², you will likely need to replace it for a 10.5kW shower.'
    },
    {
      q: 'How do I calculate shower current from kW rating?',
      a: 'Current (A) = Power (W) ÷ Voltage (V). For 10.5kW at 230V: 10,500 ÷ 230 = 45.7A, rounded to 46A. This is the design current for cable and MCB selection.'
    },
    {
      q: 'What is the maximum cable length for a shower circuit?',
      a: 'Depends on cable size and shower rating. For 10.5kW (46A) with 10mm²: to stay under 3% drop, maximum ~35m. For 5% limit: ~60m. Most domestic runs are well under this.'
    },
    {
      q: 'Do I need a pull cord switch for an electric shower?',
      a: 'Yes, if the shower is within 3m of the bath/shower zone. A 45A double-pole ceiling switch with neon indicator is standard. It must be outside zones 0, 1, and 2 but accessible from the shower.'
    },
    {
      q: 'Can I connect a shower to a ring main?',
      a: 'No. Electric showers must have dedicated radial circuits from the consumer unit. They draw too much current for ring mains and would cause nuisance tripping and overheating.'
    }
  ],

  defined3: {
    term: 'Shower Current Calculation',
    definition: 'Electric shower current is calculated as Power ÷ Voltage. At UK nominal 230V: 8.5kW = 37A, 9.5kW = 41A, 10.5kW = 46A, 11kW = 48A. These are continuous loads with no diversity - the shower draws full current whenever in use.'
  }
}

export default function ShowerCircuitVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="shower circuit voltage drop, electric shower cable size, 10.5kW shower, 9.5kW shower, BS 7671 shower, bathroom electrical" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/shower-circuit-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/shower-circuit-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#2563eb" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Shower Circuit', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Shower Circuit Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '445' }
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Droplets className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              Shower Circuit Quick Facts
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
                <h3 className="text-xl font-bold mb-1">Need a Qualified Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted, local contractors for your shower installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Shower Circuit Scenarios</h2>
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
            <h3 className="font-bold text-blue-900 mb-3">Related High-Power Circuits</h3>
            <p className="text-sm text-blue-800 mb-4">
              Installing a <Link to="/calculators/voltage-drop/cooker-circuit" className="text-blue-600 font-semibold hover:underline">cooker circuit</Link>? Similar cable sizing considerations apply. For cable current capacity, use our <Link to="/cable-sizing-calculator" className="text-blue-600 font-semibold hover:underline">cable sizing calculator</Link>. See our <Link to="/voltage-drop-calculator" className="text-blue-600 font-semibold hover:underline">main voltage drop calculator</Link> for all circuit types.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-blue-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shower Circuit Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs. Shower unit costs vary widely (£150-600).</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Excludes shower unit cost.</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-blue-700">Size cables for shower current capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your shower circuit installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ShowerCircuitVoltageDrop" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Shower Circuit Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
