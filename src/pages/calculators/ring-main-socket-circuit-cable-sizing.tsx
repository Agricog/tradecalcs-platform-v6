import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Plug } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'ring-main-socket-circuit-cable-sizing',
  title: 'Ring Main & Socket Circuit Cable Sizing Calculator',
  metaTitle: 'Ring Main Cable Size Calculator UK | Socket Circuit | BS 7671 | TradeCalcs',
  metaDescription: 'Free ring main and socket circuit cable sizing calculator for UK electricians. Calculate correct cable size for ring final circuits and radial socket circuits. BS 7671 compliant.',
  heroDescription: 'Calculate the correct cable size for ring final circuits and radial socket circuits',
  
  defaults: {
    loadType: 'amps' as const,
    current: '32',
    kW: '',
    length: '50',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'Ring final circuits: 2.5mm² cable, 32A protection, up to 100m²',
    'Radial circuits: 2.5mm² for 20A, 4mm² for 32A',
    'Maximum 100m² floor area for domestic ring circuits',
    'Unfused spurs limited to one double socket per spur',
    'All socket circuits require 30mA RCD protection'
  ],

  symptomChecks: [
    { symptom: 'Standard room ring circuit', recommendation: '2.5mm² T+E, 32A MCB, ring topology from consumer unit' },
    { symptom: 'Kitchen socket circuit', recommendation: 'Separate ring or 32A radial with 4mm² recommended for high loads' },
    { symptom: 'Extension/conservatory radial', recommendation: '20A radial with 2.5mm² or 32A with 4mm² for larger areas' },
    { symptom: 'Home office with equipment', recommendation: 'Dedicated 20A radial keeps computing separate from general load' },
    { symptom: 'Workshop/garage sockets', recommendation: '32A radial with 4mm² - handles power tools and equipment' }
  ],

  costEstimates: [
    { scenario: 'New ring circuit (single floor)', material: '£150-280', labour: '£300-500', total: '£450-780' },
    { scenario: 'Additional radial circuit', material: '£80-150', labour: '£180-300', total: '£260-450' },
    { scenario: 'Kitchen ring/radial rewire', material: '£120-220', labour: '£250-400', total: '£370-620' },
    { scenario: 'Spur from existing ring', material: '£40-80', labour: '£80-150', total: '£120-230' },
    { scenario: 'Full house rewire (sockets only)', material: '£400-700', labour: '£800-1400', total: '£1200-2100' }
  ],

  defined: {
    term: 'Ring Final Circuit',
    definition: 'A ring final circuit starts at the consumer unit, loops around all socket outlets, and returns to the same terminals - forming a complete ring. This allows 2.5mm² cable to be protected by a 32A device because current can flow both ways around the ring. UK-specific design serving up to 100m² floor area per circuit.'
  },

  defined2: {
    term: 'Radial Socket Circuit',
    definition: 'A radial circuit runs from the consumer unit to socket outlets in series, ending at the final socket. Unlike rings, current flows one direction only. Radials use 2.5mm² with 20A protection, or 4mm² with 32A protection. Common for kitchens, extensions, and dedicated areas.'
  },

  faqs: [
    {
      q: 'What cable size for a ring main?',
      a: 'Standard ring final circuits use 2.5mm² twin and earth cable protected by a 32A MCB or RCBO. The ring topology allows current to split both ways, so 2.5mm² handles the load safely. This is specific to UK wiring - other countries use different approaches.'
    },
    {
      q: 'What\'s the difference between ring and radial circuits?',
      a: 'A ring circuit forms a complete loop back to the consumer unit - current can flow either direction. A radial runs from CU to sockets in a line, ending at the last socket. Rings use 2.5mm²/32A; radials use 2.5mm²/20A or 4mm²/32A. Radials are simpler but serve smaller areas.'
    },
    {
      q: 'How many sockets can I have on a ring main?',
      a: 'There\'s no fixed limit on socket numbers, but the circuit should serve maximum 100m² floor area. In practice, a typical room ring might have 10-20 sockets including doubles. The limitation is floor area and diversity, not socket count.'
    },
    {
      q: 'Can I add a spur to a ring main?',
      a: 'Yes, unfused spurs are allowed from ring circuits. Each spur can supply one single or one double socket (or one fixed appliance). The spur connects at any socket or junction box on the ring using 2.5mm² cable. You cannot spur from an existing spur.'
    },
    {
      q: 'Do I need a separate ring for the kitchen?',
      a: 'BS 7671 doesn\'t require it, but it\'s strongly recommended. Kitchens have high-load appliances (kettles, toasters, microwaves) that can overload a shared ring. A dedicated kitchen ring or 32A radial provides capacity and isolates kitchen issues from other rooms.'
    },
    {
      q: 'What cable size for a 32A radial?',
      a: '4mm² cable for 32A radial circuits. This can serve up to 50m² (or 75m² for kitchens). 32A radials are popular for extensions, outbuildings, and dedicated heavy-use areas. They\'re simpler to install than rings for smaller areas.'
    },
    {
      q: 'How do I test if a ring is complete?',
      a: 'Ring continuity testing checks the ring is unbroken. Measure resistance between line conductors at CU, then neutral, then earth. Cross-connect (L1-N2, L2-N1) and measure at each socket - readings should be consistent. Broken rings show as high resistance.'
    },
    {
      q: 'Can I convert a ring to two radials?',
      a: 'Yes, if you break a ring, you create two radials. However, 2.5mm² cable with 32A protection isn\'t suitable for radials. You\'d need to either: add a junction and make it a 20A radial, install 4mm² cable, or repair the ring. Broken rings are a common fault.'
    },
    {
      q: 'Why does the UK use ring circuits?',
      a: 'Ring circuits were introduced post-WW2 to save copper when materials were rationed. The ring design allows smaller cable to carry larger loads. Most other countries use radial circuits with larger cable throughout. Both approaches are safe when properly installed.'
    },
    {
      q: 'Do socket circuits need RCD protection?',
      a: 'Yes, BS 7671 requires 30mA RCD protection for all socket outlets up to 32A in domestic premises. This is typically provided by RCBOs or by grouping circuits under a shared RCD in a split-load consumer unit. RCDs protect against electric shock.'
    }
  ],

  defined3: {
    term: 'Spurs and Fused Connection Units',
    definition: 'Spurs extend ring circuits to additional points. Unfused spurs (2.5mm² cable direct to one socket) are limited to one point per spur. Fused spurs via a fused connection unit (FCU) can supply multiple points or fixed appliances - the fuse provides the protection. Never spur from a spur.'
  },

  defined4: {
    term: 'Socket Circuit Floor Area Limits',
    definition: 'BS 7671 limits circuit coverage by floor area, not socket numbers. Ring circuits: 100m² maximum. 32A radial (4mm²): 75m² in kitchens, 50m² elsewhere. 20A radial (2.5mm²): 50m² maximum. These limits ensure diversity assumptions remain valid for safe operation.'
  }
}

