import { Zap, Shield, Smartphone, PoundSterling, Lightbulb, CheckCircle2, ArrowRight, Package, Palette, Hammer, Home as HomeIcon, Droplet, Calculator, TruckIcon, Phone, Mail, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // SEO: Page Title
    document.title = 'TradeCalcs - Free Professional Trade Calculators for UK Tradespeople'
    
    // SEO: Meta Description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free professional trade calculators for electricians, plumbers, builders, painters & more. BS 7671 compliant, mobile-ready. Cable sizing, voltage drop, concrete, paint & 15+ more calculators.')
    }

    // SEO: Meta Keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]')
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'trade calculators, electrician calculator, plumber calculator, builder calculator, cable sizing, voltage drop, BS 7671, professional calculators, UK trades')
    }

    // SEO: Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', 'TradeCalcs - Professional Trade Calculators for UK Tradespeople')
    
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', 'Fast, accurate, BS 7671 compliant calculators for electricians, plumbers, builders, painters and all UK trades. Free to use, no signup required.')
    
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', window.location.href)

    const ogImage = document.querySelector('meta[property="og:image"]')
    if (ogImage) ogImage.setAttribute('content', 'https://tradecalcs.co.uk/og-image.jpg')

    const ogType = document.querySelector('meta[property="og:type"]')
    if (ogType) ogType.setAttribute('content', 'website')

    // SEO: Twitter Card
    const twitterCard = document.querySelector('meta[name="twitter:card"]')
    if (twitterCard) twitterCard.setAttribute('content', 'summary_large_image')

    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute('content', 'TradeCalcs - Professional Trade Calculators')

    const twitterDesc = document.querySelector('meta[name="twitter:description"]')
    if (twitterDesc) twitterDesc.setAttribute('content', 'Free calculators for electricians, plumbers, builders, painters & all UK trades. BS 7671 compliant, mobile-ready.')

    // SEO: Canonical Tag
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://tradecalcs.co.uk')
    }

    // SEO: JSON-LD Structured Data
    const schemaScript = document.createElement('script')
    schemaScript.type = 'application/ld+json'
    schemaScript.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          'name': 'TradeCalcs',
          'url': 'https://tradecalcs.co.uk',
          'logo': 'https://tradecalcs.co.uk/logo.png',
          'description': 'Professional trade calculators for UK tradespeople',
          'sameAs': [
            'https://twitter.com/tradecalcs',
            'https://facebook.com/tradecalcs',
            'https://linkedin.com/company/tradecalcs'
          ],
          'contactPoint': {
            '@type': 'ContactPoint',
            'contactType': 'Customer Support',
            'email': 'support@tradecalcs.co.uk'
          }
        },
        {
          '@type': 'WebSite',
          'url': 'https://tradecalcs.co.uk',
          'name': 'TradeCalcs',
          'description': 'Free professional trade calculators for UK tradespeople',
          'potentialAction': {
            '@type': 'SearchAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': 'https://tradecalcs.co.uk?q={search_term_string}'
            },
            'query-input': 'required name=search_term_string'
          }
        },
        {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://tradecalcs.co.uk'
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Calculators',
              'item': 'https://tradecalcs.co.uk#calculators'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          'mainEntity': [
            {
              '@type': 'Question',
              'name': 'What trade calculators do you offer?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'We offer 15+ professional calculators for electricians, plumbers, builders, painters, plasterers, joiners, bricklayers, tilers, roofers, scaffolders and more. All calculators are free to use and BS 7671 compliant where applicable.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Are TradeCalcs calculators BS 7671 compliant?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes. Our electrical calculators (cable sizing, voltage drop) are fully compliant with BS 7671 British Standards for electrical installation. All calculations include current derating factors and regulations.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do I need to sign up to use the calculators?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'No signup required. All calculators are completely free and instantly accessible. No registration, no hidden costs, no premium tiers.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Can I use TradeCalcs on my mobile phone?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes. All TradeCalcs calculators are fully responsive and mobile-friendly. Use them on your phone, tablet or desktop - perfect for on-site calculations.'
              }
            },
            {
              '@type': 'Question',
              'name': 'Do you offer custom calculators for my trade?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'Yes. We build custom web applications and calculators for trade businesses. Contact us to discuss your specific needs and requirements.'
              }
            },
            {
              '@type': 'Question',
              'name': 'What is LeadFortress?',
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': 'LeadFortress is our lead capture and CRM system designed for UK trades. It captures all leads (phone, SMS, WhatsApp, email, web forms) automatically and logs them in one place so you never miss another customer.'
              }
            }
          ]
        },
        {
          '@type': 'LocalBusiness',
          'name': 'TradeCalcs',
          'image': 'https://tradecalcs.co.uk/logo.png',
          'description': 'Professional trade calculators for UK tradespeople',
          'url': 'https://tradecalcs.co.uk',
          'telephone': '+44-xxx-xxx-xxxx',
          'email': 'support@tradecalcs.co.uk',
          'areaServed': 'GB',
          'priceRange': 'Free - Â£15000+'
        }
      ]
    })
    document.head.appendChild(schemaScript)

    // SEO: Robots meta tag
    const robotsMeta = document.querySelector('meta[name="robots"]')
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    }

    // SEO: Viewport (already present but ensuring)
    const viewportMeta = document.querySelector('meta[name="viewport"]')
    if (!viewportMeta) {
      const newViewport = document.createElement('meta')
      newViewport.name = 'viewport'
      newViewport.content = 'width=device-width, initial-scale=1.0'
      document.head.appendChild(newViewport)
    }

  }, [])

  return (
  <>
    <style>{`
      @keyframes twinkle {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      .twinkle {
        animation: twinkle 1.5s infinite;
      }
    `}</style>

    {/* STRAPLINE WITH TWINKLING STARS */}
    <a href="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE" target="_blank" rel="noopener noreferrer" className="block bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 text-center hover:from-purple-700 hover:to-blue-700 transition">
      <div className="flex items-center justify-center gap-2 text-sm md:text-base">
        <span className="twinkle">âœ¨</span>
        <span className="font-semibold">Get VIP Access to New Tools + We Build Bespoke Web Apps for Your Business Problems</span>
        <span className="twinkle">âœ¨</span>
      </div>
    </a>

    {/* HERO BANNER */}
    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Professional Trade Calculators</h1>
        <p className="text-2xl mb-8">Built for UK Tradespeople</p>
        <p className="text-lg mb-8 opacity-95">
          Fast, accurate calculations compliant with British Standards. Save time,<br />
          reduce errors, and work with confidence.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button onClick={() => document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 flex items-center gap-2">
            View Free Tools <ArrowRight className="w-5 h-5" />
          </button>
          <a href="#custom" className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-purple-600">
            Request Custom Tool
          </a>
        </div>
      </div>
    </div>

    {/* WHY CHOOSE TRADECALCS */}
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Why Trade Professionals Choose TradeCalcs</h2>
        <p className="text-center text-gray-600 mb-12">Built by tradespeople who understand your daily challenges</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-700">Get instant results with our optimized calculations. No waiting, no complex forms.</p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">BS 7671 Compliant</h3>
            <p className="text-sm text-gray-700">All electrical calculations follow current British Standards for peace of mind.</p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Mobile Ready</h3>
            <p className="text-sm text-gray-700">Use on any device - phone, tablet, or desktop. Calculate on-site or in the office.</p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
              <PoundSterling className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Always Free</h3>
            <p className="text-sm text-gray-700">No hidden costs, no premium tiers. Professional tools available to all tradespeople.</p>
          </div>
        </div>
      </div>
    </section>

    {/* STOP LOSING LEADS - LEADFORTRESS SECTION */}
    <section className="py-16 px-4 bg-gradient-to-br from-red-50 to-orange-50 border-y-2 border-red-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
            ðŸ’° STOP LOSING LEADS
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Every Missed Call is Â£500-Â£2,000 Walking Away
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            You're under a boiler. Phone rings. By the time you see it, they've called your competitor.<br/>
            That's happening 15-30 times per month. Do the maths.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 border-2 border-red-200 text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">15-30</div>
            <p className="text-sm text-gray-700">Missed calls per month<br/>(average UK trade business)</p>
          </div>
          <div className="bg-white rounded-lg p-6 border-2 border-orange-200 text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">67%</div>
            <p className="text-sm text-gray-700">Of customers move on<br/>within 24 hours</p>
          </div>
          <div className="bg-white rounded-lg p-6 border-2 border-red-200 text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">Â£20k-Â£100k+</div>
            <p className="text-sm text-gray-700">Lost revenue annually<br/>from missed leads</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-red-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            LeadFortress Captures EVERY Lead, Automatically
          </h3>
          <p className="text-gray-700 mb-6">
            Phone, SMS, WhatsApp, email, web forms, missed calls - all captured, logged, and tracked in one place. Even when you're on a job.
          </p>
          
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-gray-900">All calls forwarded, recorded & logged</p>
                <p className="text-sm text-gray-600">Never miss another emergency call</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-gray-900">Auto-SMS to customers + instant alerts</p>
                <p className="text-sm text-gray-600">Customers know you got their message</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-gray-900">WhatsApp, texts, emails all tracked</p>
                <p className="text-sm text-gray-600">Everything in one professional CRM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-gray-900">Live in 48 hours, guaranteed</p>
                <p className="text-sm text-gray-600">We do the setup, you do nothing</p>
              </div>
            </div>
          </div>

          <Link 
            to="/leadfortress" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-bold transition"
          >
            See How LeadFortress Works â†’
          </Link>
          <p className="text-sm text-gray-600 mt-3">Â£99/month â€¢ Live in 48 hours â€¢ Cancel anytime</p>
        </div>
      </div>
    </section>

    {/* FREE CALCULATORS */}
    <section id="calculators" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Free Professional Calculators</h2>
        <p className="text-center text-gray-600 mb-8">Choose your calculator and start working smarter</p>
        
        {/* NEW: CTA SECTION ABOVE CALCULATORS */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-8 mb-12 shadow-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">Generate Professional Quotes in 2 Minutes</h3>
            <p className="text-lg mb-6 opacity-90">
              Calculate materials, labour costs, and create client-ready PDF quotes instantly
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <a 
                href="/paint-calculator" 
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                ðŸŽ¨ Painter Calculator
              </a>
              <a 
                href="/cable-sizing-calculator" 
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                âš¡ Electrician Calculator
              </a>
              <a 
                href="/joinery-calculator" 
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
              >
                ðŸªš Joinery Calculator
              </a>
            </div>
            
            <p className="text-sm opacity-75">
              âœ“ Free to use â€¢ âœ“ No sign-up required â€¢ âœ“ Professional PDF quotes
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/cable-sizing-calculator" className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="text-xs font-bold text-blue-600 mb-3 uppercase tracking-wider">For Electricians</div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cable Sizing Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">BS 7671 compliant electrical cable sizing with all derating factors</p>
              <div className="text-purple-600 font-semibold flex items-center gap-2 hover:gap-3 transition">Use Calculator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>

          <a href="/voltage-drop-calculator" className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="text-xs font-bold text-cyan-600 mb-3 uppercase tracking-wider">For Electricians</div>
              <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center text-white mb-4"><Zap className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Voltage Drop Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">Verify BS 7671 Regulation 525 compliance for electrical circuits</p>
              <div className="text-purple-600 font-semibold flex items-center gap-2 hover:gap-3 transition">Use Calculator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>

          <a href="/bsp-thread-calculator" className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="text-xs font-bold text-orange-600 mb-3 uppercase tracking-wider">For Plumbers</div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white mb-4"><Lightbulb className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">BSP Thread Identifier</h3>
              <p className="text-gray-600 text-sm mb-4">Identify British Standard Pipe threads by diameter or TPI</p>
              <div className="text-purple-600 font-semibold flex items-center gap-2 hover:gap-3 transition">Use Calculator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>

          <a href="/roofing-insurance-calculator" className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="text-xs font-bold text-green-600 mb-3 uppercase tracking-wider">For Roofers</div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white mb-4"><PoundSterling className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Roofing Insurance Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">Calculate fair market value and fight for proper compensation</p>
              <div className="text-green-600 font-semibold flex items-center gap-2 hover:gap-3 transition">Use Calculator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>

          <a href="/concrete-calculator" className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="text-xs font-bold text-green-600 mb-3 uppercase tracking-wider">For Builders</div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white mb-4"><Package className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Concrete-to-Bags Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">Calculate exact cement and ballast bags to buy from any UK merchant</p>
              <div className="text-green-600 font-semibold flex items-center gap-2 hover:gap-3 transition">Use Calculator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>

          <a href="/plasterer-calculator" className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="text-xs font-bold text-amber-600 mb-3 uppercase tracking-wider">For Plasterers</div>
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-white mb-4"><Palette className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plasterer Calculators</h3>
              <p className="text-gray-600 text-sm mb-4">Coverage, drying times, quotes & cost calculators for plasterers</p>
              <div className="text-amber-600 font-semibold flex items-center gap-2 hover:gap-3 transition">View Tools <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>

          <a href="/joinery-calculator" className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="text-xs font-bold text-amber-700 mb-3 uppercase tracking-wider">For Joiners</div>
              <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center text-white mb-4"><Hammer className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Joinery Material & Labour Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">Calculate wood costs, waste factors & labour hours for projects</p>
              <div className="text-amber-700 font-semibold flex items-center gap-2 hover:gap-3 transition">Use Calculator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>

          <a href="/brick-block-calculator" className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="text-xs font-bold text-red-600 mb-3 uppercase tracking-wider">For Bricklayers</div>
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white mb-4"><HomeIcon className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Brick & Block Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">Calculate bricks, concrete blocks, mortar & cement needed</p>
              <div className="text-red-600 font-semibold flex items-center gap-2 hover:gap-3 transition">Use Calculator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>

          <a href="/tiling-calculator" className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="text-xs font-bold text-amber-600 mb-3 uppercase tracking-wider">For Tilers</div>
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-white mb-4"><Droplet className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Tiling Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">Calculate tiles, adhesive & grout for walls and floors</p>
              <div className="text-amber-600 font-semibold flex items-center gap-2 hover:gap-3 transition">Use Calculator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>

          <a href="/paint-calculator" className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
            <div className="p-6">
              <div className="text-xs font-bold text-red-600 mb-3 uppercase tracking-wider">For Painters & Decorators</div>
              <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white mb-4"><Palette className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Paint Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">Calculate paint & primer quantities for any room or project</p>
              <div className="text-red-600 font-semibold flex items-center gap-2 hover:gap-3 transition">Use Calculator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>

          {/* CIS CALCULATOR CARD */}
          <a href="/calculators/cis-calculator" className="bg-white border-2 border-purple-300 rounded-lg overflow-hidden hover:shadow-lg transition relative">
            <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">NEW</div>
            <div className="p-6">
              <div className="text-xs font-bold text-purple-600 mb-3 uppercase tracking-wider">For All Trades</div>
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white mb-4"><Calculator className="w-6 h-6" /></div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">CIS Tax Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">Calculate Construction Industry Scheme deductions for contractors & subcontractors</p>
              <div className="text-purple-600 font-semibold flex items-center gap-2 hover:gap-3 transition">Use Calculator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>

          {/* HAULCHECK STGO CALCULATOR CARD */}
          <a href="/calculators/stgo-calculator" className="bg-white border-2 border-orange-300 rounded-lg overflow-hidden hover:shadow-lg transition relative">
            <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">NEW</div>
            <div className="p-6">
              <div className="text-xs font-bold text-orange-600 mb-3 uppercase tracking-wider">For Hauliers</div>
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center text-white mb-4">
                <TruckIcon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">HaulCheck - STGO Compliance</h3>
              <p className="text-gray-600 text-sm mb-4">Avoid Â£750K fines - instant STGO category checks, weight limits & notification requirements</p>
              <div className="text-orange-600 font-semibold flex items-center gap-2 hover:gap-3 transition">Use Calculator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>

          {/* SCAFFOLD CALCULATOR CARD */}
          <a href="/calculators/scaffold-calculator" className="bg-white border-2 border-blue-300 rounded-lg overflow-hidden hover:shadow-lg transition relative">
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">NEW</div>
            <div className="p-6">
              <div className="text-xs font-bold text-blue-600 mb-3 uppercase tracking-wider">For Scaffolders</div>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Scaffold Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">Calculate tubes, fittings, boards, ties & costs for independent and putlog scaffolds</p>
              <div className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition">Use Calculator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>

          {/* INSULATION U-VALUE CALCULATOR CARD */}
          <a href="/calculators/insulation-calculator" className="bg-white border-2 border-green-300 rounded-lg overflow-hidden hover:shadow-lg transition relative">
            <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">NEW</div>
            <div className="p-6">
              <div className="text-xs font-bold text-green-600 mb-3 uppercase tracking-wider">For Builders & Architects</div>
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Insulation U-Value Calculator</h3>
              <p className="text-gray-600 text-sm mb-4">Calculate U-values & check Part L 2021 compliance for walls, roofs & floors</p>
              <div className="text-green-600 font-semibold flex items-center gap-2 hover:gap-3 transition">Use Calculator <ArrowRight className="w-4 h-4" /></div>
            </div>
          </a>
        </div>

        <p className="text-center text-gray-600 mt-8">More calculators coming soon for carpenters, bricklayers, and more trades</p>
      </div>
    </section>

    {/* BUILT BY TRADESPEOPLE */}
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Built by Tradespeople, for Tradespeople</h2>
            <p className="text-gray-700 mb-6">
              We understand the challenges you face every day because we've been there. Our tools are designed to make your job easier, faster, and more accurate.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">Save Time On Every Job</p>
                  <p className="text-sm text-gray-600">Instant calculations mean less time with paperwork and more time doing what you do best</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">Reduce Costly Errors</p>
                  <p className="text-sm text-gray-600">Accurate, tested calculations help you avoid expensive mistakes and rework</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">Stay Compliant</p>
                  <p className="text-sm text-gray-600">All tools follow current British Standards so you work with confidence</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">Work From Anywhere</p>
                  <p className="text-sm text-gray-600">Access your tools on any device - perfect for on-site calculations</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-3">Ready to Work Smarter?</h3>
            <p className="mb-6 opacity-95">Join professional tradespeople who are already saving time and reducing errors with TradeCalcs.</p>
            <button onClick={() => document.getElementById('calculators')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 inline-flex items-center gap-2">
              Start Using Tools <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm opacity-75 mt-4">No signup required â€¢ Instant access â€¢ Always free</p>
          </div>
        </div>
      </div>
    </section>

    {/* â­ NEW: GET IN TOUCH SECTION â­ */}
    <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-purple-50 border-y-2 border-purple-200">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Got a Better Idea? We're Listening</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Have an improvement for our existing calculators? Want a brand new calculator built for your specific trade challenge? Or need automation to solve a recurring business problem? Let's talk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 border-2 border-purple-200 text-center hover:shadow-lg transition">
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
              ðŸ’¡
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Calculator Improvements</h3>
            <p className="text-sm text-gray-600 mb-4">
              Missing a feature? Want us to add something to an existing calculator? Tell us your idea.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-purple-200 text-center hover:shadow-lg transition">
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
              ðŸ› ï¸
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Custom Calculators</h3>
            <p className="text-sm text-gray-600 mb-4">
              Need a specialized calculator built for your exact business needs? We build bespoke solutions.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 border-2 border-purple-200 text-center hover:shadow-lg transition">
            <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-2xl mx-auto mb-4">
              âš™ï¸
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Automation & Tools</h3>
            <p className="text-sm text-gray-600 mb-4">
              Sick of doing the same task manually? Let's automate it and save you hours every week.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border-2 border-purple-300">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Get in Touch Directly</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Call or text anytime</p>
                  <a href="tel:07985559775" className="text-xl font-bold text-blue-600 hover:text-blue-700">
                    07985 559775
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quick message? WhatsApp or SMS</p>
                  <p className="text-lg font-bold text-purple-600">
                    Same number, instant reply
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email for detailed requests</p>
                  <a href="mailto:mick@tradecalcs.co.uk" className="font-bold text-green-600 hover:text-green-700">
                    mick@tradecalcs.co.uk
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6 border-l-4 border-purple-600">
              <p className="text-gray-700 font-semibold mb-2">Why reach out?</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>âœ“ You've spotted something we can improve</li>
                <li>âœ“ You need a calculator we haven't built yet</li>
                <li>âœ“ You want to automate a time-consuming process</li>
                <li>âœ“ You have a specific business problem to solve</li>
                <li>âœ“ You just want to say thanks or share feedback</li>
              </ul>
            </div>

            <p className="text-center text-gray-600 text-sm">
              <span className="font-semibold">I personally answer every message</span> - whether it's a phone call, text, or email. Let's build something great together.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CUSTOM & WHITE-LABEL SECTION */}
    <section id="custom" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Need Something Custom?</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          We build bespoke web applications and automation tools for UK trade businesses. Got a specific problem? Let's create a solution together.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 text-xl">
              âš™ï¸
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bespoke Custom Apps</h3>
            <p className="text-gray-700 text-sm mb-4">
              Custom web applications built specifically for your trade business. Automate workflows, capture data, streamline operations.
            </p>
            <p className="text-purple-600 font-semibold text-sm">Â£2,000 - Â£15,000+</p>
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 text-xl">
              ðŸ¢
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">White-Label Solutions</h3>
            <p className="text-gray-700 text-sm mb-4">
              Host our calculators on your own website with your branding. Perfect for agencies, trade organizations, and consultancies.
            </p>
            <p className="text-purple-600 font-semibold text-sm">From Â£99/month</p>
          </div>

          <div className="bg-white border-2 border-purple-200 rounded-lg p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 text-xl">
              ðŸ”—
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">API & Integrations</h3>
            <p className="text-gray-700 text-sm mb-4">
              Integrate our calculators into your existing platforms. Seamless API access for your business applications.
            </p>
            <p className="text-purple-600 font-semibold text-sm">Custom pricing</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Custom Development Services</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Whether you need a specialized calculator for your trade, automation to streamline operations, or want to white-label our tools - we've got you covered. Our team specializes in building solutions that save tradespeople time and money.
          </p>
          <a href="https://app.smartsuite.com/form/sba974gi/Zx9ZVTVrwE" target="_blank" rel="noopener noreferrer" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-bold inline-flex items-center gap-2">
            Tell Us What You Need <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  </>
  )
}










































