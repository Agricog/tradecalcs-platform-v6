import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, ChefHat } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'commercial-kitchen-cable-sizing',
  title: 'Commercial Kitchen Cable Sizing Calculator',
  metaTitle: 'Commercial Kitchen Cable Size Calculator UK | Restaurant Electrical | BS 7671 | TradeCalcs',
  metaDescription: 'Free commercial kitchen cable sizing calculator for UK electricians. Calculate correct cable size for restaurants, cafes, and catering equipment. BS 7671 compliant with three-phase guidance.',
  heroDescription: 'Calculate the correct cable size for commercial kitchens, restaurants, and catering equipment',
  
  defaults: {
    loadType: 'amps' as const,
    current: '63',
    kW: '',
    length: '25',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'Commercial kitchens typically need 100A-200A+ three-phase supply',
    'Individual equipment often 16A-63A per circuit',
    'Extraction systems need dedicated circuits (often 3-phase)',
    'Multiple earth bonding points required for metal equipment',
    'Emergency stop systems mandatory for gas interlock'
  ],

  symptomChecks: [
    { symptom: 'Small cafe (2-3 cooking appliances)', recommendation: '100A three-phase supply, multiple 32A circuits' },
    { symptom: 'Restaurant kitchen (full range)', recommendation: '150-200A three-phase, dedicated circuits per major appliance' },
    { symptom: 'Commercial oven/range', recommendation: '32A-63A three-phase circuit, 6mm²-16mm² depending on rating' },
    { symptom: 'Extraction canopy system', recommendation: 'Dedicated 3-phase circuit, gas interlock integration' },
    { symptom: 'Walk-in cold room', recommendation: '16A-32A dedicated circuit, consider soft-start for compressor' }
  ],

  costEstimates: [
    { scenario: 'Small cafe fit-out (electrical only)', material: '£2000-4000', labour: '£3000-5000', total: '£5000-9000' },
    { scenario: 'Restaurant kitchen (full install)', material: '£5000-10000', labour: '£6000-12000', total: '£11000-22000' },
    { scenario: 'Three-phase supply upgrade', material: '£1500-3000', labour: '£1000-2000', total: '£2500-5000' },
    { scenario: 'Extraction system electrical', material: '£800-1500', labour: '£1000-1800', total: '£1800-3300' },
    { scenario: 'Gas interlock system', material: '£400-800', labour: '£500-900', total: '£900-1700' }
  ],

  defined: {
    term: 'Commercial Kitchen Cable Sizing',
    definition: 'Commercial kitchen cable sizing calculates conductor sizes for high-power catering equipment. Unlike domestic, commercial kitchens use three-phase supplies with individual circuits for major appliances. Total connected load often exceeds 50kW, requiring careful maximum demand calculation with diversity factors specific to catering operations.'
  },

  defined2: {
    term: 'Three-Phase Distribution',
    definition: 'Commercial kitchens use three-phase (400V) supplies to handle high loads and balance across phases. Large equipment connects to all three phases; smaller items to single phases. Proper phase balancing prevents overloading individual phases. Distribution boards are typically 3-phase with single and 3-phase MCBs/RCBOs.'
  },

  faqs: [
    {
      q: 'What size supply does a commercial kitchen need?',
      a: 'Most commercial kitchens need 100A-200A three-phase supplies. A small cafe might manage with 60-100A three-phase, while busy restaurants need 150-200A+. Calculate by adding all equipment ratings and applying 80% diversity for cooking equipment that cycles.'
    },
    {
      q: 'Do I need three-phase for a commercial kitchen?',
      a: 'Almost always yes. While a very small cafe might use single-phase, most commercial kitchens need three-phase for: large ovens/ranges (often 3-phase only), balanced loading, and capacity. DNO can upgrade supplies - allow 8-12 weeks lead time.'
    },
    {
      q: 'What cable size for a commercial oven?',
      a: 'Commercial ovens vary widely: small convection ovens might be 13A single-phase, while combi ovens are often 32A-63A three-phase. Check the data plate - a 20kW combi needs about 29A per phase on 3-phase, requiring 6mm² or 10mm² cable depending on length.'
    },
    {
      q: 'Does each piece of equipment need its own circuit?',
      a: 'Major cooking equipment should have dedicated circuits for isolation and protection. Smaller items (microwaves, food processors) can share appropriately-rated circuits. Refrigeration should be on separate circuits from cooking equipment to prevent trips affecting food storage.'
    },
    {
      q: 'What about extraction system electrics?',
      a: 'Commercial extraction needs dedicated electrical supply - typically 3-phase for larger canopies. Must integrate with gas interlock (if gas cooking present) for safety shutdown. Include make-up air systems in calculations. Allow for EC motor controls and speed regulation.'
    },
    {
      q: 'What is a gas interlock system?',
      a: 'Gas interlock ensures gas supply is cut if extraction fails - mandatory under Gas Safety Regulations for commercial kitchens. Electrical components include: current sensing on extraction, solenoid valve control, and indicator panel. Must be fail-safe design.'
    },
    {
      q: 'How do I calculate maximum demand for a kitchen?',
      a: 'List all equipment with ratings. Apply diversity: 100% for largest item, 80% for cooking equipment, 100% for refrigeration, 50-80% for small appliances. A kitchen with 80kW connected load might have 50-60kW maximum demand. Always confirm with equipment schedules.'
    },
    {
      q: 'What earthing is required in commercial kitchens?',
      a: 'Extensive supplementary bonding connects all metal equipment, worktops, sinks, and services. Main earth terminal, supplementary bonding bars, and individual equipment bonds create a safe equipotential zone. Essential in wet environments with electrical equipment.'
    },
    {
      q: 'Do commercial kitchens need RCD protection?',
      a: 'Yes, 30mA RCD protection for socket outlets. Commercial equipment circuits may use different arrangements - consult BS 7671 for specifics. Some high-integrity equipment (refrigeration) may need RCBOs to prevent nuisance tripping affecting multiple circuits.'
    },
    {
      q: 'What regulations apply to commercial kitchen electrics?',
      a: 'BS 7671 Wiring Regulations, plus: Electricity at Work Regulations, Gas Safety Regulations (for interlock), Food Hygiene Regulations (cleanable installation), Building Regulations Part P and Part B (fire). Environmental Health may inspect before opening.'
    }
  ],

  defined3: {
    term: 'Phase Balancing',
    definition: 'Three-phase systems should have roughly equal load on each phase. Unbalanced loads cause neutral current, voltage imbalance, and inefficiency. When planning commercial kitchen circuits, distribute single-phase equipment across all three phases. Large three-phase equipment naturally balances itself.'
  },

  defined4: {
    term: 'Equipment Isolation Requirements',
    definition: 'Commercial kitchen equipment needs local isolation for maintenance and emergencies. Rotary isolators or lockable switches near each major appliance. Emergency stop buttons at exits for rapid shutdown. Equipment must be isolatable without affecting refrigeration or critical services.'
  }
}

