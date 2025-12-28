import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Home } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'garden-office-cable-sizing',
  title: 'Garden Office & Outbuilding Cable Sizing Calculator',
  metaTitle: 'Garden Office Cable Size Calculator UK | Shed Workshop Outbuilding | BS 7671 | TradeCalcs',
  metaDescription: 'Free garden office cable sizing calculator for UK electricians. Calculate correct cable size for sheds, workshops, outbuildings and garden rooms. BS 7671 compliant with SWA and voltage drop analysis.',
  heroDescription: 'Calculate the correct cable size for garden offices, sheds, workshops and outbuildings',
  
  defaults: {
    loadType: 'amps' as const,
    current: '32',
    kW: '',
    length: '25',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'SWA (Steel Wire Armoured) cable required for buried runs',
    'Minimum burial depth: 450mm under paths, 600mm under driveways',
    'Long runs (20m+) often need 6mm² or 10mm² for voltage drop',
    'RCD protection mandatory for outdoor circuits',
    'Separate consumer unit recommended for garden buildings'
  ],

  symptomChecks: [
    { symptom: 'Small shed - lighting + sockets only', recommendation: '16A or 20A circuit, 2.5mm² SWA for runs under 20m' },
    { symptom: 'Garden office - full power needs', recommendation: '32A circuit, 4mm² or 6mm² SWA depending on length' },
    { symptom: 'Workshop with power tools', recommendation: '32A or 40A circuit, 6mm² or 10mm² SWA for voltage drop' },
    { symptom: 'Outbuilding with EV charger', recommendation: 'Separate 32A EV circuit + general circuit, may need 16mm² submain' },
    { symptom: 'Long run over 40m', recommendation: 'Consider 10mm² or 16mm² SWA, check voltage drop carefully' }
  ],

  costEstimates: [
    { scenario: 'Shed supply, short run (<15m)', material: '£150-250', labour: '£200-350', total: '£350-600' },
    { scenario: 'Garden office, medium run (15-30m)', material: '£300-500', labour: '£350-500', total: '£650-1000' },
    { scenario: 'Workshop, long run (30-50m)', material: '£500-800', labour: '£450-650', total: '£950-1450' },
    { scenario: 'Outbuilding with mini consumer unit', material: '£200-350', labour: '£250-400', total: '£450-750 (additional)' },
    { scenario: 'Groundwork/trenching (per metre)', material: '£5-15', labour: '£20-40', total: '£25-55/m' }
  ],

  defined: {
    term: 'Garden Office Cable Sizing',
    definition: 'Garden office cable sizing determines the conductor cross-sectional area (mm²) needed to safely supply power to detached garden buildings. Long cable runs create significant voltage drop, often requiring larger cables than the load alone would suggest. SWA (Steel Wire Armoured) cable is standard for buried outdoor runs, providing mechanical protection and earth continuity.'
  },

  defined2: {
    term: 'SWA Cable for Outdoor Runs',
    definition: 'Steel Wire Armoured (SWA) cable has steel wire armouring for mechanical protection and is suitable for direct burial. It provides its own earth via the armouring. Standard sizes are 3-core (L/N/E) for single circuits or 5-core for submains. SWA must be terminated with proper glands to maintain protection rating and earth continuity.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a garden office?',
      a: 'Typical garden offices need 32A supply with 4mm² or 6mm² SWA cable. For runs over 25m, 6mm² is usually required to keep voltage drop under 5%. If you plan to add EV charging or significant loads, consider 10mm² submain to a mini consumer unit.'
    },
    {
      q: 'Do I have to use SWA cable for garden buildings?',
      a: 'For buried cables, SWA is the standard choice - it provides mechanical protection required for direct burial. Alternatives include running cable through buried conduit, but this is more labour-intensive. For short overhead runs, standard cable in conduit may be acceptable.'
    },
    {
      q: 'How deep should I bury SWA cable?',
      a: 'Minimum burial depths per BS 7671: 450mm under garden/grass, 600mm under driveways or areas with vehicular access. Cable should be laid on sand bedding and covered with warning tape. Always avoid running near other services (gas, water, drainage).'
    },
    {
      q: 'Why is voltage drop such an issue for garden buildings?',
      a: 'Long cable runs mean more resistance and greater voltage drop. A 30m run at 32A can drop 7-8% with 4mm² cable - exceeding the 5% limit. This causes equipment underperformance, LED flickering, and motor problems. Larger cable reduces resistance and voltage drop.'
    },
    {
      q: 'Do I need a separate consumer unit in the garden building?',
      a: 'Recommended for larger installations. A mini consumer unit (garage unit) provides local RCD protection, circuit separation, and easier fault finding. For simple shed lighting, a fused connection from the house may suffice. Garden offices typically benefit from dedicated consumer units.'
    },
    {
      q: 'What RCD protection is required for garden circuits?',
      a: '30mA RCD protection is mandatory for all outdoor circuits under BS 7671. This can be at the house consumer unit or in a local unit at the outbuilding. Time-delayed RCDs at source prevent nuisance tripping when using RCDs at both ends.'
    },
    {
      q: 'Can I extend my ring main to the garden building?',
      a: 'Not recommended. Garden buildings should have dedicated radial circuits from the main consumer unit, or a submain to a local consumer unit. Ring mains are not suitable for outdoor extensions. The long cable run and potential load requires properly sized dedicated supply.'
    },
    {
      q: 'How do I calculate cable size for long runs?',
      a: 'Two factors: current capacity and voltage drop. Even if 2.5mm² handles your current, a 40m run at 20A drops 7.2V (3.1%) - add your existing drop from the supply. Our calculator checks both and recommends appropriate cable size.'
    },
    {
      q: 'Is Part P notification required for garden building electrics?',
      a: 'Yes, new outdoor circuits and garden building electrical installations are notifiable under Part P. Work must be done by a registered competent person or inspected by Building Control. This ensures safety compliance and is required for insurance validity.'
    },
    {
      q: 'What about 3-phase supply to workshops?',
      a: 'Large workshops with welders, compressors, or heavy machinery may benefit from 3-phase supply. This requires DNO application and 5-core SWA cable. Most domestic properties dont have 3-phase available without significant upgrade costs.'
    }
  ],

  defined3: {
    term: 'Voltage Drop in Long Cable Runs',
    definition: 'Voltage drop is proportional to cable length, current, and inversely proportional to cable size. Formula: VD = (2 × L × I × mV/A/m) ÷ 1000. For a 30m run at 32A with 4mm² cable: VD = (2 × 30 × 32 × 11) ÷ 1000 = 21V (9.1%) - far exceeding the 5% limit. Using 6mm² reduces this to 14V (6.1%), still marginal. 10mm² gives 8.4V (3.7%) - compliant.'
  },

  defined4: {
    term: 'Submain vs Final Circuit',
    definition: 'A submain supplies a distribution board (consumer unit) rather than directly supplying equipment. For garden buildings, a submain to a mini consumer unit allows multiple final circuits (lighting, sockets, dedicated appliances) with local protection. This is more flexible than running multiple final circuits from the house.'
  }
}

