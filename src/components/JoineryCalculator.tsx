import { useState } from 'react'
import { Hammer, CheckCircle2, Info } from 'lucide-react'

export default function JoineryCalculator() {
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

    // Convert mm to metres and calculate volume
    const L = parseFloat(length) / 1000
    const W = parseFloat(width) / 1000
    const H = parseFloat(height) / 1000
    const volumeM3 = L * W * H

    // Get labour estimate and waste factor
    const labourData = labourEstimates[projectType]
    const finishMultiplier = finishMultipliers[finish]

    // Calculate material cost
    const woodPrice = woodPrices[woodType]
    const wasteMultiplier = 1 + labourData.waste
    const totalVolume = volumeM3 * wasteMultiplier
    const materialCost = totalVolume * woodPrice

    // Calculate labour cost
    const baseHours = labourData.hours * (volumeM3 / 0.05) // Normalize for volume
    const finishedHours = baseHours * finishMultiplier
    const rate = parseFloat(hourlyRate)
    const labourCost = finishedHours * rate

    // Total
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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-amber-200 mb-8">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-6">
        <div className="flex items-center gap-3">
          <Hammer className="w-8 h-8 text-white" />
          <div>
            <h2 className="text-3xl font-bold text-white">Joinery Material & Labour Cost Calculator</h2>
            <p className="text-amber-100">Calculate accurate wood costs, labour hours & project pricing instantly</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="space-y-6">
          {/* PROJECT TYPE */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">1. Project Type</label>
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
            >
              <option value="built-in">Built-in Wardrobe/Storage</option>
              <option value="kitchen">Fitted Kitchen</option>
              <option value="staircase">Staircase</option>
              <option value="doors">Custom Doors</option>
              <option value="shelving">Shelving/Bookcases</option>
              <option value="bespoke">Bespoke Furniture</option>
            </select>
          </div>

          {/* WOOD TYPE */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">2. Wood Type</label>
            <select
              value={woodType}
              onChange={(e) => setWoodType(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
            >
              <option value="pine">Pine (£450/m³)</option>
              <option value="oak">Oak (£850/m³)</option>
              <option value="walnut">Walnut (£1200/m³)</option>
              <option value="mdf">MDF (£320/m³)</option>
              <option value="plywood">Plywood (£380/m³)</option>
            </select>
          </div>

          {/* DIMENSIONS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">3. Length (mm)</label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="e.g. 2400"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">4. Width (mm)</label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="e.g. 1200"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">5. Height/Depth (mm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="e.g. 600"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          {/* FINISH */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">6. Wood Finish</label>
            <select
              value={finish}
              onChange={(e) => setFinish(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
            >
              <option value="natural">Natural (no finish)</option>
              <option value="stain">Stain (+15% labour)</option>
              <option value="paint">Paint (+25% labour)</option>
              <option value="varnish">Varnish (+35% labour)</option>
            </select>
          </div>

          {/* HOURLY RATE */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">7. Your Hourly Rate (£/hour)</label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="e.g. 45"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">UK average: £35-£60/hour. Adjust based on your experience & location.</p>
          </div>

          {/* CALCULATE BUTTON */}
          <button
            onClick={calculate}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 rounded-lg font-bold text-lg transition"
          >
            Calculate Project Cost
          </button>
        </div>

        {/* RESULTS */}
        {result && (
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <h3 className="text-2xl font-bold text-gray-900">Calculation Complete</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200">
                <p className="text-sm text-gray-600 mb-2">Project Type</p>
                <p className="text-2xl font-bold text-amber-600">{result.projectType}</p>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                <p className="text-sm text-gray-600 mb-2">Wood Type</p>
                <p className="text-2xl font-bold text-orange-600">{result.woodType}</p>
              </div>

              <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200">
                <p className="text-sm text-gray-600 mb-2">Total Wood Volume (inc. waste)</p>
                <p className="text-2xl font-bold text-amber-600">{result.totalVolume} m³</p>
              </div>

              <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
                <p className="text-sm text-gray-600 mb-2">Waste Factor</p>
                <p className="text-2xl font-bold text-orange-600">{result.wastePercentage}%</p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 p-6 rounded-lg mb-6">
              <h4 className="font-bold text-gray-900 mb-4">Cost Breakdown</h4>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <p className="text-gray-700">Material Cost ({result.woodType})</p>
                  <p className="font-semibold text-gray-900">£{result.materialCost}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Estimated Labour Hours</p>
                  <p className="font-semibold text-gray-900">{result.estimatedHours} hrs</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Labour Rate</p>
                  <p className="font-semibold text-gray-900">£{result.hourlyRate}/hr</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-700">Labour Cost</p>
                  <p className="font-semibold text-gray-900">£{result.labourCost}</p>
                </div>
              </div>

              <div className="border-t-2 border-gray-200 pt-4 flex justify-between bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded">
                <p className="font-bold text-gray-900 text-lg">Total Project Cost</p>
                <p className="font-bold text-amber-600 text-2xl">£{result.totalCost}</p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold mb-1">💡 Pro Tips:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• This calculation includes {result.wastePercentage}% waste factor for {result.projectType.toLowerCase()}</li>
                    <li>• Finish type adds {((finishMultipliers[finish] - 1) * 100).toFixed(0)}% to labour time</li>
                    <li>• Adjust your hourly rate based on project complexity & your experience level</li>
                    <li>• Material prices are Q4 2025 UK market rates — confirm with your supplier</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
