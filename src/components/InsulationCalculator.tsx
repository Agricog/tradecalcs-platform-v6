           import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Info, CheckCircle2, Layers, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'

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
  constructionMaterial: string;
  airGapType: string;
}

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
    doc.text('Professional Insulation Quote', 20, 20)

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

    doc.save('insulation-quote.pdf')
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
export default function InsulationCalculator() {
  const [elementType, setElementType] = useState<'wall' | 'roof' | 'floor'>('wall')
  const [constructionType, setConstructionType] = useState('')
  const [insulationType, setInsulationType] = useState('')
  const [constructionMaterial, setConstructionMaterial] = useState('brick')
  const [airGapType, setAirGapType] = useState('unventilated')
  const [thickness, setThickness] = useState('')
  const [area, setArea] = useState('')
  const [results, setResults] = useState<InsulationResults | null>(null)
  const [showQuoteGenerator, setShowQuoteGenerator] = useState(false)

  // Lambda (thermal conductivity) values in W/mK
  const materialLambdaValues: Record<string, number> = {
    'phenolic': 0.020,
    'pir': 0.023,
    'eps': 0.038,
    'wood-fibre': 0.038,
    'cellulose': 0.040,
    'hemp': 0.040,
    'mineral-wool': 0.044
  }

  // Surface resistances for different element types
  const surfaceResistances: Record<string, { rsi: number; rso: number }> = {
    'wall': { rsi: 0.13, rso: 0.04 },
    'roof': { rsi: 0.10, rso: 0.04 },
    'floor': { rsi: 0.17, rso: 0.04 }
  }

  // R-values for construction materials (m²K/W)
  const constructionRValues: Record<string, number> = {
    'brick-100': 0.13,      // 100mm brick @ λ 0.77
    'brick-215': 0.28,      // 215mm brick @ λ 0.77
    'block-100-aerated': 0.91,  // 100mm aerated concrete @ λ 0.11
    'block-100-dense': 0.33,    // 100mm dense concrete @ λ 0.30
    'plasterboard-12': 0.05,    // 12.5mm plasterboard @ λ 0.25
    'plasterboard-25': 0.10,    // 25mm plasterboard @ λ 0.25
    'timber-50': 0.15,          // 50mm timber @ λ 0.13
  }

  // Air gap R-values (m²K/W)
  const airGapRValues: Record<string, number> = {
    'unventilated': 0.18,
    'ventilated': 0.00
  }

  // Building Regulations targets (W/m²K)
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
    const lambda = materialLambdaValues[insulationType]
    const insulationR = thicknessM / lambda

    // Get surface resistances
    const surfaceRes = surfaceResistances[elementType]
    const Rsi = surfaceRes.rsi
    const Rso = surfaceRes.rso

    // Get construction material R-value based on element type
    let constructionR = 0.18 // default fallback
    if (elementType === 'wall') {
      constructionR = constructionRValues[constructionMaterial] || 0.28
    } else if (elementType === 'roof') {
      constructionR = constructionRValues['plasterboard-12'] // typical roof lining
    } else if (elementType === 'floor') {
      constructionR = constructionRValues['plasterboard-12'] // floor finish
    }

    // Get air gap R-value
    const airGapR = airGapRValues[airGapType] || 0.18

    // Calculate total thermal resistance
    const totalR = Rsi + constructionR + insulationR + airGapR + Rso
    const calculatedUValue = 1 / totalR

    // Determine building regulations target
    const isNewBuild = constructionType === 'new'
    const targetKey = `${elementType}-${isNewBuild ? 'new' : 'extension'}`
    const regulationTarget = buildingRegsTargets[targetKey]
    
    const isCompliant = calculatedUValue <= regulationTarget
    const difference = ((calculatedUValue - regulationTarget) / regulationTarget * 100).toFixed(1)

    // Calculate recommended thickness for compliance
    const requiredTotalR = 1 / regulationTarget
    const requiredInsulationR = requiredTotalR - Rsi - Rso - constructionR - airGapR
    const recommendedThickness = Math.ceil((requiredInsulationR * lambda * 1000) / 10) * 10

    // Calculate material cost
    const areaM2 = parseFloat(area) || 0
    const costPerM2: Record<string, number> = {
      'phenolic': 25,
      'pir': 18,
      'eps': 12,
      'wood-fibre': 25,
      'hemp': 30,
      'cellulose': 15,
      'mineral-wool': 8
    }
    const materialCost = Math.ceil(areaM2 * costPerM2[insulationType])

    setResults({
      calculatedUValue: calculatedUValue.toFixed(3),
      regulationTarget: regulationTarget.toFixed(2),
      isCompliant,
      difference,
      recommendedThickness: Math.max(recommendedThickness, 50),
      thermalResistance: totalR.toFixed(3),
      materialCost,
      elementType,
      constructionType,
      insulationType,
      thickness: parseFloat(thickness),
      area: areaM2,
      constructionMaterial,
      airGapType
    })
  }

  const resetCalculator = () => {
    setElementType('wall')
    setConstructionType('')
    setInsulationType('')
    setConstructionMaterial('brick')
    setAirGapType('unventilated')
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

  const getLambdaValue = (type: string): string => {
    const values: Record<string, string> = {
      'phenolic': '0.020',
      'pir': '0.023',
      'eps': '0.038',
      'wood-fibre': '0.038',
      'cellulose': '0.040',
      'hemp': '0.040',
      'mineral-wool': '0.044'
    }
    return values[type] || '0.040'
  }

  const downloadResultsPDF = () => {
    if (!results) return

    const doc = new jsPDF()
    
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(16)
    doc.text('U-Value Calculation Results', 20, 20)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    
    let y = 35
    
    doc.text(`Calculated U-Value: ${results.calculatedUValue} W/m²K`, 20, y)
    y += 7
    doc.text(`Regulation Target: ${results.regulationTarget} W/m²K`, 20, y)
    y += 7
    doc.text(`Status: ${results.isCompliant ? 'COMPLIANT ✓' : 'NON-COMPLIANT ✗'}`, 20, y)
    y += 10
    
    doc.setFont('helvetica', 'bold')
    doc.text('Calculation Inputs:', 20, y)
    doc.setFont('helvetica', 'normal')
    y += 7
    
    doc.text(`Element Type: ${results.elementType.charAt(0).toUpperCase() + results.elementType.slice(1)}`, 20, y)
    y += 6
    doc.text(`Construction Type: ${results.constructionType}`, 20, y)
    y += 6
    doc.text(`Insulation Material: ${getInsulationName(results.insulationType)}`, 20, y)
    y += 6
    doc.text(`Thickness: ${results.thickness}mm`, 20, y)
    y += 6
    doc.text(`Thermal Resistance: ${results.thermalResistance} m²K/W`, 20, y)
    y += 6
    
    if (results.area > 0) {
      doc.text(`Wall Area: ${results.area}m²`, 20, y)
      y += 6
      doc.text(`Material Cost (est.): £${results.materialCost}`, 20, y)
      y += 7
    }
    
    if (!results.isCompliant) {
      y += 3
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(192, 21, 47)
      doc.text(`RECOMMENDED THICKNESS: ${results.recommendedThickness}mm`, 20, y)
      doc.setTextColor(0, 0, 0)
      doc.setFont('helvetica', 'normal')
      y += 7
      doc.text(`Variance: ${results.difference}% above target`, 20, y)
      y += 10
      
      doc.setFont('helvetica', 'bold')
      doc.text('To achieve compliance, increase insulation thickness to:', 20, y)
      doc.setFont('helvetica', 'normal')
      y += 7
      doc.text(`${results.recommendedThickness}mm of ${getInsulationName(results.insulationType)}`, 20, y)
    }
    
    y += 15
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text('Calculation Details:', 20, y)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    y += 7
    
    const rsiValue = results.elementType === 'wall' ? '0.13' : results.elementType === 'roof' ? '0.10' : '0.17'
    const details = [
      `Surface Resistances (m²K/W):`,
      `  • Internal (Rsi): ${rsiValue}`,
      `  • External (Rso): 0.04`,
      `Insulation Lambda (λ): ${getLambdaValue(results.insulationType)} W/mK`,
      `Air Gap: ${results.airGapType === 'unventilated' ? 'Unventilated (0.18)' : 'Ventilated (0.00'} m²K/W`,
      `Formula: U = 1 / (Rsi + R_construction + R_insulation + R_air_gap + Rso)`
    ]
    
    details.forEach(detail => {
      doc.text(detail, 20, y)
      y += 5
    })
    
    y += 10
    doc.setFont('helvetica', 'italic')
    doc.setFontSize(8)
    doc.text('⚠️ This calculation is for planning purposes only. Building Control submissions require detailed SAP calculations', 20, y)
    y += 4
    doc.text('from accredited energy assessors. Professional calculations must account for thermal bridging and complex constructions.', 20, y)
    
    doc.save('u-value-calculation.pdf')
  }

  return (
    <>
      <Helmet>
        <title>U-Value Calculator UK | Insulation Part L Calculator | Building Regulations | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free U-value calculator for UK building regulations. Check Part L 2021 compliance for walls, roofs, and floors. Professional insulation thermal performance calculator with accurate lambda values and surface resistances." 
        />
        <meta name="keywords" content="U-value calculator, Part L calculator, insulation calculator, building regulations calculator, thermal performance, UK insulation, SAP calculator, thermal resistance, Part L 2021, Building Regs, thermal conductivity, lambda values" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="U-Value Calculator UK | Insulation Part L Calculator" />
        <meta property="og:description" content="Calculate U-values and check Part L 2021 compliance. Free professional insulation calculator for UK builders with accurate thermal calculations." />
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
                'description': 'Professional U-value calculator for UK building regulations. Calculate thermal performance for walls, roofs, and floors. Check Part L 2021 compliance with accurate calculations using correct lambda values and surface resistances.',
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
                    'name': 'What is thermal resistance (R-value)?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Thermal resistance (R-value) measures insulation effectiveness in m²K/W. Higher R-values = better insulation. Calculated as: R = thickness (m) / thermal conductivity (W/mK). Total R-value includes insulation plus air gaps, surfaces, and construction materials. U-value is inverse: U = 1/Total R. Building regulations use U-values; retrofits are specified by R-values.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How do surface resistances affect U-value?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Surface resistances (Rsi and Rso) are fixed values that account for air film resistance on internal and external surfaces. Vary by heat flow direction: Walls Rsi=0.13, Rso=0.04; Roofs Rsi=0.10, Rso=0.04; Floors Rsi=0.17, Rso=0.04 m²K/W. These are included automatically in this calculator for accurate results.'
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
              <p className="text-sm opacity-90">Thermal performance estimator for UK building regulations with accurate lambda values and surface resistances</p>
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
              </select>
              <p className="text-xs text-gray-500 mt-1">New builds have stricter targets than extensions</p>
            </div>

            {elementType === 'wall' && (
              <div className="mb-6">
                <label className="block font-bold text-gray-800 mb-2">3a. Wall Construction Material</label>
                <select
                  value={constructionMaterial}
                  onChange={e => setConstructionMaterial(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  aria-label="Select wall construction material"
                >
                  <option value="brick-100">100mm Brick (λ 0.77 W/mK)</option>
                  <option value="brick-215">215mm Brick - Half-brick (λ 0.77 W/mK)</option>
                  <option value="block-100-aerated">100mm Aerated Block (λ 0.11 W/mK)</option>
                  <option value="block-100-dense">100mm Dense Block (λ 0.30 W/mK)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">Material affects total thermal resistance calculation</p>
              </div>
            )}

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">{elementType === 'wall' ? '3b' : '3'}. Insulation Material</label>
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
              <p className="text-xs text-gray-500 mt-1">λ (lambda) = thermal conductivity in W/mK • Lower = better insulation</p>
            </div>

            <div className="mb-6">
              <label className="block font-bold text-gray-800 mb-2">{elementType === 'wall' ? '3c' : '4'}. Air Gap Type</label>
              <select
                value={airGapType}
                onChange={e => setAirGapType(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                aria-label="Select air gap type"
              >
                <option value="unventilated">Unventilated (cavity) - R 0.18 m²K/W</option>
                <option value="ventilated">Ventilated - R 0.00 m²K/W</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">Affects thermal resistance calculation</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-bold text-gray-800 mb-2">{elementType === 'wall' ? '3d' : '5'}. Thickness (mm)</label>
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
                <label className="block font-bold text-gray-800 mb-2">{elementType === 'wall' ? '3e' : '6'}. Area (m²) Optional</label>
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
                        <p className="text-xs text-gray-600">Total Thermal Resistance</p>
                        <p className="text-lg font-bold text-gray-900">{results.thermalResistance} m²K/W</p>
                      </div>

                      <div className="p-3 bg-green-100 rounded border-l-2 border-green-600">
                        <p className="text-xs text-gray-600">Insulation Material & Thickness</p>
                        <p className="text-lg font-bold text-gray-900">{getInsulationName(results.insulationType)}</p>
                        <p className="text-xs text-gray-600">{results.thickness}mm</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="p-3 bg-blue-100 rounded border-l-2 border-blue-600">
                        <p className="text-xs text-gray-600">Element Type</p>
                        <p className="text-lg font-bold text-gray-900">{results.elementType.charAt(0).toUpperCase() + results.elementType.slice(1)}</p>
                      </div>

                      <div className="p-3 bg-purple-100 rounded border-l-2 border-purple-600">
                        <p className="text-xs text-gray-600">Construction Type</p>
                        <p className="text-lg font-bold text-gray-900">{results.constructionType}</p>
                      </div>
                    </div>

                    {!results.isCompliant && (
                      <div className="mt-4 p-3 bg-orange-100 rounded border-l-2 border-orange-600">
                        <p className="text-sm font-semibold text-orange-900 mb-1">📏 Recommended Thickness for Compliance</p>
                        <p className="text-lg font-bold text-orange-900">{results.recommendedThickness}mm</p>
                        <p className="text-xs text-orange-800">Increase thickness to meet Part L 2021 requirements</p>
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

                    <button
                      onClick={downloadResultsPDF}
                      className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                      aria-label="Download calculation results as PDF"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                      </svg>
                      Download Results (PDF)
                    </button>
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
          {/* USE CASE CARDS */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Calculate Insulation for Your Specific Project</h2>
            <p className="text-gray-600 mb-6">Select your project type for tailored calculations, tips, and guidance:</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link to="/calculators/insulation-calculator/loft-insulation" className="block p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg hover:shadow-md transition-shadow"><h3 className="font-bold text-amber-900 mb-1">Loft Insulation</h3><p className="text-sm text-amber-700">270mm target, mineral wool rolls</p></Link>
              <Link to="/calculators/insulation-calculator/cavity-wall-insulation" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow"><h3 className="font-bold text-blue-900 mb-1">Cavity Wall</h3><p className="text-sm text-blue-700">Blown or batt insulation</p></Link>
              <Link to="/calculators/insulation-calculator/solid-wall-internal" className="block p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg hover:shadow-md transition-shadow"><h3 className="font-bold text-purple-900 mb-1">Solid Wall (Internal)</h3><p className="text-sm text-purple-700">IWI insulated dry lining</p></Link>
              <Link to="/calculators/insulation-calculator/solid-wall-external" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow"><h3 className="font-bold text-green-900 mb-1">Solid Wall (External)</h3><p className="text-sm text-green-700">EWI render systems</p></Link>
              <Link to="/calculators/insulation-calculator/floor-insulation" className="block p-4 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-lg hover:shadow-md transition-shadow"><h3 className="font-bold text-orange-900 mb-1">Floor Insulation</h3><p className="text-sm text-orange-700">Suspended and solid floors</p></Link>
              <Link to="/calculators/insulation-calculator/room-in-roof" className="block p-4 bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow"><h3 className="font-bold text-cyan-900 mb-1">Room in Roof</h3><p className="text-sm text-cyan-700">Loft conversion insulation</p></Link>
              <Link to="/calculators/insulation-calculator/flat-roof" className="block p-4 bg-gradient-to-br from-slate-50 to-gray-50 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"><h3 className="font-bold text-slate-900 mb-1">Flat Roof</h3><p className="text-sm text-slate-700">Warm deck insulation</p></Link>
              <Link to="/calculators/insulation-calculator/new-build-walls" className="block p-4 bg-gradient-to-br from-teal-50 to-green-50 border border-teal-200 rounded-lg hover:shadow-md transition-shadow"><h3 className="font-bold text-teal-900 mb-1">New Build Walls</h3><p className="text-sm text-teal-700">Part L 2021 compliant</p></Link>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">

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
                  <li>• <strong>Surface Resistances:</strong> Walls Rsi=0.13/Rso=0.04, Roofs Rsi=0.10/Rso=0.04, Floors Rsi=0.17/Rso=0.04</li>
                </ul>
              </div>
            </div>
          </div>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding U-Values & Thermal Performance</h2>
            <p className="text-gray-700 mb-4">
              U-value measures thermal transmittance in W/m²K - how much heat passes through a building element. Lower U-values mean better insulation and less heat loss. The calculation includes surface film resistances (Rsi internal, Rso external), construction material layers, insulation layer, and any air gaps. Building Regulations Part L 2021 sets maximum U-values for different construction types.
            </p>
            <div className="bg-gray-50 p-4 rounded border-l-4 border-green-600 mb-4">
              <p className="text-sm text-gray-700"><strong>Core Formula:</strong> U-value = 1 / (Rsi + R construction + R insulation + R air gap + Rso). Rsi and Rso vary by element type and heat flow direction. This calculator uses correct values for walls, roofs, and floors.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">What is Thermal Resistance (R-value)?</h3>
                <p className="text-sm text-gray-700 mb-3">
                  R-value (m²K/W) measures insulation effectiveness. Higher R = better insulation. Calculated as thickness ÷ thermal conductivity (λ). Total R-value includes all layers: surface resistances, construction materials, insulation, and air gaps.
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• U-value = 1 / Total R-value (inverse relationship)</li>
                  <li>• Building regulations use U-values</li>
                  <li>• Each material layer contributes to total R</li>
                  <li>• SAP calculations require accurate U-values</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Insulation Material Lambda Values</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Thermal conductivity (λ-value) in W/mK determines insulation quality. Lower λ = better insulation = thinner needed. Premium materials cost more but achieve targets with less thickness, saving space.
                </p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Phenolic:</strong> λ 0.020 (best, thinnest)</li>
                  <li>• <strong>PIR:</strong> λ 0.023 (premium performance)</li>
                  <li>• <strong>EPS/Wood:</strong> λ 0.038 (good value)</li>
                  <li>• <strong>Cellulose/Hemp:</strong> λ 0.040 (natural)</li>
                  <li>• <strong>Mineral Wool:</strong> λ 0.044 (basic cost)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Construction Material & Air Gap Calculations</h2>
            <p className="text-gray-700 mb-4">
              U-value calculations account for all layers in the construction. Different construction materials (brick, block, plaster) have different R-values that affect total thermal resistance. Air gaps (cavities) also contribute to thermal resistance, with unventilated cavities having R=0.18 and ventilated cavities R=0.00.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Construction Material R-Values</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>100mm Brick:</strong> R = 0.13 m²K/W (λ 0.77)</li>
                  <li>• <strong>215mm Brick:</strong> R = 0.28 m²K/W (λ 0.77)</li>
                  <li>• <strong>100mm Aerated Block:</strong> R = 0.91 m²K/W (λ 0.11)</li>
                  <li>• <strong>100mm Dense Block:</strong> R = 0.33 m²K/W (λ 0.30)</li>
                  <li>• <strong>12.5mm Plasterboard:</strong> R = 0.05 m²K/W</li>
                  <li>• <strong>50mm Timber:</strong> R = 0.15 m²K/W (λ 0.13)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Surface Resistance Values (m²K/W)</h3>
                <p className="text-sm text-gray-700 mb-3">Vary by element type and heat flow direction:</p>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• <strong>Walls (Horizontal):</strong> Rsi 0.13, Rso 0.04</li>
                  <li>• <strong>Roofs (Upward):</strong> Rsi 0.10, Rso 0.04</li>
                  <li>• <strong>Floors (Downward):</strong> Rsi 0.17, Rso 0.04</li>
                  <li>• <strong>Unventilated Air Gap:</strong> R = 0.18</li>
                  <li>• <strong>Ventilated Air Gap:</strong> R = 0.00</li>
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
                <h3 className="font-bold text-gray-900 mb-3">Thickness Calculation Formula</h3>
                <p className="text-sm text-gray-700 mb-3 font-mono bg-gray-50 p-3 rounded">
                  Required thickness (mm) = (Target R-value - existing R) × λ-value × 1000
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
                <p className="text-sm text-gray-700">Thermal bridging occurs where materials with poor insulation cross insulation layers (studs, joists, beams). Reduces overall U-value performance per BS EN ISO 6946. Professional calculations use linear thermal transmittance (ψ-values) and correction factors (ΔU) to account for thermal bridges. This simplified calculator doesn't account for bridging - actual performance may be worse than calculated.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Do I need SAP calculations for my project?</h4>
                <p className="text-sm text-gray-700">Required for: New dwellings (Building Regulations compliance), EPC assessments, mortgage valuations, renewable energy grants. Recommended for: Extensions over 25% of wall area, major renovations. Simplified calculations sufficient for: Minor work, self-build planning, material selection. Obtain professional assessment if uncertain.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">Q: Why are surface resistances different for walls, roofs, and floors?</h4>
                <p className="text-sm text-gray-700">Surface resistances (Rsi/Rso) depend on heat flow direction and exposure. Walls have horizontal heat flow (Rsi 0.13). Roofs have upward heat flow - internal resistance lower (Rsi 0.10) because warm air rises. Floors have downward heat flow - internal resistance higher (Rsi 0.17) because warm air doesn't support downward movement. These values are per BS EN ISO 6946.</p>
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
                <p className="text-sm text-yellow-800 mb-2">This calculator provides simplified estimates using correct lambda values and surface resistances per BS EN ISO 6946. Complex constructions, thermal bridging corrections, air tightness, and renewable energy systems require professional SAP calculations. Building Control submissions must include accredited energy assessor reports. Non-compliance with Part L can result in failed inspections, remedial work costs, warranty voidance, and prosecution.</p>
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
                { item: `${results.thickness}mm Insulation Boards (Part L ${results.isCompliant ? 'compliant' : 'non-compliant'})`, quantity: results.area.toString(), unit: 'm²' },
                { item: 'Fixings & Adhesive', quantity: '1', unit: 'job' },
                { item: 'Installation Labour', quantity: '1', unit: 'job' },
                { item: 'SAP Calculation (accredited assessor)', quantity: '1', unit: 'survey' }
              ],
              summary: `${results.elementType.charAt(0).toUpperCase() + results.elementType.slice(1)} insulation - U-value: ${results.calculatedUValue} W/m²K ${results.isCompliant ? '(Part L 2021 compliant)' : `(Non-compliant - recommend ${results.recommendedThickness}mm)`} - ${results.area}m² @ ${results.thickness}mm ${getInsulationName(results.insulationType)} - Surface resistances: ${results.elementType === 'wall' ? 'Rsi 0.13, Rso 0.04' : results.elementType === 'roof' ? 'Rsi 0.10, Rso 0.04' : 'Rsi 0.17, Rso 0.04'} - Est. cost £${results.materialCost}`
            }}
            onClose={() => setShowQuoteGenerator(false)}
          />
        )}
      </div>
    </>
  )
}





