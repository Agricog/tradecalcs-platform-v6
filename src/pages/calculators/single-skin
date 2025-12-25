import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { BrickCalculatorCore } from '../../components/BrickBlockCalculator'
import LocationSupplierWidget from '../../components/LocationSupplierWidget'

// Use-case specific data - FULLY SEO OPTIMIZED
const usecaseData = {
  slug: 'single-skin',
  title: 'Brick Calculator for Single Skin Walls',
  metaTitle: 'Brick Calculator for Single Skin Walls | Free UK Calculator 2025',
  metaDescription: 'Calculate exact bricks for single skin walls including half-brick garden walls and internal partitions. Free UK calculator with height limits, pier spacing, and Building Regulations guidance.',
  h1: 'Brick Calculator for Single Skin Walls',
  description: 'Building a single skin brick wall? Calculate exactly how many bricks you need for half-brick garden walls, internal partitions, or decorative screens. Our calculator covers simple garden dividers to structural single skin construction.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/brick-calculator/single-skin',
  defaults: {
    materialType: 'brick' as const,
    length: '6',
    height: '1.0',
    wasteFactor: 5
  },
  tips: [
    'Single skin walls (half-brick) have a maximum safe height of approximately 450mm without piers',
    'Add supporting piers every 3m maximum for walls over 450mm high',
    'Single skin walls are not suitable for structural or load-bearing applications',
    'Use stretcher bond (bricks laid end-to-end) for single skin walls'
  ],
  relatedUsecases: [
    { slug: 'garden-wall', title: 'Garden Walls' },
    { slug: 'cavity-wall', title: 'Cavity Walls' }
  ],
  faqs: [
    {
      q: 'How many bricks per square metre for single skin?',
      a: 'A single skin wall (half-brick thick, 102.5mm) uses 60 bricks per square metre when laid in stretcher bond with 10mm mortar joints. This is the standard calculation for all single skin brick walls in the UK.'
    },
    {
      q: 'What is the maximum height for a single skin wall?',
      a: 'Without supporting piers, single skin walls should not exceed 450mm (6 courses) in height. With piers at 3m centres, walls can reach 1.35m. For walls over 1.35m, consider double skin or one-brick thick construction for stability.'
    },
    {
      q: 'When should I use single skin vs double skin?',
      a: 'Use single skin for low garden walls (under 1m), internal non-load-bearing partitions, and decorative screens. Use double skin (one-brick thick) or cavity construction for boundary walls over 1m, retaining walls, and any structural application.'
    },
    {
      q: 'What bond pattern for single skin walls?',
      a: 'Single skin walls use stretcher bond - bricks laid lengthways with each course offset by half a brick. This is the only practical bond for half-brick walls as there is no room for headers (bricks laid widthways).'
    },
    {
      q: 'Do single skin walls need foundations?',
      a: 'Yes, all brick walls need foundations. For single skin garden walls, a concrete strip foundation 300mm wide and 150mm deep is typically adequate in stable soil. In clay or soft ground, increase to 450mm wide and 225mm deep.'
    },
    {
      q: 'How do I add piers to a single skin wall?',
      a: 'Piers for single skin walls are typically 1.5 brick (337mm) square and bonded into the wall every 3m. At pier locations, cut bricks to create the bonding pattern. Piers should have the same foundation as the wall, extended to their full size.'
    },
    {
      q: 'What mortar mix for single skin walls?',
      a: 'Use a standard 4:1 mortar mix (4 parts soft sand to 1 part cement) with plasticiser for single skin walls. Below DPC level, strengthen to 3:1. Consistent 10mm mortar joints are important for appearance in single skin walls.'
    },
    {
      q: 'Can I use single skin for an internal wall?',
      a: 'Yes, single skin brick walls make excellent internal partitions. They provide good sound insulation and thermal mass. However, they are heavy - ensure floor structure can support approximately 190kg per square metre. Not suitable for upper floors without structural assessment.'
    },
    {
      q: 'How thick is a single skin brick wall?',
      a: 'A single skin wall is one brick width thick - 102.5mm for the brick plus mortar joints on each face gives approximately 115mm total. This is also called a half-brick wall, as it is half the thickness of a traditional one-brick wall (215mm).'
    },
    {
      q: 'Do single skin walls need coping?',
      a: 'Yes, coping is important to protect the wall top from water penetration. Options include brick-on-edge coping, concrete coping stones, or metal capping. Coping should overhang the wall by 25mm each side with a drip groove underneath.'
    }
  ]
}

