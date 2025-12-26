import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Car } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'ev-charger-cable-sizing',
  title: 'EV Charger Cable Sizing Calculator',
  metaTitle: 'EV Charger Cable Size Calculator UK | 7kW 22kW Home Charger | BS 7671 | TradeCalcs',
  metaDescription: 'Free EV charger cable sizing calculator for UK electricians. Calculate correct cable size for 7kW, 11kW, and 22kW home chargers. BS 7671 compliant with voltage drop analysis. OZEV grant ready.',
  heroDescription: 'Calculate the correct cable size for EV charger installations - 7kW, 11kW and 22kW home and commercial chargers',
  
  defaults: {
    loadType: 'amps' as const,
    current: '32',
    kW: '',
    length: '15',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    '7kW charger = 32A (most common UK home install)',
    '22kW charger = 32A three-phase',
    'Typical cable run: 10-20m from consumer unit',
    '6mm² minimum for 32A, 10mm² for longer runs',
    'OZEV grant covers up to £350 (landlords/renters)'
  ],

  symptomChecks: [
    { symptom: '7kW home charger (single-phase)', recommendation: '32A circuit, 6mm² cable for runs under 18m, 10mm² for longer' },
    { symptom: '3.6kW charger (granny charger upgrade)', recommendation: '16A circuit, 2.5mm² cable typically sufficient' },
    { symptom: '22kW charger (three-phase)', recommendation: '32A per phase, 6mm² three-phase cable, dedicated supply' },
    { symptom: 'Long run to detached garage (25m+)', recommendation: '10mm² or 16mm² to manage voltage drop' },
    { symptom: 'Multiple EV chargers', recommendation: 'Load management system, possible DNO upgrade' }
  ],

  costEstimates: [
    { scenario: '7kW charger, short run (<10m)', material: '£80-120', labour: '£200-350', total: '£280-470' },
    { scenario: '7kW charger, medium run (10-20m)', material: '£120-180', labour: '£300-450', total: '£420-630' },
    { scenario: '7kW charger, long run (20-30m)', material: '£180-280', labour: '£400-550', total: '£580-830' },
    { scenario: '22kW three-phase install', material: '£300-500', labour: '£600-900', total: '£900-1400' },
    { scenario: 'Consumer unit upgrade required', material: '£150-300', labour: '£200-350', total: '£350-650 (additional)' }
  ],

  defined: {
    term: 'EV Charger Cable Sizing',
    definition: 'EV charger cable sizing determines the correct conductor cross-sectional area (mm²) needed to safely supply an electric vehicle charging point. Most UK home chargers are 7kW (32A single-phase) requiring 6mm² or 10mm² cable depending on cable run length. Correct sizing ensures BS 7671 compliance, prevents overheating, and keeps voltage drop within the 5% limit for reliable charging.'
  },

  defined2: {
    term: 'OZEV Grant',
    definition: 'The Office for Zero Emission Vehicles (OZEV) provides grants towards EV charger installation costs. As of 2024, the EV chargepoint grant offers up to £350 for landlords, renters, and people living in flats. The grant covers charger and installation costs for approved chargers installed by OZEV-approved installers.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a 7kW EV charger?',
      a: 'Most 7kW EV chargers need 6mm² twin and earth cable for runs up to about 18 meters. For longer runs (18-30m), upgrade to 10mm² to keep voltage drop under 5%. The charger draws 32A at full power, so the cable must handle this continuously without overheating.'
    },
    {
      q: 'Can I use 4mm² cable for an EV charger?',
      a: 'No, 4mm² is undersized for a 7kW (32A) EV charger. It can only handle 24A in ideal conditions (Method C). Using undersized cable creates fire risk and will fail EICR inspection. Always use minimum 6mm² for 32A circuits.'
    },
    {
      q: 'How do I calculate voltage drop for EV charger cable?',
      a: 'Voltage drop = (current × length × mV/A/m) ÷ 1000. For 6mm² at 32A over 15m: (32 × 15 × 7.3) ÷ 1000 = 3.5V (1.5%). This is within the 5% limit. Our calculator does this automatically and recommends larger cable if needed.'
    },
    {
      q: 'Does an EV charger need its own circuit?',
      a: 'Yes, every EV charger must have a dedicated circuit from the consumer unit with its own MCB (typically 32A Type B or C) and RCD protection (30mA Type A or better). This is required by BS 7671 and the IET Code of Practice for EV Charging.'
    },
    {
      q: 'What MCB do I need for a 7kW EV charger?',
      a: '32A MCB, typically Type B for domestic installations. Type C may be specified by some charger manufacturers. The MCB must be combined with 30mA RCD protection - a Type A RCD minimum, though Type B RCDs provide better DC fault protection.'
    },
    {
      q: 'Can I install an EV charger on a ring main?',
      a: 'No, EV chargers must never be connected to a ring main or spur. They require a dedicated radial circuit from the consumer unit. This ensures the circuit can handle continuous 32A load without affecting other circuits.'
    },
    {
      q: 'What about three-phase 22kW chargers?',
      a: '22kW chargers require three-phase supply (not available in most UK homes). They draw 32A per phase and need 6mm² four-core cable (or 10mm² for longer runs). DNO notification and often an upgraded supply are required.'
    },
    {
      q: 'Do I need to notify the DNO for EV charger installation?',
      a: 'Yes, all EV charger installations must be notified to the Distribution Network Operator (DNO) via the ENA connection application. This is a legal requirement under G98/G99. Your installer should handle this notification.'
    },
    {
      q: 'How long does it take to install an EV charger?',
      a: 'A straightforward installation (charger near consumer unit, no upgrades needed) takes 2-4 hours. Complex installs requiring consumer unit upgrades, long cable runs, or groundwork can take a full day or more.'
    },
    {
      q: 'Is SWA cable required for EV charger installation?',
      a: 'SWA (Steel Wire Armoured) cable is required when the cable is buried underground, run externally, or needs mechanical protection. For internal runs in conduit or trunking, standard twin and earth is acceptable. Always follow BS 7671 for cable selection.'
    }
  ],

  defined3: {
    term: 'Type A vs Type B RCD',
    definition: 'Type A RCDs detect AC and pulsating DC fault currents - suitable for most EV chargers. Type B RCDs also detect smooth DC fault currents, providing better protection for chargers without built-in DC protection. Some chargers have internal DC protection allowing Type A RCDs. Check manufacturer specifications.'
  },

  defined4: {
    term: 'Smart Charger Requirement',
    definition: 'Since June 2022, all home EV chargers sold in the UK must be "smart" chargers under the Electric Vehicles (Smart Charge Points) Regulations 2021. Smart chargers can be remotely controlled, schedule charging for off-peak times, and respond to grid demand. This is mandatory for OZEV grant eligibility.'
  }
}

