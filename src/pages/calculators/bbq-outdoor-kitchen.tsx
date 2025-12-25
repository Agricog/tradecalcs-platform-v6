import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { BrickCalculatorCore } from '../../components/BrickBlockCalculator'
import LocationSupplierWidget from '../../components/LocationSupplierWidget'

// Use-case specific data - FULLY SEO OPTIMIZED
const usecaseData = {
  slug: 'bbq-outdoor-kitchen',
  title: 'Brick Calculator for BBQs and Outdoor Kitchens',
  metaTitle: 'Brick Calculator for BBQ and Outdoor Kitchen | Free UK Calculator 2025',
  metaDescription: 'Calculate exact bricks for built-in BBQs, outdoor kitchens, and pizza ovens. Free UK calculator with fire brick guidance, worktop support, and design tips for outdoor cooking spaces.',
  h1: 'Brick Calculator for BBQs and Outdoor Kitchens',
  description: 'Building a brick BBQ, outdoor kitchen, or pizza oven? Calculate exactly how many bricks you need for your outdoor cooking project. Our calculator covers simple BBQ stands to full outdoor kitchen installations.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/brick-calculator/bbq-outdoor-kitchen',
  defaults: {
    materialType: 'brick' as const,
    length: '3',
    height: '0.9',
    wasteFactor: 7
  },
  tips: [
    'Use fire bricks (refractory bricks) for the firebox area - standard bricks will crack with heat',
    'Allow 50mm gaps for expansion in the firebox construction',
    'Standard bricks are fine for the outer structure and base',
    'Consider prevailing wind direction when positioning your BBQ'
  ],
  relatedUsecases: [
    { slug: 'garden-wall', title: 'Garden Walls' },
    { slug: 'raised-bed', title: 'Raised Beds' }
  ],
  faqs: [
    {
      q: 'How many bricks do I need for a simple brick BBQ?',
      a: 'A basic brick BBQ (1m wide x 0.6m deep x 0.9m high) uses approximately 200-250 standard bricks for the outer structure, plus 30-50 fire bricks for the firebox lining. The calculator above helps you estimate quantities based on your specific dimensions.'
    },
    {
      q: 'Do I need fire bricks for a BBQ?',
      a: 'Yes, fire bricks (refractory bricks) are essential for the firebox area where flames and coals directly contact the brick. Standard bricks will crack and deteriorate rapidly when exposed to high heat. Use standard bricks for the outer structure only.'
    },
    {
      q: 'What is the best height for a brick BBQ?',
      a: 'The ideal cooking height is 850-950mm from ground to grill level. This provides comfortable cooking position for most adults. The firebox below is typically 300-400mm deep, with the base structure supporting it.'
    },
    {
      q: 'Can I use normal cement with fire bricks?',
      a: 'No, use fire cement (refractory cement) or fire clay mortar for fire bricks. Standard cement will crack and fail at high temperatures. Fire cement is heat-resistant to 1000C+ and is available from builders merchants and DIY stores.'
    },
    {
      q: 'How much does a brick BBQ cost to build?',
      a: 'A simple brick BBQ costs 300-500 pounds in materials including bricks, fire bricks, mortar, and grill grates. A more elaborate outdoor kitchen with worktops and storage can cost 1,500-5,000 pounds in materials. Labour adds 50-100% if hiring a professional.'
    },
    {
      q: 'Do I need planning permission for an outdoor kitchen?',
      a: 'Most brick BBQs and outdoor kitchens under 2.5m high fall under Permitted Development and do not need planning permission. However, if you are in a conservation area, listed building curtilage, or building near boundaries, check with your local planning authority.'
    },
    {
      q: 'What foundation does a brick BBQ need?',
      a: 'A concrete slab foundation 100-150mm thick is recommended. Size should be 150mm larger than the BBQ footprint on all sides. Allow the concrete to cure for at least 7 days before building. On existing patio slabs, check they are stable and level.'
    },
    {
      q: 'How do I waterproof an outdoor kitchen?',
      a: 'Apply a masonry sealer to the finished brickwork to protect against rain and frost. Use waterproof covers when not in use. The firebox area does not need sealing as it should remain dry from use. Consider a roof or pergola for year-round protection.'
    },
    {
      q: 'What size fire bricks do I need?',
      a: 'Standard fire bricks are 230mm x 114mm x 76mm. For a typical BBQ firebox, you need approximately 30-50 fire bricks depending on the design. Line the base, back, and sides of the firebox. Leave expansion gaps of 3-5mm between bricks.'
    },
    {
      q: 'Can I build a pizza oven with standard bricks?',
      a: 'The outer dome can use standard bricks, but the cooking floor and inner dome must use fire bricks. Pizza ovens reach 400-500C, far exceeding what standard bricks can handle. A basic pizza oven needs 150-200 fire bricks plus 300-400 standard bricks.'
    }
  ]
}

