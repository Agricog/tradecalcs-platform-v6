import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

interface SaveJobModalProps {
  calculatorType: string;
  mode: string;
  inputs: any;
  results: any;
  onClose: () => void;
}

export default function SaveJobModal({ calculatorType, mode, inputs, results, onClose }: SaveJobModalProps) {
  const [formData, setFormData] = useState({
    jobName: '',
    userName: '',
    email: '',
    notes: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jobName.trim() || !formData.userName.trim() || !formData.email.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const response = await fetch('/api/save-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          calculatorType,
          mode,
          jobName: formData.jobName.trim(),
          userName: formData.userName.trim(),
          email: formData.email.trim().toLowerCase(),
          notes: formData.notes.trim(),
          inputs,
          results
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Saved! Check your email for the link to view your saved jobs.');
        onClose();
      } else {
        setError(data.error || 'Failed to save. Please try again.');
      }
    } catch (error) {
      console.error('Save error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Save This CIS Calculation</h3>
          <button onClick={onClose} className="close-btn" aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="modal-body">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="jobName">Job Name <span className="required">*</span></label>
            <input id="jobName" type="text" placeholder="e.g., Smith Kitchen Extension" value={formData.jobName} onChange={(e) => setFormData({...formData, jobName: e.target.value})} disabled={isSaving} autoFocus />
          </div>

          <div className="form-group">
            <label htmlFor="userName">Your Name <span className="required">*</span></label>
            <input id="userName" type="text" placeholder="John Smith" value={formData.userName} onChange={(e) => setFormData({...formData, userName: e.target.value})} disabled={isSaving} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} disabled={isSaving} />
            <small className="help-text">We'll email you a link to view all your saved jobs</small>
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes (Optional)</label>
            <textarea id="notes" placeholder="Add any notes about this job..." value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} disabled={isSaving} rows={3} />
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-cancel" disabled={isSaving}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={isSaving}>
              {isSaving ? <><Loader2 size={18} className="spinner" />Saving...</> : <>💾 Save Job</>}
            </button>
          </div>
        </form>

        <style>{`
          .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
          .modal-content { background: white; border-radius: 12px; max-width: 500px; width: 100%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
          .modal-header { display: flex; justify-content: space-between; align-items: center; padding: 20px 25px; border-bottom: 1px solid #e5e7eb; }
          .modal-header h3 { margin: 0; font-size: 18px; color: #1f2937; }
          .close-btn { background: none; border: none; cursor: pointer; padding: 5px; color: #6b7280; display: flex; border-radius: 4px; }
          .close-btn:hover { background: #f3f4f6; }
          .modal-body { padding: 25px; }
          .form-group { margin-bottom: 20px; }
          .form-group label { display: block; font-weight: 600; color: #374151; margin-bottom: 8px; font-size: 14px; }
          .required { color: #ef4444; }
          .form-group input, .form-group textarea { width: 100%; padding: 10px 12px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px; font-family: inherit; }
          .form-group input:focus, .form-group textarea:focus { outline: none; border-color: #667eea; }
          .form-group textarea { resize: vertical; min-height: 80px; }
          .error-message { background: #fee2e2; border: 1px solid #fecaca; color: #991b1b; padding: 12px 15px; border-radius: 8px; margin-bottom: 20px; font-size: 14px; }
          .modal-footer { display: flex; justify-content: flex-end; gap: 10px; padding: 20px 25px; border-top: 1px solid #e5e7eb; }
          .btn-cancel { background: #f3f4f6; color: #6b7280; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
          .btn-cancel:hover { background: #e5e7eb; }
          .spinner { animation: spin 1s linear infinite; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
}

