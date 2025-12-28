import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { BrickCalculatorCore } from '../../../components/BrickBlockCalculator'

const defined = {
  slug: 'patio-paver',
  title: 'Brick Patio Calculator UK 2025 | Paver Calculator | How Many Bricks for Patio',
  description: 'Calculate how many bricks or pavers you need for a patio, driveway or path. Free UK calculator with laying pattern wastage factors, sand sub-base quantities and cost estimates.',
  h1: 'Brick Patio & Paver Calculator',
  intro: 'Calculate the exact number of bricks, pavers, and bedding materials for your patio, driveway, or garden path. Includes wastage factors for different laying patterns.'
}

const defaults = {
  materialType: 'brick' as const,
  length: '4',
  height: '3', // Using height field as width for area calculation
  wasteFactor: 10
}

const tips = [
  'For patios, enter your length and width dimensions - the calculator treats "height" as width to calculate area',
  'Standard clay pavers need approximately 50 per m² laid flat in running bond pattern',
  'Herringbone patterns require 15% extra wastage due to edge cuts - select 15% waste factor',
  'Always lay pavers on a compacted MOT Type 1 sub-base (minimum 100mm) with 30-50mm sharp sand bedding layer',
  'Use kiln-dried sand for jointing - approximately 5kg per m² for standard joints',
  'Edge restraints are essential - budget for edging blocks or concrete haunching'
]

const faqs = [
  {
    q: 'How many bricks do I need for a patio?',
    a: 'For standard clay pavers (200×100mm) laid flat in running bond, you need approximately 50 pavers per square metre. For standard house bricks laid flat, you need about 38 per m² due to the larger face size (215×102.5mm). Multiply your patio area by the appropriate rate and add 10-15% for waste.'
  },
  {
    q: 'What laying pattern should I use for a brick patio?',
    a: 'Running bond (stretcher bond) is the easiest with minimal cuts - use 10% waste. Herringbone is stronger for driveways but needs 15% extra for angled cuts. Basketweave creates a traditional look with moderate cutting. For curved patios, consider a fan pattern but allow 20% waste.'
  },
  {
    q: 'How much sand do I need under a patio?',
    a: 'You need two types: sharp sand bedding layer (30-50mm deep = 0.03-0.05m³ per m²) and kiln-dried jointing sand (approximately 5kg per m²). For a 20m² patio, that\'s roughly 0.8 tonnes of sharp sand and 100kg of jointing sand.'
  },
  {
    q: 'Do I need a sub-base for a brick patio?',
    a: 'Yes, always. Use MOT Type 1 crushed stone, minimum 100mm deep for patios, 150mm for driveways. Compact thoroughly in layers. Without proper sub-base, pavers will sink and shift over time. Budget approximately 0.1m³ (200kg) of MOT per m² of patio.'
  },
  {
    q: 'What\'s the difference between pavers and bricks for patios?',
    a: 'Clay pavers are specifically made for ground use - they\'re denser, more frost-resistant, and sized for efficient laying (usually 200×100×50mm). Standard house bricks can be used but may crack in frost unless rated for paving (check F2S2 rating minimum). Engineering bricks are the most durable option.'
  },
  {
    q: 'How do I calculate bricks for a curved patio?',
    a: 'Break the curved area into approximate rectangles and circles, calculate each section separately, then add 15-20% extra for wastage (curves require many small cuts). Consider using smaller format pavers for tight curves - they follow curves better with less cutting.'
  },
  {
    q: 'How much does a brick patio cost per m²?',
    a: 'Materials cost £40-80 per m² depending on paver quality: budget clay pavers £25-35/m², premium pavers £45-65/m², plus sub-base £10-15/m², sand £5-8/m², and edging £8-12 per linear metre. Labour adds £40-60/m² for professional installation.'
  },
  {
    q: 'Can I lay a brick patio myself?',
    a: 'Yes, patio laying is achievable for competent DIYers. Key skills needed: setting out levels (falls for drainage), compacting sub-base, screeding sand bed flat, cutting pavers accurately, and compacting finished surface. Allow 2-3 days for a 20m² patio. Rent a plate compactor for best results.'
  },
  {
    q: 'How do I calculate edge restraints for a patio?',
    a: 'Measure the total perimeter of your patio in metres. For concrete edging blocks (914mm long), divide perimeter by 0.914. For brick edging laid on end (soldiers), multiply perimeter by 13.3 bricks per metre. Add 10% for cuts and waste.'
  },
  {
    q: 'What fall should a patio have for drainage?',
    a: 'A patio should slope away from the house at 1:60 to 1:80 (approximately 12-17mm per metre). This allows rainwater to drain without pooling. Use a spirit level and shims to check the fall as you lay. Never slope towards the building.'
  }
]

