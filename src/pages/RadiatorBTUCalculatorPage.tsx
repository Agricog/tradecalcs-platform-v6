import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, Flame, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Thermometer, Home } from 'lucide-react'
import { useState } from 'react'
import { RadiatorBTUCalculatorCore } from '../components/RadiatorBTUCalculatorCore'

export default function RadiatorBTUCalculatorPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What does BTU mean for radiators?',
      a: 'BTU stands for British Thermal Unit - it measures heat output. One BTU is the energy needed to raise 1 pound of water by 1°F. UK radiators are rated in BTU/hour at ΔT50 (the standard test condition where water is 50°C hotter than room temperature). Higher BTU = more heat output.'
    },
    {
      q: 'What is ΔT50 and why does it matter?',
      a: 'ΔT50 (Delta T 50) is the standard test condition for radiator output in the UK. It assumes a 50°C temperature difference between the average water temperature in the radiator and the room. Modern condensing boilers often run at lower temperatures (ΔT30-40), so actual output may be 30-50% less than the rated BTU. Always check your system operating temperature.'
    },
    {
      q: 'How do I measure my room for BTU calculation?',
      a: 'Measure length, width and height in metres. For L-shaped rooms, split into two rectangles and add them. Include bay windows in the main room area. Ceiling height matters - Victorian houses with 3m ceilings need significantly more heat than modern 2.4m ceiling rooms.'
    },
    {
      q: 'Should I round up or down on radiator size?',
      a: 'Always round up. A slightly oversized radiator can run at lower flow rates (more efficient), while an undersized radiator will never heat the room properly. The cost difference between sizes is typically £20-50, but comfort difference is significant.'
    },
    {
      q: 'Do I need a bigger radiator for a north-facing room?',
      a: 'Yes, add approximately 10-15% for north-facing rooms. They receive less solar heat gain and external walls feel colder. Our calculator automatically adds 10% when you select north-facing orientation.'
    },
    {
      q: 'How does insulation affect radiator size?',
      a: 'Dramatically. A poorly insulated Victorian house might need 30-40% more heating than a modern well-insulated home. Our calculator adjusts from 0.7× (excellent insulation) to 1.3× (poor insulation) based on your selection. If unsure, choose "average" for 1960s-1990s builds.'
    },
    {
      q: 'What size radiator for a bathroom?',
      a: 'Bathrooms need extra heat because people are often undressed and wet. We use a higher base factor (55 W/m³ vs 44 W/m³ for living rooms). A typical 2m × 2m bathroom needs around 800-1200 BTU. Consider a heated towel rail which adds both heat and towel drying convenience.'
    },
    {
      q: 'Can I use one large radiator or several smaller ones?',
      a: 'For rooms over 20m², multiple radiators provide better heat distribution. Position on external walls, ideally under windows (the coldest spots). Two 3000 BTU radiators on opposite walls will heat more evenly than one 6000 BTU radiator in a corner.'
    },
    {
      q: 'What about underfloor heating vs radiators?',
      a: 'Underfloor heating typically runs at lower water temperatures (35-45°C) and heats more evenly but responds slowly. Radiators heat quickly but create temperature gradients. Many modern systems combine both - UFH for background warmth, radiators for quick top-up heat.'
    },
    {
      q: 'How do I calculate BTU for a conservatory?',
      a: 'Conservatories lose heat rapidly through glass. Use a higher factor (60 W/m³) and consider the glazing type carefully. Triple glazing significantly reduces heat loss. Some conservatories may not be practical to heat in extreme cold - consider thermal blinds as well.'
    },
    {
      q: 'Does a kitchen need a smaller radiator?',
      a: 'Yes, kitchens benefit from heat gain from cooking appliances, fridges, and ovens. We use a lower base factor (36 W/m³). However, if you have an open-plan kitchen-diner, calculate for the whole space as one room with the living room factor.'
    },
    {
      q: 'What if my existing radiator is undersized?',
      a: 'Options include: upgrading to a double or triple panel radiator in the same space, adding a second radiator, or improving insulation to reduce heat loss. A plumber can advise on whether your existing pipework can handle a larger radiator.'
    }
  ]

  const radiatorTypes = [
    { type: 'Type 11 (Single Panel, Single Convector)', description: 'Slim profile, lower output. Good for small rooms or where space is limited.', output: '100%' },
    { type: 'Type 21 (Double Panel, Single Convector)', description: 'Popular choice, good balance of output and depth.', output: '140-160%' },
    { type: 'Type 22 (Double Panel, Double Convector)', description: 'High output, deeper profile. Standard for living rooms.', output: '180-200%' },
    { type: 'Type 33 (Triple Panel, Triple Convector)', description: 'Maximum output, deepest profile. For large or poorly insulated rooms.', output: '260-280%' },
  ]

  return (
    <>
      <Helmet>
        <title>Radiator BTU Calculator UK 2025 | Room Heat Loss | Heating Size Guide | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free radiator BTU calculator for UK homes. Calculate exact heat output needed for any room. Accounts for insulation, windows, room type. ΔT50 rated outputs." 
        />
        <meta 
          name="keywords" 
          content="radiator BTU calculator, radiator size calculator UK, room heat loss calculator, heating calculator, central heating, radiator sizing, BTU calculator, heat output calculator" 
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#ea580c" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TradeCalcs" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Radiator BTU Calculator UK | Room Heat Loss Calculator | TradeCalcs" />
        <meta property="og:description" content="Free radiator BTU calculator. Calculate exact heat output for any UK room. Accounts for insulation, glazing, room type and orientation." />
        <meta property="og:url" content="https://tradecalcs.co.uk/radiator-btu-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/radiator-btu-calculator-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content="Radiator BTU Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free radiator BTU calculator. Calculate exact heat output for any UK room." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/radiator-btu-calculator-og.jpg" />

        <link rel="canonical" href="https://tradecalcs.co.uk/radiator-btu-calculator" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Radiator BTU Calculator', 'item': 'https://tradecalcs.co.uk/radiator-btu-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Radiator BTU Calculator UK',
                'description': 'Free radiator BTU calculator for UK homes. Calculate exact heat output needed for any room based on dimensions, insulation, windows and room type.',
                'applicationCategory': 'Utility',
                'operatingSystem': 'Web Browser',
                'url': 'https://tradecalcs.co.uk/radiator-btu-calculator',
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
                'name': 'How to Calculate Radiator BTU for a Room',
                'description': 'Step-by-step guide to calculating the correct radiator size for any room in your home.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Measure Room', 'text': 'Measure room length, width and height in metres' },
                  { '@type': 'HowToStep', 'name': 'Select Room Type', 'text': 'Choose room type (living room, bedroom, bathroom, etc.)' },
                  { '@type': 'HowToStep', 'name': 'Assess Insulation', 'text': 'Select insulation level based on property age and upgrades' },
                  { '@type': 'HowToStep', 'name': 'Count Windows', 'text': 'Enter number of external walls and windows with glazing type' },
                  { '@type': 'HowToStep', 'name': 'Calculate', 'text': 'Click calculate to get BTU requirement and radiator recommendations' }
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
          <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to All Calculators
          </Link>
        </div>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Flame className="w-10 h-10" />
              <Thermometer className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Radiator BTU Calculator UK</h1>
            <p className="text-lg opacity-95">Calculate the exact heat output needed for any room</p>
            <p className="text-sm opacity-80 mt-2">ΔT50 rated • Accounts for insulation, windows & room type</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Key Facts Box */}
          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
              <Flame className="w-5 h-5" />
              Quick Radiator Sizing Facts
            </h2>
            <ul className="space-y-2">
              {[
                'BTU = British Thermal Units - the standard measure of radiator heat output in the UK',
                'Always round UP on radiator size - undersized radiators never heat rooms properly',
                'ΔT50 is the standard rating - modern low-temp systems may need larger radiators',
                'Bathrooms need ~25% more heat than living rooms (less clothing, wet skin)',
                'Position radiators under windows to counteract cold downdrafts'
              ].map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-orange-900">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white p-4 rounded-t-lg">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Flame className="w-6 h-6" />
                Calculate Room Heat Requirement
              </h2>
            </div>
            <RadiatorBTUCalculatorCore />
          </div>

          {/* CTA Banner */}
          <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need a Heating Engineer?</h3>
                <p className="text-orange-100">Get quotes for radiator installation or full central heating</p>
              </div>
              <a 
                href="#get-quotes" 
                className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 text-center whitespace-nowrap"
              >
                Get Free Quotes
              </a>
            </div>
          </div>

          {/* Understanding BTU Section */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Radiator BTU Ratings</h2>
            <p className="text-gray-700 mb-4">
              BTU (British Thermal Unit) measures heat output. One BTU is the energy required to raise the temperature of one pound of water by one degree Fahrenheit. For radiators, we measure BTU per hour - how much heat the radiator outputs continuously.
            </p>
            <p className="text-gray-700 mb-4">
              UK radiators are tested and rated at ΔT50, meaning a 50°C temperature difference between the radiator water and room air. A typical setup runs flow at 75°C, return at 65°C (average 70°C) in a 20°C room = ΔT50.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-bold text-orange-900 mb-2">Example Calculation</h3>
              <p className="text-sm text-orange-800">
                A 4m × 5m living room with 2.4m ceiling = 48m³ volume. At 44 W/m³ base rate with average insulation = 2,112W base. Add 10% for 2 external walls, 50W per double-glazed window (×2 = 100W), ground floor +10%. Total ≈ 2,500W = <strong>8,530 BTU</strong>. A Double Panel Plus 600×1400 (7,800 BTU) or 600×1600 (8,900 BTU) would suit.
              </p>
            </div>
          </div>

          {/* Radiator Types Table */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Radiator Types & Output Comparison</h2>
            <p className="text-sm text-gray-600 mb-4">Radiator "types" refer to the number of panels and convector fins. More panels = more heat in the same width.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-50 border-b">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Relative Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {radiatorTypes.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-semibold text-gray-800">{row.type}</td>
                      <td className="px-4 py-3 text-gray-600">{row.description}</td>
                      <td className="px-4 py-3 font-semibold text-orange-600">{row.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">Output percentages relative to Type 11 single panel radiator of same dimensions.</p>
          </div>

          {/* Room-by-Room Guide */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-orange-900 mb-4">Room-by-Room Heating Guide</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { room: 'Living Room', temp: '21°C', notes: 'Main comfort space. Allow for evening use when outdoor temps drop.' },
                { room: 'Bedroom', temp: '18°C', notes: 'Cooler sleeping is healthier. Can use smaller radiator than living spaces.' },
                { room: 'Bathroom', temp: '22°C', notes: 'Needs extra warmth. Consider heated towel rail (adds 200-500W).' },
                { room: 'Kitchen', temp: '18°C', notes: 'Cooking appliances add heat. Often undersized radiator is fine.' },
                { room: 'Hallway', temp: '18°C', notes: 'Transition space. Heat escapes when front door opens - don\'t oversize.' },
                { room: 'Home Office', temp: '21°C', notes: 'Comfort for sedentary work. Similar to living room requirements.' }
              ].map((item, i) => (
                <div key={i} className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-gray-900">{item.room}</h3>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm font-semibold">{item.temp}</span>
                  </div>
                  <p className="text-sm text-gray-600">{item.notes}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Warning */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">Low Temperature Heating Systems</h3>
                <p className="text-sm text-amber-800">
                  Modern condensing boilers and heat pumps often run at lower temperatures (45-55°C) for efficiency. At these temperatures, radiator output drops significantly - a radiator rated at 2000W at ΔT50 might only output 1000-1200W at ΔT30. If you're installing a heat pump or running your boiler at lower temperatures, consider oversizing radiators by 50-100% or use our figures as a minimum guideline.
                </p>
              </div>
            </div>
          </div>

          {/* Internal Links */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-orange-900 mb-3">Related Calculators</h3>
            <p className="text-sm text-orange-800 mb-4">
              Planning electrical work alongside your heating upgrade? Use our <Link to="/cable-sizing-calculator" className="text-orange-600 font-semibold hover:underline">cable sizing calculator</Link> for electric heating circuits. For heat pump installations, check <Link to="/calculators/voltage-drop/heat-pump" className="text-orange-600 font-semibold hover:underline">heat pump voltage drop</Link> requirements. See all our <Link to="/electrical-calculators" className="text-orange-600 font-semibold hover:underline">electrical calculators</Link>.
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
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Heating Engineers</h3>
              <p className="text-gray-700">
                Need help with radiator installation, replacement, or a full heating system? Tell us about your project and we'll connect you with vetted heating engineers in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=RadiatorBTUCalculator" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Radiator BTU Calculator Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Heating engineer or plumbing business?</strong> Use the form above and let us know - we offer lead referrals in your area and partnership opportunities.
              </p>
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Calculators</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/calculators/insulation-calculator" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">Insulation U-Value Calculator</h3>
                <p className="text-sm text-green-700">Calculate insulation requirements for walls, floors and roofs</p>
              </Link>
              <Link to="/calculators/voltage-drop/heat-pump" className="block p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Heat Pump Voltage Drop</h3>
                <p className="text-sm text-orange-700">Electrical requirements for air source heat pumps</p>
              </Link>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Trade Calculators</h2>
            <p className="mb-6">Professional calculators for electricians, plumbers, builders and more. All free.</p>
            <Link to="/" className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
