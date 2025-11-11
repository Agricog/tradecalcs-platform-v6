import { useState } from 'react'
import { Package, Calculator, AlertCircle, CheckCircle2, ShoppingCart } from 'lucide-react'

export default function ConcreteToBagsCalculator() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [depth, setDepth] = useState('')
  const [applicationType, setApplicationType] = useState('foundation')
  const [merchant, setMerchant] = useState('jewson')
  const [email, setEmail] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  // Mix ratios by application
  const mixRatios: Record<string, { ratio: string; strength: string; cementParts: number; sandParts: number; gravelParts: number }> = {
    foundation: { ratio: '1:3:6', strength: 'C15/20', cementParts: 1, sandParts: 3, gravelParts: 6 },
    slab: { ratio: '1:2:4', strength: 'C20/25', cementParts: 1, sandParts: 2, gravelParts: 4 },
    driveway: { ratio: '1:2:4', strength: 'C25/30', cementParts: 1, sandParts: 2, gravelParts: 4 },
    postholes: { ratio: '1:2:3', strength: 'C25/30', cementParts: 1, sandParts: 2, gravelParts: 3 }
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

    // Calculate volume in cubic meters
    const volumeM3 = (l * w * d) / 1000
    
    // Add 10% waste factor
    const volumeWithWaste = volumeM3 * 1.10

    // Get mix ratio
    const mix = mixRatios[applicationType]
    const totalParts = mix.cementParts + mix.sandParts + mix.gravelParts

    // Calculate cement needed (approximately 350kg per m³ for typical mix)
    const cementKgPerM3 = 350 * (mix.cementParts / totalParts) * 1.5
    const totalCementKg = volumeWithWaste * cementKgPerM3
    const cementBags = Math.ceil(totalCementKg / 25)

    // Calculate ballast needed
    const selectedMerchant = merchants.find(m => m.value === merchant)!
    const ballastKgPerM3 = 2000 * ((mix.sandParts + mix.gravelParts) / totalParts)
    const totalBallastKg = volumeWithWaste * ballastKgPerM3
    const bulkBags = Math.ceil(totalBallastKg / selectedMerchant.bulkBagSize)

    // Cost estimates (Q4 2025 UK prices)
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
    <div className="min-h-screen bg-gray-50">
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
            {/* APPLICATION TYPE */}
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

            {/* DIMENSIONS */}
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

            {/* MERCHANT SELECTION */}
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

            {/* CALCULATE BUTTON */}
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
      </div>

      {/* FINAL CTA */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Professional Tools for UK Builders</h3>
          <p className="text-green-50 mb-8 text-lg">
            Explore our complete range of calculators and tools built specifically for construction trades.
          </p>
          <a
            href="/"
            className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
          >
            View All Calculators
          </a>
        </div>
      </div>
    </div>
  )
}
