import { useEffect } from 'react';
import CISCalculator from '../components/CISCalculator';

export default function CISCalculatorPage() {
  useEffect(() => {
    // Set page title
    document.title = 'Free CIS Tax Calculator | UK Construction Industry Scheme Calculator - TradeCalcs';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free CIS tax calculator for UK contractors and subcontractors. Calculate Construction Industry Scheme deductions, net payments, HMRC amounts instantly. 20% and 30% CIS rates supported.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Free CIS tax calculator for UK contractors and subcontractors. Calculate Construction Industry Scheme deductions, net payments, HMRC amounts instantly. 20% and 30% CIS rates supported.';
      document.head.appendChild(meta);
    }
    
    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'CIS calculator, construction industry scheme, CIS tax, CIS deductions, subcontractor payments, contractor CIS, UK construction tax, HMRC CIS, verified subcontractor, unverified subcontractor');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'CIS calculator, construction industry scheme, CIS tax, CIS deductions, subcontractor payments, contractor CIS, UK construction tax, HMRC CIS, verified subcontractor, unverified subcontractor';
      document.head.appendChild(meta);
    }

    // Set canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://tradecalcs.co.uk/calculators/cis-calculator');
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://tradecalcs.co.uk/calculators/cis-calculator';
      document.head.appendChild(link);
    }

    // Cleanup function
    return () => {
      document.title = 'TradeCalcs - Professional Trade Calculators';
    };
  }, []);

  return <CISCalculator />;
}
