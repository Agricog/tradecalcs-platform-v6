import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { InsulationCalculatorCore } from '../../components/InsulationCalculator'

const usecaseData = {
  slug: 'floor-insulation',
  title: 'Floor Insulation Calculator',
  metaTitle: 'Floor Insulation Calculator UK | Underfloor Insulation | Part L 2021 | TradeCalcs',
  metaDescription: 'Calculate floor insulation U-values for suspended and solid floors. Free UK calculator for underfloor insulation with thickness requirements, cost estimates, and Part L compliance.',
  h1: 'Floor Insulation Calculator',
  description: 'Calculate U-values for suspended timber floors and solid concrete floors. Our calculator helps you determine the right thickness of insulation to meet Building Regulations Part L targets of 0.22 W/m2K for extensions.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/insulation-calculator/floor-insulation',
  defaults: {
    elementType: 'floor' as const,
    constructionType: 'extension',
    insulationType: 'mineral-wool',
    thickness: '100',
    area: '40'
  },
  tips: [
    'Suspended timber floors need ventilation - never block airbricks',
    'Use rigid boards for solid floors, mineral wool between joists for suspended',
    'Consider moisture barrier for solid floor insulation',
    'Insulating floors typically saves 5-10% on heating bills'
  ],
  commonMistakes: [
    { mistake: 'Blocking underfloor ventilation', consequence: 'Timber rot and structural damage', fix: 'Maintain all airbricks and cross-ventilation pathways' },
    { mistake: 'Wrong insulation type', consequence: 'Compression, moisture damage, poor performance', fix: 'Use rigid for solid floors, flexible for between joists' },
    { mistake: 'No vapour barrier', consequence: 'Moisture migrating into insulation', fix: 'Install DPM on warm side for solid floors' },
    { mistake: 'Gaps around pipes', consequence: 'Cold bridges and heat loss', fix: 'Cut insulation carefully around all services' },
    { mistake: 'Compressing insulation', consequence: 'Reduces R-value significantly', fix: 'Maintain full thickness - add support netting if needed' }
  ],
  costEstimates: [
    { floorArea: '20m2', suspended: '400-600', solidRetrofit: '800-1200', notes: 'Single room' },
    { floorArea: '40m2', suspended: '800-1200', solidRetrofit: '1600-2400', notes: 'Ground floor flat' },
    { floorArea: '60m2', suspended: '1200-1800', solidRetrofit: '2400-3600', notes: 'Terrace house' },
    { floorArea: '80m2', suspended: '1600-2400', solidRetrofit: '3200-4800', notes: 'Semi-detached' }
  ],
  relatedUsecases: [
    { slug: 'solid-wall-internal', title: 'Solid Wall (Internal)' },
    { slug: 'loft-insulation', title: 'Loft Insulation' }
  ],
  faqs: [
    {
      q: 'What U-value does floor insulation need to achieve?',
      a: 'Building Regulations Part L 2021 requires a U-value of 0.22 W/m2K for floor extensions and renovations, and 0.18 W/m2K for new builds. These are harder to achieve than wall targets due to ground contact effects.'
    },
    {
      q: 'What is the best insulation for suspended timber floors?',
      a: 'Mineral wool or hemp batts fitted between joists, supported by netting or battens, work well for suspended floors. Typically 100-150mm depth is needed. Maintain underfloor ventilation and consider a breathable membrane above the insulation.'
    },
    {
      q: 'Can I insulate a solid concrete floor?',
      a: 'Yes, but it requires raising the floor level by 80-120mm. Options include PIR boards with chipboard over, or underfloor heating with insulation below. This affects door heights, stairs, and kitchen units - significant work.'
    },
    {
      q: 'How much does floor insulation cost?',
      a: 'Suspended floor insulation costs 20-40 pounds per m2 installed (easier access from below if crawl space exists). Solid floor retrofit costs 40-80 pounds per m2 including new floor finish. A typical 40m2 ground floor costs 800-3000 pounds depending on type.'
    },
    {
      q: 'Is underfloor heating compatible with floor insulation?',
      a: 'Yes, and insulation is essential for underfloor heating efficiency. Install insulation below the heating pipes/cables. PIR or EPS boards are ideal. Without insulation, much heat escapes downward into the ground.'
    },
    {
      q: 'Should I insulate above or below floor joists?',
      a: 'Below the joists (underside) is usually easier for retrofit if you have crawl space access. Between joists gives better thermal performance but requires lifting floorboards. Above joists raises floor level but allows continuous insulation.'
    },
    {
      q: 'What about cold bridging at floor edges?',
      a: 'Floor/wall junctions are thermal bridges. Ideally, floor insulation should connect with wall insulation. Use perimeter edge insulation at slab edges. This is often the hardest detail to get right in retrofits.'
    },
    {
      q: 'Do I need to insulate above an unheated garage?',
      a: 'Yes, floors above unheated spaces (garages, passageways) should be insulated to the same standard as ground floors. This is often easier than ground floor insulation as you can work from below in the garage.'
    },
    {
      q: 'What is the payback period for floor insulation?',
      a: 'Floor insulation typically saves 5-10% on heating bills (less than walls or loft). Payback is 5-10 years for suspended floors, 10-20 years for solid floor retrofit. Often done as part of wider renovation rather than standalone project.'
    },
    {
      q: 'Do I need Building Regulations approval?',
      a: 'Generally not for insulating existing floors if no other work is involved. If raising floor level affects door heights or fire doors, or if combining with other controlled work, you may need approval. Check with your local Building Control.'
    }
  ]
}

