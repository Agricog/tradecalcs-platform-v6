import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { BrickCalculatorCore } from '../../components/BrickBlockCalculator'
import LocationSupplierWidget from '../../components/LocationSupplierWidget'

const usecaseData = {
  slug: 'house-extension',
  title: 'Brick Calculator for House Extensions',
  metaTitle: 'Brick Calculator for House Extensions | UK Building Calculator 2025',
  metaDescription: 'Calculate bricks for single and double storey extensions. Cavity wall calculations with Building Regulations compliance for UK projects. Used by 15,000+ UK builders.',
  h1: 'Brick Calculator for House Extensions',
  description: 'Planning a house extension? Calculate the exact bricks needed for cavity walls, including inner and outer leaf calculations. Our calculator helps you estimate materials for single-storey, double-storey, and wrap-around extensions to UK Building Regulations standards.',
  canonicalUrl: 'https://tradecalcs.co.uk/calculators/brick-calculator/house-extension',
  defaults: {
    materialType: 'brick' as const,
    length: '5',
    height: '2.4',
    wasteFactor: 10
  },
  tips: [
    'Cavity walls are mandatory for habitable extensions under Building Regulations',
    'Match existing brick bond pattern for seamless integration with your home',
    'Order 10% extra to account for cuts, damage, and future repairs',
    'Factor in lintels, DPC, and wall ties separately from brick count'
  ],
  relatedUsecases: [
    { slug: 'garden-wall', title: 'Garden Walls' },
    { slug: 'boundary-wall', title: 'Boundary Walls' }
  ],
  faqs: [
    {
      q: 'How do I calculate bricks for a cavity wall extension?',
      a: 'Calculate each leaf separately. A standard cavity wall needs approximately 120 bricks per square metre total (60 for outer leaf facing bricks, 60 for inner leaf if using bricks, or 10.76 blocks per m² for concrete block inner leaf). Add wall ties at 2.5 per square metre.'
    },
    {
      q: 'Should I match existing bricks on my extension?',
      a: 'Yes, for best visual results. Take a sample brick to merchants for colour matching. New bricks will weather over 2-3 years to blend with existing brickwork. Some manufacturers can match specific brick types if you know the original make.'
    },
    {
      q: 'What Building Regulations apply to extension brickwork?',
      a: 'Part L (thermal performance), Part A (structural), and Part E (sound) all apply. Cavity walls must include appropriate insulation to meet current U-value requirements of 0.28 W/m²K or better for walls.'
    },
    {
      q: 'How thick should cavity walls be for an extension?',
      a: 'Modern Building Regulations typically require 100mm cavity minimum for insulation. Total wall thickness is usually 300mm+ (102.5mm outer brick + 100mm cavity + 100mm block inner leaf). Some designs use wider cavities for enhanced thermal performance.'
    },
    {
      q: 'Do I need Building Control approval for an extension?',
      a: 'Yes, all house extensions require Building Regulations approval regardless of size. You\'ll need structural calculations, energy assessments, and inspections at foundation, DPC, first floor, and completion stages.'
    },
    {
      q: 'Can I use blocks instead of bricks for the inner leaf?',
      a: 'Yes, and this is standard practice. The inner leaf is typically 100mm concrete blocks (10.76 per m²), which are cheaper and faster to lay. Facing bricks are used on the outer leaf only where visible.'
    },
    {
      q: 'How many wall ties do I need for an extension?',
      a: 'Minimum 2.5 wall ties per square metre in the body of the wall, increasing to 4 per m² around openings and at corners. Use stainless steel ties in coastal areas. For a 20m² wall, that\'s 50-80 wall ties.'
    },
    {
      q: 'What wastage factor for extension brickwork?',
      a: 'Allow 10% wastage for standard extension work. Increase to 12-15% for complex shapes, multiple openings, or decorative features. This accounts for cuts around windows/doors, breakage, and variations.'
    },
    {
      q: 'How long does it take to build extension walls?',
      a: 'A professional bricklayer lays 400-600 bricks per day. A typical single-storey rear extension (30m² external walls) requires approximately 3,600 facing bricks and takes 6-8 days for the brickwork alone. Weather delays can extend this.'
    },
    {
      q: 'What insulation goes in extension cavity walls?',
      a: 'Full-fill cavity insulation (mineral wool batts or rigid PIR boards) or partial-fill with retained air gap. Insulation must achieve Part L U-value requirements. Common products include Celotex, Kingspan, or Knauf Dritherm.'
    }
  ]
}

