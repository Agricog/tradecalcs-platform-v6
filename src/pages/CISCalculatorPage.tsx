import CISCalculator from '../components/CISCalculator';

export default function CISCalculatorPage() {
  return (
    <>
      {/* SEO Meta Tags */}
      <head>
        <title>Free CIS Tax Calculator | UK Construction Industry Scheme Calculator - TradeCalcs</title>
        <meta 
          name="description" 
          content="Free CIS tax calculator for UK contractors and subcontractors. Calculate Construction Industry Scheme deductions, net payments, HMRC amounts instantly. 20% and 30% CIS rates supported." 
        />
        <meta 
          name="keywords" 
          content="CIS calculator, construction industry scheme, CIS tax, CIS deductions, subcontractor payments, contractor CIS, UK construction tax, HMRC CIS, verified subcontractor, unverified subcontractor" 
        />
      </head>
      
      <CISCalculator />
    </>
  );
}
