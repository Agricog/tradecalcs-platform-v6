import { useState } from 'react';
import { RotateCcw, Info } from 'lucide-react';
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
  const [showResults, setShowResults] = useState(false);

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

  const handleCalculate = () => {
    if (hasValues) {
      setShowResults(true);
    }
  };

  const resetCalculator = () => {
    setLabourAmount('');
    setMaterialsAmount('');
    setCisRate(20);
    setIncludeVAT(false);
    setShowResults(false);
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', minHeight: '100vh', padding: '40px 20px' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        
        .calc-container { max-width: 980px; margin: 0 auto; }
        
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #10b981; text-decoration: none; margin-bottom: 30px; font-size: 14px; font-weight: 500; transition: gap 0.2s; }
        .back-link:hover { gap: 12px; }
        
        .header-section { text-align: center; margin-bottom: 40px; }
        .main-title { font-size: 36px; font-weight: 700; color: white; margin: 0 0 12px 0; }
        .subtitle { font-size: 16px; color: #94a3b8; margin: 0; }
        
        .calc-card { background: #1e293b; border-radius: 16px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); margin-bottom: 30px; border: 1px solid #334155; }
        
        .section-title { font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
        
        .mode-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 32px; }
        .mode-btn { background: #0f172a; border: 2px solid #334155; border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.2s; text-align: center; }
        .mode-btn:hover { border-color: #10b981; background: rgba(16, 185, 129, 0.05); }
        .mode-btn.active { border-color: #10b981; background: rgba(16, 185, 129, 0.1); }
        .mode-title { font-size: 18px; font-weight: 600; color: white; margin-bottom: 4px; }
        .mode-desc { font-size: 13px; color: #94a3b8; }
        
        .rate-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 32px; }
        .rate-btn { background: #0f172a; border: 2px solid #334155; border-radius: 12px; padding: 18px; cursor: pointer; transition: all 0.2s; text-align: center; }
        .rate-btn:hover { border-color: #3b82f6; background: rgba(59, 130, 246, 0.05); }
        .rate-btn.active { border-color: #3b82f6; background: rgba(59, 130, 246, 0.1); }
        .rate-value { font-size: 20px; font-weight: 700; color: white; margin-bottom: 4px; }
        .rate-label { font-size: 12px; color: #94a3b8; }
        
        .input-group { margin-bottom: 24px; }
        .input-label { display: block; font-size: 14px; font-weight: 500; color: #cbd5e1; margin-bottom: 8px; }
        .input-wrapper { position: relative; }
        .input-symbol { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #64748b; font-weight: 500; pointer-events: none; }
        .input-field { width: 100%; padding: 14px 16px 14px 40px; background: #0f172a; border: 2px solid #334155; border-radius: 10px; color: white; font-size: 16px; transition: all 0.2s; }
        .input-field:focus { outline: none; border-color: #10b981; background: rgba(16, 185, 129, 0.05); }
        .input-help { display: block; margin-top: 6px; font-size: 12px; color: #64748b; }
        
        .checkbox-wrapper { display: flex; align-items: center; gap: 10px; padding: 16px; background: #0f172a; border-radius: 10px; border: 1px solid #334155; margin-bottom: 24px; }
        .checkbox-wrapper input { width: 18px; height: 18px; cursor: pointer; }
        .checkbox-label { font-size: 14px; color: #cbd5e1; font-weight: 500; }
        
        .btn-grid { display: grid; grid-template-columns: 120px 1fr; gap: 12px; }
        .btn { padding: 14px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-reset { background: #334155; color: #cbd5e1; }
        .btn-reset:hover { background: #475569; }
        .btn-calculate { background: #10b981; color: #0f172a; }
        .btn-calculate:hover { background: #059669; transform: translateY(-1px); }
        
        .results-card { background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 16px; padding: 32px; margin-top: 32px; }
        .results-title { font-size: 20px; font-weight: 700; color: white; margin: 0 0 24px 0; }
        .results-grid { display: grid; gap: 12px; }
        .result-row { display: flex; justify-content: space-between; padding: 16px; background: rgba(15, 23, 42, 0.4); border-radius: 10px; backdrop-filter: blur(10px); }
        .result-row.highlight { background: rgba(15, 23, 42, 0.6); border: 2px solid rgba(255, 255, 255, 0.2); }
        .result-label { font-size: 14px; color: rgba(255, 255, 255, 0.9); font-weight: 500; }
        .result-value { font-size: 18px; color: white; font-weight: 700; }
        
        .info-section { background: #1e293b; border-radius: 16px; padding: 32px; margin-top: 40px; border: 1px solid #334155; }
        .info-title { font-size: 18px; font-weight: 600; color: white; margin: 0 0 16px 0; display: flex; align-items: center; gap: 10px; }
        .info-card { background: #0f172a; border-radius: 12px; padding: 20px; margin-bottom: 12px; border-left: 4px solid #3b82f6; }
        .info-card-title { font-size: 15px; font-weight: 600; color: #3b82f6; margin-bottom: 8px; }
        .info-card-text { font-size: 13px; color: #94a3b8; line-height: 1.6; margin: 0; }
        
        @media (max-width: 768px) {
          .mode-grid, .rate-grid { grid-template-columns: 1fr; }
          .btn-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="calc-container">
        <Link to="/" className="back-link">
          ← Back to All Calculators
        </Link>

        <div className="header-section">
          <h1 className="main-title">CIS Tax Calculator</h1>
          <p className="subtitle">Calculate Construction Industry Scheme deductions for contractors and subcontractors</p>
        </div>

        <div className="calc-card">
          <div className="section-title">Calculator Mode</div>
          <div className="mode-grid">
            <div className={`mode-btn ${mode === 'grossToNet' ? 'active' : ''}`} onClick={() => setMode('grossToNet')}>
              <div className="mode-title">Gross to Net</div>
              <div className="mode-desc">Calculate what you'll receive after CIS</div>
            </div>
            <div className={`mode-btn ${mode === 'netToGross' ? 'active' : ''}`} onClick={() => setMode('netToGross')}>
              <div className="mode-title">Net to Gross</div>
              <div className="mode-desc">Calculate what to quote for desired take-home</div>
            </div>
          </div>

          <div className="section-title">Your CIS Status</div>
          <div className="rate-grid">
            <div className={`rate-btn ${cisRate === 20 ? 'active' : ''}`} onClick={() => setCisRate(20)}>
              <div className="rate-value">Standard 20%</div>
              <div className="rate-label">Most subcontractors</div>
            </div>
            <div className={`rate-btn ${cisRate === 30 ? 'active' : ''}`} onClick={() => setCisRate(30)}>
              <div className="rate-value">Higher 30%</div>
              <div className="rate-label">Non-registered</div>
            </div>
            <div className={`rate-btn ${cisRate === 0 ? 'active' : ''}`} onClick={() => setCisRate(0)}>
              <div className="rate-value">Gross Payment 0%</div>
              <div className="rate-label">CIS registered</div>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Gross Labour Amount</label>
            <div className="input-wrapper">
              <span className="input-symbol">£</span>
              <input 
                type="number" 
                className="input-field" 
                placeholder="0.00"
                value={labourAmount}
                onChange={(e) => setLabourAmount(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <small className="input-help">The labour amount before CIS deduction</small>
          </div>

          <div className="input-group">
            <label className="input-label">Materials (Optional)</label>
            <div className="input-wrapper">
              <span className="input-symbol">£</span>
              <input 
                type="number" 
                className="input-field" 
                placeholder="0.00"
                value={materialsAmount}
                onChange={(e) => setMaterialsAmount(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
            <small className="input-help">Materials are NOT subject to CIS deduction</small>
          </div>

          <div className="checkbox-wrapper">
            <input 
              type="checkbox" 
              id="vat-checkbox"
              checked={includeVAT}
              onChange={(e) => setIncludeVAT(e.target.checked)}
            />
            <label htmlFor="vat-checkbox" className="checkbox-label">Include VAT (20%)</label>
          </div>

          <div className="btn-grid">
            <button className="btn btn-reset" onClick={resetCalculator}>
              <RotateCcw size={18} /> Reset
            </button>
            <button className="btn btn-calculate" onClick={handleCalculate}>
              📊 Show Breakdown
            </button>
          </div>

          {showResults && hasValues && (
            <div className="results-card">
              <h3 className="results-title">💰 Calculation Breakdown</h3>
              <div className="results-grid">
                {mode === 'grossToNet' ? (
                  <>
                    <div className="result-row">
                      <span className="result-label">Gross Labour</span>
                      <span className="result-value">{formatCurrency((results as GrossToNetResults).grossLabour)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">Materials</span>
                      <span className="result-value">{formatCurrency(results.materials)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">CIS Deduction ({cisRate}%)</span>
                      <span className="result-value">-{formatCurrency(results.cisDeduction)}</span>
                    </div>
                    <div className="result-row highlight">
                      <span className="result-label">Total to Receive</span>
                      <span className="result-value">{formatCurrency(results.grandTotal)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">CIS to HMRC</span>
                      <span className="result-value">{formatCurrency(results.hmrcPayment)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="result-row">
                      <span className="result-label">Net Labour Required</span>
                      <span className="result-value">{formatCurrency((results as NetToGrossResults).netLabour)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">Required Gross Labour</span>
                      <span className="result-value">{formatCurrency((results as NetToGrossResults).requiredGrossLabour)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">Materials</span>
                      <span className="result-value">{formatCurrency(results.materials)}</span>
                    </div>
                    <div className="result-row highlight">
                      <span className="result-label">Invoice Amount</span>
                      <span className="result-value">{formatCurrency((results as NetToGrossResults).invoiceAmount)}</span>
                    </div>
                    <div className="result-row">
                      <span className="result-label">CIS to HMRC</span>
                      <span className="result-value">{formatCurrency(results.hmrcPayment)}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="info-section">
          <h3 className="info-title">
            <Info size={22} style={{ color: '#3b82f6' }} />
            Understanding CIS Rates
          </h3>
          
          <div className="info-card">
            <div className="info-card-title">20% Standard Rate</div>
            <p className="info-card-text">For registered subcontractors with valid CIS status. Most common rate.</p>
          </div>

          <div className="info-card">
            <div className="info-card-title">30% Higher Rate</div>
            <p className="info-card-text">For subcontractors not registered for CIS. Register to reduce to 20%.</p>
          </div>

          <div className="info-card">
            <div className="info-card-title">0% Gross Payment</div>
            <p className="info-card-text">For CIS-registered businesses with gross payment status (requires application).</p>
          </div>
        </div>
      </div>

      {showSaveModal && <SaveJobModal calculatorType="CIS Calculator" mode={mode} inputs={{ labourAmount, materialsAmount, cisRate, includeVAT }} results={results} onClose={() => setShowSaveModal(false)} />}
    </div>
  );
}






