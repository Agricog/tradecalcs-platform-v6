import { Link } from 'react-router-dom'
import { Calculator, Zap, Wrench, Home, ArrowRight } from 'lucide-react'
export default function Tools() {
  const tools = [
    {id:'cable',name:'Cable Size Calculator',description:'BS 7671 compliant electrical cable sizing',icon:Calculator,color:'from-purple-600 to-blue-600',link:'/tools/cable-calculator'},
    {id:'voltage',name:'Voltage Drop Calculator',description:'Calculate voltage drop for any circuit',icon:Zap,color:'from-blue-600 to-purple-600',link:'/tools/voltage-drop'},
    {id:'bsp',name:'BSP Thread Finder',description:'Identify British Standard Pipe threads',icon:Wrench,color:'from-red-600 to-orange-600',link:'/tools/bsp-finder'},
    {id:'roof',name:'Roofing Calculator',description:'Calculate roofing materials with pitch',icon:Home,color:'from-green-600 to-emerald-600',link:'/tools/roofing'}
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">All Calculators</h1>
          <p className="text-xl text-gray-600">Free professional tools for UK tradespeople</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => {
            const IconComponent = tool.icon
            return (
              <Link key={tool.id} to={tool.link} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className={`bg-gradient-to-br ${tool.color} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}><IconComponent className="w-8 h-8 text-white" /></div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{tool.name}</h3>
                <p className="text-gray-600 mb-4">{tool.description}</p>
                <span className="text-purple-600 font-semibold flex items-center group-hover:translate-x-2 transition-transform">Open Tool <ArrowRight className="ml-2 w-4 h-4" /></span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
