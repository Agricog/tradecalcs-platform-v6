import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { ArrowLeft, Download, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { api } from '../lib/api';
import Button from '../components/ui/Button';
import { generateQuotePDF } from '../lib/generateQuotePDF';

interface LabourItem {
  id?: string;
  description: string;
  days: number;
  dayRate: number;
  total: number;
}

interface ContractorProfile {
  companyName?: string;
  companyAddress?: string;
  companyPhone?: string;
  companyEmail?: string;
  certificationNumber?: string;
  certificationBody?: string;
  vatNumber?: string;
}

export default function QuotePreviewPage() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [quote, setQuote] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [contractor, setContractor] = useState<ContractorProfile | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  
  // Editable state
  const [labourItems, setLabourItems] = useState<LabourItem[]>([]);
  const [settings, setSettings] = useState({
    markupPercent: 20,
    contingencyPercent: 5,
    vatPercent: 20,
    notes: '',
    terms: '',
    validDays: 30,
  });

  useEffect(() => {
    if (quoteId) {
      loadQuote();
      loadContractorProfile();
    }
  }, [quoteId]);

  const loadQuote = async () => {
    try {
      const token = await getToken();
      const response = await api.getCustomerQuote(quoteId!, token);
      
      if (response.success) {
        const q = response.data;
        setQuote(q);
        setProject(q.project);
        
        // Initialize editable state
        setLabourItems(q.labourItems?.map((l: any) => ({
          id: l.id,
          description: l.description,
          days: Number(l.days) || 0,
          dayRate: Number(l.dayRate) || 0,
          total: Number(l.total) || 0,
        })) || []);
        
        setSettings({
          markupPercent: Number(q.markupPercent) || 20,
          contingencyPercent: Number(q.contingencyPercent) || 5,
          vatPercent: Number(q.vatPercent) || 20,
          notes: q.notes || '',
          terms: q.terms || '',
          validDays: Number(q.validDays) || 30,
        });
      } else {
        toast.error('Quote not found');
        navigate('/projects');
      }
    } catch (error) {
      toast.error('Failed to load quote');
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  const loadContractorProfile = async () => {
    try {
      const token = await getToken();
      const response = await fetch('/api/contractor-profile', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setContractor(data.data);
      }
    } catch (error) {
      console.error('Failed to load contractor profile:', error);
    }
  };

  // Calculations
  const materialsTotal = project?.materialItems?.reduce((sum: number, m: any) => {
    const unitPrice = Number(m.nettPrice) || Number(m.listPrice) || 0;
    const qty = m.totalLength || m.quantity;
    return sum + (unitPrice * qty);
  }, 0) || 0;

  const labourTotal = labourItems.reduce((sum, item) => sum + (item.total || 0), 0);
  const subtotal = materialsTotal + labourTotal;
  const markupAmount = subtotal * (settings.markupPercent / 100);
  const afterMarkup = subtotal + markupAmount;
  const contingencyAmount = afterMarkup * (settings.contingencyPercent / 100);
  const netTotal = afterMarkup + contingencyAmount;
  const vatAmount = netTotal * (settings.vatPercent / 100);
  const grandTotal = netTotal + vatAmount;

  const updateLabourItem = (index: number, field: keyof LabourItem, value: number | string) => {
    setLabourItems(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      
      // Auto-calculate total
      if (field === 'days' || field === 'dayRate') {
        const days = field === 'days' ? Number(value) : updated[index].days;
        const rate = field === 'dayRate' ? Number(value) : updated[index].dayRate;
        updated[index].total = days * rate;
      }
      
      return updated;
    });
  };

  const addLabourItem = () => {
    setLabourItems(prev => [...prev, { description: '', days: 0, dayRate: 350, total: 0 }]);
  };

  const removeLabourItem = (index: number) => {
    setLabourItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = await getToken();
      
      // Update quote settings
      await api.updateCustomerQuote(quoteId!, {
        markupPercent: settings.markupPercent,
        contingencyPercent: settings.contingencyPercent,
        vatPercent: settings.vatPercent,
        notes: settings.notes || null,
        terms: settings.terms || null,
        validDays: settings.validDays,
      }, token);

      toast.success('Quote saved');
      setEditing(null);
    } catch (error) {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDownloadPDF = () => {
    const pdf = generateQuotePDF({
      quoteNumber: quote.quoteNumber,
      createdAt: quote.createdAt,
      validDays: settings.validDays,
      project: {
        name: project.name,
        address: project.address,
        customerName: project.customerName,
        customerEmail: project.customerEmail,
        customerPhone: project.customerPhone,
      },
      contractor: contractor ? {
        companyName: contractor.companyName,
        companyAddress: contractor.companyAddress,
        companyPhone: contractor.companyPhone,
        companyEmail: contractor.companyEmail,
      } : undefined,
      labourItems: labourItems.filter(l => l.description && l.total > 0),
      materialsTotal,
      labourTotal,
      subtotal,
      markupPercent: settings.markupPercent,
      markupAmount,
      contingencyPercent: settings.contingencyPercent,
      contingencyAmount,
      netTotal,
      vatPercent: settings.vatPercent,
      vatAmount,
      grandTotal,
      notes: settings.notes || undefined,
      terms: settings.terms || undefined,
    });
    pdf.save(`Quote-${quote.quoteNumber}.pdf`);
    toast.success('PDF downloaded');
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

  if (!quote || !project) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to={`/projects/${project.id}`} className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-bold text-gray-900">{quote.quoteNumber}</h1>
              <p className="text-sm text-gray-500">{project.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {editing && (
              <Button variant="secondary" size="sm" onClick={() => setEditing(null)}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            )}
            <Button variant="primary" onClick={handleDownloadPDF}>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Quote Preview */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Quote Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-8">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold mb-1">QUOTE</h2>
                <p className="opacity-90">{quote.quoteNumber}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">{contractor?.companyName || 'Your Company Name'}</p>
                {contractor?.companyAddress && (
                  <p className="text-sm opacity-90 whitespace-pre-line">{contractor.companyAddress}</p>
                )}
                {contractor?.companyPhone && (
                  <p className="text-sm opacity-90">{contractor.companyPhone}</p>
                )}
                <p className="text-sm opacity-90">{contractor?.companyEmail || 'your@email.com'}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Customer & Date Info */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Quote For</h3>
                <p className="font-semibold text-lg">{project.customerName || 'Customer'}</p>
                {project.address && <p className="text-gray-600">{project.address}</p>}
                {project.customerPhone && <p className="text-gray-600">{project.customerPhone}</p>}
                {project.customerEmail && <p className="text-gray-600">{project.customerEmail}</p>}
              </div>
              <div className="text-right">
                <div className="mb-2">
                  <span className="text-sm text-gray-500">Date: </span>
                  <span>{new Date(quote.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="mb-2">
                  <span className="text-sm text-gray-500">Valid Until: </span>
                  <span>{new Date(Date.now() + settings.validDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Project: </span>
                  <span>{project.name}</span>
                </div>
              </div>
            </div>

            {/* Materials */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                Materials
                <span className="text-purple-600">£{materialsTotal.toFixed(2)}</span>
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  {project.materialItems?.map((m: any) => {
                    const qty = m.totalLength || m.quantity;
                    const unitPrice = Number(m.nettPrice) || Number(m.listPrice) || 0;
                    const lineTotal = unitPrice * qty;
                    return (
                      <div key={m.id} className="flex justify-between">
                        <span className="text-gray-600">{m.description} ({qty} {m.unit})</span>
                        <span>£{lineTotal.toFixed(2)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Labour */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  Labour
                  <button 
                    onClick={() => setEditing('labour')}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </span>
                <span className="text-purple-600">£{labourTotal.toFixed(2)}</span>
              </h3>
              
              {editing === 'labour' ? (
                <div className="bg-purple-50 rounded-lg p-4 space-y-3">
                  {labourItems.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateLabourItem(index, 'description', e.target.value)}
                        placeholder="Description"
                        className="flex-1 px-3 py-2 border rounded-lg text-sm"
                      />
                      <input
                        type="number"
                        value={item.days || ''}
                        onChange={(e) => updateLabourItem(index, 'days', parseFloat(e.target.value) || 0)}
                        placeholder="Days"
                        className="w-20 px-3 py-2 border rounded-lg text-sm text-center"
                        step="0.5"
                      />
                      <input
                        type="number"
                        value={item.dayRate || ''}
                        onChange={(e) => updateLabourItem(index, 'dayRate', parseFloat(e.target.value) || 0)}
                        placeholder="Rate"
                        className="w-24 px-3 py-2 border rounded-lg text-sm text-center"
                      />
                      <span className="w-24 text-right font-medium">£{item.total.toFixed(2)}</span>
                      <button onClick={() => removeLabourItem(index)} className="text-red-500 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <button 
                      onClick={addLabourItem}
                      className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add Labour Item
                    </button>
                    <button 
                      onClick={() => setEditing(null)}
                      className="text-sm text-gray-600 hover:text-gray-700 ml-auto"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2 text-sm">
                    {labourItems.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">
                          {item.description}
                          {item.days > 0 && ` (${item.days} days @ £${item.dayRate}/day)`}
                        </span>
                        <span>£{item.total.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="border-t pt-6">
              <div className="flex justify-end">
                <div className="w-72 space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 items-center">
                    <span className="flex items-center gap-2">
                      Professional Services
                      {editing === 'markup' ? (
                        <input
                          type="number"
                          value={settings.markupPercent}
                          onChange={(e) => setSettings(prev => ({ ...prev, markupPercent: parseFloat(e.target.value) || 0 }))}
                          className="w-16 px-2 py-1 border rounded text-sm text-center"
                          onBlur={() => setEditing(null)}
                          autoFocus
                        />
                      ) : (
                        <button onClick={() => setEditing('markup')} className="text-purple-600 text-sm">
                          ({settings.markupPercent}%)
                        </button>
                      )}
                    </span>
                    <span>£{markupAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 items-center">
                    <span className="flex items-center gap-2">
                      Contingency
                      {editing === 'contingency' ? (
                        <input
                          type="number"
                          value={settings.contingencyPercent}
                          onChange={(e) => setSettings(prev => ({ ...prev, contingencyPercent: parseFloat(e.target.value) || 0 }))}
                          className="w-16 px-2 py-1 border rounded text-sm text-center"
                          onBlur={() => setEditing(null)}
                          autoFocus
                        />
                      ) : (
                        <button onClick={() => setEditing('contingency')} className="text-purple-600 text-sm">
                          ({settings.contingencyPercent}%)
                        </button>
                      )}
                    </span>
                    <span>£{contingencyAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between border-t pt-2">
                    <span>Net Total</span>
                    <span>£{netTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-gray-600 items-center">
                    <span className="flex items-center gap-2">
                      VAT
                      {editing === 'vat' ? (
                        <input
                          type="number"
                          value={settings.vatPercent}
                          onChange={(e) => setSettings(prev => ({ ...prev, vatPercent: parseFloat(e.target.value) || 0 }))}
                          className="w-16 px-2 py-1 border rounded text-sm text-center"
                          onBlur={() => setEditing(null)}
                          autoFocus
                        />
                      ) : (
                        <button onClick={() => setEditing('vat')} className="text-purple-600 text-sm">
                          ({settings.vatPercent}%)
                        </button>
                      )}
                    </span>
                    <span>£{vatAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-xl font-bold border-t pt-3 bg-purple-50 -mx-4 px-4 py-3 rounded-lg">
                    <span>TOTAL</span>
                    <span className="text-purple-600">£{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes & Terms */}
            <div className="mt-8 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  Notes
                  <button onClick={() => setEditing('notes')} className="text-purple-600">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </h3>
                {editing === 'notes' ? (
                  <textarea
                    value={settings.notes}
                    onChange={(e) => setSettings(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    rows={3}
                    onBlur={() => setEditing(null)}
                    autoFocus
                  />
                ) : (
                  <p className="text-gray-600 text-sm">{settings.notes || 'No notes added'}</p>
                )}
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  Terms & Conditions
                  <button onClick={() => setEditing('terms')} className="text-purple-600">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </h3>
                {editing === 'terms' ? (
                  <textarea
                    value={settings.terms}
                    onChange={(e) => setSettings(prev => ({ ...prev, terms: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    rows={3}
                    onBlur={() => setEditing(null)}
                    autoFocus
                  />
                ) : (
                  <p className="text-gray-600 text-sm">{settings.terms || 'No terms added'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-4 text-center text-sm text-gray-500">
            Generated by TradeCalcs.co.uk
          </div>
        </div>
      </div>
    </div>
  );
}
