import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Flame } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'underfloor-heating-cable-sizing',
  title: 'Underfloor Heating Cable Sizing Calculator',
  metaTitle: 'Underfloor Heating Cable Size Calculator UK | Electric UFH | BS 7671 | TradeCalcs',
  metaDescription: 'Free electric underfloor heating cable sizing calculator for UK electricians. Calculate supply cable size for UFH systems. BS 7671 compliant with zone coverage.',
  heroDescription: 'Calculate the correct supply cable size for electric underfloor heating systems',
  
  defaults: {
    loadType: 'amps' as const,
    current: '16',
    kW: '',
    length: '10',
    method: 'B',
    lighting: false
  },

  keyFacts: [
    'Electric UFH typically 150-200W per m² heating output',
    '10m² room at 150W/m² = 1.5kW = 6.5A per zone',
    'Multiple zones often need separate circuits or higher rated supply',
    'Thermostat/timer required for each zone',
    'RCD protection mandatory - 30mA for bathroom zones'
  ],

  symptomChecks: [
    { symptom: 'Single zone bathroom (5m² at 150W/m²)', recommendation: '16A circuit, 2.5mm² cable sufficient' },
    { symptom: 'Single zone kitchen (15m² at 150W/m²)', recommendation: '16A circuit, 2.5mm² or 4mm² cable' },
    { symptom: 'Multiple zones from one circuit', recommendation: 'Calculate total load - may need 20A or 32A circuit' },
    { symptom: 'Large open-plan area (30m²+)', recommendation: 'Split into zones, consider separate circuits' },
    { symptom: 'Extension/conservatory UFH', recommendation: 'Check total property load - may need consumer unit upgrade' }
  ],

  costEstimates: [
    { scenario: 'Single zone UFH supply (<10m²)', material: '£50-100', labour: '£100-180', total: '£150-280' },
    { scenario: 'Multiple zone UFH supply (10-30m²)', material: '£100-200', labour: '£150-280', total: '£250-480' },
    { scenario: 'Large installation (30m²+)', material: '£180-350', labour: '£250-400', total: '£430-750' },
    { scenario: 'Thermostat per zone', material: '£50-150', labour: '£40-80', total: '£90-230 per zone' },
    { scenario: 'Consumer unit upgrade', material: '£150-300', labour: '£200-350', total: '£350-650' }
  ],

  defined: {
    term: 'Electric Underfloor Heating Cable Sizing',
    definition: 'UFH supply cable sizing determines the conductor cross-sectional area (mm²) needed to safely supply electric underfloor heating systems. Unlike the thin heating cables embedded in the floor, the supply cable from consumer unit to thermostat must be sized for the total zone load. Multiple zones increase total current demand.'
  },

  defined2: {
    term: 'UFH Heating Cables vs Supply Cables',
    definition: 'Electric UFH uses two types of cable: (1) Heating cables/mats embedded in the floor - thin, specific resistance, supplied by manufacturer. (2) Supply cables from consumer unit to thermostat - standard cables sized for total zone load. This calculator helps with supply cable sizing, not the heating cable itself.'
  },

  faqs: [
    {
      q: 'What cable size do I need for underfloor heating?',
      a: 'Supply cable size depends on total zone load. A 15m² zone at 150W/m² = 2.25kW = 10A - 2.5mm² cable on 16A circuit is fine. Larger zones or multiple zones from one circuit may need 4mm² on 20A or 6mm² on 32A. Calculate your total wattage first.'
    },
    {
      q: 'How do I calculate UFH electrical load?',
      a: 'Multiply heated area (m²) by watts per m² (typically 150-200W). Example: 20m² × 150W = 3000W = 3kW. Convert to amps: 3000W ÷ 230V = 13A. Add 20% safety margin for larger supplies.'
    },
    {
      q: 'Can I run multiple UFH zones from one circuit?',
      a: 'Yes, if total load allows. Add up all zone wattages and ensure circuit can handle total current. A 16A circuit handles about 3.5kW total, 20A handles 4.5kW, 32A handles 7kW. Separate thermostats still needed per zone.'
    },
    {
      q: 'What MCB rating for underfloor heating?',
      a: 'MCB rating depends on total load. Single small zone: 16A. Multiple zones or large areas: 20A or 32A. Type B MCBs are suitable for resistive heating loads. Each circuit needs 30mA RCD protection.'
    },
    {
      q: 'Do I need RCD protection for underfloor heating?',
      a: 'Yes, 30mA RCD protection is required for all UFH circuits under BS 7671. This is especially critical for bathroom installations. The RCD can be at the consumer unit (RCBO) or a separate RCD protecting the circuit.'
    },
    {
      q: 'What about bathroom underfloor heating zones?',
      a: 'Bathroom UFH must comply with BS 7671 Section 701 (special locations). 30mA RCD protection mandatory, and installation must consider zones around baths and showers. IP-rated thermostats required if within zone 2.'
    },
    {
      q: 'Can electric UFH work with a heat pump?',
      a: 'Electric UFH is different from wet UFH systems used with heat pumps. Electric UFH has heating cables in the floor; wet systems have water pipes. Some properties use electric UFH in bathrooms alongside a heat pump for main heating. They require separate electrical supplies.'
    },
    {
      q: 'How many zones can I have on one circuit?',
      a: 'As many as the circuit can handle electrically. A 16A circuit at 230V = 3680W maximum. Three 10m² zones at 150W/m² = 4500W - too much for 16A. Either use 20A/32A circuit or split into separate circuits.'
    },
    {
      q: 'Do I need a dedicated circuit for UFH?',
      a: 'Dedicated circuits are recommended, especially for larger installations. Small single zones might work from existing circuits if capacity allows, but this is not best practice. Dedicated circuits ensure reliable operation and easier fault finding.'
    },
    {
      q: 'What thermostat do I need for electric UFH?',
      a: 'Electric UFH requires thermostats rated for the zone load - typically 16A models. Programmable thermostats save energy. Floor sensor probe thermostats prevent overheating. Smart thermostats offer remote control. Each zone needs its own thermostat.'
    }
  ],

  defined3: {
    term: 'UFH Wattage Calculation',
    definition: 'Electric UFH output is measured in watts per square metre (W/m²). Typical values: 150W/m² for well-insulated rooms, 200W/m² for bathrooms or poorly insulated spaces. Total load = heated area × W/m². Note: heated area excludes areas under fixed furniture and fittings.'
  },

  defined4: {
    term: 'Zone Control Strategy',
    definition: 'UFH zones allow different areas to be heated independently with separate thermostats. Typical zoning: bathrooms on early morning timers, living areas on evening schedules, bedrooms separately controlled. Each zone needs thermostat and potentially separate circuit for larger installations.'
  }
}

