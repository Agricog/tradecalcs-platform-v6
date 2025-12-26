import { useState } from 'react'
import { CheckCircle2, AlertCircle, Printer } from 'lucide-react'

export interface VoltageDropCalculatorCoreProps {
  defaultCableSize?: string
  defaultLength?: string
  defaultCurrent?: string
  defaultCircuitType?: 'lighting' | 'power'
  defaultPhase?: 'single' | 'three'
}

export function VoltageDropCalculatorCore({
  defaultCableSize = '2.5',
  defaultLength = '',
  defaultCurrent = '',
  defaultCircuitType = 'power',
  defaultPhase = 'single'
}: VoltageDropCalculatorCoreProps) {
  const [cableSize, setCableSize] = useState(defaultCableSize)
  const [length, setLength] = useState(defaultLength)
  const [current, setCurrent] = useState(defaultCurrent)
  const [circuitType, setCircuitType] = useState<'lighting' | 'power'>(defaultCircuitType)
  const [phase, setPhase] = useState<'single' | 'three'>(defaultPhase)
  const [result, setResult] = useState<any>(null)

  // =============================================================================
  // BS 7671 TABLE 4D1B - mV/A/m VALUES AT 70°C OPERATING TEMPERATURE
  // =============================================================================
  // These are the OFFICIAL voltage drop values for thermoplastic (PVC) insulated
  // copper conductors. Values ALREADY INCLUDE both conductors (live + neutral).
  // DO NOT multiply by 2 when using these values.
  // =============================================================================
  const mVperAperM: Record<string, number> = {
    '1': 44,
    '1.5': 29,
    '2.5': 18,
    '4': 11,
    '6': 7.3,
    '10': 4.4,
    '16': 2.8,
    '25': 1.75,
    '35': 1.25,
    '50': 0.93,
    '70': 0.63,
    '95': 0.46,
    '120': 0.36,
    '150': 0.29,
    '185': 0.25,
    '240': 0.195,
    '300': 0.165
  }

  const cableSizes = ['1', '1.5', '2.5', '4', '6', '10', '16', '25', '35', '50', '70', '95', '120', '150', '185', '240', '300']

  const calculate = () => {
    const lengthNum = parseFloat(length)
    const currentNum = parseFloat(current)
    
    if (!lengthNum || !currentNum || !cableSize) {
      alert('Please fill all fields')
      return
    }

    const mV = mVperAperM[cableSize]
    if (!mV) {
      alert('Invalid cable size')
      return
    }

    // Base voltage for percentage calculation
    const voltage = phase === 'single' ? 230 : 400

    // =============================================================================
    // BS 7671 VOLTAGE DROP FORMULA (Regulation 525)
    // =============================================================================
    // Single phase: VD = (mV/A/m × Ib × L) ÷ 1000
    // Three phase:  VD = (mV/A/m × Ib × L × 0.866) ÷ 1000
    // 
    // The 0.866 factor (√3/2) converts single-phase tabulated values to three-phase
    // DO NOT multiply by 2 - the mV/A/m values already account for both conductors
    // =============================================================================
    const threePhaseMultiplier = 0.866 // √3/2 for three-phase conversion
    const voltageDrop = phase === 'single' 
      ? (mV * currentNum * lengthNum) / 1000
      : (mV * currentNum * lengthNum * threePhaseMultiplier) / 1000
    
    const voltageDropPercent = (voltageDrop / voltage) * 100

    // Maximum allowed per BS 7671 Regulation 525.1
    const maxPercent = circuitType === 'lighting' ? 3 : 5
    const maxVolts = voltage * (maxPercent / 100)

    // Compliance check
    const voltageDropOk = voltageDropPercent <= maxPercent

    // Find minimum cable size that would comply
    let minCableSize = cableSize
    for (const size of cableSizes) {
      const testMV = mVperAperM[size]
      const testVD = phase === 'single'
        ? (testMV * currentNum * lengthNum) / 1000
        : (testMV * currentNum * lengthNum * threePhaseMultiplier) / 1000
      const testPercent = (testVD / voltage) * 100
      if (testPercent <= maxPercent) {
        minCableSize = size
        break
      }
    }

    // Calculate maximum length for current cable at this current
    // Rearranging: L = (VD × 1000) / (mV/A/m × I) for single phase
    const maxLength = phase === 'single'
      ? (maxVolts * 1000) / (mV * currentNum)
      : (maxVolts * 1000) / (mV * currentNum * threePhaseMultiplier)

    setResult({
      voltageDrop: voltageDrop.toFixed(2),
      voltageDropPercent: voltageDropPercent.toFixed(2),
      voltageDropOk,
      maxPercent,
      maxVolts: maxVolts.toFixed(1),
      minCableSize,
      maxLength: maxLength.toFixed(1),
      cableSize,
      length: lengthNum,
      current: currentNum,
      phase,
      circuitType,
      voltage,
      mV,
      formula: phase === 'single'
        ? `VD = (${mV} mV/A/m × ${currentNum}A × ${lengthNum}m) ÷ 1000 = ${voltageDrop.toFixed(2)}V`
        : `VD = (${mV} mV/A/m × ${currentNum}A × ${lengthNum}m × 0.866) ÷ 1000 = ${voltageDrop.toFixed(2)}V`
    })
  }

  const resetCalculator = () => {
    setCableSize(defaultCableSize)
    setLength(defaultLength)
    setCurrent(defaultCurrent)
    setCircuitType(defaultCircuitType)
    setPhase(defaultPhase)
    setResult(null)
  }

  const printResult = () => {
    window.print()
  }

  return (
    <div className="p-6">
      {/* Cable Size */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">
          1. Cable Size (mm²)
        </label>
        <select
          value={cableSize}
          onChange={e => setCableSize(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
          aria-label="Cable size in square millimeters"
        >
          <option value="1">1mm² (44 mV/A/m)</option>
          <option value="1.5">1.5mm² (29 mV/A/m)</option>
          <option value="2.5">2.5mm² (18 mV/A/m)</option>
          <option value="4">4mm² (11 mV/A/m)</option>
          <option value="6">6mm² (7.3 mV/A/m)</option>
          <option value="10">10mm² (4.4 mV/A/m)</option>
          <option value="16">16mm² (2.8 mV/A/m)</option>
          <option value="25">25mm² (1.75 mV/A/m)</option>
          <option value="35">35mm² (1.25 mV/A/m)</option>
          <option value="50">50mm² (0.93 mV/A/m)</option>
          <option value="70">70mm² (0.63 mV/A/m)</option>
          <option value="95">95mm² (0.46 mV/A/m)</option>
          <option value="120">120mm² (0.36 mV/A/m)</option>
          <option value="150">150mm² (0.29 mV/A/m)</option>
          <option value="185">185mm² (0.25 mV/A/m)</option>
          <option value="240">240mm² (0.195 mV/A/m)</option>
          <option value="300">300mm² (0.165 mV/A/m)</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">Values from BS 7671 Table 4D1B (PVC copper at 70°C)</p>
        <div className="flex gap-2 flex-wrap mt-2">
          {['2.5', '4', '6', '10', '16', '25'].map(size => (
            <button
              key={size}
              onClick={() => setCableSize(size)}
              className={`px-3 py-1 rounded font-semibold text-sm transition ${
                cableSize === size 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
              }`}
            >
              {size}mm²
            </button>
          ))}
        </div>
      </div>

      {/* Cable Length */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">
          2. Cable Run Length (metres)
        </label>
        <input
          type="number"
          value={length}
          onChange={e => setLength(e.target.value)}
          placeholder="Enter total circuit length..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600 mb-2"
          aria-label="Cable run length in meters"
        />
        <div className="flex gap-2 flex-wrap">
          {['10', '20', '30', '40', '50', '75', '100'].map(len => (
            <button
              key={len}
              onClick={() => setLength(len)}
              className={`px-3 py-1 rounded font-semibold text-sm transition ${
                length === len 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
              }`}
            >
              {len}m
            </button>
          ))}
        </div>
      </div>

      {/* Load Current */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">
          3. Load Current (amps)
        </label>
        <input
          type="number"
          value={current}
          onChange={e => setCurrent(e.target.value)}
          placeholder="Enter load current..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600 mb-2"
          aria-label="Load current in amps"
        />
        <div className="flex gap-2 flex-wrap">
          {['6', '10', '16', '20', '32', '40', '63', '100'].map(amp => (
            <button
              key={amp}
              onClick={() => setCurrent(amp)}
              className={`px-3 py-1 rounded font-semibold text-sm transition ${
                current === amp 
                  ? 'bg-cyan-600 text-white' 
                  : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
              }`}
            >
              {amp}A
            </button>
          ))}
        </div>
      </div>

      {/* Circuit Type */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-3">
          4. Circuit Type (Voltage Drop Limit)
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setCircuitType('lighting')}
            className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
              circuitType === 'lighting'
                ? 'bg-cyan-50 border-cyan-600 text-cyan-900'
                : 'border-gray-300 text-gray-700 hover:border-cyan-400'
            }`}
          >
            <p>Lighting Circuit</p>
            <p className="text-xs font-normal text-gray-600">3% max VD (6.9V)</p>
          </button>
          <button
            onClick={() => setCircuitType('power')}
            className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
              circuitType === 'power'
                ? 'bg-cyan-50 border-cyan-600 text-cyan-900'
                : 'border-gray-300 text-gray-700 hover:border-cyan-400'
            }`}
          >
            <p>Power Circuit</p>
            <p className="text-xs font-normal text-gray-600">5% max VD (11.5V)</p>
          </button>
        </div>
      </div>

      {/* Phase Selection */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-3">
          5. Supply Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPhase('single')}
            className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
              phase === 'single'
                ? 'bg-cyan-50 border-cyan-600 text-cyan-900'
                : 'border-gray-300 text-gray-700 hover:border-cyan-400'
            }`}
          >
            <p>Single Phase</p>
            <p className="text-xs font-normal text-gray-600">230V domestic</p>
          </button>
          <button
            onClick={() => setPhase('three')}
            className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
              phase === 'three'
                ? 'bg-cyan-50 border-cyan-600 text-cyan-900'
                : 'border-gray-300 text-gray-700 hover:border-cyan-400'
            }`}
          >
            <p>Three Phase</p>
            <p className="text-xs font-normal text-gray-600">400V (×0.866 factor)</p>
          </button>
        </div>
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
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg transition"
          aria-label="Calculate voltage drop"
        >
          Calculate Voltage Drop
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className={`mt-6 rounded-lg p-6 ${result.voltageDropOk ? 'bg-cyan-50 border-2 border-cyan-300' : 'bg-red-50 border-2 border-red-300'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {result.voltageDropOk ? (
                <CheckCircle2 className="w-6 h-6 text-cyan-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
              <h3 className={`text-xl font-bold ${result.voltageDropOk ? 'text-cyan-900' : 'text-red-900'}`}>
                {result.voltageDropOk ? '✓ COMPLIANT' : '⚠ EXCEEDS LIMIT'}
              </h3>
            </div>
            <button
              onClick={printResult}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
              aria-label="Print results"
            >
              <Printer className="w-4 h-4" />
              <span className="text-sm">Print</span>
            </button>
          </div>

          {/* Main Result Box */}
          <div className="bg-white p-4 rounded border-t-2 border-b-2" style={{ borderColor: result.voltageDropOk ? '#06b6d4' : '#ef4444' }}>
            <div className="flex justify-between mb-3">
              <p className="font-semibold">Voltage Drop</p>
              <p className="font-bold text-lg">{result.voltageDrop}V ({result.voltageDropPercent}%)</p>
            </div>
            <div className="flex justify-between mb-3">
              <p className="font-semibold">BS 7671 Limit</p>
              <p className="font-bold">{result.maxPercent}% ({result.maxVolts}V)</p>
            </div>
            <div className={`flex justify-between mb-3 p-2 rounded ${result.voltageDropOk ? 'bg-cyan-50' : 'bg-red-50'}`}>
              <p className="font-semibold">Margin</p>
              <p className={`font-bold ${result.voltageDropOk ? 'text-cyan-700' : 'text-red-700'}`}>
                {result.voltageDropOk 
                  ? `+${(result.maxPercent - parseFloat(result.voltageDropPercent)).toFixed(2)}%` 
                  : `-${(parseFloat(result.voltageDropPercent) - result.maxPercent).toFixed(2)}%`}
              </p>
            </div>
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-3">
              <p className="font-mono font-semibold mb-1">BS 7671 Calculation (Table 4D1B):</p>
              <p className="font-mono">{result.formula}</p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-bold text-gray-800 mb-3">
              {result.voltageDropOk ? '✓ Cable Suitable' : '⚠ Recommendations'}
            </h4>
            {result.voltageDropOk ? (
              <div className="text-sm text-gray-700 space-y-2">
                <p>Your <strong>{result.cableSize}mm²</strong> cable complies with BS 7671 for this {result.length}m run at {result.current}A.</p>
                <p className="text-gray-600">
                  Maximum compliant length at {result.current}A with {result.cableSize}mm²: <strong>{result.maxLength}m</strong>
                </p>
              </div>
            ) : (
              <div className="text-sm text-gray-700 space-y-2">
                <p className="text-red-700">Voltage drop of {result.voltageDropPercent}% exceeds the {result.maxPercent}% limit for {result.circuitType} circuits.</p>
                <p><strong>Minimum compliant cable size:</strong> {result.minCableSize}mm²</p>
                <p className="text-gray-600">
                  Or reduce cable length to maximum <strong>{result.maxLength}m</strong> with {result.cableSize}mm²
                </p>
              </div>
            )}
          </div>

          {/* Circuit Summary */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Cable:</span> <strong>{result.cableSize}mm²</strong>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Length:</span> <strong>{result.length}m</strong>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Current:</span> <strong>{result.current}A</strong>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Supply:</span> <strong>{result.phase === 'single' ? '1Ø 230V' : '3Ø 400V'}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
