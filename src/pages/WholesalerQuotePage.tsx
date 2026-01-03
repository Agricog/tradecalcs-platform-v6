import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Package, Building2, CheckCircle, AlertCircle, Send, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface Material {
  id: string;
  description: string;
  totalLength?: number;
  unit: string;
  quantity: number;
  unitPrice?: string;
}

interface QuoteData {
  id: string;
  projectName: string;
  projectAddress?: string;
  accountNumber?: string;
  materials: Material[];
  status: string;
  discountPercent?: number;
  notes?: string;
}

export default function WholesalerQuotePage() {
  const { token } = useParams<{ token: string }>();
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [unitPrices, setUnitPrices] = useState<Record<string, string>>({});
  const [excludeDiscount, setExcludeDiscount] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    discountPercent: '',
    notes: '',
  });

  useEffect(() => {
    if (token) {
      loadQuote();
    }
  }, [token]);

  const loadQuote = async () => {
    try {
      const response = await fetch(`/api/wholesaler-quotes/public/${token}`);
      const data = await response.json();
      
      if (data.success) {
        setQuote(data.data);
        const prices: Record<string, string> = {};
        data.data.materials.forEach((m: Material) => {
          prices[m.id] = '';
        });
        setUnitPrices(prices);
        
        if (data.data.discountPercent) {
          setFormData(prev => ({ 
            ...prev, 
            discountPercent: data.data.discountPercent.toString(),
            notes: data.data.notes || '',
          }));
        }
        if (data.data.status === 'priced') {
          setSubmitted(true);
        }
      } else {
        setError(data.error?.message || 'Quote not found');
      }
    } catch (err) {
      setError('Failed to load quote');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMaterial = async (materialId: string) => {
    if (!confirm('Remove this item from the quote?')) return;
    
    try {
      const response = await fetch(`/api/wholesaler-quotes/public/${token}/materials/${materialId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Remove from local state
        setQuote(prev => prev ? {
          ...prev,
          materials: prev.materials.filter(m => m.id !== materialId)
        } : null);
        
        // Clean up pricing state
        setUnitPrices(prev => {
          const updated = { ...prev };
          delete updated[materialId];
          return updated;
        });
        setExcludeDiscount(prev => {
          const updated = { ...prev };
          delete updated[materialId];
          return updated;
        });
        
        toast.success('Item removed');
      } else {
        toast.error(data.error?.message || 'Failed to remove item');
      }
    } catch (err) {
      toast.error('Failed to remove item');
    }
  };

  const getQuantity = (material: Material) => {
    return material.totalLength || material.quantity;
  };

  const getLineTotal = (material: Material) => {
    const qty = material.totalLength || material.quantity || 0;
    const unitPrice = parseFloat(unitPrices[material.id]) || 0;
    return qty * unitPrice;
  };

  const calculateSubtotal = () => {
    let total = 0;
    quote?.materials.forEach(material => {
      total += getLineTotal(material);
    });
    return total;
  };

  const calculateDiscountedTotal = () => {
    const discountPercent = parseFloat(formData.discountPercent) || 0;
    let total = 0;
    
    quote?.materials.forEach(material => {
      const lineTotal = getLineTotal(material);
      if (excludeDiscount[material.id]) {
        total += lineTotal;
      } else {
        total += lineTotal * (1 - discountPercent / 100);
      }
    });
    
    return total;
  };

  const calculateTotalDiscount = () => {
    return calculateSubtotal() - calculateDiscountedTotal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const unpricedItems = quote?.materials.filter(m => !unitPrices[m.id] || unitPrices[m.id] === '');
    if (unpricedItems && unpricedItems.length > 0) {
      toast.error(`Please enter unit prices for all ${unpricedItems.length} items`);
      return;
    }

    setSubmitting(true);
    try {
      for (const material of quote?.materials || []) {
        const unitPrice = parseFloat(unitPrices[material.id]) || 0;
        if (unitPrice > 0) {
          await fetch(`/api/wholesaler-quotes/public/${token}/materials/${material.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nettPrice: unitPrice }),
          });
        }
      }

      const excludedItems = quote?.materials.filter(m => excludeDiscount[m.id]) || [];
      let finalNotes = formData.notes || '';

      if (excludedItems.length > 0) {
        const excludedList = excludedItems.map(m => m.description).join(', ');
        const excludedNote = `\n\n⚠️ No discount applied to: ${excludedList}`;
        finalNotes = finalNotes + excludedNote;
      }

      const response = await fetch(`/api/wholesaler-quotes/public/${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discountPercent: parseFloat(formData.discountPercent) || 0,
          notes: finalNotes.trim() || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        toast.success('Quote submitted successfully');
      } else {
        toast.error(data.error?.message || 'Failed to submit quote');
      }
    } catch (err) {
      toast.error('Failed to submit quote');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4" />
          <div className="h-4 bg-gray-200 rounded w-48 mx-auto" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Quote Not Available</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!quote) return null;

  const discountPercent = parseFloat(formData.discountPercent) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <Package className="w-5 h-5" />
            <span className="text-sm">TradeCalcs Quote Request</span>
          </div>
          <h1 className="text-2xl font-bold">{quote.projectName}</h1>
          {quote.projectAddress && (
            <p className="opacity-90 mt-1">{quote.projectAddress}</p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {submitted ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quote Submitted</h2>
            <p className="text-gray-600 mb-4">
              Your pricing has been sent to the contractor. They'll be in touch soon.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-600">Total (after discount)</p>
              <p className="text-3xl font-bold text-purple-600">£{calculateDiscountedTotal().toFixed(2)}</p>
            </div>
          </div>
        ) : (
          <>
            {quote.accountNumber && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <Building2 className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-800">Account Number</p>
                  <p className="font-semibold text-blue-900">{quote.accountNumber}</p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-lg mb-6">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-600" />
                  Materials - Enter Unit Prices
                </h2>
                <p className="text-sm text-gray-500 mt-1">Enter your price per unit - totals calculate automatically</p>
              </div>
              
              <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-gray-50 border-b text-sm font-medium text-gray-600">
                <div className="col-span-5">Item</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-center">Unit Price</div>
                <div className="col-span-2 text-right">Line Total</div>
                <div className="col-span-1"></div>
              </div>

              <div className="divide-y">
                {quote.materials.map((material, index) => {
                  const qty = getQuantity(material);
                  const lineTotal = getLineTotal(material);
                  const isExcluded = excludeDiscount[material.id];
                  
                  return (
                    <div key={material.id} className="px-4 py-3">
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-5">
                          <span className="text-gray-400 text-sm mr-2">{index + 1}.</span>
                          <span className="font-medium">{material.description}</span>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className="font-semibold">{qty}</span>
                          <span className="text-gray-500 text-sm ml-1">{material.unit}</span>
                        </div>
                        <div className="col-span-2">
                          <div className="relative">
                            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm">£</span>
                            <input
                              type="number"
                              step="0.01"
                              min="0"
                              placeholder="0.00"
                              value={unitPrices[material.id] || ''}
                              onChange={(e) => setUnitPrices(prev => ({ ...prev, [material.id]: e.target.value }))}
                              className="w-full pl-6 pr-2 py-1.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-right text-sm"
                            />
                          </div>
                        </div>
                        <div className="col-span-2 text-right">
                          <span className={`font-semibold ${lineTotal > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                            £{lineTotal.toFixed(2)}
                          </span>
                        </div>
                        <div className="col-span-1 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteMaterial(material.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {discountPercent > 0 && lineTotal > 0 && (
                        <div className="mt-2 ml-6">
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isExcluded}
                              onChange={(e) => setExcludeDiscount(prev => ({ ...prev, [material.id]: e.target.checked }))}
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className={isExcluded ? 'text-orange-600 font-medium' : 'text-gray-500'}>
                              {isExcluded ? 'No discount on this item' : 'Exclude from discount'}
                            </span>
                          </label>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="p-4 bg-gray-50 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">Subtotal</span>
                  <span className="text-xl font-bold">£{calculateSubtotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Account Discount & Notes</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    label="Account Discount (%)"
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData(prev => ({ ...prev, discountPercent: e.target.value }))}
                    placeholder="e.g. 25"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Optional: Apply customer's account discount to all items
                  </p>
                </div>

                {discountPercent > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-green-800">Subtotal</span>
                      <span className="text-green-700">£{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-green-800">Discount ({formData.discountPercent}%)</span>
                      <span className="text-green-700">-£{calculateTotalDiscount().toFixed(2)}</span>
                    </div>
                    {Object.values(excludeDiscount).some(v => v) && (
                      <p className="text-xs text-orange-600 mb-2">
                        * Some items excluded from discount
                      </p>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t border-green-200">
                      <span className="font-semibold text-green-900">Total after discount</span>
                      <span className="text-2xl font-bold text-green-700">£{calculateDiscountedTotal().toFixed(2)}</span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notes (optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any notes about pricing, availability, lead times..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <Button type="submit" loading={submitting} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Pricing
                </Button>
              </form>
            </div>

            <p className="text-center text-xs text-gray-500 mt-6">
              Powered by <a href="https://tradecalcs.co.uk" className="text-purple-600 hover:underline">TradeCalcs</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
