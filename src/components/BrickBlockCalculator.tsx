import { useState } from 'react'
import { Info, CheckCircle2, HelpCircle } from 'lucide-react'

export default function BrickBlockCalculator() {
  const [materialType, setMaterialType] = useState<'brick' | 'block4' | 'block6'>('brick')
  const [length, setLength] = useState('')
  const [height, setHeight] = useState('')
  const [mortarRatio, setMortarRatio] = useState('1:5')
  const [wasteFactor, setWasteFactor] = useState(5)
  const [results, setResults] = useState<any>(null)

  const calculate = () => {
    if (!length || !height) return

    const lengthM = parseFloat(length)
    const heightM = parseFloat(height)
    const wallArea = lengthM * heightM

    let bricksPerM2 = 60
    let materialName = 'Bricks'
    let mortarPerItem = 0.004

    if (materialType === 'block4') {
      bricksPerM2 = 10.76
      materialName = '4 inch Concrete Blocks'
      mortarPerItem = 0.0105
    } else if (materialType === 'block6') {
      bricksPerM2 = 10.76
      materialName = '6 inch Concrete Blocks'
      mortarPerItem = 0.0105
    }

    const itemsNeeded = Math.ceil(wallArea * bricksPerM2 * (1 + wasteFactor / 100))
    const mortarVolume = itemsNeeded * mortarPerItem

    let mortarRatioArray = mortarRatio.split(':').map(Number)
    let totalParts = mortarRatioArray[0] + mortarRatioArray[1]

    const totalMortarMass = mortarVolume * 1500
    const cementMass = (mortarRatioArray[0] / totalParts) * totalMortarMass
    const sandMass = (mortarRatioArray[1] / totalParts) * totalMortarMass

    const cementBags = Math.ceil(cementMass / 25)
    const sandTonnes = sandMass / 1000
    const waterLitres = mortarVolume * 300

    setResults({
      materialName,
      itemsNeeded,
      cementBags,
      sandTonnes: sandTonnes.toFixed(2),
      waterLitres: waterLitres.toFixed(0),
      mortarVolume: mortarVolume.toFixed(3),
      wallArea: wallArea.toFixed(2)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-white font-semibold flex items-center gap-2 hover:opacity-90 transition w-fit">
            ← Back to All Calculators
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Free Brick & Block Calculator for UK Bricklayers
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Calculate the exact number of bricks, blocks, mortar and cement needed for your brickwork project instantly
          </p>
          <p className="text-gray-600 mb-6">
            Professional materials calculator trusted by bricklayers across the UK. No signup required - free to use.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Materials</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Material Type</label>
                  <select
                    value={materialType}
                    onChange={(e) => setMaterialType(e.target.value as 'brick' | 'block4' | 'block6')}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none font-semibold"
                  >
                    <option value="brick">Standard UK Brick (215×102.5×65mm)</option>
                    <option value="block4">4 inch Concrete Block (440×215×100mm)</option>
                    <option value="block6">6 inch Concrete Block (440×215×140mm)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Length (metres)</label>
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="e.g. 10"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Height (metres)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g. 2.5"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Mortar Mix Ratio (Cement:Sand)</label>
                  <select
                    value={mortarRatio}
                    onChange={(e) => setMortarRatio(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none font-semibold"
                  >
                    <option value="1:4">1:4 (Stronger - Structural walls)</option>
                    <option value="1:5">1:5 (Standard - General brickwork)</option>
                    <option value="1:6">1:6 (Weaker - Non-load bearing)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-gray-700">Waste Factor: {wasteFactor}%</label>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={wasteFactor}
                    onChange={(e) => setWasteFactor(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical waste: 5-10%</p>
                </div>

                <button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold transition"
                >
                  Calculate Materials
                </button>
              </div>
            </div>

            {results && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Materials Required</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                      <p className="text-sm text-gray-600">Wall Area</p>
                      <p className="text-2xl font-bold text-gray-900">{results.wallArea} m²</p>
                    </div>

                    <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                      <p className="text-sm text-gray-600">{results.materialName}</p>
                      <p className="text-2xl font-bold text-gray-900">{results.itemsNeeded.toLocaleString()}</p>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                      <p className="text-sm text-gray-600">Mortar Volume</p>
                      <p className="text-2xl font-bold text-gray-900">{results.mortarVolume} m³</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                      <p className="text-sm text-gray-600">Cement (25kg Bags)</p>
                      <p className="text-2xl font-bold text-gray-900">{results.cementBags}</p>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                      <p className="text-sm text-gray-600">Sand</p>
                      <p className="text-2xl font-bold text-gray-900">{results.sandTonnes} tonnes</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                      <p className="text-sm text-gray-600">Water Required</p>
                      <p className="text-2xl font-bold text-gray-900">{results.waterLitres} litres</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-6 text-center">
                  ✓ Includes waste factor of {wasteFactor}% • {results.materialName} with {mortarRatio} mortar
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
                <li>• <strong>1:5 ratio</strong> is standard for most brickwork</li>
                <li>• <strong>1:4</strong> for stronger structural walls</li>
                <li>• <strong>1:6</strong> for non-load bearing walls</li>
                <li>• Add <strong>5-10% waste</strong> for breakage</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-3">How It Works</h3>
              <p className="text-sm text-gray-700 mb-4">
                This calculator estimates materials based on wall area and standard brick/block dimensions.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Standard UK brick sizes</li>
                <li>✓ 4 inch and 6 inch concrete blocks</li>
                <li>✓ Mortar mix ratios</li>
                <li>✓ Waste factor included</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Brick Calculator Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Mortar Mix Ratios Explained</h3>
              <p className="text-gray-700 text-sm mb-4">
                The ratio shows the proportion of cement to sand. Higher cement ratios make stronger mortar.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>1:4 Ratio:</strong> Strongest mortar, use for structural walls and below ground</li>
                <li><strong>1:5 Ratio:</strong> Standard mortar, best for general brickwork and most projects</li>
                <li><strong>1:6 Ratio:</strong> Weaker mortar, for non-load bearing internal walls</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Material Quantities</h3>
              <p className="text-gray-700 text-sm mb-4">
                Our calculator provides exact quantities to order from UK builders merchants.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Bricks:</strong> Count of individual units needed</li>
                <li><strong>Cement Bags:</strong> Number of 25kg bags (standard UK size)</li>
                <li><strong>Sand:</strong> Weight in tonnes for ordering</li>
                <li><strong>Water:</strong> Approximate amount needed for mixing</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
            <h3 className="font-bold text-gray-900 mb-2">Important Notes</h3>
            <p className="text-sm text-gray-700">
              This calculator provides estimates based on standard UK brick and block dimensions. Always verify measurements on site before ordering materials. Factors like wall bonds, openings, and site conditions may affect actual requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

                    



