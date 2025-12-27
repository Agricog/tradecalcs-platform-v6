import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Shield } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'swa-armoured-cable',
  title: 'SWA Armoured Cable Voltage Drop Calculator',
  metaTitle: 'SWA Cable Voltage Drop Calculator UK | Armoured Cable | BS 7671 | TradeCalcs',
  metaDescription: 'Free SWA armoured cable voltage drop calculator for UK electricians. Calculate voltage drop for buried and external cable runs. BS 7671 compliant with installation guidance.',
  heroDescription: 'Calculate voltage drop for Steel Wire Armoured cable - outbuildings, buried runs and external installations',
  
  defaults: {
    cableSize: '6',
    length: '30',
    current: '32',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'SWA has slightly higher resistance than equivalent T&E due to steel armour',
    'Use manufacturer mV/A/m values - they differ from standard copper tables',
    'Armour can be used as CPC but requires proper gland termination',
    'Direct burial depth minimum 450mm (600mm under roads)',
    'Typical outbuilding runs: 4mm² for lighting, 6mm² for 32A, 10mm² for workshop'
  ],

  symptomChecks: [
    { symptom: 'Garage supply (25m) - 32A', recommendation: '32A with 6mm² SWA (6.4 mV/A/m). At 25m: (6.4 × 32 × 25) ÷ 1000 = 5.12V (2.23%) ✓' },
    { symptom: 'Garden office (40m) - 32A', recommendation: '32A with 6mm² at 40m: (6.4 × 32 × 40) ÷ 1000 = 8.19V (3.56%) ⚠ consider 10mm²' },
    { symptom: 'Workshop with welder (50m) - 63A', recommendation: '63A with 16mm² SWA (2.4 mV/A/m). At 50m: (2.4 × 63 × 50) ÷ 1000 = 7.56V (3.29%) ✓' },
    { symptom: 'Outbuilding lighting only (30m)', recommendation: '6A with 4mm² SWA (9.5 mV/A/m). At 30m: (9.5 × 6 × 30) ÷ 1000 = 1.71V (0.74%) ✓' },
    { symptom: 'Annex full supply (35m) - 63A', recommendation: '63A with 16mm² at 35m: (2.4 × 63 × 35) ÷ 1000 = 5.29V (2.30%) ✓' }
  ],

  costEstimates: [
    { scenario: 'SWA to garage (<25m)', material: '£200-400', labour: '£350-550', total: '£550-950' },
    { scenario: 'SWA to garden office (25-40m)', material: '£350-600', labour: '£450-700', total: '£800-1300' },
    { scenario: 'SWA to workshop with CU (40m+)', material: '£500-900', labour: '£600-1000', total: '£1100-1900' },
    { scenario: 'Trench digging (per metre)', material: '£5-15', labour: '£20-40', total: '£25-55' },
    { scenario: 'SWA gland termination (each)', material: '£15-30', labour: '£30-60', total: '£45-90' }
  ],

  defined: {
    term: 'SWA Cable Construction',
    definition: 'Steel Wire Armoured cable has XLPE or PVC insulated conductors, bedding layer, steel wire armour (for mechanical protection), and outer PVC sheath. The armour provides crush and impact resistance for direct burial or external mounting. Single-phase uses 3-core (L, N, E), three-phase uses 4-core or 5-core. The steel armour adds to conductor resistance, giving higher mV/A/m values than equivalent non-armoured cable.'
  },

  defined2: {
    term: 'SWA Installation Requirements',
    definition: 'Direct burial requires minimum 450mm depth (600mm under roads/driveways). Cable should be laid on sand bed with sand cover and warning tape above. Route markers at each end and direction changes. Glands must be IP-rated for location. Underground joints are best avoided but must use resin-filled kits if necessary. Document the route for future reference.'
  },

  defined3: {
    term: 'Using Armour as Earth',
    definition: 'SWA armour can serve as the circuit protective conductor (CPC) if correctly terminated with brass glands and earth tags. The gland creates electrical continuity between armour and metal enclosure. Calculate armour CSA using BS 7671 tables - it must meet adiabatic requirements for fault current. For longer runs, a separate CPC conductor in the cable may be preferred.'
  },

  defined4: {
    term: 'SWA vs Alternatives',
    definition: 'SWA is standard for UK external/buried runs. Alternatives include: armoured data cable (for comms), SY cable (flexible armoured, not for burial), surface-mounted conduit with standard cable. For very long runs, aluminium SWA offers cost savings but needs larger sizes. Overhead cables avoid trenching but have planning and aesthetic issues.'
  },

  faqs: [
    {
      q: 'What size SWA for a garage supply?',
      a: 'Typically 6mm² 3-core SWA for a 32A supply up to about 35m. For longer runs or if you want a mini consumer unit with multiple circuits, 10mm² provides better margin. Calculate voltage drop for your specific length and load.'
    },
    {
      q: 'Why is SWA voltage drop higher than T&E?',
      a: 'The steel wire armour adds inductance and the construction is slightly different. Manufacturer data sheets show the actual mV/A/m values - typically 5-15% higher than equivalent unarmoured cable. Always use SWA-specific values for accurate calculations.'
    },
    {
      q: 'How deep should I bury SWA cable?',
      a: '450mm minimum under soil/lawn, 600mm under driveways or areas with vehicular traffic. Use sand bedding and cover, with yellow warning tape 150mm above the cable. Greater depth protects against accidental damage from gardening.'
    },
    {
      q: 'Do I need to use the armour as earth?',
      a: 'It\'s common practice and saves using a separate earth conductor. However, you must use proper brass cable glands with earth tags, and the armour CSA must meet fault current requirements. For critical circuits, a separate CPC gives belt-and-braces protection.'
    },
    {
      q: 'Can I run SWA on the surface?',
      a: 'Yes - SWA can be surface-mounted using saddle clips or cleats. It\'s weather-resistant and mechanically protected. Keep it out of reach where impact damage might occur. Surface mounting is often easier than trenching for short runs.'
    },
    {
      q: 'What glands do I need for SWA?',
      a: 'Indoor: standard brass glands (CW type). Outdoor/damp: weatherproof glands (rated IP66+). Size must match cable outer diameter. Include earth tags and locknuts. Gland kits usually include shrouds for weather protection.'
    },
    {
      q: 'How do I calculate armour earth capacity?',
      a: 'BS 7671 Appendix 4 provides armour CSA values. Use the adiabatic equation: S = √(I²t)/k where I is fault current, t is disconnection time, and k is material constant. For most domestic runs, standard SWA armour is adequate, but verify for long runs or high fault currents.'
    },
    {
      q: 'Can I joint SWA underground?',
      a: 'Best avoided - joints are potential failure points. If necessary, use proper resin-filled joint kits rated for direct burial. The joint must maintain mechanical protection and earth continuity. Document joint locations.'
    },
    {
      q: 'What about aluminium SWA?',
      a: 'Aluminium-conductor SWA costs less for larger sizes and is lighter for handling. However, it needs 60% larger CSA for equivalent current capacity and requires special termination techniques. Copper is usually preferred for domestic work.'
    },
    {
      q: 'Do I need RCD protection for SWA circuits?',
      a: 'Yes if feeding socket outlets or circuits requiring RCD protection under BS 7671. The SWA doesn\'t change RCD requirements. Typically install RCD or RCBO at the supply end (house consumer unit) or at the outbuilding distribution board.'
    },
    {
      q: 'How do I identify SWA cable size?',
      a: 'Size is printed on the outer sheath (e.g., "6943X 6mm²"). You can also measure conductor diameter and calculate CSA, or count armour wires and measure wire diameter. When in doubt, test resistance and compare to manufacturer data.'
    },
    {
      q: 'What testing is required for new SWA installation?',
      a: 'Full initial verification per BS 7671: insulation resistance, continuity (including armour), polarity, earth fault loop impedance, RCD operation if fitted. Document Ze at origin and Zs at outbuilding. Issue Electrical Installation Certificate.'
    }
  ]
}

