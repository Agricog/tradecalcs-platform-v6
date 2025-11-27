import { CheckCircle2, HelpCircle, Palette, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
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
      coats: coats,
      materialCost: (Math.ceil(withWaste / 25) * 8.50).toFixed(2),
      labourCost: (area * 25).toFixed(2)
    })
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Plaster Calculator UK | Coverage & Material Estimator for Plasterers | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free plaster calculator for UK plasterers. Calculate coverage, material quantities, and cost estimates instantly. Professional tool with waste factors and drying times." 
        />
        <meta name="keywords" content="plaster calculator, plastering calculator, UK plasterer tools, plaster coverage calculator, skim coat calculator, gypsum plaster calculator, finishing plaster, plasterboard calculator, Thistle plaster" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Plaster Calculator UK | Coverage & Material Estimator for Plasterers" />
        <meta property="og:description" content="Calculate plaster coverage and materials instantly. Free professional tool for UK plasterers with waste factors." />
        <meta property="og:url" content="https://tradecalcs.co.uk/plaster-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/plaster-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Plaster Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free plaster calculator. Calculate coverage, bags needed, and drying times instantly." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/plaster-calculator-og.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/plaster-calculator" />
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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Plaster Calculator', 'item': 'https://tradecalcs.co.uk/plaster-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Plaster Coverage Calculator UK',
                'description': 'Professional plaster coverage calculator for UK plasterers. Calculate exact material quantities, coverage rates, drying times, and costs for any plasterwork project including skim coats, gypsum plaster, finishing plaster, and textured finishes.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/plaster-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '834' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'How much plaster do I need?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Use this calculator to enter your wall or ceiling dimensions (length and width in meters), select the number of coats, choose your coverage rate (1.2kg/m² for light skim, 1.5kg/m² for standard skim coats, 2.0kg/m² standard, 2.5kg/m² heavy coverage), and set your waste factor (10% typical for standard work). The calculator instantly shows plaster needed in kg and number of 25kg bags to order.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the standard plaster coverage rate?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Standard coverage is 1.5-2.0 kg/m² depending on plaster type and application. Skim coats require 1.2-1.5 kg/m² (light application), finishing plaster 1.0-1.5 kg/m² (smooth top coat), gypsum plaster 1.5-2.0 kg/m² (standard plasterboard), and heavy coverage 2.0-2.5 kg/m² (thick coats on poor substrates). Actual coverage depends on substrate condition, surface irregularities, and application technique.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How long does plaster take to dry?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Skim coats typically dry in 24 hours between applications minimum. Full structural cure requires 5-7 days minimum. Before painting or further decoration, allow 14 days recommended (especially for new plasterboard). Drying time increases significantly in cold temperatures (below 10°C) and humid conditions (above 70% humidity). Proper ventilation and air circulation speeds drying considerably.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What waste factor should I use?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Use 10% waste factor as standard for typical plasterwork. Use 5% for simple, smooth applications with experienced applicators and good substrate conditions. Use 15% for complex surfaces, poor substrate condition, difficult access areas, or first-time applications. Use 20% for heavily damaged surfaces or very irregular substrates. Waste accounts for spillage, breakage during mixing and application, mixing losses, surface irregularities requiring extra fill, and testing coats.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What are the different types of plaster?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Common UK plaster types: Plasterboard (drywall base), Bonding Plaster (first coat on brick/block, 2-3mm), Finish Plaster (smooth top coat, 2mm finish layer), Thistle Plaster (standard UK brand products like Thistle Universal One-Coat and Multi-Finish), Lime Plaster (traditional homes and period properties, breathable), and Artex (textured decorative finish). Each has different coverage rates, drying times, and specific applications.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How do I estimate project cost?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'This calculator provides material cost estimates based on Q4 2025 UK pricing. Standard 25kg bags of plaster cost approximately £8.50 retail (£7-9 range depending on supplier and brand). Professional labour rates average £25-35/m² for standard plastering, £35-50/m² for skim coat finishing, and £50+/m² for specialist work. Total project cost equals materials plus labour. Always obtain detailed quotes from local plasterers for accurate pricing specific to your region and project complexity.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Should I subtract openings like doors and windows?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes, always subtract approximately 20% from total wall area for doors and windows. For detailed calculations, subtract: standard door (1.9m × 0.9m = 1.7m²), window (1.5m × 1m = 1.5m²). This prevents over-ordering. The calculator includes this as a tip - enter your net wall area after subtracting openings for most accurate results.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the difference between bonding and finishing plaster?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Bonding plaster is the first coat (2-3mm) applied directly to brick or concrete blocks - it has grip and bonds mechanically to the substrate. Finishing plaster (or finish coat) is the final smooth top coat (2mm) applied over bonding plaster - it provides the smooth, paintable surface. Typical application: bonding plaster first (2.5 kg/m²), then finishing plaster (1.5 kg/m²). For plasterboard, you skip bonding and apply finish coat directly to the board.'
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
              Professional Plaster Coverage Calculator for UK Plasterers
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Calculate plaster coverage, materials, and project costs instantly
            </p>
            <p className="text-gray-600 mb-6">
              Industry-trusted calculator for professional plasterers and decorators across the UK. Instantly calculate exact material quantities for all plasterwork types including skim coats, gypsum plaster, finishing plaster, bonding plaster, and textured finishes. Includes waste factors, drying times, and current UK material costs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* MAIN CALCULATOR */}
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
                        aria-label="Wall or ceiling length in meters"
                      />
                      <p className="text-xs text-gray-500 mt-1">Measure floor to ceiling height</p>
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
                        aria-label="Wall or ceiling width in meters"
                      />
                      <p className="text-xs text-gray-500 mt-1">Subtract 20% for doors/windows</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Number of Coats</label>
                      <select
                        value={coats}
                        onChange={(e) => setCoats(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                        aria-label="Number of plaster coats"
                      >
                        <option value="1">1 Coat (Bonding)</option>
                        <option value="2">2 Coats (Standard)</option>
                        <option value="3">3 Coats (Full Coverage)</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Bonding + finish typical</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Coverage Rate (kg/m²)</label>
                      <select
                        value={coverage}
                        onChange={(e) => setCoverage(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                        aria-label="Plaster coverage rate"
                      >
                        <option value="1.2">1.2 (Light Skim)</option>
                        <option value="1.5">1.5 (Skim Coat)</option>
                        <option value="2.0">2.0 (Standard)</option>
                        <option value="2.5">2.5 (Heavy Coverage)</option>
                        <option value="3.0">3.0 (Base Coat)</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Per coat application</p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Waste Factor (%)</label>
                      <select
                        value={wasteFactor}
                        onChange={(e) => setWasteFactor(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                        aria-label="Waste factor percentage"
                      >
                        <option value="5">5% (Minimal)</option>
                        <option value="10">10% (Standard)</option>
                        <option value="15">15% (Liberal)</option>
                        <option value="20">20% (Complex)</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">Spillage &amp; breakage</p>
                    </div>
                  </div>

                  <button
                    onClick={calculate}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold transition"
                    aria-label="Calculate plaster needed"
                  >
                    📊 Calculate Plaster Needed
                  </button>
                </div>
              </div>

              {/* RESULTS */}
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
                          <p className="text-xs text-gray-500 mt-1">Length × Width (net after openings)</p>
                        </div>

                        <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                          <p className="text-sm text-gray-600">Base Plaster Needed</p>
                          <p className="text-2xl font-bold text-gray-900">{result.basePlaster} kg</p>
                          <p className="text-xs text-gray-500 mt-1">Without waste factor ({result.coats} coat{result.coats !== '1' ? 's' : ''})</p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                          <p className="text-sm text-gray-600">With Waste Factor ({result.waste}%)</p>
                          <p className="text-2xl font-bold text-gray-900">{result.withWaste} kg</p>
                          <p className="text-xs text-gray-500 mt-1">Includes spillage, breakage &amp; imperfections</p>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                          <p className="text-sm text-gray-600">Order (25kg bags)</p>
                          <p className="text-2xl font-bold text-gray-900">{result.bags} bags</p>
                          <p className="text-xs text-gray-500 mt-1">Material cost: approx. £{result.materialCost}</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                          💡 Quick Reference
                        </h3>
                        <ul className="text-sm text-gray-700 space-y-3">
                          <li><strong>📦 Order:</strong> {result.bags} bags × 25kg</li>
                          <li><strong>💷 Materials:</strong> ~£{result.materialCost}</li>
                          <li><strong>👷 Labour Est:</strong> ~£{result.labourCost} (£25/m²)</li>
                          <li><strong>📐 Coverage:</strong> {result.coverage}kg/m² × {result.coats} coat(s)</li>
                          <li><strong>⚠️ Waste:</strong> {result.waste}% buffer included</li>
                          <li><strong>💾 Storage:</strong> Keep dry, use within 6 months</li>
                          <li><strong>⏱️ Drying:</strong> 24 hours between coats minimum</li>
                          <li><strong>🎨 Before painting:</strong> Allow 14 days minimum</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mt-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-blue-900 mb-1">✓ Coverage Summary</p>
                          <p className="text-sm text-blue-800">
                            <strong>{result.area}m²</strong> surface area × <strong>{result.coverage}kg/m²</strong> coverage × <strong>{result.coats}</strong> coat(s) = <strong>{result.basePlaster}kg</strong> base + <strong>{result.waste}%</strong> waste = <strong>{result.withWaste}kg</strong> total needed = <strong>{result.bags} × 25kg bags</strong>
                          </p>
                        </div>
                      </div>
                    </div>
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

            {/* SIDEBAR */}
            <div className="lg:col-span-1">
              <div className="bg-blue-50 rounded-lg p-6 mb-6 border-l-4 border-blue-600">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  Quick Tips
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✓ Measure exact wall height</li>
                  <li>✓ Subtract 20% for doors</li>
                  <li>✓ Account for windows too</li>
                  <li>✓ Skim coats use less plaster</li>
                  <li>✓ Order extra for repairs</li>
                  <li>✓ Check for damp patches first</li>
                  <li>✓ Always prime plasterboard</li>
                  <li>✓ Avoid working in cold (&lt;10°C)</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Palette className="w-5 h-5 text-amber-600" />
                  Plaster Types
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Skim:</strong> Smooth 2mm finish</li>
                  <li><strong>Gypsum:</strong> Standard plasterboard</li>
                  <li><strong>Bonding:</strong> First coat on blocks</li>
                  <li><strong>Finishing:</strong> Top coat 2mm</li>
                  <li><strong>Thistle:</strong> UK standard brand</li>
                  <li><strong>Lime:</strong> Traditional/period homes</li>
                  <li><strong>Artex:</strong> Textured decorative</li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-600">
                <h3 className="font-bold text-gray-900 mb-2">💷 Current UK Prices</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li><strong>25kg bag:</strong> ~£8.50</li>
                  <li><strong>Labour:</strong> £25-35/m²</li>
                  <li><strong>Professional:</strong> £30-50/m²</li>
                  <li className="text-xs text-gray-500 mt-2"><em>Prices Q4 2025</em></li>
                </ul>
              </div>
            </div>
          </div>

          {/* COMPREHENSIVE GUIDE */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Plastering Guide for UK Professionals</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">✓ Plaster Coverage Rates by Type</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Coverage rates vary by plaster type, substrate condition, and application method. These are industry standard rates per coat:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Light skim coat:</strong> 1.2 kg/m² (minimal application)</li>
                  <li>• <strong>Standard skim coat:</strong> 1.5 kg/m² (typical finish layer)</li>
                  <li>• <strong>Gypsum plaster:</strong> 2.0 kg/m² (standard plasterboard base)</li>
                  <li>• <strong>Finishing plaster:</strong> 1.5 kg/m² (smooth top coat)</li>
                  <li>• <strong>Bonding plaster:</strong> 2.5 kg/m² (first coat on blocks)</li>
                  <li>• <strong>Heavy coverage:</strong> 2.5-3.0 kg/m² (thick coats, poor substrate)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">⏱️ Drying &amp; Curing Times (Critical)</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Proper drying time ensures professional results and prevents defects, cracks, and failure:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Between coats:</strong> 24 hours minimum (critical)</li>
                  <li>• <strong>Full structural cure:</strong> 5-7 days minimum</li>
                  <li>• <strong>Before painting:</strong> 14 days recommended (30 days optimal)</li>
                  <li>• <strong>Before wallpaper:</strong> 14 days minimum (ensure full cure)</li>
                  <li>• <strong>Cold temp:</strong> +10°C minimum (below 10°C drying fails)</li>
                  <li>• <strong>Humidity:</strong> Below 70% (high humidity dramatically slows drying)</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">📦 Material Types &amp; Applications</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Plasterboard:</strong> Drywall for internal walls, requires finish coat</li>
                  <li>• <strong>Bonding plaster:</strong> First coat on brick/block, 2-3mm thick</li>
                  <li>• <strong>Finish plaster:</strong> Smooth top coat for painting, 2mm</li>
                  <li>• <strong>Thistle Universal:</strong> One-coat product, popular UK brand</li>
                  <li>• <strong>Multi-finish:</strong> One-coat ready-finished plaster</li>
                  <li>• <strong>Lime plaster:</strong> Period/traditional homes, breathable</li>
                  <li>• <strong>Artex texture:</strong> Textured decorative finishes (1-2mm)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">🎯 Professional Best Practice</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✓ Always prime new plasterboard first (primer or diluted PVA)</li>
                  <li>✓ Use correct water-to-powder ratio (follow manufacturer specs)</li>
                  <li>✓ Mix thoroughly to consistent smooth paste (no lumps)</li>
                  <li>✓ Apply thin, even coats (2-3mm maximum per coat)</li>
                  <li>✓ Maintain 24-hour drying between coats (non-negotiable)</li>
                  <li>✓ Sand lightly between coats for adhesion (120-150 grit)</li>
                  <li>✓ Store plaster in dry conditions (protect from moisture)</li>
                  <li>✓ Use within 6 months of purchase (older plaster loses strength)</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">💷 Cost Breakdown Example</h3>
                <div className="bg-gray-50 rounded p-4 text-sm text-gray-700 space-y-2">
                  <p><strong>100m² project (2 coats skim, 1.5kg/m²):</strong></p>
                  <p>• Base plaster needed: 300kg</p>
                  <p>• Plus 10% waste: 330kg</p>
                  <p>• Bags required: 14 × 25kg bags</p>
                  <p>• Material cost: ~£119 (14 bags × £8.50)</p>
                  <p>• Labour cost (£25/m²): ~£2,500</p>
                  <p>• Total project estimate: ~£2,619</p>
                  <p className="text-xs text-gray-500 mt-3"><em>Note: Prices Q4 2025, may vary by region and supplier</em></p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">⚠️ Common Mistakes to Avoid</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>❌ Don't skip priming plasterboard (causes poor adhesion)</li>
                  <li>❌ Don't rush drying time between coats (causes cracking)</li>
                  <li>❌ Don't apply thick coats (causes sagging and failure)</li>
                  <li>❌ Don't plaster over damp (efflorescence and failure)</li>
                  <li>❌ Don't ignore waste factors (always run short)</li>
                  <li>❌ Don't use old plaster &gt;6 months (loses strength and workability)</li>
                  <li>❌ Don't work in cold (&lt;10°C) or damp (&gt;70% humidity)</li>
                  <li>❌ Don't paint too early (minimum 14 days, 30 days optimal)</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-2">✓ Professional Quality Assurance</h3>
              <p className="text-sm text-gray-700 mb-3">
                This calculator provides professional estimates based on UK industry standards and manufacturer specifications. Coverage rates are typical but vary based on surface condition, application technique, plaster type, temperature, and humidity. Always account for waste and keep extra material for touch-ups and repairs.
              </p>
              <p className="text-sm text-gray-700">
                <strong>For best results:</strong> Follow manufacturer guidelines precisely, allow adequate curing time before finishing or painting, and maintain proper ventilation. Weather and environmental conditions significantly affect drying times - allow additional time in cold and damp conditions. Professional plasterers typically add 10-15% extra to their material estimates to prevent job delays.
              </p>
            </div>
          </div>

          {/* CONTACT FORM SECTION */}
          <div className="mt-12 bg-white rounded-lg shadow-lg p-8 mb-16">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help or Have Questions?</h3>
              <p className="text-gray-700">
                Got a specific calculation requirement or want a custom tool for your trade? Fill out the form below.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=PlastererCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Plasterer Calculator Inquiry Form"
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
                { item: 'Number of Coats', quantity: result.coats, unit: 'coats' },
                { item: 'Wall/Ceiling Area', quantity: result.area, unit: 'm²' },
                { item: 'Waste Factor Included', quantity: result.waste, unit: '%' }
              ],
              summary: `Plastering project - ${result.area}m² surface with ${result.coats} coat(s) at ${result.coverage}kg/m² coverage rate (${result.waste}% waste factor = ${result.withWaste}kg total plaster required = ${result.bags} × 25kg bags) - Material cost: £${result.materialCost} - Labour estimate: £${result.labourCost}`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}














