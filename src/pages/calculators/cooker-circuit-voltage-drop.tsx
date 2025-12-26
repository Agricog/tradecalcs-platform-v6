import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, ChefHat } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../components/VoltageDropCalculatorCore'

export default function CookerCircuitVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What cable size do I need for an electric cooker?',
      a: 'Standard cookers (up to 13kW) use 6mm² cable with 32A MCB. This handles most domestic ovens and hobs. Large range cookers (14kW+) may need 10mm² with 40A or 45A MCB. Always check the appliance rating plate.'
    },
    {
      q: 'How does diversity apply to cooker circuits?',
      a: 'BS 7671 allows diversity: First 10A at 100% + remainder at 30% + 5A for socket if fitted. A 45A rated cooker becomes: 10 + (35 × 0.3) + 5 = 25.5A design current. This recognizes not all elements run simultaneously.'
    },
    {
      q: 'Can I use 4mm² cable for a cooker?',
      a: 'Only for small single ovens under 3kW (13A). Most cookers need 6mm² minimum. Never undersize cooker cables - the consequences of overheating are serious given the heat already present in cooking areas.'
    },
    {
      q: 'Do I need a cooker control unit with a socket?',
      a: 'Not required but recommended. The socket provides convenient power for small appliances. The control unit should be within 2m of the cooker and accessible without reaching over hot surfaces.'
    },
    {
      q: 'What about induction hobs - do they need larger cables?',
      a: 'Induction hobs are typically 7-11kW (30-48A rated). Standard 6mm²/32A is fine for most. Large induction hobs (11kW+) may need 10mm²/40A. Check the specific model rating - they vary significantly.'
    },
    {
      q: 'Can I connect a cooker to a 13A plug?',
      a: 'Only if the appliance is rated under 3kW (13A). Most built-in single ovens are 2.5-3kW and can use a 13A plug. Freestanding cookers and hobs almost always need hardwired connections on dedicated circuits.'
    },
    {
      q: 'Why is voltage drop less critical for cookers than showers?',
      a: 'Cookers use resistive heating elements that still work at reduced voltage (just heat slightly slower). Showers need instant heating at full power. However, excessive voltage drop still wastes energy and may trip MCBs.'
    },
    {
      q: 'What MCB type for cooker circuits?',
      a: 'Type B MCB is standard for purely resistive loads. Some modern ovens with electronic controls may benefit from Type C to handle inrush current. 32A Type B is the standard domestic cooker specification.'
    },
    {
      q: 'Do cooker circuits need RCD protection?',
      a: 'Under BS 7671:2018, all circuits in domestic premises should have RCD protection. The cooker circuit should be on a 30mA RCD. Some argue fixed equipment exemption applies, but best practice is RCD protection.'
    },
    {
      q: 'Can I run two cookers from one circuit?',
      a: 'Generally no. Each cooker should have its own dedicated circuit from the consumer unit. The only exception might be a small oven and separate hob if combined rating is under 13kW and correctly diversified.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Cooker Circuit Voltage Drop Calculator UK | Electric Oven & Hob | BS 7671 | TradeCalcs</title>
        <meta name="description" content="Free voltage drop calculator for cooker circuits. Check BS 7671 compliance for electric ovens, hobs, and range cookers using official Table 4D1B mV/A/m values." />
        <meta name="keywords" content="cooker circuit voltage drop, electric cooker cable size, oven circuit calculator, hob cable size, BS 7671 cooker circuit, range cooker electrics" />
        <link rel="canonical" href="https://tradecalcs.co.uk/calculators/voltage-drop/cooker-circuit" />
        
        <meta property="og:title" content="Cooker Circuit Voltage Drop Calculator | Electric Oven & Hob | TradeCalcs" />
        <meta property="og:description" content="Calculate voltage drop for cooker circuits. BS 7671 Table 4D1B compliant with diversity calculations." />
        <meta property="og:url" content="https://tradecalcs.co.uk/calculators/voltage-drop/cooker-circuit" />
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
                  { '@type': 'ListItem', position: 3, name: 'Cooker Circuit', item: 'https://tradecalcs.co.uk/calculators/voltage-drop/cooker-circuit' }
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
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <ChefHat className="w-8 h-8" />
              <Zap className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Cooker Circuit Voltage Drop Calculator</h1>
            <p className="text-lg opacity-95">Check voltage drop compliance for electric ovens, hobs, and range cookers using BS 7671 Table 4D1B</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Quick Facts */}
          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-orange-900 mb-3">Key Facts: Cooker Circuits</h2>
            <ul className="space-y-2 text-sm text-orange-900">
              <li>• Standard domestic cooker: 6mm² cable with 32A MCB</li>
              <li>• Large range cookers (14kW+): 10mm² with 40A/45A MCB</li>
              <li>• Diversity applies: 10A + 30% of remainder + 5A for socket</li>
              <li>• 6mm² = 7.3 mV/A/m, 10mm² = 4.4 mV/A/m (Table 4D1B)</li>
              <li>• Cooker control unit should be within 2m of appliance</li>
            </ul>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="bg-orange-500 text-white rounded-t-lg p-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <h2 className="text-lg font-bold">Cooker Circuit Voltage Drop Calculator</h2>
              </div>
              <p className="text-sm opacity-90">BS 7671 Table 4D1B mV/A/m method</p>
            </div>
            <VoltageDropCalculatorCore
              defaultCableSize="6"
              defaultLength="12"
              defaultCurrent="32"
              defaultCircuitType="power"
              defaultPhase="single"
            />
          </div>

          {/* Diversity Calculator */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Cooker Diversity Quick Reference</h2>
            <p className="text-sm text-gray-600 mb-4">BS 7671 allows diversity for cooker circuits: First 10A at 100% + remainder at 30% + 5A if socket fitted</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="px-4 py-2 text-left">Cooker Rating</th>
                    <th className="px-4 py-2 text-left">Full Load Current</th>
                    <th className="px-4 py-2 text-left">With Diversity</th>
                    <th className="px-4 py-2 text-left">Recommended Cable</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr><td className="px-4 py-2">Up to 6kW</td><td className="px-4 py-2">26A</td><td className="px-4 py-2">20A</td><td className="px-4 py-2">6mm² / 32A MCB</td></tr>
                  <tr><td className="px-4 py-2">8kW (typical)</td><td className="px-4 py-2">35A</td><td className="px-4 py-2">23A</td><td className="px-4 py-2">6mm² / 32A MCB</td></tr>
                  <tr><td className="px-4 py-2">10kW</td><td className="px-4 py-2">43A</td><td className="px-4 py-2">25A</td><td className="px-4 py-2">6mm² / 32A MCB</td></tr>
                  <tr><td className="px-4 py-2">12kW</td><td className="px-4 py-2">52A</td><td className="px-4 py-2">28A</td><td className="px-4 py-2">6mm² / 32A MCB</td></tr>
                  <tr className="bg-orange-50"><td className="px-4 py-2 font-semibold">14kW+ (range)</td><td className="px-4 py-2 font-semibold">61A+</td><td className="px-4 py-2 font-semibold">30A+</td><td className="px-4 py-2 font-semibold">10mm² / 40A MCB</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-2">Need a Cooker Circuit Installed?</h3>
            <p className="mb-4 opacity-90">Get quotes from qualified electricians in your area</p>
            <a href="#get-quotes" className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
              Get Free Quotes
            </a>
          </div>

          {/* Common Scenarios */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Cooker Circuit Scenarios</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-orange-100 text-orange-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-gray-900">Standard cooker - typical kitchen (10-12m run)</h3>
                  <p className="text-sm text-gray-600">32A with 6mm² (7.3 mV/A/m): (7.3 × 32 × 12) ÷ 1000 = 2.80V (1.22%) ✓ Excellent margin</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-orange-100 text-orange-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-gray-900">Kitchen extension - longer run (18m)</h3>
                  <p className="text-sm text-gray-600">32A with 6mm²: (7.3 × 32 × 18) ÷ 1000 = 4.20V (1.83%) ✓ Still good</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-orange-100 text-orange-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-gray-900">Large range cooker (15kW) - 15m run</h3>
                  <p className="text-sm text-gray-600">45A with 10mm² (4.4 mV/A/m): (4.4 × 45 × 15) ÷ 1000 = 2.97V (1.29%) ✓ Good for range</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-orange-100 text-orange-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-gray-900">Induction hob only (7.4kW) - 10m</h3>
                  <p className="text-sm text-gray-600">32A with 6mm²: (7.3 × 32 × 10) ÷ 1000 = 2.34V (1.02%) ✓ Plenty of margin</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-orange-100 text-orange-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">5</div>
                <div>
                  <h3 className="font-bold text-gray-900">Single built-in oven (2.5kW)</h3>
                  <p className="text-sm text-gray-600">Can use 13A socket if rated &lt;3kW. No dedicated circuit needed. Check appliance instructions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-3">Related Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/calculators/voltage-drop/shower-circuit" className="block p-3 bg-white rounded-lg hover:shadow-md transition">
                <h4 className="font-semibold text-purple-800">Shower Circuit</h4>
                <p className="text-sm text-gray-600">Electric shower installations</p>
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
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Understanding Cooker Circuit Voltage Drop</h2>
            <p className="text-gray-700 mb-4">
              Cooker circuits benefit from diversity allowances because not all heating elements operate simultaneously at full power. The BS 7671 diversity formula (10A + 30% of remainder + 5A socket) recognizes this practical reality. A 10kW cooker rated at 43A might only draw 25A in typical use.
            </p>
            <p className="text-gray-700">
              When calculating voltage drop, use the design current (with diversity) for typical operation. For worst-case analysis (all elements on maximum), use the full load current. The mV/A/m method from Table 4D1B at 70°C gives accurate results.
            </p>
          </div>

          {/* Cost Estimates */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cooker Circuit Installation Costs (2024)</h2>
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
                  <tr><td className="px-4 py-2">New circuit - standard cooker</td><td className="px-4 py-2">£80-150</td><td className="px-4 py-2">£200-350</td><td className="px-4 py-2 font-semibold">£280-500</td></tr>
                  <tr><td className="px-4 py-2">Kitchen extension run (15m+)</td><td className="px-4 py-2">£120-200</td><td className="px-4 py-2">£250-400</td><td className="px-4 py-2 font-semibold">£370-600</td></tr>
                  <tr><td className="px-4 py-2">Range cooker upgrade to 10mm²</td><td className="px-4 py-2">£150-250</td><td className="px-4 py-2">£300-450</td><td className="px-4 py-2 font-semibold">£450-700</td></tr>
                  <tr><td className="px-4 py-2">Separate hob + oven circuits</td><td className="px-4 py-2">£150-250</td><td className="px-4 py-2">£350-500</td><td className="px-4 py-2 font-semibold">£500-750</td></tr>
                  <tr><td className="px-4 py-2">Cooker control unit (supply only)</td><td className="px-4 py-2">£25-60</td><td className="px-4 py-2">Included</td><td className="px-4 py-2 font-semibold">£25-60</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="border-l-4 border-orange-500 bg-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why Cooker Voltage Drop Matters Less (But Still Matters)</h2>
            <p className="text-gray-700">
              Cooker heating elements are purely resistive - they still heat at reduced voltage, just slightly slower. Unlike motor-driven appliances or electronic equipment, there's no failure risk from moderate voltage drop. However, excessive drop still wastes energy (lost as heat in cables), may cause MCB tripping at peak load, and represents poor installation practice.
            </p>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-900">Important: Induction Hob Considerations</h3>
                <p className="text-sm text-amber-800">Modern induction hobs with electronic controls may be more sensitive to voltage variations than traditional resistive cookers. They may display error codes or reduce power output if voltage drops significantly. Check manufacturer specifications for voltage tolerance.</p>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Get Cooker Circuit Installation Quotes</h3>
            <p className="text-gray-600 text-center mb-6">Connect with qualified electricians in your area</p>
            <div className="max-w-2xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=CookerCircuitVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="Get quotes for cooker circuit installation"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-orange-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Explore More Electrical Calculators</h2>
            <p className="mb-6 opacity-90">Professional tools for UK electricians - all free, all BS 7671 compliant</p>
            <Link to="/" className="inline-block bg-white text-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
