import { useEffect } from 'react';
import ScaffoldCalculator from '../components/ScaffoldCalculator';

export default function ScaffoldCalculatorPage() {
  useEffect(() => {
    // Set SEO meta tags
    document.title = 'Professional Scaffold Calculator | Material Estimator for UK Scaffolders | TradeCalcs';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free scaffold calculator for UK scaffolders. Calculate tubes, fittings, boards, and ties for independent and putlog scaffolds. BS EN 12811 compliant with safety checks.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Free scaffold calculator for UK scaffolders. Calculate tubes, fittings, boards, and ties for independent and putlog scaffolds. BS EN 12811 compliant with safety checks.';
      document.head.appendChild(meta);
    }
    
    // Cleanup on unmount
    return () => {
      document.title = 'TradeCalcs - Professional Trade Calculators';
    };
  }, []);

  return <ScaffoldCalculator />;
}
