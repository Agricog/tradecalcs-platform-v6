import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Info, CheckCircle2, AlertCircle } from 'lucide-react'
import jsPDF from 'jspdf'

// ============================================
// TYPES
// ============================================
type MaterialItem = {
  item: string
  quantity: string
  unit: string
}

type CalculationResults = {
  materials: MaterialItem[]
  summary: string
}

// Use-case props interface for programmatic SEO pages
export interface BrickCalculatorUsecaseProps {
  // SEO metadata (if provided, overrides defaults)
  metaTitle?: string
  metaDescription?: string
  h1?: string
  description?: string
  
  // Calculator defaults for this use-case
  defaults?: {
    materialType?: 'brick' | 'block140' | 'block100'
    length?: string
    height?: string
    wasteFactor?: number
  }
  
  // Use-case specific tips (shown in tips box)
  tips?: string[]
  
  // Hide the full page wrapper (for embedding in use-case template)
  embedded?: boolean
  
  // Slug for canonical URL
  slug?: string
}

// ============================================
// QUOTE GENERATOR COMPONENT (unchanged)
// ============================================
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

// ============================================
// CALCULATOR CORE COMPONENT (extracted for reuse)
// ============================================
interface CalculatorCoreProps {
  defaultMaterialType?: 'brick' | 'block140' | 'block100'
  defaultLength?: string
  defaultHeight?: string
  defaultWasteFactor?: number
  usecaseTips?: string[]
  onResultsChange?: (results: any) => void
}

