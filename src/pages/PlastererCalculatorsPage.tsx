import { Palette, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function PlasterCoverageCalculator() {
  const navigate = useNavigate()
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [coats, setCoats] = useState('2')
  const [coverage, setCoverage] = useState('8')
  const [wasteFactor, setWasteFactor] = useState('10')
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    const area = (parseFloat(length) || 0) * (parseFloat(width) || 0)
    const coverageRate = parseFloat(coverage) || 8
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <button 
          onClick={() => navigate('/plasterer-calculators')}
          className="flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Calculators
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
            <div className="flex items-center gap-3">
              <Palette className="w-8 h-8 text-white" />
              <div>
                <h1 className="text-3xl font-bold text-white">Plaster Coverage Calculator</h1>
                <p className="text-amber-100">Calculate plaster needed for any wall or ceiling</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Inputs */}
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
                    Coverage Rate (m²/kg)
                  </label>
                  <select
                    value={coverage}
                    onChange={(e) => setCoverage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-amber-500 focus:outline-none"
                  >
                    <option value="6">6 (Thick/Artex)</option>
                    <option value="8">8 (Standard)</option>
                    <option value="10">10 (Skim Coat)</option>
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

            {/* Results */}
            {result && (
              <div className="mt-12 pt-8 border-t-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Results</h2>
                
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
    </div>
  )
}

