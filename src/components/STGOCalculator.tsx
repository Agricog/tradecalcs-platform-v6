import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { TruckIcon, AlertTriangle, CheckCircle, XCircle, Download, Info, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

interface CalculationData {
  isCompliant: boolean;
  category: string;
  totalWeight: number;
  tractorWeight: number;
  trailerWeight: number;
  loadWeight: number;
  vehicleLength: number;
  vehicleWidth: number;
  maxSpeed: string;
  issues: string[];
  requirements: string[];
  requiredNoticeDays: number;
  daysUntilMovement: number;
}

export default function STGOCalculator() {
  const [tractorWeight, setTractorWeight] = useState('')
  const [trailerWeight, setTrailerWeight] = useState('')
  const [loadWeight, setLoadWeight] = useState('')
  const [vehicleLength, setVehicleLength] = useState('')
  const [vehicleWidth, setVehicleWidth] = useState('')
  const [axleCount, setAxleCount] = useState('')
  const [loadType, setLoadType] = useState('')
  const [movementDate, setMovementDate] = useState('')
  const [results, setResults] = useState<CalculationData | null>(null)

  const calculateCompliance = () => {
    if (!tractorWeight || !trailerWeight || !loadWeight || !axleCount || !loadType || !movementDate) return

    const tractor = parseFloat(tractorWeight)
    const trailer = parseFloat(trailerWeight)
    const load = parseFloat(loadWeight)
    const length = parseFloat(vehicleLength) || 0
    const width = parseFloat(vehicleWidth) || 0
    const totalWeight = tractor + trailer + load
    
    const today = new Date()
    const moveDate = new Date(movementDate)
    const daysUntilMovement = Math.ceil((moveDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    const standardLimit = 44000
    let category = 'Standard'
    let requiredNoticeDays = 0
    let maxSpeed = '60 mph (motorway), 50 mph (dual carriageway)'
    let isCompliant = true
    let issues: string[] = []
    let requirements: string[] = []

    if (totalWeight > standardLimit) {
      if (loadType === 'divisible') {
        isCompliant = false
        issues.push('Divisible loads exceeding 44,000kg must be split across multiple vehicles')
        category = 'Non-compliant'
      } else {
        if (totalWeight <= 50000) {
          category = 'Category 1'
          requiredNoticeDays = 2
          maxSpeed = '40 mph (all roads)'
          requirements.push('2 working days\' notice to National Highways via ESDAL')
          requirements.push('STGO Category 1 plate displayed on vehicle front')
        } else if (totalWeight <= 80000) {
          category = 'Category 2'
          requiredNoticeDays = 5
          maxSpeed = '30 mph (all roads)'
          requirements.push('5 working days\' notice to National Highways via ESDAL')
          requirements.push('STGO Category 2 plate displayed on vehicle front')
          requirements.push('Special speed limit: 30 mph maximum')
        } else if (totalWeight <= 150000) {
          category = 'Category 3'
          requiredNoticeDays = 5
          maxSpeed = '12 mph (all roads)'
          requirements.push('5 working days\' notice to National Highways via ESDAL')
          requirements.push('STGO Category 3 plate displayed on vehicle front')
          requirements.push('Special speed limit: 12 mph maximum')
          requirements.push('Extensive route planning and police notifications required')
        } else {
          isCompliant = false
          issues.push('Load exceeds maximum STGO limit of 150,000kg')
          category = 'Exceeds STGO Limits'
        }

        if (requiredNoticeDays > 0 && daysUntilMovement < requiredNoticeDays) {
          isCompliant = false
          issues.push(`Insufficient notice: ${requiredNoticeDays} working days required, only ${daysUntilMovement} days until movement`)
        }
      }
    }

    const weightPerAxle = totalWeight / parseInt(axleCount)
    const maxAxleWeight = 12500
    
    if (weightPerAxle > maxAxleWeight && axleCount !== '7+') {
      isCompliant = false
      issues.push(`Average axle weight (${Math.round(weightPerAxle)}kg) may exceed limits`)
    }

    if (length > 30) {
      requirements.push(`Length exceeds 30m (${length}m) - additional notification required`)
    }
    if (width > 6.1) {
      isCompliant = false
      issues.push(`Width exceeds 6.1m (${width}m) - police escort required`)
    }

    if (category.includes('Category')) {
      requirements.push('Load must be properly secured per DfT guidance')
      requirements.push('Driver must hold valid HGV license')
      
      if (totalWeight > 80000) {
        requirements.push('⚠️ Bridge assessments required - contact National Highways')
      }
    }

    setResults({
      isCompliant,
      category,
      totalWeight,
      tractorWeight: tractor,
      trailerWeight: trailer,
      loadWeight: load,
      vehicleLength: length,
      vehicleWidth: width,
      requiredNoticeDays,
      daysUntilMovement,
      maxSpeed,
      issues,
      requirements
    })
  }

  const downloadPDF = () => {
    if (!results) return

    const { totalWeight, tractorWeight, trailerWeight, loadWeight, category, isCompliant, requirements, issues, vehicleLength, vehicleWidth, maxSpeed } = results

    const pdfContent = `
      <html>
      <head>
        <title>STGO Compliance Report - HaulCheck</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #f97316; padding-bottom: 20px; }
          .header h1 { color: #f97316; margin: 0; font-size: 28px; }
          .header p { color: #666; margin: 5px 0; }
          .status { background: ${isCompliant ? '#d1fae5' : '#fee2e2'}; padding: 20px; border-radius: 8px; border-left: 4px solid ${isCompliant ? '#22c55e' : '#ef4444'}; margin: 20px 0; }
          .status h2 { margin: 0 0 10px 0; color: ${isCompliant ? '#16a34a' : '#dc2626'}; }
          .details { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
          .detail-box { background: #f9fafb; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb; }
          .detail-box strong { display: block; color: #6b7280; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
          .detail-box span { font-size: 20px; font-weight: bold; color: #111827; }
          .section { margin: 30px 0; }
          .section h3 { color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px; }
          ul { list-style: none; padding: 0; }
          li { padding: 8px 0; padding-left: 25px; position: relative; }
          li:before { content: "${isCompliant ? '✓' : '✗'}"; position: absolute; left: 0; color: ${isCompliant ? '#22c55e' : '#ef4444'}; font-weight: bold; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚛 HaulCheck STGO Compliance Report</h1>
          <p>Generated: ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString('en-GB')}</p>
          <p style="font-weight: bold;">For guidance only - verify with DVSA before movement</p>
        </div>

        <div class="status">
          <h2>${isCompliant ? '✅ Potentially Compliant' : '❌ Non-Compliant'}</h2>
          <p style="font-size: 18px; font-weight: bold; margin: 5px 0;">STGO ${category}</p>
        </div>

        <div class="section">
          <h3>Weight Breakdown</h3>
          <div class="details">
            <div class="detail-box">
              <strong>Tractor Weight</strong>
              <span>${tractorWeight.toLocaleString()} kg</span>
            </div>
            <div class="detail-box">
              <strong>Trailer Weight</strong>
              <span>${trailerWeight.toLocaleString()} kg</span>
            </div>
            <div class="detail-box">
              <strong>Load Weight</strong>
              <span>${loadWeight.toLocaleString()} kg</span>
            </div>
            <div class="detail-box">
              <strong>Total GVW</strong>
              <span>${totalWeight.toLocaleString()} kg</span>
            </div>
            ${vehicleLength > 0 ? `<div class="detail-box"><strong>Length</strong><span>${vehicleLength.toFixed(1)} m</span></div>` : ''}
            ${vehicleWidth > 0 ? `<div class="detail-box"><strong>Width</strong><span>${vehicleWidth.toFixed(2)} m</span></div>` : ''}
            <div class="detail-box">
              <strong>Max Speed</strong>
              <span style="font-size: 14px;">${maxSpeed}</span>
            </div>
          </div>
        </div>

        ${issues.length > 0 ? `
        <div class="section">
          <h3>⚠️ Compliance Issues</h3>
          <ul>
            ${issues.map(issue => `<li>${issue}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${requirements.length > 0 ? `
        <div class="section">
          <h3>📋 Requirements</h3>
          <ul>
            ${requirements.map(req => `<li>${req}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        <div class="section">
          <h3>⚠️ Important Notice</h3>
          <p>This report is for guidance purposes only. Always verify compliance with official DVSA guidance before movement. Non-compliance can result in fines up to £759,000 and operator license revocation.</p>
          <p style="margin-top: 15px;"><strong>Submit ESDAL notification:</strong> esdal.nationalhighways.co.uk</p>
        </div>

        <div class="footer">
          <p><strong>Generated by HaulCheck</strong> - Free STGO Compliance Calculator</p>
          <p>tradecalcs.co.uk/calculators/stgo-calculator</p>
        </div>
      </body>
      </html>
    `

    const blob = new Blob([pdfContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `HaulCheck-STGO-Report-${new Date().toISOString().split('T')[0]}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>STGO Calculator UK | HaulCheck - Avoid £750K Fines | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free STGO compliance calculator for UK hauliers. Check Category 1, 2, 3 limits instantly. Avoid £759K fines with weight checks and notice period calculations." 
        />
        <meta name="keywords" content="STGO calculator, haulage calculator, UK STGO compliance, abnormal load calculator, Category 1 2 3 calculator, heavy haulage UK, ESDAL notification" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="STGO Calculator UK | HaulCheck - Avoid £750K Fines" />
        <meta property="og:description" content="Free STGO compliance calculator. Check Category 1, 2, 3 limits and avoid massive fines. For UK hauliers." />
        <meta property="og:url" content="https://tradecalcs.co.uk/stgo-calculator" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="STGO Calculator UK | HaulCheck" />
        <meta name="twitter:description" content="Free STGO compliance calculator. Avoid £759K fines with instant compliance checks." />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/stgo-calculator" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 py-4 px-6">
          <div className="max-w-5xl mx-auto">
            <Link to="/" className="text-white font-semibold flex items-center gap-2 hover:opacity-90 transition w-fit">
              ← Back to All Calculators
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto p-6">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              HaulCheck - STGO Compliance Calculator for UK Hauliers
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Avoid £750K fines with instant STGO compliance checks before movement
            </p>
            <p className="text-gray-600 mb-6">
              Industry-trusted STGO calculator for professional haulage operators across the UK. Check Category 1, 2, 3 compliance, weight limits, and notification requirements.
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-4 mb-8 border-l-4 border-red-600">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">For Guidance Only</h3>
                <p className="text-sm text-red-800">
                  This calculator provides preliminary checks. Always verify with DVSA guidance. Non-compliance can result in fines up to £759,000 and operator license revocation.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Check Compliance</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Tractor Weight (kg)</label>
                      <input
                        type="number"
                        value={tractorWeight}
                        onChange={(e) => setTractorWeight(e.target.value)}
                        placeholder="e.g. 8000"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:outline-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">Unladen tractor unit only</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Trailer Weight (kg)</label>
                      <input
                        type="number"
                        value={trailerWeight}
                        onChange={(e) => setTrailerWeight(e.target.value)}
                        placeholder="e.g. 10000"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:outline-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">Unladen trailer only</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Load Weight (kg)</label>
                    <input
                      type="number"
                      value={loadWeight}
                      onChange={(e) => setLoadWeight(e.target.value)}
                      placeholder="e.g. 32000"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Weight of cargo/equipment being transported</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle Length (m)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={vehicleLength}
                        onChange={(e) => setVehicleLength(e.target.value)}
                        placeholder="e.g. 16.5"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:outline-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">Optional but recommended</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle Width (m)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={vehicleWidth}
                        onChange={(e) => setVehicleWidth(e.target.value)}
                        placeholder="e.g. 2.55"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:outline-none"
                      />
                      <p className="text-xs text-gray-500 mt-1">Optional but recommended</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Axles</label>
                    <select
                      value={axleCount}
                      onChange={(e) => setAxleCount(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:outline-none font-semibold"
                    >
                      <option value="">Select axles</option>
                      <option value="3">3 axles</option>
                      <option value="4">4 axles</option>
                      <option value="5">5 axles</option>
                      <option value="6">6 axles</option>
                      <option value="7+">7+ axles</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Load Type</label>
                    <select
                      value={loadType}
                      onChange={(e) => setLoadType(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:outline-none font-semibold"
                    >
                      <option value="">Select type</option>
                      <option value="indivisible">Indivisible (cannot be split)</option>
                      <option value="divisible">Divisible (can be split)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Divisible loads over standard weights must be split</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Planned Movement Date</label>
                    <input
                      type="date"
                      value={movementDate}
                      onChange={(e) => setMovementDate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">Required for notice period calculation</p>
                  </div>

                  <button
                    onClick={calculateCompliance}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
                  >
                    <TruckIcon className="w-5 h-5" />
                    Check STGO Compliance
                  </button>
                </div>
              </div>

              {results && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-center gap-2 mb-6">
                    {results.isCompliant ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600" />
                    )}
                    <h2 className="text-xl font-bold text-gray-900">
                      {results.isCompliant ? 'Potentially Compliant' : 'Non-Compliant'}
                    </h2>
                  </div>

                  <div className={`rounded-lg p-4 mb-6 border-l-4 ${
                    results.isCompliant ? 'bg-green-50 border-green-600' : 'bg-red-50 border-red-600'
                  }`}>
                    <p className="text-sm text-gray-600">STGO Status</p>
                    <p className="text-2xl font-bold text-gray-900">{results.category}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                        <p className="text-sm text-gray-600">Tractor</p>
                        <p className="text-2xl font-bold text-gray-900">{results.tractorWeight.toLocaleString()} kg</p>
                      </div>

                      <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                        <p className="text-sm text-gray-600">Trailer</p>
                        <p className="text-2xl font-bold text-gray-900">{results.trailerWeight.toLocaleString()} kg</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                        <p className="text-sm text-gray-600">Load</p>
                        <p className="text-2xl font-bold text-gray-900">{results.loadWeight.toLocaleString()} kg</p>
                      </div>

                      <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                        <p className="text-sm text-gray-600">Total GVW</p>
                        <p className="text-2xl font-bold text-gray-900">{results.totalWeight.toLocaleString()} kg</p>
                      </div>
                    </div>
                  </div>

                  {results.issues.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-red-900 mb-3">⚠️ Compliance Issues</h4>
                      <div className="space-y-2">
                        {results.issues.map((issue, index) => (
                          <div key={index} className="flex gap-3 bg-red-50 rounded-lg p-3 border border-red-200">
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{issue}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.requirements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">📋 Requirements</h4>
                      <div className="space-y-2">
                        {results.requirements.map((req, index) => (
                          <div key={index} className="flex gap-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.isCompliant && (
                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                      <p className="text-sm font-semibold mb-2 text-green-900">📄 Download Compliance Report</p>
                      <p className="text-xs text-gray-700 mb-3">Save this calculation for your records and Traffic Commissioner audit trails.</p>
                      <button
                        onClick={downloadPDF}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download Report
                      </button>
                    </div>
                  )}
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
                  <li>• <strong>Category 1:</strong> Up to 50,000kg, 2 days notice</li>
                  <li>• <strong>Category 2:</strong> 50,001-80,000kg, 5 days notice</li>
                  <li>• <strong>Category 3:</strong> 80,001-150,000kg, extensive planning</li>
                  <li>• Always verify at weighbridge before movement</li>
                  <li>• Submit ESDAL notifications with correct lead time</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Info className="w-5 h-5 text-orange-600" />
                  Penalties
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Fixed:</strong> £50-300 per violation</li>
                  <li><strong>Court:</strong> £10,000-40,000 typical</li>
                  <li><strong>Record:</strong> £759,000 (July 2025)</li>
                  <li><strong>TC Action:</strong> 93% enforcement rate</li>
                  <li><strong>License:</strong> Suspension or revocation possible</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding STGO Regulations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">STGO Categories</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✓ <strong>Category 1:</strong> Up to 50,000kg GVW - Requires 2 working days' notice to authorities</li>
                  <li>✓ <strong>Category 2:</strong> 50,001kg to 80,000kg GVW - Requires 5 working days' notice, stricter speed limits</li>
                  <li>✓ <strong>Category 3:</strong> 80,001kg to 150,000kg GVW - Requires 5 working days' notice, extensive planning, multiple permits</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Notice Period Requirements</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Notice periods are calculated in working days (excludes Sundays and bank holidays). Notices must be submitted to National Highways via the ESDAL system. Insufficient notice periods are a common violation resulting in prohibitions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Common Violations</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Overloading beyond declared category limits (most frequent)</li>
                  <li>• Missing STGO plates/markings (removes legal protection)</li>
                  <li>• Insufficient notice period to authorities</li>
                  <li>• Transporting divisible loads that should be split</li>
                  <li>• False movement declarations with incorrect weights</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Best Practices</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Always verify weights at certified weighbridges</li>
                  <li>• Calculate compliance margins - don't operate at limits</li>
                  <li>• Submit ESDAL notifications with correct lead time</li>
                  <li>• Ensure proper STGO plates displayed</li>
                  <li>• Document all compliance checks</li>
                  <li>• Never "take a chance" - penalties exceed delay costs</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded mt-8">
              <h3 className="font-bold text-gray-900 mb-2">Professional Quality Assurance</h3>
              <p className="text-sm text-gray-700">
                This calculator provides professional estimates for UK STGO compliance. Always verify with DVSA guidance before movement. Recent enforcement has intensified with record penalties of £759,000 and Traffic Commissioner investigations resulting in 93% enforcement action. Operator license revocation, suspension, and transport manager disqualification are real risks.
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
      </div>
    </>
  )
}




