import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Wind } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'air-conditioning-cable-sizing',
  title: 'Air Conditioning Cable Sizing Calculator',
  metaTitle: 'Air Conditioning Cable Size Calculator UK | AC Unit | Split System | BS 7671 | TradeCalcs',
  metaDescription: 'Free air conditioning cable sizing calculator for UK electricians. Calculate correct cable size for split system AC, multi-split, and portable units. BS 7671 compliant.',
  heroDescription: 'Calculate the correct cable size for air conditioning and cooling system installations',
  
  defaults: {
    loadType: 'amps' as const,
    current: '16',
    kW: '',
    length: '10',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'Domestic split AC units typically 2.5-7kW (11A-30A)',
    'Outdoor unit needs dedicated circuit and local isolator',
    'Type C MCB often required for compressor inrush current',
    'Some units need separate indoor unit power supply',
    'Growing UK market - climate change driving demand'
  ],

  symptomChecks: [
    { symptom: 'Small bedroom unit (2.5-3.5kW)', recommendation: '16A MCB, 2.5mm² cable, Type C recommended' },
    { symptom: 'Living room unit (3.5-5kW)', recommendation: '16A or 20A MCB, 2.5mm² or 4mm² cable' },
    { symptom: 'Large room/open plan (5-7kW)', recommendation: '20A or 32A MCB, 4mm² or 6mm² cable' },
    { symptom: 'Multi-split system (1 outdoor, multiple indoor)', recommendation: 'Size for outdoor unit load, indoor units often from FCU' },
    { symptom: 'Commercial VRF system', recommendation: 'Three-phase usually required, consult manufacturer specs' }
  ],

  costEstimates: [
    { scenario: 'Single split AC, short run (<8m)', material: '£60-120', labour: '£120-220', total: '£180-340' },
    { scenario: 'Single split AC, longer run (8-15m)', material: '£100-180', labour: '£150-280', total: '£250-460' },
    { scenario: 'Outdoor unit on external wall', material: '£80-150', labour: '£140-250', total: '£220-400' },
    { scenario: 'Multi-split system wiring', material: '£150-300', labour: '£250-450', total: '£400-750' },
    { scenario: 'Outdoor isolator switch', material: '£30-60', labour: '£50-100', total: '£80-160' }
  ],

  defined: {
    term: 'Air Conditioning Cable Sizing',
    definition: 'AC cable sizing determines the conductor cross-sectional area (mm²) needed to safely supply air conditioning units. Split systems have an outdoor compressor unit requiring a dedicated circuit and local isolator. Indoor units may be powered from the outdoor unit or need separate supply. Cable must handle compressor inrush current and continuous running load.'
  },

  defined2: {
    term: 'Compressor Inrush Current',
    definition: 'AC compressors draw 4-8 times their running current when starting. A unit with 10A running current may draw 40-80A momentarily on startup. Type C MCBs (10x trip threshold) or Type D (20x) prevent nuisance tripping while maintaining protection. Check manufacturer specifications for MCB requirements.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a 5kW air conditioning unit?',
      a: 'A 5kW AC unit typically draws 20-22A running current. Use 4mm² cable on a 20A or 25A Type C MCB for most installations. For longer runs (15m+), consider 6mm² to ensure adequate voltage during compressor startup.'
    },
    {
      q: 'Why do AC units need Type C MCBs?',
      a: 'Compressor motors have high inrush current when starting - up to 8 times running current. Type B MCBs (5x trip threshold) often nuisance trip on compressor starts. Type C MCBs (10x) handle this inrush while still providing protection.'
    },
    {
      q: 'Do I need a dedicated circuit for air conditioning?',
      a: 'Yes, AC outdoor units need dedicated circuits from the consumer unit. They cannot share circuits with other loads due to high starting currents and continuous operation. Indoor units may be fed from the outdoor unit or need separate supply depending on model.'
    },
    {
      q: 'What isolation is required for AC units?',
      a: 'A local isolator switch is required adjacent to the outdoor unit for safe maintenance. This should be a rotary isolator rated for the circuit current. IP65 rating minimum for outdoor exposure. The isolator allows disconnection without returning to the consumer unit.'
    },
    {
      q: 'Do air conditioning units need RCD protection?',
      a: 'RCD protection is required for circuits supplying outdoor equipment. 30mA RCD at the consumer unit is standard. Some AC manufacturers specify Type A or Type B RCDs depending on the inverter technology used in the unit.'
    },
    {
      q: 'Can I install a portable AC unit on a normal socket?',
      a: 'Portable AC units up to about 3kW (13A) can use standard 13A sockets. However, they draw significant continuous current and may stress the socket. For regular use, a dedicated socket on its own circuit is recommended.'
    },
    {
      q: 'What about multi-split systems?',
      a: 'Multi-split systems have one outdoor unit serving multiple indoor units. The electrical supply is sized for the outdoor unit capacity. Indoor units are typically powered via interconnecting cables from the outdoor unit, though some need separate supplies. Check manufacturer specifications.'
    },
    {
      q: 'Is planning permission needed for AC outdoor units?',
      a: 'Usually not for domestic installations under permitted development, but there are conditions: maximum 0.6m³ outdoor unit, not on a wall facing a highway, noise limits apply. Listed buildings and conservation areas need permission. Check local requirements.'
    },
    {
      q: 'What about F-Gas regulations?',
      a: 'F-Gas regulations require that refrigerant handling (installation, maintenance, decommissioning) is done by F-Gas certified engineers. The electrical installation can be done by any competent electrician, but refrigerant work needs specialist certification.'
    },
    {
      q: 'Do I need Part P notification for AC installation?',
      a: 'Yes, installing a new circuit for an air conditioning unit is notifiable under Part P. This includes the outdoor unit supply circuit. Work must be done by a registered competent person or inspected by Building Control.'
    }
  ],

  defined3: {
    term: 'Split System AC',
    definition: 'A split system has an outdoor unit (containing compressor and condenser) connected to an indoor unit (containing evaporator and fan) by refrigerant pipes and electrical cables. The outdoor unit requires dedicated electrical supply. Indoor units may be wall-mounted, ceiling cassette, or ducted.'
  },

  defined4: {
    term: 'Inverter AC Technology',
    definition: 'Modern inverter AC units vary compressor speed to match cooling demand, rather than cycling on/off. This improves efficiency but creates specific electrical characteristics. Some inverter units require Type B RCDs to detect DC fault currents. Check manufacturer specifications for RCD requirements.'
  }
}

