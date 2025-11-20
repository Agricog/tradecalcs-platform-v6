import Head from 'next/head';
import CISCalculator from '../../components/CISCalculator';

export default function CISCalculatorPage() {
  return (
    <>
      <Head>
        <title>CIS Tax Calculator | TradeCalcs - Free UK Construction Industry Scheme Calculator</title>
        <meta 
          name="description" 
          content="Free CIS tax calculator for UK contractors and subcontractors. Calculate Construction Industry Scheme deductions, net payments, and HMRC amounts instantly." 
        />
        <meta name="keywords" content="CIS calculator, construction industry scheme, CIS tax, subcontractor payments, UK construction tax" />
      </Head>

      <CISCalculator />
    </>
  );
}
