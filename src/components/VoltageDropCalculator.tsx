import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Zap, CheckCircle2, AlertCircle } from 'lucide-react'
import QuoteGenerator from './QuoteGenerator'

export default function VoltageDropCalculator() {
  const [current, setCurrent] = useState('')
  const [length, setLength] = useState('')
  const [cableSize, setCableSize] = useState('2.5')
  const [circuitType, setCircuitType] = useState('lighting')
  const [result, setResult] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  // =============================================================================
  // BS 7671 TABLE 4D1B - mV/A/m VALUES AT 70°C OPERATING TEMPERATURE
  // =============================================================================
  // These are the OFFICIAL voltage drop values for thermoplastic (PVC) insulated
  // copper conductors. Values ALREADY INCLUDE both conductors (live + neutral).
  // DO NOT multiply by 2 when using these values.
  // =============================================================================
  const mVperAperM: Record<string, number> = {
    '1': 44,
    '1.5': 29,
    '2.5': 18,
    '4': 11,
    '6': 7.3,
    '10': 4.4,
    '16': 2.8,
    '25': 1.75,
    '35': 1.25,
    '50': 0.93
  }

  const calculate = () => {
    if (!current || !length) {
      alert('Please fill all fields')
      return
    }

    const I = parseFloat(current)
    const L = parseFloat(length)
    const mV = mVperAperM[cableSize] || 18

    // =============================================================================
    // BS 7671 VOLTAGE DROP FORMULA (Regulation 525)
    // =============================================================================
    // Single phase: VD = (mV/A/m × Ib × L) ÷ 1000
    // DO NOT multiply by 2 - the mV/A/m values already account for both conductors
    // =============================================================================
    const vd = (mV * I * L) / 1000
    const vdPercent = (vd / 230) * 100
    const maxVD = circuitType === 'lighting' ? 3 : 5
    const compliant = vdPercent <= maxVD

    setResult({
      vd: vd.toFixed(2),
      vdPercent: vdPercent.toFixed(2),
      maxVD,
      compliant,
      formula: `VD = (${mV} mV/A/m × ${I}A × ${L}m) ÷ 1000 = ${vd.toFixed(2)}V`,
      current: I,
      length: L,
      cableSize,
      mV
    })
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Voltage Drop Calculator UK | BS 7671 Regulation 525 | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free voltage drop calculator for UK electricians. Verify BS 7671 Regulation 525 compliance instantly using official Table 4D1B mV/A/m values. Calculate voltage drop with cable sizing and circuit type analysis." 
        />
        <meta name="keywords" content="voltage drop calculator, BS 7671 calculator, UK electrician tools, cable sizing calculator, Regulation 525, electrical calculations, voltage drop compliance, mV/A/m method, Table 4D1B" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Voltage Drop Calculator UK | BS 7671 Regulation 525 Compliance" />
        <meta property="og:description" content="Verify BS 7671 compliance for electrical circuits using official Table 4D1B mV/A/m values. Free professional voltage drop calculator for UK electricians. Instant results." />
        <meta property="og:url" content="https://tradecalcs.co.uk/voltage-drop-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/voltage-drop-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Voltage Drop Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free voltage drop calculator using BS 7671 Table 4D1B mV/A/m method. Verify Regulation 525 compliance instantly." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/voltage-drop-calculator-og.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/voltage-drop-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#0891b2" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Voltage Drop Calculator', 'item': 'https://tradecalcs.co.uk/voltage-drop-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Voltage Drop Calculator UK',
                'description': 'Professional BS 7671 Regulation 525 compliant voltage drop calculator using official Table 4D1B mV/A/m values for UK electricians with instant compliance verification.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/voltage-drop-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '756' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'What are BS 7671 voltage drop limits?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'BS 7671 Regulation 525 limits voltage drop to 3% for lighting circuits and 5% for other circuits (power, heating, motors). These are measured from the origin of the installation to any load point.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How is voltage drop calculated using BS 7671 Table 4D1B?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Voltage drop = (mV/A/m × Current × Length) ÷ 1000. The mV/A/m values from Table 4D1B already account for both conductors, so do NOT multiply by 2. This is the official BS 7671 method.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Why does voltage drop matter?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Excessive voltage drop causes equipment malfunction, motor overheating, LED dimming, and BS 7671 non-compliance. Proper calculation during design prevents costly installation failures and EICR failures.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What should I do if voltage drop exceeds limits?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Increase cable size to reduce the mV/A/m value, reposition the distribution board closer to the load, or split large loads across multiple circuits. Larger cables have lower mV/A/m values.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Does this calculator include future load growth?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'No, this calculator uses your entered current value. For future-proofing, calculate for anticipated maximum demand rather than current load to avoid cable upgrades later.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Is this calculator compliant with 18th Edition?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes, all calculations follow BS 7671:2018+A2:2022 Regulation 525 requirements and use mV/A/m values from Table 4D1B for thermoplastic (PVC) insulated copper conductors at 70°C operating temperature.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is a 63A circuit used for?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'A 63A MCB is typically used for submain circuits to outbuildings, large commercial feeds, or significant domestic circuits. It\'s common for main distribution feeds and substantial loads requiring high current capacity. 63A circuits must be carefully designed to keep voltage drop within BS 7671 limits, often requiring 10mm² or larger cable.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Do 63A circuits need larger cables?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes, 63A circuits almost always require larger cable than smaller circuits. For example, a 63A circuit over 20 meters needs 16mm² minimum to stay compliant. Always check the quick-select 63A button and test different cable sizes to find the right balance between voltage drop compliance and cost.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Can I use 63A for residential installations?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes, 63A MCBs are common in residential installations for main distribution, secondary boards, or large submains to outbuildings. Most standard domestic CUs max out at 100A, so a 63A circuit represents a substantial load. Always verify compliance with Building Control and local regulations.'
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

        {/* TEAL HEADER BANNER */}
        <div className="bg-gradient-to-r from-cyan-600 to-teal-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Zap className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">Voltage Drop Calculator UK</h1>
            <p className="text-lg opacity-95">Verify BS 7671 Regulation 525 compliance for electrical circuits in seconds</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* MAIN CALCULATOR FORM */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="bg-cyan-600 text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-5 h-5" />
                <h2 className="text-lg font-bold">Voltage Drop Calculator</h2>
              </div>
              <p className="text-sm opacity-90">BS 7671 Table 4D1B mV/A/m method</p>
            </div>

            {/* STEP 1: LOAD CURRENT */}
            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">1. Load Current (Amps)</label>
              <input
                type="number"
                value={current}
                onChange={e => setCurrent(e.target.value)}
                placeholder="Enter current..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600 mb-2"
                aria-label="Load current in amps"
              />
              <div className="flex gap-2 flex-wrap">
                {['6A', '10A', '16A', '20A', '32A', '40A', '63A'].map(amp => (
                  <button
                    key={amp}
                    onClick={() => setCurrent(amp.replace('A', ''))}
                    className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded font-semibold text-sm hover:bg-cyan-200"
                  >
                    {amp}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: CABLE LENGTH */}
            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">2. Cable Run Length (meters)</label>
              <input
                type="number"
                value={length}
                onChange={e => setLength(e.target.value)}
                placeholder="Enter length..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600 mb-2"
                aria-label="Cable run length in meters"
              />
              <div className="flex gap-2 flex-wrap">
                {['5m', '10m', '20m', '50m'].map(len => (
                  <button
                    key={len}
                    onClick={() => setLength(len.replace('m', ''))}
                    className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded font-semibold text-sm hover:bg-cyan-200"
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3: CABLE SIZE */}
            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">3. Cable Size (mm²)</label>
              <select
                value={cableSize}
                onChange={e => setCableSize(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                aria-label="Cable size in square millimeters"
              >
                <option value="1">1mm² (44 mV/A/m)</option>
                <option value="1.5">1.5mm² (29 mV/A/m)</option>
                <option value="2.5">2.5mm² (18 mV/A/m)</option>
                <option value="4">4mm² (11 mV/A/m)</option>
                <option value="6">6mm² (7.3 mV/A/m)</option>
                <option value="10">10mm² (4.4 mV/A/m)</option>
                <option value="16">16mm² (2.8 mV/A/m)</option>
                <option value="25">25mm² (1.75 mV/A/m)</option>
                <option value="35">35mm² (1.25 mV/A/m)</option>
                <option value="50">50mm² (0.93 mV/A/m)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">mV/A/m values from BS 7671 Table 4D1B (PVC copper at 70°C)</p>
            </div>

            {/* STEP 4: CIRCUIT TYPE */}
            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-3">4. Circuit Type (Voltage Drop Limit)</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setCircuitType('lighting')}
                  className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
                    circuitType === 'lighting'
                      ? 'bg-cyan-50 border-cyan-600 text-cyan-900'
                      : 'border-gray-300 text-gray-700 hover:border-cyan-400'
                  }`}
                >
                  <p>Lighting Circuit</p>
                  <p className="text-xs font-normal text-gray-600">3% max VD</p>
                </button>
                <button
                  onClick={() => setCircuitType('power')}
                  className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
                    circuitType === 'power'
                      ? 'bg-cyan-50 border-cyan-600 text-cyan-900'
                      : 'border-gray-300 text-gray-700 hover:border-cyan-400'
                  }`}
                >
                  <p>Power Circuit</p>
                  <p className="text-xs font-normal text-gray-600">5% max VD</p>
                </button>
              </div>
            </div>

            {/* CALCULATE BUTTON */}
            <button
              onClick={calculate}
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg text-lg transition"
              aria-label="Calculate voltage drop"
            >
              Calculate Voltage Drop
            </button>

            {/* RESULTS */}
            {result && (
              <>
                <div className={`mt-8 rounded-lg p-6 ${result.compliant ? 'bg-cyan-50 border-2 border-cyan-300' : 'bg-red-50 border-2 border-red-300'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    {result.compliant ? (
                      <CheckCircle2 className="w-6 h-6 text-cyan-600" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                    <h3 className={`text-xl font-bold ${result.compliant ? 'text-cyan-900' : 'text-red-900'}`}>
                      {result.compliant ? '✓ COMPLIANT' : '⚠ EXCEEDS LIMIT'}
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded border-t-2 border-b-2" style={{ borderColor: result.compliant ? '#06b6d4' : '#ef4444' }}>
                    <div className="flex justify-between mb-3">
                      <p className="font-semibold">Voltage Drop</p>
                      <p className="font-bold text-lg">{result.vd}V ({result.vdPercent}%)</p>
                    </div>
                    <div className="flex justify-between mb-3">
                      <p className="font-semibold">BS 7671 Limit</p>
                      <p className="font-bold">{result.maxVD}%</p>
                    </div>
                    <div className={`flex justify-between mb-3 p-2 rounded ${result.compliant ? 'bg-cyan-50' : 'bg-red-50'}`}>
                      <p className="font-semibold">Margin</p>
                      <p className={`font-bold ${result.compliant ? 'text-cyan-700' : 'text-red-700'}`}>
                        {result.compliant ? `+${(result.maxVD - parseFloat(result.vdPercent)).toFixed(2)}%` : `-${(parseFloat(result.vdPercent) - result.maxVD).toFixed(2)}%`}
                      </p>
                    </div>
                    <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-3">
                      <p className="font-mono font-semibold mb-1">BS 7671 Calculation (Table 4D1B):</p>
                      <p className="font-mono">{result.formula}</p>
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
          <div className="bg-cyan-50 border-l-4 border-cyan-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-cyan-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-cyan-900 mb-3">⚡ Important Compliance Notes</h3>
                <ul className="space-y-2 text-sm text-cyan-900">
                  <li>• <strong>BS 7671 limits:</strong> 3% for lighting, 5% for other circuits (Regulation 525.1)</li>
                  <li>• <strong>Calculation method:</strong> Uses official Table 4D1B mV/A/m values at 70°C operating temperature</li>
                  <li>• <strong>Formula:</strong> VD = (mV/A/m × I × L) ÷ 1000 — do NOT multiply by 2</li>
                  <li>• <strong>mV/A/m values:</strong> Already account for both live and neutral conductors</li>
                  <li>• <strong>Temperature:</strong> Values at 70°C (conductor temperature under load), not 20°C reference</li>
                  <li>• <strong>Always consult:</strong> A qualified electrician for professional installations and complex scenarios</li>
                </ul>
              </div>
            </div>
          </div>

          {/* USE-CASE CALCULATORS - RIGHT AFTER IMPORTANT NOTES */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Voltage Drop Calculators by Application</h2>
            <p className="text-gray-600 mb-6">Jump to a specific use-case calculator with pre-filled values for your scenario:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Submain to Outbuilding */}
              <a 
                href="/calculators/voltage-drop/submain-outbuilding" 
                className="block p-4 bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <h3 className="font-bold text-cyan-900">Submain to Outbuilding</h3>
                </div>
                <p className="text-sm text-cyan-700">Garden offices, garages, workshops, annexes</p>
                <p className="text-xs text-gray-500 mt-1">10mm²-25mm² SWA • 32A-63A</p>
              </a>

              {/* EV Charger */}
              <a 
                href="/calculators/voltage-drop/ev-charger" 
                className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="font-bold text-green-900">EV Charger Installation</h3>
                </div>
                <p className="text-sm text-green-700">7kW and 22kW home charging points</p>
                <p className="text-xs text-gray-500 mt-1">6mm²-10mm² • 32A continuous</p>
              </a>

              {/* Garden Lighting */}
              <a 
                href="/calculators/voltage-drop/garden-lighting" 
                className="block p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <h3 className="font-bold text-yellow-900">Garden Lighting</h3>
                </div>
                <p className="text-sm text-yellow-700">Path lights, security lights, festoons</p>
                <p className="text-xs text-gray-500 mt-1">1.5mm²-2.5mm² • 3% lighting limit</p>
              </a>

              {/* Shower Circuit */}
              <a 
                href="/calculators/voltage-drop/shower-circuit" 
                className="block p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <h3 className="font-bold text-blue-900">Shower Circuit</h3>
                </div>
                <p className="text-sm text-blue-700">8.5kW, 9.5kW, 10.5kW electric showers</p>
                <p className="text-xs text-gray-500 mt-1">6mm²-10mm² • 37A-46A</p>
              </a>

              {/* Cooker Circuit */}
              <a 
                href="/calculators/voltage-drop/cooker-circuit" 
                className="block p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                  <h3 className="font-bold text-orange-900">Cooker Circuit</h3>
                </div>
                <p className="text-sm text-orange-700">Electric ovens, hobs, range cookers</p>
                <p className="text-xs text-gray-500 mt-1">6mm²-10mm² • 32A-45A with diversity</p>
              </a>
              <Link to="/calculators/voltage-drop/three-phase-motor" className="block p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-purple-900 mb-1">Three-Phase Motor</h3>
  <p className="text-sm text-purple-700">Industrial motors with 0.866 factor & starting current</p>
</Link>

<Link to="/calculators/voltage-drop/solar-pv" className="block p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-amber-900 mb-1">Solar PV</h3>
  <p className="text-sm text-amber-700">Inverter to consumer unit AC cable sizing</p>
</Link>

<Link to="/calculators/voltage-drop/heat-pump" className="block p-4 bg-gradient-to-br from-cyan-50 to-teal-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-cyan-900 mb-1">Heat Pump</h3>
  <p className="text-sm text-cyan-700">ASHP & GSHP circuits - MCS compliant</p>
</Link>

<Link to="/calculators/voltage-drop/marina" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-blue-900 mb-1">Marina Shore Power</h3>
  <p className="text-sm text-blue-700">Section 709 - stricter 3% limit applies</p>
</Link>

<Link to="/calculators/voltage-drop/caravan-site" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-green-900 mb-1">Caravan & Camping Site</h3>
  <p className="text-sm text-green-700">Section 708 pitch supplies & PME considerations</p>
</Link>
              <Link to="/calculators/voltage-drop/commercial-lighting" className="block p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-yellow-900 mb-1">Commercial Lighting</h3>
  <p className="text-sm text-yellow-700">3% limit - offices, retail, emergency</p>
</Link>

<Link to="/calculators/voltage-drop/warehouse" className="block p-4 bg-gradient-to-br from-slate-50 to-gray-100 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-slate-900 mb-1">Warehouse & Industrial</h3>
  <p className="text-sm text-slate-700">Long runs, three-phase distribution</p>
</Link>

<Link to="/calculators/voltage-drop/server-room" className="block p-4 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-indigo-900 mb-1">Server Room / Data Centre</h3>
  <p className="text-sm text-indigo-700">UPS feeds, critical power, 2-3% target</p>
</Link>

<Link to="/calculators/voltage-drop/agricultural" className="block p-4 bg-gradient-to-br from-lime-50 to-green-50 border border-lime-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-lime-900 mb-1">Agricultural & Farm</h3>
  <p className="text-sm text-lime-700">Section 705 - grain dryers, livestock</p>
</Link>

<Link to="/calculators/voltage-drop/swimming-pool" className="block p-4 bg-gradient-to-br from-sky-50 to-cyan-50 border border-sky-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-sky-900 mb-1">Swimming Pool</h3>
  <p className="text-sm text-sky-700">Section 702 - zones, SELV, bonding</p>
</Link>
              
<Link to="/calculators/voltage-drop/hot-tub" className="block p-4 bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-violet-900 mb-1">Hot Tub & Spa</h3>
  <p className="text-sm text-violet-700">13A-32A dedicated outdoor circuits</p>
</Link>

<Link to="/calculators/voltage-drop/battery-storage" className="block p-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-emerald-900 mb-1">Home Battery Storage</h3>
  <p className="text-sm text-emerald-700">Tesla, GivEnergy, hybrid inverters</p>
</Link>

<Link to="/calculators/voltage-drop/workshop" className="block p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-orange-900 mb-1">Workshop & Garage</h3>
  <p className="text-sm text-orange-700">Welders, compressors, machinery</p>
</Link>

<Link to="/calculators/voltage-drop/annex" className="block p-4 bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-pink-900 mb-1">Annex & Granny Flat</h3>
  <p className="text-sm text-pink-700">Separate dwelling supplies</p>
</Link>

<Link to="/calculators/voltage-drop/construction-site" className="block p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-yellow-900 mb-1">Construction Site</h3>
  <p className="text-sm text-yellow-700">Section 704 - temporary supplies</p>
</Link>
              <Link to="/calculators/voltage-drop/ring-circuit" className="block p-4 bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-violet-900 mb-1">Ring Circuit</h3>
  <p className="text-sm text-violet-700">UK ring main - divide by 4 method</p>
</Link>

<Link to="/calculators/voltage-drop/radial-circuit" className="block p-4 bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-sky-900 mb-1">Radial Circuit</h3>
  <p className="text-sm text-sky-700">20A and 32A socket circuits</p>
</Link>

<Link to="/calculators/voltage-drop/domestic-lighting" className="block p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-amber-900 mb-1">Domestic Lighting</h3>
  <p className="text-sm text-amber-700">Indoor lighting - 3% limit</p>
</Link>

<Link to="/calculators/voltage-drop/immersion-heater" className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-red-900 mb-1">Immersion Heater</h3>
  <p className="text-sm text-red-700">3kW hot water circuits</p>
</Link>

<Link to="/calculators/voltage-drop/12v-dc-systems" className="block p-4 bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-lg hover:shadow-md transition-shadow">
  <h3 className="font-bold text-sky-900 mb-1">12V DC Systems</h3>
  <p className="text-sm text-sky-700">Caravans, boats, solar, garden</p>
</Link>

          {/* UNDERSTANDING VOLTAGE DROP */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Voltage Drop in Electrical Circuits</h2>
            <p className="text-gray-700 mb-4">
              Voltage drop is the reduction in voltage that occurs as electrical current flows through cables due to conductor resistance. As current travels along a conductor, it encounters resistance which dissipates energy as heat and causes a voltage reduction. BS 7671:2018+A2:2022 Regulation 525 sets strict limits on acceptable voltage drop to ensure electrical equipment operates safely and efficiently.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-cyan-600">
              <p className="text-sm text-gray-700"><strong>Key principle:</strong> Long cable runs with high current draw experience significant voltage drop. A 32A circuit running 30 meters in 2.5mm² cable: VD = (18 × 32 × 30) ÷ 1000 = <strong>17.28V (7.5%)</strong> — this exceeds the 5% limit and requires larger cable.</p>
            </div>
          </section>

          {/* BS 7671 LIMITS EXPLAINED */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">BS 7671 Regulation 525 Voltage Drop Limits</h2>
            <p className="text-gray-700 mb-4">
              According to Regulation 525.1, the voltage drop between the origin of the installation and any load point must not exceed specific percentages. These limits ensure equipment operates properly, safely, and reliably.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-cyan-50 border-l-4 border-cyan-600 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Lighting Circuits - 3% Maximum</h4>
                <p className="text-sm text-gray-700">
                  Lighting is more sensitive to voltage reduction. At 3% drop (6.9V at 230V), LEDs and fluorescents dim noticeably. Best practice targets &lt;2% for LED circuits.
                </p>
                <div className="text-xs text-gray-600 mt-2 font-mono">Example: 230V × 3% = 6.9V maximum</div>
              </div>
              <div className="bg-teal-50 border-l-4 border-teal-600 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Power & Other Circuits - 5% Maximum</h4>
                <p className="text-sm text-gray-700">
                  Motors and appliances tolerate greater voltage drop but still require adequate voltage for proper operation and to prevent overheating during high-load periods.
                </p>
                <div className="text-xs text-gray-600 mt-2 font-mono">Example: 230V × 5% = 11.5V maximum</div>
              </div>
            </div>
          </section>

          {/* WHY VOLTAGE DROP MATTERS */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Voltage Drop Matters</h2>
            <p className="text-gray-700 mb-4">
              Excessive voltage drop is one of the most common causes of electrical installation failures. The consequences are serious and costly:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                <h4 className="font-bold text-red-900 mb-2">❌ Effects of Excessive Voltage Drop</h4>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• LED and fluorescent lights dim significantly</li>
                  <li>• Motors overheat and operate inefficiently</li>
                  <li>• Equipment malfunction or failure</li>
                  <li>• Reduced appliance lifespan due to stress</li>
                  <li>• BS 7671 non-compliance</li>
                  <li>• EICR certification failures</li>
                </ul>
              </div>
              <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-green-900 mb-2">✓ Benefits of Proper Design</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Equipment operates at rated efficiency</li>
                  <li>• Longer equipment and cable lifespan</li>
                  <li>• Full compliance with BS 7671</li>
                  <li>• Passes EICR inspections first time</li>
                  <li>• Reduced operating costs</li>
                  <li>• Customer satisfaction</li>
                </ul>
              </div>
            </div>
          </section>

          {/* HOW TO CALCULATE VOLTAGE DROP */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Voltage Drop is Calculated (BS 7671 Method)</h2>
            <p className="text-gray-700 mb-4">
              This calculator uses the official BS 7671 method with <strong>mV/A/m values from Table 4D1B</strong>. These values are for thermoplastic (PVC) insulated copper conductors at 70°C operating temperature.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-cyan-600 mb-4">
              <p className="text-sm font-mono text-gray-800 mb-2"><strong>Formula:</strong></p>
              <p className="text-sm font-mono text-gray-700 mb-3">VD = (mV/A/m × I × L) ÷ 1000</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>VD</strong> = Voltage drop in volts</li>
                <li>• <strong>mV/A/m</strong> = Millivolts per amp per metre (from Table 4D1B)</li>
                <li>• <strong>I</strong> = Current in amps</li>
                <li>• <strong>L</strong> = Cable length in metres</li>
                <li>• <strong>1000</strong> = Conversion factor (mV to V)</li>
              </ul>
              <p className="text-sm text-gray-700 mt-3"><strong>Important:</strong> Do NOT multiply by 2 — the mV/A/m values already account for both conductors.</p>
            </div>
            <div className="bg-cyan-50 p-4 rounded">
              <p className="font-semibold text-gray-900 mb-2">Practical Example:</p>
              <p className="text-sm text-gray-700">
                A 20A circuit running 30 metres in 2.5mm² cable (18 mV/A/m):
              </p>
              <p className="text-sm font-mono text-gray-700 mt-2">
                VD = (18 × 20 × 30) ÷ 1000 = 10.8V (4.7%)
              </p>
              <p className="text-sm text-gray-700 mt-2">
                This <strong>exceeds the 3% lighting limit</strong> but passes for power circuits. For lighting, use 4mm² (11 mV/A/m) = 6.6V (2.87%) ✓
              </p>
            </div>
          </section>

          {/* COMMON SCENARIOS */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Voltage Drop Scenarios</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-600">
                <h4 className="font-bold text-gray-900 mb-2">🏠 Long Cable Runs to Outbuildings</h4>
                <p className="text-sm text-gray-700">Garages, workshops, and garden buildings often require sub-mains of 20–50 metres. Example: 32A at 40m with 10mm² (4.4 mV/A/m) = (4.4 × 32 × 40) ÷ 1000 = 5.63V (2.4%) ✓</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-green-600">
                <h4 className="font-bold text-gray-900 mb-2">⚡ Electric Vehicle Charging Points</h4>
                <p className="text-sm text-gray-700">32A EV chargers draw continuous high current. 32A at 25m with 6mm² (7.3 mV/A/m) = (7.3 × 32 × 25) ÷ 1000 = 5.84V (2.5%) ✓</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-purple-600">
                <h4 className="font-bold text-gray-900 mb-2">❄️ Large Motors and Air Conditioning</h4>
                <p className="text-sm text-gray-700">High inductive loads have poor power factor and starting inrush currents 5–7× higher than running current. Calculate voltage drop for starting current to prevent equipment failure.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-orange-600">
                <h4 className="font-bold text-gray-900 mb-2">💡 LED Lighting in Long Runs</h4>
                <p className="text-sm text-gray-700">LED drivers are sensitive to low voltage. 6A at 20m with 1.5mm² (29 mV/A/m) = (29 × 6 × 20) ÷ 1000 = 3.48V (1.5%) ✓ — within 3% lighting limit.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-indigo-600">
                <h4 className="font-bold text-gray-900 mb-2">🏢 63A Submain Circuits</h4>
                <p className="text-sm text-gray-700">63A circuits are common for large residential installations. 63A at 30m with 16mm² (2.8 mV/A/m) = (2.8 × 63 × 30) ÷ 1000 = 5.29V (2.3%) ✓</p>
              </div>
            </div>
          </section>

          {/* SUCCESS BOX */}
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-green-900 mb-2">✓ Pass Inspections & EICR Every Time</p>
                <p className="text-sm text-green-800">Verifying voltage drop compliance during the design phase saves costly remedial work. Use this calculator before installation to ensure your design passes certification first time. Document your calculations using Table 4D1B mV/A/m values to prove BS 7671 compliance to inspectors.</p>
              </div>
            </div>
          </div>

          {/* mV/A/m REFERENCE TABLE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">BS 7671 Table 4D1B - mV/A/m Reference</h2>
            <p className="text-sm text-gray-600 mb-4">Voltage drop values for thermoplastic (PVC) insulated copper conductors at 70°C operating temperature. These values already include both conductors — do NOT multiply by 2.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-cyan-100 border-b">
                    <th className="px-4 py-2 text-left font-semibold">Cable Size (mm²)</th>
                    <th className="px-4 py-2 text-left font-semibold">mV/A/m</th>
                    <th className="px-4 py-2 text-left font-semibold">Typical Uses</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">1.0</td>
                    <td className="px-4 py-2">44</td>
                    <td className="px-4 py-2">Low-current single circuits</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">1.5</td>
                    <td className="px-4 py-2">29</td>
                    <td className="px-4 py-2">Lighting circuits</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">2.5</td>
                    <td className="px-4 py-2">18</td>
                    <td className="px-4 py-2">Ring finals, radial sockets</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">4.0</td>
                    <td className="px-4 py-2">11</td>
                    <td className="px-4 py-2">Immersion heaters, high-load radials</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">6.0</td>
                    <td className="px-4 py-2">7.3</td>
                    <td className="px-4 py-2">Cookers, showers up to 9kW</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">10.0</td>
                    <td className="px-4 py-2">4.4</td>
                    <td className="px-4 py-2">Large showers, small submains</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">16.0</td>
                    <td className="px-4 py-2">2.8</td>
                    <td className="px-4 py-2">Submains, long runs, 63A circuits</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">25.0</td>
                    <td className="px-4 py-2">1.75</td>
                    <td className="px-4 py-2">Main supplies, large submains</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">Source: BS 7671:2018+A2:2022 Table 4D1B — Voltage drop (mV/A/m) for single-phase circuits. For three-phase, multiply result by 0.866.</p>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What if my voltage drop calculation exceeds the limit?</h4>
                <p className="text-sm text-gray-700">Increase the cable size to get a lower mV/A/m value. For example, going from 2.5mm² (18 mV/A/m) to 4mm² (11 mV/A/m) reduces voltage drop by 39%. Alternatively, reposition the distribution board closer to the load, or split the circuit into two smaller circuits.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Does the 3% or 5% limit apply to the whole installation or just final circuits?</h4>
                <p className="text-sm text-gray-700">The limit applies to the TOTAL voltage drop from the origin of the installation to the load point. This includes distribution circuits AND final circuits combined. You cannot exceed 3% (lighting) or 5% (power) total.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Why don't you multiply by 2 when using mV/A/m values?</h4>
                <p className="text-sm text-gray-700">The mV/A/m values in Table 4D1B already account for both conductors (live and neutral). The old "multiply resistance by 2" method uses conductor resistance at 20°C, which is a different approach. Don't mix methods — use mV/A/m without the factor of 2.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Can I temporarily exceed voltage drop limits during motor starting?</h4>
                <p className="text-sm text-gray-700">BS 7671 recognizes that transient voltage drops during motor starting (inrush current 5–7× running current) are acceptable if they don't cause equipment damage. However, design should minimize starting inrush voltage drop. Continuous operation must meet the stated limits.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How do I account for future load growth in my design?</h4>
                <p className="text-sm text-gray-700">Design for anticipated future maximum demand rather than current load. This avoids costly cable upgrades later. For example, if a distribution might eventually need 40A, design for 40A now rather than upgrading from 20A later.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Do I need to apply temperature correction to mV/A/m values?</h4>
                <p className="text-sm text-gray-700">No — the Table 4D1B values are already at 70°C operating temperature. Unlike the conductor resistance method which uses 20°C and needs correction, mV/A/m values represent real operating conditions under load.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Is this calculator compliant with 18th Edition?</h4>
                <p className="text-sm text-gray-700">Yes, all calculations follow BS 7671:2018+A2:2022 Regulation 525 requirements and use mV/A/m values from Table 4D1B for thermoplastic (PVC) insulated copper conductors at 70°C operating temperature.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What is a 63A circuit used for?</h4>
                <p className="text-sm text-gray-700">A 63A MCB is typically used for submain circuits to outbuildings, large commercial feeds, or significant domestic circuits. It's common for main distribution feeds and substantial loads requiring high current capacity. 63A circuits must be carefully designed to keep voltage drop within BS 7671 limits, often requiring 10mm² or larger cable.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Do 63A circuits need larger cables?</h4>
                <p className="text-sm text-gray-700">Yes, 63A circuits almost always require larger cable than smaller circuits. For example, a 63A circuit over 20 metres needs 16mm² minimum to stay compliant. Always check the quick-select 63A button and test different cable sizes to find the right balance between voltage drop compliance and cost.</p>
              </div>
            </div>
          </section>

          {/* CONTACT FORM SECTION */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Want a Bespoke Calculator or App?</h3>
              <p className="text-gray-700">
                Are you a contractor or business looking for custom calculation tools, quote generators, or workflow apps built specifically for your trade? Fill out the form below and let's discuss your requirements.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=VoltageDropCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Bespoke App Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>

          {/* CTA FOOTER */}
          <div className="bg-cyan-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Complete Your Electrical Design Calculations</h2>
            <p className="mb-6">Use our cable sizing calculator, earth fault loop impedance calculator, and other professional tools to design compliant, safe electrical installations.</p>
            <a href="/" className="bg-white text-cyan-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </a>
          </div>
        </div>

        {/* QUOTE GENERATOR MODAL */}
        {showQuoteGenerator && result && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: `${result.cableSize}mm² Twin & Earth Cable`, quantity: result.length.toString(), unit: 'meters' },
                { item: 'Cable Installation & Testing', quantity: '1', unit: 'job' }
              ],
              summary: `BS 7671 compliant voltage drop: ${result.vd}V (${result.vdPercent}%) for ${result.current}A load at ${result.length}m using ${result.cableSize}mm² cable (Table 4D1B: ${result.mV} mV/A/m)`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}







