import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Store } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'shop-retail-unit-cable-sizing',
  title: 'Shop & Retail Unit Cable Sizing Calculator',
  metaTitle: 'Shop Retail Unit Cable Size Calculator UK | Commercial Fit-out | BS 7671 | TradeCalcs',
  metaDescription: 'Free shop and retail unit cable sizing calculator for UK electricians. Calculate correct cable size for retail fit-outs, shop lighting, and commercial small business. BS 7671 compliant.',
  heroDescription: 'Calculate the correct cable size for retail shops, commercial units, and small business premises',
  
  defaults: {
    loadType: 'amps' as const,
    current: '63',
    kW: '',
    length: '20',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'Retail units typically need 60-100A single or three-phase',
    'Lighting load often 10-20W/m² for retail display',
    'EICR required before occupation (commercial premises)',
    'Emergency lighting mandatory for public premises',
    'Fire alarm integration often required'
  ],

  symptomChecks: [
    { symptom: 'Small retail unit (<50m²)', recommendation: '60-80A single-phase, lighting + socket circuits, emergency lighting' },
    { symptom: 'Medium retail shop (50-150m²)', recommendation: '80-100A single or three-phase, dedicated lighting circuits, back of house' },
    { symptom: 'Large retail store (150m²+)', recommendation: 'Three-phase supply, multiple distribution boards, sub-metering' },
    { symptom: 'Food retail (café counter, deli)', recommendation: 'Additional circuits for refrigeration, food prep - see commercial kitchen' },
    { symptom: 'Shop fit-out in shell unit', recommendation: 'Full installation from landlord supply point, metering, DB, all circuits' }
  ],

  costEstimates: [
    { scenario: 'Basic shop fit-out (<50m²)', material: '£1500-3000', labour: '£2000-3500', total: '£3500-6500' },
    { scenario: 'Medium retail fit-out (50-100m²)', material: '£3000-6000', labour: '£4000-7000', total: '£7000-13000' },
    { scenario: 'Shop lighting installation', material: '£1000-2500', labour: '£1500-3000', total: '£2500-5500' },
    { scenario: 'Emergency lighting system', material: '£500-1200', labour: '£600-1200', total: '£1100-2400' },
    { scenario: 'Three-phase upgrade', material: '£1500-3000', labour: '£1000-2000', total: '£2500-5000' }
  ],

  defined: {
    term: 'Retail Unit Cable Sizing',
    definition: 'Retail unit cable sizing calculates conductor sizes for shop electrical installations. Retail has specific needs: high lighting levels for product display, multiple socket circuits for POS and displays, emergency lighting for public safety, and often security/CCTV integration. Supply size depends on the retail type - clothing shops differ from food retail.'
  },

  defined2: {
    term: 'Commercial Lighting Levels',
    definition: 'Retail lighting is critical for product display and customer experience. General retail needs 300-500 lux, with accent lighting for displays reaching 750-1000 lux. This translates to significant electrical load - typically 15-25W/m² for modern LED retail lighting. Lighting circuits often represent 30-50% of shop electrical load.'
  },

  faqs: [
    {
      q: 'What size electrical supply for a shop?',
      a: 'Small shops (under 50m²) typically need 60-80A single-phase. Medium shops often need 80-100A. Larger retail or those with high loads (food retail, salons) may need three-phase. Check landlord supply specifications - many retail units have capped supplies.'
    },
    {
      q: 'Do I need an EICR for a new shop?',
      a: 'Yes, commercial premises should have an Electrical Installation Condition Report before trading. Many landlords require this, and insurers expect it. For new fit-outs, you\'ll receive an Electrical Installation Certificate. EICRs should be repeated every 5 years for commercial.'
    },
    {
      q: 'What emergency lighting is required for shops?',
      a: 'All shops open to the public need emergency escape lighting. This illuminates exit routes when power fails. Maintained or non-maintained fittings depending on design. Monthly function tests and annual duration tests required. Part of fire risk assessment.'
    },
    {
      q: 'How do I calculate lighting load for retail?',
      a: 'Modern LED retail lighting: 15-25W/m² depending on type. A 100m² shop might need 1.5-2.5kW for general lighting, plus accent/display lighting. Use 20W/m² as reasonable estimate. Dedicated lighting circuits separate from socket circuits.'
    },
    {
      q: 'What about socket circuits for a shop?',
      a: 'Plan for: till points, display lighting plugs, back office equipment, staff areas. Ring or radial circuits depending on layout. Consider future flexibility - retail layouts change. Floor boxes useful for island displays. USB sockets increasingly expected.'
    },
    {
      q: 'Do I need a fire alarm in my shop?',
      a: 'Most retail premises need fire detection and alarm. Size and type depends on fire risk assessment. Simple shops may need Grade D (domestic-style) or Grade A (commercial) systems. Integration with emergency lighting and door releases may be required.'
    },
    {
      q: 'What if the landlord supply is limited?',
      a: 'Many retail units in older buildings have limited supplies (often 60-80A). Options: work within the limit, request supply upgrade (landlord/DNO), or install load management. Exceeding your allocated supply can affect other tenants and breach lease.'
    },
    {
      q: 'How do I handle shop security electrics?',
      a: 'Security typically includes: alarm system, CCTV, shutter controls, and access control. These need dedicated circuits and often UPS backup. Plan cable routes during fit-out. Coordinate with security installer for power requirements.'
    },
    {
      q: 'What regulations apply to shop electrics?',
      a: 'BS 7671 Wiring Regulations, Building Regulations Part P (if applicable) and Part B (fire), Regulatory Reform (Fire Safety) Order for emergency lighting, and potentially food hygiene regs for food retail. Landlord may have additional requirements.'
    },
    {
      q: 'Can I do shop electrical work myself?',
      a: 'Commercial electrical work should be done by qualified electricians. Part P applies to some commercial situations. Insurance, landlord requirements, and health & safety law all expect professional installation. Self-certification by registered electrician required.'
    }
  ],

  defined3: {
    term: 'Retail Electrical Load Diversity',
    definition: 'Retail loads vary throughout the day - peak during trading hours with all lighting, minimal overnight. When calculating maximum demand, apply diversity: 90% for lighting (usually all on together), 50-70% for sockets (not all used simultaneously). This helps right-size the supply without over-specifying.'
  },

  defined4: {
    term: 'Shell and Core vs Cat A vs Cat B',
    definition: 'Retail fit-outs have different starting points. Shell and Core: basic structure only, install everything. Cat A: landlord provides basic services to demise. Cat B: tenant fit-out of Cat A space. Electrical scope varies dramatically - understand your starting point before quoting.'
  }
}

