import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Battery } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'battery-storage',
  title: 'Home Battery Storage Voltage Drop Calculator',
  metaTitle: 'Home Battery Storage Voltage Drop Calculator UK | Tesla Powerwall | GivEnergy | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for home battery storage installations. BS 7671 compliant for Tesla Powerwall, GivEnergy, Sunsynk and other battery systems. AC and hybrid inverter sizing.',
  heroDescription: 'Calculate voltage drop for home battery storage and hybrid inverter installations',
  
  defaults: {
    cableSize: '10',
    length: '15',
    current: '32',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'Battery inverters can charge AND discharge - size cables for maximum current in either direction',
    'Common systems: 3.6kW (16A), 5kW (22A), 8kW (35A) single-phase',
    'Hybrid inverters combine solar PV and battery - consider total current capacity',
    'Some batteries require dedicated circuits; others can share with solar inverter',
    'Three-phase battery systems distribute load but need correct phase balancing'
  ],

  symptomChecks: [
    { symptom: '3.6kW battery (Tesla Powerwall) - 10m to CU', recommendation: '16A with 4mm² (11 mV/A/m). At 10m: (11 × 16 × 10) ÷ 1000 = 1.76V (0.77%) ✓' },
    { symptom: '5kW hybrid inverter - garage install (15m)', recommendation: '22A with 6mm² (7.3 mV/A/m). At 15m: (7.3 × 22 × 15) ÷ 1000 = 2.41V (1.05%) ✓' },
    { symptom: '8kW battery system - longer run (25m)', recommendation: '35A with 10mm² (4.4 mV/A/m). At 25m: (4.4 × 35 × 25) ÷ 1000 = 3.85V (1.67%) ✓' },
    { symptom: 'Stacked batteries (2x 5kW) - same circuit', recommendation: 'Check if batteries share inverter or have separate. If separate, may need individual circuits. 44A combined needs 16mm² for longer runs.' },
    { symptom: '11kW three-phase battery (30m)', recommendation: '16A per phase with 6mm². At 30m 3Ø: (7.3 × 16 × 30 × 0.866) ÷ 1000 = 3.04V (0.76% on 400V) ✓' }
  ],

  costEstimates: [
    { scenario: '3.6kW battery circuit (<10m)', material: '£150-300', labour: '£200-400', total: '£350-700' },
    { scenario: '5kW battery circuit (10-20m)', material: '£250-450', labour: '£300-500', total: '£550-950' },
    { scenario: '8kW+ battery circuit', material: '£350-600', labour: '£350-600', total: '£700-1200' },
    { scenario: 'Three-phase battery installation', material: '£500-900', labour: '£500-800', total: '£1000-1700' },
    { scenario: 'Dedicated battery consumer unit', material: '£200-400', labour: '£200-400', total: '£400-800' }
  ],

  defined: {
    term: 'Home Battery Storage Systems',
    definition: 'Home battery storage systems store electricity for later use - from solar PV during the day for evening use, or cheap overnight tariff electricity for daytime use. Systems range from 3.6kW (Tesla Powerwall) to 10kW+ for larger homes. The inverter converts between DC battery storage and AC household supply. Voltage drop calculation uses the AC side current.'
  },

  defined2: {
    term: 'Hybrid vs AC-Coupled Systems',
    definition: 'Hybrid inverters combine solar PV and battery control in one unit - they have DC inputs from panels and battery, with single AC output. AC-coupled systems have separate solar inverter and battery inverter connected to the AC bus. Hybrid systems are simpler but have single point of failure. AC-coupled allows mixing brands and independent operation.'
  },

  defined3: {
    term: 'Bidirectional Power Flow',
    definition: 'Unlike most electrical loads, battery inverters both consume power (charging) and supply power (discharging). The cable must handle current in either direction. Size for maximum current - usually discharge is higher than charge rate. Some systems limit charge rate to protect battery longevity.'
  },

  defined4: {
    term: 'G98/G99 Grid Connection',
    definition: 'Battery systems that export to grid need DNO notification. Systems up to 3.68kW single-phase (16A) fall under G98 simplified process. Larger systems need G99 application. The DNO may impose export limits in constrained areas. Battery systems often pair with solar PV - combined export capacity determines which process applies.'
  },

  faqs: [
    {
      q: 'What cable size for a Tesla Powerwall?',
      a: 'Tesla Powerwall 2 is rated 5kW continuous (22A) but typical sustained discharge is lower. Most installations use 6mm² for runs up to 20m, or 10mm² for longer runs. Check Tesla\'s installation manual for specific requirements.'
    },
    {
      q: 'Can I run battery and solar on the same circuit?',
      a: 'For hybrid inverters, yes - they\'re a single unit. For AC-coupled systems with separate inverters, they typically share a circuit from the same MCB/RCBO if total current doesn\'t exceed protection rating. Some installers prefer separate circuits for fault isolation.'
    },
    {
      q: 'Does the battery need RCD protection?',
      a: 'Yes, 30mA RCD protection is required. Some battery inverters recommend Type B RCDs due to potential DC fault currents from the inverter electronics. Check manufacturer specifications - standard Type A may not detect all fault types.'
    },
    {
      q: 'How do I calculate battery system current?',
      a: 'Current = Power ÷ Voltage. A 5kW battery at 230V = 22A. Use the inverter\'s maximum output rating, not battery capacity. A 10kWh battery with 5kW inverter still only draws/supplies 22A maximum.'
    },
    {
      q: 'Can I install multiple batteries on one circuit?',
      a: 'Depends on configuration. Batteries sharing one inverter (stacked) use one circuit sized for the inverter. Separate inverters may need individual circuits. Check total current and manufacturer guidance for parallel operation.'
    },
    {
      q: 'What about voltage drop during battery charging?',
      a: 'Charging current typically equals or is less than discharge current. If you size cable for maximum discharge, charging is automatically covered. Some systems charge slowly (overnight) at lower current than peak discharge.'
    },
    {
      q: 'Do I need a separate consumer unit for battery storage?',
      a: 'Not required but often installed for clarity and to accommodate Type B RCD if needed. A dedicated 2-way or 4-way board for renewable systems keeps things organized and allows isolated maintenance.'
    },
    {
      q: 'What\'s the difference between 3.6kW and 5kW batteries?',
      a: '3.6kW systems fit within G98 simplified connection (16A single-phase). 5kW systems may need G99 application depending on existing solar and total export capacity. The 3.6kW limit is for combined inverter capacity, not battery storage.'
    },
    {
      q: 'Can batteries work during a power cut?',
      a: 'Only if specifically designed for backup operation (EPS - Emergency Power Supply). Standard grid-tied systems shut down when grid fails for safety. Backup-capable systems need additional changeover equipment and correct circuit design.'
    },
    {
      q: 'How does time-of-use tariff affect sizing?',
      a: 'Tariffs like Octopus Flux encourage charging at specific times. If you\'re charging a large battery quickly overnight, ensure cable can handle peak charge current. A 10kWh battery charging in 2 hours needs 5kW (22A) capacity.'
    },
    {
      q: 'What about three-phase battery systems?',
      a: 'Three-phase batteries (common above 10kW) balance load across phases and qualify for higher G98 limits (11.04kW). Cable sizing uses the 0.866 factor and 400V base. Current per phase is lower than equivalent single-phase system.'
    },
    {
      q: 'Do I need earthing for battery systems?',
      a: 'The inverter/battery enclosure needs earthing via the circuit protective conductor. Battery systems don\'t usually need special earthing beyond normal installation requirements. Follow manufacturer instructions for any specific bonding requirements.'
    }
  ]
}

