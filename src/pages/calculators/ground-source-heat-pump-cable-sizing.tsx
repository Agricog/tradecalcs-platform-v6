import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, ThermometerSun } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'ground-source-heat-pump-cable-sizing',
  title: 'Ground Source Heat Pump Cable Sizing Calculator',
  metaTitle: 'Ground Source Heat Pump Cable Size Calculator UK | GSHP Electrical | BS 7671 | TradeCalcs',
  metaDescription: 'Free ground source heat pump cable sizing calculator for UK electricians. Calculate correct cable size for GSHP installations including compressor and circulation pumps. BS 7671 compliant.',
  heroDescription: 'Calculate the correct cable size for ground source heat pump installations and ground loop systems',
  
  defaults: {
    loadType: 'kw' as const,
    current: '',
    kW: '12',
    length: '15',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'GSHP typically 6-16kW for domestic, larger for commercial',
    'Three-phase common for units over 10-12kW',
    'Circulation pumps need separate or integrated supply',
    'Higher efficiency than ASHP (COP 4-5 typical)',
    'MCS certification required for RHI payments'
  ],

  symptomChecks: [
    { symptom: 'Small domestic GSHP (6-8kW)', recommendation: '32A single-phase circuit, 6mm² cable for typical runs' },
    { symptom: 'Medium domestic GSHP (10-12kW)', recommendation: '40-50A single-phase or three-phase, 10mm² cable typical' },
    { symptom: 'Large domestic GSHP (14-16kW)', recommendation: 'Three-phase supply recommended, 6mm² 3-phase SWA' },
    { symptom: 'Commercial GSHP (20kW+)', recommendation: 'Three-phase essential, size cable to specific unit rating' },
    { symptom: 'Ground loop circulation pump', recommendation: 'Often integrated, if separate typically 1-2A circuit' }
  ],

  costEstimates: [
    { scenario: 'GSHP electrical connection only', material: '£300-600', labour: '£400-700', total: '£700-1300' },
    { scenario: 'Consumer unit upgrade for GSHP', material: '£400-800', labour: '£500-900', total: '£900-1700' },
    { scenario: 'Three-phase supply upgrade', material: '£1500-3000', labour: '£500-1000', total: '£2000-4000' },
    { scenario: 'Full GSHP system (8kW, borehole)', material: '£12000-18000', labour: '£6000-10000', total: '£18000-28000' },
    { scenario: 'Full GSHP system (12kW, ground loop)', material: '£14000-22000', labour: '£8000-14000', total: '£22000-36000' }
  ],

  defined: {
    term: 'Ground Source Heat Pump Cable Sizing',
    definition: 'Ground source heat pump cable sizing calculates conductor sizes for GSHP compressor units and associated circulation pumps. GSHPs extract heat from the ground via boreholes or horizontal loops, achieving higher efficiencies than air source units. Electrical requirements depend on compressor size - typically 6-16kW for domestic installations requiring 32A-63A supplies.'
  },

  defined2: {
    term: 'GSHP vs ASHP Electrical Requirements',
    definition: 'Ground source heat pumps generally have lower peak electrical demand than equivalent air source units due to stable ground temperatures and higher COP. A GSHP producing 12kW heat output might draw 3kW electrical (COP 4), while an ASHP might draw 4kW for the same output. However, GSHPs often have additional circulation pump loads for the ground loop.'
  },

  faqs: [
    {
      q: 'What cable size for a ground source heat pump?',
      a: 'Depends on unit size and phase. A typical 8-10kW single-phase GSHP needs 6mm² or 10mm² cable on 32-45A circuit. Larger units (12kW+) often need three-phase - typically 4mm² or 6mm² 3-phase cable. Always check manufacturer specifications for exact requirements.'
    },
    {
      q: 'Do ground source heat pumps need three-phase?',
      a: 'Not always. Units up to about 10-12kW are often available in single-phase versions. Larger domestic and commercial units typically require three-phase. Three-phase GSHPs run more smoothly and efficiently. Check if three-phase is available at your property before specifying larger units.'
    },
    {
      q: 'What\'s the electrical difference between GSHP and ASHP?',
      a: 'GSHPs typically draw less power for the same heat output due to higher COP (4-5 vs 3-4 for ASHP). However, GSHPs have ground loop circulation pumps adding 100-300W. Overall electrical demand is usually lower, but you need to account for all components when sizing circuits.'
    },
    {
      q: 'Does the ground loop need electrical supply?',
      a: 'Yes - circulation pumps move heat transfer fluid through the ground loop. These are often integrated into the heat pump unit, but larger systems may have separate external pumps needing dedicated circuits. Typical circulation pump load is 100-300W.'
    },
    {
      q: 'What about borehole pump power requirements?',
      a: 'Closed-loop boreholes don\'t need pumps in the borehole - circulation pumps are at surface level. Open-loop systems (water source) may need submersible pumps in the borehole, typically 0.5-2kW depending on depth and flow rate. These need dedicated circuits.'
    },
    {
      q: 'Do I need a supply upgrade for GSHP?',
      a: 'Possibly. Add GSHP load to existing maximum demand - if total exceeds your supply capacity (typically 60-100A single-phase), you\'ll need an upgrade. GSHPs are often installed during renovations where supply upgrades are already planned. Three-phase may be needed for larger units.'
    },
    {
      q: 'What circuit protection for GSHP?',
      a: 'Type C MCB or RCBO for motor loads - handles compressor starting current. 30mA RCD protection required. Some manufacturers specify Type D MCBs for high inrush. Dedicated circuit from consumer unit - don\'t share with other high loads.'
    },
    {
      q: 'Can I run GSHP from solar PV?',
      a: 'Yes, GSHPs work well with solar PV for self-consumption. The GSHP electrical load can be timed to match solar generation. Battery storage helps extend usage into evening. Doesn\'t reduce cable sizing requirements but improves running costs significantly.'
    },
    {
      q: 'What MCS requirements affect electrical installation?',
      a: 'MCS certification is required for Boiler Upgrade Scheme grants. The electrical installation must be compliant and correctly certified. MCS installers will specify electrical requirements. Non-compliant installations may void warranties and grant eligibility.'
    },
    {
      q: 'How do I calculate GSHP running current?',
      a: 'Divide electrical input (not heat output) by voltage. A 10kW heat output GSHP with COP 4 has 2.5kW electrical input = 10.9A single-phase. Add 10-20% for starting and circulation pumps. Manufacturer data sheets give exact figures including maximum running current.'
    }
  ],

  defined3: {
    term: 'Coefficient of Performance (COP)',
    definition: 'COP measures heat pump efficiency - heat output divided by electrical input. GSHP typically achieves COP 4-5 (4-5kW heat per 1kW electricity). Higher COP means lower electrical demand for same heat output. Ground temperatures are stable year-round, giving GSHPs consistently high COP unlike ASHPs which drop in cold weather.'
  },

  defined4: {
    term: 'Ground Loop Types',
    definition: 'Horizontal loops need large garden area (typically 2-3× house footprint), buried 1-2m deep. Vertical boreholes (100-200m) suit smaller plots but cost more. Slinky coils are compact horizontal option. All need circulation pumps. Loop type affects installation cost but not significantly the electrical requirements of the heat pump itself.'
  }
}

export default function GroundSourceHeatPumpCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="ground source heat pump cable, GSHP electrical, geothermal heat pump wiring, borehole heat pump cable size, ground loop electrical, BS 7671 heat pump, MCS heat pump installation" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/gshp-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/gshp-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#059669" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Ground Source Heat Pump Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Ground Source Heat Pump Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '234' }
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
                'name': 'How to Size Cables for Ground Source Heat Pump Installation',
                'description': 'Step-by-step guide to calculating cable sizes for GSHP electrical installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Check heat pump specs', 'text': 'Get electrical input rating and phase requirements from manufacturer' },
                  { '@type': 'HowToStep', 'name': 'Identify all loads', 'text': 'Include compressor, circulation pumps, and controls' },
                  { '@type': 'HowToStep', 'name': 'Assess existing supply', 'text': 'Check if current supply can handle additional GSHP load' },
                  { '@type': 'HowToStep', 'name': 'Calculate cable size', 'text': 'Size cable for maximum running current plus starting allowance' },
                  { '@type': 'HowToStep', 'name': 'Select protection', 'text': 'Choose Type C or D MCB suitable for motor loads' }
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

        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <ThermometerSun className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
              <ThermometerSun className="w-5 h-5" />
              Ground Source Heat Pump Cable Quick Facts
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
                <p className="text-purple-100">Get quotes from contractors experienced in heat pump installations</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common GSHP Installations</h2>
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

          {/* Internal linking section */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-teal-900 mb-3">Related Heat Pump & Renewable Calculations</h3>
            <p className="text-sm text-teal-800 mb-4">
              Compare with our <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="text-teal-600 font-semibold hover:underline">air source heat pump calculator</Link> for different installation requirements. GSHPs pair excellently with <Link to="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="text-teal-600 font-semibold hover:underline">solar PV systems</Link> for reduced running costs. For supplementary heating, see <Link to="/calculators/cable-sizing/underfloor-heating-cable-sizing" className="text-teal-600 font-semibold hover:underline">underfloor heating</Link> which works efficiently with heat pump temperatures.
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-emerald-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-emerald-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">GSHP Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK costs. Electrical costs are small part of total GSHP installation.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. BUS grant of £7,500 available for eligible installations.</p>
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

          <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-emerald-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-emerald-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">Air Source Heat Pump</h3>
                <p className="text-sm text-green-700">Compare ASHP requirements</p>
              </Link>
              <Link to="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="block p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-yellow-900 mb-1">Solar PV & Battery</h3>
                <p className="text-sm text-yellow-700">Pair with solar generation</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Check cable run compliance</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Heat Pump Electricians</h3>
              <p className="text-gray-700">
                Looking for an electrician experienced in ground source heat pump installations? Tell us about your project and we'll connect you with vetted contractors. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=GroundSourceHeatPumpCableSizing" 
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

          <div className="bg-emerald-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-emerald-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
