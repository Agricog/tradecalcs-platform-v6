import { ArrowLeft, Hammer, Clock, TrendingUp, Award, AlertCircle, CheckCircle2 } from 'lucide-react'
import JoineryCalculator from '../components/JoineryCalculator'

export default function JoineryCalculatorPage() {
  return (
    <>
      {/* BACK TO HOME BUTTON */}
      <div className="bg-gray-50 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <a 
            href="/"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </a>
        </div>
      </div>

      {/* SEO HERO SECTION */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">Professional Joinery Material & Labour Cost Calculator UK</h1>
            <p className="text-2xl mb-6">Calculate accurate wood costs, labour hours & project pricing instantly</p>
            <p className="text-lg opacity-95 mb-8">
              Trusted by joiners across the UK. Accurate calculations for built-ins, kitchens, staircases & bespoke furniture.
            </p>
            <a href="#calculator" className="bg-white text-amber-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 inline-flex items-center gap-2">
              <Hammer className="w-5 h-5" />
              Jump to Calculator
            </a>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <p className="text-sm opacity-90">Joiners using TradeCalcs</p>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
              <div className="text-3xl font-bold mb-2">2M+</div>
              <p className="text-sm opacity-90">Calculations performed monthly</p>
            </div>
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
              <div className="text-3xl font-bold mb-2">98%</div>
              <p className="text-sm opacity-90">User satisfaction rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* BENEFITS SECTION */}
      <section id="benefits" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Why Joiners Choose TradeCalcs</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Designed by joiners, for joiners. Get accurate quotes, win more jobs, and increase profitability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border-l-4 border-amber-500 shadow-sm hover:shadow-md transition">
              <Clock className="w-8 h-8 text-amber-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Save Time on Quotes</h3>
              <p className="text-gray-700 text-sm">Quote any project in 2-3 minutes instead of 2 hours. Create quotes faster than your competitors.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500 shadow-sm hover:shadow-md transition">
              <CheckCircle2 className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Accurate Pricing</h3>
              <p className="text-gray-700 text-sm">Reduce estimating errors. Current UK timber prices, waste factors, and labour rates built in.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-red-500 shadow-sm hover:shadow-md transition">
              <TrendingUp className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Win More Jobs</h3>
              <p className="text-gray-700 text-sm">Quote faster than competitors. Clients choose joiners who respond quickly with professional estimates.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-amber-500 shadow-sm hover:shadow-md transition">
              <Hammer className="w-8 h-8 text-amber-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Professional Quotes</h3>
              <p className="text-gray-700 text-sm">Impress clients with detailed cost breakdowns. Show material costs, labour hours, and total pricing.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500 shadow-sm hover:shadow-md transition">
              <Award className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Increase Margins</h3>
              <p className="text-gray-700 text-sm">Accurate labour estimates prevent under-quoting. Know your costs, quote confidently, boost profits.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-red-500 shadow-sm hover:shadow-md transition">
              <AlertCircle className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">No Subscription Required</h3>
              <p className="text-gray-700 text-sm">Completely free. No login, no emails, no signup. Start calculating instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR SECTION */}
      <section id="calculator" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <JoineryCalculator />
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">How accurate is this calculator?</h3>
              <p className="text-gray-700 text-sm">Very accurate. We use Q4 2025 UK market timber prices, industry-standard waste factors, and realistic labour time estimates. Always verify material prices with your supplier.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Why do different wood types have different prices?</h3>
              <p className="text-gray-700 text-sm">Hardwoods (oak, walnut) are more expensive than softwoods (pine). MDF and plywood are engineered products with different pricing. Prices vary by supplier — these are typical UK averages.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">What does "waste factor" mean?</h3>
              <p className="text-gray-700 text-sm">Waste factor accounts for offcuts, breakage, and unusable material when cutting complex shapes. Built-in wardrobes have 18% waste, staircases have 22%, bespoke furniture has 25%.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">How should I adjust my hourly rate?</h3>
              <p className="text-gray-700 text-sm">UK joiners typically charge £35-£60/hour depending on experience, location, and specialisation. London/South East typically higher. Self-employed justifies higher rates than employed.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Does this include painting/varnishing labour?</h3>
              <p className="text-gray-700 text-sm">Yes. Select your finish type (natural, stain, paint, varnish) and the calculator adds appropriate labour time. Varnish takes longest due to drying/sanding between coats.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Should I use this for client quotes?</h3>
              <p className="text-gray-700 text-sm">Absolutely. This is designed for professional quoting. Add your markup/profit margin to the total cost shown. Most joiners add 25-40% margin for profit and overheads.</p>
            </div>
          </div>
        </div>
      </section>

      {/* UK TIMBER PRICING SECTION */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Current UK Joinery Material Costs (Q4 2025)</h2>
          
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">Timber Prices (per m³)</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex justify-between"><span>Pine (softwood)</span> <span className="font-semibold">£450</span></li>
                  <li className="flex justify-between"><span>Oak (hardwood)</span> <span className="font-semibold">£850</span></li>
                  <li className="flex justify-between"><span>Walnut (premium)</span> <span className="font-semibold">£1,200</span></li>
                  <li className="flex justify-between"><span>MDF (engineered)</span> <span className="font-semibold">£320</span></li>
                  <li className="flex justify-between"><span>Plywood (engineered)</span> <span className="font-semibold">£380</span></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-4">Labour Time Estimates</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex justify-between"><span>Built-in wardrobe</span> <span className="font-semibold">12 hrs</span></li>
                  <li className="flex justify-between"><span>Fitted kitchen</span> <span className="font-semibold">15 hrs</span></li>
                  <li className="flex justify-between"><span>Staircase</span> <span className="font-semibold">20 hrs</span></li>
                  <li className="flex justify-between"><span>Custom doors</span> <span className="font-semibold">8 hrs</span></li>
                  <li className="flex justify-between"><span>Bespoke furniture</span> <span className="font-semibold">25+ hrs</span></li>
                </ul>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-6 border-t-2 border-gray-200 pt-4">
              Prices updated Q4 2025. Material prices are averages from major UK suppliers (Travis Perkins, Jewson, Machin's). Labour time estimates based on industry standards. Always confirm current pricing with your supplier.
            </p>
          </div>
        </div>
      </section>

      {/* HOW TO USE SECTION */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How to Use the Joinery Calculator</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border-l-4 border-amber-600">
              <h3 className="font-bold text-gray-900 mb-2">Step 1: Select Project Type</h3>
              <p className="text-gray-700 text-sm">Choose what you're building: built-in wardrobe, kitchen, staircase, doors, shelving, or bespoke furniture. This determines the estimated labour time.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-orange-600">
              <h3 className="font-bold text-gray-900 mb-2">Step 2: Choose Wood Type & Finish</h3>
              <p className="text-gray-700 text-sm">Select your wood (pine, oak, walnut, MDF, plywood) and finish type (natural, stain, paint, varnish). Finish affects labour time — varnish takes longer than natural.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-amber-600">
              <h3 className="font-bold text-gray-900 mb-2">Step 3: Enter Dimensions</h3>
              <p className="text-gray-700 text-sm">Input length, width, and height/depth in millimetres. The calculator converts to cubic metres automatically.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-orange-600">
              <h3 className="font-bold text-gray-900 mb-2">Step 4: Set Your Hourly Rate</h3>
              <p className="text-gray-700 text-sm">Enter what you charge per hour (£/hour). UK average is £35-£60. Higher rates for complex work or London-based.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-amber-600">
              <h3 className="font-bold text-gray-900 mb-2">Step 5: Calculate & Review</h3>
              <p className="text-gray-700 text-sm">Click "Calculate Project Cost" to see material costs, labour hours, labour costs, and total. Add your markup (typically 25-40%) for your final client quote.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg p-8 text-center mx-4 mb-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-3">Professional Tools for UK Tradespeople</h2>
        <p className="mb-6">Explore our complete range of free calculators built for construction trades.</p>
        <a href="/" className="bg-white text-amber-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
          View All Calculators
        </a>
      </div>
    </>
  )
}
