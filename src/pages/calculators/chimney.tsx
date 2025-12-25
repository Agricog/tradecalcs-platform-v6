import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { BrickCalculatorCore } from '../../components/BrickBlockCalculator'
import LocationSupplierWidget from '../../components/LocationSupplierWidget'

// Use-case specific data - FULLY SEO OPTIMIZED
const usecaseData = {
  slug: 'chimney',
  title: 'Brick Calculator for Chimneys',
  metaTitle: 'Brick Calculator for Chimneys | Free UK Calculator 2025',
  metaDescription: 'Calculate exact bricks for chimney construction and repairs. Free UK calculator with flue liner guidance, Building Regulations requirements, and chimney stack dimensions for UK homes.',
  h1: 'Brick Calculator for Chimneys',
  description: 'Building or repairing a chimney? Calculate exactly how many bricks you need for chimney stacks, breast removal support, or rebuilding above roofline. Our calculator covers standard UK chimney dimensions with Building Regulations guidance.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/brick-calculator/chimney',
  defaults: {
    materialType: 'brick' as const,
    length: '2.4',
    height: '2.0',
    wasteFactor: 10
  },
  tips: [
    'Chimney work above roofline requires scaffolding and is best left to professionals',
    'All chimney work must comply with Building Regulations Part J (Heat Producing Appliances)',
    'Use Class A engineering bricks for the first metre above roof level for weather resistance',
    'Flue liners are mandatory for all new chimneys and most refurbishments'
  ],
  relatedUsecases: [
    { slug: 'house-extension', title: 'House Extensions' },
    { slug: 'garage', title: 'Garages' }
  ],
  faqs: [
    {
      q: 'How many bricks are in a standard chimney stack?',
      a: 'A typical single-flue chimney stack (450mm x 450mm) rising 1m above the roof requires approximately 150-180 bricks. A double-flue stack (450mm x 900mm) needs 250-300 bricks for the same height. Add 60 bricks per additional 225mm course of height.'
    },
    {
      q: 'Do I need Building Regulations approval for chimney work?',
      a: 'Yes, all chimney construction and significant repairs require Building Regulations approval under Part J. This includes new chimneys, flue liner installation, chimney breast removal, and rebuilding above roofline. A competent person scheme installer can self-certify some work.'
    },
    {
      q: 'What type of bricks should I use for a chimney?',
      a: 'Use Class A engineering bricks for the chimney stack above roof level - they have low water absorption and high frost resistance. Standard facing bricks can be used inside the roof space. Match existing bricks where possible for repairs.'
    },
    {
      q: 'How tall should a chimney be above the roof?',
      a: 'Building Regulations require chimneys to be at least 1m above the highest point of contact with the roof, and at least 1m higher than any opening window within 2.3m horizontally. Thatched roofs require 1.8m minimum height.'
    },
    {
      q: 'Do I need a flue liner?',
      a: 'Yes, flue liners are required for all new chimneys and when installing new appliances in existing chimneys. Flexible stainless steel liners are most common for gas and oil. Clay or concrete liners are used for solid fuel. The liner must match the appliance requirements.'
    },
    {
      q: 'How much does chimney repointing cost?',
      a: 'Professional chimney repointing costs 300-800 pounds depending on chimney size, access, and condition. The work requires scaffolding (150-400 pounds) and typically takes 1-2 days. Materials (mortar, sealant) cost 50-100 pounds for a DIY approach if access is safe.'
    },
    {
      q: 'Can I remove a chimney breast myself?',
      a: 'Chimney breast removal is structural work requiring Building Regulations approval and usually a structural engineer calculation. The chimney stack above must be properly supported with gallows brackets or RSJs. This is not a DIY job - always use a professional builder.'
    },
    {
      q: 'What mortar mix should I use for chimney repairs?',
      a: 'Use a 3:1 mortar mix (3 parts sharp sand to 1 part cement) for chimney work above roofline due to severe weather exposure. Add waterproofer and frost-proofer to the mix. For flaunching (the mortar around pots), use the same strong mix.'
    },
    {
      q: 'How do I calculate bricks for a chimney stack?',
      a: 'Measure the chimney perimeter (all four sides added together) and multiply by the height. For a 450mm x 450mm stack: perimeter = 1.8m. At 1m height = 1.8m2 wall area. Multiply by 60 bricks per m2 = 108 bricks plus 10% waste = 119 bricks.'
    },
    {
      q: 'Do chimney pots need replacing?',
      a: 'Replace chimney pots if cracked, loose, or the wrong size for your flue liner. Standard pot sizes are 185mm, 225mm, and 300mm internal diameter. The pot should extend at least 150mm above the flaunching. Terracotta pots last longest in UK weather.'
    }
  ]
}

