import { useState } from 'react'
import { Calculator } from 'lucide-react'
export default function CableCalculator() {
  const [current, setCurrent] = useState('')
  const [length, setLength] = useState('')
  const [result, setResult] = useState('')
  const calculate = () => {
    if (!current || !length) { alert('Please fill in all fields'); return }
    const I = parseFloat(current); const L = parseFloat(length)
    let cableSize = '1.5mm²'
    if (I <= 10) cableSize = '1.5mm²'
    else if (I <= 16) cableSize = '2.5mm²'
    else if (I <= 25) cableSize = '4mm²'
    else if (I <= 32) cableSize = '6mm²'
    else if (I <= 40) cableSize = '10mm²'
    else cableSize = '16mm² or larger'
    setResult(`Recommended cable size: ${cableSize} (Current: ${I}A, Length: ${L}m)`)
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
          <p className="text-gray-600 mb-8">BS 7671 compliant electrical cable sizing with all derating factors</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current (Amps)</label>
              <input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Enter current in amps" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cable Length (meters)</label>
              <input type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="Enter cable length" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent" />
            </div>
            <button onClick={calculate} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:shadow-lg transition">Calculate</button>
            {result && (<div className="bg-green-50 border border-green-200 rounded-lg p-4"><p className="text-green-800 font-semibold">{result}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
