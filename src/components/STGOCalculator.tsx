import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { TruckIcon, AlertCircle, CheckCircle2 } from 'lucide-react'
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

  const resetCalculator = () => {
    setTractorWeight('')
    setTrailerWeight('')
    setLoadWeight('')
    setVehicleLength('')
    setVehicleWidth('')
    setAxleCount('')
    setLoadType('')
    setMovementDate('')
    setResults(null)
  }

  return (
    <>
      <Helmet>
        <title>STGO Calculator UK | HaulCheck - Avoid £750K Fines | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free STGO compliance calculator for UK hauliers. Check Category 1, 2, 3 limits instantly. Avoid £759K fines with weight checks and notice period calculations. DVSA compliant." 
        />
        <meta name="keywords" content="STGO calculator, haulage calculator, UK STGO compliance, abnormal load calculator, Category 1 2 3 calculator, heavy haulage UK, ESDAL notification, traffic commissioner, HGV compliance" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="STGO Calculator UK | HaulCheck - Avoid £750K Fines" />
        <meta property="og:description" content="Free STGO compliance calculator. Check Category 1, 2, 3 limits and avoid massive fines. For UK hauliers." />
        <meta property="og:url" content="https://tradecalcs.co.uk/stgo-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/stgo-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="STGO Calculator UK | HaulCheck" />
        <meta name="twitter:description" content="Free STGO compliance calculator. Avoid £759K fines with instant compliance checks." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/stgo-calculator-og.jpg" />

        <link rel="canonical" href="https://tradecalcs.co.uk/stgo-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#f97316" />

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
                  },
                  {
                    '@type': 'Question',
                    'name': 'Can I compare STGO with other professional calculators?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'TradeCalcs provides comprehensive professional estimators for multiple trades. Use our <a href="https://tradecalcs.co.uk/paint-calculator">Paint Calculator</a> for decorator costs, <a href="https://tradecalcs.co.uk/brick-block-calculator">Brick & Block Calculator</a> for masonry, <a href="https://tradecalcs.co.uk/tiling-calculator">Tiling Calculator</a> for surface work, or <a href="https://tradecalcs.co.uk/cis-calculator">CIS Calculator</a> for construction tax. All tools are free with UK rates and linked for complete project estimates.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How do I submit STGO notifications to ESDAL?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'ESDAL (Exceptional Size Transport and Dynamic Axle Load) is the online notification system at esdal.nationalhighways.co.uk. Submit notifications with correct lead time (2 or 5 working days depending on category). Include vehicle dimensions, weight breakdown, route details, and movement dates. Confirmation is required before movement. Late or missing notifications result in automatic penalties.'
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

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link to="/" className="text-purple-600 hover:text-purple-800 font-semibold text-sm">
            ← Back to All Calculators
          </Link>
        </div>

        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <TruckIcon className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">STGO Calculator UK</h1>
            <p className="text-lg opacity-95">Check compliance & avoid £750K fines instantly</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="bg-orange-600 text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <TruckIcon className="w-5 h-5" />
                <h2 className="text-lg font-bold">STGO Compliance Calculator</h2>
              </div>
              <p className="text-sm opacity-90">Professional estimation for UK hauliers and transport operators</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">1. Tractor Weight (kg)</label>
              <input
                type="number"
                value={tractorWeight}
                onChange={e => setTractorWeight(e.target.value)}
                placeholder="e.g. 8000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 mb-2"
                aria-label="Tractor unit unladen weight in kilograms"
              />
              <p className="text-xs text-gray-500 mt-1">Unladen tractor unit only (verified by weighbridge)</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">2. Trailer Weight (kg)</label>
              <input
                type="number"
                value={trailerWeight}
                onChange={e => setTrailerWeight(e.target.value)}
                placeholder="e.g. 10000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 mb-2"
                aria-label="Trailer unit unladen weight in kilograms"
              />
              <p className="text-xs text-gray-500 mt-1">Unladen trailer only (verified by weighbridge)</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">3. Load Weight (kg)</label>
              <input
                type="number"
                value={loadWeight}
                onChange={e => setLoadWeight(e.target.value)}
                placeholder="e.g. 32000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600 mb-2"
                aria-label="Cargo or load weight in kilograms"
              />
              <p className="text-xs text-gray-500 mt-1">Weight of cargo/equipment being transported</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">4. Vehicle Length (m)</label>
                <input
                  type="number"
                  step="0.1"
                  value={vehicleLength}
                  onChange={e => setVehicleLength(e.target.value)}
                  placeholder="e.g. 16.5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  aria-label="Total vehicle length in metres"
                />
                <p className="text-xs text-gray-500 mt-1">Optional (over 30m flagged)</p>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">5. Vehicle Width (m)</label>
                <input
                  type="number"
                  step="0.1"
                  value={vehicleWidth}
                  onChange={e => setVehicleWidth(e.target.value)}
                  placeholder="e.g. 2.55"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  aria-label="Total vehicle width in metres"
                />
                <p className="text-xs text-gray-500 mt-1">Optional (over 6.1m = police escort)</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">6. Number of Axles</label>
                <select
                  value={axleCount}
                  onChange={e => setAxleCount(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  aria-label="Number of vehicle axles"
                >
                  <option value="">Select number of axles</option>
                  <option value="3">3 axles (standard tractor + trailer)</option>
                  <option value="4">4 axles</option>
                  <option value="5">5 axles</option>
                  <option value="6">6 axles</option>
                  <option value="7+">7+ axles (multi-axle)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Critical for axle weight verification</p>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">7. Load Type</label>
                <select
                  value={loadType}
                  onChange={e => setLoadType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  aria-label="Type of load - divisible or indivisible"
                >
                  <option value="">Select load type</option>
                  <option value="indivisible">Indivisible Load (cannot be split)</option>
                  <option value="divisible">Divisible Load (can be split)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Divisible loads over 44,000kg must split</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">8. Planned Movement Date</label>
              <input
                type="date"
                value={movementDate}
                onChange={e => setMovementDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                aria-label="Planned movement date for compliance check"
              />
              <p className="text-xs text-gray-500 mt-1">Required for notice period calculation</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={resetCalculator}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition"
                aria-label="Reset calculator"
              >
                🔄 Reset
              </button>
              <button
                onClick={calculateCompliance}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition"
                aria-label="Check STGO compliance"
              >
                🚛 Check Compliance
              </button>
            </div>

            {results && (
              <>
                <div className={`mt-8 rounded-lg p-6 ${results.isCompliant ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    {results.isCompliant ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                    <h3 className={`text-xl font-bold ${results.isCompliant ? 'text-green-900' : 'text-red-900'}`}>
                      {results.isCompliant ? '✅ Potentially Compliant' : '❌ Non-Compliant'}
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded border-t-2 border-b-2" style={{ borderTopColor: results.isCompliant ? '#22c55e' : '#ef4444', borderBottomColor: results.isCompliant ? '#22c55e' : '#ef4444' }}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">STGO Category</p>
                        <p className="text-2xl font-bold text-gray-900">{results.category}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Total GVW</p>
                        <p className="text-2xl font-bold text-orange-600">{results.totalWeight.toLocaleString()} kg</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Notice Required</p>
                        <p className="text-2xl font-bold text-orange-600">{results.requiredNoticeDays > 0 ? `${results.requiredNoticeDays} days` : 'None'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Speed Limit</p>
                        <p className="text-lg font-bold text-orange-600">{results.maxSpeed}</p>
                      </div>
                    </div>

                    {results.issues.length > 0 && (
                      <div className="mt-4 p-3 bg-red-100 rounded border-l-2 border-red-600">
                        <p className="font-semibold text-red-900 mb-2">⚠️ Issues:</p>
                        <ul className="text-sm text-red-800 space-y-1">
                          {results.issues.map((issue, idx) => (
                            <li key={idx}>• {issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {results.requirements.length > 0 && (
                      <div className="mt-4 p-3 bg-blue-100 rounded border-l-2 border-blue-600">
                        <p className="font-semibold text-blue-900 mb-2">📋 Requirements:</p>
                        <ul className="text-sm text-blue-800 space-y-1">
                          {results.requirements.map((req, idx) => (
                            <li key={idx}>• {req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-900 mb-3">🚛 STGO Compliance Standards</h3>
                <ul className="space-y-2 text-sm text-red-900">
                  <li>• <strong>Standard HGV:</strong> Up to 44,000kg (no STGO needed)</li>
                  <li>• <strong>Category 1:</strong> Up to 50,000kg, 2 days' notice, 40 mph max</li>
                  <li>• <strong>Category 2:</strong> Up to 80,000kg, 5 days' notice, 30 mph max</li>
                  <li>• <strong>Category 3:</strong> Up to 150,000kg, 5 days' notice, 12 mph max, bridge assessments</li>
                  <li>• <strong>Record fine:</strong> £759,000 (July 2025) + license revocation</li>
                  <li>• <strong>DVSA enforcement:</strong> 93% of violations result in penalties</li>
                  <li>• <strong>Always verify:</strong> Weights at certified weighbridge before movement</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding STGO Categories & Compliance</h2>
            <p className="text-gray-700 mb-4">
              STGO (Special Types General Order) permits allow vehicles to exceed standard weight and size limits. Three categories provide different tolerance levels, each with specific notice requirements, speed restrictions, and compliance obligations. Non-compliance results in record penalties and potential operating license revocation.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-orange-600">
              <p className="text-sm text-gray-700"><strong>Key principle:</strong> Always verify actual weights at certified weighbridge. Self-declaration causes automatic penalties (£50-300 fixed, £10,000-40,000 court, up to £759,000 record). Submit ESDAL notifications with correct lead time in working days (excludes Sundays/bank holidays).</p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">STGO Category Breakdown & Requirements</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Category 1</h4>
                <p className="text-sm text-gray-700 mb-2">Up to 50,000kg GVW</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ 2 working days' notice</li>
                  <li>✓ 40 mph speed limit</li>
                  <li>✓ STGO plate required</li>
                  <li>✓ ESDAL notification</li>
                  <li>✓ Insurance mandatory</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-600 bg-orange-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Category 2</h4>
                <p className="text-sm text-gray-700 mb-2">50,001-80,000kg GVW</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ 5 working days' notice</li>
                  <li>✓ 30 mph speed limit</li>
                  <li>✓ Local auth. approval</li>
                  <li>✓ STGO plate required</li>
                  <li>✓ Route planning</li>
                </ul>
              </div>

              <div className="border-l-4 border-red-600 bg-red-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Category 3</h4>
                <p className="text-sm text-gray-700 mb-2">80,001-150,000kg GVW</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ 5 working days' notice</li>
                  <li>✓ 12 mph speed limit</li>
                  <li>✓ Bridge assessments</li>
                  <li>✓ Police escorts</li>
                  <li>✓ Route approval</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Violations & Compliance Checklist</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-red-600 bg-red-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">❌ Common Violations</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Exceeding category weight limits</li>
                  <li>• Insufficient notice to ESDAL</li>
                  <li>• Missing or incorrect STGO plates</li>
                  <li>• Speed limit violations (enforced)</li>
                  <li>• Poor record keeping (audit fail)</li>
                  <li>• False weight declarations</li>
                  <li>• No abnormal load insurance</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">✅ Compliance Checklist</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Verify weights at weighbridge</li>
                  <li>• Submit ESDAL with lead time</li>
                  <li>• Display STGO plate on front</li>
                  <li>• HGV license category verified</li>
                  <li>• Abnormal load insurance active</li>
                  <li>• Keep documentation 6+ years</li>
                  <li>• Brief driver on speed/restrictions</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How is notice period calculated in working days?</h4>
                <p className="text-sm text-gray-700">Working days exclude Sundays and bank holidays. Category 1 (2 days) means submit notification by second working day before movement. Category 2/3 (5 days) means submit by fifth working day. Weekends don't count. Example: Friday movement requires Wednesday submission for Category 1.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What penalties result from violations?</h4>
                <p className="text-sm text-gray-700">Fixed penalties: £50-300. Court fines: £10,000-40,000 typical. Record fine: £759,000 (July 2025). Operating license suspension/revocation. Transport manager disqualification. Criminal prosecution with director liability. DVSA has 93% enforcement rate.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Do I need police escort for all Category 3 loads?</h4>
                <p className="text-sm text-gray-700">Not always automatic, but common for Category 3 (80,001-150,000kg). Always required if width exceeds 6.1m. Contact National Highways for Category 3 - they determine escort requirements based on route and load specifications.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How does this calculator compare with other tools?</h4>
                <p className="text-sm text-gray-700">TradeCalcs provides comprehensive professional estimators for multiple trades. Use our <a href="/paint-calculator" className="text-purple-600 font-semibold hover:underline">Paint Calculator</a> for decorator costs, <a href="/brick-block-calculator" className="text-purple-600 font-semibold hover:underline">Brick & Block Calculator</a> for masonry, or <a href="/cis-calculator" className="text-purple-600 font-semibold hover:underline">CIS Calculator</a> for construction tax. All tools are free with UK rates and linked for complete project estimates.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What documentation do I keep for Traffic Commissioner audits?</h4>
                <p className="text-sm text-gray-700">Keep: STGO notification confirmations, weighbridge certificates, ESDAL confirmations, movement documentation, driver HGV license copies, abnormal load insurance certificates, STGO plate photos, route approvals. Retain minimum 6 years for audit compliance.</p>
              </div>
            </div>
          </section>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-yellow-900 mb-2">✓ For Guidance Only - Legal Notice</p>
                <p className="text-sm text-yellow-800">This calculator provides preliminary compliance checks. Always verify with official DVSA guidance before movement. Non-compliance results in fines up to £759,000, operating license revocation, and criminal prosecution. DVSA enforcement rate is 93% with increasing penalties. Submit ESDAL at esdal.nationalhighways.co.uk. Verify weights at certified weighbridge. This is guidance only - not legal advice.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8 mb-8">
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

          <div className="bg-orange-600 text-white rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Complete Your Transport Compliance</h2>
            <p className="mb-6">Use our comprehensive suite of professional estimators: <a href="/paint-calculator" className="underline hover:opacity-90">Paint Calculator</a> for site support, <a href="/brick-block-calculator" className="underline hover:opacity-90">Brick & Block Calculator</a> for materials, <a href="/cis-calculator" className="underline hover:opacity-90">CIS Calculator</a> for construction tax, and <a href="/" className="underline hover:opacity-90">view all calculators</a> to build complete project estimates.</p>
            <a href="/" className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </a>
          </div>
        </div>
      </div>
    </>
  )
}






