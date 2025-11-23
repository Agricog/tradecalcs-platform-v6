import { useState } from 'react'
import { Info, CheckCircle2, HelpCircle, Layers, AlertTriangle } from 'lucide-react'
import QuoteGenerator from './QuoteGenerator'

export default function InsulationCalculator() {
  const [elementType, setElementType] = useState<'wall' | 'roof' | 'floor'>('wall')
  const [constructionType, setConstructionType] = useState('')
  const [insulationType, setInsulationType] = useState('')
  const [thickness, setThickness] = useState('')
  const [area, setArea] = useState('')
  const [results, setResults] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  // U-value calculation data (simplified - real calculations are more complex)
  const materialRValues: Record<string, number> = {
    'mineral-wool': 0.044, // W/mK (thermal conductivity)
    'eps': 0.038,
    'pir': 0.023,
    'phenolic': 0.020,
    'wood-fibre': 0.038,
    'hemp': 0.040,
    'cellulose': 0.040
  }

  const buildingRegsTargets: Record<string, number> = {
    'wall-new': 0.18, // Part L 2021 targets
    'wall-extension': 0.28,
    'roof-new': 0.15,
    'roof-extension': 0.16,
    'floor-new': 0.18,
    'floor-extension': 0.22
  }

  const calculate = () => {
    if (!constructionType || !insulationType || !thickness) return

    const thicknessM = parseFloat(thickness) / 1000 // Convert mm to meters
    const lambda = materialRValues[insulationType]
    const thermalResistance = thicknessM / lambda

    // Simplified U-value calculation (real calculation includes air gaps, plasterboard, etc.)
    // U = 1 / (Rsi + R1 + R2 + ... + Rse)
    // Rsi = internal surface resistance (0.13 for walls/roofs, 0.17 for floors)
    // Rse = external surface resistance (0.04 for walls/roofs, 0.04 for floors)
    
    const Rsi = elementType === 'floor' ? 0.17 : 0.13
    const Rse = 0.04
    const Rconstruction = 0.18 // Simplified - brick/block/plasterboard combined
    
    const totalR = Rsi + Rconstruction + thermalResistance + Rse
    const calculatedUValue = 1 / totalR

    // Determine target U-value
    const isNewBuild = constructionType.includes('new-build')
    const targetKey = `${elementType}-${isNewBuild ? 'new' : 'extension'}`
    const regulationTarget = buildingRegsTargets[targetKey]
    
    const isCompliant = calculatedUValue <= regulationTarget
    const difference = ((calculatedUValue - regulationTarget) / regulationTarget * 100).toFixed(1)

    // Calculate recommended thickness for compliance
    const requiredR = (1 / regulationTarget) - Rsi - Rse - Rconstruction
    const recommendedThickness = Math.ceil((requiredR * lambda * 1000) / 10) * 10 // Round up to nearest 10mm

    // Cost estimation (per m²)
    const areaM2 = parseFloat(area) || 0
    const costPerM2: Record<string, number> = {
      'mineral-wool': 8,
      'eps': 12,
      'pir': 18,
      'phenolic': 22,
      'wood-fibre': 25,
      'hemp': 30,
      'cellulose': 15
    }
    const materialCost = Math.ceil(areaM2 * costPerM2[insulationType])

    setResults({
      calculatedUValue: calculatedUValue.toFixed(3),
      regulationTarget: regulationTarget.toFixed(2),
      isCompliant,
      difference,
      recommendedThickness,
      thermalResistance: thermalResistance.toFixed(3),
      materialCost,
      elementType,
      constructionType,
      insulationType,
      thickness: parseFloat(thickness),
      area: areaM2
    })
  }

  const getInsulationName = (type: string) => {
    const names: Record<string, string> = {
      'mineral-wool': 'Mineral Wool (Glass/Rock)',
      'eps': 'EPS (Expanded Polystyrene)',
      'pir': 'PIR (Polyisocyanurate)',
      'phenolic': 'Phenolic Foam',
      'wood-fibre': 'Wood Fibre',
      'hemp': 'Hemp Insulation',
      'cellulose': 'Cellulose'
    }
    return names[type] || type
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 py-4 px-6">
        <div className="max-w-5xl mx-auto">
          <a href="/" className="text-white font-semibold flex items-center gap-2 hover:opacity-90 transition w-fit">
            ← Back to All Calculators
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Insulation U-Value Calculator for UK Building Regs
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Calculate U-values and check Part L compliance for walls, roofs, and floors
          </p>
          <p className="text-gray-600 mb-6">
            Industry-trusted U-value calculator for architects, surveyors, and builders. Check Building Regulations 2021 compliance with accurate thermal performance calculations.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 mb-8 border-l-4 border-blue-600">
          <div className="flex gap-3">
            <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Building Regulations 2021 (Part L)</h3>
              <p className="text-sm text-blue-800">
                This calculator uses simplified U-value calculations. For critical projects and Building Control submissions, obtain professional thermal calculations from accredited assessors.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate U-Value</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Building Element</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setElementType('wall')}
                      className={`py-2 px-4 rounded-lg font-semibold transition ${
                        elementType === 'wall'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Wall
                    </button>
                    <button
                      onClick={() => setElementType('roof')}
                      className={`py-2 px-4 rounded-lg font-semibold transition ${
                        elementType === 'roof'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Roof
                    </button>
                    <button
                      onClick={() => setElementType('floor')}
                      className={`py-2 px-4 rounded-lg font-semibold transition ${
                        elementType === 'floor'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Floor
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Construction Type</label>
                  <select
                    value={constructionType}
                    onChange={(e) => setConstructionType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none font-semibold"
                  >
                    <option value="">Select construction type</option>
                    <option value="new-build">New Build (2021 Regulations)</option>
                    <option value="extension">Extension/Renovation</option>
                    <option value="retrofit">Retrofit/Upgrade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Insulation Material</label>
                  <select
                    value={insulationType}
                    onChange={(e) => setInsulationType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none font-semibold"
                  >
                    <option value="">Select insulation type</option>
                    <option value="mineral-wool">Mineral Wool (Glass/Rock) - λ 0.044</option>
                    <option value="eps">EPS (Expanded Polystyrene) - λ 0.038</option>
                    <option value="pir">PIR (Polyisocyanurate) - λ 0.023</option>
                    <option value="phenolic">Phenolic Foam - λ 0.020</option>
                    <option value="wood-fibre">Wood Fibre - λ 0.038</option>
                    <option value="hemp">Hemp Insulation - λ 0.040</option>
                    <option value="cellulose">Cellulose - λ 0.040</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">λ (lambda) = thermal conductivity in W/mK</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Insulation Thickness (mm)</label>
                  <input
                    type="number"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    placeholder="e.g. 100"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical range: 50mm - 300mm</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Area (m²) - Optional</label>
                  <input
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. 50"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">For material cost estimation</p>
                </div>

                <button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 rounded-lg font-bold transition"
                >
                  Calculate U-Value
                </button>
              </div>
            </div>

            {results && (
              <>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                  <div className="flex items-center gap-2 mb-6">
                    {results.isCompliant ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    )}
                    <h2 className="text-xl font-bold text-gray-900">
                      {results.isCompliant ? 'Part L Compliant' : 'Below Standard'}
                    </h2>
                  </div>

                  <div className={`rounded-lg p-4 mb-6 border-l-4 ${
                    results.isCompliant ? 'bg-green-50 border-green-600' : 'bg-red-50 border-red-600'
                  }`}>
                    <p className="text-sm text-gray-600">Calculated U-Value</p>
                    <p className="text-3xl font-bold text-gray-900">{results.calculatedUValue} W/m²K</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Target: {results.regulationTarget} W/m²K (Part L 2021)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="bg-teal-50 rounded-lg p-4 border-l-4 border-teal-600">
                        <p className="text-sm text-gray-600">Thermal Resistance (R-value)</p>
                        <p className="text-2xl font-bold text-gray-900">{results.thermalResistance} m²K/W</p>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                        <p className="text-sm text-gray-600">Insulation Type</p>
                        <p className="text-lg font-bold text-gray-900">{getInsulationName(results.insulationType)}</p>
                        <p className="text-xs text-gray-500 mt-1">{results.thickness}mm thick</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {!results.isCompliant && (
                        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                          <p className="text-sm text-gray-600">Recommended Thickness</p>
                          <p className="text-2xl font-bold text-gray-900">{results.recommendedThickness}mm</p>
                          <p className="text-xs text-gray-500 mt-1">For Part L compliance</p>
                        </div>
                      )}

                      {results.area > 0 && (
                        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                          <p className="text-sm text-gray-600">Estimated Material Cost</p>
                          <p className="text-2xl font-bold text-gray-900">£{results.materialCost}</p>
                          <p className="text-xs text-gray-500 mt-1">{results.area}m² at current thickness</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {!results.isCompliant && (
                    <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600 mb-6">
                      <h4 className="font-semibold text-red-900 mb-2">⚠️ Non-Compliant</h4>
                      <p className="text-sm text-red-800 mb-2">
                        Your U-value is {Math.abs(parseFloat(results.difference))}% {parseFloat(results.difference) > 0 ? 'higher' : 'lower'} than Building Regulations Part L requirements.
                      </p>
                      <p className="text-sm text-red-800">
                        Increase insulation thickness to {results.recommendedThickness}mm to meet compliance.
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mt-6 text-center">
                    ✓ Simplified calculation • {results.elementType} • {results.constructionType} • Part L 2021
                  </p>
                </div>

                {/* QUOTE GENERATOR CTA */}
                {results.area > 0 && (
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Turn This Into a Quote</h3>
                        <p className="text-sm text-gray-600">Generate professional quote in 2 minutes</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowQuoteGenerator(true)}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                      Generate Free Quote
                    </button>
                    <p className="text-xs text-center text-gray-500 mt-2">
                      Want branded quotes with your logo? <a href="/pro" className="text-purple-600 font-semibold hover:underline">Upgrade to Pro - £99/year</a>
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-600">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Quick Guide
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>U-value:</strong> Lower = better insulation</li>
                <li>• <strong>Target (walls):</strong> 0.18 W/m²K (new), 0.28 (extension)</li>
                <li>• <strong>Target (roofs):</strong> 0.15 W/m²K (new), 0.16 (extension)</li>
                <li>• <strong>Target (floors):</strong> 0.18 W/m²K (new), 0.22 (extension)</li>
                <li>• Thicker insulation = lower U-value = better thermal performance</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-green-600" />
                Material Comparison
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>PIR/Phenolic:</strong> Best performance, thinnest</li>
                <li><strong>EPS/Mineral Wool:</strong> Good value, widely used</li>
                <li><strong>Wood/Hemp:</strong> Eco-friendly, breathable</li>
                <li><strong>Cellulose:</strong> Recycled, cost-effective</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding U-Values & Part L Compliance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">What is a U-Value?</h3>
              <p className="text-gray-700 text-sm mb-4">
                U-value measures how much heat passes through a building element. Measured in W/m²K (watts per square meter per degree Kelvin). Lower U-values mean better insulation and less heat loss.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ U = 1 / Total Thermal Resistance (R-value)</li>
                <li>✓ Part L Building Regulations set maximum U-values</li>
                <li>✓ New builds require lower U-values than extensions</li>
                <li>✓ SAP calculations use U-values for EPC ratings</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Part L 2021 Requirements</h3>
              <p className="text-gray-700 text-sm mb-4">
                Building Regulations Approved Document L sets minimum thermal performance standards for new and existing buildings. Requirements tightened significantly in June 2022.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ New dwellings: 31% CO₂ reduction vs 2013 standards</li>
                <li>✓ Extensions: Must meet minimum U-value thresholds</li>
                <li>✓ Renovations: Betterment principle applies</li>
                <li>✓ Non-compliance can fail Building Control inspection</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Choosing Insulation Materials</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>PIR/Phenolic:</strong> Highest performance per mm, ideal for limited space</li>
                <li>• <strong>Mineral Wool:</strong> Fire-resistant, acoustic benefits, cost-effective</li>
                <li>• <strong>EPS:</strong> Good all-rounder, moisture-resistant</li>
                <li>• <strong>Natural materials:</strong> Breathable, sustainable, premium cost</li>
                <li>• Consider: thermal performance, cost, fire rating, moisture resistance</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Professional Calculations</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• This calculator uses simplified methodology</li>
                <li>• Building Control requires detailed thermal calculations</li>
                <li>• SAP assessors provide accurate U-value reports</li>
                <li>• Complex constructions need professional assessment</li>
                <li>• Thermal bridging must be accounted for</li>
                <li>• Air tightness testing may be required</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded mt-8">
            <h3 className="font-bold text-gray-900 mb-2">Compliance Reminder</h3>
            <p className="text-sm text-gray-700">
              This calculator provides estimates for planning purposes. For Building Control submissions, warranty compliance, and EPC assessments, obtain professional SAP calculations from accredited energy assessors. Non-compliant construction can result in failed inspections, remedial work costs, and warranty issues.
            </p>
          </div>
        </div>

        {/* CONTACT FORM SECTION */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help or Have Questions?</h3>
            <p className="text-gray-700">
              Got a specific calculation requirement or want a custom tool for your trade? Fill out the form below.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <iframe 
              src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false" 
              width="100%" 
              height="650px" 
              frameBorder="0"
              title="Contact Form"
              className="rounded-lg"
            />
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
          </p>
        </div>
      </div>

      {/* QUOTE GENERATOR MODAL */}
      {showQuoteGenerator && results && results.area > 0 && (
        <QuoteGenerator
          calculationResults={{
            materials: [
              { item: getInsulationName(results.insulationType), quantity: results.area.toString(), unit: 'm²' },
              { item: `${results.thickness}mm Insulation Boards`, quantity: results.area.toString(), unit: 'm²' },
              { item: 'Fixings & Adhesive', quantity: '1', unit: 'job' },
              { item: 'Installation Labour', quantity: '1', unit: 'job' }
            ],
            summary: `${results.elementType} insulation - U-value: ${results.calculatedUValue} W/m²K ${results.isCompliant ? '(Part L compliant)' : `(Non-compliant - recommend ${results.recommendedThickness}mm)`}`
          }}
          onClose={() => setShowQuoteGenerator(false)}
        />
      )}
    </div>
  )
}

