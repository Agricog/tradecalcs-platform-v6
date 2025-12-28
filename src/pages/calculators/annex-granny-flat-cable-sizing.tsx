import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Home } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'annex-granny-flat-cable-sizing',
  title: 'Annex & Granny Flat Cable Sizing Calculator',
  metaTitle: 'Annex Granny Flat Cable Size Calculator UK | Submain | BS 7671 | TradeCalcs',
  metaDescription: 'Free annex and granny flat cable sizing calculator for UK electricians. Calculate submain cable size for self-contained annexes. BS 7671 compliant with consumer unit guidance.',
  heroDescription: 'Calculate the correct submain cable size for annexes, granny flats, and self-contained accommodation',
  
  defaults: {
    loadType: 'amps' as const,
    current: '63',
    kW: '',
    length: '20',
    method: 'D',
    lighting: false
  },

  keyFacts: [
    'Typical annex submain: 63A-100A depending on facilities',
    'SWA cable required for buried runs between buildings',
    'Annex needs its own consumer unit with RCD protection',
    'Consider electric heating, cooking, and future EV charging',
    'Part P notification required for new consumer unit installation'
  ],

  symptomChecks: [
    { symptom: 'Basic annex (lighting, sockets, small appliances)', recommendation: '63A submain, 16mm² SWA for runs up to 25m' },
    { symptom: 'Annex with electric shower + cooking', recommendation: '63A-80A submain, 25mm² SWA for typical runs' },
    { symptom: 'Full annex with electric heating', recommendation: '80A-100A submain, 25mm² or 35mm² SWA' },
    { symptom: 'Annex above garage (short run)', recommendation: '63A submain, may use smaller cable for very short runs' },
    { symptom: 'Annex with future EV charger provision', recommendation: 'Size for additional 32A - consider 100A submain minimum' }
  ],

  costEstimates: [
    { scenario: 'Basic annex submain (<15m)', material: '£400-700', labour: '£500-800', total: '£900-1500' },
    { scenario: 'Standard annex submain (15-25m)', material: '£600-1000', labour: '£600-900', total: '£1200-1900' },
    { scenario: 'Long run annex submain (25m+)', material: '£800-1400', labour: '£700-1100', total: '£1500-2500' },
    { scenario: 'Annex consumer unit (6-10 way)', material: '£200-400', labour: '£300-500', total: '£500-900' },
    { scenario: 'Complete annex electrical fit-out', material: '£1500-3000', labour: '£2000-4000', total: '£3500-7000' }
  ],

  defined: {
    term: 'Annex Submain Cable Sizing',
    definition: 'A submain cable supplies a distribution board (consumer unit) in a separate building from the main supply. For annexes, this means running SWA cable from the house consumer unit to a new consumer unit in the annex. The submain must be sized for the maximum demand of all circuits in the annex, with allowance for diversity and future additions.'
  },

  defined2: {
    term: 'Maximum Demand Calculation',
    definition: 'Maximum demand estimates the peak electrical load an annex will draw simultaneously. It accounts for diversity - not all appliances run at once. Typical annex calculation: 100% of largest load (usually shower or heating) + 40% of remaining loads. A well-equipped annex might have 15-20kW connected load but 8-12kW maximum demand.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a granny flat?',
      a: 'Most granny flats need 63A-100A submains. For a basic annex (lights, sockets, small appliances) up to 25m away, 16mm² SWA on 63A is often sufficient. With electric shower, cooking, and heating, 25mm² SWA on 80A-100A is more appropriate. Always calculate maximum demand and voltage drop.'
    },
    {
      q: 'Does a granny annex need its own consumer unit?',
      a: 'Yes, self-contained annexes need their own consumer unit with RCD protection. This provides local isolation, proper circuit protection, and complies with BS 7671. The consumer unit is fed by a submain from the main house supply.'
    },
    {
      q: 'What size submain for an annex with electric heating?',
      a: 'Electric heating significantly increases demand. Storage heaters might add 6-12kW, panel heaters 3-6kW. Combined with shower (9kW), cooker (10kW), and general load, you may need 80A-100A submain. Calculate your specific loads - 25mm² or 35mm² SWA is typical.'
    },
    {
      q: 'Can I run the annex from the house consumer unit?',
      a: 'The submain originates from the house consumer unit (via a main switch or RCBO), but the annex must have its own consumer unit. You cannot simply extend house circuits to the annex. The annex consumer unit provides local protection and isolation.'
    },
    {
      q: 'Do I need separate metering for a granny flat?',
      a: 'Not required for family use, but recommended for rental annexes. Separate metering requires DNO involvement and potentially a new supply. Sub-metering (without DNO) can track usage for billing. Check legal requirements if renting out.'
    },
    {
      q: 'What about earthing for a separate building?',
      a: 'The annex earthing connects back to the main house earth via the SWA armour and a separate earth conductor. PME earthing arrangements have specific requirements for outbuildings. Your electrician must verify earthing is suitable - additional earth electrodes may be needed.'
    },
    {
      q: 'How do I calculate maximum demand for an annex?',
      a: 'List all fixed loads: shower (9kW), cooker (10kW), heating (6kW), water heater (3kW), plus socket allowance (2-3kW). Apply diversity: 100% largest load + 40% of others. Example: 9kW + 40%(10+6+3+3) = 9 + 8.8 = 17.8kW = 77A. Size submain accordingly.'
    },
    {
      q: 'Is Part P notification required for annex electrics?',
      a: 'Yes, installing a new consumer unit and circuits in an annex is notifiable under Part P. This applies whether the annex is new-build or conversion. Work must be done by a registered competent person or inspected by Building Control.'
    },
    {
      q: 'Should I allow capacity for EV charging?',
      a: 'Yes, future-proofing for a 7kW (32A) EV charger is wise. This adds significant load - if your calculated demand is 60A, adding 32A EV = 92A, suggesting 100A submain. It\'s much cheaper to install larger cable now than upgrade later.'
    },
    {
      q: 'What burial depth for SWA cable to an annex?',
      a: 'Minimum 450mm under gardens/grass, 600mm under driveways or areas with vehicular access. Use sand surround and cable warning tape. Avoid routes near other services. Document the cable route for future reference.'
    }
  ],

  defined3: {
    term: 'Diversity in Annex Calculations',
    definition: 'Diversity recognises that not all annex appliances run simultaneously at full load. BS 7671 and IET guidance provide diversity allowances: 100% for largest appliance, reducing percentages for others. Without diversity, a typical annex might calculate at 40kW+ but actual maximum demand is usually 15-25kW.'
  },

  defined4: {
    term: 'PME Earthing Considerations',
    definition: 'Properties with PME (Protective Multiple Earthing) have specific requirements for supplies to outbuildings. If the submain exceeds certain lengths or the annex has extraneous metalwork, additional earth electrodes may be required. Your electrician must assess PME implications for annex installations.'
  }
}

