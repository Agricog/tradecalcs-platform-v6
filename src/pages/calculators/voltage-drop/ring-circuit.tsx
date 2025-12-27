import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Circle } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'ring-circuit',
  title: 'Ring Circuit Voltage Drop Calculator',
  metaTitle: 'Ring Circuit Voltage Drop Calculator UK | Ring Main | BS 7671 | TradeCalcs',
  metaDescription: 'Free ring circuit voltage drop calculator for UK electricians. Calculate ring main voltage drop using the divide-by-4 method. BS 7671 compliant with instant results.',
  heroDescription: 'Calculate voltage drop for ring final circuits using BS 7671 methods',
  
  defaults: {
    cableSize: '2.5',
    length: '50',
    current: '13',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'Ring circuits use the "divide by 4" method - voltage drop is 1/4 of equivalent radial',
    'Standard UK ring: 2.5mm² cable, 32A MCB, maximum 100m² floor area',
    'Maximum cable length typically 112m total ring length (including spurs)',
    'Each socket on a ring is fed from two directions, halving effective cable length',
    'Spurs are calculated separately using radial method, then added to ring drop'
  ],

  symptomChecks: [
    { symptom: 'Standard ring (50m total) - 13A load', recommendation: 'Ring method: (18 × 13 × 50) ÷ 4 ÷ 1000 = 2.93V (1.27%) ✓' },
    { symptom: 'Large ring (80m total) - 13A load', recommendation: 'Ring method: (18 × 13 × 80) ÷ 4 ÷ 1000 = 4.68V (2.03%) ✓' },
    { symptom: 'Maximum ring (112m) - 13A load', recommendation: 'Ring method: (18 × 13 × 112) ÷ 4 ÷ 1000 = 6.55V (2.85%) ✓' },
    { symptom: 'Ring with 3m spur - 13A at spur end', recommendation: 'Ring drop at spur origin + spur drop: Ring (50m) = 2.93V + Spur (18 × 13 × 3) ÷ 1000 = 0.70V. Total = 3.63V (1.58%) ✓' },
    { symptom: 'Two 13A loads at worst points', recommendation: 'Calculate each load separately and sum. Each at opposite quarters of ring gives worst case. Usually still compliant on standard rings.' }
  ],

  costEstimates: [
    { scenario: 'New ring circuit - small room', material: '£80-150', labour: '£200-350', total: '£280-500' },
    { scenario: 'New ring circuit - large room', material: '£120-220', labour: '£250-450', total: '£370-670' },
    { scenario: 'Full house rewire (rings)', material: '£800-1500', labour: '£1500-3000', total: '£2300-4500' },
    { scenario: 'Add spur to existing ring', material: '£30-60', labour: '£80-150', total: '£110-210' },
    { scenario: 'Ring circuit testing/certification', material: '£0', labour: '£80-150', total: '£80-150' }
  ],

  defined: {
    term: 'Ring Circuit Voltage Drop Method',
    definition: 'Ring circuits are unique to the UK and require a special calculation method. Because current can flow in either direction around the ring, the effective cable length is halved. The "divide by 4" formula accounts for this: Voltage Drop = (mV/A/m × Current × Total Ring Length) ÷ 4 ÷ 1000. This is equivalent to halving the length AND halving the current, giving 1/4 of the radial calculation.'
  },

  defined2: {
    term: 'Ring Circuit Design Rules',
    definition: 'BS 7671 specifies ring final circuit requirements: 2.5mm² minimum cable size, 30A or 32A overcurrent protection, floor area served typically up to 100m². The ring must form a complete loop from and back to the same MCB terminals. Each socket can be on the ring or fed as a spur. Non-fused spurs are limited to one per point on the ring.'
  },

  defined3: {
    term: 'Spur Calculations on Ring Circuits',
    definition: 'Spurs are calculated using the standard radial method, not the divide-by-4 ring method. Calculate voltage drop to the spur origin using ring method, then add the spur voltage drop using radial method. The total must comply with BS 7671 limits. Fused spurs (via fused connection unit) can feed multiple outlets; non-fused spurs are limited to one single or twin socket.'
  },

  defined4: {
    term: 'Ring Circuit Testing',
    definition: 'Ring circuits require specific testing to verify continuity and correct wiring. The R1+R2 test measures total ring resistance. End-to-end readings should be within 0.05Ω of each other for L, N and E. Cross-connection tests identify breaks or interconnections. These tests also provide data needed for voltage drop verification during periodic inspection.'
  },

  faqs: [
    {
      q: 'Why do ring circuits have lower voltage drop than radials?',
      a: 'Because current can flow both ways around the ring to reach any point. This effectively halves the maximum cable length to any socket, and current splits between the two paths. The divide-by-4 factor accounts for both effects.'
    },
    {
      q: 'What is the maximum length for a ring circuit?',
      a: 'There\'s no absolute maximum, but practical limits exist. At 112m total ring length with a 13A load, voltage drop reaches about 2.85%. The 100m² floor area guidance typically results in 50-80m total cable length for most installations.'
    },
    {
      q: 'How do I calculate voltage drop for multiple loads on a ring?',
      a: 'Calculate each load separately considering its position on the ring, then sum the voltage drops. For loads at different positions, the calculation becomes complex - design software or detailed manual calculation is recommended for multiple simultaneous loads.'
    },
    {
      q: 'Can I use 4mm² cable for a ring circuit?',
      a: 'Yes, 4mm² cable reduces voltage drop significantly. At 50m: (11 × 13 × 50) ÷ 4 ÷ 1000 = 1.79V (0.78%). This is useful for large rings or where voltage drop is marginal with 2.5mm². The 32A MCB still provides adequate protection.'
    },
    {
      q: 'How do spurs affect ring circuit voltage drop?',
      a: 'Spurs add their own voltage drop calculated using the radial method. Find the voltage drop at the spur origin using ring method, then add the spur\'s radial drop. A 3m spur adds about 0.70V at 13A - usually not significant unless the ring is already near the limit.'
    },
    {
      q: 'What happens if the ring is broken?',
      a: 'A broken ring becomes two radials, dramatically increasing voltage drop and potentially overloading one leg of cable. A break at the midpoint doubles the effective length and removes the parallel path benefit. This is why ring continuity testing is critical.'
    },
    {
      q: 'Why is the UK the only country using ring circuits?',
      a: 'Ring circuits were introduced post-WW2 to save copper during shortages while maintaining capacity. The design allows smaller cable (2.5mm² vs 4mm²+ radials) to serve the same load. Most other countries use radial circuits with larger cables and more circuits.'
    },
    {
      q: 'How do I test ring circuit continuity?',
      a: 'Perform the R1+R2 test: measure resistance of live, neutral, and earth conductors end-to-end at the consumer unit. Values should be within 0.05Ω of each other. Then perform cross-readings by linking L-N and N-E at the furthest point to verify the ring is complete.'
    },
    {
      q: 'Can a ring circuit feed fixed appliances?',
      a: 'Yes, fixed appliances can connect via fused connection units (FCUs) on the ring. The FCU fuse (typically 3A or 13A) provides additional protection. For high-power fixed appliances like cookers or showers, use dedicated radial circuits instead.'
    },
    {
      q: 'What\'s the worst-case load position on a ring?',
      a: 'The worst case for a single load is at the point diametrically opposite the supply - exactly halfway around the ring. At this point, current splits equally both ways, giving maximum cable length to the load. Multiple loads at different positions create complex interactions.'
    },
    {
      q: 'Should I use ring or radial circuits in new installations?',
      a: 'Both are valid under BS 7671. Rings use less copper for equivalent capacity but are more complex to test and fault-find. Radials are simpler and increasingly popular, especially with RCBOs. Many electricians now prefer radials for new domestic installations.'
    },
    {
      q: 'How does diversity apply to ring circuit voltage drop?',
      a: 'In practice, not all sockets draw maximum current simultaneously. BS 7671 voltage drop calculations typically use design current or actual load, not theoretical maximum. For verification, calculate with realistic load scenarios rather than assuming 32A throughout.'
    }
  ]
}

