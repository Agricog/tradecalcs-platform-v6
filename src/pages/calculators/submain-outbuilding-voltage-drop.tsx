import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Home } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'submain-outbuilding',
  title: 'Submain Voltage Drop Calculator for Outbuildings',
  metaTitle: 'Submain Voltage Drop Calculator UK | Garden Office, Garage, Workshop | BS 7671 | TradeCalcs',
  metaDescription: 'Free voltage drop calculator for submains to outbuildings. Check BS 7671 compliance for garden offices, garages, workshops using official Table 4D1B mV/A/m values.',
  heroDescription: 'Check voltage drop compliance for submain cables to garden offices, garages, workshops, and outbuildings',
  
  defaults: {
    cableSize: '10',
    length: '25',
    current: '32',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'Submains must comply with 5% voltage drop limit from origin to furthest point',
    'Combined voltage drop (submain + final circuit) must stay under 5%',
    'Typical submain sizes: 10mm² (4.4 mV/A/m), 16mm² (2.8 mV/A/m), 25mm² (1.75 mV/A/m)',
    '32A or 40A supply covers most outbuilding needs',
    'Voltage drop often determines cable size, not current capacity'
  ],

  symptomChecks: [
    { symptom: 'Garden office (20-30m from house)', recommendation: '32A submain with 10mm² SWA. At 25m: (4.4 × 32 × 25) ÷ 1000 = 3.52V (1.53%) ✓' },
    { symptom: 'Detached garage/workshop (30-40m)', recommendation: '32A or 40A with 10mm² or 16mm². 40A at 35m with 16mm²: 3.92V (1.70%) ✓' },
    { symptom: 'Granny annexe/self-contained unit', recommendation: '63A submain with 16mm² or 25mm² SWA. 63A at 30m with 25mm²: 3.31V (1.44%) ✓' },
    { symptom: 'Shed with lighting and sockets', recommendation: '16A or 20A radial with 4mm² or 6mm² SWA. 16A at 20m with 4mm²: 3.52V (1.53%) ✓' },
    { symptom: 'Agricultural building (100m+)', recommendation: 'Consider three-phase or 25mm²+. 63A at 100m with 25mm²: 11.03V (4.79%) - just compliant' }
  ],

  costEstimates: [
    { scenario: 'Short run submain (<15m)', material: '£180-300', labour: '£250-350', total: '£430-650' },
    { scenario: 'Medium run (15-30m) 10mm² SWA', material: '£300-500', labour: '£350-500', total: '£650-1000' },
    { scenario: 'Long run (30-50m) 16mm² SWA', material: '£500-800', labour: '£450-600', total: '£950-1400' },
    { scenario: 'Very long run (50m+) 25mm² SWA', material: '£700-1200', labour: '£500-750', total: '£1200-1950' },
    { scenario: 'Consumer unit in outbuilding', material: '£150-350', labour: '£200-350', total: '£350-700' }
  ],

  defined: {
    term: 'Submain Voltage Drop',
    definition: 'Submain voltage drop is the reduction in voltage along the cable feeding an outbuilding from your main consumer unit. BS 7671 limits total voltage drop to 5% for power circuits (11.5V on 230V supply). This includes both the submain AND any final circuits in the outbuilding. Long cable runs require larger conductors to keep voltage drop within limits.'
  },

  defined2: {
    term: 'Why Submain Voltage Drop Matters',
    definition: 'Excessive voltage drop causes equipment problems: motors run hot and inefficient, lights dim noticeably, and sensitive electronics may malfunction. For outbuildings with power tools, EV chargers, or workshop equipment, adequate voltage is essential. Voltage drop compounds - if your submain uses 3% of the allowance, final circuits only have 2% remaining.'
  },

  faqs: [
    {
      q: 'What is the maximum voltage drop allowed for a submain to an outbuilding?',
      a: 'BS 7671 allows 5% total voltage drop from the origin (meter) to the furthest point. This must include the submain AND final circuits in the outbuilding. Many electricians allocate 3% to the submain, leaving 2% for final circuits.'
    },
    {
      q: 'What cable size do I need for a 30m submain to a garden office?',
      a: 'For a typical 32A supply over 30m, 10mm² SWA (4.4 mV/A/m) gives: (4.4 × 32 × 30) ÷ 1000 = 4.22V (1.84%) - well within limits. For 40A or longer runs, 16mm² may be needed.'
    },
    {
      q: 'Does voltage drop matter more than current capacity for submains?',
      a: 'Often yes. A 10mm² cable can carry 64A but over very long runs may still need upsizing for voltage drop. At 32A over 50m with 10mm² = 7.04V (3.06%), leaving less headroom for final circuits.'
    },
    {
      q: 'How do I calculate combined voltage drop for submain plus final circuits?',
      a: 'Add the voltage drops as percentages. If your submain drops 2% and the ring final in the outbuilding drops 1.5%, total is 3.5% - well within the 5% limit.'
    },
    {
      q: 'Should I use SWA or armoured cable for outbuilding submains?',
      a: 'SWA (Steel Wire Armoured) cable is standard for buried or external submains. It provides mechanical protection and the armour can serve as the CPC.'
    },
    {
      q: 'What size consumer unit do I need in an outbuilding?',
      a: 'Depends on circuits required. A garden office might need 4-6 ways (lighting, sockets, heating). A workshop might need 8+ ways for power tools. Always allow spare ways.'
    },
    {
      q: 'Do I need RCD protection for outbuilding circuits?',
      a: 'Yes. BS 7671 requires RCD protection for circuits in locations with increased risk - outbuildings qualify. A Type A 30mA RCD is minimum.'
    },
    {
      q: 'Can I run a submain overhead instead of buried?',
      a: 'Yes, but it requires proper overhead cable, adequate height clearance (minimum 3.5m over driveways, 5.2m over roads), and weather-resistant connections.'
    },
    {
      q: 'What depth should I bury SWA cable to an outbuilding?',
      a: 'Minimum 450mm under grass/garden, 600mm under driveways. Use warning tape 150mm above the cable. Route along boundaries where possible.'
    },
    {
      q: 'Do I need Part P notification for an outbuilding electrical supply?',
      a: 'Yes. New circuits in outbuildings are notifiable work under Part P Building Regulations. A registered electrician can self-certify the work.'
    }
  ],

  defined3: {
    term: 'Voltage Drop Allocation Strategy',
    definition: 'Best practice allocates voltage drop between submain and final circuits. A common approach: 3% for submain, 2% for final circuits. This ensures the total stays under 5%. For lighting circuits in outbuildings, remember lighting has a stricter 3% limit - plan submain voltage drop accordingly.'
  }
}

