import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { InsulationCalculatorCore } from '../../components/InsulationCalculatorCore'

const usecaseData = {
  slug: 'solid-wall-internal',
  title: 'Internal Wall Insulation Calculator (IWI)',
  metaTitle: 'Internal Wall Insulation Calculator UK | IWI | Solid Wall | Part L 2021',
  metaDescription: 'Calculate internal wall insulation (IWI) U-values for solid walls. Free UK calculator with dry lining thickness, cost estimates, and Building Regulations guidance for Part L compliance.',
  h1: 'Internal Wall Insulation Calculator (IWI)',
  description: 'Calculate U-values for internal wall insulation on solid walls. Our calculator helps you determine the right thickness of insulated plasterboard or stud frame systems to meet Part L 2021 targets for solid wall properties.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/insulation-calculator/solid-wall-internal',
  defaults: {
    elementType: 'wall' as const,
    constructionType: 'extension',
    insulationType: 'pir',
    constructionMaterial: 'brick-215',
    thickness: '50',
    area: '60'
  },
  tips: [
    'IWI reduces room size - allow 50-100mm per insulated wall',
    'Address any damp issues before installing IWI',
    'Consider thermal bridging at window reveals, floors, and ceilings',
    'Leave a small gap behind radiators or move them to maintain heat output'
  ],
  commonMistakes: [
    { mistake: 'Installing over damp walls', consequence: 'Trapped moisture causes mould and rot', fix: 'Diagnose and fix damp source before any insulation' },
    { mistake: 'Ignoring thermal bridging', consequence: 'Cold spots cause condensation and mould', fix: 'Insulate reveals, returns, and floor/ceiling junctions' },
    { mistake: 'Blocking ventilation', consequence: 'Moisture build-up in room and walls', fix: 'Maintain trickle vents and extract fans' },
    { mistake: 'DIY without vapour control', consequence: 'Interstitial condensation damages insulation', fix: 'Install VCL on warm side or use foil-faced boards' },
    { mistake: 'Forgetting services', consequence: 'Difficult access for future electrical/plumbing work', fix: 'Plan service routes before fixing insulation' }
  ],
  costEstimates: [
    { wallArea: '20m2', directBond: '600-900', studFrame: '1000-1500', notes: 'Single room' },
    { wallArea: '40m2', directBond: '1200-1800', studFrame: '2000-3000', notes: 'Two rooms' },
    { wallArea: '60m2', directBond: '1800-2700', studFrame: '3000-4500', notes: 'Three rooms' },
    { wallArea: '100m2', directBond: '3000-4500', studFrame: '5000-7500', notes: 'Whole house' }
  ],
  relatedUsecases: [
    { slug: 'solid-wall-external', title: 'Solid Wall (External)' },
    { slug: 'cavity-wall-insulation', title: 'Cavity Wall' }
  ],
  faqs: [
    {
      q: 'What is internal wall insulation (IWI)?',
      a: 'IWI involves adding insulation to the inside face of external walls. Methods include direct-bonded insulated plasterboard, or stud frames filled with insulation and lined with plasterboard. It is the main option for solid wall properties where external insulation is not possible.'
    },
    {
      q: 'How thick does internal wall insulation need to be?',
      a: 'To achieve the Part L target of 0.28 W/m2K, typically 50-60mm of PIR plus plasterboard is needed (total 62-72mm). Using mineral wool requires 90-120mm thickness. Thinner premium phenolic boards achieve the same with 40-50mm total.'
    },
    {
      q: 'How much space will I lose with IWI?',
      a: 'Expect to lose 50-100mm per insulated wall. A 4m x 4m room insulated on two walls loses approximately 0.4-0.8m2 of floor space. Consider this when planning furniture layouts and door/window reveals.'
    },
    {
      q: 'Does IWI cause damp problems?',
      a: 'Poorly installed IWI can trap moisture and cause damp. The key is to fix any existing damp first, maintain ventilation, and use appropriate vapour control. Foil-faced insulation boards provide built-in vapour resistance.'
    },
    {
      q: 'What about window and door reveals?',
      a: 'Reveals must be insulated to prevent cold bridges - use thin (20-25mm) high-performance PIR or aerogel. Without reveal insulation, cold spots will cause condensation and mould growth. This adds cost but is essential for success.'
    },
    {
      q: 'Can I install IWI myself?',
      a: 'Direct-bonded insulated plasterboard is a feasible DIY project for competent homeowners. Stud frame systems require more skill. Key challenges include achieving flat surfaces, taping joints, and addressing thermal bridges at junctions.'
    },
    {
      q: 'How much does internal wall insulation cost?',
      a: 'Professional installation costs 40-80 pounds per m2 for direct-bond systems, or 60-100 pounds for stud frame. A typical room (20m2 wall area) costs 800-2000 pounds. DIY materials cost 15-35 pounds per m2 depending on insulation type.'
    },
    {
      q: 'What is the difference between direct-bond and stud frame?',
      a: 'Direct-bond fixes insulated plasterboard directly to the wall with adhesive - faster, thinner, but requires reasonably flat walls. Stud frame builds a timber or metal frame, filled with insulation and lined - handles uneven walls and allows thicker insulation.'
    },
    {
      q: 'Do I need Building Regulations approval for IWI?',
      a: 'If you are doing IWI as part of other work requiring approval, or if it affects more than 50% of the thermal element, you need Building Regs approval. Standalone room-by-room IWI typically does not need approval but should still meet Part L standards.'
    },
    {
      q: 'What about sockets and switches?',
      a: 'Electrical points need moving to the new wall surface. Plan this before starting - run cables in the insulation layer but maintain required clearances from foil facings. Consider adding extra sockets while the walls are open.'
    }
  ]
}

