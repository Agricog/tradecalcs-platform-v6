import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Flame } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'electric-storage-heater-cable-sizing',
  title: 'Electric Storage Heater Cable Sizing Calculator',
  metaTitle: 'Electric Storage Heater Cable Size UK | Economy 7 | BS 7671 | TradeCalcs',
  metaDescription: 'Free electric storage heater cable sizing calculator for UK electricians. Calculate correct cable size for storage heaters, panel heaters, and Economy 7 systems. BS 7671 compliant.',
  heroDescription: 'Calculate the correct cable size for storage heaters, panel heaters, and electric heating circuits',
  
  defaults: {
    loadType: 'kw' as const,
    current: '',
    kW: '3',
    length: '12',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'Storage heaters typically 1.7kW to 3.4kW each',
    'Each heater usually needs dedicated radial circuit',
    'Economy 7/10 meters require off-peak wiring',
    'Panel heaters can often share circuits (lower wattage)',
    'Consider total heating load when sizing main supply'
  ],

  symptomChecks: [
    { symptom: 'Single storage heater (2kW)', recommendation: '13A circuit minimum, 2.5mm² cable usually sufficient' },
    { symptom: 'Large storage heater (3.4kW)', recommendation: '16A or 20A circuit, 2.5mm² cable for most runs' },
    { symptom: 'Multiple storage heaters (whole house)', recommendation: 'Dedicated circuit per heater, check total supply capacity' },
    { symptom: 'Panel heaters (400W-1.5kW)', recommendation: 'Can share 20A radial with multiple heaters on same circuit' },
    { symptom: 'Economy 7 system', recommendation: 'Off-peak supply wiring, separate consumer unit or time switch' }
  ],

  costEstimates: [
    { scenario: 'Single storage heater circuit', material: '£60-120', labour: '£120-200', total: '£180-320' },
    { scenario: 'Replace storage heater wiring', material: '£80-150', labour: '£150-250', total: '£230-400' },
    { scenario: 'Full house storage heater install (4-6 units)', material: '£400-700', labour: '£600-1000', total: '£1000-1700' },
    { scenario: 'Economy 7 meter + wiring setup', material: '£150-300', labour: '£200-400', total: '£350-700' },
    { scenario: 'Panel heater circuit (multiple heaters)', material: '£100-180', labour: '£150-280', total: '£250-460' }
  ],

  defined: {
    term: 'Storage Heater Cable Sizing',
    definition: 'Storage heater cable sizing calculates the conductor size needed to safely supply electric storage heaters. These heaters charge overnight on cheap off-peak electricity (Economy 7/10) and release heat during the day. Each heater typically needs its own circuit due to continuous high current draw during the charging period.'
  },

  defined2: {
    term: 'Economy 7 and Off-Peak Tariffs',
    definition: 'Economy 7 provides 7 hours of cheaper electricity overnight (typically 12am-7am) for storage heater charging. The meter has two registers - peak and off-peak. Wiring must ensure storage heaters only draw power during off-peak hours via time switches or dedicated off-peak circuits from a dual-rate meter.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a storage heater?',
      a: 'Most storage heaters (1.7kW-3.4kW) need 2.5mm² cable on a 16A or 20A circuit. A 3.4kW heater draws about 14.8A, so 16A minimum. For older properties with long cable runs, consider 4mm² to reduce voltage drop. Each heater typically needs its own circuit.'
    },
    {
      q: 'Do storage heaters need their own circuit?',
      a: 'Generally yes - storage heaters draw high current continuously for 7+ hours overnight. Sharing circuits risks overloading and nuisance tripping. Each heater should have a dedicated radial circuit from the consumer unit, controlled by the off-peak supply.'
    },
    {
      q: 'Can I put two storage heaters on one circuit?',
      a: 'Only if the combined load is within the circuit rating. Two 1.7kW heaters (7.4A each = 14.8A total) could share a 20A circuit. But two 3.4kW heaters (14.8A each = 29.6A) cannot. Separate circuits are usually safer and more flexible.'
    },
    {
      q: 'What about panel heaters - same cable requirements?',
      a: 'Panel heaters are typically lower wattage (400W-1.5kW) and can often share circuits. A 20A circuit could supply several panel heaters totalling up to 4kW. They don\'t usually need Economy 7 as they heat on demand, not overnight storage.'
    },
    {
      q: 'How does Economy 7 wiring work?',
      a: 'The electricity meter has two rates - peak and off-peak. Storage heater circuits connect through a time switch or dedicated off-peak supply that only provides power during cheap-rate hours. The meter tracks usage separately for billing purposes.'
    },
    {
      q: 'Is Economy 7 still worth it?',
      a: 'It depends on your usage pattern. Off-peak rates are cheaper, but peak rates are higher than standard tariffs. If you use lots of electricity during the day, you may pay more overall. Modern alternatives like heat pumps are often more cost-effective.'
    },
    {
      q: 'Can I replace storage heaters with panel heaters?',
      a: 'Yes, but panel heaters run on peak-rate electricity, so running costs may be higher. They\'re simpler to install and more controllable. Consider the whole-house heating cost before switching. The existing wiring can usually be reused.'
    },
    {
      q: 'What size consumer unit for storage heater system?',
      a: 'Each storage heater needs one way. A 4-bedroom house might have 5-6 storage heaters plus immersion heater. Allow 8-10 ways for heating plus normal circuits. Some systems use a separate consumer unit just for heating circuits.'
    },
    {
      q: 'Do I need RCD protection for storage heaters?',
      a: 'BS 7671 requires RCD protection for most circuits. Storage heater circuits should have 30mA RCD protection, either via RCBO or shared RCD. This is especially important as heaters often have accessible elements.'
    },
    {
      q: 'How do I know if my supply can handle storage heaters?',
      a: 'Add up all heater wattages plus other high loads (shower, cooker, immersion). If total exceeds 60A (14kW) on single phase, you may need supply upgrade. Most houses have 80A-100A supplies which handle typical storage heater installations.'
    }
  ],

  defined3: {
    term: 'Storage Heater Ratings',
    definition: 'Storage heaters are sized by heat output and storage capacity. Common ratings: 1.7kW (small rooms), 2.5kW (medium rooms), 3.4kW (large rooms/lounges). The kW rating indicates charging power draw - a 3.4kW heater draws 14.8A continuously for 7 hours overnight. Size heaters to room heat loss calculations.'
  },

  defined4: {
    term: 'Dual-Rate Metering',
    definition: 'Dual-rate meters record electricity use at two different prices. Off-peak hours (typically 7 hours overnight) are charged at a lower rate for storage heater charging. Modern smart meters can provide similar functionality. Check with your supplier about off-peak tariff availability and timing.'
  }
}

