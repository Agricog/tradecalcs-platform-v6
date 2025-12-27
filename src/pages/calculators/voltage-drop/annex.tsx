import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Home } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'annex',
  title: 'Annex & Granny Flat Voltage Drop Calculator',
  metaTitle: 'Annex Voltage Drop Calculator UK | Granny Flat Electrical | Separate Dwelling | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for annex and granny flat installations. BS 7671 compliant for separate dwelling supplies from main house. Calculate submain cable sizing.',
  heroDescription: 'Calculate voltage drop for annex and granny flat electrical supplies',
  
  defaults: {
    cableSize: '16',
    length: '30',
    current: '63',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'Annexes may require separate metering depending on occupancy and planning status',
    'Full dwelling loads include heating, hot water, cooking - size for 60-100A typical',
    'Building Regulations Part P applies - installation must be certified',
    'Consider future EV charging and heat pump requirements in sizing',
    'Fire separation between main house and annex may affect cable routing'
  ],

  symptomChecks: [
    { symptom: 'Small annex (studio flat) - 20m run', recommendation: '40A with 10mm² (4.4 mV/A/m). At 20m: (4.4 × 40 × 20) ÷ 1000 = 3.52V (1.53%) ✓' },
    { symptom: 'Standard granny flat - 30m run', recommendation: '63A with 16mm² (2.8 mV/A/m). At 30m: (2.8 × 63 × 30) ÷ 1000 = 5.29V (2.30%) ✓' },
    { symptom: 'Full annex (2-bed) - 40m run', recommendation: '80A with 25mm² (1.75 mV/A/m). At 40m: (1.75 × 80 × 40) ÷ 1000 = 5.60V (2.43%) ✓' },
    { symptom: 'Garden annex - long run (50m)', recommendation: '63A with 25mm² (1.75 mV/A/m). At 50m: (1.75 × 63 × 50) ÷ 1000 = 5.51V (2.40%) ✓' },
    { symptom: 'Annex with heat pump + EV', recommendation: '100A with 35mm² (1.25 mV/A/m). At 30m: (1.25 × 100 × 30) ÷ 1000 = 3.75V (1.63%) ✓' }
  ],

  costEstimates: [
    { scenario: 'Small annex supply (<20m)', material: '£500-900', labour: '£600-1000', total: '£1100-1900' },
    { scenario: 'Standard annex (20-35m)', material: '£800-1400', labour: '£800-1300', total: '£1600-2700' },
    { scenario: 'Large/distant annex (35-50m)', material: '£1200-2000', labour: '£1000-1500', total: '£2200-3500' },
    { scenario: 'Annex consumer unit (10-way)', material: '£300-500', labour: '£300-500', total: '£600-1000' },
    { scenario: 'Complete annex wiring (per room)', material: '£200-400', labour: '£250-450', total: '£450-850' }
  ],

  defined: {
    term: 'Annex Electrical Requirements',
    definition: 'An annex is effectively a small dwelling requiring full electrical facilities: lighting, power, heating, hot water, cooking. Unlike outbuildings, annexes have sustained loads similar to houses. Size the supply cable for maximum demand: all heating + cooking + general loads with appropriate diversity. Typical annexes need 40-80A supplies; larger ones with modern loads may need 100A.'
  },

  defined2: {
    term: 'Metering Options for Annexes',
    definition: 'Annexes can be supplied from the main house (shared meter) or have separate metering. Separate meters are required for independent letting and may be required by the DNO for larger annexes. Sub-metering (meter after main house meter) is an option for family use. Consult your DNO and local planning authority for specific requirements.'
  },

  defined3: {
    term: 'Part P Building Regulations',
    definition: 'Annex electrical installations are notifiable work under Part P of Building Regulations. The work must be done by a registered competent person (registered electrician) or inspected by Building Control. You\'ll receive an Electrical Installation Certificate and Building Regulations compliance certificate. Non-compliant work can cause problems when selling.'
  },

  defined4: {
    term: 'Future-Proofing Annex Supplies',
    definition: 'Modern annexes may eventually need EV charging (7kW = 32A), heat pumps (16-32A), and high-power appliances. Size the main supply cable with growth in mind - upgrading buried cable later is expensive and disruptive. A 100A supply provides excellent headroom and costs little more than 63A for the cable run.'
  },

  faqs: [
    {
      q: 'What size electrical supply does an annex need?',
      a: 'Depends on facilities. Studio/bedsit: 40A may suffice. 1-bed flat: 63A typical. Larger or with electric heating/cooking: 80-100A. If you\'re installing electric heating or planning EV charging, go for 100A to future-proof.'
    },
    {
      q: 'Can I supply an annex from my house consumer unit?',
      a: 'Yes, if your main supply has sufficient spare capacity. The annex feed is treated as a submain from your consumer unit to an annex consumer unit. Your total maximum demand (house + annex) must not exceed your main supply capacity.'
    },
    {
      q: 'Does my annex need its own consumer unit?',
      a: 'Yes. The annex should have its own consumer unit with main switch, RCDs, and individual circuits. This provides local isolation, proper protection, and complies with BS 7671 requirements for dwellings.'
    },
    {
      q: 'Do I need a separate electricity meter?',
      a: 'Depends on use. Family accommodation can share the house meter. Letting to non-family typically requires separate metering. Some DNOs require separate supplies for independent dwellings. Check with your DNO and local planning authority.'
    },
    {
      q: 'What cable type for an underground run to an annex?',
      a: 'SWA (Steel Wire Armoured) cable is standard. Bury minimum 450mm deep (600mm under driveways). The armour provides mechanical protection and can serve as the earth conductor if properly terminated with brass glands.'
    },
    {
      q: 'Can I run the cable overhead to my annex?',
      a: 'Possible but underground is usually preferred. Overhead requires minimum 3.5m clearance (5.2m over vehicle areas), catenary support, and UV-resistant cable. Underground is more aesthetically acceptable and protected from weather damage.'
    },
    {
      q: 'What about fire separation between house and annex?',
      a: 'Building Regulations may require fire separation. Cables passing through fire barriers need appropriate fire stopping. Attached annexes may need fire-rated enclosures for cables. Consult Building Control for specific requirements.'
    },
    {
      q: 'How do I calculate annex maximum demand?',
      a: 'Add up all fixed loads (heating, hot water, cooker) plus socket outlets with diversity. Typical: 100% of largest appliance + 75% of second + 40% of others. A 1-bed with electric heating might calculate to 50A; with heat pump and EV ready, plan for 80-100A.'
    },
    {
      q: 'Should I install three-phase to my annex?',
      a: 'Not usually necessary for domestic annexes. Three-phase is useful for very large properties or specific equipment. Single-phase 100A supply provides ample capacity for typical annex needs including future EV charging.'
    },
    {
      q: 'What earthing arrangement for an annex?',
      a: 'Usually TN-S or TN-C-S extending from the main house supply. The annex earth connects back to the main earthing terminal. The SWA armour can provide the earth path if properly installed. Consult your electrician for site-specific requirements.'
    },
    {
      q: 'Do I need planning permission for annex electrical work?',
      a: 'The electrical work itself doesn\'t need planning permission, but the annex building might. Electrical installation is covered by Building Regulations Part P. Ensure both planning and building regulations compliance for the overall project.'
    },
    {
      q: 'Can I do the wiring myself and get it inspected?',
      a: 'Technically yes - you can notify Building Control and have them inspect. However, annexes are complex installations and DIY errors are costly. Using a registered electrician who self-certifies is usually more practical and often similar cost.'
    }
  ]
}

