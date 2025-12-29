import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, Zap, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { ElectricalLoadCalculatorCore } from '../components/ElectricalLoadCalculatorCore'

export default function ElectricalLoadCalculatorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What is electrical load calculation and why is it important?',
      a: 'Electrical load calculation determines the maximum power demand a property will draw from the supply. It\'s essential for sizing the main supply (60A, 80A, 100A), ensuring the consumer unit can handle all circuits, and preventing overloading which causes tripped breakers or fire risk. Every new installation or major upgrade should start with a load calculation.'
    },
    {
      q: 'What are diversity factors in BS 7671?',
      a: 'Diversity factors recognise that not all electrical loads operate simultaneously at full capacity. BS 7671 Appendix 1 Table 1A provides standard factors: lighting at 66%, socket outlets with first 10A at 100% then 30%, cookers at 10A plus 30% of remainder. These factors convert total connected load into realistic maximum demand.'
    },
    {
      q: 'How do I know if I need a supply upgrade?',
      a: 'If your calculated maximum demand exceeds your current supply rating (typically 60A, 80A, or 100A), you need an upgrade. Signs include frequently tripping main switch, wanting to add high-demand items (EV charger, heat pump, electric shower), or the DNO advising your supply is at capacity. Contact your DNO (Distribution Network Operator) for upgrades.'
    },
    {
      q: 'What is the typical supply rating for a UK house?',
      a: 'Older properties often have 60A or 80A supplies. Modern properties typically have 100A single-phase supplies. High-demand properties with EV chargers, heat pumps, and electric heating may need 100A+ or even three-phase supply. Check your main fuse or service head for your current rating.'
    },
    {
      q: 'How do I calculate load for an EV charger installation?',
      a: 'A 7.4kW home EV charger draws 32A continuously - this is added at 100% diversity as it\'s a sustained load. Add this to your existing maximum demand. If total exceeds supply capacity, you may need a supply upgrade or smart load management system that limits charging when other high loads are active.'
    },
    {
      q: 'What diversity applies to electric showers?',
      a: 'Electric showers are calculated at 100% diversity (no reduction) because when in use, they draw full rated power. A 10.8kW shower draws 47A - nearly half a 100A supply. Multiple electric showers in a property significantly impact maximum demand calculations.'
    },
    {
      q: 'How do I calculate socket outlet diversity?',
      a: 'BS 7671 uses a stepped approach: first 10A (2.3kW) at 100%, remainder at 30%. So a 32A ring main (7.36kW connected) calculates as: 2.3kW + (5.06kW × 0.3) = 3.82kW maximum demand. This recognises you won\'t use every socket at full capacity simultaneously.'
    },
    {
      q: 'What about cooker diversity calculations?',
      a: 'Cookers use: first 10A at 100%, plus 30% of remainder, plus 5A if there\'s a socket outlet. A 45A cooker circuit (10.35kW) calculates as: 2.3kW + (8.05kW × 0.3) + 1.15kW = 5.87kW. This accounts for not using all hobs and oven at maximum simultaneously.'
    },
    {
      q: 'Should I include future loads in my calculation?',
      a: 'Yes - always plan ahead. If you\'re likely to add an EV charger, heat pump, or additional circuits within 5-10 years, include them now. It\'s much cheaper to install adequate supply capacity upfront than to upgrade later. Aim for at least 20% headroom on your supply.'
    },
    {
      q: 'What\'s the difference between connected load and maximum demand?',
      a: 'Connected load is the sum of all circuit ratings - the theoretical maximum if everything ran at once. Maximum demand applies diversity factors to calculate realistic peak draw. A house might have 50kW connected load but only 15kW maximum demand. Supplies are sized to maximum demand, not connected load.'
    },
    {
      q: 'How do storage heaters affect load calculations?',
      a: 'Storage heaters charge overnight on Economy 7/10 tariffs, typically 1.7-3.4kW each. They\'re calculated at 100% diversity since they all charge simultaneously. Multiple storage heaters can create significant overnight demand - ensure your supply and main switch can handle the total.'
    },
    {
      q: 'Do I need a three-phase supply?',
      a: 'Three-phase is typically needed when single-phase demand exceeds 100A (23kW), or for large motors/equipment requiring three-phase power. Common in larger houses with heat pumps + EV chargers + electric heating. Three-phase provides 3× the capacity but requires different equipment and higher standing charges.'
    }
  ]

  const supplyTable = [
    { supply: '60A', kw: '13.8', typical: 'Older properties, basic loads', suitable: 'No EV, no electric heating, gas heating' },
    { supply: '80A', kw: '18.4', typical: 'Standard modern property', suitable: 'Electric shower + cooker, possible small EV charger' },
    { supply: '100A', kw: '23.0', typical: 'Higher demand property', suitable: 'EV charger + heat pump OR multiple high-demand circuits' },
    { supply: '3-Phase', kw: '69.0', typical: 'Large/all-electric properties', suitable: 'Multiple EVs, heat pump, all-electric, large property' }
  ]

  const circuitTable = [
    { circuit: 'Lighting (per circuit)', rating: '6A', typical: '1.4kW', diversity: '66%' },
    { circuit: 'Ring Main 32A', rating: '32A', typical: '7.4kW', diversity: '10A + 30%' },
    { circuit: 'Electric Shower', rating: '40-50A', typical: '8-11kW', diversity: '100%' },
    { circuit: 'Electric Cooker', rating: '32-45A', typical: '8-12kW', diversity: '10A + 30%' },
    { circuit: 'EV Charger 7.4kW', rating: '32A', typical: '7.4kW', diversity: '100%' },
    { circuit: 'Heat Pump (ASHP)', rating: '20-32A', typical: '4-8kW', diversity: '80%' },
    { circuit: 'Immersion Heater', rating: '16A', typical: '3kW', diversity: '100%' },
    { circuit: 'Storage Heater', rating: '13A', typical: '2-3kW', diversity: '100%' }
  ]

  return (
    <>
      <Helmet>
        <title>Electrical Load Calculator UK 2025 | BS 7671 Diversity | Maximum Demand | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free electrical load calculator for UK electricians. Calculate maximum demand with BS 7671 diversity factors. Determine supply size for domestic installations." 
        />
        <meta 
          name="keywords" 
          content="electrical load calculator, maximum demand calculator, BS 7671 diversity, supply sizing, electrician calculator, domestic load calculation, EV charger load" 
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#4f46e5" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TradeCalcs" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Electrical Load Calculator UK | BS 7671 Maximum Demand | TradeCalcs" />
        <meta property="og:description" content="Free electrical load calculator. Calculate maximum demand with BS 7671 diversity factors for domestic installations." />
        <meta property="og:url" content="https://tradecalcs.co.uk/electrical-load-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/electrical-load-calculator-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content="Electrical Load Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free electrical load calculator. BS 7671 diversity factors for maximum demand calculation." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/electrical-load-calculator-og.jpg" />

        <link rel="canonical" href="https://tradecalcs.co.uk/electrical-load-calculator" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Electrical Calculators', 'item': 'https://tradecalcs.co.uk/electrical-calculators' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Electrical Load Calculator', 'item': 'https://tradecalcs.co.uk/electrical-load-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Electrical Load Calculator UK',
                'description': 'Free electrical load calculator for UK electricians. Calculate maximum demand with BS 7671 diversity factors for domestic and commercial installations.',
                'applicationCategory': 'Utility',
                'operatingSystem': 'Web Browser',
                'url': 'https://tradecalcs.co.uk/electrical-load-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '892' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': faqs.map(faq => ({
                  '@type': 'Question',
                  'name': faq.q,
                  'acceptedAnswer': { '@type': 'Answer', 'text': faq.a }
                }))
              },
              {
                '@type': 'HowTo',
                'name': 'How to Calculate Electrical Maximum Demand',
                'description': 'Step-by-step guide to calculating maximum electrical demand for a property using BS 7671 diversity factors.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Select Property Type', 'text': 'Choose house, flat, or commercial property' },
                  { '@type': 'HowToStep', 'name': 'Add All Circuits', 'text': 'Add each circuit type: lighting, sockets, cooker, shower, etc.' },
                  { '@type': 'HowToStep', 'name': 'Set Quantities and Ratings', 'text': 'Adjust circuit quantities and ratings to match your installation' },
                  { '@type': 'HowToStep', 'name': 'Calculate', 'text': 'Click calculate to see maximum demand and recommended supply size' },
                  { '@type': 'HowToStep', 'name': 'Review Results', 'text': 'Check the breakdown shows diversity factors correctly applied' }
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
        {/* Back Link */}
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link to="/electrical-calculators" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Electrical Calculators
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Electrical Load Calculator UK</h1>
            <p className="text-lg opacity-95">Calculate maximum demand with BS 7671 diversity factors</p>
            <p className="text-sm opacity-80 mt-2">Domestic & commercial • Supply sizing • All circuit types</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Key Facts Box */}
          <div className="bg-indigo-50 border-l-4 border-indigo-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Load Calculation Quick Facts
            </h2>
            <ul className="space-y-2">
              {[
                'Diversity factors reduce connected load to realistic maximum demand',
                'Standard domestic supply: 60A (older), 80A (standard), 100A (high demand)',
                'EV chargers and heat pumps typically require 100A supply minimum',
                'Always allow 20%+ headroom for future additions',
                'Contact your DNO if calculated demand exceeds current supply'
              ].map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-indigo-900">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Calculate Maximum Demand
              </h2>
            </div>
            <ElectricalLoadCalculatorCore />
          </div>

          {/* Internal Linking - Electrician Workflow */}
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-indigo-900 mb-3">Complete Your Electrical Design</h3>
            <p className="text-sm text-indigo-800 mb-4">
              Load calculation is step one. Once you know your maximum demand, continue with cable sizing and voltage drop verification:
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded border border-indigo-200">
                <span className="text-indigo-600 font-bold text-lg">1</span>
                <p className="font-semibold text-gray-900">Load Calculation</p>
                <p className="text-xs text-gray-600">You are here</p>
              </div>
              <Link to="/cable-sizing-calculator" className="bg-white p-3 rounded border border-indigo-200 hover:border-indigo-400 hover:shadow transition">
                <span className="text-indigo-600 font-bold text-lg">2</span>
                <p className="font-semibold text-gray-900">Cable Sizing →</p>
                <p className="text-xs text-gray-600">Size cables for each circuit</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="bg-white p-3 rounded border border-indigo-200 hover:border-indigo-400 hover:shadow transition">
                <span className="text-indigo-600 font-bold text-lg">3</span>
                <p className="font-semibold text-gray-900">Voltage Drop →</p>
                <p className="text-xs text-gray-600">Verify compliance</p>
              </Link>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need an Electrician?</h3>
                <p className="text-indigo-200">Get quotes for consumer unit upgrades, rewires & new installations</p>
              </div>
              <a 
                href="#get-quotes" 
                className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 text-center whitespace-nowrap"
              >
                Get Free Quotes
              </a>
            </div>
          </div>

          {/* Understanding Maximum Demand */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Maximum Demand</h2>
            <p className="text-gray-700 mb-4">
              Maximum demand is the highest rate of electrical power a property is likely to draw at any given moment. It's always lower than the connected load because diversity factors account for the reality that not everything runs simultaneously at full power.
            </p>
            <p className="text-gray-700 mb-4">
              For example, a house might have 50kW of connected load (all circuits at maximum), but the maximum demand might only be 15kW because you're never using every socket, every light, the cooker, shower, and immersion heater all at once.
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
              <h3 className="font-bold text-indigo-900 mb-2">Example: Typical 3-Bed House</h3>
              <div className="text-sm text-indigo-800 space-y-1">
                <p>2× Lighting circuits (6A each): 2.76kW connected → <strong>1.82kW</strong> after diversity</p>
                <p>2× Ring mains (32A each): 14.72kW connected → <strong>6.02kW</strong> after diversity</p>
                <p>1× Cooker (45A): 10.35kW connected → <strong>5.87kW</strong> after diversity</p>
                <p>1× Shower (10.8kW): 10.8kW connected → <strong>10.8kW</strong> (no diversity)</p>
                <p className="pt-2 font-bold">Total: 38.6kW connected → 24.5kW maximum demand (63A)</p>
              </div>
            </div>
            <p className="text-gray-700">
              This property would need a minimum 80A supply, with 100A recommended for headroom. Adding an EV charger (7.4kW) would push demand to ~32kW (nearly 80A), making 100A essential. Learn more about <Link to="/cable-sizing-calculator" className="text-indigo-600 font-semibold hover:underline">sizing cables</Link> for these circuits.
            </p>
          </div>

          {/* Supply Ratings Table */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">UK Domestic Supply Ratings</h2>
            <p className="text-sm text-gray-600 mb-4">Common supply ratings and their suitability for different property types</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-indigo-50 border-b">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Supply</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">Max kW</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Typical Property</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Suitable For</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {supplyTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-semibold text-indigo-600">{row.supply}</td>
                      <td className="px-4 py-3 text-center text-gray-800">{row.kw}</td>
                      <td className="px-4 py-3 text-gray-600">{row.typical}</td>
                      <td className="px-4 py-3 text-gray-600">{row.suitable}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">kW calculated at 230V single phase (400V for three-phase). Actual capacity may vary - check with your DNO.</p>
          </div>

          {/* Circuit Reference Table */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Circuit Loads & Diversity</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Circuit Type</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">Typical Rating</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">Typical Load</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">Diversity Factor</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {circuitTable.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-semibold text-gray-800">{row.circuit}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.rating}</td>
                      <td className="px-4 py-3 text-center text-gray-600">{row.typical}</td>
                      <td className="px-4 py-3 text-center font-semibold text-indigo-600">{row.diversity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">Diversity factors per BS 7671 Appendix 1. "10A + 30%" means first 10A at 100%, remainder at 30%.</p>
          </div>

          {/* EV & Heat Pump Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-green-900 mb-4">EV Chargers & Heat Pumps</h2>
            <p className="text-gray-700 mb-4">
              The transition to electric vehicles and heat pumps is significantly increasing domestic electrical demand. Both are high-load, long-duration circuits that require careful consideration.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-800 mb-2">EV Charger (7.4kW)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 32A dedicated circuit required</li>
                  <li>• 100% diversity (continuous load)</li>
                  <li>• Often triggers 100A supply upgrade</li>
                  <li>• Consider smart charging for load management</li>
                </ul>
                <Link to="/cable-sizing-calculators/ev-charger" className="text-green-600 text-sm font-semibold hover:underline mt-2 inline-block">EV charger cable sizing →</Link>
              </div>
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <h3 className="font-bold text-green-800 mb-2">Air Source Heat Pump</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Typically 4-12kW depending on property</li>
                  <li>• 80% diversity (thermostat controlled)</li>
                  <li>• May run simultaneously with immersion backup</li>
                  <li>• Combined with EV often needs 100A+</li>
                </ul>
                <Link to="/radiator-btu-calculator" className="text-green-600 text-sm font-semibold hover:underline mt-2 inline-block">Calculate heating load →</Link>
              </div>
            </div>
          </div>

          {/* Practical Tips */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Practical Installation Tips</h3>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Always allow 20% headroom on supply for future additions</li>
                  <li>• Check existing supply capacity before designing - look at main fuse rating</li>
                  <li>• Consider load management systems for properties near supply limits</li>
                  <li>• DNO supply upgrades can take 6-12 weeks - factor into project timelines</li>
                  <li>• Document your load calculation for Building Control and Part P certification</li>
                </ul>
              </div>
            </div>
          </div>

          {/* More Internal Links */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-indigo-900 mb-3">Related Tools for Electricians</h3>
            <p className="text-sm text-indigo-800 mb-4">
              After calculating load, you'll need to size your cables correctly. Use our <Link to="/cable-sizing-calculator" className="text-indigo-600 font-semibold hover:underline">cable sizing calculator</Link> with full derating factors, then verify <Link to="/voltage-drop-calculator" className="text-indigo-600 font-semibold hover:underline">voltage drop</Link> for longer runs. For containment, check our <Link to="/conduit-fill-calculator" className="text-indigo-600 font-semibold hover:underline">conduit fill calculator</Link>. See all our <Link to="/electrical-calculators" className="text-indigo-600 font-semibold hover:underline">electrical calculators</Link>.
            </p>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
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

          {/* Lead Capture Form */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Need a consumer unit upgrade, rewire, or new installation? Tell us about your project and we'll connect you with qualified electricians in your area.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ElectricalLoadCalculator" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Electrical Load Calculator Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Electrical contractor?</strong> Join our network - we refer qualified leads for consumer unit upgrades, rewires, and new installations.
              </p>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/cable-sizing-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Cable Sizing Calculator</h3>
                <p className="text-sm text-blue-700">BS 7671 compliant cable sizing with all derating factors</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Verify voltage drop compliance for long cable runs</p>
              </Link>
              <Link to="/conduit-fill-calculator" className="block p-4 bg-gradient-to-br from-slate-50 to-gray-100 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-900 mb-1">Conduit Fill Calculator</h3>
                <p className="text-sm text-slate-700">Calculate cable capacity for conduit and trunking</p>
              </Link>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Cable sizing, voltage drop, conduit fill and 50+ use-case calculators. All BS 7671 compliant.</p>
            <Link to="/electrical-calculators" className="bg-white text-indigo-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Electrical Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
