import { useEffect } from 'react';
import InsulationCalculator from '../components/InsulationCalculator';

export default function InsulationCalculatorPage() {
  useEffect(() => {
    // Set SEO meta tags
    document.title = 'Insulation U-Value Calculator | Part L Building Regs Compliance | TradeCalcs';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free U-value calculator for UK buildings. Check Part L 2021 compliance for walls, roofs, and floors. Calculate insulation thickness for Building Regulations approval.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Free U-value calculator for UK buildings. Check Part L 2021 compliance for walls, roofs, and floors. Calculate insulation thickness for Building Regulations approval.';
      document.head.appendChild(meta);
    }
    
    // Cleanup on unmount
    return () => {
      document.title = 'TradeCalcs - Professional Trade Calculators';
    };
  }, []);

  return <InsulationCalculator />;
}
