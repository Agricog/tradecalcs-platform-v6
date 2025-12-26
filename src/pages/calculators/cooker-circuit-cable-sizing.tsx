import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Flame } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'cooker-circuit-cable-sizing',
  title: 'Cooker Circuit Cable Sizing Calculator',
  metaTitle: 'Cooker Cable Size Calculator UK | Electric Oven Circuit | BS 7671 | TradeCalcs',
  metaDescription: 'Free cooker cable sizing calculator for UK electricians. Calculate correct cable size for electric cookers, ovens, and hobs. BS 7671 compliant with diversity calculations and voltage drop analysis.',
  heroDescription: 'Calculate the correct cable size for electric cooker, oven, and hob installations',
  
  defaults: {
    loadType: 'amps' as const,
    current: '32',
    kW: '',
    length: '10',
    method: 'C',
    lighting: false
  },

  keyFacts: [
    'Most domestic cookers need 32A circuit with 6mm² cable',
    'Large range cookers may need 45A circuit with 10mm² cable',
    'Diversity factor allows reduced cable size for cookers',
    'Cooker control unit required within 2m of appliance',
    'Separate circuits needed for hob + oven combinations over 32A'
  ],

  symptomChecks: [
    { symptom: 'Standard electric cooker (up to 13kW)', recommendation: '32A MCB, 6mm² cable, single cooker control unit' },
    { symptom: 'Large range cooker (13-16kW)', recommendation: '45A MCB, 10mm² cable, may need higher rated control unit' },
    { symptom: 'Separate hob + built-in oven', recommendation: 'Often can share 32A circuit if combined load under 13kW' },
    { symptom: 'Induction hob only', recommendation: 'Check hob rating - some need dedicated 32A or 40A circuit' },
    { symptom: 'Commercial/professional range', recommendation: 'May need 3-phase supply - consult manufacturer specifications' }
  ],

  costEstimates: [
    { scenario: 'Cooker circuit, short run (<8m)', material: '£50-80', labour: '£120-200', total: '£170-280' },
    { scenario: 'Cooker circuit, medium run (8-15m)', material: '£80-130', labour: '£150-250', total: '£230-380' },
    { scenario: 'Cooker circuit, long run (15-25m)', material: '£120-180', labour: '£200-300', total: '£320-480' },
    { scenario: 'New cooker control unit install', material: '£30-60', labour: '£60-100', total: '£90-160' },
    { scenario: 'Consumer unit upgrade for cooker', material: '£150-300', labour: '£200-350', total: '£350-650' }
  ],

  defined: {
    term: 'Cooker Circuit Cable Sizing',
    definition: 'Cooker circuit cable sizing determines the conductor cross-sectional area (mm²) needed to safely supply an electric cooker, oven, or hob. UK domestic cookers typically require a 32A radial circuit with 6mm² cable. Unlike other appliances, cookers benefit from diversity calculations - not all elements run simultaneously at full power, allowing for practical cable sizing.'
  },

  defined2: {
    term: 'Diversity for Cooker Circuits',
    definition: 'Diversity recognizes that cooker elements rarely all operate at maximum simultaneously. BS 7671 allows diversity calculation: first 10A at 100% + remaining current at 30% + 5A if socket outlet included. A 12kW cooker (52A) with diversity calculates to approximately 32A, allowing 6mm²/32A circuit for most domestic cookers.'
  },

  faqs: [
    {
      q: 'What cable size do I need for an electric cooker?',
      a: 'Most domestic electric cookers up to 13kW need 6mm² cable on a 32A circuit. This accounts for diversity - not all elements run at full power simultaneously. Large range cookers over 13kW may need 10mm² cable on a 45A circuit. Always check the specific appliance rating.'
    },
    {
      q: 'Can I use 4mm² cable for a cooker?',
      a: 'No, 4mm² is not suitable for cooker circuits. It can only handle 24A maximum in ideal conditions, which is insufficient for standard cooker circuits. Always use minimum 6mm² for domestic cooker installations, or 10mm² for larger appliances.'
    },
    {
      q: 'What is diversity and how does it apply to cookers?',
      a: 'Diversity accounts for the fact that not all cooker elements operate at maximum simultaneously. BS 7671 allows: first 10A at 100% + remaining at 30% + 5A for socket. Example: 12kW cooker (52A) calculates as 10A + (42A × 0.3) + 5A = 27.6A, allowing a 32A circuit.'
    },
    {
      q: 'Do I need a cooker control unit?',
      a: 'Yes, a cooker control unit (CCU) or cooker switch is required for isolation. It must be within 2m of the cooker but not directly above it (heat damage risk). 45A cooker switches are standard. Units with sockets are popular but add 5A to diversity calculation.'
    },
    {
      q: 'Can hob and oven share one circuit?',
      a: 'Yes, if combined load allows. A typical 3kW oven + 7kW hob = 10kW total (43A) with diversity = approximately 25A, suitable for 32A circuit with 6mm² cable. However, large induction hobs may need separate circuits. Always calculate combined load.'
    },
    {
      q: 'What MCB rating for a cooker circuit?',
      a: '32A MCB is standard for domestic cookers up to about 13kW. Larger range cookers may need 45A or 50A MCB with appropriately sized cable. Type B MCBs are typical for domestic installations. RCD protection is recommended but not mandatory for cooker circuits.'
    },
    {
      q: 'How do I calculate cooker diversity?',
      a: 'Formula: First 10A at 100% + remaining current at 30% + 5A if socket included. Example: 15kW cooker = 65A. Diversity = 10A + (55A × 0.3) + 5A = 31.5A. This allows a 32A circuit despite the higher nameplate rating. Our calculator applies this automatically.'
    },
    {
      q: 'Can I install a cooker circuit myself?',
      a: 'Cooker circuit installation is notifiable work under Part P of Building Regulations. It must be done by a registered competent person (Part P scheme member) or inspected by Building Control. DIY installation without notification is illegal and invalidates insurance.'
    },
    {
      q: 'What about induction hobs - do they need special wiring?',
      a: 'Induction hobs can draw high currents - some 7.4kW hobs draw 32A alone. Check manufacturer specifications. Large induction hobs may need dedicated 32A or even 40A circuits separate from the oven. Always verify before installation.'
    },
    {
      q: 'Is RCD protection required for cooker circuits?',
      a: 'RCD protection is not mandatory for cooker circuits under BS 7671 if the circuit doesnt supply socket outlets and is not in a special location. However, many modern consumer units have RCD protection on all circuits. Cooker sockets in control units do require RCD protection.'
    }
  ],

  defined3: {
    term: 'Cooker Control Unit (CCU)',
    definition: 'A cooker control unit provides a local isolation switch for the cooker circuit. It must be within 2m of the appliance for emergency disconnection. Standard rating is 45A. Models with 13A socket outlets are popular for kettles and small appliances. The socket adds 5A to diversity calculations.'
  },

  defined4: {
    term: 'Radial vs Ring for Cookers',
    definition: 'Cooker circuits are always radial (single cable run from consumer unit to appliance), never ring circuits. This ensures the cable can handle the full cooker load without overheating. The cable runs directly from MCB to cooker control unit to appliance connection point.'
  }
}

