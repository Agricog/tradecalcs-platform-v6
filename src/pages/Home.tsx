import {
  Zap, Shield, Smartphone, PoundSterling, Lightbulb, CheckCircle2, ArrowRight,
  Package, Palette, Hammer, Home as HomeIcon, Droplet, Calculator, TruckIcon,
  Phone, Mail, MessageSquare, Droplets, Flame, Circle, Activity, Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import QuickFindModal from '../components/QuickFindModal';
import { SEOHead } from '../components/layout';

const colorMap = {
  blue: '#3b82f6',
  cyan: '#06b6d4',
  orange: '#ea580c',
  green: '#22c55e',
  amber: '#f59e0b',
  red: '#ef4444',
  purple: '#a855f7',
  slate: '#475569',
  indigo: '#4f46e5'
};

const getContactClasses = (color: string) => {
  if (color === 'blue') return { bg: 'bg-blue-50', icon: 'bg-blue-600', text: 'text-blue-600', hover: 'hover:text-blue-700' };
  if (color === 'purple') return { bg: 'bg-purple-50', icon: 'bg-purple-600', text: 'text-purple-600', hover: 'hover:text-purple-700' };
  return { bg: 'bg-green-50', icon: 'bg-green-600', text: 'text-green-600', hover: 'hover:text-green-700' };
};

const getCalcColorClasses = (color: string) => {
  if (color === 'blue') return 'text-blue-600';
  if (color === 'cyan') return 'text-cyan-600';
  if (color === 'orange') return 'text-orange-600';
  if (color === 'green') return 'text-green-600';
  if (color === 'amber') return 'text-amber-600';
  if (color === 'red') return 'text-red-600';
  if (color === 'purple') return 'text-purple-600';
  if (color === 'slate') return 'text-slate-600';
  if (color === 'indigo') return 'text-indigo-600';
  return 'text-blue-600';
};

const faqs = [
  {
    q: 'What trade calculators do you offer?',
    a: 'We offer 100+ professional calculators for electricians, plumbers, builders, painters, plasterers, joiners, bricklayers, tilers, roofers, scaffolders and more. All calculators are free to use and BS 7671 compliant where applicable.'
  },
  {
    q: 'Are TradeCalcs calculators BS 7671 compliant?',
    a: 'Yes. Our electrical calculators (cable sizing, voltage drop) are fully compliant with BS 7671 British Standards for electrical installation. All calculations include current derating factors and regulations.'
  },
  {
    q: 'Do I need to sign up to use the calculators?',
    a: 'No signup required. All calculators are completely free and instantly accessible. No registration, no hidden costs, no premium tiers.'
  },
  {
    q: 'Can I use TradeCalcs on my mobile phone?',
    a: 'Yes. All TradeCalcs calculators are fully responsive and mobile-friendly. Use them on your phone, tablet or desktop - perfect for on-site calculations.'
  },
  {
    q: 'Do you offer custom calculators for my trade?',
    a: 'Yes. We build custom web applications and calculators for trade businesses. Contact us to discuss your specific needs and requirements.'
  },
  {
    q: 'Can I generate professional quotes from calculations?',
    a: 'Yes. Our new quoting workflow lets you turn any calculation into a professional PDF quote. Add materials, get wholesaler pricing, set labour rates and markup, then download or email directly to customers.'
  }
];

export default function Home() {
  const [showQuickFind, setShowQuickFind] = useState(false);

  return (
    <>
      <SEOHead
        title="TradeCalcs - Free Professional Trade Calculators for UK Tradespeople"
        description="Free professional trade calculators for electricians, plumbers, builders, painters & more. BS 7671 compliant, mobile-ready. Cable sizing, voltage drop, concrete, paint & 100+ more calculators."
        keywords="trade calculators, electrician calculator, plumber calculator, builder calculator, cable sizing, voltage drop, BS 7671, professional calculators, UK trades, free trade tools"
        canonicalUrl="/"
        breadcrumbs={[
          { name: 'Home', url: '/' }
        ]}
        faqs={faqs}
        additionalSchema={[
          {
            '@type': 'Organization',
            name: 'TradeCalcs',
            url: 'https://tradecalcs.co.uk',
            logo: 'https://tradecalcs.co.uk/logo.png',
            description: 'Professional trade calculators for UK tradespeople',
            sameAs: [
              'https://twitter.com/tradecalcs',
              'https://facebook.com/tradecalcs',
              'https://linkedin.com/company/tradecalcs'
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Customer Support',
              email: 'support@tradecalcs.co.uk',
              telephone: '+44-7985-559775'
            }
          },
          {
            '@type': 'WebSite',
            url: 'https://tradecalcs.co.uk',
            name: 'TradeCalcs',
            description: 'Free professional trade calculators for UK tradespeople',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://tradecalcs.co.uk?q={search_term_string}'
              },
              'query-input': 'required name=search_term_string'
            }
          },
          {
            '@type': 'LocalBusiness',
            name: 'TradeCalcs',
            image: 'https://tradecalcs.co.uk/logo.png',
            description: 'Professional trade calculators for UK tradespeople',
            url: 'https://tradecalcs.co.uk',
            telephone: '+44-7985-559775',
            email: 'mick@tradecalcs.co.uk',
            areaServed: 'GB',
            priceRange: 'Free - £15,000'
          }
        ]}
      />

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .twinkle { animation: twinkle 1.5s infinite; }
      `}</style>

      <QuickFindModal isOpen={showQuickFind} onClose={() => setShowQuickFind(false)} />

      <a href="https://app.smartsuite.com/forms/ba974giZx9ZVTVrwE" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 text-center hover:from-purple-700 hover:to-blue-700 transition">
        <div className="flex items-center justify-center gap-2 text-sm md:text-base">
          <span className="twinkle">✨</span>
          <span className="font-semibold">Get VIP Access to New Tools • We Build Bespoke Web Apps for Your Business Problems</span>
          <span className="twinkle">✨</span>
        </div>
      </a>

      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Professional Trade Calculators</h1>
          <p className="text-2xl mb-8">Built for UK Tradespeople</p>
          <p className="text-lg mb-8 opacity-95">
            100+ free calculators compliant with British Standards. Save time,<br />
            reduce errors, and work with confidence.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button 
              onClick={() => setShowQuickFind(true)} 
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Find Your Calculator
            </button>
            <button onClick={() => document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-purple-600 transition flex items-center gap-2">
              Browse All Tools <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Why Trade Professionals Choose TradeCalcs</h2>
          <p className="text-center text-gray-600 mb-12">Built by tradespeople who understand your daily challenges</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'Lightning Fast', desc: 'Get instant results with our optimized calculations. No waiting, no complex forms.' },
              { icon: Shield, title: 'BS 7671 Compliant', desc: 'All electrical calculations follow current British Standards for peace of mind.' },
              { icon: Smartphone, title: 'Mobile Ready', desc: 'Use on any device - phone, tablet, or desktop. Calculate on-site or in the office.' },
              { icon: PoundSterling, title: 'Always Free', desc: 'No hidden costs, no premium tiers. Professional tools available to all tradespeople.' }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-blue-50 border-y-2 border-purple-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              NEW FEATURE
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Turn Calculations Into Professional Quotes
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Calculate materials, get wholesaler pricing, add labour costs, and generate<br />
              client-ready PDF quotes — all in one workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { step: '1', title: 'Calculate', desc: 'Run BS 7671 compliant calculations' },
              { step: '2', title: 'Price Materials', desc: 'Send to wholesaler for live pricing' },
              { step: '3', title: 'Add Labour', desc: 'Set day rates, markup & VAT' },
              { step: '4', title: 'Send Quote', desc: 'Download professional PDF instantly' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border-2 border-purple-200 text-center">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-purple-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Tradespeople Love It</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Quotes backed by real calculations', desc: 'Not blank forms — actual BS 7671 compliant data' },
                    { title: 'Wholesaler pricing built in', desc: 'Send materials list, get prices back automatically' },
                    { title: 'Professional PDFs in seconds', desc: 'Your branding, proper layout, ready to email' },
                    { title: 'Free to start', desc: 'No subscription needed for basic quoting' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <Link 
                  to="/projects" 
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold transition"
                >
                  Start Your First Quote
                </Link>
                <p className="text-sm text-gray-600 mt-3">Free • No signup required to try</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="calculators" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Free Professional Calculators</h2>
              <p className="text-gray-600">100+ calculators for every trade</p>
            </div>
            <button 
              onClick={() => setShowQuickFind(true)}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold hover:bg-purple-200 transition"
            >
              <Search className="w-4 h-4" />
              Quick Find
            </button>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-8 mb-12 shadow-xl">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-4">Generate Professional Quotes in 2 Minutes</h3>
              <p className="text-lg mb-6 opacity-90">Calculate materials, labour costs, and create client-ready PDF quotes instantly</p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <a href="/paint-calculator" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">Painter Calculator</a>
                <a href="/cable-sizing-calculator" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">Electrician Calculator</a>
                <a href="/joinery-calculator" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">Joinery Calculator</a>
              </div>
              <p className="text-sm opacity-75">Free to use • No sign-up required • Professional PDF quotes</p>
            </div>
          </div>

          <Link to="/electrical-calculators" className="block mb-8 p-6 bg-gradient-to-r from-purple-100 to-indigo-100 border-2 border-purple-300 rounded-xl hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-1">HUB PAGE</p>
                <h3 className="text-2xl font-bold text-purple-900 mb-2">All Electrical Calculators</h3>
                <p className="text-purple-700">Voltage drop, cable sizing & 50+ use-case calculators for every circuit type</p>
              </div>
              <ArrowRight className="w-8 h-8 text-purple-600" />
            </div>
          </Link>

          <Link 
            to="/cable-sizing-calculators" 
            className="block bg-gradient-to-r from-blue-50 to-indigo-100 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow mb-8"
          >
            <div className="flex justify-between items-center">
              <div>
                <span className="text-blue-600 text-sm font-semibold">HUB PAGE</span>
                <h3 className="text-xl font-bold text-blue-700">All Cable Sizing Calculators</h3>
                <p className="text-blue-600">28 use-case calculators for every circuit type</p>
              </div>
              <ArrowRight className="w-6 h-6 text-blue-600" />
            </div>
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/electrical-load-calculator', icon: Activity, title: 'Electrical Load Calculator', desc: 'Calculate maximum demand with BS 7671 diversity factors. Determine supply size.', color: 'indigo', trade: 'For Electricians', isNew: true },
              { href: '/cable-sizing-calculator', icon: Zap, title: 'Cable Sizing Calculator', desc: 'BS 7671 compliant electrical cable sizing with all derating factors', color: 'blue', trade: 'For Electricians' },
              { href: '/voltage-drop-calculator', icon: Zap, title: 'Voltage Drop Calculator', desc: 'Verify BS 7671 Regulation 525 compliance for electrical circuits', color: 'cyan', trade: 'For Electricians' },
              { href: '/conduit-fill-calculator', icon: Circle, title: 'Conduit Fill Calculator', desc: 'Calculate cable capacity for conduit and trunking. BS 7671 40% fill limit.', color: 'slate', trade: 'For Electricians', isNew: true },
              { href: '/radiator-btu-calculator', icon: Flame, title: 'Radiator BTU Calculator', desc: 'Calculate exact heat output needed for any room. Accounts for insulation, windows & room type.', color: 'orange', trade: 'For Heating Engineers', isNew: true },
              { href: '/bsp-thread-calculator', icon: Lightbulb, title: 'BSP Thread Identifier', desc: 'Identify British Standard Pipe threads by diameter or TPI', color: 'orange', trade: 'For Plumbers' },
              { href: '/roofing-insurance-calculator', icon: PoundSterling, title: 'Roofing Insurance Calculator', desc: 'Calculate fair market value and fight for proper compensation', color: 'green', trade: 'For Roofers' },
              { href: '/drainage-calculator', icon: Droplets, title: 'Drainage Calculator', desc: 'Calculate pipe bedding, spoil removal & trench backfill quantities', color: 'blue', trade: 'For Drainage Pros' },
              { href: '/concrete-calculator', icon: Package, title: 'Concrete-to-Bags Calculator', desc: 'Calculate exact cement and ballast bags to buy from any UK merchant', color: 'green', trade: 'For Builders' },
              { href: '/plasterer-calculator', icon: Palette, title: 'Plasterer Calculators', desc: 'Coverage, drying times, quotes & cost calculators for plasterers', color: 'amber', trade: 'For Plasterers' },
              { href: '/joinery-calculator', icon: Hammer, title: 'Joinery Material Labour Calculator', desc: 'Calculate wood costs, waste factors & labour hours for projects', color: 'amber', trade: 'For Joiners' },
              { href: '/brick-block-calculator', icon: HomeIcon, title: 'Brick Block Calculator', desc: 'Calculate bricks, concrete blocks, mortar & cement needed', color: 'red', trade: 'For Bricklayers' },
              { href: '/tiling-calculator', icon: Droplet, title: 'Tiling Calculator', desc: 'Calculate tiles, adhesive & grout for walls and floors', color: 'amber', trade: 'For Tilers' },
              { href: '/paint-calculator', icon: Palette, title: 'Paint Calculator', desc: 'Calculate paint & primer quantities for any room or project', color: 'red', trade: 'For Painters & Decorators' },
              { href: '/calculators/cis-calculator', icon: Calculator, title: 'CIS Tax Calculator', desc: 'Calculate Construction Industry Scheme deductions for contractors & subcontractors', color: 'purple', trade: 'For All Trades', isNew: true },
              { href: '/calculators/stgo-calculator', icon: TruckIcon, title: 'HaulCheck - STGO Compliance', desc: 'Avoid £750K fines - instant STGO category checks, weight limits & notification requirements', color: 'orange', trade: 'For Hauliers', isNew: true },
              { href: '/calculators/scaffold-calculator', icon: Calculator, title: 'Scaffold Calculator', desc: 'Calculate tubes, fittings, boards, ties & costs for independent and putlog scaffolds', color: 'blue', trade: 'For Scaffolders', isNew: true },
              { href: '/calculators/insulation-calculator', icon: HomeIcon, title: 'Insulation U-Value Calculator', desc: 'Calculate U-values & check Part L 2021 compliance for walls, roofs & floors', color: 'green', trade: 'For Builders & Architects', isNew: true }
            ].map((calc, i) => (
              <a key={i} href={calc.href} className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition relative">
                {calc.isNew && (
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">NEW</div>
                )}
                <div className="p-6">
                  <div className={getCalcColorClasses(calc.color) + ' text-xs font-bold mb-3 uppercase tracking-wider'}>{calc.trade}</div>
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4"
                    style={{ backgroundColor: colorMap[calc.color as keyof typeof colorMap] }}
                  >
                    <calc.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{calc.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{calc.desc}</p>
                  <div className={getCalcColorClasses(calc.color) + ' font-semibold flex items-center gap-2 hover:gap-3 transition'}>
                    Use Calculator <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Can't find what you're looking for? We have 100+ calculators!</p>
            <button 
              onClick={() => setShowQuickFind(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition"
            >
              <Search className="w-5 h-5" />
              Search All Calculators
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Built by Tradespeople, for Tradespeople</h2>
              <p className="text-gray-700 mb-6">
                We understand the challenges you face every day because we've been there. Our tools are designed to make your job easier, faster, and more accurate.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { title: 'Save Time On Every Job', desc: 'Instant calculations mean less time with paperwork and more time doing what you do best' },
                  { title: 'Reduce Costly Errors', desc: 'Accurate, tested calculations help you avoid expensive mistakes and rework' },
                  { title: 'Stay Compliant', desc: 'All tools follow current British Standards so you work with confidence' },
                  { title: 'Work From Anywhere', desc: 'Access your tools on any device - perfect for on-site calculations' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-3">Ready to Work Smarter?</h3>
              <p className="mb-6 opacity-95">Join professional tradespeople who are already saving time and reducing errors with TradeCalcs.</p>
              <button onClick={() => setShowQuickFind(true)} className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 inline-flex items-center gap-2">
                <Search className="w-5 h-5" />
                Find Your Calculator
              </button>
              <p className="text-sm opacity-75 mt-4">No signup required • Instant access • Always free</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50 border-y-2 border-purple-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Got a Better Idea? We're Listening</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Have an improvement for our existing calculators? Want a brand new calculator built for your specific trade challenge? Or need automation to solve a recurring business problem? Let's talk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Calculator Improvements', desc: 'Missing a feature? Want us to add something to an existing calculator? Tell us your idea.' },
              { title: 'Custom Calculators', desc: 'Need a specialized calculator built for your exact business needs? We build bespoke solutions.' },
              { title: 'Automation Tools', desc: 'Sick of doing the same task manually? Let\'s automate it and save you hours every week.' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border-2 border-purple-200 text-center hover:shadow-lg transition">
                <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">💡</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border-2 border-purple-300">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get in Touch Directly</h3>
              <div className="space-y-4 mb-8">
                {[
                  { icon: Phone, title: 'Call or text anytime', detail: '07985 559775', color: 'blue' },
                  { icon: MessageSquare, title: 'Quick message? WhatsApp or SMS', detail: 'Same number, instant reply', color: 'purple' },
                  { icon: Mail, title: 'Email for detailed requests', detail: 'mick@tradecalcs.co.uk', color: 'green' }
                ].map((item, i) => {
                  const classes = getContactClasses(item.color);
                  return (
                    <div key={i} className={`flex items-center gap-4 p-4 ${classes.bg} rounded-lg`}>
                      <div className={`w-12 h-12 ${classes.icon} rounded-lg flex items-center justify-center text-white flex-shrink-0`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{item.title}</p>
                        {item.detail.startsWith('@') ? (
                          <a href={`mailto:${item.detail}`} className={`font-bold ${classes.text} ${classes.hover}`}>{item.detail}</a>
                        ) : item.detail.startsWith('07') ? (
                          <a href={`tel:${item.detail}`} className={`text-xl font-bold ${classes.text} ${classes.hover}`}>{item.detail}</a>
                        ) : (
                          <p className={`text-lg font-bold ${classes.text}`}>{item.detail}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="bg-gray-50 rounded-lg p-6 mb-6 border-l-4 border-purple-600">
                <p className="text-gray-700 font-semibold mb-2">Why reach out?</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• You've spotted something we can improve</li>
                  <li>• You need a calculator we haven't built yet</li>
                  <li>• You want to automate a time-consuming process</li>
                  <li>• You have a specific business problem to solve</li>
                  <li>• You just want to say thanks or share feedback</li>
                </ul>
              </div>
              <p className="text-center text-gray-600 text-sm"><span className="font-semibold">I personally answer every message</span> - whether it's a phone call, text, or email. Let's build something great together.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="custom" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Need Something Custom?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We build bespoke web applications and automation tools for UK trade businesses. Got a specific problem? Let's create a solution together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: 'Bespoke Custom Apps', price: '£2,000 - £15,000', desc: 'Custom web applications built specifically for your trade business. Automate workflows, capture data, streamline operations.' },
              { title: 'White-Label Solutions', price: 'From £99/month', desc: 'Host our calculators on your own website with your branding. Perfect for agencies, trade organizations, and consultancies.' },
              { title: 'API Integrations', price: 'Custom pricing', desc: 'Integrate our calculators into your existing platforms. Seamless API access for your business applications.' }
            ].map((item, i) => (
              <div key={i} className="bg-white border-2 border-purple-200 rounded-lg p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 text-xl">⚙️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm mb-4">{item.desc}</p>
                <p className="text-purple-600 font-semibold text-sm">{item.price}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Scale Your Business?</h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Whether you need a custom calculator, automation tool, or white-label solution - let's discuss how we can help your business grow.
            </p>
            <a href="tel:07985559775" className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              Schedule a Call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}











    
