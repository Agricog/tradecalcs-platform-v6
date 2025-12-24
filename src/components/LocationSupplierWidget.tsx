import { useState } from 'react'
import { MapPin, Phone, ExternalLink, Search } from 'lucide-react'

// Supplier data embedded to avoid import issues
const suppliersData = {
  regions: {
    "M": "manchester",
    "LS": "leeds", 
    "B": "birmingham",
    "BS": "bristol",
    "G": "glasgow",
    "E": "london",
    "N": "london",
    "S": "london",
    "W": "london",
    "SE": "london",
    "SW": "london",
    "NW": "london"
  } as Record<string, string>,
  cities: {
    manchester: {
      name: "Manchester",
      suppliers: [
        { name: "Jewson Manchester", type: "builders-merchant", services: ["Bricks", "Blocks", "Aggregates", "Timber"], phone: "0161 XXX XXXX", website: "https://www.jewson.co.uk", featured: true },
        { name: "Travis Perkins Salford", type: "builders-merchant", services: ["Bricks", "Blocks", "Roofing", "Insulation"], phone: "0161 XXX XXXX", website: "https://www.travisperkins.co.uk", featured: false },
        { name: "MKM Manchester", type: "builders-merchant", services: ["Bricks", "Timber", "Landscaping"], phone: "0161 XXX XXXX", website: "https://www.mkmbs.co.uk", featured: false }
      ]
    },
    leeds: {
      name: "Leeds",
      suppliers: [
        { name: "Jewson Leeds", type: "builders-merchant", services: ["Bricks", "Blocks", "Aggregates"], phone: "0113 XXX XXXX", website: "https://www.jewson.co.uk", featured: true },
        { name: "Buildbase Leeds", type: "builders-merchant", services: ["Bricks", "Blocks", "Tools"], phone: "0113 XXX XXXX", website: "https://www.buildbase.co.uk", featured: false }
      ]
    },
    birmingham: {
      name: "Birmingham", 
      suppliers: [
        { name: "Jewson Birmingham", type: "builders-merchant", services: ["Bricks", "Blocks", "Aggregates"], phone: "0121 XXX XXXX", website: "https://www.jewson.co.uk", featured: true },
        { name: "Travis Perkins Birmingham", type: "builders-merchant", services: ["Bricks", "Timber", "Roofing"], phone: "0121 XXX XXXX", website: "https://www.travisperkins.co.uk", featured: false }
      ]
    },
    bristol: {
      name: "Bristol",
      suppliers: [
        { name: "Jewson Bristol", type: "builders-merchant", services: ["Bricks", "Blocks", "Aggregates"], phone: "0117 XXX XXXX", website: "https://www.jewson.co.uk", featured: true }
      ]
    },
    glasgow: {
      name: "Glasgow",
      suppliers: [
        { name: "Jewson Glasgow", type: "builders-merchant", services: ["Bricks", "Blocks", "Aggregates"], phone: "0141 XXX XXXX", website: "https://www.jewson.co.uk", featured: true }
      ]
    },
    london: {
      name: "London",
      suppliers: [
        { name: "Selco London", type: "builders-merchant", services: ["Bricks", "Blocks", "Trade Only"], phone: "020 XXXX XXXX", website: "https://www.selcobw.com", featured: true },
        { name: "Travis Perkins London", type: "builders-merchant", services: ["Bricks", "Timber", "Tools"], phone: "020 XXXX XXXX", website: "https://www.travisperkins.co.uk", featured: false }
      ]
    }
  } as Record<string, { name: string; suppliers: Array<{ name: string; type: string; services: string[]; phone: string; website: string; featured: boolean }> }>,
  nationalChains: [
    { name: "Jewson", website: "https://www.jewson.co.uk/branch-finder", type: "builders-merchant" },
    { name: "Travis Perkins", website: "https://www.travisperkins.co.uk/branch-finder", type: "builders-merchant" },
    { name: "Buildbase", website: "https://www.buildbase.co.uk/storefinder", type: "builders-merchant" },
    { name: "MKM", website: "https://www.mkmbs.co.uk/branches", type: "builders-merchant" },
    { name: "Selco", website: "https://www.selcobw.com/store-finder", type: "builders-merchant" }
  ]
}

interface LocationSupplierWidgetProps {
  calculatorType: 'brick' | 'electrical' | 'plumbing' | 'general'
}

export default function LocationSupplierWidget({ calculatorType }: LocationSupplierWidgetProps) {
  const [postcode, setPostcode] = useState('')
  const [cityName, setCityName] = useState<string | null>(null)
  const [suppliers, setSuppliers] = useState<Array<{ name: string; type: string; services: string[]; phone: string; website: string; featured: boolean }>>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = () => {
    if (!postcode.trim()) return
    
    // Extract postcode prefix (first 1-2 letters)
    const prefix = postcode.trim().toUpperCase().match(/^[A-Z]{1,2}/)?.[0] || ''
    
    // Look up city from region
    const cityKey = suppliersData.regions[prefix]
    
    if (cityKey && suppliersData.cities[cityKey]) {
      const cityData = suppliersData.cities[cityKey]
      setCityName(cityData.name)
      setSuppliers(cityData.suppliers.slice(0, 3))
    } else {
      setCityName(null)
      setSuppliers([])
    }
    setSearched(true)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="h-5 w-5 text-purple-600" />
        <h3 className="font-semibold text-gray-900">Find Local Suppliers</h3>
      </div>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter postcode"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSearch}
          className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {searched && (
        <>
          {cityName && suppliers.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Showing {calculatorType === 'brick' ? 'builders merchants' : 'suppliers'} near <strong>{cityName}</strong>
              </p>
              
              {suppliers.map((supplier, index) => (
                <div key={index} className={`p-3 rounded-lg border ${supplier.featured ? 'border-purple-200 bg-purple-50' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{supplier.name}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {supplier.services.slice(0, 3).map((service, i) => (
                          <span key={i} className="text-xs bg-white px-2 py-0.5 rounded text-gray-600">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    {supplier.featured && (
                      <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded">Featured</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <a href={`tel:${supplier.phone}`} className="flex items-center gap-1 text-gray-600 hover:text-purple-600">
                      <Phone className="h-3 w-3" />
                      {supplier.phone}
                    </a>
                    <a href={supplier.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-purple-600 hover:text-purple-700">
                      <ExternalLink className="h-3 w-3" />
                      Website
                    </a>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-2 text-sm text-purple-600 font-medium hover:bg-purple-50 rounded-lg transition-colors">
                Get Quotes from All →
              </button>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-600 mb-3">No local suppliers found. Try these national chains:</p>
              <div className="space-y-2">
                {suppliersData.nationalChains.slice(0, 3).map((chain, index) => (
                  <a
                    key={index}
                    href={chain.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {chain.name} Branch Finder →
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}
      
      {!searched && (
        <p className="text-xs text-gray-500 text-center">
          Enter your postcode to find local {calculatorType === 'brick' ? 'builders merchants' : 'suppliers'}
        </p>
      )}
    </div>
  )
}
