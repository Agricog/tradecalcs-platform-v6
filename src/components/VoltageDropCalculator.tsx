import { useState } from 'react'
import { Zap } from 'lucide-react'
export default function VoltageDropCalculator() {
  const [current, setCurrent] = useState('')
  const [resistance, setResistance] = useState('')
  const [result, setResult] = useState('')
  const calculate = () => {
    if (!current || !resistance) { alert('Please fill in all fields'); return }
    const I = parseFloat(current); const R = parseFloat(resistance)
    const voltageDrop = I * R; const percentageDrop = (voltageDrop / 230) * 100
    setResult(`Voltage Drop: ${voltageDrop.toFixed(2)}V (${percentageDrop.toFixed(2)}%)`)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Voltage Drop Calculator</h1>
          </div>
          <p className="text-gray-600 mb-8">Calculate voltage drop for any circuit length and load</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current (Amps)</label>
              <input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Enter current in amps" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Resistance (Ohms)</label>
              <input type="number" value={resistance} onChange={(e) => setResistance(e.target.value)} placeholder="Enter resistance in ohms" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent" />
            </div>
            <button onClick={calculate} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition">Calculate</button>
            {result && (<div className="bg-green-50 border border-green-200 rounded-lg p-4"><p className="text-green-800 font-semibold">{result}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
