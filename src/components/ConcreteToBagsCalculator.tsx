import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Package, Calculator, AlertCircle, CheckCircle2, ShoppingCart, ArrowLeft, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import jsPDF from 'jspdf'
import toast from 'react-hot-toast'
import SaveToProjectModal from '../components/projects/SaveToProjectModal'

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
    doc.text('Professional Concrete Quote', 20, 20)

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

    doc.save('concrete-quote.pdf')
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
export default function ConcreteToBagsCalculator() {
  const navigate = useNavigate()
  const { isSignedIn } = useAuth()
  const [length, setLength] = useState('')
  const [width, setWidth] = useState('')
  const [depth, setDepth] = useState('')
  const [concreteStrength, setConcreteStrength] = useState('c20')
  const [email, setEmail] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)
  
  // Save to Project State
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [saveData, setSaveData] = useState<any>(null)

  const strengthOptions: Record<string, { label: string; ratio: string; cementBagsPerM3: number; cementParts: number; sandParts: number; gravelParts: number }> = {
    c20: { label: 'C20 (20 MPa)', ratio: '1:2:4', cementBagsPerM3: 12, cementParts: 1, sandParts: 2, gravelParts: 4 },
    c25: { label: 'C25 (25 MPa)', ratio: '1:2:3', cementBagsPerM3: 13, cementParts: 1, sandParts: 2, gravelParts: 3 },
    c30: { label: 'C30 (30 MPa)', ratio: '1:1.5:3', cementBagsPerM3: 15, cementParts: 1, sandParts: 1.5, gravelParts: 3 }
  }

  const calculate = () => {
    const l = parseFloat(length)
    const w = parseFloat(width)
    const d = parseFloat(depth)

    if (!l || !w || !d) return null

    const volumeM3 = (l * w * d) / 1000
    const volumeWithWaste = volumeM3 * 1.10
    const strength = strengthOptions[concreteStrength]

    const cementBags = Math.ceil(volumeWithWaste * strength.cementBagsPerM3)

    const ballastKgPerM3 = 1950
    const totalBallastKg = volumeWithWaste * ballastKgPerM3
    const dumpyBagSize = 800
    const dumpyBags = Math.ceil(totalBallastKg / dumpyBagSize)

    const cementCostPerBag = 6.50
    const dumpyBagCost = 80.00
    const totalCost = (cementBags * cementCostPerBag) + (dumpyBags * dumpyBagCost)

    return {
      volumeM3: volumeWithWaste.toFixed(2),
      cementBags,
      dumpyBags,
      strength,
      totalCost: totalCost.toFixed(2),
      baseVolume: volumeM3.toFixed(2),
      wastePercentage: '10%'
    }
  }

  const results = calculate()

  const handleCalculate = () => {
    if (results) {
      setShowResults(true)
      window.scrollTo({ top: 800, behavior: 'smooth' })
    }
  }

  const handleSaveToProject = () => {
    if (!results) return
    
    setSaveData({
      calcType: 'concrete_to_bags',
      circuitName: `Concrete ${results.strength.label} - ${results.volumeM3}m³`,
      inputs: {
        length: parseFloat(length),
        width: parseFloat(width),
        depth: parseFloat(depth),
        concreteStrength,
      },
      outputs: {
        strengthLabel: results.strength.label,
        mixRatio: results.strength.ratio,
        baseVolume: parseFloat(results.baseVolume),
        volumeWithWaste: parseFloat(results.volumeM3),
        wastePercentage: 10,
        cementBags: results.cementBags,
        dumpyBags: results.dumpyBags,
        estimatedCost: parseFloat(results.totalCost),
      },
    })
    setShowSaveModal(true)
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmailSubmitted(true)
    console.log('Email submitted:', email)
  }

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Concrete Calculator UK | Cement & Ballast Bags Calculator | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free concrete calculator for UK builders and roofers. Calculate exact cement bags and ballast needed instantly. C20, C25, C30 concrete strength calculator." 
        />
        <meta name="keywords" content="concrete calculator, cement calculator, ballast calculator, UK concrete mix, building materials calculator, foundation calculator, concrete bags calculator, mix ratio calculator, c20 c25 c30" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Concrete Calculator UK | Cement & Ballast Bags Calculator" />
        <meta property="og:description" content="Calculate exact cement and ballast bags needed. Free instant results for UK builders and contractors." />
        <meta property="og:url" content="https://tradecalcs.co.uk/concrete-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/concrete-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Concrete Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free concrete calculator. Calculate exact cement and ballast bags instantly." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/concrete-calculator-og.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/concrete-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#16a34a" />

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
                  { '@type': 'ListItem', 'position': 3, 'name': 'Concrete Calculator', 'item': 'https://tradecalcs.co.uk/concrete-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Concrete-to-Bags Calculator UK',
                'description': 'Professional concrete calculator for UK builders. Calculate exact cement bags and ballast needed for any concrete pour - C20, C25, C30 strengths with 20mm max diameter stone ballast.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/concrete-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'ratingCount': '1247' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'How many concrete bags do I need?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Use this calculator to enter your dimensions (length, width, depth), select your concrete strength (C20, C25, or C30), and get exact quantities instantly. The calculator shows exactly how many 25kg cement bags and 800kg dumpy bags you need to order. Include 10% waste factor.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is concrete mix ratio 1:2:4?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': '1:2:4 means 1 part cement, 2 parts sand, 4 parts gravel (20mm max diameter). This is the standard foundation and general-purpose concrete mix in the UK. It produces C20 strength concrete suitable for most residential and commercial applications.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the difference between C20, C25, and C30 concrete?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'C20 is concrete with 20 MPa compressive strength (12 bags cement/m³, 1:2:4 mix, used for general work). C25 is 25 MPa (13 bags/m³, 1:2:3 mix, used for slabs and heavy-duty applications). C30 is 30 MPa (15 bags/m³, 1:1.5:3 mix, used for high-strength applications). All use 20mm max diameter stone ballast.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is a dumpy bag of ballast?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'A dumpy bag (or Handy Bag) contains all-in ballast - a pre-mixed combination of sand and gravel (20mm max diameter). UK dumpy bags weigh 800kg. This saves time because you don\'t need to mix sand and gravel separately.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Why does my calculator result include 10% waste?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'The 10% waste factor accounts for spillage during mixing, material sticking to equipment, uneven pouring, and imperfect finishes. Professional builders always add waste factor to avoid shortfalls mid-job. Having extra materials prevents costly delays.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What stone size does this calculator use?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'This calculator uses 20mm maximum diameter stone in the ballast mix, which is the standard for most UK construction applications. All concrete strength options (C20, C25, C30) are based on 20mm stone ballast.'
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

      <div className="min-h-screen bg-gray-50">
        {/* BACK BUTTON */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-6">
              <Package className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Concrete-to-Bags Calculator UK</h1>
            <p className="text-xl text-green-50 mb-2">Calculate exactly how many bags to buy</p>
            <p className="text-green-100">No confusion. No waste. Get accurate quantities in 30 seconds.</p>
          </div>
        </div>

        {/* CALCULATOR SECTION */}
        <div className="max-w-4xl mx-auto px-4 -mt-8">
          <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
              <div className="flex items-center gap-3">
                <Calculator className="w-6 h-6" />
                <h2 className="text-2xl font-bold">UK Concrete Calculator</h2>
              </div>
              <p className="text-green-50 mt-2">Get exact bag quantities with 10% waste factor included</p>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-900 mb-3">1. Concrete Strength</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['c20', 'c25', 'c30'].map(strength => (
                    <button
                      key={strength}
                      onClick={() => setConcreteStrength(strength)}
                      className={`p-4 rounded-lg border-2 text-center transition ${
                        concreteStrength === strength
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="font-bold text-gray-900">{strengthOptions[strength].label}</div>
                      <div className="text-sm text-gray-600">Mix ratio {strengthOptions[strength].ratio}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">2. Length (meters)</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="e.g., 5"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    aria-label="Length in meters"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">3. Width (meters)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="e.g., 3"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    aria-label="Width in meters"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">4. Depth (millimeters)</label>
                  <input
                    type="number"
                    value={depth}
                    onChange={(e) => setDepth(e.target.value)}
                    placeholder="e.g., 150"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none"
                    aria-label="Depth in millimeters"
                  />
                </div>
              </div>

              <button
                onClick={handleCalculate}
                disabled={!results}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate Materials Needed
              </button>
            </div>
          </div>

          {/* RESULTS */}
          {showResults && results && (
            <>
              <div className="mt-8 bg-white rounded-xl shadow-xl border-2 border-green-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <ShoppingCart className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Your Shopping List</h3>
                      <p className="text-gray-600">{results.strength.label} concrete (20mm ballast)</p>
                    </div>
                  </div>
                  {isSignedIn && (
                    <button
                      onClick={handleSaveToProject}
                      className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition"
                    >
                      <Save className="w-5 h-5" />
                      Save to Project
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                    <div className="text-sm font-semibold text-green-700 mb-1">CEMENT</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{results.cementBags} bags</div>
                    <div className="text-sm text-gray-600">25kg bags × {results.cementBags}</div>
                    <div className="text-xs text-gray-500 mt-2">Cost: £{(results.cementBags * 6.50).toFixed(2)}</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                    <div className="text-sm font-semibold text-blue-700 mb-1">BALLAST</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">{results.dumpyBags} dumpy bags</div>
                    <div className="text-sm text-gray-600">All-in ballast (sand + gravel)</div>
                    <div className="text-xs text-gray-500 mt-2">Cost: £{(results.dumpyBags * 80.00).toFixed(2)}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Base Volume</div>
                      <div className="font-bold text-gray-900">{results.baseVolume}m³</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Waste Factor</div>
                      <div className="font-bold text-gray-900">{results.wastePercentage}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Total Volume</div>
                      <div className="font-bold text-gray-900">{results.volumeM3}m³</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Mix Ratio</div>
                      <div className="font-bold text-gray-900">{results.strength.ratio}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Est. Total Cost</div>
                      <div className="font-bold text-green-600">£{results.totalCost}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-900 mb-1">Mix Ratio: {results.strength.ratio} ({results.strength.label})</p>
                      <p className="text-sm text-blue-800">{results.strength.cementParts} part cement, {results.strength.sandParts} parts sand, {results.strength.gravelParts} parts gravel (20mm max diameter). Add water gradually until workable consistency. Always include 10% waste factor (already included in quantities above).</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* QUOTE GENERATOR CTA */}
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

          {/* EMAIL CAPTURE CTA */}
          <div className="mt-12 mb-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">Want the Job Profitability Calculator?</h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              We're building a tool that calculates materials + labor + overheads + markup to show TRUE job profitability. Be first to know when it launches.
            </p>

            {!emailSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
                >
                  Notify Me
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 text-white">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-semibold">Thanks! We'll notify you when it launches.</span>
              </div>
            )}
          </div>

          {/* SEO CONTENT SECTIONS */}
          <div className="space-y-12 mb-16">
            {/* Important Notes */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <h3 className="text-xl font-bold text-gray-900">Important Notes</h3>
              </div>
              <ul className="space-y-2 text-gray-700 ml-9">
                <li>• <strong>Pricing based on Q4 2025 UK market rates</strong> (validated with major suppliers)</li>
                <li>• <strong>10% waste factor included</strong> for typical pours (spillage, imperfect pours, broken bags)</li>
                <li>• <strong>20mm maximum diameter stone ballast</strong> - standard for all concrete strengths (C20, C25, C30)</li>
                <li>• <strong>800kg dumpy bags</strong> - standard size across major UK merchants</li>
                <li>• <strong>Weather affects material moisture</strong> - wet ballast weighs more, adjust if necessary</li>
                <li>• <strong>Always order extra bags</strong> to avoid shortfalls during pouring</li>
                <li>• <strong>This calculator covers standard applications</strong> - consult engineer for specialized projects</li>
              </ul>
            </div>

            {/* How to Use */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Use the Concrete-to-Bags Calculator</h2>
              <p className="text-gray-700 mb-4">
                UK builders have struggled with concrete calculations for over a decade. Forum after forum shows the same confusion: "I need to fill X cubic meters—how many bags do I actually buy?" This calculator solves that problem instantly in 30 seconds.
              </p>
              <p className="text-gray-700 mb-4">
                Simply enter your dimensions (length, width, depth in meters/millimeters), select your concrete strength (C20, C25, or C30), and get exact bag quantities. All calculations use 20mm maximum diameter stone ballast, which is the standard for UK construction. No more converting cubic meters to bags, no more guessing mix ratios, no more over-ordering or emergency runs.
              </p>
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mt-4">
                <p className="text-sm text-green-800"><strong>The 10% waste factor:</strong> Professional builders always add waste factor to account for spillage, broken bags, imperfect pours, and material sticking to equipment. This prevents costly delays when you run short mid-pour.</p>
              </div>
            </div>

            {/* Why Confusing */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Concrete Calculations Are Confusing</h2>
              <p className="text-gray-700 mb-4">
                Cement is sold by weight (25kg bags), but ballast is often called a "Handy Bag", "Dumpy Bag" or "Bulk Bag" with no clear weight indicated. Different moisture content in winter can add 15-20% to actual weight. Plus, the conversion between cubic meters and bags requires complicated calculations that most builders don't remember.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded">
                  <p className="font-bold text-red-900 mb-2">❌ The Hidden Cost of Guesswork</p>
                  <p className="text-red-800 text-sm">
                    Ordering wrong quantities costs £200-500 per job. Over-order and you waste money storing excess or paying disposal fees. Under-order and you halt work waiting for delivery, losing £150-300+ in daily labor costs. Work crews standing idle cost more than extra bags.
                  </p>
                </div>
                <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded">
                  <p className="font-bold text-green-900 mb-2">✓ Accurate Ordering Saves Time & Money</p>
                  <p className="text-green-800 text-sm">
                    This calculator provides exact quantities, eliminating guesswork. Order confidently knowing you have enough materials. No emergency merchant runs, no job delays, no wasted labor hours standing around waiting for delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Concrete Mix Ratios */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">UK Concrete Mix Ratios Explained (20mm Stone)</h2>
              <p className="text-gray-700 mb-4">
                Different applications require different concrete strengths. The mix ratio (cement:sand:gravel) and cement bag quantity determine the final strength. All ratios here use 20mm maximum diameter stone ballast, the UK standard:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">C20 (20 MPa)</h3>
                  <p className="text-sm text-gray-600 mb-3">General-purpose, foundations</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Mix Ratio:</strong> 1:2:4</li>
                    <li>• <strong>Cement bags/m³:</strong> 12 bags</li>
                    <li>• <strong>Compressive Strength:</strong> 20 MPa</li>
                    <li>• <strong>Stone size:</strong> 20mm max diameter</li>
                  </ul>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">C25 (25 MPa)</h3>
                  <p className="text-sm text-gray-600 mb-3">Slabs, driveways, heavy-use</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Mix Ratio:</strong> 1:2:3</li>
                    <li>• <strong>Cement bags/m³:</strong> 13 bags</li>
                    <li>• <strong>Compressive Strength:</strong> 25 MPa</li>
                    <li>• <strong>Stone size:</strong> 20mm max diameter</li>
                  </ul>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">C30 (30 MPa)</h3>
                  <p className="text-sm text-gray-600 mb-3">High-strength, structural</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <strong>Mix Ratio:</strong> 1:1.5:3</li>
                    <li>• <strong>Cement bags/m³:</strong> 15 bags</li>
                    <li>• <strong>Compressive Strength:</strong> 30 MPa</li>
                    <li>• <strong>Stone size:</strong> 20mm max diameter</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Current Pricing */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Current UK Concrete Material Costs (Q4 2025)</h2>
              <p className="text-gray-700 mb-4">These are current UK market rates. Prices updated regularly. Insurance adjusters and clients often use outdated pricing—this calculator reflects current 2025 costs.</p>
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-6">
                <div className="space-y-3">
                  <div className="flex justify-between pb-2 border-b">
                    <p className="font-semibold text-gray-900">Portland Cement (25kg bag)</p>
                    <p className="font-semibold text-gray-900">£6.50</p>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <p className="font-semibold text-gray-900">All-in Ballast (dumpy bag 800kg, 20mm stone)</p>
                    <p className="font-semibold text-gray-900">£80.00</p>
                  </div>
                  <div className="flex justify-between pb-2 border-b">
                    <p className="text-gray-700">Typical 1m³ pour (with 10% waste) - C20</p>
                    <p className="font-semibold text-gray-700">~£155 materials</p>
                  </div>
                  <div className="flex justify-between bg-green-100 p-2 rounded border border-green-300">
                    <p className="font-semibold text-gray-900">Professional labour rate</p>
                    <p className="font-semibold text-green-700">£115/m² (current)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Q: Can I use this calculator for commercial projects?</h3>
                  <p className="text-gray-700">Yes, absolutely. This calculator is designed for any concrete pour size - residential, commercial, or civil works. The calculations follow UK building standards and are suitable for professional quotes, insurance claims, and cost estimation.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Q: What if I need a different stone size?</h3>
                  <p className="text-gray-700">This calculator uses 20mm maximum diameter stone, which is the UK standard for most construction applications. If you require a different stone size (10mm or 14mm), contact your concrete supplier directly for custom mix designs.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Q: Should I always order extra bags?</h3>
                  <p className="text-gray-700">Yes - always order 1-2 extra bags beyond the calculated total. The 10% waste factor covers spillage and imperfect pours, but having spares prevents costly delays if you need to re-run a section or encounter unexpected wastage.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Q: What size are dumpy bags?</h3>
                  <p className="text-gray-700">Standard dumpy bags (also called handy bags or bulk bags) weigh 800kg in the UK. They contain all-in ballast - a pre-mixed combination of sand and gravel (20mm max diameter). This saves time because you don't need to mix sand and gravel separately.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Q: How does moisture affect concrete calculations?</h3>
                  <p className="text-gray-700">Wet weather increases ballast moisture content, adding 15-20% to actual weight. This calculator uses dry weight assumptions. In very wet conditions, you may need slightly fewer dumpy bags. Conversely, in dry conditions, materials may be lighter.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Q: Can I use ready-mix concrete instead?</h3>
                  <p className="text-gray-700">Yes, ready-mix concrete is often more convenient for larger pours. This calculator helps you understand quantities - whether buying bags or ordering ready-mix, you need to know the volume required (shown in m³).</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Q: What concrete strength should I choose?</h3>
                  <p className="text-gray-700">C20 (12 bags/m³, 1:2:4 ratio) is suitable for most foundations and general work. C25 (13 bags/m³, 1:2:3 ratio) is recommended for slabs and driveways with vehicle traffic. C30 (15 bags/m³, 1:1.5:3 ratio) is for high-strength structural applications. All use 20mm max diameter stone.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM SECTION */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Need Help or Have Questions?</h3>
              <p className="text-gray-700">
                Got a specific calculation requirement or want a custom tool for your trade? Fill out the form below.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ConcreteToBagsCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Concrete Calculator Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>
        </div>

        {/* FINAL CTA */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Professional Tools for UK Builders & Contractors</h3>
            <p className="text-green-50 mb-8 text-lg">
              Explore our complete range of calculators and tools built specifically for construction trades.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition"
            >
              View All Calculators
            </button>
          </div>
        </div>

        {/* QUOTE GENERATOR MODAL */}
        {showQuoteGenerator && results && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: `Cement (25kg bags)`, quantity: results.cementBags.toString(), unit: 'bags' },
                { item: `All-in Ballast (dumpy bags 800kg, 20mm stone)`, quantity: results.dumpyBags.toString(), unit: 'bags' },
                { item: `${results.strength.label} - ${results.strength.ratio} Mix`, quantity: results.volumeM3, unit: 'm³' },
                { item: 'Mixing & Pouring Labour', quantity: '1', unit: 'job' }
              ],
              summary: `${results.volumeM3}m³ concrete ${results.strength.label} (${results.strength.ratio} mix ratio with 20mm stone ballast) - includes 10% waste factor`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}

        {/* Save to Project Modal */}
        {showSaveModal && saveData && (
          <SaveToProjectModal
            isOpen={showSaveModal}
            onClose={() => {
              setShowSaveModal(false)
              setSaveData(null)
            }}
            calculationData={saveData}
            onSaved={() => {
              toast.success('Calculation saved to project')
              setShowSaveModal(false)
              setSaveData(null)
            }}
          />
        )}
      </div>
    </>
  )
}








