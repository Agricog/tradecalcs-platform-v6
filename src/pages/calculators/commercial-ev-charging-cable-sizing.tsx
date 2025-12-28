import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Car } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'commercial-ev-charging-cable-sizing',
  title: 'Commercial EV Charging Cable Sizing Calculator',
  metaTitle: 'Commercial EV Charging Cable Size Calculator UK | Workplace Charging | BS 7671 | TradeCalcs',
  metaDescription: 'Free commercial EV charging cable sizing calculator for UK electricians. Calculate correct cable size for workplace chargers, car parks, and fleet depots. BS 7671 compliant with load management.',
  heroDescription: 'Calculate the correct cable size for workplace EV chargers, car parks, and fleet charging installations',
  
  defaults: {
    loadType: 'amps' as const,
    current: '32',
    kW: '',
    length: '30',
    method: 'D',
    lighting: false
  },

  keyFacts: [
    'Workplace chargers typically 7kW-22kW per point',
    'Rapid chargers (50kW+) need dedicated HV or large LV supply',
    'Load management essential for multiple charger installations',
    'Three-phase common for commercial installations',
    'Building Regulations require EV charging provision in new builds'
  ],

  symptomChecks: [
    { symptom: 'Small workplace (2-4 chargers, 7kW)', recommendation: 'Existing supply may suffice, 32A per charger, load management' },
    { symptom: 'Medium car park (5-10 chargers)', recommendation: 'Likely supply upgrade, three-phase distribution, smart load management' },
    { symptom: 'Large car park (10+ chargers)', recommendation: 'Dedicated EV distribution board, dynamic load management, possible DNO upgrade' },
    { symptom: 'Fleet depot (overnight charging)', recommendation: 'Can use lower power (3.6-7kW) with longer charge times, schedule optimization' },
    { symptom: 'Rapid charger (50kW+)', recommendation: 'Dedicated supply, often requires DNO upgrade or new connection' }
  ],

  costEstimates: [
    { scenario: 'Single 7kW workplace charger', material: '£600-1000', labour: '£400-700', total: '£1000-1700' },
    { scenario: 'Single 22kW workplace charger', material: '£1200-2000', labour: '£600-1000', total: '£1800-3000' },
    { scenario: 'Car park installation (4 × 7kW)', material: '£3500-6000', labour: '£2500-4000', total: '£6000-10000' },
    { scenario: 'Load management system', material: '£500-1500', labour: '£300-600', total: '£800-2100' },
    { scenario: 'Supply upgrade for EV charging', material: '£2000-5000', labour: '£1000-2500', total: '£3000-7500' }
  ],

  defined: {
    term: 'Commercial EV Charging Cable Sizing',
    definition: 'Commercial EV charging cable sizing calculates conductor sizes for workplace and car park charger installations. Unlike domestic single-charger installs, commercial sites need multiple chargers with load management. Total site demand can reach 100s of kW, requiring careful supply assessment and often three-phase distribution with smart power sharing.'
  },

  defined2: {
    term: 'Load Management for EV Charging',
    definition: 'Load management (smart charging) shares available power across multiple chargers, preventing supply overload. Static load management sets fixed power per charger. Dynamic load management adjusts in real-time based on building demand and charger usage. Essential for sites where charger count exceeds supply capacity.'
  },

  faqs: [
    {
      q: 'What cable size for commercial EV chargers?',
      a: 'Depends on charger power and whether load-managed. 7kW charger: 6mm² on 32A. 22kW charger: 6mm² three-phase on 32A per phase. With load management, cable can be sized to managed maximum rather than charger rating. Distribution boards need to handle total possible load.'
    },
    {
      q: 'How many EV chargers can my building support?',
      a: 'Calculate existing maximum demand, subtract from supply capacity. Remaining capacity ÷ charger power = maximum chargers without management. With load management, you can install more chargers sharing the available power. Typical office might support 4-8 chargers on 100A three-phase supply.'
    },
    {
      q: 'Do I need load management for workplace charging?',
      a: 'Recommended for 3+ chargers, essential for larger installations. Without it, simultaneous charging can exceed supply and trip main breakers. Load management shares power intelligently - cars charge slower but everyone gets charged. Often required by DNO for connection approval.'
    },
    {
      q: 'What\'s the difference between 7kW and 22kW chargers?',
      a: '7kW (single-phase, 32A) adds ~25 miles range per hour. 22kW (three-phase, 32A per phase) adds ~75 miles per hour. Most workplace parking suits 7kW - staff park all day. 22kW better for visitors or short-stay parking. Many EVs can\'t accept 22kW anyway.'
    },
    {
      q: 'Do I need DNO approval for commercial EV chargers?',
      a: 'Likely yes. Single 7kW chargers may fall under G98 notification. Multiple chargers or higher power usually need G99 application. DNO assesses network capacity - may require reinforcement at your cost. Start the application early - can take months.'
    },
    {
      q: 'What about rapid chargers (50kW+)?',
      a: 'Rapid chargers need substantial power - 50kW = 72A three-phase, 150kW = 217A three-phase. Often need dedicated supply connection or HV supply. Not practical for most workplaces. Typical for service stations, public hubs, and fleet depots with quick turnaround.'
    },
    {
      q: 'What regulations apply to commercial EV charging?',
      a: 'BS 7671 Wiring Regulations, Building Regulations Part S (EV charging in new buildings), IET Code of Practice for EV Charging, G98/G99 for grid connection, Workplace (Health, Safety and Welfare) Regulations for installation location. Listed buildings may have planning restrictions.'
    },
    {
      q: 'Can I use existing car park lighting circuits?',
      a: 'No - EV chargers need dedicated circuits. Car park lighting circuits aren\'t rated for continuous EV charging loads. You can share distribution infrastructure (containment, routes) but circuits must be separate. May need new feeder cables to car park distribution point.'
    },
    {
      q: 'What about payment systems and network connectivity?',
      a: 'Commercial chargers usually need network connection for payment, monitoring, and load management. Consider: mobile signal (SIM-based), WiFi, or Ethernet. Back-office systems handle billing. Budget for ongoing software/service subscriptions beyond hardware costs.'
    },
    {
      q: 'How do Building Regulations Part S affect new buildings?',
      a: 'New non-residential buildings with 10+ parking spaces must have at least one charger and cable routes to 20% of spaces. Major renovations trigger similar requirements. Must be at least 7kW capable. This affects electrical design from early planning stage.'
    }
  ],

  defined3: {
    term: 'Workplace Charging Scheme (WCS)',
    definition: 'The Workplace Charging Scheme offers vouchers of up to £350 per socket (max 40 sockets) towards purchase and installation of workplace EV chargers. Businesses, charities, and public sector organisations qualify. Covers chargers from 7kW. Must use OZEV-approved installer. Check current scheme status and requirements before quoting.'
  },

  defined4: {
    term: 'EV Charging Modes',
    definition: 'Mode 2: Portable charger to standard socket (emergency use, not for commercial). Mode 3: Dedicated EV charger with Type 2 connector - standard for UK AC charging, 7-22kW. Mode 4: DC rapid charging with CHAdeMO or CCS connector - 50kW+. Commercial installations are Mode 3 or Mode 4. Mode 3 is most common for workplace charging.'
  }
}

