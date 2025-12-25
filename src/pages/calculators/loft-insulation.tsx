import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { InsulationCalculatorCore } from '../../components/InsulationCalculatorCore'

const usecaseData = {
  slug: 'loft-insulation',
  title: 'Loft Insulation Calculator',
  metaTitle: 'Loft Insulation Calculator UK | 270mm Target | Part L 2021 | TradeCalcs',
  metaDescription: 'Calculate loft insulation U-values for Part L compliance. Free UK calculator for 270mm loft insulation with mineral wool, PIR boards, and cost estimates. Check Building Regulations targets.',
  h1: 'Loft Insulation Calculator',
  description: 'Calculate the U-value and Part L compliance for your loft insulation project. Our calculator helps you determine the right thickness of mineral wool, PIR boards, or other materials to meet Building Regulations targets of 0.16 W/m2K for roof extensions.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/insulation-calculator/loft-insulation',
  defaults: {
    elementType: 'roof' as const,
    constructionType: 'extension',
    insulationType: 'mineral-wool',
    thickness: '270',
    area: '50'
  },
  tips: [
    'The recommended minimum depth for loft insulation is 270mm of mineral wool',
    'Do not compress insulation - it reduces effectiveness significantly',
    'Maintain a 50mm air gap at the eaves for ventilation',
    'Install a loft hatch insulation cover to prevent heat loss'
  ],
  commonMistakes: [
    { mistake: 'Blocking eaves ventilation', consequence: 'Causes condensation and timber rot', fix: 'Install eaves vents and maintain 50mm gap' },
    { mistake: 'Compressing insulation', consequence: 'Reduces thermal performance by up to 50%', fix: 'Use correct depth rafters or add battens' },
    { mistake: 'Leaving gaps around pipes', consequence: 'Creates cold spots and potential freezing', fix: 'Wrap all pipes and fill gaps completely' },
    { mistake: 'Insulating under water tank', consequence: 'Tank can freeze in cold weather', fix: 'Leave floor under tank uninsulated, insulate tank sides and top' },
    { mistake: 'No vapour barrier', consequence: 'Moisture passes into insulation reducing effectiveness', fix: 'Install vapour control layer on warm side' }
  ],
  costEstimates: [
    { area: '30m2', mineralWool: '120-180', pir: '450-600', labour: '200-400' },
    { area: '50m2', mineralWool: '200-300', pir: '750-1000', labour: '300-500' },
    { area: '80m2', mineralWool: '320-480', pir: '1200-1600', labour: '400-700' },
    { area: '100m2', mineralWool: '400-600', pir: '1500-2000', labour: '500-800' }
  ],
  relatedUsecases: [
    { slug: 'room-in-roof', title: 'Room in Roof' },
    { slug: 'flat-roof', title: 'Flat Roof' }
  ],
  faqs: [
    {
      q: 'How thick should loft insulation be?',
      a: 'The recommended minimum thickness is 270mm for mineral wool (lambda 0.044) to achieve the target U-value of 0.16 W/m2K. Premium materials like PIR (lambda 0.023) achieve the same performance at around 140mm. Check your existing insulation depth and top up to reach 270mm total.'
    },
    {
      q: 'What U-value does loft insulation need to achieve?',
      a: 'Building Regulations Part L 2021 requires a U-value of 0.16 W/m2K for roof extensions and renovations, and 0.15 W/m2K for new builds. These targets ensure adequate thermal performance and are checked by Building Control.'
    },
    {
      q: 'Can I lay new insulation over old?',
      a: 'Yes, you can top up existing insulation. Lay the first layer between joists and the second layer perpendicular across joists. Ensure total depth reaches 270mm minimum. Check existing insulation is dry and not compressed before adding more.'
    },
    {
      q: 'Should loft insulation have a vapour barrier?',
      a: 'Modern mineral wool insulation typically does not need a separate vapour barrier as it is breathable. However, PIR and foil-backed boards should have joints taped to act as a vapour control layer. If in doubt, install a VCL on the warm (room) side.'
    },
    {
      q: 'How much does loft insulation cost?',
      a: 'DIY mineral wool costs around 4-8 pounds per m2 for 270mm depth. Professional installation adds 4-8 pounds per m2 labour. A typical 50m2 loft costs 200-500 pounds total DIY, or 400-800 pounds installed. Grants may be available through ECO4 scheme.'
    },
    {
      q: 'Do I need to insulate the loft hatch?',
      a: 'Yes, the loft hatch is often a major source of heat loss. Fit a draught-proof strip around the frame and attach 100mm insulation to the top of the hatch. Insulated loft hatches are available pre-made for around 50-150 pounds.'
    },
    {
      q: 'What about pipes and water tanks in the loft?',
      a: 'Once loft insulation is installed, the loft space becomes colder. Insulate all pipes with lagging and fit a tank jacket. Leave the floor directly under the tank uninsulated to allow some heat to rise and prevent freezing.'
    },
    {
      q: 'Is loft insulation a DIY job?',
      a: 'Loft insulation between joists is one of the easiest and most cost-effective DIY improvements. Wear protective clothing, a dust mask, and gloves. Avoid disturbing any old asbestos-containing materials in pre-1990s properties - get a professional survey first if unsure.'
    },
    {
      q: 'How long does loft insulation last?',
      a: 'Mineral wool insulation lasts 80-100 years if kept dry and uncompressed. PIR boards have a similar lifespan. Check insulation annually for damage from pests, water ingress, or compression from stored items. Replace any damaged sections promptly.'
    },
    {
      q: 'What grants are available for loft insulation?',
      a: 'The ECO4 scheme provides free or subsidised loft insulation for eligible households (benefits recipients, low income, or properties with EPC E, F, or G). Contact your energy supplier or local authority to check eligibility. Some councils also offer top-up grants.'
    }
  ]
}