export default function AirConditioningCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="air conditioning cable size, AC unit cable calculator, split system electrical, air con electrician, BS 7671 air conditioning, cooling system cable, HVAC electrical" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/air-conditioning-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/air-conditioning-cable-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Air Conditioning Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Air Conditioning Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '534' }
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
                'name': 'How to Size Cable for Air Conditioning Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for AC unit installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Check AC unit specifications', 'text': 'Find the running current and maximum current from manufacturer data' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run', 'text': 'Measure from consumer unit to outdoor unit location' },
                  { '@type': 'HowToStep', 'name': 'Calculate cable size', 'text': 'Size cable for maximum current with voltage drop check' },
                  { '@type': 'HowToStep', 'name': 'Specify MCB type', 'text': 'Select Type C MCB to handle compressor inrush' },
                  { '@type': 'HowToStep', 'name': 'Plan isolator', 'text': 'Include outdoor isolator switch for safe maintenance' }
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

        <div className="bg-gradient-to-r from-sky-600 to-blue-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Wind className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-sky-50 border-l-4 border-sky-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-sky-900 mb-3 flex items-center gap-2">
              <Wind className="w-5 h-5" />
              Air Conditioning Cable Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-sky-900">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 mt-0.5 flex-shrink-0" />
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
                <p className="text-purple-100">Get quotes from vetted, local contractors for your air conditioning installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common AC Installations</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sky-700 font-bold text-sm">{i + 1}</span>
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
            <h3 className="font-bold text-emerald-900 mb-3">Complete Climate Control</h3>
            <p className="text-sm text-emerald-800 mb-4">
              For year-round heating and cooling, consider an <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="text-emerald-600 font-semibold hover:underline">air source heat pump</Link> which provides both heating and cooling. Some homeowners combine AC with <Link to="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="text-emerald-600 font-semibold hover:underline">solar PV systems</Link> to offset running costs. For hot tub and pool areas, see our <Link to="/calculators/cable-sizing/swimming-pool-cable-sizing" className="text-emerald-600 font-semibold hover:underline">swimming pool electrical guide</Link>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-sky-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-sky-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">AC Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK electrical installation costs. Does not include AC unit or F-Gas refrigerant work.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-sky-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Full AC installation including refrigerant work is additional.</p>
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
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="block p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-emerald-900 mb-1">Air Source Heat Pump</h3>
                <p className="text-sm text-emerald-700">Heating and cooling combined</p>
              </Link>
              <Link to="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="block p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-yellow-900 mb-1">Solar PV & Battery</h3>
                <p className="text-sm text-yellow-700">Offset AC running costs</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-blue-700">Check compressor voltage</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your air conditioning installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=AirConditioningCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Air Conditioning Cable Sizing Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
  <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
</p>
            </div>
          </div>

          <div className="bg-sky-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-sky-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
