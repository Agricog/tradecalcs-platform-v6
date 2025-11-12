import { Link } from 'react-router-dom';
import { Zap, Shield, Smartphone, DollarSign, Calculator, Flame, Ruler, Hammer, PaintBucket, Droplet, Trees, Phone, MessageSquare, Mail, CheckCircle2, ArrowRight } from 'lucide-react';

const Homepage = () => {
  // Define all calculators - easy to add more
  const calculators = [
    {
      id: 1,
      name: 'Cable Sizing Calculator',
      description: 'BS 7671 compliant cable sizing with voltage drop analysis',
      icon: Zap,
      path: '/cable-sizing',
      bgGradient: 'from-yellow-400 to-orange-500',
    },
    {
      id: 2,
      name: 'Voltage Drop Calculator',
      description: 'Calculate voltage drop per BS 7671 Regulation 525',
      icon: Zap,
      path: '/voltage-drop',
      bgGradient: 'from-blue-400 to-cyan-500',
    },
    {
      id: 3,
      name: 'BSP Thread Identifier',
      description: 'British Standard Pipe thread size identification tool',
      icon: Calculator,
      path: '/bsp-thread',
      bgGradient: 'from-gray-400 to-gray-600',
    },
    {
      id: 4,
      name: 'Roofing Calculator',
      description: 'Insurance claim calculations for roofers',
      icon: Shield,
      path: '/roofing',
      bgGradient: 'from-red-400 to-pink-500',
    },
    {
      id: 5,
      name: 'Concrete Calculator',
      description: 'Calculate bags of cement and ballast needed',
      icon: Hammer,
      path: '/concrete',
      bgGradient: 'from-stone-400 to-stone-600',
    },
    {
      id: 6,
      name: 'Plasterer Calculator',
      description: 'Coverage, drying time, and cost estimates',
      icon: Ruler,
      path: '/plasterer',
      bgGradient: 'from-teal-400 to-teal-600',
    },
    {
      id: 7,
      name: 'Joinery Calculator',
      description: 'Wood costs, waste factors, and labour hours',
      icon: Trees,
      path: '/joinery',
      bgGradient: 'from-amber-500 to-orange-600',
    },
    {
      id: 8,
      name: 'Brick & Block Calculator',
      description: 'Calculate bricks, blocks, mortar, and cement',
      icon: Hammer,
      path: '/brick-block',
      bgGradient: 'from-orange-400 to-red-500',
    },
    {
      id: 9,
      name: 'Tiling Calculator',
      description: 'Calculate tiles, adhesive, and grout needed',
      icon: Calculator,
      path: '/tiling',
      bgGradient: 'from-indigo-400 to-purple-500',
    },
    {
      id: 10,
      name: 'Paint Calculator',
      description: 'Calculate paint and primer quantities',
      icon: PaintBucket,
      path: '/paint',
      bgGradient: 'from-pink-400 to-rose-500',
    },
  ];

  return (
    <>
      {/* HERO */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Professional Trade Calculators
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Fast, accurate calculations for electricians, plumbers, roofers, and more
          </p>
          <p className="text-lg opacity-75">
            Professional-grade tools. Always free. No signup required.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose TradeCalcs?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500">
              <Zap className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="font-bold text-lg mb-2 text-gray-800">Lightning Fast</h3>
              <p className="text-gray-600 text-sm">
                Instant results. No waiting. Get back to the job.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
              <Shield className="w-8 h-8 text-blue-600 mb-4" />
              <h3 className="font-bold text-lg mb-2 text-gray-800">BS Compliant</h3>
              <p className="text-gray-600 text-sm">
                Built to UK standards. Regulatory approved calculations.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-green-500">
              <Smartphone className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="font-bold text-lg mb-2 text-gray-800">Mobile Ready</h3>
              <p className="text-gray-600 text-sm">
                Works perfectly on any device. On-site or in the office.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
              <DollarSign className="w-8 h-8 text-yellow-600 mb-4" />
              <h3 className="font-bold text-lg mb-2 text-gray-800">Always Free</h3>
              <p className="text-gray-600 text-sm">
                No hidden costs. No premium tiers. Professional tools for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STOP LOSING LEADS SECTION */}
      <section className="py-16 px-4 bg-gradient-to-br from-red-50 to-orange-50 border-y-2 border-red-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              💰 THE SILENT PROFIT KILLER
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Every Missed Call is £500-£2,000 Walking Away
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              You're under a boiler. Phone rings. By the time you see it, they've called your competitor.<br/>
              That's happening 15-30 times per month. Do the math.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 border-2 border-red-200 text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">15-30</div>
              <p className="text-sm text-gray-700">Missed calls per month<br/>(average UK trade business)</p>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-orange-200 text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">67%</div>
              <p className="text-sm text-gray-700">Of customers move on<br/>within 24 hours</p>
            </div>
            <div className="bg-white rounded-lg p-6 border-2 border-red-200 text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">£20k-£100k+</div>
              <p className="text-sm text-gray-700">Lost revenue annually<br/>from missed leads</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-red-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  LeadFortress Captures EVERY Lead, Automatically
                </h3>
                <p className="text-gray-700 mb-6">
                  Phone, SMS, WhatsApp, email, web forms, missed calls - all captured, logged, and tracked in one place. Even when you're on a job.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900">All calls forwarded, recorded & logged</p>
                      <p className="text-sm text-gray-600">Never miss another emergency call</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900">Auto-SMS to customers + instant alerts</p>
                      <p className="text-sm text-gray-600">Customers know you got their message</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900">WhatsApp, texts, emails all tracked</p>
                      <p className="text-sm text-gray-600">Everything in one professional CRM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-gray-900">Live in 48 hours, guaranteed</p>
                      <p className="text-sm text-gray-600">We do the setup, you do nothing</p>
                    </div>
                  </div>
                </div>

                <Link 
                  to="/leadfortress" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition w-full md:w-auto justify-center"
                >
                  See How LeadFortress Works <ArrowRight className="w-5 h-5" />
                </Link>
                <p className="text-sm text-gray-600 mt-3">
                  £99/month • No contract • Cancel anytime • Your first month FREE if not live in 48hrs
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-xl p-8 border-2 border-red-300">
                <div className="bg-white rounded-lg p-6 mb-4">
                  <p className="text-sm font-bold text-gray-700 mb-2">Quick ROI Calculator:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average job value:</span>
                      <span className="font-bold">£800</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Missed calls/month:</span>
                      <span className="font-bold">20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conversion rate:</span>
                      <span className="font-bold">30%</span>
                    </div>
                    <div className="border-t-2 border-gray-300 pt-2 mt-2"></div>
                    <div className="flex justify-between text-lg">
                      <span className="font-bold text-gray-900">Lost monthly:</span>
                      <span className="font-bold text-red-600">£4,800</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">LeadFortress cost:</span>
                      <span className="font-bold text-green-600">£99</span>
                    </div>
                  </div>
                </div>
                <div className="bg-red-600 text-white rounded-lg p-4 text-center">
                  <p className="text-sm mb-1">Recover just 1 job per month and</p>
                  <p className="text-2xl font-bold">You're 8x ROI positive</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATORS GRID */}
      <section id="calculators" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Free Professional Calculators
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Select the tool you need. More calculators being added regularly.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <Link
                  key={calc.id}
                  to={calc.path}
                  className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-purple-300"
                >
                  <div className={`bg-gradient-to-r ${calc.bgGradient} p-6 flex items-center justify-center`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-purple-600 transition">
                      {calc.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {calc.description}
                    </p>
                    <span className="text-purple-600 font-semibold text-sm group-hover:underline">
                      Use Calculator →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BUILT BY TRADESPEOPLE */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Built by Tradespeople, for Tradespeople</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">No hidden costs, no premium tiers, no paywalls.</h3>
              <p className="text-sm opacity-90">Just free professional tools.</p>
            </div>
            <div>
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Start calculating instantly.</h3>
              <p className="text-sm opacity































