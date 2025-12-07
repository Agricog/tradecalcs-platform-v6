export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                TC
              </div>
              <span className="text-white font-bold text-lg">TradeCalcs</span>
            </div>
            <p className="text-sm text-gray-500 mb-4">
              Professional calculators and tools for UK tradespeople. Built by tradespeople, for tradespeople.
            </p>
            <p className="text-xs text-gray-600">© 2025 TradeCalcs. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/#calculators" className="hover:text-white transition">All Calculators</a></li>
              <li><a href="/#custom" className="hover:text-white transition">LeadFortress</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/#custom" className="hover:text-white transition">Custom Development</a></li>
              <li><a href="/#custom" className="hover:text-white transition">Lead Management</a></li>
              <li><a href="/#custom" className="hover:text-white transition">White-Label Solutions</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="/" className="hover:text-white transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-left">
              <p className="text-xs text-gray-600 mb-1">Need help or have questions?</p>
              <a href="mailto:mick@tradecalcs.co.uk" className="text-gray-400 hover:text-white transition font-semibold">
                mick@tradecalcs.co.uk
              </a>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">Phone</p>
              <a href="tel:07985559775" className="text-gray-400 hover:text-white transition font-semibold">
                07985 559775
              </a>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs text-gray-600 mb-1">WhatsApp / SMS</p>
              <p className="text-gray-400 font-semibold">Same number, instant reply</p>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center text-xs text-gray-600 space-y-1">
          <p>TradeCalcs is committed to providing accurate, BS-compliant calculations for UK tradespeople.</p>
          <p>Built by tradespeople, for tradespeople</p>
        </div>
      </div>
    </footer>
  );
}

