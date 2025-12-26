import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Flame } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'cooker-circuit',
  title: 'Cooker Circuit Voltage Drop Calculator',
  metaTitle: 'Cooker Circuit Voltage Drop Calculator UK | Electric Oven & Hob | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for cooker circuits. Check BS 7671 compliance for electric ovens, hobs, and range cookers using official Table 4D1B mV/A/m values.',
  heroDescription: 'Check voltage drop compliance for cooker circuits with diversity calculations',
  
  defaults: {
    cableSize: '6',
    length: '12',
    current: '32',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'Cooker diversity: First 10A at 100%, remainder at 30%, plus 5A if socket outlet',
    'Standard cable: 6mm² (7.3 mV/A/m) for most domestic cookers',
    'Range cookers may need 10mm² cable and 45A MCB',
    'Cooker control unit should be within 2m of cooker',
    'Combined oven + hob on single circuit uses diversity calculation'
  ],

  symptomChecks: [
    { symptom: 'Standard oven + hob (12kW total)', recommendation: 'Diversity: 10A + (42A × 30%) + 5A = 27.6A. 32A with 6mm² at 12m: (7.3 × 32 × 12) ÷ 1000 = 2.80V (1.22%) ✓' },
    { symptom: 'Single built-in oven (3kW)', recommendation: '13A load. Can use 2.5mm² but 6mm² preferred. At 10m with 6mm²: (7.3 × 13 × 10) ÷ 1000 = 0.95V (0.41%) ✓' },
    { symptom: 'Induction hob only (7.4kW)', recommendation: '32A load (no diversity for single appliance). At 15m with 6mm²: (7.3 × 32 × 15) ÷ 1000 = 3.50V (1.52%) ✓' },
    { symptom: 'Range cooker (15kW+)', recommendation: 'Diversity: 10A + (55A × 30%) + 5A = 31.5A. 45A MCB, 10mm² recommended. At 15m: (4.4 × 32 × 15) ÷ 1000 = 2.11V (0.92%) ✓' },
    { symptom: 'Long run to kitchen extension (25m)', recommendation: '32A with 10mm² (4.4 mV/A/m). At 25m: (4.4 × 32 × 25) ÷ 1000 = 3.52V (1.53%) ✓' }
  ],

  costEstimates: [
    { scenario: 'Simple cooker circuit (10m)', material: '£60-120', labour: '£150-250', total: '£210-370' },
    { scenario: 'Standard install with CCU (15m)', material: '£100-180', labour: '£200-350', total: '£300-530' },
    { scenario: 'Long run or difficult route', material: '£150-280', labour: '£280-450', total: '£430-730' },
    { scenario: 'Range cooker (45A circuit)', material: '£180-320', labour: '£250-400', total: '£430-720' },
    { scenario: 'Separate hob + oven circuits', material: '£150-280', labour: '£350-550', total: '£500-830' }
  ],

  defined: {
    term: 'Cooker Circuit Diversity',
    definition: 'Unlike showers, cookers rarely run all elements at full power simultaneously. BS 7671 allows diversity calculation: first 10A at 100%, remainder of rated current at 30%, plus 5A if a socket outlet is included. This typically reduces design current significantly - a 12kW cooker (52A) has design current of only ~28A after diversity.'
  },

  defined2: {
    term: 'Why Cooker Diversity Applies',
    definition: 'A typical cooker has multiple elements (oven, grill, hob rings) but users rarely run everything at once. Even when cooking a roast dinner, not all hob rings and oven elements operate continuously at full power. Diversity reflects real-world usage patterns and prevents oversizing circuits.'
  },

  faqs: [
    {
      q: 'How do I calculate cooker diversity?',
      a: 'Diversity formula: First 10A at 100% + remainder at 30% + 5A if socket. Example: 12kW cooker = 52A. Diversity = 10A + (42A × 0.3) + 5A = 10 + 12.6 + 5 = 27.6A design current.'
    },
    {
      q: 'What cable size for a standard cooker?',
      a: 'Most domestic cookers (up to 13kW) use 6mm² cable with 32A MCB. After diversity, a 12kW cooker only needs about 28A design current. 6mm² at 7.3 mV/A/m handles typical kitchen runs easily.'
    },
    {
      q: 'Do I need 10mm² cable for a range cooker?',
      a: 'Possibly. Large range cookers (15kW+) may need 10mm² cable and 45A MCB. Calculate diversity first - even 15kW only gives ~32A design current. 10mm² provides better voltage drop margin for these larger appliances.'
    },
    {
      q: 'Can I put oven and hob on the same circuit?',
      a: 'Yes, this is standard practice using a cooker control unit. Combined ratings are added before applying diversity. A 3kW oven + 7kW hob = 10kW total = 43A. With diversity: 10 + (33 × 0.3) + 5 = 24.9A.'
    },
    {
      q: 'What MCB rating for a cooker circuit?',
      a: '32A for most domestic cookers. 45A for large range cookers. The MCB rating must exceed the design current after diversity. Type B is standard for resistive cooking loads.'
    },
    {
      q: 'Does an induction hob use more power?',
      a: 'Induction hobs are typically 7-7.4kW, similar to traditional hobs. However, they can draw full power more quickly as they heat faster. Still use standard diversity calculation for combined oven + hob.'
    },
    {
      q: 'What is a cooker control unit (CCU)?',
      a: 'A CCU provides a switch for the cooker circuit plus a 13A socket outlet. It should be within 2m of the cooker but not directly above it. The 5A addition in diversity calculation accounts for this socket.'
    },
    {
      q: 'Can I connect a cooker to a ring main?',
      a: 'No. Cookers must have dedicated radial circuits from the consumer unit. A spur from a ring main is only suitable for small appliances under 3kW.'
    },
    {
      q: 'Do I need RCD protection for a cooker circuit?',
      a: 'Not mandatory for fixed cooking appliances under current BS 7671, but many installations include RCD protection for all circuits. Check your specific installation requirements.'
    },
    {
      q: 'How close should the isolator be to the cooker?',
      a: 'The cooker control unit or switch should be within 2m of the cooker, positioned so the user does not have to reach across the cooker to operate it. Not directly above the hob.'
    }
  ],

  defined3: {
    term: 'Diversity vs No Diversity',
    definition: 'Diversity applies to cookers with multiple elements (oven + hob). For a single appliance like standalone induction hob, no diversity applies - use full rated current. A 7.4kW induction hob = 32A with no reduction. Only apply diversity when combining multiple cooking appliances on one circuit.'
  }
}

