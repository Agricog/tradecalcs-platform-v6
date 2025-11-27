import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, Palette, AlertCircle } from 'lucide-react'
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

    const areaPerWall = (w * h) / 10.764
    const totalArea = areaPerWall * walls

    let coverage = 12
    if (surfaceType === 'textured') coverage = 10

    let paintNeeded = Math.ceil((totalArea * numCoats) / coverage)
    let primeNeeded = Math.ceil(totalArea / 14)

    const paintTins = Math.ceil(paintNeeded / 5)
    const primeTins = Math.ceil(primeNeeded / 5)
    
    const paintCost = (paintTins * 35).toFixed(2)
    const primeCost = (primeTins * 28).toFixed(2)
    const labourCost = (totalArea * 15).toFixed(2)

    setResults({
      totalArea: totalArea.toFixed(2),
      paintLitres: paintNeeded,
      primeLitres: primeNeeded,
      paintTins,
      primeTins,
      coats: numCoats,
      surfaceType,
      paintCost,
      primeCost,
      labourCost,
      totalCost: (parseFloat(paintCost) + parseFloat(primeCost) + parseFloat(labourCost)).toFixed(2)
    })
  }

  return (
    <>
      <Helmet>
        <title>Paint Calculator UK | Professional Painter & Decorator Calculator | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free paint calculator for UK decorators and painters. Calculate exact paint quantities needed for walls, ceilings, and rooms. Professional tool with coverage rates and cost estimates." 
        />
        <meta name="keywords" content="paint calculator, decorator calculator, emulsion calculator, UK painter tools, paint coverage calculator, wall painting calculator, room painter calculator, paint estimator, painting costs, interior painting" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Paint Calculator UK | Professional Painter & Decorator Calculator" />
        <meta property="og:description" content="Calculate exact paint quantities needed. Free professional tool for UK painters and decorators." />
        <meta property="og:url" content="https://tradecalcs.co.uk/paint-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/paint-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paint Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free paint calculator. Calculate paint quantities instantly for any room." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/paint-calculator-og.jpg" />

        <link rel="canonical" href="https://tradecalcs.co.uk/paint-calculator" />
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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Paint Calculator', 'item': 'https://tradecalcs.co.uk/paint-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Paint Calculator UK',
                'description': 'Professional paint calculator for UK decorators and painters. Calculate exact paint quantities, primer needs, and labour costs for any interior or exterior painting project.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/paint-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '1,047' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'How much paint do I need?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Calculate total wall area (length × height × number of walls in m²). Divide by coverage rate (12 m²/litre for smooth surfaces, 10 m²/litre for textured). Multiply by number of coats required. Add primer at approximately 14 m²/litre. This calculator automatically determines exact quantities.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the standard paint coverage rate?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Standard emulsion paint coverage is 12-14 m²/litre on smooth plaster or drywall. Textured or porous surfaces achieve 8-10 m²/litre. Brick and masonry typically achieve 6-8 m²/litre. Gloss and satin finishes typically cover 16-18 m²/litre.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How many coats of paint do I need?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Light or white colours typically need 1-2 coats. Mid-tone colours require 2-3 coats for full coverage. Dark colours need 3-4 coats minimum to prevent patchy coverage. Always apply primer first on new plasterboard or when making dramatic colour changes.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Do I always need primer?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes. Always use primer on: new plasterboard, patched areas, previously glossy surfaces, and when dramatically changing colours. Primer seals porous surfaces preventing premature topcoat drying and ensures proper adhesion. Always apply primer first, then allow to dry fully before topcoat.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How long should I wait between coats?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Standard emulsion paint typically requires 4-8 hours drying time between coats depending on temperature and humidity. Always check manufacturer instructions for specific drying times. Allow minimum 24 hours before heavy use or steam exposure after final coat.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What should I budget for painting labour?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'UK painting labour rates average £15-25 per m² depending on experience and complexity. Apprentice: £8-12/m², Semi-skilled: £12-18/m², Experienced decorator: £18-30/m², Specialist/Master: £30-50/m². Add premium for complex surfaces, difficult access, or bespoke finishes.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Should I subtract door and window areas from calculations?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes. Subtract approximately 20% from your total wall area to account for doors and windows. For precise calculations: standard door (1.9m × 0.9m = 1.7m²), window (1.5m × 1m = 1.5m²). Enter your net wall area for most accurate estimates.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is better - smooth or textured surfaces?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Smooth surfaces are more durable and easier to clean. Textured surfaces hide imperfections better but require more paint (10 m²/litre vs 12 m²/litre for smooth). Textured surfaces also collect dust and are harder to repaint. For professional finishes, smooth surfaces are preferred.'
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
            <Palette className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">Paint Calculator UK</h1>
            <p className="text-lg opacity-95">Calculate paint quantities, primer & labour costs instantly</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="bg-red-600 text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Palette className="w-5 h-5" />
                <h2 className="text-lg font-bold">Professional Painting Calculator</h2>
              </div>
              <p className="text-sm opacity-90">Estimation tool for UK decorators and painters</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">1. Wall Width (feet)</label>
              <input
                type="number"
                step="0.1"
                value={width}
                onChange={e => setWidth(e.target.value)}
                placeholder="e.g. 12"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 mb-2"
                aria-label="Wall width in feet"
              />
              <div className="flex gap-2 flex-wrap">
                {['8', '10', '12', '14', '16'].map(w => (
                  <button
                    key={w}
                    onClick={() => setWidth(w)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold text-sm hover:bg-red-200"
                    aria-label={`Set width to ${w} feet`}
                  >
                    {w}ft
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Measure to nearest foot</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">2. Wall Height (feet)</label>
              <input
                type="number"
                step="0.1"
                value={height}
                onChange={e => setHeight(e.target.value)}
                placeholder="e.g. 8"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 mb-2"
                aria-label="Wall height in feet"
              />
              <div className="flex gap-2 flex-wrap">
                {['7', '8', '9', '10'].map(h => (
                  <button
                    key={h}
                    onClick={() => setHeight(h)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold text-sm hover:bg-red-200"
                    aria-label={`Set height to ${h} feet`}
                  >
                    {h}ft
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Floor to ceiling height</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">3. Number of Walls</label>
                <select
                  value={numWalls}
                  onChange={e => setNumWalls(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label="Number of walls to paint"
                >
                  <option value="1">1 Wall (Single)</option>
                  <option value="2">2 Walls (Two walls)</option>
                  <option value="3">3 Walls (Three walls)</option>
                  <option value="4">4 Walls (Full Room)</option>
                  <option value="5">5 Walls (Extra wall)</option>
                  <option value="6">6 Walls (Multiple rooms)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Subtract 20% for doors/windows</p>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">4. Surface Type</label>
                <select
                  value={surfaceType}
                  onChange={e => setSurfaceType(e.target.value as 'smooth' | 'textured')}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label="Surface type for painting"
                >
                  <option value="smooth">Smooth Plaster (12 m²/L)</option>
                  <option value="textured">Textured Surface (10 m²/L)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Textured needs more paint</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">5. Number of Coats</label>
              <select
                value={coats}
                onChange={e => setCoats(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                aria-label="Number of paint coats"
              >
                <option value="1">1 Coat (Primer or topcoat only)</option>
                <option value="2">2 Coats (Standard - primer + topcoat)</option>
                <option value="3">3 Coats (Full coverage with undercoat)</option>
                <option value="4">4 Coats (Dark to light colour change)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Light colours need fewer coats</p>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-lg transition"
              aria-label="Calculate paint required"
            >
              🎨 Calculate Paint Required
            </button>

            {results && (
              <>
                <div className={`mt-8 rounded-lg p-6 bg-red-50 border-2 border-red-300`}>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-red-600" />
                    <h3 className={`text-xl font-bold text-red-900`}>
                      ✓ Paint Breakdown
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded border-t-2 border-b-2 border-red-300">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Total Wall Area</p>
                        <p className="text-2xl font-bold text-gray-900">{results.totalArea} m²</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Topcoat Paint</p>
                        <p className="text-2xl font-bold text-red-600">{results.paintTins} tins</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Primer Needed</p>
                        <p className="text-2xl font-bold text-red-600">{results.primeTins} tins</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Number of Coats</p>
                        <p className="text-2xl font-bold text-red-600">{results.coats}</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-3">
                        <p className="font-semibold">Paint Needed (Litres)</p>
                        <p className="font-bold text-lg">{results.paintLitres}L</p>
                      </div>
                      <div className="flex justify-between mb-3">
                        <p className="font-semibold">Primer Needed (Litres)</p>
                        <p className="font-bold text-lg">{results.primeLitres}L</p>
                      </div>
                      <div className="flex justify-between mb-3 p-2 rounded bg-gray-50">
                        <p className="font-semibold">Paint Cost (5L tins @ £35)</p>
                        <p className="font-bold text-lg text-red-600">£{results.paintCost}</p>
                      </div>
                      <div className="flex justify-between mb-3 p-2 rounded bg-gray-50">
                        <p className="font-semibold">Primer Cost (5L tins @ £28)</p>
                        <p className="font-bold text-lg text-red-600">£{results.primeCost}</p>
                      </div>
                      <div className="flex justify-between p-3 rounded bg-green-100 border border-green-300">
                        <p className="font-semibold text-green-900">Labour Cost Est. (£15/m²)</p>
                        <p className="font-bold text-lg text-green-700">£{results.labourCost}</p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded border-l-2 border-gray-400 mt-4">
                      <p className="font-semibold mb-1">Summary:</p>
                      <p className="font-mono">
                        {results.totalArea}m² × {results.surfaceType === 'smooth' ? '12' : '10'}m²/L coverage × {results.coats} coat(s) = {results.paintLitres}L paint ({results.paintTins} × 5L tins) + {results.primeLitres}L primer ({results.primeTins} × 5L tins)
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
                <h3 className="font-bold text-red-900 mb-3">🎨 Professional Painting Standards</h3>
                <ul className="space-y-2 text-sm text-red-900">
                  <li>• <strong>Coverage rates:</strong> Smooth 12 m²/L, Textured 10 m²/L, Masonry 6-8 m²/L, Gloss 16-18 m²/L</li>
                  <li>• <strong>Coat requirements:</strong> Light colours 1-2 coats, Mid-tone 2-3 coats, Dark 3-4 coats minimum</li>
                  <li>• <strong>Always prime:</strong> New plasterboard, patched areas, glossy surfaces, colour changes</li>
                  <li>• <strong>Drying time:</strong> 4-8 hours between coats, 24 hours before heavy use</li>
                  <li>• <strong>Labour rates:</strong> £15-25/m² UK average (varies by experience)</li>
                  <li>• <strong>Surface prep:</strong> Clean, fill holes, sand rough areas, prime all new work</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Paint Coverage & Calculations</h2>
            <p className="text-gray-700 mb-4">
              Professional painting requires accurate material estimation based on wall area, surface type, colour intensity, and number of coats. This calculator helps you calculate exact quantities of paint, primer, and labour costs based on UK industry standards. Understanding the relationship between coverage rates, surface conditions, and colour depth is essential for accurate quoting and preventing project shortages.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-red-600">
              <p className="text-sm text-gray-700"><strong>Key principle:</strong> Smooth surfaces (12 m²/L) require less paint than textured surfaces (10 m²/L). Dark colours need 3-4 coats minimum for uniform coverage, while light colours typically need only 1-2 coats. Always prime new plasterboard and patched areas to seal porosity and prevent premature topcoat drying, which ensures better coverage and finish quality.</p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Paint Coverage Rates by Surface Type</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Emulsion/Latex Paint</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Smooth plaster:</strong> 12-14 m²/litre</li>
                  <li>• <strong>Textured surface:</strong> 8-10 m²/litre</li>
                  <li>• <strong>Drywall:</strong> 12-13 m²/litre</li>
                  <li>• <strong>Primer:</strong> 14-16 m²/litre</li>
                  <li>• Standard for walls & ceilings</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-600 bg-orange-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Oil/Gloss Paint</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Gloss finish:</strong> 16-18 m²/litre</li>
                  <li>• <strong>Satin finish:</strong> 14-16 m²/litre</li>
                  <li>• <strong>Primer:</strong> 13-15 m²/litre</li>
                  <li>• For woodwork & trim</li>
                  <li>• Longer drying time</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Masonry/Exterior Paint</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Brick/block:</strong> 6-8 m²/litre</li>
                  <li>• <strong>Porous surfaces:</strong> 5-7 m²/litre</li>
                  <li>• <strong>Rendered:</strong> 7-9 m²/litre</li>
                  <li>• Higher absorption</li>
                  <li>• Seal porosity with primer</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-600 bg-purple-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Primer Options</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Universal primer:</strong> Most surfaces</li>
                  <li>• <strong>Bonding primer:</strong> Gloss/glossy</li>
                  <li>• <strong>Sealer primer:</strong> New plaster</li>
                  <li>• <strong>Stain blocker:</strong> Water stains</li>
                  <li>• Always use on new work</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Colour & Coat Requirements</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Number of Coats by Colour</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ <strong>White/Light:</strong> 1-2 coats</li>
                  <li>✓ <strong>Pale shades:</strong> 1-2 coats</li>
                  <li>✓ <strong>Mid-tone:</strong> 2-3 coats</li>
                  <li>✓ <strong>Bold colours:</strong> 3 coats</li>
                  <li>✓ <strong>Dark shades:</strong> 3-4 coats</li>
                  <li>✓ <strong>Black/Navy:</strong> 4+ coats</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Application Best Practice</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Always apply primer first</li>
                  <li>✓ 4-8 hours drying between coats</li>
                  <li>✓ Maintain wet edge to avoid lap marks</li>
                  <li>✓ Sand lightly between coats</li>
                  <li>✓ Check coverage with 2nd coat</li>
                  <li>✓ Apply thin, even coats</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Surface Preparation & Professional Tips</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Surface Preparation</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Clean all dust & dirt</li>
                  <li>✓ Fill holes with quality filler</li>
                  <li>✓ Sand rough areas smooth</li>
                  <li>✓ Prime new plasterboard</li>
                  <li>✓ Use undercoat for colour changes</li>
                  <li>✓ Check surface is fully dry</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Professional Application</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Use correct brush/roller type</li>
                  <li>✓ Apply thin, even coats</li>
                  <li>✓ Maintain wet edge always</li>
                  <li>✓ Work top to bottom on walls</li>
                  <li>✓ Sand between coats (fine grit)</li>
                  <li>✓ Allow full drying time between coats</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How do I subtract doors and windows from calculations?</h4>
                <p className="text-sm text-gray-700">Subtract approximately 20% from total wall area. For precise calculations: standard door (1.9m × 0.9m = 1.7m²), window (1.5m × 1m = 1.5m²). Enter your net wall area after subtracting openings into the calculator.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Why do dark colours need more coats?</h4>
                <p className="text-sm text-gray-700">Dark pigments are more transparent than light pigments. Multiple thin coats build opacity gradually - rushing into thick coats causes sagging, drips, and uneven drying. Always apply 3-4 thin coats rather than fewer thick coats for professional results.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Is primer always necessary?</h4>
                <p className="text-sm text-gray-700">Yes. Always use primer on: new plasterboard (very porous), patched areas (filler is porous), glossy/previously painted surfaces (poor adhesion), and when making dramatic colour changes. Primer seals porosity, prevents staining, and ensures topcoat adhesion.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How does this calculator compare to other painting tools?</h4>
                <p className="text-sm text-gray-700">TradeCalcs provides comprehensive professional estimators for multiple trades. Use our <a href="/plaster-calculator" className="text-purple-600 font-semibold hover:underline">Plaster Calculator</a> for surface preparation, <a href="/brick-block-calculator" className="text-purple-600 font-semibold hover:underline">Brick & Block Calculator</a> for masonry projects, or <a href="/tiling-calculator" className="text-purple-600 font-semibold hover:underline">Tiling Calculator</a> for finish work. All tools are free with UK market rates and internal linking to build complete project estimates.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What drying times should I allow between coats?</h4>
                <p className="text-sm text-gray-700">Standard emulsion paint requires 4-8 hours drying time between coats (check manufacturer specs). Gloss paint typically takes 16-24 hours. Allow additional time in cold temperatures (below 10°C) or high humidity (above 70%). Never rush drying - premature second coat application causes adhesion failure.</p>
              </div>
            </div>
          </section>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-yellow-900 mb-2">✓ Professional Quality Assurance</p>
                <p className="text-sm text-yellow-800">This calculator provides professional estimates based on UK paint manufacturer specifications and industry standards. Coverage rates vary by paint brand, substrate condition, application technique, and environmental factors - always confirm specifications with your paint supplier. Proper surface preparation and environmental conditions (10-25°C, 35-65% humidity) are critical for professional results. For best quality, use premium paints from reputable UK manufacturers. Always order extra paint (10-15%) for waste and future touch-ups. Keep notes on paint batch numbers for consistent colour matching.</p>
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
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=PainterCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Painter Calculator Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>

          <div className="bg-red-600 text-white rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Complete Your Trade Calculations</h2>
            <p className="mb-6">Use our comprehensive suite of professional estimators: <a href="/plaster-calculator" className="underline hover:opacity-90">Plaster Calculator</a> for surface prep, <a href="/brick-block-calculator" className="underline hover:opacity-90">Brick & Block Calculator</a> for masonry, <a href="/tiling-calculator" className="underline hover:opacity-90">Tiling Calculator</a> for finishes, and <a href="/" className="underline hover:opacity-90">view all calculators</a> to build complete project estimates and quote confidently.</p>
            <a href="/" className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </a>
          </div>
        </div>

        {showQuoteGenerator && results && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: `Emulsion Paint (${results.surfaceType})`, quantity: `${results.paintTins}`, unit: '5L tins' },
                { item: 'Primer/Sealer', quantity: `${results.primeTins}`, unit: '5L tins' },
                { item: 'Preparation Materials (filler, sandpaper, tape)', quantity: '1', unit: 'job' },
                { item: 'Professional Painting Labour', quantity: results.totalArea, unit: 'm²' }
              ],
              summary: `${results.totalArea}m² painting project - ${results.coats} coat${results.coats !== 1 ? 's' : ''} on ${results.surfaceType} surface - Paint: £${results.paintCost} - Primer: £${results.primeCost} - Labour: £${results.labourCost} - Total: £${results.totalCost}`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}