export default function SubmainOutbuildingVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="submain voltage drop calculator, outbuilding electrical supply, garden office electrics, garage power supply, SWA cable calculator, BS 7671 submain, workshop electrical" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/submain-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/submain-voltage-drop-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Submain to Outbuilding', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Submain Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
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
              <Home className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-cyan-50 border-l-4 border-cyan-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-cyan-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Submain Voltage Drop Quick Facts
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
                <h3 className="text-xl font-bold mb-1">Need a Qualified Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted, local contractors for your outbuilding installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Submain Installations</h2>
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
            <h3 className="font-bold text-cyan-900 mb-3">Complete Your Outbuilding Setup</h3>
            <p className="text-sm text-cyan-800 mb-4">
              Planning an <Link to="/calculators/voltage-drop/ev-charger" className="text-cyan-600 font-semibold hover:underline">EV charger in your garage</Link>? Check voltage drop for the charging circuit too. For garden offices with extensive lighting, use our <Link to="/calculators/voltage-drop/garden-lighting" className="text-cyan-600 font-semibold hover:underline">garden lighting calculator</Link> with the stricter 3% limit. Need to size the cable? Try our <Link to="/cable-sizing-calculator" className="text-cyan-600 font-semibold hover:underline">cable sizing calculator</Link>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-cyan-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-cyan-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Submain Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs including SWA cable, consumer unit, and labour.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Actual costs vary by region and ground conditions for cable burial.</p>
          </div>

          <div className="bg-teal-50 border-l-4 border-teal-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-teal-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-teal-800">{usecaseData.defined2.definition}</p>
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
                <p className="text-sm text-cyan-700">Size SWA cables for current capacity</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-teal-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-teal-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your outbuilding installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=SubmainOutbuildingVoltageDrop" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Submain Voltage Drop Inquiry Form"
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