export default function CommercialKitchenCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="commercial kitchen cable size, restaurant electrical, catering equipment wiring, three phase kitchen, cafe electrical installation, commercial oven cable, extraction system electrical, BS 7671 commercial" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/commercial-kitchen-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/commercial-kitchen-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
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
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Commercial Kitchen Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Commercial Kitchen Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '342' }
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
                'name': 'How to Size Cables for Commercial Kitchen Installation',
                'description': 'Step-by-step guide to calculating cable sizes for commercial kitchen and catering electrical installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Obtain equipment schedule', 'text': 'Get full list of all catering equipment with electrical ratings' },
                  { '@type': 'HowToStep', 'name': 'Calculate maximum demand', 'text': 'Apply diversity factors to estimate peak load' },
                  { '@type': 'HowToStep', 'name': 'Determine supply requirements', 'text': 'Specify three-phase supply size needed from DNO' },
                  { '@type': 'HowToStep', 'name': 'Design distribution', 'text': 'Plan distribution board layout with phase balancing' },
                  { '@type': 'HowToStep', 'name': 'Size individual circuits', 'text': 'Calculate cable size for each equipment circuit' }
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

        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <ChefHat className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              Commercial Kitchen Cable Quick Facts
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
                <h3 className="text-xl font-bold mb-1">Need a Commercial Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted contractors for your commercial kitchen installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Commercial Kitchen Installations</h2>
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

          {/* Internal linking section */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-red-900 mb-3">Related Commercial Electrical Calculations</h3>
            <p className="text-sm text-red-800 mb-4">
              Commercial kitchens are part of larger fit-outs. See our <Link to="/calculators/cable-sizing/shop-retail-unit-cable-sizing" className="text-red-600 font-semibold hover:underline">shop and retail unit calculator</Link> for front-of-house electrics. For cold storage facilities, check <Link to="/calculators/cable-sizing/server-room-cable-sizing" className="text-red-600 font-semibold hover:underline">server room cooling principles</Link>. Need three-phase for other equipment? Our <Link to="/calculators/cable-sizing/air-conditioning-cable-sizing" className="text-red-600 font-semibold hover:underline">commercial AC guide</Link> covers similar requirements.
            </p>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-orange-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Commercial Kitchen Electrical Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs for electrical work only. Excludes equipment and other trades.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Costs vary significantly by kitchen size and equipment specification.</p>
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

          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-orange-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/calculators/cable-sizing/shop-retail-unit-cable-sizing" className="block p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-purple-900 mb-1">Shop & Retail</h3>
                <p className="text-sm text-purple-700">Front-of-house electrical</p>
              </Link>
              <Link to="/calculators/cable-sizing/cooker-circuit-cable-sizing" className="block p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Cooker Circuit</h3>
                <p className="text-sm text-orange-700">Domestic cooking reference</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Check three-phase runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Commercial Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified commercial electrician for your kitchen installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=CommercialKitchenCableSizing" 
                width="100%" 
                height="700px" 
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

          <div className="bg-orange-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
