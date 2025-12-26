import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Home } from 'lucide-react'
import { useState } from 'react'
import { VoltageDropCalculatorCore } from '../../components/VoltageDropCalculatorCore'

export default function SubmainOutbuildingVoltageDrop() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What is the maximum voltage drop allowed for a submain to an outbuilding?',
      a: 'BS 7671 allows 5% total voltage drop from the origin (meter) to the furthest point. This must include the submain AND final circuits in the outbuilding. Many electricians allocate 3% to the submain, leaving 2% for final circuits, but you can split it however you need.'
    },
    {
      q: 'What cable size do I need for a 30m submain to a garden office?',
      a: 'For a typical 32A supply over 30m, 10mm² SWA (4.4 mV/A/m) gives: (4.4 × 32 × 30) ÷ 1000 = 4.22V (1.84%) - well within limits. For 40A or longer runs, 16mm² (2.8 mV/A/m) may be needed. Our calculator checks your specific scenario.'
    },
    {
      q: 'Does voltage drop matter more than current capacity for submains?',
      a: 'Often yes. A 10mm² cable can carry 64A but over very long runs may still need upsizing for voltage drop. At 32A over 50m with 10mm² = 7.04V (3.06%), leaving less headroom for final circuits. Always check both factors.'
    },
    {
      q: 'How do I calculate combined voltage drop for submain plus final circuits?',
      a: 'Add the voltage drops as percentages. If your submain drops 2% and the ring final in the outbuilding drops 1.5%, total is 3.5% - well within the 5% limit. Plan your submain to leave headroom for final circuits.'
    },
    {
      q: 'Should I use SWA or armoured cable for outbuilding submains?',
      a: 'SWA (Steel Wire Armoured) cable is standard for buried or external submains. It provides mechanical protection and the armour can serve as the CPC. For above-ground routes in conduit, standard cable may be acceptable but SWA is generally preferred.'
    },
    {
      q: 'What size consumer unit do I need in an outbuilding?',
      a: 'Depends on circuits required. A garden office might need 4-6 ways (lighting, sockets, heating). A workshop might need 8+ ways for power tools. A granny annexe needs full domestic provision. Always allow spare ways for future additions.'
    },
    {
      q: 'Do I need RCD protection for outbuilding circuits?',
      a: 'Yes. BS 7671 requires RCD protection for circuits in locations with increased risk - outbuildings qualify. A Type A 30mA RCD is minimum. The outbuilding consumer unit typically has its own RCD protection independent of the house.'
    },
    {
      q: 'Can I run a submain overhead instead of buried?',
      a: 'Yes, but it requires proper overhead cable rated for external use, adequate height clearance (minimum 3.5m over driveways, 5.2m over roads), and weather-resistant connections. Underground in duct is often simpler and neater.'
    },
    {
      q: 'What depth should I bury SWA cable to an outbuilding?',
      a: 'Minimum 450mm under grass/garden, 600mm under driveways or areas where vehicles might pass. Use warning tape 150mm above the cable. Route along boundaries where possible to reduce future disturbance risk.'
    },
    {
      q: 'Do I need Part P notification for an outbuilding electrical supply?',
      a: 'Yes. New circuits in outbuildings are notifiable work under Part P Building Regulations. A registered electrician (NICEIC, NAPIT, etc.) can self-certify, or you can use building control for inspection.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Submain Voltage Drop Calculator UK | Garden Office, Garage, Workshop | BS 7671 | TradeCalcs</title>
        <meta name="description" content="Free voltage drop calculator for submains to outbuildings. Check BS 7671 compliance for garden offices, garages, workshops using official Table 4D1B mV/A/m values." />
        <meta name="keywords" content="submain voltage drop calculator, outbuilding electrical supply, garden office electrics, garage power supply, SWA cable calculator, BS 7671 submain" />
        <link rel="canonical" href="https://tradecalcs.co.uk/calculators/voltage-drop/submain-outbuilding" />
        
        <meta property="og:title" content="Submain Voltage Drop Calculator | Garden Office & Outbuilding | TradeCalcs" />
        <meta property="og:description" content="Calculate voltage drop for submains to outbuildings. BS 7671 Table 4D1B compliant." />
        <meta property="og:url" content="https://tradecalcs.co.uk/calculators/voltage-drop/submain-outbuilding" />
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
                  { '@type': 'ListItem', position: 3, name: 'Submain to Outbuilding', item: 'https://tradecalcs.co.uk/calculators/voltage-drop/submain-outbuilding' }
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
        <div className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <Home className="w-8 h-8" />
              <Zap className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Submain Voltage Drop Calculator for Outbuildings</h1>
            <p className="text-lg opacity-95">Check voltage drop compliance for submain cables to garden offices, garages, workshops, and outbuildings using BS 7671 Table 4D1B</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Quick Facts */}
          <div className="bg-cyan-50 border-l-4 border-cyan-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-cyan-900 mb-3">Key Facts: Submain Voltage Drop</h2>
            <ul className="space-y-2 text-sm text-cyan-900">
              <li>• Submains must comply with 5% voltage drop limit from origin to furthest point</li>
              <li>• Combined voltage drop (submain + final circuit) must stay under 5%</li>
              <li>• Typical submain sizes: 10mm² (4.4 mV/A/m), 16mm² (2.8 mV/A/m), 25mm² (1.75 mV/A/m)</li>
              <li>• 32A or 40A supply covers most outbuilding needs</li>
              <li>• Voltage drop often determines cable size, not current capacity</li>
            </ul>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="bg-cyan-600 text-white rounded-t-lg p-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                <h2 className="text-lg font-bold">Submain Voltage Drop Calculator</h2>
              </div>
              <p className="text-sm opacity-90">BS 7671 Table 4D1B mV/A/m method</p>
            </div>
            <VoltageDropCalculatorCore
              defaultCableSize="10"
              defaultLength="25"
              defaultCurrent="32"
              defaultCircuitType="power"
              defaultPhase="single"
            />
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-2">Need a Professional Quote?</h3>
            <p className="mb-4 opacity-90">Get quotes from qualified electricians for your outbuilding installation</p>
            <a href="#get-quotes" className="inline-block bg-white text-purple-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
              Get Free Quotes
            </a>
          </div>

          {/* Common Scenarios */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Submain Scenarios</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-cyan-100 text-cyan-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-gray-900">Garden office (20-30m from house)</h3>
                  <p className="text-sm text-gray-600">32A submain with 10mm² SWA. At 25m: (4.4 × 32 × 25) ÷ 1000 = 3.52V (1.53%) ✓</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-cyan-100 text-cyan-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-gray-900">Detached garage/workshop (30-40m)</h3>
                  <p className="text-sm text-gray-600">32A or 40A with 10mm² or 16mm². 40A at 35m with 16mm²: (2.8 × 40 × 35) ÷ 1000 = 3.92V (1.70%) ✓</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-cyan-100 text-cyan-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-gray-900">Granny annexe/self-contained unit</h3>
                  <p className="text-sm text-gray-600">63A submain with 16mm² or 25mm² SWA. 63A at 30m with 25mm²: (1.75 × 63 × 30) ÷ 1000 = 3.31V (1.44%) ✓</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-cyan-100 text-cyan-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-gray-900">Shed with lighting and sockets</h3>
                  <p className="text-sm text-gray-600">16A or 20A radial with 4mm² or 6mm² SWA. 16A at 20m with 4mm²: (11 × 16 × 20) ÷ 1000 = 3.52V (1.53%) ✓</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-cyan-100 text-cyan-700 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">5</div>
                <div>
                  <h3 className="font-bold text-gray-900">Agricultural building (100m+)</h3>
                  <p className="text-sm text-gray-600">Consider three-phase or 25mm²+ single-phase. 63A at 100m with 25mm²: (1.75 × 63 × 100) ÷ 1000 = 11.03V (4.79%) - just compliant</p>
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
              <Link to="/calculators/voltage-drop/ev-charger" className="block p-3 bg-white rounded-lg hover:shadow-md transition">
                <h4 className="font-semibold text-purple-800">EV Charger Voltage Drop</h4>
                <p className="text-sm text-gray-600">Home charging installations</p>
              </Link>
              <Link to="/calculators/voltage-drop/garden-lighting" className="block p-3 bg-white rounded-lg hover:shadow-md transition">
                <h4 className="font-semibold text-purple-800">Garden Lighting</h4>
                <p className="text-sm text-gray-600">Outdoor lighting circuits</p>
              </Link>
            </div>
          </div>

          {/* Understanding Section */}
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Understanding Submain Voltage Drop</h2>
            <p className="text-gray-700 mb-4">
              Submain voltage drop is the reduction in voltage along the cable feeding an outbuilding from your main consumer unit. BS 7671 limits total voltage drop to 5% for power circuits (11.5V on 230V supply). This includes both the submain AND any final circuits in the outbuilding.
            </p>
            <p className="text-gray-700">
              Long cable runs require larger conductors to keep voltage drop within limits - often this determines cable size rather than current capacity. Using BS 7671 Table 4D1B mV/A/m values ensures accurate calculations.
            </p>
          </div>

          {/* Cost Estimates */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Submain Installation Costs (2024)</h2>
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
                  <tr><td className="px-4 py-2">Short run submain (&lt;15m)</td><td className="px-4 py-2">£180-300</td><td className="px-4 py-2">£250-350</td><td className="px-4 py-2 font-semibold">£430-650</td></tr>
                  <tr><td className="px-4 py-2">Medium run (15-30m) 10mm² SWA</td><td className="px-4 py-2">£300-500</td><td className="px-4 py-2">£350-500</td><td className="px-4 py-2 font-semibold">£650-1000</td></tr>
                  <tr><td className="px-4 py-2">Long run (30-50m) 16mm² SWA</td><td className="px-4 py-2">£500-800</td><td className="px-4 py-2">£450-600</td><td className="px-4 py-2 font-semibold">£950-1400</td></tr>
                  <tr><td className="px-4 py-2">Very long run (50m+) 25mm² SWA</td><td className="px-4 py-2">£700-1200</td><td className="px-4 py-2">£500-750</td><td className="px-4 py-2 font-semibold">£1200-1950</td></tr>
                  <tr><td className="px-4 py-2">Consumer unit in outbuilding</td><td className="px-4 py-2">£150-350</td><td className="px-4 py-2">£200-350</td><td className="px-4 py-2 font-semibold">£350-700</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="border-l-4 border-cyan-500 bg-white rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why Submain Voltage Drop Matters</h2>
            <p className="text-gray-700">
              Excessive voltage drop causes equipment problems: motors run hot and inefficient, lights dim noticeably, and sensitive electronics may malfunction. For outbuildings with power tools, EV chargers, or workshop equipment, adequate voltage is essential for proper operation. Voltage drop compounds - if your submain uses 3% of the allowance, final circuits only have 2% remaining.
            </p>
          </div>

          {/* Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-amber-900">Important: Part P Notification Required</h3>
                <p className="text-sm text-amber-800">New circuits in outbuildings are notifiable work under Part P Building Regulations. A registered electrician (NICEIC, NAPIT, etc.) can self-certify, or you can use building control for inspection.</p>
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
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">Get Quotes for Your Outbuilding Installation</h3>
            <p className="text-gray-600 text-center mb-6">Connect with qualified electricians in your area</p>
            <div className="max-w-2xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=SubmainOutbuildingVoltageDrop" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="Get quotes for outbuilding electrical installation"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-cyan-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Explore More Electrical Calculators</h2>
            <p className="mb-6 opacity-90">Professional tools for UK electricians - all free, all BS 7671 compliant</p>
            <Link to="/" className="inline-block bg-white text-cyan-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
