import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Lock } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'electric-gates-cable-sizing',
  title: 'Electric Gates Cable Sizing Calculator',
  metaTitle: 'Electric Gates Cable Size Calculator UK | Gate Automation | BS 7671 | TradeCalcs',
  metaDescription: 'Free electric gates cable sizing calculator for UK electricians. Calculate correct cable size for automatic gate motors, intercoms, and access control. BS 7671 compliant.',
  heroDescription: 'Calculate the correct cable size for electric gate automation and access control systems',
  
  defaults: {
    loadType: 'amps' as const,
    current: '6',
    kW: '',
    length: '25',
    method: 'D',
    lighting: false
  },

  keyFacts: [
    'Most domestic gate motors draw 2-6A running, 10-15A starting',
    'SWA cable typically required for buried runs to gate posts',
    'Low voltage control cables separate from mains supply',
    'Consider intercom, keypad, and lighting loads',
    'Outdoor isolator switch required at motor location'
  ],

  symptomChecks: [
    { symptom: 'Single swing gate motor', recommendation: '6A circuit typically sufficient, 2.5mm² SWA for most runs' },
    { symptom: 'Double swing gate (2 motors)', recommendation: '10A circuit, 2.5mm² or 4mm² SWA depending on length' },
    { symptom: 'Sliding gate motor (heavier duty)', recommendation: '16A circuit recommended, 2.5mm² or 4mm² SWA' },
    { symptom: 'Gate + intercom + lighting', recommendation: 'Calculate combined load, may need larger cable or separate circuits' },
    { symptom: 'Commercial/industrial gate', recommendation: 'Three-phase may be needed for large gates, check motor specs' }
  ],

  costEstimates: [
    { scenario: 'Gate motor supply, short run (<15m)', material: '£120-220', labour: '£180-300', total: '£300-520' },
    { scenario: 'Gate motor supply, medium run (15-30m)', material: '£200-350', labour: '£250-400', total: '£450-750' },
    { scenario: 'Gate motor supply, long run (30m+)', material: '£300-500', labour: '£350-500', total: '£650-1000' },
    { scenario: 'Intercom/access control wiring', material: '£80-180', labour: '£120-220', total: '£200-400' },
    { scenario: 'Pillar lighting circuit', material: '£100-200', labour: '£150-280', total: '£250-480' }
  ],

  defined: {
    term: 'Electric Gate Cable Sizing',
    definition: 'Electric gate cable sizing determines the conductor cross-sectional area (mm²) for gate automation systems. The mains supply cable (typically SWA for buried runs) must handle motor starting current, which is significantly higher than running current. Separate low-voltage cables are used for control signals, intercoms, and safety devices.'
  },

  defined2: {
    term: 'Gate Motor Starting Current',
    definition: 'Gate motors draw 3-5 times their running current when starting. A motor rated at 3A running may draw 10-15A momentarily when the gate begins moving. Cable sizing must account for this, and Type C MCBs prevent nuisance tripping. Some installers upsize cables to handle voltage drop during starting.'
  },

  faqs: [
    {
      q: 'What cable size do I need for electric gates?',
      a: 'Most domestic gate motors need 2.5mm² SWA cable on a 6A or 10A circuit. For runs over 25m, consider 4mm² to ensure adequate voltage during motor starting. Always check the specific motor\'s maximum current draw.'
    },
    {
      q: 'Do I need SWA cable for gate motors?',
      a: 'Yes, for buried cable runs to gate posts, SWA (Steel Wire Armoured) cable is required. It provides mechanical protection for direct burial. Burial depth minimum 450mm in gardens, 600mm under driveways. Mark the route with warning tape.'
    },
    {
      q: 'What about low voltage control cables?',
      a: 'Gate systems use separate low voltage cables (typically 12-24V) for control signals, safety beams, intercoms, and keypads. These are usually multicore cables and don\'t need SWA protection but should be run in ducting if buried. Keep them separate from mains cables.'
    },
    {
      q: 'Do gate circuits need RCD protection?',
      a: 'Yes, 30mA RCD protection is required for outdoor circuits. The RCD can be at the consumer unit or in a local outdoor enclosure. Consider time-delayed RCDs if using multiple RCDs in series.'
    },
    {
      q: 'What MCB type for gate motors?',
      a: 'Type C MCBs are recommended for gate motors due to inrush current when starting. Type B MCBs may nuisance trip, especially in cold weather when motor bearings are stiff. 6A or 10A Type C is typical for domestic gates.'
    },
    {
      q: 'Do I need an isolator at the gate?',
      a: 'Yes, a local isolator switch is required adjacent to the motor for safe maintenance. This should be a lockable rotary isolator, IP65 rated minimum for outdoor use. It allows disconnection without returning to the consumer unit.'
    },
    {
      q: 'Can I power gate lights from the motor circuit?',
      a: 'Small LED pillar lights can often share the gate circuit if total load allows. Larger lighting loads should have a separate circuit. Always calculate total connected load including motors, lighting, and any heated elements in the control box.'
    },
    {
      q: 'What about solar-powered gates?',
      a: 'Solar gate systems use battery storage and 12V/24V motors, eliminating the need for mains cable runs. They\'re ideal for remote locations but may struggle in winter or with heavy use. Mains-powered systems are more reliable for frequent operation.'
    },
    {
      q: 'Is Part P notification required for gate electrics?',
      a: 'Yes, installing a new outdoor circuit for gate automation is notifiable under Part P. This includes the supply cable and any associated lighting. Work must be done by a registered competent person or inspected by Building Control.'
    },
    {
      q: 'What safety devices are required?',
      a: 'Gate automation requires safety devices: photocells (safety beams), pressure-sensitive edges, and/or obstacle detection. These connect to the control unit via low-voltage cables. The installer must ensure compliance with Machinery Directive requirements - this is beyond electrical installation.'
    }
  ],

  defined3: {
    term: 'SWA Cable for Gates',
    definition: 'Steel Wire Armoured (SWA) cable is essential for buried gate installations. The steel wire layer provides mechanical protection, allowing direct burial without additional conduit. For gates, 3-core SWA (L, N, E) is standard. The armour is used as the circuit protective conductor (CPC) and must be properly terminated and bonded.'
  },

  defined4: {
    term: 'Gate Control Systems',
    definition: 'Gate control units manage motor operation, safety devices, and access control. They typically operate on 12V or 24V DC internally, with separate terminals for motor, safety devices, intercoms, keypads, and remote receivers. The mains supply cable powers the control unit, which then drives the motor.'
  }
}

