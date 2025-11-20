import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

export default function SaveJobModal({ calculatorType, mode, inputs, results, onClose }) {
  const [formData, setFormData] = useState({
    jobName: '',
    userName: '',
    email: '',
    notes: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.jobName.trim() || !formData.userName.trim() || !formData.email.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    // Basic email validation
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
        headers: {
          'Content-Type': 'application/json',
        },
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
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="jobName">
              Job Name <span className="required">*</span>
            </label>
            <input
              id="jobName"
              type="text"
              placeholder="e.g., Smith Kitchen Extension"
              value={formData.jobName}
              onChange={(e) => setFormData({...formData, jobName: e.target.value})}
              disabled={isSaving}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="userName">
              Your Name <span className="required">*</span>
            </label>
            <input
              id="userName"
              type="text"
              placeholder="John Smith"
              value={formData.userName}
              onChange={(e) => setFormData({...formData, userName: e.target.value})}
              disabled={isSaving}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span className="required">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              disabled={isSaving}
            />
            <small className="help-text">We'll email you a link to view all your saved jobs</small>
          </div>

          <div className="form-group">
            <label htmlFor="notes">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              placeholder="Add any notes about this job..."
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              disabled={isSaving}
              rows="3"
            />
          </div>

          <div className="modal-footer">
            <button 
              type="button" 
              onClick={onClose} 
              className="btn-cancel"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 size={18} className="spinner" />
                  Saving...
                </>
              ) : (
                <>
                  💾 Save Job
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
