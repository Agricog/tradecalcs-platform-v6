import { ArrowLeft } from 'lucide-react'
import RoofingCalculator from '../components/RoofingCalculator'

export default function RoofingCalculatorPage() {
  return (
    <>
      {/* BACK TO HOME BUTTON */}
      <div className="bg-gray-50 py-4 px-4">
        <div className="max-w-6xl mx-auto">
          <a 
            href="/"
            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </a>
        </div>
      </div>

      {/* ROOFING CALCULATOR */}
      <RoofingCalculator />
    </>
  )
}

