import { useState } from 'react'
import { Wrench } from 'lucide-react'
export default function BSPThreadFinder() {
  const [diameter, setDiameter] = useState('')
  const [result, setResult] = useState('')
  const bspThreads = {'6':'1/8" BSP','8':'1/4" BSP','10':'3/8" BSP','13':'1/2" BSP','19':'3/4" BSP','25':'1" BSP','32':'1 1/4" BSP','38':'1 1/2" BSP','50':'2" BSP'}
  const find = () => {
    if (!diameter) { alert('Please enter a diameter'); return }
    const thread = bspThreads[diameter] || 'Thread size not found in common sizes'
    setResult(`BSP Thread Size: ${thread}`)
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
          <p className="text-gray-600 mb-8">Identify British Standard Pipe threads by diameter or TPI</p>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diameter (mm)</label>
              <input type="number" value={diameter} onChange={(e) => setDiameter(e.target.value)} placeholder="Enter diameter in mm" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent" />
            </div>
            <button onClick={find} className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:shadow-lg hover:bg-red-700 transition">Find Thread Size</button>
            {result && (<div className="bg-green-50 border border-green-200 rounded-lg p-4"><p className="text-green-800 font-semibold">{result}</p></div>)}
            <div className="bg-gray-50 rounded-lg p-4 mt-8"><h3 className="font-bold text-gray-900 mb-3">Common BSP Sizes:</h3><div className="grid grid-cols-2 gap-2 text-sm text-gray-700"><p>1/8" - 6mm</p><p>1/4" - 8mm</p><p>3/8" - 10mm</p><p>1/2" - 13mm</p><p>3/4" - 19mm</p><p>1" - 25mm</p></div></div>
          </div>
        </div>
      </div>
    </div>
  )
}
