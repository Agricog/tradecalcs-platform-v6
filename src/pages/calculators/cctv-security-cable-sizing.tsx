import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, ChevronUp, Zap, Camera } from 'lucide-react'
import { useState } from 'react'
import { CableSizingCalculatorCore } from '../../components/CableSizingCalculatorCore'

const usecaseData = {
  slug: 'cctv-security-cable-sizing',
  title: 'CCTV & Security System Cable Sizing Calculator',
  metaTitle: 'CCTV Security Cable Size Calculator UK | POE Camera | Alarm System | BS 7671 | TradeCalcs',
  metaDescription: 'Free CCTV and security system cable sizing calculator for UK electricians. Calculate correct cable size for POE cameras, NVR systems, and intruder alarms. BS 7671 compliant.',
  heroDescription: 'Calculate the correct cable size for CCTV, security cameras, and alarm system installations',
  
  defaults: {
    loadType: 'amps' as const,
    current: '3',
    kW: '',
    length: '15',
    method: 'B',
    lighting: false
  },

  keyFacts: [
    'Most CCTV systems use POE (Power over Ethernet) - no separate mains needed per camera',
    'POE switch/NVR typically needs 200-500W mains supply',
    'Intruder alarm panels typically draw 1-3A from mains PSU',
    'Battery backup essential for security systems',
    'Cat6 cable for POE runs up to 100m'
  ],

  symptomChecks: [
    { symptom: 'Small home CCTV (4 POE cameras)', recommendation: 'Single 13A socket for NVR/switch, Cat6 to cameras' },
    { symptom: 'Medium system (8 POE cameras)', recommendation: '16A circuit for POE switch, consider dedicated circuit' },
    { symptom: 'Large system (16+ cameras)', recommendation: 'Dedicated circuit, possibly multiple POE switches' },
    { symptom: 'Intruder alarm panel', recommendation: '3A fused spur from ring main, battery backup' },
    { symptom: 'Commercial security suite', recommendation: 'Dedicated circuits, UPS backup, cable tray installation' }
  ],

  costEstimates: [
    { scenario: 'Dedicated circuit for NVR/POE switch', material: '£60-120', labour: '£100-180', total: '£160-300' },
    { scenario: 'Fused spur for alarm panel', material: '£30-60', labour: '£60-120', total: '£90-180' },
    { scenario: 'Cat6 cable runs (per camera)', material: '£20-50', labour: '£40-80', total: '£60-130' },
    { scenario: 'Outdoor camera SWA supply', material: '£100-200', labour: '£150-280', total: '£250-480' },
    { scenario: 'UPS installation for security', material: '£150-400', labour: '£80-150', total: '£230-550' }
  ],

  defined: {
    term: 'Security System Cable Sizing',
    definition: 'Security system cable sizing covers both mains supply (to NVR, POE switches, alarm panels) and low-voltage cabling (Cat6 for POE cameras, alarm wiring). Modern POE systems simplify installation - a single mains supply powers the switch, which then delivers power and data to cameras over Cat6 cable.'
  },

  defined2: {
    term: 'POE (Power over Ethernet)',
    definition: 'POE delivers power and data over standard Cat5e/Cat6 ethernet cable. POE cameras don\'t need separate mains supplies - they receive power from the POE switch or NVR. Standard POE provides 15W per port, POE+ provides 30W, and POE++ provides up to 100W for PTZ cameras and heated housings.'
  },

  faqs: [
    {
      q: 'What cable size do I need for a CCTV system?',
      a: 'For the mains supply to POE switch/NVR, typically 2.5mm² on a 16A circuit is adequate. Most home systems can use a 13A socket. The camera cables are Cat6 ethernet, not mains cable. Only the central equipment needs mains power.'
    },
    {
      q: 'Do I need mains power to each camera?',
      a: 'Not with POE systems. The cameras receive power through the ethernet cable from the POE switch or NVR. Only the central equipment (NVR, POE switch) needs mains power. This dramatically simplifies installation.'
    },
    {
      q: 'What about non-POE analogue cameras?',
      a: 'Older analogue systems may need separate 12V DC supplies at each camera location, run from a central PSU. Modern IP/POE systems are preferred for new installations as they need only Cat6 cable to each camera location.'
    },
    {
      q: 'How far can I run POE cables?',
      a: 'Standard POE works up to 100m over Cat5e/Cat6 cable. For longer runs, use POE extenders or fibre optic with media converters. Voltage drop over long Cat6 runs can reduce available power - keep runs under 80m for reliability.'
    },
    {
      q: 'Do CCTV circuits need RCD protection?',
      a: 'Indoor CCTV equipment doesn\'t specifically require RCD protection beyond normal consumer unit arrangements. Outdoor cameras on POE don\'t need mains RCD as they\'re low voltage. Any outdoor mains circuits (e.g., for separate camera PSUs) need 30mA RCD.'
    },
    {
      q: 'What about intruder alarm panels?',
      a: 'Alarm panels typically draw 1-3A from mains via their built-in PSU. A 3A fused spur from the ring main is standard, with unswitched supply to maintain power. The panel has battery backup for mains failure - usually 12V 7Ah batteries.'
    },
    {
      q: 'Should CCTV have battery backup?',
      a: 'For security systems, UPS (Uninterruptible Power Supply) backup is recommended. A UPS maintains recording during power cuts. Size the UPS for total system load plus runtime needed - 30 minutes to several hours depending on requirements.'
    },
    {
      q: 'Can I use existing telephone/data cables for cameras?',
      a: 'Cat5e can work for POE over short distances, but Cat6 is preferred for new installations. Old telephone cables are not suitable. For best performance and future-proofing, install new Cat6 cable for each camera location.'
    },
    {
      q: 'What about wireless cameras?',
      a: 'Wireless cameras still need power - either mains via a plug/fused spur, or battery. Battery cameras have limited recording time and need recharging. Wired POE systems are more reliable for permanent installations.'
    },
    {
      q: 'Is Part P notification required for CCTV installation?',
      a: 'Adding a socket or fused spur in a normal location is not notifiable. However, new circuits in kitchens, bathrooms, or outdoors are notifiable. The Cat6 cabling is data/low voltage and not covered by Part P.'
    }
  ],

  defined3: {
    term: 'NVR Power Requirements',
    definition: 'Network Video Recorders (NVRs) typically draw 50-150W depending on size and number of hard drives. POE NVRs with built-in POE ports need additional power budget for connected cameras - typically 15-30W per camera. Calculate total load when sizing the supply circuit.'
  },

  defined4: {
    term: 'Alarm Panel Battery Backup',
    definition: 'BS EN 50131 Grade 2 alarm systems require 12-hour battery backup. Grade 3 requires 60 hours. The mains PSU charges the backup batteries while powering the system. If mains fails, batteries maintain full operation. Regular battery testing and replacement (typically every 3-5 years) is essential.'
  }
}

