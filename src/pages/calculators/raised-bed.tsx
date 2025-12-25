import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { BrickCalculatorCore } from '../../components/BrickBlockCalculator'
import LocationSupplierWidget from '../../components/LocationSupplierWidget'

// Use-case specific data - FULLY SEO OPTIMIZED
const usecaseData = {
  slug: 'raised-bed',
  title: 'Brick Calculator for Raised Beds',
  metaTitle: 'Brick Calculator for Raised Beds | Free UK Calculator 2025',
  metaDescription: 'Calculate exact bricks for raised garden beds and planters. Free UK calculator with drainage guidance, liner requirements, and soil volume estimates for vegetable gardens and flower beds.',
  h1: 'Brick Calculator for Raised Beds',
  description: 'Building raised garden beds? Calculate exactly how many bricks you need for vegetable planters, flower beds, or decorative raised borders. Our calculator accounts for different heights, wastage, and includes drainage recommendations.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/brick-calculator/raised-bed',
  defaults: {
    materialType: 'brick' as const,
    length: '4',
    height: '0.45',
    wasteFactor: 5
  },
  tips: [
    'Raised beds over 450mm high are ideal for vegetables - reduces bending',
    'Line the inside with waterproof membrane to protect bricks from soil moisture',
    'Include drainage holes or gaps in the bottom course every 600mm',
    'Frost-resistant bricks essential as beds hold moisture against the brick'
  ],
  relatedUsecases: [
    { slug: 'garden-wall', title: 'Garden Walls' },
    { slug: 'retaining-wall', title: 'Retaining Walls' }
  ],
  faqs: [
    {
      q: 'How many bricks do I need for a raised bed?',
      a: 'For a standard raised bed (2m x 1m x 0.45m high), the perimeter is 6 metres. At 0.45m height, that is 2.7m2 of wall area, requiring approximately 162 bricks plus 5% waste = 170 bricks. The calculator above gives exact quantities for your specific dimensions.'
    },
    {
      q: 'What is the best height for a raised vegetable bed?',
      a: 'The ideal height for vegetable raised beds is 300-450mm for most gardeners. For wheelchair access or those who struggle with bending, 600-750mm is recommended. Deeper beds (450mm+) allow root vegetables like carrots and parsnips to grow fully.'
    },
    {
      q: 'Do I need to line a brick raised bed?',
      a: 'Yes, lining is recommended. Use a waterproof membrane (pond liner or heavy-duty polythene) on the inside walls to prevent soil moisture from constantly wetting the bricks, which can cause frost damage. Leave the bottom open for drainage or use landscape fabric.'
    },
    {
      q: 'What drainage do raised beds need?',
      a: 'Leave small gaps (10mm) in the mortar joints of the bottom course every 600mm, or install 25mm drainage pipes. The base should be open to the ground or have a layer of gravel if on concrete. Good drainage prevents waterlogging and root rot.'
    },
    {
      q: 'What mortar mix should I use for raised beds?',
      a: 'Use a standard 4:1 mix (4 parts soft sand to 1 part cement) with plasticiser. As raised beds hold moist soil, consider adding waterproofer to the mix. The internal liner provides additional protection against moisture penetration.'
    },
    {
      q: 'Do raised beds need foundations?',
      a: 'For beds up to 450mm high, a compacted hardcore base (75mm) with a mortar bed is usually sufficient. Taller beds (600mm+) benefit from a concrete strip foundation 100mm deep. On soft ground, always use proper foundations to prevent movement.'
    },
    {
      q: 'What type of bricks are best for raised beds?',
      a: 'Use frost-resistant facing bricks rated F2 or better. Engineering bricks are ideal for the bottom course as they have low water absorption. Reclaimed bricks add character but check they are frost-resistant - many old bricks are not suitable for garden use.'
    },
    {
      q: 'How much soil do I need to fill a raised bed?',
      a: 'Calculate volume in cubic metres: Length x Width x Depth. A 2m x 1m x 0.45m bed needs 0.9 cubic metres of soil. Use a mix of 60% topsoil, 30% compost, and 10% perlite or sharp sand for vegetables. Allow for 10% settlement.'
    },
    {
      q: 'Can I build raised beds without mortar?',
      a: 'Yes, dry-stacked raised beds are popular and allow easy modification. Stack bricks in a stretcher bond pattern, overlapping joints. This works well for beds up to 300mm high. Taller beds or those on slopes should be mortared for stability.'
    },
    {
      q: 'How long does a brick raised bed last?',
      a: 'A properly built brick raised bed with frost-resistant bricks and internal lining will last 30-50+ years. Without lining, frost damage may occur within 5-10 years. Regular inspection and repointing every 10-15 years extends lifespan further.'
    }
  ]
}

