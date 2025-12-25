import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { InsulationCalculatorCore } from '../../components/InsulationCalculator'

const usecaseData = {
  slug: 'room-in-roof',
  title: 'Room in Roof Insulation Calculator',
  metaTitle: 'Room in Roof Insulation Calculator UK | Loft Conversion | Part L 2021 | TradeCalcs',
  metaDescription: 'Calculate room-in-roof insulation for loft conversions. Free UK calculator with U-value targets, thickness requirements, and Part L 2021 compliance for habitable loft spaces.',
  h1: 'Room in Roof Insulation Calculator',
  description: 'Calculate U-values for room-in-roof insulation in loft conversions. When converting a loft to habitable space, insulation must go between and over the rafters to meet Part L requirements of 0.16 W/m²K for roof extensions.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/insulation-calculator/room-in-roof',
  defaults: {
    elementType: 'roof' as const,
    constructionType: 'extension',
    insulationType: 'pir',
    thickness: '120',
    area: '35'
  },
  tips: [
    'Between-rafter + over-rafter insulation achieves best U-values',
    'Use breathable membrane over insulation before tiles',
    'Allow 50mm ventilation gap above insulation in cold roofs',
    'PIR boards maximise headroom with thinner profiles'
  ],
  commonMistakes: [
    { mistake: 'Insufficient thickness between rafters', consequence: 'Cannot achieve target U-value', fix: 'Add over-rafter or under-rafter insulation layer' },
    { mistake: 'No ventilation gap', consequence: 'Condensation, timber rot, mould', fix: 'Maintain 50mm gap above insulation in cold roofs' },
    { mistake: 'Gaps at rafter edges', consequence: 'Thermal bridging, cold spots, draughts', fix: 'Cut boards tightly, seal with low-expansion foam' },
    { mistake: 'No vapour control layer', consequence: 'Moisture migration into insulation', fix: 'Install VCL on warm side of insulation' },
    { mistake: 'Forgetting dormer cheeks', consequence: 'Cold walls in dormers, condensation', fix: 'Insulate dormer walls to wall U-value standard' }
  ],
  costEstimates: [
    { roofArea: '20m²', betweenRafters: '800-1200', overRafters: '1500-2200', notes: 'Small dormer' },
    { roofArea: '35m²', betweenRafters: '1400-2100', overRafters: '2600-3800', notes: 'Single room conversion' },
    { roofArea: '50m²', betweenRafters: '2000-3000', overRafters: '3800-5500', notes: 'Double bedroom' },
    { roofArea: '70m²', betweenRafters: '2800-4200', overRafters: '5300-7700', notes: 'Full floor conversion' }
  ],
  relatedUsecases: [
    { slug: 'loft-insulation', title: 'Loft Insulation' },
    { slug: 'flat-roof', title: 'Flat Roof' }
  ],
  faqs: [
    {
      q: 'What U-value does a room-in-roof need to achieve?',
      a: 'Room-in-roof conversions are treated as roof extensions under Part L 2021, requiring a U-value of 0.16 W/m²K. This is stricter than the 0.15 W/m²K for new build roofs but more achievable than loft-level insulation because you can use high-performance rigid boards.'
    },
    {
      q: 'How thick does room-in-roof insulation need to be?',
      a: 'Typically 120-150mm of PIR (lambda 0.023) between rafters plus 25-50mm over rafters achieves 0.16 W/m²K. With mineral wool alone, you would need 200mm+ which often exceeds rafter depth. Combination systems work best for most conversions.'
    },
    {
      q: 'What is the difference between warm and cold roof construction?',
      a: 'Cold roof: insulation between rafters with ventilation gap above. Warm roof: insulation above rafters (over-rafters) with no ventilation needed. Warm roofs perform better but require re-roofing. Most conversions use cold roof with good vapour control.'
    },
    {
      q: 'Do I need Building Regulations approval for loft insulation?',
      a: 'If simply adding insulation to an existing loft - no. If converting to habitable space (loft conversion) - yes, full Building Regulations approval required. This includes structural calculations, fire safety, means of escape, and thermal performance compliance.'
    },
    {
      q: 'How do I insulate sloping ceilings?',
      a: 'Install rigid insulation boards (PIR/phenolic) between rafters, cut to fit tightly. Add battens and second layer if needed. Finish with plasterboard. For maximum performance, add continuous layer of insulated plasterboard under rafters.'
    },
    {
      q: 'What about dormer windows and cheeks?',
      a: 'Dormer cheeks (vertical walls) must meet wall U-value targets (0.28 W/m²K for extensions). Use same insulation approach as external walls. Dormer roof follows room-in-roof standards. Detail carefully around window frames to prevent thermal bridging.'
    },
    {
      q: 'Can I use multifoil insulation in a loft conversion?',
      a: 'Multifoil alone rarely achieves required U-values without significant air gaps. Building Control may not accept manufacturer claims. Best used in combination with other insulation. Get U-value calculations approved before installation.'
    },
    {
      q: 'How do I prevent condensation in a room-in-roof?',
      a: 'Install vapour control layer on warm side of insulation, ensure adequate ventilation above insulation (cold roof), or use warm roof construction. Good air tightness at junctions prevents moist air entering insulation zone.'
    },
    {
      q: 'What is the cost of room-in-roof insulation?',
      a: 'DIY materials cost 40-60 pounds per m² for PIR plus plasterboard. Professional installation 80-150 pounds per m² depending on complexity. A typical 35m² loft conversion insulation costs 1400-5000 pounds. Full conversion costs 30000-50000 pounds.'
    },
    {
      q: 'Do I need to insulate the flat ceiling areas too?',
      a: 'Yes, all thermal envelope surfaces need insulating. Where sloping ceiling meets flat ceiling (purlin level), continue insulation across. Triangular spaces at eaves are often forgotten - insulate these to at least loft standard.'
    }
  ]
}

