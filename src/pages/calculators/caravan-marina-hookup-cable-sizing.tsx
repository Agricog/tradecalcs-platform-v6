import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Anchor } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'caravan-marina-hookup-cable-sizing',
  title: 'Caravan & Marina Hookup Cable Sizing Calculator',
  metaTitle: 'Caravan Marina Hookup Cable Size UK | Holiday Park Electrical | BS 7671 | TradeCalcs',
  metaDescription: 'Free caravan and marina hookup cable sizing calculator for UK electricians. Calculate correct cable size for holiday parks, caravan sites, and marina berths. BS 7671 Section 708 & 709 compliant.',
  heroDescription: 'Calculate the correct cable size for caravan sites, holiday parks, and marina electrical hookups',
  
  defaults: {
    loadType: 'amps' as const,
    current: '16',
    kW: '',
    length: '25',
    method: 'D',
    lighting: false
  },

  keyFacts: [
    'Caravan hookups: 16A maximum per BS 7671 Section 708',
    'Marina berths: 16A or 32A per BS 7671 Section 709',
    'Blue CEE 16A connectors standard for caravans',
    '30mA RCD protection mandatory for each outlet',
    'Maximum 3% voltage drop for marina installations'
  ],

  symptomChecks: [
    { symptom: 'Single caravan pitch hookup', recommendation: '16A supply, 2.5mm² cable, individual RCD protection' },
    { symptom: 'Caravan site feeder (10 pitches)', recommendation: '63A-100A feeder, distribution pillar, 2.5mm² radials to each pitch' },
    { symptom: 'Marina berth (small boat)', recommendation: '16A supply, 2.5mm² cable, weatherproof pillar with RCD' },
    { symptom: 'Marina berth (larger vessel)', recommendation: '32A single or three-phase, 6mm² cable, individual isolation' },
    { symptom: 'Holiday park distribution', recommendation: 'Three-phase feeders, section pillars, balanced phase loading' }
  ],

  costEstimates: [
    { scenario: 'Single caravan hookup point', material: '£200-400', labour: '£250-400', total: '£450-800' },
    { scenario: 'Caravan pitch pillar (4 outlets)', material: '£600-1000', labour: '£500-800', total: '£1100-1800' },
    { scenario: 'Marina berth pillar (2 outlets)', material: '£800-1400', labour: '£600-1000', total: '£1400-2400' },
    { scenario: 'Site feeder cable (per 100m)', material: '£800-1500', labour: '£600-1000', total: '£1400-2500' },
    { scenario: 'Distribution pillar installation', material: '£1500-3000', labour: '£1000-1800', total: '£2500-4800' }
  ],

  defined: {
    term: 'Caravan & Marina Hookup Cable Sizing',
    definition: 'Caravan and marina hookup cable sizing follows BS 7671 Sections 708 (Caravans) and 709 (Marinas). These special locations have strict requirements for connector types, RCD protection, and voltage drop limits. Cable sizes must account for the outdoor environment, potential water exposure, and the need for robust mechanical protection.'
  },

  defined2: {
    term: 'BS 7671 Section 708 - Caravan Parks',
    definition: 'Section 708 covers electrical installations in caravan and camping parks. Key requirements: 16A maximum per pitch, blue CEE 17 connectors (IEC 60309), individual 30mA RCD per socket, and socket height 0.5-1.5m above ground. Distribution must be designed for diversity across the site.'
  },

  faqs: [
    {
      q: 'What cable size for a caravan hookup?',
      a: '2.5mm² cable is standard for 16A caravan hookups. For runs over 25m, check voltage drop - you may need to upsize to 4mm². Each hookup must have individual 30mA RCD protection. Use SWA or cable in ground-rated ducting for buried runs.'
    },
    {
      q: 'Why is caravan hookup limited to 16A?',
      a: 'BS 7671 Section 708 limits pitch supplies to 16A for safety. Caravan internal wiring is designed for this limit. Higher currents could overload caravan systems and connections. Caravans needing more power should use multiple hookups or on-site facilities.'
    },
    {
      q: 'What type of socket for caravan hookups?',
      a: 'Blue CEE 16A sockets (IEC 60309, 2P+E, 6h) are mandatory. These industrial connectors are weatherproof and standardised across Europe. Socket height must be 0.5-1.5m above ground level. The blue colour indicates 230V single phase.'
    },
    {
      q: 'Do I need RCD protection for each pitch?',
      a: 'Yes, BS 7671 requires individual 30mA RCD protection for each caravan hookup socket. This means separate RCDs or RCBOs for each outlet, not shared protection. This prevents one pitch trip affecting others and ensures personal protection.'
    },
    {
      q: 'What about marina electrical installations?',
      a: 'Marinas follow BS 7671 Section 709 with stricter requirements due to water proximity. Additional requirements include: 3% maximum voltage drop (vs 5% standard), increased IP ratings, and consideration of tidal movement for cable routing. 16A and 32A supplies are common.'
    },
    {
      q: 'How do I calculate diversity for a caravan site?',
      a: 'BS 7671 guidance suggests: first 10 pitches at 0.75 diversity factor, next 20 at 0.50, remainder at 0.30. A 50-pitch site: (10×16×0.75) + (20×16×0.50) + (20×16×0.30) = 120 + 160 + 96 = 376A design current for the main feeder.'
    },
    {
      q: 'What earthing system for caravan sites?',
      a: 'TT earthing is common for caravan sites (earth electrode at each distribution point). PME is generally not permitted due to dangers if the neutral is lost. Each distribution pillar needs its own earth electrode with adequate resistance (<200Ω for 30mA RCDs).'
    },
    {
      q: 'Can I use standard domestic sockets outside?',
      a: 'No - outdoor sockets for caravans must be blue CEE industrial type. Standard 13A sockets are not weatherproof enough and don\'t meet BS 7671 Section 708. Even weatherproof 13A sockets don\'t provide the same safety as proper CEE connectors.'
    },
    {
      q: 'What about electric vehicle charging at caravan sites?',
      a: 'EV charging is separate from pitch hookups. Dedicated EV points need their own circuits - typically 32A per charger. Cannot use caravan 16A hookups for EV charging. Some sites add dedicated EV charging areas with Mode 3 chargers.'
    },
    {
      q: 'How do I test caravan site installations?',
      a: 'Full testing per BS 7671 Chapter 6: earth electrode resistance, insulation resistance, RCD operation times (<40ms for Type AC at 5×), loop impedance, and prospective fault current. Document with Electrical Installation Certificate. Annual inspection recommended.'
    }
  ],

  defined3: {
    term: 'BS 7671 Section 709 - Marinas',
    definition: 'Section 709 covers marina and boat shore connection electrical supplies. Stricter than caravan sites due to water hazards: 3% maximum voltage drop (vs 5%), IP ratings suitable for location, and careful consideration of cable routes across tidal areas. Both 16A and 32A supplies are used depending on vessel size.'
  },

  defined4: {
    term: 'Distribution Pillar Design',
    definition: 'Distribution pillars (service bollards) provide multiple hookup points from a single feeder. Pillars contain isolators, RCDs, and sockets. Design must account for: IP rating (minimum IP44 outdoor), cable entry points, metering if required, and emergency isolation. Stainless steel construction is common for marina environments.'
  }
}

