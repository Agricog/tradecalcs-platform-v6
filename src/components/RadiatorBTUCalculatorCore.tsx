import { useState } from 'react'
import { CheckCircle2, Flame, Printer, Info } from 'lucide-react'

export interface RadiatorBTUCalculatorCoreProps {
  defaultLength?: string
  defaultWidth?: string
  defaultHeight?: string
  defaultRoomType?: 'living' | 'bedroom' | 'bathroom' | 'kitchen' | 'hallway' | 'conservatory'
  defaultInsulation?: 'poor' | 'average' | 'good' | 'excellent'
  defaultExternalWalls?: number
  defaultWindows?: number
  defaultGlazing?: 'single' | 'double' | 'triple'
  defaultFloorLevel?: 'ground' | 'mid' | 'top'
  defaultNorthFacing?: boolean
}

export function RadiatorBTUCalculatorCore({
  defaultLength = '',
  defaultWidth = '',
  defaultHeight = '2.4',
  defaultRoomType = 'living',
  defaultInsulation = 'average',
  defaultExternalWalls = 1,
  defaultWindows = 1,
  defaultGlazing = 'double',
  defaultFloorLevel = 'mid',
  defaultNorthFacing = false
}: RadiatorBTUCalculatorCoreProps) {
  const [length, setLength] = useState(defaultLength)
  const [width, setWidth] = useState(defaultWidth)
  const [height, setHeight] = useState(defaultHeight)
  const [roomType, setRoomType] = useState<'living' | 'bedroom' | 'bathroom' | 'kitchen' | 'hallway' | 'conservatory'>(defaultRoomType)
  const [insulation, setInsulation] = useState<'poor' | 'average' | 'good' | 'excellent'>(defaultInsulation)
  const [externalWalls, setExternalWalls] = useState(defaultExternalWalls)
  const [windows, setWindows] = useState(defaultWindows)
  const [glazing, setGlazing] = useState<'single' | 'double' | 'triple'>(defaultGlazing)
  const [floorLevel, setFloorLevel] = useState<'ground' | 'mid' | 'top'>(defaultFloorLevel)
  const [northFacing, setNorthFacing] = useState(defaultNorthFacing)
  const [result, setResult] = useState<any>(null)

  // =============================================================================
  // UK RADIATOR SIZING - HEAT LOSS CALCULATION METHOD
  // =============================================================================
  // Base watts per cubic meter by room type (at ΔT50, standard UK radiator output)
  // These values account for typical UK climate (design temp -3°C outside, 21°C inside)
  // =============================================================================
  const baseWattsPerM3: Record<string, number> = {
    living: 44,      // Living rooms - comfort priority
    bedroom: 38,     // Bedrooms - slightly cooler acceptable
    bathroom: 55,    // Bathrooms - need extra warmth, less clothing
    kitchen: 36,     // Kitchens - cooking appliances add heat
    hallway: 40,     // Hallways - transition spaces
    conservatory: 60 // Conservatories - high heat loss through glass
  }

  // Insulation multipliers
  const insulationMultipliers: Record<string, number> = {
    poor: 1.3,       // Pre-1930s, no cavity insulation, single glazing
    average: 1.0,    // 1960s-1990s, some insulation, double glazing
    good: 0.85,      // Post-2000, Building Regs compliant
    excellent: 0.7   // New build to current regs, or heavily upgraded
  }

  // Glazing heat loss factors (additional watts per window)
  const glazingFactors: Record<string, number> = {
    single: 150,    // Single glazing - significant heat loss
    double: 50,     // Double glazing - standard
    triple: 25      // Triple glazing - minimal additional loss
  }

  // Room type labels
  const roomTypeLabels: Record<string, string> = {
    living: 'Living Room',
    bedroom: 'Bedroom',
    bathroom: 'Bathroom',
    kitchen: 'Kitchen',
    hallway: 'Hallway/Landing',
    conservatory: 'Conservatory'
  }

  // Standard radiator sizes (BTU at ΔT50) for recommendations
  const standardRadiators = [
    { name: 'Single Panel 600x400', btu: 1000, watts: 293 },
    { name: 'Single Panel 600x600', btu: 1500, watts: 440 },
    { name: 'Single Panel 600x800', btu: 2000, watts: 586 },
    { name: 'Single Panel 600x1000', btu: 2500, watts: 733 },
    { name: 'Single Panel 600x1200', btu: 3000, watts: 879 },
    { name: 'Double Panel 600x600', btu: 2800, watts: 820 },
    { name: 'Double Panel 600x800', btu: 3700, watts: 1084 },
    { name: 'Double Panel 600x1000', btu: 4600, watts: 1348 },
    { name: 'Double Panel 600x1200', btu: 5500, watts: 1612 },
    { name: 'Double Panel 600x1400', btu: 6400, watts: 1876 },
    { name: 'Double Panel 600x1600', btu: 7300, watts: 2140 },
    { name: 'Double Panel Plus 600x800', btu: 4500, watts: 1319 },
    { name: 'Double Panel Plus 600x1000', btu: 5600, watts: 1641 },
    { name: 'Double Panel Plus 600x1200', btu: 6700, watts: 1963 },
    { name: 'Double Panel Plus 600x1400', btu: 7800, watts: 2286 },
    { name: 'Double Panel Plus 600x1600', btu: 8900, watts: 2608 },
    { name: 'Double Panel Plus 600x1800', btu: 10000, watts: 2931 },
    { name: 'Triple Panel 600x1000', btu: 7000, watts: 2051 },
    { name: 'Triple Panel 600x1200', btu: 8400, watts: 2462 },
    { name: 'Triple Panel 600x1400', btu: 9800, watts: 2872 },
    { name: 'Triple Panel 600x1600', btu: 11200, watts: 3283 },
  ]

  const calculate = () => {
    const lengthNum = parseFloat(length)
    const widthNum = parseFloat(width)
    const heightNum = parseFloat(height)

    if (!lengthNum || !widthNum || !heightNum) {
      alert('Please enter room dimensions')
      return
    }

    // Calculate room volume
    const volume = lengthNum * widthNum * heightNum
    const floorArea = lengthNum * widthNum

    // Base heat requirement (Watts)
    const baseWatts = volume * baseWattsPerM3[roomType]

    // Apply insulation multiplier
    let totalWatts = baseWatts * insulationMultipliers[insulation]

    // External walls adjustment (+10% per wall above the first)
    if (externalWalls > 1) {
      totalWatts *= 1 + ((externalWalls - 1) * 0.1)
    }

    // Window heat loss addition
    totalWatts += windows * glazingFactors[glazing]

    // Floor level adjustment
    if (floorLevel === 'ground') {
      totalWatts *= 1.1 // Ground floor - heat loss to ground
    } else if (floorLevel === 'top') {
      totalWatts *= 1.15 // Top floor - heat loss through roof
    }

    // North facing adjustment
    if (northFacing) {
      totalWatts *= 1.1 // Less solar gain, feels colder
    }

    // Round to sensible precision
    totalWatts = Math.ceil(totalWatts / 10) * 10

    // Convert to BTU (1 Watt = 3.412 BTU/hr)
    const totalBTU = Math.ceil(totalWatts * 3.412)

    // Find suitable radiator(s)
    const suitableRadiators = standardRadiators.filter(r => r.btu >= totalBTU * 0.95)
    const recommendedRadiator = suitableRadiators[0] || standardRadiators[standardRadiators.length - 1]

    // Check if multiple radiators needed
    const maxSingleRadiator = standardRadiators[standardRadiators.length - 1]
    const needsMultiple = totalBTU > maxSingleRadiator.btu

    // Calculate number of radiators if multiple needed
    let radiatorConfig = ''
    if (needsMultiple) {
      const numRadiators = Math.ceil(totalBTU / maxSingleRadiator.btu)
      const perRadiatorBTU = Math.ceil(totalBTU / numRadiators)
      const perRadiator = standardRadiators.find(r => r.btu >= perRadiatorBTU) || maxSingleRadiator
      radiatorConfig = `${numRadiators}× ${perRadiator.name}`
    }

    // Breakdown for display
    const breakdown = {
      volume: volume.toFixed(1),
      floorArea: floorArea.toFixed(1),
      baseWatts: Math.round(baseWatts),
      insulationFactor: insulationMultipliers[insulation],
      externalWallsAdjustment: externalWalls > 1 ? `+${(externalWalls - 1) * 10}%` : 'None',
      windowsHeatLoss: windows * glazingFactors[glazing],
      floorLevelAdjustment: floorLevel === 'ground' ? '+10%' : floorLevel === 'top' ? '+15%' : 'None',
      northFacingAdjustment: northFacing ? '+10%' : 'None'
    }

    setResult({
      totalWatts,
      totalBTU,
      recommendedRadiator: needsMultiple ? radiatorConfig : recommendedRadiator.name,
      recommendedBTU: needsMultiple ? totalBTU : recommendedRadiator.btu,
      recommendedWatts: needsMultiple ? totalWatts : recommendedRadiator.watts,
      needsMultiple,
      suitableRadiators: suitableRadiators.slice(0, 5),
      breakdown,
      roomType: roomTypeLabels[roomType],
      insulation,
      dimensions: `${lengthNum}m × ${widthNum}m × ${heightNum}m`
    })
  }

  const resetCalculator = () => {
    setLength(defaultLength)
    setWidth(defaultWidth)
    setHeight(defaultHeight)
    setRoomType(defaultRoomType)
    setInsulation(defaultInsulation)
    setExternalWalls(defaultExternalWalls)
    setWindows(defaultWindows)
    setGlazing(defaultGlazing)
    setFloorLevel(defaultFloorLevel)
    setNorthFacing(defaultNorthFacing)
    setResult(null)
  }

  const printResult = () => {
    window.print()
  }

  return (
    <div className="p-6">
      {/* Room Dimensions */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">
          1. Room Dimensions (metres)
        </label>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Length</label>
            <input
              type="number"
              value={length}
              onChange={e => setLength(e.target.value)}
              placeholder="e.g. 5"
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Room length in metres"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Width</label>
            <input
              type="number"
              value={width}
              onChange={e => setWidth(e.target.value)}
              placeholder="e.g. 4"
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Room width in metres"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600 mb-1 block">Height</label>
            <input
              type="number"
              value={height}
              onChange={e => setHeight(e.target.value)}
              placeholder="2.4"
              step="0.1"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              aria-label="Room height in metres"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Standard UK ceiling height is 2.4m</p>
        <div className="flex gap-2 flex-wrap mt-2">
          <span className="text-xs text-gray-500 mr-1">Quick sizes:</span>
          {[
            { l: '3', w: '3', label: 'Small (3×3)' },
            { l: '4', w: '4', label: 'Medium (4×4)' },
            { l: '5', w: '4', label: 'Large (5×4)' },
            { l: '6', w: '5', label: 'XL (6×5)' }
          ].map(size => (
            <button
              key={size.label}
              onClick={() => { setLength(size.l); setWidth(size.w) }}
              className={`px-3 py-1 rounded font-semibold text-sm transition ${
                length === size.l && width === size.w
                  ? 'bg-orange-600 text-white'
                  : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Room Type */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-3">
          2. Room Type
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(roomTypeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setRoomType(key as any)}
              className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
                roomType === key
                  ? 'bg-orange-50 border-orange-600 text-orange-900'
                  : 'border-gray-300 text-gray-700 hover:border-orange-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">Bathrooms need more heat • Kitchens have appliance heat gain</p>
      </div>

      {/* Insulation Level */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-3">
          3. Insulation Level
        </label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: 'poor', label: 'Poor', desc: 'Pre-1930s, no cavity fill' },
            { key: 'average', label: 'Average', desc: '1960s-1990s build' },
            { key: 'good', label: 'Good', desc: 'Post-2000, upgraded' },
            { key: 'excellent', label: 'Excellent', desc: 'New build/full retrofit' }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setInsulation(item.key as any)}
              className={`p-3 rounded-lg border-2 font-semibold text-sm transition text-left ${
                insulation === item.key
                  ? 'bg-orange-50 border-orange-600 text-orange-900'
                  : 'border-gray-300 text-gray-700 hover:border-orange-400'
              }`}
            >
              <p>{item.label}</p>
              <p className="text-xs font-normal text-gray-600">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* External Walls & Windows */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-3">
          4. External Walls & Windows
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-2 block">External walls</label>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  onClick={() => setExternalWalls(num)}
                  className={`w-10 h-10 rounded-lg font-bold transition ${
                    externalWalls === num
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-600 mb-2 block">Number of windows</label>
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  onClick={() => setWindows(num)}
                  className={`w-10 h-10 rounded-lg font-bold transition ${
                    windows === num
                      ? 'bg-orange-600 text-white'
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Glazing Type */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-3">
          5. Window Glazing Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { key: 'single', label: 'Single', desc: 'Old windows' },
            { key: 'double', label: 'Double', desc: 'Standard' },
            { key: 'triple', label: 'Triple', desc: 'High efficiency' }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setGlazing(item.key as any)}
              className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
                glazing === item.key
                  ? 'bg-orange-50 border-orange-600 text-orange-900'
                  : 'border-gray-300 text-gray-700 hover:border-orange-400'
              }`}
            >
              <p>{item.label}</p>
              <p className="text-xs font-normal text-gray-600">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Floor Level */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-3">
          6. Floor Level
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { key: 'ground', label: 'Ground Floor', desc: '+10% heat loss' },
            { key: 'mid', label: 'Middle Floor', desc: 'Standard' },
            { key: 'top', label: 'Top Floor', desc: '+15% roof loss' }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setFloorLevel(item.key as any)}
              className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
                floorLevel === item.key
                  ? 'bg-orange-50 border-orange-600 text-orange-900'
                  : 'border-gray-300 text-gray-700 hover:border-orange-400'
              }`}
            >
              <p>{item.label}</p>
              <p className="text-xs font-normal text-gray-600">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* North Facing */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-3">
          7. Orientation
        </label>
        <button
          onClick={() => setNorthFacing(!northFacing)}
          className={`w-full p-4 rounded-lg border-2 font-semibold transition flex items-center justify-between ${
            northFacing
              ? 'bg-orange-50 border-orange-600 text-orange-900'
              : 'border-gray-300 text-gray-700 hover:border-orange-400'
          }`}
        >
          <div className="text-left">
            <p>North-Facing Room</p>
            <p className="text-xs font-normal text-gray-600">Less solar gain, needs +10% heat</p>
          </div>
          <div className={`w-12 h-6 rounded-full transition ${northFacing ? 'bg-orange-600' : 'bg-gray-300'}`}>
            <div className={`w-5 h-5 bg-white rounded-full shadow transform transition ${northFacing ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
          </div>
        </button>
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
          className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-bold py-3 rounded-lg transition"
          aria-label="Calculate BTU requirement"
        >
          Calculate BTU
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-6 rounded-lg p-6 bg-orange-50 border-2 border-orange-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-600" />
              <h3 className="text-xl font-bold text-orange-900">
                Heat Requirement Calculated
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
          <div className="bg-white p-4 rounded border-t-4 border-orange-500">
            <div className="text-center mb-4">
              <p className="text-gray-600 text-sm">Total Heat Required</p>
              <p className="text-4xl font-bold text-orange-600">{result.totalBTU.toLocaleString()} BTU</p>
              <p className="text-lg text-gray-700">{result.totalWatts.toLocaleString()} Watts</p>
            </div>
            
            <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg mb-4">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-orange-900">Recommended Radiator</p>
                  <p className="text-lg font-semibold text-orange-800">{result.recommendedRadiator}</p>
                  <p className="text-sm text-orange-700">{result.recommendedBTU.toLocaleString()} BTU / {result.recommendedWatts.toLocaleString()}W output</p>
                </div>
              </div>
            </div>

            {result.needsMultiple && (
              <div className="bg-amber-50 border border-amber-300 p-3 rounded mb-4 flex items-start gap-2">
                <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  This room needs multiple radiators for even heat distribution. Consider positioning on opposite walls.
                </p>
              </div>
            )}

            {/* Calculation Breakdown */}
            <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded mt-4">
              <p className="font-bold mb-2">Calculation Breakdown:</p>
              <div className="grid grid-cols-2 gap-2">
                <p>Room Volume: <span className="font-semibold">{result.breakdown.volume}m³</span></p>
                <p>Floor Area: <span className="font-semibold">{result.breakdown.floorArea}m²</span></p>
                <p>Base Heat: <span className="font-semibold">{result.breakdown.baseWatts}W</span></p>
                <p>Insulation Factor: <span className="font-semibold">×{result.breakdown.insulationFactor}</span></p>
                <p>External Walls: <span className="font-semibold">{result.breakdown.externalWallsAdjustment}</span></p>
                <p>Window Loss: <span className="font-semibold">+{result.breakdown.windowsHeatLoss}W</span></p>
                <p>Floor Level: <span className="font-semibold">{result.breakdown.floorLevelAdjustment}</span></p>
                <p>North Facing: <span className="font-semibold">{result.breakdown.northFacingAdjustment}</span></p>
              </div>
            </div>
          </div>

          {/* Alternative Radiators */}
          {result.suitableRadiators && result.suitableRadiators.length > 1 && !result.needsMultiple && (
            <div className="mt-4 bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-3">Alternative Radiator Options</h4>
              <div className="space-y-2">
                {result.suitableRadiators.slice(0, 4).map((rad: any, i: number) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                    <span className="text-gray-700">{rad.name}</span>
                    <span className="font-semibold text-orange-600">{rad.btu.toLocaleString()} BTU</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">All options meet or exceed your heat requirement</p>
            </div>
          )}

          {/* Room Summary */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Room:</span> <strong>{result.roomType}</strong>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Size:</span> <strong>{result.dimensions}</strong>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Insulation:</span> <strong className="capitalize">{result.insulation}</strong>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Output:</span> <strong>ΔT50 rated</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
