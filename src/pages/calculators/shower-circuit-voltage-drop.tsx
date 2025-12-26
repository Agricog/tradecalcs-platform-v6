import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, AlertCircle, ChevronDown, ChevronUp, Zap, Droplets } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../components/VoltageDropCalculatorCore'

export default function ShowerCircuitVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What cable size do I need for a 10.5kW electric shower?',
      a: 'A 10.5kW shower draws 46A at 230V. For a typical 12-15m run, 10mm² (4.4 mV/A/m) is standard: (4.4 × 46 × 15) ÷ 1000 = 3.04V (1.32%) ✓. For longer runs (20m+), consider 16mm² for extra margin.'
    },
    {
      q: 'Can I use 6mm² cable for an electric shower?',
      a: '6mm² is only suitable for showers up to 9kW (39A) on short runs. For a 9kW shower at 12m: (7.3 × 39 × 12) ÷ 1000 = 3.42V (1.49%) ✓. For 10.5kW showers, always use 10mm² minimum.'
    },
    {
      q: 'Does voltage drop affect shower water temperature?',
      a: 'Yes. Electric showers heat water on demand - if voltage drops, heating element power reduces proportionally. At 5% voltage drop, you lose roughly 10% of heating power. This can mean noticeably cooler water or reduced flow rate.'
    },
    {
      q: 'What MCB size for a 10.5kW shower?',
      a: 'Use a 45A or 50A Type B MCB. The 10.5kW shower draws 46A, so a 45A MCB provides close protection while a 50A allows slight margin. Never use a 40A MCB - it will trip under normal operation.'
    },
    {
      q: 'Can I upgrade from 8.5kW to 10.5kW on existing cable?',
      a: 'Check the existing cable size. If you have 10mm², you can usually upgrade as 10mm² handles 46A. If you have 6mm², it must be replaced - 6mm² is only rated for ~40A and will overheat with 46A draw.'
    },
    {
      q: 'Why do showers often trip the MCB?',
      a: 'Common causes: undersized cable causing voltage drop and higher current, undersized MCB (40A instead of 45A), or faulty heating element drawing excessive current. Check cable size and MCB rating match the shower kW.'
    },
    {
      q: 'Do electric showers need RCD protection?',
      a: 'Yes. BS 7671 requires 30mA RCD protection for bathroom circuits. Most modern consumer units have this built-in. Showers should also have a local isolator switch within reach of the shower position.'
    },
    {
      q: 'What is the minimum cable size for any electric shower?',
      a: '6mm² is the absolute minimum for basic 7-8kW showers on very short runs (<10m). For most installations, 10mm² is recommended as standard - it covers all common shower ratings up to 10.5kW with margin.'
    },
    {
      q: 'How does cable route length affect shower installation?',
      a: 'The cable run is measured from consumer unit to shower, following the actual cable route (not straight line). Runs through lofts, along walls, and behind bath panels add up. A bathroom directly above the CU might only be 8m; a loft conversion could be 20m+.'
    },
    {
      q: 'Should I use 10mm² even for an 8.5kW shower?',
      a: 'Yes, it is good practice. 10mm² provides headroom for future shower upgrades, lower voltage drop (better performance), cooler cable operation, and compliance margin. The extra cable cost is minimal compared to re-cabling later.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Shower Circuit Voltage Drop Calculator UK | 8.5kW 9.5kW 10.5kW | BS 7671 | TradeCalcs</title>
        <meta name="description" content="Free voltage drop calculator for electric shower circuits. Check BS 7671 compliance for 8.5kW, 9.5kW, and 10.5kW showers using official Table 4D1B mV/A/m values." />
        <meta name="keywords" content="shower voltage drop calculator, electric shower cable size, 10.5kW shower cable, shower circuit MCB, BS 7671 shower circuit" />
        <link rel="canonical" href="https://tradecalcs.co.uk/calculators/voltage-drop/shower-circuit" />
        
        <meta property="og:title" content="Shower Circuit Voltage Drop Calculator | Electric Showers | TradeCalcs" />
        <meta property="og:description" content="Calculate voltage drop for electric shower circuits. BS 7671 Table 4D1B compliant." />
        <meta property="og:url" content="https://tradecalcs.co.uk/calculators/voltage-drop/shower-circuit" />
        <meta property="og:type" content="website" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', position: 2, name: 'Voltage Drop Calculator', item: 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                  { '@type': 'ListItem', position: 3, name: 'Shower Circuit', item: 'https://tradecalcs.co.uk/calculators/voltage-drop/shower-circuit' }
                ]
              },
              {
                '@type': 'FAQPage',
                'mainEntity': faqs.map(faq => ({
                  '@type': 'Question',
                  'name': faq.q,
                  'acceptedAnswer': { '@type': 'Answer', 'text': faq.a }
                }))
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        {/* Back Navigation */}
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link to="/voltage-drop-calculator" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <Droplets className="w-8 h-8" />
              <Zap className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Shower Circuit Voltage Drop Calculator</h1>
            <p className="text-lg opacity-95">Check voltage drop compliance for 8.5kW, 9.5kW, and 10.5kW electric showers using BS 7671 Table 4D1B</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Quick Facts */}
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-blue-900 mb-3">Key Facts: Electric Shower Circuits</h2>
            <ul className="space-y-2 text-sm text-blue-900">
              <li>• 8.5kW = 37A, 9.5kW = 41A, 10.5kW = 46A (at 230V)</li>
              <li>• 10mm² (4.4 mV/A/m) is standard for most shower installations</li>
              <li>• 6mm² (7.3 mV/A/m) only for showers ≤9kW on short runs (&lt;12m)</li>
              <li>• Voltage drop directly affects water temperature</li>
              <li>• 45A or 50A MCB for 10.5kW showers</li>
            </ul>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="bg-blue-600 text-white rounded-t-lg p-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <h2 className="text-lg font-bold">Shower Circuit Voltage Drop Calculator</h2>
              </div>
              <p className="text-sm opacity-90">BS 7671 Table 4D1B mV/A/m method</p>
            </div>
            <VoltageDropCalculatorCore
              defaultCableSize="10"
              defaultLength="15"
              defaultCurrent="46"
              defaultCircuitType="power"
              defaultPhase="single"
            />
          </div>

          {/* Shower Rating Quick Reference */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Shower Rating Quick Reference</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="px-4 py-2 text-left">Shower Rating</th>
                    <th className="px-4 py-2 text-left">Current Draw</th>
                    <th className="px-4 py-2 text-left">Min Cable</th>
                    <th className="px-4 py-2 text-left">MCB Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-4 py-2">7.5kW</td><td className="px-4 py-2">33A</td><td className="px-4 py-2">6mm²</td><td className="px-4 py-2">40A</td></tr>
                  <tr><td className="px-4 py-2">8.5kW</td><td className="px-4 py-2">37A</td><td className="px-4 py-2">6mm² (short) / 10mm²</td><td className="px-4 py-2">40A</td></tr>
                  <tr><td className="px-4 py-2">9.5kW</td><td className="px-4 py-2">41A</td><td className="px-4 py-2">10mm²</td><td className="px-4 py-2">45A</td></tr>
                  <tr className="bg-blue-50"><td className="px-4 py-2 font-semibold">10.5kW</td><td className="px-4 py-2 font-semibold">46A</td><td className="px-4 py-2 font-semibold">10mm²</td><td className="px-4 py-2 font-semibold">45A/50A</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-2">Need a Shower Circuit Installed?</h3>
            <p className="mb-4 opacity-90">Get quotes from qualified electricians in your area</p>
            <a href="#get-quotes" className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
              Get Free Quotes
            </a>
          </div>

          {/* Common Scenarios */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Shower Circuit Scenarios</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 text-blue-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-gray-900">10.5kW shower - typical bathroom (12-15m run)</h3>
                  <p className="text-sm text-gray-600">46A with 10mm² (4.4 mV/A/m): (4.4 × 46 × 15) ÷ 1000 = 3.04V (1.32%) ✓ Excellent margin</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 text-blue-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-gray-900">10.5kW shower - loft conversion (20m run)</h3>
                  <p className="text-sm text-gray-600">46A with 10mm²: (4.4 × 46 × 20) ÷ 1000 = 4.05V (1.76%) ✓ Still good</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 text-blue-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-gray-900">9.5kW shower - short run (10m)</h3>
                  <p className="text-sm text-gray-600">41A with 6mm² (7.3 mV/A/m): (7.3 × 41 × 10) ÷ 1000 = 2.99V (1.30%) ✓ 6mm² just acceptable</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 text-blue-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-gray-900">8.5kW shower - budget option (12m)</h3>
                  <p className="text-sm text-gray-600">37A with 6mm²: (7.3 × 37 × 12) ÷ 1000 = 3.24V (1.41%) ✓ Works but 10mm² better for upgrades</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-blue-100 text-blue-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">5</div>
                <div>
                  <h3 className="font-bold text-gray-900">Problem: 10.5kW on 6mm² at 15m</h3>
                  <p className="text-sm text-gray-600 text-red-700">46A with 6mm²: (7.3 × 46 × 15) ÷ 1000 = 5.04V (2.19%) - voltage OK but cable undersized for current!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-3">Related Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/calculators/voltage-drop/cooker-circuit" className="block p-3 bg-white rounded-lg hover:shadow-md transition">
                <h4 className="font-semibold text-purple-800">Cooker Circuit</h4>
                <p className="text-sm text-gray-600">Electric oven and hob circuits</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-3 bg-white rounded-lg hover:shadow-md transition">
                <h4 className="font-semibold text-purple-800">General Voltage Drop</h4>
                <p className="text-sm text-gray-600">All circuit types</p>
              </Link>
              <Link to="/cable-sizing-calculator" className="block p-3 bg-white rounded-lg hover:shadow-md transition">
                <h4 className="font-semibold text-purple-800">Cable Sizing</h4>
                <p className="text-sm text-gray-600">Current capacity selection</p>
              </Link>
            </div>
          </div>

          {/* Understanding Section */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Understanding Shower Circuit Voltage Drop</h2>
            <p className="text-gray-700 mb-4">
              Electric showers are instantaneous water heaters - they heat cold water to showering temperature in seconds. This requires very high power (8.5-10.5kW typically) and draws substantial current (37-46A). Unlike storage water heaters, showers can't store heat, so any reduction in voltage directly reduces heating capacity.
            </p>
            <p className="text-gray-700">
              The mV/A/m method from BS 7671 Table 4D1B calculates voltage drop at 70°C cable operating temperature - realistic for a shower circuit running at near-full capacity for 10-15 minutes.
            </p>
          </div>

          {/* Cost Estimates */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Shower Circuit Installation Costs (2024)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Scenario</th>
                    <th className="px-4 py-2 text-left">Materials</th>
                    <th className="px-4 py-2 text-left">Labour</th>
                    <th className="px-4 py-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-4 py-2">Simple replacement (same location)</td><td className="px-4 py-2">£80-150</td><td className="px-4 py-2">£100-180</td><td className="px-4 py-2 font-semibold">£180-330</td></tr>
                  <tr><td className="px-4 py-2">New circuit - short run (&lt;12m)</td><td className="px-4 py-2">£120-200</td><td className="px-4 py-2">£200-350</td><td className="px-4 py-2 font-semibold">£320-550</td></tr>
                  <tr><td className="px-4 py-2">New circuit - long run (12-20m)</td><td className="px-4 py-2">£180-300</td><td className="px-4 py-2">£300-450</td><td className="px-4 py-2 font-semibold">£480-750</td></tr>
                  <tr><td className="px-4 py-2">Loft conversion shower</td><td className="px-4 py-2">£250-400</td><td className="px-4 py-2">£400-600</td><td className="px-4 py-2 font-semibold">£650-1000</td></tr>
                  <tr><td className="px-4 py-2">CU upgrade required</td><td className="px-4 py-2">+£300-600</td><td className="px-4 py-2">+£200-400</td><td className="px-4 py-2 font-semibold">+£500-1000</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">Note: Prices exclude shower unit cost (£80-400 depending on brand/features)</p>
          </div>

          {/* Why It Matters */}
          <div className="border-l-4 border-blue-500 bg-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why Shower Voltage Drop Matters</h2>
            <p className="text-gray-700">
              Electric showers are one of the highest-current domestic appliances. At 46A for 10 minutes, even small percentage voltage drops become noticeable - both in water temperature and energy waste. Undersized cables run hot, waste energy, and may trip MCBs. Properly sized cables ensure full shower performance, energy efficiency, and safe operation.
            </p>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-900">Important: Cable Size vs Current Capacity</h3>
                <p className="text-sm text-amber-800">Voltage drop compliance doesn't mean the cable is correctly sized for current. A 6mm² cable might pass voltage drop at 46A but is undersized for the current capacity. Always check both voltage drop AND current rating. For 10.5kW showers, 10mm² is the minimum regardless of voltage drop calculations.</p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <span className="font-semibold text-gray-900">{faq.q}</span>
                    {openFaq === index ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-3 text-gray-700 text-sm">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div id="get-quotes" className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Get Shower Circuit Installation Quotes</h3>
            <p className="text-gray-600 text-center mb-6">Connect with qualified electricians in your area</p>
            <div className="max-w-2xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ShowerCircuitVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="Get quotes for shower circuit installation"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Explore More Electrical Calculators</h2>
            <p className="mb-6 opacity-90">Professional tools for UK electricians - all free, all BS 7671 compliant</p>
            <Link to="/" className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
