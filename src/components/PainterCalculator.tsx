import { useState } from 'react'
import { CheckCircle2, HelpCircle, Palette } from 'lucide-react'
import QuoteGenerator from './QuoteGenerator'

export default function PainterCalculator() {
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [numWalls, setNumWalls] = useState('4')
  const [surfaceType, setSurfaceType] = useState<'smooth' | 'textured'>('smooth')
  const [coats, setCoats] = useState('2')
  const [results, setResults] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  const calculate = () => {
    if (!width || !height) return

    const w = parseFloat(width)
    const h = parseFloat(height)
    const walls = parseInt(numWalls)
    const numCoats = parseInt(coats)

    const areaPerWall = (w * h) / 10.764 // Convert to m² if needed
    const totalArea = areaPerWall * walls

    let coverage = 12 // m²/litre for smooth
    if (surfaceType === 'textured') coverage = 10

    let paintNeeded = Math.ceil((totalArea * numCoats) / coverage)
    let primeNeeded = Math.ceil(totalArea / 14)

    // Standard 5L tins calculation
    const paintTins = Math.ceil(paintNeeded / 5)
    const primeTins = Math.ceil(primeNeeded / 5)

    setResults({
      totalArea: totalArea.toFixed(2),
      paintLitres: paintNeeded,
      primeLitres: primeNeeded,
      paintTins,
      primeTins,
      coats: numCoats,
      surfaceType
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <a href="/" className="text-white font-semibold flex items-center gap-2 hover:opacity-90 transition w-fit">
            ← Back to All Calculators
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Professional Paint Calculator for UK Decorators
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Calculate exact paint quantities needed for any room or project
          </p>
          <p className="text-gray-600 mb-6">
            Industry-trusted paint estimator for professional decorators and painters across the UK. Supports multiple coats and surface types.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Paint Needed</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Wall Width (feet)</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="e.g. 12"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Wall Height (feet)</label>
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g. 8"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Number of Walls</label>
                  <select
                    value={numWalls}
                    onChange={(e) => setNumWalls(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none font-semibold"
                  >
                    <option value="1">1 Wall</option>
                    <option value="2">2 Walls</option>
                    <option value="3">3 Walls</option>
                    <option value="4">4 Walls (Full Room)</option>
                    <option value="5">5 Walls</option>
                    <option value="6">6 Walls</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Surface Type</label>
                  <select
                    value={surfaceType}
                    onChange={(e) => setSurfaceType(e.target.value as 'smooth' | 'textured')}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none font-semibold"
                  >
                    <option value="smooth">Smooth Plaster/Drywall</option>
                    <option value="textured">Textured/Stippled Surface</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Number of Coats</label>
                  <select
                    value={coats}
                    onChange={(e) => setCoats(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none font-semibold"
                  >
                    <option value="1">1 Coat (Primer/Topcoat)</option>
                    <option value="2">2 Coats (Standard)</option>
                    <option value="3">3 Coats (Full Coverage)</option>
                    <option value="4">4 Coats (Dark to Light)</option>
                  </select>
                </div>

                <button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold transition"
                >
                  Calculate Paint Required
                </button>
              </div>
            </div>

            {results && (
              <>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                    <h2 className="text-xl font-bold text-gray-900">Paint Required</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                        <p className="text-sm text-gray-600">Total Wall Area</p>
                        <p className="text-2xl font-bold text-gray-900">{results.totalArea} m²</p>
                      </div>

                      <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                        <p className="text-sm text-gray-600">Topcoat Paint</p>
                        <p className="text-2xl font-bold text-gray-900">{results.paintLitres} litres</p>
                        <p className="text-xs text-gray-500 mt-1">{results.paintTins} × 5L tins</p>
                      </div>

                      <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                        <p className="text-sm text-gray-600">Primer Needed</p>
                        <p className="text-2xl font-bold text-gray-900">{results.primeLitres} litres</p>
                        <p className="text-xs text-gray-500 mt-1">{results.primeTins} × 5L tins</p>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
                        <p className="text-sm text-gray-600">Configuration</p>
                        <p className="text-lg font-bold text-gray-900">{results.coats} coats • {results.surfaceType === 'smooth' ? 'Smooth' : 'Textured'}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-6">
                      <h3 className="font-bold text-gray-900 mb-4">💡 Pro Tips</h3>
                      <ul className="text-sm text-gray-700 space-y-3">
                        <li><strong>Always buy extra:</strong> Add 10-15% for waste and touch-ups</li>
                        <li><strong>Primer first:</strong> Use primer on all new or patched areas</li>
                        <li><strong>Storage:</strong> Keep paint in cool, dry place for 2+ years</li>
                        <li><strong>Multiple coats:</strong> Lighter shades often need 3+ coats</li>
                        <li><strong>Drying time:</strong> Allow 4-8 hours between coats minimum</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-6 text-center">
                    ✓ Coverage calculated at {surfaceType === 'smooth' ? '12m²' : '10m²'} per litre • {results.coats} coat{results.coats !== 1 ? 's' : ''} included
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
                <li>• Textured surfaces need more paint</li>
                <li>• Measure height from skirting to ceiling</li>
                <li>• Subtract 20% for doors and windows</li>
                <li>• Dark colours need more coats</li>
                <li>• Always prime new plasterboard</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Palette className="w-5 h-5 text-red-600" />
                Paint Types
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Emulsion:</strong> For walls/ceilings</li>
                <li><strong>Gloss:</strong> For woodwork/trim</li>
                <li><strong>Satin:</strong> Mid-finish option</li>
                <li><strong>Primer:</strong> Essential first coat</li>
                <li><strong>Undercoat:</strong> Between primer & topcoat</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Painting Guide for Professionals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Paint Coverage & Types</h3>
              <p className="text-gray-700 text-sm mb-4">
                Standard emulsion paint coverage varies by surface. Smooth surfaces achieve 12m²/litre, while textured or porous surfaces get 8-10m²/litre.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ <strong>Smooth plaster:</strong> 12-14 m²/litre</li>
                <li>✓ <strong>Textured surface:</strong> 8-10 m²/litre</li>
                <li>✓ <strong>Brick/masonry:</strong> 6-8 m²/litre</li>
                <li>✓ <strong>Gloss paint:</strong> 16-18 m²/litre</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Surface Preparation Tips</h3>
              <p className="text-gray-700 text-sm mb-4">
                Proper preparation is key to professional results. All surfaces must be clean, dry, and properly primed before applying topcoat.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Clean all dirt and dust with damp cloth</li>
                <li>✓ Fill holes and cracks with filler</li>
                <li>✓ Sand down rough areas</li>
                <li>✓ Prime all new or patched areas</li>
                <li>✓ Use undercoat on bold colour changes</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Professional Application</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Apply paint in thin, even coats</li>
                <li>• Use correct brush/roller for surface</li>
                <li>• Work from top to bottom on walls</li>
                <li>• Maintain wet edge to avoid lap marks</li>
                <li>• Sand lightly between coats for better adhesion</li>
                <li>• Allow proper drying time between coats</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Colouring & Finishes</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>White/light shades:</strong> 1-2 coats</li>
                <li>• <strong>Mid-tone shades:</strong> 2-3 coats</li>
                <li>• <strong>Dark shades:</strong> 3-4 coats minimum</li>
                <li>• <strong>Accent walls:</strong> Plan carefully</li>
                <li>• <strong>Matte finish:</strong> Hides imperfections</li>
                <li>• <strong>Satin finish:</strong> Easy to clean</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded mt-8">
            <h3 className="font-bold text-gray-900 mb-2">Professional Quality Assurance</h3>
            <p className="text-sm text-gray-700">
              This calculator provides professional estimates for UK painting projects. Coverage rates are based on industry standards. Always account for waste and keep extra paint for touch-ups. For best results, always use quality primer and topcoat from reputable manufacturers. Test paint colours on large sample boards before committing.
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
      {showQuoteGenerator && results && (
        <QuoteGenerator
          calculationResults={{
            materials: [
              { item: `Emulsion Paint (${results.surfaceType})`, quantity: `${results.paintTins}`, unit: '5L tins' },
              { item: 'Primer/Sealer', quantity: `${results.primeTins}`, unit: '5L tins' },
              { item: 'Preparation Materials (filler, sandpaper, tape)', quantity: '1', unit: 'job' },
              { item: 'Professional Painting Labour', quantity: '1', unit: 'job' }
            ],
            summary: `${results.totalArea}m² painting project - ${results.coats} coat${results.coats !== 1 ? 's' : ''} on ${results.surfaceType} surface`
          }}
          onClose={() => setShowQuoteGenerator(false)}
        />
      )}
    </div>
  )
}


