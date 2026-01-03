import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { X, FileText, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../ui/Button';

interface ConvertToInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteId: string;
  quoteName: string;
  quoteTotal: number;
  onConverted: (invoice: any) => void;
}

export default function ConvertToInvoiceModal({
  isOpen,
  onClose,
  quoteId,
  quoteName,
  quoteTotal,
  onConverted,
}: ConvertToInvoiceModalProps) {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [paymentTerms, setPaymentTerms] = useState(30);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleConvert = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const response = await fetch(`/api/invoices/from-quote/${quoteId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ paymentTerms, notes: notes || undefined }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Invoice ${data.data.invoiceNumber} created`);
        onConverted(data.data);
        onClose();
      } else {
        toast.error(data.error?.message || 'Failed to create invoice');
      }
    } catch (error) {
      toast.error('Failed to create invoice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            Convert to Invoice
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Converting quote:</p>
            <p className="font-medium">{quoteName}</p>
            <p className="text-lg font-bold text-green-600 mt-1">
              £{quoteTotal.toFixed(2)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Terms (days)
            </label>
            <select
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={30}>30 days</option>
              <option value={60}>60 days</option>
              <option value={90}>90 days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Invoice Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Bank details, payment instructions, etc."
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleConvert} disabled={loading} className="flex-1">
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <FileText className="w-4 h-4 mr-2" />
              )}
              Create Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
