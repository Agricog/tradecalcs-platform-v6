import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Thermometer } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'heat-pump',
  title: 'Heat Pump Voltage Drop Calculator',
  metaTitle: 'Heat Pump Voltage Drop Calculator UK | ASHP & GSHP | BS 7671 MCS | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for heat pump installations. Check BS 7671 compliance for air source (ASHP) and ground source (GSHP) heat pumps. MCS compliant guidance.',
  heroDescription: 'Calculate voltage drop for air source and ground source heat pump circuits',
  
  defaults: {
    cableSize: '6',
    length: '20',
    current: '25',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'Domestic ASHP typically 5-16kW requiring 20-40A single-phase supply',
    'Larger systems (12kW+) often benefit from three-phase for balanced loading',
    'Compressor starting current can be 3-6× running current - check manufacturer specs',
    'Defrost cycles cause temporary current spikes - allow headroom in cable sizing',
    'MCS certification requires BS 7671 compliance including voltage drop limits'
  ],

  symptomChecks: [
    { symptom: '5kW ASHP - outdoor unit 10m from CU', recommendation: '22A with 4mm² (11 mV/A/m). At 10m: (11 × 22 × 10) ÷ 1000 = 2.42V (1.05%) ✓' },
    { symptom: '9kW ASHP - typical domestic (15m)', recommendation: '32A with 6mm² (7.3 mV/A/m). At 15m: (7.3 × 32 × 15) ÷ 1000 = 3.50V (1.52%) ✓' },
    { symptom: '12kW ASHP - long garden run (25m)', recommendation: '40A with 10mm² (4.4 mV/A/m). At 25m: (4.4 × 40 × 25) ÷ 1000 = 4.40V (1.91%) ✓' },
    { symptom: '16kW three-phase ASHP (30m)', recommendation: '25A per phase with 6mm². At 30m 3Ø: (7.3 × 25 × 30 × 0.866) ÷ 1000 = 4.74V (1.18% on 400V) ✓' },
    { symptom: 'GSHP with multiple compressors', recommendation: 'Size for maximum simultaneous demand. 20kW system may draw 35A+ at startup. Consider soft start or staged compressor operation.' }
  ],

  costEstimates: [
    { scenario: 'Simple ASHP circuit (<15m)', material: '£100-200', labour: '£200-350', total: '£300-550' },
    { scenario: 'Standard installation (15-25m)', material: '£180-350', labour: '£300-500', total: '£480-850' },
    { scenario: 'Long run or buried cable', material: '£300-550', labour: '£400-700', total: '£700-1250' },
    { scenario: 'Three-phase installation', material: '£400-700', labour: '£500-800', total: '£900-1500' },
    { scenario: 'CU upgrade/new way', material: '£150-350', labour: '£150-300', total: '£300-650' }
  ],

  defined: {
    term: 'Heat Pump Electrical Requirements',
    definition: 'Heat pumps contain compressor motors that draw significant current - typically 20-40A for domestic air source units. Unlike resistive heaters, compressor motors have inrush current on startup (3-6× running current) and may require Type C or D MCBs to prevent nuisance tripping. The outdoor unit location means cables often run externally, requiring SWA or protected installation methods.'
  },

  defined2: {
    term: 'ASHP vs GSHP Considerations',
    definition: 'Air Source Heat Pumps (ASHP) locate the compressor unit outdoors with refrigerant lines to indoor unit. Ground Source Heat Pumps (GSHP) have the compressor indoors with ground loop connections. GSHP may have longer cable runs to plant room. Both require careful voltage drop calculation as compressor efficiency reduces with low voltage supply.'
  },

  defined3: {
    term: 'MCS and BUS Grant Requirements',
    definition: 'The Microgeneration Certification Scheme (MCS) is required for Boiler Upgrade Scheme (BUS) grants of £7,500 for ASHP or £7,500 for GSHP. MCS installation standards mandate BS 7671 compliance including voltage drop limits. MCS installers must provide EIC certificates and design documentation showing compliance.'
  },

  defined4: {
    term: 'Defrost Cycle Impact',
    definition: 'ASHPs periodically reverse refrigerant flow to defrost the outdoor coil in cold weather. This defrost cycle temporarily increases current draw as the compressor works harder. While brief (typically 5-10 minutes), frequent defrost cycles in very cold weather mean the heat pump operates at elevated current more often. Allow margin in cable sizing for this operating mode.'
  },

  faqs: [
    {
      q: 'What cable size for a 9kW air source heat pump?',
      a: 'A 9kW ASHP typically draws 30-35A running current. Use 6mm² (7.3 mV/A/m) for runs up to 20m: (7.3 × 35 × 20) ÷ 1000 = 5.11V (2.22%) ✓. For longer runs or if starting current is high, consider 10mm².'
    },
    {
      q: 'Does voltage drop affect heat pump efficiency?',
      a: 'Yes. Compressor motors are less efficient at reduced voltage and may overheat. Modern inverter-driven heat pumps tolerate voltage variation better than fixed-speed units, but excessive drop still reduces COP (Coefficient of Performance) and lifespan.'
    },
    {
      q: 'Should I use single-phase or three-phase for my heat pump?',
      a: 'Systems under 10kW typically use single-phase. 10-16kW can be either, but three-phase balances load better and reduces cable size requirements. Above 16kW usually requires three-phase. Check manufacturer recommendations and your existing supply.'
    },
    {
      q: 'What MCB type for a heat pump circuit?',
      a: 'Compressor motors have starting inrush current 3-6× running current. Type C MCB (5-10× trip) is usually sufficient. Some units with high inrush may need Type D (10-20×). Check manufacturer specifications for recommended protection.'
    },
    {
      q: 'Do I need RCD protection for a heat pump?',
      a: 'Yes, 30mA RCD protection is required for outdoor equipment circuits under BS 7671. Type A RCD is minimum; some heat pumps with inverter drives recommend Type B RCDs to detect DC fault currents. Check manufacturer requirements.'
    },
    {
      q: 'Can I run heat pump cable underground without armour?',
      a: 'No. Underground cables must be SWA (Steel Wire Armoured) or protected in suitable ducting. Burial depth minimum 450mm (600mm under driveways) with warning tape. SWA is preferred for mechanical protection and moisture resistance.'
    },
    {
      q: 'How do I calculate heat pump current from kW rating?',
      a: 'Electrical input (not heat output) determines current. A 9kW heat pump with COP of 3 has ~3kW electrical input = 13A running. But this is minimum - use manufacturer\'s rated current which accounts for defrost, boost, and startup conditions.'
    },
    {
      q: 'What about the backup immersion heater?',
      a: 'Most ASHP systems include a backup immersion heater (typically 3kW = 13A). This may run simultaneously with the heat pump in extreme cold. Some systems need separate circuits for heat pump and immersion. Check total demand scenarios.'
    },
    {
      q: 'Do I need DNO notification for heat pump installation?',
      a: 'Single-phase heat pumps under 16A generally don\'t need notification. Larger single-phase or three-phase installations should be notified under G98/G99, especially if they significantly increase property demand. Your installer should advise.'
    },
    {
      q: 'What is the BUS grant and how do I qualify?',
      a: 'The Boiler Upgrade Scheme (BUS) provides £7,500 towards ASHP or GSHP installation. Requirements: valid EPC, MCS-certified installer, property not new-build, replacing fossil fuel heating. The installer handles the application and grant is deducted from quoted price.'
    },
    {
      q: 'Can I connect a heat pump to an existing circuit?',
      a: 'Heat pumps need dedicated circuits - they cannot share with other loads. The circuit must be sized for the heat pump\'s rated current and run directly from the consumer unit with appropriate overcurrent and RCD protection.'
    },
    {
      q: 'What about hybrid heat pump systems?',
      a: 'Hybrid systems combine heat pump with gas boiler backup. The heat pump still needs full electrical supply as it handles the majority of heating. Electrical requirements are the same as standalone ASHP - the gas boiler is electrically independent.'
    }
  ]
}