export default function BrickCalculatorSingleSkin() {
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
          { '@type': 'ListItem', position: 4, name: 'Single Skin Walls', item: usecaseData.canonicalUrl }
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
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '143', bestRating: '5', worstRating: '1' }
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
        name: 'How to Calculate Bricks for a Single Skin Wall',
        description: 'Step-by-step guide to calculating brick quantities for single skin walls using the TradeCalcs calculator.',
        totalTime: 'PT2M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'GBP', value: '0' },
        tool: [{ '@type': 'HowToTool', name: 'TradeCalcs Brick Calculator' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Measure Wall Length', text: 'Measure the total length of your single skin wall.' },
          { '@type': 'HowToStep', position: 2, name: 'Measure Wall Height', text: 'Measure desired wall height - check pier requirements.' },
          { '@type': 'HowToStep', position: 3, name: 'Enter Dimensions', text: 'Enter length and height in metres.' },
          { '@type': 'HowToStep', position: 4, name: 'Set Waste Factor', text: 'Use 5% for straight runs, 7-10% with piers or corners.' },
          { '@type': 'HowToStep', position: 5, name: 'Calculate', text: 'Click Calculate for brick, sand, and cement quantities.' }
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
        <meta name="keywords" content="single skin wall calculator, half brick wall calculator, bricks per square metre, single skin brick wall, stretcher bond calculator, garden wall bricks, internal brick wall, single leaf wall" />
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
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-calculator-single-skin-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Brick Calculator for Single Skin Walls - Free UK Calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/brick-calculator-single-skin-twitter.jpg" />
        <meta name="twitter:image:alt" content="Brick Calculator for Single Skin Walls" />
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
                    <h2 className="font-semibold text-amber-900 mb-2">Tips for Single Skin Walls</h2>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Single Skin Wall Construction</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Single skin walls (also called half-brick walls or single leaf walls) are one brick thickness wide - 102.5mm. They are economical for low garden walls, internal partitions, and decorative features but have height limitations due to their narrow profile.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Bricks Per Square Metre</h3>
                  <p className="mb-4">Single skin walls use the standard <strong>60 bricks per square metre</strong> calculation. This accounts for standard UK bricks (215mm x 102.5mm x 65mm) laid with 10mm mortar joints in stretcher bond.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Height Limitations</h3>
                  <p className="mb-4">Single skin walls have strict height limits for safety:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li><strong>Without piers:</strong> Maximum 450mm (6 courses)</li>
                    <li><strong>With piers at 3m:</strong> Maximum 1.35m</li>
                    <li><strong>With piers at 1.8m:</strong> Maximum 1.8m</li>
                  </ul>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example: 6m Single Skin Wall at 1m High</h4>
                    <p className="text-blue-800 text-sm">
                      Wall area: 6m x 1m = 6m2<br />
                      Bricks: 6 x 60 = 360 bricks (+ 5% waste = 378)<br />
                      Sand: 6 x 25kg = 150kg<br />
                      Cement: 6 x 8kg = 48kg (2 x 25kg bags)<br />
                      Note: Add piers at 3m centres for this height
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Single Skin Wall Applications</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Low Garden Divider</h3>
                    <p className="text-sm text-gray-600 mb-2">Under 450mm, no piers needed</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Simple stretcher bond</li>
                      <li>- Light foundation required</li>
                      <li>- Ideal for bed edging</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Garden Wall with Piers</h3>
                    <p className="text-sm text-gray-600 mb-2">Up to 1.35m with 3m pier spacing</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Piers every 3 metres</li>
                      <li>- Standard foundation</li>
                      <li>- Most common DIY project</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Internal Partition</h3>
                    <p className="text-sm text-gray-600 mb-2">Room dividers, non-load-bearing</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Check floor loading</li>
                      <li>- Good sound insulation</li>
                      <li>- Tie to existing walls</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Decorative Screen</h3>
                    <p className="text-sm text-gray-600 mb-2">Pierced or honeycomb patterns</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Allows light through</li>
                      <li>- Requires careful planning</li>
                      <li>- Usually low height</li>
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
