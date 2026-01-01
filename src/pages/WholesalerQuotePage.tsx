import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Package, Building2, CheckCircle, AlertCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

interface QuoteData {
  id: string;
  projectName: string;
  projectAddress?: string;
  accountNumber?: string;
  materials: Array<{
    id: string;
    description: string;
    totalLength?: number;
    unit: string;
    quantity: number;
  }>;
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.discountPercent) {
      toast.error('Enter a discount percentage');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`/api/wholesaler-quotes/public/${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          discountPercent: parseFloat(formData.discountPercent),
          notes: formData.notes || null,
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              Your pricing has been sent to the electrician. They'll be in touch soon.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 inline-block">
              <p className="text-sm text-gray-600">Discount Applied</p>
              <p className="text-3xl font-bold text-purple-600">{formData.discountPercent}%</p>
            </div>
          </div>
        ) : (
          <>
            {/* Account Info */}
            {quote.accountNumber && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <Building2 className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-800">Account Number</p>
                  <p className="font-semibold text-blue-900">{quote.accountNumber}</p>
                </div>
              </div>
            )}

            {/* Materials List */}
            <div className="bg-white rounded-lg shadow-lg mb-6">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Package className="w-5 h-5 text-purple-600" />
                  Materials Required
                </h2>
              </div>
              <div className="divide-y">
                {quote.materials.map((material, index) => (
                  <div key={material.id} className="p-4 flex items-center justify-between">
                    <div>
                      <span className="text-gray-400 text-sm mr-3">{index + 1}.</span>
                      <span className="font-medium">{material.description}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold">
                        {material.totalLength || material.quantity}
                      </span>
                      <span className="text-gray-500 ml-1">{material.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 border-t">
                <p className="text-sm text-gray-600 text-center">
                  {quote.materials.length} items total
                </p>
              </div>
            </div>

            {/* Pricing Form */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Apply Account Discount</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    label="Discount Percentage *"
                    type="number"
                    min="0"
                    max="100"
                    step="0.5"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData(prev => ({ ...prev, discountPercent: e.target.value }))}
                    placeholder="e.g. 25"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the discount percentage for this customer's account
                  </p>
                </div>

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
                  Submit Quote
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
