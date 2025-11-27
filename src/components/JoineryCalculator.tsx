import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, HelpCircle, Hammer, AlertCircle } from 'lucide-react'
import QuoteGenerator from './QuoteGenerator'

export default function JoineryCalculator() {
  const [projectType, setProjectType] = useState('built-in')
  const [woodType, setWoodType] = useState('pine')
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [finish, setFinish] = useState('natural')
  const [hourlyRate, setHourlyRate] = useState('45')
  const [result, setResult] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  // Wood pricing (GBP per m³) - Q4 2025 UK market rates
  const woodPrices: { [key: string]: number } = {
    'pine': 450,
    'oak': 850,
    'walnut': 1200,
    'mdf': 320,
    'plywood': 380
  }

  // Estimated labour hours by project type (per m³ of wood)
  const labourEstimates: { [key: string]: { hours: number; waste: number } } = {
    'built-in': { hours: 12, waste: 0.18 },
    'kitchen': { hours: 15, waste: 0.20 },
    'staircase': { hours: 20, waste: 0.22 },
    'doors': { hours: 8, waste: 0.15 },
    'shelving': { hours: 5, waste: 0.12 },
    'bespoke': { hours: 25, waste: 0.25 }
  }

  // Finish multiplier (time increase)
  const finishMultipliers: { [key: string]: number } = {
    'natural': 1.0,
    'stain': 1.15,
    'paint': 1.25,
    'varnish': 1.35
  }

  const calculate = () => {
    if (!length || !width || !height || !hourlyRate) {
      alert('Please fill in all fields')
      return
    }

    const L = parseFloat(length) / 1000
    const W = parseFloat(width) / 1000
    const H = parseFloat(height) / 1000
    const volumeM3 = L * W * H

    const labourData = labourEstimates[projectType]
    const finishMultiplier = finishMultipliers[finish]

    const woodPrice = woodPrices[woodType]
    const wasteMultiplier = 1 + labourData.waste
    const totalVolume = volumeM3 * wasteMultiplier
    const materialCost = totalVolume * woodPrice

    const baseHours = labourData.hours * (volumeM3 / 0.05)
    const finishedHours = baseHours * finishMultiplier
    const rate = parseFloat(hourlyRate)
    const labourCost = finishedHours * rate

    const totalCost = materialCost + labourCost

    setResult({
      projectType: projectType.charAt(0).toUpperCase() + projectType.slice(1),
      woodType: woodType.charAt(0).toUpperCase() + woodType.slice(1),
      volumeM3: volumeM3.toFixed(3),
      totalVolume: totalVolume.toFixed(3),
      wastePercentage: (labourData.waste * 100).toFixed(0),
      materialCost: materialCost.toFixed(2),
      estimatedHours: finishedHours.toFixed(1),
      hourlyRate: rate.toFixed(2),
      labourCost: labourCost.toFixed(2),
      totalCost: totalCost.toFixed(2),
      finish: finish.charAt(0).toUpperCase() + finish.slice(1),
      contingency: (totalCost * 0.15).toFixed(2),
      recommendedPrice: (totalCost * 1.15).toFixed(2)
    })
  }

  return (
    <>
      <Helmet>
        <title>Joinery Calculator UK | Wood Cost & Labour Calculator for Joiners | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free joinery calculator for UK joiners and carpenters. Calculate wood costs, labour hours, and project pricing instantly. Professional tool for bespoke joinery, fitted kitchens, and custom furniture." 
        />
        <meta name="keywords" content="joinery calculator, wood cost calculator, carpenter calculator, UK joiner tools, timber cost calculator, bespoke joinery pricing, labour calculator, fitted kitchen cost, custom furniture pricing, woodworking estimator" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Joinery Calculator UK | Wood Cost & Labour Calculator for Joiners" />
        <meta property="og:description" content="Calculate wood costs, labour hours, and project pricing for joinery. Free professional tool for UK joiners and carpenters." />
        <meta property="og:url" content="https://tradecalcs.co.uk/joinery-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/joinery-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Joinery Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free joinery calculator. Calculate wood costs and labour hours instantly." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/joinery-calculator-og.jpg" />

        <link rel="canonical" href="https://tradecalcs.co.uk/joinery-calculator" />
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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Joinery Calculator', 'item': 'https://tradecalcs.co.uk/joinery-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Joinery Cost Calculator UK',
                'description': 'Professional joinery cost calculator for UK joiners and carpenters. Calculate exact material quantities, labour hours, and project pricing for bespoke joinery, fitted kitchens, staircases, custom doors, and furniture.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/joinery-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '756' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'How do I calculate joinery project costs?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Use this calculator to enter project dimensions (length, width, height in mm), select wood type (pine, oak, walnut, MDF, plywood), choose project type (built-in storage, fitted kitchen, staircase, custom doors, shelving, bespoke furniture), select finish (natural, stain, paint, varnish), and enter your hourly rate (£/hour). The calculator instantly shows material cost, labour hours, labour cost, and total project cost with 15% contingency recommendation.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What are current UK wood prices (Q4 2025)?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Q4 2025 UK market rates: Pine £450/m³ (softwood, budget-friendly), Oak £850/m³ (hardwood, premium), Walnut £1200/m³ (high-end projects), MDF £320/m³ (engineered, paintable), Plywood £380/m³ (structural, hidden work). Prices vary by supplier, grade, and local market. Always confirm current prices with your timber merchant before preparing quotes - prices fluctuate monthly.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How much waste should I account for in joinery?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Waste factors by project type: Shelving 12%, Custom doors 15%, Built-in storage 18%, Fitted kitchen 20%, Staircase 22%, Bespoke furniture 25%. Waste accounts for cutting losses, breakage, material quality control, and site variations. More complex projects with custom cuts require higher waste factors.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How much does finish type affect labour time?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Natural finish = base labour (no extra time). Stain adds 15% labour time (surface prep, staining, intermediate sanding). Paint adds 25% labour time (priming, multiple coats, sanding between coats). Varnish adds 35% labour time (multiple coats, sanding between coats, final polish). Quality finishes require significantly more time and skilled application.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What hourly rate should I use for joinery?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'UK joinery labour rates vary by experience: Apprentice £15-20/hour, Semi-skilled £25-35/hour, Experienced joiner £40-55/hour, Specialist/Master £60-85/hour. Adjust rates based on your experience, location (London/Southeast higher), project complexity, and whether you\'re running a business with overheads. Premium rates justified for complex/bespoke work.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Should I add contingency to joinery quotes?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Yes, always add 10-15% contingency buffer to account for: unexpected structural issues, site access complications, material quality variances, design changes mid-project, rework due to measurement errors, and hidden costs. This ensures profitable projects and protects against cost overruns from unknowns.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How do I estimate labour hours for bespoke joinery?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Labour hours per m³ vary by project type: Shelving 5hrs/m³ (straightforward), Custom doors 8hrs/m³ (standard cuts), Built-in storage 12hrs/m³ (multiple components), Fitted kitchen 15hrs/m³ (complex, site fitting), Staircase 20hrs/m³ (complex joinery), Bespoke furniture 25hrs/m³ (highly custom). Multiply by actual volume and finish type multiplier for accurate estimates.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What hidden costs should I account for in joinery projects?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Hidden costs include: Site access & parking complications, Existing structure issues requiring adaptation, Material quality variations from supplier, Design changes mid-project, Rework due to measurement errors, Travel time & fuel costs, Equipment rental or specialist tools, Additional finish coats for quality, and Scaffolding/access equipment for high work. Always factor these into contingency calculations.'
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
              Professional Joinery Cost Calculator for UK Joiners
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Calculate wood costs, labour hours & project pricing instantly
            </p>
            <p className="text-gray-600 mb-6">
              Industry-trusted calculator for professional joiners and carpenters across the UK. Includes material costs, labour estimates, waste factors, and pricing recommendations for bespoke joinery, fitted kitchens, staircases, custom doors, and custom furniture.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Project Cost</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Project Type</label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                      aria-label="Joinery project type"
                    >
                      <option value="built-in">Built-in Wardrobe/Storage (12 hrs/m³)</option>
                      <option value="kitchen">Fitted Kitchen (15 hrs/m³)</option>
                      <option value="staircase">Staircase (20 hrs/m³)</option>
                      <option value="doors">Custom Doors (8 hrs/m³)</option>
                      <option value="shelving">Shelving/Bookcases (5 hrs/m³)</option>
                      <option value="bespoke">Bespoke Furniture (25 hrs/m³)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hours per cubic meter base estimate</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Wood Type</label>
                    <select
                      value={woodType}
                      onChange={(e) => setWoodType(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                      aria-label="Wood type and price"
                    >
                      <option value="pine">Pine - £450/m³ (softwood, budget-friendly)</option>
                      <option value="oak">Oak - £850/m³ (hardwood, premium visible work)</option>
                      <option value="walnut">Walnut - £1200/m³ (high-end projects)</option>
                      <option value="mdf">MDF - £320/m³ (engineered, paintable)</option>
                      <option value="plywood">Plywood - £380/m³ (structural, hidden work)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Q4 2025 UK market rates - confirm with merchant</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Length (mm)</label>
                      <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="e.g. 2400"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                        aria-label="Length in millimeters"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Width (mm)</label>
                      <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="e.g. 1200"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                        aria-label="Width in millimeters"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Height/Depth (mm)</label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g. 600"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                        aria-label="Height or depth in millimeters"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Wood Finish</label>
                    <select
                      value={finish}
                      onChange={(e) => setFinish(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none font-semibold"
                      aria-label="Wood finish type"
                    >
                      <option value="natural">Natural (no finish, base labour)</option>
                      <option value="stain">Stain (+15% labour time)</option>
                      <option value="paint">Paint (+25% labour time)</option>
                      <option value="varnish">Varnish (+35% labour time)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Quality finishes require significantly more time</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Hourly Rate (£/hour)</label>
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      placeholder="e.g. 45"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-600 focus:outline-none"
                      aria-label="Hourly rate in pounds"
                    />
                    <p className="text-xs text-gray-500 mt-1">Apprentice £15-20, Semi-skilled £25-35, Experienced £40-55, Specialist £60-85</p>
                  </div>

                  <button
                    onClick={calculate}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-lg font-bold transition"
                    aria-label="Calculate project cost"
                  >
                    💰 Calculate Project Cost
                  </button>
                </div>
              </div>

              {result && (
                <>
                  <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <div className="flex items-center gap-2 mb-6">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <h2 className="text-xl font-bold text-gray-900">Cost Breakdown</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                          <p className="text-sm text-gray-600">Base Wood Volume</p>
                          <p className="text-2xl font-bold text-gray-900">{result.volumeM3} m³</p>
                          <p className="text-xs text-gray-500 mt-1">Length × Width × Height</p>
                        </div>

                        <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-600">
                          <p className="text-sm text-gray-600">Total Volume (inc. waste {result.wastePercentage}%)</p>
                          <p className="text-2xl font-bold text-gray-900">{result.totalVolume} m³</p>
                          <p className="text-xs text-gray-500 mt-1">Includes cutting losses & breakage</p>
                        </div>

                        <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-600">
                          <p className="text-sm text-gray-600">Material Cost ({result.woodType})</p>
                          <p className="text-2xl font-bold text-gray-900">£{result.materialCost}</p>
                          <p className="text-xs text-gray-500 mt-1">Q4 2025 market rates</p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                          <p className="text-sm text-gray-600">Estimated Labour Hours</p>
                          <p className="text-2xl font-bold text-gray-900">{result.estimatedHours} hrs</p>
                          <p className="text-xs text-gray-500 mt-1">{result.finish} finish included</p>
                        </div>

                        <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-600">
                          <p className="text-sm text-gray-600">Labour Cost (£{result.hourlyRate}/hr)</p>
                          <p className="text-2xl font-bold text-gray-900">£{result.labourCost}</p>
                          <p className="text-xs text-gray-500 mt-1">At your hourly rate</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
                        <h3 className="font-bold text-gray-900 mb-4">💡 Pricing Recommendation</h3>
                        <div className="space-y-3 text-sm">
                          <div className="border-b pb-2">
                            <p className="text-gray-600">Base Cost</p>
                            <p className="font-bold text-lg text-gray-900">£{result.totalCost}</p>
                          </div>
                          <div className="border-b pb-2">
                            <p className="text-gray-600">Contingency (15%)</p>
                            <p className="font-bold text-lg text-gray-900">£{result.contingency}</p>
                          </div>
                          <div className="bg-green-100 p-3 rounded border border-green-300">
                            <p className="text-gray-700 mb-1"><strong>Recommended Quote Price</strong></p>
                            <p className="font-bold text-2xl text-green-700">£{result.recommendedPrice}</p>
                            <p className="text-xs text-gray-600 mt-1">Includes 15% profit buffer</p>
                          </div>
                        </div>
                        <ul className="text-xs text-gray-700 space-y-2 mt-4 pt-4 border-t">
                          <li>• Waste: {result.wastePercentage}% ({result.projectType.toLowerCase()})</li>
                          <li>• Finish: {result.finish} (+labour time)</li>
                          <li>• Materials: Q4 2025 rates</li>
                          <li>• Contingency: 15% for unknowns</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-lg mt-6 flex justify-between items-center">
                      <p className="text-lg font-semibold">Total Materials + Labour</p>
                      <p className="text-3xl font-bold">£{result.totalCost}</p>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mt-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-blue-900 mb-1">✓ Summary</p>
                          <p className="text-sm text-blue-800">
                            {result.totalVolume}m³ of {result.woodType} (waste: {result.wastePercentage}%) + {result.estimatedHours} hours labour at £{result.hourlyRate}/hr with {result.finish} finish = £{result.totalCost} materials + labour. Add 15% contingency for £{result.recommendedPrice} recommended quote price.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

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
                  <li>✓ Measure all dimensions accurately in mm</li>
                  <li>✓ Add extra waste for complex cuts</li>
                  <li>✓ Quality wood costs more upfront</li>
                  <li>✓ Finish type affects labour time significantly</li>
                  <li>✓ Always add 15% contingency buffer</li>
                  <li>✓ Confirm supplier prices before quoting</li>
                  <li>✓ Account for site access complications</li>
                  <li>✓ Travel time = billable cost</li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Hammer className="w-5 h-5 text-amber-600" />
                  Wood Types (Q4 2025)
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li><strong>Pine:</strong> £450/m³ budget</li>
                  <li><strong>Oak:</strong> £850/m³ premium</li>
                  <li><strong>Walnut:</strong> £1200/m³ high-end</li>
                  <li><strong>MDF:</strong> £320/m³ paint</li>
                  <li><strong>Plywood:</strong> £380/m³ structural</li>
                  <li className="text-xs text-gray-500 mt-2"><em>Prices vary by supplier</em></li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-600">
                <h3 className="font-bold text-gray-900 mb-2">💷 Labour Rates</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Apprentice: £15-20/hr</li>
                  <li>Semi-skilled: £25-35/hr</li>
                  <li>Experienced: £40-55/hr</li>
                  <li>Specialist: £60-85/hr</li>
                  <li className="text-xs text-gray-500 mt-2"><em>UK Q4 2025 rates</em></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Joinery Guide for UK Professionals</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">✓ Wood Types & Pricing (Q4 2025)</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Wood pricing varies by species, grade, and market conditions. Always confirm current prices with your timber merchant:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Pine:</strong> £450/m³ (softwood, budget-friendly, visible work acceptable)</li>
                  <li>• <strong>Oak:</strong> £850/m³ (hardwood, premium work, premium finishes)</li>
                  <li>• <strong>Walnut:</strong> £1200/m³ (premium hardwood, high-end exclusive projects)</li>
                  <li>• <strong>MDF:</strong> £320/m³ (engineered, paintable, interior use only)</li>
                  <li>• <strong>Plywood:</strong> £380/m³ (structural, hidden work, economical base)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">⏱️ Project Labour Estimates</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Labour hours vary significantly by project complexity and site conditions:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Shelving:</strong> 5 hrs/m³ (straightforward, basic joinery)</li>
                  <li>• <strong>Custom doors:</strong> 8 hrs/m³ (standard cuts, faster completion)</li>
                  <li>• <strong>Built-in storage:</strong> 12 hrs/m³ (wardrobes, multiple components)</li>
                  <li>• <strong>Fitted kitchen:</strong> 15 hrs/m³ (complex, site fitting, installation)</li>
                  <li>• <strong>Staircase:</strong> 20 hrs/m³ (complex joinery, premium work)</li>
                  <li>• <strong>Bespoke furniture:</strong> 25 hrs/m³ (highly custom, premium craftsmanship)</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">🎨 Finish Types & Labour Impact</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Natural:</strong> Base labour (no extra time)</li>
                  <li>• <strong>Stain:</strong> +15% labour time (surface prep, staining, sanding)</li>
                  <li>• <strong>Paint:</strong> +25% labour time (priming, multiple coats, sanding)</li>
                  <li>• <strong>Varnish:</strong> +35% labour time (multiple coats, sanding between)</li>
                  <li>• Quality finishes require significantly more skilled time</li>
                  <li>• Environmental conditions (temp/humidity) affect drying</li>
                  <li>• Proper surface preparation is critical for finishes</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">💷 Waste Factors by Type</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Shelving:</strong> 12% (straight cuts, minimal complexity)</li>
                  <li>• <strong>Custom doors:</strong> 15% (standard cuts, moderate complexity)</li>
                  <li>• <strong>Built-in storage:</strong> 18% (multiple components, fitting adjustments)</li>
                  <li>• <strong>Fitted kitchen:</strong> 20% (custom cuts, site variations)</li>
                  <li>• <strong>Staircase:</strong> 22% (complex cuts, precision required)</li>
                  <li>• <strong>Bespoke furniture:</strong> 25% (complex joinery, custom design)</li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">🎯 Pricing Strategy & Quotation</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Hourly range:</strong> £35-85/hour UK average (Q4 2025)</li>
                  <li>• Apprentice/trainee: £15-20/hour (learning curve)</li>
                  <li>• Semi-skilled: £25-35/hour (standard tradespeople)</li>
                  <li>• Experienced joiner: £40-55/hour (professional standard)</li>
                  <li>• Specialist/master: £60-85/hour (complex/bespoke)</li>
                  <li>• Add premium for complexity, experience, location</li>
                  <li>• Always include 10-15% contingency buffer minimum</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">⚠️ Hidden Costs to Account For</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Site access & parking complications</li>
                  <li>• Existing structure issues requiring adaptation</li>
                  <li>• Material quality variations from supplier</li>
                  <li>• Design changes mid-project (always costly)</li>
                  <li>• Rework due to measurement errors</li>
                  <li>• Travel time & fuel costs (billable)</li>
                  <li>• Equipment rental or specialist tools</li>
                  <li>• Additional finish coats for quality control</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded">
              <h3 className="font-bold text-gray-900 mb-2">Professional Quality Assurance</h3>
              <p className="text-sm text-gray-700 mb-3">
                This calculator provides professional estimates for UK joinery projects based on Q4 2025 market rates. Labour hours follow industry standards for different project types and complexities. Always confirm current wood prices with your timber merchant before preparing quotes - prices fluctuate monthly based on market conditions and supplier stock.
              </p>
              <p className="text-sm text-gray-700">
                Account for project-specific factors: site access difficulties, existing structure complexity, finish requirements, material variances, design complexity, and travel/access costs. Add 15% contingency buffer to all quotes to ensure profitability and protect against cost overruns from unknowns and site complications. Different timber merchants may have varying prices and delivery charges - shop around while maintaining quality standards.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-lg p-8 mb-16">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help or Have Questions?</h3>
              <p className="text-gray-700">
                Got a specific calculation requirement or want a custom tool for your trade? Fill out the form below.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=JoineryCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Joinery Calculator Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>
        </div>

        {showQuoteGenerator && result && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: `${result.woodType} Timber`, quantity: result.totalVolume, unit: 'm³' },
                { item: `${result.finish} Finish & Materials`, quantity: '1', unit: 'job' },
                { item: 'Fixings, Hardware & Screws', quantity: '1', unit: 'job' },
                { item: 'Professional Labour', quantity: result.estimatedHours, unit: 'hours' }
              ],
              summary: `${result.projectType} project - ${result.woodType} timber with ${result.finish} finish (${result.wastePercentage}% waste included) - Material cost: £${result.materialCost} - Labour: £${result.labourCost} - Total: £${result.totalCost} - Recommended quote with 15% contingency: £${result.recommendedPrice}`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}










