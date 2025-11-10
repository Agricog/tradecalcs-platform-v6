import { Zap, Shield, Smartphone, DollarSign, Lightbulb, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react'

export default function Homepage() {
  return (
    <div className="bg-white min-h-screen">
      {/* ANIMATED STRAP LINE - CLICKABLE */}
      <a 
        href="https://app.smartsuite.com/YOUR-FORM-URL" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white py-3 px-4 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
          <Sparkles className="w-4 h-4 flex-shrink-0 animate-spin" />
          <p className="font-semibold text-sm md:text-base">
            ✨ Get VIP Access to New Tools + We Build Bespoke Web Apps for Your Business Problems ✨
          </p>
          <Sparkles className="w-4 h-4 flex-shrink-0 animate-spin" />
        </div>
      </a>

      {/* NAVIGATION */}
      <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            TC
          </div>
          <span className="font-bold text-lg">TradeCalcs</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="/tools" className="text-gray-700 hover:text-gray-900 font-medium">Calculators</a>
          <a href="https://app.smartsuite.com/YOUR-FORM-URL" target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold">
            Contact Us
          </a>
        </div>
      </nav>

      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Professional Trade Calculators</h1>
          <p className="text-2xl mb-8">Built for UK Tradespeople</p>
          <p className="text-lg mb-8 opacity-95">
            Fast, accurate calculations compliant with British Standards. Save time,<br />
            reduce errors, and work with confidence.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/tools" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2">
              View Free Tools <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#custom" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-purple-600">
              Request Custom Tool
            </a>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE TRADECALCS */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Why Trade Professionals Choose TradeCalcs</h2>
          <p className="text-center text-gray-600 mb-12">Built by tradespeople who understand your daily challenges</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Lightning Fast</h3>
              <p className="text-sm text-gray-700">Get instant results with our optimized calculations. No waiting, no complex forms.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">BS 7671 Compliant</h3>
              <p className="text-sm text-gray-700">All electrical calculations follow current British Standards for peace of mind.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Mobile Ready</h3>
              <p className="text-sm text-gray-700">Use on any device - phone, tablet, or desktop. Calculate on-site or in the office.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Always Free</h3>
              <p className="text-sm text-gray-700">No hidden costs, no premium tiers. Professional tools available to all tradespeople.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FREE CALCULATORS */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">Free Professional Calculators</h2>
          <p className="text-center text-gray-600 mb-12">Choose your calculator and start working smarter</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cable Sizing */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cable Sizing Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">BS 7671 compliant electrical cable sizing with all derating factors</p>
              <a href="/tools/cable-calculator" className="text-purple-600 font-semibold flex items-center gap-2 hover:gap-3 transition">
                Use Calculator <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Voltage Drop */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center text-white mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Voltage Drop Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">Calculate voltage drop for any circuit length and load</p>
              <a href="/tools/voltage-drop" className="text-purple-600 font-semibold flex items-center gap-2 hover:gap-3 transition">
                Use Calculator <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* BSP Thread */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white mb-4">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">BSP Thread Identifier</h3>
              <p className="text-gray-600 text-sm mb-4">Identify British Standard Pipe threads by diameter or TPI</p>
              <a href="/tools/bsp-thread" className="text-purple-600 font-semibold flex items-center gap-2 hover:gap-3 transition">
                Use Calculator <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Roofing */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white mb-4">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Roofing Insurance Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">Calculate fair market value and fight for proper compensation</p>
              <a href="/tools/roofing" className="text-purple-600 font-semibold flex items-center gap-2 hover:gap-3 transition">
                Use Calculator <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-8">More calculators coming soon for carpenters, plasterers, bricklayers, and more trades</p>
        </div>
      </section>

      {/* BUILT BY TRADESPEOPLE */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Built by Tradespeople, for Tradespeople</h2>
              <p className="text-gray-700 mb-6">
                We understand the challenges you face every day because we've been there. Our tools are designed to make your job easier, faster, and more accurate.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">Save Time On Every Job</p>
                    <p className="text-sm text-gray-600">Instant calculations mean less time with paperwork and more time doing what you do best</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">Reduce Costly Errors</p>
                    <p className="text-sm text-gray-600">Accurate, tested calculations help you avoid expensive mistakes and rework</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">Stay Compliant</p>
                    <p className="text-sm text-gray-600">All tools follow current British Standards so you work with confidence</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900">Work From Anywhere</p>
                    <p className="text-sm text-gray-600">Access your tools on any device - perfect for on-site calculations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA BOX */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-3">Ready to Work Smarter?</h3>
              <p className="mb-6 opacity-95">Join professional tradespeople who are already saving time and reducing errors with TradeCalcs.</p>
              <a href="/tools" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 inline-flex items-center gap-2">
                Start Using Tools <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-sm opacity-75 mt-4">No signup required • Instant access • Always free</p>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM & WHITE-LABEL SECTION */}
      <section id="custom" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Need Something Custom?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We build bespoke web applications and automation tools for UK trade businesses. Got a specific problem? Let's create a solution together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Bespoke Apps */}
            <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 text-xl">
                ⚙️
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bespoke Custom Apps</h3>
              <p className="text-gray-700 text-sm mb-4">
                Custom web applications built specifically for your trade business. Automate workflows, capture data, streamline operations.
              </p>
              <p className="text-purple-600 font-semibold text-sm">£2,000 - £15,000+</p>
            </div>

            {/* White-Label */}
            <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 text-xl">
                🏢
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">White-Label Solutions</h3>
              <p className="text-gray-700 text-sm mb-4">
                Host our calculators on your own website with your branding. Perfect for agencies, trade organizations, and consultancies.
              </p>
              <p className="text-purple-600 font-semibold text-sm">From £99/month</p>
            </div>

            {/* Integration */}
            <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 text-xl">
                🔗
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">API & Integrations</h3>
              <p className="text-gray-700 text-sm mb-4">
                Integrate our calculators into your existing platforms. Seamless API access for your business applications.
              </p>
              <p className="text-purple-600 font-semibold text-sm">Custom pricing</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Custom Development Services</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Whether you need a specialized calculator for your trade, automation to streamline operations, or want to white-label our tools - we've got you covered. Our team specializes in building solutions that save tradespeople time and money.
            </p>
            <a href="https://app.smartsuite.com/YOUR-FORM-URL" target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold inline-flex items-center gap-2">
              Tell Us What You Need <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                TC
              </div>
              <span className="font-bold text-white">TradeCalcs</span>
            </div>
            <p className="text-sm">Professional calculators and tools for UK tradespeople. Built by traders, for traders.</p>
            <p className="text-xs mt-4">© 2025 TradeCalcs. All rights reserved.</p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/tools" className="hover:text-white">Calculators</a></li>
              <li><a href="https://app.smartsuite.com/YOUR-FORM-URL" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#custom" className="hover:text-white">Custom Development</a></li>
              <li><a href="#custom" className="hover:text-white">White-Label</a></li>
              <li><a href="#custom" className="hover:text-white">API Access</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-xs">
          <p>TradeCalcs is committed to providing accurate, BS-compliant calculations for UK tradespeople. Always verify critical calculations with qualified professionals.</p>
        </div>
      </footer>
    </div>
  )
}