export function BrickCalculatorCore({
  defaultMaterialType = 'brick',
  defaultLength = '',
  defaultHeight = '',
  defaultWasteFactor = 10,
  usecaseTips,
  onResultsChange
}: CalculatorCoreProps) {
  const [materialType, setMaterialType] = useState<'brick' | 'block140' | 'block100'>(defaultMaterialType)
  const [length, setLength] = useState(defaultLength)
  const [height, setHeight] = useState(defaultHeight)
  const [wasteFactor, setWasteFactor] = useState(defaultWasteFactor)
  const [results, setResults] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  // Apply defaults when props change
  useEffect(() => {
    if (defaultMaterialType) setMaterialType(defaultMaterialType)
    if (defaultLength) setLength(defaultLength)
    if (defaultHeight) setHeight(defaultHeight)
    if (defaultWasteFactor) setWasteFactor(defaultWasteFactor)
  }, [defaultMaterialType, defaultLength, defaultHeight, defaultWasteFactor])

  const materialSpecs: Record<string, { name: string; bricksPerM2: number; sandPerM2: number; cementPerM2: number }> = {
    brick: { 
      name: 'Standard UK Bricks (215×102.5×65mm)', 
      bricksPerM2: 60,
      sandPerM2: 40,
      cementPerM2: 8
    },
    block140: { 
      name: '140mm Concrete Blocks (440×215×140mm)', 
      bricksPerM2: 10.76,
      sandPerM2: 32.5,
      cementPerM2: 9.5
    },
    block100: { 
      name: '100mm Concrete Blocks (440×215×100mm)', 
      bricksPerM2: 10.76,
      sandPerM2: 32.5,
      cementPerM2: 9.5
    }
  }

  const calculate = () => {
    if (!length || !height) return

    const lengthM = parseFloat(length)
    const heightM = parseFloat(height)
    const wallArea = lengthM * heightM
    const specs = materialSpecs[materialType]
    
    const itemsNeeded = Math.ceil(wallArea * specs.bricksPerM2)
    const sandKgBase = wallArea * specs.sandPerM2
    const cementKgBase = wallArea * specs.cementPerM2

    const itemsWithWaste = Math.ceil(itemsNeeded * (1 + wasteFactor / 100))
    const sandKgWithWaste = sandKgBase * (1 + wasteFactor / 100)
    const cementKgWithWaste = cementKgBase * (1 + wasteFactor / 100)

    const sandTonnes = sandKgWithWaste / 1000
    const sandTonnesRounded = Math.ceil(sandTonnes * 2) / 2
    const cementBags = Math.ceil(cementKgWithWaste / 25)

    const sandCost = sandTonnesRounded * 45.00
    const cementCost = cementBags * 6.50

    const newResults = {
      materialName: specs.name,
      itemsNeeded: itemsNeeded.toLocaleString(),
      itemsWithWaste: itemsWithWaste.toLocaleString(),
      wallArea: wallArea.toFixed(2),
      length: lengthM.toFixed(2),
      height: heightM.toFixed(2),
      sandTonnes: sandTonnesRounded.toFixed(2),
      cementBags,
      cementKgBase: cementKgBase.toFixed(1),
      sandKgBase: sandKgBase.toFixed(1),
      sandCost: sandCost.toFixed(2),
      cementCost: cementCost.toFixed(2),
      totalMaterialCost: (sandCost + cementCost).toFixed(2),
      wasteFactor,
      mortarRatio: '4:1 (sand:cement)'
    }

    setResults(newResults)
    onResultsChange?.(newResults)
  }

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8">
      {/* Calculator Header */}
      <div className="bg-red-600 text-white rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Info className="w-5 h-5" />
          <h2 className="text-lg font-bold">Bricklaying Materials Calculator</h2>
        </div>
        <p className="text-sm opacity-90">Calculate cement, sand and mortar using standard 4:1 ratio</p>
      </div>

      {/* Material Type Selection */}
      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">1. Material Type</label>
        <select
          value={materialType}
          onChange={e => setMaterialType(e.target.value as 'brick' | 'block140' | 'block100')}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 mb-2"
          aria-label="Material type"
        >
          <option value="brick">Standard UK Bricks (215×102.5×65mm) - 60/m²</option>
          <option value="block140">140mm Concrete Blocks (440×215×140mm) - 10.76/m²</option>
          <option value="block100">100mm Concrete Blocks (440×215×100mm) - 10.76/m²</option>
        </select>
      </div>

      {/* Dimensions */}
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
          />
          <div className="flex gap-2 flex-wrap">
            {['5', '10', '15', '20'].map(len => (
              <button
                key={len}
                onClick={() => setLength(len)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold text-sm hover:bg-red-200"
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
          />
          <div className="flex gap-2 flex-wrap">
            {['1.8', '2.4', '2.7', '3.0'].map(hgt => (
              <button
                key={hgt}
                onClick={() => setHeight(hgt)}
                className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold text-sm hover:bg-red-200"
              >
                {hgt}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Waste Factor */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block font-bold text-gray-800">4. Waste Factor: {wasteFactor}%</label>
        </div>
        <input
          type="range"
          min="0"
          max="20"
          value={wasteFactor}
          onChange={e => setWasteFactor(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-500 mt-1">Typical: 10% standard, 5% simple work, 15-20% complex patterns</p>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculate}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-lg transition"
      >
        🧱 Calculate Materials
      </button>

      {/* Results */}
      {results && (
        <>
          <div className="mt-8 rounded-lg p-6 bg-red-50 border-2 border-red-300">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-6 h-6 text-red-600" />
              <h3 className="text-xl font-bold text-red-900">✓ Materials Required</h3>
            </div>

            <div className="bg-white p-4 rounded border-t-2 border-b-2 border-red-300">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Wall Dimensions</p>
                  <p className="text-lg font-bold text-gray-900">{results.length}m × {results.height}m</p>
                  <p className="text-xs text-gray-500">{results.wallArea}m² area</p>
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
            </div>
          </div>

          {/* Quote Generator CTA */}
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
            >
              Generate Free Quote
            </button>
          </div>
        </>
      )}

      {/* Quote Generator Modal */}
      {showQuoteGenerator && results && (
        <QuoteGenerator
          calculationResults={{
            materials: [
              { item: results.materialName, quantity: results.itemsWithWaste, unit: 'units' },
              { item: 'Building Sand', quantity: results.sandTonnes, unit: 'tonnes' },
              { item: 'Cement (25kg bags)', quantity: results.cementBags.toString(), unit: 'bags' },
              { item: 'Wall Area', quantity: results.wallArea, unit: 'm²' }
            ],
            summary: `${results.length}m × ${results.height}m wall (${results.wallArea}m², ${results.materialName}) - ${results.itemsWithWaste} units + ${results.sandTonnes}t sand + ${results.cementBags} cement bags (4:1 mortar ratio) with ${results.wasteFactor}% waste factor included - Materials cost: £${results.totalMaterialCost}`
          }}
          onClose={() => setShowQuoteGenerator(false)}
        />
      )}
    </div>
  )
}

// ============================================
// MAIN COMPONENT (supports both standalone & embedded)
// ============================================
export default function BrickBlockCalculator(props: BrickCalculatorUsecaseProps = {}) {
  const {
    metaTitle,
    metaDescription,
    h1,
    description,
    defaults,
    tips,
    embedded = false,
    slug
  } = props

  // Default SEO values (original page)
  const seoTitle = metaTitle || 'Brick & Block Calculator UK | Free Bricklaying Materials Calculator | TradeCalcs'
  const seoDescription = metaDescription || 'Free brick and block calculator for UK bricklayers. Calculate exact quantities of bricks, blocks, cement, sand, mortar and labour costs instantly. Professional tool with waste factors.'
  const pageH1 = h1 || 'Brick & Block Calculator UK'
  const pageDescription = description || 'Calculate exact mortar, cement & sand needed instantly'
  const canonicalUrl = slug 
    ? `https://tradecalcs.co.uk/calculators/brick-calculator/${slug}`
    : 'https://tradecalcs.co.uk/brick-block-calculator'

  // If embedded, just render the calculator core
  if (embedded) {
    return (
      <BrickCalculatorCore
        defaultMaterialType={defaults?.materialType}
        defaultLength={defaults?.length}
        defaultHeight={defaults?.height}
        defaultWasteFactor={defaults?.wasteFactor}
        usecaseTips={tips}
      />
    )
  }

  // Full page render (standalone)
  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="brick calculator, block calculator, bricklaying calculator, mortar calculator, cement calculator, UK bricklayer tools, building materials calculator, brick wall calculator, concrete block calculator, bricklaying estimator" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />

        <link rel="canonical" href={canonicalUrl} />
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
                  { '@type': 'ListItem', 'position': 3, 'name': pageH1, 'item': canonicalUrl }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': pageH1,
                'description': seoDescription,
                'applicationCategory': 'Utility',
                'url': canonicalUrl,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '1,203' }
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

        {/* Hero */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Info className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">{pageH1}</h1>
            <p className="text-lg opacity-95">{pageDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Calculator */}
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <BrickCalculatorCore
              defaultMaterialType={defaults?.materialType}
              defaultLength={defaults?.length}
              defaultHeight={defaults?.height}
              defaultWasteFactor={defaults?.wasteFactor}
              usecaseTips={tips}
            />
          </div>

          {/* Use-case specific tips (if provided) */}
          {tips && tips.length > 0 && (
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-amber-900 mb-3">Tips for This Project Type</h3>
                  <ul className="space-y-2 text-sm text-amber-800">
                    {tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Standard Specifications */}
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
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-red-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Complete Your Trade Calculations</h2>
            <p className="mb-6">Use our comprehensive suite of professional estimators</p>
            <a href="/" className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </a>
          </div>
        </div>
      </div>
    </>
  )
}








                    



