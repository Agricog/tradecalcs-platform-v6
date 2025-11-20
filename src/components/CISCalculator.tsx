import { useState } from 'react';
import { Calculator, Download, RotateCcw, Lightbulb, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import SaveJobModal from './SaveJobModal';

interface GrossToNetResults {
  grossLabour: number;
  materials: number;
  cisDeduction: number;
  netLabour: number;
  subtotal: number;
  vatAmount: number;
  grandTotal: number;
  hmrcPayment: number;
}

interface NetToGrossResults {
  requiredGrossLabour: number;
  netLabour: number;
  materials: number;
  cisDeduction: number;
  subtotal: number;
  vatAmount: number;
  grandTotal: number;
  invoiceAmount: number;
  hmrcPayment: number;
}

export default function CISCalculator() {
  const [mode, setMode] = useState<'grossToNet' | 'netToGross'>('grossToNet');
  const [cisRate, setCisRate] = useState(20);
  const [labourAmount, setLabourAmount] = useState('');
  const [materialsAmount, setMaterialsAmount] = useState('');
  const [includeVAT, setIncludeVAT] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const VAT_RATE = 0.20;

  const calculateGrossToNet = (): GrossToNetResults => {
    const labour = parseFloat(labourAmount) || 0;
    const materials = parseFloat(materialsAmount) || 0;
    const cisDeduction = labour * (cisRate / 100);
    const netLabour = labour - cisDeduction;
    const totalNet = netLabour + materials;
    
    let vatAmount = 0;
    let grandTotal = totalNet;
    
    if (includeVAT) {
      vatAmount = totalNet * VAT_RATE;
      grandTotal = totalNet + vatAmount;
    }

    return {
      grossLabour: labour,
      materials: materials,
      cisDeduction: cisDeduction,
      netLabour: netLabour,
      subtotal: totalNet,
      vatAmount: vatAmount,
      grandTotal: grandTotal,
      hmrcPayment: cisDeduction
    };
  };

  const calculateNetToGross = (): NetToGrossResults => {
    const netRequired = parseFloat(labourAmount) || 0;
    const materials = parseFloat(materialsAmount) || 0;
    
    const requiredGrossLabour = netRequired / (1 - cisRate / 100);
    const cisDeduction = requiredGrossLabour - netRequired;
    const totalNet = netRequired + materials;
    
    let vatAmount = 0;
    let grandTotal = totalNet;
    
    if (includeVAT) {
      vatAmount = totalNet * VAT_RATE;
      grandTotal = totalNet + vatAmount;
    }

    return {
      requiredGrossLabour: requiredGrossLabour,
      netLabour: netRequired,
      materials: materials,
      cisDeduction: cisDeduction,
      subtotal: totalNet,
      vatAmount: vatAmount,
      grandTotal: grandTotal,
      invoiceAmount: requiredGrossLabour + materials,
      hmrcPayment: cisDeduction
    };
  };

  const results = mode === 'grossToNet' ? calculateGrossToNet() : calculateNetToGross();
  const hasValues = (parseFloat(labourAmount) > 0 || parseFloat(materialsAmount) > 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const copyToClipboard = () => {
    let text = `CIS Calculation Summary\n======================\n\n`;
    
    if (mode === 'grossToNet') {
      const res = results as GrossToNetResults;
      text += `Gross Labour: ${formatCurrency(res.grossLabour)}\n`;
      text += `Materials: ${formatCurrency(res.materials)}\n`;
      text += `CIS Deduction (${cisRate}%): -${formatCurrency(res.cisDeduction)}\n`;
      text += `Net Labour: ${formatCurrency(res.netLabour)}\n`;
      text += `Subtotal: ${formatCurrency(res.subtotal)}\n`;
      if (includeVAT) text += `VAT (20%): ${formatCurrency(res.vatAmount)}\n`;
      text += `\nTotal to Pay Subcontractor: ${formatCurrency(res.grandTotal)}\n`;
      text += `CIS to Pay HMRC: ${formatCurrency(res.hmrcPayment)}`;
    } else {
      const res = results as NetToGrossResults;
      text += `Required Net Labour: ${formatCurrency(res.netLabour)}\n`;
      text += `Required Gross Labour: ${formatCurrency(res.requiredGrossLabour)}\n`;
      text += `CIS Deduction (${cisRate}%): -${formatCurrency(res.cisDeduction)}\n`;
      text += `Materials: ${formatCurrency(res.materials)}\n`;
      text += `\nInvoice Amount: ${formatCurrency(res.invoiceAmount)}\n`;
      text += `Total Payment (inc VAT): ${formatCurrency(res.grandTotal)}\n`;
      text += `CIS to Pay HMRC: ${formatCurrency(res.hmrcPayment)}`;
    }

    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const resetCalculator = () => {
    setLabourAmount('');
    setMaterialsAmount('');
    setCisRate(20);
    setIncludeVAT(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
      <style>{`
        .mode-toggle { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px; }
        .mode-btn { display: flex; flex-direction: column; align-items: center; padding: 20px; border: 2px solid #e5e7eb; border-radius: 12px; background: white; cursor: pointer; transition: all 0.3s; font-size: 16px; font-weight: 600; color: #374151; }
        .mode-btn:hover { border-color: #667eea; background: #f9fafb; }
        .mode-btn.active { border-color: #667eea; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .mode-description { font-size: 13px; font-weight: 400; margin-top: 5px; opacity: 0.8; }
        .input-section { background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 30px; margin-bottom: 30px; }
        .input-group { margin-bottom: 25px; }
        .input-group label { display: flex; align-items: center; gap: 8px; font-weight: 600; color: #374151; margin-bottom: 8px; font-size: 14px; }
        .input-wrapper { position: relative; display: flex; align-items: center; }
        .currency-symbol, .percentage-symbol { position: absolute; left: 15px; color: #6b7280; font-weight: 500; pointer-events: none; }
        .percentage-symbol { left: auto; right: 15px; }
        .input-wrapper input { width: 100%; padding: 12px 15px 12px 35px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px; }
        .input-wrapper input:focus { outline: none; border-color: #667eea; }
        .help-text { display: block; margin-top: 6px; font-size: 13px; color: #6b7280; }
        .results-section { background: white; border: 1px solid #e5e7eb; border-radius: 12px; padding: 30px; margin-bottom: 30px; }
        .results-grid { display: grid; gap: 15px; }
        .result-item { display: flex; justify-content: space-between; padding: 15px; background: #f9fafb; border-radius: 8px; }
        .result-label { font-size: 14px; color: #6b7280; font-weight: 500; }
        .result-value { font-size: 16px; font-weight: 600; color: #1f2937; }
        .result-value.large { font-size: 20px; }
        .highlight-warning { background: #fef3c7; border-left: 4px solid #f59e0b; }
        .highlight-success { background: #d1fae5; border-left: 4px solid #10b981; }
        .highlight-info { background: #dbeafe; border-left: 4px solid #3b82f6; }
        .action-buttons { display: flex; gap: 10px; margin-top: 25px; flex-wrap: wrap; }
        .btn-primary, .btn-secondary { display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; }
        .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .btn-secondary { background: white; color: #374151; border: 2px solid #e5e7eb; }
        .btn-primary:hover, .btn-secondary:hover { transform: translateY(-1px); }
        .info-tips { display: grid; gap: 15px; margin-top: 30px; }
        .tip { display: flex; gap: 15px; padding: 20px; background: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 8px; }
        @media (max-width: 640px) { .mode-toggle { grid-template-columns: 1fr; } }
      `}</style>

      {/* BACK BUTTON */}
      <Link to="/" style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '8px', 
        color: '#667eea', 
        textDecoration: 'none', 
        marginBottom: '20px',
        fontSize: '14px',
        fontWeight: '500',
        transition: 'gap 0.2s'
      }}>
        ← Back to All Calculators
      </Link>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Calculator size={32} style={{ color: '#667eea', margin: '0 auto 10px' }} />
        <h1 style={{ fontSize: '32px', color: '#1f2937', margin: '10px 0' }}>CIS Tax Calculator</h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>Calculate Construction Industry Scheme deductions for contractors and subcontractors</p>
      </div>

      <div className="mode-toggle">
        <button className={`mode-btn ${mode === 'grossToNet' ? 'active' : ''}`} onClick={() => setMode('grossToNet')}>
          Contractor View
          <span className="mode-description">I'm paying a subbie</span>
        </button>
        <button className={`mode-btn ${mode === 'netToGross' ? 'active' : ''}`} onClick={() => setMode('netToGross')}>
          Subcontractor View
          <span className="mode-description">I need to invoice</span>
        </button>
      </div>

      <div className="input-section">
        <div className="input-group">
          <label>{mode === 'grossToNet' ? 'Gross Labour Amount' : 'Net Labour Required'}</label>
          <div className="input-wrapper">
            <span className="currency-symbol">£</span>
            <input type="number" placeholder="0.00" value={labourAmount} onChange={(e) => setLabourAmount(e.target.value)} min="0" step="0.01" />
          </div>
          <small className="help-text">{mode === 'grossToNet' ? 'The gross amount before CIS deduction' : 'The net amount you need to receive'}</small>
        </div>

        <div className="input-group">
          <label>Materials Amount</label>
          <div className="input-wrapper">
            <span className="currency-symbol">£</span>
            <input type="number" placeholder="0.00" value={materialsAmount} onChange={(e) => setMaterialsAmount(e.target.value)} min="0" step="0.01" />
          </div>
          <small className="help-text">Materials are exempt from CIS deductions</small>
        </div>

        <div className="input-group">
          <label>CIS Deduction Rate</label>
          <div className="input-wrapper">
            <input type="number" value={cisRate} onChange={(e) => setCisRate(parseFloat(e.target.value) || 20)} min="0" max="30" step="1" />
            <span className="percentage-symbol">%</span>
          </div>
          <small className="help-text">20% for verified, 30% for unverified subcontractors</small>
        </div>

        <div style={{ marginTop: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px' }}>
            <input type="checkbox" checked={includeVAT} onChange={(e) => setIncludeVAT(e.target.checked)} style={{ width: '18px', height: '18px' }} />
            <span>Include VAT (20%)</span>
          </label>
        </div>
      </div>

      {hasValues && (
        <div className="results-section">
          <h2 style={{ fontSize: '20px', marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #e5e7eb' }}>Calculation Results</h2>
          
          <div className="results-grid">
            {mode === 'grossToNet' ? (
              <>
                <div className="result-item"><span className="result-label">Gross Labour</span><span className="result-value">{formatCurrency((results as GrossToNetResults).grossLabour)}</span></div>
                <div className="result-item"><span className="result-label">Materials</span><span className="result-value">{formatCurrency(results.materials)}</span></div>
                <div className="result-item highlight-warning"><span className="result-label">CIS Deduction ({cisRate}%)</span><span className="result-value">-{formatCurrency(results.cisDeduction)}</span></div>
                <div className="result-item"><span className="result-label">Net Labour</span><span className="result-value">{formatCurrency((results as GrossToNetResults).netLabour)}</span></div>
                <div className="result-item"><span className="result-label">Subtotal</span><span className="result-value">{formatCurrency(results.subtotal)}</span></div>
                {includeVAT && <div className="result-item"><span className="result-label">VAT (20%)</span><span className="result-value">{formatCurrency(results.vatAmount)}</span></div>}
                <div className="result-item highlight-success"><span className="result-label">Total to Pay Subcontractor</span><span className="result-value large">{formatCurrency(results.grandTotal)}</span></div>
                <div className="result-item highlight-info"><span className="result-label">CIS to Pay HMRC</span><span className="result-value">{formatCurrency(results.hmrcPayment)}</span></div>
              </>
            ) : (
              <>
                <div className="result-item"><span className="result-label">Net Labour Required</span><span className="result-value">{formatCurrency((results as NetToGrossResults).netLabour)}</span></div>
                <div className="result-item highlight-info"><span className="result-label">Required Gross Labour</span><span className="result-value">{formatCurrency((results as NetToGrossResults).requiredGrossLabour)}</span></div>
                <div className="result-item highlight-warning"><span className="result-label">CIS Deduction ({cisRate}%)</span><span className="result-value">-{formatCurrency(results.cisDeduction)}</span></div>
                <div className="result-item"><span className="result-label">Materials</span><span className="result-value">{formatCurrency(results.materials)}</span></div>
                <div className="result-item highlight-success"><span className="result-label">Invoice Amount</span><span className="result-value large">{formatCurrency((results as NetToGrossResults).invoiceAmount)}</span></div>
                {includeVAT && <div className="result-item"><span className="result-label">Total Payment (inc VAT)</span><span className="result-value">{formatCurrency(results.grandTotal)}</span></div>}
                <div className="result-item highlight-info"><span className="result-label">CIS to HMRC</span><span className="result-value">{formatCurrency(results.hmrcPayment)}</span></div>
              </>
            )}
          </div>

          <div className="action-buttons">
            <button onClick={copyToClipboard} className="btn-secondary"><Download size={18} />Copy to Clipboard</button>
            <button onClick={resetCalculator} className="btn-secondary"><RotateCcw size={18} />Reset</button>
            <button onClick={() => setShowSaveModal(true)} className="btn-primary"><Save size={18} />Save This Calculation</button>
          </div>
        </div>
      )}

      <div className="info-tips">
        <div className="tip">
          <Lightbulb size={20} style={{ flexShrink: 0, color: '#3b82f6', marginTop: '2px' }} />
          <div><strong style={{ display: 'block', marginBottom: '5px' }}>What is CIS?</strong><p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>The Construction Industry Scheme (CIS) requires contractors to deduct tax from payments to subcontractors and pay it to HMRC.</p></div>
        </div>
        <div className="tip">
          <Lightbulb size={20} style={{ flexShrink: 0, color: '#3b82f6', marginTop: '2px' }} />
          <div><strong style={{ display: 'block', marginBottom: '5px' }}>CIS Rates</strong><p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>20% for verified subcontractors, 30% for unverified. Materials are always exempt from CIS deductions.</p></div>
        </div>
      </div>

      {showSaveModal && <SaveJobModal calculatorType="CIS Calculator" mode={mode} inputs={{ labourAmount, materialsAmount, cisRate, includeVAT }} results={results} onClose={() => setShowSaveModal(false)} />}
            {showSaveModal && <SaveJobModal calculatorType="CIS Calculator" mode={mode} inputs={{ labourAmount, materialsAmount, cisRate, includeVAT }} results={results} onClose={() => setShowSaveModal(false)} />}

      {/* EDUCATIONAL CONTENT - ADD THIS */}
      <div style={{ marginTop: '60px', padding: '40px 0', borderTop: '2px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>Complete CIS Guide for UK Construction Professionals</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>Understanding CIS Deductions</h3>
            <p style={{ color: '#4b5563', marginBottom: '12px', lineHeight: '1.6' }}>
              The Construction Industry Scheme (CIS) sets out rules for how contractors must handle payments to subcontractors. Contractors must deduct money from payments and pass it to HMRC as advance payment of the subcontractor's tax and National Insurance.
            </p>
            <ul style={{ color: '#4b5563', lineHeight: '1.8' }}>
              <li><strong>20% rate:</strong> Verified registered subcontractors</li>
              <li><strong>30% rate:</strong> Unregistered subcontractors</li>
              <li><strong>0% rate:</strong> Gross payment status (rare, requires application)</li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>What's Covered by CIS?</h3>
            <p style={{ color: '#4b5563', marginBottom: '12px', fontWeight: '600' }}>Labour costs ARE deducted:</p>
            <ul style={{ color: '#4b5563', marginBottom: '15px', lineHeight: '1.8' }}>
              <li>All wages and subcontractor payments</li>
              <li>Site supervision costs</li>
              <li>Labour-only services</li>
            </ul>
            <p style={{ color: '#4b5563', marginBottom: '12px', fontWeight: '600' }}>Materials are NOT deducted:</p>
            <ul style={{ color: '#4b5563', lineHeight: '1.8' }}>
              <li>Building materials (bricks, cement, timber, etc.)</li>
              <li>Equipment and tool costs</li>
              <li>Plant hire (when separately invoiced)</li>
            </ul>
          </div>
        </div>

        <div style={{ background: '#f0f9ff', border: '2px solid #3b82f6', borderRadius: '12px', padding: '30px', marginBottom: '30px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Lightbulb size={24} style={{ color: '#3b82f6' }} />
            CIS Monthly Returns & Deadlines
          </h3>
          <p style={{ color: '#1e40af', lineHeight: '1.6', marginBottom: '12px' }}>
            <strong>Contractors must file monthly CIS returns to HMRC by the 19th of each month</strong> following the tax month end. The CIS tax month runs from the 6th of one month to the 5th of the next.
          </p>
          <p style={{ color: '#1e40af', lineHeight: '1.6' }}>
            Late returns incur automatic penalties starting at £100 per month, increasing for repeated failures.
          </p>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>Common CIS Mistakes to Avoid</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            <div style={{ padding: '20px', background: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#92400e' }}>❌ Not verifying subcontractors before payment</h4>
              <p style={{ color: '#78350f', fontSize: '14px', margin: 0 }}>Always verify subcontractors with HMRC before making first payment. Use wrong rate = penalties.</p>
            </div>
            
            <div style={{ padding: '20px', background: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#92400e' }}>❌ Deducting CIS from materials</h4>
              <p style={{ color: '#78350f', fontSize: '14px', margin: 0 }}>Only labour is subject to CIS. Materials must be separately invoiced and paid in full.</p>
            </div>
            
            <div style={{ padding: '20px', background: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#92400e' }}>❌ Missing monthly return deadlines</h4>
              <p style={{ color: '#78350f', fontSize: '14px', margin: 0 }}>File by the 19th every month. Late filing = £100+ penalties that add up fast.</p>
            </div>
            
            <div style={{ padding: '20px', background: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#92400e' }}>❌ Poor record keeping</h4>
              <p style={{ color: '#78350f', fontSize: '14px', margin: 0 }}>HMRC requires 3+ years of CIS records. Keep payment statements, verification records, and returns.</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>For Contractors (Paying Subbies)</h3>
            <ol style={{ color: '#4b5563', lineHeight: '1.8' }}>
              <li>Verify subcontractor with HMRC before first payment</li>
              <li>Calculate gross labour amount (exclude materials)</li>
              <li>Apply correct CIS rate (20% or 30%)</li>
              <li>Deduct CIS from labour only</li>
              <li>Pay net amount to subcontractor</li>
              <li>Pay CIS deduction to HMRC via monthly return</li>
              <li>Issue CIS payment statement to subcontractor</li>
            </ol>
          </div>

          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '15px' }}>For Subcontractors (Invoicing Work)</h3>
            <ol style={{ color: '#4b5563', lineHeight: '1.8' }}>
              <li>Register for CIS with HMRC (to get 20% rate)</li>
              <li>Calculate net labour you need to receive</li>
              <li>Gross up by CIS rate to get invoice amount</li>
              <li>Separate materials from labour on invoice</li>
              <li>Show CIS deduction clearly on invoice</li>
              <li>Track all CIS deductions for tax return</li>
              <li>Claim CIS deductions back via Self Assessment</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}





