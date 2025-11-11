import BrickBlockCalculator from '../components/BrickBlockCalculator'
import SEO from '../components/SEO'

export default function BrickBlockCalculatorPage() {
  return (
    <>
      <SEO
        title="Brick & Block Calculator | UK Bricklayer Material Calculator"
        description="Calculate bricks, concrete blocks (4\" & 6\"), mortar & cement needed for walls. Free UK calculator for bricklayers with mortar mix ratios."
        keywords="brick calculator, block calculator, concrete block, mortar calculator, bricklayer tools, UK construction"
        url="https://tradecalcs.co.uk/brick-block-calculator"
      />
      <BrickBlockCalculator />
    </>
  )
}

