import React, { useState, useEffect } from 'react';
import { MapPin, Building2, Zap, Phone, ExternalLink, ChevronDown, Search } from 'lucide-react';
// Supplier data - in production, this would come from src/data/suppliers.json
// For now, embedded to avoid import issues
const suppliersData = {
  "regions": {
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
  },
  "cities": {
    "manchester": {
      "name": "Manchester",
      "suppliers": [
        { "name": "Jewson Manchester", "type": "builders-merchant", "services": ["Bricks", "Blocks", "Aggregates", "Timber"], "phone": "0161 XXX XXXX", "website": "https://www.jewson.co.uk", "featured": true },
        { "name": "Travis Perkins Salford", "type": "builders-merchant", "services": ["Bricks", "Blocks", "Roofing", "Insulation"], "phone": "0161 XXX XXXX", "website": "https://www.travisperkins.co.uk", "featured": false },
        { "name": "MKM Manchester", "type": "builders-merchant", "services": ["Bricks", "Timber", "Landscaping"], "phone": "0161 XXX XXXX", "website": "https://www.mkmbs.co.uk", "featured": false }
      ]
    },
    "leeds": {
      "name": "Leeds",
      "suppliers": [
        { "name": "Jewson Leeds", "type": "builders-merchant", "services": ["Bricks", "Blocks", "Aggregates"], "phone": "0113 XXX XXXX", "website": "https://www.jewson.co.uk", "featured": true },
        { "name": "Buildbase Leeds", "type": "builders-merchant", "services": ["Bricks", "Blocks", "Tools"], "phone": "0113 XXX XXXX", "website": "https://www.buildbase.co.uk", "featured": false }
      ]
    },
    "birmingham": {
      "name": "Birmingham", 
      "suppliers": [
        { "name": "Jewson Birmingham", "type": "builders-merchant", "services": ["Bricks", "Blocks", "Aggregates"], "phone": "0121 XXX XXXX", "website": "https://www.jewson.co.uk", "featured": true },
        { "name": "Travis Perkins Birmingham", "type": "builders-merchant", "services": ["Bricks", "Timber", "Roofing"], "phone": "0121 XXX XXXX", "website": "https://www.travisperkins.co.uk", "featured": false }
      ]
    },
    "bristol": {
      "name": "Bristol",
      "suppliers": [
        { "name": "Jewson Bristol", "type": "builders-merchant", "services": ["Bricks", "Blocks", "Aggregates"], "phone": "0117 XXX XXXX", "website": "https://www.jewson.co.uk", "featured": true }
      ]
    },
    "glasgow": {
      "name": "Glasgow",
      "suppliers": [
        { "name": "Jewson Glasgow", "type": "builders-merchant", "services": ["Bricks", "Blocks", "Aggregates"], "phone": "0141 XXX XXXX", "website": "https://www.jewson.co.uk", "featured": true }
      ]
    },
    "london": {
      "name": "London",
      "suppliers": [
        { "name": "Selco London", "type": "builders-merchant", "services": ["Bricks", "Blocks", "Trade Only"], "phone": "020 XXXX XXXX", "website": "https://www.selcobw.com", "featured": true },
        { "name": "Travis Perkins London", "type": "builders-merchant", "services": ["Bricks", "Timber", "Tools"], "phone": "020 XXXX XXXX", "website": "https://www.travisperkins.co.uk", "featured": false }
      ]
    }
  },
  "nationalChains": [
    { "name": "Jewson", "website": "https://www.jewson.co.uk/branch-finder", "type": "builders-merchant" },
    { "name": "Travis Perkins", "website": "https://www.travisperkins.co.uk/branch-finder", "type": "builders-merchant" },
    { "name": "Buildbase", "website": "https://www.buildbase.co.uk/storefinder", "type": "builders-merchant" },
    { "name": "MKM", "website": "https://www.mkmbs.co.uk/branches", "type": "builders-merchant" },
    { "name": "Selco", "website": "https://www.selcobw.com/store-finder", "type": "builders-merchant" }
  ]
};

interface Supplier {
  name: string;
  address: string;
  postcode: string;
  phone: string;
  type: string;
  services: string[];
  affiliate_url: string;
  featured: boolean;
}

interface LocationSupplierWidgetProps {
  calculatorType: 'brick' | 'electrical' | 'plumbing' | 'general';
  calculatorSlug?: string;
  className?: string;
}