export default function BrickCalculatorHouseExtension() {
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
          { '@type': 'ListItem', position: 4, name: 'House Extensions', item: usecaseData.canonicalUrl }
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
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '203', bestRating: '5', worstRating: '1' }
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
        name: 'How to Calculate Bricks for a House Extension',
        description: 'Step-by-step guide to calculating brick quantities for house extension cavity walls.',
        totalTime: 'PT5M',
        estimatedCost: { '@type': 'MonetaryAmount', currency: 'GBP', value: '0' },
        tool: [{ '@type': 'HowToTool', name: 'TradeCalcs Brick Calculator' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Measure External Walls', text: 'Calculate total external wall area (length × height) minus openings.' },
          { '@type': 'HowToStep', position: 2, name: 'Calculate Outer Leaf', text: 'Use calculator with Standard UK Bricks (60/m²) for facing bricks.' },
          { '@type': 'HowToStep', position: 3, name: 'Calculate Inner Leaf', text: 'Run again with 100mm Blocks (10.76/m²) for inner blockwork.' },
          { '@type': 'HowToStep', position: 4, name: 'Add Wall Ties', text: 'Calculate wall ties at 2.5 per m² of wall area.' },
          { '@type': 'HowToStep', position: 5, name: 'Apply Wastage', text: 'Add 10% wastage to all quantities for cuts and breakage.' }
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
        <meta name="keywords" content="house extension brick calculator, cavity wall calculator, extension materials UK, building regs extension, bricks for extension, extension cost calculator, single storey extension bricks, double storey extension calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#ea580c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TradeCalcs" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={usecaseData.canonicalUrl} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/brick-calculator-house-extension-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@TradeCalcs" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/brick-calculator-house-extension-twitter.jpg" />
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-blue-900 mb-1">Cavity Wall Note</h2>
                    <p className="text-sm text-blue-800">House extensions require cavity walls. Calculate outer leaf (facing bricks) and inner leaf (typically blocks) separately, then combine totals.</p>
                  </div>
                </div>
              </div>

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
                    <h2 className="font-semibold text-amber-900 mb-2">Tips for House Extensions</h2>
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
                <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Extension Cavity Walls</h2>
                <div className="prose prose-sm max-w-none text-gray-700">
                  <p className="mb-4">All habitable house extensions in the UK require cavity wall construction to meet Building Regulations.</p>

                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Typical Cavity Wall Specification</h3>
                  <ul className="list-disc pl-6 mb-4 space-y-1">
                    <li><strong>Outer leaf:</strong> 102.5mm facing bricks (60 per m²)</li>
                    <li><strong>Cavity:</strong> 100mm with full-fill insulation</li>
                    <li><strong>Inner leaf:</strong> 100mm concrete blocks (10.76 per m²)</li>
                    <li><strong>Wall ties:</strong> Stainless steel, 2.5 per m²</li>
                  </ul>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Example: 4m × 3m Single Storey Extension</h4>
                    <p className="text-blue-800 text-sm">
                      Perimeter: (4 + 3 + 4) × 2.4m = 26.4m² gross<br />
                      Less openings: 4.7m² = 21.7m² net<br />
                      <strong>Outer leaf:</strong> 21.7 × 60 = 1,302 bricks + 10% = 1,433 bricks<br />
                      <strong>Inner leaf:</strong> 21.7 × 10.76 = 234 blocks + 10% = 258 blocks
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Common Extension Sizes</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Small Rear Extension</h3>
                    <p className="text-sm text-gray-600 mb-2">3m × 3m single storey</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• External walls: ~22m²</li>
                      <li>• Facing bricks: ~1,450</li>
                      <li>• Concrete blocks: ~260</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Medium Rear Extension</h3>
                    <p className="text-sm text-gray-600 mb-2">4m × 4m single storey</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• External walls: ~29m²</li>
                      <li>• Facing bricks: ~1,900</li>
                      <li>• Concrete blocks: ~345</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Large Rear Extension</h3>
                    <p className="text-sm text-gray-600 mb-2">5m × 4m single storey</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• External walls: ~31m²</li>
                      <li>• Facing bricks: ~2,050</li>
                      <li>• Concrete blocks: ~370</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Two Storey Extension</h3>
                    <p className="text-sm text-gray-600 mb-2">3m × 4m over two floors</p>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• External walls: ~48m²</li>
                      <li>• Facing bricks: ~3,200</li>
                      <li>• Concrete blocks: ~570</li>
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

              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <h3 className="font-semibold text-red-900 mb-2">⚠️ Building Regulations</h3>
                <p className="text-sm text-red-800">All house extensions require Building Regulations approval. Contact your local Building Control office before starting work.</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Part L Requirements</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-gray-50 rounded"><span className="text-gray-700">External walls</span><span className="font-medium text-gray-900">0.28 W/m²K</span></div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded"><span className="text-gray-700">Floors</span><span className="font-medium text-gray-900">0.22 W/m²K</span></div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded"><span className="text-gray-700">Roofs</span><span className="font-medium text-gray-900">0.16 W/m²K</span></div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded"><span className="text-gray-700">Windows</span><span className="font-medium text-gray-900">1.6 W/m²K</span></div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">Need Professional Help?</h3>
                <p className="text-white/90 text-sm mb-4">Get quotes from trusted builders in your area.</p>
                <button className="w-full py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors">Get Free Quotes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
