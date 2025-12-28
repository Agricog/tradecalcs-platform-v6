import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Thermometer } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'immersion-heater-cable-sizing',
  title: 'Immersion Heater Cable Sizing Calculator',
  metaTitle: 'Immersion Heater Cable Size Calculator UK | 3kW Water Heater | BS 7671 | TradeCalcs',
  metaDescription: 'Free immersion heater cable sizing calculator for UK electricians. Calculate correct cable size for 3kW immersion heaters and hot water cylinders. BS 7671 compliant.',
  heroDescription: 'Calculate the correct cable size for immersion heater and hot water cylinder installations',
  
  defaults: {
    loadType: 'kw' as const,
    current: '',
    kW: '3',
    length: '8',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'Standard 3kW immersion heater draws 13A at 230V',
    '2.5mm² cable sufficient for most domestic installations',
    'Dedicated radial circuit required - not from ring main',
    'Double-pole isolator switch required near cylinder',
    'Timer/programmer often installed for Economy 7 tariffs'
  ],

  symptomChecks: [
    { symptom: 'Standard 3kW immersion heater', recommendation: '16A MCB, 2.5mm² cable for runs up to 20m' },
    { symptom: 'Dual immersion (top + bottom elements)', recommendation: 'Usually only one runs at a time - 16A circuit sufficient' },
    { symptom: 'Long cable run to loft cylinder', recommendation: 'Check voltage drop - may need 4mm² for runs over 25m' },
    { symptom: 'Unvented cylinder with immersion backup', recommendation: '16A circuit, ensure thermal cutout wiring correct' },
    { symptom: 'Economy 7 / off-peak installation', recommendation: 'Timer required, may need separate day/night circuits' }
  ],

  costEstimates: [
    { scenario: 'Immersion circuit, short run (<10m)', material: '£40-70', labour: '£100-180', total: '£140-250' },
    { scenario: 'Immersion circuit, medium run (10-20m)', material: '£60-100', labour: '£120-200', total: '£180-300' },
    { scenario: 'Immersion circuit to loft (20m+)', material: '£80-130', labour: '£150-250', total: '£230-380' },
    { scenario: 'New double-pole isolator switch', material: '£15-30', labour: '£40-70', total: '£55-100' },
    { scenario: 'Timer/programmer installation', material: '£30-60', labour: '£50-90', total: '£80-150' }
  ],

  defined: {
    term: 'Immersion Heater Cable Sizing',
    definition: 'Immersion heater cable sizing determines the conductor cross-sectional area (mm²) needed to safely supply an electric water heating element. Standard UK immersion heaters are 3kW (13A), requiring 2.5mm² cable on a 16A circuit. The cable must handle continuous load as immersion heaters run for extended periods heating water.'
  },

  defined2: {
    term: 'Double-Pole Isolation',
    definition: 'BS 7671 requires a double-pole isolator switch for immersion heaters, breaking both live and neutral conductors. This must be positioned within sight of the cylinder or clearly labelled. The switch allows safe isolation for maintenance and element replacement without returning to the consumer unit.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a 3kW immersion heater?',
      a: 'A standard 3kW immersion heater draws 13A (3000W ÷ 230V). For most installations under 20m, 2.5mm² cable on a 16A MCB is sufficient. Longer runs to loft cylinders may need 4mm² to keep voltage drop acceptable.'
    },
    {
      q: 'Can I connect an immersion heater to the ring main?',
      a: 'No, immersion heaters must have a dedicated radial circuit from the consumer unit. They draw continuous current for extended periods which could overload a shared circuit. A dedicated 16A circuit with double-pole isolation is required.'
    },
    {
      q: 'Do I need a fused spur or dedicated circuit?',
      a: 'A dedicated radial circuit is standard for immersion heaters. While a 13A fused spur from a ring main might work for a 3kW heater, it\'s not recommended practice. Dedicated circuits provide proper protection and isolation.'
    },
    {
      q: 'What MCB rating for an immersion heater?',
      a: '16A MCB is standard for 3kW immersion heaters (13A load). This provides adequate protection while allowing for inrush current. Type B MCB is suitable for resistive heating loads.'
    },
    {
      q: 'Why do I need a double-pole switch?',
      a: 'Double-pole isolation breaks both live and neutral, ensuring complete disconnection for safe maintenance. Single-pole switches only break live, leaving neutral connected. BS 7671 requires double-pole isolation for fixed water heating appliances.'
    },
    {
      q: 'Can I use the same circuit for two immersion heaters?',
      a: 'Dual immersion cylinders (top and bottom elements) typically have interlocks preventing both running simultaneously - one 16A circuit is fine. For separate cylinders, each needs its own dedicated circuit.'
    },
    {
      q: 'What about Economy 7 immersion heaters?',
      a: 'Economy 7 installations use off-peak electricity to heat water overnight. You need a timer/programmer and possibly separate metering. The cable sizing remains the same, but installation may be more complex with day/night switching.'
    },
    {
      q: 'How do I wire an immersion heater thermostat?',
      a: 'The thermostat is integral to the immersion heater element. Supply connects to the thermostat terminals which control power to the heating element. A separate thermal cutout provides overheat protection. Always follow manufacturer wiring diagrams.'
    },
    {
      q: 'Is Part P notification required for immersion heater installation?',
      a: 'Yes, installing a new circuit for an immersion heater is notifiable under Part P. Work must be done by a registered competent person or inspected by Building Control. Replacing an element on an existing circuit is not notifiable.'
    },
    {
      q: 'What\'s the difference between immersion and electric shower circuits?',
      a: 'Immersion heaters are typically 3kW (13A) while electric showers are 8.5-10.8kW (37-47A). Showers need much larger cables (6-10mm²) and higher rated MCBs (40-50A). Both need dedicated circuits and RCD protection.'
    }
  ],

  defined3: {
    term: 'Thermal Cutout Protection',
    definition: 'Immersion heaters include a thermal cutout (overheat protection) that disconnects power if water temperature exceeds safe limits - typically 85-90°C. This is a safety device separate from the thermostat. If the thermal cutout trips repeatedly, it indicates a fault requiring investigation.'
  },

  defined4: {
    term: 'Unvented Cylinder Requirements',
    definition: 'Unvented hot water cylinders (pressurised systems) have specific electrical requirements including temperature/pressure relief controls. The immersion heater circuit must integrate with these safety systems. Installation requires G3 qualification and Building Regulations notification.'
  }
}

