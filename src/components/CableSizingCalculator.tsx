import { useState } from 'react'
import { Calculator } from 'lucide-react'

export default function CableSizingCalculator() {
  const [current, setCurrent] = useState('')
  const [length, setLength] = useState('')
  const [method, setMethod] = useState('B')
  const [temp, setTemp] = useState('30')
  const [result, setResult] = useState('')

  const calculate = () => {
    if (!current || !length) { alert('Please fill all fields'); return }
    const I = parseFloat(current)
    const L = parseFloat(length)
    const T = parseFloat(temp)
    let tempFactor = 1
    if (T === 40) tempFactor = 0.94
    else if (T === 45) tempFactor = 0.90
    else if (T === 50) tempFactor = 0.85
    let size = 1.5
    if (I <= 10.5) size = 1.5
    else if (I <= 13.5) size = 2.5
    else if (I <= 18) size = 4
    else if (I <= 24) size = 6
    else if (I <= 32) size = 10
    else if (I <= 41) size = 16
    else size = 25
    const adjustedCurrent = I / tempFactor
    const vd = (adjustedCurrent * L * 0.02) / size
    const percentVD = (vd / 230) * 100
    setResult(`Cable: ${size}mm² | VD: ${vd.toFixed(2)}V (${percentVD.toFixed(1)}%) | Temp Factor: ${tempFactor}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-3 rounded-lg">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Cable Size Calculator</h1>
          </div>
          <p className="text-gray-600 mb-8">BS 7671 compliant electrical cable sizing</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current (Amps)</label>
              <input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Enter current" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cable Length (m)</label>
              <input type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="Enter length" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Installation Method</label>
              <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="B">Clipped to surface (B)</option>
                <option value="C">In conduit (C)</option>
                <option value="E">In cable tray (E)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ambient Temp (°C)</label>
              <select value={temp} onChange={(e) => setTemp(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="30">30°C</option>
                <option value="40">40°C (0.94x)</option>
                <option value="45">45°C (0.90x)</option>
                <option value="50">50°C (0.85x)</option>
              </select>
            </div>
            <button onClick={calculate} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg">Calculate</button>
            {result && (<div className="bg-green-50 border border-green-200 rounded-lg p-4"><p className="text-green-800 font-semibold">{result}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
