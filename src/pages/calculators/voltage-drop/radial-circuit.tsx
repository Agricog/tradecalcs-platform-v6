import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'radial-circuit',
  title: 'Radial Circuit Voltage Drop Calculator',
  metaTitle: 'Radial Circuit Voltage Drop Calculator UK | Socket Circuits | BS 7671 | TradeCalcs',
  metaDescription: 'Free radial circuit voltage drop calculator for UK electricians. Calculate voltage drop for 20A and 32A radial socket circuits. BS 7671 compliant with cable sizing guidance.',
  heroDescription: 'Calculate voltage drop for radial final circuits - sockets, spurs and dedicated supplies',
  
  defaults: {
    cableSize: '4',
    length: '20',
    current: '20',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'Radial circuits are simpler than rings - one cable from CU to final outlet',
    '20A radials use 2.5mm² cable, 32A radials use 4mm² cable minimum',
    'No divide-by-4 - use standard voltage drop formula throughout',
    'Maximum floor area: 20A = 50m², 32A = 75m² (guidance only)',
    'Increasingly popular over rings for simplicity and easier fault-finding'
  ],

  symptomChecks: [
    { symptom: '20A radial (20m) - 2.5mm² cable', recommendation: '20A with 2.5mm² (18 mV/A/m). At 20m: (18 × 20 × 20) ÷ 1000 = 7.20V (3.13%) ✓' },
    { symptom: '32A radial (15m) - 4mm² cable', recommendation: '32A with 4mm² (11 mV/A/m). At 15m: (11 × 32 × 15) ÷ 1000 = 5.28V (2.30%) ✓' },
    { symptom: '32A radial (25m) - needs upgrade?', recommendation: '32A with 4mm² at 25m: (11 × 32 × 25) ÷ 1000 = 8.80V (3.83%) ✓ but consider 6mm² for margin' },
    { symptom: '20A radial - long run (30m)', recommendation: '20A with 4mm² (11 mV/A/m). At 30m: (11 × 20 × 30) ÷ 1000 = 6.60V (2.87%) ✓' },
    { symptom: 'Multiple outlets on radial (worst case)', recommendation: 'Calculate to furthest outlet. If 5 sockets over 25m, use full 25m length with design current (usually <20A diversity applied).' }
  ],

  costEstimates: [
    { scenario: '20A radial - single room', material: '£60-120', labour: '£150-280', total: '£210-400' },
    { scenario: '32A radial - kitchen/utility', material: '£80-150', labour: '£180-320', total: '£260-470' },
    { scenario: 'Radial to outbuilding (<20m)', material: '£150-300', labour: '£250-400', total: '£400-700' },
    { scenario: 'Converting ring to radials', material: '£100-200', labour: '£300-500', total: '£400-700' },
    { scenario: 'Radial circuit testing', material: '£0', labour: '£60-120', total: '£60-120' }
  ],

  defined: {
    term: 'Radial Circuit Basics',
    definition: 'A radial circuit runs from the consumer unit to each outlet in sequence, ending at the final socket. Unlike ring circuits, current flows in one direction only. This makes voltage drop calculation straightforward: multiply mV/A/m by current by total cable length to furthest point. Radials are simpler to install, test, and fault-find than ring circuits.'
  },

  defined2: {
    term: '20A vs 32A Radial Circuits',
    definition: '20A radials (2.5mm² cable, 20A MCB) suit smaller areas - bedrooms, studies, limited socket runs. 32A radials (4mm² cable, 32A MCB) provide capacity similar to ring circuits and suit kitchens, living rooms, and higher-demand areas. Both require 30mA RCD protection for socket outlets.'
  },

  defined3: {
    term: 'Radial vs Ring: When to Use Each',
    definition: 'Radials are preferred for: dedicated circuits (cooker, shower), smaller socket runs, outbuildings, and where simplicity matters. Rings remain useful for large floor areas where copper savings justify complexity. Modern practice increasingly favours multiple radials with RCBOs over fewer rings, improving fault discrimination and safety.'
  },

  defined4: {
    term: 'Voltage Drop in Radial Chains',
    definition: 'For radials feeding multiple outlets, calculate voltage drop to the furthest socket using total cable length. The current at each socket varies, but for compliance calculations, assume design current flows the full length. In practice, diversity means actual voltage drop is lower than calculated worst-case.'
  },

  faqs: [
    {
      q: 'What\'s the maximum length for a 20A radial?',
      a: 'There\'s no fixed maximum - it depends on cable size and acceptable voltage drop. With 2.5mm² cable at 20A, you\'d hit 5% voltage drop at about 28m. Use 4mm² cable for longer runs to stay within limits.'
    },
    {
      q: 'Can I use a 32A radial instead of a ring?',
      a: 'Yes, a 32A radial with 4mm² cable provides similar capacity to a ring circuit. It\'s simpler to install and test. For larger areas, consider two 20A or 32A radials instead of one ring - better fault discrimination and easier maintenance.'
    },
    {
      q: 'How many sockets can I have on a radial?',
      a: 'BS 7671 doesn\'t limit socket numbers on radials. The constraint is floor area served: 50m² for 20A, 75m² for 32A (guidance values). In practice, 6-8 sockets on a 20A radial or 10-12 on a 32A radial is typical for domestic use.'
    },
    {
      q: 'Do I need RCD protection on radial circuits?',
      a: 'Yes, socket outlets require 30mA RCD protection regardless of circuit type. This can be at the consumer unit (RCD or RCBO) or as a socket-outlet with built-in RCD. The requirement applies to both radials and rings.'
    },
    {
      q: 'Why is voltage drop higher on radials than rings?',
      a: 'Rings benefit from current splitting both ways and the divide-by-4 effect. Radials have current flowing one direction through the full cable length. A 50m radial has 4× the voltage drop of a 50m ring with the same load.'
    },
    {
      q: 'Can I add spurs to a radial circuit?',
      a: 'Yes, spurs work the same as on rings. A non-fused spur can feed one single or twin socket. Fused spurs (via FCU) can feed multiple outlets. Calculate voltage drop including the spur length to the furthest point.'
    },
    {
      q: 'What cable size for a 32A radial?',
      a: '4mm² is the minimum for 32A radial circuits. For longer runs (over 20m) or where voltage drop is marginal, 6mm² provides better margin and lower energy losses. The 32A MCB protects either size adequately.'
    },
    {
      q: 'Are radials better than rings for new installations?',
      a: 'Many electricians now prefer radials for new domestic work. Benefits include: simpler testing, easier fault-finding, better discrimination with RCBOs, and clearer circuit allocation. The extra copper cost is offset by faster installation and fewer callbacks.'
    },
    {
      q: 'How do I convert a ring to radials?',
      a: 'Open the ring at the consumer unit (remove one leg). You now have two radials from the same MCB - not ideal but functional. Better approach: run new cables from separate MCBs/RCBOs, giving independent protection and clearer allocation.'
    },
    {
      q: 'What about diversity on radial circuits?',
      a: 'Diversity recognises that not all sockets draw maximum current simultaneously. For domestic radials, diversity is typically applied at the distribution board level, not individual circuit calculations. For voltage drop, use expected actual load or design current.'
    },
    {
      q: 'Can I mix socket types on a radial?',
      a: 'Yes, a radial can include 13A sockets, USB sockets, and fused connection units. Each outlet draws what it needs up to the circuit capacity. Ensure total connected load doesn\'t routinely exceed circuit rating.'
    },
    {
      q: 'Do kitchen circuits need to be radials?',
      a: 'Not required, but often preferred. Kitchens have high loads (kettle, toaster, microwave) that benefit from dedicated or higher-capacity circuits. A 32A radial or dedicated 20A circuits for worktop areas is common modern practice.'
    }
  ]
}