export default function GardenOfficeCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="garden office cable size, shed electrical cable, workshop cable calculator, outbuilding cable size, SWA cable calculator, BS 7671 garden, garden room electrical, outdoor cable sizing" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/garden-office-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/garden-office-cable-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Garden Office Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Garden Office Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '876' }
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
                'name': 'How to Size Cable for Garden Office Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for garden office and outbuilding electrical supply.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Assess power requirements', 'text': 'List all equipment and calculate total expected load in amps or kW' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run distance', 'text': 'Measure total cable route from house consumer unit to outbuilding' },
                  { '@type': 'HowToStep', 'name': 'Account for voltage drop', 'text': 'Long runs require larger cable to keep voltage drop under 5%' },
                  { '@type': 'HowToStep', 'name': 'Select SWA cable size', 'text': 'Use our calculator to determine minimum SWA cable size' },
                  { '@type': 'HowToStep', 'name': 'Plan distribution', 'text': 'Decide if mini consumer unit needed for multiple circuits' }
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

        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12 px-4">
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
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Garden Building Cable Quick Facts
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
                <p className="text-purple-100">Get quotes from vetted, local contractors for your garden office installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Garden Building Installations</h2>
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

          {/* Internal linking section */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-teal-900 mb-3">Complete Garden & Outbuilding Electrical</h3>
            <p className="text-sm text-teal-800 mb-4">
              Garden offices often benefit from <Link to="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="text-teal-600 font-semibold hover:underline">solar PV installations</Link> for off-grid or reduced running costs. Add an <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="text-teal-600 font-semibold hover:underline">EV charger</Link> to your outbuilding supply. For workshop spaces, see our <Link to="/calculators/cable-sizing/garage-workshop-cable-sizing" className="text-teal-600 font-semibold hover:underline">garage and workshop guide</Link>. Property security? Check <Link to="/calculators/cable-sizing/cctv-security-cable-sizing" className="text-teal-600 font-semibold hover:underline">CCTV and security systems</Link>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-green-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Garden Building Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs including SWA cable, groundwork, and labour.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Groundwork costs vary significantly by ground conditions and access.</p>
          </div>

          <div className="bg-teal-50 border-l-4 border-teal-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-teal-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-teal-800">{usecaseData.defined2.definition}</p>
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
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Critical for long garden building runs</p>
              </Link>
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-blue-700">Full BS 7671 cable sizing for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your garden office installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=GardenOfficeCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Garden Office Cable Sizing Inquiry Form"
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
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-green-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
