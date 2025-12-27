import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Sun } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'solar-pv',
  title: 'Solar PV Voltage Drop Calculator',
  metaTitle: 'Solar PV Voltage Drop Calculator UK | AC Side Cable Sizing | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for solar PV installations. Check BS 7671 compliance for inverter to consumer unit AC cables. MCS compliant guidance for UK solar installations.',
  heroDescription: 'Calculate voltage drop for solar PV AC circuits from inverter to consumer unit',
  
  defaults: {
    cableSize: '6',
    length: '15',
    current: '16',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'AC side voltage drop calculated same as any power circuit - 5% limit applies',
    'DC side uses different calculation - consult inverter/panel specifications',
    'Typical domestic inverter output: 3.6kW (16A), 5kW (22A), 8kW (35A) single-phase',
    'Three-phase inverters distribute current across phases - lower per-phase drop',
    'MCS requires voltage drop compliance for accreditation and FIT/SEG payments'
  ],

  symptomChecks: [
    { symptom: '3.6kW inverter - roof to garage CU (10m)', recommendation: '16A with 2.5mm² (18 mV/A/m). At 10m: (18 × 16 × 10) ÷ 1000 = 2.88V (1.25%) ✓' },
    { symptom: '5kW inverter - loft to utility (15m)', recommendation: '22A with 4mm² (11 mV/A/m). At 15m: (11 × 22 × 15) ÷ 1000 = 3.63V (1.58%) ✓' },
    { symptom: '8kW inverter - long run (25m)', recommendation: '35A with 6mm² (7.3 mV/A/m). At 25m: (7.3 × 35 × 25) ÷ 1000 = 6.39V (2.78%) ✓' },
    { symptom: '10kW three-phase - barn installation (40m)', recommendation: '15A per phase with 4mm². At 40m 3Ø: (11 × 15 × 40 × 0.866) ÷ 1000 = 5.72V (1.43% on 400V) ✓' },
    { symptom: 'Battery inverter to CU (hybrid system)', recommendation: 'Size for battery discharge current, not just PV. 5kW battery = 22A. Check both charge and discharge paths.' }
  ],

  costEstimates: [
    { scenario: 'Simple AC run (<10m)', material: '£50-100', labour: '£100-200', total: '£150-300' },
    { scenario: 'Standard domestic (10-20m)', material: '£80-180', labour: '£150-300', total: '£230-480' },
    { scenario: 'Long run or difficult route', material: '£150-300', labour: '£250-450', total: '£400-750' },
    { scenario: 'Three-phase AC installation', material: '£200-400', labour: '£300-500', total: '£500-900' },
    { scenario: 'Dedicated PV consumer unit', material: '£150-300', labour: '£200-350', total: '£350-650' }
  ],

  defined: {
    term: 'Solar PV AC Side Voltage Drop',
    definition: 'The AC side of a solar PV system runs from the inverter output to the consumer unit connection point. This uses standard BS 7671 voltage drop calculations with the 5% limit for power circuits. The inverter converts DC from panels to AC at 230V (single-phase) or 400V (three-phase). Cable sizing considers maximum inverter output current.'
  },

  defined2: {
    term: 'DC Side Considerations',
    definition: 'DC cable from panels to inverter uses different calculations based on string voltage (typically 300-600V DC) and string current. DC voltage drop should be kept under 1-2% to maintain MPPT efficiency. This calculator covers AC side only - consult panel and inverter specifications for DC cable sizing, or use specialist PV design software.'
  },

  defined3: {
    term: 'MCS Compliance Requirements',
    definition: 'The Microgeneration Certification Scheme (MCS) is required for Feed-in Tariff (legacy) and Smart Export Guarantee (SEG) payments. MCS standards require BS 7671 compliance including voltage drop limits. Installations must be by MCS-certified installers using approved equipment. Non-compliant installations may be refused grid connection or export payments.'
  },

  defined4: {
    term: 'G98/G99 Grid Connection',
    definition: 'Systems up to 16A per phase (3.68kW single-phase, 11.04kW three-phase) can connect under G98 with simple notification to DNO. Larger systems require G99 application with network studies. The DNO may impose export limitations based on local network capacity. Voltage drop compliance is part of the overall installation assessment.'
  },

  faqs: [
    {
      q: 'What cable size for a 3.6kW solar inverter?',
      a: 'A 3.6kW inverter outputs maximum 16A at 230V. For runs up to 15m, 2.5mm² (18 mV/A/m) is typically adequate: (18 × 16 × 15) ÷ 1000 = 4.32V (1.88%) ✓. For longer runs, use 4mm².'
    },
    {
      q: 'Does voltage drop affect solar panel efficiency?',
      a: 'AC side voltage drop doesn\'t affect panel efficiency but wastes generated power as heat in cables. DC side voltage drop can affect MPPT tracking and should be minimised. Keep DC drop under 1-2% and AC drop under 3% for optimal system efficiency.'
    },
    {
      q: 'How do I calculate inverter output current?',
      a: 'Current = Power ÷ Voltage. For single-phase: 3.6kW ÷ 230V = 15.7A (round to 16A). For three-phase, divide by √3 × 400V: 10kW ÷ 693V = 14.4A per phase. Always use the inverter\'s rated maximum output current from specifications.'
    },
    {
      q: 'Should I use single-phase or three-phase for my solar system?',
      a: 'Systems under 3.68kW are typically single-phase. Between 3.68-11kW, either works but three-phase balances load better. Over 11kW usually requires three-phase. Check your existing supply and DNO requirements.'
    },
    {
      q: 'What is the G98 limit and why does it matter?',
      a: 'G98 allows simplified connection for systems up to 16A per phase (3.68kW single-phase). Larger systems need G99 application with potential delays and costs. Many installers size systems just under 3.68kW to avoid G99 process.'
    },
    {
      q: 'Do I need a separate consumer unit for solar?',
      a: 'Not always required but often recommended. A dedicated PV consumer unit provides clear isolation, accommodates the AC isolator required by G98/G99, and makes maintenance easier. Some DNOs require it for larger installations.'
    },
    {
      q: 'What about battery storage cable sizing?',
      a: 'Battery systems can charge and discharge at high currents. Size cables for the maximum current in either direction. A 5kW battery system may need 6mm² cable for 22A at typical domestic run lengths. Consider both AC and DC sides of hybrid inverters.'
    },
    {
      q: 'Can I connect solar to any spare MCB in my consumer unit?',
      a: 'Solar must connect via a dedicated MCB with appropriate rating for the inverter output. Connection should be at the load side of the main switch. Some consumer units have specific positions for renewable connections. Consult your MCS installer.'
    },
    {
      q: 'What happens if voltage drop is too high on the AC side?',
      a: 'Excessive AC voltage drop means: power wasted as heat, potential inverter protection trips if voltage rises too high at inverter terminals, and possible grid compliance issues. The inverter may reduce output or disconnect.'
    },
    {
      q: 'Do I need RCD protection for solar circuits?',
      a: 'Yes, 30mA RCD protection is required for the AC circuit from inverter to consumer unit. Many inverters have built-in RCD functionality, but external protection is usually still required. Type B RCDs may be needed for some inverters with DC fault current capability.'
    },
    {
      q: 'How does export limitation affect cable sizing?',
      a: 'If your DNO limits export (common in constrained areas), the inverter will limit output accordingly. However, cable should still be sized for full inverter capacity - the limitation is software-controlled and may be lifted in future.'
    },
    {
      q: 'What about voltage rise rather than drop for solar?',
      a: 'When exporting power, current flows from inverter to grid, causing voltage rise at the inverter terminals. BS 7671 voltage drop limits still apply. High voltage rise can cause inverter disconnection. This is why low voltage drop is important for solar.'
    }
  ]
}

