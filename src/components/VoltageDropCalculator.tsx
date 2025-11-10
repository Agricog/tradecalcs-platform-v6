import { useState } from 'react'
import { Zap } from 'lucide-react'

export default function VoltageDropCalculator() {
  const [current, setCurrent] = useState('')
  const [length, setLength] = useState('')
  const [cableSize, setCableSize] = useState('2.5')
  const [result, setResult] = useState('')

  const cableResistance: Record<string, number> = {
    '1': 18.1, '1.5': 12.1, '2.5': 7.41, '4': 4.62, '6': 3.08,
    '10': 1.83, '16': 1.15, '25': 0.727, '35': 0.524, '50': 0.387
  }

  const calculate = () => {
    if (!current || !length || !cableSize) { alert('Please fill all fields'); return }
    const I = parseFloat(current)
    const L = parseFloat(length)
    const resistance = (cableResistance[cableSize] || 7.41) / 1000
    const vd = I * L * resistance * 2
    const percentVD = (vd / 230) * 100
    const status = percentVD <= 3 ? '✅ COMPLIANT' : '⚠️ EXCEEDS LIMIT'
    setResult(`VD: ${vd.toFixed(3)}V (${percentVD.toFixed(2)}%) - ${status} (Max 3%)`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Voltage Drop Calculator</h1>
          </div>
          <p className="text-gray-600 mb-8">BS 7671 - Max 3% for final circuits</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current (Amps)</label>
              <input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Enter current in amps" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Circuit Length (meters)</label>
              <input type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="Enter total circuit length" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cable Size (mm²)</label>
              <select value={cableSize} onChange={(e) => setCableSize(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="1">1mm² (18.1Ω/km)</option>
                <option value="1.5">1.5mm² (12.1Ω/km)</option>
                <option value="2.5">2.5mm² (7.41Ω/km)</option>
                <option value="4">4mm² (4.62Ω/km)</option>
                <option value="6">6mm² (3.08Ω/km)</option>
                <option value="10">10mm² (1.83Ω/km)</option>
                <option value="16">16mm² (1.15Ω/km)</option>
                <option value="25">25mm² (0.727Ω/km)</option>
              </select>
            </div>
            <button onClick={calculate} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold hover:shadow-lg">Calculate</button>
            {result && (<div className="bg-green-50 border border-green-200 rounded-lg p-4"><p className="text-green-800 font-semibold">{result}</p></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}
