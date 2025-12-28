import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Tractor } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'farm-agricultural-cable-sizing',
  title: 'Farm & Agricultural Cable Sizing Calculator',
  metaTitle: 'Farm Agricultural Cable Size Calculator UK | Barn Workshop Electrical | BS 7671 | TradeCalcs',
  metaDescription: 'Free farm and agricultural cable sizing calculator for UK electricians. Calculate correct cable size for barns, milking parlours, grain dryers, and farm workshops. BS 7671 Section 705 compliant.',
  heroDescription: 'Calculate the correct cable size for farms, barns, milking parlours, and agricultural buildings',
  
  defaults: {
    loadType: 'amps' as const,
    current: '32',
    kW: '',
    length: '50',
    method: 'D',
    lighting: false
  },

  keyFacts: [
    'BS 7671 Section 705 covers agricultural installations',
    'Livestock areas need equipotential bonding to protect animals',
    'Three-phase common for grain dryers and large motors',
    'SWA cable essential for outdoor/underground runs',
    'IP ratings critical - dust, moisture, corrosive atmospheres'
  ],

  symptomChecks: [
    { symptom: 'Farm workshop (power tools, welding)', recommendation: '32A-63A three-phase, SWA from main supply, local DB' },
    { symptom: 'Milking parlour (vacuum pumps, cooling)', recommendation: '63A-100A three-phase, equipotential bonding, easy-clean installation' },
    { symptom: 'Grain dryer/grain store', recommendation: '63A-100A+ three-phase, motor starting considerations, fire-rated' },
    { symptom: 'Barn lighting and sockets', recommendation: '16A-32A supply, IP65 fittings, dust-proof enclosures' },
    { symptom: 'Poultry/livestock housing', recommendation: 'Supplementary bonding critical, ammonia-resistant materials, emergency lighting' }
  ],

  costEstimates: [
    { scenario: 'Barn lighting circuit', material: '£300-600', labour: '£400-700', total: '£700-1300' },
    { scenario: 'Farm workshop DB (3-phase)', material: '£800-1500', labour: '£800-1400', total: '£1600-2900' },
    { scenario: 'SWA feeder (per 100m)', material: '£1000-2000', labour: '£800-1500', total: '£1800-3500' },
    { scenario: 'Milking parlour rewire', material: '£2000-4000', labour: '£2500-4500', total: '£4500-8500' },
    { scenario: 'Grain dryer installation', material: '£1500-3000', labour: '£1500-2500', total: '£3000-5500' }
  ],

  defined: {
    term: 'Agricultural Cable Sizing',
    definition: 'Agricultural cable sizing follows BS 7671 Section 705 with additional requirements for the farming environment. Cables must withstand mechanical damage, moisture, dust, and corrosive atmospheres. Long cable runs between buildings require careful voltage drop calculation. Livestock areas have specific equipotential bonding requirements to prevent electric shock to animals.'
  },

  defined2: {
    term: 'Equipotential Bonding for Livestock',
    definition: 'Animals are more sensitive to electric shock than humans - voltages as low as 1V can affect cattle. Supplementary equipotential bonding connects all metal parts animals might touch: stalls, water bowls, milking equipment, and metalwork. This equalises voltages and protects livestock. Critical in milking parlours and livestock housing.'
  },

  faqs: [
    {
      q: 'What cable size for a farm building?',
      a: 'Depends on the load and distance. Farm buildings often require 50-100m+ cable runs. For a typical barn with lighting and sockets (32A), you might need 6mm² or 10mm² SWA due to voltage drop over distance. Three-phase buildings need appropriately sized 3-phase SWA.'
    },
    {
      q: 'Why do farms need special electrical regulations?',
      a: 'BS 7671 Section 705 addresses farm-specific hazards: livestock sensitivity to voltage, corrosive atmospheres (ammonia, silage acids), dust explosion risks, mechanical damage from machinery, and outdoor/wet environments. Standard domestic rules aren\'t sufficient.'
    },
    {
      q: 'What is supplementary bonding for livestock?',
      a: 'Animals can detect much smaller voltages than humans. Supplementary bonding connects all metalwork animals contact to the same earth potential, preventing shock from small voltage differences. Required in all areas where livestock are housed or handled.'
    },
    {
      q: 'Do I need three-phase for farm equipment?',
      a: 'Many farm motors and equipment are three-phase: grain dryers, large mixers, milking vacuum pumps, workshop machinery. Three-phase motors are more efficient and reliable than single-phase for higher powers. Most working farms have three-phase supplies.'
    },
    {
      q: 'What IP rating for farm electrics?',
      a: 'Minimum IP44 for general farm buildings, IP65 for dusty areas (grain stores, feed mills), IP66 for wash-down areas (milking parlours, dairies). Poultry houses may need ammonia-resistant enclosures. Outdoor equipment needs IP65+.'
    },
    {
      q: 'How do I protect against grain dust explosions?',
      a: 'Grain dust is explosive. In grain stores: use dust-tight enclosures, avoid arcing contacts, ensure proper earthing, and consider ATEX-rated equipment in high-dust areas. Electrical design should minimise ignition sources in dusty atmospheres.'
    },
    {
      q: 'What earthing system for farms?',
      a: 'TT earthing is common for farms (local earth electrodes) due to long distances from the supply. PME may not be suitable if there are extensive metallic structures. Earth electrode resistance must suit RCD operation. Multiple earth electrodes may be needed across the site.'
    },
    {
      q: 'How often should farm electrics be tested?',
      a: 'Annual inspection and testing is recommended for agricultural installations due to harsh conditions. More frequent for dairy/milking parlours (livestock protection) and grain stores (fire/explosion risk). Required for insurance and Red Tractor assurance schemes.'
    },
    {
      q: 'Can I run cables overhead between farm buildings?',
      a: 'Overhead cables are possible but must be high enough for machinery (minimum 5.2m over roadways). SWA or protected cable required. Underground is often preferred - safer and less maintenance. Both need careful protection at entry points.'
    },
    {
      q: 'What about motors starting on farms?',
      a: 'Large motors (grain dryers, augers) have high starting currents - 6-8× running current. This causes voltage dip affecting other equipment. Solutions: star-delta starters, soft starters, or VFDs. Cable sizing must account for starting current if using DOL starting.'
    }
  ],

  defined3: {
    term: 'Agricultural Environment Classifications',
    definition: 'Farm electrical installations face multiple hazards: AF1 (normal), AF2 (dusty - grain stores), AF3 (presence of corrosive substances - livestock housing), AF4 (outdoor), and BE3 (presence of livestock). Each classification requires specific equipment ratings and installation methods. Multiple classifications may apply to single locations.'
  },

  defined4: {
    term: 'Voltage Drop on Farm Installations',
    definition: 'Long cable runs between farm buildings cause significant voltage drop. BS 7671 allows 5% maximum (11.5V on 230V). A 100m run at 32A needs careful calculation - 6mm² drops about 7.3V, 10mm² drops about 4.4V. Motor starting currents temporarily worsen voltage drop. Size cables generously for farm distances.'
  }
}