export default function CookerCircuitVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="cooker circuit voltage drop, electric oven cable size, range cooker electrical, induction hob cable, BS 7671 cooker, cooker diversity calculation" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/cooker-circuit-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/cooker-circuit-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#ea580c" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Cooker Circuit', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Cooker Circuit Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '378' }
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-orange-600 hover:text-orange-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Flame className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Cooker Circuit Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-orange-900">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
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
                <p className="text-purple-100">Get quotes from vetted, local contractors for your cooker installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Cooker Circuit Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-3">Related High-Power Circuits</h3>
            <p className="text-sm text-orange-800 mb-4">
              Installing an electric <Link to="/calculators/voltage-drop/shower-circuit" className="text-orange-600 font-semibold hover:underline">shower circuit</Link>? Similar cable sizing applies but no diversity. For cable current capacity, use our <Link to="/cable-sizing-calculator" className="text-orange-600 font-semibold hover:underline">cable sizing calculator</Link>. See our <Link to="/voltage-drop-calculator" className="text-orange-600 font-semibold hover:underline">main voltage drop calculator</Link> for all circuit types.
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-orange-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cooker Circuit Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs. Excludes cooker appliance cost.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Excludes cooker appliance cost.</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-red-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-red-800">{usecaseData.defined2.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-orange-700">Size cables for cooker current capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-red-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-red-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your cooker circuit installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=CookerCircuitVoltageDrop" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Cooker Circuit Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-orange-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
