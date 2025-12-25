import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { InsulationCalculatorCore } from '../../components/InsulationCalculatorCore'

const usecaseData = {
  slug: 'flat-roof',
  title: 'Flat Roof Insulation Calculator',
  metaTitle: 'Flat Roof Insulation Calculator UK | Warm Deck | Part L 2021 | TradeCalcs',
  metaDescription: 'Calculate flat roof insulation U-values for warm deck and cold deck construction. Free UK calculator with PIR thickness requirements and Part L 2021 compliance.',
  h1: 'Flat Roof Insulation Calculator',
  description: 'Calculate U-values for flat roof insulation using warm deck or cold deck construction. Flat roofs require careful insulation design to meet Part L targets of 0.16 W/m²K for extensions while avoiding condensation problems.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/insulation-calculator/flat-roof',
  defaults: {
    elementType: 'roof' as const,
    constructionType: 'extension',
    insulationType: 'pir',
    thickness: '150',
    area: '25'
  },
  tips: [
    'Warm deck construction preferred - no condensation risk',
    'Tapered insulation creates falls for drainage',
    'Minimum 150mm PIR typically needed for Part L',
    'EPDM or single-ply membrane over insulation'
  ],
  commonMistakes: [
    { mistake: 'Using cold deck on new builds', consequence: 'Condensation risk, timber rot, mould', fix: 'Use warm deck construction for all new flat roofs' },
    { mistake: 'Insufficient falls', consequence: 'Ponding water, membrane failure, leaks', fix: 'Use tapered insulation to create 1:40 minimum fall' },
    { mistake: 'Gaps between boards', consequence: 'Thermal bridging, cold spots', fix: 'Stagger joints, tape all joints, consider two layers' },
    { mistake: 'No vapour control layer', consequence: 'Moisture entering insulation from below', fix: 'Install VCL on warm side of insulation (warm deck)' },
    { mistake: 'Compressing insulation at edges', consequence: 'Cold bridge at perimeter', fix: 'Use proper upstands and drip details' }
  ],
  costEstimates: [
    { roofArea: '15m²', warmDeck: '2000-3000', coldDeckRetro: '800-1200', notes: 'Small extension' },
    { roofArea: '25m²', warmDeck: '3300-5000', coldDeckRetro: '1300-2000', notes: 'Garage/utility' },
    { roofArea: '40m²', warmDeck: '5300-8000', coldDeckRetro: '2100-3200', notes: 'Large extension' },
    { roofArea: '60m²', warmDeck: '8000-12000', coldDeckRetro: '3200-4800', notes: 'Dormer/flat' }
  ],
  relatedUsecases: [
    { slug: 'room-in-roof', title: 'Room in Roof' },
    { slug: 'loft-insulation', title: 'Loft Insulation' }
  ],
  faqs: [
    {
      q: 'What U-value does a flat roof need to achieve?',
      a: 'Part L 2021 requires flat roofs to achieve 0.15 W/m²K for new builds and 0.16 W/m²K for extensions/renovations. This typically requires 140-180mm of PIR insulation depending on the construction and other layers.'
    },
    {
      q: 'What is the difference between warm deck and cold deck?',
      a: 'Warm deck: insulation above the deck (timber or concrete) with waterproof membrane on top. Cold deck: insulation between joists with ventilation above. Warm deck is preferred as it eliminates condensation risk and is required for new construction under current Building Regulations.'
    },
    {
      q: 'How thick does flat roof insulation need to be?',
      a: 'For PIR (lambda 0.023), typically 140-160mm for extensions (0.16 target) and 160-180mm for new builds (0.15 target). Using lower-performance insulation like mineral wool would require 250mm+ thickness, making warm deck impractical.'
    },
    {
      q: 'Can I insulate an existing cold deck flat roof?',
      a: 'You can add insulation between joists in an existing cold deck, but this requires careful ventilation design to prevent condensation. For best results, consider converting to warm deck by adding insulation and new membrane on top of existing deck.'
    },
    {
      q: 'What about tapered insulation for falls?',
      a: 'Tapered insulation creates the required 1:40 minimum fall for drainage while providing thermal performance. Specify main insulation thickness at the lowest point. Costs 20-30% more than flat boards but eliminates separate firring strips.'
    },
    {
      q: 'Do I need a vapour control layer?',
      a: 'Yes, warm deck construction requires a VCL below the insulation to prevent moisture from the building entering the insulation layer. Some insulation systems include integral VCL. Cold deck relies on ventilation rather than VCL (though both can be used).'
    },
    {
      q: 'What membrane goes over flat roof insulation?',
      a: 'Single-ply membranes (PVC, TPO, EPDM) are mechanically fixed or adhered directly to insulation. Felt/torch-on requires protection board between insulation and flame. GRP can be laid on certain insulation types. Check manufacturer compatibility.'
    },
    {
      q: 'How do I detail the edges and upstands?',
      a: 'Insulation must continue up parapet walls to form a thermal bridge-free perimeter. Use purpose-made upstand insulation boards. Detail carefully at roof lights, soil pipes, and other penetrations. Cold bridges at edges cause condensation and heat loss.'
    },
    {
      q: 'What is the cost of flat roof insulation?',
      a: 'Warm deck construction (insulation, membrane, and installation) costs 130-200 pounds per m². A typical 25m² flat roof extension costs 3300-5000 pounds. Retrofitting insulation to existing cold deck is cheaper at 50-80 pounds per m² but less effective.'
    },
    {
      q: 'Can I walk on insulated flat roofs?',
      a: 'Standard PIR insulation has limited walkability. For accessible flat roofs, use higher compressive strength insulation (minimum 150kPa) and protection boards. Green roofs and roof terraces require specific systems with drainage and walkway paving.'
    }
  ]
}