export default function UnderfloorHeatingCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="underfloor heating cable size, UFH cable calculator, electric underfloor heating, UFH electrical supply, BS 7671 underfloor heating, bathroom UFH electrical, floor heating electrician" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/underfloor-heating-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/underfloor-heating-cable-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Underfloor Heating Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Underfloor Heating Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '645' }
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
                'name': 'How to Size Supply Cable for Electric Underfloor Heating',
                'description': 'Step-by-step guide to calculating the correct supply cable size for UFH systems.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Calculate heated area', 'text': 'Measure the floor area to be heated, excluding fixed furniture' },
                  { '@type': 'HowToStep', 'name': 'Determine wattage', 'text': 'Multiply area by W/m² (typically 150-200W/m²) to get total watts' },
                  { '@type': 'HowToStep', 'name': 'Convert to amps', 'text': 'Divide total watts by 230V to get current in amps' },
                  { '@type': 'HowToStep', 'name': 'Size supply cable', 'text': 'Use our calculator to determine minimum cable size for the load' },
                  { '@type': 'HowToStep', 'name': 'Plan zone control', 'text': 'Specify thermostats and check circuit capacity for multiple zones' }
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

        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Flame className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-red-900 mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Electric UFH Cable Quick Facts
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
                <p className="text-purple-100">Get quotes from vetted, local contractors for your underfloor heating installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common UFH Installations</h2>
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

          {/* Internal linking section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-3">Related Heating & Bathroom Installations</h3>
            <p className="text-sm text-blue-800 mb-4">
              Electric UFH is often installed alongside other bathroom electrical work. You might also need our <Link to="/calculators/cable-sizing/electric-shower-cable-sizing" className="text-blue-600 font-semibold hover:underline">electric shower cable calculator</Link> for the same project. For whole-house heating with wet UFH, see our <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="text-blue-600 font-semibold hover:underline">air source heat pump calculator</Link> - heat pumps work brilliantly with wet underfloor heating systems.
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-red-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-red-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">UFH Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK electrical supply installation costs. Does not include UFH mats/cables or floor preparation.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-red-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Smart thermostat options cost more but offer energy savings.</p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6 mb-8">
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
              <Link to="/calculators/cable-sizing/electric-shower-cable-sizing" className="block p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Electric Shower</h3>
                <p className="text-sm text-blue-700">Often paired with bathroom UFH</p>
              </Link>
              <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="block p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-emerald-900 mb-1">Air Source Heat Pump</h3>
                <p className="text-sm text-emerald-700">Ideal for wet UFH systems</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Check long cable runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your underfloor heating installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=UnderfloorHeatingCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Underfloor Heating Cable Sizing Inquiry Form"
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
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-red-500 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
