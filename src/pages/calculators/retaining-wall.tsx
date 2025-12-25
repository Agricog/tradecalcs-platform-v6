import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { BrickCalculatorCore } from '../../components/BrickBlockCalculator'
import LocationSupplierWidget from '../../components/LocationSupplierWidget'

const usecaseData = {
  slug: 'retaining-wall',
  title: 'Brick Calculator for Retaining Walls',
  metaTitle: 'Brick Calculator for Retaining Walls | UK Retaining Wall Guide 2025',
  metaDescription: 'Calculate bricks and blocks for retaining walls. Includes engineering brick requirements, drainage considerations, and Building Regulations guidance for UK projects.',
  h1: 'Brick Calculator for Retaining Walls',
  description: 'Building a retaining wall to hold back soil or create level changes in your garden? Calculate exact brick and block quantities including engineering brick requirements. Our calculator covers small garden terraces to structural retaining walls with UK Building Regulations guidance.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/brick-calculator/retaining-wall',
  defaults: {
    materialType: 'brick' as const,
    length: '6',
    height: '1.0',
    wasteFactor: 10
  },
  tips: [
    'Retaining walls over 1.2m typically require Building Regulations approval',
    'Always use engineering bricks (Class A or B) for below-ground courses',
    'Include weep holes every 1m for drainage - critical to prevent hydrostatic pressure',
    'Consider concrete block construction for walls over 1m - stronger and more economical'
  ],
  relatedUsecases: [
    { slug: 'garden-wall', title: 'Garden Walls' },
    { slug: 'boundary-wall', title: 'Boundary Walls' }
  ],
  faqs: [
    {
      q: 'Do retaining walls need Building Regulations approval?',
      a: 'Retaining walls over 1.2m high or those supporting a surcharge (like a driveway or building) require Building Regulations approval. Walls under 1.2m in gardens generally don\'t need approval, but must still be structurally sound. Always check with your local Building Control.'
    },
    {
      q: 'What type of bricks should I use for a retaining wall?',
      a: 'Use engineering bricks (Class A or B) for all below-ground courses and the first 150mm above ground. Engineering bricks are frost-resistant and have low water absorption. Facing bricks can be used above this level for appearance.'
    },
    {
      q: 'How thick should a brick retaining wall be?',
      a: 'For walls up to 600mm retaining height, a single brick (215mm) may suffice. Walls 600mm-1m typically need 1.5 brick thickness (327mm). Over 1m, consider double brick (440mm) or reinforced concrete block construction with professional design.'
    },
    {
      q: 'Do retaining walls need drainage?',
      a: 'Yes, drainage is critical. Install weep holes (50mm pipes) every 900mm-1200mm along the base. Add a gravel backfill layer (150-300mm) behind the wall with landscape fabric to prevent soil clogging. Poor drainage causes hydrostatic pressure that can collapse walls.'
    },
    {
      q: 'How deep should retaining wall foundations be?',
      a: 'Foundations should be at least 450mm deep and extend 150mm beyond the wall on each side. Width should be 2-3× the wall thickness. For walls over 1m or in clay soil, foundations may need to be 600mm+ deep. Always below frost line.'
    },
    {
      q: 'Can I build a retaining wall myself?',
      a: 'DIY is suitable for small retaining walls under 600mm holding back garden soil. Walls 600mm-1.2m require good construction knowledge. Over 1.2m or supporting structures should be designed by a structural engineer and built by professionals.'
    },
    {
      q: 'What is the maximum height for a DIY retaining wall?',
      a: 'Most building experts recommend a maximum of 1.2m for DIY brick retaining walls. Beyond this height, the engineering becomes complex and failure risks increase significantly. Professional design is strongly advised for taller walls.'
    },
    {
      q: 'Do I need steel reinforcement in a retaining wall?',
      a: 'Brick retaining walls under 1m typically don\'t need reinforcement if properly designed. Taller walls or those with surcharge loads often require steel reinforcement or should be built with reinforced concrete blocks with filled cores.'
    },
    {
      q: 'How much does a retaining wall cost per metre?',
      a: 'Budget £200-400 per linear metre for a 1m high brick retaining wall including materials, drainage, and labour. Costs increase significantly with height - a 1.5m wall may cost £400-700/m. Engineering design adds £500-1500 for the project.'
    },
    {
      q: 'What mortar mix for retaining walls?',
      a: 'Use a strong 3:1 mortar mix (3 parts sand to 1 part cement) for retaining walls due to ground contact and moisture exposure. Add waterproofer to the mix. For engineering bricks below DPC, some specifications call for 2.5:1 mix.'
    }
  ]
}

