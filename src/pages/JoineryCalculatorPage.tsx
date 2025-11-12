import { CheckCircle2, HelpCircle, Hammer } from 'lucide-react'
import { useState } from 'react'

export default function JoineryCalculatorPage() {
  const [projectType, setProjectType] = useState('built-in')
  const [woodType, setWoodType] = useState('pine')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [finish, setFinish] = useState('natural')
  const [hourlyRate, setHourlyRate] = useState('45')
  const [result, setResult] = useState<any>(null)

  // Wood pricing (GBP per m³) - Q4 2025 UK market rates
  const woodPrices: { [key: string]: number } = {
    'pine': 450,
    'oak': 850,
    'walnut': 1200,
    'mdf': 320,
    'plywood': 380
  }

  // Estimated labour hours by project type (per m³ of wood)
  const labourEstimates: { [key: string]: { hours: number; waste: number } } = {
    'built-in': { hours: 12, waste: 0.18 },
    'kitchen': { hours: 15, waste: 0.20 },
    'staircase': { hours: 20, waste: 0.22 },
    'doors': { hours: 8, waste: 0.15 },
    'shelving': { hours: 5, waste: 0.12 },
    'bespoke': { hours: 25, waste: 0.25 }
  }

  // Finish multiplier (time increase)
  const finishMultipliers: { [key: string]: number } = {
    'natural': 1.0,
    'stain': 1.15,
    'paint': 1.25,
    'varnish': 1.35
  }

  const calculate = () => {
    if (!length || !width || !height || !hourlyRate) {
      alert('Please fill in all fields')
      return
    }

    const L = parseFloat(length) / 1000
    const W = parseFloat(width) / 1000
    const H = parseFloat(height) / 1000
    const volumeM3 = L * W * H

    const labourData = labourEstimates[projectType]
    const finishMultiplier = finishMultipliers[finish]

    const woodPrice = woodPrices[woodType]
    const wasteMultiplier = 1 + labourData.waste
    const totalVolume = volumeM3 * wasteMultiplier
    const materialCost = totalVolume * woodPrice

    const baseHours = labourData.hours * (volumeM3 / 0.05)
    const finishedHours = baseHours * finishMultiplier
    const rate = parseFloat(hourlyRate)
    const labourCost = finishedHours * rate

    const totalCost = materialCost + labourCost

    setResult({
      projectType: projectType.charAt(0).toUpperCase() + projectType.slice(1),
      woodType: woodType.charAt(0).toUpperCase() + woodType.slice(1),
      volumeM3: volumeM3.toFixed(3),
      totalVolume: totalVolume.toFixed(3),
      wastePercentage: (labourData.waste * 100).toFixed(0),
      materialCost: materialCost.toFixed(2),
      estimatedHours: finishedHours.toFixed(1),
      hourlyRate: rate.toFixed(2),
      labourCost: labourCost.toFixed(2),
      totalCost: totalCost.toFixed(2),
      finish: finish.charAt(0).toUpperCase() + finish.slice(1)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-white font-semibold flex items-center gap-2 hover:opacity-90 transition w-fit">
            ← Back to All Calculators
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Joinery Cost Calculator for UK Joiners
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Calculate wood costs, labour hours & project pricing instantly
          </p>
          <p className="text-gray-600 mb-6">
            Industry-trusted calculator for professional joiners and carpenters across the UK. Includes material costs, labour estimates, and waste factors for bespoke joinery projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Project Cost</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Project Type</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                  >
                    <option value="built-in">Built-in Wardrobe/Storage</option>
                    <option value="kitchen">Fitted Kitchen</option>
                    <option value="staircase">Staircase</option>
                    <option value="doors">Custom Doors</option>
                    <option value="shelving">Shelving/Bookcases</option>
                    <option value="bespoke">Bespoke Furniture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Wood Type</label>
                  <select
                    value={woodType}
                    onChange={(e) => setWoodType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                  >
                    <option value="pine">Pine (£450/m³)</option>
                    <option value="oak">Oak (£850/m³)</option>
                    <option value="walnut">Walnut (£1200/m³)</option>
                    <option value="mdf">MDF (£320/m³)</option>
                    <option value="plywood">Plywood (£380/m³)</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Length (mm)</label>
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="e.g. 2400"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Width (mm)</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="e.g. 1200"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Height/Depth (mm)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g. 600"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Wood Finish</label>
                  <select
                    value={finish}
                    onChange={(e) => setFinish(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                  >
                    <option value="natural">Natural (no finish)</option>
                    <option value="stain">Stain (+15% labour)</option>
                    <option value="paint">Paint (+25% labour)</option>
                    <option value="varnish">Varnish (+35% labour)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Hourly Rate (£/hour)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    placeholder="e.g. 45"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                  />
                </div>

                <button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold transition"
                >
                  Calculate Project Cost
                </button>
              </div>
            </div>

            {result && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Cost Breakdown</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                      <p className="text-sm text-gray-600">Total Wood Volume (inc. waste)</p>
                      <p className="text-2xl font-bold text-gray-900">{result.totalVolume} m³</p>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                      <p className="text-sm text-gray-600">Material Cost ({result.woodType})</p>
                      <p className="text-2xl font-bold text-gray-900">£{result.materialCost}</p>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                      <p className="text-sm text-gray-600">Estimated Labour Hours</p>
                      <p className="text-2xl font-bold text-gray-900">{result.estimatedHours} hrs</p>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                      <p className="text-sm text-gray-600">Labour Cost (£{result.hourlyRate}/hr)</p>
                      <p className="text-2xl font-bold text-gray-900">£{result.labourCost}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-4">💡 Pro Tips</h3>
                    <ul className="text-sm text-gray-700 space-y-3">
                      <li><strong>Waste factor:</strong> {result.wastePercentage}% added for {result.projectType.toLowerCase()}</li>
                      <li><strong>Finish impact:</strong> {result.finish} adds labour time</li>
                      <li><strong>Material prices:</strong> Q4 2025 market rates — confirm with supplier</li>
                      <li><strong>Hourly rate:</strong> Adjust based on complexity & experience</li>
                      <li><strong>Quote buffer:</strong> Add 10-15% contingency for unforeseen issues</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-lg mt-6 flex justify-between items-center">
                  <p className="text-lg font-semibold">Total Project Cost</p>
                  <p className="text-3xl font-bold">£{result.totalCost}</p>
                </div>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  ✓ Waste factor: {result.wastePercentage}% • Finish: {result.finish} • Labour: £{result.hourlyRate}/hr
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-600">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Quick Tips
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Measure all dimensions accurately in mm</li>
                <li>• Add extra waste for complex cuts</li>
                <li>• Quality wood costs more upfront</li>
                <li>• Finish type affects labour time significantly</li>
                <li>• Always account for contingency</li>
              </ul>

