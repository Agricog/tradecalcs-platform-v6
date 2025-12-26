import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Battery } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'battery-storage-cable-sizing',
  title: 'Battery Storage Cable Sizing Calculator',
  metaTitle: 'Battery Storage Cable Size Calculator UK | Home Battery | BS 7671 | TradeCalcs',
  metaDescription: 'Free battery storage cable sizing calculator for UK electricians. Calculate correct cable size for home battery systems, retrofit installations, and standalone storage. BS 7671 compliant.',
  heroDescription: 'Calculate the correct cable size for home battery storage systems and retrofit installations',
  
  defaults: {
    loadType: 'kw' as const,
    current: '',
    kW: '5',
    length: '8',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'Typical home batteries 3.6-13.5kWh capacity',
    'Inverter rating determines cable size (3-5kW typical)',
    'AC-coupled systems connect to existing consumer unit',
    'DC-coupled integrates with solar inverter',
    'G98/G99 notification required for grid-connected systems'
  ],

  symptomChecks: [
    { symptom: 'Small battery system (3.6kW inverter)', recommendation: '16A circuit, 2.5mm² cable sufficient for short runs' },
    { symptom: 'Medium battery system (5kW inverter)', recommendation: '25-32A circuit, 4mm² or 6mm² cable typical' },
    { symptom: 'Large battery system (8kW+ inverter)', recommendation: '40A+ circuit, 6mm² or 10mm² cable depending on length' },
    { symptom: 'Retrofit to existing solar PV', recommendation: 'AC-coupled system, dedicated circuit from consumer unit' },
    { symptom: 'Standalone battery (no solar)', recommendation: 'Grid charging only, standard AC circuit to battery inverter' }
  ],

  costEstimates: [
    { scenario: 'Battery electrical connection only', material: '£150-300', labour: '£200-400', total: '£350-700' },
    { scenario: 'Consumer unit modification', material: '£100-250', labour: '£150-300', total: '£250-550' },
    { scenario: 'Battery system 5kWh (supply + install)', material: '£2500-4000', labour: '£500-1000', total: '£3000-5000' },
    { scenario: 'Battery system 10kWh (supply + install)', material: '£4500-7000', labour: '£600-1200', total: '£5100-8200' },
    { scenario: 'Battery retrofit to existing solar', material: '£3000-5500', labour: '£500-1000', total: '£3500-6500' }
  ],

  defined: {
    term: 'Battery Storage Cable Sizing',
    definition: 'Battery storage cable sizing calculates conductor sizes for home battery inverter connections. The inverter rating (kW) determines current draw, not battery capacity (kWh). A 5kW inverter draws about 22A, requiring appropriately sized cable and circuit protection. AC-coupled systems need dedicated circuits; DC-coupled share solar inverter connection.'
  },

  defined2: {
    term: 'AC-Coupled vs DC-Coupled Systems',
    definition: 'AC-coupled batteries have their own inverter and connect to the AC consumer unit - ideal for retrofit to existing solar. DC-coupled batteries connect on the DC side of the solar inverter - more efficient but requires compatible inverter. AC-coupled needs separate electrical circuit; DC-coupled shares solar circuit but may need DC cable upgrades.'
  },

  faqs: [
    {
      q: 'What cable size for a home battery?',
      a: 'Depends on inverter power rating, not battery capacity. A typical 5kW inverter needs 4mm² or 6mm² cable on a 25-32A circuit. Smaller 3.6kW systems can use 2.5mm² on 16-20A. Calculate from inverter maximum AC output current - manufacturers provide this figure.'
    },
    {
      q: 'Can I add battery to existing solar PV?',
      a: 'Yes - AC-coupled batteries are designed for retrofit. They have their own inverter and connect to your consumer unit independently from the solar. You need a spare way in the consumer unit and appropriate cable run to the battery location. No changes to existing solar wiring needed.'
    },
    {
      q: 'Does battery storage need its own circuit?',
      a: 'Yes, battery inverters need dedicated circuits - they can both import and export significant power. Don\'t share with other loads. The circuit breaker size matches the inverter rating. Some installations use RCBOs for combined protection.'
    },
    {
      q: 'What about DC cables for battery systems?',
      a: 'DC-coupled systems have DC cables between battery and hybrid inverter - these are typically specified by the inverter manufacturer and included with the system. AC-coupled systems don\'t need DC cables externally. DC cable sizing is part of the system design, not a separate calculation.'
    },
    {
      q: 'Do I need G98/G99 for battery storage?',
      a: 'Yes, grid-connected batteries need DNO notification. G98 (simple notification) covers systems up to 16A per phase - most domestic batteries qualify. Larger systems need G99 application and may require DNO approval before connection. Your installer handles this.'
    },
    {
      q: 'Can I install battery without solar?',
      a: 'Yes - standalone batteries charge from the grid at cheap rate times (overnight) and discharge during peak rates. Same electrical requirements as solar-paired systems. Makes financial sense with time-of-use tariffs like Octopus Go, Intelligent Octopus, or Economy 7.'
    },
    {
      q: 'Where should the battery be located?',
      a: 'Most home batteries are wall-mounted in garages, utility rooms, or externally. Consider: cable route to consumer unit, ventilation requirements, temperature range, and accessibility. Shorter cable runs reduce cost and losses. Some batteries are indoor-only, others rated for outdoor.'
    },
    {
      q: 'What protection does battery circuit need?',
      a: 'MCB or RCBO sized to inverter rating (typically 20-40A Type B). RCD protection required as for any circuit. Some batteries have internal protection and isolation. Consumer unit must have capacity for additional way - may need upgrade if full.'
    },
    {
      q: 'Can battery provide backup power in outages?',
      a: 'Some systems offer backup capability, but many don\'t - the inverter shuts down when grid fails (anti-islanding). Backup-capable systems need additional wiring to protected circuits. This is a system feature, not just electrical installation - specify at purchase if required.'
    },
    {
      q: 'How do I calculate battery inverter current?',
      a: 'Inverter AC current = Power (W) ÷ Voltage (V). A 5000W inverter = 5000 ÷ 230 = 21.7A. Add 10% margin = 24A, so 25A or 32A circuit. Three-phase inverters divide power across phases. Manufacturer datasheets give exact maximum current figures.'
    }
  ],

  defined3: {
    term: 'Battery Capacity vs Inverter Power',
    definition: 'Battery capacity (kWh) indicates energy storage - how long it can supply power. Inverter power (kW) indicates maximum charge/discharge rate. A 10kWh battery with 5kW inverter can discharge for 2 hours at full power, or longer at lower power. Cable sizing uses inverter kW, not battery kWh.'
  },

  defined4: {
    term: 'Grid Connection Requirements',
    definition: 'All grid-connected battery systems must comply with G98/G99 engineering recommendations. This ensures safe disconnection during grid faults (anti-islanding) and limits export. DNO must be notified before connection. Systems over 16A per phase need application rather than simple notification. Non-compliance is illegal and dangerous.'
  }
}

