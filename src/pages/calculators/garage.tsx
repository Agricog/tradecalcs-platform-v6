import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { BrickCalculatorCore } from '../../components/BrickBlockCalculator'
import LocationSupplierWidget from '../../components/LocationSupplierWidget'

// Use-case specific data - FULLY SEO OPTIMIZED
const usecaseData = {
  slug: 'garage',
  title: 'Brick Calculator for Garages',
  metaTitle: 'Brick Calculator for Garages | Free UK Calculator 2025',
  metaDescription: 'Calculate exact bricks for garage builds, single and double garages. Free UK calculator with cavity wall calculations, DPC requirements, and Building Regulations guidance.',
  h1: 'Brick Calculator for Garages',
  description: 'Building a garage? Calculate exactly how many bricks you need for single or double garage construction. Our calculator accounts for cavity walls, wastage, door and window openings, and UK Building Regulations requirements.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/brick-calculator/garage',
  defaults: {
    materialType: 'brick' as const,
    length: '18',
    height: '2.4',
    wasteFactor: 10
  },
  tips: [
    'Most garages require Building Regulations approval and possibly planning permission',
    'Cavity wall construction (two skins with insulation) is standard for UK garages',
    'Allow for door opening - standard single garage door is 2.1m x 2.1m',
    'Engineering bricks required below DPC level (minimum 150mm above ground)'
  ],
  relatedUsecases: [
    { slug: 'house-extension', title: 'House Extensions' },
    { slug: 'boundary-wall', title: 'Boundary Walls' }
  ],
  faqs: [
    {
      q: 'How many bricks do I need for a single garage?',
      a: 'A standard single garage (3m x 6m internal) with 2.4m walls requires approximately 3,500-4,000 bricks for the outer skin alone. For cavity wall construction, double this for the inner skin, or use concrete blocks internally to reduce costs.'
    },
    {
      q: 'Do I need planning permission for a garage?',
      a: 'Detached garages under 30m2 with no sleeping accommodation often fall under Permitted Development. However, Building Regulations approval is almost always required. Attached garages always need Building Regs. Check with your local planning authority.'
    },
    {
      q: 'Should I use cavity wall construction for a garage?',
      a: 'Yes, cavity wall construction is recommended for UK garages. It provides better insulation, prevents damp penetration, and meets Building Regulations. Use a 50-100mm cavity with insulation batts or blown insulation.'
    },
    {
      q: 'What wastage should I allow for a garage build?',
      a: 'Allow 10% wastage for garage builds due to window and door openings requiring cut bricks. Increase to 12-15% if you have multiple windows or decorative features. Complex designs may need higher allowances.'
    },
    {
      q: 'What mortar mix should I use for a garage?',
      a: 'Use a standard 4:1 mix (4 parts soft sand to 1 part cement) above DPC. Below DPC, use a stronger 3:1 mix with waterproofer. Add plasticiser for improved workability. Never lay bricks in freezing conditions.'
    },
    {
      q: 'How deep should garage foundations be?',
      a: 'Garage foundations should be minimum 450mm deep and 450mm wide for standard single-skin walls, or 600mm wide for cavity walls. In clay soil or near trees, depths of 900mm-1200mm may be required. Always consult Building Control.'
    },
    {
      q: 'Can I build a garage myself?',
      a: 'Technically yes, but garage construction requires significant building skills including foundations, cavity walls, DPC installation, lintels, and roofing. Most DIYers hire professionals for structural elements and do finishing work themselves.'
    },
    {
      q: 'How much does it cost to build a brick garage?',
      a: 'A single brick garage costs approximately 15,000-25,000 pounds for materials and labour. A double garage typically costs 25,000-40,000 pounds. DIY can reduce costs by 30-40% but requires significant skill and time.'
    },
    {
      q: 'What size blocks should I use for the inner skin?',
      a: 'Use 100mm concrete blocks (440mm x 215mm) for the inner skin of a garage cavity wall. This is more economical than bricks and provides good thermal mass. Use 10.76 blocks per square metre in your calculations.'
    },
    {
      q: 'Do I need a lintel over the garage door?',
      a: 'Yes, a structural lintel is essential over the garage door opening. Use a concrete or steel lintel rated for the span - typically a 2.1m span requires a heavy-duty lintel. This must be specified in your Building Regs application.'
    }
  ]
}

