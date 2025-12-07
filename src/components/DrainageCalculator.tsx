import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

interface BeddingResult {
  diameter: number;
  diameterMm: number;
  beddingVolume: number;
  stoneRequired: number;
}

interface SpoilResult {
  totalSpoil: number;
  beddingVolume: number;
  backfillUsed: number;
  spoilLeftOver: number;
  pipesNeeded: number;
  beddingStone: number;
}

export default function DrainageCalculator() {
  const [pipeDiameter, setPipeDiameter] = useState('4');
  const [pipeLength, setPipeLength] = useState('50');
  const [beddingResults, setBeddingResults] = useState<BeddingResult | null>(null);
  
  const [trenchWidth, setTrenchWidth] = useState('1.5');
  const [trenchDepth, setTrenchDepth] = useState('2');
  const [trenchLength, setTrenchLength] = useState('50');
  const [pipeDiameter2, setPipeDiameter2] = useState('4');
  const [pipeLength2, setPipeLength2] = useState('50');
  const [spoilResults, setSpoilResults] = useState<SpoilResult | null>(null);
  
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const calculateBedding = () => {
    const diameter = parseFloat(pipeDiameter);
    const length = parseFloat(pipeLength);
    
    const diameterMm = diameter * 25.4;
    const diameterM = diameterMm / 1000;
    const outerDiameter = diameterM + 0.2;
    
    const pipeArea = Math.PI * Math.pow(diameterM / 2, 2);
    const outerArea = Math.PI * Math.pow(outerDiameter / 2, 2);
    const beddingArea = outerArea - pipeArea;
    const beddingVolume = beddingArea * length;
    
    setBeddingResults({
      diameter,
      diameterMm,
      beddingVolume,
      stoneRequired: beddingVolume * 1.6,
    });
  };

  const calculateSpoil = () => {
    const trenchW = parseFloat(trenchWidth);
    const trenchD = parseFloat(trenchDepth);
    const trenchL = parseFloat(trenchLength);
    const pipeDia = parseFloat(pipeDiameter2);
    const pipeLen = parseFloat(pipeLength2);
    
    const totalSpoil = trenchW * trenchD * trenchL;
    
    const diameterMm = pipeDia * 25.4;
    const diameterM = diameterMm / 1000;
    const outerDiameter = diameterM + 0.2;
    
    const pipeArea = Math.PI * Math.pow(diameterM / 2, 2);
    const outerArea = Math.PI * Math.pow(outerDiameter / 2, 2);
    const beddingArea = outerArea - pipeArea;
    const beddingVolume = beddingArea * pipeLen;
    
    const pipeVolume = pipeArea * pipeLen;
    const backfillUsed = totalSpoil - pipeVolume - beddingVolume;
    const spoilLeftOver = totalSpoil - backfillUsed - beddingVolume - pipeVolume;
    const pipesNeeded = Math.ceil(pipeLen / 3);
    
    setSpoilResults({
      totalSpoil,
      beddingVolume,
      backfillUsed,
      spoilLeftOver,
      pipesNeeded,
      beddingStone: beddingVolume * 1.6,
    });
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is pipe bedding and why is it needed?",
      a: "Pipe bedding is a layer of graded aggregate (typically 10mm stone) placed beneath and around drainage pipes. It distributes ground loads evenly, provides support, prevents differential settlement, protects the pipe from sharp ground objects, and ensures proper drainage performance. UK standards recommend 100mm minimum on all sides."
    },
    {
      q: "How much bedding stone do I need?",
      a: "The amount depends on your pipe diameter and length. This calculator determines the exact volume by calculating the space around the pipe (pipe diameter + 100mm clearance on all sides) multiplied by the pipe length. Standard bedding is 100mm (4 inches) clearance all around the pipe."
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
  ];

  return (
    <>
      <Helmet>
        <title>Underground Drainage Pipe Calculator UK 2025 | Trench Bedding & Spoil | TradeCalcs</title>
        <meta name="description" content="Free UK drainage calculator for underground pipes. Calculate pipe bedding, spoil removal, and backfill for 4, 6, 9, and 12 inch diameter pipes. Instant compliance results for drainage contractors." />
        <meta name="keywords" content="drainage calculator, underground pipe calculator, trench bedding calculator, drainage spoil calculator, pipe bedding calculator UK, drainage design, trench excavation" />
        <meta property="og:title" content="Underground Drainage Pipe Calculator UK | TradeCalcs" />
        <meta property="og:description" content="Free drainage calculator for trench bedding and spoil calculations. Pipe diameters 4, 6, 9, 12 inches." />
        <meta property="og:url" content="https://tradecalcs.co.uk/drainage-calculator" />
        <link rel="canonical" href="https://tradecalcs.co.uk/drainage-calculator" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white py-10 px-4 sm:px-6 rounded-lg mb-8 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Underground Drainage Pipe Calculator</h1>
          <p className="text-lg opacity-95">Calculate pipe bedding, spoil removal, and backfill requirements instantly</p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 max-w-6xl mx-auto">
          {/* Pipe Bedding Calculator */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-purple-600 mb-6">💧 Pipe Bedding Calculator</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pipe Diameter</label>
                <select 
                  value={pipeDiameter} 
                  onChange={(e) => setPipeDiameter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="4">4 inch (101.6mm)</option>
                  <option value="6">6 inch (152.4mm)</option>
                  <option value="9">9 inch (228.6mm)</option>
                  <option value="12">12 inch (304.8mm)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pipe Length (metres)</label>
                <input 
                  type="number" 
                  value={pipeLength}
                  onChange={(e) => setPipeLength(e.target.value)}
                  min="1"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              <button 
                onClick={calculateBedding}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold py-3 px-4 rounded-md hover:shadow-lg transform hover:-translate-y-0.5 transition"
              >
                Calculate Bedding Required
              </button>

              {beddingResults && (
                <div className="mt-6 pt-6 border-t-2 border-gray-100 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Pipe Diameter:</span>
                    <span className="font-bold text-purple-600">{beddingResults.diameter}" ({beddingResults.diameterMm.toFixed(1)}mm)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Bedding Volume (m³):</span>
                    <span className="font-bold text-purple-600">{beddingResults.beddingVolume.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">10mm Stone Required:</span>
                    <span className="font-bold text-purple-600">{beddingResults.stoneRequired.toFixed(2)} tonnes</span>
                  </div>
                </div>
              )}

              <div className="bg-gray-100 p-4 border-l-4 border-purple-600 rounded text-sm text-gray-700">
                <strong>ℹ️ Note:</strong> Calculates 10mm pipe bedding stone surrounding the pipe with 100mm (4 inch) all around clearance.
              </div>
            </div>
          </div>

          {/* Spoil & Backfill Calculator */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-bold text-purple-600 mb-6">🏗️ Spoil & Backfill Calculator</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Trench Dimensions</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Trench Width (metres)</label>
                  <input 
                    type="number" 
                    value={trenchWidth}
                    onChange={(e) => setTrenchWidth(e.target.value)}
                    min="0.5"
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trench Depth (metres)</label>
                <input 
                  type="number" 
                  value={trenchDepth}
                  onChange={(e) => setTrenchDepth(e.target.value)}
                  min="0.5"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Trench Length (metres)</label>
                <input 
                  type="number" 
                  value={trenchLength}
                  onChange={(e) => setTrenchLength(e.target.value)}
                  min="1"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Pipe Details</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pipe Diameter</label>
                  <select 
                    value={pipeDiameter2}
                    onChange={(e) => setPipeDiameter2(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                  >
                    <option value="4">4 inch (101.6mm)</option>
                    <option value="6">6 inch (152.4mm)</option>
                    <option value="9">9 inch (228.6mm)</option>
                    <option value="12">12 inch (304.8mm)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pipe Length (metres)</label>
                <input 
                  type="number" 
                  value={pipeLength2}
                  onChange={(e) => setPipeLength2(e.target.value)}
                  min="1"
                  step="0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              <button 
                onClick={calculateSpoil}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white font-bold py-3 px-4 rounded-md hover:shadow-lg transform hover:-translate-y-0.5 transition"
              >
                Calculate Spoil & Backfill
              </button>

              {spoilResults && (
                <div className="mt-6 pt-6 border-t-2 border-gray-100 space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Total Spoil Removed (m³):</span>
                    <span className="font-bold text-purple-600">{spoilResults.totalSpoil.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Bedding Volume (m³):</span>
                    <span className="font-bold text-purple-600">{spoilResults.beddingVolume.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Backfill Used (m³):</span>
                    <span className="font-bold text-purple-600">{spoilResults.backfillUsed.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Spoil Left Over for Disposal (m³):</span>
                    <span className="font-bold text-purple-600">{spoilResults.spoilLeftOver.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Pipes Needed (3m lengths):</span>
                    <span className="font-bold text-purple-600">{spoilResults.pipesNeeded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Bedding Stone Needed (tonnes):</span>
                    <span className="font-bold text-purple-600">{spoilResults.beddingStone.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="bg-gray-100 p-4 border-l-4 border-purple-600 rounded text-sm text-gray-700">
                <strong>ℹ️ Note:</strong> Calculates total trench volume, subtracts pipe and bedding, then determines leftover spoil after backfilling.
              </div>
            </div>
          </div>
        </div>

        {/* How to Use Section */}
        <div className="bg-white rounded-lg p-8 shadow mb-12 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use This Calculator</h2>
          <p className="text-gray-700 mb-4">This drainage calculator helps you determine the exact quantities of materials needed for underground pipe installation and trench backfilling.</p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Step 1: Calculate Pipe Bedding</h3>
          <p className="text-gray-700 mb-4">Enter your pipe diameter and length. The calculator will determine the volume of 10mm stone bedding needed to surround the pipe with 100mm (4 inch) clearance all around.</p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Step 2: Calculate Spoil & Backfill</h3>
          <p className="text-gray-700 mb-4">Enter trench dimensions (width, depth, length) along with pipe specifications. This calculates:</p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Total spoil excavated from the trench</li>
            <li>Volume used for bedding and backfilling</li>
            <li>Excess spoil left over for disposal</li>
            <li>Number of 3-metre pipe lengths required</li>
            <li>Total bedding stone needed</li>
          </ul>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Step 3: Review Results</h3>
          <p className="text-gray-700">Use the calculated quantities for material ordering, labour estimation, and waste disposal planning.</p>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg p-8 shadow mb-12 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition"
                >
                  <span className="font-semibold text-gray-900">{faq.q}</span>
                  <span className="text-purple-600 font-bold">{expandedFaq === index ? '▼' : '▶'}</span>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200 text-gray-700">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-lg p-8 shadow max-w-6xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">About TradeCalcs</h3>
          <p className="text-gray-700">TradeCalcs provides free, professional calculators for UK construction trades. Our drainage calculator is designed specifically for UK drainage contractors, plumbers, and civil engineers working to Building Regulations standards.</p>
          <p className="text-gray-500 text-sm mt-8 pt-8 border-t border-gray-200">© 2025 TradeCalcs. All rights reserved. | Drainage Calculator v1.0 | Always verify calculations with your engineer or contractor before ordering materials.</p>
        </div>
      </div>
    </>
  );
}
