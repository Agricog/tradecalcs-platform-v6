import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { BrickCalculatorCore } from '../../components/BrickBlockCalculator'
import LocationSupplierWidget from '../../components/LocationSupplierWidget'

// Use-case specific data - FULLY SEO OPTIMIZED
const usecaseData = {
  slug: 'garden-wall',
  title: 'Brick Calculator for Garden Walls',
  metaTitle: 'Brick Calculator for Garden Walls | Free UK Calculator 2025',
  metaDescription: 'Calculate exact bricks for garden walls, boundary walls, raised beds. Free UK calculator with wastage factor, mortar estimates, and pier calculations. Used by 10,000+ UK builders.',
  h1: 'Brick Calculator for Garden Walls',
  description: 'Building a garden wall? Calculate exactly how many bricks you need for boundary walls, decorative features, or raised beds. Our calculator accounts for wastage, mortar joints, and common bond patterns used in UK garden construction.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/brick-calculator/garden-wall',
  defaults: {
    materialType: 'brick' as const,
    length: '10',
    height: '1.2',
    wasteFactor: 5
  },
  tips: [
    'Garden walls over 2m require planning permission in most UK areas',
    'Add piers every 3m for structural stability on walls over 1m',
    'Use engineering bricks for the coping course to prevent water damage',
    'Frost-resistant bricks essential for any wall exposed to weather'
  ],
  relatedUsecases: [
    { slug: 'boundary-wall', title: 'Boundary Walls' },
    { slug: 'house-extension', title: 'House Extensions' }
  ],
  faqs: [
    {
      q: 'How many bricks do I need per square metre for a garden wall?',
      a: 'For a standard single-skin garden wall using standard UK bricks (215mm × 102.5mm × 65mm), you need approximately 60 bricks per square metre including 10mm mortar joints. This is the UK industry standard calculation used by professional bricklayers.'
    },
    {
      q: 'Do I need planning permission for a garden wall?',
      a: 'Garden walls under 2m don\'t usually need planning permission unless you\'re in a conservation area or the wall fronts a highway. Walls over 2m always require planning approval. Check with your local planning authority before starting work.'
    },
    {
      q: 'What wastage should I allow for a garden wall?',
      a: 'Allow 5% wastage for straightforward garden walls with simple rectangular layouts. Increase to 7-10% if you\'re creating decorative patterns, have multiple corners, or are building piers. Complex designs may need 15% wastage allowance.'
    },
    {
      q: 'What mortar mix should I use for a garden wall?',
      a: 'Use a standard 4:1 mix (4 parts soft sand to 1 part cement) for most garden walls. Add plasticiser to improve workability. For below-ground courses or very exposed walls, use a stronger 3:1 mix. Never use mortar in freezing conditions.'
    },
    {
      q: 'How deep should foundations be for a garden wall?',
      a: 'Foundations should be at least 300mm deep and 3× the wall width. For a single-skin wall (102.5mm), that\'s approximately 300mm wide × 300mm deep minimum. In clay soil or frost-prone areas, go deeper (450mm+) to prevent heave damage.'
    },
    {
      q: 'Can I build a garden wall myself?',
      a: 'Yes, garden walls under 1m are suitable DIY projects if you have basic bricklaying skills. Practice your technique on a test section first. Higher walls or structural walls should be built by a professional bricklayer to ensure safety and compliance.'
    },
    {
      q: 'How much sand and cement do I need for a garden wall?',
      a: 'For standard UK bricks, allow 40kg of building sand and 8kg of cement per square metre of wall using a 4:1 mortar ratio. A 10m² garden wall needs approximately 0.5 tonnes of sand and 4 bags (25kg each) of cement.'
    },
    {
      q: 'What type of bricks are best for garden walls?',
      a: 'Use frost-resistant facing bricks rated F2 or better for garden walls. Engineering bricks (Class A or B) are ideal for copings and below-ground courses. Avoid common bricks which absorb water and crack in frost. Match existing property bricks where possible.'
    },
    {
      q: 'Do I need piers in a garden wall?',
      a: 'Piers are required for single-skin walls over 1m high. Add piers every 3m along the wall length, plus at both ends. Piers should be 1.5 brick width (338mm) minimum and tied into the wall with header courses every alternate course.'
    },
    {
      q: 'How long does it take to build a garden wall?',
      a: 'An experienced bricklayer lays 400-500 bricks per day. A 10m × 1.2m garden wall (720 bricks) takes approximately 1.5-2 days for a professional. DIY builders should allow 2-3 times longer. Don\'t rush - accuracy matters more than speed.'
    }
  ]
}