export default function BrickCalculatorChimney() {
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
          { '@type': 'ListItem', position: 4, name: 'Chimneys', item: usecaseData.canonicalUrl }
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
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', ratingCount: '98', bestRating: '5', worstRating: '1' }
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
        name: 'How to Calculate Bricks for a Chimney',
        description: 'Step-by-step guide to calculating brick quantities for chimney construction using the TradeCalcs calculator.',
        totalTime: 'PT3M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'GBP', value: '0' },
        tool: [{ '@type': 'HowToTool', name: 'TradeCalcs Brick Calculator' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Measure Chimney Perimeter', text: 'Add all four sides of the chimney stack together.' },
          { '@type': 'HowToStep', position: 2, name: 'Measure Height', text: 'Measure from roof level to top of stack.' },
          { '@type': 'HowToStep', position: 3, name: 'Enter Dimensions', text: 'Enter perimeter as length, height as height.' },
          { '@type': 'HowToStep', position: 4, name: 'Set Waste Factor', text: 'Use 10% for chimney work due to cuts and access.' },
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
        <meta name="keywords" content="chimney brick calculator, how many bricks for chimney, chimney stack bricks, chimney repair bricks UK, chimney building regulations, flue liner calculator, chimney repointing cost, chimney breast removal" />
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
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-calculator-chimney-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Brick Calculator for Chimneys - Free UK Calculator" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/brick-calculator-chimney-twitter.jpg" />
        <meta name="twitter:image:alt" content="Brick Calculator for Chimneys" />
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
                    <h2 className="font-semibold text-amber-900 mb-2">Tips for Chimney Work</h2>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Chimney Construction</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">Chimney construction and repair requires specialist knowledge due to Building Regulations, working at height requirements, and the structural nature of the work. Most chimney work above roofline should be carried out by experienced professionals with proper scaffolding.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Standard Chimney Stack Sizes</h3>
                  <p className="mb-4">UK chimney stacks are built to standard dimensions based on the number of flues:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li><strong>Single flue:</strong> 450mm x 450mm (1.8m perimeter)</li>
                    <li><strong>Double flue:</strong> 450mm x 900mm (2.7m perimeter)</li>
                    <li><strong>Triple flue:</strong> 450mm x 1350mm (3.6m perimeter)</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Calculating Chimney Bricks</h3>
                  <p className="mb-4">Enter the chimney perimeter as your wall length and the height above roof as your wall height. The calculator gives bricks for the external structure - flue liners are separate.</p>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example: Single Flue Stack 1m Above Roof</h4>
                    <p className="text-blue-800 text-sm">
                      Perimeter: 0.45 + 0.45 + 0.45 + 0.45 = 1.8m<br />
                      Wall area: 1.8m x 1.0m = 1.8m2<br />
                      Bricks: 1.8 x 60 = 108 bricks (+ 10% = 119)<br />
                      Plus: Flue liner, chimney pot, flaunching mortar
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Common Chimney Projects</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Chimney Repointing</h3>
                    <p className="text-sm text-gray-600 mb-2">Mortar joint repairs</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- No new bricks usually needed</li>
                      <li>- Strong 3:1 mortar mix</li>
                      <li>- Scaffolding required</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Partial Rebuild</h3>
                    <p className="text-sm text-gray-600 mb-2">Top courses damaged</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- Typically 50-100 bricks</li>
                      <li>- Match existing bricks</li>
                      <li>- Building Regs may apply</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Full Stack Rebuild</h3>
                    <p className="text-sm text-gray-600 mb-2">Above roofline rebuild</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- 120-300 bricks typical</li>
                      <li>- Building Regs required</li>
                      <li>- Professional job</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">New Chimney</h3>
                    <p className="text-sm text-gray-600 mb-2">Complete new construction</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>- 500-1500+ bricks</li>
                      <li>- Full Building Regs</li>
                      <li>- Structural support needed</li>
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
                <p className="text-white/90 text-sm mb-4">Get quotes from trusted chimney specialists in your area.</p>
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