const LocationSupplierWidget: React.FC<LocationSupplierWidgetProps> = ({ 
  calculatorType,
  calculatorSlug,
  className = ''
}) => {
  const [postcode, setPostcode] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);

  // Get supplier type based on calculator
  const getRelevantSupplierType = () => {
    switch (calculatorType) {
      case 'brick':
        return 'builders-merchant';
      case 'electrical':
        return 'electrical-wholesaler';
      case 'plumbing':
        return 'plumbers-merchant';
      default:
        return 'builders-merchant';
    }
  };

  // Find city from postcode prefix
  const findCityFromPostcode = (postcodeInput: string): string | null => {
    const prefix = postcodeInput.toUpperCase().split(' ')[0].replace(/[0-9]/g, '');
    
    const postcodeMap: { [key: string]: string } = {
      'M': 'manchester',
      'LS': 'leeds',
      'B': 'birmingham',
      'BS': 'bristol',
      'G': 'glasgow',
      'E': 'london',
      'N': 'london',
      'S': 'london',
      'W': 'london',
      'EC': 'london',
      'WC': 'london',
      'SE': 'london',
      'SW': 'london',
      'NW': 'london',
    };

    // Try exact match first, then prefix
    if (postcodeMap[prefix]) {
      return postcodeMap[prefix];
    }
    
    // Try first letter
    const firstLetter = prefix.charAt(0);
    if (postcodeMap[firstLetter]) {
      return postcodeMap[firstLetter];
    }

    return null;
  };

  // Load suppliers for a city
  const loadSuppliers = (city: string) => {
    setIsLoading(true);
    
    // Simulate loading (in production, could be API call)
    setTimeout(() => {
      const cityData = suppliersData.suppliers[city as keyof typeof suppliersData.suppliers];
      
      if (cityData) {
        const supplierType = getRelevantSupplierType();
        let relevantSuppliers: Supplier[] = [];
        
        if (supplierType === 'builders-merchant') {
          relevantSuppliers = cityData.merchants || [];
        } else if (supplierType === 'electrical-wholesaler') {
          relevantSuppliers = cityData.electrical_wholesalers || [];
        }
        
        // If no specific type, show all merchants
        if (relevantSuppliers.length === 0) {
          relevantSuppliers = cityData.merchants || [];
        }
        
        setSuppliers(relevantSuppliers);
        setSelectedCity(cityData.city);
      } else {
        setSuppliers([]);
        setSelectedCity(null);
      }
      
      setIsLoading(false);
      setIsExpanded(true);
    }, 300);
  };

  // Handle postcode search
  const handlePostcodeSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const city = findCityFromPostcode(postcode);
    if (city) {
      loadSuppliers(city);
    } else {
      // Show national options if no local match
      setSuppliers([]);
      setSelectedCity(null);
      setIsExpanded(true);
    }
  };

  // Get icon for supplier type
  const getSupplierIcon = (type: string) => {
    switch (type) {
      case 'builders-merchant':
        return <Building2 className="h-5 w-5 text-orange-500" />;
      case 'electrical-wholesaler':
        return <Zap className="h-5 w-5 text-blue-500" />;
      default:
        return <Building2 className="h-5 w-5 text-gray-500" />;
    }
  };

  // Get widget title based on calculator type
  const getWidgetTitle = () => {
    switch (calculatorType) {
      case 'brick':
        return 'Find Building Materials Near You';
      case 'electrical':
        return 'Find Electrical Suppliers Near You';
      case 'plumbing':
        return 'Find Plumbing Suppliers Near You';
      default:
        return 'Find Suppliers Near You';
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="h-5 w-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900">{getWidgetTitle()}</h3>
        </div>
        
        {/* Postcode Search */}
        <form onSubmit={handlePostcodeSearch} className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="Enter your postcode (e.g. LS1, M1, BS1)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-1"
          >
            <Search className="h-4 w-4" />
            Find
          </button>
        </form>
      </div>

      {/* Results */}
      {isExpanded && (
        <div className="p-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            </div>
          ) : suppliers.length > 0 ? (
            <>
              {selectedCity && (
                <p className="text-sm text-gray-600 mb-3">
                  Suppliers near <span className="font-medium">{selectedCity}</span>
                </p>
              )}
              
              <div className="space-y-3">
                {suppliers.slice(0, 3).map((supplier, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {getSupplierIcon(supplier.type)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm">
                          {supplier.name}
                          {supplier.featured && (
                            <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                              Featured
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-gray-500 mt-0.5">{supplier.address}</p>
                        <p className="text-xs text-gray-500">{supplier.postcode}</p>
                        
                        {/* Services Tags */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {supplier.services.slice(0, 3).map((service, sIndex) => (
                            <span 
                              key={sIndex}
                              className="px-2 py-0.5 bg-white border border-gray-200 text-gray-600 text-xs rounded"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex flex-col gap-1">
                        {supplier.phone && (
                          <a 
                            href={`tel:${supplier.phone}`}
                            className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                            title="Call"
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                        )}
                        {supplier.affiliate_url && (
                          <a 
                            href={supplier.affiliate_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                            title="Visit website"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lead Capture CTA */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg text-sm font-medium hover:from-purple-700 hover:to-blue-600 transition-colors"
                >
                  Get Quotes from Local Suppliers
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Free quotes from verified suppliers in your area
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-3">
                {postcode ? `No local suppliers found for ${postcode}. Here are national options:` : 'Enter your postcode to find local suppliers, or browse national chains:'}
              </p>
              
              {/* National Chains */}
              <div className="space-y-2">
                {suppliersData.national_chains
                  .filter(chain => {
                    if (calculatorType === 'electrical') {
                      return chain.type === 'electrical-wholesaler';
                    }
                    return chain.type === 'builders-merchant';
                  })
                  .slice(0, 4)
                  .map((chain, index) => (
                    <a
                      key={index}
                      href={chain.branch_locator}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {getSupplierIcon(chain.type)}
                        <span className="text-sm font-medium text-gray-900">{chain.name}</span>
                      </div>
                      <span className="text-xs text-purple-600 flex items-center gap-1">
                        Find branch <ExternalLink className="h-3 w-3" />
                      </span>
                    </a>
                  ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Lead Form Modal */}
      {showLeadForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Get Free Quotes
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Tell us about your project and we'll connect you with local suppliers.
            </p>
            
            {/* SmartSuite Form Embed Placeholder */}
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <textarea
                placeholder="Tell us about your project..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLeadForm(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  Get Quotes
                </button>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              By submitting, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSupplierWidget;