export default function ImmersionHeaterCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="immersion heater cable size, water heater cable calculator, 3kW immersion cable, hot water cylinder electrical, BS 7671 immersion, immersion heater circuit, water heating electrician" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/immersion-heater-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/immersion-heater-cable-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Immersion Heater Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Immersion Heater Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '567' }
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
                'name': 'How to Size Cable for Immersion Heater Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for immersion heater and hot water cylinder installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Check heater rating', 'text': 'Confirm the immersion heater power rating - typically 3kW for domestic' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run', 'text': 'Measure total cable length from consumer unit to cylinder location' },
                  { '@type': 'HowToStep', 'name': 'Select installation method', 'text': 'Determine if cable will be clipped, in conduit, or buried in wall' },
                  { '@type': 'HowToStep', 'name': 'Calculate cable size', 'text': 'Use our calculator to determine minimum cable size with voltage drop check' },
                  { '@type': 'HowToStep', 'name': 'Plan isolation switch', 'text': 'Include double-pole isolator switch near the cylinder' }
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

        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-12 px-4">
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
              Immersion Heater Cable Quick Facts
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
                <p className="text-purple-100">Get quotes from vetted, local contractors for your immersion heater installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Immersion Heater Installations</h2>
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
            <h3 className="font-bold text-blue-900 mb-3">Related Water Heating Calculations</h3>
            <p className="text-sm text-blue-800 mb-4">
              If you're working on bathroom or water heating projects, you might also need our <Link to="/calculators/cable-sizing/electric-shower-cable-sizing" className="text-blue-600 font-semibold hover:underline">electric shower cable sizing calculator</Link> for higher-powered instantaneous water heating. For properties switching to renewable heating, check our <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="text-blue-600 font-semibold hover:underline">air source heat pump cable calculator</Link> - many heat pump systems work alongside immersion heaters as backup.
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-red-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-red-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Immersion Heater Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs including cable, isolator switch, and labour.</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Does not include cylinder replacement if needed.</p>
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
                <p className="text-sm text-blue-700">8.5kW to 10.8kW installations</p>
              </Link>
              <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">Air Source Heat Pump</h3>
                <p className="text-sm text-green-700">Renewable heating systems</p>
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
                Looking for a qualified electrician for your immersion heater installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ImmersionHeaterCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Immersion Heater Cable Sizing Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
  <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
</p>
            </div>
          </div>

          <div className="bg-red-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
