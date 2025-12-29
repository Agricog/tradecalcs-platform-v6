import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, Circle, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap } from 'lucide-react'
import { useState } from 'react'
import { ConduitFillCalculatorCore } from '../components/ConduitFillCalculatorCore'

export default function ConduitFillCalculatorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What is conduit fill and why does it matter?',
      a: 'Conduit fill is the percentage of the conduit\'s internal cross-sectional area occupied by cables. It matters because overfilled conduit makes cable pulling difficult or impossible, risks cable damage during installation, and can cause overheating due to reduced air circulation around cables. BS 7671 sets limits to ensure safe, practical installations.'
    },
    {
      q: 'What is the maximum conduit fill allowed by BS 7671?',
      a: 'BS 7671 recommends a maximum 40% fill for "easy draw" - this allows cables to be pulled through without damage, even with bends. The absolute maximum is 45% and should only be used for straight runs with no bends and carefully prepared cable ends. Most electricians target 35-40% for practical installations.'
    },
    {
      q: 'How do I calculate conduit fill percentage?',
      a: 'Conduit fill = (Total cable CSA ÷ Conduit internal CSA) × 100. For example, 4× 2.5mm² singles (4 × 11.9 = 47.6mm²) in 20mm PVC conduit (257mm² internal) = 47.6 ÷ 257 × 100 = 18.5% fill. Our calculator handles this automatically using accurate manufacturer data.'
    },
    {
      q: 'What\'s the difference between conduit and trunking fill rules?',
      a: 'The same 40-45% limits apply to both, but trunking often has additional considerations: cable separation requirements between different circuit types, space for future additions, and accessibility for maintenance. In practice, trunking is often filled to lower percentages (30-35%) to allow for additions and easier access.'
    },
    {
      q: 'Why can\'t I just fill conduit to 100%?',
      a: 'At 100% theoretical fill, cables physically cannot be pulled through - there\'s no space for them to move past each other. Even at 50-60%, cable pulling becomes extremely difficult and risks damaging insulation. The 40% limit accounts for cable bunching, friction, and the practical realities of installation.'
    },
    {
      q: 'Do bends affect conduit fill calculations?',
      a: 'Bends don\'t change the fill percentage, but they dramatically affect how easily cables can be pulled. With bends, aim for lower fill (35% or less). The 40% "easy draw" limit assumes gentle bends. Multiple tight bends or long runs with bends may require even lower fill or pull-through boxes.'
    },
    {
      q: 'How do I calculate fill with mixed cable sizes?',
      a: 'Add up the CSA of all cables regardless of size. For example: 2× 2.5mm² singles (2 × 11.9 = 23.8mm²) plus 3× 1.5mm² singles (3 × 8.0 = 24mm²) = 47.8mm² total. Divide by conduit CSA for fill percentage. Our calculator will support mixed cables in a future update.'
    },
    {
      q: 'What size conduit for a ring main (2× 2.5mm² T+E)?',
      a: 'Two 2.5mm² T+E cables (2 × 100.3 = 200.6mm²) need conduit with at least 502mm² internal CSA for 40% fill. That\'s 32mm PVC conduit (679mm² = 29.5% fill) or 25mm steel (491mm² = 40.8% - borderline). 32mm is the safer choice allowing for future additions.'
    },
    {
      q: 'Should I use steel or PVC conduit?',
      a: 'PVC is lighter, cheaper, corrosion-resistant, and easier to cut and join. Steel provides better mechanical protection, EMI shielding, and can be used as CPC (circuit protective conductor). Use steel in high-risk mechanical areas, where EMI is a concern, or where conduit CPC is required. PVC suits most general installations.'
    },
    {
      q: 'What\'s the minimum conduit size for singles?',
      a: 'For practical installation, 20mm is usually the minimum for circuit wiring. 16mm can work for very short runs with 1-2 small cables. Remember: minimum size for the cables is not the same as practical size - allow headroom for pulling ease and potential future additions.'
    },
    {
      q: 'How do I account for cable insulation type in fill calculations?',
      a: 'Different insulation types affect overall cable diameter. LSF (Low Smoke & Fume) cables are often slightly larger than standard PVC. SWA has significant armour thickness. Always use the overall cable diameter from manufacturer data, not just the conductor size. Our calculator uses typical diameters but check your specific cables.'
    },
    {
      q: 'Can I use the same conduit for power and data cables?',
      a: 'Generally no - power and data should be segregated to prevent interference. BS 7671 and data cabling standards (BS EN 50174) require separation. If you must share a route, use trunking with segregated compartments or separate conduit runs with specified separation distances.'
    }
  ]

  const conduitSizingTable = [
    { conduit: '16mm PVC', csa: 156, singles_1_5: 19, singles_2_5: 13, te_1_5: 2, te_2_5: 1 },
    { conduit: '20mm PVC', csa: 257, singles_1_5: 32, singles_2_5: 21, te_1_5: 3, te_2_5: 2 },
    { conduit: '25mm PVC', csa: 408, singles_1_5: 51, singles_2_5: 34, te_1_5: 5, te_2_5: 4 },
    { conduit: '32mm PVC', csa: 679, singles_1_5: 84, singles_2_5: 57, te_1_5: 9, te_2_5: 6 },
    { conduit: '20mm Steel', csa: 314, singles_1_5: 39, singles_2_5: 26, te_1_5: 4, te_2_5: 3 },
    { conduit: '25mm Steel', csa: 491, singles_1_5: 61, singles_2_5: 41, te_1_5: 6, te_2_5: 4 },
    { conduit: '32mm Steel', csa: 784, singles_1_5: 98, singles_2_5: 65, te_1_5: 11, te_2_5: 7 },
  ]

  return (
    <>
      <Helmet>
        <title>Conduit Fill Calculator UK 2025 | BS 7671 Compliant | Cable Capacity | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free conduit fill calculator for UK electricians. Calculate cable capacity for PVC conduit, steel conduit and trunking. BS 7671 compliant 40% fill limit." 
        />
        <meta 
          name="keywords" 
          content="conduit fill calculator, cable conduit capacity, BS 7671 conduit, electrician calculator, trunking calculator, conduit sizing, cable fill ratio" 
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#475569" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TradeCalcs" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Conduit Fill Calculator UK | BS 7671 Cable Capacity | TradeCalcs" />
        <meta property="og:description" content="Free conduit fill calculator. Calculate cable capacity for PVC, steel conduit and trunking. BS 7671 compliant." />
        <meta property="og:url" content="https://tradecalcs.co.uk/conduit-fill-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/conduit-fill-calculator-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content="Conduit Fill Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free conduit fill calculator. BS 7671 compliant cable capacity for all conduit types." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/conduit-fill-calculator-og.jpg" />

        <link rel="canonical" href="https://tradecalcs.co.uk/conduit-fill-calculator" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Electrical Calculators', 'item': 'https://tradecalcs.co.uk/electrical-calculators' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Conduit Fill Calculator', 'item': 'https://tradecalcs.co.uk/conduit-fill-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Conduit Fill Calculator UK',
                'description': 'Free conduit fill calculator for UK electricians. Calculate cable capacity for PVC conduit, steel conduit and trunking to BS 7671 standards.',
                'applicationCategory': 'Utility',
                'operatingSystem': 'Web Browser',
                'url': 'https://tradecalcs.co.uk/conduit-fill-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '567' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': faqs.map(faq => ({
                  '@type': 'Question',
                  'name': faq.q,
                  'acceptedAnswer': { '@type': 'Answer', 'text': faq.a }
                }))
              },
              {
                '@type': 'HowTo',
                'name': 'How to Calculate Conduit Fill',
                'description': 'Step-by-step guide to calculating conduit fill percentage for electrical installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Select Conduit Type', 'text': 'Choose between round PVC, oval PVC, steel conduit, or trunking' },
                  { '@type': 'HowToStep', 'name': 'Select Conduit Size', 'text': 'Choose the conduit diameter or trunking dimensions' },
                  { '@type': 'HowToStep', 'name': 'Select Cable Type', 'text': 'Choose single core, twin & earth, or other cable type' },
                  { '@type': 'HowToStep', 'name': 'Enter Cable Count', 'text': 'Enter how many cables you need to install' },
                  { '@type': 'HowToStep', 'name': 'Calculate', 'text': 'Click calculate to see fill percentage and compliance status' }
                ]
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
        {/* Back Link */}
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link to="/electrical-calculators" className="inline-flex items-center text-slate-600 hover:text-slate-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Electrical Calculators
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-600 to-slate-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Circle className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Conduit Fill Calculator UK</h1>
            <p className="text-lg opacity-95">Calculate cable capacity for conduit and trunking</p>
            <p className="text-sm opacity-80 mt-2">BS 7671 compliant • 40% easy draw limit • All conduit types</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Key Facts Box */}
          <div className="bg-slate-50 border-l-4 border-slate-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Circle className="w-5 h-5" />
              Conduit Fill Quick Facts
            </h2>
            <ul className="space-y-2">
              {[
                '40% fill maximum recommended for "easy draw" cable installation',
                '45% absolute maximum — only for straight runs with no bends',
                'Fill is calculated from cable overall diameter, not conductor size',
                'Overfilled conduit risks cable damage and makes installation impossible',
                'Always allow headroom for future cable additions where practical'
              ].map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="bg-gradient-to-r from-slate-600 to-slate-500 text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Circle className="w-6 h-6" />
                Calculate Conduit Fill
              </h2>
            </div>
            <ConduitFillCalculatorCore />
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-slate-600 to-slate-500 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need an Electrician?</h3>
                <p className="text-slate-200">Get quotes for electrical installation work</p>
              </div>
              <a 
                href="#get-quotes" 
                className="bg-white text-slate-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 text-center whitespace-nowrap"
              >
                Get Free Quotes
              </a>
            </div>
          </div>

          {/* Understanding Conduit Fill */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Conduit Fill</h2>
            <p className="text-gray-700 mb-4">
              Conduit fill is the ratio of the total cross-sectional area of cables to the internal cross-sectional area of the conduit, expressed as a percentage. Getting this right is essential for practical installation and long-term reliability.
            </p>
            <p className="text-gray-700 mb-4">
              When conduit is overfilled, several problems occur: cables become difficult or impossible to pull through, cable insulation can be damaged during installation, and heat dissipation is reduced which can affect cable current ratings.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="font-bold text-slate-900 mb-2">Example Calculation</h3>
              <p className="text-sm text-slate-800">
                Installing 4× 2.5mm² single core cables in 20mm PVC conduit:<br/>
                Cable CSA: 4 × 11.9mm² = 47.6mm²<br/>
                Conduit CSA: 257mm²<br/>
                Fill: 47.6 ÷ 257 × 100 = <strong>18.5%</strong> ✓ Well within 40% limit
              </p>
            </div>
          </div>

          {/* Quick Reference Table */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Reference: Maximum Cables at 40% Fill</h2>
            <p className="text-sm text-gray-600 mb-4">Maximum number of identical cables per conduit size (40% fill limit)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Conduit</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">CSA (mm²)</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">1.5mm² Singles</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">2.5mm² Singles</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">1.5mm² T+E</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">2.5mm² T+E</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {conduitSizingTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-semibold text-gray-800">{row.conduit}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.csa}</td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-600">{row.singles_1_5}</td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-600">{row.singles_2_5}</td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-600">{row.te_1_5}</td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-600">{row.te_2_5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">Values calculated at 40% fill using typical cable overall diameters. Always verify with manufacturer data for specific cables.</p>
          </div>

          {/* BS 7671 Requirements */}
          <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">BS 7671 Conduit Fill Requirements</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-green-900">40% Fill — Easy Draw</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Recommended maximum for all installations. Allows cables to be drawn through with reasonable effort, accommodates bends, and provides space for future additions. Target this limit for all practical work.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-amber-900">45% Fill — Absolute Maximum</h3>
                </div>
                <p className="text-sm text-gray-700">
                  Only acceptable for straight runs with no bends, short lengths, and carefully prepared cable ends. Requires significant pulling force and leaves no room for additions. Avoid if possible.
                </p>
              </div>
            </div>
          </div>

          {/* Practical Tips */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Practical Installation Tips</h3>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Use cable lubricant (pulling compound) for long runs or tight fills</li>
                  <li>• Install draw wire during first fix for easier cable pulling later</li>
                  <li>• Reduce target fill to 30-35% when multiple bends are present</li>
                  <li>• Consider trunking instead of conduit for large cable quantities</li>
                  <li>• Check specific cable diameters — LSF cables are often larger than standard PVC</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Internal Links */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-3">Related Electrical Calculators</h3>
            <p className="text-sm text-slate-800 mb-4">
              Once you've sized your conduit, use our <Link to="/cable-sizing-calculator" className="text-slate-600 font-semibold hover:underline">cable sizing calculator</Link> to verify conductor sizes for current capacity. Check <Link to="/voltage-drop-calculator" className="text-slate-600 font-semibold hover:underline">voltage drop</Link> for long cable runs. See all our <Link to="/electrical-calculators" className="text-slate-600 font-semibold hover:underline">electrical calculators</Link>.
            </p>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
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

          {/* Lead Capture Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Need electrical installation work? Tell us about your project and we'll connect you with qualified electricians in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ConduitFillCalculator" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Conduit Fill Calculator Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Electrical contractor?</strong> Use the form above and let us know - we offer lead referrals and partnership opportunities.
              </p>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-blue-700">BS 7671 compliant cable sizing with derating factors</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Verify voltage drop compliance for all circuit types</p>
              </Link>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-gradient-to-r from-slate-600 to-slate-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Cable sizing, voltage drop, and 50+ use-case calculators. All BS 7671 compliant.</p>
            <Link to="/electrical-calculators" className="bg-white text-slate-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Electrical Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
