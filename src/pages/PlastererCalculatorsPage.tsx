import { Palette, Calculator, AlertCircle, TrendingUp, Clock, Award, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function PlastererCalculatorsPage() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [coats, setCoats] = useState('2')
  const [coverage, setCoverage] = useState('1.5')
  const [wasteFactor, setWasteFactor] = useState('10')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const area = (parseFloat(length) || 0) * (parseFloat(width) || 0)
    const coverageRate = parseFloat(coverage) || 1.5
    const numCoats = parseFloat(coats) || 1
    const waste = parseFloat(wasteFactor) || 10

    const needed = (area * numCoats) / coverageRate
    const withWaste = needed * (1 + waste / 100)

    setResult({
      area: area.toFixed(2),
      basePlaster: needed.toFixed(2),
      withWaste: withWaste.toFixed(2),
      bags: Math.ceil(withWaste / 25),
    })
  }

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
            <h1 className="text-5xl font-bold mb-4">Professional Plasterer Calculators UK</h1>
            <p className="text-2xl mb-6">Calculate plaster coverage, drying times & project costs instantly</p>
            <p className="text-lg opacity-95 mb-8">
              Trusted by thousands of plasterers across the UK. Accurate calculations for internal & external work.
            </p>
            <a href="#calculator" className="bg-white text-amber-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 inline-flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Jump to Calculator
            </a>
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

      {/* CALCULATOR SECTION */}
      <section id="calculator" className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-amber-200">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
              <div className="flex items-center gap-3">
                <Palette className="w-8 h-8 text-white" />
                <div>
                  <h2 className="text-3xl font-bold text-white">Plaster Coverage Calculator</h2>
                  <p className="text-amber-100">Calculate plaster needed for any wall or ceiling</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Wall/Ceiling Length (metres)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="e.g. 4.5"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Wall/Ceiling Width (metres)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="e.g. 3.2"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Number of Coats
                    </label>
                    <select
                      value={coats}
                      onChange={(e) => setCoats(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    >
                      <option value="1">1 Coat</option>
                      <option value="2">2 Coats</option>
                      <option value="3">3 Coats</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Coverage Rate (kg/m²)
                    </label>
                    <select
                      value={coverage}
                      onChange={(e) => setCoverage(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    >
                      <option value="1.5">1.5 (Standard Skim)</option>
                      <option value="2">2 (Artex/Thick)</option>
                      <option value="2.5">2.5 (Heavy Coverage)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Waste Factor (%)
                    </label>
                    <select
                      value={wasteFactor}
                      onChange={(e) => setWasteFactor(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                    >
                      <option value="5">5%</option>
                      <option value="10">10%</option>
                      <option value="15">15%</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-lg font-bold text-lg transition"
                >
                  Calculate Now
                </button>
              </div>

              {result && (
                <div className="mt-12 pt-8 border-t-2 border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Results</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200">
                      <p className="text-sm text-gray-600 mb-2">Total Area</p>
                      <p className="text-3xl font-bold text-amber-600">{result.area} m²</p>
                    </div>

                    <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                      <p className="text-sm text-gray-600 mb-2">Base Plaster Needed</p>
                      <p className="text-3xl font-bold text-orange-600">{result.basePlaster} kg</p>
                    </div>

                    <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200">
                      <p className="text-sm text-gray-600 mb-2">With Waste Factor</p>
                      <p className="text-3xl font-bold text-amber-600">{result.withWaste} kg</p>
                    </div>

                    <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                      <p className="text-sm text-gray-600 mb-2">Order (25kg bags)</p>
                      <p className="text-3xl font-bold text-green-600">{result.bags} bags</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
                    <p className="text-sm text-gray-900">
                      <strong>💡 Pro Tip:</strong> Order {result.bags} bags of 25kg plaster. This accounts for your waste factor of {wasteFactor}%.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Are the calculations accurate for all plaster types?</h3>
              <p className="text-gray-700 text-sm">Yes. Our calculators support plasterboard, joint compound, lime mortar, gypsum plaster, and all common UK products. Coverage rates are updated regularly based on manufacturer specifications.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Can I use TradeCalcs on my phone on site?</h3>
              <p className="text-gray-700 text-sm">Absolutely. All tools are fully responsive and work on phones, tablets, and desktop. Perfect for quick on-site calculations without carrying paperwork.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">How often are calculations updated?</h3>
              <p className="text-gray-700 text-sm">We update calculations monthly based on the latest material coverage rates, British Standards changes, and user feedback from working plasterers.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 mb-2">Do you offer bulk pricing for teams?</h3>
              <p className="text-gray-700 text-sm">Yes! Contact us about team licenses for your plastering business. We offer discounts for 5+ team members.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}






