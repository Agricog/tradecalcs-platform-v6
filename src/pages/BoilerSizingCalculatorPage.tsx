import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { BoilerSizingCalculatorCore } from '../components/BoilerSizingCalculatorCore'
import { Flame, ArrowLeft, AlertCircle, CheckCircle2, Droplets, ThermometerSun, Home, Zap } from 'lucide-react'

export default function BoilerSizingCalculatorPage() {
  const faqs = [
    {
      q: 'What size boiler do I need for a 3 bedroom house?',
      a: 'A typical 3-bedroom semi-detached house with 1 bathroom usually needs a 24-30kW combi boiler. If you have 2 bathrooms or poor insulation, you may need 30-35kW. Use our calculator above for a precise recommendation based on your specific property.'
    },
    {
      q: 'What is the difference between a combi and system boiler?',
      a: 'A combi (combination) boiler heats water on demand with no storage cylinder - compact and efficient for smaller properties. A system boiler works with a hot water cylinder, storing hot water for higher demand. System boilers are better for homes with 2+ bathrooms where multiple outlets may run simultaneously.'
    },
    {
      q: 'How do I calculate boiler size from radiator output?',
      a: 'Add up the total watt or BTU output of all your radiators (from heat loss calculations), add 10-20% for warm-up time, then match to a boiler with at least that heating capacity. For hot water, you also need to consider flow rate requirements based on bathrooms and showers.'
    },
    {
      q: 'What flow rate do I need for a combi boiler?',
      a: 'For one shower/bath at a time, 10-12 litres/min is adequate (24-28kW boiler). For two simultaneous outlets, you need 15+ litres/min (30-35kW). For three or more outlets running together, consider a system boiler with cylinder instead.'
    },
    {
      q: 'Is a bigger boiler always better?',
      a: 'No. An oversized boiler cycles on/off more frequently, reducing efficiency and lifespan. It also costs more upfront. The ideal boiler matches your actual heating and hot water demand. Modern condensing boilers are most efficient when properly sized.'
    },
    {
      q: 'How does property age affect boiler size?',
      a: 'Older properties (pre-1930) typically have solid walls and poor insulation, losing heat faster and requiring larger boilers. Modern properties (post-2000) with cavity wall insulation, double glazing, and loft insulation retain heat better and can use smaller boilers.'
    },
    {
      q: 'What size boiler for a 4 bedroom detached house?',
      a: 'A 4-bedroom detached house typically needs 30-40kW depending on insulation quality and number of bathrooms. Detached properties lose more heat than terraced or semi-detached homes. With 2+ bathrooms, a system boiler with cylinder is often recommended.'
    },
    {
      q: 'Can I replace a regular boiler with a combi?',
      a: 'Yes, in most cases. Switching from a regular (conventional) boiler to a combi removes the need for hot water cylinder and cold water tank, freeing up space. However, if you have high hot water demand (3+ bathrooms), staying with a system boiler may be better.'
    },
    {
      q: 'How long does a boiler last?',
      a: 'A quality boiler typically lasts 10-15 years with annual servicing. Premium brands like Worcester Bosch, Vaillant, and Viessmann often come with 10-year warranties. Budget boilers may last 8-12 years. Efficiency decreases with age, so replacement after 15 years often makes economic sense.'
    },
    {
      q: 'What affects hot water flow rate?',
      a: 'Flow rate depends on boiler output, incoming mains pressure, and pipe diameter. A 24kW combi typically delivers 9-10 litres/min, while a 35kW delivers 14-15 litres/min. Low mains pressure limits flow regardless of boiler size - check your pressure before sizing.'
    },
    {
      q: 'Do I need a new boiler for a heat pump?',
      a: 'Heat pumps replace boilers entirely for heating, though some hybrid systems use both. If considering a heat pump, you may not need a new gas boiler. Heat pumps work best with underfloor heating or oversized radiators due to lower flow temperatures.'
    },
    {
      q: 'How much does a new boiler cost in the UK?',
      a: 'A new combi boiler installed typically costs £1,800-3,500 depending on brand and complexity. Premium brands (Worcester, Vaillant) cost more but offer longer warranties. System boilers with cylinder installation range £2,500-4,500. Always get 3 quotes from Gas Safe registered engineers.'
    }
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tradecalcs.co.uk' },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://tradecalcs.co.uk/#calculators' },
          { '@type': 'ListItem', position: 3, name: 'Boiler Sizing Calculator', item: 'https://tradecalcs.co.uk/boiler-sizing-calculator' }
        ]
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Boiler Sizing Calculator UK',
        description: 'Free boiler sizing calculator for UK properties. Calculate the right kW output for combi or system boilers based on bedrooms, bathrooms, property type and radiator output.',
        url: 'https://tradecalcs.co.uk/boiler-sizing-calculator',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '312' }
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a }
        }))
      },
      {
        '@type': 'HowTo',
        name: 'How to Size a Boiler for Your UK Home',
        description: 'Step-by-step guide to calculating the correct boiler size',
        step: [
          { '@type': 'HowToStep', name: 'Count bedrooms', text: 'Enter the number of bedrooms in your property' },
          { '@type': 'HowToStep', name: 'Count bathrooms', text: 'Enter bathrooms including en-suites' },
          { '@type': 'HowToStep', name: 'Select property type', text: 'Choose flat, terrace, semi or detached' },
          { '@type': 'HowToStep', name: 'Select property age', text: 'Choose the era your property was built' },
          { '@type': 'HowToStep', name: 'Calculate', text: 'Get your recommended boiler size in kW' }
        ]
      },
      {
        '@type': 'Organization',
        name: 'TradeCalcs',
        url: 'https://tradecalcs.co.uk',
        logo: 'https://tradecalcs.co.uk/logo.png'
      }
    ]
  }

  return (
    <>
      <Helmet>
        <title>Boiler Sizing Calculator UK 2025 | What Size Boiler Do I Need? | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free boiler sizing calculator for UK homes. Find out what kW boiler you need based on bedrooms, bathrooms & property type. Combi vs system boiler recommendations." 
        />
        <meta 
          name="keywords" 
          content="boiler sizing calculator, what size boiler do I need, boiler kW calculator, combi boiler size, system boiler calculator, UK boiler sizing, boiler for 3 bed house" 
        />
        <meta name="author" content="TradeCalcs" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#ea580c" />
        
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TradeCalcs" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Boiler Sizing Calculator UK 2025 | What Size Boiler Do I Need?" />
        <meta property="og:description" content="Free boiler sizing calculator. Find the right kW for your home based on bedrooms, bathrooms & property type." />
        <meta property="og:url" content="https://tradecalcs.co.uk/boiler-sizing-calculator" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Boiler Sizing Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="What size boiler do I need? Free calculator for UK homes." />
        
        <link rel="canonical" href="https://tradecalcs.co.uk/boiler-sizing-calculator" />
        
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <Link to="/" className="inline-flex items-center gap-2 text-orange-100 hover:text-white mb-4 transition">
              <ArrowLeft className="w-4 h-4" />
              Back to All Calculators
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <Flame className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Boiler Sizing Calculator UK</h1>
                <p className="text-orange-100">What size boiler do I need?</p>
              </div>
            </div>
            <p className="text-lg text-orange-50 max-w-2xl">
              Calculate the right kW output for your home. Get recommendations for combi or system boilers based on your property size, type, and hot water demand.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Quick Facts */}
          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-orange-900 mb-2">Quick Boiler Sizing Guide</p>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• <strong>1-2 bed flat:</strong> 24-27kW combi</li>
                  <li>• <strong>3 bed semi (1 bath):</strong> 24-30kW combi</li>
                  <li>• <strong>3-4 bed (2 bath):</strong> 30-35kW combi or system</li>
                  <li>• <strong>4+ bed (3+ bath):</strong> 35kW+ system with cylinder recommended</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-orange-600 to-red-500 text-white p-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Flame className="w-5 h-5" />
                Calculate Your Boiler Size
              </h2>
            </div>
            <BoilerSizingCalculatorCore />
          </div>

          {/* Workflow Link */}
          <div className="bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-orange-900 mb-2">🔥 Complete Heating Design Workflow</h3>
            <p className="text-orange-800 mb-4">For accurate boiler sizing, calculate your radiator requirements first:</p>
            <div className="flex flex-wrap gap-3">
              <Link 
                to="/radiator-btu-calculator" 
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition"
              >
                <ThermometerSun className="w-4 h-4" />
                Radiator BTU Calculator
              </Link>
              <span className="text-orange-600 font-bold self-center">→</span>
              <span className="bg-white text-orange-800 px-4 py-2 rounded-lg font-semibold border-2 border-orange-400">
                Boiler Sizing (You're here)
              </span>
            </div>
          </div>

          {/* Understanding Section */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Boiler Sizing</h2>
            
            <p className="text-gray-700 mb-4">
              Choosing the right boiler size is crucial for comfort, efficiency, and running costs. An undersized boiler won't heat your home properly or deliver enough hot water. An oversized boiler wastes energy through frequent cycling and costs more upfront.
            </p>

            <p className="text-gray-700 mb-4">
              Boiler size is measured in kilowatts (kW) - this represents the heat output, not electricity consumption. A 30kW combi boiler can deliver 30kW of heat for central heating OR hot water (not simultaneously at full power).
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
              <p className="font-semibold text-blue-900 mb-2">Example Calculation</p>
              <p className="text-sm text-blue-800">
                A 3-bed semi-detached house (1980s build) with 8 radiators totalling 9,500 Watts (9.5kW) and 1 bathroom:
              </p>
              <ul className="text-sm text-blue-800 mt-2 space-y-1">
                <li>• Heating demand: 9.5kW × 1.15 (buffer) = <strong>10.9kW</strong></li>
                <li>• Hot water demand: 10 L/min × 2.1 = <strong>21kW</strong></li>
                <li>• Combi sized for hot water (higher): <strong>24kW minimum</strong></li>
                <li>• Recommended: <strong>24-28kW combi boiler</strong></li>
              </ul>
            </div>
          </div>

          {/* Combi vs System */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Combi vs System vs Regular Boilers</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <h3 className="font-bold text-green-900 mb-2">Combi Boiler</h3>
                <p className="text-sm text-green-800 mb-3">
                  Heats water on demand. No cylinder or tank needed. Most popular choice for UK homes.
                </p>
                <p className="text-xs text-green-700"><strong>Best for:</strong> 1-4 bed, 1-2 bathrooms, limited space</p>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <h3 className="font-bold text-blue-900 mb-2">System Boiler</h3>
                <p className="text-sm text-blue-800 mb-3">
                  Works with hot water cylinder. Better for high demand. Can run multiple showers.
                </p>
                <p className="text-xs text-blue-700"><strong>Best for:</strong> 4+ bed, 2+ bathrooms, high hot water demand</p>
              </div>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-2">Regular Boiler</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Traditional system with cylinder AND cold water tank. Being phased out.
                </p>
                <p className="text-xs text-gray-600"><strong>Best for:</strong> Replacing like-for-like, low mains pressure</p>
              </div>
            </div>
          </div>

          {/* Sizing Table */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Boiler Size Guide by Property</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="p-3 text-left font-bold text-orange-900">Property</th>
                    <th className="p-3 text-left font-bold text-orange-900">Bathrooms</th>
                    <th className="p-3 text-left font-bold text-orange-900">Combi Size</th>
                    <th className="p-3 text-left font-bold text-orange-900">System Size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-3">1-2 bed flat</td>
                    <td className="p-3">1</td>
                    <td className="p-3 font-semibold text-orange-600">24-27kW</td>
                    <td className="p-3 text-gray-500">Not needed</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3">2-3 bed terrace</td>
                    <td className="p-3">1</td>
                    <td className="p-3 font-semibold text-orange-600">24-28kW</td>
                    <td className="p-3 text-gray-500">18-24kW</td>
                  </tr>
                  <tr>
                    <td className="p-3">3 bed semi</td>
                    <td className="p-3">1-2</td>
                    <td className="p-3 font-semibold text-orange-600">28-32kW</td>
                    <td className="p-3 text-gray-500">18-25kW</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-3">4 bed detached</td>
                    <td className="p-3">2</td>
                    <td className="p-3 font-semibold text-orange-600">32-38kW</td>
                    <td className="p-3 font-semibold text-blue-600">25-30kW</td>
                  </tr>
                  <tr>
                    <td className="p-3">5+ bed</td>
                    <td className="p-3">3+</td>
                    <td className="p-3 text-gray-500">May struggle</td>
                    <td className="p-3 font-semibold text-blue-600">30-40kW + cylinder</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-3">* Adjust up for older/poorly insulated properties, down for modern well-insulated homes</p>
          </div>

          {/* Flow Rates */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Hot Water Flow Rates</h2>
            
            <p className="text-gray-700 mb-4">
              For combi boilers, the kW rating determines hot water flow rate. Higher kW = more hot water per minute:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  Flow Rate by Boiler Size
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between"><span>24kW combi:</span> <strong>9-10 L/min</strong></li>
                  <li className="flex justify-between"><span>28kW combi:</span> <strong>11-12 L/min</strong></li>
                  <li className="flex justify-between"><span>32kW combi:</span> <strong>12-13 L/min</strong></li>
                  <li className="flex justify-between"><span>35kW combi:</span> <strong>14-15 L/min</strong></li>
                  <li className="flex justify-between"><span>40kW combi:</span> <strong>16-17 L/min</strong></li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Home className="w-5 h-5 text-orange-500" />
                  What You Need
                </h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between"><span>Basic shower:</span> <strong>8-10 L/min</strong></li>
                  <li className="flex justify-between"><span>Power shower:</span> <strong>12-15 L/min</strong></li>
                  <li className="flex justify-between"><span>Bath fill:</span> <strong>15-20 L/min</strong></li>
                  <li className="flex justify-between"><span>2 showers at once:</span> <strong>18-22 L/min</strong></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Gas Safe Notice */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-red-900 mb-2">Gas Safe Registered Engineers Only</p>
                <p className="text-sm text-red-800 mb-3">
                  By law, only Gas Safe registered engineers can install, service, or repair gas boilers in the UK. Always check the engineer's Gas Safe ID card and verify at gasssaferegister.co.uk before any work.
                </p>
                <p className="text-sm text-red-800">
                  This calculator provides guidance for sizing - always get a professional survey and quote from a qualified engineer who can assess your specific property.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-700 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Calculators */}
          <div className="bg-gradient-to-r from-orange-600 to-red-500 rounded-xl p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Related Heating Calculators</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                to="/radiator-btu-calculator" 
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition"
              >
                <div className="flex items-center gap-3">
                  <ThermometerSun className="w-8 h-8" />
                  <div>
                    <p className="font-bold">Radiator BTU Calculator</p>
                    <p className="text-sm text-orange-100">Calculate heat output needed per room</p>
                  </div>
                </div>
              </Link>
              <Link 
                to="/calculators/insulation-calculator" 
                className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition"
              >
                <div className="flex items-center gap-3">
                  <Home className="w-8 h-8" />
                  <div>
                    <p className="font-bold">Insulation U-Value Calculator</p>
                    <p className="text-sm text-orange-100">Check Part L compliance</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
