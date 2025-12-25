// InsulationCalculatorCore.tsx
// Standalone core calculator component for use-case pages
// Import this in use-case pages, keep main InsulationCalculator.tsx unchanged

import { useState } from 'react'
import { CheckCircle2, Layers, AlertCircle, Printer } from 'lucide-react'

interface InsulationResults {
  calculatedUValue: string;
  regulationTarget: string;
  isCompliant: boolean;
  difference: string;
  recommendedThickness: number;
  thermalResistance: string;
  materialCost: number;
  elementType: string;
  constructionType: string;
  insulationType: string;
  thickness: number;
  area: number;
  constructionMaterial: string;
  airGapType: string;
}

export interface InsulationCalculatorCoreProps {
  defaultElementType?: 'wall' | 'roof' | 'floor'
  defaultConstructionType?: string
  defaultInsulationType?: string
  defaultConstructionMaterial?: string
  defaultThickness?: string
  defaultArea?: string
}

export function InsulationCalculatorCore({
  defaultElementType = 'wall',
  defaultConstructionType = '',
  defaultInsulationType = '',
  defaultConstructionMaterial = 'brick-215',
  defaultThickness = '',
  defaultArea = ''
}: InsulationCalculatorCoreProps) {
  const [elementType, setElementType] = useState<'wall' | 'roof' | 'floor'>(defaultElementType)
  const [constructionType, setConstructionType] = useState(defaultConstructionType)
  const [insulationType, setInsulationType] = useState(defaultInsulationType)
  const [constructionMaterial, setConstructionMaterial] = useState(defaultConstructionMaterial)
  const [airGapType, setAirGapType] = useState('unventilated')
  const [thickness, setThickness] = useState(defaultThickness)
  const [area, setArea] = useState(defaultArea)
  const [results, setResults] = useState<InsulationResults | null>(null)

  // Lambda (thermal conductivity) values in W/mK
  const materialLambdaValues: Record<string, number> = {
    'phenolic': 0.020,
    'pir': 0.023,
    'eps': 0.038,
    'wood-fibre': 0.038,
    'cellulose': 0.040,
    'hemp': 0.040,
    'mineral-wool': 0.044
  }

  // Surface resistances for different element types
  const surfaceResistances: Record<string, { rsi: number; rso: number }> = {
    'wall': { rsi: 0.13, rso: 0.04 },
    'roof': { rsi: 0.10, rso: 0.04 },
    'floor': { rsi: 0.17, rso: 0.04 }
  }

  // R-values for construction materials (m²K/W)
  const constructionRValues: Record<string, number> = {
    'brick-100': 0.13,
    'brick-215': 0.28,
    'block-100-aerated': 0.91,
    'block-100-dense': 0.33,
    'plasterboard-12': 0.05,
    'plasterboard-25': 0.10,
    'timber-50': 0.15
  }

  // Air gap R-values (m²K/W)
  const airGapRValues: Record<string, number> = {
    'unventilated': 0.18,
    'ventilated': 0.00
  }

  // Building Regulations targets (W/m²K)
  const buildingRegsTargets: Record<string, number> = {
    'wall-new': 0.18,
    'wall-extension': 0.28,
    'roof-new': 0.15,
    'roof-extension': 0.16,
    'floor-new': 0.18,
    'floor-extension': 0.22
  }

  const calculate = () => {
    if (!constructionType || !insulationType || !thickness) return

    const thicknessM = parseFloat(thickness) / 1000
    const lambda = materialLambdaValues[insulationType]
    const insulationR = thicknessM / lambda

    const surfaceRes = surfaceResistances[elementType]
    const Rsi = surfaceRes.rsi
    const Rso = surfaceRes.rso

    let constructionR = 0.18
    if (elementType === 'wall') {
      constructionR = constructionRValues[constructionMaterial] || 0.28
    } else if (elementType === 'roof') {
      constructionR = constructionRValues['plasterboard-12']
    } else if (elementType === 'floor') {
      constructionR = constructionRValues['plasterboard-12']
    }

    const airGapR = airGapRValues[airGapType] || 0.18
    const totalR = Rsi + constructionR + insulationR + airGapR + Rso
    const calculatedUValue = 1 / totalR

    const isNewBuild = constructionType === 'new'
    const targetKey = `${elementType}-${isNewBuild ? 'new' : 'extension'}`
    const regulationTarget = buildingRegsTargets[targetKey]

    const isCompliant = calculatedUValue <= regulationTarget
    const difference = ((calculatedUValue - regulationTarget) / regulationTarget * 100).toFixed(1)

    const requiredTotalR = 1 / regulationTarget
    const requiredInsulationR = requiredTotalR - Rsi - Rso - constructionR - airGapR
    const recommendedThickness = Math.ceil((requiredInsulationR * lambda * 1000) / 10) * 10

    const areaM2 = parseFloat(area) || 0
    const costPerM2: Record<string, number> = {
      'phenolic': 25,
      'pir': 18,
      'eps': 12,
      'wood-fibre': 25,
      'hemp': 30,
      'cellulose': 15,
      'mineral-wool': 8
    }
    const materialCost = Math.ceil(areaM2 * costPerM2[insulationType])

    setResults({
      calculatedUValue: calculatedUValue.toFixed(3),
      regulationTarget: regulationTarget.toFixed(2),
      isCompliant,
      difference,
      recommendedThickness: Math.max(recommendedThickness, 50),
      thermalResistance: totalR.toFixed(3),
      materialCost,
      elementType,
      constructionType,
      insulationType,
      thickness: parseFloat(thickness),
      area: areaM2,
      constructionMaterial,
      airGapType
    })
  }

  const resetCalculator = () => {
    setElementType(defaultElementType)
    setConstructionType(defaultConstructionType)
    setInsulationType(defaultInsulationType)
    setConstructionMaterial(defaultConstructionMaterial)
    setAirGapType('unventilated')
    setThickness(defaultThickness)
    setArea(defaultArea)
    setResults(null)
  }

  const getInsulationName = (type: string) => {
    const names: Record<string, string> = {
      'mineral-wool': 'Mineral Wool',
      'eps': 'EPS',
      'pir': 'PIR',
      'phenolic': 'Phenolic',
      'wood-fibre': 'Wood Fibre',
      'hemp': 'Hemp',
      'cellulose': 'Cellulose'
    }
    return names[type] || type
  }

  const printResults = () => {
    if (!results) return
    const printContent = `
      <html>
        <head>
          <title>U-Value Calculation - TradeCalcs</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
            h1 { color: #059669; border-bottom: 2px solid #059669; padding-bottom: 10px; }
            .result-box { background: ${results.isCompliant ? '#ecfdf5' : '#fef2f2'}; border: 2px solid ${results.isCompliant ? '#10b981' : '#ef4444'}; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
            .item { background: #f3f4f6; padding: 12px; border-radius: 6px; }
            .label { font-size: 12px; color: #6b7280; }
            .value { font-size: 18px; font-weight: bold; }
            .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
          </style>
        </head>
        <body>
          <h1>U-Value Calculation Results</h1>
          <div class="result-box">
            <h2>${results.isCompliant ? '✓ Part L Compliant' : '✗ Below Standard'}</h2>
            <p style="font-size:32px;font-weight:bold">${results.calculatedUValue} W/m²K</p>
            <p>Target: ${results.regulationTarget} W/m²K</p>
          </div>
          <div class="grid">
            <div class="item">
              <div class="label">Element</div>
              <div class="value">${results.elementType.charAt(0).toUpperCase() + results.elementType.slice(1)}</div>
            </div>
            <div class="item">
              <div class="label">Insulation</div>
              <div class="value">${results.thickness}mm ${getInsulationName(results.insulationType)}</div>
            </div>
            <div class="item">
              <div class="label">Thermal Resistance</div>
              <div class="value">${results.thermalResistance} m²K/W</div>
            </div>
            ${results.area > 0 ? `
            <div class="item">
              <div class="label">Est. Cost</div>
              <div class="value">£${results.materialCost}</div>
            </div>
            ` : ''}
            ${!results.isCompliant ? `
            <div class="item" style="background:#fef3c7">
              <div class="label">Recommended Thickness</div>
              <div class="value">${results.recommendedThickness}mm</div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p>Generated by TradeCalcs.co.uk - ${new Date().toLocaleDateString('en-GB')}</p>
            <p>For planning purposes only. Professional SAP calculations required for Building Control.</p>
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
      <div className="bg-green-600 text-white rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-5 h-5" />
          <h2 className="text-lg font-bold">U-Value Calculator</h2>
        </div>
        <p className="text-sm opacity-90">Check Part L 2021 compliance for your insulation project</p>
      </div>

      {/* Building Element */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">1. Building Element</label>
        <div className="grid grid-cols-3 gap-3">
          {(['wall', 'roof', 'floor'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setElementType(type)}
              className={`py-2 px-4 rounded-lg font-semibold transition ${
                elementType === type
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Construction Type */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">2. Construction Type</label>
        <select
          value={constructionType}
          onChange={e => setConstructionType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">Select construction type</option>
          <option value="new">New Build (stricter targets)</option>
          <option value="extension">Extension/Renovation</option>
        </select>
      </div>

      {/* Wall Construction Material */}
      {elementType === 'wall' && (
        <div className="mb-6">
          <label className="block font-bold text-gray-800 mb-2">3a. Wall Construction</label>
          <select
            value={constructionMaterial}
            onChange={e => setConstructionMaterial(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <option value="brick-100">100mm Brick</option>
            <option value="brick-215">215mm Brick</option>
            <option value="block-100-aerated">100mm Aerated Block</option>
            <option value="block-100-dense">100mm Dense Block</option>
          </select>
        </div>
      )}

      {/* Insulation Material */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">
          {elementType === 'wall' ? '3b' : '3'}. Insulation Material
        </label>
        <select
          value={insulationType}
          onChange={e => setInsulationType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="">Select insulation</option>
          <option value="phenolic">Phenolic - λ 0.020 (best)</option>
          <option value="pir">PIR - λ 0.023 (premium)</option>
          <option value="eps">EPS - λ 0.038 (good value)</option>
          <option value="mineral-wool">Mineral Wool - λ 0.044</option>
          <option value="cellulose">Cellulose - λ 0.040</option>
          <option value="hemp">Hemp - λ 0.040</option>
          <option value="wood-fibre">Wood Fibre - λ 0.038</option>
        </select>
      </div>

      {/* Air Gap */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">
          {elementType === 'wall' ? '3c' : '4'}. Air Gap
        </label>
        <select
          value={airGapType}
          onChange={e => setAirGapType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
        >
          <option value="unventilated">Unventilated - R 0.18</option>
          <option value="ventilated">Ventilated - R 0.00</option>
        </select>
      </div>

      {/* Thickness and Area */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-bold text-gray-800 mb-2">Thickness (mm)</label>
          <input
            type="number"
            value={thickness}
            onChange={e => setThickness(e.target.value)}
            placeholder="e.g. 100"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>
        <div>
          <label className="block font-bold text-gray-800 mb-2">Area (m²)</label>
          <input
            type="number"
            value={area}
            onChange={e => setArea(e.target.value)}
            placeholder="e.g. 50"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
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
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
        >
          Calculate U-Value
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className={`mt-6 rounded-lg p-6 ${results.isCompliant ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {results.isCompliant ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
              <h3 className={`text-xl font-bold ${results.isCompliant ? 'text-green-900' : 'text-red-900'}`}>
                {results.isCompliant ? 'Part L Compliant' : 'Below Standard'}
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
            <p className="text-xs text-gray-600 mb-1">Calculated U-Value</p>
            <p className="text-3xl font-bold text-gray-900">{results.calculatedUValue} W/m²K</p>
            <p className="text-xs text-gray-600 mt-1">Target: {results.regulationTarget} W/m²K</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="p-3 bg-white rounded border-l-2 border-green-600">
              <p className="text-xs text-gray-600">Thermal Resistance</p>
              <p className="text-lg font-bold">{results.thermalResistance} m²K/W</p>
            </div>
            <div className="p-3 bg-white rounded border-l-2 border-blue-600">
              <p className="text-xs text-gray-600">Insulation</p>
              <p className="text-lg font-bold">{results.thickness}mm {getInsulationName(results.insulationType)}</p>
            </div>
          </div>

          {results.area > 0 && (
            <div className="mt-3 p-3 bg-white rounded border-l-2 border-purple-600">
              <p className="text-xs text-gray-600">Estimated Material Cost</p>
              <p className="text-lg font-bold">£{results.materialCost}</p>
            </div>
          )}

          {!results.isCompliant && (
            <div className="mt-3 p-3 bg-orange-100 rounded border-l-2 border-orange-600">
              <p className="text-sm font-semibold text-orange-900">Recommended Thickness</p>
              <p className="text-lg font-bold text-orange-900">{results.recommendedThickness}mm</p>
              <p className="text-xs text-orange-800">Increase to meet Part L 2021</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InsulationCalculatorCore