export default function AnnexVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="annex voltage drop, granny flat electrical, separate dwelling supply, annex consumer unit, SWA cable annex, submain to annex, Part P annex, garden room electrical" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/annex-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/annex-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#ec4899" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Annex', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Annex Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '287' }
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-pink-600 hover:text-pink-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Home className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-pink-50 border-l-4 border-pink-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-pink-900 mb-3 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Annex Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-pink-900">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 mt-0.5 flex-shrink-0" />
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
                <h3 className="text-xl font-bold mb-1">Need an Electrician for Your Annex?</h3>
                <p className="text-purple-100">Get quotes from Part P registered contractors</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Annex Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-pink-900 mb-3">Related Calculations</h3>
            <p className="text-sm text-pink-800 mb-4">
              For simpler <Link to="/calculators/voltage-drop/submain-outbuilding" className="text-pink-600 font-semibold hover:underline">outbuilding submains</Link>. Adding <Link to="/calculators/voltage-drop/ev-charger" className="text-pink-600 font-semibold hover:underline">EV charging</Link> to the annex? <Link to="/calculators/voltage-drop/heat-pump" className="text-pink-600 font-semibold hover:underline">Heat pump</Link> calculations for electric heating. Use our <Link to="/cable-sizing-calculator" className="text-pink-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity.
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-pink-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-pink-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Annex Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for annex electrical installations.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-pink-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Full annex fit-out costs vary significantly by size and specification.</p>
          </div>

          <div className="bg-rose-50 border-l-4 border-rose-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-rose-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-rose-800">{usecaseData.defined2.definition}</p>
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

          <div className="bg-fuchsia-50 border-l-4 border-fuchsia-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-fuchsia-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-fuchsia-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-pink-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-pink-700">Size cables for annex supply capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-rose-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-rose-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your annex or granny flat project? Tell us about your requirements and we'll connect you with Part P registered contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=AnnexVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Annex Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-pink-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-pink-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
