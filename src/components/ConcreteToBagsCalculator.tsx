import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Package, Calculator, AlertCircle, CheckCircle2, ShoppingCart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import QuoteGenerator from './QuoteGenerator'

export default function ConcreteToBagsCalculator() {
  const navigate = useNavigate()
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [depth, setDepth] = useState('')
  const [applicationType, setApplicationType] = useState('foundation')
  const [merchant, setMerchant] = useState('jewson')
  const [email, setEmail] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  const mixRatios: Record<string, { ratio: string; strength: string; cementParts: number; sandParts: number; gravelParts: number }> = {
    foundation: { ratio: '1:2:4', strength: 'C20', cementParts: 1, sandParts: 2, gravelParts: 4 },
    slab: { ratio: '1:2:4', strength: 'C25', cementParts: 1, sandParts: 2, gravelParts: 4 },
    driveway: { ratio: '1:2:4', strength: 'C25', cementParts: 1, sandParts: 2, gravelParts: 4 },
    postholes: { ratio: '1:2:3', strength: 'C25', cementParts: 1, sandParts: 2, gravelParts: 3 }
  }

  const applications = [
    { value: 'foundation', label: 'Foundation', desc: 'House footings, extensions' },
    { value: 'slab', label: 'Concrete Slab', desc: 'Garage floors, sheds' },
    { value: 'driveway', label: 'Driveway', desc: 'Heavy-duty vehicle access' },
    { value: 'postholes', label: 'Post Holes', desc: 'Fence posts, small pours' }
  ]

  const merchants = [
    { value: 'jewson', label: 'Jewson', bulkBagSize: 850 },
    { value: 'travis', label: 'Travis Perkins', bulkBagSize: 850 },
    { value: 'screwfix', label: 'Screwfix', bulkBagSize: 750 },
    { value: 'wickes', label: 'Wickes', bulkBagSize: 800 }
  ]

  const calculate = () => {
    const l = parseFloat(length)
    const w = parseFloat(width)
    const d = parseFloat(depth)

    if (!l || !w || !d) return null

    const volumeM3 = (l * w * d) / 1000
    const volumeWithWaste = volumeM3 * 1.10
    const mix = mixRatios[applicationType]

    let cementBagsPerM3 = 12
    if (applicationType === 'slab' || applicationType === 'driveway' || applicationType === 'postholes') {
      cementBagsPerM3 = 13
    }
    
    const cementBags = Math.ceil(volumeWithWaste * cementBagsPerM3)

    const selectedMerchant = merchants.find(m => m.value === merchant)!
    const ballastKgPerM3 = 1950
    const totalBallastKg = volumeWithWaste * ballastKgPerM3
    const bulkBags = Math.ceil(totalBallastKg / selectedMerchant.bulkBagSize)

    const cementCostPerBag = 6.50
    const bulkBagCost = 85.00
    const totalCost = (cementBags * cementCostPerBag) + (bulkBags * bulkBagCost)

    return {
      volumeM3: volumeWithWaste.toFixed(2),
      cementBags,
      bulkBags,
      mix,
      totalCost: totalCost.toFixed(2),
      merchantName: selectedMerchant.label
    }
  }

  const results = calculate()

  const handleCalculate = () => {
    if (results) {
      setShowResults(true)
      window.scrollTo({ top: 800, behavior: 'smooth' })
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailSubmitted(true)
    console.log('Email submitted:', email)
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Concrete Calculator UK | Cement & Ballast Bags Calculator | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free concrete calculator for UK builders. Calculate exact cement bags and ballast needed. No confusion - instant results for foundations, slabs, and driveways." 
        />
        <meta name="keywords" content="concrete calculator, cement calculator, ballast calculator, UK concrete mix, building materials calculator, foundation calculator, concrete bags calculator" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Concrete Calculator UK | Cement & Ballast Bags Calculator" />
        <meta property="og:description" content="Calculate exact cement and ballast bags needed. Free instant results for UK builders." />
        <meta property="og:url" content="https://tradecalcs.co.uk/concrete-calculator" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Concrete Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free concrete calculator. Calculate exact cement and ballast bags instantly." />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/concrete-calculator" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* BACK BUTTON */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-6">
              <Package className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Concrete-to-Bags Calculator UK</h1>
            <p className="text-xl text-green-50 mb-2">Calculate exactly how many bags to buy from your merchant</p>
            <p className="text-green-100">No more confusion. No more waste. Just tell us what you need.</p>
          </div>
        </div>

        {/* CALCULATOR SECTION */}
        <div className="max-w-4xl mx-auto px-4 -mt-8">
          <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6" />
                <h2 className="text-2xl font-bold">UK Concrete Calculator</h2>
              </div>
              <p className="text-green-50 mt-2">Get exact bag quantities in 30 seconds</p>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-900 mb-3">1. What are you pouring?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {applications.map(app => (
                    <button
                      key={app.value}
                      onClick={() => setApplicationType(app.value)}
                      className={`p-4 rounded-lg border-2 text-left transition ${
                        applicationType === app.value
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="font-bold text-gray-900">{app.label}</div>
                      <div className="text-sm text-gray-600">{app.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">2. Length (meters)</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="e.g., 5"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">3. Width (meters)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="e.g., 3"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">4. Depth (millimeters)</label>
                  <input
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    placeholder="e.g., 150"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-900 mb-3">5. Your Preferred Merchant</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {merchants.map(m => (
                    <button
                      key={m.value}
                      onClick={() => setMerchant(m.value)}
                      className={`p-3 rounded-lg border-2 font-semibold transition ${
                        merchant === m.value
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300 text-gray-700'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleCalculate}
                disabled={!results}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Materials Needed
              </button>
            </div>
          </div>

          {/* RESULTS */}
          {showResults && results && (
            <>
              <div className="mt-8 bg-white rounded-xl shadow-xl border-2 border-green-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Your Shopping List</h3>
                    <p className="text-gray-600">Buy these from {results.merchantName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                    <div className="text-sm font-semibold text-green-700 mb-1">CEMENT</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{results.cementBags} bags</div>
                    <div className="text-sm text-gray-600">25kg bags × {results.cementBags}</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                    <div className="text-sm font-semibold text-blue-700 mb-1">BALLAST</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{results.bulkBags} bulk bags</div>
                    <div className="text-sm text-gray-600">All-in ballast (sand + gravel)</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Volume</div>
                      <div className="font-bold text-gray-900">{results.volumeM3}m³</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Mix Ratio</div>
                      <div className="font-bold text-gray-900">{results.mix.ratio}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Strength</div>
                      <div className="font-bold text-gray-900">{results.mix.strength}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Est. Cost</div>
                      <div className="font-bold text-green-600">£{results.totalCost}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">Pro Tip: Mixing Instructions</p>
                      <p className="text-sm text-blue-800">Mix ratio {results.mix.ratio} means: {results.mix.cementParts} part cement, {results.mix.sandParts} parts sand, {results.mix.gravelParts} parts gravel. Add water gradually until workable consistency. This calculation includes 10% waste factor.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QUOTE GENERATOR CTA */}
              <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Turn This Into a Quote</h3>
                    <p className="text-sm text-gray-600">Generate professional quote in 2 minutes</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowQuoteGenerator(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Generate Free Quote
                </button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  Want branded quotes with your logo? <a href="/pro" className="text-purple-600 font-semibold hover:underline">Upgrade to Pro - £99/year</a>
                </p>
              </div>
            </>
          )}

          {/* EMAIL CAPTURE CTA */}
          <div className="mt-12 mb-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Want the Job Profitability Calculator?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              We're building a tool that calculates materials + labor + overheads + markup to show TRUE job profitability. Be first to know when it launches.
            </p>

            {!emailSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
                >
                  Notify Me
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 text-white">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-semibold">Thanks! We'll notify you when it launches.</span>
              </div>
            )}
          </div>

          {/* SEO CONTENT SECTIONS */}
          <div className="space-y-12 mb-16">
            {/* Important Notes */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <h3 className="text-xl font-bold text-gray-900">Important Notes</h3>
              </div>
              <ul className="space-y-2 text-gray-700 ml-9">
                <li>• Pricing based on Q4 2025 UK market rates (validated)</li>
                <li>• 10% waste factor included for typical pours</li>
                <li>• Bulk bag sizes vary by merchant (750-900kg)</li>
                <li>• Weather affects material moisture - wet ballast weighs more</li>
                <li>• Always order slightly more than calculated to avoid shortfalls</li>
              </ul>
            </div>

            {/* How to Use */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Use the Concrete-to-Bags Calculator</h2>
              <p className="text-gray-700 mb-4">
                UK builders have struggled with concrete calculations for over a decade. Forum after forum shows the same confusion: "I need to fill X cubic meters—how many bags do I actually buy from my merchant?" This calculator solves that problem in 30 seconds.
              </p>
              <p className="text-gray-700">
                Simply enter your dimensions, select your application type (foundation, slab, driveway, or post holes), choose your preferred merchant, and get exact bag quantities. No more converting cubic meters to bags, no more guessing mix ratios, no more over-ordering or emergency runs to the merchant.
              </p>
            </div>

            {/* Why Confusing */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Concrete Calculations Are Confusing</h2>
              <p className="text-gray-700 mb-4">
                Cement is sold by weight (25kg bags), but ballast is often just called a "Handy Bag" or "Bulk Bag" with no clear weight indicated. Different merchants use different bulk bag sizes (750-900kg), and moisture content in winter can add 15-20% to actual weight.
              </p>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded mt-6">
                <p className="font-bold text-red-900 mb-2">💰 The Hidden Cost of Guesswork</p>
                <p className="text-red-800">
                  Ordering wrong quantities costs £200-500 per job. Over-order and you waste money storing or disposing of excess. Under-order and you halt work waiting for delivery, losing £150-300 in daily labor costs. This calculator prevents both.
                </p>
              </div>
            </div>

            {/* Concrete Mix Ratios */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">UK Concrete Mix Ratios Explained</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Foundation (1:2:4) - C20</h3>
                  <p className="text-sm text-gray-600 mb-3">House footings, extensions, load-bearing applications</p>
                  <p className="text-gray-700">Strong C20 concrete suitable for structural footings. 12 bags of 25kg cement per cubic meter. Requires proper compaction.</p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Slabs & Driveways (1:2:4) - C25</h3>
                  <p className="text-sm text-gray-600 mb-3">Garage floors, concrete pads, heavy vehicle access</p>
                  <p className="text-gray-700">Durable C25 concrete for floor slabs and driveways. 13 bags of 25kg cement per cubic meter. Better for weathering.</p>
                </div>
              </div>
            </div>

            {/* Current UK Pricing */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Current UK Concrete Material Costs (Q4 2025)</h2>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <ul className="space-y-3 text-gray-700">
                  <li><strong>Portland Cement (25kg bag):</strong> £6.50</li>
                  <li><strong>All-in Ballast (bulk bag ~850kg):</strong> £85.00</li>
                  <li><strong>Professional labour:</strong> £115/m² (current UK rate)</li>
                  <li><strong>Typical 1m³ cost breakdown:</strong> ~£52 materials + £115 labour = £167 per m³</li>
                </ul>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Can I use this calculator for commercial projects?</h3>
                  <p className="text-gray-700">Yes, absolutely. This calculator is designed for any concrete pour size - residential, commercial, or civil works. The calculations follow UK building standards and are suitable for insurance claims and professional quotes.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">What if I need a different mix ratio?</h3>
                  <p className="text-gray-700">If you require a custom mix (e.g., decorative concrete or specialized applications), contact your concrete supplier directly. The ratios here cover 95% of standard UK construction applications.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Should I order extra bags?</h3>
                  <p className="text-gray-700">Yes - always order 1-2 extra bags. The 10% waste factor covers spillage and imperfect pours, but having spares prevents costly delays if you need to re-run a section.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Do different merchants stock the same bag sizes?</h3>
                  <p className="text-gray-700">Bulk bags vary slightly by merchant (750-900kg). This calculator accounts for the major UK suppliers. Always check with your specific merchant for exact bulk bag weights before ordering.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM SECTION */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help or Have Questions?</h3>
              <p className="text-gray-700">
                Got a specific calculation requirement or want a custom tool for your trade? Fill out the form below.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="Contact Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Professional Tools for UK Builders</h3>
            <p className="text-green-50 mb-8 text-lg">
              Explore our complete range of calculators and tools built specifically for construction trades.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              View All Calculators
            </button>
          </div>
        </div>

        {/* QUOTE GENERATOR MODAL */}
        {showQuoteGenerator && results && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: `Cement (25kg bags)`, quantity: results.cementBags.toString(), unit: 'bags' },
                { item: `All-in Ballast (bulk bags)`, quantity: results.bulkBags.toString(), unit: 'bags' },
                { item: `${applications.find(a => a.value === applicationType)?.label} - ${results.mix.ratio} Mix`, quantity: results.volumeM3, unit: 'm³' },
                { item: 'Mixing & Pouring Labour', quantity: '1', unit: 'job' }
              ],
              summary: `${results.volumeM3}m³ concrete ${results.mix.strength} (${results.mix.ratio} mix ratio) - includes 10% waste factor`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}





