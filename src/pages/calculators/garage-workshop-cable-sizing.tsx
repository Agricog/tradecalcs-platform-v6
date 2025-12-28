import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Wrench } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'garage-workshop-cable-sizing',
  title: 'Garage & Workshop Cable Sizing Calculator',
  metaTitle: 'Garage Workshop Cable Size Calculator UK | Power Tools Welder | BS 7671 | TradeCalcs',
  metaDescription: 'Free garage and workshop cable sizing calculator for UK electricians. Calculate correct cable size for power tools, welders, compressors and workshop equipment. BS 7671 compliant.',
  heroDescription: 'Calculate the correct cable size for garage and workshop electrical supplies',
  
  defaults: {
    loadType: 'amps' as const,
    current: '32',
    kW: '',
    length: '15',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'Typical garage supply: 32A radial or 40A for heavy equipment',
    'Welders and compressors have high inrush current - consider Type C MCB',
    'SWA cable required for buried runs to detached garages',
    'Consider future needs - size for expansion',
    'RCD protection mandatory for garage/workshop circuits'
  ],

  symptomChecks: [
    { symptom: 'Basic garage - lighting + sockets only', recommendation: '20A or 32A circuit, 4mm² cable for typical runs' },
    { symptom: 'Home workshop - power tools', recommendation: '32A circuit, 6mm² SWA for detached, consider dedicated circuits' },
    { symptom: 'MIG/TIG welder (13A-32A)', recommendation: 'Dedicated 32A circuit minimum, check welder specifications' },
    { symptom: 'Large compressor (3-5HP)', recommendation: 'Dedicated 32A circuit, Type C MCB for motor inrush' },
    { symptom: 'Professional workshop - multiple machines', recommendation: 'Submain to garage consumer unit, 63A-100A supply' }
  ],

  costEstimates: [
    { scenario: 'Attached garage supply (<10m)', material: '£80-150', labour: '£150-280', total: '£230-430' },
    { scenario: 'Detached garage, short run (<15m)', material: '£200-350', labour: '£250-400', total: '£450-750' },
    { scenario: 'Detached garage, medium run (15-30m)', material: '£350-550', labour: '£350-500', total: '£700-1050' },
    { scenario: 'Workshop with mini consumer unit', material: '£250-400', labour: '£300-450', total: '£550-850' },
    { scenario: 'Three-phase workshop supply', material: '£600-1200', labour: '£500-900', total: '£1100-2100' }
  ],

  defined: {
    term: 'Garage & Workshop Cable Sizing',
    definition: 'Garage and workshop cable sizing determines the conductor cross-sectional area (mm²) needed to safely supply power tools, welders, compressors and other equipment. Key factors include total connected load, motor inrush currents, cable run length (especially for detached buildings), and future expansion needs.'
  },

  defined2: {
    term: 'Motor Inrush Current',
    definition: 'Motors in power tools, compressors and welders draw 5-8 times their running current when starting. This inrush can trip Type B MCBs. Type C or Type D MCBs have higher trip thresholds to handle motor starting currents while still providing protection. Check equipment specifications for MCB requirements.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a detached garage?',
      a: 'For a typical detached garage with sockets and lighting, 6mm² SWA on a 32A circuit handles most needs. Long runs (20m+) may need 10mm² to keep voltage drop acceptable. Consider future additions like EV charging when sizing.'
    },
    {
      q: 'Can I run a welder from a standard socket?',
      a: 'Small 13A welders can use standard sockets, but most MIG/TIG welders need 16A-32A supplies. Check your welder\'s specifications. Larger welders need dedicated circuits to prevent voltage drop affecting weld quality and tripping shared circuits.'
    },
    {
      q: 'What MCB type for workshop equipment?',
      a: 'Type C MCBs are recommended for workshops with motors (compressors, lathes, saws). They handle inrush currents up to 10x rated current without tripping. Type B MCBs (5x) may nuisance trip on motor starts.'
    },
    {
      q: 'Do I need a consumer unit in my garage?',
      a: 'For simple supplies (one circuit), a fused connection from the house is acceptable. For workshops with multiple circuits or heavy equipment, a garage consumer unit provides better protection, easier fault finding, and room for expansion.'
    },
    {
      q: 'What about three-phase for workshops?',
      a: 'Three-phase is beneficial for large motors (5HP+), commercial welders, or multiple high-power machines. It requires DNO application and 5-core SWA cable. Many domestic properties don\'t have three-phase available without significant upgrade cost.'
    },
    {
      q: 'How do I size cable for multiple machines?',
      a: 'Calculate total connected load but apply diversity - not all machines run simultaneously. Typical diversity: 100% largest load + 50% of remainder. A workshop with 3kW welder + 2kW compressor + 1kW tools = 3kW + 1.5kW = 4.5kW design load.'
    },
    {
      q: 'Is RCD protection required for garages?',
      a: 'Yes, 30mA RCD protection is required for all garage and workshop circuits under BS 7671. This can be at the house consumer unit or in a local garage unit. Consider time-delayed RCDs if using RCDs at both ends.'
    },
    {
      q: 'Can I add EV charging to my garage supply?',
      a: 'EV chargers typically need dedicated 32A circuits. If your garage already has a 32A supply, adding EV charging may overload it. Consider upgrading to a larger submain that can feed both workshop circuits and EV charger.'
    },
    {
      q: 'What burial depth for garage SWA cable?',
      a: 'Minimum 450mm under garden/grass, 600mm under driveways. Use sand bedding and warning tape. Avoid running near other services. Mark the cable route for future reference.'
    },
    {
      q: 'Do I need Part P notification for garage electrics?',
      a: 'Yes, new circuits to garages and outbuildings are notifiable under Part P. This includes new supplies, consumer unit installations, and significant alterations. Work must be done by a registered competent person or inspected by Building Control.'
    }
  ],

  defined3: {
    term: 'Garage Consumer Unit',
    definition: 'A garage consumer unit (often called a garage unit) provides local protection and isolation for workshop circuits. Typically includes main switch, RCD protection, and MCBs for individual circuits (sockets, lighting, dedicated equipment). Allows expansion without returning to the house for every addition.'
  },

  defined4: {
    term: 'Submain vs Final Circuit',
    definition: 'A final circuit supplies equipment directly (e.g., 32A socket circuit). A submain supplies a distribution board (consumer unit). For workshops needing multiple circuits, a submain to a garage consumer unit is more practical than running multiple final circuits from the house.'
  }
}

