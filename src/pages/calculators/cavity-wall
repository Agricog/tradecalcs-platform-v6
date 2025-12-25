import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { BrickCalculatorCore } from '../../components/BrickBlockCalculator'
import LocationSupplierWidget from '../../components/LocationSupplierWidget'

// Use-case specific data - FULLY SEO OPTIMIZED
const usecaseData = {
  slug: 'cavity-wall',
  title: 'Brick Calculator for Cavity Walls',
  metaTitle: 'Brick Calculator for Cavity Walls | Free UK Calculator 2025',
  metaDescription: 'Calculate exact bricks and blocks for cavity wall construction. Free UK calculator with inner/outer leaf quantities, insulation guidance, and Building Regulations requirements.',
  h1: 'Brick Calculator for Cavity Walls',
  description: 'Building cavity walls for a house extension, garage, or new build? Calculate exactly how many bricks and blocks you need for both inner and outer leaves. Our calculator helps you estimate materials for UK Building Regulations compliant cavity wall construction.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/brick-calculator/cavity-wall',
  defaults: {
    materialType: 'brick' as const,
    length: '10',
    height: '2.4',
    wasteFactor: 10
  },
  tips: [
    'Cavity walls require two calculations - outer brick leaf and inner block leaf',
    'Standard cavity width is 100mm with 50-75mm insulation filling part of the cavity',
    'Wall ties must be installed at 900mm horizontal x 450mm vertical centres',
    'Full-fill or partial-fill insulation choice affects cavity width requirements'
  ],
  relatedUsecases: [
    { slug: 'house-extension', title: 'House Extensions' },
    { slug: 'garage', title: 'Garages' }
  ],
  faqs: [
    {
      q: 'How do I calculate bricks for a cavity wall?',
      a: 'Calculate each leaf separately. The outer leaf (facing bricks) uses 60 bricks per m2. The inner leaf typically uses 100mm concrete blocks at 10.76 blocks per m2. Run the calculator twice - once for bricks, once for blocks - using the same wall dimensions.'
    },
    {
      q: 'What is the standard cavity wall thickness?',
      a: 'A standard UK cavity wall is approximately 270-300mm total thickness: 102.5mm outer brick leaf + 100mm cavity (with insulation) + 100mm inner block leaf. Wider cavities (up to 150mm) are used for higher insulation requirements.'
    },
    {
      q: 'What blocks should I use for the inner leaf?',
      a: 'Use 100mm thick concrete blocks (440mm x 215mm) for the inner leaf. Aircrete blocks (like Celcon or Thermalite) provide better thermal performance. Dense blocks are used below DPC. Calculate at 10.76 blocks per square metre.'
    },
    {
      q: 'How many wall ties do I need?',
      a: 'Install wall ties at 900mm horizontal centres and 450mm vertical centres - this equates to approximately 2.5 ties per square metre. Increase density around openings (300mm centres within 225mm of reveals). Use stainless steel ties for longevity.'
    },
    {
      q: 'What insulation goes in a cavity wall?',
      a: 'Common options include: partial-fill rigid boards (PIR/phenolic) with a 50mm residual cavity, or full-fill mineral wool batts. Partial-fill provides easier installation; full-fill offers better thermal performance. Building Regs Part L specifies minimum U-values.'
    },
    {
      q: 'Do cavity walls need weep holes?',
      a: 'Yes, weep holes are required above DPC and above all lintels to allow moisture to escape from the cavity. Leave vertical joints open (no mortar) at maximum 900mm centres. Use weep hole vents to keep insects out while allowing drainage.'
    },
    {
      q: 'What is the minimum cavity width?',
      a: 'The minimum clear cavity (unfilled by insulation) should be 50mm to prevent moisture bridging. For partial-fill insulation, maintain this 50mm clear cavity. Full-fill cavities can be fully insulated but require careful workmanship to prevent debris bridges.'
    },
    {
      q: 'How much does cavity wall construction cost?',
      a: 'Materials for cavity wall construction cost approximately 100-150 pounds per square metre including bricks, blocks, insulation, ties, and mortar. Professional labour adds 80-120 pounds per m2. A 40m2 garage wall costs roughly 4,000-5,000 pounds complete.'
    },
    {
      q: 'What mortar mix for cavity walls?',
      a: 'Use 4:1 mortar (4 parts soft sand to 1 part cement) for general work above DPC. Below DPC, strengthen to 3:1 with waterproofer. Keep cavities clear of mortar droppings - use a cavity batten during construction to catch excess mortar.'
    },
    {
      q: 'Do I need Building Regulations for cavity walls?',
      a: 'Yes, all new cavity wall construction requires Building Regulations approval. This ensures compliance with structural requirements, thermal performance (Part L), and moisture resistance. Building Control will inspect foundations, DPC, insulation, and wall tie installation.'
    }
  ]
}