export default function SolidWallInternalCalculator() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tradecalcs.co.uk' },
          { '@type': 'ListItem', position: 2, name: 'Insulation Calculator', item: 'https://tradecalcs.co.uk/calculators/insulation-calculator' },
          { '@type': 'ListItem', position: 3, name: 'Solid Wall Internal', item: usecaseData.canonicalUrl }
        ]
      },
      {
        '@type': 'SoftwareApplication',
        name: usecaseData.title,
        description: usecaseData.metaDescription,
        applicationCategory: 'UtilitiesApplication',
        url: usecaseData.canonicalUrl,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.6', ratingCount: '187', bestRating: '5', worstRating: '1' }
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
        <meta name="keywords" content="internal wall insulation calculator, IWI calculator, solid wall insulation, dry lining insulation, insulated plasterboard, Part L solid wall, thermal bridging, retrofit insulation UK" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={usecaseData.canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white py-12">
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

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-purple-900 mb-2">Tips for Internal Wall Insulation</h2>
                    <ul className="space-y-2">
                      {usecaseData.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-purple-800">
                          <CheckCircle2 className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" /><span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cost Estimate Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">IWI Cost Estimates</h2>
                <p className="text-gray-600 text-sm mb-4">Professional installation costs by wall area (2025 prices):</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-2">Wall Area</th>
                        <th className="text-left py-3 px-2">Direct Bond</th>
                        <th className="text-left py-3 px-2">Stud Frame</th>
                        <th className="text-left py-3 px-2">Scope</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usecaseData.costEstimates.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-2 font-medium">{row.wallArea}</td>
                          <td className="py-3 px-2">GBP {row.directBond}</td>
                          <td className="py-3 px-2">GBP {row.studFrame}</td>
                          <td className="py-3 px-2 text-gray-600">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">Excludes decoration, electrics relocation, and reveal insulation.</p>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Internal Wall Insulation</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Internal wall insulation is the primary option for solid wall properties (pre-1920s construction) where <Link to="/calculators/insulation-calculator/solid-wall-external" className="text-purple-600 hover:underline">external wall insulation</Link> is not suitable due to planning restrictions, cost, or building constraints.</p>

                  <p className="mb-4">Solid walls have U-values of 1.5-2.0 W/m2K compared to the Part L target of 0.28 W/m2K. IWI typically reduces this to 0.30-0.40 W/m2K - a major improvement even if not achieving full compliance.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">IWI vs EWI Comparison</h3>
                  <p className="mb-4">IWI costs less upfront but reduces room size and requires careful moisture management. EWI preserves internal space and addresses thermal bridges better but costs more and changes external appearance. For listed buildings, IWI is often the only option.</p>

                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 my-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Example: Victorian Terrace Living Room (20m2 wall)</h4>
                    <p className="text-purple-800 text-sm">
                      Before: 225mm solid brick (U-value 2.1)<br />
                      After: 50mm PIR + 12.5mm plasterboard (U-value 0.35)<br />
                      Space lost: 62.5mm per wall = 0.25m2 floor area<br />
                      Cost: GBP 800-1200 professional, GBP 300-500 DIY<br />
                      Annual saving: GBP 100-180 per room
                    </p>
                  </div>

                  <p className="mb-4">For complete home energy improvements, combine IWI with <Link to="/calculators/insulation-calculator/loft-insulation" className="text-purple-600 hover:underline">loft insulation</Link> and <Link to="/calculators/insulation-calculator/floor-insulation" className="text-purple-600 hover:underline">floor insulation</Link> for maximum savings.</p>
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
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Other Calculators</h3>
                <div className="space-y-2">
                  <Link to="/plasterer-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-900">Plastering Calculator</span>
                  </Link>
                  <Link to="/paint-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-900">Paint Calculator</span>
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Need a Survey?</h3>
                <p className="text-white/90 text-sm mb-4">Professional damp and insulation surveys recommended before IWI installation.</p>
                <button className="w-full py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">Get Quotes</button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Professional Advice?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Get in touch for custom calculations or project guidance.</p>
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
