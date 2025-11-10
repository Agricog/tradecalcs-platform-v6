import { useState } from 'react'
import { Wrench, Info } from 'lucide-react'

export default function BSPThreadFinder() {
  const [mode, setMode] = useState<'diameter' | 'pitch'>('diameter')
  const [diameter, setDiameter] = useState('')
  const [tpi, setTPI] = useState('')
  const [result, setResult] = useState<any>(null)

  const bspData = [
    { size: '1/8"', outerDia: 9.73, tpi: 28, pitch: 0.907, innerDia: 8.00 },
    { size: '1/4"', outerDia: 13.16, tpi: 19, pitch: 1.337, innerDia: 11.00 },
    { size: '3/8"', outerDia: 16.66, tpi: 19, pitch: 1.337, innerDia: 14.50 },
    { size: '1/2"', outerDia: 20.96, tpi: 14, pitch: 1.814, innerDia: 18.50 },
    { size: '5/8"', outerDia: 22.91, tpi: 14, pitch: 1.814, innerDia: 20.25 },
    { size: '3/4"', outerDia: 26.44, tpi: 14, pitch: 1.814, innerDia: 24.00 },
    { size: '7/8"', outerDia: 30.20, tpi: 14, pitch: 1.814, innerDia: 27.50 },
    { size: '1"', outerDia: 33.25, tpi: 11, pitch: 2.309, innerDia: 30.00 },
    { size: '1 1/8"', outerDia: 36.83, tpi: 11, pitch: 2.309, innerDia: 33.50 },
    { size: '1 1/4"', outerDia: 41.91, tpi: 11, pitch: 2.309, innerDia: 38.50 },
    { size: '1 1/2"', outerDia: 47.75, tpi: 11, pitch: 2.309, innerDia: 44.00 },
    { size: '2"', outerDia: 59.81, tpi: 11, pitch: 2.309, innerDia: 55.50 }
  ]

  const findByDiameter = () => {
    if (!diameter) {
      alert('Please enter a diameter')
      return
    }
    const d = parseFloat(diameter)
    const closest = bspData.reduce((prev, curr) =>
      Math.abs(curr.outerDia - d) < Math.abs(prev.outerDia - d) ? curr : prev
    )
    setResult({
      size: closest.size,
      outerDia: closest.outerDia,
      innerDia: closest.innerDia,
      tpi: closest.tpi,
      pitch: closest.pitch,
      tolerance: Math.abs(closest.outerDia - d).toFixed(2),
      mode: 'diameter'
    })
  }

  const findByTPI = () => {
    if (!tpi) {
      alert('Please enter TPI')
      return
    }
    const t = parseInt(tpi)
    const matches = bspData.filter(item => item.tpi === t)
    if (matches.length === 0) {
      alert(`No BSP threads found with ${t} TPI`)
      return
    }
    setResult({
      matches,
      tpi: t,
      mode: 'tpi'
    })
  }

  return (
    <div className="py-10 px-2 max-w-4xl mx-auto">
      <title>BSP Thread Finder | British Standard Pipe Thread Identifier UK</title>
      <meta name="description" content="Professional BSP thread identifier for UK plumbers, engineers, and trades. Identify British Standard Pipe threads by diameter, TPI, or pitch. Complete reference tables." />
      
      <h1 className="text-4xl font-bold mb-3 text-orange-900">BSP Thread Size Finder</h1>
      <p className="mb-8 text-lg text-orange-900 max-w-2xl">
        <b>British Standard Pipe (BSP)</b> thread identifier for <span className="font-semibold">UK plumbers, engineers, and mechanical trades</span>. Identify pipe threads by outer diameter, TPI (threads per inch), or pitch. Complete with tolerance guidance and pro reference tables.
      </p>

      <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-orange-800">
            <b>Key Fact:</b> BSP nominal size does <b>not</b> match outer diameter. A "1/2" BSP is ~20.96mm OD, not 12.7mm. Always measure the actual thread diameter carefully!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* DIAMETER MODE */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <button
            type="button"
            onClick={() => setMode('diameter')}
            className={`w-full text-left mb-4 pb-3 border-b-2 ${mode === 'diameter' ? 'border-orange-500 font-bold text-orange-900' : 'border-gray-200'}`}
          >
            <Wrench className="w-5 h-5 inline mr-2" />
            Measure by Outer Diameter
          </button>
          {mode === 'diameter' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Use calipers or ruler to measure the outermost diameter of the male thread</p>
              <input
                value={diameter}
                onChange={e => setDiameter(e.target.value)}
                type="number"
                step="0.01"
                placeholder="e.g., 20.96"
                className="input input-bordered w-full text-lg"
              />
              <button
                onClick={findByDiameter}
                className="btn btn-orange w-full"
              >
                Identify Thread
              </button>
            </div>
          )}
        </div>

        {/* TPI MODE */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <button
            type="button"
            onClick={() => setMode('pitch')}
            className={`w-full text-left mb-4 pb-3 border-b-2 ${mode === 'pitch' ? 'border-blue-500 font-bold text-blue-900' : 'border-gray-200'}`}
          >
            <Wrench className="w-5 h-5 inline mr-2" />
            Search by TPI
          </button>
          {mode === 'pitch' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Count threads per inch using a thread gauge</p>
              <select
                value={tpi}
                onChange={e => setTPI(e.target.value)}
                className="input input-bordered w-full text-lg"
              >
                <option value="">Select TPI...</option>
                <option value="28">28 TPI (1/8" BSP)</option>
                <option value="19">19 TPI (1/4", 3/8")</option>
                <option value="14">14 TPI (1/2", 5/8", 3/4", 7/8")</option>
                <option value="11">11 TPI (1", 1 1/8", 1 1/4", 1 1/2", 2")</option>
              </select>
              <button
                onClick={findByTPI}
                className="btn btn-blue w-full"
              >
                Find All Matches
              </button>
            </div>
          )}
        </div>
      </div>

      {/* RESULTS */}
      {result && result.mode === 'diameter' && (
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-green-900 mb-3">Match Found ✓</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600 font-medium">BSP Size</p>
              <p className="text-2xl font-bold text-green-800">{result.size}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Threads Per Inch</p>
              <p className="text-2xl font-bold text-green-800">{result.tpi} TPI</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Pitch (mm)</p>
              <p className="text-lg font-semibold text-green-800">{result.pitch}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Outer Diameter</p>
              <p className="text-lg font-semibold text-green-800">{result.outerDia}mm</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Inner Diameter</p>
              <p className="text-lg font-semibold text-green-800">{result.innerDia}mm</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium">Tolerance</p>
              <p className="text-lg font-semibold text-green-800">±{result.tolerance}mm</p>
            </div>
          </div>
        </div>
      )}

      {result && result.mode === 'tpi' && (
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-bold text-green-900 mb-4">Threads with {result.tpi} TPI</h3>
          <div className="space-y-2">
            {result.matches.map((m: any, i: number) => (
              <div key={i} className="bg-white p-3 rounded border border-green-200">
                <p className="font-bold text-orange-700">{m.size}</p>
                <p className="text-xs text-gray-600">OD: {m.outerDia}mm | ID: {m.innerDia}mm | Pitch: {m.pitch}mm</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REFERENCE TABLE */}
      <section className="bg-white border border-gray-200 shadow-sm rounded-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-orange-900 mb-4">Complete BSP Reference Chart</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-orange-100 border-b-2 border-orange-300">
              <tr>
                <th className="text-left p-2 font-bold">BSP Size</th>
                <th className="text-center p-2 font-bold">OD (mm)</th>
                <th className="text-center p-2 font-bold">ID (mm)</th>
                <th className="text-center p-2 font-bold">TPI</th>
                <th className="text-center p-2 font-bold">Pitch (mm)</th>
              </tr>
            </thead>
            <tbody>
              {bspData.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-2 font-semibold text-orange-700">{row.size}</td>
                  <td className="text-center p-2">{row.outerDia}</td>
                  <td className="text-center p-2">{row.innerDia}</td>
                  <td className="text-center p-2 font-semibold">{row.tpi}</td>
                  <td className="text-center p-2">{row.pitch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-orange-50 border border-orange-100 rounded-lg p-5">
        <div className="flex items-start gap-2 mb-2">
          <Info className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
          <b className="text-orange-900">Pro Tips</b>
        </div>
        <ul className="list-disc pl-6 text-orange-900 text-sm space-y-1">
          <li>Measure the outermost diameter of the <b>male thread</b> (pipe end)</li>
          <li>Use a digital calliper for ±0.05mm accuracy</li>
          <li>BSP sizes are tapered threads (NPT vs parallel BSPP)</li>
          <li>Always count TPI on at least 5 threads for accuracy</li>
          <li>Pipe bore size does not match BSP nominal size</li>
        </ul>
      </section>
    </div>
  )
}

