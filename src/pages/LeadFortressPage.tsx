import { Phone, MessageSquare, Mail, CheckCircle2, ArrowRight, Zap, Lock, Clock, BarChart3 } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function LeadFortressPage() {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>LeadFortress - Never Lose Another Lead | UK Trade Lead Capture System</title>
        <meta 
          name="description" 
          content="Capture EVERY lead across 6 channels automatically. Phone, SMS, WhatsApp, email, forms - all in one CRM. £99/month founding rate. Live in 48 hours guaranteed." 
        />
        <meta name="keywords" content="lead capture system UK, trade CRM, plumber lead management, electrician CRM, missed call recovery, SMS lead capture, WhatsApp business" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="LeadFortress - Never Lose Another Lead | UK Trade Lead Capture" />
        <meta property="og:description" content="Capture EVERY lead across 6 channels. Phone, SMS, WhatsApp, email - all automatic. £99/month founding rate." />
        <meta property="og:url" content="https://tradecalcs.co.uk/leadfortress" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="LeadFortress - Never Lose Another Lead" />
        <meta name="twitter:description" content="Capture EVERY lead automatically. 6 channels, 1 system, zero missed opportunities." />

        {/* Additional SEO */}
        <link rel="canonical" href="https://tradecalcs.co.uk/leadfortress" />
      </Helmet>

      {/* HERO */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-500 text-white py-24 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block bg-black bg-opacity-20 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
            🏰 THE COMPLETE LEAD FORTRESS
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            Never Lose Another Lead
          </h1>
          <p className="text-2xl mb-8 opacity-95">
            Capture EVERY lead across 6 channels. Automatically. Even when you're on a job.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white text-yellow-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2 text-lg"
            >
              Book Free Demo <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#how-it-works"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-yellow-600 text-lg"
            >
              See How It Works
            </a>
          </div>
          <p className="text-sm opacity-75 mt-4">No credit card required • 20 mins • See it live</p>
        </div>
      </div>

      {/* THE PROBLEM */}
      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Silent Profit Killer</h2>
            <p className="text-xl text-gray-700">Every single day, you're losing money without even knowing it</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 border-l-4 border-red-600">
              <Phone className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">☎️ Under a Boiler</h3>
              <p className="text-gray-700">
                Phone rings. You're filthy. By the time you see it 20 minutes later, they've booked your competitor.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border-l-4 border-orange-600">
              <MessageSquare className="w-8 h-8 text-orange-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">💬 Text Comes In</h3>
              <p className="text-gray-700">
                "How much for new bathroom?" You see it 6 hours later. They've already gotten 3 quotes elsewhere.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border-l-4 border-yellow-600">
              <Mail className="w-8 h-8 text-yellow-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">📧 Website Form</h3>
              <p className="text-gray-700">
                Lead fills out your contact form. It goes to email you check once a week. Lead is ice cold.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-8 text-center">
            <p className="text-sm opacity-90 mb-2">The Average UK Trade Business Loses:</p>
            <p className="text-5xl font-black mb-2">£20,000-£100,000+</p>
            <p className="text-lg">Every single year. Just from missed leads.</p>
          </div>
        </div>
      </section>

      {/* THE SOLUTION */}
      <section id="how-it-works" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">LeadFortress Captures EVERY Lead</h2>
            <p className="text-xl text-gray-700">6 channels. 1 system. Zero missed opportunities.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-6 border-2 border-yellow-400">
              <Phone className="w-8 h-8 text-yellow-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">📞 Phone Calls</h3>
              <p className="text-gray-700 mb-3">Every incoming call automatically forwarded to your phone. You never miss a ring.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Call recording & logging</li>
                <li>✓ Automatic transcription</li>
                <li>✓ Full history in CRM</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6 border-2 border-blue-400">
              <MessageSquare className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">💬 SMS & WhatsApp</h3>
              <p className="text-gray-700 mb-3">Every text captured instantly. Auto-reply goes out so they know you got it.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Instant SMS alerts to you</li>
                <li>✓ WhatsApp Business integrated</li>
                <li>✓ Auto-responders included</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-xl p-6 border-2 border-green-400">
              <Mail className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">📧 Email & Forms</h3>
              <p className="text-gray-700 mb-3">Website forms & emails auto-logged. Zero manual data entry.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Form submissions auto-tracked</li>
                <li>✓ Emails organized by lead</li>
                <li>✓ SmartSuite CRM storage</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-400">
              <Zap className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-lg text-gray-900 mb-2">⚡ Missed Calls</h3>
              <p className="text-gray-700 mb-3">See exactly who called, when, and auto-send SMS so they know you'll call back.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>✓ Missed call detection</li>
                <li>✓ Automatic SMS response</li>
                <li>✓ Full callback tracking</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Everything Lands in ONE Place</h3>
            <p className="mb-6 text-lg">
              Calls, texts, emails, WhatsApp, website forms, missed calls - all automatically captured and organized in your professional CRM.
            </p>
            <p className="text-sm opacity-90">
              Built on SmartSuite: The same platform trusted by thousands of UK tradespeople. Zero confusion. Zero lost data.
            </p>
          </div>
        </div>
      </section>

      {/* GUARANTEES */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Our Guarantees</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-8 shadow-md border-t-4 border-green-600">
              <Clock className="w-8 h-8 text-green-600 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-3">Live in 48 Hours</h3>
              <p className="text-gray-700 mb-4">
                We handle the entire setup. You do nothing. Your system is capturing leads within 2 days. Guaranteed.
              </p>
              <p className="text-sm text-gray-600">Not live by then? Your first month is FREE.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border-t-4 border-yellow-600">
              <BarChart3 className="w-8 h-8 text-yellow-600 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-3">5 Leads in Month 1</h3>
              <p className="text-gray-700 mb-4">
                Capture at least 5 leads in your first month from the system. If you don't, we refund 100% of your money.
              </p>
              <p className="text-sm text-gray-600">That's how confident we are.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border-t-4 border-purple-600">
              <Lock className="w-8 h-8 text-purple-600 mb-4" />
              <h3 className="font-bold text-lg text-gray-900 mb-3">Locked-in Pricing</h3>
              <p className="text-gray-700 mb-4">
                £99/month founding rate locked forever. You'll never pay more, even if we raise prices for new customers.
              </p>
              <p className="text-sm text-gray-600">Lifetime guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Simple Pricing</h2>
          <p className="text-center text-xl text-gray-700 mb-12">No surprise fees. No contracts. Cancel anytime.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 border-2 border-gray-300">
              <p className="text-sm text-gray-600 font-bold mb-2">REGULAR PRICE</p>
              <p className="text-4xl font-black text-gray-900 mb-1">£149</p>
              <p className="text-gray-700 mb-6">/month + £149 setup fee</p>
              <p className="text-sm text-gray-600">For new customers starting today</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl p-8 border-4 border-yellow-300 shadow-xl">
              <div className="inline-block bg-black bg-opacity-30 text-white px-3 py-1 rounded-full text-sm font-bold mb-4">
                🎯 FOUNDING RATE
              </div>
              <p className="text-5xl font-black mb-1">£99</p>
              <p className="text-lg opacity-90 mb-8">/month + £0 setup fee</p>
              
              <div className="bg-black bg-opacity-20 rounded-lg p-4 mb-6">
                <p className="text-sm mb-2">Year 1 Savings:</p>
                <p className="text-2xl font-bold">£749</p>
                <p className="text-xs opacity-75">Setup fee + £50/month discount</p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Locked for LIFE (never pay more)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">No long-term contract</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">Cancel anytime (but you won't)</span>
                </li>
              </ul>

              <p className="text-xs opacity-75">⚠️ This price expires once we hit 100 customers. Lock it in now.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-16 px-4 bg-purple-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Everything You Get</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">6-Channel Lead Capture</h3>
                <p className="text-sm text-gray-700">Calls, SMS, WhatsApp, email, web forms, missed calls - all captured automatically</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Call Recording & Logging</h3>
                <p className="text-sm text-gray-700">Every conversation saved, transcribed, and stored in your CRM</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Professional CRM</h3>
                <p className="text-sm text-gray-700">SmartSuite: All your leads organized by customer, date, and status</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Auto-Responses</h3>
                <p className="text-sm text-gray-700">Missed calls get instant SMS. Customers know you'll call back</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Done-For-You Setup</h3>
                <p className="text-sm text-gray-700">We configure everything. You just login and it works</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Unlimited Lead Capture</h3>
                <p className="text-sm text-gray-700">No caps, no hidden fees. Capture 10 leads or 1,000 - same price</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Live Phone Number</h3>
                <p className="text-sm text-gray-700">Branded phone number for your business or use your existing one</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Ongoing Support</h3>
                <p className="text-sm text-gray-700">24/7 support if something breaks. Maintenance included forever</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI SECTION */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Your ROI is Massive</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div>
              <p className="text-sm opacity-90 mb-1">Average Job Value</p>
              <p className="text-3xl font-black">£800</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">Recovered Jobs/Month</p>
              <p className="text-3xl font-black">1-2</p>
            </div>
            <div>
              <p className="text-sm opacity-90 mb-1">LeadFortress Cost</p>
              <p className="text-3xl font-black">£99</p>
            </div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur rounded-xl p-8 border-2 border-white border-opacity-20">
            <p className="mb-4">Recover just ONE job per month and...</p>
            <p className="text-6xl font-black mb-4">8x ROI Positive</p>
            <p className="text-lg opacity-95">Most customers capture 5-15 leads in month 1 alone</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Stop Losing Money?</h2>
          <p className="text-xl text-gray-700 mb-8">
            20-minute demo. Free. No obligation. See exactly how LeadFortress captures every lead coming your way.
          </p>

          <a 
            href="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white px-10 py-5 rounded-lg font-bold text-xl transition shadow-xl"
          >
            Book Your Free Demo Now
          </a>

          <p className="text-gray-600 mt-6 text-sm">
            No credit card required • Takes 20 minutes • See it live
          </p>

          <div className="mt-12 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
            <p className="text-sm text-gray-700 mb-3">
              <strong>Used TradeCalcs calculators?</strong><br/>
              Trusted us with your cable sizing or voltage drop? You're going to love LeadFortress. Same care. Same precision. But for your lead management.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
