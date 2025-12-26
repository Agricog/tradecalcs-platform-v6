import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Wind } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'air-source-heat-pump-cable-sizing',
  title: 'Air Source Heat Pump Cable Sizing Calculator',
  metaTitle: 'Air Source Heat Pump Cable Size Calculator UK | ASHP | Boiler Upgrade Scheme | BS 7671 | TradeCalcs',
  metaDescription: 'Free air source heat pump cable sizing calculator for UK electricians. Calculate correct cable size for ASHP installations. MCS compliant for Boiler Upgrade Scheme grants.',
  heroDescription: 'Calculate the correct cable size for air source heat pump (ASHP) installations',
  
  defaults: {
    loadType: 'amps' as const,
    current: '16',
    kW: '',
    length: '12',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'Most domestic ASHPs need 16A-32A single-phase supply',
    'Typical cable size: 4mm² or 6mm² depending on run length',
    '£7,500 Boiler Upgrade Scheme grant available (MCS required)',
    'Outdoor unit typically within 15m of consumer unit',
    'Three-phase may be needed for larger 12kW+ systems'
  ],

  symptomChecks: [
    { symptom: '5-8kW ASHP (small home)', recommendation: '16A MCB, 2.5mm² or 4mm² cable for runs under 15m' },
    { symptom: '8-12kW ASHP (average home)', recommendation: '20A or 32A MCB, 4mm² or 6mm² cable' },
    { symptom: '12-16kW ASHP (large home)', recommendation: 'May need 3-phase supply, consult manufacturer specs' },
    { symptom: 'Long cable run to outdoor unit (20m+)', recommendation: 'Check voltage drop - likely need 6mm² minimum' },
    { symptom: 'ASHP with integrated hot water cylinder', recommendation: 'Check total electrical load - may need larger circuit' }
  ],

  costEstimates: [
    { scenario: 'ASHP electrical connection, short run (<10m)', material: '£80-150', labour: '£150-280', total: '£230-430' },
    { scenario: 'ASHP electrical connection, medium run (10-20m)', material: '£150-280', labour: '£200-350', total: '£350-630' },
    { scenario: 'ASHP electrical connection, long run (20m+)', material: '£250-400', labour: '£280-450', total: '£530-850' },
    { scenario: 'Consumer unit upgrade for ASHP', material: '£150-300', labour: '£200-350', total: '£350-650' },
    { scenario: 'Three-phase supply upgrade', material: '£500-1500', labour: '£800-2000', total: '£1300-3500' }
  ],

  defined: {
    term: 'Air Source Heat Pump Cable Sizing',
    definition: 'ASHP cable sizing determines the conductor cross-sectional area (mm²) needed to safely supply an air source heat pump. Most domestic ASHPs draw 8-25A depending on size and model. The outdoor unit location and cable run length are critical factors - longer runs need larger cables to maintain voltage within acceptable limits for compressor operation.'
  },

  defined2: {
    term: 'Boiler Upgrade Scheme (BUS)',
    definition: 'The Boiler Upgrade Scheme provides £7,500 grants towards air source heat pump installation in England and Wales. To qualify, the property must have an EPC, and the heat pump must be installed by an MCS-certified installer. The grant is deducted from the installation cost - no upfront payment required from homeowners.'
  },

  faqs: [
    {
      q: 'What cable size do I need for an air source heat pump?',
      a: 'Most domestic ASHPs (5-12kW) need 4mm² or 6mm² cable on a 16A-32A circuit. The exact size depends on the heat pump\'s electrical rating and cable run length. Always check manufacturer specifications and calculate voltage drop for your installation.'
    },
    {
      q: 'What MCB rating for an air source heat pump?',
      a: 'MCB rating depends on the heat pump\'s maximum current draw. Typical ratings: 5-8kW units = 16A or 20A, 8-12kW units = 20A or 32A. Type C MCBs are often required due to compressor inrush current. Check manufacturer documentation for specific requirements.'
    },
    {
      q: 'Do air source heat pumps need RCD protection?',
      a: 'Yes, 30mA RCD protection is required under BS 7671 for circuits supplying outdoor equipment. Type A RCD is minimum, but some manufacturers specify Type B for heat pumps with DC components. Check the installation manual for RCD requirements.'
    },
    {
      q: 'Why do some heat pumps need Type C MCBs?',
      a: 'Heat pump compressors have significant inrush current when starting - up to 6-10 times running current. Type C MCBs have higher trip thresholds than Type B, preventing nuisance tripping during compressor starts while still providing protection.'
    },
    {
      q: 'Can I connect a heat pump to an existing circuit?',
      a: 'No, heat pumps must have a dedicated circuit from the consumer unit. They cannot share circuits with other loads. The circuit must be protected by appropriate MCB and RCD, with an isolator switch near the outdoor unit.'
    },
    {
      q: 'What is the Boiler Upgrade Scheme grant?',
      a: 'The BUS provides £7,500 towards ASHP installation in England and Wales. Requirements: MCS-certified installer, property must have valid EPC, replacing fossil fuel heating. The installer claims the grant - you pay the reduced price. Funding runs until 2028.'
    },
    {
      q: 'Do I need three-phase for a heat pump?',
      a: 'Most domestic heat pumps up to 12kW work on single-phase supply. Larger units (12kW+) may require three-phase. Check if your property has three-phase available - if not, DNO application and significant cost for upgrade. Many manufacturers offer single-phase options to avoid this.'
    },
    {
      q: 'How far can the outdoor unit be from the consumer unit?',
      a: 'Typically 10-20m is ideal. Longer runs increase voltage drop and cable cost. Very long runs (30m+) may need 10mm² cable. Also consider refrigerant pipe length limits between outdoor and indoor units (usually 20-30m maximum).'
    },
    {
      q: 'What isolator switch is needed for heat pumps?',
      a: 'A rotary isolator switch must be installed adjacent to the outdoor unit for safe maintenance. This should be IP65 rated minimum for outdoor exposure. The switch allows isolation without returning to the consumer unit.'
    },
    {
      q: 'Is MCS certification required for heat pump installations?',
      a: 'MCS certification is required to claim the Boiler Upgrade Scheme grant. Even without the grant, MCS ensures quality installation, valid warranty, and compliance with manufacturer requirements. MCS installations also qualify for reduced VAT (0%) on the system.'
    }
  ],

  defined3: {
    term: 'ASHP Electrical Requirements',
    definition: 'Air source heat pumps have specific electrical requirements beyond simple cable sizing. These include: inrush current capacity (Type C MCB often needed), voltage stability (±10% tolerance typically), dedicated circuit with appropriate RCD, and local isolator switch. Some units have specific requirements for earth impedance.'
  },

  defined4: {
    term: 'Heat Pump COP and Electrical Load',
    definition: 'Coefficient of Performance (COP) indicates heat pump efficiency - a COP of 3 means 3kW heat output per 1kW electrical input. This means a 12kW heat output system may only draw 4kW electrically at design conditions. However, COP varies with outdoor temperature, and backup heating may increase electrical load.'
  }
}

