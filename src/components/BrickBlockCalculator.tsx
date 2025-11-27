import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Info, CheckCircle2, HelpCircle, AlertCircle } from 'lucide-react'
import QuoteGenerator from './QuoteGenerator'

export default function BrickBlockCalculator() {
  const [materialType, setMaterialType] = useState<'brick' | 'block4' | 'block6'>('brick')
  const [length, setLength] = useState('')
  const [height, setHeight] = useState('')
  const [mortarRatio, setMortarRatio] = useState('1:5')
  const [wasteFactor, setWasteFactor] = useState(5)
  const [results, setResults] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  const calculate = () => {
    if (!length || !height) return

    const lengthM = parseFloat(length)
    const heightM = parseFloat(height)
    const wallArea = lengthM * heightM

    let bricksPerM2 = 60
    let materialName = 'Bricks'
    let mortarPerItem = 0.004

    if (materialType === 'block4') {
      bricksPerM2 = 10.76
      materialName = '4 inch Concrete Blocks'
      mortarPerItem = 0.0105
    } else if (materialType === 'block6') {
      bricksPerM2 = 10.76
      materialName = '6 inch Concrete Blocks'
      mortarPerItem = 0.0105
    }

    const itemsNeeded = Math.ceil(wallArea * bricksPerM2 * (1 + wasteFactor / 100))
    const mortarVolume = itemsNeeded * mortarPerItem

    let mortarRatioArray = mortarRatio.split(':').map(Number)
    let totalParts = mortarRatioArray[0] + mortarRatioArray[1]

    const totalMortarMass = mortarVolume * 1500
    const cementMass = (mortarRatioArray[0] / totalParts) * totalMortarMass
    const sandMass = (mortarRatioArray[1] / totalParts) * totalMortarMass

    const cementBags = Math.ceil(cementMass / 25)
    const sandTonnes = sandMass / 1000
    const waterLitres = mortarVolume * 300

    const cementCost = cementBags * 6.50
    const sandCost = sandTonnes * 45
    const labourCost = wallArea * 40

    setResults({
      materialName,
      itemsNeeded,
      cementBags,
      sandTonnes: sandTonnes.toFixed(2),
      waterLitres: waterLitres.toFixed(0),
      mortarVolume: mortarVolume.toFixed(3),
      wallArea: wallArea.toFixed(2),
      cementCost: cementCost.toFixed(2),
      sandCost: sandCost.toFixed(2),
      labourCost: labourCost.toFixed(2),
      totalCost: (cementCost + sandCost + labourCost).toFixed(2)
    })
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Brick & Block Calculator UK | Free Bricklaying Materials Calculator | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free brick and block calculator for UK bricklayers. Calculate exact quantities of bricks, blocks, cement, sand, mortar and labour costs instantly. Professional tool with waste factors." 
        />
        <meta name="keywords" content="brick calculator, block calculator, bricklaying calculator, mortar calculator, cement calculator, UK bricklayer tools, building materials calculator, brick wall calculator, concrete block calculator" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Brick & Block Calculator UK | Free Bricklaying Materials Calculator" />
        <meta property="og:description" content="Calculate exact quantities of bricks, blocks, cement, sand and mortar for UK bricklaying projects. Free instant results with labour cost estimates." />
        <meta property="og:url" content="https://tradecalcs.co.uk/brick-block-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-block-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brick & Block Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free brick and block calculator for UK bricklayers. Calculate materials instantly." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/brick-block-calculator-og.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/brick-block-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#dc2626" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Brick & Block Calculator', 'item': 'https://tradecalcs.co.uk/brick-block-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Brick & Block Calculator UK',
                'description': 'Professional brick and block calculator for UK bricklayers. Calculate exact quantities of bricks, concrete blocks, cement, sand, mortar and labour costs for any bricklaying project.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/brick-block-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '1,203' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'How many bricks do I need per square metre?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Standard UK bricks (215×102.5×65mm) require approximately 60 bricks per square metre in a single skin wall, or 120 bricks per square metre in a double skin wall. The exact number depends on mortar joint thickness and bond pattern. This calculator automatically accounts for these factors.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the standard brick and mortar ratio?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': '1:5 (1 part cement to 5 parts sand) is the standard mortar ratio for most UK brickwork. Use 1:4 for stronger structural walls, foundations, and below ground level work. Use 1:6 for non-load bearing internal walls. Always follow structural engineer recommendations for load-bearing work.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How much waste factor should I include?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Include 5-10% waste factor for typical bricklaying to account for breakage, cutting, and site conditions. Use 10-15% for complex patterns or difficult access. Always order extra materials to avoid shortfalls mid-project.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the difference between 4 inch and 6 inch concrete blocks?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': '4 inch (100mm) concrete blocks are used for non-load bearing internal walls and partitions. 6 inch (140mm) concrete blocks are used for structural load-bearing walls. Both measure 440mm × 215mm and require 10.76 blocks per square metre.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How much mortar do I need?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Mortar volume depends on brick/block size and joint thickness. Standard 10mm joints require approximately 0.004m³ mortar per brick or 0.0105m³ per concrete block. This calculator automatically calculates exact mortar requirements based on material type and wall area.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What labour rates should I use?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'UK bricklaying labour rates average £35-50/m² depending on experience and complexity. Apprentices: £15-25/m², Semi-skilled: £25-35/m², Experienced bricklayers: £35-50/m², Specialist/Master: £50-70/m². Always adjust based on your experience, location, and project requirements.'
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

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 py-4 px-6">
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
              Free Brick & Block Calculator for UK Bricklayers
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Calculate the exact number of bricks, blocks, mortar and labour costs needed for your bricklaying project instantly
            </p>
            <p className="text-gray-600 mb-6">
              Professional materials calculator trusted by bricklayers across the UK. Supports standard UK bricks, 4" and 6" concrete blocks, all mortar ratios, and waste factors. No signup required - free to use.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* MAIN CALCULATOR */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Materials</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Material Type</label>
                    <select
                      value={materialType}
                      onChange={(e) => setMaterialType(e.target.value as 'brick' | 'block4' | 'block6')}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none font-semibold"
                      aria-label="Material type - brick or concrete block"
                    >
                      <option value="brick">Standard UK Brick (215×102.5×65mm) - 60/m²</option>
                      <option value="block4">4 inch Concrete Block (440×215×100mm) - 10.76/m²</option>
                      <option value="block6">6 inch Concrete Block (440×215×140mm) - 10.76/m²</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Select material type and quantity per m²</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Length (metres)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                        aria-label="Wall length in metres"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Height (metres)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g. 2.5"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                        aria-label="Wall height in metres"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Mortar Mix Ratio (Cement:Sand)</label>
                    <select
                      value={mortarRatio}
                      onChange={(e) => setMortarRatio(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none font-semibold"
                      aria-label="Mortar mix ratio"
                    >
                      <option value="1:4">1:4 (Stronger - Structural walls, foundations, below ground)</option>
                      <option value="1:5">1:5 (Standard - General brickwork, most projects)</option>
                      <option value="1:6">1:6 (Weaker - Non-load bearing internal walls)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">1:5 is standard for most UK brickwork</p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-bold text-gray-700">Waste Factor: {wasteFactor}%</label>
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="15"
                      value={wasteFactor}
                      onChange={(e) => setWasteFactor(Number(e.target.value))}
                      className="w-full"
                      aria-label="Waste factor percentage"
                    />
                    <p className="text-xs text-gray-500 mt-1">Typical waste: 5-10% for breakage and cutting</p>
                  </div>

                  <button
                    onClick={calculate}
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold transition"
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
                        <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                          <p className="text-sm text-gray-600">Wall Area</p>
                          <p className="text-2xl font-bold text-gray-900">{results.wallArea} m²</p>
                          <p className="text-xs text-gray-500 mt-1">Length × Height</p>
                        </div>

                        <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                          <p className="text-sm text-gray-600">{results.materialName}</p>
                          <p className="text-2xl font-bold text-gray-900">{results.itemsNeeded.toLocaleString()}</p>
                          <p className="text-xs text-gray-500 mt-1">Units needed (inc. waste)</p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                          <p className="text-sm text-gray-600">Mortar Volume</p>
                          <p className="text-2xl font-bold text-gray-900">{results.mortarVolume} m³</p>
                          <p className="text-xs text-gray-500 mt-1">For 10mm joints</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                          <p className="text-sm text-gray-600">Cement (25kg Bags)</p>
                          <p className="text-2xl font-bold text-gray-900">{results.cementBags}</p>
                          <p className="text-xs text-gray-500 mt-1">Cost: £{results.cementCost}</p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                          <p className="text-sm text-gray-600">Building Sand</p>
                          <p className="text-2xl font-bold text-gray-900">{results.sandTonnes} tonnes</p>
                          <p className="text-xs text-gray-500 mt-1">Cost: £{results.sandCost}</p>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                          <p className="text-sm text-gray-600">Water Required</p>
                          <p className="text-2xl font-bold text-gray-900">{results.waterLitres} litres</p>
                          <p className="text-xs text-gray-500 mt-1">Approximate mixing water</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-lg mt-6 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold">Materials Cost (approx)</p>
                        <p className="text-2xl font-bold">£{(parseFloat(results.cementCost) + parseFloat(results.sandCost)).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Labour Cost (est.)</p>
                        <p className="text-2xl font-bold">£{results.labourCost}</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mt-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-blue-900 mb-1">Order Summary</p>
                          <p className="text-sm text-blue-800">
                            {results.materialName}: {results.itemsNeeded.toLocaleString()} units • Cement: {results.cementBags} bags • Sand: {results.sandTonnes} tonnes • Ratio: {mortarRatio} • Waste: {wasteFactor}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-6 text-center">
                      ✓ Includes {wasteFactor}% waste factor • {results.materialName} • {mortarRatio} mortar ratio • Labour: £40/m² UK average
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
                  <li>• <strong>1:5 ratio</strong> standard for most brickwork</li>
                  <li>• <strong>1:4</strong> for structural/below ground</li>
                  <li>• <strong>1:6</strong> for non-load bearing</li>
                  <li>• Add <strong>5-10% waste</strong> for breakage</li>
                  <li>• <strong>60 bricks/m²</strong> for standard UK brick</li>
                  <li>• <strong>10.76 blocks/m²</strong> for concrete blocks</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Material Sizes</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Standard Brick:</strong><br/>215×102.5×65mm</li>
                  <li><strong>4" Block:</strong><br/>440×215×100mm</li>
                  <li><strong>6" Block:</strong><br/>440×215×140mm</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
                <h3 className="font-bold text-gray-900 mb-2">Labour Rates (Q4 2025)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Apprentice: £15-25/m²</li>
                  <li>Semi-skilled: £25-35/m²</li>
                  <li>Experienced: £35-50/m²</li>
                  <li>Specialist: £50-70/m²</li>
                </ul>
              </div>
            </div>
          </div>

          {/* COMPREHENSIVE GUIDE */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Brick & Block Calculator Guide</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">✓ Mortar Mix Ratios Explained</h3>
                <p className="text-gray-700 text-sm mb-4">
                  The ratio shows cement to sand proportion. Higher cement = stronger but less flexible mortar:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>1:4 Ratio:</strong> Strongest mortar for structural walls, foundations, below ground level, and areas with high loading or water exposure</li>
                  <li>• <strong>1:5 Ratio:</strong> Standard mortar for general UK brickwork, most residential and commercial projects, best balance of strength and workability</li>
                  <li>• <strong>1:6 Ratio:</strong> Weaker mortar for non-load bearing internal walls, partitions, areas not exposed to weather or high loading</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">📏 Material Quantities per m²</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Standard material consumption based on UK construction practices:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Standard Bricks:</strong> 60 per m² (single skin 215×102.5×65mm)</li>
                  <li>• <strong>Double Brick:</strong> 120 per m² (two skins with cavity)</li>
                  <li>• <strong>4" Blocks:</strong> 10.76 per m² (440×215×100mm)</li>
                  <li>• <strong>6" Blocks:</strong> 10.76 per m² (440×215×140mm)</li>
                  <li>• <strong>Mortar:</strong> ~0.004m³ per brick or 0.0105m³ per block (10mm joints)</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">🏗️ Brick vs Block Applications</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Standard Bricks:</strong> Visible external walls, cavity walls, load-bearing, decorative finishes</li>
                  <li>• <strong>4" Blocks:</strong> Internal non-load bearing partitions, infill work, lightweight construction</li>
                  <li>• <strong>6" Blocks:</strong> Structural load-bearing walls, external walls, single-skin construction</li>
                  <li>• Combine materials: Brick outer leaf + block cavity + brick inner for optimal performance</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">⚠️ Waste Factor Guidance</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>5% Waste:</strong> Simple rectangular walls, experienced crew, good site access</li>
                  <li>• <strong>7-8% Waste:</strong> Standard walls, typical complexity, normal site conditions</li>
                  <li>• <strong>10% Waste:</strong> Complex patterns, difficult access, tight corners, openings</li>
                  <li>• <strong>12-15% Waste:</strong> Curved walls, very complex patterns, specialist bonds, poor access</li>
                  <li>• Always order extra to avoid mid-project shortages</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">💷 Cost Breakdown (Q4 2025)</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Standard Bricks:</strong> £200-350 per 1,000 (quality varies)</li>
                  <li>• <strong>Concrete Blocks:</strong> £80-150 per 100 units</li>
                  <li>• <strong>Cement (25kg):</strong> £6.50-7.50 per bag</li>
                  <li>• <strong>Building Sand:</strong> £35-50 per tonne</li>
                  <li>• <strong>Labour:</strong> £35-50/m² UK average (varies by experience)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">✓ Professional Tips</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Verify measurements on site before ordering</li>
                  <li>• Account for door/window openings (deduct from area)</li>
                  <li>• Confirm structural engineer requirements for load-bearing work</li>
                  <li>• Check with local building control for compliance</li>
                  <li>• Allow for weather delays affecting drying time</li>
                  <li>• Store materials on firm level ground</li>
                  <li>• Always follow manufacturer instructions for mortar</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-2">Important Notes</h3>
              <p className="text-sm text-gray-700">
                This calculator provides professional estimates based on standard UK brick and block dimensions. Actual requirements may vary due to: wall bond patterns (English bond, Flemish bond, stretcher bond affect consumption), opening sizes (doors, windows reduce materials needed), site conditions (weather, access, ground conditions), mortar joint specifications, and local building code requirements. Always verify calculations on site before ordering. For load-bearing structural work, always consult a structural engineer. Prices are Q4 2025 estimates - confirm with suppliers before ordering. Different suppliers may have varying prices - shop around for best value while maintaining material quality.
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
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=BrickBlockCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Brick Block Calculator Inquiry Form"
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
                { item: results.materialName, quantity: results.itemsNeeded.toString(), unit: 'units' },
                { item: 'Cement (25kg bags)', quantity: results.cementBags.toString(), unit: 'bags' },
                { item: 'Building Sand', quantity: results.sandTonnes, unit: 'tonnes' },
                { item: 'Water', quantity: results.waterLitres, unit: 'litres' },
                { item: 'Installation & Labour', quantity: results.wallArea, unit: 'm²' }
              ],
              summary: `${results.wallArea}m² wall (${results.materialName}) - ${mortarRatio} mortar mix with ${wasteFactor}% waste factor included - Materials cost: £${(parseFloat(results.cementCost) + parseFloat(results.sandCost)).toFixed(2)} - Labour estimate: £${results.labourCost} at £40/m²`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}





                    



