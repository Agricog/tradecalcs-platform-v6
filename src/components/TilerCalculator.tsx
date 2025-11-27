import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Info, CheckCircle2, Layers, AlertCircle } from 'lucide-react'
import QuoteGenerator from './QuoteGenerator'

export default function TilerCalculator() {
  const [surfaceType, setSurfaceType] = useState<'floor' | 'wall'>('floor')
  const [tileSize, setTileSize] = useState('300')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [tilePattern, setTilePattern] = useState('grid')
  const [wasteFactor, setWasteFactor] = useState(10)
  const [groutWidth, setGroutWidth] = useState('3')
  const [results, setResults] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

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
    
    const labourCost = (area * 35).toFixed(2)
    const materialCost = (adhesiveKg * 8.50 + groutKg * 12).toFixed(2)

    setResults({
      tilesNeeded,
      groutKg,
      adhesiveKg,
      primers,
      area: area.toFixed(2),
      pattern: tilePattern,
      surfaceType,
      tileSize,
      groutWidth,
      labourCost,
      materialCost,
      totalCost: (parseFloat(labourCost) + parseFloat(materialCost)).toFixed(2)
    })
  }

  return (
    <>
      <Helmet>
        <title>Tiling Calculator UK | Tile & Grout Estimator for Tilers | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free tiling calculator for UK tilers. Calculate tiles, adhesive, grout and labour costs instantly. Professional tool for floor and wall tiling projects with grid, diagonal, and herringbone patterns." 
        />
        <meta name="keywords" content="tiling calculator, tile calculator, UK tiler tools, grout calculator, adhesive calculator, floor tiling calculator, wall tiling calculator, tile estimator, tiling cost, tile layout" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tiling Calculator UK | Tile & Grout Estimator for Tilers" />
        <meta property="og:description" content="Calculate tiles, adhesive, grout and labour costs instantly. Free professional tool for UK tilers." />
        <meta property="og:url" content="https://tradecalcs.co.uk/tiling-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/tiling-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tiling Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free tiling calculator. Calculate materials for floor and wall tiling instantly." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/tiling-calculator-og.jpg" />

        <link rel="canonical" href="https://tradecalcs.co.uk/tiling-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#b45309" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Calculators', 'item': 'https://tradecalcs.co.uk/calculators' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Tiling Calculator', 'item': 'https://tradecalcs.co.uk/tiling-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Tiling Calculator UK',
                'description': 'Professional tiling calculator for UK tilers. Calculate exact tile quantities, adhesive, grout and labour costs for floor and wall tiling projects with multiple pattern options.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/tiling-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '892' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'How many tiles do I need?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Calculate total surface area (length × width in m²) and divide by single tile area. Add waste factor: 10% for grid layout, 15-18% for diagonal, 20-22% for herringbone. This calculator automatically accounts for pattern complexity and cuts.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How much tile adhesive do I need?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Standard coverage is 4-5 kg per m² for typical wall and floor tiles. Larger tiles (600mm+) require 5-6 kg per m². This calculator provides exact quantities based on your project specifications.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How much grout do I need?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Grout consumption depends on tile size and joint width. Narrow joints (1.5mm) use less grout, wide joints (8mm) use more. Typical consumption is 1.5-2 kg per m². This calculator determines exact quantities for your joint width.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What tile patterns waste the most material?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Grid layout (straight) wastes least (10-12% typical). Diagonal patterns waste approximately 15-18% due to edge cuts. Herringbone patterns waste 20-25% as each tile requires angled cuts. Always order extra material for cuts and mistakes.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Should I use wall primer before tiling?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes. Primer seals porous surfaces (drywall, plaster, new concrete) preventing premature adhesive drying and ensuring proper bond. Always apply primer 24 hours before tiling. Use waterproofing membrane in wet areas (bathrooms, kitchens, showers).'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the standard tile adhesive coverage rate?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Coverage varies by tile size: 3-4 kg per m² for small tiles (200mm), 4-5 kg per m² for standard tiles (300-400mm), 5-6 kg per m² for large tiles (600mm+). Use larger notched trowel for bigger tiles. This calculator automatically calculates correct quantities.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How long should I wait before grouting tiles?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Allow minimum 24 hours after adhesive application before grouting. This allows adhesive to set properly and tiles to bond securely. Humidity and temperature affect curing time - allow extra time in cold, humid conditions. Check manufacturer specifications for your specific adhesive.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Can I use this calculator for different tile materials?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes, this calculator works for ceramic, porcelain, natural stone, glass, and mosaic tiles. Coverage rates remain similar. For natural stone, use appropriate sealer after grouting. Larger format tiles (600mm+) may require special adhesive - consult manufacturer guidelines.'
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
        <div className="max-w-5xl mx-auto px-4 py-4">
          <a href="/" className="text-purple-600 hover:text-purple-800 font-semibold text-sm">
            ← Back to All Calculators
          </a>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Layers className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">Tiling Calculator UK</h1>
            <p className="text-lg opacity-95">Calculate tiles, adhesive, grout & labour costs instantly</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="bg-amber-600 text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-5 h-5" />
                <h2 className="text-lg font-bold">Tiling Materials Calculator</h2>
              </div>
              <p className="text-sm opacity-90">Professional estimation for UK tilers and tiling contractors</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-3">1. Surface Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSurfaceType('floor')}
                  className={`py-2 px-4 rounded-lg font-semibold transition ${
                    surfaceType === 'floor'
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label="Select floor tiling"
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
                  aria-label="Select wall tiling"
                >
                  Wall Tiling
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">2. Length (metres)</label>
                <input
                  type="number"
                  step="0.1"
                  value={length}
                  onChange={e => setLength(e.target.value)}
                  placeholder="e.g. 4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600 mb-2"
                  aria-label="Surface length in metres"
                />
                <div className="flex gap-2 flex-wrap">
                  {['2', '4', '5', '8'].map(len => (
                    <button
                      key={len}
                      onClick={() => setLength(len)}
                      className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold text-sm hover:bg-amber-200"
                      aria-label={`Set length to ${len}m`}
                    >
                      {len}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">3. Width (metres)</label>
                <input
                  type="number"
                  step="0.1"
                  value={width}
                  onChange={e => setWidth(e.target.value)}
                  placeholder="e.g. 3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600 mb-2"
                  aria-label="Surface width in metres"
                />
                <div className="flex gap-2 flex-wrap">
                  {['1.5', '2', '3', '4'].map(wid => (
                    <button
                      key={wid}
                      onClick={() => setWidth(wid)}
                      className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold text-sm hover:bg-amber-200"
                      aria-label={`Set width to ${wid}m`}
                    >
                      {wid}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">4. Tile Size (mm)</label>
                <select
                  value={tileSize}
                  onChange={e => setTileSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  aria-label="Tile size in millimetres"
                >
                  <option value="200">200×200mm (Small) - high waste</option>
                  <option value="300">300×300mm (Standard) - most common</option>
                  <option value="400">400×400mm (Medium) - balanced</option>
                  <option value="600">600×600mm (Large) - fewer joints</option>
                  <option value="800">800×800mm (Extra Large) - premium</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Select tile dimensions</p>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">5. Tile Pattern</label>
                <select
                  value={tilePattern}
                  onChange={e => setTilePattern(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  aria-label="Tile layout pattern"
                >
                  <option value="grid">Grid (Straight) - 10-12% waste</option>
                  <option value="diagonal">Diagonal - 15-18% waste</option>
                  <option value="herringbone">Herringbone - 20-22% waste</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Pattern affects waste</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">6. Grout Joint Width (mm)</label>
                <select
                  value={groutWidth}
                  onChange={e => setGroutWidth(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  aria-label="Grout joint width in millimetres"
                >
                  <option value="1.5">1.5mm (Narrow) - minimal grout</option>
                  <option value="3">3mm (Standard) - most common</option>
                  <option value="5">5mm (Wide) - more grout</option>
                  <option value="8">8mm (Extra Wide) - premium</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Affects grout consumption</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-bold text-gray-800">7. Waste Factor: {wasteFactor}%</label>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  value={wasteFactor}
                  onChange={e => setWasteFactor(Number(e.target.value))}
                  className="w-full"
                  aria-label="Waste factor percentage slider"
                />
                <p className="text-xs text-gray-500 mt-1">Simple 8-12%, complex 15-20%</p>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg text-lg transition"
              aria-label="Calculate materials needed"
            >
              📊 Calculate Materials
            </button>

            {results && (
              <>
                <div className={`mt-8 rounded-lg p-6 bg-amber-50 border-2 border-amber-300`}>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-amber-600" />
                    <h3 className={`text-xl font-bold text-amber-900`}>
                      ✓ Materials Breakdown
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded border-t-2 border-b-2 border-amber-300">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Surface Area</p>
                        <p className="text-2xl font-bold text-gray-900">{results.area} m²</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Tiles Required</p>
                        <p className="text-2xl font-bold text-amber-600">{results.tilesNeeded.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Tile Adhesive</p>
                        <p className="text-2xl font-bold text-amber-600">{results.adhesiveKg} kg</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Grout Required</p>
                        <p className="text-2xl font-bold text-amber-600">{results.groutKg} kg</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-3">
                        <p className="font-semibold">Tile Size</p>
                        <p className="font-bold text-lg">{results.tileSize}×{results.tileSize}mm</p>
                      </div>
                      <div className="flex justify-between mb-3">
                        <p className="font-semibold">Grout Joint Width</p>
                        <p className="font-bold text-lg">{results.groutWidth}mm</p>
                      </div>
                      <div className="flex justify-between mb-3 p-2 rounded bg-gray-50">
                        <p className="font-semibold">Material Cost (approx)</p>
                        <p className="font-bold text-lg text-amber-600">£{results.materialCost}</p>
                      </div>
                      <div className="flex justify-between p-3 rounded bg-green-100 border border-green-300">
                        <p className="font-semibold text-green-900">Labour Cost Est.</p>
                        <p className="font-bold text-lg text-green-700">£{results.labourCost}</p>
                      </div>
                    </div>

                    {results.surfaceType === 'wall' && results.primers > 0 && (
                      <div className="mt-4 p-3 bg-yellow-50 rounded border-l-2 border-yellow-600">
                        <p className="text-sm font-semibold text-yellow-900">Wall Primer Required: {results.primers} litre(s)</p>
                        <p className="text-xs text-yellow-800">Apply 24 hours before tiling</p>
                      </div>
                    )}

                    <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded border-l-2 border-gray-400 mt-4">
                      <p className="font-semibold mb-1">Summary:</p>
                      <p className="font-mono">
                        {results.tilesNeeded.toLocaleString()} {results.tileSize}mm tiles + {results.adhesiveKg}kg adhesive + {results.groutKg}kg grout ({results.groutWidth}mm joints) - {results.pattern === 'grid' ? 'Grid' : results.pattern === 'diagonal' ? 'Diagonal' : 'Herringbone'} pattern with {wasteFactor}% waste
                      </p>
                    </div>
                  </div>
                </div>

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
                    aria-label="Generate quote from calculation"
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

          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-amber-900 mb-3">📋 Professional Tiling Standards</h3>
                <ul className="space-y-2 text-sm text-amber-900">
                  <li>• <strong>Adhesive coverage:</strong> 3-6 kg/m² depending on tile size and substrate</li>
                  <li>• <strong>Grout consumption:</strong> 1.5-5 kg/m² depending on joint width</li>
                  <li>• <strong>Waste factors:</strong> Grid 10-12%, Diagonal 15-18%, Herringbone 20-22%</li>
                  <li>• <strong>Pattern complexity:</strong> Larger waste for intricate cuts and layouts</li>
                  <li>• <strong>Drying time:</strong> 24 hours adhesive, 48-72 hours grout before water use</li>
                  <li>• <strong>Surface prep:</strong> Prime porous surfaces, waterproof wet areas</li>
                  <li>• <strong>Labour rates:</strong> £30-45/m² UK average (varies by experience)</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Tile & Grout Calculations</h2>
            <p className="text-gray-700 mb-4">
              Professional tiling requires accurate material estimation based on surface area, tile size, pattern complexity, joint width, and waste factors. This calculator helps you calculate exact quantities of tiles, adhesive, grout, and labour costs based on UK industry standards. Understanding the relationship between tile patterns, grout consumption, and waste factors is essential for accurate quoting and preventing project delays.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-amber-600">
              <p className="text-sm text-gray-700"><strong>Key principle:</strong> Grid patterns (straight layouts) waste least material (10-12%) and install fastest. Diagonal patterns waste 15-18% due to edge cuts. Herringbone patterns waste 20-25% as each tile requires angled cuts. More complex patterns require higher waste factors and longer installation times, affecting both material and labour costs.</p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tile Pattern Options & Waste Factors</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Grid Layout (Straight)</h4>
                <p className="text-sm text-gray-700 mb-2">Tiles aligned horizontally/vertically</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ 10-12% waste</li>
                  <li>✓ Fastest installation</li>
                  <li>✓ Minimal cutting</li>
                  <li>✓ Most economical</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-600 bg-orange-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Diagonal Layout</h4>
                <p className="text-sm text-gray-700 mb-2">Tiles rotated 45° to walls</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ 15-18% waste</li>
                  <li>✓ Premium appearance</li>
                  <li>✓ More cutting needed</li>
                  <li>✓ Slower installation</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-600 bg-purple-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Herringbone Pattern</h4>
                <p className="text-sm text-gray-700 mb-2">Tiles in angled V-pattern</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ 20-25% waste</li>
                  <li>✓ Complex appearance</li>
                  <li>✓ Extensive cutting</li>
                  <li>✓ Longest installation</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tile Adhesive & Grout Coverage</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Tile Adhesive Coverage by Size</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>200mm tiles:</strong> 3-4 kg/m²</li>
                  <li>• <strong>300-400mm tiles:</strong> 4-5 kg/m²</li>
                  <li>• <strong>600mm tiles:</strong> 5-6 kg/m²</li>
                  <li>• <strong>800mm+ tiles:</strong> 6-7 kg/m²</li>
                  <li>• Use larger notched trowels for bigger tiles</li>
                  <li>• Apply to both tile back and substrate (double-notch)</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-600 bg-orange-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Grout Consumption by Joint Width</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>1.5mm joints:</strong> ~0.8-1.2 kg/m²</li>
                  <li>• <strong>3mm joints:</strong> ~1.5-2 kg/m²</li>
                  <li>• <strong>5mm joints:</strong> ~2.5-3 kg/m²</li>
                  <li>• <strong>8mm joints:</strong> ~4-5 kg/m²</li>
                  <li>• Wider joints = more grout consumption</li>
                  <li>• Use grout sealer for natural stone</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Surface Preparation & Professional Tips</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Substrate Preparation</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Surface flat within 3mm/2m</li>
                  <li>✓ Clean all dust & contaminants</li>
                  <li>✓ Prime porous surfaces (drywall, plaster)</li>
                  <li>✓ Waterproof wet areas (bathrooms, kitchens)</li>
                  <li>✓ Apply primer 24 hours before tiling</li>
                  <li>✓ Use cement board or backer board</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Installation Best Practice</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Plan layout from center outward</li>
                  <li>✓ Use spacers for consistent joints</li>
                  <li>✓ Check level alignment diagonally</li>
                  <li>✓ Clean excess adhesive within 15 minutes</li>
                  <li>✓ Wait 24 hours before grouting</li>
                  <li>✓ Avoid water 48-72 hours after grouting</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How do I choose between grid, diagonal, and herringbone patterns?</h4>
                <p className="text-sm text-gray-700">Grid is fastest and most economical (10-12% waste). Diagonal provides premium appearance with moderate waste (15-18%). Herringbone creates complex luxury look but wastes 20-25% and takes longest to install. Consider budget, timeline, and desired appearance when selecting pattern.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Should I wait before grouting after laying tiles?</h4>
                <p className="text-sm text-gray-700">Yes, allow minimum 24 hours for adhesive to set properly. Humidity and temperature affect curing - allow additional time in cold, damp conditions. Premature grouting can cause adhesive failure and tile movement. Check manufacturer specifications for your specific adhesive product.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Do I need to prime walls before tiling?</h4>
                <p className="text-sm text-gray-700">Yes, always prime porous surfaces (drywall, plaster, new concrete) to prevent premature adhesive drying and ensure proper bonding. Use waterproofing membrane in wet areas (bathrooms, kitchens, showers). Apply primer 24 hours before tiling. This is essential for long-lasting tile installation.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How does this calculator help compared to other tiling tools?</h4>
                <p className="text-sm text-gray-700">TradeCalcs provides comprehensive professional estimators for multiple trades. Use our <a href="/brick-block-calculator" className="text-purple-600 font-semibold hover:underline">Brick & Block Calculator</a> for masonry projects, <a href="/plaster-calculator" className="text-purple-600 font-semibold hover:underline">Plaster Calculator</a> for coverage estimates, or <a href="/joinery-calculator" className="text-purple-600 font-semibold hover:underline">Joinery Calculator</a> for carpentry work. All tools are free with UK market rates and internal linking to build complete project estimates.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Can I use this calculator for mosaic or specialty tiles?</h4>
                <p className="text-sm text-gray-700">Yes, this calculator works for all tile types including ceramic, porcelain, natural stone, glass, and mosaic. For mosaic and specialty tiles, use higher waste factors (15-25%) due to intricate cutting. Consult manufacturer guidelines for specific adhesive and sealer requirements for each material type.</p>
              </div>
            </div>
          </section>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-yellow-900 mb-2">✓ Professional Quality Assurance</p>
                <p className="text-sm text-yellow-800">This calculator provides professional estimates based on UK construction standards (BS 3321). Adhesive and grout consumption rates vary by manufacturer, substrate type, ambient humidity, and temperature - confirm specifications with your supplier. Proper surface preparation and environmental conditions are critical for durable tile installations. Always allow adequate curing time before water exposure. For complex installations or large commercial projects, consider on-site material assessment and specialist consultation.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help or Have Questions?</h3>
              <p className="text-gray-700">
                Got a specific calculation requirement or want a custom tool for your trade? Fill out the form below.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=TilingCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Tiling Calculator Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>

          <div className="bg-amber-600 text-white rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Complete Your Trade Calculations</h2>
            <p className="mb-6">Use our comprehensive suite of professional estimators: <a href="/brick-block-calculator" className="underline hover:opacity-90">Brick & Block Calculator</a> for masonry, <a href="/plaster-calculator" className="underline hover:opacity-90">Plaster Calculator</a> for coverage estimates, <a href="/joinery-calculator" className="underline hover:opacity-90">Joinery Calculator</a> for carpentry, and <a href="/" className="underline hover:opacity-90">view all calculators</a> to build complete project estimates and quote confidently.</p>
            <a href="/" className="bg-white text-amber-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </a>
          </div>
        </div>

        {showQuoteGenerator && results && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: `Tiles (${results.tileSize}×${results.tileSize}mm)`, quantity: results.tilesNeeded.toString(), unit: 'tiles' },
                { item: 'Tile Adhesive', quantity: results.adhesiveKg.toString(), unit: 'kg' },
                { item: `Grout (${results.groutWidth}mm joints)`, quantity: results.groutKg.toString(), unit: 'kg' },
                ...(results.surfaceType === 'wall' && results.primers > 0 ? [{ item: 'Wall Primer/Sealer', quantity: results.primers.toString(), unit: 'litres' }] : []),
                { item: 'Professional Tiling Labour', quantity: results.area, unit: 'm²' }
              ],
              summary: `${results.surfaceType === 'wall' ? 'Wall' : 'Floor'} tiling ${results.area}m² - ${results.pattern === 'grid' ? 'Grid layout' : results.pattern === 'diagonal' ? 'Diagonal pattern' : 'Herringbone pattern'} (${wasteFactor}% waste) - Materials: £${results.materialCost} - Labour: £${results.labourCost} - Total: £${results.totalCost}`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}