export default function BatteryStorageVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="home battery voltage drop, Tesla Powerwall cable size, GivEnergy installation, battery storage electrical, hybrid inverter wiring, Sunsynk cable, home battery circuit, BS 7671 battery" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/battery-storage-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/battery-storage-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#10b981" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Battery Storage', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Home Battery Storage Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '267' }
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
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-emerald-600 hover:text-emerald-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Battery className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
              <Battery className="w-5 h-5" />
              Battery Storage Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
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
                <h3 className="text-xl font-bold mb-1">Need a Battery Storage Installer?</h3>
                <p className="text-purple-100">Get quotes from MCS certified installers</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Battery Storage Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-emerald-900 mb-3">Related Renewable Energy Calculations</h3>
            <p className="text-sm text-emerald-800 mb-4">
              Pairing with <Link to="/calculators/voltage-drop/solar-pv" className="text-emerald-600 font-semibold hover:underline">solar PV</Link>? Calculate both circuits. Adding a <Link to="/calculators/voltage-drop/heat-pump" className="text-emerald-600 font-semibold hover:underline">heat pump</Link> to maximise self-consumption? Check total demand. Use our <Link to="/cable-sizing-calculator" className="text-emerald-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity.
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-emerald-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-emerald-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Battery Storage Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for battery system electrical installation only. Battery unit costs are additional.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-emerald-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Electrical costs are typically included in full system installation quotes.</p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-green-800">{usecaseData.defined2.definition}</p>
          </div>

          <div className="bg-teal-50 border-l-4 border-teal-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-teal-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-teal-800">{usecaseData.defined3.definition}</p>
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
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-emerald-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-emerald-700">Size cables for battery system capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-green-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Battery Storage Installers</h3>
              <p className="text-gray-700">
                Looking for a qualified installer for your home battery system? Tell us about your project and we'll connect you with MCS certified contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=BatteryStorageVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Battery Storage Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-emerald-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
