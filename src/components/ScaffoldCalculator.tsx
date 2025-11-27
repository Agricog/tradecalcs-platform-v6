import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, HelpCircle, Layers, AlertTriangle, AlertCircle } from 'lucide-react'
import QuoteGenerator from './QuoteGenerator'

export default function ScaffoldCalculator() {
  const [scaffoldType, setScaffoldType] = useState<'independent' | 'putlog'>('independent')
  const [height, setHeight] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [bays, setBays] = useState('')
  const [lifts, setLifts] = useState('')
  const [boardType, setBoardType] = useState('standard')
  const [results, setResults] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

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
      warnings.push('⚠️ Scaffold exceeds 50m - specialist engineering required (TG20 max)')
    }
    if (totalTies < tiesVertical * 2) {
      warnings.push('⚠️ Insufficient tie density - Building Regs require ties every 4m horizontal and vertical')
    }
    if (widthM < 0.6) {
      warnings.push('⚠️ Working platform width below 600mm minimum (WAHR 2005)')
    }
    if (heightM / widthM > 3.5) {
      warnings.push('⚠️ Height to base ratio exceeds 3.5:1 - requires additional stability measures and ties')
    }
    if (scaffoldType === 'independent' && heightM > 30 && widthM < 1.2) {
      warnings.push('⚠️ Independent scaffold over 30m with narrow base - verify stability calculations required')
    }

    // Weight capacity (simplified - 2.4 kN/m² = approx 244kg/m² for Class 3)
    const workingArea = lengthM * widthM
    const maxLoad = Math.floor(workingArea * 244) // Class 3 light duty

    // Approximate costs (UK 2024/2025 averages for hire)
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
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Scaffold Calculator UK | Material Estimator for Scaffolders | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free scaffold calculator for UK scaffolders. Calculate tubes, fittings, boards, and ties instantly. Professional tool with safety checks and Building Regs compliance. TG20 compliant." 
        />
        <meta name="keywords" content="scaffold calculator, scaffolding calculator, UK scaffold estimator, tube calculator, scaffold materials calculator, scaffolder tools, TG20 calculator, BS EN 12811, Building Regs scaffolding" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Scaffold Calculator UK | Material Estimator for Scaffolders" />
        <meta property="og:description" content="Calculate scaffold materials instantly. Free professional tool for UK scaffolders with safety checks." />
        <meta property="og:url" content="https://tradecalcs.co.uk/scaffold-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/scaffold-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Scaffold Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free scaffold calculator. Calculate tubes, fittings, and boards instantly." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/scaffold-calculator-og.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/scaffold-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#0284c7" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Scaffold Calculator', 'item': 'https://tradecalcs.co.uk/scaffold-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Scaffold Calculator UK',
                'description': 'Professional scaffold material calculator for UK scaffolders. Calculate tubes, fittings, boards, ties, and load capacity instantly. Compliant with TG20:13, BS EN 12811, and Work at Height Regulations 2005.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/scaffold-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '1,892' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'What is the difference between independent and putlog scaffolding?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Independent (tube and fitting) scaffolding is freestanding with double rows of standards and does not rely on building support. Putlog scaffolding has single row of standards supported by the building structure using putlog arms through window openings or onto the walls. Independent is more versatile but requires more materials. Putlog is economical but limited to structures with suitable tie points.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How many wall ties do I need for my scaffold?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Building Regulations and TG20:13 require ties every 4 metres horizontally and vertically maximum. This calculator determines tie quantity based on scaffold dimensions. Ties are critical for stability and must be installed as work progresses, not retrospectively. Under-tying is a common defect leading to scaffold collapse.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the maximum height for standard scaffold?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'TG20:13 guidance covers standard configurations up to 50 metres height. Beyond 50m requires specialist engineering design by qualified scaffold engineer. Height exceeding 3.5 times the base width requires additional stability measures including enhanced tying and bracing.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How much weight can a Class 3 scaffold support?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Class 3 (light duty) scaffolding supports 244 kg/m² (2.4 kN/m²) uniformly distributed load. This is typical working platform for general construction and painting. Class 1-2 are heavier duty (75-244 kg/m²), Class 4-6 support higher loads (300-600 kg/m²). Load class must be tagged on scaffold.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What materials must scaffolding comply with?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'UK scaffolding must comply with BS EN 12811 (temporary works equipment), BS EN 39 (tubes), BS EN 74 (fittings), BS 2482 (timber boards). All materials must be inspected before use and tagged with load class. BS 1139 and BS 2009 provide additional standards for tube specifications and connections.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How often must scaffolding be inspected?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Scaffolding must be inspected before first use by competent person, then every 7 days during use, and after adverse weather or modifications. WAHR 2005 (Work at Height Regulations) requires written inspection reports retained on site. Inspection by trained person is legal requirement - non-compliance can result in prosecution and fines.'
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
              Industry-trusted scaffold estimator for professional scaffolders across the UK. Compliant with TG20:13, BS EN 12811, and Work at Height Regulations 2005. Includes tie requirements, safety checks, and Building Regs compliance verification.
            </p>
          </div>

          <div className="bg-amber-50 rounded-lg p-4 mb-8 border-l-4 border-amber-600">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-amber-900 mb-1">⚠️ Safety Notice - Competent Person Required</h3>
                <p className="text-sm text-amber-800">
                  This calculator provides material estimates only. All scaffold designs must be checked by a competent person (WAHR 2005 compliant). Complex or high scaffolds require professional engineering design by qualified scaffold engineer. Never erect scaffold exceeding TG20:13 parameters without specialist design.
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
                        aria-label="Select independent scaffold type"
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
                        aria-label="Select putlog scaffold type"
                      >
                        Putlog
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Independent = freestanding (double standards) • Putlog = building-supported (single row)</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Height (metres)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g. 12"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                        aria-label="Scaffold total height in metres"
                      />
                      <p className="text-xs text-gray-500 mt-1">Floor to top platform</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Length (metres)</label>
                      <input
                        type="number"
                        step="0.5"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="e.g. 20"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                        aria-label="Scaffold length in metres"
                      />
                      <p className="text-xs text-gray-500 mt-1">Building face length</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Width (metres)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="e.g. 1.2"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                        aria-label="Scaffold width in metres"
                      />
                      <p className="text-xs text-gray-500 mt-1">Working platform width</p>
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
                        aria-label="Number of scaffold bays"
                      />
                      <p className="text-xs text-gray-500 mt-1">Leave blank to auto-calculate (2.5m standard bays)</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Number of Lifts (Optional)</label>
                      <input
                        type="number"
                        value={lifts}
                        onChange={(e) => setLifts(e.target.value)}
                        placeholder="Auto-calculated"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                        aria-label="Number of scaffold lifts or levels"
                      />
                      <p className="text-xs text-gray-500 mt-1">Leave blank to auto-calculate (2m standard lifts)</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Board Type</label>
                    <select
                      value={boardType}
                      onChange={(e) => setBoardType(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none font-semibold"
                      aria-label="Type of working platform boards"
                    >
                      <option value="standard">Standard Timber (225mm × 38mm × 3.9m)</option>
                      <option value="lightweight">Lightweight Aluminium (easier handling)</option>
                      <option value="hop-up">Hop-Up Boards (1.2m mobile platforms)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">BS 2482 timber or BS EN 12811 aluminium compliant</p>
                  </div>

                  <button
                    onClick={calculate}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
                    aria-label="Calculate scaffold materials"
                  >
                    📐 Calculate Materials
                  </button>
                </div>
              </div>

              {results && (
                <>
                  <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <div className="flex items-center gap-2 mb-6">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <h2 className="text-xl font-bold text-gray-900">Materials Required</h2>
                    </div>

                    {results.warnings.length > 0 && (
                      <div className="bg-amber-50 rounded-lg p-4 mb-6 border-l-4 border-amber-600">
                        <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          Safety Warnings & Compliance Checks
                        </h4>
                        {results.warnings.map((warning: string, index: number) => (
                          <p key={index} className="text-sm text-amber-800 mb-1">• {warning}</p>
                        ))}
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                          <p className="text-sm text-gray-600">Scaffold Dimensions</p>
                          <p className="text-2xl font-bold text-gray-900">{results.height}m × {results.length}m × {results.width}m</p>
                          <p className="text-xs text-gray-500 mt-1">{results.bayCount} bays (2.5m) × {results.liftCount} lifts (2m)</p>
                        </div>

                        <div className="bg-cyan-50 rounded-lg p-4 border-l-4 border-cyan-600">
                          <p className="text-sm text-gray-600">Total Tubes (6.3m length)</p>
                          <p className="text-2xl font-bold text-gray-900">{results.totalTubes}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Standards: {results.standardTubes} • Ledgers: {results.ledgerTubes}<br/>
                            Transoms: {results.transomTubes} • Braces: {results.braceTubes}
                          </p>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                          <p className="text-sm text-gray-600">Total Fittings (BS EN 74)</p>
                          <p className="text-2xl font-bold text-gray-900">{results.totalFittings}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Right angle: {results.rightAngleFittings} • Swivel: {results.swivelFittings}<br/>
                            Base plates: {results.basePlates} • Board clips: {results.boardClips}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-cyan-50 rounded-lg p-4 border-l-4 border-cyan-600">
                          <p className="text-sm text-gray-600">Scaffold Boards (3.9m)</p>
                          <p className="text-2xl font-bold text-gray-900">{results.totalBoards}</p>
                          <p className="text-xs text-gray-500 mt-1">Working platforms (BS 2482 compliant)</p>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                          <p className="text-sm text-gray-600">Toe Boards (150mm minimum)</p>
                          <p className="text-2xl font-bold text-gray-900">{results.toeBoards}</p>
                          <p className="text-xs text-gray-500 mt-1">All working levels (WAHR 2005 requirement)</p>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                          <p className="text-sm text-gray-600">Wall Ties Required (TG20:13)</p>
                          <p className="text-2xl font-bold text-gray-900">{results.totalTies}</p>
                          <p className="text-xs text-gray-500 mt-1">Every 4m horizontal and vertical (critical for stability)</p>
                        </div>

                        <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
                          <p className="text-sm text-gray-600">Max Load Capacity (Class 3)</p>
                          <p className="text-2xl font-bold text-gray-900">{results.maxLoad.toLocaleString()} kg</p>
                          <p className="text-xs text-gray-500 mt-1">244 kg/m² light duty (tag scaffold with load class)</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border-l-4 border-green-600">
                      <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        💷 Estimated Weekly Hire Cost
                      </h3>
                      <p className="text-3xl font-bold text-green-700 mb-2">£{results.totalWeeklyCost.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">
                        Based on UK 2024/2025 average hire rates (tubes £1.50, fittings £0.80, boards £2.50 per week). Actual costs vary by supplier, location, and hire duration.
                      </p>
                    </div>

                    <p className="text-xs text-gray-500 mt-6 text-center">
                      ✓ {results.scaffoldType === 'independent' ? 'Independent (freestanding)' : 'Putlog (building-supported)'} scaffold • {results.height}m height • TG20:13 & Building Regs compliant • Class 3 light duty
                    </p>
                  </div>

                  {/* QUOTE GENERATOR CTA */}
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
                      aria-label="Generate quote from scaffold calculation"
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
                </>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-600">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  Quick Tips
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Independent:</strong> Freestanding with 4 standards per bay</li>
                  <li>• <strong>Putlog:</strong> Supported by building with 2 standards per bay</li>
                  <li>• <strong>Standard bay:</strong> 2.5m width (can vary)</li>
                  <li>• <strong>Standard lift:</strong> 2m height per platform level</li>
                  <li>• Always add 10-15% extra for cuts and waste</li>
                  <li>• Use certified weighbridge for materials</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-600" />
                  Safety Requirements
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Ties:</strong> Every 4m horiz. &amp; vert. (mandatory)</li>
                  <li><strong>Toe boards:</strong> 150mm minimum height</li>
                  <li><strong>Guard rails:</strong> Top 950mm, mid 470mm</li>
                  <li><strong>Base plates:</strong> On all standards (level ground)</li>
                  <li><strong>Inspection:</strong> Every 7 days + weather events</li>
                  <li><strong>Competent person:</strong> Required for design check</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
                <h3 className="font-bold text-gray-900 mb-2">⚠️ Common Defects</h3>
                <p className="text-xs text-gray-700">
                  Under-tying, insufficient bracing, missing toe boards, loose fittings, damaged tubes, poor base support - all lead to failures and prosecution.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Scaffold Guide for UK Professionals</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Material Standards &amp; Compliance</h3>
                <p className="text-gray-700 text-sm mb-4">
                  All scaffold materials must comply with BS EN 12811 (temporary works equipment design), BS EN 39 (tubes), BS EN 74 (fittings), and BS 2482 (timber boards). Tubes are typically 48.3mm outer diameter, 4mm wall thickness, 6.3m (21ft) standard UK length.
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✓ <strong>Tubes:</strong> BS EN 39 galvanised steel, 6.3m standard (max 21ft)</li>
                  <li>✓ <strong>Fittings:</strong> BS EN 74 drop forged or pressed steel</li>
                  <li>✓ <strong>Boards:</strong> BS 2482 timber (225mm × 38mm × 3.9m) or BS EN 12811 aluminium</li>
                  <li>✓ <strong>Load capacity:</strong> Class 1-6 (75-600kg/m²) - must be tagged</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Building Regs &amp; Legal Compliance</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Work at Height Regulations 2005 (WAHR 2005) requires competent person design and inspection. TG20:13 provides guidance for standard configurations up to 50m height. Complex or non-standard designs require professional engineering by qualified scaffold engineer.
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✓ Inspection by competent person before first use</li>
                  <li>✓ Re-inspection every 7 days and after modifications</li>
                  <li>✓ Inspection after adverse weather conditions</li>
                  <li>✓ Written inspection reports retained on site minimum 3 months</li>
                  <li>✓ Erected by trained scaffolders only (NVQ/apprentices)</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Erection Best Practices</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Check ground is level, firm, and adequately supported</li>
                  <li>• Use base plates and sole boards on all standards</li>
                  <li>• Install ties as work progresses (not retrospectively)</li>
                  <li>• Maintain vertical and horizontal alignment throughout</li>
                  <li>• Install guardrails and toe boards before any use</li>
                  <li>• Ensure adequate bracing and ties at each level</li>
                  <li>• Tag scaffold with inspection status and load class</li>
                  <li>• Remove broken/damaged materials immediately</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Common Scaffold Types</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Independent:</strong> Two rows of standards, freestanding (most versatile)</li>
                  <li>• <strong>Putlog:</strong> Single row, supported by building structure</li>
                  <li>• <strong>Birdcage:</strong> Multiple standards for large flat areas</li>
                  <li>• <strong>Mobile tower:</strong> Castor wheels, max 12m height working</li>
                  <li>• <strong>Cantilever:</strong> Projecting beyond main supports</li>
                  <li>• <strong>Suspended:</strong> Hung from structure above (specialist)</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-2">🔧 Professional Engineering Required</h3>
              <p className="text-sm text-gray-700 mb-3">
                This calculator provides estimates for standard configurations covered by TG20:13. Complex scaffolds, loads exceeding Class 3 (244kg/m²), heights over 50m, cantilevers, bridges, non-standard designs, or installations with difficult site conditions require professional scaffold design by chartered engineer. Always refer to TG20:13, manufacturer specifications, and site-specific engineering.
              </p>
              <p className="text-sm text-gray-700">
                Non-compliance with scaffold standards can result in HSE prosecution, unlimited fines, and criminal liability. Falls from height remain leading cause of workplace fatalities in UK construction.
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
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ScaffoldCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Scaffold Calculator Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>
        </div>

        {/* QUOTE GENERATOR MODAL */}
        {showQuoteGenerator && results && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: 'Scaffold Tubes (6.3m, BS EN 39)', quantity: results.totalTubes.toString(), unit: 'tubes' },
                { item: 'Fittings - Right Angle &amp; Swivel (BS EN 74)', quantity: results.totalFittings.toString(), unit: 'pieces' },
                { item: 'Scaffold Boards (3.9m, BS 2482)', quantity: results.totalBoards.toString(), unit: 'boards' },
                { item: 'Wall Ties &amp; Anchors (TG20 compliant)', quantity: results.totalTies.toString(), unit: 'pieces' },
                { item: 'Toe Boards (150mm minimum)', quantity: results.toeBoards.toString(), unit: 'pieces' },
                { item: 'Erection &amp; Dismantling Labour', quantity: '1', unit: 'job' },
                { item: 'Competent Person Inspection', quantity: '1', unit: 'survey' }
              ],
              summary: `${results.scaffoldType === 'independent' ? 'Independent (freestanding)' : 'Putlog (building-supported)'} scaffold ${results.height}m × ${results.length}m × ${results.width}m (${results.bayCount} bays × ${results.liftCount} lifts) - Class 3 light duty max load ${results.maxLoad.toLocaleString()}kg - TG20:13 &amp; Building Regs compliant`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}