export default function AnnexGrannyFlatCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="annex cable size, granny flat electrical, submain cable calculator, self-contained annex, granny annexe electrics, BS 7671 submain, annex consumer unit, outbuilding electrical supply" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/annex-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/annex-cable-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Annex Granny Flat Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Annex Granny Flat Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '523' }
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
                'name': 'How to Size Submain Cable for Annex Installation',
                'description': 'Step-by-step guide to calculating the correct submain cable size for annex and granny flat electrical supply.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'List all loads', 'text': 'Identify all electrical loads in the annex - heating, shower, cooker, sockets' },
                  { '@type': 'HowToStep', 'name': 'Calculate maximum demand', 'text': 'Apply diversity factors to estimate peak simultaneous load' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run', 'text': 'Measure total distance from house consumer unit to annex' },
                  { '@type': 'HowToStep', 'name': 'Size submain cable', 'text': 'Use calculator to determine SWA cable size with voltage drop check' },
                  { '@type': 'HowToStep', 'name': 'Plan consumer unit', 'text': 'Specify annex consumer unit size and circuit requirements' }
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

        <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Home className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-violet-50 border-l-4 border-violet-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-violet-900 mb-3 flex items-center gap-2">
              <Home className="w-5 h-5" />
              Annex Cable Quick Facts
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
                <h3 className="text-xl font-bold mb-1">Need a Qualified Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted, local contractors for your annex installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Annex Installations</h2>
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
            <h3 className="font-bold text-purple-900 mb-3">Related Outbuilding & Submain Calculations</h3>
            <p className="text-sm text-purple-800 mb-4">
              Annexes share similar requirements with <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="text-purple-600 font-semibold hover:underline">garden offices</Link> and <Link to="/calculators/cable-sizing/garage-workshop-cable-sizing" className="text-purple-600 font-semibold hover:underline">garage workshops</Link>. If your annex includes electric heating, see our <Link to="/calculators/cable-sizing/electric-storage-heater-cable-sizing" className="text-purple-600 font-semibold hover:underline">storage heater guide</Link>. Planning EV charging? Check our <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="text-purple-600 font-semibold hover:underline">EV charger calculator</Link> to factor into your submain sizing.
            </p>
          </div>

          <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-violet-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-violet-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Annex Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs including submain, consumer unit, and circuits.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Costs vary by annex size, cable run, and specification.</p>
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

          <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-indigo-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-indigo-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">Garden Office</h3>
                <p className="text-sm text-green-700">Similar outbuilding requirements</p>
              </Link>
              <Link to="/calculators/cable-sizing/electric-storage-heater-cable-sizing" className="block p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Storage Heaters</h3>
                <p className="text-sm text-orange-700">Electric heating for annexes</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Essential for long submain runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your annex installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=AnnexGrannyFlatCableSizing" 
                width="100%" 
                height="650px" 
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
