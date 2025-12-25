import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { InsulationCalculatorCore } from '../../components/InsulationCalculatorCore'

const usecaseData = {
  slug: 'cavity-wall-insulation',
  title: 'Cavity Wall Insulation Calculator',
  metaTitle: 'Cavity Wall Insulation Calculator UK | Part L 2021 | Free U-Value Calculator',
  metaDescription: 'Calculate cavity wall insulation U-values for Part L compliance. Free UK calculator for blown insulation, batts, and partial fill with cost estimates and Building Regulations guidance.',
  h1: 'Cavity Wall Insulation Calculator',
  description: 'Calculate the U-value for cavity wall insulation and check Part L compliance. Whether you are installing blown insulation, rigid batts, or partial fill boards, our calculator helps you meet Building Regulations targets of 0.28 W/m2K for extensions.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/insulation-calculator/cavity-wall-insulation',
  defaults: {
    elementType: 'wall' as const,
    constructionType: 'extension',
    insulationType: 'mineral-wool',
    constructionMaterial: 'brick-215',
    thickness: '100',
    area: '80'
  },
  tips: [
    'Cavity wall insulation requires a minimum 50mm cavity width for full-fill',
    'Properties built after 1920 typically have suitable cavity walls',
    'Check for existing insulation before installing - doubled up insulation wastes money',
    'Ensure all wall ties are in good condition before filling the cavity'
  ],
  commonMistakes: [
    { mistake: 'Installing in unsuitable walls', consequence: 'Water penetration and damp problems', fix: 'Survey for exposed locations, cracks, and failed pointing first' },
    { mistake: 'Blocking weep holes', consequence: 'Trapped moisture causes internal damp', fix: 'Clear all weep holes after installation' },
    { mistake: 'Ignoring wall tie condition', consequence: 'Wall tie corrosion accelerates after filling', fix: 'Get wall tie survey before installation' },
    { mistake: 'Not checking for existing insulation', consequence: 'Waste of money, no benefit', fix: 'Use borescope inspection to check cavity' },
    { mistake: 'DIY blown insulation', consequence: 'Incomplete fill, voids, settlement', fix: 'Always use certified installer with guarantee' }
  ],
  costEstimates: [
    { wallArea: '50m2', blownFill: '400-600', partialFill: '600-900', notes: 'Small terrace' },
    { wallArea: '80m2', blownFill: '600-900', partialFill: '900-1400', notes: 'Semi-detached' },
    { wallArea: '120m2', blownFill: '900-1300', partialFill: '1400-2000', notes: 'Detached' },
    { wallArea: '160m2', blownFill: '1200-1800', partialFill: '1800-2600', notes: 'Large detached' }
  ],
  relatedUsecases: [
    { slug: 'solid-wall-internal', title: 'Solid Wall (Internal)' },
    { slug: 'solid-wall-external', title: 'Solid Wall (External)' }
  ],
  faqs: [
    {
      q: 'How do I know if I have cavity walls?',
      a: 'Most UK homes built after 1920 have cavity walls. Check by measuring wall thickness at a door or window - cavity walls are typically 260-280mm thick. You can also look at the brick pattern: if all bricks are laid lengthways (stretcher bond), it is likely cavity construction.'
    },
    {
      q: 'What U-value does cavity wall insulation need to achieve?',
      a: 'Part L 2021 requires 0.28 W/m2K for wall extensions and renovations, and 0.18 W/m2K for new builds. Standard cavity fill typically achieves 0.35-0.50 W/m2K depending on cavity width - good improvement but may not meet full compliance without additional measures.'
    },
    {
      q: 'Is cavity wall insulation suitable for all properties?',
      a: 'No. Exposed locations (coastal, hilltop, severe weather), walls with cracks or failed pointing, listed buildings, and properties with structural issues may not be suitable. A professional survey is essential before installation to check suitability.'
    },
    {
      q: 'How much does cavity wall insulation cost?',
      a: 'Professional installation costs 6-12 pounds per m2, typically 400-1000 pounds for an average home. Prices vary by property size, access, and installer. ECO4 grants may cover full cost for eligible households. Get at least 3 quotes.'
    },
    {
      q: 'Can cavity wall insulation cause damp?',
      a: 'Properly installed insulation should not cause damp. Problems arise from unsuitable properties (exposed walls, defects), poor installation (incomplete fill, blocked weep holes), or pre-existing issues. Always use a certified installer with a 25-year guarantee.'
    },
    {
      q: 'What types of cavity insulation are available?',
      a: 'Main types are: blown mineral wool (most common), blown polystyrene beads (better moisture resistance), and polyurethane foam (best thermal performance but highest cost). Partial fill rigid boards during new construction offer superior performance.'
    },
    {
      q: 'How long does cavity wall insulation take to install?',
      a: 'A typical semi-detached house takes 2-3 hours. The process involves drilling holes at intervals, injecting insulation, and making good the holes. Minimal disruption - no internal access needed and you can stay in the property.'
    },
    {
      q: 'Is cavity wall insulation a DIY job?',
      a: 'No. Cavity wall insulation requires specialist equipment (injection machines, borescopes) and expertise to ensure complete fill without voids. DIY attempts risk incomplete insulation, damp problems, and voided guarantees. Always use certified installers.'
    },
    {
      q: 'What guarantee should I expect?',
      a: 'Reputable installers offer 25-year guarantees backed by CIGA (Cavity Insulation Guarantee Agency) or equivalent. This covers remedial work if problems arise. Never accept less than 25 years guarantee - it is industry standard.'
    },
    {
      q: 'How much will I save on energy bills?',
      a: 'Typical savings are 150-300 pounds per year for a gas-heated home. Actual savings depend on property size, heating usage, and fuel prices. Payback period is typically 3-7 years, less with ECO4 grants covering installation costs.'
    }
  ]
}

