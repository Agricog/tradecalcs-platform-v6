import { Calculator, Zap, Shield, Smartphone, ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function Home() {
  const formUrl = 'https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE'
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Professional Trade Calculators<span className="block text-purple-200 mt-2">Built for UK Tradespeople</span></h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto">Fast, accurate calculations compliant with British Standards. Save time, reduce errors, and work with confidence.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={formUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-50 transition-all duration-300 hover:scale-105 shadow-xl inline-flex items-center justify-center group">Get Started Free<ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" /></a>
              <Link to="/tools" className="bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-800 transition-all duration-300 border-2 border-purple-400 inline-flex items-center justify-center">View All Tools</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Trade Professionals Choose TradeCalcs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Built by tradespeople who understand your daily challenges</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="bg-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6"><Zap className="w-8 h-8 text-white" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-700">Get instant results with our optimized calculators. No waiting, no complex forms.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6"><Shield className="w-8 h-8 text-white" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">BS 7671 Compliant</h3>
              <p className="text-gray-700">All electrical calculations follow current British Standards for peace of mind.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="bg-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6"><Smartphone className="w-8 h-8 text-white" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile Ready</h3>
              <p className="text-gray-700">Use on any device - phone, tablet, or desktop. Calculate on-site or in the office.</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6"><Calculator className="w-8 h-8 text-white" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trade Specific</h3>
              <p className="text-gray-700">Purpose-built tools for electricians, plumbers, and other UK trades.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Free Professional Calculators</h2>
            <p className="text-xl text-gray-600">Choose your calculator and start working smarter</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/tools/cable-calculator" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Calculator className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Cable Size Calculator</h3>
              <p className="text-gray-600 mb-4">BS 7671 compliant electrical cable sizing with all derating factors</p>
              <span className="text-purple-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform">Try it now <ArrowRight className="ml-2 w-4 h-4" /></span>
            </Link>
            <Link to="/tools/voltage-drop" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Zap className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Voltage Drop Calculator</h3>
              <p className="text-gray-600 mb-4">Calculate voltage drop for any circuit length and load</p>
              <span className="text-purple-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform">Try it now <ArrowRight className="ml-2 w-4 h-4" /></span>
            </Link>
            <Link to="/tools/bsp-finder" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Calculator className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">BSP Thread Finder</h3>
              <p className="text-gray-600 mb-4">Identify British Standard Pipe threads by diameter or TPI</p>
              <span className="text-purple-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform">Try it now <ArrowRight className="ml-2 w-4 h-4" /></span>
            </Link>
            <Link to="/tools/roofing" className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Zap className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Roofing Calculator</h3>
              <p className="text-gray-600 mb-4">Calculate roofing materials with pitch angle adjustments</p>
              <span className="text-purple-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform">Try it now <ArrowRight className="ml-2 w-4 h-4" /></span>
            </Link>
          </div>
          <div className="text-center mt-12">
            <Link to="/tools" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-bold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">View All Tools<ArrowRight className="ml-2 w-5 h-5" /></Link>
          </div>
        </div>
      </section>
    </div>
  )
}
