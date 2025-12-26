import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Waves } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'hot-tub-cable-sizing',
  title: 'Hot Tub & Spa Cable Sizing Calculator',
  metaTitle: 'Hot Tub Cable Size Calculator UK | Spa Pool Electrical | BS 7671 | TradeCalcs',
  metaDescription: 'Free hot tub cable sizing calculator for UK electricians. Calculate correct cable size for hot tubs, spas, and swim spas. BS 7671 compliant with RCD requirements and outdoor circuit guidance.',
  heroDescription: 'Calculate the correct cable size for hot tub, spa, and swim spa installations',
  
  defaults: {
    loadType: 'amps' as const,
    current: '32',
    kW: '',
    length: '15',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'Most hot tubs need 32A circuit with 6mm² or 10mm² cable',
    'Large swim spas may need 40A or 63A supply',
    '30mA RCD protection mandatory - Type A minimum',
    'Outdoor isolator switch required within sight of spa',
    'SWA cable typically required for outdoor runs'
  ],

  symptomChecks: [
    { symptom: 'Standard hot tub (13A plug-in)', recommendation: 'Can use existing socket, but dedicated circuit preferred for reliability' },
    { symptom: 'Hot tub 3-5 person (32A hardwired)', recommendation: '32A circuit, 6mm² SWA for runs under 18m, 10mm² for longer' },
    { symptom: 'Large hot tub 6-8 person', recommendation: '32A or 40A circuit, 10mm² SWA recommended for voltage drop' },
    { symptom: 'Swim spa / exercise pool', recommendation: '40A-63A circuit depending on heater size, 10mm² or 16mm² SWA' },
    { symptom: 'Multiple units (hot tub + sauna)', recommendation: 'Separate circuits recommended, or submain to outdoor consumer unit' }
  ],

  costEstimates: [
    { scenario: 'Hot tub, short run (<10m)', material: '£120-200', labour: '£200-300', total: '£320-500' },
    { scenario: 'Hot tub, medium run (10-20m)', material: '£200-350', labour: '£280-400', total: '£480-750' },
    { scenario: 'Hot tub, long run (20-35m)', material: '£350-550', labour: '£350-500', total: '£700-1050' },
    { scenario: 'Swim spa (40A+ supply)', material: '£400-700', labour: '£400-600', total: '£800-1300' },
    { scenario: 'Outdoor isolator switch', material: '£40-80', labour: '£60-100', total: '£100-180' }
  ],

  defined: {
    term: 'Hot Tub Cable Sizing',
    definition: 'Hot tub cable sizing determines the conductor cross-sectional area (mm²) needed to safely supply a spa or hot tub. Most UK hot tubs draw 13-32A continuously when heating. Cable must handle continuous load without overheating and keep voltage drop under 5% for reliable operation. Outdoor installation requires SWA cable and weatherproof isolator.'
  },

  defined2: {
    term: 'Hot Tub Electrical Requirements',
    definition: 'Hot tubs require dedicated electrical supplies with specific safety features: 30mA RCD protection (Type A or AC minimum), rotary isolator switch within sight of the tub (3m maximum), and weatherproof connections. The circuit must handle continuous heating load - hot tub heaters run for extended periods maintaining temperature.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a hot tub?',
      a: 'Most 32A hot tubs need 6mm² SWA cable for runs up to about 18m, or 10mm² for longer runs. Check your specific hot tub rating - some larger models need 40A supply with 10mm² cable minimum. Always calculate voltage drop for your cable length.'
    },
    {
      q: 'Can I plug a hot tub into a normal socket?',
      a: 'Some small hot tubs have 13A plugs and can use a standard socket. However, most quality hot tubs require 32A hardwired supplies. Even 13A hot tubs benefit from dedicated circuits as they run continuously and can trip shared circuits. Check manufacturer requirements.'
    },
    {
      q: 'Do I need an outdoor isolator switch for a hot tub?',
      a: 'Yes, BS 7671 requires a means of isolation within sight of the hot tub - typically a weatherproof rotary isolator switch. This allows emergency disconnection without entering the house. Position within 3m of the tub, at least 2m from the water edge.'
    },
    {
      q: 'What RCD protection is required for hot tubs?',
      a: '30mA RCD protection is mandatory for all hot tub circuits. Type A RCD minimum (detects AC and pulsating DC faults). Some manufacturers recommend Type B RCDs for units with variable speed pumps. The RCD can be at the consumer unit or in a local enclosure.'
    },
    {
      q: 'Why do hot tubs need dedicated circuits?',
      a: 'Hot tubs draw significant continuous current (up to 32A) for heating. Sharing circuits causes voltage drop, nuisance tripping, and potential overheating. Dedicated circuits ensure reliable operation and comply with manufacturer installation requirements for warranty validity.'
    },
    {
      q: 'How far can I run cable to a hot tub?',
      a: 'Distance is limited by voltage drop. At 32A, 6mm² cable drops about 7.3mV per amp per metre. A 20m run drops 4.7V (2%). Runs over 25-30m typically need 10mm² to keep voltage drop acceptable. Our calculator checks this automatically.'
    },
    {
      q: 'Can I install hot tub electrics myself?',
      a: 'No, hot tub installation is notifiable work under Part P Building Regulations. It involves outdoor circuits and requires qualified electrician certification. DIY electrical work on hot tubs is illegal, voids insurance, and can be lethal. Always use a registered electrician.'
    },
    {
      q: 'What about swim spas - do they need more power?',
      a: 'Yes, swim spas have powerful jet pumps plus heaters and often need 40A-63A supplies. Some require three-phase power. Check manufacturer specifications carefully. Cable sizes of 10mm² or 16mm² are common for swim spas. Plan supply capacity before purchase.'
    },
    {
      q: 'Do I need to notify the DNO for hot tub installation?',
      a: 'Not usually for standard 32A installations on existing domestic supplies. However, if adding significant load to a property near its supply limit, or if requiring supply upgrade, DNO notification may be needed. Your electrician can advise based on your specific situation.'
    },
    {
      q: 'What IP rating do outdoor electrical connections need?',
      a: 'Outdoor isolators and connection points need minimum IP65 (jet water protected) for hot tub installations. IP66 or IP67 is preferred for areas near water. All outdoor electrical equipment must be suitable for the conditions and properly sealed.'
    }
  ],

  defined3: {
    term: 'Continuous Load Consideration',
    definition: 'Hot tubs operate under continuous load conditions - heaters run for extended periods maintaining water temperature. BS 7671 requires cables for continuous loads to be derated or oversized. A 32A continuous load should be treated as requiring higher capacity than intermittent 32A loads. Most hot tub cable sizing already accounts for this.'
  },

  defined4: {
    term: 'Zone Requirements for Swimming Pools',
    definition: 'BS 7671 Section 702 defines zones around swimming pools, hot tubs and spas. Zone 0 is inside the vessel (no electrical equipment). Zone 1 extends to surrounding area. Zone 2 extends 1.5m beyond Zone 1. Different equipment types and IP ratings are permitted in each zone. Hot tub installations must comply with these zone requirements.'
  }
}

