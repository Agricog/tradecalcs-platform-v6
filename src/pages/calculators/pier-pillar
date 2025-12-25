import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { BrickCalculatorCore } from '../../components/BrickBlockCalculator'
import LocationSupplierWidget from '../../components/LocationSupplierWidget'

// Use-case specific data - FULLY SEO OPTIMIZED
const usecaseData = {
  slug: 'pier-pillar',
  title: 'Brick Calculator for Piers and Pillars',
  metaTitle: 'Brick Calculator for Piers and Pillars | Free UK Calculator 2025',
  metaDescription: 'Calculate exact bricks for gate piers, wall pillars, and support columns. Free UK calculator with foundation guidance, pier cap requirements, and structural support calculations.',
  h1: 'Brick Calculator for Piers and Pillars',
  description: 'Building gate piers, driveway pillars, or wall support columns? Calculate exactly how many bricks you need for freestanding piers and structural pillars. Our calculator covers decorative entrance pillars to structural wall supports.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/brick-calculator/pier-pillar',
  defaults: {
    materialType: 'brick' as const,
    length: '1.8',
    height: '1.5',
    wasteFactor: 7
  },
  tips: [
    'Gate piers should be at least 1.5 brick (337mm) square for stability',
    'Fill hollow piers with concrete and rebar for structural strength',
    'Foundations should be 3x the pier width and 450mm deep minimum',
    'Add pier caps to protect brickwork from water ingress'
  ],
  relatedUsecases: [
    { slug: 'boundary-wall', title: 'Boundary Walls' },
    { slug: 'garden-wall', title: 'Garden Walls' }
  ],
  faqs: [
    {
      q: 'How many bricks do I need for a gate pier?',
      a: 'A standard 1.5 brick pier (337mm x 337mm) at 1.5m height uses approximately 100-120 bricks. A larger 2 brick pier (450mm x 450mm) at the same height needs 140-160 bricks. The calculator helps estimate based on your specific dimensions.'
    },
    {
      q: 'What size should gate piers be?',
      a: 'For pedestrian gates, 1.5 brick piers (337mm square) are adequate. For vehicle gates or heavy wooden gates, use 2 brick piers (450mm square) minimum. Very heavy gates or automated gates may need 2.5 brick piers (565mm square) or reinforced concrete cores.'
    },
    {
      q: 'How deep should pier foundations be?',
      a: 'Pier foundations should be minimum 450mm deep and 3x the pier width. For a 337mm pier, the foundation should be approximately 1000mm square and 450mm deep. In clay soil or near trees, increase depth to 600-900mm.'
    },
    {
      q: 'Should I fill piers with concrete?',
      a: 'Yes, filling piers with concrete significantly increases strength and stability. For gate piers, insert steel rebar into the wet concrete for additional reinforcement. This is essential for piers supporting heavy gates or in exposed locations.'
    },
    {
      q: 'How do I build a brick pier?',
      a: 'Build piers in a bonding pattern where each course is rotated 90 degrees to create interlocking. Start with a full concrete foundation, lay DPC, then build up course by course checking plumb and level. Fill with concrete as you go or at completion.'
    },
    {
      q: 'What is a pier cap and do I need one?',
      a: 'Pier caps are protective tops that shed water away from the pier. They are strongly recommended to prevent water ingress which causes frost damage. Options include concrete caps, stone caps, brick-on-edge capping, or metal caps for a modern look.'
    },
    {
      q: 'How far apart should wall piers be?',
      a: 'For a standard half-brick wall, piers should be spaced every 3 metres maximum. For taller walls or exposed locations, reduce spacing to 2.4m or 1.8m. Piers are also required at corners, ends, and either side of gates.'
    },
    {
      q: 'Can I attach a gate directly to a brick pier?',
      a: 'Yes, but use proper gate hardware. For lightweight gates, coach bolts into the mortar joints work well. For heavier gates, use expanding anchors or chemical fixings into the bricks. Very heavy gates need hinge pins built into the pier during construction.'
    },
    {
      q: 'What mortar mix for piers?',
      a: 'Use a standard 4:1 mortar mix (4 parts soft sand to 1 part cement) with plasticiser. For piers below DPC or in very exposed locations, strengthen to 3:1. Ensure consistent joint thickness of 10mm throughout.'
    },
    {
      q: 'Do brick piers need Building Regulations approval?',
      a: 'Freestanding piers under 1m (or 2m if not beside a highway) generally do not need Building Regs approval. Piers supporting structures, attached to buildings, or over these heights may require approval. Always check for restrictive covenants.'
    }
  ]
}

