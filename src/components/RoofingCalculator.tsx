import { useState } from 'react'
import { Home, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function RoofingCalculator() {
  const [roofType, setRoofType] = useState('gable')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [pitch, setPitch] = useState('30')
  const [material, setMaterial] = useState('concrete')
  const [result, setResult] = useState<any>(null)

  const roofTypes = {
    gable: { name: 'Gable Roof', wasteFactor: 1.12 },
    hip: { name: 'Hip Roof', wasteFactor: 1.18 },
    complex: { name: 'Complex Roof', wasteFactor: 1.25 }
  }

  const materials = {
    concrete: { name: 'Concrete Tiles', costPerM2: 45, costPerTile: 1.30 },
    clay: { name: 'Clay Tiles', costPerM2: 65, costPerTile: 1.80 },
    slate: { name: 'Natural Slate', costPerM2: 85, costPerTile: 3.50 }
  }

  const calculate = () => {
    if (!length || !width) {
      alert('Please enter length and width')
      return
    }

    const L = parseFloat(length)
    const W = parseFloat(width)
    const P = parseFloat(pitch)
    
    // Base area
    const baseArea = L * W
    
    // Pitch adjustment (slope increases actual area)
    const pitchRad = (P * Math.PI) / 180
    const pitchFactor = 1 / Math.cos(pitchRad)
    const slopedArea = baseArea * pitchFactor
    
    // Waste factor for roof type
    const wasteMultiplier = roofTypes[roofType as keyof typeof roofTypes].wasteFactor
    const totalArea = slopedArea * wasteMultiplier
    
    // Material calculations
    const mat = materials[material as keyof typeof materials]
    const materialCost = totalArea * mat.costPerM2
    const tilesNeeded = Math.ceil(totalArea / 0.065) // ~0.065m² per tile
    
    // Labour (approx £15/m² for UK roofing)
    const labourRate = 15
    const labourCost = slopedArea * labourRate
    
    // Battens, felt, fixings (~£2.50/m²)
    const fixingsCost = slopedArea * 2.50
    
    // Total
    const totalCost = materialCost + labourCost + fixingsCost
    
    setResult({
      baseArea: baseArea.toFixed(2),
      slopedArea: slopedArea.toFixed(2),
      totalArea: totalArea.toFixed(2),
      wasteFactor: ((wasteMultiplier - 1) * 100).toFixed(0),
      materialCost: materialCost.toFixed(2),
      labourCost: labourCost.toFixed(2),
      fixingsCost: fixingsCost.toFixed(2),
      totalCost: totalCost.toFixed(2),
      tilesNeeded,
      roofTypeName: roofTypes[roofType as keyof typeof roofTypes].name,
      materialName: mat.name
    })
  }

  return (
    <div className="py-10 px-2 max-w-4xl mx-auto">
      <title>Roofing Calculator UK | Material & Labour Cost Estimator</title>
      <meta name="description" content="Professional roofing calculator for UK roofers and contractors. Pitch adjustment, waste factors, material costing (concrete/clay/slate), labour rates, and instant estimates." />
      
      <h1 className="text-4xl font-bold mb-3 text-green-900">Roofing Calculator</h1>
      <p className="mb-8 text-lg text-green-900 max-w-3xl">
        <b>Professional roofing estimator</b> for <span className="font-semibold">UK roofers, contractors, and builders</span>. Calculate material quantities, labour costs, waste factors, and total project budgets. Supports gable, hip, and complex roofs with accurate pitch adjustment and current UK material pricing.
      </p>

      <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-green-800">
            <b>Pro Tip:</b> Pitch increases your actual roof area significantly. A 45° roof can increase material needs by 40% vs flat measurement. This calculator accounts for it automatically.
          </p>
        </div>
      </div>

      <form className="space-y-6 bg-white rounded-xl shadow-xl p-8 mb-8">
        <div>
          <label className="font-semibold text-green-800 block mb-3">1. Roof Type</label>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(roofTypes).map(([key, val]) => (
              <button
                key={key}
                type="button"
                onClick={() => setRoofType(key)}
                className={`p-3 rounded-lg border-2 font-semibold text-sm ${
                  roofType === key 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'border-gray-300 text-gray-900 hover:border-green-300'
                }`}
              >
                {val.name}
                <p className="text-xs font-normal opacity-80 mt-1">{((val.wasteFactor - 1) * 100).toFixed(0)}% waste</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold text-green-800 block mb-1">2. Length (meters)</label>
            <input
              value={length}
              onChange={e => setLength(e.target.value)}
              type="number"
              min={0}
              step="0.1"
              placeholder="e.g., 10"
              className="input input-bordered w-full text-lg"
            />
          </div>
          <div>
            <label className="font-semibold text-green-800 block mb-1">3. Width (meters)</label>
            <input
              value={width}
              onChange={e => setWidth(e.target.value)}
              type="number"
              min={0}
              step="0.1"
              placeholder="e.g., 8"
              className="input input-bordered w-full text-lg"
            />
          </div>
        </div>

        <div>
          <label className="font-semibold text-green-800 block mb-1">4. Roof Pitch (degrees)</label>
          <select value={pitch} onChange={e => setPitch(e.target.value)} className="input input-bordered w-full text-lg">
            <option value="15">15° (Shallow / Industrial)</option>
            <option value="30">30° (Standard Pitched)</option>
            <option value="35">35° (Common)</option>
            <option value="45">45° (Steep)</option>
            <option value="60">60° (Very Steep)</option>
          </select>
          <div className="text-xs text-gray-500 mt-1">Higher pitch = more material needed</div>
        </div>

        <div>
          <label className="font-semibold text-green-800 block mb-3">5. Roofing Material</label>
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(materials).map(([key, val]) => (
              <button
                key={key}
                type="button"
                onClick={() => setMaterial(key)}
                className={`p-3 rounded-lg border-2 font-semibold text-sm ${
                  material === key 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'border-gray-300 text-gray-900 hover:border-green-300'
                }`}
              >
                {val.name}
                <p className="text-xs font-normal opacity-80 mt-1">£{val.costPerM2}/m²</p>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={calculate}
          className="btn btn-success w-full flex gap-2 items-center justify-center text-lg font-bold"
        >
          <Home className="w-6 h-6" />
          Calculate Roofing Cost
        </button>

        {result && (
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mt-6">
            <div className="flex items-start gap-2 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="text-lg font-bold text-green-900">Estimate Complete</p>
                <p className="text-sm text-green-700">{result.roofTypeName} | {result.materialName}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-3 rounded border border-green-200">
                <p className="text-xs text-gray-600 font-medium">Base Area</p>
                <p className="text-xl font-bold text-green-800">{result.baseArea}m²</p>
              </div>
              <div className="bg-white p-3 rounded border border-green-200">
                <p className="text-xs text-gray-600 font-medium">Sloped Area</p>
                <p className="text-xl font-bold text-green-800">{result.slopedArea}m²</p>
              </div>
              <div className="bg-white p-3 rounded border border-green-200">
                <p className="text-xs text-gray-600 font-medium">With Waste</p>
                <p className="text-xl font-bold text-green-800">{result.totalArea}m²</p>
                <p className="text-xs text-green-600">+{result.wasteFactor}%</p>
              </div>
              <div className="bg-white p-3 rounded border border-green-200">
                <p className="text-xs text-gray-600 font-medium">Tiles Needed</p>
                <p className="text-xl font-bold text-green-800">{result.tilesNeeded.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-2 border-t-2 border-green-200 pt-4">
              <div className="flex justify-between text-sm">
                <p>Materials ({result.materialName})</p>
                <p className="font-semibold">£{result.materialCost}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Labour (£15/m²)</p>
                <p className="font-semibold">£{result.labourCost}</p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Battens, Felt & Fixings</p>
                <p className="font-semibold">£{result.fixingsCost}</p>
              </div>
              <div className="flex justify-between text-lg font-bold bg-green-100 p-2 rounded mt-3 border border-green-300">
                <p>Total Estimate</p>
                <p className="text-green-800">£{result.totalCost}</p>
              </div>
            </div>

            <div className="text-xs text-gray-600 mt-4 bg-white p-2 rounded">
              💡 <b>Note:</b> Labour at £15/m² is typical UK residential rate (2025). Adjust based on your local market and complexity.
            </div>
          </div>
        )}
      </form>

      <section className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-green-900 mb-4">Why Accurate Roofing Estimates Matter</h2>
        <div className="space-y-3 text-gray-700">
          <p>Underestimating roofing projects costs thousands in overruns. Professional roofers account for:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li><b>Pitch adjustment</b> – A 45° roof needs ~40% more material than flat measurement</li>
            <li><b>Waste factors</b> – Complex roofs need 15-25% extra for cuts and breakage</li>
            <li><b>Material selection</b> – Clay vs concrete vs slate varies by £20-40/m²</li>
            <li><b>Labour costs</b> – Pitch, complexity, and UK region affect rates significantly</li>
            <li><b>Hidden costs</b> – Battens, felt, ventilation, flashings, and fixings add up</li>
          </ul>
        </div>
      </section>

      <section className="bg-green-50 border border-green-100 rounded-lg p-6">
        <h3 className="font-bold text-green-900 mb-3">Understanding Waste Factors</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
          <div className="bg-white p-3 rounded border border-green-200">
            <p className="font-semibold text-green-800">Gable (12%)</p>
            <p className="text-gray-700">Simple two-slope design, minimal cuts & waste</p>
          </div>
          <div className="bg-white p-3 rounded border border-green-200">
            <p className="font-semibold text-green-800">Hip (18%)</p>
            <p className="text-gray-700">Four slopes meet at ridge, more cuts required</p>
          </div>
          <div className="bg-white p-3 rounded border border-green-200">
            <p className="font-semibold text-green-800">Complex (25%)</p>
            <p className="text-gray-700">Dormers, valleys, multiple ridges, extensive cutting</p>
          </div>
        </div>
      </section>
    </div>
  )
}

