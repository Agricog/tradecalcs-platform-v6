import { useState } from 'react'
import { Wrench } from 'lucide-react'

export default function BSPThreadFinder() {
  const [diameter, setDiameter] = useState('')
  const [result, setResult] = useState('')

  const bspThreads: Record<string, {size: string, tpi: number, pitch: number}> = {
    '5': {size: '1/8"', tpi: 28, pitch: 0.907},
    '6.5': {size: '1/4"', tpi: 19, pitch: 1.337},
    '9.7': {size: '3/8"', tpi: 19, pitch: 1.337},
    '13.2': {size: '1/2"', tpi: 14, pitch: 1.814},
    '16.7': {size: '5/8"', tpi: 14, pitch: 1.814},
    '20.6': {size: '3/4"', tpi: 14, pitch: 1.814},
    '26.4': {size: '1"', tpi: 11, pitch: 2.309},
    '33.3': {size: '1 1/4"', tpi: 11, pitch: 2.309},
    '39.9': {size: '1 1/2"', tpi: 11, pitch: 2.309},
    '50.8': {size: '2"', tpi: 11, pitch: 2.309}
  }

  const find = () => {
    if (!diameter) { alert('Please enter a diameter'); return }
    const d = parseFloat(diameter)
    const closest = Object.keys(bspThreads).reduce((prev, curr) => 
      Math.abs(parseFloat(curr) - d) < Math.abs(parseFloat(prev) - d) ? curr : prev
    )
    const thread = bspThreads[closest]
    setResult(`BSP ${thread.size} | ${thread.tpi} TPI | Pitch: ${thread.pitch}mm`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-red-600 p-3 rounded-lg">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">BSP Thread Identifier</h1>
          </div>
          <p className="text-gray-600 mb-8">Find TPI and pitch for any BSP pipe thread</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diameter (mm)</label>
              <input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} placeholder="e.g., 13.2" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600" />
            </div>
            <button onClick={find} className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:bg-red-700">Find Thread Size</button>
            {result && (<div className="bg-green-50 border border-green-200 rounded-lg p-4"><p className="text-green-800 font-semibold">{result}</p></div>)}
            <div className="bg-gray-50 rounded-lg p-4 mt-8">
              <h3 className="font-bold text-gray-900 mb-3">Quick Reference:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                <p>1/8" = 5mm (28 TPI)</p><p>1/4" = 6.5mm (19 TPI)</p>
                <p>3/8" = 9.7mm (19 TPI)</p><p>1/2" = 13.2mm (14 TPI)</p>
                <p>3/4" = 20.6mm (14 TPI)</p><p>1" = 26.4mm (11 TPI)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
