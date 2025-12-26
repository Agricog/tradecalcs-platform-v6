import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, TreePine } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'shed-summer-house-cable-sizing',
  title: 'Shed & Summer House Cable Sizing Calculator',
  metaTitle: 'Shed Summer House Cable Size Calculator UK | Garden Power | BS 7671 | TradeCalcs',
  metaDescription: 'Free shed and summer house cable sizing calculator for UK electricians. Calculate correct cable size for garden buildings. BS 7671 compliant with SWA and armoured cable guidance.',
  heroDescription: 'Calculate the correct cable size for sheds, summer houses, and garden building power supplies',
  
  defaults: {
    loadType: 'amps' as const,
    current: '16',
    kW: '',
    length: '20',
    method: 'D',
    lighting: false
  },

  keyFacts: [
    'Most sheds need 16A-32A supply depending on use',
    'SWA cable required for buried outdoor runs',
    'RCD protection mandatory for outdoor circuits',
    'Minimum burial depth: 450mm (600mm under driveways)',
    'Outdoor isolator switch recommended at shed entry'
  ],

  symptomChecks: [
    { symptom: 'Basic shed (lighting + sockets only)', recommendation: '16A circuit, 2.5mm² SWA for runs up to 30m' },
    { symptom: 'Summer house with heating', recommendation: '20A-32A circuit, 4mm² or 6mm² SWA depending on length' },
    { symptom: 'Shed with power tools', recommendation: '32A circuit recommended, 6mm² SWA for most runs' },
    { symptom: 'Summer house with kitchen appliances', recommendation: '32A circuit, 6mm² SWA, consider dedicated circuits' },
    { symptom: 'Long run to bottom of garden (40m+)', recommendation: 'Upsize cable for voltage drop - likely 6mm² or 10mm²' }
  ],

  costEstimates: [
    { scenario: 'Basic shed supply (<15m)', material: '£150-280', labour: '£200-350', total: '£350-630' },
    { scenario: 'Standard shed supply (15-25m)', material: '£250-400', labour: '£280-420', total: '£530-820' },
    { scenario: 'Summer house with consumer unit', material: '£350-550', labour: '£400-600', total: '£750-1150' },
    { scenario: 'Long run supply (30m+)', material: '£400-700', labour: '£450-650', total: '£850-1350' },
    { scenario: 'Outdoor isolator switch', material: '£40-80', labour: '£60-100', total: '£100-180' }
  ],

  defined: {
    term: 'Shed & Summer House Cable Sizing',
    definition: 'Garden building cable sizing determines the conductor size needed to safely supply power to sheds and summer houses. Unlike indoor circuits, outdoor runs require SWA (Steel Wire Armoured) cable for mechanical protection when buried. Cable must handle the expected load while keeping voltage drop acceptable over the outdoor distance.'
  },

  defined2: {
    term: 'SWA Cable for Garden Buildings',
    definition: 'Steel Wire Armoured (SWA) cable is the standard choice for buried outdoor runs to sheds and summer houses. The steel armour provides mechanical protection against accidental damage from garden tools. SWA can be direct buried at minimum 450mm depth with sand surround and warning tape, or run through ducting.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a shed?',
      a: 'For a basic shed with lighting and a few sockets, 2.5mm² SWA on a 16A or 20A circuit is usually sufficient for runs up to 25-30m. If you plan to use power tools, heaters, or multiple appliances, upgrade to 4mm² or 6mm² SWA on a 32A circuit. Always check voltage drop for your specific length.'
    },
    {
      q: 'Can I run an extension lead to my shed?',
      a: 'Extension leads are not a safe or legal permanent solution for shed power. They create trip hazards, weather exposure risks, and fire hazards. A proper buried SWA cable installation is the only safe option. It also adds value to your property and ensures insurance compliance.'
    },
    {
      q: 'Do I need an electrician for shed electrics?',
      a: 'Yes, outdoor electrical work is notifiable under Part P Building Regulations. It must be done by a registered competent person (like NICEIC or NAPIT) or inspected by Building Control. DIY outdoor electrical work is illegal and dangerous.'
    },
    {
      q: 'How deep should I bury cable to a shed?',
      a: 'Minimum 450mm under lawns and flower beds, 600mm under driveways or areas with vehicle access. Use sand or sifted soil around the cable and lay cable warning tape 150mm above. Avoid routes near tree roots, drainage, or other services.'
    },
    {
      q: 'Does my shed need its own consumer unit?',
      a: 'Not always. A basic shed can be supplied from a dedicated circuit in the house consumer unit with an outdoor isolator at the shed. Larger summer houses with multiple circuits benefit from their own small consumer unit for convenience and easier isolation.'
    },
    {
      q: 'What RCD protection do I need for a shed?',
      a: '30mA RCD protection is mandatory for all outdoor circuits. This can be provided by an RCBO in the house consumer unit, or an RCD in a shed consumer unit. Some installations use both for added protection.'
    },
    {
      q: 'Can I put a ring main in my summer house?',
      a: 'Yes, larger summer houses can have a ring final circuit for sockets, supplied from a local consumer unit. The supply to that consumer unit (submain) must be appropriately sized. For occasional use buildings, radial circuits are often simpler and adequate.'
    },
    {
      q: 'What about running power to a metal shed?',
      a: 'Metal sheds require proper earthing - the metal structure must be bonded to the electrical earth. SWA cable armour provides earth continuity. Your electrician must verify earthing arrangements, especially with PME supplies where additional earth electrodes may be needed.'
    },
    {
      q: 'How do I calculate the load for my shed?',
      a: 'Add up what you\'ll use: lighting (100-200W), power tools (1-2kW each), heater (1-3kW), fridge (100W). For a typical shed: 16A handles 3.6kW, 32A handles 7.2kW. If total exceeds this or you want expansion room, size up.'
    },
    {
      q: 'Is armoured cable necessary for a shed?',
      a: 'For buried runs, yes - SWA cable is required for mechanical protection. For short overhead runs (not recommended) or runs entirely in conduit, alternatives exist. But SWA direct burial is the most common and practical solution for garden buildings.'
    }
  ],

  defined3: {
    term: 'Voltage Drop for Garden Runs',
    definition: 'Long cable runs to sheds cause voltage drop - power tools may run slowly, lights dim. BS 7671 allows 5% drop maximum (11.5V on 230V). At 16A, 2.5mm² cable drops about 18mV per metre. A 30m run at 16A drops 8.6V (3.7%) - acceptable. Our calculator checks this automatically.'
  },

  defined4: {
    term: 'Outdoor Circuit Protection',
    definition: 'Garden circuits face unique hazards: moisture, wildlife damage, garden tool strikes. Protection includes: RCD for earth faults, MCB for overload, SWA for mechanical protection, IP-rated enclosures for connections. All outdoor electrical equipment must be suitable for the conditions.'
  }
}

