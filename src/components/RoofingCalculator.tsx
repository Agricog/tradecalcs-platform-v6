import { useState } from 'react'
import { Home } from 'lucide-react'
export default function RoofingCalculator() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [pitch, setPitch] = useState('0')
  const [result, setResult] = useState('')
  const calculate = () => {
    if (!length || !width) { alert('Please fill in all fields'); return }
    const L = parseFloat(length); const W = parseFloat(width); const P = parseFloat(pitch)
    const pitchFactor = 1 + (P / 100) * 0.2; const area = (L * W) * pitchFactor
    setResult(`Roof Area: ${area.toFixed(2)}m² (Base: ${(L * W).toFixed(2)}m², Pitch adjustment: ${((area - (L * W)).toFixed(2))}m²)`)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-green-600 p-3 rounded-lg">
              <Home className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Roofing Calculator</h1>
          </div>
          <p className="text-gray-600 mb-8">Calculate roofing materials with pitch angle adjustments</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Length (meters)</label>
              <input type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="Enter length in meters" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width (meters)</label>
              <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Enter width in meters" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pitch (degrees)</label>
              <input type="number" value={pitch} onChange={(e) => setPitch(e.target.value)} placeholder="Enter pitch angle" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent" />
            </div>
            <button onClick={calculate} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition">Calculate</button>
            {result && (<div className="bg-green-50 border border-green-200 rounded-lg p-4"><p className="text-green-800 font-semibold">{result}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