export default function RingCircuitVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="ring circuit voltage drop, ring main voltage drop, ring circuit calculator, BS 7671 ring circuit, divide by 4 method, ring final circuit, UK ring main, 2.5mm ring circuit" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/ring-circuit-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/ring-circuit-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#8b5cf6" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Ring Circuit', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Ring Circuit Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '892' }
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-violet-600 hover:text-violet-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Circle className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-violet-100 border-2 border-violet-500 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-violet-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-violet-900">🔄 RING CIRCUIT - USE DIVIDE BY 4 METHOD</p>
                <p className="text-sm text-violet-800">Ring circuits have 1/4 the voltage drop of equivalent radials. Enter TOTAL ring length below - the calculator shows standard radial result, then manually apply ÷4 for ring circuits.</p>
              </div>
            </div>
          </div>

          <div className="bg-violet-50 border-l-4 border-violet-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-violet-900 mb-3 flex items-center gap-2">
              <Circle className="w-5 h-5" />
              Ring Circuit Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-violet-900">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
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

          <div className="bg-purple-100 border-2 border-purple-400 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-3">📐 Ring Circuit Formula</h3>
            <div className="bg-white rounded p-4 font-mono text-sm mb-4">
              <p className="text-purple-800">Ring Voltage Drop = (mV/A/m × Current × Total Ring Length) ÷ 4 ÷ 1000</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-purple-50 rounded p-3">
                <p className="font-semibold text-purple-900">Example: 50m ring, 13A load</p>
                <p className="text-purple-800">= (18 × 13 × 50) ÷ 4 ÷ 1000</p>
                <p className="text-purple-800">= 11,700 ÷ 4 ÷ 1000</p>
                <p className="text-purple-800 font-bold">= 2.93V (1.27%) ✓</p>
              </div>
              <div className="bg-purple-50 rounded p-3">
                <p className="font-semibold text-purple-900">Same as radial would be:</p>
                <p className="text-purple-800">= (18 × 13 × 50) ÷ 1000</p>
                <p className="text-purple-800">= 11.70V (5.09%) ✗</p>
                <p className="text-purple-800 font-bold">Ring saves 8.77V!</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need Help with Ring Circuits?</h3>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Ring Circuit Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-violet-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-violet-50 border border-violet-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-violet-900 mb-3">Related Circuit Calculations</h3>
            <p className="text-sm text-violet-800 mb-4">
              Compare with <Link to="/calculators/voltage-drop/radial-circuit" className="text-violet-600 font-semibold hover:underline">radial circuit</Link> voltage drop. For <Link to="/calculators/voltage-drop/cooker-circuit" className="text-violet-600 font-semibold hover:underline">cooker circuits</Link> (dedicated radial). <Link to="/calculators/voltage-drop/shower-circuit" className="text-violet-600 font-semibold hover:underline">Shower circuits</Link> are always radial. Use our <Link to="/cable-sizing-calculator" className="text-violet-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity.
            </p>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-violet-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-violet-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ring Circuit Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for ring circuit work.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-violet-50 border-b">
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

          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-purple-800">{usecaseData.defined2.definition}</p>
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

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-blue-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-violet-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-violet-700">Size cables for ring and radial circuits</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-purple-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-purple-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for ring circuit installation or testing? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=RingCircuitVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Ring Circuit Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-violet-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-violet-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
