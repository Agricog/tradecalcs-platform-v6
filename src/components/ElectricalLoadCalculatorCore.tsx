import { useState } from 'react'
import { CheckCircle2, AlertCircle, Printer, Plus, Trash2, Zap } from 'lucide-react'

interface CircuitEntry {
  id: string
  type: string
  quantity: number
  rating: number
  customName?: string
}

export interface ElectricalLoadCalculatorCoreProps {
  defaultPropertyType?: 'house' | 'flat' | 'commercial'
}

export function ElectricalLoadCalculatorCore({
  defaultPropertyType = 'house'
}: ElectricalLoadCalculatorCoreProps) {
  const [propertyType, setPropertyType] = useState<'house' | 'flat' | 'commercial'>(defaultPropertyType)
  const [circuits, setCircuits] = useState<CircuitEntry[]>([])
  const [result, setResult] = useState<any>(null)

  // =============================================================================
  // BS 7671 DIVERSITY FACTORS - TABLE 1A APPENDIX 1
  // =============================================================================
  // These factors account for the reality that not all loads operate simultaneously
  // at full capacity. Applied to calculate maximum demand from connected load.
  // =============================================================================

  const circuitTypes = {
    // Lighting - 66% of total lighting load (rarely all lights on at once)
    'lighting': {
      name: 'Lighting Circuit',
      defaultRating: 6,
      unit: 'A',
      diversityFactor: 0.66,
      description: 'Standard lighting circuit',
      typicalWatts: 1380, // 6A × 230V
      maxPerCircuit: 1380
    },
    // Socket outlets - first 10A at 100%, remainder at 30%
    'ring-main': {
      name: 'Ring Main (Sockets)',
      defaultRating: 32,
      unit: 'A',
      diversityFactor: 0.4, // Simplified - actual calc is more complex
      description: 'Standard 32A ring circuit',
      typicalWatts: 7360,
      maxPerCircuit: 7360
    },
    'radial-20a': {
      name: 'Radial 20A (Sockets)',
      defaultRating: 20,
      unit: 'A',
      diversityFactor: 0.4,
      description: '20A radial socket circuit',
      typicalWatts: 4600,
      maxPerCircuit: 4600
    },
    // Cooker - first 10A at 100% + 30% of remainder + 5A socket
    'cooker': {
      name: 'Electric Cooker',
      defaultRating: 45,
      unit: 'A',
      diversityFactor: 0.5, // Typical diversity for cookers
      description: 'Electric cooker/range (typically 10-15kW)',
      typicalWatts: 10000,
      maxPerCircuit: 15000
    },
    'hob': {
      name: 'Electric Hob',
      defaultRating: 32,
      unit: 'A',
      diversityFactor: 0.5,
      description: 'Separate electric hob (typically 6-8kW)',
      typicalWatts: 7000,
      maxPerCircuit: 8000
    },
    'oven': {
      name: 'Electric Oven',
      defaultRating: 20,
      unit: 'A',
      diversityFactor: 0.6,
      description: 'Built-in electric oven (typically 3-4kW)',
      typicalWatts: 3500,
      maxPerCircuit: 5000
    },
    // Shower - 100% (high peak load)
    'shower': {
      name: 'Electric Shower',
      defaultRating: 45,
      unit: 'A',
      diversityFactor: 1.0,
      description: 'Electric shower (7.5-10.8kW)',
      typicalWatts: 9000,
      maxPerCircuit: 11000
    },
    // Immersion - 100% when in use
    'immersion': {
      name: 'Immersion Heater',
      defaultRating: 16,
      unit: 'A',
      diversityFactor: 1.0,
      description: 'Hot water immersion (typically 3kW)',
      typicalWatts: 3000,
      maxPerCircuit: 3000
    },
    // EV Charger - 100% (continuous load)
    'ev-charger': {
      name: 'EV Charger',
      defaultRating: 32,
      unit: 'A',
      diversityFactor: 1.0,
      description: 'Home EV charger (7.4kW typical)',
      typicalWatts: 7400,
      maxPerCircuit: 7400
    },
    // Storage heaters - at 100%
    'storage-heater': {
      name: 'Storage Heater',
      defaultRating: 13,
      unit: 'A',
      diversityFactor: 1.0,
      description: 'Single storage heater (typically 1.7-3.4kW)',
      typicalWatts: 2500,
      maxPerCircuit: 3400
    },
    // Underfloor heating
    'ufh': {
      name: 'Underfloor Heating',
      defaultRating: 16,
      unit: 'A',
      diversityFactor: 0.5, // Thermostat controlled
      description: 'Electric underfloor heating zone',
      typicalWatts: 1500,
      maxPerCircuit: 3680
    },
    // Air conditioning
    'aircon': {
      name: 'Air Conditioning',
      defaultRating: 16,
      unit: 'A',
      diversityFactor: 0.75,
      description: 'Split system AC unit',
      typicalWatts: 2500,
      maxPerCircuit: 3680
    },
    // Heat pump
    'heat-pump': {
      name: 'Heat Pump (ASHP)',
      defaultRating: 32,
      unit: 'A',
      diversityFactor: 0.8,
      description: 'Air source heat pump',
      typicalWatts: 5000,
      maxPerCircuit: 7360
    },
    // Hot tub
    'hot-tub': {
      name: 'Hot Tub / Spa',
      defaultRating: 32,
      unit: 'A',
      diversityFactor: 0.5, // Heater cycles
      description: 'Hot tub (typically 5-7.5kW)',
      typicalWatts: 6000,
      maxPerCircuit: 7500
    },
    // Garage/workshop
    'workshop': {
      name: 'Garage/Workshop Supply',
      defaultRating: 32,
      unit: 'A',
      diversityFactor: 0.4,
      description: 'Sub-main to outbuilding',
      typicalWatts: 5000,
      maxPerCircuit: 7360
    },
    // Garden room/office
    'garden-office': {
      name: 'Garden Office',
      defaultRating: 20,
      unit: 'A',
      diversityFactor: 0.5,
      description: 'Garden room/office supply',
      typicalWatts: 2500,
      maxPerCircuit: 4600
    },
    // Other fixed appliance
    'other': {
      name: 'Other Fixed Appliance',
      defaultRating: 13,
      unit: 'A',
      diversityFactor: 0.75,
      description: 'Dishwasher, washing machine, etc.',
      typicalWatts: 2500,
      maxPerCircuit: 3000
    }
  }

  const addCircuit = (type: string) => {
    const circuitConfig = circuitTypes[type as keyof typeof circuitTypes]
    if (!circuitConfig) return

    const newCircuit: CircuitEntry = {
      id: `${type}-${Date.now()}`,
      type,
      quantity: 1,
      rating: circuitConfig.defaultRating
    }
    setCircuits([...circuits, newCircuit])
    setResult(null)
  }

  const removeCircuit = (id: string) => {
    setCircuits(circuits.filter(c => c.id !== id))
    setResult(null)
  }

  const updateCircuit = (id: string, field: 'quantity' | 'rating', value: number) => {
    setCircuits(circuits.map(c => 
      c.id === id ? { ...c, [field]: value } : c
    ))
    setResult(null)
  }

  const calculate = () => {
    if (circuits.length === 0) {
      alert('Please add at least one circuit')
      return
    }

    let totalConnectedLoad = 0
    let totalDiversifiedLoad = 0
    const breakdown: any[] = []

    // Calculate lighting separately (special diversity rules)
    const lightingCircuits = circuits.filter(c => c.type === 'lighting')

    // Lighting: 66% of total
    if (lightingCircuits.length > 0) {
      const lightingConnected = lightingCircuits.reduce((sum, c) => {
    return sum + (c.rating * 230 * c.quantity)
  }, 0)
      const lightingDiversified = lightingConnected * 0.66
      totalConnectedLoad += lightingConnected
      totalDiversifiedLoad += lightingDiversified
      breakdown.push({
        category: 'Lighting',
        circuits: lightingCircuits.length,
        connected: lightingConnected,
        diversity: '66%',
        diversified: lightingDiversified
      })
    }

    // Socket outlets: First 10A at 100%, remainder at 30%
    const socketCircuits = circuits.filter(c => ['ring-main', 'radial-20a'].includes(c.type))
    if (socketCircuits.length > 0) {
      const socketConnected = socketCircuits.reduce((sum, c) => {
        const watts = c.rating * 230 * c.quantity
        return sum + watts
      }, 0)
      // Simplified: 10A (2300W) at 100% + remainder at 30%
      const baseLoad = Math.min(socketConnected, 2300)
      const remainderLoad = Math.max(0, socketConnected - 2300) * 0.3
      const socketDiversified = baseLoad + remainderLoad
      totalConnectedLoad += socketConnected
      totalDiversifiedLoad += socketDiversified
      breakdown.push({
        category: 'Socket Outlets',
        circuits: socketCircuits.length,
        connected: socketConnected,
        diversity: 'First 10A @ 100%, rest @ 30%',
        diversified: socketDiversified
      })
    }

    // Cooker: 10A + 30% of remainder + 5A if socket
    const cookerCircuits = circuits.filter(c => ['cooker', 'hob', 'oven'].includes(c.type))
    if (cookerCircuits.length > 0) {
      const cookerConnected = cookerCircuits.reduce((sum, c) => {
        const config = circuitTypes[c.type as keyof typeof circuitTypes]
        return sum + (config.typicalWatts * c.quantity)
      }, 0)
      // 10A (2300W) at 100% + 30% of remainder
      const baseLoad = Math.min(cookerConnected, 2300)
      const remainderLoad = Math.max(0, cookerConnected - 2300) * 0.3
      const cookerDiversified = baseLoad + remainderLoad + (cookerCircuits.some(c => c.type === 'cooker') ? 1150 : 0) // +5A for cooker socket
      totalConnectedLoad += cookerConnected
      totalDiversifiedLoad += cookerDiversified
      breakdown.push({
        category: 'Cooking Appliances',
        circuits: cookerCircuits.length,
        connected: cookerConnected,
        diversity: '10A + 30% of remainder',
        diversified: cookerDiversified
      })
    }

    // All other circuits with their individual diversity factors
    const remainingCircuits = circuits.filter(c => 
      !['lighting', 'ring-main', 'radial-20a', 'cooker', 'hob', 'oven'].includes(c.type)
    )

    // Group by type for cleaner output
    const groupedRemaining: Record<string, CircuitEntry[]> = {}
    remainingCircuits.forEach(c => {
      if (!groupedRemaining[c.type]) groupedRemaining[c.type] = []
      groupedRemaining[c.type].push(c)
    })

    Object.entries(groupedRemaining).forEach(([type, typeCircuits]) => {
      const config = circuitTypes[type as keyof typeof circuitTypes]
      if (!config) return

      const connected = typeCircuits.reduce((sum, c) => {
        return sum + (config.typicalWatts * c.quantity)
      }, 0)
      const diversified = connected * config.diversityFactor

      totalConnectedLoad += connected
      totalDiversifiedLoad += diversified
      breakdown.push({
        category: config.name,
        circuits: typeCircuits.reduce((sum, c) => sum + c.quantity, 0),
        connected,
        diversity: `${Math.round(config.diversityFactor * 100)}%`,
        diversified
      })
    })

    // Convert to amps
    const totalAmps = totalDiversifiedLoad / 230

    // Determine recommended supply
    let recommendedSupply = '100A'
    let supplyNote = ''
    if (totalAmps <= 50) {
      recommendedSupply = '60A'
      supplyNote = 'Standard older property supply may be adequate'
    } else if (totalAmps <= 70) {
      recommendedSupply = '80A'
      supplyNote = 'Modern standard supply'
    } else if (totalAmps <= 90) {
      recommendedSupply = '100A'
      supplyNote = 'High demand property - verify with DNO'
    } else {
      recommendedSupply = '100A+'
      supplyNote = 'May require supply upgrade - consult DNO'
    }

    // Headroom calculation
    const supplyAmps = parseInt(recommendedSupply) || 100
    const headroom = ((supplyAmps - totalAmps) / supplyAmps) * 100

    setResult({
      totalConnectedLoad: Math.round(totalConnectedLoad),
      totalConnectedLoadKw: (totalConnectedLoad / 1000).toFixed(1),
      totalDiversifiedLoad: Math.round(totalDiversifiedLoad),
      totalDiversifiedLoadKw: (totalDiversifiedLoad / 1000).toFixed(1),
      totalAmps: totalAmps.toFixed(1),
      recommendedSupply,
      supplyNote,
      headroom: headroom.toFixed(0),
      breakdown,
      circuitCount: circuits.length,
      propertyType
    })
  }

  const resetCalculator = () => {
    setCircuits([])
    setPropertyType(defaultPropertyType)
    setResult(null)
  }

  const printResult = () => {
    window.print()
  }

  // Quick add common configurations
  const addTypicalHouse = () => {
    setCircuits([
      { id: 'lighting-1', type: 'lighting', quantity: 2, rating: 6 },
      { id: 'ring-1', type: 'ring-main', quantity: 2, rating: 32 },
      { id: 'cooker-1', type: 'cooker', quantity: 1, rating: 45 },
      { id: 'shower-1', type: 'shower', quantity: 1, rating: 45 },
      { id: 'immersion-1', type: 'immersion', quantity: 1, rating: 16 }
    ])
    setResult(null)
  }

  const addTypicalFlat = () => {
    setCircuits([
      { id: 'lighting-1', type: 'lighting', quantity: 1, rating: 6 },
      { id: 'ring-1', type: 'ring-main', quantity: 1, rating: 32 },
      { id: 'cooker-1', type: 'hob', quantity: 1, rating: 32 },
      { id: 'oven-1', type: 'oven', quantity: 1, rating: 20 },
      { id: 'shower-1', type: 'shower', quantity: 1, rating: 40 }
    ])
    setResult(null)
  }

  return (
    <div className="p-6">
      {/* Property Type */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-3">
          1. Property Type
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { key: 'house', label: 'House' },
            { key: 'flat', label: 'Flat/Apartment' },
            { key: 'commercial', label: 'Commercial' }
          ].map(item => (
            <button
              key={item.key}
              onClick={() => setPropertyType(item.key as any)}
              className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
                propertyType === item.key
                  ? 'bg-indigo-50 border-indigo-600 text-indigo-900'
                  : 'border-gray-300 text-gray-700 hover:border-indigo-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Templates */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">
          Quick Start Templates
        </label>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={addTypicalHouse}
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold text-sm hover:bg-indigo-200 transition"
          >
            Typical 3-Bed House
          </button>
          <button
            onClick={addTypicalFlat}
            className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg font-semibold text-sm hover:bg-indigo-200 transition"
          >
            Typical Flat
          </button>
          <button
            onClick={resetCalculator}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-200 transition"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Add Circuits */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-3">
          2. Add Circuits
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(circuitTypes).map(([key, config]) => (
            <button
              key={key}
              onClick={() => addCircuit(key)}
              className="p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-left hover:bg-indigo-50 hover:border-indigo-300 transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-indigo-600" />
              <span className="truncate">{config.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Circuit List */}
      {circuits.length > 0 && (
        <div className="mb-6">
          <label className="block font-bold text-gray-800 mb-3">
            3. Your Circuits ({circuits.length})
          </label>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {circuits.map(circuit => {
              const config = circuitTypes[circuit.type as keyof typeof circuitTypes]
              return (
                <div key={circuit.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">{config?.name}</p>
                    <p className="text-xs text-gray-500">{config?.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-gray-600">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={circuit.quantity}
                      onChange={e => updateCircuit(circuit.id, 'quantity', parseInt(e.target.value) || 1)}
                      className="w-14 px-2 py-1 border rounded text-sm text-center"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-gray-600">Rating:</label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={circuit.rating}
                      onChange={e => updateCircuit(circuit.id, 'rating', parseInt(e.target.value) || 1)}
                      className="w-16 px-2 py-1 border rounded text-sm text-center"
                    />
                    <span className="text-xs text-gray-500">A</span>
                  </div>
                  <button
                    onClick={() => removeCircuit(circuit.id)}
                    className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )}

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
          className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-bold py-3 rounded-lg transition"
        >
          Calculate Load
        </button>
      </div>

      {/* Results */}
      {result && (
        <div className="mt-6 rounded-lg p-6 bg-indigo-50 border-2 border-indigo-300">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl font-bold text-indigo-900">
                Maximum Demand Calculated
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
          <div className="bg-white p-4 rounded border-t-4 border-indigo-500">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 text-sm">Connected Load (Total)</p>
                <p className="text-2xl font-bold text-gray-800">{result.totalConnectedLoadKw} kW</p>
                <p className="text-sm text-gray-500">{result.totalConnectedLoad.toLocaleString()} W</p>
              </div>
              <div className="text-center p-4 bg-indigo-100 rounded-lg">
                <p className="text-indigo-700 text-sm font-semibold">Maximum Demand (After Diversity)</p>
                <p className="text-3xl font-bold text-indigo-600">{result.totalDiversifiedLoadKw} kW</p>
                <p className="text-lg font-semibold text-indigo-700">{result.totalAmps} Amps</p>
              </div>
            </div>

            {/* Supply Recommendation */}
            <div className={`p-4 rounded-lg mb-4 ${
              parseFloat(result.totalAmps) <= 80 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-amber-50 border border-amber-200'
            }`}>
              <div className="flex items-start gap-3">
                {parseFloat(result.totalAmps) <= 80 ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-bold ${parseFloat(result.totalAmps) <= 80 ? 'text-green-900' : 'text-amber-900'}`}>
                    Recommended Supply: {result.recommendedSupply}
                  </p>
                  <p className={`text-sm ${parseFloat(result.totalAmps) <= 80 ? 'text-green-700' : 'text-amber-700'}`}>
                    {result.supplyNote}
                  </p>
                  {result.headroom > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      Headroom at {result.recommendedSupply}: ~{result.headroom}%
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-indigo-50 border-b">
                    <th className="px-3 py-2 text-left font-semibold text-gray-900">Category</th>
                    <th className="px-3 py-2 text-center font-semibold text-gray-900">Circuits</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-900">Connected</th>
                    <th className="px-3 py-2 text-center font-semibold text-gray-900">Diversity</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-900">Demand</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {result.breakdown.map((row: any, i: number) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-3 py-2 text-gray-800">{row.category}</td>
                      <td className="px-3 py-2 text-center text-gray-600">{row.circuits}</td>
                      <td className="px-3 py-2 text-right text-gray-600">{(row.connected / 1000).toFixed(1)} kW</td>
                      <td className="px-3 py-2 text-center text-gray-500 text-xs">{row.diversity}</td>
                      <td className="px-3 py-2 text-right font-semibold text-indigo-600">{(row.diversified / 1000).toFixed(1)} kW</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-indigo-100 font-bold">
                    <td className="px-3 py-2 text-indigo-900">Total</td>
                    <td className="px-3 py-2 text-center text-indigo-700">{result.circuitCount}</td>
                    <td className="px-3 py-2 text-right text-indigo-700">{result.totalConnectedLoadKw} kW</td>
                    <td className="px-3 py-2 text-center text-indigo-600">—</td>
                    <td className="px-3 py-2 text-right text-indigo-700">{result.totalDiversifiedLoadKw} kW</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* BS 7671 Note */}
          <div className="mt-4 bg-white rounded-lg p-3 text-xs text-gray-600">
            <p className="font-semibold mb-1">BS 7671 Diversity (Appendix 1, Table 1A):</p>
            <p>Diversity factors applied per BS 7671 guidelines. Actual demand varies with usage patterns. For large or unusual installations, detailed assessment recommended.</p>
          </div>

          {/* Summary */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Property:</span> <strong className="capitalize">{result.propertyType}</strong>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Circuits:</span> <strong>{result.circuitCount}</strong>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Connected:</span> <strong>{result.totalConnectedLoadKw} kW</strong>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <span className="text-gray-600">Max Demand:</span> <strong>{result.totalAmps} A</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