export default function CaravanMarinaHookupCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="caravan hookup cable size, marina electrical, holiday park electrics, camping site power, boat shore power, BS 7671 section 708, caravan site electrical, pontoon power supply" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/caravan-marina-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/caravan-marina-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#0891b2" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Caravan Marina Hookup Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Caravan Marina Hookup Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '398' }
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
                'name': 'How to Size Cables for Caravan Site Installation',
                'description': 'Step-by-step guide to calculating cable sizes for caravan park and marina electrical installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Determine number of pitches', 'text': 'Count total hookup points required and their layout' },
                  { '@type': 'HowToStep', 'name': 'Calculate diversity', 'text': 'Apply BS 7671 diversity factors for site loading' },
                  { '@type': 'HowToStep', 'name': 'Design distribution', 'text': 'Plan feeder routes and pillar positions' },
                  { '@type': 'HowToStep', 'name': 'Size feeder cables', 'text': 'Calculate main feeder sizes with voltage drop check' },
                  { '@type': 'HowToStep', 'name': 'Size final circuits', 'text': 'Typically 2.5mm² for 16A pitch hookups' }
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

        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Anchor className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-cyan-50 border-l-4 border-cyan-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-cyan-900 mb-3 flex items-center gap-2">
              <Anchor className="w-5 h-5" />
              Caravan & Marina Hookup Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-cyan-900">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
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
                <h3 className="text-xl font-bold mb-1">Need a Specialist Electrician?</h3>
                <p className="text-purple-100">Get quotes from contractors experienced in caravan site and marina installations</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Hookup Installations</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-700 font-bold text-sm">{i + 1}</span>
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
            <h3 className="font-bold text-blue-900 mb-3">Related Outdoor & Commercial Installations</h3>
            <p className="text-sm text-blue-800 mb-4">
              Caravan sites share outdoor installation challenges with <Link to="/calculators/cable-sizing/outdoor-lighting-cable-sizing" className="text-blue-600 font-semibold hover:underline">outdoor lighting</Link> and <Link to="/calculators/cable-sizing/shed-summer-house-cable-sizing" className="text-blue-600 font-semibold hover:underline">outbuilding supplies</Link>. Adding EV charging to your site? See our <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="text-blue-600 font-semibold hover:underline">EV charger calculator</Link>. For site facilities, check <Link to="/calculators/cable-sizing/commercial-kitchen-cable-sizing" className="text-blue-600 font-semibold hover:underline">commercial kitchen</Link> requirements.
            </p>
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-cyan-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-cyan-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hookup Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs including distribution equipment, cable, and labour.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-cyan-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Costs vary by site layout, ground conditions, and specification.</p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-blue-800">{usecaseData.defined2.definition}</p>
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
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/calculators/cable-sizing/outdoor-lighting-cable-sizing" className="block p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-yellow-900 mb-1">Outdoor Lighting</h3>
                <p className="text-sm text-yellow-700">Site and pathway lighting</p>
              </Link>
              <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">EV Charger</h3>
                <p className="text-sm text-green-700">Site EV charging points</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Critical for long site runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Specialist Electricians</h3>
              <p className="text-gray-700">
                Looking for an electrician experienced in caravan site or marina installations? Tell us about your project and we'll connect you with vetted contractors. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=CaravanMarinaHookupCableSizing" 
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

          <div className="bg-cyan-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-cyan-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
