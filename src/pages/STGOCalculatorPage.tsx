import { useEffect } from 'react';
import STGOCalculator from '../components/STGOCalculator';

export default function STGOCalculatorPage() {
  useEffect(() => {
    // Set SEO meta tags
    document.title = 'HaulCheck - Free STGO Compliance Calculator | Avoid £750K Fines | TradeCalcs';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free STGO calculator for UK haulage operators. Check Category 1, 2, 3 compliance, weight limits, and notification requirements. Avoid penalties up to £759,000.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Free STGO calculator for UK haulage operators. Check Category 1, 2, 3 compliance, weight limits, and notification requirements. Avoid penalties up to £759,000.';
      document.head.appendChild(meta);
    }
    
    // Cleanup on unmount
    return () => {
      document.title = 'TradeCalcs - Professional Trade Calculators';
    };
  }, []);

  return <STGOCalculator />;
}