export default function BrickCalculatorPier() {
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
          { '@type': 'ListItem', position: 4, name: 'Piers and Pillars', item: usecaseData.canonicalUrl }
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
        name: 'How to Calculate Bricks for Piers and Pillars',
        description: 'Step-by-step guide to calculating brick quantities for piers and pillars using the TradeCalcs calculator.',
        totalTime: 'PT2M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'GBP', value: '0' },
        tool: [{ '@type': 'HowToTool', name: 'TradeCalcs Brick Calculator' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Calculate Pier Perimeter', text: 'Add all four sides of the pier together.' },
          { '@type': 'HowToStep', position: 2, name: 'Multiply by Number of Piers', text: 'If building multiple piers, multiply perimeter by count.' },
          { '@type': 'HowToStep', position: 3, name: 'Enter Dimensions', text: 'Enter total perimeter as length, pier height as height.' },
          { '@type': 'HowToStep', position: 4, name: 'Set Waste Factor', text: 'Use 7% for piers - some cuts required for bonding.' },
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
        <meta name="keywords" content="brick pier calculator, gate pier bricks, pillar brick calculator, how many bricks for pier, driveway pillar bricks, wall pier calculator, brick column calculator, entrance pillar bricks" />
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
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-calculator-pier-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Brick Calculator for Piers and Pillars - Free UK Calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/brick-calculator-pier-twitter.jpg" />
        <meta name="twitter:image:alt" content="Brick Calculator for Piers and Pillars" />
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
                    <h2 className="font-semibold text-amber-900 mb-2">Tips for Piers and Pillars</h2>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Pier and Pillar Construction</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Brick piers and pillars are freestanding or semi-attached columns used for gate posts, driveway entrances, wall supports, and decorative features. Proper construction requires good foundations, correct bonding, and often concrete infill for strength.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Standard Pier Sizes</h3>
                  <p className="mb-4">Piers are measured in brick widths:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li><strong>1.5 brick pier (337mm x 337mm):</strong> Perimeter 1.35m - suitable for light gates</li>
                    <li><strong>2 brick pier (450mm x 450mm):</strong> Perimeter 1.8m - standard for vehicle gates</li>
                    <li><strong>2.5 brick pier (565mm x 565mm):</strong> Perimeter 2.26m - heavy or automated gates</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Calculating Pier Bricks</h3>
                  <p className="mb-4">To calculate bricks for piers, work out the total perimeter of all piers. For two matching gate piers, double the single pier perimeter.</p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example: Pair of 2 Brick Gate Piers at 1.5m High</h4>
                    <p className="text-blue-800 text-sm">
                      Single pier perimeter: 0.45 x 4 = 1.8m<br />
                      Two piers: 1.8 x 2 = 3.6m total perimeter<br />
                      Wall area: 3.6m x 1.5m = 5.4m2<br />
                      Bricks: 5.4 x 60 = 324 bricks (+ 7% = 347)<br />
                      Plus: Pier caps, concrete infill, rebar
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Common Pier Projects</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Pedestrian Gate Piers</h3>
                    <p className="text-sm text-gray-600 mb-2">1.5 brick piers, 1.2m high</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Per pier: approx 65 bricks</li>
                      <li>- Pair: approx 140 bricks</li>
                      <li>- Light concrete infill</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Driveway Gate Piers</h3>
                    <p className="text-sm text-gray-600 mb-2">2 brick piers, 1.5m high</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Per pier: approx 160 bricks</li>
                      <li>- Pair: approx 350 bricks</li>
                      <li>- Concrete + rebar infill</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Wall Support Piers</h3>
                    <p className="text-sm text-gray-600 mb-2">1.5 brick piers, wall height</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Per pier at 1.8m: approx 95 bricks</li>
                      <li>- Spaced every 3m max</li>
                      <li>- Bonded into wall</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Decorative Entrance Pillars</h3>
                    <p className="text-sm text-gray-600 mb-2">2.5 brick piers, 2m high</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Per pier: approx 270 bricks</li>
                      <li>- Pair: approx 580 bricks</li>
                      <li>- Stone caps, lighting options</li>
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
