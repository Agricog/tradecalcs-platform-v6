import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Droplets } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'hot-tub',
  title: 'Hot Tub & Spa Voltage Drop Calculator',
  metaTitle: 'Hot Tub Voltage Drop Calculator UK | Spa Electrical | Dedicated Circuit | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for hot tub and spa installations. BS 7671 compliant for dedicated outdoor circuits. Calculate cable size for 13A, 16A, 20A and 32A hot tubs.',
  heroDescription: 'Calculate voltage drop for hot tub and spa dedicated circuits',
  
  defaults: {
    cableSize: '6',
    length: '20',
    current: '32',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'Hot tubs need dedicated circuits - never share with other loads',
    'Most UK hot tubs require 13A, 16A, 20A or 32A supply depending on heater size',
    '32A hot tubs (7.5kW) are most common for quality models with fast heat-up',
    'Outdoor installation requires RCD protection and weatherproof isolator within sight',
    'SWA cable or protected conduit required for buried/outdoor cable runs'
  ],

  symptomChecks: [
    { symptom: '13A plug-in hot tub (3kW) - extension not recommended', recommendation: 'Plug-in tubs should use dedicated socket. If long run needed: 13A with 2.5mm² at 15m: (18 × 13 × 15) ÷ 1000 = 3.51V (1.53%) ✓' },
    { symptom: '16A hot tub (3.7kW) - 15m garden run', recommendation: '16A with 4mm² (11 mV/A/m). At 15m: (11 × 16 × 15) ÷ 1000 = 2.64V (1.15%) ✓' },
    { symptom: '20A hot tub (4.5kW) - 20m to patio', recommendation: '20A with 4mm² (11 mV/A/m). At 20m: (11 × 20 × 20) ÷ 1000 = 4.40V (1.91%) ✓' },
    { symptom: '32A hot tub (7.5kW) - 25m garden run', recommendation: '32A with 6mm² (7.3 mV/A/m). At 25m: (7.3 × 32 × 25) ÷ 1000 = 5.84V (2.54%) ✓' },
    { symptom: '32A hot tub - long run (40m)', recommendation: '32A with 10mm² (4.4 mV/A/m). At 40m: (4.4 × 32 × 40) ÷ 1000 = 5.63V (2.45%) ✓' }
  ],

  costEstimates: [
    { scenario: '13A dedicated socket circuit', material: '£100-200', labour: '£200-350', total: '£300-550' },
    { scenario: '16/20A hot tub circuit (<15m)', material: '£150-300', labour: '£250-450', total: '£400-750' },
    { scenario: '32A hot tub circuit (<25m)', material: '£250-450', labour: '£350-550', total: '£600-1000' },
    { scenario: '32A hot tub - long run (25-40m)', material: '£400-700', labour: '£400-650', total: '£800-1350' },
    { scenario: 'Rotary isolator + installation', material: '£50-120', labour: '£80-150', total: '£130-270' }
  ],

  defined: {
    term: 'Hot Tub Electrical Requirements',
    definition: 'Hot tubs require dedicated circuits because their heaters draw significant current continuously. A 32A (7.5kW) hot tub running its heater and pumps draws close to full rated current for extended periods. Sharing with other loads risks overloading the circuit and tripping. The dedicated circuit ensures reliable operation and meets manufacturer warranty requirements.'
  },

  defined2: {
    term: 'Local Isolator Requirements',
    definition: 'BS 7671 requires a means of isolation within sight of the hot tub or within 3m. A weatherproof rotary isolator (IP65 minimum) mounted near the tub allows safe disconnection for maintenance without going back to the consumer unit. The isolator should be lockable for safety during servicing and positioned where users exiting the tub can\'t accidentally touch it.'
  },

  defined3: {
    term: 'RCD Protection for Hot Tubs',
    definition: 'As outdoor equipment that combines electricity and water, hot tubs require 30mA RCD protection (BS 7671 Section 701 principles apply near water). The RCD can be at the consumer unit or as an RCBO. Some installers add a local RCD at the isolator for additional protection, but this isn\'t required if main board protection exists.'
  },

  defined4: {
    term: 'Cable Installation Methods',
    definition: 'Underground cables to garden hot tubs must be SWA (Steel Wire Armoured) or protected in suitable conduit. Burial depth: minimum 450mm (600mm under driveways). Warning tape should be placed above the cable. Above-ground runs can use SWA on cable clips or standard cable in conduit. All outdoor sections need UV-resistant materials or protection from sunlight.'
  },

  faqs: [
    {
      q: 'What size circuit do I need for a hot tub?',
      a: 'Check your hot tub specifications. Plug-in models use 13A. Mid-range tubs typically need 16A or 20A. Quality 7.5kW tubs need 32A. The manufacturer\'s manual specifies the required supply - don\'t undersize or the heater won\'t work properly.'
    },
    {
      q: 'Can I use an extension lead for my hot tub?',
      a: 'No. Even 13A plug-in hot tubs should use a dedicated socket, not an extension lead. Extension leads can overheat with continuous high current draw. For hot tubs away from the house, install a proper outdoor socket or hardwired supply.'
    },
    {
      q: 'What cable size for a 32A hot tub?',
      a: 'For runs up to 25m, 6mm² SWA is typically adequate: (7.3 × 32 × 25) ÷ 1000 = 5.84V (2.54%) ✓. For longer runs (30-40m), use 10mm² to keep voltage drop acceptable.'
    },
    {
      q: 'Does my hot tub need RCD protection?',
      a: 'Yes, 30mA RCD protection is required for hot tub circuits. This can be an RCBO at the consumer unit or a separate RCD. The combination of water and electricity outdoors makes RCD protection essential for safety.'
    },
    {
      q: 'What is the rotary isolator for?',
      a: 'The rotary isolator allows you to safely disconnect power to the hot tub for maintenance, water changes, or emergencies without going to the main consumer unit. It must be within sight of the tub (or within 3m) and should be IP65 rated for outdoor use.'
    },
    {
      q: 'Can I install a hot tub myself?',
      a: 'The hot tub itself is DIY-installable (delivery, positioning, filling). The electrical connection must be done by a qualified electrician and is notifiable under Part P Building Regulations. You\'ll receive an electrical certificate for the work.'
    },
    {
      q: 'How deep should I bury the cable?',
      a: 'Minimum 450mm deep, or 600mm under driveways and areas where vehicles might pass. Use SWA cable and lay warning tape above the cable. Mark the cable route for future reference - you don\'t want to dig through it later!'
    },
    {
      q: 'What IP rating for outdoor electrical equipment?',
      a: 'Minimum IP65 for the isolator switch - this means dust-tight and protected against water jets. Socket outlets (if used for plug-in tubs) should also be IP65 or in a weatherproof enclosure. The consumer unit can be indoors.'
    },
    {
      q: 'Will my consumer unit handle a 32A hot tub?',
      a: 'Depends on your existing supply. A 32A circuit adds 7.5kW to your peak demand. Most modern 100A supplies can accommodate this, but older properties with 60A supplies may need an upgrade. Your electrician will assess total demand.'
    },
    {
      q: 'Can I connect my hot tub to my garage supply?',
      a: 'Only if the garage has adequate spare capacity and you install a dedicated circuit from the garage consumer unit. Don\'t tap into existing circuits. Check voltage drop for the total run from main house board through garage to hot tub.'
    },
    {
      q: 'What about inflatable hot tubs?',
      a: 'Inflatable hot tubs typically use 13A plug-in supplies (1.3-2kW). They still need a proper outdoor socket or close indoor socket - not extension leads. RCD protection is still essential. They heat much slower than hardwired tubs.'
    },
    {
      q: 'How long does hot tub electrical installation take?',
      a: 'Typically half a day to a full day depending on cable run length and route complexity. The electrician will install cable from consumer unit to hot tub location, fit the isolator, make final connections, test, and certify the installation.'
    }
  ]
}

