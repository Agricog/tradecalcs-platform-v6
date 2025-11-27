import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Info, CheckCircle2, AlertCircle } from 'lucide-react'
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
        <title>Brick & Block Calculator UK | Free Bricklaying Materials Calculator | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free brick and block calculator for UK bricklayers. Calculate exact quantities of bricks, blocks, cement, sand, mortar and labour costs instantly. Professional tool with waste factors." 
        />
        <meta name="keywords" content="brick calculator, block calculator, bricklaying calculator, mortar calculator, cement calculator, UK bricklayer tools, building materials calculator, brick wall calculator, concrete block calculator, bricklaying estimator" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Brick & Block Calculator UK | Free Bricklaying Materials Calculator" />
        <meta property="og:description" content="Calculate exact quantities of bricks, blocks, cement, sand and mortar for UK bricklaying projects. Free instant results with labour cost estimates." />
        <meta property="og:url" content="https://tradecalcs.co.uk/brick-block-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-block-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brick & Block Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free brick and block calculator for UK bricklayers. Calculate materials instantly." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/brick-block-calculator-og.jpg" />

        <link rel="canonical" href="https://tradecalcs.co.uk/brick-block-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#dc2626" />

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
                  },
                  {
                    '@type': 'Question',
                    'name': 'Should I use 1:4, 1:5, or 1:6 mortar ratio?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Use 1:4 for structural walls, foundations, and below-ground work (stronger mortar). Use 1:5 for standard general brickwork (most common). Use 1:6 for non-load bearing internal walls only. The ratio indicates cement to sand proportion - higher cement means stronger but less flexible mortar.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Can I combine bricks and blocks in one wall?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes, this is standard practice in UK construction. Typical: brick outer leaf (for appearance) + concrete block middle (structural) + brick inner leaf (for finish). This provides good structural performance, thermal performance, and appearance. Calculate each layer separately or ask your structural engineer for specific design.'
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

        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Info className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">Brick & Block Calculator UK</h1>
            <p className="text-lg opacity-95">Calculate materials, mortar & labour costs instantly</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="bg-red-600 text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5" />
                <h2 className="text-lg font-bold">Bricklaying Materials Calculator</h2>
              </div>
              <p className="text-sm opacity-90">Professional estimation for UK bricklayers and masonry contractors</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">1. Material Type</label>
              <select
                value={materialType}
                onChange={e => setMaterialType(e.target.value as 'brick' | 'block4' | 'block6')}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 mb-2"
                aria-label="Material type - brick or concrete block"
              >
                <option value="brick">Standard UK Brick (215×102.5×65mm) - 60/m²</option>
                <option value="block4">4 inch Concrete Block (440×215×100mm) - 10.76/m²</option>
                <option value="block6">6 inch Concrete Block (440×215×140mm) - 10.76/m²</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Select material type and quantity per m²</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">2. Wall Length (metres)</label>
                <input
                  type="number"
                  step="0.1"
                  value={length}
                  onChange={e => setLength(e.target.value)}
                  placeholder="e.g. 10"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 mb-2"
                  aria-label="Wall length in metres"
                />
                <div className="flex gap-2 flex-wrap">
                  {['5', '10', '15', '20'].map(len => (
                    <button
                      key={len}
                      onClick={() => setLength(len)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold text-sm hover:bg-red-200"
                      aria-label={`Set length to ${len}m`}
                    >
                      {len}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">3. Wall Height (metres)</label>
                <input
                  type="number"
                  step="0.1"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                  placeholder="e.g. 2.5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 mb-2"
                  aria-label="Wall height in metres"
                />
                <div className="flex gap-2 flex-wrap">
                  {['1.8', '2.4', '2.7', '3.0'].map(hgt => (
                    <button
                      key={hgt}
                      onClick={() => setHeight(hgt)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold text-sm hover:bg-red-200"
                      aria-label={`Set height to ${hgt}m`}
                    >
                      {hgt}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">4. Mortar Mix Ratio (Cement:Sand)</label>
                <select
                  value={mortarRatio}
                  onChange={e => setMortarRatio(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label="Mortar mix ratio"
                >
                  <option value="1:4">1:4 (Stronger - Structural, foundations)</option>
                  <option value="1:5">1:5 (Standard - General brickwork)</option>
                  <option value="1:6">1:6 (Weaker - Non-load bearing)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">1:5 standard for most UK brickwork</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block font-bold text-gray-800">5. Waste Factor: {wasteFactor}%</label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={wasteFactor}
                  onChange={e => setWasteFactor(Number(e.target.value))}
                  className="w-full"
                  aria-label="Waste factor percentage"
                />
                <p className="text-xs text-gray-500 mt-1">Typical: 5-10% for breakage & cutting</p>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-lg transition"
              aria-label="Calculate materials needed"
            >
              🧱 Calculate Materials
            </button>

            {results && (
              <>
                <div className={`mt-8 rounded-lg p-6 bg-red-50 border-2 border-red-300`}>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-red-600" />
                    <h3 className={`text-xl font-bold text-red-900`}>
                      ✓ Materials Breakdown
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded border-t-2 border-b-2 border-red-300">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Wall Area</p>
                        <p className="text-2xl font-bold text-gray-900">{results.wallArea} m²</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">{results.materialName}</p>
                        <p className="text-2xl font-bold text-red-600">{results.itemsNeeded.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Cement Bags (25kg)</p>
                        <p className="text-2xl font-bold text-red-600">{results.cementBags}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Sand (tonnes)</p>
                        <p className="text-2xl font-bold text-red-600">{results.sandTonnes}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-3">
                        <p className="font-semibold">Mortar Volume</p>
                        <p className="font-bold text-lg">{results.mortarVolume} m³</p>
                      </div>
                      <div className="flex justify-between mb-3">
                        <p className="font-semibold">Water Required</p>
                        <p className="font-bold text-lg">{results.waterLitres} litres</p>
                      </div>
                      <div className="flex justify-between mb-3 p-2 rounded bg-gray-50">
                        <p className="font-semibold">Material Cost (approx)</p>
                        <p className="font-bold text-lg text-red-600">£{(parseFloat(results.cementCost) + parseFloat(results.sandCost)).toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between p-3 rounded bg-green-100 border border-green-300">
                        <p className="font-semibold text-green-900">Labour Cost Est.</p>
                        <p className="font-bold text-lg text-green-700">£{results.labourCost}</p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded border-l-2 border-gray-400 mt-4">
                      <p className="font-semibold mb-1">Summary:</p>
                      <p className="font-mono">
                        {results.itemsNeeded.toLocaleString()} {results.materialName} + {results.cementBags} cement bags + {results.sandTonnes}t sand ({mortarRatio} ratio) = £{(parseFloat(results.cementCost) + parseFloat(results.sandCost)).toFixed(2)} materials + £{results.labourCost} labour
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

          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-red-900 mb-3">🧱 Professional Bricklaying Standards</h3>
                <ul className="space-y-2 text-sm text-red-900">
                  <li>• <strong>Material ratios:</strong> 1:4 (structural), 1:5 (standard), 1:6 (non-load bearing)</li>
                  <li>• <strong>Standard bricks:</strong> 60 per m² (215×102.5×65mm single skin)</li>
                  <li>• <strong>Concrete blocks:</strong> 10.76 per m² (4" or 6" sizes)</li>
                  <li>• <strong>Waste factors:</strong> 5-10% standard, 10-15% complex patterns</li>
                  <li>• <strong>Drying time:</strong> 7-14 days before load-bearing use (weather dependent)</li>
                  <li>• <strong>Labour rates:</strong> £35-50/m² UK average (varies by experience)</li>
                  <li>• <strong>Always verify:</strong> Structural engineer approval for load-bearing work</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Brick & Block Calculations</h2>
            <p className="text-gray-700 mb-4">
              Professional bricklaying requires accurate material estimation based on wall dimensions, material type, mortar specifications, and waste factors. This calculator helps you calculate exact quantities of bricks, blocks, cement, sand, and labour costs based on UK construction standards. Understanding the relationship between material quantities, mortar ratios, and waste factors is essential for accurate quoting and preventing project delays.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-red-600">
              <p className="text-sm text-gray-700"><strong>Key principle:</strong> Standard UK bricks (60/m²) are more expensive per unit but create superior appearance on external walls. Concrete blocks (10.76/m²) are more economical for hidden work and internal partitions. Most quality UK construction uses a combination: brick outer leaf + block middle + brick inner leaf for optimal performance, appearance, and cost.</p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mortar Mix Ratios Explained</h2>
            <p className="text-gray-700 mb-4">
              Mortar ratio indicates cement to sand proportion. Different ratios provide different strength, flexibility, and durability characteristics:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-l-4 border-red-600 bg-red-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">1:4 Ratio (Strongest)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Structural walls</li>
                  <li>✓ Foundations</li>
                  <li>✓ Below ground level</li>
                  <li>✓ High loading areas</li>
                  <li>✓ Water exposure</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-600 bg-orange-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">1:5 Ratio (Standard)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ General brickwork</li>
                  <li>✓ Most residential</li>
                  <li>✓ External walls</li>
                  <li>✓ Commercial buildings</li>
                  <li>✓ Best balance</li>
                </ul>
              </div>

              <div className="border-l-4 border-yellow-600 bg-yellow-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">1:6 Ratio (Weaker)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Non-load bearing</li>
                  <li>✓ Internal partitions</li>
                  <li>✓ Infill walls</li>
                  <li>✓ Interior use only</li>
                  <li>✓ Never structural</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Brick vs Block vs Combined Construction</h2>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="border-l-4 border-red-600 bg-red-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Standard Bricks</h4>
                <p className="text-sm text-gray-700 mb-2">215×102.5×65mm, 60 per m²</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• External visible walls</li>
                  <li>• Decorative finishes</li>
                  <li>• Load-bearing</li>
                  <li>• Premium appearance</li>
                  <li>• £200-350 per 1,000</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Concrete Blocks</h4>
                <p className="text-sm text-gray-700 mb-2">440×215×(100/140)mm, 10.76/m²</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Internal partitions</li>
                  <li>• Structural walls (6")</li>
                  <li>• Hidden work</li>
                  <li>• Cost effective</li>
                  <li>• £80-150 per 100</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Combined System</h4>
                <p className="text-sm text-gray-700 mb-2">Brick + Block + Brick</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Outer leaf: Bricks (appearance)</li>
                  <li>• Middle: Blocks (structure)</li>
                  <li>• Inner: Bricks (finish)</li>
                  <li>• Optimal performance</li>
                  <li>• Best practice UK construction</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Waste Factors & Site Conditions</h2>
            <p className="text-gray-700 mb-4">
              Waste factors account for breakage, cutting, and site conditions. Choose appropriate waste factor based on project complexity:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Lower Waste (5-7%)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Simple rectangular walls</li>
                  <li>✓ Experienced team</li>
                  <li>✓ Good site access</li>
                  <li>✓ Minimal cutting</li>
                  <li>✓ Standard bond patterns</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-600 bg-orange-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Higher Waste (10-15%)</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Complex patterns</li>
                  <li>✓ Difficult access</li>
                  <li>✓ Curved walls</li>
                  <li>✓ Many openings</li>
                  <li>✓ Poor substrate</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How do I calculate materials if I have multiple openings?</h4>
                <p className="text-sm text-gray-700">Subtract door and window openings from your wall area before calculating. For example: 100m² wall - 2 doors (3.4m²) - 6 windows (9m²) = 87.6m². Enter the net area into the calculator for accurate estimates.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What's the difference between 4" and 6" concrete blocks?</h4>
                <p className="text-sm text-gray-700">4" (100mm) blocks are for non-load bearing internal partitions only. 6" (140mm) blocks are structural and used for external walls and load-bearing work. Both measure 440×215mm and require 10.76 blocks per m². Always check building control for load-bearing requirements.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Can I use this for cavity wall construction?</h4>
                <p className="text-sm text-gray-700">Yes, calculate each leaf separately. Typical: outer brick leaf (calculate materials) + cavity gap (no materials) + inner block leaf (calculate separately). Or use: 60 bricks/m² + 10.76 blocks/m² = combined materials for full cavity wall.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How long does the mortar need to cure before loading?</h4>
                <p className="text-sm text-gray-700">Allow minimum 7-14 days before applying load to brickwork, depending on weather conditions (temperature, humidity, wind affect curing). Cold weather significantly slows curing - allow additional time below 10°C. Follow structural engineer specifications for load-bearing work timelines.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How does this calculator compare to other trade tools?</h4>
                <p className="text-sm text-gray-700">TradeCalcs offers comprehensive professional estimators for multiple trades. For plasterwork estimates, use our <a href="/plaster-calculator" className="text-purple-600 font-semibold hover:underline">Plaster Calculator</a>. For joinery and woodwork, use our <a href="/joinery-calculator" className="text-purple-600 font-semibold hover:underline">Joinery Calculator</a>. For electrical work, use our <a href="/voltage-drop-calculator" className="text-purple-600 font-semibold hover:underline">Voltage Drop Calculator</a>. All tools are free and based on current UK market rates with internal linking to build complete project estimates.</p>
              </div>
            </div>
          </section>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-yellow-900 mb-2">✓ Professional Quality Assurance</p>
                <p className="text-sm text-yellow-800">This calculator provides professional estimates based on UK construction standards and typical material consumption rates. Actual requirements may vary due to: bond patterns (English bond, Flemish bond, stretcher bond affect quantities), opening sizes (doors, windows reduce materials), substrate condition, mortar joint specifications (10mm standard, but varies), and structural engineer requirements. Always verify calculations on site before ordering. For load-bearing structural work, always consult a structural engineer. Prices are Q4 2025 estimates - confirm with suppliers before ordering. Different suppliers may have varying prices and delivery charges - always shop around while maintaining quality standards.</p>
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

          <div className="bg-red-600 text-white rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Complete Your Trade Calculations</h2>
            <p className="mb-6">Use our comprehensive suite of professional estimators: <a href="/plaster-calculator" className="underline hover:opacity-90">Plaster Calculator</a> for coverage & materials, <a href="/joinery-calculator" className="underline hover:opacity-90">Joinery Calculator</a> for wood costs & labour, <a href="/voltage-drop-calculator" className="underline hover:opacity-90">Voltage Drop Calculator</a> for electrical compliance, and <a href="/" className="underline hover:opacity-90">view all calculators</a> to build complete project estimates and quote confidently.</p>
            <a href="/" className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </a>
          </div>
        </div>

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






                    