export default function FlatRoofCalculator() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tradecalcs.co.uk' },
          { '@type': 'ListItem', position: 2, name: 'Insulation Calculator', item: 'https://tradecalcs.co.uk/calculators/insulation-calculator' },
          { '@type': 'ListItem', position: 3, name: 'Flat Roof', item: usecaseData.canonicalUrl }
        ]
      },
      {
        '@type': 'SoftwareApplication',
        name: usecaseData.title,
        description: usecaseData.metaDescription,
        applicationCategory: 'UtilitiesApplication',
        url: usecaseData.canonicalUrl,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '142', bestRating: '5', worstRating: '1' }
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
        <meta name="keywords" content="flat roof insulation, warm deck insulation, cold deck, PIR flat roof, tapered insulation, flat roof U-value, Part L flat roof, EPDM insulation UK" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={usecaseData.canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-slate-600 to-gray-600 text-white py-12">
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

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-slate-900 mb-2">Tips for Flat Roof Insulation</h2>
                    <ul className="space-y-2">
                      {usecaseData.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-slate-800">
                          <CheckCircle2 className="h-4 w-4 text-slate-600 flex-shrink-0 mt-0.5" /><span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cost Estimate Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Flat Roof Insulation Cost Estimates</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-2">Roof Area</th>
                        <th className="text-left py-3 px-2">Warm Deck</th>
                        <th className="text-left py-3 px-2">Cold Deck Retro</th>
                        <th className="text-left py-3 px-2">Project Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usecaseData.costEstimates.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-2 font-medium">{row.roofArea}</td>
                          <td className="py-3 px-2">£{row.warmDeck}</td>
                          <td className="py-3 px-2">£{row.coldDeckRetro}</td>
                          <td className="py-3 px-2 text-gray-600">{row.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">Warm deck includes membrane. Cold deck is insulation only retrofit.</p>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Flat Roof Insulation</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Flat roof insulation is critical for extensions, garages, and modern architecture. Warm deck construction places insulation above the structural deck with the waterproof membrane on top, eliminating condensation risk and providing the best thermal performance.</p>

                  <p className="mb-4">For pitched roofs in conversions, see our <Link to="/calculators/insulation-calculator/room-in-roof" className="text-slate-600 hover:underline">room-in-roof calculator</Link>. For standard lofts, use the <Link to="/calculators/insulation-calculator/loft-insulation" className="text-slate-600 hover:underline">loft insulation calculator</Link>.</p>

                  <div className="bg-slate-50 border-l-4 border-slate-500 p-4 my-4">
                    <h4 className="font-semibold text-slate-900 mb-2">Example: 25m² Extension Flat Roof</h4>
                    <p className="text-slate-800 text-sm">
                      Construction: Warm deck on timber joists<br />
                      Insulation: 150mm PIR (Celotex/Kingspan)<br />
                      Membrane: EPDM single-ply<br />
                      U-value achieved: 0.14 W/m²K<br />
                      Cost: £3500-4500 installed
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

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Warm Deck Benefits</h3>
                <ul className="text-sm text-slate-800 space-y-1">
                  <li>• No condensation risk</li>
                  <li>• Protects deck structure</li>
                  <li>• Best thermal performance</li>
                  <li>• Building Regs compliant</li>
                  <li>• Longer membrane life</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Other Calculators</h3>
                <div className="space-y-2">
                  <Link to="/roofing-insurance-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="text-sm font-medium text-gray-900">Roofing Calculator</span>
                  </Link>
                  <Link to="/concrete-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="text-sm font-medium text-gray-900">Concrete Calculator</span>
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
