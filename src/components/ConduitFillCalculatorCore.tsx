import { useState } from 'react'
import { CheckCircle2, AlertCircle, Printer, Circle } from 'lucide-react'

export interface ConduitFillCalculatorCoreProps {
  defaultConduitType?: 'round-pvc' | 'oval-pvc' | 'steel' | 'trunking'
  defaultConduitSize?: string
  defaultCableType?: 'singles' | 'twin-earth' | 'three-core' | 'swa' | 'data'
  defaultCableSize?: string
}

export function ConduitFillCalculatorCore({
  defaultConduitType = 'round-pvc',
  defaultConduitSize = '20',
  defaultCableType = 'singles',
  defaultCableSize = '2.5'
}: ConduitFillCalculatorCoreProps) {
  const [conduitType, setConduitType] = useState<'round-pvc' | 'oval-pvc' | 'steel' | 'trunking'>(defaultConduitType)
  const [conduitSize, setConduitSize] = useState(defaultConduitSize)
  const [cableType, setCableType] = useState<'singles' | 'twin-earth' | 'three-core' | 'swa' | 'data'>(defaultCableType)
  const [cableSize, setCableSize] = useState(defaultCableSize)
  const [cableCount, setCableCount] = useState('')
  const [result, setResult] = useState<any>(null)

  // =============================================================================
  // BS 7671 CONDUIT FILL DATA
  // =============================================================================
  // Internal Cross-Sectional Area (mm²) for conduit types
  // Round PVC conduit to BS EN 61386
  // Steel conduit to BS EN 61386
  // =============================================================================

  const conduitData: Record<string, Record<string, { internalDia: number, csa: number, name: string }>> = {
    'round-pvc': {
      '16': { internalDia: 14.1, csa: 156, name: '16mm Round PVC' },
      '20': { internalDia: 18.1, csa: 257, name: '20mm Round PVC' },
      '25': { internalDia: 22.8, csa: 408, name: '25mm Round PVC' },
      '32': { internalDia: 29.4, csa: 679, name: '32mm Round PVC' },
      '40': { internalDia: 36.6, csa: 1052, name: '40mm Round PVC' },
      '50': { internalDia: 46.4, csa: 1691, name: '50mm Round PVC' },
      '63': { internalDia: 58.4, csa: 2679, name: '63mm Round PVC' }
    },
    'oval-pvc': {
      '16x10': { internalDia: 0, csa: 100, name: '16×10mm Oval PVC' },
      '20x12': { internalDia: 0, csa: 150, name: '20×12mm Oval PVC' },
      '25x16': { internalDia: 0, csa: 280, name: '25×16mm Oval PVC' },
      '32x16': { internalDia: 0, csa: 360, name: '32×16mm Oval PVC' },
      '38x20': { internalDia: 0, csa: 540, name: '38×20mm Oval PVC' }
    },
    'steel': {
      '16': { internalDia: 15.6, csa: 191, name: '16mm Steel Conduit' },
      '20': { internalDia: 20.0, csa: 314, name: '20mm Steel Conduit' },
      '25': { internalDia: 25.0, csa: 491, name: '25mm Steel Conduit' },
      '32': { internalDia: 31.6, csa: 784, name: '32mm Steel Conduit' },
      '40': { internalDia: 39.6, csa: 1232, name: '40mm Steel Conduit' },
      '50': { internalDia: 51.0, csa: 2043, name: '50mm Steel Conduit' }
    },
    'trunking': {
      '16x16': { internalDia: 0, csa: 256, name: '16×16mm Mini Trunking' },
      '25x16': { internalDia: 0, csa: 400, name: '25×16mm Mini Trunking' },
      '38x16': { internalDia: 0, csa: 608, name: '38×16mm Mini Trunking' },
      '38x25': { internalDia: 0, csa: 950, name: '38×25mm Mini Trunking' },
      '50x25': { internalDia: 0, csa: 1250, name: '50×25mm Trunking' },
      '50x50': { internalDia: 0, csa: 2500, name: '50×50mm Trunking' },
      '75x50': { internalDia: 0, csa: 3750, name: '75×50mm Trunking' },
      '100x50': { internalDia: 0, csa: 5000, name: '100×50mm Trunking' },
      '100x100': { internalDia: 0, csa: 10000, name: '100×100mm Trunking' },
      '150x50': { internalDia: 0, csa: 7500, name: '150×50mm Trunking' },
      '150x100': { internalDia: 0, csa: 15000, name: '150×100mm Trunking' }
    }
  }

  // Cable overall diameters and CSA (mm²)
  // Based on typical manufacturer data for PVC/PVC cables
  const cableData: Record<string, Record<string, { diameter: number, csa: number, name: string }>> = {
    'singles': {
      '1': { diameter: 2.9, csa: 6.6, name: '1mm² Single' },
      '1.5': { diameter: 3.2, csa: 8.0, name: '1.5mm² Single' },
      '2.5': { diameter: 3.9, csa: 11.9, name: '2.5mm² Single' },
      '4': { diameter: 4.5, csa: 15.9, name: '4mm² Single' },
      '6': { diameter: 5.2, csa: 21.2, name: '6mm² Single' },
      '10': { diameter: 6.5, csa: 33.2, name: '10mm² Single' },
      '16': { diameter: 7.8, csa: 47.8, name: '16mm² Single' },
      '25': { diameter: 9.5, csa: 70.9, name: '25mm² Single' }
    },
    'twin-earth': {
      '1': { diameter: 8.7, csa: 59.4, name: '1mm² T+E' },
      '1.5': { diameter: 9.5, csa: 70.9, name: '1.5mm² T+E' },
      '2.5': { diameter: 11.3, csa: 100.3, name: '2.5mm² T+E' },
      '4': { diameter: 12.8, csa: 128.7, name: '4mm² T+E' },
      '6': { diameter: 14.4, csa: 162.9, name: '6mm² T+E' },
      '10': { diameter: 17.4, csa: 237.8, name: '10mm² T+E' },
      '16': { diameter: 20.4, csa: 326.9, name: '16mm² T+E' }
    },
    'three-core': {
      '1.5': { diameter: 10.2, csa: 81.7, name: '1.5mm² 3-Core' },
      '2.5': { diameter: 12.0, csa: 113.1, name: '2.5mm² 3-Core' },
      '4': { diameter: 13.6, csa: 145.3, name: '4mm² 3-Core' }
    },
    'swa': {
      '1.5-2c': { diameter: 12.0, csa: 113.1, name: '1.5mm² 2-Core SWA' },
      '2.5-2c': { diameter: 13.0, csa: 132.7, name: '2.5mm² 2-Core SWA' },
      '4-2c': { diameter: 14.5, csa: 165.1, name: '4mm² 2-Core SWA' },
      '2.5-3c': { diameter: 14.0, csa: 153.9, name: '2.5mm² 3-Core SWA' },
      '4-3c': { diameter: 15.5, csa: 188.7, name: '4mm² 3-Core SWA' },
      '6-3c': { diameter: 17.0, csa: 227.0, name: '6mm² 3-Core SWA' },
      '10-3c': { diameter: 20.0, csa: 314.2, name: '10mm² 3-Core SWA' },
      '16-3c': { diameter: 22.5, csa: 397.6, name: '16mm² 3-Core SWA' }
    },
    'data': {
      'cat5e': { diameter: 5.5, csa: 23.8, name: 'Cat5e UTP' },
      'cat6': { diameter: 6.5, csa: 33.2, name: 'Cat6 UTP' },
      'cat6a': { diameter: 7.5, csa: 44.2, name: 'Cat6a UTP' },
      'coax-rg6': { diameter: 6.9, csa: 37.4, name: 'RG6 Coax' },
      'coax-rg59': { diameter: 6.1, csa: 29.2, name: 'RG59 Coax' }
    }
  }

  const conduitTypeLabels: Record<string, string> = {
    'round-pvc': 'Round PVC Conduit',
    'oval-pvc': 'Oval PVC Conduit',
    'steel': 'Steel Conduit',
    'trunking': 'Trunking'
  }

  const cableTypeLabels: Record<string, string> = {
    'singles': 'Single Core (6491X)',
    'twin-earth': 'Twin & Earth (6242Y)',
    'three-core': '3-Core & Earth',
    'swa': 'SWA Armoured',
    'data': 'Data Cable'
  }

  // Get available sizes for selected conduit/cable type
  const getConduitSizes = () => Object.keys(conduitData[conduitType] || {})
  const getCableSizes = () => Object.keys(cableData[cableType] || {})

  const calculate = () => {
    const conduit = conduitData[conduitType]?.[conduitSize]
    const cable = cableData[cableType]?.[cableSize]
    const numCables = parseInt(cableCount) || 0

    if (!conduit || !cable) {
      alert('Please select valid conduit and cable options')
      return
    }

    if (numCables < 1) {
      alert('Please enter the number of cables')
      return
    }

    // BS 7671 fill limits
    // 40% maximum fill for "easy draw" - recommended
    // 45% absolute maximum for straight runs only
    const easyDrawLimit = 0.40
    const absoluteMaxLimit = 0.45

    // Calculate fill
    const totalCableCSA = cable.csa * numCables
    const fillPercentage = (totalCableCSA / conduit.csa) * 100
    const usableCSA40 = conduit.csa * easyDrawLimit
    const usableCSA45 = conduit.csa * absoluteMaxLimit

    // Calculate max cables at each limit
    const maxCables40 = Math.floor(usableCSA40 / cable.csa)
    const maxCables45 = Math.floor(usableCSA45 / cable.csa)

    // Compliance check
    const compliant40 = fillPercentage <= 40
    const compliant45 = fillPercentage <= 45
    const overFilled = fillPercentage > 45

    // Find minimum conduit size that would fit these cables at 40%
    let recommendedConduit = conduitSize
    let recommendedConduitName = conduit.name
    const conduitSizes = Object.entries(conduitData[conduitType])
    for (const [size, data] of conduitSizes) {
      const maxAtSize = Math.floor((data.csa * easyDrawLimit) / cable.csa)
      if (maxAtSize >= numCables) {
        recommendedConduit = size
        recommendedConduitName = data.name
        break
      }
    }

    // Space remaining
    const spaceRemaining = conduit.csa - totalCableCSA
    const additionalCablesPossible40 = Math.max(0, maxCables40 - numCables)

    setResult({
      conduit,
      cable,
      numCables,
      totalCableCSA: totalCableCSA.toFixed(1),
      conduitCSA: conduit.csa,
      fillPercentage: fillPercentage.toFixed(1),
      compliant40,
      compliant45,
      overFilled,
      maxCables40,
      maxCables45,
      usableCSA40: usableCSA40.toFixed(0),
      usableCSA45: usableCSA45.toFixed(0),
      spaceRemaining: spaceRemaining.toFixed(1),
      additionalCablesPossible40,
      recommendedConduit,
      recommendedConduitName,
      needsLarger: !compliant40 && recommendedConduit !== conduitSize
    })
  }

  const resetCalculator = () => {
    setConduitType(defaultConduitType)
    setConduitSize(defaultConduitSize)
    setCableType(defaultCableType)
    setCableSize(defaultCableSize)
    setCableCount('')
    setResult(null)
  }

  const printResult = () => {
    window.print()
  }

  // Update conduit size when type changes
  const handleConduitTypeChange = (type: typeof conduitType) => {
    setConduitType(type)
    const sizes = Object.keys(conduitData[type] || {})
    if (sizes.length > 0 && !sizes.includes(conduitSize)) {
      setConduitSize(sizes[0])
    }
  }

  // Update cable size when type changes
  const handleCableTypeChange = (type: typeof cableType) => {
    setCableType(type)
    const sizes = Object.keys(cableData[type] || {})
    if (sizes.length > 0 && !sizes.includes(cableSize)) {
      setCableSize(sizes[0])
    }
  }

  return (
    <div className="p-6">
      {/* Conduit Type */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-3">
          1. Conduit/Trunking Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(conduitTypeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleConduitTypeChange(key as any)}
              className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
                conduitType === key
                  ? 'bg-slate-50 border-slate-600 text-slate-900'
                  : 'border-gray-300 text-gray-700 hover:border-slate-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Conduit Size */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">
          2. Conduit/Trunking Size
        </label>
        <select
          value={conduitSize}
          onChange={e => setConduitSize(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
        >
          {getConduitSizes().map(size => {
            const data = conduitData[conduitType]?.[size]
            return (
              <option key={size} value={size}>
                {data?.name} — {data?.csa}mm² internal
              </option>
            )
          })}
        </select>
        <div className="flex gap-2 flex-wrap mt-2">
          {getConduitSizes().slice(0, 5).map(size => (
            <button
              key={size}
              onClick={() => setConduitSize(size)}
              className={`px-3 py-1 rounded font-semibold text-sm transition ${
                conduitSize === size
                  ? 'bg-slate-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {size}{conduitType.includes('trunking') ? '' : 'mm'}
            </button>
          ))}
        </div>
      </div>

      {/* Cable Type */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-3">
          3. Cable Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(cableTypeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => handleCableTypeChange(key as any)}
              className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
                cableType === key
                  ? 'bg-slate-50 border-slate-600 text-slate-900'
                  : 'border-gray-300 text-gray-700 hover:border-slate-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Cable Size */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">
          4. Cable Size
        </label>
        <select
          value={cableSize}
          onChange={e => setCableSize(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
        >
          {getCableSizes().map(size => {
            const data = cableData[cableType]?.[size]
            return (
              <option key={size} value={size}>
                {data?.name} — Ø{data?.diameter}mm ({data?.csa}mm²)
              </option>
            )
          })}
        </select>
        <div className="flex gap-2 flex-wrap mt-2">
          {getCableSizes().slice(0, 6).map(size => (
            <button
              key={size}
              onClick={() => setCableSize(size)}
              className={`px-3 py-1 rounded font-semibold text-sm transition ${
                cableSize === size
                  ? 'bg-slate-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cableData[cableType]?.[size]?.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Number of Cables */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">
          5. Number of Cables
        </label>
        <input
          type="number"
          value={cableCount}
          onChange={e => setCableCount(e.target.value)}
          placeholder="Enter number of cables..."
          min="1"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600 mb-2"
        />
        <div className="flex gap-2 flex-wrap">
          {['2', '3', '4', '6', '8', '10', '12'].map(num => (
            <button
              key={num}
              onClick={() => setCableCount(num)}
              className={`px-3 py-1 rounded font-semibold text-sm transition ${
                cableCount === num
                  ? 'bg-slate-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {num}
            </button>
          ))}
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
          className="bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-700 hover:to-slate-600 text-white font-bold py-3 rounded-lg transition"
        >
          Calculate Fill
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className={`mt-6 rounded-lg p-6 ${
          result.compliant40 
            ? 'bg-green-50 border-2 border-green-300' 
            : result.compliant45 
              ? 'bg-amber-50 border-2 border-amber-300'
              : 'bg-red-50 border-2 border-red-300'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {result.compliant40 ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : result.compliant45 ? (
                <AlertCircle className="w-6 h-6 text-amber-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
              <h3 className={`text-xl font-bold ${
                result.compliant40 
                  ? 'text-green-900' 
                  : result.compliant45 
                    ? 'text-amber-900'
                    : 'text-red-900'
              }`}>
                {result.compliant40 
                  ? '✓ COMPLIANT (Easy Draw)' 
                  : result.compliant45 
                    ? '⚠ ACCEPTABLE (Straight Runs Only)'
                    : '✗ OVER-FILLED'}
              </h3>
            </div>
            <button
              onClick={printResult}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
            >
              <Printer className="w-4 h-4" />
              <span className="text-sm">Print</span>
            </button>
          </div>

          {/* Main Result */}
          <div className="bg-white p-4 rounded border-t-4" style={{ 
            borderColor: result.compliant40 ? '#22c55e' : result.compliant45 ? '#f59e0b' : '#ef4444' 
          }}>
            <div className="text-center mb-4">
              <p className="text-gray-600 text-sm">Conduit Fill</p>
              <p className={`text-4xl font-bold ${
                result.compliant40 
                  ? 'text-green-600' 
                  : result.compliant45 
                    ? 'text-amber-600'
                    : 'text-red-600'
              }`}>
                {result.fillPercentage}%
              </p>
              <p className="text-sm text-gray-600">
                {result.numCables}× {result.cable.name} in {result.conduit.name}
              </p>
            </div>

            {/* Visual Fill Indicator */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Circle className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-gray-600">Conduit capacity</span>
              </div>
              <div className="h-6 bg-gray-200 rounded-full overflow-hidden relative">
                <div 
                  className={`h-full transition-all ${
                    result.compliant40 
                      ? 'bg-green-500' 
                      : result.compliant45 
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, parseFloat(result.fillPercentage))}%` }}
                />
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-green-700" 
                  style={{ left: '40%' }}
                  title="40% Easy Draw Limit"
                />
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-red-700" 
                  style={{ left: '45%' }}
                  title="45% Absolute Maximum"
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span className="text-green-600">40% limit</span>
                <span className="text-red-600">45% max</span>
                <span>100%</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-600">Cable CSA (total)</p>
                <p className="font-bold">{result.totalCableCSA}mm²</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-600">Conduit CSA</p>
                <p className="font-bold">{result.conduitCSA}mm²</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-600">Max cables (40%)</p>
                <p className="font-bold text-green-600">{result.maxCables40}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <p className="text-gray-600">Max cables (45%)</p>
                <p className="font-bold text-amber-600">{result.maxCables45}</p>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          {result.needsLarger && (
            <div className="mt-4 bg-white rounded-lg p-4 border border-amber-200">
              <h4 className="font-bold text-amber-800 mb-2">
                ⚠ Recommended: Use Larger Conduit
              </h4>
              <p className="text-sm text-gray-700">
                For {result.numCables}× {result.cable.name} at 40% fill, use: <strong>{result.recommendedConduitName}</strong>
              </p>
            </div>
          )}

          {result.compliant40 && result.additionalCablesPossible40 > 0 && (
            <div className="mt-4 bg-white rounded-lg p-4 border border-green-200">
              <h4 className="font-bold text-green-800 mb-2">
                ✓ Space Available
              </h4>
              <p className="text-sm text-gray-700">
                You can add <strong>{result.additionalCablesPossible40} more</strong> {result.cable.name} cables and stay within 40% fill.
              </p>
            </div>
          )}

          {/* BS 7671 Note */}
          <div className="mt-4 bg-slate-50 rounded-lg p-3 text-xs text-slate-700">
            <p className="font-semibold mb-1">BS 7671 Fill Limits:</p>
            <p><strong>40%</strong> — Recommended maximum for easy cable pulling, especially with bends</p>
            <p><strong>45%</strong> — Absolute maximum for straight runs only with carefully prepared cables</p>
          </div>

          {/* Summary */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Conduit:</span> <strong>{result.conduit.name}</strong>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Cable:</span> <strong>{result.cable.name}</strong>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Quantity:</span> <strong>{result.numCables}</strong>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Fill:</span> <strong>{result.fillPercentage}%</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