export default function ElectricStorageHeaterCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="storage heater cable size, Economy 7 wiring, electric heating cable, panel heater circuit, night storage heater, off-peak electricity, BS 7671 storage heater, electric heating UK" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/storage-heater-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/storage-heater-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#dc2626" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Electric Storage Heater Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Electric Storage Heater Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '445' }
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
                'name': 'How to Size Cable for Storage Heater Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for electric storage heater circuits.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Check heater rating', 'text': 'Find the kW rating on the storage heater - typically 1.7kW to 3.4kW' },
                  { '@type': 'HowToStep', 'name': 'Calculate current draw', 'text': 'Divide watts by 230V to get amps - e.g. 3400W ÷ 230V = 14.8A' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run', 'text': 'Measure distance from consumer unit to heater location' },
                  { '@type': 'HowToStep', 'name': 'Calculate cable size', 'text': 'Use calculator - most heaters need 2.5mm² on 16A or 20A circuit' },
                  { '@type': 'HowToStep', 'name': 'Plan Economy 7 wiring', 'text': 'Ensure heater connects to off-peak supply if using dual-rate tariff' }
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

        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Flame className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-red-900 mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Storage Heater Cable Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                  <CheckCircle2 className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
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
                <p className="text-purple-100">Get quotes from vetted, local contractors for your storage heater installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Storage Heater Installations</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-700 font-bold text-sm">{i + 1}</span>
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
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-3">Related Heating & High-Load Circuits</h3>
            <p className="text-sm text-orange-800 mb-4">
              Storage heaters often combine with <Link to="/calculators/cable-sizing/immersion-heater-cable-sizing" className="text-orange-600 font-semibold hover:underline">immersion heaters</Link> on Economy 7 systems. For modern alternatives, see our <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="text-orange-600 font-semibold hover:underline">air source heat pump calculator</Link>. Supplementary heating? Check <Link to="/calculators/cable-sizing/underfloor-heating-cable-sizing" className="text-orange-600 font-semibold hover:underline">electric underfloor heating</Link> for bathrooms and kitchens.
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-red-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-red-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Storage Heater Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs including cable, circuit work, and labour.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-red-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Does not include cost of storage heater units.</p>
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

          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-red-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-red-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/calculators/cable-sizing/immersion-heater-cable-sizing" className="block p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Immersion Heater</h3>
                <p className="text-sm text-blue-700">Economy 7 hot water</p>
              </Link>
              <Link to="/calculators/cable-sizing/underfloor-heating-cable-sizing" className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-red-900 mb-1">Underfloor Heating</h3>
                <p className="text-sm text-red-700">Electric UFH circuits</p>
              </Link>
              <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="block p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-emerald-900 mb-1">Heat Pump</h3>
                <p className="text-sm text-emerald-700">Modern heating alternative</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your storage heater installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=StorageHeaterCableSizing" 
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

          <div className="bg-red-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
