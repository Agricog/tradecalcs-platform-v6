import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Wrench, Info, CheckCircle2 } from 'lucide-react'
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
        <title>BSP Thread Identifier UK | British Standard Pipe Thread Size Finder | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free BSP thread identifier for UK plumbers. Identify British Standard Pipe threads by diameter or TPI. Complete BS 21 reference tables with instant results." 
        />
        <meta name="keywords" content="BSP thread identifier, British Standard Pipe, BSP thread size, TPI calculator, pipe thread finder, UK plumber tools, BS 21" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="BSP Thread Identifier UK | British Standard Pipe Thread Finder" />
        <meta property="og:description" content="Free BSP thread identifier for UK plumbers. Identify British Standard Pipe threads by diameter or TPI instantly." />
        <meta property="og:url" content="https://tradecalcs.co.uk/bsp-thread-finder" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="BSP Thread Identifier UK | TradeCalcs" />
        <meta name="twitter:description" content="Identify British Standard Pipe threads by diameter or TPI. Free tool for UK plumbers." />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/bsp-thread-finder" />
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
              <p className="text-sm opacity-90">Identify British Standard Pipe threads instantly</p>
            </div>

            {/* INFO BOX */}
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-900">
                  <b>BSP (British Standard Pipe)</b> threads are tapered threads used for pipes and fittings. The nominal size doesn't match the actual diameter - measure carefully!
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
                  <p className="text-xs font-normal text-gray-600">Use calipers or ruler to measure outer diameter</p>
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
                  />
                  <p className="text-xs text-gray-500 mt-1">Measure the outermost diameter of the male thread</p>
                </div>

                <div>
                  <label className="block font-semibold text-gray-800 mb-2">Measurement Tolerance (±mm)</label>
                  <select
                    value={tolerance}
                    onChange={e => setTolerance(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
                  >
                    <option value="0.5">±0.5mm (Standard measurement)</option>
                    <option value="1">±1.0mm (Less accurate)</option>
                    <option value="1.5">±1.5mm (Very loose)</option>
                  </select>
                </div>

                <button
                  onClick={findByDiameter}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg text-lg transition"
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
                  />
                  <p className="text-xs text-gray-500 mt-1">Count threads in exactly 1 inch using a thread gauge</p>
                </div>

                <button
                  onClick={findByTPI}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg text-lg transition"
                >
                  Find All Matches
                </button>
              </div>
            )}

            {/* RESULTS */}
            {result && result.mode === 'diameter' && (
              <>
                <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-orange-600" />
                    <h3 className="text-xl font-bold text-orange-900">Match Found ✓</h3>
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

            {result && result.mode === 'tpi' && (
              <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-6 mt-6">
                <h3 className="text-xl font-bold text-orange-900 mb-4">Threads with {result.tpi} TPI</h3>
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
              <Info className="w-6 h-6 text-orange-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-orange-900 mb-3">Important Notes</h3>
                <ul className="space-y-2 text-sm text-orange-900">
                  <li>• BSP threads conform to BS 21, ISO 7/1 standards</li>
                  <li>• The nominal size (e.g., "1/2") does NOT equal the actual diameter</li>
                  <li>• BSP threads are tapered (BSPT) or parallel (BSPP) - check fitting type</li>
                  <li>• Always verify thread type before ordering fittings to avoid expensive mistakes</li>
                  <li>• Consult a qualified plumber for professional installations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* UNDERSTANDING BSP */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding British Standard Pipe Threads</h2>
            <p className="text-gray-700 mb-4">
              BSP (British Standard Pipe) threads are the UK and international standard for pipe fittings, valves, and plumbing connections. These threads follow BS 21 and ISO 7/1 standards and are used throughout the Commonwealth and many other countries.
            </p>
          </section>

          {/* WHY BSP IDENTIFICATION MATTERS */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why BSP Thread Identification Matters</h2>
            <p className="text-gray-700 mb-4">
              Correctly identifying BSP threads is critical for plumbers and pipefitters to avoid wrong fittings, leaking connections, damaged equipment, wasted time and money, and safety risks. BSP threads are not interchangeable with NPT (American) or metric threads.
            </p>
          </section>

          {/* COMMON SIZES */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common BSP Thread Sizes and Applications</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-bold text-gray-800">1/2" BSP (20.96mm OD, 14 TPI)</p>
                <p className="text-sm text-gray-700">Most common domestic plumbing size. Used for 15mm copper pipe connections, basin taps, and toilet cistern inlet valves.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-bold text-gray-800">3/4" BSP (26.44mm OD, 14 TPI)</p>
                <p className="text-sm text-gray-700">Common for 22mm copper pipe, bath taps, shower valves, and washing machine connections.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-bold text-gray-800">1" BSP (33.25mm OD, 11 TPI)</p>
                <p className="text-sm text-gray-700">Used for 28mm copper pipe and main water supply connections.</p>
              </div>
            </div>
          </section>

          {/* REFERENCE TABLE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Complete BSP Reference Chart</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-orange-100 border-b-2 border-orange-600">
                  <tr>
                    <th className="text-left p-3 font-bold text-orange-900">BSP Size</th>
                    <th className="text-center p-3 font-bold text-orange-900">OD (mm)</th>
                    <th className="text-center p-3 font-bold text-orange-900">TPI</th>
                    <th className="text-center p-3 font-bold text-orange-900">Pitch (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {bspData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-3 font-semibold text-orange-700">{row.size}</td>
                      <td className="text-center p-3">{row.outerDia}</td>
                      <td className="text-center p-3 font-semibold">{row.tpi}</td>
                      <td className="text-center p-3">{row.pitch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Can I use NPT fittings with BSP threads?</h4>
                <p className="text-sm text-gray-700">No. NPT and BSP threads are not compatible. They have different thread angles and pitch. Mixing them causes leaks and damage.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How do I seal BSP threads?</h4>
                <p className="text-sm text-gray-700">BSPT threads seal with PTFE tape or anaerobic thread sealant. BSPP threads seal with bonded washers or O-rings—do not use PTFE tape.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What if my measurement is between two sizes?</h4>
                <p className="text-sm text-gray-700">Thread wear or poor quality fittings can cause variation. If in doubt, try a fitting from each possible size—the correct one will engage smoothly without force.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Are BSP threads used for gas as well as water?</h4>
                <p className="text-sm text-gray-700">Yes. BSP threads are used for both water and gas installations in the UK. Gas installations must use BSPT threads and comply with Gas Safe regulations.</p>
              </div>
            </div>
          </section>

          {/* PRO TIP */}
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <p className="font-bold text-green-900 mb-2">✓ Save Time and Money on Every Job</p>
            <p className="text-sm text-green-800">Identify threads correctly the first time and avoid ordering wrong fittings. Professional plumbers save 15-30 minutes per job by identifying threads on-site instead of guessing or making multiple trips to merchants.</p>
          </div>

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

          {/* CTA FOOTER */}
          <div className="bg-orange-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Professional Tools for UK Plumbers</h2>
            <p className="mb-6">Explore our complete range of free calculators and tools designed for trade professionals.</p>
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
                { item: `${result.size} BSP Fitting`, quantity: '1', unit: 'unit' },
                { item: 'PTFE Tape & Installation', quantity: '1', unit: 'job' }
              ],
              summary: `${result.size} BSP thread identified (${result.outerDia}mm OD, ${result.tpi} TPI, ${result.pitch}mm pitch)`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}







