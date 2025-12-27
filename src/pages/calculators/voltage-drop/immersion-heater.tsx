import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Thermometer } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../../components/VoltageDropCalculatorCore'

const usecaseData = {
  slug: 'immersion-heater',
  title: 'Immersion Heater Voltage Drop Calculator',
  metaTitle: 'Immersion Heater Voltage Drop Calculator UK | Hot Water Circuit | BS 7671 | TradeCalcs',
  metaDescription: 'Free immersion heater voltage drop calculator for UK electricians. Calculate cable size for 3kW immersion heaters. BS 7671 compliant dedicated circuit sizing.',
  heroDescription: 'Calculate voltage drop for immersion heater dedicated circuits',
  
  defaults: {
    cableSize: '2.5',
    length: '15',
    current: '13',
    circuitType: 'power' as const,
    phase: 'single' as const
  },

  keyFacts: [
    'Standard 3kW immersion heater draws 13A at 230V',
    'Dedicated circuit required - typically 16A MCB with 2.5mm² cable',
    'Immersion heaters run for extended periods - voltage drop affects heating time',
    'Usually short cable runs from CU to airing cupboard or cylinder location',
    'Dual element immersions may have two circuits or switching arrangement'
  ],

  symptomChecks: [
    { symptom: 'Standard immersion (3kW) - short run (10m)', recommendation: '13A with 2.5mm² (18 mV/A/m). At 10m: (18 × 13 × 10) ÷ 1000 = 2.34V (1.02%) ✓' },
    { symptom: 'Immersion in loft (15m run)', recommendation: '13A with 2.5mm² at 15m: (18 × 13 × 15) ÷ 1000 = 3.51V (1.53%) ✓' },
    { symptom: 'Long run to utility room (25m)', recommendation: '13A with 2.5mm² at 25m: (18 × 13 × 25) ÷ 1000 = 5.85V (2.54%) ✓' },
    { symptom: 'Economy 7 with two elements', recommendation: 'If switching between elements (not both on), same calculation. If both on, 26A total - use 4mm² cable.' },
    { symptom: 'Immersion in outbuilding (35m)', recommendation: '13A with 4mm² (11 mV/A/m). At 35m: (11 × 13 × 35) ÷ 1000 = 5.01V (2.18%) ✓' }
  ],

  costEstimates: [
    { scenario: 'New immersion circuit (<10m)', material: '£60-120', labour: '£120-220', total: '£180-340' },
    { scenario: 'Immersion circuit (10-20m)', material: '£80-160', labour: '£150-280', total: '£230-440' },
    { scenario: 'Immersion + timer install', material: '£100-180', labour: '£180-320', total: '£280-500' },
    { scenario: 'Dual immersion wiring', material: '£120-220', labour: '£200-380', total: '£320-600' },
    { scenario: 'Immersion element replacement', material: '£30-80', labour: '£80-150', total: '£110-230' }
  ],

  defined: {
    term: 'Immersion Heater Electrical Requirements',
    definition: 'Standard UK immersion heaters are rated 3kW at 230V, drawing 13A. They require a dedicated radial circuit with 16A MCB protection (15A or 20A also acceptable). The circuit feeds a double-pole switch (usually with neon indicator) mounted near the cylinder, with flex from switch to immersion element. 2.5mm² cable is adequate for most domestic runs.'
  },

  defined2: {
    term: 'Voltage Drop Effect on Immersion Heaters',
    definition: 'Immersion heaters are resistive loads - power output is proportional to voltage squared. A 5% voltage drop reduces heating power by about 10%. While the water still heats eventually, it takes longer and wastes energy. Keeping voltage drop under 3% ensures efficient operation and minimises running costs.'
  },

  defined3: {
    term: 'Economy 7 and Dual Immersions',
    definition: 'Economy 7 systems use cheap overnight electricity to heat water. Some cylinders have two elements - bottom (large, for overnight) and top (boost, for daytime). These may share one circuit with a changeover switch, or have separate circuits. If both can operate simultaneously, the combined current (26A) needs larger cable.'
  },

  defined4: {
    term: 'Immersion Heater Switching',
    definition: 'The double-pole switch near the cylinder must be rated for the immersion load (usually 20A minimum). Timer controls can be added - either at the switch or in the consumer unit. Smart switches allow app control and integration with time-of-use tariffs. All switching must isolate both live and neutral.'
  },

  faqs: [
    {
      q: 'What cable size for a 3kW immersion heater?',
      a: '2.5mm² cable is adequate for most domestic runs up to about 30m. For longer runs or where voltage drop is marginal, use 4mm². The 16A MCB protects either size. Always calculate voltage drop for your specific cable length.'
    },
    {
      q: 'Why does my immersion need a dedicated circuit?',
      a: 'Immersion heaters draw significant current (13A) for extended periods - hours at a time. Sharing with other circuits risks overloading and wouldn\'t provide adequate protection. The dedicated circuit also allows safe isolation for maintenance.'
    },
    {
      q: 'Can I use a 13A plug for an immersion heater?',
      a: 'No - immersion heaters must be hardwired via a double-pole switch. Using a 13A plug for continuous high-load appliances risks overheating at the plug/socket interface. The dedicated circuit with DP switch is required by regulations.'
    },
    {
      q: 'What MCB rating for an immersion heater?',
      a: '16A is standard. 15A works but is less common. 20A provides more margin and is acceptable. The 3kW element draws 13A, so any of these ratings provides adequate overload protection while avoiding nuisance tripping.'
    },
    {
      q: 'How does voltage drop affect heating time?',
      a: 'Immersions are resistive - power = V²/R. A 5% voltage drop (230V → 218.5V) reduces power from 3000W to about 2700W. Your water still heats, but takes roughly 10% longer. Minimising voltage drop saves time and energy.'
    },
    {
      q: 'Should the immersion circuit have RCD protection?',
      a: 'Not specifically required as immersions are fixed equipment, but many modern consumer units have all circuits RCD-protected. Type AC or Type A RCDs are suitable. The DP switch provides local isolation for maintenance.'
    },
    {
      q: 'What about Economy 7 dual immersion wiring?',
      a: 'Two options: single circuit with changeover switch (only one element operates at a time), or two separate circuits allowing both elements. Check your cylinder - most domestic ones are designed for switched operation, not simultaneous running.'
    },
    {
      q: 'Can I add a timer to my immersion circuit?',
      a: 'Yes - either at the consumer unit (time clock in place of or alongside MCB) or at the switch position (immersion switch with built-in timer). Smart switches allow remote and scheduled control via apps.'
    },
    {
      q: 'Where should the DP switch be located?',
      a: 'Within 3m of the cylinder (ideally within sight) at accessible height - typically in or near the airing cupboard. The switch allows safe isolation for element replacement or cylinder maintenance without going to the consumer unit.'
    },
    {
      q: 'What flex from switch to immersion element?',
      a: 'Heat-resistant flex rated for the temperature - typically 3183Y or similar with 85°C or 105°C rating. Standard PVC flex is not suitable for the high ambient temperature near the cylinder top. Keep flex as short as practical.'
    },
    {
      q: 'Why is my immersion tripping the MCB?',
      a: 'Usually indicates element failure (earth fault) or water ingress into the element head. Less commonly, a starting surge on older thermostats. Test the element insulation resistance - if low, replace the element. Check the element seal isn\'t leaking.'
    },
    {
      q: 'Can I run the immersion from solar PV diverter?',
      a: 'Yes - solar diverters send excess PV generation to the immersion instead of exporting. The diverter controls power to the existing immersion circuit. This doesn\'t change the voltage drop calculation - the circuit still needs to handle full 3kW when solar isn\'t available.'
    }
  ]
}

