import { useState } from 'react'
import { Zap, Info, CheckCircle2 } from 'lucide-react'

export default function VoltageDropCalculator() {
  const [current, setCurrent] = useState('')
  const [length, setLength] = useState('')
  const [cableSize, setCableSize] = useState('2.5')
  const [circuitType, setCircuitType] = useState('lighting')
  const [result, setResult] = useState<any>(null)

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
      formula: `VD = (2 × ${I}A × ${L}m × ${R.toFixed(4)}Ω/m) = ${vd.toFixed(2)}V`
    })
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <title>Voltage Drop Calculator UK | BS 7671 Regulation 525 Compliance</title>
      <meta name="description" content="UK Voltage Drop Calculator - Verify BS 7671 Regulation 525 compliance for electrical circuits. Professional cable sizing with instant results." />

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
            <p className="text-sm opacity-90">Verify BS 7671 compliance for voltage drop</p>
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
            <label className="block font-bold text-gray-800 mb-2">2. Cable Length (meters)</label>
            <input
              type="number"
              value={length}
              onChange={e => setLength(e.target.value)}
              placeholder="Enter length..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-600 mb-2"
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
            >
              <option value="1">1mm²</option>
              <option value="1.5">1.5mm²</option>
              <option value="2.5">2.5mm²</option>
              <option value="4">4mm²</option>
              <option value="6">6mm²</option>
              <option value="10">10mm²</option>
              <option value="16">16mm²</option>
              <option value="25">25mm²</option>
              <option value="35">35mm²</option>
              <option value="50">50mm²</option>
            </select>
          </div>

          {/* STEP 4: CIRCUIT TYPE */}
          <div className="mb-6">
            <label className="block font-bold text-gray-800 mb-3">4. Circuit Type</label>
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
                <p className="text-xs font-normal text-gray-600">3% voltage drop limit</p>
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
                <p className="text-xs font-normal text-gray-600">5% voltage drop limit</p>
              </button>
            </div>
          </div>

          {/* CALCULATE BUTTON */}
          <button
            onClick={calculate}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-lg text-lg transition"
          >
            Calculate Voltage Drop
          </button>

          {/* RESULTS */}
          {result && (
            <div className={`mt-8 rounded-lg p-6 ${result.compliant ? 'bg-cyan-50 border-2 border-cyan-300' : 'bg-red-50 border-2 border-red-300'}`}>
              <div className="flex items-center gap-2 mb-4">
                {result.compliant ? (
                  <CheckCircle2 className="w-6 h-6 text-cyan-600" />
                ) : (
                  <Info className="w-6 h-6 text-red-600" />
                )}
                <h3 className={`text-xl font-bold ${result.compliant ? 'text-cyan-900' : 'text-red-900'}`}>
                  {result.compliant ? 'COMPLIANT ✓' : 'EXCEEDS LIMIT ⚠'}
                </h3>
              </div>

              <div className="bg-white p-4 rounded border-t-2 border-b-2" style={{ borderColor: result.compliant ? '#06b6d4' : '#ef4444' }}>
                <div className="flex justify-between mb-3">
                  <p className="font-semibold">Voltage Drop</p>
                  <p className="font-bold text-lg">{result.vd}V ({result.vdPercent}%)</p>
                </div>
                <div className="flex justify-between mb-3">
                  <p className="font-semibold">Limit</p>
                  <p className="font-bold">{result.maxVD}%</p>
                </div>
                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded mt-3">
                  <p className="font-mono">{result.formula}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* IMPORTANT NOTES */}
        <div className="bg-cyan-50 border-l-4 border-cyan-600 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-cyan-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-cyan-900 mb-3">Important Notes</h3>
              <ul className="space-y-2 text-sm text-cyan-900">
                <li>• BS 7671 limits voltage drop to 3% for lighting circuits and 5% for other circuits</li>
                <li>• This calculator uses the formula: VD = (2 × I × L × R) / 1000</li>
                <li>• Factor of 2 accounts for both conductors (live and neutral)</li>
                <li>• Cable resistance values are from BS 7671:2018+A2:2022 Appendix 4</li>
                <li>• Always consult a qualified electrician for professional installations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* UNDERSTANDING VOLTAGE DROP */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Voltage Drop in Electrical Circuits</h2>
          <p className="text-gray-700 mb-4">
            Voltage drop is the reduction in voltage that occurs as electrical current flows through cables due to conductor resistance. BS 7671:2018+A2:2022 Regulation 525 sets strict limits on acceptable voltage drop to ensure electrical equipment operates safely and efficiently.
          </p>
        </section>

        {/* BS 7671 LIMITS */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">BS 7671 Voltage Drop Limits</h2>
          <p className="text-gray-700 mb-4">
            According to Regulation 525.1, the voltage drop between the origin of the installation and any load point must not exceed 3% for lighting circuits and 5% for other uses. These limits ensure equipment operates properly and safely.
          </p>
        </section>

        {/* WHY VOLTAGE DROP MATTERS */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Voltage Drop Matters</h2>
          <p className="text-gray-700 mb-4">
            Excessive voltage drop causes reduced equipment performance, overheating of motors, dimming of lights, equipment malfunction, and non-compliance with BS 7671. Proper voltage drop calculation prevents costly installation failures.
          </p>
          <div className="bg-cyan-50 border-l-4 border-cyan-600 p-4 rounded">
            <p className="font-bold text-cyan-900 mb-2">💡 Critical for LED Lighting</p>
            <p className="text-sm text-cyan-800">LED lighting is particularly sensitive to voltage drop. While the 3% limit applies, best practice is to target less than 2% drop on LED circuits for optimal performance and driver longevity.</p>
          </div>
        </section>

        {/* HOW TO CALCULATE */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Calculate Voltage Drop</h2>
          <p className="text-gray-700 mb-4">
            Voltage drop depends on cable length, cable size, load current, conductor material, cable temperature, and power factor. Our calculator uses the mV/A/m (millivolts per amp per meter) method which is the standard approach in BS 7671 Appendix 4.
          </p>
        </section>

        {/* COMMON SCENARIOS */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Voltage Drop Scenarios</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-bold text-gray-800">Long cable runs to outbuildings</p>
              <p className="text-sm text-gray-700">Garages and workshops often require sub-mains of 20–50 meters. Use larger cables to keep voltage drop within limits.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-bold text-gray-800">Electric vehicle charging points</p>
              <p className="text-sm text-gray-700">32A car chargers draw continuous high current. Most domestic EV installations need 10mm² minimum cable to comply with voltage drop limits.</p>
            </div>
            <div className="bg-gray-50 p-4 rounded">
              <p className="font-bold text-gray-800">Large motors and air conditioning</p>
              <p className="text-sm text-gray-700">High inductive loads have poor power factor and require careful voltage drop calculation to avoid excessive drop during starting.</p>
            </div>
          </div>
        </section>

        {/* SUCCESS BOX */}
        <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <p className="font-bold text-green-900 mb-2">✓ Pass Inspections First Time</p>
              <p className="text-sm text-green-800">Verifying voltage drop compliance before installation saves costly remedial work. Use this calculator during the design phase to ensure your installation passes certification first time.</p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Q: What if my calculation exceeds the voltage drop limit?</h4>
              <p className="text-sm text-gray-700">Increase the cable size to reduce resistance and voltage drop. Alternatively, reposition the distribution board closer to the load or split large loads across multiple circuits.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Q: Does voltage drop apply to final circuits only?</h4>
              <p className="text-sm text-gray-700">No, the total voltage drop from the origin of the installation to the load point must comply. This includes both distribution circuits and final circuits combined.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Q: Can I exceed the limits for short periods?</h4>
              <p className="text-sm text-gray-700">BS 7671 recognizes that transient voltage drops during motor starting are acceptable provided they don't cause equipment damage or danger. Continuous operation must meet the stated limits.</p>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-1">Q: How do I account for future load growth?</h4>
              <p className="text-sm text-gray-700">Design for anticipated future maximum demand rather than current load. This avoids having to upsize cables later when loads increase, saving cost and disruption.</p>
            </div>
          </div>
        </section>

        {/* CTA FOOTER */}
        <div className="bg-cyan-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Complete Your Electrical Design Calculations</h2>
          <p className="mb-6">Use our cable sizing calculator and other professional tools to design compliant, safe electrical installations.</p>
          <a href="/" className="bg-white text-cyan-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
            View All Calculators
          </a>
        </div>
      </div>
    </div>
  )
}




