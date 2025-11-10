import { useState } from 'react'
import { Home } from 'lucide-react'

export default function RoofingCalculator() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [pitch, setPitch] = useState('30')
  const [result, setResult] = useState('')

  const calculate = () => {
    if (!length || !width) { alert('Please fill all fields'); return }
    const L = parseFloat(length)
    const W = parseFloat(width)
    const P = parseFloat(pitch)
    const baseArea = L * W
    const pitchRad = (P * Math.PI) / 180
    const pitchFactor = 1 / Math.cos(pitchRad)
    const area = baseArea * pitchFactor
    const extra = area - baseArea
    const tiles = Math.ceil(area / 0.06)
    const felt = Math.ceil(area / 10)
    setResult(`Area: ${area.toFixed(2)}m² | Tiles: ~${tiles} | Felt rolls: ${felt} | Pitch adj: +${extra.toFixed(2)}m²`)
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
          <p className="text-gray-600 mb-8">Calculate materials with pitch angle adjustments</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Length (meters)</label>
              <input type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="Enter length" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width (meters)</label>
              <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Enter width" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pitch (degrees)</label>
              <select value={pitch} onChange={(e) => setPitch(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="15">15° (Low)</option>
                <option value="30">30° (Standard)</option>
                <option value="45">45° (Steep)</option>
                <option value="60">60° (Very Steep)</option>
              </select>
            </div>
            <button onClick={calculate} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-bold hover:shadow-lg">Calculate</button>
            {result && (<div className="bg-green-50 border border-green-200 rounded-lg p-4"><p className="text-green-800 font-semibold text-sm">{result}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
