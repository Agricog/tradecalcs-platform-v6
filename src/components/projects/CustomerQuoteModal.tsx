import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Plus, Trash2, FileText, Download } from 'lucide-react';
import { generateQuotePDF } from '../../lib/generateQuotePDF';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { api } from '../../lib/api';

interface CustomerQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
  projectName: string;
  materials: any[];
  onCreated: (quote: any) => void;
}

interface LabourItem {
  id?: string;
  description: string;
  days: string;
  dayRate: string;
  total: string;
}

export default function CustomerQuoteModal({
  isOpen,
  onClose,
  projectId,
  projectName,
  materials,
  onCreated,
}: CustomerQuoteModalProps) {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [quoteId, setQuoteId] = useState<string | null>(null);
  
  const [labourItems, setLabourItems] = useState<LabourItem[]>([
    { description: 'Installation & First Fix', days: '1', dayRate: '350', total: '350' },
    { description: 'Second Fix & Testing', days: '0.5', dayRate: '350', total: '175' },
  ]);
  
  const [settings, setSettings] = useState({
    markupPercent: '20',
    contingencyPercent: '5',
    vatPercent: '20',
    notes: '',
    terms: 'Payment due within 14 days of completion. 50% deposit required before work commences.',
    validDays: '30',
  });

  // Calculate totals
  const materialsTotal = materials.reduce((sum, m) => {
    const price = Number(m.nettPrice) || Number(m.listPrice) || 0;
    return sum + price;
  }, 0);

  const labourTotal = labourItems.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0);
  const subtotal = materialsTotal + labourTotal;
  const markupAmount = subtotal * (parseFloat(settings.markupPercent) || 0) / 100;
  const afterMarkup = subtotal + markupAmount;
  const contingencyAmount = afterMarkup * (parseFloat(settings.contingencyPercent) || 0) / 100;
  const netTotal = afterMarkup + contingencyAmount;
  const vatAmount = netTotal * (parseFloat(settings.vatPercent) || 0) / 100;
  const grandTotal = netTotal + vatAmount;

  const updateLabourItem = (index: number, field: keyof LabourItem, value: string) => {
    setLabourItems(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      
      // Auto-calculate total if days and rate are set
      if (field === 'days' || field === 'dayRate') {
        const days = parseFloat(field === 'days' ? value : updated[index].days) || 0;
        const rate = parseFloat(field === 'dayRate' ? value : updated[index].dayRate) || 0;
        updated[index].total = (days * rate).toFixed(2);
      }
      
      return updated;
    });
  };

  const addLabourItem = () => {
    setLabourItems(prev => [...prev, { description: '', days: '', dayRate: '350', total: '' }]);
  };

  const removeLabourItem = (index: number) => {
    setLabourItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateQuote = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      
      // Create the customer quote
      const quoteResponse = await api.createCustomerQuote({
        projectId,
        notes: settings.notes || null,
        terms: settings.terms || null,
        validDays: parseInt(settings.validDays) || 30,
      }, token);

      if (!quoteResponse.success) {
        toast.error(quoteResponse.error?.message || 'Failed to create quote');
        setLoading(false);
        return;
      }

      const newQuoteId = quoteResponse.data.id;
      setQuoteId(newQuoteId);

      // Add labour items
      for (const item of labourItems) {
        if (item.description && item.total) {
          await api.addLabourItem(newQuoteId, {
            description: item.description,
            days: parseFloat(item.days) || null,
            dayRate: parseFloat(item.dayRate) || null,
            total: parseFloat(item.total),
          }, token);
        }
      }

      // Update quote with markup settings
      await api.updateCustomerQuote(newQuoteId, {
        markupPercent: parseFloat(settings.markupPercent) || 0,
        contingencyPercent: parseFloat(settings.contingencyPercent) || 0,
        vatPercent: parseFloat(settings.vatPercent) || 0,
      }, token);

      // Fetch the complete quote
      const finalQuote = await api.getCustomerQuote(newQuoteId, token);
      
      if (finalQuote.success) {
        onCreated(finalQuote.data);
        toast.success(`Quote ${finalQuote.data.quoteNumber} created`);
        setStep(3);
      }
    } catch (error) {
      toast.error('Failed to create quote');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setQuoteId(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create Customer Quote" size="lg">
      {step === 1 && (
        <div className="space-y-6">
          <p className="text-sm text-gray-600">
            Building quote for <strong>{projectName}</strong>
          </p>

          {/* Materials Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-2">Materials</h3>
            <div className="text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
              {materials.map(m => (
                <div key={m.id} className="flex justify-between">
                  <span>{m.description}</span>
                  <span>
                    {m.nettPrice || m.listPrice 
                      ? `£${Number(m.nettPrice || m.listPrice).toFixed(2)}`
                      : 'Not priced'
                    }
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t mt-2 pt-2 flex justify-between font-medium">
              <span>Materials Total</span>
              <span>£{materialsTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Labour Items */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Labour</h3>
              <button
                onClick={addLabourItem}
                className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
            <div className="space-y-3">
              {labourItems.map((item, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="flex-1">
                    <Input
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateLabourItem(index, 'description', e.target.value)}
                    />
                  </div>
                  <div className="w-20">
                    <Input
                      placeholder="Days"
                      type="number"
                      step="0.5"
                      value={item.days}
                      onChange={(e) => updateLabourItem(index, 'days', e.target.value)}
                    />
                  </div>
                  <div className="w-24">
                    <Input
                      placeholder="Day Rate"
                      type="number"
                      value={item.dayRate}
                      onChange={(e) => updateLabourItem(index, 'dayRate', e.target.value)}
                    />
                  </div>
                  <div className="w-24">
                    <Input
                      placeholder="Total"
                      type="number"
                      value={item.total}
                      onChange={(e) => updateLabourItem(index, 'total', e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => removeLabourItem(index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t mt-3 pt-2 flex justify-between font-medium">
              <span>Labour Total</span>
              <span>£{labourTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button onClick={() => setStep(2)}>Next: Pricing Settings</Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          {/* Pricing Settings */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Markup %
              </label>
              <Input
                type="number"
                value={settings.markupPercent}
                onChange={(e) => setSettings(prev => ({ ...prev, markupPercent: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contingency %
              </label>
              <Input
                type="number"
                value={settings.contingencyPercent}
                onChange={(e) => setSettings(prev => ({ ...prev, contingencyPercent: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                VAT %
              </label>
              <Input
                type="number"
                value={settings.vatPercent}
                onChange={(e) => setSettings(prev => ({ ...prev, vatPercent: e.target.value }))}
              />
            </div>
          </div>

          {/* Quote Totals Preview */}
          <div className="bg-purple-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Materials</span>
              <span>£{materialsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Labour</span>
              <span>£{labourTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm border-t pt-2">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Markup ({settings.markupPercent}%)</span>
              <span>£{markupAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Contingency ({settings.contingencyPercent}%)</span>
              <span>£{contingencyAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm border-t pt-2">
              <span>Net Total</span>
              <span>£{netTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>VAT ({settings.vatPercent}%)</span>
              <span>£{vatAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Grand Total</span>
              <span className="text-purple-600">£{grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Notes & Terms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (shown on quote)
            </label>
            <textarea
              value={settings.notes}
              onChange={(e) => setSettings(prev => ({ ...prev, notes: e.target.value }))}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Any additional notes for the customer..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Terms & Conditions
            </label>
            <textarea
              value={settings.terms}
              onChange={(e) => setSettings(prev => ({ ...prev, terms: e.target.value }))}
              rows={2}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="w-32">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Valid for (days)
            </label>
            <Input
              type="number"
              value={settings.validDays}
              onChange={(e) => setSettings(prev => ({ ...prev, validDays: e.target.value }))}
            />
          </div>

          <div className="flex justify-between gap-3 pt-4 border-t">
            <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={handleCreateQuote} loading={loading}>
              <FileText className="w-4 h-4 mr-2" />
              Create Quote
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
  <div className="text-center py-8">
    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <FileText className="w-8 h-8 text-green-600" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">Quote Created!</h3>
    <p className="text-gray-600 mb-6">
      Your quote is ready to download.
    </p>
    <div className="bg-gray-50 rounded-lg p-4 inline-block mb-6">
      <p className="text-3xl font-bold text-purple-600">£{grandTotal.toFixed(2)}</p>
      <p className="text-sm text-gray-500">inc. VAT</p>
    </div>
    <div className="flex justify-center gap-3">
      <Button 
        variant="primary"
        onClick={() => {
  const pdf = generateQuotePDF({
    quoteNumber: `TC-${new Date().getFullYear()}-0001`,
    createdAt: new Date().toISOString(),
    validDays: parseInt(settings.validDays) || 30,
    project: {
      name: projectName,
      address: (window as any).__projectAddress || '',
      customerName: (window as any).__customerName || '',
      customerEmail: (window as any).__customerEmail || '',
      customerPhone: (window as any).__customerPhone || '',
    },
    labourItems: labourItems.filter(l => l.description && l.total).map(l => ({
      description: l.description,
      total: parseFloat(l.total) || 0,
    })),
    materialsTotal,
    labourTotal,
    subtotal,
    markupPercent: parseFloat(settings.markupPercent) || 0,
    markupAmount,
    contingencyPercent: parseFloat(settings.contingencyPercent) || 0,
    contingencyAmount,
    netTotal,
    vatPercent: parseFloat(settings.vatPercent) || 0,
    vatAmount,
    grandTotal,
    notes: settings.notes || undefined,
    terms: settings.terms || undefined,
  });
  pdf.save(`Quote-${projectName.replace(/\s+/g, '-')}.pdf`);
  toast.success('PDF downloaded');
}}
            labourItems: labourItems.filter(l => l.description && l.total).map(l => ({
              description: l.description,
              total: parseFloat(l.total) || 0,
            })),
            materialsTotal,
            labourTotal,
            subtotal,
            markupPercent: parseFloat(settings.markupPercent) || 0,
            markupAmount,
            contingencyPercent: parseFloat(settings.contingencyPercent) || 0,
            contingencyAmount,
            netTotal,
            vatPercent: parseFloat(settings.vatPercent) || 0,
            vatAmount,
            grandTotal,
            notes: settings.notes || undefined,
            terms: settings.terms || undefined,
          });
          pdf.save(`Quote-${projectName.replace(/\s+/g, '-')}.pdf`);
          toast.success('PDF downloaded');
        }}
      >
        <Download className="w-4 h-4 mr-2" />
        Download PDF
      </Button>
      <Button variant="secondary" onClick={handleClose}>Done</Button>
    </div>
  </div>
)}
    </Modal>
  );
}