export default function SolarPVVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="solar PV voltage drop, inverter cable size, solar panel installation UK, MCS cable sizing, G98 G99 connection, AC cable solar, renewable energy electrical" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/solar-pv-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/solar-pv-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#f59e0b" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Solar PV', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Solar PV Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '356' }
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-amber-600 hover:text-amber-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Sun className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
              <Sun className="w-5 h-5" />
              Solar PV Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-amber-900">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
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
                <h3 className="text-xl font-bold mb-1">Need an MCS Certified Installer?</h3>
                <p className="text-purple-100">Get quotes from accredited solar installers in your area</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Solar PV Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-amber-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-amber-900 mb-3">Related Renewable Energy Calculations</h3>
            <p className="text-sm text-amber-800 mb-4">
              Installing a <Link to="/calculators/voltage-drop/heat-pump" className="text-amber-600 font-semibold hover:underline">heat pump</Link> alongside your solar panels? Check voltage drop for that circuit too. For battery storage systems with high discharge currents, use our <Link to="/cable-sizing-calculator" className="text-amber-600 font-semibold hover:underline">cable sizing calculator</Link>. See our <Link to="/voltage-drop-calculator" className="text-amber-600 font-semibold hover:underline">main voltage drop calculator</Link> for all circuit types.
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-amber-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-amber-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Solar PV AC Cable Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for AC side cabling only. Full solar installation costs vary significantly.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-amber-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. AC cable costs are typically a small part of total solar installation.</p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-orange-800">{usecaseData.defined2.definition}</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-yellow-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-yellow-800">{usecaseData.defined3.definition}</p>
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
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-amber-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-amber-700">Size cables for solar and battery systems</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-orange-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from MCS Certified Installers</h3>
              <p className="text-gray-700">
                Looking for a qualified solar installer? Tell us about your project and we'll connect you with MCS accredited contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=SolarPVVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Solar PV Voltage Drop Inquiry Form"
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
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-amber-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