export default function SWAArmouredCableVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="SWA cable voltage drop, armoured cable calculator, SWA cable size, buried cable voltage drop, outbuilding cable, steel wire armoured, external cable UK, BS 7671 SWA" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/swa-armoured-cable-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/swa-armoured-cable-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#475569" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'SWA Armoured Cable', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'SWA Armoured Cable Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '567' }
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
          <Link to="/electrical-calculators" className="inline-flex items-center text-slate-600 hover:text-slate-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-slate-600 to-gray-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Shield className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-slate-100 border-2 border-slate-500 rounded-lg p-4 mb-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-slate-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-slate-900">🔩 SWA HAS HIGHER mV/A/m THAN STANDARD CABLE</p>
                <p className="text-sm text-slate-800">Steel armour increases resistance. Use SWA-specific values from manufacturer data - typically 5-15% higher than equivalent T&E cable.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border-l-4 border-slate-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              SWA Cable Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
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

          <div className="bg-gray-100 border-2 border-gray-400 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-3">📐 SWA vs Standard Cable Comparison</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-gray-900">Standard 6mm² T&E</p>
                <p className="text-gray-800">mV/A/m = 7.3</p>
                <p className="text-gray-800">30m at 32A = 7.01V (3.05%)</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-gray-900">6mm² 3-core SWA</p>
                <p className="text-gray-800">mV/A/m ≈ 6.4 (XLPE) to 7.9 (PVC)</p>
                <p className="text-gray-800">30m at 32A = 6.14V-7.58V</p>
              </div>
            </div>
            <p className="text-xs text-gray-700 mt-3">Always check manufacturer data for exact mV/A/m values - they vary by insulation type and manufacturer.</p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need SWA Installation?</h3>
                <p className="text-purple-100">Get quotes from qualified electricians</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common SWA Installation Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-3">Related Outbuilding Calculations</h3>
            <p className="text-sm text-slate-800 mb-4">
              For specific outbuilding types: <Link to="/calculators/voltage-drop/outbuilding" className="text-slate-600 font-semibold hover:underline">submain to outbuilding</Link>, <Link to="/calculators/voltage-drop/workshop" className="text-slate-600 font-semibold hover:underline">workshop circuits</Link>, <Link to="/calculators/voltage-drop/annex" className="text-slate-600 font-semibold hover:underline">annex/granny flat</Link>. Use our <Link to="/cable-sizing-calculator" className="text-slate-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity.
            </p>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-slate-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">SWA Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for SWA cable work.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Consumer unit and internal wiring at outbuilding are additional.</p>
          </div>

          <div className="bg-gray-50 border-l-4 border-gray-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-gray-800">{usecaseData.defined2.definition}</p>
          </div>

          <div className="bg-zinc-50 border-l-4 border-zinc-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-zinc-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-zinc-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-zinc-800">{usecaseData.defined3.definition}</p>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 border-l-4 border-stone-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-stone-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-stone-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-slate-700">Size SWA for current capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-gray-700">Full BS 7671 voltage drop for all cables</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes for SWA Installation</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for outbuilding wiring? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=SWAArmouredCableVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite SWA Armoured Cable Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-slate-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-slate-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
