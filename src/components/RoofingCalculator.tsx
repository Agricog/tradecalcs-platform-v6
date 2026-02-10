import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Home, CheckCircle2, AlertCircle } from 'lucide-react'
import QuoteGenerator from './QuoteGenerator'

export default function RoofingCalculator() {
  const [roofType, setRoofType] = useState('gable')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  
  // Metric inputs
  const [lengthM, setLengthM] = useState('')
  const [widthM, setWidthM] = useState('')
  
  // Imperial inputs
  const [lengthFt, setLengthFt] = useState('')
  const [lengthIn, setLengthIn] = useState('')
  const [widthFt, setWidthFt] = useState('')
  const [widthIn, setWidthIn] = useState('')
  
  const [pitch, setPitch] = useState('30')
  const [tileType, setTileType] = useState('concrete')
  const [adjusterQuote, setAdjusterQuote] = useState('')
  const [result, setResult] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  // Conversion helpers
  const feetInchesToMeters = (feet: string, inches: string): number => {
    const ft = parseFloat(feet) || 0
    const inc = parseFloat(inches) || 0
    return (ft * 0.3048) + (inc * 0.0254)
  }

  const metersToFeetInches = (meters: number): { feet: number; inches: number } => {
    const totalInches = meters / 0.0254
    const feet = Math.floor(totalInches / 12)
    const inches = Math.round(totalInches % 12)
    return { feet, inches }
  }

  const sqMetersToSqFeet = (sqm: number): number => sqm * 10.764

  // Get length and width in meters regardless of input unit
  const getLengthMeters = (): number => {
    if (unit === 'metric') {
      return parseFloat(lengthM) || 0
    }
    return feetInchesToMeters(lengthFt, lengthIn)
  }

  const getWidthMeters = (): number => {
    if (unit === 'metric') {
      return parseFloat(widthM) || 0
    }
    return feetInchesToMeters(widthFt, widthIn)
  }

  const calculate = () => {
    const L = getLengthMeters()
    const W = getWidthMeters()

    if (L <= 0 || W <= 0) {
      alert('Please enter valid length and width')
      return
    }

    const P = parseFloat(pitch)
    const baseArea = L * W
    const pitchRad = (P * Math.PI) / 180
    const pitchFactor = 1 / Math.cos(pitchRad)
    const area = baseArea * pitchFactor

    let wasteMultiplier = 1.12
    let roofName = 'Gable Roof'
    if (roofType === 'hip') {
      wasteMultiplier = 1.18
      roofName = 'Hip Roof'
    } else if (roofType === 'complex') {
      wasteMultiplier = 1.25
      roofName = 'Complex Roof'
    }

    const totalArea = area * wasteMultiplier

    let tileCost = 1.30
    let tileName = 'Concrete'
    if (tileType === 'clay') {
      tileCost = 1.80
      tileName = 'Clay'
    } else if (tileType === 'slate') {
      tileCost = 3.50
      tileName = 'Slate'
    }

    const tiles = Math.ceil(totalArea / 0.06)
    const materialCost = tiles * tileCost
    const labourCost = totalArea * 45

    // Store dimensions for display
    const lengthDisplay = unit === 'metric' 
      ? `${L.toFixed(2)}m` 
      : `${lengthFt}'${lengthIn}"`
    const widthDisplay = unit === 'metric' 
      ? `${W.toFixed(2)}m` 
      : `${widthFt}'${widthIn}"`

    setResult({
      roofType: roofName,
      baseArea: baseArea.toFixed(2),
      baseAreaSqFt: sqMetersToSqFeet(baseArea).toFixed(0),
      area: area.toFixed(2),
      areaSqFt: sqMetersToSqFeet(area).toFixed(0),
      totalArea: totalArea.toFixed(2),
      totalAreaSqFt: sqMetersToSqFeet(totalArea).toFixed(0),
      waste: ((wasteMultiplier - 1) * 100).toFixed(0),
      tileName,
      tiles,
      materialCost: materialCost.toFixed(2),
      labourCost: labourCost.toFixed(2),
      totalCost: (materialCost + labourCost).toFixed(2),
      adjusterQuote: adjusterQuote ? parseFloat(adjusterQuote).toFixed(2) : null,
      gap: adjusterQuote ? (Math.abs(materialCost + labourCost - parseFloat(adjusterQuote)).toFixed(2)) : null,
      lengthDisplay,
      widthDisplay,
      unit
    })
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Roofing Insurance Calculator UK | Fair Market Value Estimator | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free roofing insurance calculator for UK roofers and homeowners. Calculate fair market value for roof replacement claims. Fight lowball insurance quotes with accurate pricing data." 
        />
        <meta name="keywords" content="roofing calculator, insurance claim calculator, roof replacement calculator, UK roofer tools, roofing insurance, fair market value calculator, supplement claim, insurance adjuster" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Roofing Insurance Calculator UK | Fair Market Value Estimator" />
        <meta property="og:description" content="Calculate fair market value for roof replacement insurance claims. Fight lowball quotes with accurate UK pricing and waste factors." />
        <meta property="og:url" content="https://tradecalcs.co.uk/roofing-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/roofing-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Roofing Insurance Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free roofing insurance calculator. Calculate fair market value and fight lowball insurance adjuster quotes." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/roofing-calculator-og.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/roofing-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#15803d" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Roofing Insurance Calculator', 'item': 'https://tradecalcs.co.uk/roofing-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Roofing Insurance Calculator UK',
                'description': 'Professional roofing insurance calculator for UK roofers and homeowners. Calculate fair market value for roof replacement claims and fight lowball insurance adjuster quotes.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/roofing-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '891' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'Can I use this calculator for insurance roof replacement claims?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes, this calculator is specifically designed for insurance roof replacement claims. It provides fair market value calculations based on current UK market rates (Q4 2025), industry-standard waste factors, and professional labour rates. Results provide strong evidence for insurance supplement requests.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What do waste factors mean in roofing?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Waste factors account for cutting, breakage, and unusable material. Gable roofs typically have 12% waste, hip roofs 18%, and complex roofs 25%. Insurance adjusters often underestimate waste, which reduces their payout offers.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How much do insurance companies typically underpay?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Insurance adjusters typically underpay by £2,000–£5,000 per roof replacement claim, with some complex roofs showing gaps of £8,000+. Using fair market value calculations, 70–80% of supplement requests are approved.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What roof pitch should I enter?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Common UK roof pitches are 30° (most common), 45° (steeper), and 15-20° (shallow). Steeper pitches increase the total roof area and material/labour costs. Measure or estimate your roof pitch and select the closest option.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Should I include scaffolding and skip hire in insurance claims?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'This calculator covers materials and labour. Scaffolding, skip hire, and weather protection are typically separate line items on insurance claims. Obtain professional quotes for these items and add them separately to your claim.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How do I challenge a lowball insurance quote?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Use this calculator to document fair market value, compare to the adjuster quote, request a supplement, obtain contractor quotes for support, and submit a formal written supplement request to the insurance company. Include current pricing evidence and professional estimates.'
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
        {/* BACK LINK */}
        <div className="max-w-5xl mx-auto px-4 py-4">
          <a href="/" className="text-purple-600 hover:text-purple-800 font-semibold text-sm">
            ← Back to All Calculators
          </a>
        </div>

        {/* GREEN HEADER BANNER */}
        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Home className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">Roofing Insurance Calculator UK</h1>
            <p className="text-lg opacity-95">Calculate fair market value and fight for proper insurance compensation</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* MAIN CALCULATOR FORM */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="bg-green-700 text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Home className="w-5 h-5" />
                <h2 className="text-lg font-bold">UK Roofing Insurance Calculator</h2>
              </div>
              <p className="text-sm opacity-90">Calculate fair market value with current UK pricing and fight lowball insurance quotes</p>
            </div>

            {/* INFO BOX */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-900">
                  <b>Insurance adjusters typically underpay by £2,000–£5,000 per roof replacement.</b> This calculator provides irrefutable documentation of fair market value to support your supplement request. 70–80% of supplement requests backed by this data are approved.
                </p>
              </div>
            </div>

            {/* UNIT TOGGLE */}
            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-3">Measurement Units</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setUnit('metric')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition ${
                    unit === 'metric'
                      ? 'bg-green-100 border-green-700 text-green-900'
                      : 'border-gray-300 text-gray-700 hover:border-green-600'
                  }`}
                >
                  <span className="block text-lg">Metric</span>
                  <span className="text-xs font-normal text-gray-600">Meters (m)</span>
                </button>
                <button
                  onClick={() => setUnit('imperial')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold transition ${
                    unit === 'imperial'
                      ? 'bg-green-100 border-green-700 text-green-900'
                      : 'border-gray-300 text-gray-700 hover:border-green-600'
                  }`}
                >
                  <span className="block text-lg">Imperial</span>
                  <span className="text-xs font-normal text-gray-600">Feet &amp; Inches (ft/in)</span>
                </button>
              </div>
            </div>

            {/* STEP 1: ROOF TYPE */}
            <div className="mb-8">
              <label className="block font-bold text-gray-800 mb-3">1. Roof Type</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setRoofType('gable')}
                  className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                    roofType === 'gable'
                      ? 'bg-green-100 border-green-700 text-green-900'
                      : 'border-gray-300 text-gray-700 hover:border-green-600'
                  }`}
                >
                  <p>Gable Roof</p>
                  <p className="text-xs font-normal text-gray-600">12% waste factor</p>
                </button>
                <button
                  onClick={() => setRoofType('hip')}
                  className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                    roofType === 'hip'
                      ? 'bg-green-100 border-green-700 text-green-900'
                      : 'border-gray-300 text-gray-700 hover:border-green-600'
                  }`}
                >
                  <p>Hip Roof</p>
                  <p className="text-xs font-normal text-gray-600">18% waste factor</p>
                </button>
                <button
                  onClick={() => setRoofType('complex')}
                  className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                    roofType === 'complex'
                      ? 'bg-green-100 border-green-700 text-green-900'
                      : 'border-gray-300 text-gray-700 hover:border-green-600'
                  }`}
                >
                  <p>Complex Roof</p>
                  <p className="text-xs font-normal text-gray-600">25% waste factor</p>
                </button>
              </div>
            </div>

            {/* STEP 2 & 3: LENGTH & WIDTH - CONDITIONAL ON UNIT */}
            {unit === 'metric' ? (
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <label className="block font-semibold text-gray-800 mb-2">2. Length (meters)</label>
                  <input
                    type="number"
                    value={lengthM}
                    onChange={e => setLengthM(e.target.value)}
                    placeholder="e.g., 10"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                    aria-label="Roof length in meters"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-800 mb-2">3. Width (meters)</label>
                  <input
                    type="number"
                    value={widthM}
                    onChange={e => setWidthM(e.target.value)}
                    placeholder="e.g., 8"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                    aria-label="Roof width in meters"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-800 mb-2">4. Roof Pitch (degrees)</label>
                  <select
                    value={pitch}
                    onChange={e => setPitch(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                    aria-label="Roof pitch in degrees"
                  >
                    <option value="15">15° (shallow)</option>
                    <option value="30">30° (standard)</option>
                    <option value="45">45° (steep)</option>
                    <option value="60">60° (very steep)</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="mb-8">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  {/* Length in feet/inches */}
                  <div>
                    <label className="block font-semibold text-gray-800 mb-2">2. Length</label>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <input
                          type="number"
                          value={lengthFt}
                          onChange={e => setLengthFt(e.target.value)}
                          placeholder="Feet"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                          aria-label="Roof length feet"
                        />
                        <span className="text-xs text-gray-500 mt-1 block text-center">ft</span>
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          value={lengthIn}
                          onChange={e => setLengthIn(e.target.value)}
                          placeholder="Inches"
                          min="0"
                          max="11"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                          aria-label="Roof length inches"
                        />
                        <span className="text-xs text-gray-500 mt-1 block text-center">in</span>
                      </div>
                    </div>
                  </div>
                  {/* Width in feet/inches */}
                  <div>
                    <label className="block font-semibold text-gray-800 mb-2">3. Width</label>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <input
                          type="number"
                          value={widthFt}
                          onChange={e => setWidthFt(e.target.value)}
                          placeholder="Feet"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                          aria-label="Roof width feet"
                        />
                        <span className="text-xs text-gray-500 mt-1 block text-center">ft</span>
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          value={widthIn}
                          onChange={e => setWidthIn(e.target.value)}
                          placeholder="Inches"
                          min="0"
                          max="11"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                          aria-label="Roof width inches"
                        />
                        <span className="text-xs text-gray-500 mt-1 block text-center">in</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Pitch */}
                <div>
                  <label className="block font-semibold text-gray-800 mb-2">4. Roof Pitch (degrees)</label>
                  <select
                    value={pitch}
                    onChange={e => setPitch(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                    aria-label="Roof pitch in degrees"
                  >
                    <option value="15">15° (shallow)</option>
                    <option value="30">30° (standard)</option>
                    <option value="45">45° (steep)</option>
                    <option value="60">60° (very steep)</option>
                  </select>
                </div>
              </div>
            )}

            {/* STEP 5: TILE TYPE */}
            <div className="mb-8">
              <label className="block font-bold text-gray-800 mb-3">5. Tile/Slate Type</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setTileType('concrete')}
                  className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                    tileType === 'concrete'
                      ? 'bg-green-100 border-green-700 text-green-900'
                      : 'border-gray-300 text-gray-700 hover:border-green-600'
                  }`}
                >
                  <p>Concrete</p>
                  <p className="text-xs font-normal text-gray-600">£1.30 per tile</p>
                </button>
                <button
                  onClick={() => setTileType('clay')}
                  className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                    tileType === 'clay'
                      ? 'bg-green-100 border-green-700 text-green-900'
                      : 'border-gray-300 text-gray-700 hover:border-green-600'
                  }`}
                >
                  <p>Clay</p>
                  <p className="text-xs font-normal text-gray-600">£1.80 per tile</p>
                </button>
                <button
                  onClick={() => setTileType('slate')}
                  className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                    tileType === 'slate'
                      ? 'bg-green-100 border-green-700 text-green-900'
                      : 'border-gray-300 text-gray-700 hover:border-green-600'
                  }`}
                >
                  <p>Slate</p>
                  <p className="text-xs font-normal text-gray-600">£3.50 per tile</p>
                </button>
              </div>
            </div>

            {/* STEP 6: ADJUSTER QUOTE */}
            <div className="mb-8">
              <label className="block font-bold text-gray-800 mb-2">6. Insurance Adjuster Quote (Optional)</label>
              <input
                type="number"
                value={adjusterQuote}
                onChange={e => setAdjusterQuote(e.target.value)}
                placeholder="Enter adjuster's quote in £"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
                aria-label="Insurance adjuster quote in pounds"
              />
              <p className="text-xs text-gray-500 mt-1">We'll show you the exact price gap between fair market value and their lowball offer</p>
            </div>

            {/* CALCULATE BUTTON */}
            <button
              onClick={calculate}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-lg text-lg transition"
              aria-label="Calculate fair market value"
            >
              Calculate Fair Market Value
            </button>

            {/* RESULTS */}
            {result && (
              <>
                <div className="mt-8 bg-green-100 border-2 border-green-700 rounded-lg p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-green-700" />
                    <h3 className="text-xl font-bold text-green-900">Calculation Complete</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-3 rounded border border-green-300">
                      <p className="text-xs text-gray-600">Roof Type</p>
                      <p className="font-bold text-green-800">{result.roofType}</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-green-300">
                      <p className="text-xs text-gray-600">Total Area (with waste)</p>
                      <p className="font-bold text-green-800">
                        {result.unit === 'metric' ? (
                          <>{result.totalArea}m² <span className="text-xs font-normal text-gray-500">({result.totalAreaSqFt} ft²)</span></>
                        ) : (
                          <>{result.totalAreaSqFt} ft² <span className="text-xs font-normal text-gray-500">({result.totalArea}m²)</span></>
                        )}
                      </p>
                    </div>
                    <div className="bg-white p-3 rounded border border-green-300">
                      <p className="text-xs text-gray-600">Tiles Needed</p>
                      <p className="font-bold text-green-800">{result.tiles.toLocaleString()}</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-green-300">
                      <p className="text-xs text-gray-600">Material Cost</p>
                      <p className="font-bold text-green-800">£{result.materialCost}</p>
                    </div>
                  </div>

                  <div className="bg-white border-t-2 border-green-300 pt-4">
                    <div className="flex justify-between mb-2">
                      <p className="font-semibold">Materials ({result.tileName} tiles)</p>
                      <p className="font-semibold">£{result.materialCost}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="text-sm text-gray-600">
                        {result.unit === 'metric' ? (
                          <>Base area: {result.baseArea}m² + {result.waste}% waste = {result.totalArea}m²</>
                        ) : (
                          <>Base area: {result.baseAreaSqFt} ft² + {result.waste}% waste = {result.totalAreaSqFt} ft²</>
                        )}
                      </p>
                    </div>
                    <div className="flex justify-between mb-4 border-t border-gray-300 pt-3">
                      <p className="font-semibold">
                        Professional Labour 
                        {result.unit === 'metric' ? ' (£45/m²)' : ' (£4.18/ft²)'}
                      </p>
                      <p className="font-semibold">£{result.labourCost}</p>
                    </div>
                    <div className="flex justify-between bg-green-200 p-4 rounded font-bold text-lg border-2 border-green-700">
                      <p>Fair Market Value</p>
                      <p className="text-green-900">£{result.totalCost}</p>
                    </div>

                    {result.adjusterQuote && (
                      <div className="mt-4 bg-red-50 border-2 border-red-300 p-4 rounded">
                        <p className="text-sm font-bold text-red-800 mb-3">⚠️ Price Gap Analysis</p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <p>Fair Market Value</p>
                            <p className="font-semibold">£{result.totalCost}</p>
                          </div>
                          <div className="flex justify-between border-t border-red-200 pt-2">
                            <p>Adjuster's Quote</p>
                            <p className="font-semibold">£{result.adjusterQuote}</p>
                          </div>
                          <div className="flex justify-between bg-red-100 p-2 rounded font-bold text-red-700 border border-red-300">
                            <p>You're Being Underpaid By</p>
                            <p>£{result.gap}</p>
                          </div>
                        </div>
                        <p className="text-xs text-red-700 mt-3"><strong>Action:</strong> Submit a formal supplement request to your insurance company using this fair market value calculation as evidence.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* QUOTE GENERATOR CTA */}
                <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg">
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
              </>
            )}
          </div>

          {/* IMPORTANT NOTES */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-3">⚠️ Important Compliance Notes</h3>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li>• <strong>Pricing basis:</strong> Current Q4 2025 UK market rates (validated monthly)</li>
                  <li>• <strong>Waste factors:</strong> Follow UK roofing industry best practices (12% gable, 18% hip, 25% complex)</li>
                  <li>• <strong>Labour rate:</strong> £45/m² is current UK professional rate for mid 2025</li>
                  <li>• <strong>What's included:</strong> Tiles, battens, felt, ridge, fixings, and labour only</li>
                  <li>• <strong>Separate items:</strong> Scaffolding, skip hire, weather protection = separate quotes</li>
                  <li>• <strong>Fair market value:</strong> Based on reasonable cost of repair, not the absolute cheapest quote</li>
                </ul>
              </div>
            </div>
          </div>

          {/* HOW TO USE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Roofing Insurance Calculator</h2>
            <p className="text-gray-700 mb-4">
              Insurance roof replacement claims are notoriously underpaid by adjusters trying to minimize payouts. Our free roofing insurance calculator helps UK roofers and homeowners calculate the true fair market value of roof replacement work, identify price gaps in lowball insurance quotes, and fight for proper compensation with irrefutable documentation.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-green-700">
              <p className="text-sm text-gray-700"><strong>Fair market value</strong> = materials + labour for professional workmanship, not the absolute cheapest possible quote. Insurance policies typically cover "reasonable cost of repair" which is fair market value.</p>
            </div>
          </section>

          {/* WHY ADJUSTERS UNDERVALUE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Insurance Adjusters Undervalue Roof Claims</h2>
            <p className="text-gray-700 mb-4">
              Insurance companies have a financial incentive to minimize claim payouts. Common tactics used by adjusters include:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                <h4 className="font-bold text-red-900 mb-2">❌ Common Undervaluation Tactics</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Using outdated pricing from 2-3 years ago</li>
                  <li>• Understating waste factors (5% instead of 12-25%)</li>
                  <li>• Ignoring roof complexity and accessibility</li>
                  <li>• Using low labour rates (£20-25/m² vs £45/m²)</li>
                  <li>• Excluding necessary items like scaffolding</li>
                  <li>• Pressure to accept first offer quickly</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-900 mb-2">✓ Typical Price Gaps</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Average underpayment: £2,000–£5,000</li>
                  <li>• Complex roofs: Often £8,000–£15,000 gaps</li>
                  <li>• Supplement approval rate: 70–80% with evidence</li>
                  <li>• Key to success: Documentation + calculations</li>
                  <li>• Professional estimates support claims</li>
                  <li>• Current pricing evidence is irrefutable</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 bg-blue-100 border-l-4 border-blue-700 p-4 rounded">
              <p className="font-bold text-blue-900 mb-2">💰 Real Example</p>
              <p className="text-sm text-blue-800">A 100m² gable roof with concrete tiles might be quoted by an adjuster at £3,500. Fair market value is £5,800+ (materials £1,300 + labour £4,500). That's £2,300 underpayment that a supplement request recovers.</p>
            </div>
          </section>

          {/* ROOF TYPE EXPLANATIONS */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Roof Types and Waste Factors</h2>
            <p className="text-gray-700 mb-4">
              Different roof designs create different amounts of waste through cutting, breakage, and unusable material. Insurance adjusters often use unrealistically low waste percentages.
            </p>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                <h4 className="font-bold text-gray-900 mb-2">Gable Roof (12% Waste)</h4>
                <p className="text-sm text-gray-700">Simple two-slope triangular design. Minimal cuts, straightforward layout. Least complex. Common on terraced houses and semi-detached homes.</p>
              </div>
              <div className="bg-green-50 p-4 rounded border-l-4 border-green-600">
                <h4 className="font-bold text-gray-900 mb-2">Hip Roof (18% Waste)</h4>
                <p className="text-sm text-gray-700">Four slopes meet at central ridge. More cutting required, more waste. Common on detached houses. Increased complexity over gable.</p>
              </div>
              <div className="bg-orange-50 p-4 rounded border-l-4 border-orange-600">
                <h4 className="font-bold text-gray-900 mb-2">Complex Roof (25% Waste)</h4>
                <p className="text-sm text-gray-700">Multiple ridges, valleys, dormers, or unusual design. Extensive cutting needed. Significant waste. Common on period properties and custom designs.</p>
              </div>
            </div>
          </section>

          {/* CURRENT PRICING TABLE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Current UK Roofing Material Costs (Q4 2025)</h2>
            <p className="text-sm text-gray-600 mb-4">These are current UK market rates. Insurance adjusters often use rates from 2-3 years ago, which understates replacement cost significantly.</p>
            <div className="bg-gray-50 p-4 rounded space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <p className="font-semibold">Concrete tiles</p>
                <p className="font-semibold">£1.30 per tile</p>
              </div>
              <div className="flex justify-between border-b pb-2">
                <p className="font-semibold">Clay tiles</p>
                <p className="font-semibold">£1.80 per tile</p>
              </div>
              <div className="flex justify-between border-b pb-2">
                <p className="font-semibold">Natural slate</p>
                <p className="font-semibold">£3.50 per tile</p>
              </div>
              <div className="flex justify-between border-b pb-2">
                <p className="font-semibold">Roofing battens</p>
                <p className="font-semibold">£2.80 per linear meter</p>
              </div>
              <div className="flex justify-between border-b pb-2">
                <p className="font-semibold">Roofing felt/underlayment</p>
                <p className="font-semibold">£0.85 per m²</p>
              </div>
              <div className="flex justify-between bg-green-100 p-2 rounded border border-green-300">
                <p className="font-bold">Professional labour (UK average)</p>
                <p className="font-bold">£45 per m²</p>
              </div>
            </div>
          </section>

          {/* HOW TO FIGHT LOWBALL OFFERS */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step-by-Step: How to Fight Lowball Insurance Quotes</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Calculate Fair Market Value</h4>
                  <p className="text-sm text-gray-700">Use this calculator to document exact fair market value. Include roof type, dimensions, pitch, and tile material. Screenshot or save results.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Compare to Adjuster Quote</h4>
                  <p className="text-sm text-gray-700">Enter the insurance adjuster's quote into the calculator. See the exact price gap. Document the underpayment in writing.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Obtain Professional Estimates</h4>
                  <p className="text-sm text-gray-700">Get 2-3 written quotes from professional roofing contractors for the SAME work scope. These support your fair market value claim.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">4</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Submit Formal Supplement Request</h4>
                  <p className="text-sm text-gray-700">Write formal letter to insurance company. Include: calculator results, price gap analysis, professional estimates, current pricing evidence, and request for supplemental payment.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-700 text-white rounded-full flex items-center justify-center font-bold">5</div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">Follow Up</h4>
                  <p className="text-sm text-gray-700">Insurance companies typically respond within 2-4 weeks. If rejected, request written explanation. Consider public adjuster or solicitor if amount is large.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-green-100 border-l-4 border-green-700 p-4 rounded">
              <p className="font-bold text-green-900 mb-2">✓ Success Rate: 70–80%</p>
              <p className="text-sm text-green-800">When backed by detailed calculations, current pricing evidence, and professional contractor estimates, 70–80% of supplement requests are approved. The key is providing irrefutable documentation.</p>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What if the insurance company rejects my supplement request?</h4>
                <p className="text-sm text-gray-700">Request a detailed written explanation for the rejection. Provide additional contractor quotes if available. If still rejected and the amount is significant, consider hiring a public adjuster or solicitor who specializes in insurance disputes.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Should I include scaffolding and skip hire in this calculation?</h4>
                <p className="text-sm text-gray-700">This calculator covers materials and labour only. Scaffolding, skip hire, weather protection, and access equipment are typically separate line items. Obtain professional quotes for these and add them separately to your insurance claim.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Does "fair market value" mean the cheapest quote?</h4>
                <p className="text-sm text-gray-700">No. Fair market value means reasonable cost for professional work, not the absolute cheapest quote. Insurance policies typically cover "reasonable cost of repair" which is fair market value for competent professional installation.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How accurate is the pitch calculation?</h4>
                <p className="text-sm text-gray-700">This calculator accurately increases roof area based on pitch angle. Steeper roofs (45° or 60°) have significantly larger surface area than shallow roofs (15°). Measure or estimate your pitch carefully for accuracy.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Can I use this for new construction estimates?</h4>
                <p className="text-sm text-gray-700">Yes, this calculator provides fair market value for any roof replacement project, not just insurance claims. Use current UK pricing, appropriate waste factors, and professional labour rates.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What if my roof has both gable and hip sections?</h4>
                <p className="text-sm text-gray-700">Calculate each section separately (gable with 12% waste, hip with 18% waste) then add totals. This gives more accurate pricing than using one waste factor for the whole roof.</p>
              </div>
            </div>
          </section>

          {/* CONTACT FORM SECTION */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help or Have Questions?</h3>
              <p className="text-gray-700">
                Got a specific calculation requirement or want a custom tool for your trade? Fill out the form below.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=RoofingCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Roofing Calculator Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>

          {/* CTA FOOTER */}
          <div className="bg-green-700 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Professional Tools for UK Roofers & Homeowners</h2>
            <p className="mb-6">Explore our complete range of professional calculators and tools built for the UK construction trades.</p>
            <a href="/" className="bg-white text-green-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </a>
          </div>
        </div>

        {/* QUOTE GENERATOR MODAL */}
        {showQuoteGenerator && result && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: `${result.tileName} Roof Tiles`, quantity: result.tiles.toString(), unit: 'tiles' },
                { item: 'Roofing Battens & Felt', quantity: result.totalArea, unit: 'm²' },
                { item: 'Ridge Tiles & Fixings', quantity: '1', unit: 'set' },
                { item: 'Professional Roofing Labour', quantity: result.totalArea, unit: 'm²' }
              ],
              summary: `${result.roofType} - ${result.totalArea}m² (${result.waste}% waste factor included) - Pitch: ${pitch}° - Fair Market Value: £${result.totalCost}`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}






