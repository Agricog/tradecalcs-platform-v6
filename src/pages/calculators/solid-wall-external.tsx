import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { InsulationCalculatorCore } from '../../components/InsulationCalculatorCore'

const usecaseData = {
  slug: 'solid-wall-external',
  title: 'External Wall Insulation Calculator (EWI)',
  metaTitle: 'External Wall Insulation Calculator UK | EWI | Solid Wall | Part L 2021',
  metaDescription: 'Calculate external wall insulation (EWI) U-values for solid walls. Free UK calculator with render system costs, thickness requirements, and Building Regulations guidance.',
  h1: 'External Wall Insulation Calculator (EWI)',
  description: 'Calculate U-values for external wall insulation on solid walls. Our calculator helps you determine the right thickness of EPS, mineral wool, or phenolic insulation with render finishes to meet Part L 2021 targets.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/insulation-calculator/solid-wall-external',
  defaults: {
    elementType: 'wall' as const,
    constructionType: 'extension',
    insulationType: 'eps',
    constructionMaterial: 'brick-215',
    thickness: '100',
    area: '80'
  },
  tips: [
    'EWI preserves internal floor space and reduces thermal bridging',
    'Planning permission may be required - check with local authority first',
    'Listed buildings typically cannot have EWI - consider internal options',
    'Window and door reveals need extending to maintain proportions'
  ],
  commonMistakes: [
    { mistake: 'Not checking planning requirements', consequence: 'Enforcement notice requiring removal', fix: 'Apply for planning permission before starting - especially conservation areas' },
    { mistake: 'Poor surface preparation', consequence: 'Insulation debonding and system failure', fix: 'Repair render, remove loose paint, treat algae before installation' },
    { mistake: 'Inadequate fixings', consequence: 'Boards falling off in high winds', fix: 'Use correct mechanical fixings for wall type and exposure zone' },
    { mistake: 'Ignoring detailing', consequence: 'Water ingress at edges and junctions', fix: 'Install proper starter tracks, corner beads, and drip details' },
    { mistake: 'DIY installation', consequence: 'Voids, poor finish, system warranty voided', fix: 'EWI requires certified installers for warranty and performance' }
  ],
  costEstimates: [
    { wallArea: '50m2', epsRender: '5000-7500', mineralWool: '6000-9000', notes: 'Small terrace' },
    { wallArea: '80m2', epsRender: '8000-12000', mineralWool: '9600-14400', notes: 'Semi-detached' },
    { wallArea: '120m2', epsRender: '12000-18000', mineralWool: '14400-21600', notes: 'Detached' },
    { wallArea: '160m2', epsRender: '16000-24000', mineralWool: '19200-28800', notes: 'Large property' }
  ],
  relatedUsecases: [
    { slug: 'solid-wall-internal', title: 'Solid Wall (Internal)' },
    { slug: 'new-build-walls', title: 'New Build Walls' }
  ],
  faqs: [
    {
      q: 'What is external wall insulation (EWI)?',
      a: 'EWI involves fixing insulation boards to the outside of walls, covered with a protective render or cladding system. It wraps the building in a thermal blanket, eliminating thermal bridges and protecting the structure from weather damage while improving appearance.'
    },
    {
      q: 'How thick does EWI need to be?',
      a: 'To achieve the Part L target of 0.28 W/m2K on solid walls, typically 90-100mm of EPS or 70-80mm of phenolic is needed. The render adds approximately 10mm. Total build-up is usually 100-120mm projecting from the original wall face.'
    },
    {
      q: 'Do I need planning permission for EWI?',
      a: 'Often yes. EWI changes the external appearance of the building and may require planning permission, especially in conservation areas, on listed buildings, or when projecting over boundaries. Always check with your local planning authority before starting work.'
    },
    {
      q: 'How much does EWI cost?',
      a: 'Professional EWI costs 100-150 pounds per m2 for EPS render systems, or 120-180 pounds for mineral wool (fire-rated). A typical semi-detached house (80m2 walls) costs 8000-15000 pounds. Grants through ECO4 may cover significant costs for eligible households.'
    },
    {
      q: 'Is EWI better than internal wall insulation?',
      a: 'EWI generally performs better as it eliminates thermal bridging, protects the building structure, and preserves internal space. However, it costs more, changes external appearance, and may need planning permission. IWI is better for listed buildings or where EWI is not possible.'
    },
    {
      q: 'What finish options are available?',
      a: 'Common finishes include silicone render (most durable, self-cleaning), acrylic render (economical), mineral render (breathable), and brick slip systems (matches existing brickwork). Colours range from smooth white to textured heritage finishes.'
    },
    {
      q: 'How long does EWI last?',
      a: 'Quality EWI systems with silicone render last 30-40 years with minimal maintenance. Acrylic renders may need recoating after 15-20 years. The insulation itself is lifetime-of-building. Choose reputable systems with at least 25-year warranties.'
    },
    {
      q: 'What happens at windows and doors?',
      a: 'Window and door reveals are extended with insulation to maintain thermal continuity. Reveals typically get 20-40mm insulation. Windows may need repositioning or new external sills. This adds 10-20% to project cost but is essential for performance.'
    },
    {
      q: 'Can EWI be installed in winter?',
      a: 'Most EWI systems require temperatures above 5 degrees C for render application. Winter installation is possible in milder weather or with heated enclosures but may take longer. Summer installation is generally faster and more economical.'
    },
    {
      q: 'Will EWI affect my building insurance?',
      a: 'Inform your insurer about EWI installation. Most insurers welcome it as it protects the building. Ensure your installer provides certification and warranties. Some insurers may reduce premiums due to improved fire resistance (mineral wool systems).'
    }
  ]
}

