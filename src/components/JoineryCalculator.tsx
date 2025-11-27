import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Hammer, CheckCircle2, AlertCircle } from 'lucide-react'
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

  const woodPrices: { [key: string]: number } = {
    'pine': 450,
    'oak': 850,
    'walnut': 1200,
    'mdf': 320,
    'plywood': 380
  }

  const labourEstimates: { [key: string]: { hours: number; waste: number } } = {
    'built-in': { hours: 12, waste: 0.18 },
    'kitchen': { hours: 15, waste: 0.20 },
    'staircase': { hours: 20, waste: 0.22 },
    'doors': { hours: 8, waste: 0.15 },
    'shelving': { hours: 5, waste: 0.12 },
    'bespoke': { hours: 25, waste: 0.25 }
  }

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

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <a href="/" className="text-purple-600 hover:text-purple-800 font-semibold text-sm">
            ← Back to All Calculators
          </a>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Hammer className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">Joinery Calculator UK</h1>
            <p className="text-lg opacity-95">Calculate wood costs, labour hours & project pricing instantly</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="bg-amber-600 text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Hammer className="w-5 h-5" />
                <h2 className="text-lg font-bold">Joinery Cost Calculator</h2>
              </div>
              <p className="text-sm opacity-90">Professional pricing for UK joiners and carpenters</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">1. Project Type</label>
              <select
                value={projectType}
                onChange={e => setProjectType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600 mb-2"
                aria-label="Project type"
              >
                <option value="shelving">Shelving/Bookcases (5 hrs/m³)</option>
                <option value="doors">Custom Doors (8 hrs/m³)</option>
                <option value="built-in">Built-in Wardrobe/Storage (12 hrs/m³)</option>
                <option value="kitchen">Fitted Kitchen (15 hrs/m³)</option>
                <option value="staircase">Staircase (20 hrs/m³)</option>
                <option value="bespoke">Bespoke Furniture (25 hrs/m³)</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">2. Wood Type</label>
              <select
                value={woodType}
                onChange={e => setWoodType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600 mb-2"
                aria-label="Wood type"
              >
                <option value="mdf">MDF - £320/m³ (engineered, paintable)</option>
                <option value="plywood">Plywood - £380/m³ (structural, hidden work)</option>
                <option value="pine">Pine - £450/m³ (softwood, budget-friendly)</option>
                <option value="oak">Oak - £850/m³ (hardwood, premium)</option>
                <option value="walnut">Walnut - £1200/m³ (high-end projects)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Q4 2025 UK market rates - confirm with merchant</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">3. Length (mm)</label>
                <input
                  type="number"
                  value={length}
                  onChange={e => setLength(e.target.value)}
                  placeholder="e.g. 2400"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  aria-label="Length in millimeters"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-800 mb-2">4. Width (mm)</label>
                <input
                  type="number"
                  value={width}
                  onChange={e => setWidth(e.target.value)}
                  placeholder="e.g. 1200"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  aria-label="Width in millimeters"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-800 mb-2">5. Height (mm)</label>
                <input
                  type="number"
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                  placeholder="e.g. 600"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
                  aria-label="Height in millimeters"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-3">6. Wood Finish</label>
              <div className="grid grid-cols-2 gap-3">
                {['natural', 'stain', 'paint', 'varnish'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFinish(f)}
                    className={`p-3 rounded-lg border-2 font-semibold text-sm transition ${
                      finish === f
                        ? 'bg-amber-50 border-amber-600 text-amber-900'
                        : 'border-gray-300 text-gray-700 hover:border-amber-400'
                    }`}
                    aria-label={`Select ${f} finish`}
                  >
                    <p className="capitalize">{f}</p>
                    <p className="text-xs font-normal text-gray-600">
                      {f === 'natural' ? 'Base labour' : `+${['stain', 'paint', 'varnish'].indexOf(f) * 10 + 15}% time`}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">7. Your Hourly Rate (£/hour)</label>
              <input
                type="number"
                value={hourlyRate}
                onChange={e => setHourlyRate(e.target.value)}
                placeholder="e.g. 45"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600 mb-2"
                aria-label="Hourly rate in pounds"
              />
              <div className="flex gap-2 flex-wrap">
                {['20', '35', '45', '55', '65'].map(rate => (
                  <button
                    key={rate}
                    onClick={() => setHourlyRate(rate)}
                    className="px-3 py-1 bg-amber-100 text-amber-700 rounded font-semibold text-sm hover:bg-amber-200"
                    aria-label={`Set rate to £${rate}/hr`}
                  >
                    £{rate}/hr
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Apprentice £15-20, Semi-skilled £25-35, Experienced £40-55, Specialist £60-85</p>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg text-lg transition"
              aria-label="Calculate project cost"
            >
              💰 Calculate Project Cost
            </button>

            {result && (
              <>
                <div className={`mt-8 rounded-lg p-6 bg-amber-50 border-2 border-amber-300`}>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-amber-600" />
                    <h3 className={`text-xl font-bold text-amber-900`}>
                      ✓ Project Cost Breakdown
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded border-t-2 border-b-2 border-amber-300">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Base Volume</p>
                        <p className="text-2xl font-bold text-gray-900">{result.volumeM3} m³</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">With Waste ({result.wastePercentage}%)</p>
                        <p className="text-2xl font-bold text-gray-900">{result.totalVolume} m³</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Material Cost</p>
                        <p className="text-2xl font-bold text-amber-600">£{result.materialCost}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Labour Hours</p>
                        <p className="text-2xl font-bold text-amber-600">{result.estimatedHours} hrs</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-3">
                        <p className="font-semibold">Labour Cost (£{result.hourlyRate}/hr)</p>
                        <p className="font-bold text-lg">£{result.labourCost}</p>
                      </div>
                      <div className="flex justify-between mb-3 p-2 rounded bg-gray-50">
                        <p className="font-semibold">Total (Materials + Labour)</p>
                        <p className="font-bold text-lg text-amber-600">£{result.totalCost}</p>
                      </div>
                      <div className="flex justify-between p-3 rounded bg-green-100 border border-green-300">
                        <p className="font-semibold text-green-900">Recommended Quote (+ 15% buffer)</p>
                        <p className="font-bold text-lg text-green-700">£{result.recommendedPrice}</p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded border-l-2 border-gray-400 mt-4">
                      <p className="font-semibold mb-1">Summary:</p>
                      <p className="font-mono">
                        {result.totalVolume}m³ {result.woodType} + {result.estimatedHours}hrs @ £{result.hourlyRate}/hr = £{result.totalCost}
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
                    aria-label="Generate quote"
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
                <h3 className="font-bold text-amber-900 mb-3">🔨 Professional Joinery Pricing</h3>
                <ul className="space-y-2 text-sm text-amber-900">
                  <li>• <strong>Wood prices:</strong> Q4 2025 UK market rates - always confirm with timber merchant</li>
                  <li>• <strong>Waste factors:</strong> 5-25% depending on project type and complexity</li>
                  <li>• <strong>Labour rates:</strong> £15-85/hour depending on experience and location</li>
                  <li>• <strong>Finish types:</strong> Natural (base), Stain (+15%), Paint (+25%), Varnish (+35%)</li>
                  <li>• <strong>Project types:</strong> From simple shelving to complex bespoke furniture</li>
                  <li>• <strong>Contingency:</strong> Always add 10-15% buffer for unknowns and site issues</li>
                  <li>• <strong>Hidden costs:</strong> Site access, travel, material variations, design changes</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Joinery Costs in the UK</h2>
            <p className="text-gray-700 mb-4">
              Joinery project costs depend on wood type, project complexity, labour rates, finish quality, and waste factors. Professional pricing requires accurate estimation of materials, labour hours, contingencies, and hidden costs. This calculator helps you quote confidently based on current UK market rates and industry-standard labour estimates.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-amber-600">
              <p className="text-sm text-gray-700"><strong>Key principle:</strong> Complex projects with custom cuts, premium woods, and quality finishes require significantly more labour time. A simple shelving project (5 hrs/m³) might take 4-5 days, while bespoke furniture (25 hrs/m³) could require 3-4 weeks of skilled work.</p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Wood Types & Pricing (Q4 2025)</h2>
            <p className="text-gray-700 mb-4">
              Wood pricing varies by species, grade, and market conditions. Always confirm current prices with your timber merchant before preparing quotes - prices fluctuate monthly:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-amber-100 border-b">
                    <th className="px-4 py-2 text-left font-semibold">Wood Type</th>
                    <th className="px-4 py-2 text-left font-semibold">Price (m³)</th>
                    <th className="px-4 py-2 text-left font-semibold">Typical Uses</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">MDF</td>
                    <td className="px-4 py-2">£320/m³</td>
                    <td className="px-4 py-2">Paintable, interior, budget-friendly</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">Plywood</td>
                    <td className="px-4 py-2">£380/m³</td>
                    <td className="px-4 py-2">Structural, hidden work, economical</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">Pine</td>
                    <td className="px-4 py-2">£450/m³</td>
                    <td className="px-4 py-2">Softwood, budget, visible work</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">Oak</td>
                    <td className="px-4 py-2">£850/m³</td>
                    <td className="px-4 py-2">Hardwood, premium, visible finishes</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">Walnut</td>
                    <td className="px-4 py-2">£1200/m³</td>
                    <td className="px-4 py-2">Premium hardwood, high-end projects</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">Note: Prices vary by supplier, grade, and location. These are Q4 2025 UK market averages - confirm with your timber merchant before quoting.</p>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Labour Estimates by Project Type</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-amber-600 bg-amber-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Simple Projects</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Shelving:</strong> 5 hrs/m³ (straightforward)</li>
                  <li>• <strong>Custom doors:</strong> 8 hrs/m³ (standard cuts)</li>
                </ul>
              </div>
              <div className="border-l-4 border-orange-600 bg-orange-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Complex Projects</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Built-in storage:</strong> 12 hrs/m³ (multiple components)</li>
                  <li>• <strong>Fitted kitchen:</strong> 15 hrs/m³ (site fitting)</li>
                  <li>• <strong>Staircase:</strong> 20 hrs/m³ (complex joinery)</li>
                  <li>• <strong>Bespoke furniture:</strong> 25 hrs/m³ (highly custom)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Finish Types & Labour Impact</h2>
            <p className="text-gray-700 mb-4">Quality finishes require significantly more labour time and skilled application:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Natural & Stain</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Natural:</strong> Base labour (no extra time)</li>
                  <li>• <strong>Stain:</strong> +15% labour (prep, staining, sanding)</li>
                </ul>
              </div>
              <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Paint & Varnish</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Paint:</strong> +25% labour (priming, multiple coats)</li>
                  <li>• <strong>Varnish:</strong> +35% labour (multiple coats, sanding between)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Waste Factors by Project Type</h2>
            <p className="text-gray-700 mb-4">Waste accounts for cutting losses, breakage, material quality control, and site variations. More complex projects require higher waste factors:</p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                ['Shelving', '12%', 'Straight cuts'],
                ['Custom doors', '15%', 'Standard cuts'],
                ['Built-in storage', '18%', 'Multiple components'],
                ['Fitted kitchen', '20%', 'Custom cuts'],
                ['Staircase', '22%', 'Complex cuts'],
                ['Bespoke furniture', '25%', 'Highly custom']
              ].map((row, idx) => (
                <div key={idx} className="border-l-4 border-amber-600 bg-amber-50 p-3 rounded">
                  <p className="font-bold text-gray-900">{row[0]}</p>
                  <p className="text-lg font-bold text-amber-600">{row[1]}</p>
                  <p className="text-xs text-gray-600">{row[2]}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What hourly rate should I use?</h4>
                <p className="text-sm text-gray-700">UK rates vary: Apprentice £15-20/hr, Semi-skilled £25-35/hr, Experienced £40-55/hr, Specialist £60-85/hr. Adjust for your experience, location (London higher), and overhead costs.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How do I account for future load growth?</h4>
                <p className="text-sm text-gray-700">Design for anticipated maximum future demand rather than current needs. This avoids costly upgrades later and ensures the project remains competitive.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What hidden costs should I budget for?</h4>
                <p className="text-sm text-gray-700">Site access issues, material variances, design changes, rework, travel time, equipment rental, and additional finish coats. Always add 10-15% contingency buffer.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How do I confirm wood prices?</h4>
                <p className="text-sm text-gray-700">Contact your timber merchant directly for current prices - they vary monthly by supplier, grade, stock levels, and delivery location. Use their rates, not calculator estimates, for final quotes.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Should I include a contingency buffer?</h4>
                <p className="text-sm text-gray-700">Yes, always add 10-15% contingency to cover unknowns: unexpected structural issues, material quality variations, design changes, and site complications. This ensures profitability.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How accurate is this calculator?</h4>
                <p className="text-sm text-gray-700">This calculator provides professional estimates based on Q4 2025 UK market data. Use it as a starting point - always confirm wood prices with merchants and adjust for your specific experience and project requirements.</p>
              </div>
            </div>
          </section>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-yellow-900 mb-2">✓ Professional Quality Assurance</p>
                <p className="text-sm text-yellow-800">This calculator provides professional estimates for UK joinery projects based on Q4 2025 market rates. Always confirm current wood prices with your timber merchant before preparing quotes - prices fluctuate monthly. Account for project-specific factors, site complications, and add 15% contingency buffer to all quotes to ensure profitability and protect against cost overruns.</p>
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

          <div className="bg-amber-600 text-white rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Complete Your Joinery Project Planning</h2>
            <p className="mb-6">Use our joinery calculator, materials estimator, and other professional tools to quote accurately and manage projects profitably.</p>
            <a href="/" className="bg-white text-amber-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </a>
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
              summary: `${result.projectType} - ${result.woodType} with ${result.finish} finish (${result.wastePercentage}% waste) = £${result.materialCost} materials + £${result.labourCost} labour = £${result.totalCost}. Recommended quote: £${result.recommendedPrice} (with 15% buffer).`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}











