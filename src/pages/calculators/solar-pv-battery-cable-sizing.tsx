import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Sun } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'solar-pv-battery-cable-sizing',
  title: 'Solar PV & Battery Cable Sizing Calculator',
  metaTitle: 'Solar PV Cable Size Calculator UK | Battery Storage | MCS | BS 7671 | TradeCalcs',
  metaDescription: 'Free solar PV and battery storage cable sizing calculator for UK electricians. Calculate AC and DC cable sizes for solar installations. MCS compliant, BS 7671.',
  heroDescription: 'Calculate the correct cable size for solar PV arrays, inverters, and battery storage systems',
  
  defaults: {
    loadType: 'amps' as const,
    current: '32',
    kW: '',
    length: '15',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'AC cable from inverter typically needs 6mm² or 10mm² for 3.6-8kW systems',
    'DC cable sizing depends on string voltage and current',
    'Battery systems may need separate supply circuit (16A-32A)',
    'MCS certification required for SEG payments',
    'G98/G99 DNO notification required for grid connection'
  ],

  symptomChecks: [
    { symptom: '3.6kW single-phase inverter (16A)', recommendation: '16A MCB, 2.5mm² or 4mm² cable depending on length' },
    { symptom: '5kW single-phase inverter (22A)', recommendation: '32A MCB, 4mm² or 6mm² cable for AC side' },
    { symptom: '8kW single-phase inverter (35A)', recommendation: '40A MCB, 6mm² or 10mm² cable for AC side' },
    { symptom: 'Battery storage system (5-10kWh)', recommendation: 'Check manufacturer specs - typically 16A-32A dedicated circuit' },
    { symptom: 'Three-phase 10kW+ system', recommendation: '3-phase supply required, 16A per phase, 4mm² 5-core cable' }
  ],

  costEstimates: [
    { scenario: 'AC cable run, consumer unit to inverter (<10m)', material: '£60-120', labour: '£100-180', total: '£160-300' },
    { scenario: 'AC cable run, longer distance (10-25m)', material: '£120-220', labour: '£150-280', total: '£270-500' },
    { scenario: 'DC cable from roof to inverter', material: '£150-350', labour: '£200-400', total: '£350-750' },
    { scenario: 'Battery system wiring', material: '£100-250', labour: '£150-300', total: '£250-550' },
    { scenario: 'Consumer unit upgrade for solar', material: '£150-300', labour: '£200-350', total: '£350-650' }
  ],

  defined: {
    term: 'Solar PV Cable Sizing',
    definition: 'Solar PV cable sizing covers both DC cables (from panels to inverter) and AC cables (from inverter to consumer unit). DC cables must handle high voltages (up to 600V) and are sized for string current with derating for roof temperatures. AC cables are sized like any circuit but must handle continuous inverter output current.'
  },

  defined2: {
    term: 'MCS Certification Requirements',
    definition: 'MCS (Microgeneration Certification Scheme) certification is required to receive Smart Export Guarantee (SEG) payments for exported electricity. MCS requires specific cable sizing, installation methods, and documentation. Only MCS-certified installers can register systems for SEG eligibility.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a 5kW solar inverter?',
      a: 'A 5kW single-phase inverter outputs approximately 22A at 230V. For the AC side, 4mm² cable is suitable for runs up to about 20m, or 6mm² for longer runs. Always check voltage drop for your specific cable length.'
    },
    {
      q: 'Do solar PV systems need RCD protection?',
      a: 'Yes, the AC circuit from inverter to consumer unit requires 30mA RCD protection under BS 7671. Most modern inverters have integrated RCD protection, but external RCD at the consumer unit is still required. Type A or Type B RCD depending on inverter type.'
    },
    {
      q: 'What\'s the difference between DC and AC cable sizing for solar?',
      a: 'DC cables connect panels to inverter - they carry high voltage DC (300-600V typically) and must be solar-rated with UV resistance. AC cables connect inverter to consumer unit - standard cables sized for inverter output current. Different calculations and cable types for each.'
    },
    {
      q: 'What MCB rating for a solar inverter?',
      a: 'MCB rating depends on inverter output current. 3.6kW = 16A MCB, 5kW = 25A or 32A MCB, 8kW = 40A MCB. Type B MCBs are standard. The circuit must be dedicated - not shared with other loads.'
    },
    {
      q: 'Do I need DNO permission for solar panels?',
      a: 'Yes, DNO notification is required. Systems up to 3.68kW per phase can use G98 notification (simple form). Larger systems need G99 application and approval before installation. Your MCS installer handles this paperwork.'
    },
    {
      q: 'How do I size DC cables for solar strings?',
      a: 'DC cable sizing depends on string short-circuit current (Isc), cable length, and temperature derating (roof installations get very hot). Typically 4mm² or 6mm² solar cable for residential strings. Use solar-specific cable rated for the system voltage.'
    },
    {
      q: 'What about battery storage cable sizing?',
      a: 'Battery systems have their own requirements - typically 16A-32A circuits depending on charge/discharge rate. High-power batteries (5kW+) may need 6mm² or 10mm² cables. Follow manufacturer specifications and ensure adequate MCB protection.'
    },
    {
      q: 'Can I connect solar to an existing consumer unit?',
      a: 'If the consumer unit has a spare way and adequate capacity, yes. However, older units may need upgrading for RCD protection or capacity. A dedicated isolator switch near the inverter is also required for safe maintenance.'
    },
    {
      q: 'What is G98 and G99?',
      a: 'G98 and G99 are DNO connection standards. G98 is for small systems up to 3.68kW per phase - simple notification, connect and notify within 28 days. G99 is for larger systems - requires application, approval, and possibly network studies before installation.'
    },
    {
      q: 'Do solar cables need to be fire-rated?',
      a: 'DC cables on roofs should be solar-rated (UV resistant, double insulated). In buildings, cables may need fire-resistant properties depending on the route. LSZH (Low Smoke Zero Halogen) cables are recommended for internal runs to reduce fire risk.'
    }
  ],

  defined3: {
    term: 'Smart Export Guarantee (SEG)',
    definition: 'SEG is the UK scheme where energy suppliers pay for electricity exported to the grid from solar PV systems. To receive SEG payments, your system must be installed by an MCS-certified installer with proper certification. Rates vary by supplier - typically 3-15p per kWh exported.'
  },

  defined4: {
    term: 'DC Isolator Requirements',
    definition: 'Solar PV systems require DC isolators at both the array (roof level) and inverter. These allow safe disconnection of the DC circuit for maintenance or emergencies. Isolators must be rated for the system voltage (typically 600V DC minimum) and installed to prevent accidental operation.'
  }
}

