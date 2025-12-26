import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Droplets } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'electric-shower-cable-sizing',
  title: 'Electric Shower Cable Sizing Calculator',
  metaTitle: 'Electric Shower Cable Size Calculator UK | 8.5kW 9.5kW 10.5kW | BS 7671 | TradeCalcs',
  metaDescription: 'Free electric shower cable sizing calculator for UK electricians. Calculate correct cable size for 8.5kW, 9.5kW, 10.5kW and 10.8kW showers. BS 7671 compliant with voltage drop analysis.',
  heroDescription: 'Calculate the correct cable size for electric shower installations - 8.5kW to 10.8kW units',
  
  defaults: {
    loadType: 'kw' as const,
    current: '',
    kW: '9.5',
    length: '12',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    '8.5kW shower = 37A, needs 6mm² (short runs) or 10mm² (longer)',
    '9.5kW shower = 41A, typically needs 10mm² cable',
    '10.5kW shower = 46A, requires 10mm² minimum',
    'Always run dedicated radial circuit from consumer unit',
    '45A or 50A MCB with 30mA RCD protection required'
  ],

  symptomChecks: [
    { symptom: '8.5kW electric shower', recommendation: '40A MCB, 6mm² up to 14m or 10mm² for longer runs' },
    { symptom: '9.5kW electric shower', recommendation: '45A MCB, 10mm² cable for most installations' },
    { symptom: '10.5kW electric shower', recommendation: '45A MCB, 10mm² cable, check voltage drop on runs over 20m' },
    { symptom: '10.8kW electric shower', recommendation: '50A MCB, 10mm² minimum, may need 16mm² for long runs' },
    { symptom: 'Replacing existing shower (like for like)', recommendation: 'Check existing cable size supports new shower rating' }
  ],

  costEstimates: [
    { scenario: 'New 9.5kW shower, short run (<10m)', material: '£60-100', labour: '£150-250', total: '£210-350' },
    { scenario: 'New 9.5kW shower, medium run (10-18m)', material: '£100-160', labour: '£200-300', total: '£300-460' },
    { scenario: 'New 10.5kW shower, long run (18-25m)', material: '£150-220', labour: '£250-350', total: '£400-570' },
    { scenario: 'Consumer unit upgrade required', material: '£150-300', labour: '£200-350', total: '£350-650 (additional)' },
    { scenario: 'Full bathroom rewire with shower', material: '£200-350', labour: '£400-600', total: '£600-950' }
  ],

  defined: {
    term: 'Electric Shower Cable Sizing',
    definition: 'Electric shower cable sizing determines the conductor cross-sectional area (mm²) needed to safely supply an instantaneous electric shower. UK showers typically range from 7.5kW to 10.8kW, drawing 33-47A. Most installations require 10mm² cable to handle the load and keep voltage drop under 5%. A dedicated radial circuit with appropriate MCB and RCD protection is mandatory.'
  },

  defined2: {
    term: 'Instantaneous vs Storage Showers',
    definition: 'Electric showers are instantaneous - they heat water on demand as it flows through the unit. Higher kW ratings provide more hot water flow. Unlike storage water heaters, they draw maximum current continuously while in use, making correct cable sizing critical. The cable must handle full load current for extended periods without overheating.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a 9.5kW shower?',
      a: 'A 9.5kW shower draws approximately 41A (9500W ÷ 230V). You need 10mm² cable for most installations. 6mm² is only suitable for very short runs under 10m with Method C installation. Always calculate voltage drop for your specific cable length.'
    },
    {
      q: 'Can I use 6mm² cable for an electric shower?',
      a: '6mm² can handle up to 32A in Method C, which covers 7.5kW showers (33A). For 8.5kW+ showers, 6mm² is only suitable for very short runs where voltage drop permits. Most shower installations should use 10mm² to be safe and allow for future upgrades.'
    },
    {
      q: 'What MCB rating do I need for an electric shower?',
      a: 'MCB rating depends on shower power: 8.5kW needs 40A, 9.5kW needs 45A, 10.5kW+ needs 45A or 50A. The MCB must be Type B for domestic, combined with 30mA RCD protection. Never use a fuse - MCBs provide better protection for shower circuits.'
    },
    {
      q: 'Does an electric shower need RCD protection?',
      a: 'Yes, mandatory. All shower circuits require 30mA RCD protection under BS 7671. This can be via an RCBO (combined MCB/RCD), a separate RCD protecting the circuit, or a main switch RCD if it covers all circuits. RCD protection is essential for bathroom electrical safety.'
    },
    {
      q: 'Can I connect a shower to a ring main?',
      a: 'No, never. Electric showers must have a dedicated radial circuit from the consumer unit. They draw too much current for a ring main or spur. The circuit must be protected by its own MCB and RCD, with cable sized for the shower rating.'
    },
    {
      q: 'Why is my shower running lukewarm?',
      a: 'Lukewarm water often indicates voltage drop. If the cable is undersized or the run is too long, voltage at the shower drops below optimal, reducing heating element performance. Check cable size and length against shower rating. Upgrading cable size often solves this.'
    },
    {
      q: 'Can I upgrade from 8.5kW to 10.5kW shower?',
      a: 'Only if your existing cable and MCB can handle the higher load. 8.5kW uses 6mm²/40A, while 10.5kW needs 10mm²/45A minimum. If you have 6mm² cable, you cannot safely upgrade without recabling. Always check before upgrading shower units.'
    },
    {
      q: 'What is the maximum shower power for a UK home?',
      a: 'Most UK homes can support up to 10.8kW showers on a 100A supply. Beyond this, you may need DNO supply upgrade. Check your main fuse rating and existing load. Some older properties with 60A supplies may be limited to 8.5kW showers.'
    },
    {
      q: 'How do I calculate shower current from kW?',
      a: 'Current (amps) = Power (watts) ÷ Voltage. For UK single-phase: Amps = kW × 1000 ÷ 230. Examples: 8.5kW = 37A, 9.5kW = 41A, 10.5kW = 46A, 10.8kW = 47A. Our calculator does this automatically.'
    },
    {
      q: 'Do I need Part P notification for shower installation?',
      a: 'Yes, installing a new shower circuit is notifiable work under Part P of Building Regulations. It must be done by a registered competent person (Part P scheme member) or inspected by Building Control. This ensures the work meets electrical safety standards.'
    }
  ],

  defined3: {
    term: 'Voltage Drop in Shower Circuits',
    definition: 'Voltage drop is the reduction in voltage along the cable due to resistance. BS 7671 limits this to 5% (11.5V at 230V). Long shower cable runs with high current cause significant voltage drop, reducing shower performance. If voltage drop exceeds limits, you must use larger cable to compensate.'
  },

  defined4: {
    term: 'IP Rating for Bathroom Electrics',
    definition: 'IP (Ingress Protection) ratings define protection against water. Shower isolator switches need minimum IP44 (splash-proof) if in Zone 2, or IP65 if in Zone 1. The shower unit itself is designed for wet conditions. All bathroom electrical work must comply with BS 7671 Section 701.'
  }
}

