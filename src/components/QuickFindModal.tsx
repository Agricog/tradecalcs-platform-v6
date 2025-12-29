import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, X, ChevronDown, ChevronRight, Zap, Flame, Droplets, 
  Package, Palette, Hammer, Home, Calculator, TruckIcon, 
  Lightbulb, PoundSterling, Circle, Activity, Droplet
} from 'lucide-react'

interface Calculator {
  href: string
  title: string
  icon: any
  color: string
}

interface Category {
  name: string
  icon: any
  color: string
  calculators: Calculator[]
}

const allCalculators: Category[] = [
  {
    name: 'Popular',
    icon: Zap,
    color: '#8b5cf6',
    calculators: [
      { href: '/cable-sizing-calculator', title: 'Cable Sizing Calculator', icon: Zap, color: '#3b82f6' },
      { href: '/voltage-drop-calculator', title: 'Voltage Drop Calculator', icon: Zap, color: '#06b6d4' },
      { href: '/electrical-load-calculator', title: 'Electrical Load Calculator', icon: Activity, color: '#4f46e5' },
      { href: '/radiator-btu-calculator', title: 'Radiator BTU Calculator', icon: Flame, color: '#ea580c' },
      { href: '/concrete-calculator', title: 'Concrete Calculator', icon: Package, color: '#22c55e' },
      { href: '/brick-block-calculator', title: 'Brick & Block Calculator', icon: Home, color: '#ef4444' },
      { href: '/boiler-sizing-calculator', title: 'Boiler Sizing Calculator', icon: Flame, color: '#ef4444' },
    ]
  },
  {
    name: 'Electrical - Core',
    icon: Zap,
    color: '#3b82f6',
    calculators: [
      { href: '/electrical-load-calculator', title: 'Electrical Load Calculator', icon: Activity, color: '#4f46e5' },
      { href: '/cable-sizing-calculator', title: 'Cable Sizing Calculator', icon: Zap, color: '#3b82f6' },
      { href: '/voltage-drop-calculator', title: 'Voltage Drop Calculator', icon: Zap, color: '#06b6d4' },
      { href: '/conduit-fill-calculator', title: 'Conduit Fill Calculator', icon: Circle, color: '#475569' },
      { href: '/electrical-calculators', title: '→ All Electrical Calculators Hub', icon: Zap, color: '#8b5cf6' },
      { href: '/cable-sizing-calculators', title: '→ All Cable Sizing Calculators Hub', icon: Zap, color: '#3b82f6' },
    ]
  },
  {
    name: 'Cable Sizing - Domestic',
    icon: Zap,
    color: '#3b82f6',
    calculators: [
      { href: '/calculators/cable-sizing/ev-charger-cable-sizing', title: 'EV Charger Cable Sizing', icon: Zap, color: '#22c55e' },
      { href: '/calculators/cable-sizing/electric-shower-cable-sizing', title: 'Electric Shower Cable Sizing', icon: Zap, color: '#06b6d4' },
      { href: '/calculators/cable-sizing/cooker-circuit-cable-sizing', title: 'Cooker Circuit Cable Sizing', icon: Zap, color: '#ea580c' },
      { href: '/calculators/cable-sizing/garden-office-cable-sizing', title: 'Garden Office Cable Sizing', icon: Zap, color: '#22c55e' },
      { href: '/calculators/cable-sizing/hot-tub-cable-sizing', title: 'Hot Tub Cable Sizing', icon: Zap, color: '#06b6d4' },
      { href: '/calculators/cable-sizing/immersion-heater-cable-sizing', title: 'Immersion Heater Cable Sizing', icon: Zap, color: '#ea580c' },
      { href: '/calculators/cable-sizing/underfloor-heating-cable-sizing', title: 'Underfloor Heating Cable Sizing', icon: Zap, color: '#ef4444' },
      { href: '/calculators/cable-sizing/garage-workshop-cable-sizing', title: 'Garage/Workshop Cable Sizing', icon: Zap, color: '#475569' },
      { href: '/calculators/cable-sizing/sauna-cable-sizing', title: 'Sauna Cable Sizing', icon: Zap, color: '#ea580c' },
      { href: '/calculators/cable-sizing/air-conditioning-cable-sizing', title: 'Air Conditioning Cable Sizing', icon: Zap, color: '#06b6d4' },
      { href: '/calculators/cable-sizing/swimming-pool-cable-sizing', title: 'Swimming Pool Cable Sizing', icon: Zap, color: '#3b82f6' },
      { href: '/calculators/cable-sizing/electric-gates-cable-sizing', title: 'Electric Gates Cable Sizing', icon: Zap, color: '#475569' },
      { href: '/calculators/cable-sizing/cctv-security-cable-sizing', title: 'CCTV/Security Cable Sizing', icon: Zap, color: '#475569' },
      { href: '/calculators/cable-sizing/annex-granny-flat-cable-sizing', title: 'Annex/Granny Flat Cable Sizing', icon: Zap, color: '#8b5cf6' },
      { href: '/calculators/cable-sizing/shed-summer-house-cable-sizing', title: 'Shed/Summer House Cable Sizing', icon: Zap, color: '#22c55e' },
      { href: '/calculators/cable-sizing/outdoor-lighting-cable-sizing', title: 'Outdoor Lighting Cable Sizing', icon: Zap, color: '#f59e0b' },
      { href: '/calculators/cable-sizing/electric-storage-heater-cable-sizing', title: 'Storage Heater Cable Sizing', icon: Zap, color: '#ef4444' },
      { href: '/calculators/cable-sizing/ring-main-socket-circuit-cable-sizing', title: 'Ring Main/Socket Cable Sizing', icon: Zap, color: '#3b82f6' },
    ]
  },
  {
    name: 'Cable Sizing - Renewables & Commercial',
    icon: Zap,
    color: '#22c55e',
    calculators: [
      { href: '/calculators/cable-sizing/solar-pv-battery-cable-sizing', title: 'Solar PV & Battery Cable Sizing', icon: Zap, color: '#f59e0b' },
      { href: '/calculators/cable-sizing/air-source-heat-pump-cable-sizing', title: 'Air Source Heat Pump Cable Sizing', icon: Zap, color: '#22c55e' },
      { href: '/calculators/cable-sizing/ground-source-heat-pump-cable-sizing', title: 'Ground Source Heat Pump Cable Sizing', icon: Zap, color: '#22c55e' },
      { href: '/calculators/cable-sizing/battery-storage-cable-sizing', title: 'Battery Storage Cable Sizing', icon: Zap, color: '#8b5cf6' },
      { href: '/calculators/cable-sizing/commercial-ev-charging-cable-sizing', title: 'Commercial EV Charging Cable Sizing', icon: Zap, color: '#22c55e' },
      { href: '/calculators/cable-sizing/commercial-kitchen-cable-sizing', title: 'Commercial Kitchen Cable Sizing', icon: Zap, color: '#ea580c' },
      { href: '/calculators/cable-sizing/server-room-cable-sizing', title: 'Server Room Cable Sizing', icon: Zap, color: '#3b82f6' },
      { href: '/calculators/cable-sizing/caravan-marina-hookup-cable-sizing', title: 'Caravan/Marina Hookup Cable Sizing', icon: Zap, color: '#06b6d4' },
      { href: '/calculators/cable-sizing/farm-agricultural-cable-sizing', title: 'Farm/Agricultural Cable Sizing', icon: Zap, color: '#22c55e' },
      { href: '/calculators/cable-sizing/shop-retail-unit-cable-sizing', title: 'Shop/Retail Unit Cable Sizing', icon: Zap, color: '#8b5cf6' },
    ]
  },
  {
    name: 'Voltage Drop - Domestic',
    icon: Zap,
    color: '#06b6d4',
    calculators: [
      { href: '/calculators/voltage-drop/submain-outbuilding', title: 'Submain to Outbuilding', icon: Zap, color: '#06b6d4' },
      { href: '/calculators/voltage-drop/ev-charger', title: 'EV Charger Voltage Drop', icon: Zap, color: '#22c55e' },
      { href: '/calculators/voltage-drop/garden-lighting', title: 'Garden Lighting Voltage Drop', icon: Zap, color: '#f59e0b' },
      { href: '/calculators/voltage-drop/shower-circuit', title: 'Shower Circuit Voltage Drop', icon: Zap, color: '#06b6d4' },
      { href: '/calculators/voltage-drop/cooker-circuit', title: 'Cooker Circuit Voltage Drop', icon: Zap, color: '#ea580c' },
      { href: '/calculators/voltage-drop/hot-tub', title: 'Hot Tub Voltage Drop', icon: Zap, color: '#06b6d4' },
      { href: '/calculators/voltage-drop/workshop', title: 'Workshop Voltage Drop', icon: Zap, color: '#475569' },
      { href: '/calculators/voltage-drop/annex', title: 'Annex Voltage Drop', icon: Zap, color: '#8b5cf6' },
      { href: '/calculators/voltage-drop/ring-circuit', title: 'Ring Circuit Voltage Drop', icon: Zap, color: '#3b82f6' },
      { href: '/calculators/voltage-drop/radial-circuit', title: 'Radial Circuit Voltage Drop', icon: Zap, color: '#3b82f6' },
      { href: '/calculators/voltage-drop/domestic-lighting', title: 'Domestic Lighting Voltage Drop', icon: Zap, color: '#f59e0b' },
      { href: '/calculators/voltage-drop/immersion-heater', title: 'Immersion Heater Voltage Drop', icon: Zap, color: '#ea580c' },
      { href: '/calculators/voltage-drop/underfloor-heating', title: 'Underfloor Heating Voltage Drop', icon: Zap, color: '#ef4444' },
    ]
  },
  {
    name: 'Voltage Drop - Commercial & Specialist',
    icon: Zap,
    color: '#4f46e5',
    calculators: [
      { href: '/calculators/voltage-drop/three-phase-motor', title: 'Three Phase Motor Voltage Drop', icon: Zap, color: '#4f46e5' },
      { href: '/calculators/voltage-drop/solar-pv', title: 'Solar PV Voltage Drop', icon: Zap, color: '#f59e0b' },
      { href: '/calculators/voltage-drop/heat-pump', title: 'Heat Pump Voltage Drop', icon: Zap, color: '#22c55e' },
      { href: '/calculators/voltage-drop/marina', title: 'Marina Voltage Drop', icon: Zap, color: '#06b6d4' },
      { href: '/calculators/voltage-drop/caravan-site', title: 'Caravan Site Voltage Drop', icon: Zap, color: '#22c55e' },
      { href: '/calculators/voltage-drop/commercial-lighting', title: 'Commercial Lighting Voltage Drop', icon: Zap, color: '#f59e0b' },
      { href: '/calculators/voltage-drop/warehouse', title: 'Warehouse Voltage Drop', icon: Zap, color: '#475569' },
      { href: '/calculators/voltage-drop/server-room', title: 'Server Room Voltage Drop', icon: Zap, color: '#3b82f6' },
      { href: '/calculators/voltage-drop/agricultural', title: 'Agricultural Voltage Drop', icon: Zap, color: '#22c55e' },
      { href: '/calculators/voltage-drop/swimming-pool', title: 'Swimming Pool Voltage Drop', icon: Zap, color: '#06b6d4' },
      { href: '/calculators/voltage-drop/battery-storage', title: 'Battery Storage Voltage Drop', icon: Zap, color: '#8b5cf6' },
      { href: '/calculators/voltage-drop/construction-site', title: 'Construction Site Voltage Drop', icon: Zap, color: '#f59e0b' },
      { href: '/calculators/voltage-drop/12v-dc-systems', title: '12V DC Systems Voltage Drop', icon: Zap, color: '#ef4444' },
      { href: '/calculators/voltage-drop/swa-armoured-cable', title: 'SWA Armoured Cable Voltage Drop', icon: Zap, color: '#475569' },
    ]
  },
  {
  name: 'Heating Engineers',
  icon: Flame,
  color: '#ea580c',
  calculators: [
    { href: '/radiator-btu-calculator', title: 'Radiator BTU Calculator', icon: Flame, color: '#ea580c' },
    { href: '/boiler-sizing-calculator', title: 'Boiler Sizing Calculator', icon: Flame, color: '#ef4444' },
  ]
},
  {
    name: 'Plumbers & Drainage',
    icon: Droplets,
    color: '#3b82f6',
    calculators: [
      { href: '/bsp-thread-calculator', title: 'BSP Thread Identifier', icon: Lightbulb, color: '#ea580c' },
      { href: '/drainage-calculator', title: 'Drainage Calculator', icon: Droplets, color: '#3b82f6' },
    ]
  },
  {
    name: 'Builders - General',
    icon: Package,
    color: '#22c55e',
    calculators: [
      { href: '/concrete-calculator', title: 'Concrete Calculator', icon: Package, color: '#22c55e' },
      { href: '/brick-block-calculator', title: 'Brick & Block Calculator', icon: Home, color: '#ef4444' },
      { href: '/calculators/insulation-calculator', title: 'Insulation U-Value Calculator', icon: Home, color: '#22c55e' },
      { href: '/calculators/scaffold-calculator', title: 'Scaffold Calculator', icon: Calculator, color: '#3b82f6' },
    ]
  },
  {
    name: 'Brick Calculator - Use Cases',
    icon: Home,
    color: '#ef4444',
    calculators: [
      { href: '/calculators/brick-calculator/garden-wall', title: 'Garden Wall Bricks', icon: Home, color: '#22c55e' },
      { href: '/calculators/brick-calculator/house-extension', title: 'House Extension Bricks', icon: Home, color: '#ef4444' },
      { href: '/calculators/brick-calculator/boundary-wall', title: 'Boundary Wall Bricks', icon: Home, color: '#475569' },
      { href: '/calculators/brick-calculator/retaining-wall', title: 'Retaining Wall Bricks', icon: Home, color: '#ea580c' },
      { href: '/calculators/brick-calculator/garage', title: 'Garage Bricks', icon: Home, color: '#3b82f6' },
      { href: '/calculators/brick-calculator/raised-bed', title: 'Raised Bed Bricks', icon: Home, color: '#22c55e' },
      { href: '/calculators/brick-calculator/bbq-outdoor-kitchen', title: 'BBQ/Outdoor Kitchen Bricks', icon: Home, color: '#ea580c' },
      { href: '/calculators/brick-calculator/chimney', title: 'Chimney Bricks', icon: Home, color: '#ef4444' },
      { href: '/calculators/brick-calculator/pier-pillar', title: 'Pier/Pillar Bricks', icon: Home, color: '#475569' },
      { href: '/calculators/brick-calculator/single-skin', title: 'Single Skin Wall Bricks', icon: Home, color: '#f59e0b' },
      { href: '/calculators/brick-calculator/cavity-wall', title: 'Cavity Wall Bricks', icon: Home, color: '#3b82f6' },
      { href: '/calculators/brick-calculator/decorative-feature', title: 'Decorative Feature Bricks', icon: Home, color: '#8b5cf6' },
    ]
  },
  {
    name: 'Insulation Calculator - Use Cases',
    icon: Home,
    color: '#22c55e',
    calculators: [
      { href: '/calculators/insulation-calculator/loft-insulation', title: 'Loft Insulation', icon: Home, color: '#f59e0b' },
      { href: '/calculators/insulation-calculator/cavity-wall-insulation', title: 'Cavity Wall Insulation', icon: Home, color: '#3b82f6' },
      { href: '/calculators/insulation-calculator/solid-wall-internal', title: 'Solid Wall Internal Insulation', icon: Home, color: '#475569' },
      { href: '/calculators/insulation-calculator/solid-wall-external', title: 'Solid Wall External Insulation', icon: Home, color: '#22c55e' },
      { href: '/calculators/insulation-calculator/floor-insulation', title: 'Floor Insulation', icon: Home, color: '#ea580c' },
      { href: '/calculators/insulation-calculator/room-in-roof', title: 'Room in Roof Insulation', icon: Home, color: '#8b5cf6' },
      { href: '/calculators/insulation-calculator/flat-roof', title: 'Flat Roof Insulation', icon: Home, color: '#06b6d4' },
      { href: '/calculators/insulation-calculator/new-build-walls', title: 'New Build Walls Insulation', icon: Home, color: '#22c55e' },
    ]
  },
  {
    name: 'Finishing Trades',
    icon: Palette,
    color: '#f59e0b',
    calculators: [
      { href: '/plasterer-calculator', title: 'Plasterer Calculator', icon: Palette, color: '#f59e0b' },
      { href: '/joinery-calculator', title: 'Joinery Calculator', icon: Hammer, color: '#f59e0b' },
      { href: '/tiling-calculator', title: 'Tiling Calculator', icon: Droplet, color: '#f59e0b' },
      { href: '/paint-calculator', title: 'Paint Calculator', icon: Palette, color: '#ef4444' },
    ]
  },
  {
    name: 'Specialist & Commercial',
    icon: Calculator,
    color: '#8b5cf6',
    calculators: [
      { href: '/roofing-insurance-calculator', title: 'Roofing Insurance Calculator', icon: PoundSterling, color: '#22c55e' },
      { href: '/calculators/cis-calculator', title: 'CIS Tax Calculator', icon: Calculator, color: '#8b5cf6' },
      { href: '/calculators/stgo-calculator', title: 'STGO/Haulage Compliance', icon: TruckIcon, color: '#ea580c' },
      { href: '/house-rewire-cost-uk', title: 'House Rewire Cost Guide', icon: Zap, color: '#3b82f6' },
    ]
  },
]

