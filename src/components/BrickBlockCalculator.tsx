import { useState } from 'react'
import { Home, Info, CheckCircle2 } from 'lucide-react'

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

    let bricksPerM2 = 60 // Standard UK brick with 10mm joints
    let materialName = 'Bricks'
    let mortarPerItem = 0.004 // m³ mortar per brick

    if (materialType === 'block4') {
      bricksPerM2 = 10.76
      materialName = '4" Concrete Blocks'
      mortarPerItem = 0.0105 // m³ per block
    } else if (materialType === 'block6') {
      bricksPerM2 = 10.76
      materialName = '6" Concrete Blocks'
      mortarPerItem = 0.0105 // m³ per block
    }

    const itemsNeeded = Math.ceil(wallArea * bricksPerM2 * (1 + wasteFactor / 100))
    const mortarVolume = itemsNeeded * mortarPerItem

    // Mortar mix calculations
    let mortarRatioArray = mortarRatio.split(':').map(Number)
    let totalParts = mortarRatioArray[0] + mortarRatioArray[1]

    // Assuming 1 m³ mortar contains ~1500kg dry materials
    const totalMortarMass = mortarVolume * 1500
    const cementMass = (mortarRatioArray[0] / totalParts) * totalMortarMass
    const sandMass = (mortarRatioArray[1] / totalParts) * totalMortarMass

    const cementBags = Math.ceil(cementMass / 25) // 25kg bags
    const sandTonnes = sandMass / 1000
    const waterLitres = mortarVolume * 300 // Approximate water needed

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
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 p-6">
      <div className="max-w-2xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center text-white">
              <Home className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Brick & Block Calculator</h1>
          </div>
          <p className="text-gray-600">Calculate materials needed for brickwork or blockwork</p>
        </div>

        {/* INPUT SECTION */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="space-y-6">
            {/* Material Type */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Material Type</label>
              <select
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value as 'brick' | 'block4' | 'block6')}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none font-semibold"
              >
                <option value="brick">Standard UK Brick (215×102.5×65mm)</option>
                <option value="block4">4" Concrete Block (440×215×100mm)</option>
                <option value="block6">6" Concrete Block (440×215×140mm)</option>
              </select>
            </div>

            {/* Wall Dimensions */}
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

            {/* Mortar Mix Ratio */}
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

            {/* Waste Factor */}
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

            {/* Calculate Button */}
            <button
              onClick={calculate}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold transition"
            >
              Calculate Materials
            </button>
          </div>
        </div>

        {/* RESULTS SECTION */}
        {results && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center gap-2 mb-6">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <h2 className="text-xl font-bold text-gray-900">Materials Required</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
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

              {/* Right Column */}
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
    </div>
  )
}