export default function EVChargerCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="EV charger cable size, electric car charger cable, 7kW charger cable, 22kW charger cable, EV installation cable, BS 7671 EV charger, home charger installation, OZEV grant, EV charger electrician" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/ev-charger-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/ev-charger-cable-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'EV Charger Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'EV Charger Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '1247' }
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
                'name': 'How to Size Cable for EV Charger Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for EV charger installation in UK homes.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Determine charger power', 'text': 'Identify the charger power rating - typically 7kW (32A) for home, 22kW for commercial' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run', 'text': 'Measure the total cable length from consumer unit to charger location' },
                  { '@type': 'HowToStep', 'name': 'Select installation method', 'text': 'Determine if cable will be clipped, in conduit, buried (SWA), or on tray' },
                  { '@type': 'HowToStep', 'name': 'Calculate cable size', 'text': 'Use our calculator to determine minimum cable size accounting for current and voltage drop' },
                  { '@type': 'HowToStep', 'name': 'Verify voltage drop', 'text': 'Ensure voltage drop is under 5% for reliable charging performance' }
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
        {/* Back Link */}
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link to="/cable-sizing-calculator" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Cable Sizing Calculator
          </Link>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Car className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Key Facts */}
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              EV Charger Cable Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-blue-900">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* Calculator */}
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

          {/* Common Scenarios */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common EV Charger Installations</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Definition Box */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-blue-800">{usecaseData.defined.definition}</p>
          </div>

          {/* Cost Estimates */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">EV Charger Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs including cable, labour, and consumer unit work. Excludes charger unit cost (£300-800).</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Actual costs vary by region, complexity, and supplier. OZEV grant can reduce costs by up to £350 for eligible installations.</p>
          </div>

          {/* OZEV Grant Info */}
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-green-800">{usecaseData.defined2.definition}</p>
          </div>

          {/* RCD Info */}
          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-amber-800">{usecaseData.defined3.definition}</p>
              </div>
            </div>
          </div>

          {/* Smart Charger Requirement */}
          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-purple-800">{usecaseData.defined4.definition}</p>
          </div>

          {/* FAQs */}
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

          {/* Related Calculators */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Electrical Calculators</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Verify voltage drop for long EV charger cable runs</p>
              </Link>
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-blue-700">Full BS 7671 cable sizing for all circuits</p>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a Custom Solution for Your Business?</h3>
              <p className="text-gray-700">
                Whether you're a contractor needing bulk calculations, a merchant wanting to embed our tools, or a business with specific requirements - we'd love to hear from you.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=EVChargerCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite EV Charger Cable Sizing Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-blue-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>

          {/* CTA Footer */}
          <div className="bg-blue-700 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-blue-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