export default function CommercialEVChargingCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="commercial EV charging cable, workplace charger electrical, car park EV charging, fleet depot charging, load management EV, BS 7671 EV charging, Part S EV charging, workplace charging scheme" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/commercial-ev-charging-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/commercial-ev-charging-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#0d9488" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Commercial EV Charging Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Commercial EV Charging Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '378' }
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
                'name': 'How to Size Cables for Commercial EV Charging Installation',
                'description': 'Step-by-step guide to calculating cable sizes for workplace and commercial EV charging installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Assess existing supply', 'text': 'Calculate available capacity on current electrical supply' },
                  { '@type': 'HowToStep', 'name': 'Determine charger requirements', 'text': 'Specify number and power rating of chargers needed' },
                  { '@type': 'HowToStep', 'name': 'Design load management', 'text': 'Plan static or dynamic load management strategy' },
                  { '@type': 'HowToStep', 'name': 'Size distribution and cables', 'text': 'Calculate feeder and final circuit cable sizes' },
                  { '@type': 'HowToStep', 'name': 'Apply for DNO connection', 'text': 'Submit G99 application if required for installation' }
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

        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Car className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-teal-50 border-l-4 border-teal-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-teal-900 mb-3 flex items-center gap-2">
              <Car className="w-5 h-5" />
              Commercial EV Charging Cable Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-teal-900">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
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
                <h3 className="text-xl font-bold mb-1">Need a Commercial EV Installer?</h3>
                <p className="text-purple-100">Get quotes from contractors experienced in workplace charging installations</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Commercial EV Installations</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-700 font-bold text-sm">{i + 1}</span>
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
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-cyan-900 mb-3">Related EV & Commercial Calculations</h3>
            <p className="text-sm text-cyan-800 mb-4">
              For domestic installations, see our <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="text-cyan-600 font-semibold hover:underline">home EV charger calculator</Link>. Caravan sites and holiday parks have similar multi-charger requirements - check our <Link to="/calculators/cable-sizing/caravan-marina-hookup-cable-sizing" className="text-cyan-600 font-semibold hover:underline">hookup guide</Link>. Pair commercial EV charging with <Link to="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="text-cyan-600 font-semibold hover:underline">solar PV</Link> for reduced energy costs.
            </p>
          </div>

          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-teal-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-teal-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Commercial EV Charging Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs. Excludes DNO upgrade costs which vary significantly.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-teal-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. WCS grant may offset up to £350 per socket (check current eligibility).</p>
          </div>

          <div className="bg-cyan-50 border-l-4 border-cyan-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-cyan-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-cyan-800">{usecaseData.defined2.definition}</p>
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

          <div className="bg-teal-50 border-l-4 border-teal-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-teal-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-teal-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">Home EV Charger</h3>
                <p className="text-sm text-green-700">Domestic installations</p>
              </Link>
              <Link to="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="block p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-yellow-900 mb-1">Solar PV & Battery</h3>
                <p className="text-sm text-yellow-700">On-site generation</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Check long car park runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Commercial EV Installers</h3>
              <p className="text-gray-700">
                Looking for a qualified contractor for your workplace charging installation? Tell us about your project and we'll connect you with vetted specialists. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=CommercialEVChargingCableSizing" 
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

          <div className="bg-teal-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-teal-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