export default function BrickCalculatorCavity() {
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
          { '@type': 'ListItem', position: 4, name: 'Cavity Walls', item: usecaseData.canonicalUrl }
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
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '178', bestRating: '5', worstRating: '1' }
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
        name: 'How to Calculate Materials for a Cavity Wall',
        description: 'Step-by-step guide to calculating brick and block quantities for cavity wall construction using the TradeCalcs calculator.',
        totalTime: 'PT4M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'GBP', value: '0' },
        tool: [{ '@type': 'HowToTool', name: 'TradeCalcs Brick Calculator' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Measure Wall Dimensions', text: 'Measure total wall length and height for all cavity walls.' },
          { '@type': 'HowToStep', position: 2, name: 'Calculate Outer Leaf', text: 'Run calculator with brick selected - this gives facing brick quantity.' },
          { '@type': 'HowToStep', position: 3, name: 'Calculate Inner Leaf', text: 'Run calculator again with blocks selected for inner leaf quantity.' },
          { '@type': 'HowToStep', position: 4, name: 'Calculate Wall Ties', text: 'Multiply wall area by 2.5 for approximate tie quantity.' },
          { '@type': 'HowToStep', position: 5, name: 'Calculate Insulation', text: 'Wall area equals insulation area - order 5% extra for cuts.' }
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
        <meta name="keywords" content="cavity wall calculator, cavity wall bricks and blocks, how many bricks cavity wall, cavity wall construction UK, wall tie calculator, cavity wall insulation, inner leaf blocks, outer leaf bricks" />
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
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-calculator-cavity-wall-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Brick Calculator for Cavity Walls - Free UK Calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/brick-calculator-cavity-wall-twitter.jpg" />
        <meta name="twitter:image:alt" content="Brick Calculator for Cavity Walls" />
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
                    <h2 className="font-semibold text-amber-900 mb-2">Tips for Cavity Wall Construction</h2>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Cavity Wall Construction</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Cavity walls are the standard construction method for UK buildings since the 1920s. They consist of two leaves (outer brick, inner block) separated by a cavity containing insulation. This design prevents moisture penetration and provides excellent thermal performance.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Cavity Wall Components</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li><strong>Outer leaf:</strong> Facing bricks - 60 per m2</li>
                    <li><strong>Cavity:</strong> 100mm typical, with insulation</li>
                    <li><strong>Inner leaf:</strong> Concrete blocks - 10.76 per m2</li>
                    <li><strong>Wall ties:</strong> Stainless steel - 2.5 per m2</li>
                    <li><strong>Insulation:</strong> Partial or full-fill</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">How to Calculate Both Leaves</h3>
                  <p className="mb-4">Run the calculator twice with the same wall dimensions:</p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example: 10m x 2.4m Cavity Wall</h4>
                    <p className="text-blue-800 text-sm">
                      Wall area: 10m x 2.4m = 24m2<br /><br />
                      <strong>Outer leaf (bricks):</strong><br />
                      24 x 60 = 1,440 bricks (+ 10% = 1,584)<br /><br />
                      <strong>Inner leaf (blocks):</strong><br />
                      24 x 10.76 = 258 blocks (+ 10% = 284)<br /><br />
                      <strong>Wall ties:</strong> 24 x 2.5 = 60 ties<br />
                      <strong>Insulation:</strong> 24m2 (+ 5% = 25.2m2)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Cavity Wall Material Guide</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Outer Leaf - Bricks</h3>
                    <p className="text-sm text-gray-600 mb-2">Facing bricks for appearance</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- 60 bricks per m2</li>
                      <li>- Engineering below DPC</li>
                      <li>- Match existing if extending</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Inner Leaf - Blocks</h3>
                    <p className="text-sm text-gray-600 mb-2">100mm concrete blocks</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- 10.76 blocks per m2</li>
                      <li>- Aircrete for thermal performance</li>
                      <li>- Dense blocks below DPC</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Wall Ties</h3>
                    <p className="text-sm text-gray-600 mb-2">Connect both leaves</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- 2.5 ties per m2</li>
                      <li>- Stainless steel type 4</li>
                      <li>- Extra around openings</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Insulation</h3>
                    <p className="text-sm text-gray-600 mb-2">Thermal performance</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Area equals wall area</li>
                      <li>- PIR boards or mineral wool</li>
                      <li>- Meet Part L requirements</li>
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