export default function FarmAgriculturalCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="farm electrical cable size, agricultural wiring, barn electrics, milking parlour electrical, grain dryer cable, farm workshop power, BS 7671 section 705, livestock bonding" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/farm-agricultural-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/farm-agricultural-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#65a30d" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'Farm Agricultural Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'Farm Agricultural Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '267' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': usecaseData.faqs.map(faq => ({
                  '@type': 'Question',
                  'name': faq.q,
                  'acceptedAnswer': { '@type': 'Answer', 'text': faq.a }
                }))
              },
              {
                '@type': 'HowTo',
                'name': 'How to Size Cables for Farm Electrical Installation',
                'description': 'Step-by-step guide to calculating cable sizes for agricultural and farm electrical installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Survey the site', 'text': 'Identify all buildings, equipment, and cable routes' },
                  { '@type': 'HowToStep', 'name': 'List all loads', 'text': 'Document all electrical equipment and ratings in each building' },
                  { '@type': 'HowToStep', 'name': 'Measure distances', 'text': 'Measure cable runs between distribution points and buildings' },
                  { '@type': 'HowToStep', 'name': 'Calculate with voltage drop', 'text': 'Size cables accounting for long agricultural runs' },
                  { '@type': 'HowToStep', 'name': 'Consider motor starting', 'text': 'Allow for starting currents of large motors' }
                ]
              },
              {
                '@type': 'Organization',
                'name': 'TradeCalcs',
                'url': 'https://tradecalcs.co.uk',
                'logo': 'https://tradecalcs.co.uk/logo.png',
                'contactPoint': { '@type': 'ContactPoint', 'contactType': 'Customer Support', 'email': 'mick@tradecalcs.co.uk' }
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <Link to="/cable-sizing-calculators" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Cable Sizing Calculator
          </Link>
        </div>

        <div className="bg-gradient-to-r from-lime-600 to-green-600 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Tractor className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-lime-50 border-l-4 border-lime-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-lime-900 mb-3 flex items-center gap-2">
              <Tractor className="w-5 h-5" />
              Farm Electrical Cable Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-lime-900">
                  <CheckCircle2 className="w-4 h-4 text-lime-600 mt-0.5 flex-shrink-0" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg mb-8">
            <CableSizingCalculatorCore
              defaultLoadType={usecaseData.defaults.loadType}
              defaultCurrent={usecaseData.defaults.current}
              defaultKW={usecaseData.defaults.kW}
              defaultLength={usecaseData.defaults.length}
              defaultMethod={usecaseData.defaults.method}
              defaultLighting={usecaseData.defaults.lighting}
            />
          </div>

          {/* CONTRACTOR LEAD CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need an Agricultural Electrician?</h3>
                <p className="text-purple-100">Get quotes from contractors experienced in farm and agricultural installations</p>
              </div>
              <a 
                href="#get-quotes" 
                className="bg-white text-purple-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 text-center whitespace-nowrap"
              >
                Get Free Quotes
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Farm Installations</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lime-700 font-bold text-sm">{i + 1}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{item.symptom}</p>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Internal linking section */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-900 mb-3">Related Workshop & Outbuilding Calculations</h3>
            <p className="text-sm text-green-800 mb-4">
              Farm workshops share requirements with our <Link to="/calculators/cable-sizing/garage-workshop-cable-sizing" className="text-green-600 font-semibold hover:underline">garage and workshop guide</Link>. For barn lighting, see <Link to="/calculators/cable-sizing/outdoor-lighting-cable-sizing" className="text-green-600 font-semibold hover:underline">outdoor lighting calculations</Link>. Solar PV is increasingly popular on farms - check our <Link to="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="text-green-600 font-semibold hover:underline">solar installation calculator</Link>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-lime-50 to-green-50 border border-lime-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lime-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-lime-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Farm Electrical Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK installation costs for agricultural electrical work.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-lime-50 border-b">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Installation Scenario</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Materials</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Labour</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {usecaseData.costEstimates.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 text-gray-800">{row.scenario}</td>
                      <td className="px-4 py-3 text-gray-600">{row.material}</td>
                      <td className="px-4 py-3 text-gray-600">{row.labour}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Costs vary significantly by site size and cable run distances.</p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-green-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-green-800">{usecaseData.defined2.definition}</p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-600 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-2">{usecaseData.defined3.term}</h3>
                <p className="text-sm text-amber-800">{usecaseData.defined3.definition}</p>
              </div>
            </div>
          </div>

          <div className="bg-lime-50 border-l-4 border-lime-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lime-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-lime-800">{usecaseData.defined4.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {usecaseData.faqs.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-700">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Related Electrical Calculators</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/calculators/cable-sizing/garage-workshop-cable-sizing" className="block p-4 bg-gradient-to-br from-slate-50 to-zinc-50 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-slate-900 mb-1">Garage & Workshop</h3>
                <p className="text-sm text-slate-700">Power tools and equipment</p>
              </Link>
              <Link to="/calculators/cable-sizing/solar-pv-battery-cable-sizing" className="block p-4 bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-yellow-900 mb-1">Solar PV & Battery</h3>
                <p className="text-sm text-yellow-700">Farm solar installations</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-cyan-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-cyan-700">Critical for long farm runs</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Agricultural Electricians</h3>
              <p className="text-gray-700">
                Looking for an electrician experienced in farm and agricultural installations? Tell us about your project and we'll connect you with vetted contractors. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=FarmAgriculturalCableSizing" 
                width="100%" 
                height="700px" 
                frameBorder="0"
                title="Get Electrician Quotes"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-lime-600 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-lime-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