export default function GarageWorkshopCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="garage cable size, workshop electrical, welder cable calculator, compressor cable size, SWA garage, BS 7671 garage, workshop electrician, power tools electrical" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/garage-workshop-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/garage-workshop-cable-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Garage Workshop Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Garage Workshop Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '723' }
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
                'name': 'How to Size Cable for Garage Workshop Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for garage and workshop electrical supply.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'List equipment', 'text': 'Identify all equipment and their power requirements' },
                  { '@type': 'HowToStep', 'name': 'Calculate total load', 'text': 'Add up loads with appropriate diversity factor' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run', 'text': 'Measure total cable length from house to garage' },
                  { '@type': 'HowToStep', 'name': 'Size cable', 'text': 'Use our calculator to determine minimum cable size' },
                  { '@type': 'HowToStep', 'name': 'Plan distribution', 'text': 'Decide if garage consumer unit is needed' }
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

        <div className="bg-gradient-to-r from-slate-700 to-zinc-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Wrench className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-slate-50 border-l-4 border-slate-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Garage & Workshop Cable Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
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
                <p className="text-purple-100">Get quotes from vetted, local contractors for your garage/workshop installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Garage & Workshop Installations</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-700 font-bold text-sm">{i + 1}</span>
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
            <h3 className="font-bold text-green-900 mb-3">Related Outbuilding & Vehicle Charging</h3>
            <p className="text-sm text-green-800 mb-4">
              Many garage installations include <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="text-green-600 font-semibold hover:underline">EV charger circuits</Link> - plan capacity for both workshop and charging needs. For garden offices and studios, see our dedicated <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="text-green-600 font-semibold hover:underline">garden office cable calculator</Link>. Some workshops add <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="text-green-600 font-semibold hover:underline">air source heat pumps</Link> for heating.
            </p>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-zinc-50 border border-slate-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-slate-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Garage & Workshop Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs including cable, groundwork for detached buildings, and labour.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Three-phase costs vary significantly by DNO and location.</p>
          </div>

          <div className="bg-zinc-50 border-l-4 border-zinc-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-zinc-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-zinc-800">{usecaseData.defined2.definition}</p>
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
              <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">EV Charger</h3>
                <p className="text-sm text-green-700">Add charging to your garage</p>
              </Link>
              <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="block p-4 bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-teal-900 mb-1">Garden Office</h3>
                <p className="text-sm text-teal-700">Other outbuilding supplies</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-blue-700">Check long runs to detached garages</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your garage/workshop installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=GarageWorkshopCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Garage Workshop Cable Sizing Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
  <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
</p>
            </div>
          </div>

          <div className="bg-slate-700 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-slate-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
