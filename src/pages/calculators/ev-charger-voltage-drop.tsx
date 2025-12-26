import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, AlertCircle, ChevronDown, ChevronUp, Zap, Car } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../components/VoltageDropCalculatorCore'

export default function EVChargerVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What cable size do I need for a 7kW EV charger?',
      a: 'A 7kW charger draws 32A continuously. For runs up to 20m, 6mm² (7.3 mV/A/m) gives: (7.3 × 32 × 20) ÷ 1000 = 4.67V (2.03%) ✓. For longer runs (25m+), consider 10mm² (4.4 mV/A/m) for better margin.'
    },
    {
      q: 'What cable size for a 22kW three-phase EV charger?',
      a: 'A 22kW charger draws 32A per phase. Three-phase calculations use the 0.866 factor. For 20m with 6mm²: (7.3 × 32 × 20 × 0.866) ÷ 1000 = 4.04V (1.01% on 400V) ✓. Three-phase has lower percentage drop.'
    },
    {
      q: 'Does voltage drop affect EV charging speed?',
      a: 'Yes. If voltage drops too low, some chargers reduce output power to protect themselves. Smart chargers may throttle from 7kW to 6kW or less. Keeping voltage drop under 3% ensures full charging speed.'
    },
    {
      q: 'Can I use the existing ring main for an EV charger?',
      a: 'No. EV chargers need a dedicated circuit from the consumer unit. A 32A charger drawing continuously would overload a ring main designed for intermittent socket loads. BS 7671 requires a dedicated radial circuit.'
    },
    {
      q: 'What about the OZEV grant for home charger installation?',
      a: 'The OZEV (formerly OLEV) grant provides up to £350 towards installation costs for eligible properties. The charger must be smart-enabled with off-peak charging capability. Check gov.uk for current eligibility criteria.'
    },
    {
      q: 'Do I need a separate consumer unit for an EV charger?',
      a: 'Not usually. Most domestic installations can accommodate a new 40A MCB for the EV circuit. However, if your existing CU is full or has insufficient spare capacity, a separate enclosure may be needed.'
    },
    {
      q: 'What MCB rating for an EV charger circuit?',
      a: 'Use a 40A Type B or C MCB for a 32A charger. The 40A rating provides the required 125% continuous load capacity (32A × 1.25 = 40A). Some installations use 32A MCB if diversity can be demonstrated.'
    },
    {
      q: 'Can I install an EV charger myself?',
      a: 'No. EV charger installation is notifiable work under Part P Building Regulations. It must be done by a registered electrician (NICEIC, NAPIT, etc.) who can self-certify the work and provide an electrical installation certificate.'
    },
    {
      q: 'How far can I run cable to a driveway charger?',
      a: 'With 6mm² cable at 32A, you can run approximately 30m before hitting 3% drop: (7.3 × 32 × 30) ÷ 1000 = 7.01V (3.05%). For longer runs, use 10mm² which allows 50m+: (4.4 × 32 × 50) = 7.04V (3.06%).'
    },
    {
      q: 'What earthing arrangement is required for EV chargers?',
      a: 'Most EV chargers require PME earthing to be confirmed safe or a separate earth electrode installed. The charger manufacturer specifies requirements. Some chargers have built-in earth fault protection.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>EV Charger Voltage Drop Calculator UK | 7kW & 22kW | BS 7671 | TradeCalcs</title>
        <meta name="description" content="Free voltage drop calculator for EV charger installations. Check BS 7671 compliance for 7kW and 22kW home charging using official Table 4D1B mV/A/m values." />
        <meta name="keywords" content="EV charger voltage drop, electric vehicle charger cable size, 7kW charger installation, 22kW charger, BS 7671 EV charging, home charger cable" />
        <link rel="canonical" href="https://tradecalcs.co.uk/calculators/voltage-drop/ev-charger" />
        
        <meta property="og:title" content="EV Charger Voltage Drop Calculator | 7kW & 22kW | TradeCalcs" />
        <meta property="og:description" content="Calculate voltage drop for EV charger installations. BS 7671 Table 4D1B compliant." />
        <meta property="og:url" content="https://tradecalcs.co.uk/calculators/voltage-drop/ev-charger" />
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
                  { '@type': 'ListItem', position: 3, name: 'EV Charger', item: 'https://tradecalcs.co.uk/calculators/voltage-drop/ev-charger' }
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
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <Car className="w-8 h-8" />
              <Zap className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">EV Charger Voltage Drop Calculator</h1>
            <p className="text-lg opacity-95">Check voltage drop compliance for 7kW and 22kW EV charger installations using BS 7671 Table 4D1B</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Quick Facts */}
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-green-900 mb-3">Key Facts: EV Charger Circuits</h2>
            <ul className="space-y-2 text-sm text-green-900">
              <li>• 7kW charger draws 32A continuously - requires dedicated radial circuit</li>
              <li>• 22kW three-phase draws 32A per phase - uses 0.866 factor for voltage drop</li>
              <li>• Voltage drop affects charging speed - smart chargers may throttle if voltage low</li>
              <li>• Standard cable: 6mm² (7.3 mV/A/m) for short runs, 10mm² (4.4 mV/A/m) for longer</li>
              <li>• Part P notifiable - must be installed by registered electrician</li>
            </ul>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="bg-green-600 text-white rounded-t-lg p-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <h2 className="text-lg font-bold">EV Charger Voltage Drop Calculator</h2>
              </div>
              <p className="text-sm opacity-90">BS 7671 Table 4D1B mV/A/m method</p>
            </div>
            <VoltageDropCalculatorCore
              defaultCableSize="6"
              defaultLength="20"
              defaultCurrent="32"
              defaultCircuitType="power"
              defaultPhase="single"
            />
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-2">Need an EV Charger Installed?</h3>
            <p className="mb-4 opacity-90">Get quotes from OZEV-approved installers in your area</p>
            <a href="#get-quotes" className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
              Get Free Quotes
            </a>
          </div>

          {/* Common Scenarios */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common EV Charger Scenarios</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-gray-900">7kW charger - short driveway (10-15m)</h3>
                  <p className="text-sm text-gray-600">32A with 6mm² (7.3 mV/A/m). At 15m: (7.3 × 32 × 15) ÷ 1000 = 3.50V (1.52%) ✓ Excellent margin</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-gray-900">7kW charger - long driveway (25-30m)</h3>
                  <p className="text-sm text-gray-600">32A with 10mm² (4.4 mV/A/m). At 30m: (4.4 × 32 × 30) ÷ 1000 = 4.22V (1.84%) ✓ Good margin</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-gray-900">22kW three-phase charger (20m)</h3>
                  <p className="text-sm text-gray-600">32A per phase with 6mm². (7.3 × 32 × 20 × 0.866) ÷ 1000 = 4.04V (1.01% on 400V) ✓ Three-phase advantage</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-gray-900">Charger in detached garage (40m)</h3>
                  <p className="text-sm text-gray-600">32A with 10mm² SWA. At 40m: (4.4 × 32 × 40) ÷ 1000 = 5.63V (2.45%) ✓ Still good</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-green-100 text-green-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">5</div>
                <div>
                  <h3 className="font-bold text-gray-900">Workplace charger - long run (50m+)</h3>
                  <p className="text-sm text-gray-600">32A with 16mm² (2.8 mV/A/m). At 60m: (2.8 × 32 × 60) ÷ 1000 = 5.38V (2.34%) ✓</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-3">Related Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/cable-sizing-calculator" className="block p-3 bg-white rounded-lg hover:shadow-md transition">
                <h4 className="font-semibold text-purple-800">Cable Sizing Calculator</h4>
                <p className="text-sm text-gray-600">Size cables for current capacity</p>
              </Link>
              <Link to="/calculators/voltage-drop/submain-outbuilding" className="block p-3 bg-white rounded-lg hover:shadow-md transition">
                <h4 className="font-semibold text-purple-800">Submain Calculator</h4>
                <p className="text-sm text-gray-600">Outbuilding power supplies</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-3 bg-white rounded-lg hover:shadow-md transition">
                <h4 className="font-semibold text-purple-800">General Voltage Drop</h4>
                <p className="text-sm text-gray-600">All circuit types</p>
              </Link>
            </div>
          </div>

          {/* Understanding Section */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Understanding EV Charger Voltage Drop</h2>
            <p className="text-gray-700 mb-4">
              EV chargers draw high current continuously for extended periods - often 4-8 hours overnight. Unlike intermittent loads, this sustained draw means voltage drop is a critical design factor. Smart chargers monitor incoming voltage and may reduce charging power if it drops too low.
            </p>
            <p className="text-gray-700">
              Using BS 7671 Table 4D1B mV/A/m values at 70°C operating temperature gives accurate results for cables under sustained load. This is more conservative than 20°C resistance values and reflects real-world conditions.
            </p>
          </div>

          {/* Cost Estimates */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">EV Charger Installation Costs (2024)</h2>
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
                  <tr><td className="px-4 py-2">Simple install - charger near CU</td><td className="px-4 py-2">£400-600</td><td className="px-4 py-2">£200-300</td><td className="px-4 py-2 font-semibold">£600-900</td></tr>
                  <tr><td className="px-4 py-2">Standard install (15-25m run)</td><td className="px-4 py-2">£500-800</td><td className="px-4 py-2">£300-450</td><td className="px-4 py-2 font-semibold">£800-1250</td></tr>
                  <tr><td className="px-4 py-2">Long run to garage (30m+)</td><td className="px-4 py-2">£700-1100</td><td className="px-4 py-2">£400-600</td><td className="px-4 py-2 font-semibold">£1100-1700</td></tr>
                  <tr><td className="px-4 py-2">Three-phase 22kW installation</td><td className="px-4 py-2">£1200-2000</td><td className="px-4 py-2">£500-800</td><td className="px-4 py-2 font-semibold">£1700-2800</td></tr>
                  <tr><td className="px-4 py-2">CU upgrade required</td><td className="px-4 py-2">+£300-600</td><td className="px-4 py-2">+£200-400</td><td className="px-4 py-2 font-semibold">+£500-1000</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">Note: OZEV grant may cover up to £350 for eligible installations</p>
          </div>

          {/* Why It Matters */}
          <div className="border-l-4 border-green-500 bg-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why EV Charger Voltage Drop Matters</h2>
            <p className="text-gray-700">
              Unlike typical domestic loads, EV chargers draw their rated current continuously for hours. A 7kW charger pulling 32A for 6 hours generates significant heat in the cable. Smart chargers actively monitor voltage and reduce power output if it drops below acceptable levels - meaning you might only get 5-6kW from a 7kW charger if voltage drop is excessive. Proper cable sizing ensures you get the full charging speed you paid for.
            </p>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-900">Important: PME Earthing Considerations</h3>
                <p className="text-sm text-amber-800">Most UK supplies use PME (Protective Multiple Earthing). Some EV charger manufacturers require additional earth electrodes or specific protective devices for PME supplies. Check manufacturer requirements and consult a qualified electrician.</p>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Get EV Charger Installation Quotes</h3>
            <p className="text-gray-600 text-center mb-6">Connect with OZEV-approved installers in your area</p>
            <div className="max-w-2xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=EVChargerVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="Get quotes for EV charger installation"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-green-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Explore More Electrical Calculators</h2>
            <p className="mb-6 opacity-90">Professional tools for UK electricians - all free, all BS 7671 compliant</p>
            <Link to="/" className="inline-block bg-white text-green-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
