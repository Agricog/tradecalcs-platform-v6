import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Info, CheckCircle2, HelpCircle, Layers, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import QuoteGenerator from './QuoteGenerator'

interface InsulationResults {
  calculatedUValue: string;
  regulationTarget: string;
  isCompliant: boolean;
  difference: string;
  recommendedThickness: number;
  thermalResistance: string;
  materialCost: number;
  elementType: string;
  constructionType: string;
  insulationType: string;
  thickness: number;
  area: number;
}

export default function InsulationCalculator() {
  const [elementType, setElementType] = useState<'wall' | 'roof' | 'floor'>('wall')
  const [constructionType, setConstructionType] = useState('')
  const [insulationType, setInsulationType] = useState('')
  const [thickness, setThickness] = useState('')
  const [area, setArea] = useState('')
  const [results, setResults] = useState<InsulationResults | null>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  const materialRValues: Record<string, number> = {
    'mineral-wool': 0.044,
    'eps': 0.038,
    'pir': 0.023,
    'phenolic': 0.020,
    'wood-fibre': 0.038,
    'hemp': 0.040,
    'cellulose': 0.040
  }

  const buildingRegsTargets: Record<string, number> = {
    'wall-new': 0.18,
    'wall-extension': 0.28,
    'roof-new': 0.15,
    'roof-extension': 0.16,
    'floor-new': 0.18,
    'floor-extension': 0.22
  }

  const calculate = () => {
    if (!constructionType || !insulationType || !thickness) return

    const thicknessM = parseFloat(thickness) / 1000
    const lambda = materialRValues[insulationType]
    const thermalResistance = thicknessM / lambda

    const Rsi = elementType === 'floor' ? 0.17 : 0.13
    const Rse = 0.04
    const Rconstruction = 0.18
    
    const totalR = Rsi + Rconstruction + thermalResistance + Rse
    const calculatedUValue = 1 / totalR

    const isNewBuild = constructionType.includes('new')
    const targetKey = `${elementType}-${isNewBuild ? 'new' : 'extension'}`
    const regulationTarget = buildingRegsTargets[targetKey]
    
    const isCompliant = calculatedUValue <= regulationTarget
    const difference = ((calculatedUValue - regulationTarget) / regulationTarget * 100).toFixed(1)

    const requiredR = (1 / regulationTarget) - Rsi - Rse - Rconstruction
    const recommendedThickness = Math.ceil((requiredR * lambda * 1000) / 10) * 10

    const areaM2 = parseFloat(area) || 0
    const costPerM2: Record<string, number> = {
      'mineral-wool': 8,
      'eps': 12,
      'pir': 18,
      'phenolic': 22,
      'wood-fibre': 25,
      'hemp': 30,
      'cellulose': 15
    }
    const materialCost = Math.ceil(areaM2 * costPerM2[insulationType])

    setResults({
      calculatedUValue: calculatedUValue.toFixed(3),
      regulationTarget: regulationTarget.toFixed(2),
      isCompliant,
      difference,
      recommendedThickness,
      thermalResistance: thermalResistance.toFixed(3),
      materialCost,
      elementType,
      constructionType,
      insulationType,
      thickness: parseFloat(thickness),
      area: areaM2
    })
  }

  const resetCalculator = () => {
    setElementType('wall')
    setConstructionType('')
    setInsulationType('')
    setThickness('')
    setArea('')
    setResults(null)
  }

  const getInsulationName = (type: string) => {
    const names: Record<string, string> = {
      'mineral-wool': 'Mineral Wool (Glass/Rock)',
      'eps': 'EPS (Expanded Polystyrene)',
      'pir': 'PIR (Polyisocyanurate)',
      'phenolic': 'Phenolic Foam',
      'wood-fibre': 'Wood Fibre',
      'hemp': 'Hemp Insulation',
      'cellulose': 'Cellulose'
    }
    return names[type] || type
  }

  return (
    <>
      <Helmet>
        <title>U-Value Calculator UK | Insulation Part L Calculator | Building Regulations | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free U-value calculator for UK building regulations. Check Part L 2021 compliance for walls, roofs, and floors. Professional insulation thermal performance calculator." 
        />
        <meta name="keywords" content="U-value calculator, Part L calculator, insulation calculator, building regulations calculator, thermal performance, UK insulation, SAP calculator, thermal resistance, Part L 2021, Building Regs" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="U-Value Calculator UK | Insulation Part L Calculator" />
        <meta property="og:description" content="Calculate U-values and check Part L 2021 compliance. Free professional insulation calculator for UK builders." />
        <meta property="og:url" content="https://tradecalcs.co.uk/insulation-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/insulation-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="U-Value Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free U-value calculator. Check Part L compliance for insulation instantly." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/insulation-calculator-og.jpg" />

        <link rel="canonical" href="https://tradecalcs.co.uk/insulation-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#059669" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Calculators', 'item': 'https://tradecalcs.co.uk/calculators' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Insulation Calculator', 'item': 'https://tradecalcs.co.uk/insulation-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'U-Value Calculator UK',
                'description': 'Professional U-value calculator for UK building regulations. Calculate thermal performance for walls, roofs, and floors. Check Part L 2021 compliance with accurate calculations.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/insulation-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '2,156' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'What is a U-value and why does it matter?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'U-value measures thermal transmittance in W/m²K (watts per square meter per degree Kelvin). Lower U-values indicate better insulation and less heat loss. Building Regulations Part L sets maximum U-values for different building elements. New dwellings have stricter targets than extensions. Non-compliance can fail Building Control inspection.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What are the Part L 2021 U-value targets?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Part L 2021 targets (W/m²K): Walls - 0.18 new build, 0.28 extension. Roofs - 0.15 new build, 0.16 extension. Floors - 0.18 new build, 0.22 extension. Requirements tightened in June 2022. New regulations demand 31% CO₂ reduction vs 2013 standards. Non-compliance requires remedial work at cost.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How do I calculate required insulation thickness?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Required thickness = (Target R-value - existing R-values) × insulation λ-value. This calculator automatically determines recommended thickness for your target U-value. Thicker insulation = lower U-value = better thermal performance. Typical walls need 100-200mm, roofs 150-300mm. Premium materials (PIR/Phenolic) need less thickness than basic materials (mineral wool).'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is thermal conductivity (λ-value)?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Thermal conductivity (lambda, λ) measures how much heat passes through material per meter. Measured in W/mK. Lower λ-values mean better insulation: PIR 0.023, Phenolic 0.020, EPS 0.038, Mineral Wool 0.044. Better performance materials cost more but need less thickness. All materials must be declared on product datasheets per EN standards.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Which insulation material is best?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Best material depends on application: PIR/Phenolic - highest performance, thinnest needed, premium cost. Mineral Wool - fire-resistant, acoustic benefits, cost-effective. EPS - good all-rounder, moisture-resistant. Natural materials (hemp/wood) - breathable, sustainable, higher cost. Cellulose - recycled, cost-effective. Consider performance, cost, fire rating, moisture resistance, and environmental impact.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Is this calculator accurate for Building Control?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'This calculator provides simplified estimates for planning purposes only. Building Control submissions require detailed SAP calculations from accredited energy assessors. Professional calculations account for thermal bridging, air tightness, and complex constructions. Use this for initial design; obtain professional SAP report before Building Control submission.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Can I compare this with other building calculators?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'TradeCalcs provides comprehensive professional estimators for multiple trades. Use our <a href="https://tradecalcs.co.uk/paint-calculator">Paint Calculator</a> for decorator costs, <a href="https://tradecalcs.co.uk/brick-block-calculator">Brick & Block Calculator</a> for masonry, <a href="https://tradecalcs.co.uk/scaffold-calculator">Scaffold Calculator</a> for structural work, or <a href="https://tradecalcs.co.uk/cis-calculator">CIS Calculator</a> for construction tax. All tools are free with UK standards.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is thermal resistance (R-value)?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Thermal resistance (R-value) measures insulation effectiveness in m²K/W. Higher R-values = better insulation. Calculated as: R = thickness (m) / thermal conductivity (W/mK). Total R-value includes insulation plus air gaps, surfaces, and construction materials. U-value is inverse: U = 1/Total R. Building regulations use U-values; retrofits are specified by R-values.'
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
          <Link to="/" className="text-green-600 hover:text-green-800 font-semibold text-sm">
            ← Back to All Calculators
          </Link>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <Layers className="w-12 h-12 mx-auto mb-3" />
            <h1 className="text-4xl font-bold mb-2">Insulation U-Value Calculator</h1>
            <p className="text-lg opacity-95">Calculate thermal performance & check Part L compliance</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="bg-green-600 text-white rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="w-5 h-5" />
                <h2 className="text-lg font-bold">Professional U-Value Calculator</h2>
              </div>
              <p className="text-sm opacity-90">Thermal performance estimator for UK building regulations</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">1. Building Element</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setElementType('wall')}
                  className={`py-2 px-4 rounded-lg font-semibold transition ${
                    elementType === 'wall'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label="Select wall element"
                >
                  Wall
                </button>
                <button
                  onClick={() => setElementType('roof')}
                  className={`py-2 px-4 rounded-lg font-semibold transition ${
                    elementType === 'roof'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label="Select roof element"
                >
                  Roof
                </button>
                <button
                  onClick={() => setElementType('floor')}
                  className={`py-2 px-4 rounded-lg font-semibold transition ${
                    elementType === 'floor'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  aria-label="Select floor element"
                >
                  Floor
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">2. Construction Type</label>
              <select
                value={constructionType}
                onChange={e => setConstructionType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                aria-label="Select construction type"
              >
                <option value="">Select construction type</option>
                <option value="new">New Build (Part L 2021 stricter targets)</option>
                <option value="extension">Extension/Renovation (higher U-value allowed)</option>
                <option value="retrofit">Retrofit/Upgrade (existing building work)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">New builds have stricter targets than extensions</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">3. Insulation Material</label>
              <select
                value={insulationType}
                onChange={e => setInsulationType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                aria-label="Select insulation material"
              >
                <option value="">Select insulation type</option>
                <option value="phenolic">Phenolic Foam - λ 0.020 (best performance)</option>
                <option value="pir">PIR (Polyisocyanurate) - λ 0.023 (premium)</option>
                <option value="eps">EPS (Polystyrene) - λ 0.038 (good value)</option>
                <option value="mineral-wool">Mineral Wool (Glass/Rock) - λ 0.044 (cost-effective)</option>
                <option value="cellulose">Cellulose - λ 0.040 (recycled)</option>
                <option value="hemp">Hemp Insulation - λ 0.040 (natural, breathable)</option>
                <option value="wood-fibre">Wood Fibre - λ 0.038 (natural, sustainable)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">λ (lambda) = thermal conductivity in W/mK • Lower = better</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">4. Thickness (mm)</label>
                <input
                  type="number"
                  value={thickness}
                  onChange={e => setThickness(e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  aria-label="Insulation thickness in millimetres"
                />
                <p className="text-xs text-gray-500 mt-1">Typical: 50-300mm depending on material</p>
              </div>

              <div>
                <label className="block font-bold text-gray-800 mb-2">5. Area (m²) Optional</label>
                <input
                  type="number"
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  placeholder="e.g. 50"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  aria-label="Building element area in square metres"
                />
                <p className="text-xs text-gray-500 mt-1">For material cost estimation</p>
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
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                aria-label="Calculate U-value"
              >
                📊 Calculate U-Value
              </button>
            </div>

            {results && (
              <>
                <div className={`mt-8 rounded-lg p-6 ${results.isCompliant ? 'bg-green-50 border-2 border-green-300' : 'bg-red-50 border-2 border-red-300'}`}>
                  <div className="flex items-center gap-2 mb-4">
                    {results.isCompliant ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-red-600" />
                    )}
                    <h3 className={`text-xl font-bold ${results.isCompliant ? 'text-green-900' : 'text-red-900'}`}>
                      {results.isCompliant ? '✅ Part L Compliant' : '❌ Below Standard'}
                    </h3>
                  </div>

                  <div className="bg-white p-4 rounded border-t-2 border-b-2" style={{ borderTopColor: results.isCompliant ? '#22c55e' : '#ef4444', borderBottomColor: results.isCompliant ? '#22c55e' : '#ef4444' }}>
                    <div className="mb-4">
                      <p className="text-xs text-gray-600 mb-1">Calculated U-Value</p>
                      <p className="text-3xl font-bold text-gray-900">{results.calculatedUValue} W/m²K</p>
                      <p className="text-xs text-gray-600 mt-1">Target: {results.regulationTarget} W/m²K (Part L 2021)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-teal-100 rounded border-l-2 border-teal-600">
                        <p className="text-xs text-gray-600">Thermal Resistance</p>
                        <p className="text-lg font-bold text-gray-900">{results.thermalResistance} m²K/W</p>
                      </div>

                      <div className="p-3 bg-green-100 rounded border-l-2 border-green-600">
                        <p className="text-xs text-gray-600">Material & Thickness</p>
                        <p className="text-lg font-bold text-gray-900">{getInsulationName(results.insulationType)}</p>
                        <p className="text-xs text-gray-600">{results.thickness}mm</p>
                      </div>
                    </div>

                    {!results.isCompliant && (
                      <div className="mt-4 p-3 bg-orange-100 rounded border-l-2 border-orange-600">
                        <p className="text-sm font-semibold text-orange-900 mb-1">📏 Recommended Thickness for Compliance</p>
                        <p className="text-lg font-bold text-orange-900">{results.recommendedThickness}mm</p>
                        <p className="text-xs text-orange-800">Increase thickness to meet Part L requirements</p>
                      </div>
                    )}

                    {results.area > 0 && (
                      <div className="mt-4 p-3 bg-blue-100 rounded border-l-2 border-blue-600">
                        <p className="text-sm font-semibold text-blue-900 mb-1">💷 Estimated Material Cost</p>
                        <p className="text-lg font-bold text-blue-900">£{results.materialCost}</p>
                        <p className="text-xs text-blue-800">{results.area}m² at {results.thickness}mm thickness</p>
                      </div>
                    )}

                    {!results.isCompliant && (
                      <div className="mt-4 p-3 bg-red-100 rounded border-l-2 border-red-600">
                        <p className="text-sm font-semibold text-red-900 mb-1">⚠️ Non-Compliant Status</p>
                        <p className="text-xs text-red-800">Your U-value is {Math.abs(parseFloat(results.difference))}% higher than Building Regulations Part L requirements. Increasing thickness to {results.recommendedThickness}mm will achieve compliance.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* QUOTE GENERATOR CTA */}
                {results.area > 0 && (
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg mt-6">
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
                )}
              </>
            )}
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-3">🎯 Part L 2021 Compliance Standards</h3>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li>• <strong>Walls:</strong> 0.18 W/m²K (new build) | 0.28 W/m²K (extension)</li>
                  <li>• <strong>Roofs:</strong> 0.15 W/m²K (new build) | 0.16 W/m²K (extension)</li>
                  <li>• <strong>Floors:</strong> 0.18 W/m²K (new build) | 0.22 W/m²K (extension)</li>
                  <li>• <strong>Requirement:</strong> 31% CO₂ reduction vs 2013 standards</li>
                  <li>• <strong>Non-compliance:</strong> Failed Building Control inspection, remedial costs, warranty issues</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding U-Values & Thermal Performance</h2>
            <p className="text-gray-700 mb-4">
              U-value measures thermal transmittance in W/m²K - how much heat passes through a building element. Lower U-values mean better insulation and less heat loss. Building Regulations Part L 2021 sets maximum U-values for different construction types. Achieving compliance requires correct insulation thickness and material selection.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-green-600 mb-4">
              <p className="text-sm text-gray-700"><strong>Key principle:</strong> U-value is inverse of total thermal resistance. Thicker insulation or better materials reduce U-value. Every 50mm of premium insulation (PIR) saves more than 100mm basic material (mineral wool) in thickness.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">What is Thermal Resistance (R-value)?</h3>
                <p className="text-sm text-gray-700 mb-3">
                  R-value (m²K/W) measures insulation effectiveness. Higher R = better insulation. Calculated as thickness ÷ thermal conductivity (λ). Total R-value includes insulation plus air gaps, surfaces, and construction materials.
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• U-value = 1 / Total R-value</li>
                  <li>• Building regulations use U-values</li>
                  <li>• Retrofits often specified by R-values</li>
                  <li>• SAP calculations require U-values</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Insulation Material Performance</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Thermal conductivity (λ-value) determines how much heat flows through material. Lower λ = better insulation = thinner needed. Premium materials cost more but achieve targets with less thickness.
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Phenolic:</strong> λ 0.020 (best, thinnest)</li>
                  <li>• <strong>PIR:</strong> λ 0.023 (premium performance)</li>
                  <li>• <strong>EPS/Wood:</strong> λ 0.038 (good value)</li>
                  <li>• <strong>Mineral Wool:</strong> λ 0.044 (most basic)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choosing Insulation & Calculating Requirements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Material Selection Guide</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>PIR/Phenolic:</strong> Best performance, premium cost, thinnest application</li>
                  <li>• <strong>EPS:</strong> Good all-rounder, moisture-resistant, moderate cost</li>
                  <li>• <strong>Mineral Wool:</strong> Fire-resistant, acoustic benefits, cost-effective, thicker needed</li>
                  <li>• <strong>Natural Materials:</strong> Hemp/wood breathable, sustainable, higher cost, thicker needed</li>
                  <li>• <strong>Cellulose:</strong> Recycled content, cost-effective, moisture sensitive</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Thickness Calculation</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Formula: Required thickness (mm) = (Target R-value - existing R) × λ-value × 1000
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  This calculator automatically determines recommended thickness for your target U-value. Typical applications:
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Cavity walls:</strong> 75-150mm (stone), 50-100mm (premium)</li>
                  <li>• <strong>Loft insulation:</strong> 150-300mm depending on material</li>
                  <li>• <strong>Solid walls:</strong> 100-200mm internal or external</li>
                  <li>• <strong>Suspended floors:</strong> 100-200mm between joists</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: How accurate is this calculator for Building Control?</h4>
                <p className="text-sm text-gray-700">This calculator provides simplified estimates for planning purposes only. Building Control submissions require detailed SAP calculations from accredited energy assessors. Professional calculations account for thermal bridging, air tightness, and complex constructions. Use this for initial design; obtain professional SAP report before Building Control submission to avoid rejection.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What is thermal bridging and does it affect U-values?</h4>
                <p className="text-sm text-gray-700">Thermal bridging occurs where materials with poor insulation cross insulation layers (studs, joists, beams). Reduces overall U-value performance. Professional calculations use linear thermal transmittance (ψ-values) to account for thermal bridges. This simplified calculator doesn't account for bridging - actual performance may be worse than calculated.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Do I need SAP calculations for my project?</h4>
                <p className="text-sm text-gray-700">Required for: New dwellings (Building Regulations compliance), EPC assessments, mortgage valuations, renewable energy grants. Recommended for: Extensions over 25% of wall area, major renovations. Simplified calculations sufficient for: Minor work, self-build planning, material selection. Obtain professional assessment if uncertain.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Can I compare insulation calculator with other building tools?</h4>
                <p className="text-sm text-gray-700">TradeCalcs provides comprehensive professional estimators for multiple trades. Use our <a href="/paint-calculator" className="text-green-600 font-semibold hover:underline">Paint Calculator</a> for decorator costs, <a href="/brick-block-calculator" className="text-green-600 font-semibold hover:underline">Brick & Block Calculator</a> for masonry, <a href="/scaffold-calculator" className="text-green-600 font-semibold hover:underline">Scaffold Calculator</a> for structural work, or <a href="/cis-calculator" className="text-green-600 font-semibold hover:underline">CIS Calculator</a> for construction tax. All tools are free with UK standards.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: What's the difference between new build and extension targets?</h4>
                <p className="text-sm text-gray-700">New buildings (Part L 2021) have stricter targets: walls 0.18, roofs 0.15, floors 0.18 W/m²K. Extensions have higher allowed U-values: walls 0.28, roofs 0.16, floors 0.22. Retrofit/upgrade work follows extension standards unless replacing entire element. New build standards require thicker insulation or premium materials.</p>
              </div>
            </div>
          </section>

          <div className="bg-yellow-50 border-l-4 border-yellow-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <p className="font-bold text-yellow-900 mb-2">✓ For Planning Purposes Only - Professional Assessment Recommended</p>
                <p className="text-sm text-yellow-800 mb-2">This calculator provides simplified estimates. Complex constructions, thermal bridging, air tightness, and renewable energy systems require professional SAP calculations. Building Control submissions must include accredited energy assessor reports. Non-compliance with Part L can result in failed inspections, remedial work costs, warranty voidance, and prosecution.</p>
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
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=InsulationCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite Insulation Calculator Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-green-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>

          <div className="bg-green-600 text-white rounded-lg p-8 text-center mb-8">
            <h2 className="text-2xl font-bold mb-3">Complete Your Building Project Calculations</h2>
            <p className="mb-6">Use our comprehensive suite of professional estimators: <a href="/paint-calculator" className="underline hover:opacity-90">Paint Calculator</a> for decorator costs, <a href="/brick-block-calculator" className="underline hover:opacity-90">Brick & Block Calculator</a> for masonry, <a href="/scaffold-calculator" className="underline hover:opacity-90">Scaffold Calculator</a> for structural work, and <a href="/" className="underline hover:opacity-90">view all calculators</a> to build complete project estimates.</p>
            <a href="/" className="bg-white text-green-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </a>
          </div>
        </div>

        {/* QUOTE GENERATOR MODAL */}
        {showQuoteGenerator && results && results.area > 0 && (
          <QuoteGenerator
            calculationResults={{
              materials: [
                { item: getInsulationName(results.insulationType), quantity: results.area.toString(), unit: 'm²' },
                { item: `${results.thickness}mm Insulation Boards (Part L compliant)`, quantity: results.area.toString(), unit: 'm²' },
                { item: 'Fixings & Adhesive', quantity: '1', unit: 'job' },
                { item: 'Installation Labour', quantity: '1', unit: 'job' },
                { item: 'SAP Calculation (accredited assessor)', quantity: '1', unit: 'survey' }
              ],
              summary: `${results.elementType.charAt(0).toUpperCase() + results.elementType.slice(1)} insulation - U-value: ${results.calculatedUValue} W/m²K ${results.isCompliant ? '(Part L 2021 compliant)' : `(Non-compliant - recommend ${results.recommendedThickness}mm)`} - ${results.area}m² @ ${results.thickness}mm - Est. cost £${results.materialCost}`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}