export default function SolarPVBatteryCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="solar PV cable size, solar panel cable calculator, inverter cable size, battery storage cable, MCS solar installation, BS 7671 solar, solar electrician, G98 G99" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/solar-pv-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/solar-pv-cable-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Solar PV & Battery Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Solar PV Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '1245' }
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
                'name': 'How to Size Cable for Solar PV Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for solar PV and battery storage installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Determine inverter output', 'text': 'Check inverter kW rating and calculate AC output current' },
                  { '@type': 'HowToStep', 'name': 'Measure AC cable run', 'text': 'Measure total cable length from inverter to consumer unit' },
                  { '@type': 'HowToStep', 'name': 'Calculate DC cable requirements', 'text': 'Size DC cables for string current with temperature derating' },
                  { '@type': 'HowToStep', 'name': 'Check voltage drop', 'text': 'Use our calculator to verify voltage drop is acceptable' },
                  { '@type': 'HowToStep', 'name': 'Specify isolators and protection', 'text': 'Plan DC isolators, AC isolator, MCB and RCD protection' }
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

        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Sun className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
              <Sun className="w-5 h-5" />
              Solar PV Cable Quick Facts
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
            />          </div>

          {/* CONTRACTOR LEAD CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need a Qualified Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted, local contractors for your solar PV installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Solar PV & Battery Installations</h2>
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
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-900 mb-3">Complete Your Renewable Energy Installation</h3>
            <p className="text-sm text-green-800 mb-4">
              Installing solar PV often goes hand-in-hand with other electrical upgrades. Many customers add <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="text-green-600 font-semibold hover:underline">EV charging</Link> to maximise self-consumption of solar energy. For complete renewable heating, our <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="text-green-600 font-semibold hover:underline">air source heat pump cable calculator</Link> covers the heating side. For outbuilding installations with solar, check our <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="text-green-600 font-semibold hover:underline">garden office cable sizing guide</Link>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-yellow-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Solar PV Installation Costs - Electrical Only (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK electrical installation costs. Does not include panels, inverter, or battery hardware.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Full system installation costs vary significantly.</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Renewable Energy Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">EV Charger</h3>
                <p className="text-sm text-green-700">Maximise solar self-consumption</p>
              </Link>
              <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="block p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Air Source Heat Pump</h3>
                <p className="text-sm text-blue-700">Complete renewable energy system</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Check long DC and AC runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your solar PV installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=SolarPVBatteryCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Solar PV Cable Sizing Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
  <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
</p>
            </div>
          </div>

          <div className="bg-yellow-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-yellow-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
