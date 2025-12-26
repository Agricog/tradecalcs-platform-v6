import { Helmet } from 'react-helmet-async'
import { ArrowLeft, AlertCircle, ChevronDown, ChevronUp, Zap, Sun } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../components/VoltageDropCalculatorCore'

export default function GardenLightingVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Why is the voltage drop limit stricter for lighting circuits?',
      a: 'BS 7671 limits lighting circuits to 3% (6.9V) versus 5% for power circuits. Lights are more visibly affected by voltage reduction - LEDs may dim, flicker, or have shortened lifespan. The stricter limit ensures consistent light output.'
    },
    {
      q: 'What cable size for garden lighting at 30m?',
      a: 'For a 6A lighting circuit at 30m, 1.5mm² (29 mV/A/m) gives: (29 × 6 × 30) ÷ 1000 = 5.22V (2.27%) ✓. For 40m+, step up to 2.5mm² (18 mV/A/m) which gives: (18 × 6 × 40) = 4.32V (1.88%) ✓.'
    },
    {
      q: 'Can I use low voltage (12V) garden lighting to avoid voltage drop issues?',
      a: 'Yes. 12V systems use a transformer near the supply, so the mains cable is short. The 12V runs can be longer without issues. However, you need heavier gauge low-voltage cable and weatherproof transformers.'
    },
    {
      q: 'How do I calculate voltage drop for multiple lights in series?',
      a: 'For daisy-chained lights, calculate the total cable length from supply to furthest light. Current drops at each light, but use the starting current for worst-case. A 6-light circuit with each light 5m apart = 30m total, use 6A (or actual total wattage ÷ 230).'
    },
    {
      q: 'What IP rating do I need for outdoor lighting cables?',
      a: 'Cable and connections need minimum IP44 for general outdoor use, IP65 for ground-level or water feature areas. SWA cable is inherently weatherproof. Use IP-rated junction boxes and glands.'
    },
    {
      q: 'Do garden lighting circuits need RCD protection?',
      a: 'Yes. BS 7671 requires 30mA RCD protection for all outdoor circuits. Use RCD protection at the consumer unit or an outdoor RCD spur if adding to an existing circuit.'
    },
    {
      q: 'Can I connect garden lights to an existing ring main?',
      a: 'For low-power LED lighting (under 100W total), you can use a fused connection unit (FCU) from a ring main. For larger installations, a dedicated lighting circuit from the CU is better practice.'
    },
    {
      q: 'What about voltage drop for festoon or string lights?',
      a: 'Festoon lights are typically low wattage LEDs. A 20m string at 0.5A: (29 × 0.5 × 20) ÷ 1000 = 0.29V (0.13%) - negligible. The supply cable to the string is more critical than the string itself.'
    },
    {
      q: 'How deep should I bury garden lighting cable?',
      a: 'Minimum 450mm burial depth, or use protective conduit at shallower depths. Route away from digging areas. Mark cable routes on plans. Consider surface-mounted conduit along fences for easier future access.'
    },
    {
      q: 'Does LED lighting have different voltage drop requirements?',
      a: 'LED drivers are sensitive to input voltage. While the 3% limit is minimum, many installers target <2% for LED circuits. Low voltage at the driver can cause dimming, flicker, or premature driver failure.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Garden Lighting Voltage Drop Calculator UK | Outdoor Lights | BS 7671 | TradeCalcs</title>
        <meta name="description" content="Free voltage drop calculator for garden and outdoor lighting. Check BS 7671 3% compliance for path lights, security lights, and landscape lighting using Table 4D1B." />
        <meta name="keywords" content="garden lighting voltage drop, outdoor lighting cable size, landscape lighting calculator, path lights voltage drop, BS 7671 lighting circuit" />
        <link rel="canonical" href="https://tradecalcs.co.uk/calculators/voltage-drop/garden-lighting" />
        
        <meta property="og:title" content="Garden Lighting Voltage Drop Calculator | Outdoor Lights | TradeCalcs" />
        <meta property="og:description" content="Calculate voltage drop for garden lighting. BS 7671 3% limit for lighting circuits." />
        <meta property="og:url" content="https://tradecalcs.co.uk/calculators/voltage-drop/garden-lighting" />
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
                  { '@type': 'ListItem', position: 3, name: 'Garden Lighting', item: 'https://tradecalcs.co.uk/calculators/voltage-drop/garden-lighting' }
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
          <a href="/voltage-drop-calculator" className="inline-flex items-center text-purple-600 hover:text-purple-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Voltage Drop Calculator
          </a>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <Sun className="w-8 h-8" />
              <Zap className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Garden Lighting Voltage Drop Calculator</h1>
            <p className="text-lg opacity-95">Check voltage drop compliance for outdoor and landscape lighting using BS 7671 Table 4D1B (3% limit for lighting)</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Quick Facts */}
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-yellow-900 mb-3">Key Facts: Garden Lighting Voltage Drop</h2>
            <ul className="space-y-2 text-sm text-yellow-900">
              <li>• <strong>STRICTER 3% limit</strong> for lighting circuits vs 5% for power (BS 7671)</li>
              <li>• LEDs are sensitive to voltage - many installers target &lt;2% for LED circuits</li>
              <li>• 1.5mm² (29 mV/A/m) suitable for runs up to ~35m at 6A</li>
              <li>• 2.5mm² (18 mV/A/m) needed for longer runs (40m+)</li>
              <li>• All outdoor circuits require 30mA RCD protection</li>
            </ul>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="bg-yellow-500 text-white rounded-t-lg p-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <h2 className="text-lg font-bold">Garden Lighting Voltage Drop Calculator</h2>
              </div>
              <p className="text-sm opacity-90">BS 7671 Table 4D1B - 3% limit for lighting circuits</p>
            </div>
            <VoltageDropCalculatorCore
              defaultCableSize="1.5"
              defaultLength="30"
              defaultCurrent="6"
              defaultCircuitType="lighting"
              defaultPhase="single"
            />
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-2">Need Garden Lighting Installed?</h3>
            <p className="mb-4 opacity-90">Get quotes from qualified electricians for your outdoor lighting project</p>
            <a href="#get-quotes" className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
              Get Free Quotes
            </a>
          </div>

          {/* Common Scenarios */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Garden Lighting Scenarios</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-yellow-100 text-yellow-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-gray-900">Path lighting - 6 bollards at 5m spacing (30m total)</h3>
                  <p className="text-sm text-gray-600">6A with 1.5mm² (29 mV/A/m): (29 × 6 × 30) ÷ 1000 = 5.22V (2.27%) ✓ Within 3% limit</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-yellow-100 text-yellow-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-gray-900">Long garden run - feature light at 40m</h3>
                  <p className="text-sm text-gray-600">6A with 2.5mm² (18 mV/A/m): (18 × 6 × 40) ÷ 1000 = 4.32V (1.88%) ✓ Good margin for LEDs</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-yellow-100 text-yellow-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-gray-900">Security floodlights - 2× 30W LEDs at 20m</h3>
                  <p className="text-sm text-gray-600">Low current (~0.5A total). 1.5mm²: (29 × 0.5 × 20) ÷ 1000 = 0.29V (0.13%) ✓ Negligible drop</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-yellow-100 text-yellow-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-gray-900">Festoon lights for patio area (25m string)</h3>
                  <p className="text-sm text-gray-600">Very low current (~0.3A). 1.5mm²: (29 × 0.3 × 25) ÷ 1000 = 0.22V (0.10%) ✓ Minimal drop</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-yellow-100 text-yellow-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">5</div>
                <div>
                  <h3 className="font-bold text-gray-900">Problem case: 1.5mm² at 45m</h3>
                  <p className="text-sm text-gray-600 text-red-700">6A with 1.5mm²: (29 × 6 × 45) ÷ 1000 = 7.83V (3.40%) ✗ Exceeds 3% - use 2.5mm²</p>
                </div>
              </div>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-3">Related Calculators</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/voltage-drop/submain-outbuilding" className="block p-3 bg-white rounded-lg hover:shadow-md transition">
                <h4 className="font-semibold text-purple-800">Submain Calculator</h4>
                <p className="text-sm text-gray-600">Power to outbuildings</p>
              </a>
              <a href="/voltage-drop-calculator" className="block p-3 bg-white rounded-lg hover:shadow-md transition">
                <h4 className="font-semibold text-purple-800">General Voltage Drop</h4>
                <p className="text-sm text-gray-600">All circuit types</p>
              </a>
              <a href="/cable-sizing-calculator" className="block p-3 bg-white rounded-lg hover:shadow-md transition">
                <h4 className="font-semibold text-purple-800">Cable Sizing</h4>
                <p className="text-sm text-gray-600">Current capacity selection</p>
              </a>
            </div>
          </div>

          {/* Understanding Section */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Understanding Lighting Voltage Drop</h2>
            <p className="text-gray-700 mb-4">
              Lighting circuits have a stricter 3% voltage drop limit (6.9V at 230V) compared to the 5% for power circuits. This is because light output is directly affected by supply voltage - even a small reduction causes visible dimming.
            </p>
            <p className="text-gray-700">
              Modern LED lighting is particularly sensitive. LED drivers expect a stable input voltage and may malfunction, flicker, or fail prematurely if voltage drops too much. Many experienced installers target less than 2% voltage drop for LED circuits to ensure reliable operation.
            </p>
          </div>

          {/* Cost Estimates */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Garden Lighting Installation Costs (2024)</h2>
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
                  <tr><td className="px-4 py-2">Simple patio lights (FCU spur)</td><td className="px-4 py-2">£80-150</td><td className="px-4 py-2">£150-250</td><td className="px-4 py-2 font-semibold">£230-400</td></tr>
                  <tr><td className="px-4 py-2">Path lighting - 6 bollards</td><td className="px-4 py-2">£200-400</td><td className="px-4 py-2">£300-450</td><td className="px-4 py-2 font-semibold">£500-850</td></tr>
                  <tr><td className="px-4 py-2">Full garden scheme (10+ lights)</td><td className="px-4 py-2">£400-800</td><td className="px-4 py-2">£450-700</td><td className="px-4 py-2 font-semibold">£850-1500</td></tr>
                  <tr><td className="px-4 py-2">Security floodlights (2 lights)</td><td className="px-4 py-2">£150-300</td><td className="px-4 py-2">£200-350</td><td className="px-4 py-2 font-semibold">£350-650</td></tr>
                  <tr><td className="px-4 py-2">Low voltage transformer system</td><td className="px-4 py-2">£250-500</td><td className="px-4 py-2">£200-350</td><td className="px-4 py-2 font-semibold">£450-850</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="border-l-4 border-yellow-500 bg-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why Lighting Voltage Drop Matters More</h2>
            <p className="text-gray-700">
              Unlike power equipment which often has voltage tolerance, light output drops noticeably with voltage reduction. A 3% voltage drop means approximately 6% reduction in light output for incandescent lamps. LED drivers are designed for a specific voltage range - operating below this range causes dimming, flicker, colour shift, or driver overheating as it tries to maintain output.
            </p>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-900">Important: RCD Protection Required</h3>
                <p className="text-sm text-amber-800">All outdoor circuits require 30mA RCD protection under BS 7671. Use weatherproof IP-rated fittings and junction boxes. Buried cables need minimum 450mm depth or protective conduit.</p>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Want a Bespoke Calculator or App?</h3>
            <p className="text-gray-600 text-center mb-6">Are you a contractor or business looking for custom calculation tools, quote generators, or workflow apps built specifically for your trade?</p>
            <div className="max-w-2xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=GardenLightingVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="Bespoke app inquiry form"
                className="rounded-lg"
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>

          {/* Footer CTA */}
          <div className="bg-yellow-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Explore More Electrical Calculators</h2>
            <p className="mb-6 opacity-90">Professional tools for UK electricians - all free, all BS 7671 compliant</p>
            <a href="/" className="inline-block bg-white text-yellow-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
              View All Calculators
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