export default function AirSourceHeatPumpCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="air source heat pump cable size, ASHP cable calculator, heat pump electrical, Boiler Upgrade Scheme, MCS heat pump, BS 7671 ASHP, heat pump electrician, renewable heating" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/heat-pump-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/heat-pump-cable-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Air Source Heat Pump Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Air Source Heat Pump Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '892' }
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
                'name': 'How to Size Cable for Air Source Heat Pump Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for ASHP installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Check heat pump electrical rating', 'text': 'Find the maximum current draw from manufacturer specifications' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run to outdoor unit', 'text': 'Measure total cable length from consumer unit to heat pump location' },
                  { '@type': 'HowToStep', 'name': 'Calculate cable size', 'text': 'Use our calculator to determine minimum cable size with voltage drop check' },
                  { '@type': 'HowToStep', 'name': 'Check MCB requirements', 'text': 'Verify if Type B or Type C MCB is required for inrush current' },
                  { '@type': 'HowToStep', 'name': 'Plan isolator and RCD', 'text': 'Include outdoor isolator switch and appropriate RCD protection' }
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
              <Wind className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* BUS Grant highlight */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-green-500 text-white rounded-full px-4 py-1 font-bold text-sm">£7,500 GRANT</div>
              <h2 className="font-bold text-green-900">Boiler Upgrade Scheme Available</h2>
            </div>
            <p className="text-sm text-green-800">
              MCS-certified installations qualify for the £7,500 Boiler Upgrade Scheme grant in England and Wales. The grant is deducted from your installation cost - no upfront payment required. Check eligibility with your installer.
            </p>
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
              <Wind className="w-5 h-5" />
              ASHP Cable Quick Facts
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

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common ASHP Installations</h2>
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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-3">Complete Your Low-Carbon Home</h3>
            <p className="text-sm text-blue-800 mb-4">
              Heat pumps work brilliantly alongside other renewable technologies. Pair with <Link to="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="text-blue-600 font-semibold hover:underline">solar PV and battery storage</Link> to power your heat pump with free electricity. Add an <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="text-blue-600 font-semibold hover:underline">EV charger</Link> for complete electrification. Heat pump systems often include backup <Link to="/calculators/cable-sizing/immersion-heater-cable-sizing" className="text-blue-600 font-semibold hover:underline">immersion heaters</Link> for hot water boosting.
            </p>
          </div>

          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-emerald-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-emerald-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">ASHP Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK electrical installation costs. Does not include heat pump unit or plumbing work.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Three-phase upgrade costs vary significantly by DNO and location.</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Renewable Energy Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="block p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-yellow-900 mb-1">Solar PV & Battery</h3>
                <p className="text-sm text-yellow-700">Power your heat pump with solar</p>
              </Link>
              <Link to="/calculators/cable-sizing/ev-charger-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">EV Charger</h3>
                <p className="text-sm text-green-700">Complete home electrification</p>
              </Link>
              <Link to="/calculators/cable-sizing/underfloor-heating-cable-sizing" className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-red-900 mb-1">Underfloor Heating</h3>
                <p className="text-sm text-red-700">Ideal heat pump emitter</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Need a Custom Solution for Your Business?</h3>
              <p className="text-gray-700">
                Whether you're a contractor needing bulk calculations, a merchant wanting to embed our tools, or a business with specific requirements - we'd love to hear from you.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=AirSourceHeatPumpCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite ASHP Cable Sizing Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-blue-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
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
