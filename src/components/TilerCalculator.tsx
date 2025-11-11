import { useState } from 'react'
import { Info, CheckCircle2, HelpCircle, Layers } from 'lucide-react'

export default function TilerCalculator() {
  const [surfaceType, setSurfaceType] = useState<'floor' | 'wall'>('floor')
  const [tileSize, setTileSize] = useState('300')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [tilePattern, setTilePattern] = useState('grid')
  const [wasteFactor, setWasteFactor] = useState(10)
  const [groutWidth, setGroutWidth] = useState('3')
  const [results, setResults] = useState<any>(null)

  const calculate = () => {
    if (!length || !width) return

    const lengthM = parseFloat(length)
    const widthM = parseFloat(width)
    const area = lengthM * widthM
    const tileSizeM = parseFloat(tileSize) / 1000

    let tilesPerM2 = 1 / (tileSizeM * tileSizeM)
    let patternWaste = 1
    if (tilePattern === 'diagonal') patternWaste = 1.08
    else if (tilePattern === 'herringbone') patternWaste = 1.12

    const tilesNeeded = Math.ceil(area * tilesPerM2 * patternWaste * (1 + wasteFactor / 100))
    
    const groutWidthM = parseFloat(groutWidth) / 1000
    const groutLength = (lengthM / tileSizeM + widthM / tileSizeM) * groutWidthM * 0.01
    const groutKg = Math.ceil(groutLength * 1.6)

    const adhesiveM2 = area
    const adhesiveKg = Math.ceil(adhesiveM2 * 4.5)

    const primers = surfaceType === 'wall' ? Math.ceil(area / 10) : 0

    setResults({
      tilesNeeded,
      groutKg,
      adhesiveKg,
      primers,
      area: area.toFixed(2),
      pattern: tilePattern,
      surfaceType
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
            Professional Tiling Calculator for UK Tilers
          </h1>
          <p className="text-xl text-gray-700 mb-4">
            Calculate exact tile quantities, adhesive, and grout needed for walls and floors instantly
          </p>
          <p className="text-gray-600 mb-6">
            Industry-trusted tiling estimator for professional tilers across the UK. Supports grid, diagonal, and herringbone patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Materials</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Surface Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSurfaceType('floor')}
                      className={`py-2 px-4 rounded-lg font-semibold transition ${
                        surfaceType === 'floor'
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Floor Tiling
                    </button>
                    <button
                      onClick={() => setSurfaceType('wall')}
                      className={`py-2 px-4 rounded-lg font-semibold transition ${
                        surfaceType === 'wall'
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Wall Tiling
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Length (metres)</label>
                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="e.g. 4"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Width (metres)</label>
                    <input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="e.g. 3"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tile Size (mm)</label>
                  <select
                    value={tileSize}
                    onChange={(e) => setTileSize(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                  >
                    <option value="200">200×200mm (Small)</option>
                    <option value="300">300×300mm (Standard)</option>
                    <option value="400">400×400mm (Medium)</option>
                    <option value="600">600×600mm (Large)</option>
                    <option value="800">800×800mm (Extra Large)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tile Pattern</label>
                  <select
                    value={tilePattern}
                    onChange={(e) => setTilePattern(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                  >
                    <option value="grid">Grid Layout (Straight)</option>
                    <option value="diagonal">Diagonal Layout</option>
                    <option value="herringbone">Herringbone Pattern</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Grout Joint Width (mm)</label>
                  <select
                    value={groutWidth}
                    onChange={(e) => setGroutWidth(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                  >
                    <option value="1.5">1.5mm (Narrow)</option>
                    <option value="3">3mm (Standard)</option>
                    <option value="5">5mm (Wide)</option>
                    <option value="8">8mm (Extra Wide)</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-bold text-gray-700">Waste Factor: {wasteFactor}%</label>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={wasteFactor}
                    onChange={(e) => setWasteFactor(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical waste: 8-12% for simple patterns, up to 15% for complex</p>
                </div>

                <button
                  onClick={calculate}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold transition"
                >
                  Calculate Materials
                </button>
              </div>
            </div>

            {results && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex items-center gap-2 mb-6">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Materials Required</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                      <p className="text-sm text-gray-600">Surface Area</p>
                      <p className="text-2xl font-bold text-gray-900">{results.area} m²</p>
                    </div>

                    <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                      <p className="text-sm text-gray-600">Tiles Required</p>
                      <p className="text-2xl font-bold text-gray-900">{results.tilesNeeded.toLocaleString()}</p>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                      <p className="text-sm text-gray-600">Tile Adhesive</p>
                      <p className="text-2xl font-bold text-gray-900">{results.adhesiveKg} kg</p>
                      <p className="text-xs text-gray-500 mt-1">Ready-mix bags recommended</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                      <p className="text-sm text-gray-600">Grout Required</p>
                      <p className="text-2xl font-bold text-gray-900">{results.groutKg} kg</p>
                      <p className="text-xs text-gray-500 mt-1">{results.groutWidth} mm joints</p>
                    </div>

                    {results.surfaceType === 'wall' && (
                      <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
                        <p className="text-sm text-gray-600">Primer Needed</p>
                        <p className="text-2xl font-bold text-gray-900">{results.primers} litre{results.primers !== 1 ? 's' : ''}</p>
                        <p className="text-xs text-gray-500 mt-1">Wall primer/sealer</p>
                      </div>
                    )}

                    <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                      <p className="text-sm text-gray-600">Pattern Type</p>
                      <p className="text-xl font-bold text-gray-900">{results.pattern === 'grid' ? 'Grid Layout' : results.pattern === 'diagonal' ? 'Diagonal' : 'Herringbone'}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-6 text-center">
                  ✓ Includes {wasteFactor}% waste factor • {results.surfaceType === 'wall' ? 'Wall' : 'Floor'} tiling • {results.tileSize}mm tiles
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-600">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Quick Tips
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>Grid layout</strong>: Least waste, easiest installation</li>
                <li>• <strong>Diagonal</strong>: ~8% extra waste, looks premium</li>
                <li>• <strong>Herringbone</strong>: ~12% extra waste, most complex</li>
                <li>• <strong>Larger joints</strong>: Less grout, easier cleaning</li>
                <li>• Always order 10-15% extra for cuts and mistakes</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-600" />
                Product Types
              </h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Ceramic:</strong> Budget-friendly, durable</li>
                <li><strong>Porcelain:</strong> Dense, waterproof, premium</li>
                <li><strong>Natural Stone:</strong> Aesthetic, requires sealing</li>
                <li><strong>Glass:</strong> Modern look, slippery when wet</li>
                <li><strong>Mosaic:</strong> Decorative, high waste factor</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Tiling Guide for Professionals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Material Selection & Coverage</h3>
              <p className="text-gray-700 text-sm mb-4">
                Tile adhesive coverage varies by tile size and substrate. Standard consumption is 4-5 kg/m² for standard tiles. Larger tiles require notched trowels and more adhesive.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ <strong>Small tiles (200mm):</strong> 3-4 kg/m² adhesive</li>
                <li>✓ <strong>Medium tiles (300-400mm):</strong> 4-5 kg/m² adhesive</li>
                <li>✓ <strong>Large tiles (600mm+):</strong> 5-6 kg/m² adhesive</li>
                <li>✓ <strong>Grout:</strong> 1.5-2 kg per m² depending on joint width</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Surface Preparation Tips</h3>
              <p className="text-gray-700 text-sm mb-4">
                Proper substrate preparation is crucial for long-lasting tiling installations. All surfaces must be clean, dry, stable, and appropriately primed.
              </p>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>✓ Check substrate is flat (within 3mm over 2m)</li>
                <li>✓ Clean all dust, dirt, and contaminants</li>
                <li>✓ Prime porous surfaces (drywall, timber, concrete)</li>
                <li>✓ Use waterproofing membrane in wet areas</li>
                <li>✓ Apply primer 24 hours before tiling</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Installation Best Practices</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Use appropriate trowel size for tile dimensions</li>
                <li>• Maintain consistent grout joint spacing</li>
                <li>• Clean excess adhesive before setting</li>
                <li>• Allow adhesive to cure per manufacturer specs</li>
                <li>• Use grout sealer for natural stone and porous tiles</li>
                <li>• Avoid water exposure for 48-72 hours after grouting</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Pattern Layout Strategies</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• <strong>Grid:</strong> Start from center, work outward</li>
                <li>• <strong>Diagonal:</strong> Plan layout carefully to minimize cuts</li>
                <li>• <strong>Herringbone:</strong> Use spacers for perfect 90° angles</li>
                <li>• Avoid narrow slivers at room edges</li>
                <li>• Plan cuts for visual balance</li>
                <li>• Use appropriate spacing on vertical surfaces</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded mt-8">
            <h3 className="font-bold text-gray-900 mb-2">Professional Quality Assurance</h3>
            <p className="text-sm text-gray-700">
              This calculator provides professional estimates for UK building standards. Always verify substrate conditions, humidity levels, and temperature before installation. BS 3321 specifies adhesive and grout coverage requirements. For complex installations or large commercial projects, consider on-site material assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
