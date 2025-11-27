import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { RotateCcw, Info, AlertCircle } from 'lucide-react';
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
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>CIS Tax Calculator UK | Construction Industry Scheme Calculator | TradeCalcs</title>
        <meta 
          name="description" 
          content="Free CIS tax calculator for UK construction professionals. Calculate CIS deductions, gross to net payments, and invoice amounts. HMRC compliant with 20% and 30% rates." 
        />
        <meta name="keywords" content="CIS calculator, CIS tax calculator, construction industry scheme, CIS deductions, UK subcontractor tax, HMRC CIS, gross to net calculator, subcontractor payments, construction tax" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="CIS Tax Calculator UK | Construction Industry Scheme Calculator" />
        <meta property="og:description" content="Calculate CIS deductions, gross to net payments, and invoice amounts. Free HMRC compliant calculator for UK construction." />
        <meta property="og:url" content="https://tradecalcs.co.uk/cis-calculator" />
        <meta property="og:image" content="https://tradecalcs.co.uk/images/cis-calculator-og.jpg" />
        <meta property="og:site_name" content="TradeCalcs" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CIS Tax Calculator UK | TradeCalcs" />
        <meta name="twitter:description" content="Free CIS tax calculator for UK construction. HMRC compliant with instant results." />
        <meta name="twitter:image" content="https://tradecalcs.co.uk/images/cis-calculator-og.jpg" />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/cis-calculator" />
        <meta name="author" content="TradeCalcs" />
        <meta name="theme-color" content="#10b981" />

        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                'itemListElement': [
                  { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://tradecalcs.co.uk' },
                  { '@type': 'ListItem', 'position': 2, 'name': 'Calculators', 'item': 'https://tradecalcs.co.uk/calculators' },
                  { '@type': 'ListItem', 'position': 3, 'name': 'CIS Calculator', 'item': 'https://tradecalcs.co.uk/cis-calculator' }
                ]
              },
              {
                '@type': 'SoftwareApplication',
                'name': 'CIS Tax Calculator UK',
                'description': 'Professional CIS (Construction Industry Scheme) calculator for UK contractors and subcontractors. Calculate CIS deductions, gross to net payments, invoice amounts, and HMRC payments with 20% and 30% rates.',
                'applicationCategory': 'Utility',
                'url': 'https://tradecalcs.co.uk/cis-calculator',
                'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'GBP' },
                'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.8', 'ratingCount': '1,156' }
              },
              {
                '@type': 'FAQPage',
                'mainEntity': [
                  {
                    '@type': 'Question',
                    'name': 'What is CIS and how does it work?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'CIS (Construction Industry Scheme) is a tax system for UK construction. Contractors must deduct 20% (or 30% for unregistered subcontractors) from payments to subcontractors and pass it to HMRC as advance tax payment. Materials are not subject to CIS - only labour costs.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is the difference between 20% and 30% CIS rates?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': '20% rate applies to registered subcontractors verified with HMRC. 30% rate applies to unregistered subcontractors or those without valid CIS status. Registering for CIS reduces your rate from 30% to 20%, saving money on each job.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'Are materials subject to CIS deduction?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'No. CIS only applies to labour costs. Materials including bricks, cement, timber, tools, equipment, and plant hire are NOT subject to CIS deduction. Contractors must pay the full materials amount - only labour is reduced by CIS.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'How do I claim back CIS deductions?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'CIS deductions are advance payments of your tax and National Insurance. You claim them back when filing your Self Assessment tax return. The amount deducted reduces your tax bill. If you overpay, you receive a refund from HMRC.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'When do contractors need to file CIS returns?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Contractors must file monthly CIS returns to HMRC by the 19th of each month following the tax month end (6th to 5th). Late filing incurs automatic penalties starting at £100 per month. Accurate record-keeping is essential for 3+ years.'
                    }
                  },
                  {
                    '@type': 'Question',
                    'name': 'What is gross payment status for CIS?',
                    'acceptedAnswer': {
                      '@type': 'Answer',
                      'text': 'Gross payment status (0% CIS) is available to established CIS-registered businesses meeting strict criteria. You receive payment without CIS deduction, making cash flow easier. Requires application to HMRC and must be renewed annually. Limited availability.'
                    }
                  }
                ]
              },
              {
                '@type': 'Organization',
                'name': 'TradeCalcs',
                'url': 'https://tradecalcs.co.uk',
                'logo': 'https://tradecalcs.co.uk/logo.png',
                'contactPoint': {
                  '@type': 'ContactPoint',
                  'contactType': 'Customer Support',
                  'email': 'mick@tradecalcs.co.uk'
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <div style={{ background: '#f1f5f9', minHeight: '100vh', padding: '40px 20px' }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
          
          .calc-container { max-width: 980px; margin: 0 auto; }
          
          .back-link { display: inline-flex; align-items: center; gap: 8px; color: #10b981; text-decoration: none; margin-bottom: 30px; font-size: 14px; font-weight: 500; transition: gap 0.2s; }
          .back-link:hover { gap: 12px; }
          
          .header-section { text-align: center; margin-bottom: 40px; }
          .main-title { font-size: 36px; font-weight: 700; color: #1e293b; margin: 0 0 12px 0; }
          .subtitle { font-size: 16px; color: #64748b; margin: 0; }
          
          .calc-card { background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); margin-bottom: 30px; border: 1px solid #e2e8f0; }
          
          .section-title { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
          
          .mode-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 32px; }
          .mode-btn { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; cursor: pointer; transition: all 0.2s; text-align: center; }
          .mode-btn:hover { border-color: #10b981; background: rgba(16, 185, 129, 0.05); }
          .mode-btn.active { border-color: #10b981; background: rgba(16, 185, 129, 0.1); }
          .mode-title { font-size: 18px; font-weight: 600; color: #1e293b; margin-bottom: 4px; }
          .mode-desc { font-size: 13px; color: #64748b; }
          
          .rate-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 32px; }
          .rate-btn { background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 12px; padding: 18px; cursor: pointer; transition: all 0.2s; text-align: center; }
          .rate-btn:hover { border-color: #3b82f6; background: rgba(59, 130, 246, 0.05); }
          .rate-btn.active { border-color: #3b82f6; background: rgba(59, 130, 246, 0.1); }
          .rate-value { font-size: 20px; font-weight: 700; color: #1e293b; margin-bottom: 4px; }
          .rate-label { font-size: 12px; color: #64748b; }
          
          .input-group { margin-bottom: 24px; }
          .input-label { display: block; font-size: 14px; font-weight: 500; color: #475569; margin-bottom: 8px; }
          .input-wrapper { position: relative; }
          .input-symbol { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: #94a3b8; font-weight: 500; pointer-events: none; }
          .input-field { width: 100%; padding: 14px 16px 14px 40px; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 10px; color: #1e293b; font-size: 16px; transition: all 0.2s; }
          .input-field:focus { outline: none; border-color: #10b981; background: white; }
          .input-help { display: block; margin-top: 6px; font-size: 12px; color: #64748b; }
          
          .checkbox-wrapper { display: flex; align-items: center; gap: 10px; padding: 16px; background: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 24px; }
          .checkbox-wrapper input { width: 18px; height: 18px; cursor: pointer; }
          .checkbox-label { font-size: 14px; color: #475569; font-weight: 500; }
          
          .btn-grid { display: grid; grid-template-columns: 120px 1fr; gap: 12px; }
          .btn { padding: 14px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; display: flex; align-items: center; justify-content: center; gap: 8px; }
          .btn-reset { background: #e2e8f0; color: #475569; }
          .btn-reset:hover { background: #cbd5e1; }
          .btn-calculate { background: #10b981; color: white; }
          .btn-calculate:hover { background: #059669; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); }
          
          .results-card { background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 16px; padding: 32px; margin-top: 32px; }
          .results-title { font-size: 20px; font-weight: 700; color: white; margin: 0 0 24px 0; }
          .results-grid { display: grid; gap: 12px; }
          .result-row { display: flex; justify-content: space-between; padding: 16px; background: rgba(255, 255, 255, 0.15); border-radius: 10px; backdrop-filter: blur(10px); }
          .result-row.highlight { background: rgba(255, 255, 255, 0.25); border: 2px solid rgba(255, 255, 255, 0.3); }
          .result-label { font-size: 14px; color: white; font-weight: 500; }
          .result-value { font-size: 18px; color: white; font-weight: 700; }
          
          .info-section { background: white; border-radius: 16px; padding: 32px; margin-top: 40px; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
          .info-title { font-size: 18px; font-weight: 600; color: #1e293b; margin: 0 0 16px 0; display: flex; align-items: center; gap: 10px; }
          .info-card { background: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 12px; border-left: 4px solid #3b82f6; }
          .info-card-title { font-size: 15px; font-weight: 600; color: #3b82f6; margin-bottom: 8px; }
          .info-card-text { font-size: 13px; color: #64748b; line-height: 1.6; margin: 0; }
          
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
              <div 
                className={`mode-btn ${mode === 'grossToNet' ? 'active' : ''}`} 
                onClick={() => setMode('grossToNet')}
                role="button"
                tabIndex={0}
                aria-label="Select Gross to Net calculation mode"
              >
                <div className="mode-title">Gross to Net</div>
                <div className="mode-desc">Calculate what you'll receive after CIS</div>
              </div>
              <div 
                className={`mode-btn ${mode === 'netToGross' ? 'active' : ''}`} 
                onClick={() => setMode('netToGross')}
                role="button"
                tabIndex={0}
                aria-label="Select Net to Gross calculation mode"
              >
                <div className="mode-title">Net to Gross</div>
                <div className="mode-desc">Calculate what to quote for desired take-home</div>
              </div>
            </div>

            <div className="section-title">Your CIS Status</div>
            <div className="rate-grid">
              <div 
                className={`rate-btn ${cisRate === 20 ? 'active' : ''}`} 
                onClick={() => setCisRate(20)}
                role="button"
                tabIndex={0}
                aria-label="Select 20% standard CIS rate"
              >
                <div className="rate-value">Standard 20%</div>
                <div className="rate-label">Registered subcontractors</div>
              </div>
              <div 
                className={`rate-btn ${cisRate === 30 ? 'active' : ''}`} 
                onClick={() => setCisRate(30)}
                role="button"
                tabIndex={0}
                aria-label="Select 30% higher CIS rate"
              >
                <div className="rate-value">Higher 30%</div>
                <div className="rate-label">Unregistered</div>
              </div>
              <div 
                className={`rate-btn ${cisRate === 0 ? 'active' : ''}`} 
                onClick={() => setCisRate(0)}
                role="button"
                tabIndex={0}
                aria-label="Select 0% gross payment CIS rate"
              >
                <div className="rate-value">Gross Payment 0%</div>
                <div className="rate-label">Approved status</div>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="labour-input">Gross Labour Amount</label>
              <div className="input-wrapper">
                <span className="input-symbol">£</span>
                <input 
                  id="labour-input"
                  type="number" 
                  className="input-field" 
                  placeholder="0.00"
                  value={labourAmount}
                  onChange={(e) => setLabourAmount(e.target.value)}
                  min="0"
                  step="0.01"
                  aria-label="Gross labour amount"
                />
              </div>
              <small className="input-help">The labour amount before CIS deduction</small>
            </div>

            <div className="input-group">
              <label className="input-label" htmlFor="materials-input">Materials (Optional)</label>
              <div className="input-wrapper">
                <span className="input-symbol">£</span>
                <input 
                  id="materials-input"
                  type="number" 
                  className="input-field" 
                  placeholder="0.00"
                  value={materialsAmount}
                  onChange={(e) => setMaterialsAmount(e.target.value)}
                  min="0"
                  step="0.01"
                  aria-label="Materials amount"
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
                aria-label="Include VAT in calculation"
              />
              <label htmlFor="vat-checkbox" className="checkbox-label">Include VAT (20%)</label>
            </div>

            <div className="btn-grid">
              <button className="btn btn-reset" onClick={resetCalculator} aria-label="Reset calculator">
                <RotateCcw size={18} /> Reset
              </button>
              <button className="btn btn-calculate" onClick={handleCalculate} aria-label="Calculate CIS breakdown">
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
                      {includeVAT && (
                        <div className="result-row">
                          <span className="result-label">VAT (20%)</span>
                          <span className="result-value">{formatCurrency(results.vatAmount)}</span>
                        </div>
                      )}
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
                      {includeVAT && (
                        <div className="result-row">
                          <span className="result-label">VAT (20%)</span>
                          <span className="result-value">{formatCurrency(results.vatAmount)}</span>
                        </div>
                      )}
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
              Understanding CIS Rates &amp; Status
            </h3>
            
            <div className="info-card">
              <div className="info-card-title">✓ 20% Standard Rate</div>
              <p className="info-card-text">For registered subcontractors with valid CIS verification. Must have proof of registration with HMRC. Most common rate used in UK construction.</p>
            </div>

            <div className="info-card">
              <div className="info-card-title">⚠️ 30% Higher Rate</div>
              <p className="info-card-text">For subcontractors not registered for CIS with HMRC. Register to reduce to 20%. Costs less money compared to 30% deductions on large projects.</p>
            </div>

            <div className="info-card">
              <div className="info-card-title">🏆 0% Gross Payment</div>
              <p className="info-card-text">For CIS-registered businesses with approved gross payment status. Rare and requires application. Must renew annually. Best cash flow option for established businesses.</p>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', padding: '40px', marginTop: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '30px', textAlign: 'center' }}>Complete CIS Guide for UK Construction Professionals</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '15px' }}>Understanding CIS Deductions</h3>
                <p style={{ color: '#64748b', marginBottom: '12px', lineHeight: '1.6' }}>
                  The Construction Industry Scheme (CIS) is mandatory for UK construction projects. Contractors (main builders) must deduct money from payments to subcontractors and pass it to HMRC as advance payment of the subcontractor's tax and National Insurance. This applies whether work is on-site or off-site.
                </p>
                <ul style={{ color: '#64748b', lineHeight: '1.8' }}>
                  <li><strong style={{ color: '#475569' }}>20% rate:</strong> Verified registered subcontractors (most common)</li>
                  <li><strong style={{ color: '#475569' }}>30% rate:</strong> Unregistered or non-verified subcontractors</li>
                  <li><strong style={{ color: '#475569' }}>0% rate:</strong> Gross payment status (requires HMRC approval, limited availability)</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '15px' }}>What's Covered by CIS?</h3>
                <p style={{ color: '#475569', marginBottom: '12px', fontWeight: '600' }}>✓ Labour costs ARE deducted (CIS applies):</p>
                <ul style={{ color: '#64748b', marginBottom: '15px', lineHeight: '1.8' }}>
                  <li>All wages and subcontractor labour payments</li>
                  <li>Site supervision and management costs</li>
                  <li>Labour-only services</li>
                  <li>Professional labour (electricians, plumbers, etc.)</li>
                </ul>
                <p style={{ color: '#475569', marginBottom: '12px', fontWeight: '600' }}>✗ Materials are NOT deducted (paid in full):</p>
                <ul style={{ color: '#64748b', lineHeight: '1.8' }}>
                  <li>Building materials (bricks, cement, timber, stone, etc.)</li>
                  <li>Equipment and tool costs</li>
                  <li>Plant hire (when separately invoiced)</li>
                  <li>Supplies and consumables</li>
                </ul>
              </div>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid #3b82f6', borderRadius: '12px', padding: '30px', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#3b82f6', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertCircle size={22} />
                💡 CIS Monthly Returns &amp; Important Deadlines
              </h3>
              <p style={{ color: '#1e40af', lineHeight: '1.6', marginBottom: '12px' }}>
                <strong>Contractors must file monthly CIS returns to HMRC by the 19th of each month</strong> following the tax month end (6th to 5th). Returns are mandatory whether payments were made or not.
              </p>
              <p style={{ color: '#1e40af', lineHeight: '1.6', marginBottom: '12px' }}>
                Late returns incur automatic penalties: £100 first month, increasing for repeated failures. Second failure same year: £500. Persistent failure can stop contractor working.
              </p>
              <p style={{ color: '#1e40af', lineHeight: '1.6' }}>
                <strong>Subcontractors must provide invoices, CIS statements, and proof of verification to contractors.</strong> Keep all payment records, CIS statements, and correspondence for 6+ years minimum.
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '20px' }}>Common CIS Mistakes to Avoid</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div style={{ padding: '20px', background: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#92400e' }}>❌ Not verifying subcontractors before payment</h4>
                  <p style={{ color: '#78350f', fontSize: '14px', margin: 0 }}>Always verify subcontractors with HMRC CIS register before making first payment. Using wrong rate = penalties up to £3,000+.</p>
                </div>
                
                <div style={{ padding: '20px', background: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#92400e' }}>❌ Deducting CIS from materials</h4>
                  <p style={{ color: '#78350f', fontSize: '14px', margin: 0 }}>Only labour is subject to CIS. Materials must be separately invoiced and paid in full. Mixed invoices = penalties.</p>
                </div>
                
                <div style={{ padding: '20px', background: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#92400e' }}>❌ Missing monthly return deadlines</h4>
                  <p style={{ color: '#78350f', fontSize: '14px', margin: 0 }}>File by the 19th every month. Late filing = automatic £100+ penalties. Repeated failure can lose contractor status.</p>
                </div>
                
                <div style={{ padding: '20px', background: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#92400e' }}>❌ Poor record keeping</h4>
                  <p style={{ color: '#78350f', fontSize: '14px', margin: 0 }}>HMRC requires 6+ years of CIS records. Keep payment statements, verification records, returns, and subcontractor details.</p>
                </div>

                <div style={{ padding: '20px', background: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '8px' }}>
                  <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px', color: '#92400e' }}>❌ Not issuing CIS payment statements</h4>
                  <p style={{ color: '#78350f', fontSize: '14px', margin: 0 }}>Contractors must issue monthly CIS payment statements to subcontractors showing gross amount, CIS deduction, and net paid.</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '15px' }}>For Contractors (Paying Subbies)</h3>
                <ol style={{ color: '#64748b', lineHeight: '1.8' }}>
                  <li>Verify each subcontractor with HMRC before first payment</li>
                  <li>Calculate gross labour amount (materials separate)</li>
                  <li>Apply correct CIS rate (20% or 30%)</li>
                  <li>Deduct CIS from labour ONLY</li>
                  <li>Pay net amount + full materials to subcontractor</li>
                  <li>Issue CIS payment statement monthly</li>
                  <li>File monthly CIS return with HMRC by 19th</li>
                  <li>Pay HMRC CIS deductions monthly</li>
                  <li>Keep records for 6+ years minimum</li>
                </ol>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', marginBottom: '15px' }}>For Subcontractors (Invoicing Work)</h3>
                <ol style={{ color: '#64748b', lineHeight: '1.8' }}>
                  <li>Register for CIS with HMRC to qualify for 20% rate</li>
                  <li>Get valid CIS verification certificate</li>
                  <li>Calculate net labour you need to receive</li>
                  <li>Gross up by CIS rate (20% or 30%) to get invoice</li>
                  <li>Separate materials from labour on invoice</li>
                  <li>Show expected CIS deduction clearly</li>
                  <li>Track all CIS deductions on payment statements</li>
                  <li>Claim CIS back via Self Assessment tax return</li>
                  <li>Keep all statements and records 6+ years</li>
                </ol>
              </div>
            </div>
          </div>

          {/* CONTACT FORM SECTION */}
          <div style={{ background: 'white', borderRadius: '16px', padding: '40px', marginTop: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>Need Help or Have Questions?</h3>
              <p style={{ fontSize: '16px', color: '#64748b' }}>
                Got a specific calculation requirement or want a custom tool for your trade? Fill out the form below.
              </p>
            </div>
            
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <iframe 
                src="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE?header=false&Prefill_Registration+Source=CISCalculator" 
                width="100%" 
                height="650px" 
                frameBorder="0"
                title="SmartSuite CIS Calculator Inquiry Form"
                style={{ borderRadius: '12px', border: '1px solid #e2e8f0' }}
              />
            </div>
            
            <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748b', marginTop: '20px' }}>
              Or email us directly: <a href="mailto:mick@tradecalcs.co.uk" style={{ color: '#8b5cf6', fontWeight: '600', textDecoration: 'none' }}>mick@tradecalcs.co.uk</a>
            </p>
          </div>
        </div>

        {showSaveModal && <SaveJobModal calculatorType="CIS Calculator" mode={mode} inputs={{ labourAmount, materialsAmount, cisRate, includeVAT }} results={results} onClose={() => setShowSaveModal(false)} />}
      </div>
    </>
  );
}














