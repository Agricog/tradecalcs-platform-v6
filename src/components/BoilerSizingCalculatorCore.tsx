import { useState } from 'react'
import { CheckCircle2, AlertCircle, Printer, Flame, Droplets, ThermometerSun } from 'lucide-react'

export interface BoilerSizingCalculatorCoreProps {
  defaultMethod?: 'quick' | 'detailed'
}

export function BoilerSizingCalculatorCore({
  defaultMethod = 'quick'
}: BoilerSizingCalculatorCoreProps) {
  const [method, setMethod] = useState<'quick' | 'detailed'>(defaultMethod)
  
  // Quick method inputs
  const [bedrooms, setBedrooms] = useState(3)
  const [bathrooms, setBathrooms] = useState(1)
  const [showers, setShowers] = useState(1)
  const [propertyType, setPropertyType] = useState<'flat' | 'mid-terrace' | 'end-terrace' | 'semi' | 'detached'>('semi')
  const [propertyAge, setPropertyAge] = useState<'pre-1930' | '1930-1975' | '1976-2000' | 'post-2000'>('1976-2000')
  
  // Detailed method inputs
  const [totalRadiatorOutput, setTotalRadiatorOutput] = useState(12000) // Watts
  const [numberOfRadiators, setNumberOfRadiators] = useState(8)
  
  const [result, setResult] = useState<any>(null)

  // =============================================================================
  // UK BOILER SIZING LOGIC
  // =============================================================================
  // Based on:
  // - Heating demand (radiators/property size)
  // - Hot water demand (bathrooms/showers/flow rate)
  // - Property heat loss characteristics
  // =============================================================================

  const propertyHeatLossMultiplier: Record<string, number> = {
    'flat': 0.85,
    'mid-terrace': 0.9,
    'end-terrace': 1.0,
    'semi': 1.05,
    'detached': 1.15
  }

  const ageHeatLossMultiplier: Record<string, number> = {
    'pre-1930': 1.3,      // Poor insulation, solid walls
    '1930-1975': 1.15,    // Some insulation, cavity walls
    '1976-2000': 1.0,     // Building regs improving
    'post-2000': 0.85     // Modern insulation standards
  }

  // Base heating requirement per bedroom (kW)
  const baseHeatingPerBedroom = 3.5

  // Hot water flow rate requirements (litres/min at 35°C rise)
  const flowRateRequirements = {
    singleOutlet: 10,      // One shower/bath at a time
    twoOutlets: 15,        // Two showers simultaneously
    threeOutlets: 20       // Three+ outlets
  }

  // kW per litre/min flow rate (approximate)
  const kwPerLitrePerMin = 2.1

  const calculateQuickMethod = () => {
    // Calculate heating demand
    const baseHeating = bedrooms * baseHeatingPerBedroom
    const adjustedHeating = baseHeating * 
      propertyHeatLossMultiplier[propertyType] * 
      ageHeatLossMultiplier[propertyAge]
    
    // Calculate hot water demand
    const totalWaterOutlets = bathrooms + showers
    let requiredFlowRate: number
    let flowRateDesc: string
    
    if (totalWaterOutlets <= 1) {
      requiredFlowRate = flowRateRequirements.singleOutlet
      flowRateDesc = 'Single outlet (10 L/min)'
    } else if (totalWaterOutlets <= 2) {
      requiredFlowRate = flowRateRequirements.twoOutlets
      flowRateDesc = 'Two outlets (15 L/min)'
    } else {
      requiredFlowRate = flowRateRequirements.threeOutlets
      flowRateDesc = 'Three+ outlets (20 L/min)'
    }
    
    const hotWaterKw = requiredFlowRate * kwPerLitrePerMin
    
    // Determine recommended boiler size
    // For combi: max of heating OR hot water demand
    // For system: heating demand (cylinder handles hot water storage)
    const combiKw = Math.max(adjustedHeating, hotWaterKw)
    const systemKw = adjustedHeating + 3 // Small overhead for cylinder recovery
    
    // Round up to nearest standard size
    const standardSizes = [24, 25, 27, 28, 30, 32, 35, 38, 40, 45]
    const recommendedCombiKw = standardSizes.find(s => s >= combiKw) || 45
    const recommendedSystemKw = standardSizes.find(s => s >= systemKw) || 45
    
    // Determine best boiler type
    let recommendedType: 'combi' | 'system' | 'regular'
    let typeReason: string
    
    if (totalWaterOutlets <= 2 && bedrooms <= 4) {
      recommendedType = 'combi'
      typeReason = 'Combi suitable - moderate hot water demand, no cylinder needed'
    } else if (totalWaterOutlets > 2 || bedrooms > 4) {
      recommendedType = 'system'
      typeReason = 'System recommended - high hot water demand benefits from stored hot water'
    } else {
      recommendedType = 'combi'
      typeReason = 'Combi suitable for this property size'
    }
    
    // Override if property has specific needs
    if (bathrooms >= 3) {
      recommendedType = 'system'
      typeReason = '3+ bathrooms - system boiler with cylinder recommended for simultaneous use'
    }
    
    return {
      method: 'quick',
      heatingDemand: adjustedHeating.toFixed(1),
      hotWaterDemand: hotWaterKw.toFixed(1),
      requiredFlowRate,
      flowRateDesc,
      recommendedCombiKw,
      recommendedSystemKw,
      recommendedType,
      typeReason,
      propertyMultiplier: (propertyHeatLossMultiplier[propertyType] * ageHeatLossMultiplier[propertyAge]).toFixed(2),
      inputs: {
        bedrooms,
        bathrooms,
        showers,
        propertyType,
        propertyAge,
        totalWaterOutlets
      }
    }
  }

  const calculateDetailedMethod = () => {
    // Convert radiator output to kW
    const heatingKw = totalRadiatorOutput / 1000
    
    // Add 10-20% buffer for heat-up time
    const adjustedHeatingKw = heatingKw * 1.15
    
    // Estimate hot water based on radiator count (rough correlation to property size)
    const estimatedBathrooms = Math.ceil(numberOfRadiators / 6)
    const requiredFlowRate = estimatedBathrooms <= 1 ? 10 : estimatedBathrooms <= 2 ? 15 : 20
    const hotWaterKw = requiredFlowRate * kwPerLitrePerMin
    
    const combiKw = Math.max(adjustedHeatingKw, hotWaterKw)
    const systemKw = adjustedHeatingKw + 3
    
    const standardSizes = [24, 25, 27, 28, 30, 32, 35, 38, 40, 45]
    const recommendedCombiKw = standardSizes.find(s => s >= combiKw) || 45
    const recommendedSystemKw = standardSizes.find(s => s >= systemKw) || 45
    
    let recommendedType: 'combi' | 'system'
    let typeReason: string
    
    if (numberOfRadiators <= 12 && estimatedBathrooms <= 2) {
      recommendedType = 'combi'
      typeReason = 'Combi suitable for this heating load'
    } else {
      recommendedType = 'system'
      typeReason = 'Larger property - system boiler recommended'
    }
    
    return {
      method: 'detailed',
      heatingDemand: adjustedHeatingKw.toFixed(1),
      hotWaterDemand: hotWaterKw.toFixed(1),
      requiredFlowRate,
      flowRateDesc: `Estimated ${requiredFlowRate} L/min`,
      recommendedCombiKw,
      recommendedSystemKw,
      recommendedType,
      typeReason,
      inputs: {
        totalRadiatorOutput,
        numberOfRadiators,
        estimatedBathrooms
      }
    }
  }

  const calculate = () => {
    const calcResult = method === 'quick' ? calculateQuickMethod() : calculateDetailedMethod()
    setResult(calcResult)
  }

  const resetCalculator = () => {
    setBedrooms(3)
    setBathrooms(1)
    setShowers(1)
    setPropertyType('semi')
    setPropertyAge('1976-2000')
    setTotalRadiatorOutput(12000)
    setNumberOfRadiators(8)
    setResult(null)
  }

  const printResult = () => {
    window.print()
  }

  const boilerBrands = [
    { name: 'Worcester Bosch', range: '24-42kW', warranty: '10 years', tier: 'Premium' },
    { name: 'Vaillant', range: '24-38kW', warranty: '10 years', tier: 'Premium' },
    { name: 'Viessmann', range: '25-35kW', warranty: '10 years', tier: 'Premium' },
    { name: 'Ideal', range: '24-40kW', warranty: '10 years', tier: 'Mid-range' },
    { name: 'Baxi', range: '24-36kW', warranty: '7-10 years', tier: 'Mid-range' },
    { name: 'Glow-worm', range: '24-38kW', warranty: '5-7 years', tier: 'Budget' }
  ]

  return (
    <div className="p-6">
      {/* Method Selection */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-3">
          Calculation Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => { setMethod('quick'); setResult(null); }}
            className={`p-4 rounded-lg border-2 text-left transition ${
              method === 'quick'
                ? 'bg-orange-50 border-orange-500 text-orange-900'
                : 'border-gray-300 text-gray-700 hover:border-orange-400'
            }`}
          >
            <p className="font-bold">Quick Estimate</p>
            <p className="text-xs mt-1">Based on bedrooms & bathrooms</p>
          </button>
          <button
            onClick={() => { setMethod('detailed'); setResult(null); }}
            className={`p-4 rounded-lg border-2 text-left transition ${
              method === 'detailed'
                ? 'bg-orange-50 border-orange-500 text-orange-900'
                : 'border-gray-300 text-gray-700 hover:border-orange-400'
            }`}
          >
            <p className="font-bold">From Radiator Output</p>
            <p className="text-xs mt-1">Use total BTU/Watts from heat calc</p>
          </button>
        </div>
      </div>

      {method === 'quick' ? (
        <>
          {/* Bedrooms */}
          <div className="mb-6">
            <label className="block font-bold text-gray-800 mb-2">
              1. Number of Bedrooms: <span className="text-orange-600">{bedrooms}</span>
            </label>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  onClick={() => setBedrooms(num)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    bedrooms === num
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          {/* Bathrooms */}
          <div className="mb-6">
            <label className="block font-bold text-gray-800 mb-2">
              2. Number of Bathrooms: <span className="text-orange-600">{bathrooms}</span>
            </label>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  onClick={() => setBathrooms(num)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    bathrooms === num
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Include en-suites</p>
          </div>

          {/* Showers (additional to baths) */}
          <div className="mb-6">
            <label className="block font-bold text-gray-800 mb-2">
              3. Additional Showers (not in bathrooms): <span className="text-orange-600">{showers}</span>
            </label>
            <div className="flex gap-2 flex-wrap">
              {[0, 1, 2, 3].map(num => (
                <button
                  key={num}
                  onClick={() => setShowers(num)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    showers === num
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">Standalone showers, utility room taps etc.</p>
          </div>

          {/* Property Type */}
          <div className="mb-6">
            <label className="block font-bold text-gray-800 mb-2">
              4. Property Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                { key: 'flat', label: 'Flat/Apartment' },
                { key: 'mid-terrace', label: 'Mid Terrace' },
                { key: 'end-terrace', label: 'End Terrace' },
                { key: 'semi', label: 'Semi-Detached' },
                { key: 'detached', label: 'Detached' }
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setPropertyType(item.key as any)}
                  className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
                    propertyType === item.key
                      ? 'bg-orange-50 border-orange-500 text-orange-900'
                      : 'border-gray-300 text-gray-700 hover:border-orange-400'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Property Age */}
          <div className="mb-6">
            <label className="block font-bold text-gray-800 mb-2">
              5. Property Age
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'pre-1930', label: 'Pre-1930', desc: 'Victorian/Edwardian' },
                { key: '1930-1975', label: '1930-1975', desc: 'Inter/post-war' },
                { key: '1976-2000', label: '1976-2000', desc: 'Modern standards' },
                { key: 'post-2000', label: 'Post-2000', desc: 'Current regs' }
              ].map(item => (
                <button
                  key={item.key}
                  onClick={() => setPropertyAge(item.key as any)}
                  className={`p-3 rounded-lg border-2 text-left transition ${
                    propertyAge === item.key
                      ? 'bg-orange-50 border-orange-500 text-orange-900'
                      : 'border-gray-300 text-gray-700 hover:border-orange-400'
                  }`}
                >
                  <p className="font-semibold text-sm">{item.label}</p>
                  <p className="text-xs opacity-75">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Total Radiator Output */}
          <div className="mb-6">
            <label className="block font-bold text-gray-800 mb-2">
              1. Total Radiator Output (Watts)
            </label>
            <input
              type="number"
              value={totalRadiatorOutput}
              onChange={e => setTotalRadiatorOutput(parseInt(e.target.value) || 0)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg font-semibold focus:border-orange-500 focus:outline-none"
              placeholder="e.g. 12000"
            />
            <p className="text-xs text-gray-500 mt-1">
              Sum of all radiator outputs from your <a href="/radiator-btu-calculator" className="text-orange-600 underline">BTU calculation</a>
            </p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {[8000, 10000, 12000, 15000, 18000, 22000].map(val => (
                <button
                  key={val}
                  onClick={() => setTotalRadiatorOutput(val)}
                  className={`px-3 py-1 rounded text-sm font-semibold transition ${
                    totalRadiatorOutput === val
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                  }`}
                >
                  {(val / 1000).toFixed(0)}kW
                </button>
              ))}
            </div>
          </div>

          {/* Number of Radiators */}
          <div className="mb-6">
            <label className="block font-bold text-gray-800 mb-2">
              2. Number of Radiators: <span className="text-orange-600">{numberOfRadiators}</span>
            </label>
            <input
              type="range"
              min="4"
              max="20"
              value={numberOfRadiators}
              onChange={e => setNumberOfRadiators(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>4</span>
              <span>20</span>
            </div>
          </div>
        </>
      )}

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <button
          onClick={resetCalculator}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition"
        >
          Reset
        </button>
        <button
          onClick={calculate}
          className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-bold py-3 rounded-lg transition"
        >
          Calculate Boiler Size
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-6 rounded-lg p-6 bg-orange-50 border-2 border-orange-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-600" />
              <h3 className="text-xl font-bold text-orange-900">
                Recommended Boiler Size
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

          {/* Main Recommendation */}
          <div className="bg-white p-4 rounded-lg border-t-4 border-orange-500 mb-4">
            <div className="text-center mb-4">
              <p className="text-gray-600 text-sm mb-1">Recommended Boiler</p>
              <p className="text-4xl font-bold text-orange-600">
                {result.recommendedType === 'combi' ? result.recommendedCombiKw : result.recommendedSystemKw}kW
              </p>
              <p className="text-lg font-semibold text-orange-700 capitalize">
                {result.recommendedType} Boiler
              </p>
            </div>

            <div className={`p-3 rounded-lg ${
              result.recommendedType === 'combi' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
            }`}>
              <div className="flex items-start gap-2">
                <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  result.recommendedType === 'combi' ? 'text-green-600' : 'text-blue-600'
                }`} />
                <p className={`text-sm ${
                  result.recommendedType === 'combi' ? 'text-green-800' : 'text-blue-800'
                }`}>
                  {result.typeReason}
                </p>
              </div>
            </div>
          </div>

          {/* Demand Breakdown */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ThermometerSun className="w-5 h-5 text-red-500" />
                <p className="font-semibold text-gray-800">Heating Demand</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{result.heatingDemand} kW</p>
              <p className="text-xs text-gray-500">Central heating requirement</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                <p className="font-semibold text-gray-800">Hot Water Demand</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{result.hotWaterDemand} kW</p>
              <p className="text-xs text-gray-500">{result.flowRateDesc}</p>
            </div>
          </div>

          {/* Both Options */}
          <div className="bg-white p-4 rounded-lg mb-4">
            <p className="font-semibold text-gray-800 mb-3">Boiler Options</p>
            <div className="grid md:grid-cols-2 gap-3">
              <div className={`p-3 rounded-lg border-2 ${
                result.recommendedType === 'combi' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-900">Combi Boiler</p>
                  {result.recommendedType === 'combi' && (
                    <span className="text-xs bg-orange-600 text-white px-2 py-0.5 rounded-full">Recommended</span>
                  )}
                </div>
                <p className="text-2xl font-bold text-orange-600">{result.recommendedCombiKw}kW</p>
                <p className="text-xs text-gray-600">No cylinder needed, instant hot water</p>
              </div>
              <div className={`p-3 rounded-lg border-2 ${
                result.recommendedType === 'system' ? 'border-orange-500 bg-orange-50' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-900">System Boiler</p>
                  {result.recommendedType === 'system' && (
                    <span className="text-xs bg-orange-600 text-white px-2 py-0.5 rounded-full">Recommended</span>
                  )}
                </div>
                <p className="text-2xl font-bold text-orange-600">{result.recommendedSystemKw}kW</p>
                <p className="text-xs text-gray-600">+ hot water cylinder for high demand</p>
              </div>
            </div>
          </div>

          {/* Warning for high demand */}
          {(result.inputs.totalWaterOutlets >= 3 || result.inputs.bedrooms >= 5 || result.recommendedCombiKw >= 35) && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-amber-900">High Demand Property</p>
                  <p className="text-sm text-amber-800">
                    For properties with 3+ bathrooms or high hot water demand, consider a system boiler with unvented cylinder for best performance. Consult a Gas Safe engineer.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Popular Brands */}
          <div className="bg-white p-4 rounded-lg">
            <p className="font-semibold text-gray-800 mb-3">Popular UK Boiler Brands</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {boilerBrands.map((brand, i) => (
                <div key={i} className="p-2 bg-gray-50 rounded text-sm">
                  <p className="font-semibold text-gray-900">{brand.name}</p>
                  <p className="text-xs text-gray-600">{brand.range}</p>
                  <p className="text-xs text-green-600">{brand.warranty}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-4 text-xs text-gray-600 bg-white rounded p-3">
            <p className="font-semibold mb-1">Calculation Summary</p>
            <p>
              {method === 'quick' 
                ? `${bedrooms} bed, ${bathrooms} bath ${propertyType} (${propertyAge}) with ${result.inputs.totalWaterOutlets} water outlet(s). Heat loss factor: ${result.propertyMultiplier}×`
                : `${(totalRadiatorOutput / 1000).toFixed(1)}kW total radiator output across ${numberOfRadiators} radiators.`
              }
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
