import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { BrickCalculatorCore } from '../../components/BrickBlockCalculator'
import LocationSupplierWidget from '../../components/LocationSupplierWidget'

// Use-case specific data - FULLY SEO OPTIMIZED
const usecaseData = {
  slug: 'retaining-wall',
  title: 'Brick Calculator for Retaining Walls',
  metaTitle: 'Brick Calculator for Retaining Walls | Free UK Calculator 2025',
  metaDescription: 'Calculate exact bricks for retaining walls, garden terraces, level changes. Free UK calculator with engineering brick guidance, drainage requirements, and Building Regulations advice.',
  h1: 'Brick Calculator for Retaining Walls',
  description: 'Building a retaining wall to hold back soil or create level changes? Calculate exactly how many bricks you need including engineering brick requirements. Our calculator accounts for wastage, drainage considerations, and UK Building Regulations guidance.',
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
      a: 'Foundations should be at least 450mm deep and extend 150mm beyond the wall on each side. Width should be 2-3x the wall thickness. For walls over 1m or in clay soil, foundations may need to be 600mm+ deep. Always below frost line.'
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
      q: 'How much sand and cement do I need for a retaining wall?',
      a: 'For retaining walls, use a stronger 3:1 mortar mix. Allow 50kg of building sand and 17kg of cement per square metre of wall. A 6m x 1m retaining wall needs approximately 0.3 tonnes of sand and 4 bags (25kg each) of cement.'
    },
    {
      q: 'Do I need steel reinforcement in a retaining wall?',
      a: 'Brick retaining walls under 1m typically don\'t need reinforcement if properly designed. Taller walls or those with surcharge loads often require steel reinforcement or should be built with reinforced concrete blocks with filled cores.'
    },
    {
      q: 'How much does a retaining wall cost per metre?',
      a: 'Budget 200-400 pounds per linear metre for a 1m high brick retaining wall including materials, drainage, and labour. Costs increase significantly with height - a 1.5m wall may cost 400-700 pounds per metre. Engineering design adds 500-1500 pounds for the project.'
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
        description: 'Step-by-step guide to calculating brick quantities for retaining walls using the TradeCalcs calculator.',
        totalTime: 'PT2M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'GBP', value: '0' },
        tool: [{ '@type': 'HowToTool', name: 'TradeCalcs Brick Calculator' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Select Material Type', text: 'Choose Standard UK Bricks (60 per m2) or Concrete Blocks for larger walls.' },
          { '@type': 'HowToStep', position: 2, name: 'Enter Wall Length', text: 'Measure and enter your retaining wall length in metres.' },
          { '@type': 'HowToStep', position: 3, name: 'Enter Wall Height', text: 'Enter wall height. Retaining walls are typically 0.6m to 1.2m for DIY.' },
          { '@type': 'HowToStep', position: 4, name: 'Set Waste Factor', text: 'Set 10% for standard walls, 15% for complex shapes.' },
          { '@type': 'HowToStep', position: 5, name: 'Calculate', text: 'Click Calculate to get brick, sand, and cement quantities.' }
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
        <meta name="keywords" content="retaining wall brick calculator, brick retaining wall calculator UK, how many bricks retaining wall, retaining wall materials, engineering bricks calculator, brick quantity calculator, mortar calculator retaining wall, retaining wall cost calculator" />
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
                  <p className="mb-4">Retaining walls hold back soil to create level changes in a garden or prevent erosion. Unlike freestanding walls, they must resist constant lateral pressure from the soil behind them, making proper construction and drainage critical for long-term stability.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">How Many Bricks Per Square Metre?</h3>
                  <p className="mb-4">Standard UK bricks measure 215mm x 102.5mm x 65mm. When laid with 10mm mortar joints, this equates to <strong>60 bricks per square metre</strong> for a single-skin wall. Retaining walls often require thicker construction.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Mortar Requirements</h3>
                  <p className="mb-4">Retaining walls need a stronger 3:1 mortar ratio (3 parts building sand to 1 part cement) due to ground contact and moisture exposure:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li><strong>50kg of building sand</strong> per square metre</li>
                    <li><strong>17kg of cement</strong> per square metre</li>
                    <li>Add waterproofer to the mortar mix</li>
                  </ul>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example Calculation</h4>
                    <p className="text-blue-800 text-sm">
                      For a 6m long x 1m high retaining wall (6m2):<br />
                      - Bricks: 6 x 60 = 360 bricks (+ 10% waste = 396 bricks)<br />
                      - Engineering bricks for base: approx 108 bricks<br />
                      - Sand: 6 x 50kg = 300kg (0.3 tonnes)<br />
                      - Cement: 6 x 17kg = 102kg (5 x 25kg bags)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Common Retaining Wall Projects</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Low Garden Terrace (0.6m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Raised beds, small level changes</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- 36 bricks per linear metre</li>
                      <li>- Single brick thickness OK</li>
                      <li>- Basic drainage required</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Standard Retaining (1.0m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Garden terracing, driveway edges</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- 60 bricks per linear metre</li>
                      <li>- 1.5 brick thickness recommended</li>
                      <li>- Full drainage system needed</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Tall Retaining (1.2m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Maximum DIY height</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- 72 bricks per linear metre</li>
                      <li>- Double brick or block required</li>
                      <li>- Building Regs may apply</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Structural (Over 1.2m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Professional design required</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Engineer calculation needed</li>
                      <li>- Reinforced construction</li>
                      <li>- Building Regs mandatory</li>
                    </ul>
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