export default function RingMainSocketCircuitCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="ring main cable size, ring final circuit, socket circuit cable, radial circuit, 32A ring circuit, BS 7671 socket circuit, spur from ring, UK wiring socket" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/ring-main-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/ring-main-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#2563eb" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Ring Main Socket Circuit Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Ring Main Socket Circuit Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '1124' }
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
                'name': 'How to Size Cable for Socket Circuits',
                'description': 'Step-by-step guide to calculating the correct cable size for ring and radial socket circuits.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Choose circuit type', 'text': 'Decide ring (up to 100m²) or radial (smaller areas or dedicated use)' },
                  { '@type': 'HowToStep', 'name': 'Calculate floor area', 'text': 'Measure floor area the circuit will serve' },
                  { '@type': 'HowToStep', 'name': 'Select cable size', 'text': 'Ring: 2.5mm²/32A. Radial: 2.5mm²/20A or 4mm²/32A' },
                  { '@type': 'HowToStep', 'name': 'Plan cable route', 'text': 'Route cable to all socket positions, returning to CU for rings' },
                  { '@type': 'HowToStep', 'name': 'Calculate total length', 'text': 'Use calculator to verify cable size for voltage drop on long runs' }
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

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Plug className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Plug className="w-5 h-5" />
              Ring & Socket Circuit Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-blue-900">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
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
                <p className="text-purple-100">Get quotes from vetted, local contractors for your socket circuit installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Socket Circuit Installations</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-bold text-sm">{i + 1}</span>
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
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-indigo-900 mb-3">Related Circuit Calculations</h3>
            <p className="text-sm text-indigo-800 mb-4">
              Socket circuits are part of a complete installation. For dedicated appliance circuits, see our <Link to="/calculators/cable-sizing/cooker-circuit-cable-sizing" className="text-indigo-600 font-semibold hover:underline">cooker circuit</Link> and <Link to="/calculators/cable-sizing/electric-shower-cable-sizing" className="text-indigo-600 font-semibold hover:underline">electric shower</Link> calculators. Planning an extension? Check <Link to="/calculators/cable-sizing/annex-granny-flat-cable-sizing" className="text-indigo-600 font-semibold hover:underline">annex submain sizing</Link> for larger additions.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-blue-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Socket Circuit Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs including cable, accessories, and labour.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Costs vary by property type and access difficulty.</p>
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
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/calculators/cable-sizing/cooker-circuit-cable-sizing" className="block p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Cooker Circuit</h3>
                <p className="text-sm text-orange-700">Dedicated cooking appliance circuits</p>
              </Link>
              <Link to="/calculators/cable-sizing/garage-workshop-cable-sizing" className="block p-4 bg-gradient-to-br from-slate-50 to-zinc-50 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-900 mb-1">Garage & Workshop</h3>
                <p className="text-sm text-slate-700">Power tool socket circuits</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Check long circuit runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your socket circuit installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=RingMainSocketCircuitCableSizing" 
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

          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
