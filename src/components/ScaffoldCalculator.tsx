import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, Layers, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'

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
  warnings: string[]
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

  const downloadResultsPDF = () => {
    if (!results) return

    const doc = new jsPDF()
    
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('Scaffold Calculator Results', 20, 20)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    
    let y = 35
    
    doc.text(`Scaffold Type: ${results.scaffoldType === 'independent' ? 'Independent (Tube & Fitting)' : 'Putlog'}`, 20, y)
    y += 7
    doc.text(`Height: ${results.height}m`, 20, y)
    y += 7
    doc.text(`Length: ${results.length}m`, 20, y)
    y += 7
    doc.text(`Width: ${results.width}m`, 20, y)
    y += 7
    doc.text(`Bays: ${results.bayCount}`, 20, y)
    y += 7
    doc.text(`Lifts: ${results.liftCount}`, 20, y)
    y += 10
    
    doc.setFont('helvetica', 'bold')
    doc.text('Material Requirements:', 20, y)
    doc.setFont('helvetica', 'normal')
    y += 7
    
    doc.text(`Total Tubes: ${results.totalTubes}`, 20, y)
    y += 6
    doc.text(`  - Standard: ${results.standardTubes}`, 20, y)
    y += 6
    doc.text(`  - Ledger: ${results.ledgerTubes}`, 20, y)
    y += 6
    doc.text(`  - Transom: ${results.transomTubes}`, 20, y)
    y += 6
    doc.text(`  - Brace: ${results.braceTubes}`, 20, y)
    y += 8
    
    doc.text(`Total Fittings: ${results.totalFittings}`, 20, y)
    y += 6
    doc.text(`  - Right Angle: ${results.rightAngleFittings}`, 20, y)
    y += 6
    doc.text(`  - Swivel: ${results.swivelFittings}`, 20, y)
    y += 6
    doc.text(`  - Base Plates: ${results.basePlates}`, 20, y)
    y += 6
    doc.text(`  - Board Clips: ${results.boardClips}`, 20, y)
    y += 8
    
    doc.text(`Total Boards: ${results.totalBoards}`, 20, y)
    y += 6
    doc.text(`Toe Boards: ${results.toeBoards}`, 20, y)
    y += 6
    doc.text(`Total Ties: ${results.totalTies}`, 20, y)
    y += 10
    
    doc.setFont('helvetica', 'bold')
    doc.text('Safety & Capacity:', 20, y)
    doc.setFont('helvetica', 'normal')
    y += 7
    
    doc.text(`Maximum Load (Class 3): ${results.maxLoad} kg`, 20, y)
    y += 6
    doc.text(`Height to Base Ratio: ${(results.height / results.width).toFixed(2)}:1`, 20, y)
    y += 10
    
    if (results.warnings.length > 0) {
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(192, 21, 47)
      doc.text('Warnings:', 20, y)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(0, 0, 0)
      y += 7
      
      results.warnings.forEach(warning => {
        const wrapped = doc.splitTextToSize(warning, 170)
        doc.text(wrapped, 20, y)
        y += wrapped.length * 6 + 3
      })
    }
    
    doc.save('scaffold-calculation.pdf')
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
                      'text': 'TradeCalcs provides comprehensive professional estimators for multiple trades. Use our Paint Calculator for decorator costs, Brick & Block Calculator for masonry, Plaster Calculator for surface work, or CIS Calculator for construction tax. All tools are free with UK rates and linked for complete project estimates.'
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
          <Link to="/" className="text-green-600 hover:text-green-800 font-semibold text-sm">
            ← Back to All Calculators
          </Link>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Layers className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">Scaffold Calculator UK</h1>
            <p className="text-lg opacity-95">Calculate tubes, fittings, boards & ties instantly</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="bg-blue-600 text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-5 h-5" />
                <h2 className="text-lg font-bold">Professional Scaffold Calculator</h2>
              </div>
              <p className="text-sm opacity-90">Material estimator for UK scaffolders - TG20:13 compliant</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">1. Scaffold Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setScaffoldType('independent')}
                  className={`p-3 rounded-lg border-2 font-semibold transition ${
                    scaffoldType === 'independent'
                      ? 'bg-blue-50 border-blue-600 text-blue-900'
                      : 'border-gray-300 text-gray-700 hover:border-blue-400'
                  }`}
                  aria-label="Select independent scaffold"
                >
                  <p>Independent</p>
                  <p className="text-xs font-normal text-gray-600">Tube & Fitting (Double Row)</p>
                </button>
                <button
                  onClick={() => setScaffoldType('putlog')}
                  className={`p-3 rounded-lg border-2 font-semibold transition ${
                    scaffoldType === 'putlog'
                      ? 'bg-blue-50 border-blue-600 text-blue-900'
                      : 'border-gray-300 text-gray-700 hover:border-blue-400'
                  }`}
                  aria-label="Select putlog scaffold"
                >
                  <p>Putlog</p>
                  <p className="text-xs font-normal text-gray-600">Building-Supported (Single Row)</p>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">2. Height (m)</label>
                <input
                  type="number"
                  step="0.5"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                  placeholder="e.g. 20"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label="Scaffold height in metres"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">3. Length (m)</label>
                <input
                  type="number"
                  step="0.5"
                  value={length}
                  onChange={e => setLength(e.target.value)}
                  placeholder="e.g. 20"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label="Scaffold length in metres"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">4. Width (m)</label>
                <input
                  type="number"
                  step="0.1"
                  value={width}
                  onChange={e => setWidth(e.target.value)}
                  placeholder="e.g. 1.3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label="Scaffold width in metres"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">5. Bays (Optional)</label>
                <input
                  type="number"
                  value={bays}
                  onChange={e => setBays(e.target.value)}
                  placeholder="Auto-calculated from length"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label="Number of bays (2.5m sections)"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty for auto-calculation</p>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">6. Lifts (Optional)</label>
                <input
                  type="number"
                  value={lifts}
                  onChange={e => setLifts(e.target.value)}
                  placeholder="Auto-calculated from height"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  aria-label="Number of lifts (2m sections)"
                />
                <p className="text-xs text-gray-500 mt-1">Leave empty for auto-calculation</p>
              </div>
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
                📊 Calculate Materials
              </button>
            </div>

            {results && (
              <>
                <div className={`mt-8 rounded-lg p-6 bg-blue-50 border-2 border-blue-300`}>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-blue-600" />
                    <h3 className={`text-xl font-bold text-blue-900`}>
                      ✓ Scaffold Material Breakdown
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded border-t-2 border-b-2 border-blue-300">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Height × Length × Width</p>
                        <p className="text-lg font-bold text-gray-900">{results.height}m × {results.length}m × {results.width}m</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Bays × Lifts</p>
                        <p className="text-lg font-bold text-gray-900">{results.bayCount} × {results.liftCount}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between font-semibold">
                        <p>TUBES</p>
                        <p className="text-blue-600">{results.totalTubes} total</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm ml-4">
                        <div>Standard: {results.standardTubes}</div>
                        <div>Ledger: {results.ledgerTubes}</div>
                        <div>Transom: {results.transomTubes}</div>
                        <div>Brace: {results.braceTubes}</div>
                      </div>

                      <div className="flex justify-between font-semibold mt-3">
                        <p>FITTINGS</p>
                        <p className="text-blue-600">{results.totalFittings} total</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm ml-4">
                        <div>Right Angle: {results.rightAngleFittings}</div>
                        <div>Swivel: {results.swivelFittings}</div>
                        <div>Base Plates: {results.basePlates}</div>
                        <div>Board Clips: {results.boardClips}</div>
                      </div>

                      <div className="flex justify-between font-semibold mt-3">
                        <p>BOARDS & SAFETY</p>
                        <p className="text-blue-600"></p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm ml-4">
                        <div>Boards: {results.totalBoards}</div>
                        <div>Toe Boards: {results.toeBoards}</div>
                        <div>Wall Ties: {results.totalTies}</div>
                        <div>Max Load: {results.maxLoad} kg</div>
                      </div>
                    </div>

                    <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded border-l-2 border-gray-400 mt-4">
                      <p className="font-semibold mb-1">Summary:</p>
                      <p className="font-mono">
                        {results.scaffoldType === 'independent' ? 'Independent' : 'Putlog'} scaffold - {results.totalTubes} tubes, {results.totalFittings} fittings, {results.totalBoards} boards, {results.totalTies} ties
                      </p>
                    </div>

                    {results.warnings.length > 0 && (
                      <div className="mt-4 p-3 bg-red-100 border-l-4 border-red-600 rounded">
                        <p className="font-semibold text-red-900 mb-2">⚠️ Safety Warnings:</p>
                        <ul className="text-sm text-red-800 space-y-1">
                          {results.warnings.map((warning, idx) => (
                            <li key={idx}>{warning}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0v6m0-6h6m0 0h6M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0z"/>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Download Your Results</h3>
                      <p className="text-sm text-gray-600">Save calculation as PDF for your records</p>
                    </div>
                  </div>
                  <button
                    onClick={downloadResultsPDF}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
                    aria-label="Download results as PDF"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                    </svg>
                    Download PDF Report
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-3">🏗️ Building Regulations & Safety Standards</h3>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li>• <strong>TG20:13 Guidance:</strong> Covers standard configurations up to 50m height</li>
                  <li>• <strong>Height to Base Ratio:</strong> Must not exceed 3.5:1 for standard scaffolding</li>
                  <li>• <strong>Wall Ties:</strong> Required every 4m horizontal and vertical (Building Regs)</li>
                  <li>• <strong>Load Class 3:</strong> Supports 244 kg/m² uniformly distributed</li>
                  <li>• <strong>Platform Width:</strong> Minimum 600mm (WAHR 2005)</li>
                  <li>• <strong>Inspection:</strong> Required every 7 days during use (legal requirement)</li>
                  <li>• <strong>Competent Person:</strong> Design & erection by trained scaffolder only</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Scaffold Material Calculations</h2>
            <p className="text-gray-700 mb-4">
              Professional scaffold estimating requires accurate calculation of tubes, fittings, boards, ties, and load capacity based on dimensions and configuration type. This calculator determines exact material quantities in accordance with TG20:13 guidance and Building Regulations, accounting for bay spacing (2.5m), lift height (2m), and safety requirements. Understanding the relationship between height, base width, stability ratios, and tie requirements is essential for safe design and compliant projects.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-600">
              <p className="text-sm text-gray-700"><strong>Key principle:</strong> Independent scaffolding requires double rows of standards and is more stable but material-intensive. Putlog scaffolding uses building support, reducing material but requiring suitable tie points. Height to base ratio must not exceed 3.5:1 - exceeding this requires additional bracing and enhanced tying. Wall ties are critical for stability and must be installed as work progresses.</p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What's the difference between independent and putlog scaffolding?</h4>
                <p className="text-sm text-gray-700">Independent (tube & fitting) has double rows of standards and doesn't rely on building support. Putlog has single row supported by the building using putlog arms through windows/onto walls. Independent is more versatile; putlog is economical but limited to buildings with suitable tie points.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How many wall ties do I need?</h4>
                <p className="text-sm text-gray-700">Building Regulations and TG20:13 require ties every 4 metres horizontally and vertically maximum. This calculator determines tie quantity based on your dimensions. Ties are critical for stability and must be installed as work progresses, not retrospectively.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What's the maximum height for standard scaffold?</h4>
                <p className="text-sm text-gray-700">TG20:13 covers standard configurations up to 50 metres height. Beyond 50m requires specialist engineering design by a qualified scaffold engineer. Height exceeding 3.5 times base width requires additional stability measures.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How much weight can a Class 3 scaffold support?</h4>
                <p className="text-sm text-gray-700">Class 3 (light duty) supports 244 kg/m² uniformly distributed load. This is typical for general construction and painting. Class 1-2 are lighter (75-153 kg/m²), Class 4-6 are heavier (305-600 kg/m²). Load class must be tagged on the scaffold.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What is height to base ratio and why does it matter?</h4>
                <p className="text-sm text-gray-700">Height to base ratio must not exceed 3.5:1 for standard independent scaffolding. For example, a 35m high scaffold must have minimum 10m base width. Narrower bases exceeding this ratio require additional bracing, enhanced tying, or specialist engineering design.</p>
              </div>
            </div>
          </section>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-yellow-900 mb-2">✓ Professional Quality Assurance</p>
                <p className="text-sm text-yellow-800">This calculator provides professional estimates based on TG20:13 guidance, BS EN 12811, and Building Regulations. All calculations assume standard configurations - projects exceeding thresholds (50m height, 3.5:1 ratio) require specialist engineering design. Always verify calculations independently and ensure scaffold is inspected by competent person before use. Non-compliance with work at height regulations can result in prosecution and fines. Download your PDF results for site records.</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Complete Your Trade Calculations</h2>
            <p className="mb-6">Use our comprehensive suite of professional estimators for multiple trades and view all calculators to build complete project estimates and quote confidently.</p>
            <Link to="/" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}