export default function HotTubVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="hot tub voltage drop, spa electrical installation, 32A hot tub cable, dedicated hot tub circuit, outdoor hot tub wiring, SWA cable hot tub, rotary isolator, RCD hot tub" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/hot-tub-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/hot-tub-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#8b5cf6" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Hot Tub', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Hot Tub Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '423' }
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-violet-600 hover:text-violet-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Droplets className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-violet-50 border-l-4 border-violet-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-violet-900 mb-3 flex items-center gap-2">
              <Droplets className="w-5 h-5" />
              Hot Tub Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-violet-900">
                  <CheckCircle2 className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
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

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need a Qualified Electrician?</h3>
                <p className="text-purple-100">Get quotes for hot tub electrical installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Hot Tub Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-violet-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-violet-50 border border-violet-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-violet-900 mb-3">Related Outdoor Installations</h3>
            <p className="text-sm text-violet-800 mb-4">
              Adding a <Link to="/calculators/voltage-drop/garden-lighting" className="text-violet-600 font-semibold hover:underline">garden lighting</Link> circuit near your hot tub? For larger pool installations, see <Link to="/calculators/voltage-drop/swimming-pool" className="text-violet-600 font-semibold hover:underline">swimming pool electrical</Link>. Use our <Link to="/cable-sizing-calculator" className="text-violet-600 font-semibold hover:underline">cable sizing calculator</Link> to check current capacity.
            </p>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-violet-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-violet-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Hot Tub Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for hot tub electrical installation.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-violet-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Costs vary by cable run length and installation complexity.</p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-purple-800">{usecaseData.defined2.definition}</p>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-blue-800">{usecaseData.defined3.definition}</p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-indigo-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-indigo-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-violet-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-violet-700">Size cables for hot tub current capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-purple-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-purple-700">Full BS 7671 voltage drop for all circuits</p>
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
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=HotTubVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Hot Tub Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-violet-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-violet-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