export default function BrickCalculatorGardenWall() {
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
          { '@type': 'ListItem', position: 4, name: 'Garden Walls', item: usecaseData.canonicalUrl }
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
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '156', bestRating: '5', worstRating: '1' }
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
        name: 'How to Calculate Bricks for a Garden Wall',
        description: 'Step-by-step guide to calculating brick quantities for garden walls using the TradeCalcs calculator.',
        totalTime: 'PT2M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'GBP', value: '0' },
        tool: [{ '@type': 'HowToTool', name: 'TradeCalcs Brick Calculator' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Select Material Type', text: 'Choose Standard UK Bricks (60 per m²) for most garden walls.' },
          { '@type': 'HowToStep', position: 2, name: 'Enter Wall Length', text: 'Measure and enter your wall length in metres.' },
          { '@type': 'HowToStep', position: 3, name: 'Enter Wall Height', text: 'Enter wall height. Garden walls are typically 0.6m to 1.8m.' },
          { '@type': 'HowToStep', position: 4, name: 'Set Waste Factor', text: 'Set 5% for simple walls, 10% for complex patterns.' },
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
        <meta name="keywords" content="garden wall brick calculator, brick wall calculator UK, how many bricks garden wall, garden wall materials, bricklaying calculator, brick quantity calculator, mortar calculator garden wall, garden wall cost calculator" />
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
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-calculator-garden-wall-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Brick Calculator for Garden Walls - Free UK Calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/brick-calculator-garden-wall-twitter.jpg" />
        <meta name="twitter:image:alt" content="Brick Calculator for Garden Walls" />
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
                    <h2 className="font-semibold text-amber-900 mb-2">Tips for Garden Walls</h2>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Garden Wall Construction</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Garden walls are one of the most popular DIY bricklaying projects in the UK. Whether you're building a decorative boundary, creating raised beds, or adding privacy to your outdoor space, understanding the basics of brick calculation ensures you order the right materials and avoid costly mistakes.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">How Many Bricks Per Square Metre?</h3>
                  <p className="mb-4">Standard UK bricks measure 215mm × 102.5mm × 65mm. When laid with 10mm mortar joints, this equates to <strong>60 bricks per square metre</strong> for a single-skin (half-brick) wall.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Mortar Requirements</h3>
                  <p className="mb-4">Using the standard 4:1 mortar ratio (4 parts building sand to 1 part cement), you'll need approximately:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li><strong>40kg of building sand</strong> per square metre</li>
                    <li><strong>8kg of cement</strong> per square metre</li>
                    <li>Add plasticiser for improved workability</li>
                  </ul>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example Calculation</h4>
                    <p className="text-blue-800 text-sm">
                      For a 10m long × 1.2m high garden wall (12m²):<br />
                      • Bricks: 12 × 60 = 720 bricks (+ 5% waste = 756 bricks)<br />
                      • Sand: 12 × 40kg = 480kg (≈ 0.5 tonnes)<br />
                      • Cement: 12 × 8kg = 96kg (4 × 25kg bags)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Common Garden Wall Projects</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Low Decorative Wall (0.6m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Border edging, raised flower beds</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 36 bricks per linear metre</li>
                      <li>• No piers required</li>
                      <li>• 5% wastage typical</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Standard Garden Wall (1.2m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Privacy screening, boundary markers</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 72 bricks per linear metre</li>
                      <li>• Piers every 3m recommended</li>
                      <li>• 5-7% wastage typical</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Tall Boundary Wall (1.8m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Full privacy, security boundaries</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 108 bricks per linear metre</li>
                      <li>• Piers mandatory every 3m</li>
                      <li>• 7-10% wastage typical</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Maximum Height (2.0m)</h3>
                    <p className="text-sm text-gray-600 mb-2">Maximum without planning permission</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• 120 bricks per linear metre</li>
                      <li>• Piers mandatory every 2.5-3m</li>
                      <li>• 10% wastage recommended</li>
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
                <p className="text-white/90 text-sm mb-4">Get quotes from trusted bricklayers in your area.</p>
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