export default function RoomInRoofCalculator() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tradecalcs.co.uk' },
          { '@type': 'ListItem', position: 2, name: 'Insulation Calculator', item: 'https://tradecalcs.co.uk/calculators/insulation-calculator' },
          { '@type': 'ListItem', position: 3, name: 'Room in Roof', item: usecaseData.canonicalUrl }
        ]
      },
      {
        '@type': 'SoftwareApplication',
        name: usecaseData.title,
        description: usecaseData.metaDescription,
        applicationCategory: 'UtilitiesApplication',
        url: usecaseData.canonicalUrl,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '176', bestRating: '5', worstRating: '1' }
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
        <meta name="keywords" content="room in roof insulation, loft conversion insulation, rafter insulation, Part L roof, sloping ceiling insulation, dormer insulation, warm roof, cold roof UK" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={usecaseData.canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-cyan-500 to-sky-500 text-white py-12">
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
                  defaultThickness={usecaseData.defaults.thickness}
                  defaultArea={usecaseData.defaults.area}
                />
              </div>

              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-cyan-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-cyan-900 mb-2">Tips for Room-in-Roof Insulation</h2>
                    <ul className="space-y-2">
                      {usecaseData.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-cyan-800">
                          <CheckCircle2 className="h-4 w-4 text-cyan-600 flex-shrink-0 mt-0.5" /><span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cost Estimate Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Room-in-Roof Insulation Cost Estimates</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-2">Roof Area</th>
                        <th className="text-left py-3 px-2">Between Rafters</th>
                        <th className="text-left py-3 px-2">+ Over Rafters</th>
                        <th className="text-left py-3 px-2">Project Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usecaseData.costEstimates.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-2 font-medium">{row.roofArea}</td>
                          <td className="py-3 px-2">£{row.betweenRafters}</td>
                          <td className="py-3 px-2">£{row.overRafters}</td>
                          <td className="py-3 px-2 text-gray-600">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">Prices include materials and labour. VAT may apply for new builds.</p>
              </div>

              {/* Common Mistakes */}
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

              {/* Educational Content */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Room-in-Roof Insulation</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Room-in-roof insulation is required when converting a loft into habitable living space. Unlike simple loft insulation laid on the ceiling, room-in-roof insulation follows the roof slope between and over the rafters, creating a warm, usable space.</p>

                  <p className="mb-4">For standard <Link to="/calculators/insulation-calculator/loft-insulation" className="text-cyan-600 hover:underline">loft insulation</Link> (uninhabited lofts), insulation goes on the ceiling. For conversions, consider combining with <Link to="/calculators/insulation-calculator/solid-wall-internal" className="text-cyan-600 hover:underline">internal wall insulation</Link> for dormers.</p>

                  <div className="bg-cyan-50 border-l-4 border-cyan-500 p-4 my-4">
                    <h4 className="font-semibold text-cyan-900 mb-2">Example: 35m² Loft Conversion</h4>
                    <p className="text-cyan-800 text-sm">
                      Rafter depth: 100mm<br />
                      Solution: 100mm PIR between rafters + 25mm PIR under rafters<br />
                      U-value achieved: ~0.14 W/m²K (exceeds 0.16 target)<br />
                      Cost: £2500-4000 installed (insulation only)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {usecaseData.faqs.map((faq, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50">
                        <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                        {expandedFaq === index ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
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
                    <Link key={index} to={`/calculators/insulation-calculator/${related.slug}`} className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                      <span className="text-sm font-medium text-gray-900">{related.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4">
                <h3 className="font-semibold text-cyan-900 mb-2">Building Regulations</h3>
                <p className="text-sm text-cyan-800 mb-3">Loft conversions require full Building Regulations approval including:</p>
                <ul className="text-sm text-cyan-800 space-y-1">
                  <li>• Structural calculations</li>
                  <li>• Fire safety (30-min doors, escape)</li>
                  <li>• Thermal performance</li>
                  <li>• Staircase regulations</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Other Calculators</h3>
                <div className="space-y-2">
                  <Link to="/joinery-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="text-sm font-medium text-gray-900">Joinery Calculator</span>
                  </Link>
                  <Link to="/plasterer-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="text-sm font-medium text-gray-900">Plastering Calculator</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Professional Advice?</h2>
              <p className="text-gray-600">Get in touch for custom calculations or project guidance.</p>
            </div>
            <div className="max-w-2xl mx-auto">
              <iframe src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false" width="100%" height="750px" frameBorder="0" title="Contact Form" className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
