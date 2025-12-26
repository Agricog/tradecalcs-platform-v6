import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Lightbulb } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'outdoor-lighting-cable-sizing',
  title: 'Outdoor Lighting Cable Sizing Calculator',
  metaTitle: 'Outdoor Lighting Cable Size Calculator UK | Garden Lights | BS 7671 | TradeCalcs',
  metaDescription: 'Free outdoor lighting cable sizing calculator for UK electricians. Calculate correct cable size for garden lights, security lighting, and festoon. BS 7671 compliant with IP rating guidance.',
  heroDescription: 'Calculate the correct cable size for garden lighting, security lights, and outdoor decorative lighting',
  
  defaults: {
    loadType: 'amps' as const,
    current: '6',
    kW: '',
    length: '25',
    method: 'D',
    lighting: true
  },

  keyFacts: [
    'Outdoor lighting typically 6A-16A circuits',
    'LED lighting significantly reduces cable size requirements',
    'SWA or armoured cable for buried runs',
    'IP65+ fittings required for outdoor use',
    '30mA RCD protection mandatory for all outdoor circuits'
  ],

  symptomChecks: [
    { symptom: 'LED garden path lights (10-20 fittings)', recommendation: '6A circuit, 1.5mm² SWA sufficient for most runs' },
    { symptom: 'Security floodlights (2-4 x 20W LED)', recommendation: '6A circuit, 1.5mm² cable, PIR or dusk sensor control' },
    { symptom: 'Festoon/party lights (100m)', recommendation: '6A circuit, 1.5mm² cable, weatherproof connections' },
    { symptom: 'Driveway pillar lights + wall lights', recommendation: '6A-10A circuit, 1.5mm² or 2.5mm² depending on total load' },
    { symptom: 'Large garden with multiple zones', recommendation: 'Consider 2-3 separate lighting circuits for flexibility' }
  ],

  costEstimates: [
    { scenario: 'Basic garden lighting circuit', material: '£150-300', labour: '£200-350', total: '£350-650' },
    { scenario: 'Security lighting (2-4 floods)', material: '£200-400', labour: '£250-400', total: '£450-800' },
    { scenario: 'Driveway/entrance lighting', material: '£300-600', labour: '£350-550', total: '£650-1150' },
    { scenario: 'Full garden lighting design', material: '£500-1200', labour: '£600-1000', total: '£1100-2200' },
    { scenario: 'Festoon lighting installation', material: '£150-350', labour: '£200-350', total: '£350-700' }
  ],

  defined: {
    term: 'Outdoor Lighting Cable Sizing',
    definition: 'Outdoor lighting cable sizing determines the conductor size for garden, security, and decorative lighting circuits. Modern LED lighting uses significantly less power than halogen - a 20-light LED garden circuit might draw only 1-2 amps. However, cable must still be mechanically protected (SWA or conduit) and circuits need RCD protection.'
  },

  defined2: {
    term: 'IP Ratings for Outdoor Lighting',
    definition: 'IP (Ingress Protection) ratings indicate how well lighting fixtures resist water and dust. IP44 is minimum for sheltered outdoor use, IP65 for exposed locations (jet water resistant), IP67 for ground-level or submersible. Always match IP rating to the installation location and exposure level.'
  },

  faqs: [
    {
      q: 'What cable size do I need for garden lights?',
      a: 'Most LED garden lighting circuits need only 1.5mm² cable on a 6A circuit - LED lights draw very little power. Even 20 x 3W LED path lights only draw about 0.3A total. The main considerations are mechanical protection (SWA for buried runs) and voltage drop on very long runs.'
    },
    {
      q: 'Can I use standard cable for outdoor lighting?',
      a: 'No, outdoor cables need mechanical protection. Options include: SWA (Steel Wire Armoured) cable for direct burial, standard cable in conduit, or rubber-sheathed cable for temporary/festoon use. All outdoor connections must be in IP-rated enclosures.'
    },
    {
      q: 'Do garden lights need RCD protection?',
      a: 'Yes, 30mA RCD protection is mandatory for all outdoor circuits under BS 7671. This protects against electric shock if cables or fittings are damaged. Use an RCBO in the consumer unit or a separate RCD for the outdoor circuit.'
    },
    {
      q: 'How do I wire garden lights in series or parallel?',
      a: 'Garden lights should be wired in parallel - each light connects to the supply cable independently. Series wiring (daisy chain) means one failed light breaks the whole circuit. Parallel wiring allows individual lights to fail without affecting others.'
    },
    {
      q: 'What about low voltage garden lighting?',
      a: 'Low voltage (12V or 24V) garden lighting uses a transformer and is safer to install - no RCD required and lighter-duty cable. However, the transformer needs mains supply with RCD protection. Low voltage is popular for DIY-friendly spike lights and path lighting.'
    },
    {
      q: 'Can I install outdoor lights myself?',
      a: 'Adding lights to an existing outdoor circuit may be minor work. However, installing new outdoor circuits is notifiable under Part P and requires a registered electrician. Low voltage lighting from a plug-in transformer is generally DIY-able.'
    },
    {
      q: 'How deep should I bury garden lighting cable?',
      a: 'SWA cable should be buried minimum 450mm deep under lawns (600mm under driveways). Use sand surround and warning tape. For lighting-only circuits, some installers use shallower depths with additional mechanical protection, but 450mm is safest.'
    },
    {
      q: 'What size cable for security floodlights?',
      a: 'Modern LED floodlights are very efficient - a 30W LED flood replaces 300W halogen but draws only 0.13A. Even 4 x 50W LED floods only need about 0.9A total. 1.5mm² cable on 6A is plenty for most security lighting installations.'
    },
    {
      q: 'Can I put lights and sockets on the same outdoor circuit?',
      a: 'It\'s better to separate them. Outdoor sockets are typically 16A or 32A circuits for power tools and equipment. Lighting is usually 6A. Separate circuits mean a tripped socket circuit doesn\'t kill your security lights. They can share the same SWA route though.'
    },
    {
      q: 'How do I control outdoor lights?',
      a: 'Options include: manual switches (weatherproof if outside), PIR motion sensors, photocells (dusk-to-dawn), timers, or smart home systems. For security, PIR + photocell combination is popular. For garden ambiance, smart controls or simple timers work well.'
    }
  ],

  defined3: {
    term: 'LED vs Halogen Load Calculations',
    definition: 'LED lighting has transformed outdoor lighting cable requirements. A halogen 500W floodlight draws 2.2A; an equivalent 50W LED draws only 0.22A. Garden lighting that once needed 2.5mm² cable now often needs just 1.5mm². However, always calculate actual load and consider future expansion.'
  },

  defined4: {
    term: 'Outdoor Junction Boxes and Connections',
    definition: 'All outdoor electrical connections must be in IP-rated enclosures. IP65 minimum for general outdoor use, IP67 for ground level. Use gel-filled or resin junction boxes for added moisture protection. Never leave open connections or use indoor junction boxes outdoors - moisture ingress causes failure and danger.'
  }
}

