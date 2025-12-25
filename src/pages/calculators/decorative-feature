import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { BrickCalculatorCore } from '../../components/BrickBlockCalculator'
import LocationSupplierWidget from '../../components/LocationSupplierWidget'

// Use-case specific data - FULLY SEO OPTIMIZED
const usecaseData = {
  slug: 'decorative-feature',
  title: 'Brick Calculator for Decorative Features',
  metaTitle: 'Brick Calculator for Decorative Features | Free UK Calculator 2025',
  metaDescription: 'Calculate exact bricks for decorative brick features, arches, patterns, and architectural details. Free UK calculator with design ideas, bond patterns, and special brick requirements.',
  h1: 'Brick Calculator for Decorative Features',
  description: 'Creating decorative brickwork features? Calculate exactly how many bricks you need for arches, patterns, feature walls, honeycomb screens, and architectural details. Our calculator helps estimate materials for creative brick projects.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/brick-calculator/decorative-feature',
  defaults: {
    materialType: 'brick' as const,
    length: '3',
    height: '1.2',
    wasteFactor: 15
  },
  tips: [
    'Allow 15-20% extra wastage for decorative work due to cutting and pattern matching',
    'Order all bricks from the same batch to ensure consistent colour throughout',
    'Feature bonds like Flemish or English require headers - plan your pattern carefully',
    'Consider using special shaped bricks (bullnose, plinth, cant) for professional finishes'
  ],
  relatedUsecases: [
    { slug: 'garden-wall', title: 'Garden Walls' },
    { slug: 'boundary-wall', title: 'Boundary Walls' }
  ],
  faqs: [
    {
      q: 'How many extra bricks do I need for decorative patterns?',
      a: 'Allow 15-20% extra wastage for decorative brickwork compared to 5-10% for standard work. Complex patterns, angled cuts, and feature bonds generate more waste. Honeycomb or pierced patterns may need 25% extra due to precise cutting requirements.'
    },
    {
      q: 'What is a feature bond pattern?',
      a: 'Feature bonds are decorative brick laying patterns that create visual interest. Popular options include Flemish bond (alternating headers and stretchers), English bond (rows of headers alternating with stretchers), herringbone, and basket weave. Each creates a distinct appearance.'
    },
    {
      q: 'How do I calculate bricks for an arch?',
      a: 'For a semicircular arch, calculate the circumference (pi x diameter / 2) as your length, with arch depth as height. A 900mm wide arch with 215mm depth needs approximately 25-30 bricks. Special tapered arch bricks or careful cutting of standard bricks is required.'
    },
    {
      q: 'What are special shaped bricks?',
      a: 'Special shaped bricks (specials) include bullnose (rounded edge), cant (angled corner), plinth (tapered), coping (wall cap), and radial (for curves). They provide professional finishes but cost 3-5x standard bricks. Plan quantities carefully as specials are often made to order.'
    },
    {
      q: 'How do I create a honeycomb brick screen?',
      a: 'Honeycomb screens are built by leaving gaps between bricks in a pattern. The most common is quarter-bond honeycomb where bricks are spaced one quarter-brick apart. You use fewer bricks than a solid wall (approximately 45 per m2 vs 60) but allow 15% extra for cutting.'
    },
    {
      q: 'Can I mix brick colours in decorative work?',
      a: 'Yes, mixing brick colours creates striking decorative effects. Popular combinations include red with blue engineering bricks for diaper patterns, or contrasting headers and stretchers. Ensure all bricks have similar dimensions and absorption rates for consistent mortar joints.'
    },
    {
      q: 'What mortar colour for decorative brickwork?',
      a: 'Mortar colour significantly affects the final appearance. Options include natural grey, white, black, buff, and red. Use pigmented mortars or coloured pointing for contrast. Consider a flush or weathered joint profile to showcase the brickwork pattern.'
    },
    {
      q: 'How do I build a brick soldier course?',
      a: 'Soldier courses have bricks standing upright (on end) in a row. They require careful setting out and are often used above windows/doors or as decorative bands. A soldier course uses more bricks per linear metre than stretcher courses - approximately 13 bricks per metre.'
    },
    {
      q: 'What is diaper brickwork?',
      a: 'Diaper is a decorative pattern created by using contrasting coloured bricks to form diamond or lattice designs within a wall. Traditional patterns use blue engineering bricks against red stocks. Calculate total wall bricks, then determine the percentage of each colour from your design.'
    },
    {
      q: 'How much do decorative brick features cost?',
      a: 'Decorative brickwork costs 50-100% more than standard work due to skilled labour requirements, wastage, and potentially special bricks. Budget 150-250 pounds per m2 for feature walls with patterns, compared to 80-120 pounds for standard brickwork. Arches and specials add further costs.'
    }
  ]
}