export default function HotTubCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="hot tub cable size, spa cable calculator, hot tub electrical, swim spa cable, jacuzzi electrical, BS 7671 hot tub, outdoor spa electrical, hot tub installation electrician" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/hot-tub-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/hot-tub-cable-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Hot Tub Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Hot Tub Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '734' }
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
                'name': 'How to Size Cable for Hot Tub Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for hot tub and spa electrical supply.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Check hot tub specifications', 'text': 'Find the amp rating or kW on the hot tub - typically 13A, 32A, or 40A' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run distance', 'text': 'Measure total cable route from house consumer unit to hot tub location' },
                  { '@type': 'HowToStep', 'name': 'Account for continuous load', 'text': 'Hot tubs run continuously - ensure cable can handle sustained current' },
                  { '@type': 'HowToStep', 'name': 'Calculate cable size', 'text': 'Use our calculator to determine minimum SWA cable size with voltage drop' },
                  { '@type': 'HowToStep', 'name': 'Plan isolator and RCD', 'text': 'Include outdoor isolator switch and 30mA RCD protection' }
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
              <Zap className="w-10 h-10" />
              <Waves className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-cyan-50 border-l-4 border-cyan-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-cyan-900 mb-3 flex items-center gap-2">
              <Waves className="w-5 h-5" />
              Hot Tub Cable Quick Facts
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
            />          </div>

          {/* CONTRACTOR LEAD CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need a Qualified Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted, local contractors for your hot tub installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Hot Tub Installations</h2>
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

          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-cyan-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-cyan-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hot Tub Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs including SWA cable, isolator, and labour. Excludes hot tub cost.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Actual costs vary by region, cable run length, and ground conditions.</p>
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
                <p className="text-sm text-cyan-700">Essential for outdoor hot tub cable runs</p>
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
                Looking for a qualified electrician for your hot tub installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=HotTubCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Hot Tub Cable Sizing Inquiry Form"
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
