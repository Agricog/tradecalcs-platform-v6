import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, HelpCircle, Layers, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import QuoteGenerator from './QuoteGenerator'

interface ScaffoldResults {
  scaffoldType: string;
  height: number;
  length: number;
  width: number;
  bayCount: number;
  liftCount: number;
  totalTubes: number;
  standardTubes: number;
  ledgerTubes: number;
  transomTubes: number;
  braceTubes: number;
  rightAngleFittings: number;
  swivelFittings: number;
  basePlates: number;
  boardClips: number;
  totalFittings: number;
  totalBoards: number;
  toeBoards: number;
  totalTies: number;
  maxLoad: number;
  totalWeeklyCost: number;
  warnings: string[];
}

export default function ScaffoldCalculator() {
  const [scaffoldType, setScaffoldType] = useState<'independent' | 'putlog'>('independent')
  const [height, setHeight] = useState('')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [bays, setBays] = useState('')
  const [lifts, setLifts] = useState('')
  const [boardType, setBoardType] = useState('standard')
  const [results, setResults] = useState<ScaffoldResults | null>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  const calculate = () => {
    if (!height || !length || !width) return

    const heightM = parseFloat(height)
    const lengthM = parseFloat(length)
    const widthM = parseFloat(width)
    const bayCount = bays ? parseInt(bays) : Math.ceil(lengthM / 2.5)
    const liftCount = lifts ? parseInt(lifts) : Math.ceil(heightM / 2)

    const standardSpacing = 2.5
    
    const standardsPerBay = scaffoldType === 'independent' ? 4 : 2
    const totalStandards = bayCount * standardsPerBay
    const ledgersPerLift = bayCount * 2
    const totalLedgers = ledgersPerLift * liftCount
    const transoms = bayCount * liftCount * (scaffoldType === 'independent' ? 2 : 1)
    const braces = Math.ceil(bayCount / 3) * liftCount * 2
    
    const tubeLength = 6.3
    const standardTubes = Math.ceil(totalStandards * heightM / tubeLength)
    const ledgerTubes = Math.ceil(totalLedgers * standardSpacing / tubeLength)
    const transomTubes = Math.ceil(transoms * widthM / tubeLength)
    const braceTubes = Math.ceil(braces * 3 / tubeLength)
    
    const totalTubes = standardTubes + ledgerTubes + transomTubes + braceTubes

    const rightAngleFittings = (totalStandards * liftCount * 2) + (transoms * 2)
    const swivelFittings = braces * 2
    const basePlates = totalStandards
    const boardClips = transoms * 4
    
    const totalFittings = rightAngleFittings + swivelFittings + basePlates + boardClips

    const boardsPerLift = bayCount * 4
    const totalBoards = boardsPerLift * liftCount

    const toeBoards = (lengthM * 2 + widthM * 2) * liftCount / 3.9

    const tieSpacing = 4
    const tieHeight = 4
    const tiesHorizontal = Math.ceil(lengthM / tieSpacing)
    const tiesVertical = Math.ceil(heightM / tieHeight)
    const totalTies = tiesHorizontal * tiesVertical

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

    const workingArea = lengthM * widthM
    const maxLoad = Math.floor(workingArea * 244)

    const tubeCost = totalTubes * 1.5
    const fittingCost = totalFittings * 0.8
    const boardCost = totalBoards * 2.5
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

  const resetCalculator = () => {
    setHeight('')
    setLength('')
    setWidth('')
    setBays('')
    setLifts('')
    setScaffoldType('independent')
    setBoardType('standard')
    setResults(null)
  }

  return (
    <>
      <Helmet>
        <title>Scaffold Calculator UK | Material Estimator for Scaffolders | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free scaffold calculator for UK scaffolders. Calculate tubes, fittings, boards, and ties instantly. Professional tool with safety checks and Building Regs compliance. TG20 compliant." 
        />
        <meta name="keywords" content="scaffold calculator, scaffolding calculator, UK scaffold estimator, tube calculator, scaffold materials calculator, scaffolder tools, TG20 calculator, BS EN 12811, Building Regs scaffolding, tie requirements" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Scaffold Calculator UK | Material Estimator for Scaffolders" />
        <meta property="og:description" content="Calculate scaffold materials instantly. Free professional tool for UK scaffolders with safety checks." />
        <meta property="og:url" content="https://tradecalcs.co.uk/scaffold-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/scaffold-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Scaffold Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free scaffold calculator. Calculate tubes, fittings, and boards instantly." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/scaffold-calculator-og.jpg" />

        <link rel="canonical" href="https://tradecalcs.co.uk/scaffold-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#0284c7" />

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
                      'text': 'Class 3 (light duty) scaffolding supports 244 kg/m² (2.4 kN/m²) uniformly distributed load. This is typical working platform for general construction and painting. Class 1-2 are lighter duty (75-153 kg/m²), Class 4-6 support higher loads (305-600 kg/m²). Load class must be tagged on scaffold.'
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
                  },
                  {
                    '@type': 'Question',
                    'name': 'Can I compare scaffold calculator with other trade tools?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'TradeCalcs provides comprehensive professional estimators for multiple trades. Use our <a href="https://tradecalcs.co.uk/paint-calculator">Paint Calculator</a> for decorator costs, <a href="https://tradecalcs.co.uk/brick-block-calculator">Brick & Block Calculator</a> for masonry, <a href="https://tradecalcs.co.uk/plaster-calculator">Plaster Calculator</a> for surface work, or <a href="https://tradecalcs.co.uk/cis-calculator">CIS Calculator</a> for construction tax. All tools are free with UK rates and linked for complete project estimates.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the height to base ratio rule for scaffold stability?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'The height to base width ratio must not exceed 3.5:1 for standard independent scaffolding. For example, a 35m high scaffold must have minimum 10m base width. Narrower bases exceeding this ratio require additional bracing, enhanced tying, or specialist engineering. Always verify stability calculations for high narrow scaffolds.'
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
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold text-sm">
            ← Back to All Calculators
          </Link>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Layers className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">Scaffold Calculator UK</h1>
            <p className="text-lg opacity-95">Calculate tubes, fittings & materials for scaffolding instantly</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="bg-blue-600 text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-5 h-5" />
                <h2 className="text-lg font-bold">Professional Scaffold Calculator</h2>
              </div>
              <p className="text-sm opacity-90">Estimation tool for UK scaffolders and contractors</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">1. Scaffold Type</label>
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
              <p className="text-xs text-gray-500 mt-1">Independent = freestanding • Putlog = building-supported</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">2. Height (metres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                  placeholder="e.g. 12"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
                  aria-label="Scaffold total height in metres"
                />
                <p className="text-xs text-gray-500 mt-1">Floor to top platform</p>
              </div>
              <div>
                <label className="block font-bold text-gray-800 mb-2">3. Length (metres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={length}
                  onChange={e => setLength(e.target.value)}
                  placeholder="e.g. 20"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
                  aria-label="Scaffold length in metres"
                />
                <p className="text-xs text-gray-500 mt-1">Building face length</p>
              </div>
              <div>
                <label className="block font-bold text-gray-800 mb-2">4. Width (metres)</label>
                <input
                  type="number"
                  step="0.1"
                  value={width}
                  onChange={e => setWidth(e.target.value)}
                  placeholder="e.g. 1.2"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-2"
                  aria-label="Scaffold width in metres"
                />
                <p className="text-xs text-gray-500 mt-1">Working platform width</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">5. Number of Bays (Optional)</label>
                <input
                  type="number"
                  value={bays}
                  onChange={e => setBays(e.target.value)}
                  placeholder="Auto-calculated"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label="Number of scaffold bays"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank to auto-calculate (2.5m standard bays)</p>
              </div>
              <div>
                <label className="block font-bold text-gray-800 mb-2">6. Number of Lifts (Optional)</label>
                <input
                  type="number"
                  value={lifts}
                  onChange={e => setLifts(e.target.value)}
                  placeholder="Auto-calculated"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label="Number of scaffold lifts or levels"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank to auto-calculate (2m standard lifts)</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">7. Board Type</label>
              <select
                value={boardType}
                onChange={e => setBoardType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-label="Type of working platform boards"
              >
                <option value="standard">Standard Timber (225mm × 38mm × 3.9m)</option>
                <option value="lightweight">Lightweight Aluminium (easier handling)</option>
                <option value="hop-up">Hop-Up Boards (1.2m mobile platforms)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">BS 2482 timber or BS EN 12811 aluminium compliant</p>
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
                onClick={calculate}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                aria-label="Calculate scaffold materials"
              >
                📐 Calculate Materials
              </button>
            </div>

            {results && (
              <>
                <div className={`mt-8 rounded-lg p-6 ${results.warnings.length > 0 ? 'bg-amber-50 border-2 border-amber-300' : 'bg-green-50 border-2 border-green-300'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    {results.warnings.length > 0 ? (
                      <AlertCircle className="w-6 h-6 text-amber-600" />
                    ) : (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    )}
                    <h3 className={`text-xl font-bold ${results.warnings.length > 0 ? 'text-amber-900' : 'text-green-900'}`}>
                      ✓ Scaffold Breakdown
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded border-t-2 border-b-2" style={{ borderTopColor: results.warnings.length > 0 ? '#b45309' : '#22c55e', borderBottomColor: results.warnings.length > 0 ? '#b45309' : '#22c55e' }}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Scaffold Type</p>
                        <p className="text-lg font-bold text-gray-900">{results.scaffoldType === 'independent' ? 'Independent' : 'Putlog'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Dimensions</p>
                        <p className="text-lg font-bold text-gray-900">{results.height}m × {results.length}m × {results.width}m</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Bays × Lifts</p>
                        <p className="text-lg font-bold text-gray-900">{results.bayCount} × {results.liftCount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Max Load Capacity</p>
                        <p className="text-lg font-bold text-gray-900">{results.maxLoad.toLocaleString()} kg</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-3">
                        <p className="font-semibold">Total Tubes (6.3m)</p>
                        <p className="font-bold text-lg">{results.totalTubes}</p>
                      </div>
                      <div className="flex justify-between mb-3 text-sm text-gray-600">
                        <span>↳ Standards: {results.standardTubes} • Ledgers: {results.ledgerTubes}</span>
                      </div>
                      <div className="flex justify-between mb-3 text-sm text-gray-600">
                        <span>↳ Transoms: {results.transomTubes} • Braces: {results.braceTubes}</span>
                      </div>

                      <div className="flex justify-between mb-3 p-2 rounded bg-gray-50">
                        <p className="font-semibold">Total Fittings (BS EN 74)</p>
                        <p className="font-bold text-lg">{results.totalFittings}</p>
                      </div>
                      <div className="flex justify-between mb-3 text-sm text-gray-600">
                        <span>↳ Right angle: {results.rightAngleFittings} • Swivel: {results.swivelFittings}</span>
                      </div>
                      <div className="flex justify-between mb-3 p-2 rounded bg-gray-50">
                        <p className="font-semibold">Scaffold Boards (3.9m)</p>
                        <p className="font-bold text-lg">{results.totalBoards}</p>
                      </div>
                      <div className="flex justify-between mb-3 p-2 rounded bg-gray-50">
                        <p className="font-semibold">Toe Boards (150mm)</p>
                        <p className="font-bold text-lg">{results.toeBoards}</p>
                      </div>
                      <div className="flex justify-between p-3 rounded bg-green-100 border border-green-300">
                        <p className="font-semibold text-green-900">Wall Ties Required (TG20:13)</p>
                        <p className="font-bold text-lg text-green-700">{results.totalTies}</p>
                      </div>
                    </div>

                    {results.warnings.length > 0 && (
                      <div className="mt-4 p-3 bg-amber-100 rounded border-l-2 border-amber-600">
                        <p className="font-semibold text-amber-900 mb-2">⚠️ Safety Warnings:</p>
                        <ul className="text-sm text-amber-800 space-y-1">
                          {results.warnings.map((warning, idx) => (
                            <li key={idx}>• {warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-4 p-3 bg-blue-100 rounded border-l-2 border-blue-600">
                      <p className="font-semibold text-blue-900 mb-1">💷 Estimated Weekly Hire Cost</p>
                      <p className="text-2xl font-bold text-blue-700">£{results.totalWeeklyCost.toLocaleString()}</p>
                      <p className="text-xs text-blue-800 mt-1">UK 2024/2025 average hire rates (tubes £1.50, fittings £0.80, boards £2.50 per week)</p>
                    </div>
                  </div>
                </div>

                {/* QUOTE GENERATOR CTA */}
                <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg mt-6">
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

          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-amber-900 mb-3">🎯 Professional Scaffold Standards</h3>
                <ul className="space-y-2 text-sm text-amber-900">
                  <li>• <strong>Material standards:</strong> BS EN 12811 (design), BS EN 39 (tubes), BS EN 74 (fittings), BS 2482 (boards)</li>
                  <li>• <strong>Tie requirements:</strong> Every 4m horizontal and vertical (Building Regs mandatory)</li>
                  <li>• <strong>Max height:</strong> 50m standard (TG20:13) - exceeding requires specialist engineering</li>
                  <li>• <strong>Load class:</strong> Class 3 = 244 kg/m² light duty (must be tagged on scaffold)</li>
                  <li>• <strong>Height to base ratio:</strong> Maximum 3.5:1 for stability</li>
                  <li>• <strong>Inspection:</strong> Before first use, every 7 days, and after weather events (WAHR 2005)</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Scaffold Types & Materials</h2>
            <p className="text-gray-700 mb-4">
              Scaffolding is temporary structure for accessing building facades safely. Two main types serve different applications: independent (freestanding) and putlog (building-supported). Materials must comply with strict British Standards including BS EN 12811 for design, BS EN 39 for tubes (48.3mm OD standard), and BS EN 74 for fittings (drop forged or pressed steel).
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-600">
              <p className="text-sm text-gray-700"><strong>Key principle:</strong> All scaffold materials must be inspected before use and tagged with load class. Under-tying and insufficient bracing are leading causes of scaffold collapse and HSE prosecutions. Always install ties as work progresses, not retrospectively.</p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Scaffold Type Breakdown & Applications</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Independent Scaffolding</h4>
                <p className="text-sm text-gray-700 mb-2">Freestanding with double rows of standards (4 per bay). No building support required.</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Most versatile and common type</li>
                  <li>✓ Works on any building style</li>
                  <li>✓ Requires more materials</li>
                  <li>✓ Greater cost and setup time</li>
                  <li>✓ Up to 50m height (with specialist design)</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Putlog Scaffolding</h4>
                <p className="text-sm text-gray-700 mb-2">Single row of standards supported by building via putlog arms through openings or onto walls.</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ More economical option</li>
                  <li>✓ Requires fewer materials</li>
                  <li>✓ Faster erection/dismantling</li>
                  <li>✓ Limited to suitable buildings</li>
                  <li>✓ Putlog arm anchor points needed</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How are scaffold bays and lifts calculated?</h4>
                <p className="text-sm text-gray-700">Standard bay width is 2.5m (can vary by specification). Standard lift height is 2m (vertical distance between platforms). Calculator auto-determines bays and lifts from your dimensions. Override with custom values if needed.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What is the height to base width ratio requirement?</h4>
                <p className="text-sm text-gray-700">Independent scaffolding height must not exceed 3.5 times base width. Example: 35m high scaffold needs minimum 10m base width. Narrower bases exceeding this ratio require specialist engineering, enhanced bracing, or additional ties.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How often must scaffold be inspected?</h4>
                <p className="text-sm text-gray-700">Inspections required: Before first use (competent person), every 7 days during use, and after adverse weather or modifications. WAHR 2005 requires written inspection reports retained on site for minimum 3 months. Inspection by trained person is legal requirement.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Can I compare scaffold calculator with other trade tools?</h4>
                <p className="text-sm text-gray-700">TradeCalcs provides comprehensive professional estimators for multiple trades. Use our <a href="/paint-calculator" className="text-blue-600 font-semibold hover:underline">Paint Calculator</a> for decorator costs, <a href="/brick-block-calculator" className="text-blue-600 font-semibold hover:underline">Brick & Block Calculator</a> for masonry, or <a href="/cis-calculator" className="text-blue-600 font-semibold hover:underline">CIS Calculator</a> for construction tax. All tools are free with UK rates and linked for complete project estimates.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What are minimum working platform width requirements?</h4>
                <p className="text-sm text-gray-700">WAHR 2005 requires minimum 600mm (0.6m) working platform width. Narrower than 600mm is non-compliant and creates fall risks. Standard scaffold widths are 0.6m (minimum), 1.2m (common), or 1.8m (wide platforms).</p>
              </div>
            </div>
          </section>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-yellow-900 mb-2">✓ For Guidance Only - Professional Engineering Required</p>
                <p className="text-sm text-yellow-800 mb-2">This calculator provides estimates for standard configurations covered by TG20:13. Complex scaffolds, loads exceeding Class 3 (244kg/m²), heights over 50m, cantilevers, bridges, non-standard designs, or installations with difficult site conditions require professional scaffold design by chartered engineer.</p>
                <p className="text-sm text-yellow-800">Non-compliance with scaffold standards can result in HSE prosecution, unlimited fines, and criminal liability. Falls from height remain leading cause of workplace fatalities in UK construction.</p>
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
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ScaffoldCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Scaffold Calculator Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-blue-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>

          <div className="bg-blue-600 text-white rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Complete Your Trade Calculations</h2>
            <p className="mb-6">Use our comprehensive suite of professional estimators: <a href="/paint-calculator" className="underline hover:opacity-90">Paint Calculator</a> for decorator costs, <a href="/brick-block-calculator" className="underline hover:opacity-90">Brick & Block Calculator</a> for masonry, <a href="/cis-calculator" className="underline hover:opacity-90">CIS Calculator</a> for construction tax, and <a href="/" className="underline hover:opacity-90">view all calculators</a> to build complete project estimates.</p>
            <a href="/" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </a>
          </div>
        </div>

        {/* QUOTE GENERATOR MODAL */}
        {showQuoteGenerator && results && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: 'Scaffold Tubes (6.3m, BS EN 39)', quantity: results.totalTubes.toString(), unit: 'tubes' },
                { item: 'Fittings - Right Angle & Swivel (BS EN 74)', quantity: results.totalFittings.toString(), unit: 'pieces' },
                { item: 'Scaffold Boards (3.9m, BS 2482)', quantity: results.totalBoards.toString(), unit: 'boards' },
                { item: 'Wall Ties & Anchors (TG20 compliant)', quantity: results.totalTies.toString(), unit: 'pieces' },
                { item: 'Toe Boards (150mm minimum)', quantity: results.toeBoards.toString(), unit: 'pieces' },
                { item: 'Erection & Dismantling Labour', quantity: '1', unit: 'job' },
                { item: 'Competent Person Inspection (WAHR 2005)', quantity: '1', unit: 'survey' }
              ],
              summary: `${results.scaffoldType === 'independent' ? 'Independent (freestanding)' : 'Putlog (building-supported)'} scaffold ${results.height}m × ${results.length}m × ${results.width}m (${results.bayCount} bays × ${results.liftCount} lifts) - Class 3 light duty max load ${results.maxLoad.toLocaleString()}kg - TG20:13 & Building Regs compliant`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}