export default function CCTVSecurityCableSizing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      <Helmet>
        <title>{usecaseData.metaTitle}</title>
        <meta name="description" content={usecaseData.metaDescription} />
        <meta name="keywords" content="CCTV cable size, security camera cable, POE camera installation, NVR power supply, intruder alarm electrical, BS 7671 CCTV, security system electrician" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={usecaseData.metaTitle} />
        <meta property="og:description" content={usecaseData.metaDescription} />
        <meta property="og:url" content={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/cctv-security-cable-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={usecaseData.metaTitle} />
        <meta name="twitter:description" content={usecaseData.metaDescription} />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/cctv-security-cable-og.jpg" />

        <link rel="canonical" href={`https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`} />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#1d4ed8" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'item': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'CCTV Security Cable Sizing', 'item': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}` }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'CCTV Security Cable Size Calculator UK',
                'description': usecaseData.metaDescription,
                'applicationCategory': 'Utility',
                'url': `https://tradecalcs.co.uk/calculators/cable-sizing/${usecaseData.slug}`,
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '623' }
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
                'name': 'How to Size Cable for CCTV Security Installation',
                'description': 'Step-by-step guide to calculating the correct cable size for security system installations.',
                'step': [
                  { '@type': 'HowToStep', 'name': 'Determine system type', 'text': 'Identify if POE, analogue, or hybrid system' },
                  { '@type': 'HowToStep', 'name': 'Calculate central equipment load', 'text': 'Add up NVR, POE switch, and any additional equipment power' },
                  { '@type': 'HowToStep', 'name': 'Plan camera cable runs', 'text': 'Measure Cat6 runs to each camera location' },
                  { '@type': 'HowToStep', 'name': 'Size mains supply', 'text': 'Calculate cable size for central equipment location' },
                  { '@type': 'HowToStep', 'name': 'Consider backup power', 'text': 'Specify UPS if continuous recording is critical' }
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

        <div className="bg-gradient-to-r from-slate-800 to-gray-800 text-white py-12 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Camera className="w-10 h-10" />
              <Zap className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold mb-2">{usecaseData.title}</h1>
            <p className="text-lg opacity-95">{usecaseData.heroDescription}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-slate-50 border-l-4 border-slate-600 rounded-lg p-6 mb-8">
            <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              CCTV & Security Cable Quick Facts
            </h2>
            <ul className="space-y-2">
              {usecaseData.keyFacts.map((fact, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
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
            />          </div>

          {/* CONTRACTOR LEAD CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Need a Qualified Electrician?</h3>
                <p className="text-purple-100">Get quotes from vetted, local contractors for your security system installation</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-4">Common Security Installations</h2>
            <div className="space-y-3">
              {usecaseData.symptomChecks.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-slate-700 font-bold text-sm">{i + 1}</span>
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
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-zinc-900 mb-3">Complete Property Security</h3>
            <p className="text-sm text-zinc-800 mb-4">
              CCTV pairs with <Link to="/calculators/cable-sizing/electric-gates-cable-sizing" className="text-zinc-600 font-semibold hover:underline">electric gate automation</Link> for comprehensive property access control. For garden offices and outbuildings with security cameras, see our <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="text-zinc-600 font-semibold hover:underline">garden building electrical guide</Link>. Commercial premises may also need <Link to="/calculators/cable-sizing/commercial-kitchen-cable-sizing" className="text-zinc-600 font-semibold hover:underline">dedicated circuits</Link> for various equipment.
            </p>
          </div>

          <div className="bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-slate-900 mb-2">{usecaseData.defined.term}</h3>
            <p className="text-sm text-slate-800">{usecaseData.defined.definition}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Security System Installation Costs (2024)</h2>
            <p className="text-sm text-gray-600 mb-4">Typical UK electrical installation costs. Does not include cameras, NVR, or alarm panel.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b">
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
            <p className="text-xs text-gray-500 mt-4">Prices as of 2024. Cat6 cable runs are per camera location.</p>
          </div>

          <div className="bg-gray-50 border-l-4 border-gray-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-2">{usecaseData.defined2.term}</h3>
            <p className="text-sm text-gray-800">{usecaseData.defined2.definition}</p>
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

          <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-purple-900 mb-2">{usecaseData.defined4.term}</h3>
            <p className="text-sm text-purple-800">{usecaseData.defined4.definition}</p>
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
              <Link to="/calculators/cable-sizing/electric-gates-cable-sizing" className="block p-4 bg-gradient-to-br from-zinc-50 to-slate-50 border border-zinc-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-zinc-900 mb-1">Electric Gates</h3>
                <p className="text-sm text-zinc-700">Access control systems</p>
              </Link>
              <Link to="/calculators/cable-sizing/garden-office-cable-sizing" className="block p-4 bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-green-900 mb-1">Garden Buildings</h3>
                <p className="text-sm text-green-700">Outbuilding security</p>
              </Link>
              <Link to="/voltage-drop-calculator" className="block p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-bold text-blue-900 mb-1">Voltage Drop Calculator</h3>
                <p className="text-sm text-blue-700">Long cable run checks</p>
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8" id="get-quotes">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Quotes from Local Electricians</h3>
              <p className="text-gray-700">
                Looking for a qualified electrician for your security system installation? Tell us about your project and we'll connect you with vetted contractors in your area. Free, no obligation quotes.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=CCTVSecurityCableSizing" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite CCTV Security Cable Sizing Inquiry Form"
                className="rounded-lg"
              />
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
  <strong>Trade professional or electrical business?</strong> Use the form above and let us know - we offer lead referrals in your area, bulk calculation tools, and white-label partnerships for merchants and suppliers.
</p>
            </div>
          </div>

          <div className="bg-slate-800 text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">More Electrical Calculators</h2>
            <p className="mb-6">Voltage drop, conduit fill, earth fault loop impedance and more. All BS 7671 compliant, all free.</p>
            <Link to="/" className="bg-white text-slate-800 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 inline-block">
              View All Calculators
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
