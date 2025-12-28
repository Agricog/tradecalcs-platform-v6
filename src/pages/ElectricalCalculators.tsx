import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { 
  Zap, Cable, Gauge, PoundSterling, Calculator, ChevronDown, ChevronUp, Building2, Home, Factory, 
  Waves, Sun, Car, Flame, AlertTriangle, CheckCircle2, BookOpen, HelpCircle,
  Lightbulb, Shield, Smartphone, Clock
} from 'lucide-react'
import { useState } from 'react'

export default function ElectricalCalculators() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [openGlossary, setOpenGlossary] = useState<number | null>(null)

  const faqs = [
    {
      q: 'What electrical calculations do UK electricians need to perform?',
      a: 'UK electricians regularly perform several key calculations to ensure BS 7671 compliance: voltage drop (Regulation 525), cable sizing for current-carrying capacity (Appendix 4), earth fault loop impedance (Zs) for disconnection times, prospective fault current (Ipf), and maximum demand with diversity factors. These calculations verify that installations are safe, efficient, and will pass EICR inspections.'
    },
    {
      q: 'How do I calculate voltage drop for a circuit?',
      a: 'Use the BS 7671 formula: Voltage Drop = (mV/A/m × Ib × L) ÷ 1000. The mV/A/m value comes from Table 4D1B (or equivalent) in Appendix 4 and already accounts for both conductors. Ib is your design current in amps, and L is the one-way cable length in metres. The result must not exceed 3% for lighting (6.9V) or 5% for power circuits (11.5V) from a 230V supply.'
    },
    {
      q: 'What cable size do I need for a 32A circuit?',
      a: 'It depends on installation method, cable length, and grouping. For short runs (<15m) using Reference Method C (clipped direct), 4mm² T&E handles 32A with margin. For longer runs or where voltage drop is a concern, 6mm² provides better compliance margin. Always verify both current-carrying capacity from the appropriate table AND voltage drop before finalising cable selection.'
    },
    {
      q: 'What is mV/A/m and how do I use it?',
      a: 'mV/A/m stands for millivolts per amp per metre - it\'s the voltage drop rate for a specific cable type. Find the value in BS 7671 Appendix 4 tables (e.g., Table 4D5 for flat T&E cables). The value already accounts for the go and return conductors. Multiply by your design current and cable length, then divide by 1000 to get voltage drop in volts.'
    },
    {
      q: 'Are these calculators compliant with BS 7671:2018+A2:2022?',
      a: 'Yes, all our electrical calculators use values and methods from BS 7671:2018+A2:2022 (18th Edition with Amendment 2). This includes mV/A/m values from Table 4D1B, current-carrying capacities from Section 4, and voltage drop limits from Regulation 525. We update calculators when new amendments are published.'
    },
    {
      q: 'What\'s the difference between cable sizing and voltage drop calculations?',
      a: 'Cable sizing determines the minimum cable size to safely carry the required current without overheating (thermal limits from Appendix 4 tables). Voltage drop checks whether that cable size delivers adequate voltage to the load over the circuit length. A cable might pass current capacity but fail voltage drop on long runs - both criteria must be satisfied for a compliant installation.'
    },
    {
      q: 'What is earth fault loop impedance (Zs)?',
      a: 'Zs is the total impedance of the earth fault current path - from the transformer, through supply cables, your installation\'s line conductor, and back through the CPC and earth. It determines how much fault current flows during an earth fault, which affects whether protective devices disconnect within required times (0.4s for socket circuits, 5s for distribution circuits).'
    },
    {
      q: 'How do I calculate Zs for a circuit?',
      a: 'Zs = Ze + (R1 + R2), where Ze is the external earth fault loop impedance (from the DNO or measured at the origin), R1 is the line conductor resistance, and R2 is the CPC resistance. The measured or calculated Zs must be less than the maximum Zs for your protective device from BS 7671 tables to ensure disconnection within required times.'
    },
    {
      q: 'Do I need to calculate voltage drop for every circuit?',
      a: 'Best practice is yes, especially for circuits over 10-15m or with significant loads. BS 7671 requires compliance but doesn\'t mandate documentation for every circuit. However, failing an EICR due to excessive voltage drop after installation is costly to remedy. Our calculators make pre-installation verification quick and simple.'
    },
    {
      q: 'What are the voltage drop limits in BS 7671?',
      a: 'For installations supplied from the public network: 3% for lighting circuits (6.9V from 230V) and 5% for other uses including socket outlets (11.5V from 230V). For private supplies, limits increase to 6% and 8% respectively. Runs over 100m can add 0.005% per additional metre, up to 0.5% extra maximum.'
    },
    {
      q: 'Can I use these calculators for commercial and industrial installations?',
      a: 'Yes, BS 7671 applies equally to domestic, commercial, and industrial installations. Our calculators cover single-phase and three-phase circuits, with specific tools for commercial lighting, warehouses, server rooms, industrial motors, and construction sites. The same regulations and calculation methods apply regardless of installation type.'
    },
    {
      q: 'What is the adiabatic equation and when do I need it?',
      a: 'The adiabatic equation (S = √(I²t)/k) calculates minimum CPC size to withstand fault current energy without damage. It\'s required when standard CPC sizes from tables might not be adequate - typically for high fault currents, long disconnection times, or when using reduced CPCs. The equation ensures protective conductors survive fault conditions.'
    },
    {
      q: 'How accurate are online electrical calculators?',
      a: 'Our calculators use official BS 7671 table values and established formulas. Results match manual calculations using the same data. For standard installations, accuracy is excellent. Complex scenarios involving multiple grouping factors, high ambient temperatures, or thermal insulation may require additional verification using the full design calculation method in Appendix 4.'
    },
    {
      q: 'What\'s the difference between single-phase and three-phase voltage drop?',
      a: 'Single-phase voltage drop uses the standard formula: VD = (mV/A/m × I × L) ÷ 1000. Three-phase balanced loads use: VD = (mV/A/m × I × L × 0.866) ÷ 1000, where 0.866 is √3/2. The three-phase mV/A/m values in BS 7671 tables are already adjusted for three-phase use, so check which table you\'re using.'
    },
    {
      q: 'Why do I need to consider installation method when sizing cables?',
      a: 'Installation method affects cable cooling and therefore current-carrying capacity. A cable clipped direct to a surface (Method C) dissipates heat better than one in conduit (Method B) or thermal insulation (Method 100). BS 7671 Appendix 4 provides different current ratings for each method. Using the wrong method can result in undersized or oversized cables.'
    }
  ]

  const glossaryTerms = [
    { term: 'mV/A/m', definition: 'Millivolts per amp per metre - the voltage drop rate for a cable type, found in BS 7671 Appendix 4 tables. Already accounts for both go and return conductors.' },
    { term: 'Zs', definition: 'Earth fault loop impedance - total impedance of the fault current path. Must be low enough for protective devices to disconnect within required times.' },
    { term: 'Ze', definition: 'External earth fault loop impedance - the portion of Zs external to your installation, measured at the origin or obtained from the DNO.' },
    { term: 'R1+R2', definition: 'Combined resistance of line conductor (R1) and circuit protective conductor (R2) for a specific circuit, measured at operating temperature.' },
    { term: 'Ib', definition: 'Design current - the current intended to be carried by the circuit under normal operating conditions, calculated from load power and voltage.' },
    { term: 'In', definition: 'Rated current of the protective device (MCB, fuse, or RCBO) that protects the circuit.' },
    { term: 'Iz', definition: 'Current-carrying capacity of a cable for continuous service under specific installation conditions, from Appendix 4 tables.' },
    { term: 'It', definition: 'Tabulated current-carrying capacity before applying correction factors. It = In ÷ (Ca × Cg × Ci × Cc).' },
    { term: 'Ca', definition: 'Ambient temperature correction factor - adjusts cable rating for temperatures above or below 30°C reference.' },
    { term: 'Cg', definition: 'Grouping correction factor - reduces cable rating when multiple circuits are grouped together and share heat.' },
    { term: 'Ci', definition: 'Thermal insulation correction factor - reduces cable rating when cables are surrounded by thermal insulation.' },
    { term: 'CPC', definition: 'Circuit Protective Conductor - the earth conductor that provides fault current return path, typically the earth core in T&E cable.' },
    { term: 'T&E', definition: 'Twin and Earth cable - flat PVC cable with live, neutral, and bare earth conductors, the most common domestic wiring cable in the UK.' },
    { term: 'SWA', definition: 'Steel Wire Armoured cable - armoured cable for buried or external use, with steel wire protection layer.' },
    { term: 'MCB', definition: 'Miniature Circuit Breaker - automatic switching device that trips on overcurrent. Types B, C, and D have different tripping characteristics.' },
    { term: 'RCD', definition: 'Residual Current Device - protective device that detects earth leakage current and disconnects supply, typically at 30mA for shock protection.' },
    { term: 'RCBO', definition: 'Residual Current Breaker with Overcurrent protection - combines MCB and RCD functions in one device for individual circuit protection.' },
    { term: 'AFDD', definition: 'Arc Fault Detection Device - detects dangerous arc faults that can cause fires, mandatory in certain installations under Amendment 2.' },
    { term: 'Ipf', definition: 'Prospective fault current - maximum current that would flow during a short circuit at a specific point, determines protective device breaking capacity required.' },
    { term: 'EICR', definition: 'Electrical Installation Condition Report - periodic inspection report that verifies installation safety and compliance with BS 7671.' }
  ]

  return (
    <>
      <Helmet>
        <title>Electrical Calculator UK | Free BS 7671 Calculators for Electricians | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free electrical calculators for UK electricians. Voltage drop, cable sizing, Zs calculations and BS 7671:2018+A2:2022 compliance tools. 27 use-case calculators for domestic, commercial and industrial installations." 
        />
        <meta name="keywords" content="electrical calculator, electrical calculators UK, BS 7671 calculator, voltage drop calculator, cable sizing calculator, wire size calculator, electrician calculator, electrical design calculator, Zs calculator, mV/A/m calculator, 18th edition calculator" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="TradeCalcs" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Electrical Calculator UK | Free BS 7671 Calculators for Electricians" />
        <meta property="og:description" content="Free electrical calculators for UK electricians. Voltage drop, cable sizing, BS 7671 compliance. 27 professional tools for all installation types." />
        <meta property="og:url" content="https://tradecalcs.co.uk/electrical-calculators" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/electrical-calculators-og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="TradeCalcs" />
        <meta property="og:locale" content="en_GB" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Electrical Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free BS 7671 electrical calculators. Voltage drop, cable sizing, compliance tools for UK electricians." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/electrical-calculators-twitter.jpg" />

        <link rel="canonical" href="https://tradecalcs.co.uk/electrical-calculators" />
        <meta name="theme-color" content="#7c3aed" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Electrical Calculators', 'item': 'https://tradecalcs.co.uk/electrical-calculators' }
                ]
              },
              {
                '@type': 'CollectionPage',
                'name': 'Electrical Calculator UK - Free BS 7671 Calculators',
                'description': 'Free electrical calculators for UK electricians including voltage drop, cable sizing, and BS 7671 compliance tools for domestic, commercial and industrial installations.',
                'url': 'https://tradecalcs.co.uk/electrical-calculators',
                'mainEntity': {
                  '@type': 'ItemList',
                  'numberOfItems': 29,
                  'itemListElement': [
                    { '@type': 'ListItem', 'position': 1, 'name': 'Voltage Drop Calculator', 'url': 'https://tradecalcs.co.uk/voltage-drop-calculator' },
                    { '@type': 'ListItem', 'position': 2, 'name': 'Cable Sizing Calculator', 'url': 'https://tradecalcs.co.uk/cable-sizing-calculator' },
                    { '@type': 'ListItem', 'position': 3, 'name': 'EV Charger Voltage Drop', 'url': 'https://tradecalcs.co.uk/calculators/voltage-drop/ev-charger' },
                    { '@type': 'ListItem', 'position': 4, 'name': 'Shower Circuit Calculator', 'url': 'https://tradecalcs.co.uk/calculators/voltage-drop/shower-circuit' },
                    { '@type': 'ListItem', 'position': 5, 'name': 'Solar PV Voltage Drop', 'url': 'https://tradecalcs.co.uk/calculators/voltage-drop/solar-pv' }
                  ]
                }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': faqs.map(faq => ({
                  '@type': 'Question',
                  'name': faq.q,
                  'acceptedAnswer': { '@type': 'Answer', 'text': faq.a }
                }))
              },
              {
                '@type': 'WebApplication',
                'name': 'TradeCalcs Electrical Calculators',
                'applicationCategory': 'UtilitiesApplication',
                'operatingSystem': 'Any',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '2847' }
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
        {/* BACK LINK */}
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link to="/" className="text-purple-600 hover:text-purple-800 font-semibold text-sm flex items-center gap-1">
            ← Back to All Calculators
          </Link>
        </div>

        {/* HERO */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-12 h-12" />
              <Calculator className="w-12 h-12" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Electrical Calculators UK</h1>
            <p className="text-xl opacity-95 max-w-3xl mx-auto mb-6">
              Free BS 7671:2018+A2:2022 compliant calculators for UK electricians. Voltage drop, cable sizing, and circuit design tools for domestic, commercial and industrial installations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/voltage-drop-calculator" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-flex items-center gap-2">
                <Zap className="w-5 h-5" /> Voltage Drop Calculator
              </Link>
              <Link to="/cable-sizing-calculator" className="border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-purple-600 transition inline-flex items-center gap-2">
                <Cable className="w-5 h-5" /> Cable Sizing Calculator
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          
          {/* INTRO CONTENT - SEO CRITICAL */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What Are Electrical Calculations and Why Do They Matter?</h2>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="mb-4">
                Electrical calculations are the mathematical processes electricians use to design safe, efficient, and compliant electrical installations. In the UK, these calculations ensure installations meet the requirements of <strong>BS 7671:2018+A2:2022</strong> (the 18th Edition IET Wiring Regulations) - the national standard that governs how electrical work must be carried out.
              </p>
              
              <p className="mb-4">
                Every circuit you install needs to satisfy multiple criteria: the cable must carry the required current without overheating, deliver adequate voltage to the load, and allow protective devices to disconnect fast enough during faults. Getting these calculations wrong doesn't just mean a failed EICR - it can result in overheating cables, fire risks, electric shock hazards, and equipment damage.
              </p>

              <p className="mb-4">
                The two most common calculations electricians perform are <strong>voltage drop</strong> and <strong>cable sizing</strong>. Voltage drop calculates how much electrical pressure is lost as current travels through conductors - too much drop means lights dim, motors run inefficiently, and equipment may malfunction. Cable sizing determines the minimum conductor cross-sectional area needed to safely carry the design current based on installation conditions.
              </p>

              <p className="mb-6">
                Our free electrical calculators automate these BS 7671 calculations, using official table values from Appendix 4. Whether you're wiring a domestic shower circuit, sizing a submain to an outbuilding, or designing a three-phase commercial installation, these tools verify compliance before you install - saving time, materials, and costly remedial work.
              </p>
            </div>

            {/* KEY STATS */}
            <div className="grid md:grid-cols-4 gap-4 mt-8">
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">29</div>
                <div className="text-sm text-purple-800">Specialist Calculators</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">BS 7671</div>
                <div className="text-sm text-blue-800">18th Edition Compliant</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm text-green-800">Free to Use</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-amber-600">Mobile</div>
                <div className="text-sm text-amber-800">Ready for Site Use</div>
              </div>
            </div>
          </section>

          {/* WHAT IS BS 7671 */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-purple-600" />
              What is BS 7671 and Why Does It Matter?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-700 mb-4">
                  <strong>BS 7671</strong>, formally titled "Requirements for Electrical Installations" and commonly known as the <strong>IET Wiring Regulations</strong> or simply "The Regs", is the UK national standard for electrical installation safety. Published jointly by the IET (Institution of Engineering and Technology) and BSI (British Standards Institution), it sets requirements for designing, installing, inspecting, and testing electrical installations.
                </p>
                <p className="text-gray-700 mb-4">
                  The current version is <strong>BS 7671:2018+A2:2022</strong> (18th Edition with Amendment 2). While not statutory law itself, compliance with BS 7671 is effectively mandatory because it's referenced by the Electricity at Work Regulations 1989, Part P of Building Regulations, and required by competent person schemes like NICEIC and NAPIT.
                </p>
                <p className="text-gray-700">
                  Amendment 2 (2022) introduced significant changes including mandatory AFDDs (Arc Fault Detection Devices) for socket circuits, new Chapter 82 for prosumer installations (solar PV, battery storage), and updated requirements for EV charging installations.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Key BS 7671 Requirements for Calculations</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Regulation 525:</strong> Voltage drop limits - 3% lighting, 5% other uses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Regulation 433:</strong> Cable sizing for overload protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Regulation 411:</strong> Automatic disconnection times for shock protection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Appendix 4:</strong> Current-carrying capacities and voltage drop tables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Chapter 41:</strong> Maximum Zs values for protective devices</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* WHICH CALCULATOR DO I NEED? */}
          <section className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-xl p-8 mb-12 border-2 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HelpCircle className="w-7 h-7 text-purple-600" />
              Which Calculator Do I Need?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-5 shadow">
                <h3 className="font-bold text-purple-900 mb-2">"Is my cable run too long?"</h3>
                <p className="text-sm text-gray-600 mb-3">Use the <strong>Voltage Drop Calculator</strong> to check if voltage loss exceeds BS 7671 limits (3% lighting, 5% power).</p>
                <Link to="/voltage-drop-calculator" className="text-purple-600 font-semibold text-sm hover:underline">→ Voltage Drop Calculator</Link>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow">
                <h3 className="font-bold text-purple-900 mb-2">"What cable size do I need?"</h3>
                <p className="text-sm text-gray-600 mb-3">Use the <strong>Cable Sizing Calculator</strong> to select correct cable for current capacity with derating factors.</p>
                <Link to="/cable-sizing-calculator" className="text-purple-600 font-semibold text-sm hover:underline">→ Cable Sizing Calculator</Link>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow">
                <h3 className="font-bold text-purple-900 mb-2">"EV charger installation"</h3>
                <p className="text-sm text-gray-600 mb-3">Dedicated calculator for 7kW and 22kW EV charging points with typical 20-30m garage runs.</p>
                <Link to="/calculators/voltage-drop/ev-charger" className="text-purple-600 font-semibold text-sm hover:underline">→ EV Charger Calculator</Link>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow">
                <h3 className="font-bold text-purple-900 mb-2">"Submain to outbuilding"</h3>
                <p className="text-sm text-gray-600 mb-3">Garden offices, workshops, garages - verify voltage drop for long SWA or armoured cable runs.</p>
                <Link to="/calculators/voltage-drop/submain-outbuilding" className="text-purple-600 font-semibold text-sm hover:underline">→ Submain Calculator</Link>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow">
                <h3 className="font-bold text-purple-900 mb-2">"Solar PV or battery system"</h3>
                <p className="text-sm text-gray-600 mb-3">MCS-compliant calculations for inverter to consumer unit runs and battery storage connections.</p>
                <Link to="/calculators/voltage-drop/solar-pv" className="text-purple-600 font-semibold text-sm hover:underline">→ Solar PV Calculator</Link>
              </div>
              
              <div className="bg-white rounded-lg p-5 shadow">
                <h3 className="font-bold text-purple-900 mb-2">"Commercial or industrial"</h3>
                <p className="text-sm text-gray-600 mb-3">Three-phase motors, warehouse lighting, server rooms - higher loads and longer runs.</p>
                <Link to="/calculators/voltage-drop/three-phase-motor" className="text-purple-600 font-semibold text-sm hover:underline">→ Three-Phase Calculator</Link>
              </div>
            </div>
          </section>

          {/* MAIN CALCULATORS */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Gauge className="w-7 h-7 text-purple-600" />
              Core Electrical Calculators
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link to="/voltage-drop-calculator" className="block p-6 bg-white border-2 border-purple-200 rounded-xl hover:shadow-lg hover:border-purple-400 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Voltage Drop Calculator</h3>
                    <p className="text-sm text-gray-500">BS 7671 Regulation 525</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">Calculate voltage drop using Table 4D1B mV/A/m values. Verify 3% lighting and 5% power circuit compliance instantly. Covers single-phase and three-phase circuits.</p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-semibold text-sm">27 use-case calculators available →</span>
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">MOST POPULAR</span>
                </div>
              </Link>

              <Link to="/cable-sizing-calculator" className="block p-6 bg-white border-2 border-purple-200 rounded-xl hover:shadow-lg hover:border-purple-400 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                    <Cable className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Cable Sizing Calculator</h3>
                    <p className="text-sm text-gray-500">Current Carrying Capacity</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">Size cables for current capacity with installation method, grouping and ambient temperature correction factors. Uses BS 7671 Appendix 4 tables for accurate results.</p>
                <span className="text-purple-600 font-semibold text-sm">Calculate cable size →</span>
              </Link>
            </div>
          </section>

          {/* PRICING GUIDES */}
<section className="bg-white rounded-lg shadow p-6 mb-8">
  <div className="flex items-center gap-3 mb-4">
    <PoundSterling className="w-8 h-8 text-green-600" />
    <h2 className="text-2xl font-bold text-gray-900">Electrical Pricing Guides</h2>
  </div>
  <p className="text-gray-600 mb-6">How much do electrical jobs cost in the UK? Detailed pricing guides with cost breakdowns:</p>
  
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Link to="/house-rewire-cost-uk" className="block p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg hover:shadow-md transition-shadow">
      <h3 className="font-bold text-green-900 mb-1">🏠 House Rewire Cost UK</h3>
      <p className="text-sm text-green-700">Full rewire pricing by property type</p>
      <p className="text-xs text-gray-500 mt-1">£3,000 - £10,000+ • 2025 prices</p>
    </Link>
    <div className="block p-4 bg-gray-50 border border-gray-200 rounded-lg opacity-60">
      <h3 className="font-bold text-gray-700 mb-1">Consumer Unit Upgrade</h3>
      <p className="text-sm text-gray-500">Fuse box replacement costs</p>
      <p className="text-xs text-gray-400 mt-1">Coming soon</p>
    </div>
    <div className="block p-4 bg-gray-50 border border-gray-200 rounded-lg opacity-60">
      <h3 className="font-bold text-gray-700 mb-1">EV Charger Installation</h3>
      <p className="text-sm text-gray-500">Home charging point costs</p>
      <p className="text-xs text-gray-400 mt-1">Coming soon</p>
    </div>
  </div>
</section>

          {/* DOMESTIC CIRCUITS */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Home className="w-7 h-7 text-green-600" />
              Domestic Circuit Calculators
            </h2>
            <p className="text-gray-600 mb-6">Voltage drop calculators for common household circuits and installations. Pre-configured with typical loads and cable types.</p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link to="/calculators/voltage-drop/ring-circuit" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Ring Circuit</h3>
                <p className="text-sm text-gray-600">UK ring main - divide by 4 method</p>
              </Link>

              <Link to="/calculators/voltage-drop/radial-circuit" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Radial Circuit</h3>
                <p className="text-sm text-gray-600">20A and 32A socket circuits</p>
              </Link>

              <Link to="/calculators/voltage-drop/domestic-lighting" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Domestic Lighting</h3>
                <p className="text-sm text-gray-600">Indoor lighting - 3% limit</p>
              </Link>

              <Link to="/calculators/voltage-drop/shower-circuit" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Shower Circuit</h3>
                <p className="text-sm text-gray-600">8.5kW to 10.5kW electric showers</p>
              </Link>

              <Link to="/calculators/voltage-drop/cooker-circuit" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Cooker Circuit</h3>
                <p className="text-sm text-gray-600">Electric ovens, hobs, ranges</p>
              </Link>

              <Link to="/calculators/voltage-drop/immersion-heater" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Immersion Heater</h3>
                <p className="text-sm text-gray-600">3kW hot water circuits</p>
              </Link>

              <Link to="/calculators/voltage-drop/underfloor-heating" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Underfloor Heating</h3>
                <p className="text-sm text-gray-600">Electric UFH mats and cables</p>
              </Link>

              <Link to="/calculators/voltage-drop/garden-lighting" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Garden Lighting</h3>
                <p className="text-sm text-gray-600">Outdoor and landscape lighting</p>
              </Link>
            </div>
          </section>

          {/* OUTBUILDINGS & EV */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Building2 className="w-7 h-7 text-cyan-600" />
              Outbuildings, EV & Renewable Energy
            </h2>
            <p className="text-gray-600 mb-6">Submains, EV charging, solar PV and battery storage calculations. These longer runs often require careful voltage drop verification.</p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link to="/calculators/voltage-drop/submain-outbuilding" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-cyan-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Submain to Outbuilding</h3>
                <p className="text-sm text-gray-600">Garages, offices, workshops</p>
              </Link>

              <Link to="/calculators/voltage-drop/swa-armoured-cable" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-cyan-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">SWA Armoured Cable</h3>
                <p className="text-sm text-gray-600">Buried and external runs</p>
              </Link>

              <Link to="/calculators/voltage-drop/workshop" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-cyan-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Workshop & Garage</h3>
                <p className="text-sm text-gray-600">Welders, compressors, machinery</p>
              </Link>

              <Link to="/calculators/voltage-drop/annex" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-cyan-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Annex & Granny Flat</h3>
                <p className="text-sm text-gray-600">Separate dwelling supplies</p>
              </Link>

              <Link to="/calculators/voltage-drop/ev-charger" className="block p-4 bg-white border-2 border-green-300 rounded-lg hover:shadow-md transition-all bg-green-50">
                <div className="flex items-center gap-2 mb-1">
                  <Car className="w-4 h-4 text-green-600" />
                  <h3 className="font-bold text-gray-900">EV Charger</h3>
                </div>
                <p className="text-sm text-gray-600">7kW and 22kW charging points</p>
              </Link>

              <Link to="/calculators/voltage-drop/solar-pv" className="block p-4 bg-white border-2 border-amber-300 rounded-lg hover:shadow-md transition-all bg-amber-50">
                <div className="flex items-center gap-2 mb-1">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <h3 className="font-bold text-gray-900">Solar PV</h3>
                </div>
                <p className="text-sm text-gray-600">Inverter to consumer unit</p>
              </Link>

              <Link to="/calculators/voltage-drop/battery-storage" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-emerald-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Home Battery Storage</h3>
                <p className="text-sm text-gray-600">Tesla, GivEnergy, hybrid</p>
              </Link>

              <Link to="/calculators/voltage-drop/heat-pump" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-cyan-300 transition-all">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-4 h-4 text-cyan-600" />
                  <h3 className="font-bold text-gray-900">Heat Pump</h3>
                </div>
                <p className="text-sm text-gray-600">ASHP & GSHP - MCS compliant</p>
              </Link>
            </div>
          </section>

          {/* COMMERCIAL & INDUSTRIAL */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Factory className="w-7 h-7 text-slate-600" />
              Commercial & Industrial
            </h2>
            <p className="text-gray-600 mb-6">Three-phase circuits, long distribution runs, and heavy industrial applications.</p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link to="/calculators/voltage-drop/three-phase-motor" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-purple-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Three-Phase Motor</h3>
                <p className="text-sm text-gray-600">0.866 factor, starting current</p>
              </Link>

              <Link to="/calculators/voltage-drop/commercial-lighting" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-yellow-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Commercial Lighting</h3>
                <p className="text-sm text-gray-600">Offices, retail, emergency</p>
              </Link>

              <Link to="/calculators/voltage-drop/warehouse" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-slate-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Warehouse & Industrial</h3>
                <p className="text-sm text-gray-600">Long runs, distribution</p>
              </Link>

              <Link to="/calculators/voltage-drop/server-room" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-indigo-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Server Room / Data Centre</h3>
                <p className="text-sm text-gray-600">UPS, critical power, 2-3%</p>
              </Link>

              <Link to="/calculators/voltage-drop/agricultural" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-lime-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Agricultural & Farm</h3>
                <p className="text-sm text-gray-600">Section 705 requirements</p>
              </Link>

              <Link to="/calculators/voltage-drop/construction-site" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-orange-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Construction Site</h3>
                <p className="text-sm text-gray-600">Section 704, 110V CTE</p>
              </Link>
            </div>
          </section>

          {/* SPECIAL LOCATIONS */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Waves className="w-7 h-7 text-blue-600" />
              Special Locations (BS 7671 Part 7)
            </h2>
            <p className="text-gray-600 mb-6">Locations with additional requirements under BS 7671 Section 700+. Often have stricter voltage drop limits.</p>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Link to="/calculators/voltage-drop/swimming-pool" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-sky-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Swimming Pool</h3>
                <p className="text-sm text-gray-600">Section 702 - zones, SELV</p>
              </Link>

              <Link to="/calculators/voltage-drop/hot-tub" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-violet-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Hot Tub & Spa</h3>
                <p className="text-sm text-gray-600">Outdoor dedicated circuits</p>
              </Link>

              <Link to="/calculators/voltage-drop/marina" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Marina Shore Power</h3>
                <p className="text-sm text-gray-600">Section 709 - 3% limit</p>
              </Link>

              <Link to="/calculators/voltage-drop/caravan-site" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-green-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">Caravan & Camping</h3>
                <p className="text-sm text-gray-600">Section 708 pitch supplies</p>
              </Link>
              
              <Link to="/calculators/voltage-drop/12v-dc-systems" className="block p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md hover:border-sky-300 transition-all">
                <h3 className="font-bold text-gray-900 mb-1">12V DC Systems</h3>
                <p className="text-sm text-gray-600">Caravans, boats, solar, garden</p>
              </Link>
            </div>
          </section>

          {/* HOW VOLTAGE DROP IS CALCULATED */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Lightbulb className="w-7 h-7 text-amber-500" />
              How Voltage Drop Is Calculated
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">The Basic Formula</h3>
                <div className="bg-gray-100 rounded-lg p-4 mb-4 font-mono text-center">
                  <span className="text-lg">VD = (mV/A/m × Ib × L) ÷ 1000</span>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li><strong>VD</strong> = Voltage drop in volts</li>
                  <li><strong>mV/A/m</strong> = Millivolts per amp per metre (from BS 7671 tables)</li>
                  <li><strong>Ib</strong> = Design current in amps</li>
                  <li><strong>L</strong> = One-way cable length in metres</li>
                </ul>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mt-6">
                  <h4 className="font-bold text-blue-900 mb-2">Example Calculation</h4>
                  <p className="text-sm text-blue-800">
                    10mm² T&E cable, 25 metres, 32A load:<br />
                    mV/A/m from Table 4D5 = 4.4<br />
                    VD = (4.4 × 32 × 25) ÷ 1000 = <strong>3.52V (1.53%)</strong><br />
                    ✓ Passes 5% limit (11.5V max)
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-3">BS 7671 Voltage Drop Limits</h3>
                <table className="w-full text-sm mb-4">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-2">Circuit Type</th>
                      <th className="text-center p-2">% Limit</th>
                      <th className="text-center p-2">Max Volts (230V)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2">Lighting circuits</td>
                      <td className="text-center p-2 font-bold text-amber-600">3%</td>
                      <td className="text-center p-2">6.9V</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Other uses (sockets, fixed)</td>
                      <td className="text-center p-2 font-bold text-green-600">5%</td>
                      <td className="text-center p-2">11.5V</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Private supply - lighting</td>
                      <td className="text-center p-2">6%</td>
                      <td className="text-center p-2">13.8V</td>
                    </tr>
                    <tr>
                      <td className="p-2">Private supply - other</td>
                      <td className="text-center p-2">8%</td>
                      <td className="text-center p-2">18.4V</td>
                    </tr>
                  </tbody>
                </table>
                
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> For cable runs over 100m, limits can be increased by 0.005% per additional metre, up to 0.5% extra maximum. This is rarely needed for domestic work.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* WHY USE THESE CALCULATORS */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Use BS 7671 Electrical Calculators?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-green-900">Pass EICR First Time</h3>
                </div>
                <p className="text-sm text-green-800">Verify compliance during design, not after installation. Avoid costly remedial work and failed certifications.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-blue-900">18th Edition Compliant</h3>
                </div>
                <p className="text-sm text-blue-800">All calculators use BS 7671:2018+A2:2022 values and methods. Table 4D1B mV/A/m data included.</p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone className="w-5 h-5 text-purple-600" />
                  <h3 className="font-bold text-purple-900">Mobile Ready</h3>
                </div>
                <p className="text-sm text-purple-800">Use on-site from your phone. Quick calculations between jobs without carrying reference books.</p>
              </div>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-amber-900">Save Time</h3>
                </div>
                <p className="text-sm text-amber-800">Instant results vs. manual table lookups. Check multiple scenarios in seconds to find the optimal solution.</p>
              </div>
            </div>
          </section>

          {/* GLOSSARY */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-indigo-600" />
              Electrical Terms Glossary
            </h2>
            <p className="text-gray-600 mb-6">Quick reference for common electrical calculation terms and abbreviations used in BS 7671.</p>
            
            <div className="grid md:grid-cols-2 gap-3">
              {glossaryTerms.map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenGlossary(openGlossary === i ? null : i)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-bold text-purple-700">{item.term}</span>
                    {openGlossary === i ? (
                      <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openGlossary === i && (
                    <div className="px-4 pb-3">
                      <p className="text-sm text-gray-700">{item.definition}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HelpCircle className="w-7 h-7 text-purple-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
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
          </section>

          {/* IMPORTANT NOTES */}
          <section className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-12">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-amber-900 mb-2">Important Notes on Using These Calculators</h3>
                <ul className="text-sm text-amber-800 space-y-2">
                  <li>• These calculators are design aids and do not replace professional electrical engineering judgement</li>
                  <li>• Always verify calculations using the full BS 7671 tables and methodology for final designs</li>
                  <li>• Complex installations with grouping, thermal insulation, or harmonics may require additional factors</li>
                  <li>• Installation, inspection and testing must be carried out by competent persons</li>
                  <li>• mV/A/m values used are from BS 7671:2018+A2:2022 - check for updates when new amendments are published</li>
                </ul>
              </div>
            </div>
          </section>

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
            
            <p className="text-center text-sm text-gray-600 mt-4">
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" className="text-purple-600 font-semibold hover:underline">mick@tradecalcs.co.uk</a>
            </p>
          </div>

          {/* CTA FOOTER */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Start Calculating</h2>
            <p className="mb-6 opacity-95">Choose a calculator above or start with our most popular tool:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/voltage-drop-calculator" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 inline-flex items-center gap-2">
                <Zap className="w-5 h-5" /> Voltage Drop Calculator
              </Link>
              <Link to="/cable-sizing-calculator" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-purple-600 transition inline-flex items-center gap-2">
                <Cable className="w-5 h-5" /> Cable Sizing Calculator
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
