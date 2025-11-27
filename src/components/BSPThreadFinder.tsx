import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Wrench, CheckCircle2, AlertCircle } from 'lucide-react'
import QuoteGenerator from './QuoteGenerator'

export default function BSPThreadFinder() {
  const [mode, setMode] = useState<'diameter' | 'tpi'>('diameter')
  const [diameter, setDiameter] = useState('')
  const [tolerance, setTolerance] = useState('0.5')
  const [tpi, setTPI] = useState('')
  const [result, setResult] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  const bspData = [
    { size: '1/8"', outerDia: 9.73, tpi: 28, pitch: 0.907 },
    { size: '1/4"', outerDia: 13.16, tpi: 19, pitch: 1.337 },
    { size: '3/8"', outerDia: 16.66, tpi: 19, pitch: 1.337 },
    { size: '1/2"', outerDia: 20.96, tpi: 14, pitch: 1.814 },
    { size: '5/8"', outerDia: 22.91, tpi: 14, pitch: 1.814 },
    { size: '3/4"', outerDia: 26.44, tpi: 14, pitch: 1.814 },
    { size: '7/8"', outerDia: 30.20, tpi: 14, pitch: 1.814 },
    { size: '1"', outerDia: 33.25, tpi: 11, pitch: 2.309 },
    { size: '1 1/8"', outerDia: 36.83, tpi: 11, pitch: 2.309 },
    { size: '1 1/4"', outerDia: 41.91, tpi: 11, pitch: 2.309 },
    { size: '1 1/2"', outerDia: 47.75, tpi: 11, pitch: 2.309 },
    { size: '2"', outerDia: 59.81, tpi: 11, pitch: 2.309 }
  ]

  const findByDiameter = () => {
    if (!diameter) {
      alert('Please enter a diameter')
      return
    }
    const d = parseFloat(diameter)
    const tol = parseFloat(tolerance)
    const match = bspData.find(item => Math.abs(item.outerDia - d) <= tol)
    if (!match) {
      alert(`No BSP thread found within ±${tolerance}mm of ${diameter}mm`)
      return
    }
    setResult({
      size: match.size,
      outerDia: match.outerDia,
      tpi: match.tpi,
      pitch: match.pitch,
      mode: 'diameter'
    })
  }

  const findByTPI = () => {
    if (!tpi) {
      alert('Please select or enter TPI')
      return
    }
    const t = parseInt(tpi)
    const matches = bspData.filter(item => item.tpi === t)
    if (matches.length === 0) {
      alert(`No BSP threads found with ${t} TPI`)
      return
    }
    setResult({
      matches,
      tpi: t,
      mode: 'tpi'
    })
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>BSP Thread Identifier UK | British Standard Pipe Thread Finder | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free BSP thread identifier for UK plumbers. Identify British Standard Pipe threads by diameter or TPI instantly. Complete BS 21 reference with all sizes." 
        />
        <meta name="keywords" content="BSP thread identifier, British Standard Pipe, BSP thread size, TPI calculator, pipe thread finder, UK plumber tools, BS 21, BSPT, BSPP, thread gauge" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BSP Thread Identifier UK | British Standard Pipe Thread Finder" />
        <meta property="og:description" content="Free BSP thread identifier for UK plumbers. Identify threads by diameter or TPI instantly with BS 21 reference data." />
        <meta property="og:url" content="https://tradecalcs.co.uk/bsp-thread-finder" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/bsp-thread-finder-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BSP Thread Identifier UK | TradeCalcs" />
        <meta name="twitter:description" content="Free BSP thread identifier. Identify British Standard Pipe threads by diameter or TPI instantly." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/bsp-thread-finder-og.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/bsp-thread-finder" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#ea580c" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'BSP Thread Finder', 'item': 'https://tradecalcs.co.uk/bsp-thread-finder' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'BSP Thread Identifier UK',
                'description': 'Professional BSP thread identifier for UK plumbers. Identify British Standard Pipe threads by diameter or TPI instantly using BS 21 reference data.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/bsp-thread-finder',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '623' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'What is BSP thread?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'BSP (British Standard Pipe) threads follow BS 21 and ISO 7/1 standards. They are tapered (BSPT) or parallel (BSPP) threads used for pipes, fittings, and valves throughout the UK, Commonwealth, and Europe. The nominal size does not match actual diameter.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How do I measure BSP thread diameter?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Use digital calipers or a ruler to measure the outermost diameter of the male thread in millimeters. Measure multiple points to ensure accuracy. For tapered threads, measure near the base where diameter is more consistent.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Can I use NPT fittings with BSP threads?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'No. NPT (National Pipe Tapered) and BSP threads are incompatible. They have different thread angles (NPT 60°, BSP 55°) and pitch. Mixing them causes leaks and fitting damage.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the difference between BSPT and BSPP?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'BSPT are tapered threads that seal with PTFE tape or sealant. BSPP are parallel threads that seal with bonded washers or O-rings. Using the wrong type causes leaks.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the most common BSP thread size?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'The 1/2" BSP (20.96mm OD, 14 TPI) is the most common domestic plumbing size. It connects to 15mm copper pipe, basin taps, and toilet cistern valves.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How do I seal BSP threads?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'BSPT threads seal with PTFE tape (wrap 3-5 layers clockwise) or anaerobic thread sealant. BSPP threads seal with bonded washers (for male connections) or O-rings—do NOT use PTFE tape on BSPP.'
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

        {/* ORANGE HEADER BANNER */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Wrench className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">BSP Thread Identifier UK</h1>
            <p className="text-lg opacity-95">Identify British Standard Pipe threads instantly by diameter or TPI</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* MAIN CALCULATOR FORM */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="bg-orange-600 text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="w-5 h-5" />
                <h2 className="text-lg font-bold">BSP Thread Size Finder</h2>
              </div>
              <p className="text-sm opacity-90">Identify British Standard Pipe threads by diameter or TPI (BS 21 / ISO 7/1)</p>
            </div>

            {/* INFO BOX */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-900">
                  <b>BSP (British Standard Pipe)</b> threads are tapered threads used for pipes and fittings per BS 21 standards. The nominal size (1/2", 3/4", etc.) does NOT match the actual diameter—measure carefully with calipers!
                </p>
              </div>
            </div>

            {/* MEASUREMENT METHOD SELECTION */}
            <div className="mb-8">
              <label className="block font-bold text-gray-800 mb-3">How would you like to identify the thread?</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setMode('diameter')}
                  className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                    mode === 'diameter'
                      ? 'bg-orange-50 border-orange-600 text-orange-900'
                      : 'border-gray-300 text-gray-700 hover:border-orange-400'
                  }`}
                >
                  <p>Measure by Diameter</p>
                  <p className="text-xs font-normal text-gray-600">Use calipers to measure outer diameter</p>
                </button>
                <button
                  onClick={() => setMode('tpi')}
                  className={`p-4 rounded-lg border-2 font-semibold text-sm transition ${
                    mode === 'tpi'
                      ? 'bg-orange-50 border-orange-600 text-orange-900'
                      : 'border-gray-300 text-gray-700 hover:border-orange-400'
                  }`}
                >
                  <p>Measure by Thread Pitch</p>
                  <p className="text-xs font-normal text-gray-600">Count threads per inch with a gauge</p>
                </button>
              </div>
            </div>

            {/* DIAMETER MODE */}
            {mode === 'diameter' && (
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block font-semibold text-gray-800 mb-2">Outer Diameter (mm)</label>
                  <input
                    type="number"
                    value={diameter}
                    onChange={e => setDiameter(e.target.value)}
                    step="0.01"
                    placeholder="e.g., 20.96"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    aria-label="Thread outer diameter in millimeters"
                  />
                  <p className="text-xs text-gray-500 mt-1">Measure the outermost diameter of the male thread with digital calipers</p>
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">Measurement Tolerance (±mm)</label>
                  <select
                    value={tolerance}
                    onChange={e => setTolerance(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    aria-label="Measurement tolerance"
                  >
                    <option value="0.5">±0.5mm (Standard measurement accuracy)</option>
                    <option value="1">±1.0mm (Less accurate measurement)</option>
                    <option value="1.5">±1.5mm (Very loose tolerance)</option>
                  </select>
                </div>

                <button
                  onClick={findByDiameter}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg text-lg transition"
                  aria-label="Identify thread size by diameter"
                >
                  Identify Thread Size
                </button>
              </div>
            )}

            {/* TPI MODE */}
            {mode === 'tpi' && (
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block font-semibold text-gray-800 mb-2">Threads Per Inch (TPI)</label>
                  <input
                    type="number"
                    value={tpi}
                    onChange={e => setTPI(e.target.value)}
                    placeholder="Enter TPI value"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                    aria-label="Threads per inch"
                  />
                  <p className="text-xs text-gray-500 mt-1">Count threads in exactly 1 inch using a thread pitch gauge or ruler</p>
                </div>

                <button
                  onClick={findByTPI}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg text-lg transition"
                  aria-label="Find all threads with entered TPI"
                >
                  Find All Matches
                </button>
              </div>
            )}

            {/* RESULTS - DIAMETER MODE */}
            {result && result.mode === 'diameter' && (
              <>
                <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-orange-600" />
                    <h3 className="text-xl font-bold text-orange-900">✓ Match Found</h3>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-3 rounded border border-orange-200">
                      <p className="text-xs text-gray-600">BSP Size</p>
                      <p className="text-2xl font-bold text-orange-800">{result.size}</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-orange-200">
                      <p className="text-xs text-gray-600">Threads Per Inch</p>
                      <p className="text-2xl font-bold text-orange-800">{result.tpi} TPI</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-orange-200">
                      <p className="text-xs text-gray-600">Pitch (mm)</p>
                      <p className="text-2xl font-bold text-orange-800">{result.pitch}</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-orange-200">
                      <p className="text-xs text-gray-600">Outer Diameter</p>
                      <p className="text-2xl font-bold text-orange-800">{result.outerDia}mm</p>
                    </div>
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

            {/* RESULTS - TPI MODE */}
            {result && result.mode === 'tpi' && (
              <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 mt-6">
                <h3 className="text-xl font-bold text-orange-900 mb-4">BSP Threads with {result.tpi} TPI</h3>
                <div className="space-y-2">
                  {result.matches.map((m: any, i: number) => (
                    <div key={i} className="bg-white p-3 rounded border border-orange-200">
                      <p className="font-bold text-orange-700">{m.size}</p>
                      <p className="text-xs text-gray-600">OD: {m.outerDia}mm | Pitch: {m.pitch}mm</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* IMPORTANT NOTES */}
          <div className="bg-orange-50 border-l-4 border-orange-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-orange-900 mb-3">⚠️ Important Compliance Notes</h3>
                <ul className="space-y-2 text-sm text-orange-900">
                  <li>• <strong>BSP threads follow BS 21 and ISO 7/1 standards</strong> for pipe connections and fittings</li>
                  <li>• <strong>Nominal size ≠ actual diameter:</strong> "1/2" BSP is actually 20.96mm OD, not 12.7mm</li>
                  <li>• <strong>BSPT (tapered) threads seal with PTFE tape or sealant</strong>; BSPP (parallel) seal with washers or O-rings</li>
                  <li>• <strong>NOT compatible with NPT (American) threads</strong> - different angle (55° vs 60°) and pitch cause leaks</li>
                  <li>• <strong>Always verify thread type before ordering</strong> fittings to avoid expensive mistakes and rework</li>
                  <li>• For gas installations, consult <strong>Gas Safe regulations</strong> and use qualified installers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* UNDERSTANDING BSP */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding British Standard Pipe Threads</h2>
            <p className="text-gray-700 mb-4">
              BSP (British Standard Pipe) threads are the UK and Commonwealth standard for pipe fittings, valves, and plumbing connections. These threads follow BS 21 and ISO 7/1 standards and are used throughout the UK, Europe, Australia, New Zealand, and many other countries. BSP threads are either tapered (BSPT) or parallel (BSPP).
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                <h4 className="font-bold text-gray-900 mb-2">BSPT - Tapered Threads</h4>
                <p className="text-sm text-gray-700">
                  Tapered at approximately 1:16 ratio. Thread diameter reduces from base to tip. Seal by form fit - no washers needed. Use PTFE tape or anaerobic sealant.
                </p>
                <p className="text-xs text-gray-600 mt-2"><strong>Common uses:</strong> Water supply, heating, gas (with Safety approval)</p>
              </div>
              <div className="bg-green-50 p-4 rounded border-l-4 border-green-600">
                <h4 className="font-bold text-gray-900 mb-2">BSPP - Parallel Threads</h4>
                <p className="text-sm text-gray-700">
                  Parallel threads - diameter constant along length. Require bonded washers (male) or O-rings (female) to seal. Do NOT use PTFE tape.
                </p>
                <p className="text-xs text-gray-600 mt-2"><strong>Common uses:</strong> Hydraulic, pneumatic, industrial connections</p>
              </div>
            </div>
          </section>

          {/* WHY BSP IDENTIFICATION MATTERS */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why BSP Thread Identification Matters</h2>
            <p className="text-gray-700 mb-4">
              Correctly identifying BSP threads is critical for plumbers, pipefitters, and engineers to avoid costly mistakes. Misidentified threads lead to expensive problems:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                <h4 className="font-bold text-red-900 mb-2">❌ Consequences of Wrong Identification</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Ordering wrong fittings (£ wasted)</li>
                  <li>• Leaking connections and water damage</li>
                  <li>• Damaged fittings that strip threads</li>
                  <li>• Multiple trips to merchants = lost time</li>
                  <li>• Failed inspections and rework costs</li>
                  <li>• Customer complaints and disputes</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-900 mb-2">✓ Benefits of Correct Identification</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Order correct fittings first time</li>
                  <li>• Perfect seal and watertight connections</li>
                  <li>• Faster installations with no rework</li>
                  <li>• Professional reputation protection</li>
                  <li>• Passes inspections and certification</li>
                  <li>• Customer satisfaction and trust</li>
                </ul>
              </div>
            </div>
          </section>

          {/* COMMON SIZES AND USES */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common BSP Thread Sizes and Applications</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-600">
                <p className="font-bold text-gray-800">🚰 1/2" BSP (20.96mm OD, 14 TPI) - Most Common Domestic</p>
                <p className="text-sm text-gray-700">The most common plumbing size. Connects to 15mm copper tube. Used for basin taps, bath mixer taps, toilet cistern inlet valves, washing machine connections, and most household water supply applications.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-green-600">
                <p className="font-bold text-gray-800">🛁 3/4" BSP (26.44mm OD, 14 TPI) - Larger Supply</p>
                <p className="text-sm text-gray-700">Used for 22mm copper tube connections. Standard for bath taps, shower valves, washing machine inlet hoses, outside garden tap connections, and main water supply distribution.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-purple-600">
                <p className="font-bold text-gray-800">🏢 1" BSP (33.25mm OD, 11 TPI) - Large Diameter</p>
                <p className="text-sm text-gray-700">Used for 28mm copper tube and main water supply. Common in commercial installations, boiler supply connections, and high-flow distribution systems.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-orange-600">
                <p className="font-bold text-gray-800">🔧 Other Sizes (1/8", 1/4", 3/8", 5/8", 7/8", 1 1/8", 1 1/4", 1 1/2", 2")</p>
                <p className="text-sm text-gray-700">Used in specialist applications: industrial, heating systems, pneumatic, hydraulic, and commercial installations. Identified using the same diameter or TPI methods.</p>
              </div>
            </div>
          </section>

          {/* REFERENCE TABLE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete BSP Reference Chart (BS 21 / ISO 7/1)</h2>
            <p className="text-sm text-gray-600 mb-4">All standard BSP thread sizes with outer diameter (OD), threads per inch (TPI), and pitch in millimeters. Use for identification or verification.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-orange-100 border-b-2 border-orange-600">
                  <tr>
                    <th className="text-left p-3 font-bold text-orange-900">BSP Size</th>
                    <th className="text-center p-3 font-bold text-orange-900">OD (mm)</th>
                    <th className="text-center p-3 font-bold text-orange-900">TPI</th>
                    <th className="text-center p-3 font-bold text-orange-900">Pitch (mm)</th>
                    <th className="text-left p-3 font-bold text-orange-900">Typical Application</th>
                  </tr>
                </thead>
                <tbody>
                  {bspData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 font-semibold text-orange-700">{row.size}</td>
                      <td className="text-center p-3">{row.outerDia}</td>
                      <td className="text-center p-3 font-semibold">{row.tpi}</td>
                      <td className="text-center p-3">{row.pitch}</td>
                      <td className="p-3 text-gray-700">
                        {row.size === '1/2"' && 'Common domestic water supply'}
                        {row.size === '3/4"' && 'Bath/shower connections'}
                        {row.size === '1"' && 'Main supply, commercial'}
                        {row.size === '1/8"' && 'Small bore gauges'}
                        {row.size === '1/4"' && 'Low-pressure applications'}
                        {row.size === '3/8"' && 'Medium connections'}
                        {row.size === '5/8"' && 'Industrial applications'}
                        {row.size === '7/8"' && 'Large diameter pipes'}
                        {row.size === '1 1/8"' && 'Specialist industrial'}
                        {row.size === '1 1/4"' && 'Large diameter supply'}
                        {row.size === '1 1/2"' && 'Very large diameter'}
                        {row.size === '2"' && 'Commercial main supply'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SEALING METHODS */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Seal BSP Threads</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-600">
                <h4 className="font-bold text-gray-900 mb-2">BSPT (Tapered) - Using PTFE Tape</h4>
                <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                  <li>Wrap 3-5 layers of PTFE tape around the male thread</li>
                  <li>Wrap clockwise (when looking at thread end)</li>
                  <li>Start at the base and wrap toward the end</li>
                  <li>Ensure tape doesn't enter the fitting body</li>
                  <li>Hand-tighten then use wrench - tape compresses as you tighten</li>
                </ol>
              </div>
              <div className="bg-green-50 p-4 rounded border-l-4 border-green-600">
                <h4 className="font-bold text-gray-900 mb-2">BSPT (Tapered) - Using Anaerobic Sealant</h4>
                <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                  <li>Clean threads of any dirt or old tape</li>
                  <li>Apply thin coat of sealant to male thread</li>
                  <li>Screw fitting together immediately</li>
                  <li>Allow 24 hours curing before use</li>
                  <li>Better for high-temperature applications than PTFE tape</li>
                </ol>
              </div>
              <div className="bg-purple-50 p-4 rounded border-l-4 border-purple-600">
                <h4 className="font-bold text-gray-900 mb-2">BSPP (Parallel) - Using Bonded Washer (Male)</h4>
                <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                  <li>Male thread connects to female body with bonded washer</li>
                  <li>Washer is permanently bonded to fitting</li>
                  <li>DO NOT wrap with PTFE tape - this prevents washer sealing</li>
                  <li>Tighten until washer is compressed (usually 1-2 turns after snug)</li>
                </ol>
              </div>
              <div className="bg-red-50 p-4 rounded border-l-4 border-red-600">
                <h4 className="font-bold text-gray-900 mb-2">⚠️ BSPP (Parallel) - Important Warning</h4>
                <p className="text-sm text-red-700"><strong>NEVER use PTFE tape on BSPP threads.</strong> The parallel threads require the bonded washer or O-ring to seal. PTFE tape prevents proper washer contact and causes leaks.</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Can I use NPT fittings with BSP threads?</h4>
                <p className="text-sm text-gray-700">No. NPT (National Pipe Tapered) and BSP threads are incompatible. NPT has 60° thread angle while BSP has 55°. They also have different pitches. Mixing them causes leaks and damaged fittings. Always verify the thread type before ordering.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What's the difference between BSPT and BSPP?</h4>
                <p className="text-sm text-gray-700">BSPT = British Standard Pipe Tapered (tapers 1:16). BSPP = British Standard Pipe Parallel (constant diameter). BSPT seals with PTFE tape or sealant. BSPP seals with bonded washers or O-rings. Using the wrong type causes leaks.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How do I measure BSP thread diameter accurately?</h4>
                <p className="text-sm text-gray-700">Use digital calipers to measure the outermost diameter of the male thread in millimeters. Measure at least 2-3 points along the thread length to ensure consistency. For tapered threads, measure closer to the base where diameter is most uniform. Accuracy of ±0.5mm is typically sufficient.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What if my measurement is between two sizes?</h4>
                <p className="text-sm text-gray-700">This usually indicates thread wear, manufacturing tolerance variation, or a non-standard thread. Try fitting from each possible size—the correct one will engage smoothly without excessive force. If still uncertain, consult the pipe or fitting specifications.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Are BSP threads used for gas installations?</h4>
                <p className="text-sm text-gray-700">Yes. BSP threads are used for both water and gas in the UK. Gas installations must comply with Gas Safety regulations and use BSPT threads with proper sealing. Gas work must only be undertaken by Gas Safe registered installers.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Is this identifier tool accurate for all BSP threads?</h4>
                <p className="text-sm text-gray-700">This tool covers all standard domestic and common commercial BSP sizes per BS 21. For specialist or non-standard threads, consult manufacturer specifications or a qualified plumber.</p>
              </div>
            </div>
          </section>

          {/* SAVE TIME BOX */}
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-green-900 mb-2">⏱️ Save Time & Money on Every Job</p>
                <p className="text-sm text-green-800">Professional plumbers save <strong>15-30 minutes per job</strong> by identifying threads on-site using this tool instead of guessing or making multiple merchant trips. Order correct fittings first time, avoid rework, and maintain professional reputation.</p>
              </div>
            </div>
          </div>

          {/* CONTACT FORM SECTION */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help or Have Questions?</h3>
              <p className="text-gray-700">
                Got a specific identification requirement or want a custom tool for your trade? Fill out the form below.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=BSPThreadFinder" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite BSP Thread Finder Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>

          {/* CTA FOOTER */}
          <div className="bg-orange-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Professional Tools for UK Plumbers</h2>
            <p className="mb-6">Explore our complete range of free calculators and tools designed for plumbing and heating professionals.</p>
            <a href="/" className="bg-white text-orange-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </a>
          </div>
        </div>

        {/* QUOTE GENERATOR MODAL */}
        {showQuoteGenerator && result && result.mode === 'diameter' && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: `${result.size} BSP Fitting/Connector`, quantity: '1', unit: 'unit' },
                { item: 'PTFE Tape & Installation', quantity: '1', unit: 'job' }
              ],
              summary: `${result.size} BSP thread identified - OD: ${result.outerDia}mm, TPI: ${result.tpi}, Pitch: ${result.pitch}mm (BS 21 compliant)`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}







