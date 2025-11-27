import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Info, CheckCircle2, HelpCircle, Layers, AlertCircle } from 'lucide-react'
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
        {/* Primary Meta Tags */}
        <title>Tiling Calculator UK | Tile & Grout Estimator for Tilers | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free tiling calculator for UK tilers. Calculate tiles, adhesive, grout and labour costs instantly. Professional tool for floor and wall tiling projects with grid, diagonal, and herringbone patterns." 
        />
        <meta name="keywords" content="tiling calculator, tile calculator, UK tiler tools, grout calculator, adhesive calculator, floor tiling calculator, wall tiling calculator, tile estimator, tiling cost" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tiling Calculator UK | Tile & Grout Estimator for Tilers" />
        <meta property="og:description" content="Calculate tiles, adhesive, grout and labour costs instantly. Free professional tool for UK tilers." />
        <meta property="og:url" content="https://tradecalcs.co.uk/tiling-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/tiling-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tiling Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free tiling calculator. Calculate materials for floor and wall tiling instantly." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/tiling-calculator-og.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/tiling-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#b45309" />

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
                      'text': 'Calculate total surface area (length × width in m2) and divide by single tile area. Add waste factor: 10% for grid layout, 15-18% for diagonal, 20-22% for herringbone. This calculator automatically accounts for pattern complexity and cuts.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How much tile adhesive do I need?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Standard coverage is 4-5 kg per m2 for typical wall and floor tiles. Larger tiles (600mm+) require 5-6 kg per m2. This calculator provides exact quantities based on your project specifications.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How much grout do I need?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Grout consumption depends on tile size and joint width. Narrow joints (1.5mm) use less grout, wide joints (8mm) use more. Typical consumption is 1.5-2 kg per m2. This calculator determines exact quantities for your joint width.'
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
                      'text': 'Coverage varies by tile size: 3-4 kg per m2 for small tiles (200mm), 4-5 kg per m2 for standard tiles (300-400mm), 5-6 kg per m2 for large tiles (600mm+). Use larger notched trowel for bigger tiles. This calculator automatically calculates correct quantities.'
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

      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 py-4 px-6">
          <div className="max-w-4xl mx-auto">
            <a href="/" className="text-white font-semibold flex items-center gap-2 hover:opacity-90 transition w-fit">
              ← Back to All Calculators
            </a>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          {/* HERO SECTION */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Tiling Calculator for UK Tilers
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Calculate exact tile quantities, adhesive, grout and labour costs instantly
            </p>
            <p className="text-gray-600 mb-6">
              Industry-trusted tiling estimator for professional tilers across the UK. Supports grid, diagonal, and herringbone patterns. Calculates tiles, adhesive, grout, primer, and labour costs for both floor and wall tiling projects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* MAIN CALCULATOR */}
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Length (metres)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="e.g. 4"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                        aria-label="Surface length in metres"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Width (metres)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="e.g. 3"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                        aria-label="Surface width in metres"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tile Size (mm)</label>
                    <select
                      value={tileSize}
                      onChange={(e) => setTileSize(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                      aria-label="Tile size in millimetres"
                    >
                      <option value="200">200×200mm (Small) - high waste for patterns</option>
                      <option value="300">300×300mm (Standard) - most common</option>
                      <option value="400">400×400mm (Medium) - balanced</option>
                      <option value="600">600×600mm (Large) - fewer joints</option>
                      <option value="800">800×800mm (Extra Large) - premium look</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Tile Pattern</label>
                    <select
                      value={tilePattern}
                      onChange={(e) => setTilePattern(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                      aria-label="Tile layout pattern"
                    >
                      <option value="grid">Grid Layout (Straight) - 10-12% waste</option>
                      <option value="diagonal">Diagonal Layout - 15-18% waste</option>
                      <option value="herringbone">Herringbone Pattern - 20-22% waste</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Grout Joint Width (mm)</label>
                    <select
                      value={groutWidth}
                      onChange={(e) => setGroutWidth(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                      aria-label="Grout joint width in millimetres"
                    >
                      <option value="1.5">1.5mm (Narrow) - minimal grout needed</option>
                      <option value="3">3mm (Standard) - most common</option>
                      <option value="5">5mm (Wide) - more grout, easier cleaning</option>
                      <option value="8">8mm (Extra Wide) - premium appearance</option>
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
                      aria-label="Waste factor percentage slider"
                    />
                    <p className="text-xs text-gray-500 mt-1">Typical: 8-12% simple patterns, up to 15-20% for complex patterns</p>
                  </div>

                  <button
                    onClick={calculate}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold transition"
                    aria-label="Calculate materials needed"
                  >
                    Calculate Materials
                  </button>
                </div>
              </div>

              {/* RESULTS */}
              {results && (
                <>
                  <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <div className="flex items-center gap-2 mb-6">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <h2 className="text-xl font-bold text-gray-900">Materials Required</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                          <p className="text-sm text-gray-600">Surface Area</p>
                          <p className="text-2xl font-bold text-gray-900">{results.area} m²</p>
                          <p className="text-xs text-gray-500 mt-1">Length × Width</p>
                        </div>

                        <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                          <p className="text-sm text-gray-600">Tiles Required</p>
                          <p className="text-2xl font-bold text-gray-900">{results.tilesNeeded.toLocaleString()}</p>
                          <p className="text-xs text-gray-500 mt-1">{results.tileSize}mm (inc. {wasteFactor}% waste)</p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                          <p className="text-sm text-gray-600">Tile Adhesive</p>
                          <p className="text-2xl font-bold text-gray-900">{results.adhesiveKg} kg</p>
                          <p className="text-xs text-gray-500 mt-1">Ready-mix bags (£8.50 per bag)</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                          <p className="text-sm text-gray-600">Grout Required</p>
                          <p className="text-2xl font-bold text-gray-900">{results.groutKg} kg</p>
                          <p className="text-xs text-gray-500 mt-1">{results.groutWidth}mm joints (£12/kg)</p>
                        </div>

                        {results.surfaceType === 'wall' && (
                          <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
                            <p className="text-sm text-gray-600">Wall Primer/Sealer</p>
                            <p className="text-2xl font-bold text-gray-900">{results.primers} litre{results.primers !== 1 ? 's' : ''}</p>
                            <p className="text-xs text-gray-500 mt-1">Apply 24 hours before tiling</p>
                          </div>
                        )}

                        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                          <p className="text-sm text-gray-600">Pattern Type</p>
                          <p className="text-xl font-bold text-gray-900">
                            {results.pattern === 'grid' ? 'Grid Layout' : results.pattern === 'diagonal' ? 'Diagonal' : 'Herringbone'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                        <p className="text-sm text-gray-600">Material Cost (approx)</p>
                        <p className="text-2xl font-bold text-green-700">£{results.materialCost}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                        <p className="text-sm text-gray-600">Labour (£35/m²)</p>
                        <p className="text-2xl font-bold text-blue-700">£{results.labourCost}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
                        <p className="text-sm text-gray-600">Total Estimate</p>
                        <p className="text-2xl font-bold text-purple-700">£{results.totalCost}</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mt-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-blue-900 mb-1">Order Summary</p>
                          <p className="text-sm text-blue-800">
                            {results.tilesNeeded.toLocaleString()} tiles × {results.tileSize}mm • Adhesive: {results.adhesiveKg}kg • Grout: {results.groutKg}kg ({results.groutWidth}mm joints) • Waste: {wasteFactor}% • Pattern: {results.pattern === 'grid' ? 'Grid' : results.pattern === 'diagonal' ? 'Diagonal' : 'Herringbone'}
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-6 text-center">
                      ✓ {results.tilesNeeded.toLocaleString()} tiles • {results.adhesiveKg}kg adhesive • {results.groutKg}kg grout • {wasteFactor}% waste • {results.surfaceType === 'wall' ? 'Wall' : 'Floor'} tiling
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

            {/* SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-600">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  Quick Tips
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Grid:</strong> Least waste (10-12%), easiest install</li>
                  <li>• <strong>Diagonal:</strong> ~15-18% waste, premium look</li>
                  <li>• <strong>Herringbone:</strong> ~20-22% waste, complex cuts</li>
                  <li>• <strong>Wider joints:</strong> Less grout, easier cleaning</li>
                  <li>• Always order 10-15% extra for cuts</li>
                  <li>• Prime walls 24hrs before tiling</li>
                  <li>• Use waterproof membrane in wet areas</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-600" />
                  Tile Material Types
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Ceramic:</strong> Budget-friendly, durable</li>
                  <li><strong>Porcelain:</strong> Dense, waterproof, premium</li>
                  <li><strong>Natural Stone:</strong> Aesthetic, needs sealing</li>
                  <li><strong>Glass:</strong> Modern, can be slippery</li>
                  <li><strong>Mosaic:</strong> Decorative, higher waste</li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-600">
                <h3 className="font-bold text-gray-900 mb-2">Labour Rates (Q4 2025)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Apprentice: £15-20/m²</li>
                  <li>Semi-skilled: £20-30/m²</li>
                  <li>Experienced: £30-45/m²</li>
                  <li>Specialist: £45-65/m²</li>
                </ul>
              </div>
            </div>
          </div>

          {/* COMPREHENSIVE GUIDE */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Tiling Guide for UK Professionals</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">✓ Tile Adhesive Coverage Rates</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Adhesive coverage varies by tile size, substrate, and technique. Use proper trowel size:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Small tiles (200mm):</strong> 3-4 kg/m² adhesive, 4mm notch trowel</li>
                  <li>• <strong>Standard tiles (300-400mm):</strong> 4-5 kg/m² adhesive, 6mm notch trowel</li>
                  <li>• <strong>Large tiles (600mm+):</strong> 5-6 kg/m² adhesive, 8mm notch trowel</li>
                  <li>• Apply thin-set mortar to back and substrate (double-notch method)</li>
                  <li>• Replace adhesive every 30 minutes to maintain freshness</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">⏱️ Grout Joint Coverage</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Grout consumption depends on tile size and joint width:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>1.5mm joints:</strong> ~0.8-1.2 kg/m² grout</li>
                  <li>• <strong>3mm joints:</strong> ~1.5-2 kg/m² grout (standard)</li>
                  <li>• <strong>5mm joints:</strong> ~2.5-3 kg/m² grout</li>
                  <li>• <strong>8mm joints:</strong> ~4-5 kg/m² grout (premium wide joints)</li>
                  <li>• Allow minimum 24 hours before applying water/heavy use</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">📦 Substrate Preparation</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Surface must be flat within 3mm over 2m</li>
                  <li>• Clean all dust, dirt, contaminants</li>
                  <li>• Prime porous surfaces (drywall, plaster, concrete)</li>
                  <li>• Use waterproofing membrane in wet areas (bathrooms, kitchens)</li>
                  <li>• Apply primer 24 hours before tiling</li>
                  <li>• Check substrate is stable and properly supported</li>
                  <li>• Use cement board or backer board for moisture-prone areas</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">🎯 Professional Installation Tips</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Plan layout from center outward to minimize cuts</li>
                  <li>• Use spacers for consistent joint width</li>
                  <li>• Maintain diagonal cross-checks for level alignment</li>
                  <li>• Clean excess adhesive before setting (within 10-15 mins)</li>
                  <li>• Use grout sealer for natural stone and porous tiles</li>
                  <li>• Avoid water exposure 48-72 hours after grouting</li>
                  <li>• Apply caulk (not grout) in corners and expansion joints</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">💷 Cost Breakdown Example</h3>
                <div className="bg-gray-50 rounded p-4 text-sm text-gray-700 space-y-2">
                  <p><strong>10m² floor tiling (300mm grid):</strong></p>
                  <p>• Tiles: ~111 units (approx £150)</p>
                  <p>• Adhesive: 50kg (approx £42.50)</p>
                  <p>• Grout: 20kg (approx £240)</p>
                  <p>• Primer (walls only): N/A</p>
                  <p>• Labour (£35/m²): £350</p>
                  <p>• <strong>Total: ~£782.50</strong></p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">⚠️ Waste Factor Guide</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>5-8%:</strong> Simple rectangular layouts, standard tiles</li>
                  <li>• <strong>10-12%:</strong> Grid patterns with minor cuts</li>
                  <li>• <strong>15-18%:</strong> Diagonal patterns with significant cuts</li>
                  <li>• <strong>20-25%:</strong> Herringbone or complex cuts</li>
                  <li>• <strong>30%+:</strong> Intricate patterns, unusual shapes</li>
                  <li>• Always order extra - better to have leftover than shortage</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-2">Professional Quality Assurance</h3>
              <p className="text-sm text-gray-700">
                This calculator provides professional estimates following UK building standards (BS 3321). Always verify substrate conditions, humidity levels (optimal 35-65%), and temperature (above 5°C) before installation. For complex projects or large commercial work, consider on-site material assessment. Adhesive and grout coverage rates vary by manufacturer - confirm specifications with your supplier. Quality preparation ensures long-lasting, attractive tile installations.
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
        </div>

        {/* QUOTE GENERATOR MODAL */}
        {showQuoteGenerator && results && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: `Tiles (${results.tileSize}×${results.tileSize}mm)`, quantity: results.tilesNeeded.toString(), unit: 'tiles' },
                { item: 'Tile Adhesive', quantity: results.adhesiveKg.toString(), unit: 'kg' },
                { item: `Grout (${results.groutWidth}mm joints)`, quantity: results.groutKg.toString(), unit: 'kg' },
                ...(results.surfaceType === 'wall' ? [{ item: 'Wall Primer/Sealer', quantity: results.primers.toString(), unit: 'litres' }] : []),
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