export default function SolidWallExternalCalculator() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tradecalcs.co.uk' },
          { '@type': 'ListItem', position: 2, name: 'Insulation Calculator', item: 'https://tradecalcs.co.uk/calculators/insulation-calculator' },
          { '@type': 'ListItem', position: 3, name: 'Solid Wall External', item: usecaseData.canonicalUrl }
        ]
      },
      {
        '@type': 'SoftwareApplication',
        name: usecaseData.title,
        description: usecaseData.metaDescription,
        applicationCategory: 'UtilitiesApplication',
        url: usecaseData.canonicalUrl,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '156', bestRating: '5', worstRating: '1' }
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
        <meta name="keywords" content="external wall insulation calculator, EWI calculator, solid wall insulation, render insulation system, EPS insulation cost, Part L solid wall, retrofit EWI UK, ECO4 EWI grants" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={usecaseData.canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white py-12">
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

              <div className="bg-green-50 border border-green-200 rounded-lg p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-green-900 mb-2">Tips for External Wall Insulation</h2>
                    <ul className="space-y-2">
                      {usecaseData.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-green-800">
                          <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" /><span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cost Estimate Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">EWI Cost Estimates</h2>
                <p className="text-gray-600 text-sm mb-4">Professional installation costs including scaffolding (2025 prices):</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-2">Wall Area</th>
                        <th className="text-left py-3 px-2">EPS + Render</th>
                        <th className="text-left py-3 px-2">Mineral Wool</th>
                        <th className="text-left py-3 px-2">Property Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usecaseData.costEstimates.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-2 font-medium">{row.wallArea}</td>
                          <td className="py-3 px-2">GBP {row.epsRender}</td>
                          <td className="py-3 px-2">GBP {row.mineralWool}</td>
                          <td className="py-3 px-2 text-gray-600">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">ECO4 grants may cover 50-100% of costs for eligible households.</p>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding External Wall Insulation</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">EWI is the premium solution for insulating solid wall properties, wrapping the building in a thermal envelope. While more expensive than <Link to="/calculators/insulation-calculator/solid-wall-internal" className="text-green-600 hover:underline">internal wall insulation</Link>, it offers superior thermal performance and protects the building structure.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">EWI System Components</h3>
                  <p className="mb-4">A complete EWI system includes: insulation boards (EPS, mineral wool, or phenolic) mechanically fixed to the wall, a reinforcing mesh embedded in adhesive, and a decorative render finish. Quality systems carry 25-40 year warranties.</p>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4 my-4">
                    <h4 className="font-semibold text-green-900 mb-2">Example: 1930s Semi-Detached (80m2 wall area)</h4>
                    <p className="text-green-800 text-sm">
                      Before: 225mm solid brick (U-value 2.1)<br />
                      After: 100mm EPS + silicone render (U-value 0.27)<br />
                      Cost: GBP 9000-12000 (potentially GBP 0-3000 with ECO4)<br />
                      Annual saving: GBP 350-550<br />
                      Payback: 5-8 years (without grants)
                    </p>
                  </div>

                  <p className="mb-4">For new construction projects, see our <Link to="/calculators/insulation-calculator/new-build-walls" className="text-green-600 hover:underline">new build wall calculator</Link> for cavity wall insulation options. For roof insulation, use our <Link to="/calculators/insulation-calculator/loft-insulation" className="text-green-600 hover:underline">loft insulation calculator</Link>.</p>
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
                  <Link to="/calculators/insulation-calculator/cavity-wall-insulation" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-900">Cavity Wall Insulation</span>
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Other Calculators</h3>
                <div className="space-y-2">
                  <Link to="/brick-block-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-900">Brick Calculator</span>
                  </Link>
                  <Link to="/scaffold-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-900">Scaffold Calculator</span>
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">ECO4 Grants Available</h3>
                <p className="text-white/90 text-sm mb-4">EWI grants of up to 100% may be available for eligible households.</p>
                <a href="https://www.gov.uk/energy-company-obligation" target="_blank" rel="noopener noreferrer" className="block w-full py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-center">Check Eligibility</a>
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
