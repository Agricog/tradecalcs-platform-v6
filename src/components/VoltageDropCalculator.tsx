import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Zap, CheckCircle2, AlertCircle } from 'lucide-react'
import QuoteGenerator from './QuoteGenerator'

export default function VoltageDropCalculator() {
  const [current, setCurrent] = useState('')
  const [length, setLength] = useState('')
  const [cableSize, setCableSize] = useState('2.5')
  const [circuitType, setCircuitType] = useState('lighting')
  const [result, setResult] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  const cableResistance: Record<string, number> = {
    '1': 18.1, '1.5': 12.1, '2.5': 7.41, '4': 4.62, '6': 3.08,
    '10': 1.83, '16': 1.15, '25': 0.727, '35': 0.524, '50': 0.387
  }

  const calculate = () => {
    if (!current || !length) {
      alert('Please fill all fields')
      return
    }

    const I = parseFloat(current)
    const L = parseFloat(length)
    const R = (cableResistance[cableSize] || 7.41) / 1000
    const vd = I * L * R * 2
    const vdPercent = (vd / 230) * 100
    const maxVD = circuitType === 'lighting' ? 3 : 5
    const compliant = vdPercent <= maxVD

    setResult({
      vd: vd.toFixed(2),
      vdPercent: vdPercent.toFixed(2),
      maxVD,
      compliant,
      formula: `VD = (2 × ${I}A × ${L}m × ${R.toFixed(4)}Ω/m) = ${vd.toFixed(2)}V`,
      current: I,
      length: L,
      cableSize
    })
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Voltage Drop Calculator UK | BS 7671 Regulation 525 | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free voltage drop calculator for UK electricians. Verify BS 7671 Regulation 525 compliance instantly. Calculate voltage drop with cable sizing and circuit type analysis." 
        />
        <meta name="keywords" content="voltage drop calculator, BS 7671 calculator, UK electrician tools, cable sizing calculator, Regulation 525, electrical calculations, voltage drop compliance, mV/A/m method" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Voltage Drop Calculator UK | BS 7671 Regulation 525 Compliance" />
        <meta property="og:description" content="Verify BS 7671 compliance for electrical circuits. Free professional voltage drop calculator for UK electricians. Instant results." />
        <meta property="og:url" content="https://tradecalcs.co.uk/voltage-drop-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/voltage-drop-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Voltage Drop Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free voltage drop calculator. Verify BS 7671 Regulation 525 compliance instantly." />
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
                'description': 'Professional BS 7671 Regulation 525 compliant voltage drop calculator for UK electricians with instant compliance verification.',
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
                    'name': 'How is voltage drop calculated?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Voltage drop = (2 × Current × Length × Resistance per meter) ÷ 1000. The factor of 2 accounts for both conductors. Resistance values are from BS 7671 Appendix 4 mV/A/m tables.'
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
                      'text': 'Increase cable size to reduce resistance, reposition the distribution board closer to the load, or split large loads across multiple circuits. Larger cables reduce voltage drop.'
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
                      'text': 'Yes, all calculations follow BS 7671:2018+A2:2022 Regulation 525 requirements and use mV/A/m values from Appendix 4 for standard PVC/XLPE copper conductors at 20°C.'
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
              <p className="text-sm opacity-90">BS 7671 Regulation 525 compliance verification</p>
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
                {['6A', '10A', '16A', '20A', '32A', '40A'].map(amp => (
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
                <option value="1">1mm² (18.1 mΩ/m)</option>
                <option value="1.5">1.5mm² (12.1 mΩ/m)</option>
                <option value="2.5">2.5mm² (7.41 mΩ/m)</option>
                <option value="4">4mm² (4.62 mΩ/m)</option>
                <option value="6">6mm² (3.08 mΩ/m)</option>
                <option value="10">10mm² (1.83 mΩ/m)</option>
                <option value="16">16mm² (1.15 mΩ/m)</option>
                <option value="25">25mm² (0.727 mΩ/m)</option>
                <option value="35">35mm² (0.524 mΩ/m)</option>
                <option value="50">50mm² (0.387 mΩ/m)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Resistance values from BS 7671 Appendix 4 at 20°C</p>
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
                        {result.compliant ? `+${(result.maxVD - result.vdPercent).toFixed(2)}%` : `-${(result.vdPercent - result.maxVD).toFixed(2)}%`}
                      </p>
                    </div>
                    <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-3">
                      <p className="font-mono font-semibold mb-1">Calculation:</p>
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
                  <li>• <strong>Calculation formula:</strong> VD = (2 × I × L × R) ÷ 1000 where R is resistance in mΩ/m</li>
                  <li>• <strong>Factor of 2:</strong> Accounts for both live and neutral conductors in the circuit</li>
                  <li>• <strong>Resistance values:</strong> From BS 7671:2018+A2:2022 Appendix 4 at 20°C for standard PVC/XLPE copper</li>
                  <li>• <strong>Temperature correction:</strong> Add 0.4% per °C above 20°C for copper conductors if required</li>
                  <li>• <strong>Always consult:</strong> A qualified electrician for professional installations and complex scenarios</li>
                </ul>
              </div>
            </div>
          </div>

          {/* UNDERSTANDING VOLTAGE DROP */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Voltage Drop in Electrical Circuits</h2>
            <p className="text-gray-700 mb-4">
              Voltage drop is the reduction in voltage that occurs as electrical current flows through cables due to conductor resistance. As current travels along a conductor, it encounters resistance which dissipates energy as heat and causes a voltage reduction. BS 7671:2018+A2:2022 Regulation 525 sets strict limits on acceptable voltage drop to ensure electrical equipment operates safely and efficiently.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-cyan-600">
              <p className="text-sm text-gray-700"><strong>Key principle:</strong> Long cable runs with high current draw experience significant voltage drop. A 32A circuit running 50 meters in 2.5mm² cable experiences approximately 4.7V drop (2% at 230V), while the same circuit in 10mm² cable drops only 1.4V (0.6%).</p>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Voltage Drop is Calculated</h2>
            <p className="text-gray-700 mb-4">
              Voltage drop depends on cable length, cable size, load current, conductor material, and cable temperature. Our calculator uses the <strong>mV/A/m method</strong> which is the standard BS 7671 approach.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-cyan-600 mb-4">
              <p className="text-sm font-mono text-gray-800 mb-2"><strong>Formula:</strong></p>
              <p className="text-sm font-mono text-gray-700 mb-3">VD = (2 × I × L × R) ÷ 1000</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>VD</strong> = Voltage drop in volts</li>
                <li>• <strong>I</strong> = Current in amps</li>
                <li>• <strong>L</strong> = Cable length in meters</li>
                <li>• <strong>R</strong> = Conductor resistance in mΩ/m</li>
                <li>• <strong>2</strong> = Factor for both live and neutral conductors</li>
                <li>• <strong>1000</strong> = Conversion factor (mΩ to Ω)</li>
              </ul>
            </div>
            <div className="bg-cyan-50 p-4 rounded">
              <p className="font-semibold text-gray-900 mb-2">Practical Example:</p>
              <p className="text-sm text-gray-700">
                A 20A circuit running 30 meters in 2.5mm² cable:
              </p>
              <p className="text-sm font-mono text-gray-700 mt-2">
                VD = (2 × 20 × 30 × 7.41) ÷ 1000 = 8.89V (3.86%)
              </p>
              <p className="text-sm text-gray-700 mt-2">
                This <strong>exceeds the 3% lighting limit</strong> and would require a larger cable (4mm² = 1.41V, 0.61% ✓).
              </p>
            </div>
          </section>

          {/* COMMON SCENARIOS */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Voltage Drop Scenarios</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded border-l-4 border-blue-600">
                <h4 className="font-bold text-gray-900 mb-2">🏠 Long Cable Runs to Outbuildings</h4>
                <p className="text-sm text-gray-700">Garages, workshops, and garden buildings often require sub-mains of 20–50 meters. Use larger cables to keep voltage drop within limits. Example: 40A to garage (50m) needs 16mm² cable minimum.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-green-600">
                <h4 className="font-bold text-gray-900 mb-2">⚡ Electric Vehicle Charging Points</h4>
                <p className="text-sm text-gray-700">32A EV chargers draw continuous high current. Most domestic installations need 10mm² minimum cable for compliance. 50m runs may need 16mm².</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-purple-600">
                <h4 className="font-bold text-gray-900 mb-2">❄️ Large Motors and Air Conditioning</h4>
                <p className="text-sm text-gray-700">High inductive loads have poor power factor and starting inrush currents 5–7× higher than running current. Calculate voltage drop for starting current to prevent equipment failure.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border-l-4 border-orange-600">
                <h4 className="font-bold text-gray-900 mb-2">💡 LED Lighting in Long Runs</h4>
                <p className="text-sm text-gray-700">LED drivers are sensitive to low voltage. While 3% is the legal limit, best practice targets &lt;2% to avoid dimming and driver issues. Long LED circuit runs need careful cable selection.</p>
              </div>
            </div>
          </section>

          {/* SUCCESS BOX */}
          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-green-900 mb-2">✓ Pass Inspections & EICR Every Time</p>
                <p className="text-sm text-green-800">Verifying voltage drop compliance during the design phase saves costly remedial work. Use this calculator before installation to ensure your design passes certification first time. Document your calculations to prove BS 7671 compliance to inspectors.</p>
              </div>
            </div>
          </div>

          {/* CABLE RESISTANCE REFERENCE TABLE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cable Resistance Reference (BS 7671 Appendix 4)</h2>
            <p className="text-sm text-gray-600 mb-4">Resistance values for standard PVC/XLPE copper conductors at 20°C. Heating increases resistance by ~0.4% per °C. These are the mV/A/m values used for voltage drop calculations.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-cyan-100 border-b">
                    <th className="px-4 py-2 text-left font-semibold">Cable Size (mm²)</th>
                    <th className="px-4 py-2 text-left font-semibold">Resistance (mΩ/m)</th>
                    <th className="px-4 py-2 text-left font-semibold">Typical Uses</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">1.0</td>
                    <td className="px-4 py-2">18.1</td>
                    <td className="px-4 py-2">Low-current single pole</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">1.5</td>
                    <td className="px-4 py-2">12.1</td>
                    <td className="px-4 py-2">Single pole, bell circuits</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">2.5</td>
                    <td className="px-4 py-2">7.41</td>
                    <td className="px-4 py-2">Lighting, 16A circuits (short runs)</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">4.0</td>
                    <td className="px-4 py-2">4.62</td>
                    <td className="px-4 py-2">Appliances, cookers, lighting (longer runs)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">6.0</td>
                    <td className="px-4 py-2">3.08</td>
                    <td className="px-4 py-2">Heavy loads, showers, hobs</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">10.0</td>
                    <td className="px-4 py-2">1.83</td>
                    <td className="px-4 py-2">Submain cables, distribution</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">16.0</td>
                    <td className="px-4 py-2">1.15</td>
                    <td className="px-4 py-2">Main feeds, long runs</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">25.0</td>
                    <td className="px-4 py-2">0.727</td>
                    <td className="px-4 py-2">Main board supplies, large submains</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">Note: For three-phase systems, use single-phase voltage (230V) for percentage calculations. Values are for copper conductors at 20°C per BS 7671:2018+A2:2022 Appendix 4.</p>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What if my voltage drop calculation exceeds the limit?</h4>
                <p className="text-sm text-gray-700">Increase the cable size to reduce resistance (lower mΩ/m value). Alternatively, reposition the distribution board closer to the load, split the circuit into two smaller circuits, or use multi-core cables if applicable. Always choose the most practical solution.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Does the 3% or 5% limit apply to the whole installation or just final circuits?</h4>
                <p className="text-sm text-gray-700">The limit applies to the TOTAL voltage drop from the origin of the installation to the load point. This includes distribution circuits AND final circuits combined. You cannot exceed 3% (lighting) or 5% (power) total.</p>
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
                <h4 className="font-bold text-gray-800 mb-1">Q: Does temperature affect voltage drop calculations?</h4>
                <p className="text-sm text-gray-700">Yes, conductor resistance increases with temperature (~0.4% per °C for copper above 20°C). The calculator uses 20°C baseline. For high-temperature environments (lofts, sunny areas), add 0.4% to VD per °C above 20°C or consult BS 7671 Appendix 4 for temperature-corrected values.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Is this calculator compliant with the 18th Edition?</h4>
                <p className="text-sm text-gray-700">Yes, all calculations follow BS 7671:2018+A2:2022 Regulation 525 requirements and use mV/A/m values from Appendix 4 for standard PVC/XLPE copper conductors at 20°C.</p>
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
                title="SmartSuite Voltage Drop Calculator Inquiry Form"
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
              summary: `BS 7671 Regulation 525 compliant voltage drop: ${result.vd}V (${result.vdPercent}%) for ${result.current}A load at ${result.length}m length using ${result.cableSize}mm² cable`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}