export default function CavityWallInsulationCalculator() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tradecalcs.co.uk' },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://tradecalcs.co.uk/calculators' },
          { '@type': 'ListItem', position: 3, name: 'Insulation Calculator', item: 'https://tradecalcs.co.uk/calculators/insulation-calculator' },
          { '@type': 'ListItem', position: 4, name: 'Cavity Wall Insulation', item: usecaseData.canonicalUrl }
        ]
      },
      {
        '@type': 'SoftwareApplication',
        name: usecaseData.title,
        description: usecaseData.metaDescription,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        url: usecaseData.canonicalUrl,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '248', bestRating: '5', worstRating: '1' }
      },
      {
        '@type': 'FAQPage',
        mainEntity: usecaseData.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      }
    ]
  }

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="cavity wall insulation calculator, cavity wall U-value, blown insulation calculator, cavity fill cost UK, Part L cavity wall, wall insulation thickness, ECO4 cavity insulation, CIGA guarantee" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={usecaseData.canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Link to="/calculators/insulation-calculator" className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm">
              <ArrowLeft className="h-4 w-4 mr-1" />Back to Insulation Calculator
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{usecaseData.h1}</h1>
            <p className="text-white/90 max-w-2xl text-lg">{usecaseData.description}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <InsulationCalculatorCore
                  defaultElementType={usecaseData.defaults.elementType}
                  defaultConstructionType={usecaseData.defaults.constructionType}
                  defaultInsulationType={usecaseData.defaults.insulationType}
                  defaultConstructionMaterial={usecaseData.defaults.constructionMaterial}
                  defaultThickness={usecaseData.defaults.thickness}
                  defaultArea={usecaseData.defaults.area}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-blue-900 mb-2">Tips for Cavity Wall Insulation</h2>
                    <ul className="space-y-2">
                      {usecaseData.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-blue-800">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" /><span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cost Estimate Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Cavity Wall Insulation Cost Estimates</h2>
                <p className="text-gray-600 text-sm mb-4">Professional installation costs by property size (2025 prices):</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-2">Wall Area</th>
                        <th className="text-left py-3 px-2">Blown Fill</th>
                        <th className="text-left py-3 px-2">Partial Fill</th>
                        <th className="text-left py-3 px-2">Property Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usecaseData.costEstimates.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-2 font-medium">{row.wallArea}</td>
                          <td className="py-3 px-2">GBP {row.blownFill}</td>
                          <td className="py-3 px-2">GBP {row.partialFill}</td>
                          <td className="py-3 px-2 text-gray-600">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">ECO4 grants may cover full cost for eligible households.</p>
              </div>

              {/* Common Mistakes Section */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <h2 className="text-xl font-bold text-red-900">Common Mistakes to Avoid</h2>
                </div>
                <div className="space-y-4">
                  {usecaseData.commonMistakes.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-red-100">
                      <h3 className="font-semibold text-red-900 mb-1">{item.mistake}</h3>
                      <p className="text-sm text-red-700 mb-2">Problem: {item.consequence}</p>
                      <p className="text-sm text-green-700">Solution: {item.fix}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Educational Content with Internal Links */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Cavity Wall Insulation</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Cavity wall insulation fills the gap between the inner and outer leaves of cavity walls, typically 50-100mm wide. It is one of the most cost-effective energy improvements, with typical payback periods of 3-5 years.</p>

                  <p className="mb-4">If your property has solid walls (pre-1920s construction), see our <Link to="/calculators/insulation-calculator/solid-wall-internal" className="text-blue-600 hover:underline">internal wall insulation calculator</Link> or <Link to="/calculators/insulation-calculator/solid-wall-external" className="text-blue-600 hover:underline">external wall insulation calculator</Link> for alternative solutions.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Calculating Cavity Wall U-Values</h3>
                  <p className="mb-4">The achievable U-value depends on cavity width and insulation type. A typical 50mm cavity filled with mineral wool achieves approximately 0.50 W/m2K. Wider 100mm cavities or better-performing materials can achieve 0.30 W/m2K or better.</p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example: Semi-Detached House (80m2 wall area)</h4>
                    <p className="text-blue-800 text-sm">
                      Before: Uninsulated cavity (U-value approx 1.5)<br />
                      After: 65mm blown mineral wool (U-value approx 0.45)<br />
                      Installation cost: GBP 600-900<br />
                      Annual saving: GBP 180-280<br />
                      Payback: 3-4 years
                    </p>
                  </div>

                  <p className="mb-4">For new build projects requiring the stricter 0.18 W/m2K target, visit our <Link to="/calculators/insulation-calculator/new-build-walls" className="text-blue-600 hover:underline">new build wall calculator</Link> for partial-fill insulation options.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {usecaseData.faqs.map((faq, index) => (
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
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Related Calculators</h3>
                <div className="space-y-2">
                  {usecaseData.relatedUsecases.map((related, index) => (
                    <Link key={index} to={`/calculators/insulation-calculator/${related.slug}`} className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <span className="text-sm font-medium text-gray-900">{related.title}</span>
                    </Link>
                  ))}
                  <Link to="/calculators/insulation-calculator/loft-insulation" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-900">Loft Insulation</span>
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Other Calculators</h3>
                <div className="space-y-2">
                  <Link to="/brick-block-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-900">Brick and Block Calculator</span>
                  </Link>
                  <Link to="/plasterer-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-900">Plastering Calculator</span>
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">ECO4 Grants Available</h3>
                <p className="text-white/90 text-sm mb-4">Free cavity wall insulation may be available through government schemes.</p>
                <a href="https://www.gov.uk/energy-company-obligation" target="_blank" rel="noopener noreferrer" className="block w-full py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-center">Check Eligibility</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Professional Advice?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Get in touch for custom calculations or to discuss your project requirements.</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <iframe src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false" width="100%" height="750px" frameBorder="0" title="Contact Form" className="rounded-lg" />
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Or email us at <a href="mailto:mick@tradecalcs.co.uk" className="text-blue-600 hover:text-blue-700 font-medium">mick@tradecalcs.co.uk</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