export default function ElectricGatesCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="electric gate cable size, gate automation electrical, gate motor cable calculator, SWA cable gates, BS 7671 gate, automatic gate electrician, access control wiring" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/electric-gates-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/electric-gates-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#1d4ed8" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Electric Gates Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Electric Gates Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '456' }
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
                '@type': 'HowTo',
                'name': 'How to Size Cable for Electric Gate Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for automatic gate systems.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Check motor specifications', 'text': 'Find running current and starting current from motor data' },
                  { '@type': 'HowToStep', 'name': 'Add accessory loads', 'text': 'Include intercom, lighting, and control unit consumption' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run', 'text': 'Measure from consumer unit to gate motor location' },
                  { '@type': 'HowToStep', 'name': 'Size mains cable', 'text': 'Calculate SWA cable size for total load and distance' },
                  { '@type': 'HowToStep', 'name': 'Plan control cables', 'text': 'Specify low-voltage cables for safety devices and access control' }
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
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link to="/cable-sizing-calculators" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Cable Sizing Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-zinc-700 to-slate-700 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Lock className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-zinc-50 border-l-4 border-zinc-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-zinc-900 mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Electric Gate Cable Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-900">
                  <CheckCircle2 className="w-4 h-4 text-zinc-600 mt-0.5 flex-shrink-0" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg mb-8">
            <CableSizingCalculatorCore
              defaultLoadType={usecaseData.defaults.loadType}
              defaultCurrent={usecaseData.defaults.current}
              defaultKW={usecaseData.defaults.kW}
              defaultLength={usecaseData.defaults.length}
              defaultMethod={usecaseData.defaults.method}
              defaultLighting={usecaseData.defaults.lighting}
            />          </div>

          {/* CONTRACTOR LEAD CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need a Qualified Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted, local contractors for your electric gate installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Gate Installations</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-zinc-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internal linking section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-3">Complete Property Security & Access</h3>
            <p className="text-sm text-blue-800 mb-4">
              Gate installations often pair with <Link to="/calculators/cable-sizing/cctv-security-cable-sizing" className="text-blue-600 font-semibold hover:underline">CCTV and security systems</Link> for complete property protection. For EV charging near gates or driveways, see our <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="text-blue-600 font-semibold hover:underline">EV charger cable calculator</Link>. Garden and driveway lighting uses similar SWA cable requirements - check our <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="text-blue-600 font-semibold hover:underline">outdoor electrical guide</Link>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-zinc-50 to-slate-50 border border-zinc-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-zinc-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-zinc-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Gate Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK electrical installation costs. Does not include gate hardware or automation kit.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Groundwork for cable burial is often the major cost factor.</p>
          </div>

          <div className="bg-slate-50 border-l-4 border-slate-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-slate-800">{usecaseData.defined2.definition}</p>
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

          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-purple-800">{usecaseData.defined4.definition}</p>
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
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/calculators/cable-sizing/cctv-security-cable-sizing" className="block p-4 bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-900 mb-1">CCTV & Security</h3>
                <p className="text-sm text-slate-700">Complete property security</p>
              </Link>
              <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">EV Charger</h3>
                <p className="text-sm text-green-700">Driveway charging points</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-blue-700">Check long runs to gates</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your electric gate installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ElectricGatesCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Electric Gates Cable Sizing Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
  <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
</p>
            </div>
          </div>

          <div className="bg-zinc-700 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-zinc-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
