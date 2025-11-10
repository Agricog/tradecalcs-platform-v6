import { Link } from 'react-router-dom'
import { Calculator } from 'lucide-react'
export default function Navigation() {
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-2 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">TradeCalcs</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/tools" className="text-gray-700 hover:text-purple-600 font-medium">Calculators</Link>
            <Link to="/pricing" className="text-gray-700 hover:text-purple-600 font-medium">Pricing</Link>
            <a href="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE" target="_blank" rel="noopener noreferrer" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 transition">Contact Us</a>
          </div>
        </div>
      </div>
    </nav>
  )
}
