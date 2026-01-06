import { Helmet } from 'react-helmet-async'

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | TradeCalcs</title>
        <meta name="description" content="TradeCalcs privacy policy. Learn how we collect, use and protect your data when using our free trade calculators." />
        <link rel="canonical" href="https://tradecalcs.co.uk/privacy" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Introduction</h2>
              <p>TradeCalcs ("we", "us", "our", or "Company") operates the tradecalcs.co.uk website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Information Collection and Use</h2>
              <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Usage Data: We may collect information about how the Service is accessed and used ("Usage Data"). This may include information such as your browser type, pages visited, and the time and date of your visit.</li>
                <li>Device Data: We collect device information including but not limited to device type, operating system, browser type.</li>
                <li>Communication Data: If you contact us through the forms provided, we collect the information you provide.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Use of Data</h2>
              <p>TradeCalcs uses the collected data for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues and fraud</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Security of Data</h2>
              <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Changes to This Privacy Policy</h2>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top of this Privacy Policy.</p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p className="font-bold">Email: mick@tradecalcs.co.uk</p>
            </section>
            <p className="text-xs text-gray-500 pt-8">Last updated: November 2025</p>
          </div>
        </div>
      </div>
    </>
  )
}

