import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Droplets, Calculator, AlertCircle, ShoppingCart, ArrowLeft, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import jsPDF from 'jspdf'

interface BeddingResult {
  diameter: number
  diameterMm: number
  beddingVolume: number
  stoneRequired: number
  pipesNeeded: number
  connectorsNeeded: number
}

interface SpoilResult {
  totalSpoil: number
  beddingVolume: number
  backfillUsed: number
  spoilLeftOver: number
  pipesNeeded: number
  beddingStone: number
}

export default function DrainageCalculator() {
  const navigate = useNavigate()
  
  // Pipe Bedding State
  const [pipeDiameter, setPipeDiameter] = useState('4')
  const [pipeLength, setPipeLength] = useState('50')
  const [beddingResults, setBeddingResults] = useState<BeddingResult | null>(null)
  const [showBeddingResults, setShowBeddingResults] = useState(false)
  
  // Spoil & Backfill State
  const [trenchWidth, setTrenchWidth] = useState('1.5')
  const [trenchDepth, setTrenchDepth] = useState('2')
  const [trenchLength, setTrenchLength] = useState('50')
  const [pipeDiameter2, setPipeDiameter2] = useState('4')
  const [pipeLength2, setPipeLength2] = useState('50')
  const [spoilResults, setSpoilResults] = useState<SpoilResult | null>(null)
  const [showSpoilResults, setShowSpoilResults] = useState(false)

  const calculateBedding = () => {
    const diameter = parseFloat(pipeDiameter)
    const length = parseFloat(pipeLength)
    
    const diameterMm = diameter * 25.4
    const diameterM = diameterMm / 1000
    const outerDiameter = diameterM + 0.2
    
    const pipeArea = Math.PI * Math.pow(diameterM / 2, 2)
    const outerArea = Math.PI * Math.pow(outerDiameter / 2, 2)
    const beddingArea = outerArea - pipeArea
    const beddingVolume = beddingArea * length
    
    // Calculate pipes and connectors
    const pipesNeeded = Math.ceil(length / 3)
    const connectorsNeeded = Math.max(0, pipesNeeded - 1)
    
    setBeddingResults({
      diameter,
      diameterMm,
      beddingVolume,
      stoneRequired: beddingVolume * 1.6,
      pipesNeeded,
      connectorsNeeded,
    })
    setShowBeddingResults(true)
    window.scrollTo({ top: 1000, behavior: 'smooth' })
  }

  const downloadBeddingResults = () => {
    if (!beddingResults) return

    const doc = new jsPDF()
    const now = new Date()
    const dateStr = now.toLocaleDateString('en-GB')
    const timeStr = now.toLocaleTimeString('en-GB')

    // Header
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text('Pipe Bedding Calculation Results', 20, 20)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text(`Generated: ${dateStr} at ${timeStr}`, 20, 30)
    doc.text('TradeCalcs - Underground Drainage Pipe Calculator', 20, 37)

    // Divider
    doc.setDrawColor(150, 80, 220)
    doc.line(20, 42, 190, 42)

    // Pipe Details Section
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('Pipe Specifications', 20, 55)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    let yPos = 65
    doc.text(`Pipe Diameter: ${beddingResults.diameter}" (${beddingResults.diameterMm.toFixed(1)}mm)`, 20, yPos)
    yPos += 8
    doc.text(`Pipe Run Length: ${pipeLength} metres`, 20, yPos)
    yPos += 8
    doc.text(`Bedding Depth: 100mm (all around pipe)`, 20, yPos)

    // Materials Section
    yPos += 15
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('Materials Required', 20, yPos)

    yPos += 12
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)

    // Better table layout with proper spacing
    const col1 = 20
    const col2 = 110
    const col3 = 160

    // Header row
    doc.setFillColor(150, 80, 220)
    doc.setTextColor(255, 255, 255)
    doc.rect(col1, yPos - 5, 170, 7, 'F')
    doc.text('Material', col1 + 2, yPos)
    doc.text('Quantity', col2 + 2, yPos)
    doc.text('Unit', col3 + 2, yPos)

    yPos += 10
    doc.setTextColor(0, 0, 0)

    // Data rows
    const materials = [
      ['10mm Stone Bedding', beddingResults.stoneRequired.toFixed(2), 'tonnes'],
      ['Drainage Pipes (3m)', beddingResults.pipesNeeded.toString(), 'pipes'],
      ['Straight Connectors', beddingResults.connectorsNeeded.toString(), 'units'],
    ]

    for (let i = 0; i < materials.length; i++) {
      if (i % 2 === 0) {
        doc.setFillColor(240, 240, 240)
        doc.rect(col1, yPos - 5, 170, 7, 'F')
      }
      doc.setTextColor(0, 0, 0)
      doc.text(materials[i][0], col1 + 2, yPos)
      doc.text(materials[i][1], col2 + 2, yPos)
      doc.text(materials[i][2], col3 + 2, yPos)
      yPos += 7
    }

    // Calculations Section
    yPos += 10
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('Calculation Details', 20, yPos)

    yPos += 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Bedding Volume: ${beddingResults.beddingVolume.toFixed(3)} m³`, 20, yPos)
    yPos += 5
    doc.text(`Stone Density: 1.6 tonnes/m³`, 20, yPos)
    yPos += 5
    doc.text(`Pipe Length: 3 metres (standard UK size)`, 20, yPos)
    yPos += 5
    doc.text(`Pipes Needed: ${beddingResults.pipesNeeded}`, 20, yPos)
    yPos += 5
    doc.text(`Connectors Needed: ${beddingResults.connectorsNeeded}`, 20, yPos)

    // Compliance Section
    yPos += 12
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('Building Regulations Compliance', 20, yPos)

    yPos += 7
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    const complianceText = doc.splitTextToSize(
      '10mm clean stone bedding with 100mm clearance all around the pipe per UK Building Regulations Part H and BS 8301 standards.',
      170
    )
    doc.text(complianceText, 20, yPos)

    // Footer
    yPos = 280
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text('© 2025 TradeCalcs. Verify calculations with your engineer before ordering.', 20, yPos)

    // Save PDF
    doc.save(`drainage-bedding-calculation-${dateStr.replace(/\//g, '-')}.pdf`)
  }

  const downloadSpoilResults = () => {
    if (!spoilResults) return

    const doc = new jsPDF()
    const now = new Date()
    const dateStr = now.toLocaleDateString('en-GB')
    const timeStr = now.toLocaleTimeString('en-GB')

    // Header
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text('Spoil & Backfill Calculation Results', 20, 20)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text(`Generated: ${dateStr} at ${timeStr}`, 20, 30)
    doc.text('TradeCalcs - Underground Drainage Pipe Calculator', 20, 37)

    // Divider
    doc.setDrawColor(150, 80, 220)
    doc.line(20, 42, 190, 42)

    // Trench Details Section
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('Trench Specifications', 20, 55)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    let yPos = 65
    doc.text(`Width: ${trenchWidth}m × Depth: ${trenchDepth}m × Length: ${trenchLength}m`, 20, yPos)
    yPos += 8
    doc.text(`Pipe Diameter: ${pipeDiameter2}" × Length: ${pipeLength2}m`, 20, yPos)

    // Results Section
    yPos += 15
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.text('Excavation & Backfill Results', 20, yPos)

    yPos += 10
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)

    const col1 = 20
    const col2 = 110
    const col3 = 160

    // Header
    doc.setFillColor(150, 80, 220)
    doc.setTextColor(255, 255, 255)
    doc.rect(col1, yPos - 5, 170, 7, 'F')
    doc.text('Item', col1 + 2, yPos)
    doc.text('Volume', col2 + 2, yPos)
    doc.text('Unit', col3 + 2, yPos)

    yPos += 10
    doc.setTextColor(0, 0, 0)

    // Data rows
    const results = [
      ['Total Spoil Excavated', spoilResults.totalSpoil.toFixed(2), 'm³'],
      ['Bedding Stone Volume', spoilResults.beddingVolume.toFixed(3), 'm³'],
      ['Backfill Used', spoilResults.backfillUsed.toFixed(2), 'm³'],
      ['Excess Spoil (Disposal)', Math.max(0, spoilResults.spoilLeftOver).toFixed(2), 'm³'],
    ]

    for (let i = 0; i < results.length; i++) {
      if (i % 2 === 0) {
        doc.setFillColor(240, 240, 240)
        doc.rect(col1, yPos - 5, 170, 7, 'F')
      }
      doc.setTextColor(0, 0, 0)
      doc.text(results[i][0], col1 + 2, yPos)
      doc.text(results[i][1], col2 + 2, yPos)
      doc.text(results[i][2], col3 + 2, yPos)
      yPos += 7
    }

    // Materials Section
    yPos += 10
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.text('Materials Required', 20, yPos)

    yPos += 8
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.text(`Drainage Pipes (3m lengths): ${spoilResults.pipesNeeded} pipes`, 20, yPos)
    yPos += 6
    doc.text(`10mm Bedding Stone: ${spoilResults.beddingStone.toFixed(2)} tonnes`, 20, yPos)

    // Footer
    yPos = 280
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text('© 2025 TradeCalcs. Verify calculations with your engineer before ordering.', 20, yPos)

    // Save PDF
    doc.save(`drainage-spoil-calculation-${dateStr.replace(/\//g, '-')}.pdf`)
  }

  const calculateSpoil = () => {
    const trenchW = parseFloat(trenchWidth)
    const trenchD = parseFloat(trenchDepth)
    const trenchL = parseFloat(trenchLength)
    const pipeDia = parseFloat(pipeDiameter2)
    const pipeLen = parseFloat(pipeLength2)
    
    const totalSpoil = trenchW * trenchD * trenchL
    
    const diameterMm = pipeDia * 25.4
    const diameterM = diameterMm / 1000
    const outerDiameter = diameterM + 0.2
    
    const pipeArea = Math.PI * Math.pow(diameterM / 2, 2)
    const outerArea = Math.PI * Math.pow(outerDiameter / 2, 2)
    const beddingArea = outerArea - pipeArea
    const beddingVolume = beddingArea * pipeLen
    
    const pipeVolume = pipeArea * pipeLen
    const backfillUsed = totalSpoil - pipeVolume - beddingVolume
const spoilLeftOver = Math.max(0, totalSpoil - backfillUsed)
    const pipesNeeded = Math.ceil(pipeLen / 3)
    
    setSpoilResults({
      totalSpoil,
      beddingVolume,
      backfillUsed,
      spoilLeftOver,
      pipesNeeded,
      beddingStone: beddingVolume * 1.6,
    })
    setShowSpoilResults(true)
    window.scrollTo({ top: 1200, behavior: 'smooth' })
  }

  return (
    <>
      <Helmet>
        <title>Underground Drainage Pipe Calculator UK 2025 | Trench Bedding & Spoil | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free UK drainage calculator for underground pipes. Calculate pipe bedding, spoil removal, and backfill for 4, 6, 9, and 12 inch diameter pipes. Instant compliance results for drainage contractors and plumbers." 
        />
        <meta name="keywords" content="drainage calculator, underground pipe calculator, trench bedding calculator, drainage spoil calculator, pipe bedding calculator UK, drainage design, trench excavation, Building Regulations drainage" />
        <meta name="author" content="TradeCalcs" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#7c3aed" />
        <link rel="canonical" href="https://tradecalcs.co.uk/drainage-calculator" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* BACK BUTTON */}
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>

        {/* HERO SECTION */}
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-xl mb-6">
              <Droplets className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Underground Drainage Pipe Calculator</h1>
            <p className="text-xl text-purple-50 mb-2">Calculate pipe bedding, spoil removal & backfill</p>
            <p className="text-purple-100">Get exact material quantities in 60 seconds. Building Regulations compliant.</p>
          </div>
        </div>

        {/* CALCULATOR GRID */}
        <div className="max-w-4xl mx-auto px-4 -mt-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PIPE BEDDING CALCULATOR */}
            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
                <div className="flex items-center gap-3">
                  <Droplets className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Pipe Bedding Calculator</h2>
                </div>
                <p className="text-purple-50 mt-2">Calculate bedding stone, pipes needed & straight connectors</p>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-3">Pipe Diameter</label>
                  <select
                    value={pipeDiameter}
                    onChange={(e) => setPipeDiameter(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
                  >
                    <option value="4">4 inch (101.6mm)</option>
                    <option value="6">6 inch (152.4mm)</option>
                    <option value="9">9 inch (228.6mm)</option>
                    <option value="12">12 inch (304.8mm)</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">Pipe Length (metres)</label>
                  <input
                    type="number"
                    value={pipeLength}
                    onChange={(e) => setPipeLength(e.target.value)}
                    placeholder="e.g., 50"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none"
                  />
                </div>

                <button
                  onClick={calculateBedding}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Bedding Required
                </button>
              </div>
            </div>

            {/* SPOIL & BACKFILL CALCULATOR */}
            <div className="bg-white rounded-xl shadow-xl border-2 border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6">
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-6 h-6" />
                  <h2 className="text-2xl font-bold">Spoil & Backfill Calculator</h2>
                </div>
                <p className="text-purple-50 mt-2">Calculate spoil removal and backfill volumes</p>
              </div>

              <div className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trench Dimensions</h3>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-900 mb-2">Width (metres)</label>
                  <input type="number" value={trenchWidth} onChange={(e) => setTrenchWidth(e.target.value)} placeholder="e.g., 1.5" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-900 mb-2">Depth (metres)</label>
                  <input type="number" value={trenchDepth} onChange={(e) => setTrenchDepth(e.target.value)} placeholder="e.g., 2" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">Length (metres)</label>
                  <input type="number" value={trenchLength} onChange={(e) => setTrenchLength(e.target.value)} placeholder="e.g., 50" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipe Details</h3>
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-900 mb-2">Pipe Diameter</label>
                  <select value={pipeDiameter2} onChange={(e) => setPipeDiameter2(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none">
                    <option value="4">4 inch (101.6mm)</option>
                    <option value="6">6 inch (152.4mm)</option>
                    <option value="9">9 inch (228.6mm)</option>
                    <option value="12">12 inch (304.8mm)</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">Pipe Length (metres)</label>
                  <input type="number" value={pipeLength2} onChange={(e) => setPipeLength2(e.target.value)} placeholder="e.g., 50" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none" />
                </div>

                <button
                  onClick={calculateSpoil}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-purple-800 transition flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate Spoil & Backfill
                </button>
              </div>
            </div>
          </div>

          {/* BEDDING RESULTS WITH DOWNLOAD BUTTON */}
          {showBeddingResults && beddingResults && (
            <div className="mt-8 bg-white rounded-xl shadow-xl border-2 border-purple-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Pipe Bedding Results</h3>
                    <p className="text-gray-600">100mm clearance all around</p>
                  </div>
                </div>
                <button
                  onClick={downloadBeddingResults}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
                  <div className="text-sm font-semibold text-purple-700 mb-1">PIPE DIAMETER</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{beddingResults.diameter}"</div>
                  <div className="text-sm text-gray-600">{beddingResults.diameterMm.toFixed(1)}mm</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                  <div className="text-sm font-semibold text-blue-700 mb-1">BEDDING VOLUME</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{beddingResults.beddingVolume.toFixed(3)}</div>
                  <div className="text-sm text-gray-600">m³</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                  <div className="text-sm font-semibold text-green-700 mb-1">10MM STONE NEEDED</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{beddingResults.stoneRequired.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">tonnes</div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border-2 border-amber-200">
                  <div className="text-sm font-semibold text-amber-700 mb-1">BEDDING DEPTH</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">100mm</div>
                  <div className="text-sm text-gray-600">All around pipe</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200">
                  <div className="text-sm font-semibold text-orange-700 mb-1">PIPES NEEDED</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{beddingResults.pipesNeeded}</div>
                  <div className="text-sm text-gray-600">× 3m lengths</div>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-xl border-2 border-rose-200">
                  <div className="text-sm font-semibold text-rose-700 mb-1">STRAIGHT CONNECTORS</div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{beddingResults.connectorsNeeded}</div>
                  <div className="text-sm text-gray-600">Pipe-to-pipe</div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Building Regulations Compliance</p>
                    <p className="text-sm text-blue-800">10mm clean stone bedding with 100mm (4 inch) clearance all around the pipe per UK Building Regulations Part H and BS 8301 standards.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-4">Materials Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Bedding stone (10mm):</span>
                    <span className="font-semibold text-gray-900">{beddingResults.stoneRequired.toFixed(2)} tonnes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Drainage pipes ({beddingResults.diameter}"):</span>
                    <span className="font-semibold text-gray-900">{beddingResults.pipesNeeded} × 3m</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-300 pt-2">
                    <span className="text-gray-700">Straight connectors:</span>
                    <span className="font-semibold text-gray-900">{beddingResults.connectorsNeeded} units</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-3">
                    <span>Typical cost per connector:</span>
                    <span>£8–12 each</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SPOIL RESULTS */}
          {showSpoilResults && spoilResults && (
            <div className="mt-8 bg-white rounded-xl shadow-xl border-2 border-purple-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Spoil & Backfill Results</h3>
                    <p className="text-gray-600">Complete excavation analysis</p>
                  </div>
                </div>
                <button
                  onClick={downloadSpoilResults}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border-2 border-red-200">
                  <div className="text-sm font-semibold text-red-700 mb-1">TOTAL SPOIL</div>
                  <div className="text-3xl font-bold text-gray-900">{spoilResults.totalSpoil.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">m³</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200">
                  <div className="text-sm font-semibold text-purple-700 mb-1">BACKFILL USED</div>
                  <div className="text-3xl font-bold text-gray-900">{spoilResults.backfillUsed.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">m³</div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border-2 border-amber-200">
                  <div className="text-sm font-semibold text-amber-700 mb-1">DISPOSAL NEEDED</div>
                  <div className="text-3xl font-bold text-gray-900">{Math.max(0, spoilResults.spoilLeftOver).toFixed(2)}</div>
                  <div className="text-sm text-gray-600">m³</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200">
                  <div className="text-sm font-semibold text-blue-700 mb-1">BEDDING VOLUME</div>
                  <div className="text-3xl font-bold text-gray-900">{spoilResults.beddingVolume.toFixed(3)}</div>
                  <div className="text-sm text-gray-600">m³</div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200">
                  <div className="text-sm font-semibold text-green-700 mb-1">PIPES NEEDED</div>
                  <div className="text-3xl font-bold text-gray-900">{spoilResults.pipesNeeded}</div>
                  <div className="text-sm text-gray-600">x 3m lengths</div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200">
                  <div className="text-sm font-semibold text-orange-700 mb-1">STONE NEEDED</div>
                  <div className="text-3xl font-bold text-gray-900">{spoilResults.beddingStone.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">tonnes</div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Disposal & Waste Planning</p>
                    <p className="text-sm text-blue-800">Excess spoil must be disposed of via skip hire or waste contractor. Arrange transportation before starting excavation to avoid site delays.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* HOW TO USE SECTION */}
        <div className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Use This Calculator</h2>
            <p className="text-gray-700 mb-8">This drainage calculator helps you determine exact quantities of materials needed for underground pipe installation and trench backfilling.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Calculate Pipe Bedding</h3>
                <p className="text-gray-700">Enter pipe diameter and length. The calculator determines the exact volume of 10mm stone bedding with 100mm clearance all around per Building Regulations.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Calculate Spoil & Backfill</h3>
                <p className="text-gray-700">Enter trench dimensions and pipe specifications. This calculates total spoil, bedding, backfill used, excess spoil, and number of pipes needed.</p>
              </div>
            </div>
          </div>
        </div>

        {/* UNDERSTANDING DRAINAGE SECTION */}
        <div className="bg-gray-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Understanding Drainage Design & Installation</h2>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Why Pipe Bedding Matters</h3>
                <p className="text-gray-700">Proper bedding protects drainage pipes from ground pressure, prevents differential settlement, and ensures long-term structural integrity. The recommended 10mm stone bedding with 100mm clearance all around distributes loads evenly and prevents damage to the pipe.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Trench Excavation Best Practices</h3>
                <p className="text-gray-700">Accurate spoil calculation prevents ordering too much or too little backfill material. Understanding how much spoil will be left over helps with skip hire, re-use on site, or disposal planning.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pipe Selection & Sizing</h3>
                <p className="text-gray-700">Standard drainage pipes are typically 3 metres long. This calculator helps you determine exactly how many pipes you'll need to complete your run, accounting for connections and joints.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Material Requirements for UK Drainage</h3>
                <p className="text-gray-700 mb-4">UK drainage standards (Building Regulations Part H, BS 8301) require proper bedding and backfilling to ensure pipe longevity and performance. Using this calculator ensures compliance with best practices.</p>
                
                <div className="overflow-x-auto">
                  <table className="w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-purple-600 text-white">
                        <th className="px-4 py-3 text-left font-semibold">Pipe Diameter</th>
                        <th className="px-4 py-3 text-left font-semibold">Typical Applications</th>
                        <th className="px-4 py-3 text-left font-semibold">Recommended Bedding</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="px-4 py-3">4 inch (101.6mm)</td>
                        <td className="px-4 py-3">Small domestic surface drains</td>
                        <td className="px-4 py-3">10mm stone, 100mm clearance</td>
                      </tr>
                      <tr className="border-t bg-gray-50">
                        <td className="px-4 py-3">6 inch (152.4mm)</td>
                        <td className="px-4 py-3">Domestic foul and surface water</td>
                        <td className="px-4 py-3">10mm stone, 100mm clearance</td>
                      </tr>
                      <tr className="border-t">
                        <td className="px-4 py-3">9 inch (228.6mm)</td>
                        <td className="px-4 py-3">Larger residential/commercial</td>
                        <td className="px-4 py-3">10mm stone, 100mm clearance</td>
                      </tr>
                      <tr className="border-t bg-gray-50">
                        <td className="px-4 py-3">12 inch (304.8mm)</td>
                        <td className="px-4 py-3">Industrial/large commercial</td>
                        <td className="px-4 py-3">10mm stone, 100mm clearance</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED CALCULATORS */}
        <div className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related TradeCalcs Tools</h2>
            <p className="text-gray-700 mb-8">Explore our complete range of professional calculators for UK trades.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a 
                href="/voltage-drop-calculator" 
                title="Voltage Drop Calculator - BS 7671 Compliance" 
                className="block p-6 bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg hover:shadow-lg transition"
              >
                <div className="text-purple-600 font-bold mb-2">⚡ Electrical</div>
                <h3 className="font-bold text-gray-900 mb-2">Voltage Drop Calculator</h3>
                <p className="text-sm text-gray-700">Calculate voltage drop for circuits with BS 7671 compliance verification</p>
              </a>
              
              <a 
                href="/cable-sizing-calculator" 
                title="Cable Sizing Calculator - UK Building Regulations" 
                className="block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-lg transition"
              >
                <div className="text-blue-600 font-bold mb-2">🔌 Electrical</div>
                <h3 className="font-bold text-gray-900 mb-2">Cable Sizing Calculator</h3>
                <p className="text-sm text-gray-700">Instant cable size selection for electrical installations per BS 7671</p>
              </a>
              
              <a 
                href="/concrete-calculator" 
                title="Concrete Calculator - Material Ordering" 
                className="block p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-lg transition"
              >
                <div className="text-green-600 font-bold mb-2">🏗️ Construction</div>
                <h3 className="font-bold text-gray-900 mb-2">Concrete Calculator</h3>
                <p className="text-sm text-gray-700">Calculate cement bags and ballast for concrete pours instantly</p>
              </a>
            </div>
          </div>
        </div>

        {/* NEWSLETTER SECTION */}
        <div className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl overflow-hidden">
              <div className="px-8 py-8 text-white">
                <h2 className="text-3xl font-bold mb-2">Get Expert Drainage Guidance</h2>
                <p className="text-lg opacity-95">Join UK drainage professionals using TradeCalcs. Subscribe for tips, updates, and exclusive resources.</p>
              </div>
              <div className="px-8 py-8 bg-white">
                <iframe 
                  src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false" 
                  width="100%" 
                  height="600" 
                  frameBorder="0"
                  title="TradeCalcs Newsletter"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-gray-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">About TradeCalcs</h3>
            <p className="text-gray-700 mb-4">TradeCalcs provides free, professional calculators for UK construction trades. Our drainage calculator is designed specifically for UK drainage contractors, plumbers, and civil engineers working to Building Regulations standards. All calculations are compliant with BS 8301 and UK Building Regulations Part H.</p>
            <p className="text-gray-500 text-sm border-t border-gray-200 pt-6 mt-6">
              © 2025 TradeCalcs. All rights reserved. | Drainage Calculator v1.0 | Always verify calculations with your engineer or contractor before ordering materials. Results are estimates based on standard formulas - site conditions may vary.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}







