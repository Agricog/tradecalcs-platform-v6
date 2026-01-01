import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Send, Copy, Check, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { api } from '../../lib/api';

interface SendToWholesalerModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  onSent: (quote: any) => void;
}

const COMMON_WHOLESALERS = [
  'Edmundson Electrical',
  'CEF',
  'Rexel',
  'Denmans',
  'Electric Center',
  'Medlock',
  'Newey & Eyre',
  'Stearn Electric',
  'TLC Electrical',
  'Yesss Electrical',
];

export default function SendToWholesalerModal({ 
  isOpen, 
  onClose, 
  projectId,
  projectName,
  onSent 
}: SendToWholesalerModalProps) {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [quoteUrl, setQuoteUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    wholesalerName: '',
    wholesalerEmail: '',
    accountNumber: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.wholesalerName.trim()) {
      toast.error('Enter wholesaler name');
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      const response = await api.createWholesalerQuote({
        projectId,
        wholesalerName: formData.wholesalerName.trim(),
        wholesalerEmail: formData.wholesalerEmail.trim() || null,
        accountNumber: formData.accountNumber.trim() || null,
      }, token);

      if (response.success) {
        setQuoteUrl(response.data.quoteUrl);
        onSent(response.data);
        toast.success('Quote request created');
      } else {
        toast.error(response.error?.message || 'Failed to create quote request');
      }
    } catch (error) {
      toast.error('Failed to create quote request');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (quoteUrl) {
      await navigator.clipboard.writeText(quoteUrl);
      setCopied(true);
      toast.success('Link copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setQuoteUrl(null);
    setFormData({ wholesalerName: '', wholesalerEmail: '', accountNumber: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Send to Wholesaler" size="md">
      {!quoteUrl ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Create a quote request link for <strong>{projectName}</strong>. Your wholesaler can view materials and apply your account discount.
          </p>

          {/* Quick Select Wholesaler */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Wholesaler
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {COMMON_WHOLESALERS.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, wholesalerName: name }))}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    formData.wholesalerName === name
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Wholesaler Name *"
            value={formData.wholesalerName}
            onChange={(e) => setFormData(prev => ({ ...prev, wholesalerName: e.target.value }))}
            placeholder="Or type a name..."
            required
          />

          <Input
            label="Wholesaler Email (optional)"
            type="email"
            value={formData.wholesalerEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, wholesalerEmail: e.target.value }))}
            placeholder="quotes@wholesaler.com"
          />

          <Input
            label="Your Account Number (optional)"
            value={formData.accountNumber}
            onChange={(e) => setFormData(prev => ({ ...prev, accountNumber: e.target.value }))}
            placeholder="ACC-123456"
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
            <strong>How it works:</strong> We'll generate a unique link you can send to your wholesaler. They can view your materials list and apply your account discount — no login required.
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" loading={loading}>
              <Send className="w-4 h-4 mr-2" />
              Generate Quote Link
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quote Link Created!</h3>
            <p className="text-sm text-gray-600">
              Send this link to <strong>{formData.wholesalerName}</strong>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={quoteUrl}
                readOnly
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
              />
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-gray-200 rounded transition-colors"
                title="Copy link"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={handleCopy}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <a 
              href={quoteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="primary" className="w-full">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Link
              </Button>
            </a>
          </div>

          <p className="text-xs text-center text-gray-500">
            Link expires in 7 days. You can create multiple quote requests for different wholesalers.
          </p>

          <div className="flex justify-center pt-4 border-t">
            <Button variant="ghost" onClick={handleClose}>
              Done
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