export default function ShedSummerHouseCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="shed cable size, summer house electrical, garden building power, SWA cable shed, outdoor power supply, garden electrics UK, BS 7671 outdoor, shed electricity" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/shed-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/shed-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
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
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Shed Summer House Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Shed Summer House Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '891' }
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
                'name': 'How to Size Cable for Shed Power Supply',
                'description': 'Step-by-step guide to calculating the correct cable size for shed and summer house electrical supply.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Assess your needs', 'text': 'List what you\'ll power: lights, sockets, tools, heaters' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run', 'text': 'Measure total distance from house to shed location' },
                  { '@type': 'HowToStep', 'name': 'Choose circuit rating', 'text': 'Select 16A for basic, 32A for workshop use' },
                  { '@type': 'HowToStep', 'name': 'Calculate cable size', 'text': 'Use calculator to determine SWA size with voltage drop' },
                  { '@type': 'HowToStep', 'name': 'Plan installation', 'text': 'Route cable, plan burial depth, position isolator' }
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
          <Link to="/cable-sizing-calculator" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Cable Sizing Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <TreePine className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-green-900 mb-3 flex items-center gap-2">
              <TreePine className="w-5 h-5" />
              Shed & Summer House Cable Quick Facts
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
            />
          </div>

          {/* CONTRACTOR LEAD CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need a Qualified Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted, local contractors for your shed installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Shed & Summer House Installations</h2>
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
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-emerald-900 mb-3">Related Garden & Outbuilding Calculators</h3>
            <p className="text-sm text-emerald-800 mb-4">
              For larger garden buildings, see our <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="text-emerald-600 font-semibold hover:underline">garden office calculator</Link> with submain guidance. Planning workshop use? Check the <Link to="/calculators/cable-sizing/garage-workshop-cable-sizing" className="text-emerald-600 font-semibold hover:underline">garage and workshop guide</Link>. Add <Link to="/calculators/cable-sizing/outdoor-lighting-cable-sizing" className="text-emerald-600 font-semibold hover:underline">outdoor lighting</Link> to illuminate the path to your shed.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-green-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shed Electrical Installation Costs (2024)</h2>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Costs vary by cable run length and ground conditions.</p>
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

          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-green-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="block p-4 bg-gradient-to-br from-teal-50 to-green-50 border border-teal-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-teal-900 mb-1">Garden Office</h3>
                <p className="text-sm text-teal-700">Larger outbuilding supplies</p>
              </Link>
              <Link to="/calculators/cable-sizing/outdoor-lighting-cable-sizing" className="block p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-yellow-900 mb-1">Outdoor Lighting</h3>
                <p className="text-sm text-yellow-700">Garden and security lights</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Check long outdoor cable runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your shed installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ShedSummerHouseCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="Get Electrician Quotes"
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