export default function BrickCalculatorBBQ() {
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
          { '@type': 'ListItem', position: 4, name: 'BBQ and Outdoor Kitchen', item: usecaseData.canonicalUrl }
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
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '134', bestRating: '5', worstRating: '1' }
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
        name: 'How to Calculate Bricks for a BBQ or Outdoor Kitchen',
        description: 'Step-by-step guide to calculating brick quantities for outdoor cooking projects using the TradeCalcs calculator.',
        totalTime: 'PT3M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'GBP', value: '0' },
        tool: [{ '@type': 'HowToTool', name: 'TradeCalcs Brick Calculator' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Measure Outer Structure', text: 'Calculate the perimeter of your BBQ base and walls.' },
          { '@type': 'HowToStep', position: 2, name: 'Enter Dimensions', text: 'Enter total wall length and height in the calculator.' },
          { '@type': 'HowToStep', position: 3, name: 'Set Waste Factor', text: 'Use 7-10% for BBQ projects with cuts and angles.' },
          { '@type': 'HowToStep', position: 4, name: 'Calculate Fire Bricks Separately', text: 'Estimate firebox lining - typically 30-50 fire bricks.' },
          { '@type': 'HowToStep', position: 5, name: 'Order Materials', text: 'Order standard bricks, fire bricks, and fire cement separately.' }
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
        <meta name="keywords" content="brick BBQ calculator, outdoor kitchen bricks, how many bricks for BBQ, fire brick calculator, pizza oven bricks, built in BBQ UK, outdoor kitchen cost, brick barbecue plans" />
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
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-calculator-bbq-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Brick Calculator for BBQ and Outdoor Kitchen - Free UK Calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/brick-calculator-bbq-twitter.jpg" />
        <meta name="twitter:image:alt" content="Brick Calculator for BBQ and Outdoor Kitchen" />
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
                    <h2 className="font-semibold text-amber-900 mb-2">Tips for BBQs and Outdoor Kitchens</h2>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding BBQ and Outdoor Kitchen Construction</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">A brick BBQ or outdoor kitchen is a fantastic addition to any garden, providing a permanent cooking station that lasts for decades. The key is understanding which bricks to use where - standard bricks for structure, fire bricks for heat exposure.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Two Types of Bricks Needed</h3>
                  <p className="mb-4">BBQ projects require two distinct brick types:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li><strong>Standard facing bricks</strong> - For outer structure, base, and decorative elements (60 per m2)</li>
                    <li><strong>Fire bricks (refractory)</strong> - For firebox lining where heat is intense (sold individually)</li>
                    <li><strong>Fire cement</strong> - Special mortar for fire brick joints (do not use standard cement)</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Mortar Requirements</h3>
                  <p className="mb-4">Use standard 4:1 mortar for the outer structure. For fire bricks, use fire cement only - it is heat resistant to 1000C+ and will not crack like standard cement.</p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example: Simple Brick BBQ (1m x 0.6m x 0.9m)</h4>
                    <p className="text-blue-800 text-sm">
                      Outer structure perimeter: (1 + 0.6) x 2 = 3.2m<br />
                      Wall area: 3.2m x 0.9m = 2.88m2<br />
                      Standard bricks: 2.88 x 60 = 173 (+ 7% = 185 bricks)<br />
                      Fire bricks for firebox: approximately 40<br />
                      Fire cement: 1-2 tubs
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Common BBQ and Outdoor Kitchen Projects</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Simple BBQ Stand</h3>
                    <p className="text-sm text-gray-600 mb-2">Basic charcoal BBQ</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Standard bricks: 150-200</li>
                      <li>- Fire bricks: 30-40</li>
                      <li>- Build time: 1-2 days</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">BBQ with Side Counter</h3>
                    <p className="text-sm text-gray-600 mb-2">Cooking plus prep space</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Standard bricks: 300-400</li>
                      <li>- Fire bricks: 40-50</li>
                      <li>- Build time: 2-3 days</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Full Outdoor Kitchen</h3>
                    <p className="text-sm text-gray-600 mb-2">BBQ, counter, storage, sink</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Standard bricks: 600-1000</li>
                      <li>- Fire bricks: 50-80</li>
                      <li>- Build time: 4-7 days</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Pizza Oven</h3>
                    <p className="text-sm text-gray-600 mb-2">Traditional wood-fired dome</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Standard bricks: 300-400</li>
                      <li>- Fire bricks: 150-200</li>
                      <li>- Build time: 3-5 days</li>
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