export default function HeatPumpVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="heat pump voltage drop, ASHP cable size, air source heat pump electrical, GSHP installation, MCS heat pump, BUS grant electrical, BS 7671 heat pump" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/heat-pump-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/heat-pump-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
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
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Heat Pump', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Heat Pump Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '298' }
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-cyan-600 hover:text-cyan-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Thermometer className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-cyan-50 border-l-4 border-cyan-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-cyan-900 mb-3 flex items-center gap-2">
              <Thermometer className="w-5 h-5" />
              Heat Pump Quick Facts
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
                <h3 className="text-xl font-bold mb-1">Need an MCS Certified Heat Pump Installer?</h3>
                <p className="text-purple-100">Get quotes from accredited installers - BUS grant eligible</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Heat Pump Scenarios</h2>
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

          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-cyan-900 mb-3">Complete Your Renewable Energy Setup</h3>
            <p className="text-sm text-cyan-800 mb-4">
              Combining heat pump with <Link to="/calculators/voltage-drop/solar-pv" className="text-cyan-600 font-semibold hover:underline">solar PV</Link>? Great combination for reducing running costs. For <Link to="/calculators/voltage-drop/ev-charger" className="text-cyan-600 font-semibold hover:underline">EV charger</Link> installations alongside your heat pump, check your total property demand. Use our <Link to="/cable-sizing-calculator" className="text-cyan-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity checks.
            </p>
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-cyan-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-cyan-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Heat Pump Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for electrical installation only. Excludes heat pump unit and plumbing.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. BUS grant (£7,500) covers part of total installation cost.</p>
          </div>

          <div className="bg-teal-50 border-l-4 border-teal-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-teal-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-teal-800">{usecaseData.defined2.definition}</p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-green-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-green-800">{usecaseData.defined3.definition}</p>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-amber-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-amber-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-cyan-700">Size cables for heat pump current capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-teal-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-teal-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from MCS Certified Installers</h3>
              <p className="text-gray-700">
                Looking for a qualified heat pump installer? Tell us about your project and we'll connect you with MCS accredited contractors in your area. BUS grant eligible. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=HeatPumpVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Heat Pump Voltage Drop Inquiry Form"
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
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-cyan-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
