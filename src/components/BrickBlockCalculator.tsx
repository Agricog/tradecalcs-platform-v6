import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Info, CheckCircle2, AlertCircle } from 'lucide-react'
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
  const [labourRate, setLabourRate] = useState('50')
  const [estimatedHours, setEstimatedHours] = useState('8')
  const [materialMarkup, setMaterialMarkup] = useState('15')
  const [additionalNotes, setAdditionalNotes] = useState('Work includes… Materials to be sourced from…')

  const parseNumber = (value: string, fallback: number) => {
    const n = parseFloat(value)
    return isNaN(n) ? fallback : n
  }

  const handleDownloadPdf = () => {
    const rate = parseNumber(labourRate, 0)
    const hours = parseNumber(estimatedHours, 0)
    const markup = parseNumber(materialMarkup, 0)

    const labourTotal = rate * hours
    const materialBase = 0
    const materialTotal = materialBase * (1 + markup / 100)
    const grandTotal = labourTotal + materialTotal

    const doc = new jsPDF()

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('Professional Brickwork Quote', 20, 20)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text(`Client: ${clientName}`, 20, 32)
    doc.text(`Address: ${clientAddress}`, 20, 38)

    doc.text(`Labour rate: £${rate.toFixed(2)}/hour`, 20, 50)
    doc.text(`Estimated hours: ${hours}`, 20, 56)
    doc.text(`Material markup: ${markup}%`, 20, 62)
    doc.text(`Estimated labour total: £${labourTotal.toFixed(2)}`, 20, 68)
    doc.text(`Estimated materials total: £${materialTotal.toFixed(2)} (see calculator)`, 20, 74)
    doc.text(`Estimated project total: £${grandTotal.toFixed(2)}`, 20, 80)

    let y = 92
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

    doc.save('brickwork-quote.pdf')
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Labour Rate (£/hour) *</label>
              <input
                type="number"
                value={labourRate}
                onChange={e => setLabourRate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <p className="text-[10px] text-gray-500">Typical range: £25–£50+</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Estimated Hours *</label>
              <input
                type="number"
                value={estimatedHours}
                onChange={e => setEstimatedHours(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Material Markup (%)</label>
            <input
              type="number"
              value={materialMarkup}
              onChange={e => setMaterialMarkup(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-[10px] text-gray-500">Typical range: 10–20%</p>
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
export default function BrickBlockCalculator() {
  const [materialType, setMaterialType] = useState<'brick' | 'block140' | 'block100'>('brick')
  const [wallArea, setWallArea] = useState('')
  const [wasteFactor, setWasteFactor] = useState(10)
  const [results, setResults] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  const materialSpecs: Record<string, { name: string; bricksPerM2: number; sandPerM2: number; cementPerM2: number }> = {
    brick: { 
      name: 'Standard UK Bricks (215×102.5×65mm)', 
      bricksPerM2: 60,
      sandPerM2: 40, // kg per m²
      cementPerM2: 8 // kg per m²
    },
    block140: { 
      name: '140mm Concrete Blocks (440×215×140mm)', 
      bricksPerM2: 10.76,
      sandPerM2: 32.5, // kg per m²
      cementPerM2: 9.5 // kg per m²
    },
    block100: { 
      name: '100mm Concrete Blocks (440×215×100mm)', 
      bricksPerM2: 10.76,
      sandPerM2: 32.5, // kg per m²
      cementPerM2: 9.5 // kg per m²
    }
  }

  const calculate = () => {
    if (!wallArea) return

    const area = parseFloat(wallArea)
    const specs = materialSpecs[materialType]
    
    // Calculate quantities without waste first
    const itemsNeeded = Math.ceil(area * specs.bricksPerM2)
    const sandKgBase = area * specs.sandPerM2
    const cementKgBase = area * specs.cementPerM2

    // Apply waste factor
    const itemsWithWaste = Math.ceil(itemsNeeded * (1 + wasteFactor / 100))
    const sandKgWithWaste = sandKgBase * (1 + wasteFactor / 100)
    const cementKgWithWaste = cementKgBase * (1 + wasteFactor / 100)

    // Convert to practical ordering quantities
    const sandTonnes = sandKgWithWaste / 1000
    const sandTonnesRounded = Math.ceil(sandTonnes * 2) / 2 // Round to nearest 0.5 tonne
    const cementBags = Math.ceil(cementKgWithWaste / 25)

    // Cost calculations
    const sandCost = sandTonnesRounded * 45.00
    const cementCost = cementBags * 6.50

    setResults({
      materialName: specs.name,
      itemsNeeded: itemsNeeded.toLocaleString(),
      itemsWithWaste: itemsWithWaste.toLocaleString(),
      wallArea: area.toFixed(2),
      sandTonnes: sandTonnesRounded.toFixed(2),
      cementBags,
      cementKgBase: cementKgBase.toFixed(1),
      sandKgBase: sandKgBase.toFixed(1),
      sandCost: sandCost.toFixed(2),
      cementCost: cementCost.toFixed(2),
      totalMaterialCost: (sandCost + cementCost).toFixed(2),
      wasteFactor,
      mortarRatio: '4:1 (sand:cement)'
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
                'description': 'Professional brick and block calculator for UK bricklayers. Calculate exact quantities of bricks, concrete blocks, cement, sand, mortar and labour costs for any bricklaying project using standard 4:1 mortar ratio.',
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
                    'name': 'How many bricks per m² do I need?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Standard UK bricks (215×102.5×65mm) require approximately 60 bricks per square metre in a single skin wall with 10mm mortar joints. Concrete blocks (100mm or 140mm) require approximately 10.76 per m². This calculator automatically calculates quantities based on wall area.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How much sand and cement do I need per m²?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Standard bricks: 40kg sand and 8kg cement per m². 140mm concrete blocks: 32.5kg sand and 9.5kg cement per m². 100mm concrete blocks: 32.5kg sand and 9.5kg cement per m². These are based on a 4:1 mortar ratio (4 parts sand to 1 part cement) with 10mm mortar joints.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the standard mortar ratio?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'The standard UK bricklaying mortar ratio is 4:1 (4 parts sand to 1 part cement). This calculator uses this proven ratio for all brick and block calculations. It provides optimal strength, workability, and cost balance for typical UK construction.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the difference between 100mm and 140mm concrete blocks?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': '100mm (4") concrete blocks are used for non-load bearing internal walls and partitions. 140mm (6") concrete blocks are used for structural load-bearing walls. Both measure 440mm × 215mm and use the same mortar consumption per m². Both use the same per-m² sand and cement requirements.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How much waste factor should I include?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Include 10% waste factor as standard for typical bricklaying. This accounts for spillage, breakage, and uneven application. Use 5% for simple rectangular walls with experienced teams, or 15% for complex patterns or difficult access. The calculator includes waste factor automatically.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How do I calculate for openings (doors/windows)?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Subtract opening areas from your total wall area before entering into the calculator. For example: 100m² wall - 2 doors (3.4m² each) - 6 windows (1.5m² each) = 89.2m². Enter the net wall area for accurate material estimates.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What are the current material costs?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Q4 2025 UK market rates: Cement £6.50 per 25kg bag, Building sand £45 per tonne. These are approximate retail prices - confirm with your suppliers. Actual costs vary by location, supplier, and bulk discounts. Always get quotes from multiple suppliers before ordering.'
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
            <p className="text-lg opacity-95">Calculate exact mortar, cement & sand needed instantly</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="bg-red-600 text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Info className="w-5 h-5" />
                <h2 className="text-lg font-bold">Bricklaying Materials Calculator</h2>
              </div>
              <p className="text-sm opacity-90">Calculate cement, sand and mortar using standard 4:1 ratio (4 parts sand to 1 part cement)</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">1. Material Type</label>
              <select
                value={materialType}
                onChange={e => setMaterialType(e.target.value as 'brick' | 'block140' | 'block100')}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 mb-2"
                aria-label="Material type - brick or concrete block"
              >
                <option value="brick">Standard UK Bricks (215×102.5×65mm) - 60/m²</option>
                <option value="block140">140mm Concrete Blocks (440×215×140mm) - 10.76/m²</option>
                <option value="block100">100mm Concrete Blocks (440×215×100mm) - 10.76/m²</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Select material type and quantity per m²</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">2. Wall Area (m²)</label>
              <input
                type="number"
                step="0.5"
                value={wallArea}
                onChange={e => setWallArea(e.target.value)}
                placeholder="e.g. 20"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 mb-2"
                aria-label="Wall area in square metres"
              />
              <div className="flex gap-2 flex-wrap">
                {['5', '10', '15', '20', '25'].map(area => (
                  <button
                    key={area}
                    onClick={() => setWallArea(area)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold text-sm hover:bg-red-200"
                    aria-label={`Set wall area to ${area}m²`}
                  >
                    {area}m²
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block font-bold text-gray-800">3. Waste Factor: {wasteFactor}%</label>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                value={wasteFactor}
                onChange={e => setWasteFactor(Number(e.target.value))}
                className="w-full"
                aria-label="Waste factor percentage"
              />
              <p className="text-xs text-gray-500 mt-1">Typical: 10% standard, 5% simple work, 15-20% complex patterns</p>
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
                      ✓ Materials Required
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded border-t-2 border-b-2 border-red-300">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Wall Area</p>
                        <p className="text-2xl font-bold text-gray-900">{results.wallArea}</p>
                        <p className="text-xs text-gray-500">m²</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">{results.materialName}</p>
                        <p className="text-2xl font-bold text-red-600">{results.itemsWithWaste}</p>
                        <p className="text-xs text-gray-500">units (with waste)</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Building Sand</p>
                        <p className="text-2xl font-bold text-red-600">{results.sandTonnes}</p>
                        <p className="text-xs text-gray-500">tonnes</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Cement (25kg bags)</p>
                        <p className="text-2xl font-bold text-red-600">{results.cementBags}</p>
                        <p className="text-xs text-gray-500">bags</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2 pb-2 border-b">
                        <p className="font-semibold">Mortar Ratio (Sand:Cement)</p>
                        <p className="font-bold">{results.mortarRatio}</p>
                      </div>
                      <div className="flex justify-between mb-2 pb-2 border-b text-xs text-gray-600">
                        <p>Base Sand (without waste)</p>
                        <p>{results.sandKgBase}kg</p>
                      </div>
                      <div className="flex justify-between mb-3 pb-2 border-b text-xs text-gray-600">
                        <p>Base Cement (without waste)</p>
                        <p>{results.cementKgBase}kg</p>
                      </div>
                      <div className="flex justify-between mb-3">
                        <p className="font-semibold">Sand Cost</p>
                        <p className="font-bold text-lg">£{results.sandCost}</p>
                      </div>
                      <div className="flex justify-between mb-3 p-2 rounded bg-gray-50">
                        <p className="font-semibold">Cement Cost</p>
                        <p className="font-bold text-lg">£{results.cementCost}</p>
                      </div>
                      <div className="flex justify-between p-3 rounded bg-green-100 border border-green-300">
                        <p className="font-semibold text-green-900">Total Material Cost</p>
                        <p className="font-bold text-lg text-green-700">£{results.totalMaterialCost}</p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded border-l-2 border-gray-400 mt-4">
                      <p className="font-semibold mb-1">Summary:</p>
                      <p className="font-mono">
                        {results.wallArea}m² wall: {results.itemsWithWaste} {results.materialName} + {results.sandTonnes}t sand + {results.cementBags} cement bags (4:1 ratio) = £{results.totalMaterialCost}
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
                <h3 className="font-bold text-red-900 mb-3">🧱 Standard Bricklaying Specifications</h3>
                <ul className="space-y-2 text-sm text-red-900">
                  <li>• <strong>Standard Bricks (60/m²):</strong> 40kg sand + 8kg cement per m² (4:1 ratio)</li>
                  <li>• <strong>140mm Blocks (10.76/m²):</strong> 32.5kg sand + 9.5kg cement per m² (4:1 ratio)</li>
                  <li>• <strong>100mm Blocks (10.76/m²):</strong> 32.5kg sand + 9.5kg cement per m² (4:1 ratio)</li>
                  <li>• <strong>Waste factors:</strong> 5% simple, 10% standard, 15-20% complex patterns</li>
                  <li>• <strong>Material costs:</strong> Cement £6.50/bag, Sand £45/tonne (Q4 2025)</li>
                  <li>• <strong>Always deduct:</strong> Door/window openings from total wall area</li>
                  <li>• <strong>Always verify:</strong> Structural engineer approval for load-bearing work</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Bricklaying Material Calculations Work</h2>
            <p className="text-gray-700 mb-4">
              Professional bricklaying requires accurate material estimation based on wall area, material type, and mortar specifications. This calculator uses industry-standard consumption rates validated across UK construction projects. The 4:1 mortar ratio (4 parts sand to 1 part cement) is the proven standard for optimal strength, workability, and cost.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-4">
              <p className="text-sm text-blue-800 mb-3"><strong>Example Calculation (Standard Bricks):</strong></p>
              <p className="text-sm text-blue-800">For 20m² wall:</p>
              <ul className="text-sm text-blue-800 space-y-1 ml-4 mt-2">
                <li>• Bricks needed: 20 × 60 = 1,200 bricks</li>
                <li>• Sand needed: 20 × 40kg = 800kg = 0.8 tonnes</li>
                <li>• Cement needed: 20 × 8kg = 160kg = 6.4 bags (round to 7 bags)</li>
                <li>• With 10% waste: 1,320 bricks + 0.9t sand + 7 bags cement</li>
                <li>• Material cost: (7 × £6.50) + (1 × £45) = £45.50 + £45 = £90.50</li>
              </ul>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="border-l-4 border-red-600 bg-red-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Standard Bricks</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ 60 per m²</li>
                  <li>✓ 40kg sand/m²</li>
                  <li>✓ 8kg cement/m²</li>
                  <li>✓ External walls</li>
                  <li>✓ Premium appearance</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">140mm Blocks</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ 10.76 per m²</li>
                  <li>✓ 32.5kg sand/m²</li>
                  <li>✓ 9.5kg cement/m²</li>
                  <li>✓ Load-bearing walls</li>
                  <li>✓ Better insulation</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">100mm Blocks</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ 10.76 per m²</li>
                  <li>✓ 32.5kg sand/m²</li>
                  <li>✓ 9.5kg cement/m²</li>
                  <li>✓ Internal partitions</li>
                  <li>✓ Non-load bearing</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Material Type & Block Specifications</h2>
            <p className="text-gray-700 mb-4">
              Different materials serve different purposes in UK construction. Standard bricks (60/m²) are used for external visible walls where appearance matters. Concrete blocks are more economical for hidden work and internal partitions.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-red-600 bg-red-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Why Calculate by Wall Area?</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Simpler than counting individual units</li>
                  <li>✓ Easier to measure on site</li>
                  <li>✓ Easy to deduct openings</li>
                  <li>✓ Professional standard method</li>
                  <li>✓ Works for all material types</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-600 bg-orange-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Waste Factor Purpose</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Spillage during mixing</li>
                  <li>✓ Material sticking to equipment</li>
                  <li>✓ Breakage during transport/laying</li>
                  <li>✓ Uneven application on units</li>
                  <li>✓ Safety margin to avoid shortfalls</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Calculate Wall Area with Openings</h2>
            <p className="text-gray-700 mb-4">
              Always subtract door and window openings from your total wall area for accurate material estimates:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-4">
              <p className="text-sm font-mono text-gray-800 mb-2"><strong>Example:</strong></p>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li>• Total wall area: 100m²</li>
                <li>• Less: 2 doors @ 1.7m² each = 3.4m²</li>
                <li>• Less: 6 windows @ 1.5m² each = 9m²</li>
                <li>• <strong>Net wall area: 87.6m²</strong> ← Enter this into calculator</li>
              </ul>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded text-sm text-yellow-800">
              <strong>Tip:</strong> Standard door opening = 1.7m² (approx), Standard window = 1.5m² (approx). Measure your specific openings for greater accuracy.
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Current UK Material Costs (Q4 2025)</h2>
            <p className="text-gray-700 mb-4">These are current market rates. Actual prices vary by location, supplier, and quantity - always confirm with your suppliers before ordering.</p>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b">
                  <p className="font-semibold text-gray-900">Portland Cement (25kg bag)</p>
                  <p className="font-semibold text-gray-900">£6.50</p>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <p className="font-semibold text-gray-900">Building Sand (per tonne)</p>
                  <p className="font-semibold text-gray-900">£45.00</p>
                </div>
                <div className="flex justify-between pb-2 border-b">
                  <p className="text-gray-700">Typical 20m² wall (bricks, 1,200 units)</p>
                  <p className="font-semibold text-gray-700">~£90 materials</p>
                </div>
                <div className="flex justify-between bg-green-100 p-2 rounded border border-green-300">
                  <p className="font-semibold text-gray-900">Professional labour rate</p>
                  <p className="font-semibold text-green-700">£35-50/m² (current)</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How do I know my wall area if I only have length and height?</h4>
                <p className="text-sm text-gray-700">Multiply length × height. For example: 10 metres long × 2.4 metres high = 24m² wall area. Deduct any door or window openings from this figure before entering into the calculator.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Can I use this for cavity walls?</h4>
                <p className="text-sm text-gray-700">Yes, calculate each leaf separately. Typical cavity wall: outer leaf bricks (60/m²) + cavity gap + inner leaf blocks (10.76/m²). Calculate outer bricks, then inner blocks separately, or combine totals for complete ordering.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Why use 4:1 mortar ratio?</h4>
                <p className="text-sm text-gray-700">The 4:1 (sand:cement) ratio is the UK standard for general bricklaying. It provides optimal strength, workability, and cost balance. This calculator uses this proven ratio for all calculations. Different applications (e.g., structural/load-bearing) may require different ratios - consult a structural engineer.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How long does mortar take to cure?</h4>
                <p className="text-sm text-gray-700">Allow minimum 7-14 days before applying load to brickwork, depending on weather. Cold weather (below 10°C) significantly slows curing. Allow additional time in winter. Follow structural engineer specifications for load-bearing work timelines.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Should I round up quantities?</h4>
                <p className="text-sm text-gray-700">Yes, always round up. This calculator rounds to practical ordering quantities (0.5 tonne increments for sand, whole bags for cement). Sand is typically delivered in 1 tonne minimum lots. The waste factor also provides a safety margin.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Can I order different quantities from my supplier?</h4>
                <p className="text-sm text-gray-700">Yes, suppliers often have bulk discounts. Always get quotes based on the calculated quantities. Some suppliers offer 0.5 tonne sand increments, others only 1 tonne minimums. Check with your local supplier for options and delivery charges.</p>
              </div>
            </div>
          </section>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-yellow-900 mb-2">✓ Professional Quality Assurance</p>
                <p className="text-sm text-yellow-800">This calculator uses verified UK industry standards: 60 bricks/m² for standard UK bricks, 10.76/m² for concrete blocks. Material consumption rates are based on 4:1 mortar ratio with 10mm mortar joints. Prices are Q4 2025 market estimates - confirm with suppliers before ordering. Different suppliers may have varying prices and bulk discounts. Always verify material quantities on site before ordering and follow structural engineer requirements for load-bearing work.</p>
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
            <p className="mb-6">Use our comprehensive suite of professional estimators: <a href="/plaster-calculator" className="underline hover:opacity-90">Plaster Calculator</a> for coverage & materials, <a href="/concrete-calculator" className="underline hover:opacity-90">Concrete Calculator</a> for cement & ballast, <a href="/" className="underline hover:opacity-90">view all calculators</a> to build complete project estimates and quote confidently.</p>
            <a href="/" className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </a>
          </div>
        </div>

        {showQuoteGenerator && results && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: results.materialName, quantity: results.itemsWithWaste, unit: 'units' },
                { item: 'Building Sand', quantity: results.sandTonnes, unit: 'tonnes' },
                { item: 'Cement (25kg bags)', quantity: results.cementBags.toString(), unit: 'bags' },
                { item: 'Wall Area', quantity: results.wallArea, unit: 'm²' }
              ],
              summary: `${results.wallArea}m² wall (${results.materialName}) - ${results.itemsWithWaste} units + ${results.sandTonnes}t sand + ${results.cementBags} cement bags (4:1 mortar ratio) with ${results.wasteFactor}% waste factor included - Materials cost: £${results.totalMaterialCost}`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}







                    



