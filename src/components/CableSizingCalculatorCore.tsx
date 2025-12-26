import { useState } from 'react'
import { Zap, CheckCircle2, Printer } from 'lucide-react'

export interface CableSizingCalculatorCoreProps {
  defaultLoadType?: 'amps' | 'kw'
  defaultCurrent?: string
  defaultKW?: string
  defaultLength?: string
  defaultMethod?: string
  defaultLighting?: boolean
}

export function CableSizingCalculatorCore({
  defaultLoadType = 'amps',
  defaultCurrent = '',
  defaultKW = '',
  defaultLength = '',
  defaultMethod = 'C',
  defaultLighting = false
}: CableSizingCalculatorCoreProps) {
  const [loadType, setLoadType] = useState<'amps' | 'kw'>(defaultLoadType)
  const [current, setCurrent] = useState(defaultCurrent)
  const [kW, setKW] = useState(defaultKW)
  const [length, setLength] = useState(defaultLength)
  const [method, setMethod] = useState(defaultMethod)
  const [lighting, setLighting] = useState(defaultLighting)
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    let amps = parseFloat(current)
    if (loadType === 'kw' && kW) amps = parseFloat(kW) * 1000 / 230
    if (!amps || !length) {
      alert('Please fill all fields')
      return
    }

    let size = 1.5
    if (amps <= 13.5) size = 1.5
    else if (amps <= 18) size = 2.5
    else if (amps <= 24) size = 4
    else if (amps <= 32) size = 6
    else if (amps <= 41) size = 10
    else if (amps <= 57) size = 16
    else if (amps <= 76) size = 25
    else size = 35

    // Calculate voltage drop
    const mVPerAmpPerMetre: Record<number, number> = {
      1.5: 29,
      2.5: 18,
      4: 11,
      6: 7.3,
      10: 4.4,
      16: 2.8,
      25: 1.75,
      35: 1.25
    }
    
    const lengthNum = parseFloat(length)
    const voltageDrop = (amps * lengthNum * mVPerAmpPerMetre[size]) / 1000
    const voltageDropPercent = (voltageDrop / 230) * 100
    const maxAllowed = lighting ? 3 : 5
    const voltageDropOk = voltageDropPercent <= maxAllowed

    // If voltage drop too high, recommend larger cable
    let recommendedSize = size
    if (!voltageDropOk) {
      const sizes = [1.5, 2.5, 4, 6, 10, 16, 25, 35]
      for (const s of sizes) {
        if (s <= size) continue
        const vd = (amps * lengthNum * mVPerAmpPerMetre[s]) / 1000
        const vdPercent = (vd / 230) * 100
        if (vdPercent <= maxAllowed) {
          recommendedSize = s
          break
        }
      }
    }

    setResult({
      amps: amps.toFixed(1),
      size,
      recommendedSize,
      length: lengthNum,
      method,
      lighting,
      voltageDrop: voltageDrop.toFixed(2),
      voltageDropPercent: voltageDropPercent.toFixed(2),
      voltageDropOk,
      maxAllowed,
      formula: `${size}mm² cable for ${amps.toFixed(1)}A over ${lengthNum}m (Method ${method})`
    })
  }

  const resetCalculator = () => {
    setLoadType(defaultLoadType)
    setCurrent(defaultCurrent)
    setKW(defaultKW)
    setLength(defaultLength)
    setMethod(defaultMethod)
    setLighting(defaultLighting)
    setResult(null)
  }

  const printResults = () => {
    if (!result) return
    const printContent = `
      <html>
        <head>
          <title>Cable Sizing Calculation - TradeCalcs</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
            h1 { color: #1d4ed8; border-bottom: 2px solid #1d4ed8; padding-bottom: 10px; }
            .result-box { background: ${result.voltageDropOk ? '#eff6ff' : '#fef2f2'}; border: 2px solid ${result.voltageDropOk ? '#3b82f6' : '#ef4444'}; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .item { background: #f3f4f6; padding: 12px; border-radius: 6px; }
            .label { font-size: 12px; color: #6b7280; }
            .value { font-size: 18px; font-weight: bold; }
            .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <h1>Cable Sizing Calculation Results</h1>
          <div class="result-box">
            <h2>Recommended Cable Size</h2>
            <p style="font-size:32px;font-weight:bold">${result.voltageDropOk ? result.size : result.recommendedSize}mm²</p>
            <p>${result.amps}A load over ${result.length}m</p>
          </div>
          <div class="grid">
            <div class="item">
              <div class="label">Load Current</div>
              <div class="value">${result.amps}A</div>
            </div>
            <div class="item">
              <div class="label">Cable Length</div>
              <div class="value">${result.length}m</div>
            </div>
            <div class="item">
              <div class="label">Voltage Drop</div>
              <div class="value">${result.voltageDrop}V (${result.voltageDropPercent}%)</div>
            </div>
            <div class="item">
              <div class="label">Installation Method</div>
              <div class="value">Method ${result.method}</div>
            </div>
          </div>
          <div class="footer">
            <p>Generated by TradeCalcs.co.uk - ${new Date().toLocaleDateString('en-GB')}</p>
            <p>BS 7671:2018+A2:2022 compliant. Always verify with current regulations.</p>
          </div>
        </body>
      </html>
    `
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="p-6">
      <div className="bg-blue-700 text-white rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-5 h-5" />
          <h2 className="text-lg font-bold">Cable Size Calculator</h2>
        </div>
        <p className="text-sm opacity-90">BS 7671:2018+A2:2022 compliant</p>
      </div>

      {/* Load Type Toggle */}
      <div className="mb-6">
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setLoadType('amps')}
            className={`flex-1 px-4 py-2 rounded-lg font-bold transition ${
              loadType === 'amps' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Enter Amps
          </button>
          <button
            onClick={() => setLoadType('kw')}
            className={`flex-1 px-4 py-2 rounded-lg font-bold transition ${
              loadType === 'kw' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Enter kW
          </button>
        </div>
      </div>

      {/* Load Current */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">1. Load Current</label>
        {loadType === 'amps' ? (
          <>
            <input
              type="number"
              value={current}
              onChange={e => setCurrent(e.target.value)}
              placeholder="Enter amps..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 mb-2"
            />
            <div className="flex gap-2 flex-wrap">
              {['16A', '32A', '40A', '63A'].map(amp => (
                <button
                  key={amp}
                  onClick={() => setCurrent(amp.replace('A', ''))}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-semibold text-sm hover:bg-blue-200"
                >
                  {amp}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <input
              type="number"
              value={kW}
              onChange={e => setKW(e.target.value)}
              placeholder="Enter kW..."
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 mb-2"
            />
            <div className="flex gap-2 flex-wrap">
              {['3.6kW', '7kW', '11kW', '22kW'].map(kw => (
                <button
                  key={kw}
                  onClick={() => setKW(kw.replace('kW', ''))}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-semibold text-sm hover:bg-blue-200"
                >
                  {kw}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">1kW ≈ 4.35A at 230V</p>
          </>
        )}
      </div>

      {/* Cable Length */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">2. Cable Length (meters)</label>
        <input
          type="number"
          value={length}
          onChange={e => setLength(e.target.value)}
          placeholder="Enter length..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 mb-2"
        />
        <div className="flex gap-2 flex-wrap">
          {['5m', '10m', '15m', '20m', '30m'].map(len => (
            <button
              key={len}
              onClick={() => setLength(len.replace('m', ''))}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-semibold text-sm hover:bg-blue-200"
            >
              {len}
            </button>
          ))}
        </div>
      </div>

      {/* Installation Method */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">3. Installation Method</label>
        <select
          value={method}
          onChange={e => setMethod(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
        >
          <option value="C">Method C - Clipped direct (highest capacity)</option>
          <option value="B">Method B - In conduit/trunking</option>
          <option value="E">Method E - Cable tray/basket</option>
        </select>
      </div>

      {/* Lighting Circuit */}
      <div className="mb-6">
        <label className="inline-flex items-center gap-2 text-gray-800 font-semibold">
          <input
            type="checkbox"
            checked={lighting}
            onChange={e => setLighting(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300"
          />
          Lighting circuit (3% voltage drop limit)
        </label>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={resetCalculator}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition"
        >
          Reset
        </button>
        <button
          onClick={calculate}
          className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition"
        >
          Calculate
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className={`mt-6 rounded-lg p-6 ${result.voltageDropOk ? 'bg-blue-50 border-2 border-blue-300' : 'bg-orange-50 border-2 border-orange-300'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-6 h-6 ${result.voltageDropOk ? 'text-blue-700' : 'text-orange-600'}`} />
              <h3 className={`text-xl font-bold ${result.voltageDropOk ? 'text-blue-900' : 'text-orange-900'}`}>
                Cable Size Recommendation
              </h3>
            </div>
            <button
              onClick={printResults}
              className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
            >
              <Printer className="w-4 h-4" />
              Print
            </button>
          </div>

          <div className="bg-white p-4 rounded border">
            <p className="text-xs text-gray-600 mb-1">Recommended Cable Size</p>
            <p className="text-3xl font-bold text-gray-900">
              {result.voltageDropOk ? result.size : result.recommendedSize}mm²
            </p>
            <p className="text-sm text-gray-600 mt-1">{result.amps}A over {result.length}m (Method {result.method})</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3 bg-white rounded border-l-2 border-blue-600">
              <p className="text-xs text-gray-600">Voltage Drop</p>
              <p className="text-lg font-bold">{result.voltageDrop}V ({result.voltageDropPercent}%)</p>
              <p className="text-xs text-gray-500">Max allowed: {result.maxAllowed}%</p>
            </div>
            <div className="p-3 bg-white rounded border-l-2 border-green-600">
              <p className="text-xs text-gray-600">Current Capacity</p>
              <p className="text-lg font-bold">{result.amps}A</p>
            </div>
          </div>

          {!result.voltageDropOk && (
            <div className="mt-3 p-3 bg-orange-100 rounded border-l-2 border-orange-600">
              <p className="text-sm font-semibold text-orange-900">⚠️ Voltage Drop Exceeded</p>
              <p className="text-xs text-orange-800">
                {result.size}mm² gives {result.voltageDropPercent}% drop (max {result.maxAllowed}%). 
                Use {result.recommendedSize}mm² instead.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CableSizingCalculatorCore
