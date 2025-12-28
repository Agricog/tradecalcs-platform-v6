import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { CheckCircle2, AlertCircle, ChevronDown, ChevronUp, PoundSterling, Calculator } from 'lucide-react'

export default function HouseRewireCostUK() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: "How much does a full house rewire cost in the UK in 2025?",
      a: "A full house rewire in the UK costs between £3,000 and £10,000+ depending on property size. A 2-bed terraced house typically costs £3,000-£4,500, a 3-bed semi costs £4,500-£6,500, and a 4-bed detached costs £6,500-£10,000+. Prices include labour, materials, and electrical certification but exclude making good (plastering/decorating)."
    },
    {
      q: "How long does a house rewire take?",
      a: "A typical house rewire takes 5-10 working days depending on property size. A 2-bed house takes 5-7 days, a 3-bed takes 7-8 days, and a 4-5 bed house takes 8-10+ days. First fix (cables) takes roughly 60% of the time, second fix (sockets, switches, consumer unit) takes 40%."
    },
    {
      q: "What is included in a full house rewire?",
      a: "A full rewire includes: new consumer unit with RCBOs, all new cables throughout, new socket outlets (typically double sockets), new light switches and ceiling roses, smoke/heat detectors (Building Regs requirement), electrical testing, and an Electrical Installation Certificate (EIC). It does not include making good plasterwork or decorating."
    },
    {
      q: "Do I need to rewire my house?",
      a: "Signs you need a rewire include: house hasn't been rewired in 25-40+ years, old fuse box without RCDs, fabric or rubber-insulated cables, frequent tripped fuses, burning smells, discoloured sockets, or failed EICR inspection. Properties built before 1980 that haven't been rewired should be inspected by a qualified electrician."
    },
    {
      q: "Can I live in my house during a rewire?",
      a: "Yes, but expect significant disruption. Electricians lift floorboards, chase walls, and power may be off for periods during the day. Many homeowners stay elsewhere for the first-fix phase (3-5 days) when most disruption occurs, then return for second fix. Discuss logistics with your electrician before starting."
    },
    {
      q: "Do I need Building Regulations approval for a rewire?",
      a: "Yes, rewiring is notifiable work under Part P of Building Regulations. If your electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA etc.), they can self-certify and notify Building Control on your behalf. If not registered, you must apply to Building Control separately, adding cost and time."
    },
    {
      q: "How do electricians price a rewire job?",
      a: "Most electricians price rewires based on: number of circuits required, number of socket and lighting points, property size and layout, ease of access (lifted floors vs concrete, loft access), consumer unit specification, and any special requirements (outdoor circuits, EV charger prep, smart home wiring). Day rates typically range £200-£350/day plus materials."
    },
    {
      q: "What's the difference between a partial rewire and full rewire?",
      a: "A partial rewire replaces only the most critical or damaged circuits while retaining newer cables that pass inspection. A full rewire replaces everything back to the meter. Partial rewires cost less upfront but may need completing later. Full rewires provide a completely fresh installation with 25-40 year lifespan."
    },
    {
      q: "Should I get multiple quotes for a rewire?",
      a: "Yes, get 3 quotes minimum from electricians registered with a competent person scheme. Quotes should itemise: labour days, materials, consumer unit spec, number of points, certification, and any exclusions. Beware quotes significantly below market rate - check reviews and ask for examples of similar work."
    },
    {
      q: "What affects rewire cost the most?",
      a: "The biggest cost factors are: property size (more rooms = more circuits), access difficulty (solid floors cost more than suspended timber), number of socket/lighting points required, consumer unit specification (basic vs fully loaded with SPD), and location (London/South East rates are 20-30% higher than national average)."
    }
  ]

  return (
    <>
      <Helmet>
        <title>House Rewire Cost UK 2025 | Full Rewire Prices £3,000-£10,000 | TradeCalcs</title>
        <meta 
          name="description" 
          content="How much does a house rewire cost in 2025? UK prices range from £3,000 for a 2-bed to £10,000+ for a 4-bed. Complete pricing guide with cost breakdown, what's included, and free electrical calculators." 
        />
        <meta name="keywords" content="house rewire cost, rewire cost UK, how much to rewire a house, full rewire price, electrician rewire quote, house rewire 2025, rewiring costs UK" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        <meta property="og:type" content="article" />
        <meta property="og:title" content="House Rewire Cost UK 2025 | Complete Pricing Guide" />
        <meta property="og:description" content="Full house rewire costs £3,000-£10,000 in the UK. Detailed breakdown by property type, what's included, and how electricians price rewire jobs." />
        <meta property="og:url" content="https://tradecalcs.co.uk/house-rewire-cost-uk" />
        <meta property="og:site_name" content="TradeCalcs" />
        <meta property="og:locale" content="en_GB" />
        <meta property="article:published_time" content="2025-01-01T00:00:00Z" />
        <meta property="article:modified_time" content="2025-12-28T00:00:00Z" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="House Rewire Cost UK 2025 | TradeCalcs" />
        <meta name="twitter:description" content="UK house rewire costs £3,000-£10,000. Complete pricing guide with calculator." />

        <link rel="canonical" href="https://tradecalcs.co.uk/house-rewire-cost-uk" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                "headline": "House Rewire Cost UK 2025: Complete Pricing Guide",
                "description": "Comprehensive guide to house rewire costs in the UK for 2025. Prices range from £3,000 for a 2-bed terraced house to £10,000+ for a large 4-bed detached property.",
                "author": {
                  "@type": "Organization",
                  "name": "TradeCalcs",
                  "url": "https://tradecalcs.co.uk"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "TradeCalcs",
                  "url": "https://tradecalcs.co.uk"
                },
                "datePublished": "2025-01-01",
                "dateModified": "2025-12-28",
                "mainEntityOfPage": "https://tradecalcs.co.uk/house-rewire-cost-uk"
              },
              {
                "@type": "HowTo",
                "name": "How to Price a House Rewire in the UK",
                "description": "Step-by-step method for calculating house rewire costs used by UK electricians",
                "totalTime": "PT30M",
                "estimatedCost": {
                  "@type": "MonetaryAmount",
                  "currency": "GBP",
                  "minValue": "3000",
                  "maxValue": "10000"
                },
                "step": [
                  {
                    "@type": "HowToStep",
                    "position": 1,
                    "name": "Survey the property",
                    "text": "Count rooms, check floor type (suspended timber or concrete), assess loft access, and note any special requirements."
                  },
                  {
                    "@type": "HowToStep",
                    "position": 2,
                    "name": "Calculate points required",
                    "text": "Count socket outlets, lighting points, and fixed appliance connections needed. Typical 3-bed has 35-45 points."
                  },
                  {
                    "@type": "HowToStep",
                    "position": 3,
                    "name": "Estimate labour days",
                    "text": "Allow 5-10 days depending on property size. 2-bed = 5-7 days, 3-bed = 7-8 days, 4-bed = 8-10 days."
                  },
                  {
                    "@type": "HowToStep",
                    "position": 4,
                    "name": "Calculate materials cost",
                    "text": "Consumer unit (£150-£400), cable (£500-£1,500), accessories (£300-£800), sundries (£100-£200)."
                  },
                  {
                    "@type": "HowToStep",
                    "position": 5,
                    "name": "Add labour cost",
                    "text": "Multiply labour days by day rate (£200-£350/day). Include testing and certification time."
                  },
                  {
                    "@type": "HowToStep",
                    "position": 6,
                    "name": "Apply regional adjustment",
                    "text": "London/South East add 20-30%. Scotland, Wales, North reduce 10-15% from national average."
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": { "@type": "Answer", "text": faq.a }
                }))
              },
              {
                "@type": "Organization",
                "name": "TradeCalcs",
                "url": "https://tradecalcs.co.uk",
                "logo": "https://tradecalcs.co.uk/logo.png",
                "description": "TradeCalcs is a free suite of professional UK trade calculators for pricing, materials and compliance, built for electricians, builders and other trades.",
                "contactPoint": { "@type": "ContactPoint", "contactType": "Customer Support", "email": "mick@tradecalcs.co.uk" }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        {/* BACK LINK */}
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/electrical-calculators" className="text-purple-600 hover:text-purple-800 font-semibold text-sm">
            ← Electrical Calculators
          </Link>
        </div>

        {/* HERO / ANSWER-FIRST BLOCK */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <PoundSterling className="w-8 h-8" />
              <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">2025 UK Prices</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">House Rewire Cost UK 2025</h1>
            
            {/* AI-LIFTABLE ANSWER BLOCK */}
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-6">
              <p className="text-xl leading-relaxed">
                <strong>A full house rewire in the UK costs between £3,000 and £10,000+</strong> depending on property size and complexity. A typical 3-bedroom semi-detached house costs £4,500-£6,500 including labour, materials, consumer unit, and electrical certification. Prices exclude making good (plastering and decorating).
              </p>
            </div>

            {/* QUICK STATS */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-2xl font-bold">£3,000</p>
                <p className="text-sm opacity-90">2-Bed Terrace</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-2xl font-bold">£5,500</p>
                <p className="text-sm opacity-90">3-Bed Semi</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <p className="text-2xl font-bold">£8,000+</p>
                <p className="text-sm opacity-90">4-Bed Detached</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          
          {/* ENTITY STATEMENT */}
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4 mb-8">
            <p className="text-sm text-blue-900">
              <strong>TradeCalcs</strong> is a free suite of professional UK trade calculators for pricing, materials and compliance, built for electricians, builders and other trades. Use our <Link to="/electrical-calculators" className="text-blue-600 font-semibold hover:underline">electrical calculators</Link> to size cables, check voltage drop, and estimate job costs.
            </p>
          </div>

          {/* PRICING TABLE BY PROPERTY TYPE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">House Rewire Costs by Property Type (2025)</h2>
            <p className="text-gray-600 mb-6">Average UK prices including labour, materials, consumer unit and certification. Excludes making good.</p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-blue-50 border-b-2 border-blue-200">
                    <th className="px-4 py-3 text-left font-bold text-gray-900">Property Type</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-900">Price Range</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-900">Duration</th>
                    <th className="px-4 py-3 text-left font-bold text-gray-900">Typical Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">1-Bed Flat</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">£2,000 - £3,000</td>
                    <td className="px-4 py-3">3-4 days</td>
                    <td className="px-4 py-3">15-25</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-3 font-semibold">2-Bed Terraced House</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">£3,000 - £4,500</td>
                    <td className="px-4 py-3">5-7 days</td>
                    <td className="px-4 py-3">25-35</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">3-Bed Semi-Detached</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">£4,500 - £6,500</td>
                    <td className="px-4 py-3">7-8 days</td>
                    <td className="px-4 py-3">35-45</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-3 font-semibold">3-Bed Detached</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">£5,500 - £7,500</td>
                    <td className="px-4 py-3">7-9 days</td>
                    <td className="px-4 py-3">40-50</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold">4-Bed Detached</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">£6,500 - £10,000</td>
                    <td className="px-4 py-3">8-10 days</td>
                    <td className="px-4 py-3">50-65</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-gray-50">
                    <td className="px-4 py-3 font-semibold">5-Bed / Large Property</td>
                    <td className="px-4 py-3 text-green-700 font-semibold">£10,000 - £15,000+</td>
                    <td className="px-4 py-3">10-14 days</td>
                    <td className="px-4 py-3">65-100+</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">Prices based on Q4 2024 / Q1 2025 market rates. London and South East typically 20-30% higher. Scotland, Wales, and Northern regions 10-15% lower.</p>
          </section>

          {/* WHAT'S INCLUDED */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included in a Full House Rewire?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Included in Price
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>New consumer unit</strong> with RCBOs and main switch (replaces old fuse box)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>All new cables</strong> - twin & earth throughout property</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Socket outlets</strong> - typically double sockets throughout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Light switches and ceiling roses</strong> - standard white plastic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Smoke/heat detectors</strong> - mains wired (Building Regs requirement)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Electrical testing</strong> - full inspection and test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>EIC certificate</strong> - Electrical Installation Certificate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span><strong>Building Regs notification</strong> (if electrician is registered)</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Usually NOT Included
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Making good</strong> - plastering chased walls, filling holes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Decorating</strong> - painting after plastering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Flooring repairs</strong> - replacing lifted floorboards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Light fittings</strong> - decorative pendants, spotlights (basic roses only)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Designer switches/sockets</strong> - chrome, brass, etc. (extra)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>EV charger circuit</strong> - typically quoted separately</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">✗</span>
                    <span><strong>Outdoor circuits</strong> - garden lighting, outbuilding supplies</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <p className="text-sm text-amber-900">
                <strong>Budget tip:</strong> Making good (plastering) typically adds £500-£1,500 depending on property size. Get a separate quote from a plasterer, or ask your electrician if they can arrange this as part of the job.
              </p>
            </div>
          </section>

          {/* HOW TO PRICE - STEP BY STEP */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Electricians Price a House Rewire</h2>
            <p className="text-gray-600 mb-6">Understanding the pricing method helps you evaluate quotes and spot unrealistic prices.</p>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-gray-900">Survey the Property</h3>
                  <p className="text-gray-700 text-sm">Count rooms, check floor type (suspended timber is easier than solid concrete), assess loft and void access, note any special requirements like outbuildings or high ceilings.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-gray-900">Calculate Points Required</h3>
                  <p className="text-gray-700 text-sm">Count socket outlets, lighting points, and fixed appliance connections. A typical 3-bed has 35-45 points. More points = more cable, more time.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-gray-900">Estimate Labour Days</h3>
                  <p className="text-gray-700 text-sm">2-bed = 5-7 days, 3-bed = 7-8 days, 4-bed = 8-10 days. First fix (running cables) takes ~60% of time, second fix (fitting accessories, consumer unit) takes ~40%.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-gray-900">Calculate Materials Cost</h3>
                  <p className="text-gray-700 text-sm">Consumer unit £150-£400, cable £500-£1,500 (depending on property size and cable runs), accessories £300-£800, back boxes, clips, sundries £100-£200.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">5</div>
                <div>
                  <h3 className="font-bold text-gray-900">Add Labour Cost</h3>
                  <p className="text-gray-700 text-sm">Multiply days by day rate. Typical electrician day rates: £200-£280 (regions), £280-£350 (London/South East). Include half day for testing and certification.</p>
                </div>
              </div>
              
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">6</div>
                <div>
                  <h3 className="font-bold text-gray-900">Apply Regional Adjustment</h3>
                  <p className="text-gray-700 text-sm">London and South East: +20-30%. Midlands: baseline. Scotland, Wales, North: -10-15% from national average.</p>
                </div>
              </div>
            </div>
          </section>

          {/* COST BREAKDOWN */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Typical Cost Breakdown: 3-Bed Semi-Detached</h2>
            <p className="text-gray-600 mb-6">Example breakdown for a standard 3-bed semi requiring ~40 points:</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Consumer Unit (18-way with RCBOs, SPD)</span>
                <span className="font-bold">£280</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Cable (T&E various sizes, 300m+ total)</span>
                <span className="font-bold">£650</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Accessories (sockets, switches, roses)</span>
                <span className="font-bold">£480</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Back boxes, clips, fixings, sundries</span>
                <span className="font-bold">£150</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Smoke/heat detectors (mains + battery backup)</span>
                <span className="font-bold">£120</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-t-2 border-blue-300">
                <span className="font-bold text-blue-900">Materials Subtotal</span>
                <span className="font-bold text-blue-900">£1,680</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded mt-4">
                <span className="font-medium">Labour (8 days @ £250/day average)</span>
                <span className="font-bold">£2,000</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">Testing & certification (0.5 days)</span>
                <span className="font-bold">£125</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded border-t-2 border-blue-300">
                <span className="font-bold text-blue-900">Labour Subtotal</span>
                <span className="font-bold text-blue-900">£2,125</span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-green-100 rounded-lg border-2 border-green-400 mt-4">
                <span className="font-bold text-green-900 text-lg">TOTAL (ex. making good)</span>
                <span className="font-bold text-green-900 text-xl">£3,805</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-100 rounded">
                <span className="font-medium text-gray-600">+ Margin/contingency (15-25%)</span>
                <span className="font-bold text-gray-600">£570 - £950</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-lg mt-2">
                <span className="font-bold text-lg">Typical Quote Range</span>
                <span className="font-bold text-xl">£4,400 - £4,800</span>
              </div>
            </div>
          </section>

          {/* FACTORS AFFECTING PRICE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors That Increase Rewire Cost</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">🏠 Property Type</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Solid concrete floors (no void access)</li>
                  <li>• Multi-storey without loft drops</li>
                  <li>• Older properties with lath & plaster</li>
                  <li>• Listed buildings (special requirements)</li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">📍 Location</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• London: +25-35%</li>
                  <li>• South East: +15-25%</li>
                  <li>• Scotland/Wales/North: -10-15%</li>
                  <li>• Remote areas: +travel costs</li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">⚡ Specification</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• High-end consumer unit (+£100-200)</li>
                  <li>• Metal clad or designer sockets (+£300-800)</li>
                  <li>• Extra circuits (EV prep, garden office)</li>
                  <li>• Smart home wiring infrastructure</li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2">🔧 Access & Complexity</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• No loft access = surface/trunking</li>
                  <li>• Occupied property = careful working</li>
                  <li>• Asbestos artex (specialist removal)</li>
                  <li>• Three-storey properties</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CALCULATOR CTA */}
          <section className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg shadow-lg p-8 mb-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="w-10 h-10" />
              <div>
                <h2 className="text-2xl font-bold">Calculate Your Electrical Project</h2>
                <p className="opacity-90">Free BS 7671 compliant calculators for UK electricians</p>
              </div>
            </div>
            
            <p className="mb-6 opacity-95">
              Use our electrical calculators to size cables correctly for your rewire, check voltage drop on long runs, and ensure your installation meets BS 7671 requirements.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <Link 
                to="/cable-sizing-calculator" 
                className="bg-white text-purple-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition text-center"
              >
                Cable Sizing Calculator
              </Link>
              <Link 
                to="/voltage-drop-calculator" 
                className="bg-white/20 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/30 transition text-center border border-white/30"
              >
                Voltage Drop Calculator
              </Link>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/20">
              <Link to="/electrical-calculators" className="text-white font-semibold hover:underline">
                → View all 56 electrical calculators
              </Link>
            </div>
          </section>

          {/* WHEN TO REWIRE */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Do I Need to Rewire My House?</h2>
            <p className="text-gray-600 mb-6">Warning signs that indicate your property needs rewiring:</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
                <h3 className="font-bold text-red-900 mb-2">🚨 Urgent Signs</h3>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Burning smells from sockets or switches</li>
                  <li>• Frequent fuse trips or RCD nuisance tripping</li>
                  <li>• Scorch marks or discolouration on accessories</li>
                  <li>• Sparking when plugging in appliances</li>
                  <li>• Tingling sensation from metal surfaces</li>
                </ul>
              </div>
              
              <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
                <h3 className="font-bold text-amber-900 mb-2">⚠️ Warning Signs</h3>
                <ul className="text-sm text-amber-800 space-y-1">
                  <li>• Old fuse box without RCDs</li>
                  <li>• Fabric or rubber-sheathed cables</li>
                  <li>• Round-pin sockets still in use</li>
                  <li>• Mix of old and new wiring (bodged additions)</li>
                  <li>• Property not rewired since pre-1980</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-900">
                <strong>Recommendation:</strong> If your property was built before 1980 and hasn't been rewired, get an Electrical Installation Condition Report (EICR) from a registered electrician. This will identify any safety issues and confirm whether rewiring is needed. An EICR typically costs £150-£300.
              </p>
            </div>
          </section>

          {/* GETTING QUOTES */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Rewire Quotes: What to Look For</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-bold text-green-900 mb-2">✓ Good Quote Includes</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Itemised breakdown (labour days, materials, CU spec)</li>
                  <li>• Exact number of socket and lighting points</li>
                  <li>• Consumer unit make and specification</li>
                  <li>• Smoke detector locations and type</li>
                  <li>• Clear statement of what's excluded (making good)</li>
                  <li>• Electrician's scheme registration number (NICEIC/NAPIT/ELECSA)</li>
                  <li>• Timeline estimate and payment terms</li>
                </ul>
              </div>
              
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-bold text-red-900 mb-2">✗ Red Flags</h3>
                <ul className="text-sm text-red-800 space-y-1">
                  <li>• Single lump sum with no breakdown</li>
                  <li>• Price significantly below market rate (30%+ cheaper)</li>
                  <li>• No scheme registration or can't provide number</li>
                  <li>• Demands large deposit upfront (10-20% is normal)</li>
                  <li>• Won't provide written quote</li>
                  <li>• Can start "tomorrow" (good electricians are booked ahead)</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Tip:</strong> Always get 3 quotes minimum. The cheapest is rarely the best - look for the quote that best balances price, specification, timeline, and the electrician's communication/professionalism.
              </p>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-4 py-3 text-left font-semibold text-gray-800 flex justify-between items-center hover:bg-gray-50"
                  >
                    {faq.q}
                    {openFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                  {openFaq === index && (
                    <div className="px-4 pb-4 text-sm text-gray-700">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* RELATED GUIDES TEASER */}
          <section className="bg-gray-100 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Pricing Guides</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">Consumer Unit Upgrade</h3>
                <p className="text-sm text-gray-600 mb-2">Fuse box replacement costs</p>
                <span className="text-xs text-gray-400">Coming soon</span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">EV Charger Installation</h3>
                <p className="text-sm text-gray-600 mb-2">Home charging point costs</p>
                <span className="text-xs text-gray-400">Coming soon</span>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-1">EICR Testing</h3>
                <p className="text-sm text-gray-600 mb-2">Electrical inspection costs</p>
                <span className="text-xs text-gray-400">Coming soon</span>
              </div>
            </div>
          </section>

          {/* IMPORTANT NOTES */}
          <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-3">Important Notes</h3>
                <ul className="space-y-2 text-sm text-blue-900">
                  <li>• Prices shown are estimates based on 2024/2025 market rates and will vary by location and specification</li>
                  <li>• Always use an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA, etc.)</li>
                  <li>• Rewiring is notifiable work under Part P Building Regulations - ensure proper certification</li>
                  <li>• Get multiple itemised quotes and check reviews before committing</li>
                  <li>• This guide is for information only and does not constitute professional advice</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Need a Custom Electrical Calculator?</h2>
              <p className="text-gray-700">
                Looking for a specific calculation tool we don't have? We build bespoke calculators for contractors, merchants and training providers. Tell us what you need.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=ElectricalCalculatorsHub" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="SmartSuite Electrical Calculator Inquiry Form"
                className="rounded-lg"
              />
            </div>

          {/* CTA FOOTER */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Need Electrical Calculations?</h2>
            <p className="mb-6 opacity-95">Free BS 7671 compliant calculators for cable sizing, voltage drop, and more.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/electrical-calculators" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
                All Electrical Calculators
              </Link>
              <Link to="/" className="bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-400 inline-block">
                TradeCalcs Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
