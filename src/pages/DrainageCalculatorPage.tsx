import { Helmet } from 'react-helmet-async'
import DrainageCalculator from '../components/DrainageCalculator' // Adjust path if needed

export default function DrainageCalculatorPage() {
  return (
    <>
      <Helmet>
        <title>Underground Drainage Pipe Calculator UK 2025 | Trench Bedding & Spoil | TradeCalcs</title>
        <meta name="description" content="Free UK drainage calculator for underground pipes. Calculate pipe bedding, spoil removal, and backfill for 4, 6, 9, and 12 inch diameter pipes. Instant compliance results for drainage contractors." />
        <meta name="keywords" content="drainage calculator, underground pipe calculator, trench bedding calculator, drainage spoil calculator, pipe bedding calculator UK, drainage design, trench excavation" />
      </Helmet>

      <DrainageCalculator />
    </>
  )
}