export default function OutdoorLightingCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="outdoor lighting cable, garden lights cable size, security lighting electrical, festoon cable, exterior lighting UK, BS 7671 outdoor lighting, LED garden lights, driveway lighting" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/outdoor-lighting-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/outdoor-lighting-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#ca8a04" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Outdoor Lighting Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Outdoor Lighting Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '612' }
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
                'name': 'How to Size Cable for Outdoor Lighting',
                'description': 'Step-by-step guide to calculating the correct cable size for garden and security lighting installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Calculate total load', 'text': 'Add wattage of all lights - remember LED is much lower than halogen' },
                  { '@type': 'HowToStep', 'name': 'Plan cable route', 'text': 'Measure total cable run including all branches to lights' },
                  { '@type': 'HowToStep', 'name': 'Choose cable type', 'text': 'SWA for direct burial, or cable in conduit' },
                  { '@type': 'HowToStep', 'name': 'Calculate cable size', 'text': 'Use calculator - most LED lighting needs only 1.5mm²' },
                  { '@type': 'HowToStep', 'name': 'Select fittings', 'text': 'Choose IP-rated lights and junction boxes for location' }
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

        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Lightbulb className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Outdoor Lighting Cable Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-yellow-900">
                  <CheckCircle2 className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
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
                <p className="text-purple-100">Get quotes from vetted, local contractors for your outdoor lighting installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Outdoor Lighting Installations</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-700 font-bold text-sm">{i + 1}</span>
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
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-amber-900 mb-3">Related Outdoor Electrical Installations</h3>
            <p className="text-sm text-amber-800 mb-4">
              Outdoor lighting often pairs with other garden electrical work. See our <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="text-amber-600 font-semibold hover:underline">garden office</Link> and <Link to="/calculators/cable-sizing/shed-summer-house-cable-sizing" className="text-amber-600 font-semibold hover:underline">shed power supply</Link> calculators for outbuilding supplies. For security, combine with <Link to="/calculators/cable-sizing/cctv-security-cable-sizing" className="text-amber-600 font-semibold hover:underline">CCTV installations</Link> and <Link to="/calculators/cable-sizing/electric-gates-cable-sizing" className="text-amber-600 font-semibold hover:underline">electric gate</Link> access control.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-yellow-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Outdoor Lighting Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs including cable, fittings, and labour.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-yellow-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Costs vary by number of fittings and cable run complexity.</p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-orange-800">{usecaseData.defined2.definition}</p>
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

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-yellow-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/calculators/cable-sizing/cctv-security-cable-sizing" className="block p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-indigo-900 mb-1">CCTV & Security</h3>
                <p className="text-sm text-indigo-700">Complete property security</p>
              </Link>
              <Link to="/calculators/cable-sizing/shed-summer-house-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">Shed & Summer House</h3>
                <p className="text-sm text-green-700">Garden building power</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Check long lighting runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your outdoor lighting installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=OutdoorLightingCableSizing" 
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

          <div className="bg-amber-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-amber-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