export default function RadialCircuitVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="radial circuit voltage drop, radial socket circuit, 20A radial, 32A radial, BS 7671 radial, socket circuit calculator, radial vs ring, UK electrical circuits" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/radial-circuit-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/radial-circuit-voltage-drop-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Radial Circuit', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Radial Circuit Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '567' }
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

        <div className="bg-gradient-to-r from-sky-500 to-blue-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <ArrowRight className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-sky-50 border-l-4 border-sky-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-sky-900 mb-3 flex items-center gap-2">
              <ArrowRight className="w-5 h-5" />
              Radial Circuit Quick Facts
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

          <div className="bg-blue-100 border-2 border-blue-400 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-3">📐 Radial vs Ring Comparison</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-blue-900">Radial (20m, 20A, 2.5mm²)</p>
                <p className="text-blue-800">= (18 × 20 × 20) ÷ 1000</p>
                <p className="text-blue-800 font-bold">= 7.20V (3.13%)</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-blue-900">Ring (40m total, 20A, 2.5mm²)</p>
                <p className="text-blue-800">= (18 × 20 × 40) ÷ 4 ÷ 1000</p>
                <p className="text-blue-800 font-bold">= 3.60V (1.57%)</p>
              </div>
            </div>
            <p className="text-xs text-blue-700 mt-3">Same effective distance to outlet - ring has half the voltage drop due to parallel paths.</p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need Help with Socket Circuits?</h3>
                <p className="text-purple-100">Get quotes from qualified domestic electricians</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Radial Circuit Scenarios</h2>
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
            <h3 className="font-bold text-sky-900 mb-3">Related Circuit Calculations</h3>
            <p className="text-sm text-sky-800 mb-4">
              Compare with <Link to="/calculators/voltage-drop/ring-circuit" className="text-sky-600 font-semibold hover:underline">ring circuit</Link> calculations. For dedicated circuits: <Link to="/calculators/voltage-drop/cooker-circuit" className="text-sky-600 font-semibold hover:underline">cooker</Link>, <Link to="/calculators/voltage-drop/shower-circuit" className="text-sky-600 font-semibold hover:underline">shower</Link>, <Link to="/calculators/voltage-drop/immersion-heater" className="text-sky-600 font-semibold hover:underline">immersion heater</Link>. Use our <Link to="/cable-sizing-calculator" className="text-sky-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity.
            </p>
          </div>

          <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-sky-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-sky-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Radial Circuit Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for radial circuit work.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-sky-50 border-b">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Work Type</th>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Costs vary by property type and cable route complexity.</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-sky-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-sky-700">Size cables for radial and ring circuits</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-blue-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for socket circuit installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=RadialCircuitVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Radial Circuit Voltage Drop Inquiry Form"
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