export default function LoftInsulationCalculator() {
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
          { '@type': 'ListItem', position: 4, name: 'Loft Insulation', item: usecaseData.canonicalUrl }
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
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '312', bestRating: '5', worstRating: '1' }
      },
      {
        '@type': 'FAQPage',
        mainEntity: usecaseData.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      },
      {
        '@type': 'HowTo',
        name: 'How to Calculate Loft Insulation Requirements',
        description: 'Step-by-step guide to calculating U-value and insulation depth for loft insulation.',
        totalTime: 'PT3M',
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Select Roof Element', text: 'Choose Roof as building element type.' },
          { '@type': 'HowToStep', position: 2, name: 'Choose Construction Type', text: 'Select Extension for existing lofts.' },
          { '@type': 'HowToStep', position: 3, name: 'Select Insulation Material', text: 'Choose mineral wool, PIR, or other material.' },
          { '@type': 'HowToStep', position: 4, name: 'Enter Thickness', text: 'Enter planned insulation depth in mm.' },
          { '@type': 'HowToStep', position: 5, name: 'Calculate', text: 'Click Calculate to check Part L compliance.' }
        ]
      }
    ]
  }

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="loft insulation calculator, 270mm loft insulation, loft U-value calculator, Part L loft, roof insulation thickness, mineral wool calculator, loft insulation cost UK, ECO4 insulation" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={usecaseData.canonicalUrl} />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={usecaseData.canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-12">
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

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-amber-900 mb-2">Tips for Loft Insulation</h2>
                    <ul className="space-y-2">
                      {usecaseData.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-amber-800">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" /><span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Cost Estimate Table */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Loft Insulation Cost Estimates</h2>
                <p className="text-gray-600 text-sm mb-4">Typical costs for 270mm loft insulation (materials + labour). Prices as of 2025:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50">
                        <th className="text-left py-3 px-2">Loft Area</th>
                        <th className="text-left py-3 px-2">Mineral Wool</th>
                        <th className="text-left py-3 px-2">PIR Boards</th>
                        <th className="text-left py-3 px-2">Labour</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usecaseData.costEstimates.map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-2 font-medium">{row.area}</td>
                          <td className="py-3 px-2">GBP {row.mineralWool}</td>
                          <td className="py-3 px-2">GBP {row.pir}</td>
                          <td className="py-3 px-2">GBP {row.labour}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-gray-500 mt-3">Costs vary by region and supplier. Get multiple quotes for accurate pricing.</p>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Loft Insulation</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Loft insulation is one of the most cost-effective energy efficiency improvements for UK homes. Heat rises, so up to 25% of heat loss occurs through an uninsulated roof. The current Building Regulations Part L target for roof elements is 0.16 W/m2K for extensions and renovations.</p>

                  <p className="mb-4">For a complete home energy assessment, combine your loft calculations with our <Link to="/calculators/insulation-calculator/cavity-wall-insulation" className="text-green-600 hover:underline">cavity wall insulation calculator</Link> or <Link to="/calculators/insulation-calculator/floor-insulation" className="text-green-600 hover:underline">floor insulation calculator</Link> to maximise savings.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Types of Loft Insulation</h3>
                  <p className="mb-4">The most common options are mineral wool rolls (glass or rock wool) laid between and over joists, or rigid PIR boards for limited headroom applications. Blown cellulose is another option for hard-to-reach areas.</p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example: 50m2 Loft with 100mm Existing Insulation</h4>
                    <p className="text-blue-800 text-sm">
                      Current depth: 100mm mineral wool (U-value approx 0.40)<br />
                      Target: 0.16 W/m2K requires 270mm total<br />
                      Top-up needed: 170mm additional mineral wool<br />
                      Cost: Approx GBP 150-250 materials + GBP 200-400 labour<br />
                      Annual saving: GBP 150-250 on heating bills
                    </p>
                  </div>

                  <p className="mb-4">If you are converting your loft to living space, see our <Link to="/calculators/insulation-calculator/room-in-roof" className="text-green-600 hover:underline">room in roof calculator</Link> instead, as different insulation methods apply between rafters.</p>
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
                    <span className="text-sm font-medium text-gray-900">Brick and Block Calculator</span>
                  </Link>
                  <Link to="/concrete-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-900">Concrete Calculator</span>
                  </Link>
                  <Link to="/plasterer-calculator" className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <span className="text-sm font-medium text-gray-900">Plastering Calculator</span>
                  </Link>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-teal-500 rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">ECO4 Grants Available</h3>
                <p className="text-white/90 text-sm mb-4">You may qualify for free loft insulation through the ECO4 scheme.</p>
                <a href="https://www.gov.uk/energy-company-obligation" target="_blank" rel="noopener noreferrer" className="block w-full py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-center">Check Eligibility</a>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Need Professional Advice?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get in touch for custom calculations, bulk estimates, or to discuss embedding our tools on your website.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false" 
                width="100%" 
                height="750px" 
                frameBorder="0"
                title="Contact Form"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-4">
              Or email us directly at <a href="mailto:mick@tradecalcs.co.uk" className="text-green-600 hover:text-green-700 font-medium">mick@tradecalcs.co.uk</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