export default function ShopRetailUnitCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="shop electrical cable size, retail unit wiring, commercial fit-out electrical, shop lighting circuit, retail store electrics, small business electrical, BS 7671 commercial, emergency lighting shop" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/shop-retail-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/shop-retail-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#db2777" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Shop Retail Unit Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Shop Retail Unit Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '356' }
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
                'name': 'How to Size Cables for Shop Electrical Installation',
                'description': 'Step-by-step guide to calculating cable sizes for retail and commercial unit electrical installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Assess the unit', 'text': 'Check existing supply, landlord requirements, and starting condition' },
                  { '@type': 'HowToStep', 'name': 'Calculate lighting load', 'text': 'Design retail lighting and calculate total wattage' },
                  { '@type': 'HowToStep', 'name': 'Plan socket circuits', 'text': 'Identify till points, displays, and equipment locations' },
                  { '@type': 'HowToStep', 'name': 'Add emergency systems', 'text': 'Include emergency lighting, fire alarm, and security' },
                  { '@type': 'HowToStep', 'name': 'Size distribution', 'text': 'Calculate total load and size main supply accordingly' }
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

        <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Store className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-pink-50 border-l-4 border-pink-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-pink-900 mb-3 flex items-center gap-2">
              <Store className="w-5 h-5" />
              Retail Unit Cable Quick Facts
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
                <p className="text-purple-100">Get quotes from contractors experienced in retail fit-outs</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Retail Installations</h2>
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

          {/* Internal linking section */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-3">Related Commercial Calculations</h3>
            <p className="text-sm text-purple-800 mb-4">
              Food retail needs additional consideration - see our <Link to="/calculators/cable-sizing/commercial-kitchen-cable-sizing" className="text-purple-600 font-semibold hover:underline">commercial kitchen calculator</Link> for cafés and food prep. Security is crucial for retail - check <Link to="/calculators/cable-sizing/cctv-security-cable-sizing" className="text-purple-600 font-semibold hover:underline">CCTV and security requirements</Link>. For office areas, see <Link to="/calculators/cable-sizing/ring-main-socket-circuit-cable-sizing" className="text-purple-600 font-semibold hover:underline">socket circuit calculations</Link>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-pink-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-pink-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Retail Fit-out Electrical Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs for retail electrical fit-outs.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Costs vary by unit size, specification, and starting condition.</p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-purple-800">{usecaseData.defined2.definition}</p>
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

          <div className="bg-pink-50 border-l-4 border-pink-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-pink-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-pink-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/calculators/cable-sizing/commercial-kitchen-cable-sizing" className="block p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Commercial Kitchen</h3>
                <p className="text-sm text-orange-700">Food retail and cafés</p>
              </Link>
              <Link to="/calculators/cable-sizing/cctv-security-cable-sizing" className="block p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-indigo-900 mb-1">CCTV & Security</h3>
                <p className="text-sm text-indigo-700">Retail security systems</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Check distribution runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Commercial Electricians</h3>
              <p className="text-gray-700">
                Looking for an electrician experienced in retail fit-outs? Tell us about your project and we'll connect you with vetted contractors. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ShopRetailUnitCableSizing" 
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

          <div className="bg-pink-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-pink-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