export default function BrickCalculatorDecorative() {
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
          { '@type': 'ListItem', position: 4, name: 'Decorative Features', item: usecaseData.canonicalUrl }
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
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '89', bestRating: '5', worstRating: '1' }
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
        name: 'How to Calculate Bricks for Decorative Features',
        description: 'Step-by-step guide to calculating brick quantities for decorative brickwork using the TradeCalcs calculator.',
        totalTime: 'PT3M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'GBP', value: '0' },
        tool: [{ '@type': 'HowToTool', name: 'TradeCalcs Brick Calculator' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Sketch Your Design', text: 'Draw your decorative feature with dimensions.' },
          { '@type': 'HowToStep', position: 2, name: 'Calculate Area', text: 'Work out the total surface area of the feature.' },
          { '@type': 'HowToStep', position: 3, name: 'Enter Dimensions', text: 'Enter length and height into the calculator.' },
          { '@type': 'HowToStep', position: 4, name: 'Set Higher Waste', text: 'Use 15-20% waste factor for decorative work.' },
          { '@type': 'HowToStep', position: 5, name: 'Plan Special Bricks', text: 'List any special shaped bricks needed separately.' }
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
        <meta name="keywords" content="decorative brick calculator, feature wall bricks, brick arch calculator, brick pattern calculator, Flemish bond bricks, honeycomb brick screen, special shaped bricks, decorative brickwork UK" />
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
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-calculator-decorative-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Brick Calculator for Decorative Features - Free UK Calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/brick-calculator-decorative-twitter.jpg" />
        <meta name="twitter:image:alt" content="Brick Calculator for Decorative Features" />
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
                    <h2 className="font-semibold text-amber-900 mb-2">Tips for Decorative Brickwork</h2>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Decorative Brickwork</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Decorative brickwork transforms ordinary walls into architectural features. From traditional bond patterns to modern geometric designs, brick offers endless creative possibilities. The key to successful decorative work is careful planning, quality materials, and skilled execution.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Wastage for Decorative Work</h3>
                  <p className="mb-4">Decorative brickwork generates more waste than standard construction:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li><strong>Standard stretcher bond:</strong> 5-7% waste</li>
                    <li><strong>Feature bonds (Flemish, English):</strong> 10-12% waste</li>
                    <li><strong>Patterns and diaper work:</strong> 15-18% waste</li>
                    <li><strong>Curves, arches, honeycomb:</strong> 20-25% waste</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Planning Your Design</h3>
                  <p className="mb-4">Before calculating quantities, sketch your design to scale. Mark dimensions, identify where special bricks are needed, and plan the bond pattern. This helps avoid costly mistakes and material shortages.</p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example: 3m x 1.2m Feature Wall in Flemish Bond</h4>
                    <p className="text-blue-800 text-sm">
                      Wall area: 3m x 1.2m = 3.6m2<br />
                      Base bricks: 3.6 x 60 = 216 bricks<br />
                      Flemish bond wastage (12%): 216 x 1.12 = 242 bricks<br />
                      Round up for safety: 250 bricks<br />
                      Note: Flemish bond uses headers - check brick depth matches
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Decorative Brick Features</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Feature Bond Patterns</h3>
                    <p className="text-sm text-gray-600 mb-2">Flemish, English, Herringbone</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- 60 bricks per m2 (standard)</li>
                      <li>- Allow 10-12% extra waste</li>
                      <li>- Plan header positions</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Honeycomb Screens</h3>
                    <p className="text-sm text-gray-600 mb-2">Pierced patterns for light/air</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Approx 45 bricks per m2</li>
                      <li>- Allow 15-20% extra waste</li>
                      <li>- Careful spacing required</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Brick Arches</h3>
                    <p className="text-sm text-gray-600 mb-2">Semicircular, segmental, Gothic</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- 25-40 bricks per arch typical</li>
                      <li>- Tapered or cut bricks needed</li>
                      <li>- Temporary support required</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Diaper Patterns</h3>
                    <p className="text-sm text-gray-600 mb-2">Diamond designs in contrasting colours</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- 60 bricks per m2 total</li>
                      <li>- Plan colour percentages</li>
                      <li>- Order from same batches</li>
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
                <p className="text-white/90 text-sm mb-4">Get quotes from skilled bricklayers in your area.</p>
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
