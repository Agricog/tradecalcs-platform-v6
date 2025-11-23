import { CheckCircle2, HelpCircle, Palette } from 'lucide-react'
import { useState } from 'react'
import QuoteGenerator from '../components/QuoteGenerator'

export default function PlastererCalculatorsPage() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [coats, setCoats] = useState('2')
  const [coverage, setCoverage] = useState('1.5')
  const [wasteFactor, setWasteFactor] = useState('10')
  const [result, setResult] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  const calculate = () => {
    const area = (parseFloat(length) || 0) * (parseFloat(width) || 0)
    const coverageRate = parseFloat(coverage) || 1.5
    const numCoats = parseFloat(coats) || 1
    const waste = parseFloat(wasteFactor) || 10

    const needed = (area * numCoats) / coverageRate
    const withWaste = needed * (1 + waste / 100)

    setResult({
      area: area.toFixed(2),
      basePlaster: needed.toFixed(2),
      withWaste: withWaste.toFixed(2),
      bags: Math.ceil(withWaste / 25),
      coverage: coverage,
      waste: waste,
      coats: coats
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-white font-semibold flex items-center gap-2 hover:opacity-90 transition w-fit">
            ← Back to All Calculators
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Plaster Coverage Calculator for UK Plasterers
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Calculate plaster coverage, drying times & project costs instantly
          </p>
          <p className="text-gray-600 mb-6">
            Industry-trusted calculator for professional plasterers and decorators across the UK. Includes coverage rates, waste factors, and material estimates for all plasterwork types.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Plaster Needed</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Wall/Ceiling Length (m)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="e.g. 4.5"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Wall/Ceiling Width (m)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="e.g. 3.2"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Coats</label>
                    <select
                      value={coats}
                      onChange={(e) => setCoats(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                    >
                      <option value="1">1 Coat</option>
                      <option value="2">2 Coats (Standard)</option>
                      <option value="3">3 Coats (Full Coverage)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Coverage Rate (kg/m²)</label>
                    <select
                      value={coverage}
                      onChange={(e) => setCoverage(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                    >
                      <option value="1.5">1.5 (Skim Coat)</option>
                      <option value="2">2.0 (Standard)</option>
                      <option value="2.5">2.5 (Heavy Coverage)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Waste Factor (%)</label>
                    <select
                      value={wasteFactor}
                      onChange={(e) => setWasteFactor(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                    >
                      <option value="5">5% (Minimal)</option>
                      <option value="10">10% (Standard)</option>
                      <option value="15">15% (Liberal)</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold transition"
                >
                  Calculate Plaster Needed
                </button>
              </div>
            </div>

            {result && (
              <>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <h2 className="text-xl font-bold text-gray-900">Plaster Required</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                        <p className="text-sm text-gray-600">Total Wall Area</p>
                        <p className="text-2xl font-bold text-gray-900">{result.area} m²</p>
                      </div>

                      <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                        <p className="text-sm text-gray-600">Base Plaster Needed</p>
                        <p className="text-2xl font-bold text-gray-900">{result.basePlaster} kg</p>
                      </div>

                      <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                        <p className="text-sm text-gray-600">With Waste Factor ({result.waste}%)</p>
                        <p className="text-2xl font-bold text-gray-900">{result.withWaste} kg</p>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                        <p className="text-sm text-gray-600">Order (25kg bags)</p>
                        <p className="text-2xl font-bold text-gray-900">{result.bags} bags</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6">
                      <h3 className="font-bold text-gray-900 mb-4">💡 Pro Tips</h3>
                      <ul className="text-sm text-gray-700 space-y-3">
                        <li><strong>Order amount:</strong> {result.bags} bags at 25kg each</li>
                        <li><strong>Coverage:</strong> {result.coverage}kg/m² on {coats} coat(s)</li>
                        <li><strong>Waste included:</strong> {result.waste}% for breakage & spillage</li>
                        <li><strong>Storage:</strong> Keep plaster dry and use within 3-6 months</li>
                        <li><strong>Drying time:</strong> Allow 24 hours per coat minimum</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-6 text-center">
                    ✓ Coverage: {result.coverage}kg/m² • Coats: {coats} • Waste factor: {result.waste}%
                  </p>
                </div>

                {/* QUOTE GENERATOR CTA */}
                <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg mb-6">
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

          <div className="lg:col-span-1">
            <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-600">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Quick Tips
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Measure height from floor to ceiling</li>
                <li>• Subtract 20% for doors and windows</li>
                <li>• Skim coats need less material</li>
                <li>• Thick coats may need multiple applications</li>
                <li>• Always order extra for waste & repairs</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Palette className="w-5 h-5 text-amber-600" />
                Plaster Types
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Skim:</strong> Smooth finish coat</li>
                <li><strong>Gypsum:</strong> Standard plasterboard</li>
                <li><strong>Lime:</strong> Traditional walls</li>
                <li><strong>Finishing:</strong> Final top coat</li>
                <li><strong>Base:</strong> Undercoat/scratch coat</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Plastering Guide for Professionals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Plaster Coverage Rates</h3>
              <p className="text-gray-700 text-sm mb-4">
                Coverage rates vary by plaster type and application method. These are industry standards.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ <strong>Skim coat:</strong> 1.2-1.5 kg/m²</li>
                <li>✓ <strong>Gypsum plaster:</strong> 1.5-2.0 kg/m²</li>
                <li>✓ <strong>Finishing plaster:</strong> 1.0-1.5 kg/m²</li>
                <li>✓ <strong>Heavy coverage:</strong> 2.0-2.5 kg/m²</li>
                <li>✓ <strong>Base coat:</strong> 2.5-3.0 kg/m²</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Drying & Curing Times</h3>
              <p className="text-gray-700 text-sm mb-4">
                Proper drying time ensures professional results and reduces defects.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ <strong>Skim coat:</strong> 24 hours between coats</li>
                <li>✓ <strong>Full cure:</strong> 5-7 days minimum</li>
                <li>✓ <strong>Before painting:</strong> 14 days recommended</li>
                <li>✓ <strong>Temperature dependent:</strong> Cold delays drying</li>
                <li>✓ <strong>Ventilation:</strong> Speeds up drying process</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Material Types & Applications</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>Plasterboard:</strong> Drywall/internal walls</li>
                <li>• <strong>Bonding plaster:</strong> First coat applications</li>
                <li>• <strong>Finish plaster:</strong> Top smooth coat</li>
                <li>• <strong>Lime plaster:</strong> Period/traditional homes</li>
                <li>• <strong>Thistle plaster:</strong> UK standard products</li>
                <li>• <strong>Artex:</strong> Textured/decorative finishes</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Professional Tips</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Always prime new plasterboard first</li>
                <li>• Use correct water-to-powder ratio</li>
                <li>• Apply thin coats for best results</li>
                <li>• Maintain consistent thickness</li>
                <li>• Sand between coats for smoothness</li>
                <li>• Store plaster in dry conditions</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded mt-8">
            <h3 className="font-bold text-gray-900 mb-2">Professional Quality Assurance</h3>
            <p className="text-sm text-gray-700">
              This calculator provides professional estimates for UK plastering projects. Coverage rates are based on industry standards and manufacturer specifications. Actual coverage may vary based on surface condition, application technique, and environmental factors. Always account for waste and keep extra material for touch-ups. For best results, follow manufacturer guidelines and allow proper curing time before finishing or painting.
            </p>
          </div>
        </div>

        {/* CONTACT FORM SECTION */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
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
      </div>

      {/* QUOTE GENERATOR MODAL */}
      {showQuoteGenerator && result && (
        <QuoteGenerator
          calculationResults={{
            materials: [
              { item: 'Plaster (25kg bags)', quantity: result.bags.toString(), unit: 'bags' },
              { item: 'Total Plaster Weight', quantity: result.withWaste, unit: 'kg' },
              { item: 'Coverage Rate', quantity: result.coverage, unit: 'kg/m²' },
              { item: 'Number of Coats', quantity: result.coats, unit: 'coats' }
            ],
            summary: `Plastering project - ${result.area}m² surface area with ${result.coats} coat(s) at ${result.coverage}kg/m² coverage (${result.waste}% waste factor included)`
          }}
          onClose={() => setShowQuoteGenerator(false)}
        />
      )}
    </div>
  )
}