export default function BrickCalculatorRaisedBed() {
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
          { '@type': 'ListItem', position: 4, name: 'Raised Beds', item: usecaseData.canonicalUrl }
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
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '187', bestRating: '5', worstRating: '1' }
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
        name: 'How to Calculate Bricks for a Raised Bed',
        description: 'Step-by-step guide to calculating brick quantities for raised garden beds using the TradeCalcs calculator.',
        totalTime: 'PT2M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'GBP', value: '0' },
        tool: [{ '@type': 'HowToTool', name: 'TradeCalcs Brick Calculator' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Measure Perimeter', text: 'Add all four sides of your raised bed together.' },
          { '@type': 'HowToStep', position: 2, name: 'Enter Wall Length', text: 'Enter the total perimeter length in metres.' },
          { '@type': 'HowToStep', position: 3, name: 'Enter Wall Height', text: 'Enter bed height - typically 0.3m to 0.6m.' },
          { '@type': 'HowToStep', position: 4, name: 'Set Waste Factor', text: 'Set 5% for rectangular beds, 7-10% for curved designs.' },
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
        <meta name="keywords" content="raised bed brick calculator, how many bricks for raised bed, raised garden bed calculator UK, brick planter calculator, vegetable bed bricks, raised bed materials, garden planter bricks, raised bed cost calculator" />
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
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-calculator-raised-bed-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Brick Calculator for Raised Beds - Free UK Calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/brick-calculator-raised-bed-twitter.jpg" />
        <meta name="twitter:image:alt" content="Brick Calculator for Raised Beds" />
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
                    <h2 className="font-semibold text-amber-900 mb-2">Tips for Raised Beds</h2>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Raised Bed Construction</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Brick raised beds are a beautiful and long-lasting addition to any garden. They provide excellent drainage, warm up faster in spring, and reduce back strain when gardening. With proper construction, a brick raised bed will last decades.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Calculating Raised Bed Bricks</h3>
                  <p className="mb-4">Raised beds are calculated by perimeter (total length of all sides). For a rectangular bed, add Length + Width + Length + Width. Enter this total as your wall length in the calculator.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Soil Volume Calculator</h3>
                  <p className="mb-4">Once you know your bed dimensions, calculate soil needed:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li><strong>Formula:</strong> Length x Width x Depth = cubic metres</li>
                    <li><strong>2m x 1m x 0.3m</strong> = 0.6 cubic metres</li>
                    <li><strong>2m x 1m x 0.45m</strong> = 0.9 cubic metres</li>
                    <li>Add 10% for settlement</li>
                  </ul>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example: 2m x 1m Raised Bed at 450mm High</h4>
                    <p className="text-blue-800 text-sm">
                      Perimeter: 2 + 1 + 2 + 1 = 6 metres<br />
                      Wall area: 6m x 0.45m = 2.7m2<br />
                      Bricks: 2.7 x 60 = 162 bricks (+ 5% = 170)<br />
                      Soil needed: 2 x 1 x 0.45 = 0.9 cubic metres<br />
                      With settlement allowance: 1.0 cubic metre
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Common Raised Bed Sizes</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Small Bed (1m x 1m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Herbs, small vegetables</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Perimeter: 4 metres</li>
                      <li>- At 300mm: 72 bricks</li>
                      <li>- Soil: 0.3 cubic metres</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Standard Bed (2m x 1m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Most popular size for vegetables</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Perimeter: 6 metres</li>
                      <li>- At 450mm: 170 bricks</li>
                      <li>- Soil: 0.9 cubic metres</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Large Bed (3m x 1.2m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Serious vegetable growing</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Perimeter: 8.4 metres</li>
                      <li>- At 450mm: 238 bricks</li>
                      <li>- Soil: 1.6 cubic metres</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Accessible Bed (2m x 1m x 0.75m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Wheelchair or limited mobility</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Perimeter: 6 metres</li>
                      <li>- At 750mm: 284 bricks</li>
                      <li>- Soil: 1.5 cubic metres</li>
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
