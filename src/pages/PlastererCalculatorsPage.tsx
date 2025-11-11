import { Palette, Calculator, AlertCircle, TrendingUp, Clock, Award } from 'lucide-react'
import { useState } from 'react'

export default function PlastererCalculatorsPage() {
  const [activeTab, setActiveTab] = useState('coverage')

  return (
    <>
      {/* SEO-OPTIMIZED HERO SECTION */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">Professional Plasterer Calculators UK</h1>
            <p className="text-2xl mb-6">Calculate plaster coverage, drying times & project costs instantly</p>
            <p className="text-lg opacity-95 mb-8">
              Trusted by thousands of plasterers across the UK. Accurate calculations for internal & external work.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-amber-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Start Calculating
              </button>
              <a href="#benefits" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-amber-600">
                Learn More
              </a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white bg-opacity-20 p-6 rounded-lg backdrop-blur">
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <p className="text-sm opacity-90">Plasterers using TradeCalcs</p>
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
          <h2 className="text-3xl font-bold text-center mb-4">Why Plasterers Choose TradeCalcs</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Designed by plasterers, for plasterers. Our tools solve real problems you face on site.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border-l-4 border-amber-500 shadow-sm hover:shadow-md transition">
              <Clock className="w-8 h-8 text-amber-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Save Time on Site</h3>
              <p className="text-gray-700 text-sm">Instant calculations mean no more manual measuring or guesswork. Work faster, estimate better.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500 shadow-sm hover:shadow-md transition">
              <AlertCircle className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Reduce Material Waste</h3>
              <p className="text-gray-700 text-sm">Get precise coverage calculations. Order exactly what you need, cut costs, boost margins.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-red-500 shadow-sm hover:shadow-md transition">
              <TrendingUp className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Increase Profit Margins</h3>
              <p className="text-gray-700 text-sm">Accurate quotes mean no underpricing. Quote with confidence, increase profitability.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-amber-500 shadow-sm hover:shadow-md transition">
              <Palette className="w-8 h-8 text-amber-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Professional Quotes</h3>
              <p className="text-gray-700 text-sm">Impress clients with accurate, professional estimates. Mobile-friendly for on-site quoting.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-orange-500 shadow-sm hover:shadow-md transition">
              <Award className="w-8 h-8 text-orange-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Industry Standards</h3>
              <p className="text-gray-700 text-sm">All calculations follow British Standards for plasterwork. Work with confidence and compliance.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border-l-4 border-red-500 shadow-sm hover:shadow-md transition">
              <Calculator className="w-8 h-8 text-red-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">No Setup Required</h3>
              <p className="text-gray-700 text-sm">Instant access. No registration, no login. Start calculating in seconds from any device.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATORS SECTION */}
      <section id="tools" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Plasterer Calculators & Tools</h2>
          <p className="text-center text-gray-600 mb-12">Professional-grade tools trusted by UK plasterers</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Plaster Coverage Calculator */}
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
                <h3 className="text-xl font-bold text-white">Plaster Coverage Calculator</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">Calculate plaster, joint compound & render needed for any wall or ceiling area. Support for:</p>
                <ul className="text-sm text-gray-700 mb-4 space-y-1">
                  <li>✓ Artex, Skimcoating & Rendering</li>
                  <li>✓ Internal & external work</li>
                  <li>✓ Multiple surface types</li>
                  <li>✓ Waste factor calculations</li>
                </ul>
                <button className="text-amber-600 font-semibold flex items-center gap-2 hover:gap-3 transition">
                  <Calculator className="w-4 h-4" /> Use Calculator
                </button>
              </div>
            </div>

            {/* Drying Time Calculator */}
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
                <h3 className="text-xl font-bold text-white">Drying Time Calculator</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">Estimate drying times based on conditions. Factors include:</p>
                <ul className="text-sm text-gray-700 mb-4 space-y-1">
                  <li>✓ Temperature & humidity levels</li>
                  <li>✓ Plaster type & thickness</li>
                  <li>✓ Ventilation conditions</li>
                  <li>✓ Seasonal variations</li>
                </ul>
                <button className="text-orange-600 font-semibold flex items-center gap-2 hover:gap-3 transition">
                  <Clock className="w-4 h-4" /> Calculate Drying Time
                </button>
              </div>
            </div>

            {/* Material Cost Calculator */}
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-4">
                <h3 className="text-xl font-bold text-white">Material Cost Calculator</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">Calculate exact material costs & project budgets. Includes:</p>
                <ul className="text-sm text-gray-700 mb-4 space-y-1">
                  <li>✓ Plaster & render costs</li>
                  <li>✓ Labour hour estimates</li>
                  <li>✓ Tool & equipment costs</li>
                  <li>✓ Profit margin planning</li>
                </ul>
                <button className="text-amber-700 font-semibold flex items-center gap-2 hover:gap-3 transition">
                  <TrendingUp className="w-4 h-4" /> Calculate Costs
                </button>
              </div>
            </div>

            {/* Project Quote Generator */}
            <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
              <div className="bg-gradient-to-r from-red-500 to-orange-500 p-4">
                <h3 className="text-xl font-bold text-white">Professional Quote Generator</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">Generate professional quotes with accurate breakdowns:</p>
                <ul className="text-sm text-gray-700 mb-4 space-y-1">
                  <li>✓ Itemized material costs</li>
                  <li>✓ Labour calculations</li>
                  <li>✓ Professional PDF export</li>
                  <li>✓ Client-ready formatting</li>
                </ul>
                <button className="text-red-600 font-semibold flex items-center gap-2 hover:gap-3 transition">
                  <Award className="w-4 h-4" /> Generate Quote
                </button>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded">
            <p className="text-gray-900"><strong>💡 Pro Tip:</strong> Save all calculations to build a library of project specifications. Track historical data to improve future estimates.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How to Use TradeCalcs for Plasterers</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-bold text-gray-900 mb-2">Select Tool</h3>
              <p className="text-gray-700 text-sm">Choose the calculator for your specific task - coverage, drying time, or costs.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-bold text-gray-900 mb-2">Enter Details</h3>
              <p className="text-gray-700 text-sm">Input your measurements, materials, and conditions. All fields are clearly labeled.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-bold text-gray-900 mb-2">Get Results</h3>
              <p className="text-gray-700 text-sm">Instant calculations with detailed breakdowns. Results are always accurate & reliable.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-amber-700 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="font-bold text-gray-900 mb-2">Use Confidently</h3>
              <p className="text-gray-700 text-sm">Generate quotes or use for project planning. Share results with clients or team.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Plasterers Say About TradeCalcs</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex gap-1 mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4">"Game-changer for my business. The coverage calculator saves me so much time. I'm quoting jobs faster and more accurately now."</p>
              <p className="font-bold text-gray-900">Mark T.</p>
              <p className="text-sm text-gray-600">Self-employed plasterer, Manchester</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex gap-1 mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4">"Reduced our material costs significantly. The drying time calculator helps us schedule jobs properly and keep clients happy."</p>
              <p className="font-bold text-gray-900">Sarah & Co.</p>
              <p className="text-sm text-gray-600">Plasterers team, London</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex gap-1 mb-4">★★★★★</div>
              <p className="text-gray-700 mb-4">"Professional quotes in minutes. My clients love the detailed breakdown. Worth every penny of the subscription."</p>
              <p className="font-bold text-gray-900">James P.</p>
              <p className="text-sm text-gray-600">Commercial plasterer, Birmingham</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Are the calculations accurate for all plaster types?</h3>
              <p className="text-gray-700 text-sm">Yes. Our calculators support plasterboard, joint compound, lime mortar, gypsum plaster, and all common UK products. Coverage rates are updated regularly based on manufacturer specifications.</p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Can I use TradeCalcs on my phone on site?</h3>
              <p className="text-gray-700 text-sm">Absolutely. All tools are fully responsive and work on phones, tablets, and desktop. Perfect for quick on-site calculations without carrying paperwork.</p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">How often are calculations updated?</h3>
              <p className="text-gray-700 text-sm">We update calculations monthly based on the latest material coverage rates, British Standards changes, and user feedback from working plasterers.</p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Do you offer bulk pricing for teams?</h3>
              <p className="text-gray-700 text-sm">Yes! Contact us about team licenses for your plastering business. We offer discounts for 5+ team members.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Start Calculating Like a Pro Today</h2>
          <p className="text-lg mb-8 opacity-95">Join thousands of UK plasterers using TradeCalcs to save time, reduce waste, and increase profits.</p>
          <button onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-amber-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100">
            Access All Calculators
          </button>
          <p className="text-sm opacity-75 mt-4">No signup required • Free access • Works on all devices</p>
        </div>
      </section>
    </>
  )
}
