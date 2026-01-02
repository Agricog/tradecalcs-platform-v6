import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Info, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import jsPDF from 'jspdf'
import SaveBrickCalcToProject from './brick/SaveBrickCalcToProject'

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
  metaTitle?: string
  metaDescription?: string
  h1?: string
  description?: string
  defaults?: {
    materialType?: 'brick' | 'block140' | 'block100'
    length?: string
    height?: string
    wasteFactor?: number
  }
  tips?: string[]
  embedded?: boolean
  slug?: string
}

// ============================================
// QUOTE GENERATOR COMPONENT
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
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close">✕</button>
        </div>
        <div className="px-6 pt-4 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3 text-xs text-indigo-900">
            <strong>FREE Quote Generator</strong> – Turn your calculation into a professional quote in 2 minutes.
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Client Name *</label>
            <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Client Address *</label>
            <textarea value={clientAddress} onChange={e => setClientAddress(e.target.value)} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Labour Rate (£/hour) *</label>
              <input type="number" value={labourRate} onChange={e => setLabourRate(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Estimated Hours *</label>
              <input type="number" value={estimatedHours} onChange={e => setEstimatedHours(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Material Markup (%)</label>
            <input type="number" value={materialMarkup} onChange={e => setMaterialMarkup(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Additional Notes</label>
            <textarea value={additionalNotes} onChange={e => setAdditionalNotes(e.target.value)} rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div className="border-t px-6 py-4 flex items-center justify-between gap-3 bg-gray-50 rounded-b-xl">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-white">Close</button>
          <button type="button" onClick={handleDownloadPdf} className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold hover:from-purple-700 hover:to-blue-700 text-center">Download Quote (PDF)</button>
        </div>
      </div>
    </div>
  )
}

// ============================================
// CALCULATOR CORE COMPONENT
// ============================================
interface CalculatorCoreProps {
  defaultMaterialType?: 'brick' | 'block140' | 'block100'
  defaultLength?: string
  defaultHeight?: string
  defaultWasteFactor?: number
}

export function BrickCalculatorCore({
  defaultMaterialType = 'brick',
  defaultLength = '',
  defaultHeight = '',
  defaultWasteFactor = 10
}: CalculatorCoreProps) {
  const [materialType, setMaterialType] = useState<'brick' | 'block140' | 'block100'>(defaultMaterialType)
  const [length, setLength] = useState(defaultLength)
  const [height, setHeight] = useState(defaultHeight)
  const [wasteFactor, setWasteFactor] = useState(defaultWasteFactor)
  const [results, setResults] = useState<{
    materialName: string
    itemsNeeded: string
    itemsWithWaste: string
    wallArea: string
    length: string
    height: string
    sandTonnes: string
    cementBags: number
    sandCost: string
    cementCost: string
    unitCost: string
    unitName: string
    totalMaterialCost: string
    wasteFactor: number
    mortarRatio: string
  } | null>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  useEffect(() => {
    if (defaultMaterialType) setMaterialType(defaultMaterialType)
    if (defaultLength) setLength(defaultLength)
    if (defaultHeight) setHeight(defaultHeight)
    if (defaultWasteFactor) setWasteFactor(defaultWasteFactor)
  }, [defaultMaterialType, defaultLength, defaultHeight, defaultWasteFactor])

  const materialSpecs: Record<string, { name: string; bricksPerM2: number; sandPerM2: number; cementPerM2: number; unitPrice: number; unitName: string }> = {
    brick: { name: 'Standard UK Bricks (215×102.5×65mm)', bricksPerM2: 60, sandPerM2: 40, cementPerM2: 8, unitPrice: 0.65, unitName: 'bricks' },
    block140: { name: '140mm Concrete Blocks (440×215×140mm)', bricksPerM2: 10.76, sandPerM2: 32.5, cementPerM2: 9.5, unitPrice: 1.90, unitName: 'blocks' },
    block100: { name: '100mm Concrete Blocks (440×215×100mm)', bricksPerM2: 10.76, sandPerM2: 32.5, cementPerM2: 9.5, unitPrice: 1.50, unitName: 'blocks' }
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
    const unitCost = itemsWithWaste * specs.unitPrice

    setResults({
      materialName: specs.name,
      itemsNeeded: itemsNeeded.toLocaleString(),
      itemsWithWaste: itemsWithWaste.toLocaleString(),
      wallArea: wallArea.toFixed(2),
      length: lengthM.toFixed(2),
      height: heightM.toFixed(2),
      sandTonnes: sandTonnesRounded.toFixed(2),
      cementBags,
      sandCost: sandCost.toFixed(2),
      cementCost: cementCost.toFixed(2),
      unitCost: unitCost.toFixed(2),
      unitName: specs.unitName,
      totalMaterialCost: (sandCost + cementCost + unitCost).toFixed(2),
      wasteFactor,
      mortarRatio: '4:1 (sand:cement)'
    })
  }

  return (
    <div className="bg-white rounded-lg p-6 sm:p-8">
      <div className="bg-red-600 text-white rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-1">
          <Info className="w-5 h-5" />
          <h2 className="text-lg font-bold">Bricklaying Materials Calculator</h2>
        </div>
        <p className="text-sm opacity-90">Calculate cement, sand and mortar using standard 4:1 ratio</p>
      </div>

      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">1. Material Type</label>
        <select value={materialType} onChange={e => setMaterialType(e.target.value as 'brick' | 'block140' | 'block100')} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 mb-2">
          <option value="brick">Standard UK Bricks (215×102.5×65mm) - 60/m²</option>
          <option value="block140">140mm Concrete Blocks (440×215×140mm) - 10.76/m²</option>
          <option value="block100">100mm Concrete Blocks (440×215×100mm) - 10.76/m²</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-bold text-gray-800 mb-2">2. Wall Length (metres)</label>
          <input type="number" step="0.1" value={length} onChange={e => setLength(e.target.value)} placeholder="e.g. 10" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 mb-2" />
          <div className="flex gap-2 flex-wrap">
            {['5', '10', '15', '20'].map(len => (
              <button key={len} onClick={() => setLength(len)} className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold text-sm hover:bg-red-200">{len}m</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-bold text-gray-800 mb-2">3. Wall Height (metres)</label>
          <input type="number" step="0.1" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 2.5" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 mb-2" />
          <div className="flex gap-2 flex-wrap">
            {['1.8', '2.4', '2.7', '3.0'].map(hgt => (
              <button key={hgt} onClick={() => setHeight(hgt)} className="px-3 py-1 bg-red-100 text-red-700 rounded font-semibold text-sm hover:bg-red-200">{hgt}m</button>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-bold text-gray-800 mb-2">4. Waste Factor: {wasteFactor}%</label>
        <input type="range" min="0" max="20" value={wasteFactor} onChange={e => setWasteFactor(Number(e.target.value))} className="w-full" />
        <p className="text-xs text-gray-500 mt-1">Typical: 10% standard, 5% simple work, 15-20% complex patterns</p>
      </div>

      <button onClick={calculate} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-lg transition">🧱 Calculate Materials</button>

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
                  <p className="font-semibold">Mortar Ratio</p>
                  <p className="font-bold">{results.mortarRatio}</p>
                </div>
                <div className="flex justify-between mb-3">
                  <p className="font-semibold">{results.unitName.charAt(0).toUpperCase() + results.unitName.slice(1)} Cost</p>
                  <p className="font-bold text-lg">£{results.unitCost}</p>
                </div>
                <div className="flex justify-between mb-3 p-2 rounded bg-gray-50">
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
            <button onClick={() => setShowQuoteGenerator(true)} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-bold transition">Generate Free Quote</button>
          </div>
        </>
      )}

      {showQuoteGenerator && results && (
        <QuoteGenerator
          calculationResults={{
            materials: [
              { item: results.materialName, quantity: results.itemsWithWaste, unit: `units @ £${results.unitCost}` },
              { item: 'Building Sand', quantity: results.sandTonnes, unit: `tonnes @ £${results.sandCost}` },
              { item: 'Cement (25kg bags)', quantity: results.cementBags.toString(), unit: `bags @ £${results.cementCost}` }
            ],
            summary: `${results.length}m × ${results.height}m wall - ${results.itemsWithWaste} ${results.unitName} + ${results.sandTonnes}t sand + ${results.cementBags} cement bags (4:1 mortar) with ${results.wasteFactor}% waste - Total Materials: £${results.totalMaterialCost}`
          }}
          onClose={() => setShowQuoteGenerator(false)}
        />
      )}
    </div>
  )
}

// ============================================
// FAQ DATA
// ============================================
const faqs = [
  { q: 'How many bricks do I need per square metre?', a: 'For standard UK bricks (215mm × 102.5mm × 65mm) with 10mm mortar joints, you need 60 bricks per m² for a half-brick wall. Double this to 120/m² for a one-brick thick wall.' },
  { q: 'What is the standard mortar mix ratio?', a: 'The standard is 4:1 (4 parts sand to 1 part cement). Use 3:1 for structural work or below DPC. Always add plasticiser for workability.' },
  { q: 'How much sand and cement per 1000 bricks?', a: 'For 1000 standard bricks: 0.67 tonnes sand and 5.5 bags of cement (25kg bags). This covers approximately 16.7m² of wall.' },
  { q: 'What wastage factor should I use?', a: '5% for simple walls, 10% standard, 15-20% for complex patterns or cavity walls with many cuts around openings.' },
  { q: 'How many concrete blocks per square metre?', a: 'Standard concrete blocks (440mm × 215mm) need 10.76 blocks per m² with 10mm joints. Same for both 100mm and 140mm thickness.' },
  { q: 'How do I calculate bricks for walls with openings?', a: 'Calculate gross wall area, subtract window/door areas, then multiply net area by 60 bricks/m². Add extra for reveals and lintels.' },
  { q: 'What\'s the difference between facing and engineering bricks?', a: 'Facing bricks are for appearance. Engineering bricks (Class A or B) are stronger and more water-resistant for foundations and DPC.' },
  { q: 'How much does a pallet of bricks weigh?', a: 'Approximately 500 bricks per pallet, weighing 1.5-2 tonnes. Individual bricks weigh 2.5-3.5kg each.' },
  { q: 'Can I lay bricks in cold weather?', a: 'Avoid bricklaying below 3°C or if frost is expected within 24 hours. Frost damages fresh mortar and weakens the bond.' },
  { q: 'How long does mortar take to cure?', a: 'Initial set in 2-4 hours, full strength over 28 days. Keep brickwork damp for 3-7 days in hot weather to prevent cracking.' }
]

// ============================================
// MAIN COMPONENT
// ============================================
export default function BrickBlockCalculator(props: BrickCalculatorUsecaseProps = {}) {
  const { metaTitle, metaDescription, h1, description, defaults, tips, embedded = false, slug } = props
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const seoTitle = metaTitle || 'Brick & Block Calculator UK 2025 | Free Bricklaying Materials Calculator | TradeCalcs'
  const seoDescription = metaDescription || 'Free brick and block calculator for UK bricklayers. Calculate exact quantities of bricks, blocks, cement, sand and mortar instantly. Professional tool with waste factors and quote generator. Used by 50,000+ UK tradespeople.'
  const pageH1 = h1 || 'Brick & Block Calculator UK'
  const pageDescription = description || 'Calculate exact mortar, cement & sand needed instantly'
  const canonicalUrl = slug ? `https://tradecalcs.co.uk/calculators/brick-calculator/${slug}` : 'https://tradecalcs.co.uk/brick-block-calculator'

  if (embedded) {
    return <BrickCalculatorCore defaultMaterialType={defaults?.materialType} defaultLength={defaults?.length} defaultHeight={defaults?.height} defaultWasteFactor={defaults?.wasteFactor} />
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tradecalcs.co.uk' },
        { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://tradecalcs.co.uk/calculators' },
        { '@type': 'ListItem', position: 3, name: 'Brick Calculator', item: canonicalUrl }
      ]},
      { '@type': 'SoftwareApplication', name: pageH1, description: seoDescription, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', url: canonicalUrl, offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' }, aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '1203', bestRating: '5', worstRating: '1' }},
      { '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a }}))},
      { '@type': 'Organization', name: 'TradeCalcs', url: 'https://tradecalcs.co.uk', description: 'Free professional calculators for UK construction trades' }
    ]
  }

  return (
    <>
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="brick calculator, block calculator, bricklaying calculator, mortar calculator, cement calculator, UK bricklayer tools, how many bricks per m2, sand and cement calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#dc2626" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TradeCalcs" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-calculator-og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <a href="/" className="text-purple-600 hover:text-purple-800 font-semibold text-sm">← Back to All Calculators</a>
        </div>

        <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Info className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">{pageH1}</h1>
            <p className="text-lg opacity-95">{pageDescription}</p>
            <p className="text-sm mt-3 opacity-80">Used by 50,000+ UK tradespeople • Updated January 2025</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg mb-8">
            <BrickCalculatorCore defaultMaterialType={defaults?.materialType} defaultLength={defaults?.length} defaultHeight={defaults?.height} defaultWasteFactor={defaults?.wasteFactor} />
          </div>

          {tips && tips.length > 0 && (
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-amber-900 mb-3">Tips for This Project Type</h3>
                  <ul className="space-y-2 text-sm text-amber-800">
                    {tips.map((tip, i) => <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" /><span>{tip}</span></li>)}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Calculate Bricks for Your Specific Project</h2>
            <p className="text-gray-600 mb-6">Select your project type for tailored calculations, tips, and guidance:</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <a href="/calculators/brick-calculator/garden-wall" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">Garden Walls</h3>
                <p className="text-sm text-green-700">Decorative walls, low boundary walls up to 2m</p>
              </a>
              <a href="/calculators/brick-calculator/house-extension" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">House Extensions</h3>
                <p className="text-sm text-blue-700">Cavity wall calculations for extensions</p>
              </a>
              <a href="/calculators/brick-calculator/boundary-wall" className="block p-4 bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-orange-900 mb-1">Boundary Walls</h3>
                <p className="text-sm text-orange-700">Property boundaries with pier calculations</p>
              </a>
              <a href="/calculators/brick-calculator/retaining-wall" className="block p-4 bg-gradient-to-br from-stone-50 to-gray-50 border border-stone-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-stone-900 mb-1">Retaining Walls</h3>
                <p className="text-sm text-stone-700">Structural walls with drainage guidance</p>
              </a>
              <a href="/calculators/brick-calculator/garage" className="block p-4 bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-900 mb-1">Garages</h3>
                <p className="text-sm text-slate-700">Single & double garage cavity walls</p>
              </a>
              <a href="/calculators/brick-calculator/raised-bed" className="block p-4 bg-gradient-to-br from-lime-50 to-green-50 border border-lime-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lime-900 mb-1">Raised Beds</h3>
                <p className="text-sm text-lime-700">Garden planters and vegetable beds</p>
              </a>
              <a href="/calculators/brick-calculator/bbq-outdoor-kitchen" className="block p-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-red-900 mb-1">BBQ & Outdoor Kitchen</h3>
                <p className="text-sm text-red-700">Built-in BBQs and pizza ovens</p>
              </a>
              <a href="/calculators/brick-calculator/chimney" className="block p-4 bg-gradient-to-br from-gray-50 to-slate-50 border border-gray-300 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-gray-900 mb-1">Chimneys</h3>
                <p className="text-sm text-gray-700">Chimney stacks and repairs</p>
              </a>
              <a href="/calculators/brick-calculator/pier-pillar" className="block p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-amber-900 mb-1">Piers & Pillars</h3>
                <p className="text-sm text-amber-700">Gate piers and entrance pillars</p>
              </a>
              <a href="/calculators/brick-calculator/single-skin" className="block p-4 bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Single Skin Walls</h3>
                <p className="text-sm text-cyan-700">Half-brick walls and partitions</p>
              </a>
              <a href="/calculators/brick-calculator/cavity-wall" className="block p-4 bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-indigo-900 mb-1">Cavity Walls</h3>
                <p className="text-sm text-indigo-700">Full cavity wall construction guide</p>
              </a>
              <a href="/calculators/brick-calculator/decorative-feature" className="block p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-purple-900 mb-1">Decorative Features</h3>
                <p className="text-sm text-purple-700">Arches, patterns, and feature walls</p>
              </a>
            </div>
          </div>

          <div className="bg-red-50 border-l-4 border-red-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h2 className="font-bold text-red-900 mb-3">🧱 Standard Bricklaying Specifications (UK)</h2>
                <ul className="space-y-2 text-sm text-red-900">
                  <li>• <strong>Standard Bricks (60/m²):</strong> 215mm × 102.5mm × 65mm - £0.65/brick avg</li>
                  <li>• <strong>140mm Blocks (10.76/m²):</strong> 440mm × 215mm × 140mm - £1.90/block avg</li>
                  <li>• <strong>100mm Blocks (10.76/m²):</strong> 440mm × 215mm × 100mm - £1.50/block avg</li>
                  <li>• <strong>Mortar ratio:</strong> 4:1 (sand:cement) general, 3:1 structural/below DPC</li>
                  <li>• <strong>Waste factors:</strong> 5% simple, 10% standard, 15-20% complex</li>
                  <li>• <strong>Mortar costs:</strong> Cement £6.50/bag, Sand £45/tonne (Q4 2025)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Reference Tables</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Bricks Per Linear Metre (by height)</h3>
                <div className="space-y-2 text-sm">
                  {[['0.6m wall', '36 bricks'], ['1.0m wall', '60 bricks'], ['1.2m wall', '72 bricks'], ['1.8m wall', '108 bricks'], ['2.4m wall', '144 bricks']].map(([label, value]) => (
                    <div key={label} className="flex justify-between p-2 bg-gray-50 rounded"><span>{label}</span><span className="font-bold">{value}</span></div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Sand & Cement Per 1000 Bricks</h3>
                <div className="space-y-2 text-sm">
                  {[['Building Sand', '0.67 tonnes'], ['Cement (25kg bags)', '5.5 bags'], ['Plasticiser', '2-3 litres'], ['Wall Area Covered', '16.7 m²']].map(([label, value]) => (
                    <div key={label} className="flex justify-between p-2 bg-gray-50 rounded"><span>{label}</span><span className="font-bold">{value}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">How to Calculate Bricks for Any Project</h2>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p className="mb-4">Accurate brick calculation prevents costly delays from under-ordering or wasted money from over-ordering.</p>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">The Basic Formula</h3>
              <p className="mb-4"><strong>Wall Area (m²) × 60 = Number of Bricks</strong>. Then add your waste factor (typically 10%).</p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                <h4 className="font-semibold text-blue-900 mb-2">Example Calculation</h4>
                <p className="text-blue-800 text-sm">Wall: 10m × 2.4m = 24m² → 24 × 60 = 1,440 bricks → +10% waste = <strong>1,584 bricks</strong><br/>Sand: 24 × 40kg = 960kg (≈ 1 tonne) | Cement: 24 × 8kg = 192kg (<strong>8 bags</strong>)</p>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Choosing the Right Waste Factor</h3>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li><strong>5%:</strong> Simple rectangular walls, experienced bricklayer</li>
                <li><strong>10%:</strong> Standard projects with corners and openings</li>
                <li><strong>15%:</strong> Complex shapes, decorative patterns</li>
                <li><strong>20%:</strong> Intricate designs, cavity walls, inexperienced bricklayer</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                    {expandedFaq === index ? <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" /> : <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />}
                  </button>
                  {expandedFaq === index && <div className="px-4 pb-4 text-gray-600 text-sm">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-600 text-white rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Complete Your Trade Calculations</h2>
            <p className="mb-6">Use our comprehensive suite of professional estimators</p>
            <a href="/" className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">View All Calculators</a>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Need a Custom Solution for Your Business?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Whether you're a contractor needing bulk calculations, a merchant wanting to embed our tools, or a business with specific requirements - we'd love to hear from you.</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <iframe src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false" width="100%" height="750px" frameBorder="0" title="Contact Form" className="rounded-lg" />
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">Or email us directly at <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 hover:text-purple-700 font-medium">mick@tradecalcs.co.uk</a></p>
          </div>
        </div>
      </div>
    </>
  )
}








                    