export default function CookerCircuitCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="cooker cable size, oven cable calculator, electric cooker circuit, hob cable size, cooker control unit, BS 7671 cooker, kitchen electrical, cooker installation electrician, cooker diversity" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/cooker-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/cooker-cable-og.jpg" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Cooker Circuit Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Cooker Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '1124' }
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
                'name': 'How to Size Cable for Cooker Circuit Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for electric cooker installation in UK kitchens.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Check cooker power rating', 'text': 'Find the kW or amp rating on the cooker - typically 10-15kW for domestic units' },
                  { '@type': 'HowToStep', 'name': 'Apply diversity calculation', 'text': 'Calculate diversity: first 10A at 100% + remaining at 30% + 5A if socket' },
                  { '@type': 'HowToStep', 'name': 'Measure cable run', 'text': 'Measure total cable length from consumer unit to cooker control unit to appliance' },
                  { '@type': 'HowToStep', 'name': 'Calculate cable size', 'text': 'Use our calculator to determine minimum cable size with voltage drop check' },
                  { '@type': 'HowToStep', 'name': 'Select appropriate MCB', 'text': 'Choose 32A MCB for standard cookers or 45A for large range cookers' }
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

        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
              <Flame className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Cooker Circuit Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-orange-900">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Cooker Installations</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-orange-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cooker Circuit Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs including cable, labour, and consumer unit work. Excludes cooker unit cost.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-50 border-b">
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

          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-red-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-red-800">{usecaseData.defined2.definition}</p>
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
                <p className="text-sm text-cyan-700">Verify voltage drop for long cooker cable runs</p>
              </Link>
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-blue-700">Full BS 7671 cable sizing for all circuits</p>
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
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=CookerCircuitCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Cooker Circuit Cable Sizing Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-blue-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>

          <div className="bg-orange-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
