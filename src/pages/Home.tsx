import { Link } from 'react-router-dom'
import { Calculator, Zap, Wrench, Home as HomeIcon, Hammer, Layers, Brush, Lightbulb, ArrowRight } from 'lucide-react'


export default function Home() {
  const tools = [
    {
      id: 'cable',
      name: 'Cable Size Calculator',
      description: 'BS 7671 compliant electrical cable sizing',
      icon: Zap,
      color: 'from-purple-600 to-blue-600',
      link: '/cable-calculator'
    },
    {
      id: 'voltage',
      name: 'Voltage Drop Calculator',
      description: 'Calculate voltage drop for any circuit',
      icon: Lightbulb,
      color: 'from-blue-600 to-cyan-600',
      link: '/voltage-drop'
    },
    {
      id: 'bsp',
      name: 'BSP Thread Finder',
      description: 'Identify British Standard Pipe threads',
      icon: Wrench,
      color: 'from-red-600 to-pink-600',
      link: '/bsp-thread'
    },
    {
      id: 'roof',
      name: 'Roofing Calculator',
      description: 'Calculate roofing materials with pitch',
      icon: HomeIcon,
      color: 'from-green-600 to-emerald-600',
      link: '/roofing-insurance'
    },
    {
      id: 'concrete',
      name: 'Concrete to Bags Calculator',
      description: 'Convert concrete volume to bags',
      icon: Hammer,
      color: 'from-slate-600 to-gray-600',
      link: '/concrete-calculator'
    },
    {
      id: 'plaster',
      name: 'Plasterer Calculators',
      description: 'Plaster, render, and drywall calculations',
      icon: Brush,
      color: 'from-amber-600 to-yellow-600',
      link: '/plasterer-calculators'
    },
    {
      id: 'joinery',
      name: 'Joinery Calculator',
      description: 'Door, frame, and timber material estimates',
      icon: Layers,
      color: 'from-orange-600 to-red-600',
      link: '/joinery-calculator'
    },
    {
      id: 'brick',
      name: 'Brick & Block Calculator',
      description: 'Calculate bricks, blocks, mortar, and cement',
      icon: Calculator,
      color: 'from-red-600 to-orange-600',
      link: '/brick-block-calculator'
    },
    {
      id: 'tiler',
      name: 'Tiling Calculator',
      description: 'Calculate tiles, adhesive & grout for walls and floors',
      icon: Layers,
      color: 'from-amber-600 to-orange-600',
      link: '/tiler-calculator'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Free Professional
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Calculators</span>
            for UK Tradespeople
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            9 industry-standard tools to calculate materials, quantities, and estimates instantly. No signup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#calculators"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-bold transition inline-flex items-center gap-2"
            >
              Explore All Tools <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-3 rounded-lg font-bold transition"
            >
              Get Custom Tools
            </a>
          </div>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6 text-white">
            <div className="text-3xl mb-3">✓</div>
            <h3 className="font-bold mb-2">BS Compliant</h3>
            <p className="text-sm text-gray-300">All calculations follow UK Building Standards and industry regulations</p>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6 text-white">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-300">Get accurate material estimates in seconds, not minutes</p>
          </div>
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-6 text-white">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-bold mb-2">100% Free</h3>
            <p className="text-sm text-gray-300">No hidden costs, no signup required, no ads</p>
          </div>
        </div>
      </div>

      {/* Calculators Grid */}
      <section id="calculators" className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Free Calculators for Every Trade</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon
            return (
              <Link
                key={tool.id}
                to={tool.link}
                className="group bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className={`bg-gradient-to-br ${tool.color} h-24 flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <IconComponent className="w-12 h-12 text-white opacity-80" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                  <span className="text-purple-600 font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                    Open Tool <ArrowRight className="ml-2 w-4 h-4" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Trusted by UK Tradespeople</h3>
          <p className="text-gray-200 mb-6">
            TradeCalcs calculators are used daily by electricians, plumbers, bricklayers, joiners, plasterers, roofers, and tilers across the UK. Built by tradespeople, for tradespeople.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">9</div>
              <p className="text-sm text-gray-300">Free Tools</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">0%</div>
              <p className="text-sm text-gray-300">Cost Forever</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">100%</div>
              <p className="text-sm text-gray-300">BS Compliant</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">∞</div>
              <p className="text-sm text-gray-300">No Limits</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg p-8 md:p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Need Custom Tools or Bespoke Solutions?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            TradeCalcs also builds custom web applications and automation tools for specific business needs. Get in touch for a consultation.
          </p>
          <a
            href="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-bold transition"
          >
            Contact Us for Custom Development
          </a>
        </div>
      </section>

      {/* Footer Info */}
      <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400 text-sm">
          All calculators are free, fast, and accurate. Always verify results with site measurements and qualified professionals before ordering materials.
        </p>
      </section>
    </div>
  )
}




























