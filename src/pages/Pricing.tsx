import { Check } from 'lucide-react'
export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pricing</h1>
          <p className="text-xl text-gray-600">All our tools are completely free to use</p>
        </div>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">100% Free Forever</h2>
          <p className="text-xl text-gray-600 mb-8">No credit card required. No hidden fees. No premium versions.</p>
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8 mb-8">
            <p className="text-lg text-gray-700">All TradeCalcs tools are free for all UK tradespeople. Professional tools shouldn't be expensive.</p>
          </div>
          <div className="space-y-4 text-left max-w-md mx-auto">
            {['Instant access to all calculators','No login required','Use on any device','BS 7671 compliant calculations','Mobile responsive','Fast and reliable'].map((f,i)=>(<div key={i} className="flex items-center space-x-3"><Check className="w-5 h-5 text-green-600 flex-shrink-0" /><span className="text-gray-700">{f}</span></div>))}
          </div>
          <a href="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE" target="_blank" rel="noopener noreferrer" className="inline-block mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition">Get Started Free</a>
        </div>
      </div>
    </div>
  )
}