export default function ImmersionHeaterVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="immersion heater voltage drop, immersion heater cable size, 3kW immersion circuit, hot water heater wiring, immersion heater dedicated circuit, economy 7 immersion, BS 7671 immersion" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/immersion-heater-voltage-drop-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/immersion-heater-voltage-drop-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#dc2626" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Immersion Heater', 'item': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Immersion Heater Voltage Drop Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/voltage-drop/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '456' }
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
          <Link to="/electrical-calculators" className="inline-flex items-center text-red-600 hover:text-red-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-12 px-4">
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
          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-red-900 mb-3 flex items-center gap-2">
              <Thermometer className="w-5 h-5" />
              Immersion Heater Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                  <CheckCircle2 className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
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

          <div className="bg-orange-100 border-2 border-orange-400 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-3">🔥 Voltage Drop Effect on Heating</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-orange-900">At 230V (no drop)</p>
                <p className="text-orange-800">Power = 230² ÷ 17.6Ω</p>
                <p className="text-orange-800 font-bold">= 3,006W (full rated)</p>
              </div>
              <div className="bg-white rounded p-3">
                <p className="font-semibold text-orange-900">At 218.5V (5% drop)</p>
                <p className="text-orange-800">Power = 218.5² ÷ 17.6Ω</p>
                <p className="text-orange-800 font-bold">= 2,711W (10% reduction)</p>
              </div>
            </div>
            <p className="text-xs text-orange-700 mt-3">Keep voltage drop low for efficient heating and shorter heat-up times.</p>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need Immersion Heater Work?</h3>
                <p className="text-purple-100">Get quotes from qualified domestic electricians</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Immersion Heater Scenarios</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-red-900 mb-3">Related Heating Calculations</h3>
            <p className="text-sm text-red-800 mb-4">
              For electric showers: <Link to="/calculators/voltage-drop/shower-circuit" className="text-red-600 font-semibold hover:underline">shower circuit</Link>. Heat pumps: <Link to="/calculators/voltage-drop/heat-pump" className="text-red-600 font-semibold hover:underline">heat pump</Link>. Electric underfloor heating: check our <Link to="/voltage-drop-calculator" className="text-red-600 font-semibold hover:underline">main voltage drop calculator</Link>. Use our <Link to="/cable-sizing-calculator" className="text-red-600 font-semibold hover:underline">cable sizing calculator</Link> for current capacity.
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-red-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-red-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Immersion Heater Electrical Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs for immersion heater electrical work.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-red-50 border-b">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Work Type</th>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Cylinder and element costs are additional to circuit work.</p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
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

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-yellow-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-yellow-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-red-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-red-700">Size cables for immersion circuits</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-orange-700">Full BS 7671 voltage drop for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for immersion heater wiring? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ImmersionHeaterVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Immersion Heater Voltage Drop Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-red-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, cable sizing, conduit fill and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