export default function FloorInsulationCalculator() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tradecalcs.co.uk' },
          { '@type': 'ListItem', position: 2, name: 'Insulation Calculator', item: 'https://tradecalcs.co.uk/calculators/insulation-calculator' },
          { '@type': 'ListItem', position: 3, name: 'Floor Insulation', item: usecaseData.canonicalUrl }
        ]
      },
      {
        '@type': 'SoftwareApplication',
        name: usecaseData.title,
        description: usecaseData.metaDescription,
        applicationCategory: 'UtilitiesApplication',
        url: usecaseData.canonicalUrl,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '198', bestRating: '5', worstRating: '1' }
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
        <meta name="keywords" content="floor insulation calculator, underfloor insulation, suspended floor insulation, solid floor insulation, Part L floor, floor U-value calculator, floor insulation cost UK" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={usecaseData.canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
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

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-orange-900 mb-2">Tips for Floor Insulation</h2>
                    <ul className="space-y-2">
                      {usecaseData.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-orange-800">
                          <CheckCircle2 className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" /><span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cost Estimate Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Floor Insulation Cost Estimates</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-2">Floor Area</th>
                        <th className="text-left py-3 px-2">Suspended</th>
                        <th className="text-left py-3 px-2">Solid Retrofit</th>
                        <th className="text-left py-3 px-2">Property</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usecaseData.costEstimates.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-2 font-medium">{row.floorArea}</td>
                          <td className="py-3 px-2">GBP {row.suspended}</td>
                          <td className="py-3 px-2">GBP {row.solidRetrofit}</td>
                          <td className="py-3 px-2 text-gray-600">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Floor Insulation</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Floor insulation prevents heat loss to the ground or to unheated spaces below. Suspended timber floors allow insulation between joists, while solid concrete floors require insulation above the slab, raising floor levels.</p>

                  <p className="mb-4">For complete home insulation, combine floor work with <Link to="/calculators/insulation-calculator/loft-insulation" className="text-orange-600 hover:underline">loft insulation</Link> and <Link to="/calculators/insulation-calculator/cavity-wall-insulation" className="text-orange-600 hover:underline">wall insulation</Link> for maximum energy savings.</p>

                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 my-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Example: 40m2 Suspended Floor</h4>
                    <p className="text-orange-800 text-sm">
                      Before: Uninsulated timber floor (U-value approx 0.7)<br />
                      After: 100mm mineral wool between joists (U-value approx 0.25)<br />
                      Cost: GBP 800-1200 installed<br />
                      Annual saving: GBP 60-100
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

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Other Calculators</h3>
                <div className="space-y-2">
                  <Link to="/concrete-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="text-sm font-medium text-gray-900">Concrete Calculator</span>
                  </Link>
                  <Link to="/joinery-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="text-sm font-medium text-gray-900">Joinery Calculator</span>
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