export default function BrickCalculatorGarage() {
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
          { '@type': 'ListItem', position: 4, name: 'Garages', item: usecaseData.canonicalUrl }
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
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '203', bestRating: '5', worstRating: '1' }
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
        name: 'How to Calculate Bricks for a Garage',
        description: 'Step-by-step guide to calculating brick quantities for garage construction using the TradeCalcs calculator.',
        totalTime: 'PT3M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'GBP', value: '0' },
        tool: [{ '@type': 'HowToTool', name: 'TradeCalcs Brick Calculator' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Calculate Perimeter', text: 'Add up all four wall lengths for total linear metres.' },
          { '@type': 'HowToStep', position: 2, name: 'Enter Wall Length', text: 'Enter the total perimeter length in metres.' },
          { '@type': 'HowToStep', position: 3, name: 'Enter Wall Height', text: 'Enter wall height, typically 2.4m for garages.' },
          { '@type': 'HowToStep', position: 4, name: 'Set Waste Factor', text: 'Set 10% for standard builds, 12-15% with multiple openings.' },
          { '@type': 'HowToStep', position: 5, name: 'Calculate Both Skins', text: 'Run calculation twice for cavity walls - outer brick, inner block.' }
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
        <meta name="keywords" content="garage brick calculator, how many bricks for garage, garage materials calculator UK, brick garage cost, single garage bricks, double garage bricks, garage building regulations, cavity wall garage" />
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
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-calculator-garage-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Brick Calculator for Garages - Free UK Calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/brick-calculator-garage-twitter.jpg" />
        <meta name="twitter:image:alt" content="Brick Calculator for Garages" />
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
                    <h2 className="font-semibold text-amber-900 mb-2">Tips for Garage Construction</h2>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Garage Construction</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Building a brick garage is a significant construction project that typically requires Building Regulations approval. Most UK garages use cavity wall construction with an outer brick skin, insulated cavity, and inner blockwork skin for optimal weatherproofing and thermal performance.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Calculating Garage Bricks</h3>
                  <p className="mb-4">To calculate bricks for a garage, you need to work out the total wall perimeter. For a standard single garage (3m x 6m external), the perimeter is 18 metres. Multiply by wall height and bricks per m2.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Cavity Wall Requirements</h3>
                  <p className="mb-4">For the outer skin, use facing bricks (60 per m2). For the inner skin, most builders use:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li><strong>100mm concrete blocks</strong> - 10.76 per m2, more economical</li>
                    <li><strong>Standard bricks</strong> - 60 per m2, if matching throughout</li>
                    <li><strong>Cavity width</strong> - typically 50-100mm with insulation</li>
                  </ul>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example: Single Garage (3m x 6m)</h4>
                    <p className="text-blue-800 text-sm">
                      Perimeter: (3 + 6) x 2 = 18m, Height: 2.4m<br />
                      Wall area: 18 x 2.4 = 43.2m2<br />
                      Less door opening: 43.2 - 4.4m2 = 38.8m2<br />
                      Outer skin: 38.8 x 60 = 2,328 bricks (+ 10% = 2,561)<br />
                      Inner skin: 38.8 x 10.76 = 418 blocks (+ 10% = 460)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Common Garage Sizes</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Single Garage (3m x 6m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Standard single car storage</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Perimeter: 18 linear metres</li>
                      <li>- Outer bricks: approx 2,500</li>
                      <li>- Inner blocks: approx 460</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Large Single (3.5m x 7m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Single car plus storage</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Perimeter: 21 linear metres</li>
                      <li>- Outer bricks: approx 3,000</li>
                      <li>- Inner blocks: approx 540</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Double Garage (6m x 6m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Two car storage side by side</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Perimeter: 24 linear metres</li>
                      <li>- Outer bricks: approx 3,500</li>
                      <li>- Inner blocks: approx 620</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Large Double (6m x 7m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Two cars plus workshop space</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Perimeter: 26 linear metres</li>
                      <li>- Outer bricks: approx 3,800</li>
                      <li>- Inner blocks: approx 680</li>
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
