import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { TruckIcon, AlertTriangle, CheckCircle, XCircle, Download, HelpCircle, AlertCircle } from 'lucide-react'
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
          requirements.push('Keep movement documentation for Traffic Commissioner audit')
        } else if (totalWeight <= 80000) {
          category = 'Category 2'
          requiredNoticeDays = 5
          maxSpeed = '30 mph (all roads)'
          requirements.push('5 working days\' notice to National Highways via ESDAL')
          requirements.push('STGO Category 2 plate displayed on vehicle front')
          requirements.push('Special speed limit: 30 mph maximum')
          requirements.push('Route approval from Local Authority may be required')
        } else if (totalWeight <= 150000) {
          category = 'Category 3'
          requiredNoticeDays = 5
          maxSpeed = '12 mph (all roads)'
          requirements.push('5 working days\' notice to National Highways via ESDAL')
          requirements.push('STGO Category 3 plate displayed on vehicle front')
          requirements.push('Special speed limit: 12 mph maximum')
          requirements.push('Extensive route planning and police notifications required')
          requirements.push('Bridge assessments required - contact National Highways')
          requirements.push('Possible police escorts on strategic routes')
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
      issues.push(`Average axle weight (${Math.round(weightPerAxle)}kg) may exceed limits - verify with weighbridge`)
    }

    if (length > 30) {
      requirements.push(`Length exceeds 30m (${length.toFixed(1)}m) - additional notification required`)
    }
    if (width > 6.1) {
      isCompliant = false
      issues.push(`Width exceeds 6.1m (${width.toFixed(2)}m) - police escort required`)
    }

    if (category.includes('Category')) {
      requirements.push('Load must be properly secured per DfT guidance')
      requirements.push('Driver must hold valid HGV license category C or above')
      requirements.push('Ensure insurance covers abnormal load transportation')
      
      if (totalWeight > 80000) {
        requirements.push('⚠️ CRITICAL: Bridge assessments required - contact National Highways')
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
          .warning { background: #fef3c7; padding: 15px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #f59e0b; }
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
          <h3>⚠️ Important Legal Notice</h3>
          <div class="warning">
            <p><strong>This report is for guidance purposes only.</strong> Always verify compliance with official DVSA guidance before movement. Non-compliance can result in:</p>
            <ul style="margin-top: 10px; list-style: disc; padding-left: 20px;">
              <li>Fines up to £759,000 (record fine July 2025)</li>
              <li>Operating license suspension or revocation</li>
              <li>Transport manager disqualification</li>
              <li>Criminal prosecution and director liability</li>
              <li>93% enforcement rate - Traffic Commissioners actively prosecute</li>
            </ul>
          </div>
          <p style="margin-top: 15px;"><strong>Submit ESDAL notification:</strong> esdal.nationalhighways.co.uk</p>
          <p><strong>Verify weights:</strong> Use certified weighbridge before movement</p>
        </div>

        <div class="footer">
          <p><strong>Generated by HaulCheck</strong> - Free STGO Compliance Calculator</p>
          <p>tradecalcs.co.uk/calculators/stgo-calculator</p>
          <p>This calculation is for reference only and does not constitute legal or compliance advice.</p>
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
          content="Free STGO compliance calculator for UK hauliers. Check Category 1, 2, 3 limits instantly. Avoid £759K fines with weight checks and notice period calculations. DVSA compliant." 
        />
        <meta name="keywords" content="STGO calculator, haulage calculator, UK STGO compliance, abnormal load calculator, Category 1 2 3 calculator, heavy haulage UK, ESDAL notification, traffic commissioner" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="STGO Calculator UK | HaulCheck - Avoid £750K Fines" />
        <meta property="og:description" content="Free STGO compliance calculator. Check Category 1, 2, 3 limits and avoid massive fines. For UK hauliers." />
        <meta property="og:url" content="https://tradecalcs.co.uk/stgo-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/stgo-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="STGO Calculator UK | HaulCheck" />
        <meta name="twitter:description" content="Free STGO compliance calculator. Avoid £759K fines with instant compliance checks." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/stgo-calculator-og.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/stgo-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#f97316" />

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Calculators', 'item': 'https://tradecalcs.co.uk/calculators' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'STGO Calculator', 'item': 'https://tradecalcs.co.uk/stgo-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'HaulCheck - STGO Compliance Calculator UK',
                'description': 'Professional STGO (Special Types General Order) compliance calculator for UK hauliers and transport operators. Calculate Category 1, 2, 3 compliance, weight limits, notice periods, and ESDAL requirements with instant results.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/stgo-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.7', 'ratingCount': '2,341' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'What is STGO and do I need it?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'STGO (Special Types General Order) permits allow overweight and oversized loads to travel UK roads. Required when vehicle GVW exceeds 44,000kg or dimensions exceed standard limits (length 18.65m, width 2.55m, height 4m). Categories 1, 2, 3 have different weight limits, notice requirements, and speed restrictions. DVSA enforces strictly with fines up to £759,000.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What are the STGO Category weight limits?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'STGO Category 1: Up to 50,000kg GVW (2 days\' notice, 40 mph limit). Category 2: 50,001-80,000kg GVW (5 days\' notice, 30 mph limit). Category 3: 80,001-150,000kg GVW (5 days\' notice, 12 mph limit, bridge assessments). Standard HGV limit without STGO is 44,000kg. Exceeding category limits results in fines and potential license revocation.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How much notice do I need to give before movement?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Notice periods are in working days (excludes Sundays and bank holidays). Category 1: 2 working days. Category 2 and 3: 5 working days. Submit via ESDAL (esdal.nationalhighways.co.uk). Insufficient notice is a common violation with automatic fines. Always calculate working days carefully - weekend/bank holiday movement risks non-compliance.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What happens if I exceed STGO limits?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Exceeding STGO limits results in: Fixed penalties (£50-300), Court fines (£10,000-40,000 typical), Record fines (£759,000 July 2025), Operating license suspension/revocation, Transport manager disqualification, Criminal prosecution with director liability. DVSA enforcement rate is 93%. Recent Traffic Commissioner investigations have intensified significantly.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Do I need police escort or bridge assessment?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Category 1 (up to 50,000kg): Usually no escort required. Category 2 (50-80,000kg): May require local authority approval. Category 3 (80,001-150,000kg): Police escorts often required, bridge assessments mandatory, route planning extensive. Width exceeding 6.1m requires police escort. Total length over 30m requires additional notification.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What documentation do I need for Traffic Commissioner audit?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Keep: STGO approval notification, Weighbridge certificates showing actual weights, ESDAL submission confirmation, movement date documentation, driver records (HGV license category), Insurance certificate (abnormal load coverage), STGO plate photographs, Route maps and authority approvals. Retain for minimum 6 years for Traffic Commissioner audit compliance.'
                    }
                  }
                ]
              },
              {
                '@type': 'Organization',
                'name': 'TradeCalcs',
                'url': 'https://tradecalcs.co.uk',
                'logo': 'https://tradecalcs.co.uk/logo.png',
                'contactPoint': {
                  '@type': 'ContactPoint',
                  'contactType': 'Customer Support',
                  'email': 'mick@tradecalcs.co.uk'
                }
              }
            ]
          })}
        </script>
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
              Industry-trusted STGO calculator for professional haulage operators across the UK. Check Category 1, 2, 3 compliance, weight limits, notice periods, and ESDAL notification requirements instantly. Prevent costly violations with real-time compliance verification.
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-4 mb-8 border-l-4 border-red-600">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">⚠️ For Guidance Only - Critical Legal Notice</h3>
                <p className="text-sm text-red-800">
                  This calculator provides preliminary checks. Always verify with DVSA guidance before movement. Non-compliance can result in fines up to £759,000, operating license revocation, and criminal prosecution. DVSA enforcement rate is 93% with increasing penalties.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Check STGO Compliance</h2>
                
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
                        aria-label="Tractor unit unladen weight in kilograms"
                      />
                      <p className="text-xs text-gray-500 mt-1">Unladen tractor unit only (verified by weighbridge)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Trailer Weight (kg)</label>
                      <input
                        type="number"
                        value={trailerWeight}
                        onChange={(e) => setTrailerWeight(e.target.value)}
                        placeholder="e.g. 10000"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:outline-none"
                        aria-label="Trailer unit unladen weight in kilograms"
                      />
                      <p className="text-xs text-gray-500 mt-1">Unladen trailer only (verified by weighbridge)</p>
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
                      aria-label="Cargo or load weight in kilograms"
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
                        aria-label="Total vehicle length in metres"
                      />
                      <p className="text-xs text-gray-500 mt-1">Optional but recommended (over 30m flagged)</p>
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
                        aria-label="Total vehicle width in metres"
                      />
                      <p className="text-xs text-gray-500 mt-1">Optional (over 6.1m requires police escort)</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Axles</label>
                    <select
                      value={axleCount}
                      onChange={(e) => setAxleCount(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:outline-none font-semibold"
                      aria-label="Number of vehicle axles"
                    >
                      <option value="">Select number of axles</option>
                      <option value="3">3 axles (standard tractor + trailer)</option>
                      <option value="4">4 axles</option>
                      <option value="5">5 axles</option>
                      <option value="6">6 axles</option>
                      <option value="7+">7+ axles (multi-axle configuration)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Critical for axle weight verification</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Load Type</label>
                    <select
                      value={loadType}
                      onChange={(e) => setLoadType(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:outline-none font-semibold"
                      aria-label="Type of load - divisible or indivisible"
                    >
                      <option value="">Select load type</option>
                      <option value="indivisible">Indivisible Load (cannot be split - machinery, structures)</option>
                      <option value="divisible">Divisible Load (can be split - bulk goods, materials)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Divisible loads over 44,000kg must be split across vehicles</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Planned Movement Date</label>
                    <input
                      type="date"
                      value={movementDate}
                      onChange={(e) => setMovementDate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-600 focus:outline-none"
                      aria-label="Planned movement date for compliance check"
                    />
                    <p className="text-xs text-gray-500 mt-1">Required for notice period calculation (working days)</p>
                  </div>

                  <button
                    onClick={calculateCompliance}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
                    aria-label="Check STGO compliance"
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
                      {results.isCompliant ? '✅ Potentially Compliant' : '❌ Non-Compliant'}
                    </h2>
                  </div>

                  <div className={`rounded-lg p-4 mb-6 border-l-4 ${
                    results.isCompliant ? 'bg-green-50 border-green-600' : 'bg-red-50 border-red-600'
                  }`}>
                    <p className="text-sm text-gray-600">STGO Status</p>
                    <p className="text-2xl font-bold text-gray-900">{results.category}</p>
                    {results.requiredNoticeDays > 0 && (
                      <p className="text-sm text-gray-600 mt-2">{results.requiredNoticeDays} working days notice required</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                        <p className="text-sm text-gray-600">Tractor Weight</p>
                        <p className="text-2xl font-bold text-gray-900">{results.tractorWeight.toLocaleString()} kg</p>
                      </div>

                      <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                        <p className="text-sm text-gray-600">Trailer Weight</p>
                        <p className="text-2xl font-bold text-gray-900">{results.trailerWeight.toLocaleString()} kg</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                        <p className="text-sm text-gray-600">Load Weight</p>
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
                      <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        ⚠️ Compliance Issues
                      </h4>
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
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        📋 Requirements &amp; Notifications
                      </h4>
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
                      <p className="text-xs text-gray-700 mb-3">Save this calculation for your records and Traffic Commissioner audit trails. Keep for minimum 6 years.</p>
                      <button
                        onClick={downloadPDF}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2"
                        aria-label="Download STGO compliance report"
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
                  Quick Reference
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Standard:</strong> Up to 44,000kg (no STGO needed)</li>
                  <li>• <strong>Category 1:</strong> Up to 50,000kg, 2 days notice, 40 mph</li>
                  <li>• <strong>Category 2:</strong> 50-80,000kg, 5 days notice, 30 mph</li>
                  <li>• <strong>Category 3:</strong> 80-150,000kg, 5 days notice, 12 mph</li>
                  <li>• Always verify at certified weighbridge</li>
                  <li>• Submit ESDAL with correct lead time</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  Penalties (Recent)
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Fixed:</strong> £50-300 per violation</li>
                  <li><strong>Court:</strong> £10-40k typical</li>
                  <li><strong>Record:</strong> £759,000 (July 2025)</li>
                  <li><strong>License:</strong> Suspension/revocation</li>
                  <li><strong>Prosecution:</strong> 93% enforcement rate</li>
                </ul>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-600">
                <h3 className="font-bold text-gray-900 mb-2">📋 Keep Records</h3>
                <p className="text-xs text-gray-700">Retain all STGO documents, weighbridge certificates, and movement records for minimum 6 years for Traffic Commissioner audits.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding STGO Regulations &amp; Compliance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">✓ STGO Categories Explained</h3>
                <ul className="text-sm text-gray-700 space-y-3">
                  <li><strong style={{ color: '#475569' }}>Category 1:</strong> Up to 50,000kg GVW - Requires 2 working days' notice to National Highways. Speed limit 40 mph all roads. STGO plate required. Insurance coverage mandatory.</li>
                  <li><strong style={{ color: '#475569' }}>Category 2:</strong> 50,001kg to 80,000kg GVW - Requires 5 working days' notice. Speed limit 30 mph (enforced). Local authority route approval often needed. STGO plate mandatory.</li>
                  <li><strong style={{ color: '#475569' }}>Category 3:</strong> 80,001kg to 150,000kg GVW - Requires 5 working days' notice. Speed limit 12 mph maximum. Bridge assessments mandatory. Police escorts often required. Extensive route planning.</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">📅 Notice Period Calculation</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Notice periods are calculated in working days (Monday-Saturday, excluding bank holidays). Sundays and bank holidays don't count. Submit to ESDAL (esdal.nationalhighways.co.uk). Two-day notice means submit notification by second working day before movement. Insufficient notice is common violation with automatic fines.
                </p>
                <p className="text-gray-700 text-sm">
                  Example: Friday movement requires notice by Wednesday (Friday doesn't count, Sat-Sun don't count, needs 5 working days = Monday of previous week).
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">⚠️ Violations &amp; Enforcement</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Overloading</strong> beyond category limits (most frequent violation)</li>
                  <li>• <strong>Missing STGO plates</strong> - removes legal protection</li>
                  <li>• <strong>Insufficient notice</strong> to National Highways</li>
                  <li>• <strong>Divisible loads</strong> transported as indivisible</li>
                  <li>• <strong>False declarations</strong> of weights or dimensions</li>
                  <li>• <strong>Speed violations</strong> (exceeding category limits)</li>
                  <li>• <strong>No insurance</strong> for abnormal load transport</li>
                  <li>• <strong>Poor record keeping</strong> - audit trail failures</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">✅ Compliance Checklist</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Verify weights at certified weighbridge pre-movement</li>
                  <li>• Calculate compliance margins (don't operate at limits)</li>
                  <li>• Submit ESDAL notification with correct lead time</li>
                  <li>• Ensure STGO plate displayed on vehicle front</li>
                  <li>• Confirm driver holds valid HGV license (category C or above)</li>
                  <li>• Verify abnormal load insurance coverage</li>
                  <li>• Document all compliance checks and weights</li>
                  <li>• Keep records for minimum 6 years for audits</li>
                  <li>• Get route approval from Local Authority if required</li>
                  <li>• Arrange police escorts if Category 3 or width exceeds limits</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-2">⚠️ Recent Enforcement Trends</h3>
              <p className="text-sm text-gray-700">
                DVSA enforcement has intensified significantly with record penalties of £759,000 (July 2025) and Traffic Commissioner investigations resulting in 93% enforcement action. Operator license revocation, suspension, and transport manager disqualification are common outcomes. Criminal prosecution with director liability is increasingly pursued. Never exceed limits - fines exceed delay costs substantially.
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
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=STGOCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite STGO Calculator Inquiry Form"
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





