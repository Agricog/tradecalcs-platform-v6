import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { CheckCircle2, Palette, AlertCircle } from 'lucide-react'
import jsPDF from 'jspdf'

// QUOTE GENERATOR COMPONENT
type MaterialItem = {
  item: string
  quantity: string
  unit: string
}

type CalculationResults = {
  materials: MaterialItem[]
  summary: string
}

function QuoteGenerator({ calculationResults, onClose }: { calculationResults: CalculationResults; onClose: () => void }) {
  const [clientName, setClientName] = useState('John Smith')
  const [clientAddress, setClientAddress] = useState('123 High Street, London, SW1A 1AA')
  const [labourRate, setLabourRate] = useState('20')
  const [additionalNotes, setAdditionalNotes] = useState('Work includes… Materials to be sourced from…')

  const parseNumber = (value: string, fallback: number) => {
    const n = parseFloat(value)
    return isNaN(n) ? fallback : n
  }

  const handleDownloadPdf = () => {
    const rate = parseNumber(labourRate, 0)

    const doc = new jsPDF()

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('Professional Painting Quote', 20, 20)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text(`Client: ${clientName}`, 20, 32)
    doc.text(`Address: ${clientAddress}`, 20, 38)

    doc.text(`Labour rate: £${rate.toFixed(2)}/m²`, 20, 50)

    let y = 62
    doc.setFont('helvetica', 'bold')
    doc.text('Materials:', 20, y)
    y += 6
    doc.setFont('helvetica', 'normal')

    calculationResults.materials.forEach((m) => {
      const line = `• ${m.item}: ${m.quantity} ${m.unit}`
      const wrapped = doc.splitTextToSize(line, 170)
      doc.text(wrapped, 24, y)
      y += wrapped.length * 6
    })

    y += 4
    doc.setFont('helvetica', 'bold')
    doc.text('Summary:', 20, y)
    y += 6
    doc.setFont('helvetica', 'normal')
    const summaryWrapped = doc.splitTextToSize(calculationResults.summary, 170)
    doc.text(summaryWrapped, 20, y)
    y += summaryWrapped.length * 6 + 4

    if (additionalNotes.trim()) {
      doc.setFont('helvetica', 'bold')
      doc.text('Additional notes:', 20, y)
      y += 6
      doc.setFont('helvetica', 'normal')
      const notesWrapped = doc.splitTextToSize(additionalNotes, 170)
      doc.text(notesWrapped, 20, y)
    }

    doc.save('painting-quote.pdf')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl max-w-xl w-full mx-4">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Generate Professional Quote</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close quote generator"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pt-4 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3 text-xs text-indigo-900">
            <strong>FREE Quote Generator</strong> – Turn your calculation into a professional quote in 2 minutes.
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Client Name *</label>
            <input
              type="text"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Client Address *</label>
            <textarea
              value={clientAddress}
              onChange={e => setClientAddress(e.target.value)}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Labour Rate (£/m²) *</label>
            <input
              type="number"
              value={labourRate}
              onChange={e => setLabourRate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-[10px] text-gray-500">Typical range: £15–£25/m²</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Additional Notes (Optional)</label>
            <textarea
              value={additionalNotes}
              onChange={e => setAdditionalNotes(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Work includes… Materials to be sourced from…"
            />
          </div>
        </div>

        <div className="border-t px-6 py-4 flex items-center justify-between gap-3 bg-gray-50 rounded-b-xl">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-white"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:from-purple-700 hover:to-blue-700 text-center"
          >
            Download Quote (PDF)
          </button>
        </div>
      </div>
    </div>
  )
}

// MAIN CALCULATOR COMPONENT
export default function PainterCalculator() {
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [numWalls, setNumWalls] = useState('4')
  const [doorsWindows, setDoorsWindows] = useState('20')
  const [surfaceType, setSurfaceType] = useState<'smooth' | 'textured'>('smooth')
  const [coats, setCoats] = useState('2')
  const [hourlyRate, setHourlyRate] = useState('20')
  const [overhead, setOverhead] = useState('15')
  const [profitMargin, setProfitMargin] = useState('35')
  const [results, setResults] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  // Paint coverage rates (m²/litre)
  const coverageRates: Record<string, number> = {
    'smooth': 12,
    'textured': 10
  }

  // Paint and primer costs per 5L tin
  const paintCostPer5L = 35
  const primerCostPer5L = 28

  const calculate = () => {
    if (!width || !height) return

    // Convert feet to metres and calculate area
    const w = (parseFloat(width) * 0.3048)
    const h = (parseFloat(height) * 0.3048)
    const walls = parseInt(numWalls)
    const numCoats = parseInt(coats)
    const doorsWindowsPercent = parseFloat(doorsWindows) / 100

    // Calculate total wall area in m²
    let totalWallArea = (w * h) * walls

    // Subtract doors and windows
    const exclusionArea = totalWallArea * doorsWindowsPercent
    const paintableArea = totalWallArea - exclusionArea

    // Get coverage rate
    const coverage = coverageRates[surfaceType]

    // Calculate paint needed with wastage factor (10% wastage)
    const wasteFactor = 1.10
    const paintLitresNeeded = ((paintableArea * numCoats) / coverage) * wasteFactor

    // Calculate primer needed (1 coat, ~14 m²/litre coverage)
    const primerCoverage = 14
    const primerLitresNeeded = (paintableArea / primerCoverage) * wasteFactor

    // Round up to nearest 5L tin
    const paintTins = Math.ceil(paintLitresNeeded / 5)
    const primerTins = Math.ceil(primerLitresNeeded / 5)

    // Calculate material costs
    const paintCost = paintTins * paintCostPer5L
    const primerCost = primerTins * primerCostPer5L
    const totalMaterialCost = paintCost + primerCost

    // Calculate labour cost
    const labourRatePerM2 = parseFloat(hourlyRate)
    const labourCost = paintableArea * labourRatePerM2

    // Calculate overhead (% of labour cost)
    const overheadPercent = parseFloat(overhead) / 100
    const overheadCost = labourCost * overheadPercent

    // Calculate total job cost (break-even)
    const totalJobCost = totalMaterialCost + labourCost + overheadCost

    // Calculate client price with profit margin
    const profitMarginPercent = parseFloat(profitMargin) / 100
    const clientPrice = totalJobCost * (1 + profitMarginPercent)

    setResults({
      totalWallArea: totalWallArea.toFixed(2),
      paintableArea: paintableArea.toFixed(2),
      exclusionArea: exclusionArea.toFixed(2),
      paintLitres: paintLitresNeeded.toFixed(1),
      primerLitres: primerLitresNeeded.toFixed(1),
      paintTins,
      primerTins,
      coats: numCoats,
      surfaceType,
      coverage,
      paintCost: paintCost.toFixed(2),
      primerCost: primerCost.toFixed(2),
      totalMaterialCost: totalMaterialCost.toFixed(2),
      labourCost: labourCost.toFixed(2),
      overheadCost: overheadCost.toFixed(2),
      totalJobCost: totalJobCost.toFixed(2),
      profitMargin: (profitMarginPercent * 100).toFixed(0),
      clientPrice: clientPrice.toFixed(2),
      labourRatePerM2: labourRatePerM2.toFixed(2),
      wasteFactor: '10%'
    })
  }

  const resetCalculator = () => {
    setWidth('')
    setHeight('')
    setNumWalls('4')
    setDoorsWindows('20')
    setSurfaceType('smooth')
    setCoats('2')
    setHourlyRate('20')
    setOverhead('15')
    setProfitMargin('35')
    setResults(null)
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
                      'text': 'Calculate total wall area (length × height × number of walls in m²). Subtract doors/windows (typically 20%). Divide by coverage rate (12 m²/litre for smooth surfaces, 10 m²/litre for textured). Multiply by number of coats required. Add 10% wastage factor. Add primer at approximately 14 m²/litre. This calculator automatically determines exact quantities.'
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
              <p className="text-sm opacity-90">Calculate paint quantities, labour costs & quotes for UK decorators and painters</p>
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
                <p className="text-xs text-gray-500 mt-1">For multiple surfaces</p>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">4. Doors & Windows (%)</label>
                <input
                  type="number"
                  value={doorsWindows}
                  onChange={e => setDoorsWindows(e.target.value)}
                  placeholder="e.g. 20"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label="Percentage of area for doors and windows"
                />
                <p className="text-xs text-gray-500 mt-1">Typical: 15-25%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">5. Surface Type</label>
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

              <div>
                <label className="block font-bold text-gray-800 mb-2">6. Number of Coats</label>
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
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">7. Labour Rate (£/m²)</label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={e => setHourlyRate(e.target.value)}
                  placeholder="e.g. 20"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label="Labour rate per square metre"
                />
                <p className="text-xs text-gray-500 mt-1">£15-25/m² typical</p>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">8. Overhead (%)</label>
                <input
                  type="number"
                  value={overhead}
                  onChange={e => setOverhead(e.target.value)}
                  placeholder="e.g. 15"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label="Overhead as percentage of labour"
                />
                <p className="text-xs text-gray-500 mt-1">Insurance, fuel, etc</p>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">9. Profit Margin (%)</label>
                <input
                  type="number"
                  value={profitMargin}
                  onChange={e => setProfitMargin(e.target.value)}
                  placeholder="e.g. 35"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  aria-label="Profit margin percentage"
                />
                <p className="text-xs text-gray-500 mt-1">30-50% typical</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={resetCalculator}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition"
                aria-label="Reset calculator"
              >
                🔄 Reset
              </button>
              <button
                onClick={calculate}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition"
                aria-label="Calculate paint required"
              >
                🎨 Calculate Paint & Quote
              </button>
            </div>

            {results && (
              <>
                <div className={`mt-8 rounded-lg p-6 bg-red-50 border-2 border-red-300`}>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-red-600" />
                    <h3 className={`text-xl font-bold text-red-900`}>
                      ✓ Paint & Cost Breakdown
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded border-t-2 border-b-2 border-red-300">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Total Wall Area</p>
                        <p className="text-lg font-bold text-gray-900">{results.totalWallArea} m²</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">After Exclusions</p>
                        <p className="text-lg font-bold text-gray-900">{results.paintableArea} m²</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Paint Needed</p>
                        <p className="text-lg font-bold text-red-600">{results.paintTins} tins</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Primer Needed</p>
                        <p className="text-lg font-bold text-red-600">{results.primerTins} tins</p>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <p className="text-gray-600">Calculation: {results.paintableArea}m² ÷ {results.coverage}m²/L × {results.coats} coats × {results.wasteFactor} wastage</p>
                        <p className="font-semibold">{results.paintLitres}L paint</p>
                      </div>

                      <div className="flex justify-between">
                        <p className="font-semibold">Paint Cost ({results.paintTins} × 5L @ £35)</p>
                        <p className="font-bold text-lg text-red-600">£{results.paintCost}</p>
                      </div>

                      <div className="flex justify-between">
                        <p className="font-semibold">Primer Cost ({results.primerTins} × 5L @ £28)</p>
                        <p className="font-bold text-lg text-red-600">£{results.primerCost}</p>
                      </div>

                      <div className="border-t pt-2 flex justify-between p-2 rounded bg-gray-50">
                        <p className="font-semibold">Total Material Cost</p>
                        <p className="font-bold text-lg text-red-600">£{results.totalMaterialCost}</p>
                      </div>

                      <div className="flex justify-between">
                        <p className="font-semibold">Labour Cost ({results.paintableArea}m² @ £{results.labourRatePerM2}/m²)</p>
                        <p className="font-bold text-lg">£{results.labourCost}</p>
                      </div>

                      <div className="flex justify-between">
                        <p className="font-semibold">Overhead (15% of labour)</p>
                        <p className="font-bold">£{results.overheadCost}</p>
                      </div>

                      <div className="border-t pt-2 flex justify-between p-2 rounded bg-yellow-50">
                        <p className="font-semibold">Total Job Cost (Break-even)</p>
                        <p className="font-bold text-lg">£{results.totalJobCost}</p>
                      </div>

                      <div className="flex justify-between p-3 rounded bg-green-100 border border-green-300">
                        <p className="font-semibold text-green-900">Client Quote ({results.profitMargin}% profit margin)</p>
                        <p className="font-bold text-lg text-green-700">£{results.clientPrice}</p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded border-l-2 border-gray-400 mt-4">
                      <p className="font-semibold mb-1">Summary:</p>
                      <p className="font-mono">
                        Materials: £{results.totalMaterialCost} + Labour: £{results.labourCost} + Overhead: £{results.overheadCost} = £{results.totalJobCost} + {results.profitMargin}% profit = £{results.clientPrice}
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
                  <li>• <strong>Wastage factor:</strong> Standard 10% for errors and obstacles</li>
                  <li>• <strong>Labour rates:</strong> £15-25/m² UK average (varies by experience)</li>
                  <li>• <strong>Drying time:</strong> 4-8 hours between coats, 24 hours before heavy use</li>
                  <li>• <strong>Overhead:</strong> Budget 10-15% for insurance, fuel, marketing, equipment</li>
                  <li>• <strong>Profit margin:</strong> 30-50% typical for profitable jobs</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Paint Quantity & Cost Calculation Formula</h2>
            <p className="text-gray-700 mb-4">
              Professional painting calculations require accurate surface area measurement, coverage rate selection, wastage accounting, and comprehensive cost estimation including materials, labour, overhead, and profit margins.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-red-600 mb-4">
              <p className="text-sm text-gray-700 font-mono mb-3"><strong>Paint Calculation:</strong></p>
              <p className="text-sm text-gray-700 font-mono mb-4">
                Total Paint = (Paintable Area × Number of Coats ÷ Coverage Rate) × (1 + 10% Wastage)
              </p>
              <p className="text-sm text-gray-700 font-mono mb-3"><strong>Job Cost Estimation:</strong></p>
              <p className="text-sm text-gray-700 font-mono">
                Client Price = (Materials + Labour + Overhead) × (1 + Profit Margin)
              </p>
            </div>
            <p className="text-sm text-gray-700">
              This calculator automatically includes surface area calculations (subtracting doors/windows), applies correct coverage rates by surface type, factors in wastage (10%), calculates primer requirements separately, determines labour costs per m², adds overhead costs (insurance, fuel, marketing), and applies your desired profit margin for accurate professional quoting.
            </p>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Paint Coverage & Calculations</h2>
            <p className="text-gray-700 mb-4">
              Professional painting requires accurate material estimation based on wall area, surface type, colour intensity, and number of coats. This calculator helps you calculate exact quantities of paint, primer, and labour costs based on UK industry standards. Understanding the relationship between coverage rates, surface conditions, and colour depth is essential for accurate quoting and preventing project shortages.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-red-600">
              <p className="text-sm text-gray-700"><strong>Key principle:</strong> Smooth surfaces (12 m²/L) require less paint than textured surfaces (10 m²/L). Dark colours need 3-4 coats minimum for uniform coverage, while light colours typically need only 1-2 coats. Always prime new plasterboard and patched areas to seal porosity and prevent premature topcoat drying, which ensures better coverage and finish quality. Wastage factor (10%) accounts for overspray, brush waste, and obstacles.</p>
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
                <h4 className="font-bold text-gray-800 mb-1">Q: How do I calculate exact surface area with doors and windows?</h4>
                <p className="text-sm text-gray-700">Subtract approximately 20% from total wall area. For precise calculations: standard door (1.9m × 0.9m = 1.7m²), window (1.5m × 1m = 1.5m²). Enter your percentage in the calculator to automatically subtract openings from paintable area.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Why is the 10% wastage factor included?</h4>
                <p className="text-sm text-gray-700">Wastage accounts for: overspray on walls, paint remaining in brushes/rollers, obstacles requiring repainting, natural coating variations, and safety margin to prevent shortages mid-project. Industry standard is 10-15% wastage for indoor painting.</p>
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
                <h4 className="font-bold text-gray-800 mb-1">Q: How should I budget for overhead and profit?</h4>
                <p className="text-sm text-gray-700">Overhead (10-15% of labour) covers: insurance, fuel, vehicle maintenance, marketing, admin. Profit margin (30-50%) covers: business growth, contingencies, weather delays, emergency repairs. Total client price = (Materials + Labour + Overhead) × (1 + Profit Margin).</p>
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
                <p className="text-sm text-yellow-800">This calculator provides professional estimates based on UK paint manufacturer specifications, industry-standard coverage rates, and proven cost calculation methodologies. Coverage rates vary by paint brand, substrate condition, application technique, and environmental factors - always confirm specifications with your paint supplier. Proper surface preparation and environmental conditions (10-25°C, 35-65% humidity) are critical for professional results. For best quality, use premium paints from reputable UK manufacturers. Always order extra paint (10-15%) for waste and future touch-ups. Keep detailed notes on paint batch numbers for consistent colour matching on future projects.</p>
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
                { item: 'Primer/Sealer', quantity: `${results.primerTins}`, unit: '5L tins' },
                { item: 'Preparation Materials (filler, sandpaper, tape)', quantity: '1', unit: 'job' },
                { item: 'Professional Painting Labour', quantity: results.paintableArea, unit: 'm²' }
              ],
              summary: `${results.paintableArea}m² painting project - ${results.coats} coat${results.coats !== 1 ? 's' : ''} on ${results.surfaceType} surface (10% wastage) - Paint: £${results.paintCost} + Primer: £${results.primeCost} = £${results.totalMaterialCost} materials - Labour: £${results.labourCost} + Overhead: £${results.overheadCost} = £${results.totalJobCost} total cost - Client quote with ${results.profitMargin}% profit margin: £${results.clientPrice}`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}






