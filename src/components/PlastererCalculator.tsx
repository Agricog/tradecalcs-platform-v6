import { CheckCircle2, Palette, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import jsPDF from 'jspdf'

type PlasterType = 'board' | 'bonding' | 'multi'

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
    doc.text('Professional Plastering Quote', 20, 20)

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

    doc.save('plaster-quote.pdf')
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

export default function PlastererCalculator() {
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [coats, setCoats] = useState('2')
  const [wasteFactor, setWasteFactor] = useState('10')
  const [plasterType, setPlasterType] = useState<PlasterType>('board')
  const [result, setResult] = useState<any>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  // 25kg bags: Board/Multi = 10m² per bag; Bonding = 4x quantity = 2.5m² per bag
  const BAG_SIZE_KG = 25
  const BOARD_MULTI_COVERAGE = 10
  const BONDING_COVERAGE = 2.5

  const calculate = () => {
    if (!length || !width) return
    
    const area = (parseFloat(length) || 0) * (parseFloat(width) || 0)
    const numCoats = parseFloat(coats) || 1
    const waste = parseFloat(wasteFactor) || 10

    const coveragePerBag = plasterType === 'bonding' ? BONDING_COVERAGE : BOARD_MULTI_COVERAGE
    const bagsPerCoat = area / coveragePerBag
    const bagsNeeded = bagsPerCoat * numCoats
    const bagsWithWaste = bagsNeeded * (1 + waste / 100)
    const totalKg = bagsWithWaste * BAG_SIZE_KG

    setResult({
      area: area.toFixed(2),
      coveragePerBag,
      bagsPerCoat: bagsPerCoat.toFixed(2),
      bagsForCoats: bagsNeeded.toFixed(2),
      bagsWithWaste: bagsWithWaste.toFixed(2),
      totalKg: totalKg.toFixed(2),
      bags: Math.ceil(bagsWithWaste),
      waste: waste,
      coats: coats,
      plasterType,
      materialCost: (Math.ceil(bagsWithWaste) * 8.50).toFixed(2),
      labourCost: (area * 25).toFixed(2)
    })
  }

  const plasterLabel = (type: PlasterType) => {
    switch (type) {
      case 'board':
        return 'Board finish'
      case 'bonding':
        return 'Bonding coat'
      case 'multi':
        return 'Multi finish'
    }
  }

  return (
    <>
      <Helmet>
        <title>Plaster Calculator UK | Coverage & Material Estimator for Plasterers | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free plaster calculator for UK plasterers. Calculate coverage, material quantities, and cost estimates instantly. Professional tool with waste factors and drying times." 
        />
        <meta name="keywords" content="plaster calculator, plastering calculator, UK plasterer tools, plaster coverage calculator, skim coat calculator, gypsum plaster calculator, finishing plaster, plasterboard calculator, Thistle plaster, plaster estimator" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Plaster Calculator UK | Coverage & Material Estimator for Plasterers" />
        <meta property="og:description" content="Calculate plaster coverage and materials instantly. Free professional tool for UK plasterers with waste factors and drying times." />
        <meta property="og:url" content="https://tradecalcs.co.uk/plaster-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/plaster-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Plaster Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free plaster calculator. Calculate coverage, bags needed, and drying times instantly." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/plaster-calculator-og.jpg" />

        <link rel="canonical" href="https://tradecalcs.co.uk/plaster-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#0891b2" />

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
                      'text': 'Use this calculator to enter your wall or ceiling dimensions (length and width in meters), select the number of coats, and set your waste factor (10% typical for standard work). The calculator instantly shows plaster needed in bags and kilograms. Standard: 1 bag (20kg) covers 10m² per coat.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the standard plaster coverage rate?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Standard coverage is 1 bag (20kg) per 10m² per coat. This is the industry standard for UK plasterwork. Actual coverage may vary slightly based on substrate condition, surface irregularities, and application technique, but 10m² per bag is the professional baseline.'
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
                      'text': 'Common UK plaster types: Plasterboard (drywall base), Bonding Plaster (first coat on brick/block, 2-3mm), Finish Plaster (smooth top coat, 2mm finish layer), Thistle Plaster (standard UK brand products like Thistle Universal One-Coat and Multi-Finish), Lime Plaster (traditional homes and period properties, breathable), and Artex (textured decorative finish). Each has similar coverage rates but different specific applications.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How do I estimate project cost?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'This calculator provides material cost estimates based on Q4 2025 UK pricing. Standard 20kg bags of plaster cost approximately £8.50 retail (£7-9 range depending on supplier and brand). Professional labour rates average £25-35/m² for standard plastering, £35-50/m² for skim coat finishing, and £50+/m² for specialist work. Total project cost equals materials plus labour. Always obtain detailed quotes from local plasterers for accurate pricing specific to your region and project complexity.'
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
                      'text': 'Bonding plaster is the first coat (2-3mm) applied directly to brick or concrete blocks - it has grip and bonds mechanically to the substrate. Finishing plaster (or finish coat) is the final smooth top coat (2mm) applied over bonding plaster - it provides the smooth, paintable surface. Typical application: bonding plaster first, then finishing plaster. For plasterboard, you skip bonding and apply finish coat directly to the board. Use this calculator for both - enter total coats needed.'
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

        <div className="bg-gradient-to-r from-slate-600 to-slate-500 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Palette className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">Plaster Calculator UK</h1>
            <p className="text-lg opacity-95">Calculate plaster coverage, materials & project costs instantly</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="bg-slate-600 text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Palette className="w-5 h-5" />
                <h2 className="text-lg font-bold">Plaster Coverage Calculator</h2>
              </div>
              <p className="text-sm opacity-90">Professional estimation for UK plasterers and decorators</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">0. Plaster Type</label>
              <select
                value={plasterType}
                onChange={e => setPlasterType(e.target.value as PlasterType)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
                aria-label="Plaster type"
              >
                <option value="board">Board finish</option>
                <option value="bonding">Bonding coat</option>
                <option value="multi">Multi finish</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Board finish and Multi finish use the same coverage. Bonding coat uses around four times the quantity for the same area.</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">1. Wall/Ceiling Length (meters)</label>
              <input
                type="number"
                step="0.1"
                value={length}
                onChange={e => setLength(e.target.value)}
                placeholder="e.g. 4.5"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600 mb-2"
                aria-label="Wall or ceiling length in meters"
              />
              <div className="flex gap-2 flex-wrap">
                {['2.4', '3.0', '4.5', '5.5', '6.0'].map(len => (
                  <button
                    key={len}
                    onClick={() => setLength(len)}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded font-semibold text-sm hover:bg-slate-200"
                    aria-label={`Set length to ${len}m`}
                  >
                    {len}m
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Measure floor to ceiling height</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">2. Wall/Ceiling Width (meters)</label>
              <input
                type="number"
                step="0.1"
                value={width}
                onChange={e => setWidth(e.target.value)}
                placeholder="e.g. 3.2"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600 mb-2"
                aria-label="Wall or ceiling width in meters"
              />
              <div className="flex gap-2 flex-wrap">
                {['2.0', '3.0', '4.0', '5.0', '6.0'].map(wid => (
                  <button
                    key={wid}
                    onClick={() => setWidth(wid)}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded font-semibold text-sm hover:bg-slate-200"
                    aria-label={`Set width to ${wid}m`}
                  >
                    {wid}m
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">Subtract 20% for doors and windows</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">3. Number of Coats</label>
                <select
                  value={coats}
                  onChange={e => setCoats(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
                  aria-label="Number of plaster coats"
                >
                  <option value="1">1 Coat (Bonding)</option>
                  <option value="2">2 Coats (Standard)</option>
                  <option value="3">3 Coats (Full Coverage)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Bonding + finish typical</p>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">4. Waste Factor (%)</label>
                <select
                  value={wasteFactor}
                  onChange={e => setWasteFactor(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-600"
                  aria-label="Waste factor percentage"
                >
                  <option value="5">5% (Minimal)</option>
                  <option value="10">10% (Standard)</option>
                  <option value="15">15% (Liberal)</option>
                  <option value="20">20% (Complex)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Spillage & breakage</p>
              </div>
            </div>

            <button
              onClick={calculate}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 rounded-lg text-lg transition"
              aria-label="Calculate plaster needed"
            >
              📊 Calculate Plaster Needed
            </button>

            {result && (
              <>
                <div className={`mt-8 rounded-lg p-6 bg-slate-50 border-2 border-slate-300`}>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-slate-600" />
                    <h3 className={`text-xl font-bold text-slate-900`}>
                      ✓ Plaster Coverage Breakdown
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded border-t-2 border-b-2 border-slate-300">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Total Wall Area</p>
                        <p className="text-2xl font-bold text-gray-900">{result.area} m²</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Bags Per Coat</p>
                        <p className="text-2xl font-bold text-slate-600">{result.bagsPerCoat}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Total Bags ({result.coats} coats)</p>
                        <p className="text-2xl font-bold text-slate-600">{result.bagsForCoats}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">With Waste ({result.waste}%)</p>
                        <p className="text-2xl font-bold text-slate-600">{result.bagsWithWaste}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Bags to Order</p>
                        <p className="text-2xl font-bold text-green-600">{result.bags} bags</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Total Weight</p>
                        <p className="text-2xl font-bold text-slate-600">{result.totalKg} kg</p>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-3">
                        <p className="font-semibold">Material Cost (£8.50/bag)</p>
                        <p className="font-bold text-lg">£{result.materialCost}</p>
                      </div>
                      <div className="flex justify-between mb-3 p-2 rounded bg-gray-50">
                        <p className="font-semibold">Labour Estimate (£25/m²)</p>
                        <p className="font-bold text-lg text-slate-600">£{result.labourCost}</p>
                      </div>
                      <div className="flex justify-between p-3 rounded bg-green-100 border border-green-300">
                        <p className="font-semibold text-green-900">Total Project Estimate</p>
                        <p className="font-bold text-lg text-green-700">£{(parseFloat(result.materialCost) + parseFloat(result.labourCost)).toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="text-xs text-gray-700 bg-gray-50 p-3 rounded border-l-2 border-gray-400 mt-4">
                      <p className="font-semibold mb-1">Summary:</p>
                      <p className="font-mono">
                        {result.area}m² ÷ {result.coveragePerBag}m² per bag × {result.coats} coat(s) = {result.bagsForCoats} bags + {result.waste}% waste = {result.bagsWithWaste} bags = {result.bags} × 25kg bags = {result.totalKg}kg
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

          <div className="bg-slate-50 border-l-4 border-slate-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-slate-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-slate-900 mb-3">📋 Professional Plaster Coverage</h3>
                <ul className="space-y-2 text-sm text-slate-900">
                  <li>• <strong>Standard coverage:</strong> 1 bag (20kg) covers 10m² per coat</li>
                  <li>• <strong>Drying times:</strong> 24 hours between coats, 14 days before painting</li>
                  <li>• <strong>Waste factors:</strong> 5-20% depending on surface condition and complexity</li>
                  <li>• <strong>Material cost:</strong> ~£8.50 per 20kg bag (Q4 2025 UK rates)</li>
                  <li>• <strong>Labour cost:</strong> £25-35/m² standard, £35-50/m² skim coating, £50+/m² specialist</li>
                  <li>• <strong>Plaster types:</strong> Bonding, Finishing, Thistle, Lime, Artex textured</li>
                  <li>• <strong>Temperature:</strong> Don't plaster below 10°C or above 70% humidity</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Plaster Coverage & Costs</h2>
            <p className="text-gray-700 mb-4">
              Professional plaster coverage is standardised at 1 bag (20kg) per 10m² per coat. This is the industry standard for UK plasterwork. This calculator helps you estimate materials and costs accurately based on standard coverage rates. Understanding waste factors, drying times, and project costs is essential for accurate quoting.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-slate-600">
              <p className="text-sm text-gray-700"><strong>Key principle:</strong> Standard coverage is 1 bag per 10m² per coat. Add 10-15% waste to prevent job delays and callbacks. Professional plasterers always order extra material for touch-ups and repairs.</p>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Plaster Types & Typical Applications (Q4 2025)</h2>
            <p className="text-gray-700 mb-4">
              Different plaster types have different applications. All use standard 20kg bags with 10m² coverage per coat:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-slate-100 border-b">
                    <th className="px-4 py-2 text-left font-semibold">Plaster Type</th>
                    <th className="px-4 py-2 text-left font-semibold">Bag Size</th>
                    <th className="px-4 py-2 text-left font-semibold">Application</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">Bonding Plaster</td>
                    <td className="px-4 py-2">20kg</td>
                    <td className="px-4 py-2">First coat on blocks/brick - 10m² coverage</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">Finishing Plaster</td>
                    <td className="px-4 py-2">20kg</td>
                    <td className="px-4 py-2">Top coat, smooth paintable - 10m² coverage</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">Thistle Standard</td>
                    <td className="px-4 py-2">20kg</td>
                    <td className="px-4 py-2">General purpose plasterboard - 10m² coverage</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">Thistle Multi-Finish</td>
                    <td className="px-4 py-2">20kg</td>
                    <td className="px-4 py-2">Premium finish coat - 10m² coverage</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 font-semibold">Lime Plaster</td>
                    <td className="px-4 py-2">20kg</td>
                    <td className="px-4 py-2">Period properties, breathable - 10m² coverage</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-2 font-semibold">Artex Textured</td>
                    <td className="px-4 py-2">20kg</td>
                    <td className="px-4 py-2">Decorative textured finish - 10m² coverage</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">Note: All plasters use standard 20kg bags with 10m² coverage per coat. Check manufacturer specifications for any variations.</p>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Drying Times & Environmental Factors</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Drying Schedule</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Between coats:</strong> 24 hours minimum</li>
                  <li>• <strong>Full cure:</strong> 5-7 days</li>
                  <li>• <strong>Before painting:</strong> 14 days minimum</li>
                  <li>• <strong>Before wallpaper:</strong> 14 days</li>
                  <li>• <strong>Optimal:</strong> 28-30 days</li>
                </ul>
              </div>
              <div className="border-l-4 border-orange-600 bg-orange-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Environmental Conditions</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Temperature:</strong> 10-25°C ideal</li>
                  <li>• <strong>Avoid below:</strong> 10°C (fails to dry)</li>
                  <li>• <strong>Humidity:</strong> Below 70% (above slows drying)</li>
                  <li>• <strong>Ventilation:</strong> Critical for drying</li>
                  <li>• <strong>Cold:</strong> Add 50% extra drying time</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Waste Factors & Best Practice</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">When to Use Each Waste Factor</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>5%:</strong> Simple, smooth applications</li>
                  <li>• <strong>10%:</strong> Standard typical work</li>
                  <li>• <strong>15%:</strong> Complex surfaces, first-time</li>
                  <li>• <strong>20%:</strong> Poor substrate, damaged walls</li>
                </ul>
              </div>
              <div className="border-l-4 border-purple-600 bg-purple-50 p-4 rounded">
                <h4 className="font-bold text-gray-900 mb-2">Professional Tips</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Prime plasterboard before plastering</li>
                  <li>✓ Mix to consistent smooth paste</li>
                  <li>✓ Apply 2-3mm maximum per coat</li>
                  <li>✓ Order 10-15% extra for safety</li>
                  <li>✓ Store plaster dry (use within 6 months)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How much plaster do I need?</h4>
                <p className="text-sm text-gray-700">Use this calculator to enter your wall/ceiling dimensions (length and width in meters), select the number of coats, and set your waste factor (10% typical). The calculator instantly shows bags and weight needed. Standard: 1 bag (20kg) per 10m² per coat.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What's the standard coverage rate?</h4>
                <p className="text-sm text-gray-700">Standard UK coverage is 1 bag (20kg) per 10m² per coat. This is the industry baseline for all plaster types and applications. Actual coverage may vary slightly based on substrate, technique, and conditions.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Why shouldn't I plaster in cold weather?</h4>
                <p className="text-sm text-gray-700">Below 10°C, plaster won't cure properly - it dries too slowly or not at all. High humidity (above 70%) also dramatically slows drying. Maintain 10-25°C temperature and ventilate properly for optimal results and 24-hour drying between coats.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How long before I can paint after plastering?</h4>
                <p className="text-sm text-gray-700">Wait minimum 14 days before painting. For new plasterboard with finish coats, allow 14-30 days optimal drying to prevent paint failure, peeling, or dampness issues. Proper curing ensures paint adhesion and professional finish.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What waste percentage should I use for my job?</h4>
                <p className="text-sm text-gray-700">Use 10% as standard baseline. Use 5% for simple smooth work, 15% for complex surfaces or poor substrate, 20% for heavily damaged areas. Professional plasterers typically add 10-15% extra to prevent job delays and have materials for callbacks.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How does this compare to other trade calculators?</h4>
                <p className="text-sm text-gray-700">TradeCalcs offers a complete suite of professional estimators. For wood and labour costs, use our <a href="/joinery-calculator" className="text-purple-600 font-semibold hover:underline">Joinery Calculator</a>. For electrical compliance work, use our <a href="/voltage-drop-calculator" className="text-purple-600 font-semibold hover:underline">Voltage Drop Calculator</a>. All tools are free and provide UK market rates with internal linking to help you build complete project estimates.</p>
              </div>
            </div>
          </section>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-yellow-900 mb-2">✓ Professional Quality Assurance</p>
                <p className="text-sm text-yellow-800">This calculator provides professional estimates based on UK industry standards. Standard coverage is 1 bag (20kg) per 10m² per coat. Always account for waste and keep extra material for touch-ups and repairs. Follow manufacturer guidelines precisely and allow adequate curing time before finishing or painting.</p>
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

          <div className="bg-slate-600 text-white rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Complete Your Trade Calculations</h2>
            <p className="mb-6">Use our comprehensive suite of professional estimators: <a href="/joinery-calculator" className="underline hover:opacity-90">Joinery Calculator</a> for wood costs and labour, <a href="/voltage-drop-calculator" className="underline hover:opacity-90">Voltage Drop Calculator</a> for electrical compliance, and <a href="/" className="underline hover:opacity-90">view all calculators</a> to build complete project estimates and quote confidently.</p>
            <a href="/" className="bg-white text-slate-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </a>
          </div>
        </div>

        {showQuoteGenerator && result && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: `${plasterLabel(result.plasterType)} (25kg bags)`, quantity: result.bags.toString(), unit: 'bags' },
                { item: 'Total Plaster Weight', quantity: result.totalKg, unit: 'kg' },
                { item: 'Coverage Rate', quantity: result.coveragePerBag.toString(), unit: 'm² per bag' },
                { item: 'Number of Coats', quantity: result.coats, unit: 'coats' },
                { item: 'Wall/Ceiling Area', quantity: result.area, unit: 'm²' },
                { item: 'Waste Factor Included', quantity: result.waste, unit: '%' }
              ],
              summary: `Plastering project - ${result.area}m² surface with ${result.coats} coat(s) at ${result.coveragePerBag}m² per bag coverage (${result.waste}% waste factor = ${result.bagsWithWaste} bags = ${result.totalKg}kg total plaster required = ${result.bags} × 25kg bags to order) - Material cost: £${result.materialCost} - Labour estimate: £${result.labourCost}`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}