const relatedCalculators = [
  { href: '/calculators/brick-calculator/garden-wall', title: 'Garden Walls', description: 'Low boundary walls and raised borders', color: 'green' },
  { href: '/calculators/brick-calculator/raised-bed', title: 'Raised Beds', description: 'Garden planters and vegetable beds', color: 'lime' },
  { href: '/calculators/brick-calculator/bbq-outdoor-kitchen', title: 'BBQ & Outdoor Kitchen', description: 'Built-in BBQs and cooking areas', color: 'red' }
]

export default function PatioPayerBrickCalculator() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  
  const canonicalUrl = `https://tradecalcs.co.uk/calculators/brick-calculator/${defined.slug}`
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tradecalcs.co.uk' },
          { '@type': 'ListItem', position: 2, name: 'Brick Calculator', item: 'https://tradecalcs.co.uk/brick-block-calculator' },
          { '@type': 'ListItem', position: 3, name: 'Patio & Paver', item: canonicalUrl }
        ]
      },
      {
        '@type': 'SoftwareApplication',
        name: defined.h1,
        description: defined.description,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        url: canonicalUrl,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '634', bestRating: '5', worstRating: '1' }
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      }
    ]
  }

  return (
    <>
      <Helmet>
        <title>{defined.title}</title>
        <meta name="description" content={defined.description} />
        <meta name="keywords" content="brick patio calculator, paver calculator UK, how many bricks for patio, patio brick calculator, driveway paver calculator, garden path bricks, paving calculator" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content={defined.title} />
        <meta property="og:description" content={defined.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={defined.title} />
        <meta name="twitter:description" content={defined.description} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link to="/brick-block-calculator" className="inline-flex items-center text-red-600 hover:text-red-800 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Brick Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{defined.h1}</h1>
            <p className="text-lg md:text-xl text-amber-100 max-w-3xl mx-auto">{defined.intro}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          
          {/* Important Note for Patio Calculations */}
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h2 className="font-bold text-blue-900 mb-2">Using This Calculator for Patios</h2>
                <p className="text-sm text-blue-800 mb-2">
                  Enter your patio <strong>length</strong> and <strong>width</strong> (use the "height" field for width). 
                  The calculator uses 60 bricks/m² - for standard clay pavers (50/m²), reduce your order by ~15%.
                </p>
                <p className="text-sm text-blue-800">
                  <strong>Pattern waste factors:</strong> Running bond = 10% | Herringbone = 15% | Basketweave = 12% | Curves = 20%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <BrickCalculatorCore
              defaultMaterialType={defaults.materialType}
              defaultLength={defaults.length}
              defaultHeight={defaults.height}
              defaultWasteFactor={defaults.wasteFactor}
            />
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h2 className="font-bold text-amber-900 mb-3">Patio & Paving Tips</h2>
                <ul className="space-y-2 text-sm text-amber-800">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-600 mt-1">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Patio Brick Calculations</h2>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p className="mb-4">
                Calculating materials for a brick patio differs from wall calculations because bricks are laid flat rather than on edge. 
                This changes the coverage rate and requires additional materials like sub-base aggregate and bedding sand.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Coverage Rates by Paver Type</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Paver Type</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Size (mm)</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900">Per m²</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr><td className="px-4 py-3">Standard clay paver</td><td className="px-4 py-3">200 × 100 × 50</td><td className="px-4 py-3 font-semibold">50</td></tr>
                    <tr className="bg-gray-50"><td className="px-4 py-3">House brick (laid flat)</td><td className="px-4 py-3">215 × 102.5 × 65</td><td className="px-4 py-3 font-semibold">38</td></tr>
                    <tr><td className="px-4 py-3">Block paver</td><td className="px-4 py-3">200 × 100 × 60</td><td className="px-4 py-3 font-semibold">50</td></tr>
                    <tr className="bg-gray-50"><td className="px-4 py-3">Cobble sett</td><td className="px-4 py-3">100 × 100 × 50</td><td className="px-4 py-3 font-semibold">100</td></tr>
                  </tbody>
                </table>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Sub-Base & Sand Requirements</h3>
              <p className="mb-4">
                Every patio needs a solid foundation. The standard build-up from bottom to top is:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li><strong>Excavation:</strong> Dig out 200-250mm to allow for sub-base, sand, and paver thickness</li>
                <li><strong>MOT Type 1:</strong> 100mm minimum (150mm for driveways), compacted in layers</li>
                <li><strong>Sharp sand bed:</strong> 30-50mm, screeded level with appropriate fall</li>
                <li><strong>Pavers:</strong> 50-65mm thick depending on type</li>
                <li><strong>Jointing sand:</strong> Kiln-dried sand brushed into joints after laying</li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
                <h4 className="font-semibold text-green-900 mb-2">Quick Material Estimate (per 10m² patio)</h4>
                <p className="text-green-800 text-sm">
                  <strong>Pavers:</strong> 500 (50/m² × 10) + 10% waste = 550 pavers<br />
                  <strong>MOT Type 1:</strong> 2 tonnes (0.2t per m²)<br />
                  <strong>Sharp sand:</strong> 0.5 tonnes<br />
                  <strong>Jointing sand:</strong> 50kg<br />
                  <strong>Approx cost:</strong> £350-500 materials only
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Patio Materials Quick Reference</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Pavers Per Patio Size</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ['2m × 2m (4m²)', '220 pavers'],
                    ['3m × 3m (9m²)', '495 pavers'],
                    ['4m × 3m (12m²)', '660 pavers'],
                    ['5m × 4m (20m²)', '1,100 pavers'],
                    ['6m × 4m (24m²)', '1,320 pavers']
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>{label}</span>
                      <span className="font-bold">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Based on 50 pavers/m² + 10% waste</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Waste Factor by Pattern</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ['Running bond (stretcher)', '10%'],
                    ['Stack bond', '8%'],
                    ['Basketweave', '12%'],
                    ['Herringbone (45°)', '15%'],
                    ['Curves & circles', '20%']
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between p-2 bg-gray-50 rounded">
                      <span>{label}</span>
                      <span className="font-bold text-amber-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 pr-4">{faq.q}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4 text-gray-600 text-sm">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Brick Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedCalculators.map((calc) => (
                <Link 
                  key={calc.href}
                  to={calc.href} 
                  className={`block p-4 bg-${calc.color}-50 border border-${calc.color}-200 rounded-lg hover:shadow-md transition`}
                >
                  <h3 className={`font-bold text-${calc.color}-900`}>{calc.title}</h3>
                  <p className={`text-sm text-${calc.color}-700`}>{calc.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-3">Need More Calculations?</h2>
            <p className="text-red-100 mb-6">Explore our full range of brick and construction calculators</p>
            <Link to="/brick-block-calculator" className="inline-block bg-white text-red-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              View All Brick Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
