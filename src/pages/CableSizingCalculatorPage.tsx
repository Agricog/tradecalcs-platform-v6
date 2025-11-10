import { Zap } from 'lucide-react'
import CableSizingCalculator from '../components/CableSizingCalculator'

export default function CableSizingCalculatorPage() {
  return (
    <>
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Zap className="w-12 h-12" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Cable Sizing Calculator UK</h1>
          <p className="text-lg opacity-95">BS 7671 compliant electrical cable sizing with voltage drop analysis and derating factors</p>
        </div>
      </div>

      {/* Back to Calculators Link */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <a href="/" className="text-blue-600 hover:text-blue-700 text-sm font-medium">← Back to All Calculators</a>
      </div>

      {/* Calculator Section */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <CableSizingCalculator />
      </div>

      {/* Content Sections */}
      <div className="max-w-3xl mx-auto px-4 py-12 bg-white">
        
        {/* How to Use */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Use the Cable Sizing Calculator</h2>
          <p className="text-gray-700 mb-6">
            Choosing the correct cable is critical for electrical safety and compliance with BS 7671:2018+A2:2022 (the 18th Edition wiring regulations). Our free cable sizing calculator helps UK electricians determine the appropriate cable size for any electrical installation in seconds.
          </p>
        </div>

        {/* What This Calculator Does */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">What This Calculator Does</h3>
          <p className="text-gray-700 mb-6">
            This professional-grade tool calculates the minimum cable size required for electrical circuits in UK installations. It accounts for load current, voltage drop, installation methods, derating factors, and protective device ratings to ensure compliance with BS 7671.
          </p>
        </div>

        {/* Why Correct Cable Sizing Matters */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Correct Cable Sizing Matters</h3>
          <p className="text-gray-700 mb-6">
            Undersized cables can lead to dangerous overheating, fire risks, excessive voltage drop, and non-compliance with BS 7671. Oversized cables waste money and installation space. Getting it right protects lives, property, and your professional reputation.
          </p>
        </div>

        {/* Important Compliance Note */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">ℹ</div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Important Compliance Note</h4>
              <p className="text-gray-700 text-sm">
                All calculations must comply with BS 7671:2018+A2:2022. This calculator is designed for UK installations using standard PVC/XLPE insulated copper conductors. Always verify your calculations with current regulations and manufacturer data sheets.
              </p>
            </div>
          </div>
        </div>

        {/* Common Cable Sizing Mistakes */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Common Cable Sizing Mistakes</h3>
          <p className="text-gray-700 mb-6">
            Professional electricians know that mistakes in cable sizing are costly. Common errors include ignoring derating factors, using incorrect installation methods, forgetting voltage drop limits, and not accounting for future load growth. This calculator helps you avoid all these pitfalls.
          </p>
        </div>

        {/* Save Time Card */}
        <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-12">
          <div className="flex gap-3">
            <div className="text-2xl">✓</div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Save Time On Every Job</h4>
              <p className="text-gray-700 text-sm">
                Professional electricians save 10-15 minutes per circuit calculation using our tool. That's hours saved on every installation, allowing you to complete more jobs without compromising on safety or compliance.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h3>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Q: Is this calculator compliant with the 18th Edition?</h4>
              <p className="text-gray-700">
                Yes, all calculations follow BS 7671:2018+A2:2022 requirements including current-carrying capacity tables and voltage drop limits.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-2">Q: Can I use this for three-phase installations?</h4>
              <p className="text-gray-700">
                Yes, the calculator supports both single-phase (230V) and three-phase (400V) installations with appropriate voltage drop calculations.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-2">Q: What if I have multiple derating factors?</h4>
              <p className="text-gray-700">
                Apply all relevant derating factors cumulatively. The calculator guides you through the process step by step.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-2">Q: Is this free to use?</h4>
              <p className="text-gray-700">
                Yes, completely free with no hidden costs, registration, or limits. Built by electricians for electricians.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Need More Electrical Calculators?</h3>
          <p className="mb-6 opacity-95">Check out our voltage drop calculator and other professional resources for UK electricians.</p>
          <a href="/#calculators" className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            View All Calculators
          </a>
        </div>

      </div>
    </>
  )
}
