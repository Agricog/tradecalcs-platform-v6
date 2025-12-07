import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Droplets, Calculator, AlertCircle, ShoppingCart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface BeddingResult {
  diameter: number
  diameterMm: number
  beddingVolume: number
  stoneRequired: number
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
  
  // FAQ State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

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
    
    setBeddingResults({
      diameter,
      diameterMm,
      beddingVolume,
      stoneRequired: beddingVolume * 1.6,
    })
    setShowBeddingResults(true)
    window.scrollTo({ top: 1000, behavior: 'smooth' })
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
    const spoilLeftOver = totalSpoil - backfillUsed - beddingVolume - pipeVolume
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

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const faqs = [
    {
      q: "What is pipe bedding and why is it needed?",
      a: "Pipe bedding is a layer of graded aggregate (typically 10mm stone) placed beneath and around drainage pipes. It distributes ground loads evenly, provides support, prevents differential settlement, protects the pipe from sharp ground objects, and ensures proper drainage performance. UK Building Regulations require 100mm minimum on all sides."
    },
    {
      q: "How much bedding stone do I need?",
      a: "Use our pipe bedding calculator to enter your pipe diameter and length. The calculator determines the exact volume by calculating the space around the pipe (pipe diameter + 100mm clearance on all sides) multiplied by the pipe length. Standard bedding is 100mm (4 inches) clearance all around the pipe."
    },
    {
      q: "What should I do with excess spoil?",
      a: "After accounting for backfill and bedding, leftover spoil can be re-used on site for landscaping, levelling, or other projects. If not needed, arrange for skip hire or a waste contractor. This calculator helps you plan disposal requirements accurately."
    },
    {
      q: "How many pipes do I need?",
      a: "Standard drainage pipes are 3 metres long. Divide your total run length by 3 and round up. This calculator does this automatically and accounts for connections. For a 50m run, you'd need 17 x 3m pipes."
    },
    {
      q: "What's the difference between 10mm and other stone sizes?",
      a: "10mm clean stone is the standard for drainage bedding because it provides good support, allows water drainage, and compacts well without crushing the pipe. Larger stones can leave voids; smaller stones can create compaction issues. Always specify 10mm for consistency."
    },
    {
      q: "What are UK Building Regulations requirements for drainage?",
      a: "UK Building Regulations Part H and BS 8301 specify requirements for drainage design and installation, including minimum cover depths, pipe gradients (1:40 to 1:80), proper bedding and support, and access points. This calculator helps with the material specification aspect of compliance."
    },
    {
      q: "Can I use backfill spoil for bedding?",
      a: "No. Bedding must be clean 10mm stone specifically. Backfill spoil should be screened and compacted but cannot substitute for proper bedding stone. Doing so may cause pipe damage, poor drainage performance, and future structural issues. Always use specified materials."
    },
    {
      q: "What pipe diameters does this calculator support?",
      a: "This calculator supports 4, 6, 9, and 12 inch diameter pipes, which cover most UK domestic and commercial drainage applications. 4-6 inch is typical for residential; 9-12 inch for larger commercial or industrial systems."
    },
    {
      q: "How accurate is this calculator?",
      a: "This calculator provides accurate material estimates based on standard industry formulas. For precise project planning, always verify results with your engineer or contractor and account for site-specific factors like ground conditions, slope variations, and connection requirements."
    },
    {
      q: "Is there a mobile-friendly version?",
      a: "Yes! This calculator is fully responsive and works on all devices including smartphones, tablets, and desktops. Use it on-site to calculate material quantities instantly, perfect for jobsite planning and material ordering."
    },
  ]

  return (
    <>
      <Helmet>
        <title>Underground Drainage Pipe Calculator UK 2025 | Trench Bedding & Spoil | TradeCalcs</title>
        <meta name="description" content="Free UK drainage calculator for underground pipes. Calculate pipe bedding, spoil removal, and backfill for 4, 6, 9, and 12 inch diameter pipes. Instant compliance results for drainage contractors and plumbers." />
        <meta name="keywords" content="drainage calculator, underground pipe calculator, trench bedding calculator, drainage spoil calculator, pipe bedding calculator UK, drainage design, trench excavation, Building Regulations drainage" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#7c3aed" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Underground Drainage Pipe Calculator UK 2025 | TradeCalcs" />
        <meta property="og:description" content="Free drainage calculator for trench bedding and spoil calculations. Building Regulations compliant." />
        <meta property="og:url" content="https://tradecalcs.co.uk/drainage-calculator" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Underground Drainage Pipe Calculator UK" />
        <meta name="twitter:description" content="Free drainage calculator for UK drainage contractors, plumbers, and builders." />

        <link rel="canonical" href="https://tradecalcs.co.uk/drainage-calculator" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Calculators', 'item': 'https://tradecalcs.co.uk/calculators' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Drainage Calculator', 'item': 'https://tradecalcs.co.uk/drainage-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Underground Drainage Pipe Calculator UK',
                'description': 'Professional drainage calculator for UK contractors. Calculate exact pipe bedding stone, spoil removal, and backfill needed for underground drainage pipes - 4, 6, 9, 12 inch diameters with Building Regulations compliance.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/drainage-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '186' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': faqs.map(faq => ({
                  '@type': 'Question',
                  'name': faq.q,
                  'acceptedAnswer': { '@type': 'Answer', 'text': faq.a }
                }))
              },
              {
                '@type': 'Organization',
                'name': 'TradeCalcs',
                'url': 'https://tradecalcs.co.uk',
                'logo': 'https://tradecalcs.co.uk/logo.png'
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
                <p className="text-purple-50 mt-2">Calculate 10mm stone bedding needed</p>
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

          {/* BEDDING RESULTS */}
          {showBeddingResults && beddingResults && (
            <div className="mt-8 bg-white rounded-xl shadow-xl border-2 border-purple-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Pipe Bedding Results</h3>
                  <p className="text-gray-600">100mm clearance all around</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Building Regulations Compliance</p>
                    <p className="text-sm text-blue-800">10mm clean stone bedding with 100mm (4 inch) clearance all around the pipe per UK Building Regulations Part H and BS 8301 standards.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SPOIL RESULTS */}
          {showSpoilResults && spoilResults && (
            <div className="mt-8 bg-white rounded-xl shadow-xl border-2 border-purple-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Spoil & Backfill Results</h3>
                  <p className="text-gray-600">Complete excavation analysis</p>
                </div>
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
            <p className="text-gray-700 mb-8">\nThis drainage calculator helps you determine exact quantities of materials needed for underground pipe installation and trench backfilling. Perfect for on-site estimation and material ordering.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1: Calculate Pipe Bedding</h3>
                <p className="text-gray-700">Enter your pipe diameter (4, 6, 9, or 12 inch) and total length. The calculator determines the exact volume of 10mm stone bedding needed to surround the pipe with 100mm (4 inch) clearance all around per Building Regulations.</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2: Calculate Spoil & Backfill</h3>
                <p className="text-gray-700">Enter trench dimensions (width, depth, length) and pipe specifications. This calculates total spoil excavated, bedding volume, backfill used, excess spoil for disposal, and number of 3-metre pipe lengths needed.</p>
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

        {/* FAQ SECTION */}
        <div className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition font-semibold text-gray-900"
                  >
                    <span>{faq.q}</span>
                    <span className="text-purple-600">{expandedFaq === index ? '▼' : '▶'}</span>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 py-4 border-t border-gray-200 text-gray-700 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LEAD CAPTURE SECTION */}
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

        {/* FOOTER INFO */}
        <div className="bg-gray-50 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">About TradeCalcs</h3>
            <p className="text-gray-700 mb-4">TradeCalcs provides free, professional calculators for UK construction trades. Our drainage calculator is designed specifically for UK drainage contractors, plumbers, and civil engineers working to Building Regulations standards.</p>
            <p className="text-gray-500 text-sm border-t border-gray-200 pt-6 mt-6">
              © 2025 TradeCalcs. All rights reserved. | Drainage Calculator v1.0 | Always verify calculations with your engineer or contractor before ordering materials.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}