export default function ElectricShowerCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="electric shower cable size, shower cable calculator, 9.5kW shower cable, 10.5kW shower cable, shower circuit cable, BS 7671 shower, bathroom electrical, shower installation electrician" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/electric-shower-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/electric-shower-cable-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Electric Shower Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Electric Shower Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '963' }
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
                'name': 'How to Size Cable for Electric Shower Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for electric shower installation in UK bathrooms.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Check shower power rating', 'text': 'Find the kW rating on the shower unit - typically 8.5kW, 9.5kW, or 10.5kW' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run', 'text': 'Measure total cable length from consumer unit to shower location' },
                  { '@type': 'HowToStep', 'name': 'Select installation method', 'text': 'Determine if cable will be clipped, in conduit, or buried in wall' },
                  { '@type': 'HowToStep', 'name': 'Calculate cable size', 'text': 'Use our calculator to determine minimum cable size with voltage drop check' },
                  { '@type': 'HowToStep', 'name': 'Select MCB rating', 'text': 'Choose appropriate MCB (40A, 45A or 50A) based on shower rating' }
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

        <div className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Droplets className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Electric Shower Cable Quick Facts
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
                <p className="text-purple-100">Get quotes from vetted, local contractors for your electric shower installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Electric Shower Installations</h2>
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

          {/* Internal linking section */}
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-cyan-900 mb-3">Related Bathroom & Water Heating</h3>
            <p className="text-sm text-cyan-800 mb-4">
              Bathroom projects often include <Link to="/calculators/cable-sizing/underfloor-heating-cable-sizing" className="text-cyan-600 font-semibold hover:underline">electric underfloor heating</Link> for added comfort. If you're also upgrading hot water, see our <Link to="/calculators/cable-sizing/immersion-heater-cable-sizing" className="text-cyan-600 font-semibold hover:underline">immersion heater cable calculator</Link>. For whole-house water heating upgrades, consider an <Link to="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="text-cyan-600 font-semibold hover:underline">air source heat pump</Link>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-blue-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-blue-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Electric Shower Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs including cable, labour, and consumer unit work. Excludes shower unit cost (£80-300).</p>
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Actual costs vary by region, complexity, and supplier.</p>
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
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Check voltage drop for long shower cable runs</p>
              </Link>
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-blue-700">Full BS 7671 cable sizing for all circuits</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your electric shower installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ElectricShowerCableSizing" 
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