export default function BatteryStorageCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="battery storage cable size, home battery electrical, tesla powerwall cable, solar battery wiring, retrofit battery storage, AC coupled battery, BS 7671 battery storage, G98 G99 battery" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/battery-storage-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/battery-storage-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#7c3aed" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Battery Storage Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Battery Storage Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '412' }
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
                'name': 'How to Size Cables for Battery Storage Installation',
                'description': 'Step-by-step guide to calculating cable sizes for home battery storage electrical installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Check inverter rating', 'text': 'Get maximum AC power output from battery inverter specifications' },
                  { '@type': 'HowToStep', 'name': 'Calculate current', 'text': 'Divide power by 230V to get maximum current draw' },
                  { '@type': 'HowToStep', 'name': 'Plan cable route', 'text': 'Measure distance from consumer unit to battery location' },
                  { '@type': 'HowToStep', 'name': 'Size cable and protection', 'text': 'Select cable size and MCB rating for calculated current' },
                  { '@type': 'HowToStep', 'name': 'Notify DNO', 'text': 'Submit G98 notification before connecting to grid' }
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

        <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Battery className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-violet-50 border-l-4 border-violet-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-violet-900 mb-3 flex items-center gap-2">
              <Battery className="w-5 h-5" />
              Battery Storage Cable Quick Facts
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
                <h3 className="text-xl font-bold mb-1">Need a Battery Storage Installer?</h3>
                <p className="text-purple-100">Get quotes from qualified contractors for your battery installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Battery Storage Installations</h2>
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

          {/* Internal linking section */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-3">Related Solar & Renewable Calculations</h3>
            <p className="text-sm text-purple-800 mb-4">
              Battery storage pairs with <Link to="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="text-purple-600 font-semibold hover:underline">solar PV systems</Link> for maximum benefit. Consider adding an <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="text-purple-600 font-semibold hover:underline">EV charger</Link> to use stored energy for transport. For whole-home energy efficiency, see our <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="text-purple-600 font-semibold hover:underline">heat pump calculator</Link>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-violet-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-violet-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Battery Storage Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for home battery storage systems including installation.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Battery prices continue to fall - check current market rates.</p>
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

          <div className="bg-violet-50 border-l-4 border-violet-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-violet-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-violet-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="block p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-yellow-900 mb-1">Solar PV & Battery</h3>
                <p className="text-sm text-yellow-700">Combined solar + storage</p>
              </Link>
              <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">EV Charger</h3>
                <p className="text-sm text-green-700">Use stored energy for EV</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Check inverter cable runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Battery Installers</h3>
              <p className="text-gray-700">
                Looking for a qualified installer for your home battery system? Tell us about your project and we'll connect you with vetted contractors. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=BatteryStorageCableSizing" 
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

          <div className="bg-violet-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-violet-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
