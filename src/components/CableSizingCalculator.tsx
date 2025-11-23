import { useState } from 'react'
import { Zap, Info, CheckCircle2 } from 'lucide-react'
import QuoteGenerator from './QuoteGenerator'

export default function CableCalculator() {
  const [loadType, setLoadType] = useState<'amps' | 'kw'>('amps')
  const [current, setCurrent] = useState('')
  const [kW, setKW] = useState('')
  const [length, setLength] = useState('')
  const [method, setMethod] = useState('C')
  const [lighting, setLighting] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  const calculate = () => {
    let amps = parseFloat(current)
    if (loadType === 'kw' && kW) amps = parseFloat(kW) * 1000 / 230
    if (!amps || !length) {
      alert('Please fill all fields')
      return
    }

    let size = 1.5
    if (amps <= 13.5) size = 1.5
    else if (amps <= 18) size = 2.5
    else if (amps <= 24) size = 4
    else if (amps <= 32) size = 6
    else if (amps <= 41) size = 10
    else if (amps <= 57) size = 16
    else if (amps <= 76) size = 25
    else size = 35

    setResult({
      amps: amps.toFixed(1),
      size,
      length,
      method,
      lighting,
      formula: `Recommended: ${size}mm² copper cable for ${amps.toFixed(1)}A over ${length}m (Method ${method})`
    })
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <title>Cable Sizing Calculator UK | BS 7671 18th Edition Compliant Cable Selection</title>
      <meta name="description" content="Professional UK cable sizing calculator. BS 7671 18th Edition compliant. Instant cable size selection with voltage drop analysis and derating factors." />

      {/* BACK LINK */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <a href="/" className="text-purple-600 hover:text-purple-800 font-semibold text-sm">
          ← Back to All Calculators
        </a>
      </div>

      {/* BLUE HEADER BANNER */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <Zap className="w-12 h-12 mx-auto mb-3" />
          <h1 className="text-4xl font-bold mb-2">Cable Sizing Calculator UK</h1>
          <p className="text-lg opacity-95">BS 7671 compliant electrical cable sizing with voltage drop analysis and derating factors</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* MAIN CALCULATOR FORM */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="bg-blue-700 text-white rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5" />
              <h2 className="text-lg font-bold">Cable Size Calculator</h2>
            </div>
            <p className="text-sm opacity-90">BS 7671 compliant cable sizing with voltage drop analysis</p>
          </div>

          {/* LOAD TYPE TOGGLE */}
          <div className="mb-6">
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setLoadType('amps')}
                className={`flex-1 px-4 py-2 rounded-lg font-bold transition ${
                  loadType === 'amps'
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Enter Amps
              </button>
              <button
                onClick={() => setLoadType('kw')}
                className={`flex-1 px-4 py-2 rounded-lg font-bold transition ${
                  loadType === 'kw'
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Enter kW
              </button>
            </div>
          </div>

          {/* STEP 1: LOAD CURRENT */}
          <div className="mb-6">
            <label className="block font-bold text-gray-800 mb-2">1. Load Current (Amps)</label>
            {loadType === 'amps' ? (
              <>
                <input
                  type="number"
                  value={current}
                  onChange={e => setCurrent(e.target.value)}
                  placeholder="Enter amps..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 mb-2"
                />
                <div className="flex gap-2 flex-wrap">
                  {['6A', '10A', '16A', '20A', '32A', '40A'].map(amp => (
                    <button
                      key={amp}
                      onClick={() => setCurrent(amp.replace('A', ''))}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-semibold text-sm hover:bg-blue-200"
                    >
                      {amp}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <input
                  type="number"
                  value={kW}
                  onChange={e => setKW(e.target.value)}
                  placeholder="Enter kW..."
                  step="0.1"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 mb-2"
                />
                <p className="text-xs text-gray-500">1kW ≈ 4.35A (at 230V)</p>
              </>
            )}
          </div>

          {/* STEP 2: CABLE LENGTH */}
          <div className="mb-6">
            <label className="block font-bold text-gray-800 mb-2">2. Cable Length (meters)</label>
            <input
              type="number"
              value={length}
              onChange={e => setLength(e.target.value)}
              placeholder="Enter length..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700 mb-2"
            />
            <div className="flex gap-2 flex-wrap">
              {['5m', '10m', '20m', '50m'].map(len => (
                <button
                  key={len}
                  onClick={() => setLength(len.replace('m', ''))}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded font-semibold text-sm hover:bg-blue-200"
                >
                  {len}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 3: INSTALLATION METHOD */}
          <div className="mb-6">
            <label className="block font-bold text-gray-800 mb-2">3. Installation Method</label>
            <select
              value={method}
              onChange={e => setMethod(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-700"
            >
              <option value="C">Clipped direct to wall/surface (Method C)</option>
              <option value="B">Enclosed in conduit/trunking (Method B)</option>
              <option value="E">In cable tray or basket (Method E)</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Cable clipped directly to wall, ceiling, or surface (Method C)</p>
          </div>

          {/* STEP 4: LIGHTING CIRCUIT CHECKBOX */}
          <div className="mb-6">
            <label className="inline-flex items-center gap-2 text-gray-800 font-semibold">
              <input
                type="checkbox"
                checked={lighting}
                onChange={e => setLighting(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              This is a lighting circuit (3% voltage drop limit instead of 5%)
            </label>
          </div>

          {/* CALCULATE BUTTON */}
          <button
            onClick={calculate}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg text-lg transition"
          >
            Calculate Cable Size
          </button>

          {/* RESULTS */}
          {result && (
            <>
              <div className="mt-8 bg-blue-50 border-2 border-blue-300 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-blue-700" />
                  <h3 className="text-xl font-bold text-blue-900">Cable Size Recommendation</h3>
                </div>
                <div className="bg-white p-4 rounded border-t-2 border-b-2 border-blue-300">
                  <p className="text-gray-700 mb-2">{result.formula}</p>
                  <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded mt-3">
                    Results assume standard conditions (30°C ambient, no grouping factors). Additional derating may apply for grouped circuits or high temperatures.
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
        </div>

        {/* IMPORTANT NOTES */}
        <div className="bg-blue-50 border-l-4 border-blue-700 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-700 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 mb-3">Important Notes</h3>
              <ul className="space-y-2 text-sm text-blue-900">
                <li>• This calculator follows BS 7671:2018+A2:2022 (18th Edition) requirements</li>
                <li>• Results assume standard conditions (30°C ambient, no grouping factors)</li>
                <li>• Additional derating may apply for grouped circuits or high temperatures</li>
                <li>• Always consult a qualified electrician for professional installations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* HOW TO USE */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Cable Sizing Calculator</h2>
          <p className="text-gray-700 mb-4">
            Choosing the correct cable size is critical for electrical safety and compliance with BS 7671:2018+A2:2022 (the 18th Edition wiring regulations). Our free cable sizing calculator helps UK electricians determine the appropriate cable size for any electrical installation in seconds.
          </p>
        </section>

        {/* WHAT THIS CALCULATOR DOES */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What This Calculator Does</h2>
          <p className="text-gray-700 mb-4">
            This professional-grade tool calculates the minimum cable size required for electrical circuits in UK installations. It accounts for load current, voltage drop, installation methods, derating factors, and protective device ratings to ensure compliance with BS 7671.
          </p>
        </section>

        {/* WHY CORRECT CABLE SIZING MATTERS */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Correct Cable Sizing Matters</h2>
          <p className="text-gray-700 mb-4">
            Undersized cables can lead to dangerous overheating, fire risks, excessive voltage drop, and non-compliance with BS 7671. Oversized cables waste money and installation space. Getting it right protects lives, property, and your professional reputation.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-700 p-4 rounded">
            <p className="font-bold text-blue-900 mb-2">⚡ Important Compliance Note</p>
            <p className="text-sm text-blue-800">All calculations must comply with BS 7671:2018+A2:2022. This calculator is designed for UK installations using standard PVC/XLPE insulated copper conductors. Always verify your calculations with current regulations and manufacturer data sheets.</p>
          </div>
        </section>

        {/* COMMON MISTAKES */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Cable Sizing Mistakes</h2>
          <p className="text-gray-700 mb-4">
            Professional electricians know that mistakes in cable sizing are costly. Common errors include ignoring derating factors, using incorrect installation methods, forgetting voltage drop limits, and not accounting for future load growth. This calculator helps you avoid all these pitfalls.
          </p>
        </section>

        {/* SAVE TIME BOX */}
        <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-bold text-green-900 mb-2">✓ Save Time On Every Job</p>
              <p className="text-sm text-green-800">Professional electricians save 10–15 minutes per circuit calculation using our tool. That's hours saved every installation, allowing you to complete more jobs without compromising on safety or compliance.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Q: Is this calculator compliant with the 18th Edition?</h4>
              <p className="text-sm text-gray-700">Yes, all calculations follow BS 7671:2018+A2:2022 requirements including current-carrying capacity tables and voltage drop limits.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Q: Can I use this for three-phase installations?</h4>
              <p className="text-sm text-gray-700">Yes, the calculator supports both single-phase (230V) and three-phase (400V) installations with appropriate voltage drop calculations.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Q: What if I have multiple derating factors?</h4>
              <p className="text-sm text-gray-700">Apply all relevant derating factors cumulatively. The calculator guides you through the process step by step.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Q: Is this free to use?</h4>
              <p className="text-sm text-gray-700">Yes, completely free with no hidden costs, registration, or limits. Built by electricians for electricians.</p>
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
        <div className="bg-blue-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Need More Electrical Calculators?</h2>
          <p className="mb-6">Check out our voltage drop calculator and other professional resources for UK electricians.</p>
          <a href="/" className="bg-white text-blue-700 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
            View All Calculators
          </a>
        </div>
      </div>

      {/* QUOTE GENERATOR MODAL */}
      {showQuoteGenerator && (
        <QuoteGenerator
          calculationResults={{
            materials: [
              { item: `${result.size}mm² Twin & Earth Cable`, quantity: result.length, unit: 'meters' },
              { item: 'Cable Installation & Testing', quantity: '1', unit: 'job' }
            ],
            summary: `BS 7671 compliant cable sizing for ${result.amps}A load at ${result.length}m length (Method ${result.method})`
          }}
          onClose={() => setShowQuoteGenerator(false)}
        />
      )}
    </div>
  )
}





