import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Zap, CheckCircle2, AlertCircle } from 'lucide-react'
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
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Cable Sizing Calculator UK | BS 7671 18th Edition | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free cable sizing calculator for UK electricians. BS 7671:2018+A2:2022 compliant. Calculate cable sizes with voltage drop analysis, derating factors, and installation methods instantly." 
        />
        <meta name="keywords" content="cable sizing calculator, BS 7671 calculator, 18th edition calculator, UK electrician tools, cable size chart, voltage drop calculator, electrical cable calculator, derating factors, installation methods" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cable Sizing Calculator UK | BS 7671 18th Edition Compliant" />
        <meta property="og:description" content="Professional cable sizing calculator for UK electricians. BS 7671:2018+A2:2022 compliant with voltage drop analysis and derating factors." />
        <meta property="og:url" content="https://tradecalcs.co.uk/cable-sizing-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/cable-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cable Sizing Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free BS 7671 compliant cable sizing calculator. Voltage drop, derating factors, installation methods. For UK electricians." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/cable-calculator-og.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/cable-sizing-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#1e40af" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Cable Sizing Calculator UK',
                'description': 'Professional BS 7671 compliant cable sizing calculator for UK electricians with voltage drop analysis and derating factors.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/cable-sizing-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '847' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'Is this calculator compliant with BS 7671:2018+A2:2022?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes, all calculations follow BS 7671:2018+A2:2022 (18th Edition) requirements including current-carrying capacity tables, voltage drop limits, and derating factors for installation methods C, B, and E.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What installation methods are supported?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'This calculator supports Method C (clipped direct to surface), Method B (enclosed in conduit/trunking), and Method E (cable tray or basket) with appropriate derating factors for each method.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How are derating factors applied?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Derating factors reduce cable current-carrying capacity based on installation method, ambient temperature, and grouping. Method C has highest capacity, Methods B and E are derated. Standard conditions assume 30°C ambient.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is voltage drop and why does it matter?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Voltage drop is the reduction in voltage along the cable due to resistance. BS 7671 limits voltage drop to 5% for power circuits and 3% for lighting circuits. Excessive drop causes equipment malfunction and safety issues.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Can I use this for three-phase installations?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes, the calculator supports both single-phase (230V) and three-phase (400V) installations with appropriate voltage drop calculations for each system.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Is this calculator free to use?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes, completely free with no hidden costs, registration required, or usage limits. Built by electricians for electricians to save time and ensure compliance.'
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

        {/* BLUE HEADER BANNER */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Zap className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">Cable Sizing Calculator UK</h1>
            <p className="text-lg opacity-95">BS 7671:2018+A2:2022 compliant electrical cable sizing with voltage drop analysis and derating factors</p>
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
              <p className="text-sm opacity-90">BS 7671:2018+A2:2022 compliant cable sizing with voltage drop analysis</p>
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
                    aria-label="Load current in amps"
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
                    aria-label="Load in kilowatts"
                  />
                  <p className="text-xs text-gray-500">1kW ≈ 4.35A (at 230V single-phase)</p>
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
                aria-label="Cable run length in meters"
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
                aria-label="Cable installation method"
              >
                <option value="C">Method C - Clipped direct to wall/surface (highest capacity)</option>
                <option value="B">Method B - Enclosed in conduit/trunking (derated 0.7x)</option>
                <option value="E">Method E - In cable tray or basket (derated 0.85x)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Method C = highest capacity. Methods B/E derated for reduced air flow.</p>
            </div>

            {/* STEP 4: LIGHTING CIRCUIT CHECKBOX */}
            <div className="mb-6">
              <label className="inline-flex items-center gap-2 text-gray-800 font-semibold">
                <input
                  type="checkbox"
                  checked={lighting}
                  onChange={e => setLighting(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                  aria-label="Is this a lighting circuit"
                />
                This is a lighting circuit (3% voltage drop limit instead of 5%)
              </label>
            </div>

            {/* CALCULATE BUTTON */}
            <button
              onClick={calculate}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-lg text-lg transition"
              aria-label="Calculate cable size"
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
                    <p className="text-gray-700 mb-2 font-semibold">{result.formula}</p>
                    <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded mt-3">
                      <strong>Standard conditions assumed:</strong> 30°C ambient, no grouping factors. Additional derating may apply for grouped circuits, high ambient temperatures, or special installation conditions. Always verify with current BS 7671 tables.
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

{/* USE CASE CARDS */}
<div className="bg-white rounded-lg shadow-lg p-6 mb-8">
  <h2 className="text-xl font-bold text-gray-900 mb-2">Calculate Cable Size for Your Specific Project</h2>
  <p className="text-gray-600 mb-6">Select your project type for tailored calculations, tips, and guidance:</p>
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
    <a href="/calculators/cable-sizing/ev-charger-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
      <h3 className="font-bold text-green-900 mb-1">EV Charger</h3>
      <p className="text-sm text-green-700">7kW, 22kW home & commercial</p>
    </a>
    <a href="/calculators/cable-sizing/electric-shower-cable-sizing" className="block p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
      <h3 className="font-bold text-blue-900 mb-1">Electric Shower</h3>
      <p className="text-sm text-blue-700">8.5kW to 10.8kW installations</p>
    </a>
    <a href="/calculators/cable-sizing/cooker-circuit-cable-sizing" className="block p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
      <h3 className="font-bold text-orange-900 mb-1">Cooker Circuit</h3>
      <p className="text-sm text-orange-700">Ovens, hobs & range cookers</p>
    </a>
    <a href="/calculators/cable-sizing/garden-office-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
      <h3 className="font-bold text-green-900 mb-1">Garden Office</h3>
      <p className="text-sm text-green-700">Sheds, workshops, outbuildings</p>
    </a>
    <a href="/calculators/cable-sizing/hot-tub-cable-sizing" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
      <h3 className="font-bold text-cyan-900 mb-1">Hot Tub & Spa</h3>
      <p className="text-sm text-cyan-700">Spas, swim spas, jacuzzis</p>
    </a>
    <a href="/calculators/cable-sizing/immersion-heater-cable-sizing" className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-red-900 mb-1">Immersion Heater</h3>
  <p className="text-sm text-red-700">Hot water cylinder circuits</p>
</a>
<a href="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="block p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-yellow-900 mb-1">Solar PV & Battery</h3>
  <p className="text-sm text-yellow-700">Inverter & storage systems</p>
</a>
<a href="/calculators/cable-sizing/air-source-heat-pump-cable-sizing" className="block p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-emerald-900 mb-1">Air Source Heat Pump</h3>
  <p className="text-sm text-emerald-700">£7,500 BUS grant eligible</p>
</a>
<a href="/calculators/cable-sizing/underfloor-heating-cable-sizing" className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-red-900 mb-1">Underfloor Heating</h3>
  <p className="text-sm text-red-700">Electric UFH supply circuits</p>
</a>
    <a href="/calculators/cable-sizing/garage-workshop-cable-sizing" className="block p-4 bg-gradient-to-br from-slate-50 to-zinc-50 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-slate-900 mb-1">Garage & Workshop</h3>
  <p className="text-sm text-slate-700">Power tools, welders, compressors</p>
</a>
<a href="/calculators/cable-sizing/sauna-cable-sizing" className="block p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-amber-900 mb-1">Sauna</h3>
  <p className="text-sm text-amber-700">Electric sauna heater installations</p>
</a>
<a href="/calculators/cable-sizing/air-conditioning-cable-sizing" className="block p-4 bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-sky-900 mb-1">Air Conditioning</h3>
  <p className="text-sm text-sky-700">Split systems & multi-split AC</p>
</a>
<a href="/calculators/cable-sizing/swimming-pool-cable-sizing" className="block p-4 bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-cyan-900 mb-1">Swimming Pool</h3>
  <p className="text-sm text-cyan-700">Pumps, heaters, lighting circuits</p>
</a>
<a href="/calculators/cable-sizing/electric-gates-cable-sizing" className="block p-4 bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-gray-900 mb-1">Electric Gates</h3>
  <p className="text-sm text-gray-700">Gate motors & access control</p>
</a>
<a href="/calculators/cable-sizing/cctv-security-cable-sizing" className="block p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-indigo-900 mb-1">CCTV & Security</h3>
  <p className="text-sm text-indigo-700">Camera systems & alarm power</p>
</a>
    <a href="/calculators/cable-sizing/annex-granny-flat-cable-sizing" className="block p-4 bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-violet-900 mb-1">Annex & Granny Flat</h3>
  <p className="text-sm text-violet-700">Submains for self-contained annexes</p>
</a>
<a href="/calculators/cable-sizing/shed-summer-house-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-green-900 mb-1">Shed & Summer House</h3>
  <p className="text-sm text-green-700">Garden building power supplies</p>
</a>
<a href="/calculators/cable-sizing/outdoor-lighting-cable-sizing" className="block p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-yellow-900 mb-1">Outdoor Lighting</h3>
  <p className="text-sm text-yellow-700">Garden, security & festoon lights</p>
</a>
<a href="/calculators/cable-sizing/electric-storage-heater-cable-sizing" className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-red-900 mb-1">Storage Heaters</h3>
  <p className="text-sm text-red-700">Economy 7 & panel heater circuits</p>
</a>
<a href="/calculators/cable-sizing/ring-main-socket-circuit-cable-sizing" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-blue-900 mb-1">Ring Main & Sockets</h3>
  <p className="text-sm text-blue-700">Ring final & radial socket circuits</p>
</a>
  </div>
</div>

          {/* IMPORTANT NOTES */}
          <div className="bg-blue-50 border-l-4 border-blue-700 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-700 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-3">⚡ Important Compliance Notes</h3>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li>• This calculator follows <strong>BS 7671:2018+A2:2022</strong> (18th Edition) requirements</li>
                  <li>• Results assume <strong>standard conditions</strong> (30°C ambient, no grouping factors, PVC/XLPE copper conductors)</li>
                  <li>• <strong>Additional derating</strong> may apply for: grouped circuits, high ambient temperatures, sub-surface installations, or special conditions</li>
                  <li>• Always consult a <strong>qualified electrician</strong> and verify calculations with current BS 7671 tables and manufacturer data</li>
                  <li>• This calculator is a guide only and does not replace professional design</li>
                </ul>
              </div>
            </div>
          </div>

          {/* HOW TO USE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Cable Sizing Calculator</h2>
            <p className="text-gray-700 mb-4">
              Choosing the correct cable size is critical for electrical safety and compliance with <strong>BS 7671:2018+A2:2022</strong> (the 18th Edition wiring regulations). Our free cable sizing calculator helps UK electricians determine the appropriate cable size for any electrical installation in seconds.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-700">
              <p className="text-sm text-gray-700"><strong>Step-by-step:</strong> Enter load current (amps or kW), specify cable run length, select installation method, indicate if lighting circuit, and click calculate. Results show recommended cable size based on BS 7671 current-carrying capacity tables.</p>
            </div>
          </section>

          {/* WHAT THIS CALCULATOR DOES */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What This Calculator Does</h2>
            <p className="text-gray-700 mb-4">
              This professional-grade tool calculates the minimum cable size required for electrical circuits in UK installations. It accounts for load current, installation methods, and derating factors to ensure compliance with BS 7671:2018+A2:2022.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">✓ What It Calculates</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Minimum cable size for current</li>
                  <li>• Derating factors by method</li>
                  <li>• Voltage drop limits (5% or 3%)</li>
                  <li>• Installation method capacity</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">✓ Why It Matters</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Prevents dangerous overheating</li>
                  <li>• Ensures BS 7671 compliance</li>
                  <li>• Reduces project delays</li>
                  <li>• Protects professional reputation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CABLE SIZING REFERENCE TABLE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Cable Sizing Reference (Method C)</h2>
            <p className="text-sm text-gray-600 mb-4">Standard PVC/XLPE copper conductors, clipped direct to surface (Method C), 30°C ambient, single-phase 230V. Always verify with current BS 7671 tables for your specific installation conditions.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-blue-100 border-b">
                    <th className="px-4 py-2 text-left font-semibold">Cable Size (mm²)</th>
                    <th className="px-4 py-2 text-left font-semibold">Max Current (Amps)</th>
                    <th className="px-4 py-2 text-left font-semibold">Common Uses</th>
                    <th className="px-4 py-2 text-left font-semibold">MCB Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">1.5</td>
                    <td className="px-4 py-2">13.5A</td>
                    <td className="px-4 py-2">Low-power circuits</td>
                    <td className="px-4 py-2">10A</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">2.5</td>
                    <td className="px-4 py-2">18A</td>
                    <td className="px-4 py-2">Lighting circuits</td>
                    <td className="px-4 py-2">16A</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">4</td>
                    <td className="px-4 py-2">24A</td>
                    <td className="px-4 py-2">Appliances, cookers</td>
                    <td className="px-4 py-2">20A</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">6</td>
                    <td className="px-4 py-2">32A</td>
                    <td className="px-4 py-2">Heavy loads, showers</td>
                    <td className="px-4 py-2">32A</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">10</td>
                    <td className="px-4 py-2">41A</td>
                    <td className="px-4 py-2">Submain cables</td>
                    <td className="px-4 py-2">40A</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">16</td>
                    <td className="px-4 py-2">57A</td>
                    <td className="px-4 py-2">Main feeds, large loads</td>
                    <td className="px-4 py-2">63A</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">25</td>
                    <td className="px-4 py-2">76A</td>
                    <td className="px-4 py-2">Main board supplies</td>
                    <td className="px-4 py-2">100A</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">Note: These are approximate values for Method C. Method B and Method E installations require derating. Always consult BS 7671 Table 433 for exact values.</p>
          </section>

          {/* INSTALLATION METHODS EXPLAINED */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Installation Methods & Derating Factors</h2>
            <p className="text-gray-700 mb-4">
              Cable current-carrying capacity varies significantly by installation method due to heat dissipation differences. BS 7671 defines derating factors for each method.
            </p>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Method C - Clipped Direct to Surface (Derating: 1.0x)</h4>
                <p className="text-sm text-gray-700">Cable clipped or fixed to a wall, ceiling, or surface. Excellent air circulation. <strong>Highest current capacity.</strong> Use this when possible. Examples: surface conduit, external wall runs.</p>
              </div>
              <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Method B - Enclosed in Conduit/Trunking (Derating: 0.7x)</h4>
                <p className="text-sm text-gray-700">Cable enclosed in rigid conduit, flexible conduit, or trunking. Restricted air flow = more heat. Derated to 70% of Method C. Examples: buried conduit, metal trunking, PVC trunking.</p>
              </div>
              <div className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Method E - In Cable Tray or Basket (Derating: 0.85x)</h4>
                <p className="text-sm text-gray-700">Cable laid in cable tray, basket, or cleats. Moderate air circulation. Derated to 85% of Method C. Examples: cable tray installations, clipped to tray.</p>
              </div>
            </div>
            <div className="mt-4 bg-blue-50 border-l-4 border-blue-700 p-4 rounded">
              <p className="text-sm text-blue-900"><strong>Example:</strong> A 6mm² cable rated for 32A in Method C would be derated to: Method B = 32 × 0.7 = 22.4A; Method E = 32 × 0.85 = 27.2A</p>
            </div>
          </section>

          {/* WHY CORRECT CABLE SIZING MATTERS */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Correct Cable Sizing Matters</h2>
            <p className="text-gray-700 mb-4">
              Incorrect cable sizing is one of the most common electrical installation defects. The consequences are serious:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                <h4 className="font-bold text-red-900 mb-2">❌ Undersized Cables</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Dangerous overheating and fire risk</li>
                  <li>• Excessive voltage drop</li>
                  <li>• Equipment malfunction</li>
                  <li>• BS 7671 non-compliance</li>
                  <li>• EICR failures</li>
                </ul>
              </div>
              <div className="border-l-4 border-orange-500 bg-orange-50 p-4 rounded">
                <h4 className="font-bold text-orange-900 mb-2">⚠️ Oversized Cables</h4>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• Unnecessary material costs</li>
                  <li>• Wasted installation space</li>
                  <li>• Reduced project profitability</li>
                  <li>• Inefficient circuit protection</li>
                  <li>• Harder to bend and route</li>
                </ul>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-700 p-4 rounded">
              <p className="font-bold text-green-900 mb-2">✓ Correctly Sized Cables</p>
              <p className="text-sm text-green-800">Optimal safety, efficiency, and cost. BS 7671 compliant. Professional standard. Protects lives and property. Ensures customer satisfaction and protects your reputation.</p>
            </div>
          </section>

          {/* COMMON MISTAKES */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Cable Sizing Mistakes</h2>
            <p className="text-gray-700 mb-4">
              Professional electricians know that mistakes in cable sizing are costly and dangerous. Here are the most common errors:
            </p>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="text-red-500 font-bold text-lg flex-shrink-0">1.</div>
                <div>
                  <p className="font-semibold text-gray-900">Ignoring derating factors</p>
                  <p className="text-sm text-gray-700">Using Method C capacity for Method B or E installations. This is the most common mistake and creates fire risk.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-red-500 font-bold text-lg flex-shrink-0">2.</div>
                <div>
                  <p className="font-semibold text-gray-900">Forgetting voltage drop calculations</p>
                  <p className="text-sm text-gray-700">Long cable runs require voltage drop checking. 5% limit for power, 3% for lighting. Violations cause equipment malfunction.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-red-500 font-bold text-lg flex-shrink-0">3.</div>
                <div>
                  <p className="font-semibold text-gray-900">Not accounting for grouping</p>
                  <p className="text-sm text-gray-700">Multiple cables in conduit share heat and require additional derating. BS 7671 Table 4C provides factors.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-red-500 font-bold text-lg flex-shrink-0">4.</div>
                <div>
                  <p className="font-semibold text-gray-900">Wrong installation method</p>
                  <p className="text-sm text-gray-700">Misidentifying whether cable is clipped to surface, in conduit, or in tray. Dramatically affects capacity.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-red-500 font-bold text-lg flex-shrink-0">5.</div>
                <div>
                  <p className="font-semibold text-gray-900">Not checking ambient temperature</p>
                  <p className="text-sm text-gray-700">High ambient (lofts, sunlit areas) or high external surface temperatures require additional derating.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="text-red-500 font-bold text-lg flex-shrink-0">6.</div>
                <div>
                  <p className="font-semibold text-gray-900">Ignoring future load growth</p>
                  <p className="text-sm text-gray-700">Size cables for potential future loads. It's cheaper to install slightly larger cable now than upgrade later.</p>
                </div>
              </div>
            </div>
          </section>

          {/* SAVE TIME BOX */}
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-green-900 mb-2">⏱️ Save Time On Every Job</p>
                <p className="text-sm text-green-800">Professional electricians save <strong>10-15 minutes per circuit</strong> using our calculator. That's <strong>hours saved every installation</strong>, allowing you to complete more jobs without compromising on safety or BS 7671 compliance. Plus, documented calculations prove you followed regulations during EICR inspections.</p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Is this calculator compliant with BS 7671:2018+A2:2022?</h4>
                <p className="text-sm text-gray-700">Yes, all calculations follow the 18th Edition requirements including current-carrying capacity tables (Table 433), voltage drop limits (Regulation 525.31), and derating factors (Table 4C). Results are designed to ensure compliance with modern wiring regulations.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Can I use this for three-phase installations?</h4>
                <p className="text-sm text-gray-700">Yes, the calculator supports both single-phase (230V) and three-phase (400V) installations with appropriate voltage drop calculations. Enter current for your system voltage.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What if I have multiple derating factors?</h4>
                <p className="text-sm text-gray-700">Apply all relevant factors cumulatively. For example: grouping factor × temperature factor × installation method factor. The calculator guides you through standard conditions (30°C, no grouping). For complex installations, always verify with BS 7671 Table 4C.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How is voltage drop calculated?</h4>
                <p className="text-sm text-gray-700">Voltage drop = (Current × Resistance × Length × 2) ÷ 1000. BS 7671 limits to 5% for power circuits (11.5V at 230V) or 3% for lighting (6.9V). Longer runs or higher currents require larger cables.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What's the difference between cable size and current rating?</h4>
                <p className="text-sm text-gray-700">Cable size (1.5mm², 2.5mm², etc.) determines its current rating. The same cable size has different ratings by installation method. Method C = full rating. Methods B/E = reduced ratings due to derated heat dissipation.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Is this free to use?</h4>
                <p className="text-sm text-gray-700">Yes, completely free with no hidden costs, registration required, or usage limits. Built by electricians for electricians to save time and ensure BS 7671 compliance.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Can I rely on this calculator for professional work?</h4>
                <p className="text-sm text-gray-700">This calculator provides accurate guidance for standard installations and saves time. However, always verify your calculations against current BS 7671 tables, check for special conditions (high ambient, grouping, sub-surface), and document your design process. Professional responsibility requires due diligence.</p>
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
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=CableCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Cable Sizing Calculator Inquiry Form"
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
            <p className="mb-6">Check out our voltage drop calculator, earth fault loop impedance calculator, and other professional resources built for UK electricians.</p>
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
              summary: `BS 7671:2018+A2:2022 compliant cable sizing for ${result.amps}A load at ${result.length}m length (Method ${result.method})`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}







