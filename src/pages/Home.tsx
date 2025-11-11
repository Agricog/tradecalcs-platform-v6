import { Link } from 'react-router-dom'
import { Zap, Wrench, Home, Calculator, Hammer, PaintBucket } from 'lucide-react'

export default function Homepage() {
  // Define all calculators - easy to add more
  const calculators = [
    {
      id: 1,
      name: 'Cable Sizing Calculator',
      description: 'BS 7671 compliant cable sizing with voltage drop analysis',
      icon: <Zap className="w-12 h-12" />,
      path: '/cable-sizing-calculator',
      status: 'live',
      gradient: 'from-blue-500 to-indigo-600',
      features: ['Cable sizing', 'Voltage drop', 'Load calculations']
    },
    {
      id: 2,
      name: 'Voltage Drop Calculator',
      description: 'Verify BS 7671 Regulation 525 compliance instantly',
      icon: <Zap className="w-12 h-12" />,
      path: '/voltage-drop-calculator',
      status: 'live',
      gradient: 'from-cyan-500 to-blue-600',
      features: ['Voltage drop', 'Pass/fail indicators', 'BS 7671 compliant']
    },
    {
      id: 3,
      name: 'BSP Thread Identifier',
      description: 'Identify British Standard Pipe threads instantly',
      icon: <Wrench className="w-12 h-12" />,
      path: '/bsp-thread-identifier',
      status: 'live',
      gradient: 'from-orange-500 to-red-600',
      features: ['BSP threads', 'Diameter lookup', 'Quick identification']
    },
    {
      id: 4,
      name: 'Roofing Insurance Calculator',
      description: 'Calculate fair market value for insurance roof replacement claims',
      icon: <Home className="w-12 h-12" />,
      path: '/roofing-calculator',
      status: 'live',
      gradient: 'from-green-600 to-green-700',
      features: ['Roof pricing', 'Insurance claims', 'Material costs']
    },
    {
      id: 5,
      name: 'Plasterer Calculators',
      description: 'Professional plaster coverage, material & labour cost calculators',
      icon: <PaintBucket className="w-12 h-12" />,
      path: '/plasterer-calculators',
      status: 'live',
      gradient: 'from-amber-500 to-orange-500',
      features: ['Plaster coverage', 'Material costs', 'Labour rates']
    },
    {
      id: 6,
      name: 'Joinery Material & Labour Calculator',
      description: 'Calculate wood costs, waste factors & labour hours for joinery projects',
      icon: <Hammer className="w-12 h-12" />,
      path: '/joinery-calculator',
      status: 'live',
      gradient: 'from-amber-600 to-orange-600',
      features: ['Wood pricing', 'Labour estimates', 'Waste factors']
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">TradeCalcs</h1>
          <p className="text-2xl mb-6">Professional Calculation Tools for UK Tradespeople</p>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Free, professional-grade calculators built for electricians, plumbers, roofers, plasterers, joiners & construction trades. No signup required.
          </p>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-indigo-600 mb-2">2M+</div>
            <p className="text-gray-600">Calculations Monthly</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">6</div>
            <p className="text-gray-600">Professional Tools</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-pink-600 mb-2">100%</div>
            <p className="text-gray-600">Free Forever</p>
          </div>
        </div>

        {/* CALCULATORS GRID */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Calculator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculators.map((calc) => (
              <Link
                key={calc.id}
                to={calc.path}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${calc.gradient} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    {calc.icon}
                    {calc.status === 'live' && (
                      <span className="bg-white text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                        LIVE
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{calc.name}</h3>
                  <p className="text-sm opacity-90">{calc.description}</p>
                </div>

                <div className="p-6">
                  <div className="space-y-2 mb-4">
                    {calc.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                    <span>Open Calculator</span>
                    <Calculator className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* WHY TRADECALCS SECTION */}
        <div className="mt-20 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why TradeCalcs?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm">
                Get instant, accurate calculations in seconds. No complex spreadsheets or manual formulas required.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Built by Tradespeople</h3>
              <p className="text-gray-600 text-sm">
                Designed by professionals who understand the real challenges you face on site every day.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">100% Free</h3>
              <p className="text-gray-600 text-sm">
                No hidden fees, no subscriptions, no signup required. Professional tools, completely free forever.
              </p>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Calculating?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of UK tradespeople using TradeCalcs to save time, reduce errors, and work smarter.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/cable-sizing-calculator"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Try Cable Sizing
            </Link>
            <Link
              to="/joinery-calculator"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition"
            >
              Try Joinery Calculator
            </Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4">&copy; 2025 TradeCalcs. Professional tools for UK tradespeople.</p>
          <p className="text-sm text-gray-400">
            Free calculators for electricians, plumbers, roofers, plasterers, joiners & construction trades.
          </p>
        </div>
      </footer>
    </div>
  )
}























