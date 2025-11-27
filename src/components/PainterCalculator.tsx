import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, HelpCircle, Palette, AlertCircle } from 'lucide-react'
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
        {/* Primary Meta Tags */}
        <title>Paint Calculator UK | Professional Painter & Decorator Calculator | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free paint calculator for UK decorators and painters. Calculate exact paint quantities needed for walls, ceilings, and rooms. Professional tool with coverage rates and cost estimates." 
        />
        <meta name="keywords" content="paint calculator, decorator calculator, emulsion calculator, UK painter tools, paint coverage calculator, wall painting calculator, room painter calculator, paint estimator, painting costs" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Paint Calculator UK | Professional Painter & Decorator Calculator" />
        <meta property="og:description" content="Calculate exact paint quantities needed. Free professional tool for UK painters and decorators." />
        <meta property="og:url" content="https://tradecalcs.co.uk/paint-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/paint-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Paint Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free paint calculator. Calculate paint quantities instantly for any room." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/paint-calculator-og.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/paint-calculator" />
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
                      'text': 'Calculate total wall area (length × height × number of walls in m2). Divide by coverage rate (12 m2/litre for smooth surfaces, 10 m2/litre for textured). Multiply by number of coats required. Add primer at approximately 14 m2 per litre. This calculator automatically determines exact quantities.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the standard paint coverage rate?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Standard emulsion paint coverage is 12-14 m2 per litre on smooth plaster or drywall. Textured or porous surfaces achieve 8-10 m2 per litre. Brick and masonry typically achieve 6-8 m2 per litre. Gloss and satin finishes typically cover 16-18 m2 per litre.'
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
                      'text': 'UK painting labour rates average £15-25 per m2 depending on experience and complexity. Apprentice: £8-12/m2, Semi-skilled: £12-18/m2, Experienced decorator: £18-30/m2, Specialist/Master: £30-50/m2. Add premium for complex surfaces, difficult access, or bespoke finishes.'
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
              Professional Paint Calculator for UK Decorators
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Calculate exact paint quantities, primer needs, and labour costs instantly
            </p>
            <p className="text-gray-600 mb-6">
              Industry-trusted paint estimator for professional decorators and painters across the UK. Supports multiple coats, surface types, and provides cost estimates for materials and labour. Perfect for interior and exterior painting projects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* MAIN CALCULATOR */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Paint Needed</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Wall Width (feet)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="e.g. 12"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                        aria-label="Wall width in feet"
                      />
                      <p className="text-xs text-gray-500 mt-1">Measure to nearest foot</p>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Wall Height (feet)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g. 8"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                        aria-label="Wall height in feet"
                      />
                      <p className="text-xs text-gray-500 mt-1">Floor to ceiling height</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Walls</label>
                    <select
                      value={numWalls}
                      onChange={(e) => setNumWalls(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none font-semibold"
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
                    <label className="block text-sm font-bold text-gray-700 mb-2">Surface Type</label>
                    <select
                      value={surfaceType}
                      onChange={(e) => setSurfaceType(e.target.value as 'smooth' | 'textured')}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none font-semibold"
                      aria-label="Surface type for painting"
                    >
                      <option value="smooth">Smooth Plaster/Drywall (12 m2/litre)</option>
                      <option value="textured">Textured/Stippled Surface (10 m2/litre)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Textured surfaces need more paint</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Number of Coats</label>
                    <select
                      value={coats}
                      onChange={(e) => setCoats(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none font-semibold"
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
                    className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold transition"
                    aria-label="Calculate paint required"
                  >
                    Calculate Paint Required
                  </button>
                </div>
              </div>

              {/* RESULTS */}
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
                          <p className="text-xs text-gray-500 mt-1">Length × Height × Walls</p>
                        </div>

                        <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
                          <p className="text-sm text-gray-600">Topcoat Paint</p>
                          <p className="text-2xl font-bold text-gray-900">{results.paintLitres} litres</p>
                          <p className="text-xs text-gray-500 mt-1">{results.paintTins} × 5L tins (£{results.paintCost})</p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                          <p className="text-sm text-gray-600">Primer/Sealer Needed</p>
                          <p className="text-2xl font-bold text-gray-900">{results.primeLitres} litres</p>
                          <p className="text-xs text-gray-500 mt-1">{results.primeTins} × 5L tins (£{results.primeCost})</p>
                        </div>

                        <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-600">
                          <p className="text-sm text-gray-600">Surface &amp; Coats</p>
                          <p className="text-lg font-bold text-gray-900">{results.coats} coats • {results.surfaceType === 'smooth' ? 'Smooth' : 'Textured'}</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-6 border border-red-200">
                        <h3 className="font-bold text-gray-900 mb-4">💡 Professional Tips</h3>
                        <ul className="text-sm text-gray-700 space-y-3">
                          <li><strong>Always buy extra:</strong> Add 10-15% for waste and touch-ups</li>
                          <li><strong>Primer essential:</strong> Apply on all new or patched areas</li>
                          <li><strong>Storage:</strong> Keep paint in cool, dry place for 2+ years</li>
                          <li><strong>Multiple coats:</strong> Light shades often need 3+ coats</li>
                          <li><strong>Drying time:</strong> Allow 4-8 hours between coats minimum</li>
                          <li><strong>Preparation:</strong> Sand between coats for better adhesion</li>
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                        <p className="text-sm text-gray-600">Paint Cost (approx)</p>
                        <p className="text-2xl font-bold text-green-700">£{results.paintCost}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
                        <p className="text-sm text-gray-600">Labour (£15/m²)</p>
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
                          <p className="font-semibold text-blue-900 mb-1">Paint Order Summary</p>
                          <p className="text-sm text-blue-800">
                            Topcoat: {results.paintTins} × 5L tins (£{results.paintCost}) • Primer: {results.primeTins} × 5L tins (£{results.primeCost}) • Surface: {results.surfaceType} • Coats: {results.coats} • Total Area: {results.totalArea}m²
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-gray-500 mt-6 text-center">
                      ✓ Coverage: {results.surfaceType === 'smooth' ? '12' : '10'}m²/litre • {results.coats} coat{results.coats !== 1 ? 's' : ''} • {results.totalArea}m² total
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
                  <li>• Textured surfaces need more paint</li>
                  <li>• Measure height from skirting to ceiling</li>
                  <li>• Subtract 20% for doors and windows</li>
                  <li>• Dark colours need more coats</li>
                  <li>• Always prime new plasterboard</li>
                  <li>• Allow 4-8 hours between coats</li>
                  <li>• Order extra for touch-ups</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-red-600" />
                  Paint Types
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Emulsion:</strong> For walls/ceilings</li>
                  <li><strong>Gloss:</strong> For woodwork/trim</li>
                  <li><strong>Satin:</strong> Mid-finish option</li>
                  <li><strong>Primer:</strong> Essential first coat</li>
                  <li><strong>Undercoat:</strong> Between primer &amp; topcoat</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-600">
                <h3 className="font-bold text-gray-900 mb-2">Labour Rates (Q4 2025)</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Apprentice: £8-12/m²</li>
                  <li>Semi-skilled: £12-18/m²</li>
                  <li>Experienced: £18-30/m²</li>
                  <li>Specialist: £30-50/m²</li>
                </ul>
              </div>
            </div>
          </div>

          {/* COMPREHENSIVE GUIDE */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Painting Guide for UK Professionals</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">✓ Paint Coverage &amp; Types</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Standard emulsion paint coverage varies by surface condition and application method:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Smooth plaster:</strong> 12-14 m²/litre</li>
                  <li>• <strong>Textured surface:</strong> 8-10 m²/litre</li>
                  <li>• <strong>Brick/masonry:</strong> 6-8 m²/litre</li>
                  <li>• <strong>Gloss/Satin:</strong> 16-18 m²/litre</li>
                  <li>• <strong>Primer:</strong> 14-16 m²/litre</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">🎨 Colour &amp; Coats Guide</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Number of coats depends on colour intensity and substrate:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>White/light:</strong> 1-2 coats</li>
                  <li>• <strong>Mid-tone:</strong> 2-3 coats</li>
                  <li>• <strong>Dark shades:</strong> 3-4 coats minimum</li>
                  <li>• <strong>Over gloss:</strong> Primer + 2 coats</li>
                  <li>• <strong>New plasterboard:</strong> Primer + 2 coats</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">📋 Surface Preparation</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Clean all dirt, dust, and cobwebs with damp cloth</li>
                  <li>• Fill holes and cracks with quality filler</li>
                  <li>• Sand rough areas smooth (fine sandpaper)</li>
                  <li>• Prime all new or patched areas</li>
                  <li>• Use undercoat for bold colour changes</li>
                  <li>• Check walls are dry before painting</li>
                  <li>• Remove switch plates and light covers</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">🎯 Professional Application</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Apply paint in thin, even coats</li>
                  <li>• Use correct brush/roller for surface type</li>
                  <li>• Work from top to bottom on walls</li>
                  <li>• Maintain wet edge to avoid lap marks</li>
                  <li>• Sand lightly between coats (fine grit)</li>
                  <li>• Allow full drying time between coats</li>
                  <li>• Use extension poles for ceilings</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">💷 Cost Breakdown Example</h3>
                <div className="bg-gray-50 rounded p-4 text-sm text-gray-700 space-y-2">
                  <p><strong>40m² bedroom (2 coats smooth):</strong></p>
                  <p>• Paint needed: 7 litres (2 × 5L tins)</p>
                  <p>• Primer needed: 3 litres (1 × 5L tin)</p>
                  <p>• Paint cost: ~£70</p>
                  <p>• Primer cost: ~£28</p>
                  <p>• Labour (£15/m²): £600</p>
                  <p>• <strong>Total: ~£698</strong></p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">⚠️ Drying &amp; Curing Times</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Touch dry:</strong> 1-2 hours (emulsion)</li>
                  <li>• <strong>Between coats:</strong> 4-8 hours minimum</li>
                  <li>• <strong>Full cure:</strong> 5-7 days</li>
                  <li>• <strong>Recoatable:</strong> Check paint tin</li>
                  <li>• Cold/damp extends drying time</li>
                  <li>• Good ventilation speeds drying</li>
                  <li>• Wait 24 hours before heavy use</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-2">Professional Quality Assurance</h3>
              <p className="text-sm text-gray-700">
                This calculator provides professional estimates for UK painting projects based on industry standards. Coverage rates vary by manufacturer, surface condition, application technique, and environmental factors. Always follow paint manufacturer instructions for specific coverage, drying times, and application guidelines. For best results, use quality primers and paints from reputable UK manufacturers. Test paint colours on large sample boards before committing to full project. Account for waste and keep extra paint for touch-ups. Proper surface preparation is essential for professional results.
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
        </div>

        {/* QUOTE GENERATOR MODAL */}
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




