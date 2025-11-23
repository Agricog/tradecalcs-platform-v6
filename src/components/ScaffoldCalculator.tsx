import { useState } from 'react'
import { CheckCircle2, HelpCircle, Layers, AlertTriangle } from 'lucide-react'

export default function ScaffoldCalculator() {
  const [scaffoldType, setScaffoldType] = useState<'independent' | 'putlog'>('independent')
  const [height, setHeight] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [bays, setBays] = useState('')
  const [lifts, setLifts] = useState('')
  const [boardType, setBoardType] = useState('standard')
  const [results, setResults] = useState<any>(null)

  const calculate = () => {
    if (!height || !length || !width) return

    const heightM = parseFloat(height)
    const lengthM = parseFloat(length)
    const widthM = parseFloat(width)
    const bayCount = bays ? parseInt(bays) : Math.ceil(lengthM / 2.5)
    const liftCount = lifts ? parseInt(lifts) : Math.ceil(heightM / 2)

    // Standards spacing
    const standardSpacing = 2.5 // Standard bay width
    
    // Calculate tubes
    const standardsPerBay = scaffoldType === 'independent' ? 4 : 2
    const totalStandards = bayCount * standardsPerBay
    const ledgersPerLift = bayCount * 2 // Front and back
    const totalLedgers = ledgersPerLift * liftCount
    const transoms = bayCount * liftCount * (scaffoldType === 'independent' ? 2 : 1)
    const braces = Math.ceil(bayCount / 3) * liftCount * 2 // Diagonal braces every 3 bays
    
    // Tube lengths (6.3m = 21ft standard UK tube)
    const tubeLength = 6.3
    const standardTubes = Math.ceil(totalStandards * heightM / tubeLength)
    const ledgerTubes = Math.ceil(totalLedgers * standardSpacing / tubeLength)
    const transomTubes = Math.ceil(transoms * widthM / tubeLength)
    const braceTubes = Math.ceil(braces * 3 / tubeLength) // Approx 3m per diagonal
    
    const totalTubes = standardTubes + ledgerTubes + transomTubes + braceTubes

    // Calculate fittings
    const rightAngleFittings = (totalStandards * liftCount * 2) + (transoms * 2) // Standards to ledgers + transoms
    const swivelFittings = braces * 2 // Each brace needs 2 swivels
    const basePlates = totalStandards
    const boardClips = transoms * 4 // 4 clips per transom typically
    
    const totalFittings = rightAngleFittings + swivelFittings + basePlates + boardClips

    // Calculate boards
    const boardsPerLift = bayCount * 4 // 4 boards per standard bay (width coverage)
    const totalBoards = boardsPerLift * liftCount

    // Toe boards
    const toeBoards = (lengthM * 2 + widthM * 2) * liftCount / 3.9 // 3.9m toe boards

    // Ties - Building Regs requirement
    const tieSpacing = 4 // Horizontal spacing
    const tieHeight = 4 // Vertical spacing
    const tiesHorizontal = Math.ceil(lengthM / tieSpacing)
    const tiesVertical = Math.ceil(heightM / tieHeight)
    const totalTies = tiesHorizontal * tiesVertical

    // Safety checks
    const warnings = []
    if (heightM > 50) {
      warnings.push('⚠️ Scaffold exceeds 50m - specialist engineering required')
    }
    if (totalTies < tiesVertical * 2) {
      warnings.push('⚠️ Insufficient tie density - Building Regs require ties every 4m horizontal and vertical')
    }
    if (widthM < 0.6) {
      warnings.push('⚠️ Working platform width below 600mm minimum')
    }
    if (heightM / widthM > 3.5) {
      warnings.push('⚠️ Height to base ratio exceeds 3.5:1 - requires additional stability measures')
    }

    // Weight capacity (simplified - 2.4 kN/m² = approx 244kg/m² for Class 3)
    const workingArea = lengthM * widthM
    const maxLoad = Math.floor(workingArea * 244) // Class 3 light duty

    // Approximate costs (UK 2024 averages for hire)
    const tubeCost = totalTubes * 1.5 // £1.50 per tube per week typical
    const fittingCost = totalFittings * 0.8 // £0.80 per fitting per week
    const boardCost = totalBoards * 2.5 // £2.50 per board per week
    const totalWeeklyCost = Math.ceil(tubeCost + fittingCost + boardCost)

    setResults({
      scaffoldType,
      height: heightM,
      length: lengthM,
      width: widthM,
      bayCount,
      liftCount,
      totalTubes,
      standardTubes,
      ledgerTubes,
      transomTubes,
      braceTubes,
      rightAngleFittings,
      swivelFittings,
      basePlates,
      boardClips,
      totalFittings,
      totalBoards,
      toeBoards: Math.ceil(toeBoards),
      totalTies,
      maxLoad,
      totalWeeklyCost,
      warnings
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 py-4 px-6">
        <div className="max-w-5xl mx-auto">
          <a href="/" className="text-white font-semibold flex items-center gap-2 hover:opacity-90 transition w-fit">
            ← Back to All Calculators
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Scaffold Calculator for UK Scaffolders
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Calculate exact tube, fitting, and board quantities for scaffold erection instantly
          </p>
          <p className="text-gray-600 mb-6">
            Industry-trusted scaffold estimator for professional scaffolders across the UK. Includes tie requirements, safety checks, and Building Regs compliance.
          </p>
        </div>

        <div className="bg-amber-50 rounded-lg p-4 mb-8 border-l-4 border-amber-600">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">Safety Notice</h3>
              <p className="text-sm text-amber-800">
                This calculator provides material estimates only. All scaffold designs must be checked by a competent person. Complex or high scaffolds require professional engineering design.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Materials</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Scaffold Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setScaffoldType('independent')}
                      className={`py-2 px-4 rounded-lg font-semibold transition ${
                        scaffoldType === 'independent'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Independent
                    </button>
                    <button
                      onClick={() => setScaffoldType('putlog')}
                      className={`py-2 px-4 rounded-lg font-semibold transition ${
                        scaffoldType === 'putlog'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Putlog
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Independent = freestanding • Putlog = supported by structure</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Height (metres)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g. 12"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Length (metres)</label>
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="e.g. 20"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Width (metres)</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="e.g. 1.2"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Bays (Optional)</label>
                    <input
                      type="number"
                      value={bays}
                      onChange={(e) => setBays(e.target.value)}
                      placeholder="Auto-calculated"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave blank to auto-calculate (2.5m bays)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Lifts (Optional)</label>
                    <input
                      type="number"
                      value={lifts}
                      onChange={(e) => setLifts(e.target.value)}
                      placeholder="Auto-calculated"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave blank to auto-calculate (2m lifts)</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Board Type</label>
                  <select
                    value={boardType}
                    onChange={(e) => setBoardType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none font-semibold"
                  >
                    <option value="standard">Standard (225mm × 38mm × 3.9m)</option>
                    <option value="lightweight">Lightweight Aluminium</option>
                    <option value="hop-up">Hop-Up Boards</option>
                  </select>
                </div>

                <button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-lg font-bold transition"
                >
                  Calculate Materials
                </button>
              </div>
            </div>

            {results && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Materials Required</h2>
                </div>

                {results.warnings.length > 0 && (
                  <div className="bg-amber-50 rounded-lg p-4 mb-6 border-l-4 border-amber-600">
                    <h4 className="font-semibold text-amber-900 mb-2">Safety Warnings</h4>
                    {results.warnings.map((warning: string, index: number) => (
                      <p key={index} className="text-sm text-amber-800 mb-1">{warning}</p>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                      <p className="text-sm text-gray-600">Scaffold Dimensions</p>
                      <p className="text-2xl font-bold text-gray-900">{results.height}m × {results.length}m × {results.width}m</p>
                      <p className="text-xs text-gray-500 mt-1">{results.bayCount} bays × {results.liftCount} lifts</p>
                    </div>

                    <div className="bg-cyan-50 rounded-lg p-4 border-l-4 border-cyan-600">
                      <p className="text-sm text-gray-600">Total Tubes (6.3m)</p>
                      <p className="text-2xl font-bold text-gray-900">{results.totalTubes}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Standards: {results.standardTubes} • Ledgers: {results.ledgerTubes}<br/>
                        Transoms: {results.transomTubes} • Braces: {results.braceTubes}
                      </p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                      <p className="text-sm text-gray-600">Total Fittings</p>
                      <p className="text-2xl font-bold text-gray-900">{results.totalFittings}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Right angle: {results.rightAngleFittings} • Swivel: {results.swivelFittings}<br/>
                        Base plates: {results.basePlates} • Board clips: {results.boardClips}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-cyan-50 rounded-lg p-4 border-l-4 border-cyan-600">
                      <p className="text-sm text-gray-600">Scaffold Boards</p>
                      <p className="text-2xl font-bold text-gray-900">{results.totalBoards}</p>
                      <p className="text-xs text-gray-500 mt-1">Standard 3.9m boards</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                      <p className="text-sm text-gray-600">Toe Boards</p>
                      <p className="text-2xl font-bold text-gray-900">{results.toeBoards}</p>
                      <p className="text-xs text-gray-500 mt-1">All working levels</p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                      <p className="text-sm text-gray-600">Wall Ties Required</p>
                      <p className="text-2xl font-bold text-gray-900">{results.totalTies}</p>
                      <p className="text-xs text-gray-500 mt-1">Every 4m horizontal and vertical</p>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
                      <p className="text-sm text-gray-600">Max Load Capacity</p>
                      <p className="text-2xl font-bold text-gray-900">{results.maxLoad} kg</p>
                      <p className="text-xs text-gray-500 mt-1">Class 3 light duty (244kg/m²)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    💷 Estimated Weekly Hire Cost
                  </h3>
                  <p className="text-3xl font-bold text-green-700 mb-2">£{results.totalWeeklyCost}</p>
                  <p className="text-sm text-gray-600">
                    Based on typical UK hire rates. Actual costs vary by supplier and location.
                  </p>
                </div>

                <p className="text-xs text-gray-500 mt-6 text-center">
                  ✓ {results.scaffoldType === 'independent' ? 'Independent' : 'Putlog'} scaffold • {results.height}m height • Building Regs compliant
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-600">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Quick Tips
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>Independent:</strong> Freestanding with double standards</li>
                <li>• <strong>Putlog:</strong> Supported by building structure</li>
                <li>• Standard bay width: 2.5m (can vary)</li>
                <li>• Standard lift height: 2m (working platform)</li>
                <li>• Always add 10-15% extra for cuts and waste</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-600" />
                Safety Requirements
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Ties:</strong> Every 4m horizontal and vertical</li>
                <li><strong>Toe boards:</strong> 150mm minimum height</li>
                <li><strong>Guard rails:</strong> Top rail 950mm, mid rail 470mm</li>
                <li><strong>Base plates:</strong> On all standards</li>
                <li><strong>Inspection:</strong> Every 7 days and after weather</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Scaffold Guide for Professionals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Material Standards & Specifications</h3>
              <p className="text-gray-700 text-sm mb-4">
                All scaffold materials must comply with BS EN 12811 and BS 1139. Tubes are typically 48.3mm outer diameter, 4mm wall thickness, and 6.3m (21ft) length for UK standard scaffolding.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ <strong>Tubes:</strong> BS EN 39 galvanised steel, 6.3m standard</li>
                <li>✓ <strong>Fittings:</strong> BS EN 74 drop forged or pressed steel</li>
                <li>✓ <strong>Boards:</strong> BS 2482 timber or BS EN 12811 aluminium</li>
                <li>✓ <strong>Load capacity:</strong> Class 1-6 (75-600kg/m²)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Building Regulations & Compliance</h3>
              <p className="text-gray-700 text-sm mb-4">
                Work at Height Regulations 2005 require scaffold design by competent person. TG20:13 provides guidance for standard configurations up to certain heights and loads.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Inspection by competent person before first use</li>
                <li>✓ Re-inspection every 7 days and after modifications</li>
                <li>✓ Inspection after adverse weather conditions</li>
                <li>✓ Written inspection reports must be kept</li>
                <li>✓ Scaffolding must be erected by trained operatives</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Erection Best Practices</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Check ground is level, firm, and adequately supported</li>
                <li>• Use base plates and sole boards on all standards</li>
                <li>• Install ties as work progresses (not retrospectively)</li>
                <li>• Maintain vertical and horizontal alignment</li>
                <li>• Install guardrails and toe boards before use</li>
                <li>• Ensure adequate bracing and ties throughout</li>
                <li>• Tag scaffold with inspection status and load class</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Common Configurations</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>Independent:</strong> Two rows of standards, freestanding</li>
                <li>• <strong>Putlog:</strong> Single row, supported by building</li>
                <li>• <strong>Birdcage:</strong> Multiple standards for large flat areas</li>
                <li>• <strong>Mobile tower:</strong> Castor wheels, max 12m height</li>
                <li>• <strong>Cantilever:</strong> Projecting beyond supports</li>
                <li>• <strong>Suspended:</strong> Hung from structure above</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded mt-8">
            <h3 className="font-bold text-gray-900 mb-2">Professional Engineering Required</h3>
            <p className="text-sm text-gray-700">
              This calculator provides estimates for standard configurations. Complex scaffolds, loads exceeding Class 3 (244kg/m²), heights over 50m, cantilevers, bridges, or non-standard designs require professional scaffold design by chartered engineer. Always refer to TG20:13 and manufacturer specifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
