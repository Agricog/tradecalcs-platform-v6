import React, { useState } from 'react';
import { Calculator, Info, Download, RotateCcw, Lightbulb, Save } from 'lucide-react';
import SaveJobModal from './SaveJobModal';

export default function CISCalculator() {
  const [mode, setMode] = useState('grossToNet');
  const [cisRate, setCisRate] = useState(20);
  const [labourAmount, setLabourAmount] = useState('');
  const [materialsAmount, setMaterialsAmount] = useState('');
  const [includeVAT, setIncludeVAT] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const VAT_RATE = 0.20;

  const calculateGrossToNet = () => {
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

  const calculateNetToGross = () => {
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const copyToClipboard = () => {
    let text = `CIS Calculation Summary\n`;
    text += `======================\n\n`;
    
    if (mode === 'grossToNet') {
      text += `Gross Labour: ${formatCurrency(results.grossLabour)}\n`;
      text += `Materials: ${formatCurrency(results.materials)}\n`;
      text += `CIS Deduction (${cisRate}%): -${formatCurrency(results.cisDeduction)}\n`;
      text += `Net Labour: ${formatCurrency(results.netLabour)}\n`;
      text += `Subtotal: ${formatCurrency(results.subtotal)}\n`;
      if (includeVAT) {
        text += `VAT (20%): ${formatCurrency(results.vatAmount)}\n`;
      }
      text += `\nTotal to Pay Subcontractor: ${formatCurrency(results.grandTotal)}\n`;
      text += `CIS to Pay HMRC: ${formatCurrency(results.hmrcPayment)}`;
    } else {
      text += `Required Net Labour: ${formatCurrency(results.netLabour)}\n`;
      text += `Required Gross Labour: ${formatCurrency(results.requiredGrossLabour)}\n`;
      text += `CIS Deduction (${cisRate}%): -${formatCurrency(results.cisDeduction)}\n`;
      text += `Materials: ${formatCurrency(results.materials)}\n`;
      text += `\nInvoice Amount: ${formatCurrency(results.invoiceAmount)}\n`;
      text += `Total Payment (inc VAT): ${formatCurrency(results.grandTotal)}\n`;
      text += `CIS to Pay HMRC: ${formatCurrency(results.hmrcPayment)}`;
    }

    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const resetCalculator = () => {
    setLabourAmount('');
    setMaterialsAmount('');
    setCisRate(20);
    setIncludeVAT(false);
    setShowBreakdown(false);
  };

  return (
    <div className="cis-calculator-container">
      <div className="calculator-header">
        <Calculator size={32} className="header-icon" />
        <h1>CIS Tax Calculator</h1>
        <p className="subtitle">Calculate Construction Industry Scheme deductions for contractors and subcontractors</p>
      </div>

      {/* Mode Toggle */}
      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === 'grossToNet' ? 'active' : ''}`}
          onClick={() => setMode('grossToNet')}
        >
          Contractor View
          <span className="mode-description">I'm paying a subbie</span>
        </button>
        <button
          className={`mode-btn ${mode === 'netToGross' ? 'active' : ''}`}
          onClick={() => setMode('netToGross')}
        >
          Subcontractor View
          <span className="mode-description">I need to invoice</span>
        </button>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <div className="input-group">
          <label htmlFor="labour">
            {mode === 'grossToNet' ? 'Gross Labour Amount' : 'Net Labour Required'}
            <Info size={16} className="info-icon" title="Labour costs are subject to CIS deduction" />
          </label>
          <div className="input-wrapper">
            <span className="currency-symbol">£</span>
            <input
              id="labour"
              type="number"
              placeholder="0.00"
              value={labourAmount}
              onChange={(e) => setLabourAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <small className="help-text">
            {mode === 'grossToNet' 
              ? 'The gross amount before CIS deduction' 
              : 'The net amount you need to receive'}
          </small>
        </div>

        <div className="input-group">
          <label htmlFor="materials">
            Materials Amount
            <Info size={16} className="info-icon" title="Materials are NOT subject to CIS deduction" />
          </label>
          <div className="input-wrapper">
            <span className="currency-symbol">£</span>
            <input
              id="materials"
              type="number"
              placeholder="0.00"
              value={materialsAmount}
              onChange={(e) => setMaterialsAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </div>
          <small className="help-text">Materials are exempt from CIS deductions</small>
        </div>

        <div className="input-group">
          <label htmlFor="cisRate">
            CIS Deduction Rate
            <Info size={16} className="info-icon" title="Standard rate is 20%, unverified rate is 30%" />
          </label>
          <div className="input-wrapper">
            <input
              id="cisRate"
              type="number"
              value={cisRate}
              onChange={(e) => setCisRate(parseFloat(e.target.value))}
              min="0"
              max="30"
              step="1"
            />
            <span className="percentage-symbol">%</span>
          </div>
          <small className="help-text">20% for verified, 30% for unverified subcontractors</small>
        </div>

        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={includeVAT}
              onChange={(e) => setIncludeVAT(e.target.checked)}
            />
            <span>Include VAT (20%)</span>
          </label>
        </div>
      </div>

      {/* Results Section */}
      {hasValues && (
        <div className="results-section">
          <h2>Calculation Results</h2>
          
          {mode === 'grossToNet' ? (
            <div className="results-grid">
              <div className="result-item">
                <span className="result-label">Gross Labour</span>
                <span className="result-value">{formatCurrency(results.grossLabour)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Materials</span>
                <span className="result-value">{formatCurrency(results.materials)}</span>
              </div>
              <div className="result-item highlight-warning">
                <span className="result-label">CIS Deduction ({cisRate}%)</span>
                <span className="result-value">-{formatCurrency(results.cisDeduction)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Net Labour</span>
                <span className="result-value">{formatCurrency(results.netLabour)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Subtotal</span>
                <span className="result-value">{formatCurrency(results.subtotal)}</span>
              </div>
              {includeVAT && (
                <div className="result-item">
                  <span className="result-label">VAT (20%)</span>
                  <span className="result-value">{formatCurrency(results.vatAmount)}</span>
                </div>
              )}
              <div className="result-item highlight-success">
                <span className="result-label">Total to Pay Subcontractor</span>
                <span className="result-value large">{formatCurrency(results.grandTotal)}</span>
              </div>
              <div className="result-item highlight-info">
                <span className="result-label">CIS to Pay HMRC</span>
                <span className="result-value">{formatCurrency(results.hmrcPayment)}</span>
              </div>
            </div>
          ) : (
            <div className="results-grid">
              <div className="result-item">
                <span className="result-label">Net Labour Required</span>
                <span className="result-value">{formatCurrency(results.netLabour)}</span>
              </div>
              <div className="result-item highlight-info">
                <span className="result-label">Required Gross Labour</span>
                <span className="result-value">{formatCurrency(results.requiredGrossLabour)}</span>
              </div>
              <div className="result-item highlight-warning">
                <span className="result-label">CIS Deduction ({cisRate}%)</span>
                <span className="result-value">-{formatCurrency(results.cisDeduction)}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Materials</span>
                <span className="result-value">{formatCurrency(results.materials)}</span>
              </div>
              <div className="result-item highlight-success">
                <span className="result-label">Invoice Amount</span>
                <span className="result-value large">{formatCurrency(results.invoiceAmount)}</span>
              </div>
              {includeVAT && (
                <>
                  <div className="result-item">
                    <span className="result-label">VAT (20%)</span>
                    <span className="result-value">{formatCurrency(results.vatAmount)}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Total Payment (inc VAT)</span>
                    <span className="result-value">{formatCurrency(results.grandTotal)}</span>
                  </div>
                </>
              )}
              <div className="result-item highlight-info">
                <span className="result-label">CIS to HMRC</span>
                <span className="result-value">{formatCurrency(results.hmrcPayment)}</span>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={copyToClipboard} className="btn-secondary">
              <Download size={18} />
              Copy to Clipboard
            </button>
            <button onClick={resetCalculator} className="btn-secondary">
              <RotateCcw size={18} />
              Reset
            </button>
            <button 
              onClick={() => setShowSaveModal(true)} 
              className="btn-primary"
            >
              <Save size={18} />
              Save This Calculation
            </button>
          </div>
        </div>
      )}

      {/* Info Tips */}
      <div className="info-tips">
        <div className="tip">
          <Lightbulb size={20} />
          <div>
            <strong>What is CIS?</strong>
            <p>The Construction Industry Scheme (CIS) requires contractors to deduct tax from payments to subcontractors and pay it to HMRC.</p>
          </div>
        </div>
        <div className="tip">
          <Lightbulb size={20} />
          <div>
            <strong>CIS Rates</strong>
            <p>20% for verified subcontractors, 30% for unverified. Materials are always exempt from CIS deductions.</p>
          </div>
        </div>
        <div className="tip">
          <Lightbulb size={20} />
          <div>
            <strong>Monthly Returns</strong>
            <p>CIS deductions must be reported to HMRC monthly by the 19th of each month following the tax month end.</p>
          </div>
        </div>
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <SaveJobModal
          calculatorType="CIS Calculator"
          mode={mode}
          inputs={{
            labourAmount,
            materialsAmount,
            cisRate,
            includeVAT
          }}
          results={results}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </div>
  );
}
