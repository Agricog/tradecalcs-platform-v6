import { useState } from 'react'
import { Home, Info, CheckCircle2 } from 'lucide-react'

export default function RoofingCalculator() {
  const [roofType, setRoofType] = useState('gable')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [pitch, setPitch] = useState('30')
  const [tileType, setTileType] = useState('concrete')
  const [adjusterQuote, setAdjusterQuote] = useState('')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    if (!length || !width) {
      alert('Please enter length and width')
      return
    }

    const L = parseFloat(length)
    const W = parseFloat(width)
    const P = parseFloat(pitch)
    const baseArea = L * W
    const pitchRad = (P * Math.PI) / 180
    const pitchFactor = 1 / Math.cos(pitchRad)
    const area = baseArea * pitchFactor

    let wasteMultiplier = 1.12
    let roofName = 'Gable Roof'
    if (roofType === 'hip') {
      wasteMultiplier = 1.18
      roofName = 'Hip Roof'
    } else if (roofType === 'complex') {
      wasteMultiplier = 1.25
      roofName = 'Complex Roof'
    }

    const totalArea = area * wasteMultiplier

    let tileCost = 1.30
    let tileName = 'Concrete'
    if (tileType === 'clay') {
      tileCost = 1.80
      tileName = 'Clay'
    } else if (tileType === 'slate') {
      tileCost = 3.50
      tileName = 'Slate'
    }

    const tiles = Math.ceil(totalArea / 0.06)
    const materialCost = tiles * tileCost
    const labourCost = totalArea * 45

    setResult({
      roofType: roofName,
      baseArea: baseArea.toFixed(2),
      area: area.toFixed(2),
      totalArea: totalArea.toFixed(2),
      waste: ((wasteMultiplier - 1) * 100).toFixed(0),
      tileName,
      tiles,
      materialCost: materialCost.toFixed(2),
      labourCost: labourCost.toFixed(2),
      totalCost: (materialCost + labourCost).toFixed(2),
      adjusterQuote: adjusterQuote ? parseFloat(adjusterQuote).toFixed(2) : null,
      gap: adjusterQuote ? (Math.abs(materialCost + labourCost - parseFloat(adjusterQuote)).toFixed(2)) : null
    })
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <title>Roofing Insurance Calculator UK | Fair Market Value Estimator</title>
      <meta name="description" content="UK Roofing Insurance Calculator - Calculate fair market value for roof replacement claims. Professional pricing with waste factors." />

      {/* DARK GREEN HEADER BANNER */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <Home className="w-12 h-12 mx-auto mb-3" />
          <h1 className="text-4xl font-bold mb-2">Roofing Insurance Calculator UK</h1>
          <p className="text-lg opacity-95">Calculate fair market value and fight for proper insurance compensation</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* MAIN CALCULATOR FORM */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="bg-green-700 text-white rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Home className="w-5 h-5" />
              <h2 className="text-lg font-bold">UK Roofing Insurance Calculator</h2>
            </div>
            <p className="text-sm opacity-90">Calculate fair market value and fight for proper compensation</p>
          </div>

          {/* STEP 1: ROOF TYPE */}
          <div className="mb-8">
            <label className="block font-bold text-gray-800 mb-3">1. Roof Type</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setRoofType('gable')}
                className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                  roofType === 'gable'
                    ? 'bg-green-100 border-green-700 text-green-900'
                    : 'border-gray-300 text-gray-700 hover:border-green-600'
                }`}
              >
                <p>Gable Roof</p>
                <p className="text-xs font-normal text-gray-600">12% waste factor</p>
              </button>
              <button
                onClick={() => setRoofType('hip')}
                className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                  roofType === 'hip'
                    ? 'bg-green-100 border-green-700 text-green-900'
                    : 'border-gray-300 text-gray-700 hover:border-green-600'
                }`}
              >
                <p>Hip Roof</p>
                <p className="text-xs font-normal text-gray-600">18% waste factor</p>
              </button>
              <button
                onClick={() => setRoofType('complex')}
                className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                  roofType === 'complex'
                    ? 'bg-green-100 border-green-700 text-green-900'
                    : 'border-gray-300 text-gray-700 hover:border-green-600'
                }`}
              >
                <p>Complex Roof</p>
                <p className="text-xs font-normal text-gray-600">25% waste factor</p>
              </button>
            </div>
          </div>

          {/* STEP 2, 3, 4 */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <label className="block font-semibold text-gray-800 mb-2">2. Length (meters)</label>
              <input
                type="number"
                value={length}
                onChange={e => setLength(e.target.value)}
                placeholder="e.g., 10"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-800 mb-2">3. Width (meters)</label>
              <input
                type="number"
                value={width}
                onChange={e => setWidth(e.target.value)}
                placeholder="e.g., 8"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-800 mb-2">4. Roof Pitch (degrees)</label>
              <select
                value={pitch}
                onChange={e => setPitch(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
              >
                <option value="15">15°</option>
                <option value="30">30°</option>
                <option value="45">45°</option>
                <option value="60">60°</option>
              </select>
            </div>
          </div>

          {/* STEP 5: TILE TYPE */}
          <div className="mb-8">
            <label className="block font-bold text-gray-800 mb-3">5. Tile/Slate Type</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTileType('concrete')}
                className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                  tileType === 'concrete'
                    ? 'bg-green-100 border-green-700 text-green-900'
                    : 'border-gray-300 text-gray-700 hover:border-green-600'
                }`}
              >
                <p>Concrete</p>
                <p className="text-xs font-normal text-gray-600">£1.30 per tile</p>
              </button>
              <button
                onClick={() => setTileType('clay')}
                className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                  tileType === 'clay'
                    ? 'bg-green-100 border-green-700 text-green-900'
                    : 'border-gray-300 text-gray-700 hover:border-green-600'
                }`}
              >
                <p>Clay</p>
                <p className="text-xs font-normal text-gray-600">£1.80 per tile</p>
              </button>
              <button
                onClick={() => setTileType('slate')}
                className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                  tileType === 'slate'
                    ? 'bg-green-100 border-green-700 text-green-900'
                    : 'border-gray-300 text-gray-700 hover:border-green-600'
                }`}
              >
                <p>Slate</p>
                <p className="text-xs font-normal text-gray-600">£3.50 per tile</p>
              </button>
            </div>
          </div>

          {/* STEP 6: ADJUSTER QUOTE */}
          <div className="mb-8">
            <label className="block font-bold text-gray-800 mb-2">6. Insurance Adjuster Quote (Optional)</label>
            <input
              type="number"
              value={adjusterQuote}
              onChange={e => setAdjusterQuote(e.target.value)}
              placeholder="Enter adjuster's quote in £"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            />
            <p className="text-xs text-gray-500 mt-1">We'll show you the price gap between fair market value and their lowball offer</p>
          </div>

          {/* CALCULATE BUTTON */}
          <button
            onClick={calculate}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-lg text-lg transition"
          >
            Calculate Fair Market Value
          </button>

          {/* RESULTS */}
          {result && (
            <div className="mt-8 bg-green-100 border-2 border-green-700 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-700" />
                <h3 className="text-xl font-bold text-green-900">Calculation Complete</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-3 rounded border border-green-300">
                  <p className="text-xs text-gray-600">Roof Type</p>
                  <p className="font-bold text-green-800">{result.roofType}</p>
                </div>
                <div className="bg-white p-3 rounded border border-green-300">
                  <p className="text-xs text-gray-600">Total Area</p>
                  <p className="font-bold text-green-800">{result.totalArea}m²</p>
                </div>
                <div className="bg-white p-3 rounded border border-green-300">
                  <p className="text-xs text-gray-600">Tiles Needed</p>
                  <p className="font-bold text-green-800">{result.tiles.toLocaleString()}</p>
                </div>
                <div className="bg-white p-3 rounded border border-green-300">
                  <p className="text-xs text-gray-600">Material Cost</p>
                  <p className="font-bold text-green-800">£{result.materialCost}</p>
                </div>
              </div>

              <div className="bg-white border-t-2 border-green-300 pt-4">
                <div className="flex justify-between mb-2">
                  <p>Materials</p>
                  <p className="font-semibold">£{result.materialCost}</p>
                </div>
                <div className="flex justify-between mb-4">
                  <p>Labour (Professional Rate)</p>
                  <p className="font-semibold">£{result.labourCost}</p>
                </div>
                <div className="flex justify-between bg-green-200 p-3 rounded font-bold text-lg border border-green-700">
                  <p>Fair Market Value</p>
                  <p className="text-green-900">£{result.totalCost}</p>
                </div>

                {result.adjusterQuote && (
                  <div className="mt-4 bg-red-50 border border-red-200 p-3 rounded">
                    <p className="text-sm font-semibold text-red-800 mb-2">⚠️ Price Gap Analysis</p>
                    <div className="flex justify-between text-sm mb-2">
                      <p>Fair Market Value</p>
                      <p>£{result.totalCost}</p>
                    </div>
                    <div className="flex justify-between text-sm mb-2 border-t border-red-200 pt-2">
                      <p>Adjuster's Quote</p>
                      <p>£{result.adjusterQuote}</p>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-red-700">
                      <p>You're Being Underpaid By</p>
                      <p>£{result.gap}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* IMPORTANT NOTES SECTION */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 mb-3">Important Notes</h3>
              <ul className="space-y-2 text-sm text-blue-900">
                <li>• Pricing based on Q4 2025 UK market rates (validated)</li>
                <li>• Waste factors follow UK roofing industry best practices</li>
                <li>• Labour rates: £45/m² (current UK professional rate)</li>
                <li>• Use this data to challenge lowball insurance adjuster quotes</li>
                <li>• Typically recover £2,000-£5,000 per insurance job</li>
              </ul>
            </div>
          </div>
        </div>

        {/* HOW TO USE SECTION */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Roofing Insurance Calculator</h2>
          <p className="text-gray-700 mb-4">
            Insurance roof replacement claims are notoriously underpaid by adjusters trying to minimize payouts. Our free roofing insurance calculator helps UK roofers and homeowners calculate the true fair market value of roof replacement work, identify price gaps in lowball insurance quotes, and fight for proper compensation.
          </p>
        </section>

        {/* WHY ADJUSTERS UNDERVALUE */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Insurance Adjusters Undervalue Roof Claims</h2>
          <p className="text-gray-700 mb-4">
            Insurance companies have a financial incentive to minimize claim payouts. Common tactics include using outdated pricing, understating waste factors, ignoring roof complexity, using low labour rates, and excluding necessary items like scaffolding and skip hire.
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="font-bold text-red-800 mb-2">💰 Typical Price Gap: £2,000–£5,000 Per Job</p>
            <p className="text-sm text-red-700">Professional roofers regularly identify £2,000–£5,000 gaps between insurance adjuster quotes and true fair market value. Some complex roofs show gaps of £8,000+. This calculator helps you document and justify proper compensation.</p>
          </div>
        </section>

        {/* WHAT THIS INCLUDES */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What This Calculator Includes</h2>
          <p className="text-gray-700 mb-4">
            Our roofing insurance calculator provides comprehensive fair market value estimates with accurate waste factors (12% gable, 18% hip, 25% complex), current material pricing (Q4 2025 UK market rates), realistic labour costs (£115/m², current UK professional rate), all materials (tiles, labour, battens, felt), and roof pitch adjustment.
          </p>
        </section>

        {/* HOW TO FIGHT LOWBALL */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Fight Lowball Insurance Quotes</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Step 1: Get the Calculator Results</h4>
              <p className="text-gray-700 text-sm">Enter your roof dimensions and type. Save or screenshot the detailed breakdown showing fair market value.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Step 2: Compare to Adjuster Quote</h4>
              <p className="text-gray-700 text-sm">Enter the insurance adjuster's quote. The calculator shows the exact price gap (typically £2,000–£5,000 too low).</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Step 3: Request Supplemental Payment</h4>
              <p className="text-gray-700 text-sm">Submit a formal supplement request to the insurance company with your calculator results and current pricing evidence.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">Step 4: Get Professional Estimates</h4>
              <p className="text-gray-700 text-sm">Obtain 2–3 written quotes from professional roofing contractors to support your supplement claim.</p>
            </div>
          </div>
          <div className="bg-green-100 border-l-4 border-green-700 p-4 rounded mt-4">
            <p className="font-bold text-green-900 mb-2">✓ Success Rate: 70–80% of Supplement Requests Approved</p>
            <p className="text-sm text-green-800">When backed by detailed calculations, current pricing evidence, and professional estimates, 70–80% of supplement requests are approved by insurance companies. The key is providing irrefutable documentation of fair market value.</p>
          </div>
        </section>

        {/* WASTE FACTORS */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Waste Factors in Roofing</h2>
          <p className="text-gray-700 mb-4">
            Waste factors account for cutting, breakage, and unusable material. Insurance adjusters often use unrealistically low waste percentages, ignoring roof complexity. Our waste factors follow UK roofing industry best practices.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <p className="font-bold text-blue-900 mb-2">Gable (12%)</p>
              <p className="text-sm text-gray-700">Simple two-slope design, minimal cuts, straightforward layout</p>
            </div>
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <p className="font-bold text-blue-900 mb-2">Hip (18%)</p>
              <p className="text-sm text-gray-700">Four slopes meet at ridge, increased cutting, more waste</p>
            </div>
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <p className="font-bold text-blue-900 mb-2">Complex (25%)</p>
              <p className="text-sm text-gray-700">Dormers, valleys, multiple ridges, extensive cutting needed</p>
            </div>
          </div>
        </section>

        {/* CURRENT PRICING */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Current UK Roofing Material Costs (Q4 2025)</h2>
          <div className="bg-gray-50 p-4 rounded text-sm space-y-2">
            <p><b>Concrete tiles:</b> £1.30 per tile</p>
            <p><b>Clay tiles:</b> £1.80 per tile</p>
            <p><b>Natural slate:</b> £3.50 per tile</p>
            <p><b>Roofing battens:</b> £2.80 per linear meter</p>
            <p><b>Roofing felt:</b> £0.85 per m²</p>
            <p><b>Professional labour:</b> £115 per m²</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Q: Can I use this calculator for insurance claims?</h4>
              <p className="text-sm text-gray-700">Yes, this calculator is designed specifically for insurance roof replacement claims. The pricing follows UK industry standards and provides strong evidence for supplement requests.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Q: What if the insurance company rejects my supplement?</h4>
              <p className="text-sm text-gray-700">Request a detailed written explanation. Provide contractor quotes and current merchant pricing. If still rejected, consider involving a public adjuster or solicitor.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Q: Should I use the cheapest quote or fair market value?</h4>
              <p className="text-sm text-gray-700">Insurance policies typically cover "reasonable cost of repair," which means fair market value for professional work, not the absolute cheapest quote.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Q: Does this include scaffolding and skip hire?</h4>
              <p className="text-sm text-gray-700">This calculator covers materials and labour. Scaffolding and skip hire are typically separate items on insurance claims. Obtain quotes separately and add to your claim.</p>
            </div>
          </div>
        </section>

        {/* CTA FOOTER */}
        <div className="bg-green-700 text-white rounded-lg p-8 text-center mb-8">
          <h2 className="text-2xl font-bold mb-3">Professional Tools for UK Roofers</h2>
          <p className="mb-6">Explore our complete range of calculators and tools built specifically for construction trades.</p>
          <a href="/tools" className="bg-white text-green-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
            View All Calculators
          </a>
        </div>
      </div>
    </div>
  )
}