export default function BrickCalculatorRetainingWall() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tradecalcs.co.uk' },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://tradecalcs.co.uk/calculators' },
          { '@type': 'ListItem', position: 3, name: 'Brick Calculator', item: 'https://tradecalcs.co.uk/brick-block-calculator' },
          { '@type': 'ListItem', position: 4, name: 'Retaining Walls', item: usecaseData.canonicalUrl }
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
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '127', bestRating: '5', worstRating: '1' }
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
        name: 'How to Calculate Bricks for a Retaining Wall',
        description: 'Step-by-step guide to calculating brick quantities for retaining walls.',
        totalTime: 'PT3M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'GBP', value: '0' },
        tool: [{ '@type': 'HowToTool', name: 'TradeCalcs Brick Calculator' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Determine Wall Height', text: 'Measure the height of soil/ground to be retained.' },
          { '@type': 'HowToStep', position: 2, name: 'Measure Wall Length', text: 'Measure the full length of retaining wall needed.' },
          { '@type': 'HowToStep', position: 3, name: 'Select Material', text: 'Choose bricks or blocks based on wall height and load.' },
          { '@type': 'HowToStep', position: 4, name: 'Set Waste Factor', text: 'Use 10% for standard work, 15% for complex shapes.' },
          { '@type': 'HowToStep', position: 5, name: 'Calculate', text: 'Click Calculate and add engineering bricks for below-ground courses.' }
        ]
      },
      {
        '@type': 'Article',
        headline: usecaseData.h1,
        description: usecaseData.metaDescription,
        author: { '@type': 'Organization', name: 'TradeCalcs' },
        publisher: { '@type': 'Organization', name: 'TradeCalcs', url: 'https://tradecalcs.co.uk' },
        datePublished: '2025-01-01',
        dateModified: '2025-01-01',
        mainEntityOfPage: usecaseData.canonicalUrl
      },
      {
        '@type': 'Organization',
        name: 'TradeCalcs',
        url: 'https://tradecalcs.co.uk',
        logo: 'https://tradecalcs.co.uk/logo.png',
        description: 'Free professional calculators for UK construction trades',
        contactPoint: { '@type': 'ContactPoint', contactType: 'Customer Support', email: 'mick@tradecalcs.co.uk' }
      }
    ]
  }

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="retaining wall calculator, retaining wall bricks, garden retaining wall, engineering bricks retaining wall, retaining wall cost UK, retaining wall building regulations, retaining wall drainage, retaining wall foundation depth" />
        <meta name="author" content="TradeCalcs" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#ea580c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TradeCalcs" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={usecaseData.canonicalUrl} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-calculator-retaining-wall-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Brick Calculator for Retaining Walls - Free UK Calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/brick-calculator-retaining-wall-twitter.jpg" />
        <meta name="twitter:image:alt" content="Brick Calculator for Retaining Walls" />
        <link rel="canonical" href={usecaseData.canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <Link to="/brick-block-calculator" className="inline-flex items-center text-white/80 hover:text-white mb-4 text-sm">
              <ArrowLeft className="h-4 w-4 mr-1" />Back to Brick Calculator
            </Link>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">{usecaseData.h1}</h1>
            <p className="text-white/90 max-w-2xl text-lg">{usecaseData.description}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <BrickCalculatorCore
                  defaultMaterialType={usecaseData.defaults.materialType}
                  defaultLength={usecaseData.defaults.length}
                  defaultHeight={usecaseData.defaults.height}
                  defaultWasteFactor={usecaseData.defaults.wasteFactor}
                />
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-red-900 mb-1">⚠️ Structural Warning</h2>
                    <p className="text-sm text-red-800">Retaining walls are structural elements. Walls over 1.2m or supporting loads require professional engineering design. Failure can cause serious injury or property damage.</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-amber-900 mb-2">Tips for Retaining Walls</h2>
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

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Retaining Wall Construction</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Retaining walls hold back soil to create level changes in a garden or prevent erosion. Unlike freestanding walls, they must resist constant lateral pressure from the soil behind them, making proper construction critical.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Key Components of a Retaining Wall</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li><strong>Foundation:</strong> Concrete strip footing, minimum 450mm deep</li>
                    <li><strong>Base courses:</strong> Engineering bricks below ground and 150mm above</li>
                    <li><strong>Wall body:</strong> Facing bricks or blocks above engineering courses</li>
                    <li><strong>Drainage:</strong> Weep holes + gravel backfill + landscape fabric</li>
                    <li><strong>Coping:</strong> Weather-resistant cap to shed water</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Engineering Brick Requirements</h3>
                  <p className="mb-4">Engineering bricks are essential for retaining walls due to ground contact:</p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example: 6m × 1m Retaining Wall</h4>
                    <p className="text-blue-800 text-sm">
                      Total wall: 6m² = 360 bricks (facing) + 10% waste = 396 bricks<br />
                      Engineering courses: 6m × 0.3m = 1.8m² = 108 engineering bricks<br />
                      <strong>Order: 288 facing bricks + 120 engineering bricks</strong><br />
                      Plus: Drainage pipe, gravel, landscape fabric
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Retaining Wall Height Guide</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">Up to 600mm ✓</h3>
                    <p className="text-sm text-green-700 mb-2">DIY suitable, single brick thickness</p>
                    <ul className="text-sm text-green-800 space-y-1">
                      <li>• Single brick wall (215mm)</li>
                      <li>• Standard foundation</li>
                      <li>• Basic drainage required</li>
                      <li>• No Building Regs needed</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-4">
                    <h3 className="font-semibold text-amber-900 mb-2">600mm - 1.2m ⚠️</h3>
                    <p className="text-sm text-amber-700 mb-2">Experienced DIY, thicker wall needed</p>
                    <ul className="text-sm text-amber-800 space-y-1">
                      <li>• 1.5 brick or block wall</li>
                      <li>• Deeper foundation (450mm+)</li>
                      <li>• Full drainage system</li>
                      <li>• Building Regs may apply</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-2">1.2m - 2m ⛔</h3>
                    <p className="text-sm text-red-700 mb-2">Professional design required</p>
                    <ul className="text-sm text-red-800 space-y-1">
                      <li>• Structural engineer design</li>
                      <li>• Reinforced construction</li>
                      <li>• Building Regs approval</li>
                      <li>• Professional build recommended</li>
                    </ul>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Over 2m 🚫</h3>
                    <p className="text-sm text-gray-600 mb-2">Specialist contractor only</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Full structural design</li>
                      <li>• Piled foundations possible</li>
                      <li>• Building Regs mandatory</li>
                      <li>• CDM regulations apply</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Drainage Requirements</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Proper drainage is the single most important factor in retaining wall longevity. Hydrostatic pressure from waterlogged soil is the primary cause of retaining wall failure.</p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Weep Holes</h4>
                      <p className="text-sm text-gray-600">50mm diameter pipes every 900-1200mm at base of wall. Angle slightly downward toward front.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Gravel Backfill</h4>
                      <p className="text-sm text-gray-600">150-300mm layer of 20mm gravel behind wall, full height. Allows water to drain to weep holes.</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Landscape Fabric</h4>
                      <p className="text-sm text-gray-600">Geotextile membrane between gravel and soil. Prevents soil migrating into drainage layer.</p>
                    </div>
                  </div>
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
              <LocationSupplierWidget calculatorType="brick" />

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Related Calculators</h3>
                <div className="space-y-2">
                  {usecaseData.relatedUsecases.map((related, index) => (
                    <Link key={index} to={`/calculators/brick-calculator/${related.slug}`} className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <span className="text-sm font-medium text-gray-900">{related.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Materials Checklist</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Engineering bricks (below ground)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Facing bricks (above ground)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Sand & cement (3:1 mix)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Concrete for foundation</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Drainage pipe (50mm)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>20mm gravel (drainage)</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Landscape fabric</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h3 className="font-semibold text-red-900 mb-2">⚠️ Building Regulations</h3>
                <p className="text-sm text-red-800">Retaining walls over 1.2m require Building Regulations approval. Contact your local Building Control before starting work.</p>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Need Professional Help?</h3>
                <p className="text-white/90 text-sm mb-4">Get quotes from trusted builders in your area.</p>
                <button className="w-full py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">Get Free Quotes</button>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Need a Custom Solution for Your Business?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Whether you're a contractor needing bulk calculations, a merchant wanting to embed our tools, or a business with specific requirements - we'd love to hear from you.
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
              Or email us directly at <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 hover:text-purple-700 font-medium">mick@tradecalcs.co.uk</a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