interface QuickFindModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function QuickFindModal({ isOpen, onClose }: QuickFindModalProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Popular'])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Reset search when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('')
      setExpandedCategories(['Popular'])
    }
  }, [isOpen])

  // Filter calculators based on search
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) return allCalculators

    const term = searchTerm.toLowerCase()
    return allCalculators
      .map(category => ({
        ...category,
        calculators: category.calculators.filter(calc =>
          calc.title.toLowerCase().includes(term)
        )
      }))
      .filter(category => category.calculators.length > 0)
  }, [searchTerm])

  // Auto-expand all when searching
  useEffect(() => {
    if (searchTerm.trim()) {
      setExpandedCategories(filteredCategories.map(c => c.name))
    }
  }, [searchTerm, filteredCategories])

  const toggleCategory = (name: string) => {
    setExpandedCategories(prev =>
      prev.includes(name)
        ? prev.filter(n => n !== name)
        : [...prev, name]
    )
  }

  const totalResults = filteredCategories.reduce((sum, cat) => sum + cat.calculators.length, 0)

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-10 md:pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            <h2 className="text-lg font-bold">Quick Find Calculator</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b bg-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search 100+ calculators..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
              autoFocus
            />
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-500 mt-2">
              {totalResults} result{totalResults !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {/* Calculator List */}
        <div className="overflow-y-auto flex-1 p-4">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-lg mb-2">No calculators found</p>
              <p className="text-sm">Try a different search term</p>
            </div>
          ) : (
            filteredCategories.map(category => (
              <div key={category.name} className="mb-3">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category.name)}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center text-white"
                      style={{ backgroundColor: category.color }}
                    >
                      <category.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold text-gray-900">{category.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
                      {category.calculators.length}
                    </span>
                  </div>
                  {expandedCategories.includes(category.name) ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Calculator Links */}
                {expandedCategories.includes(category.name) && (
                  <div className="ml-8 mt-1 space-y-1">
                    {category.calculators.map(calc => (
                      <Link
                        key={calc.href}
                        to={calc.href}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-purple-50 transition group"
                      >
                        <div
                          className="w-6 h-6 rounded flex items-center justify-center text-white flex-shrink-0"
                          style={{ backgroundColor: calc.color }}
                        >
                          <calc.icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-gray-700 group-hover:text-purple-700 transition">
                          {calc.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            Press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-700 font-mono">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  )
}
