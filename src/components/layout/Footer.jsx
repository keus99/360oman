import { Link } from 'react-router-dom'
import { Globe, Mail, AlertCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <Globe className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">360Oman</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your complete guide to life in the Sultanate of Oman — for expats and newcomers.
            </p>
          </div>

          {/* Guides */}
          <div>
            <h4 className="text-white font-semibold mb-3">Guides</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/guides" className="hover:text-teal-400 transition-colors">All Guides</Link></li>
              <li><Link to="/guides?category=Visas+%26+residency" className="hover:text-teal-400 transition-colors">Visas & Residency</Link></li>
              <li><Link to="/guides?category=Banking+%26+money" className="hover:text-teal-400 transition-colors">Banking & Money</Link></li>
              <li><Link to="/guides?category=Healthcare" className="hover:text-teal-400 transition-colors">Healthcare</Link></li>
              <li><Link to="/guides?category=Work+%26+labour" className="hover:text-teal-400 transition-colors">Work & Labour</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold mb-3">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/checklists" className="hover:text-teal-400 transition-colors">Checklists</Link></li>
              <li><Link to="/directory" className="hover:text-teal-400 transition-colors">Business Directory</Link></li>
              <li><Link to="/ask" className="hover:text-teal-400 transition-colors">Ask 360Oman AI</Link></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center gap-1.5">
              <AlertCircle className="h-4 w-4 text-gold-500" />
              Disclaimer
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Guide content is community-verified. Always check official sources for visa and legal matters.
              Information may change — verify with ROP, MOL, or MOCI where applicable.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} 360Oman. All rights reserved.</p>
          <Link to="/admin" className="hover:text-gray-400 transition-colors text-xs">Admin</Link>
        </div>
      </div>
    </footer>
  )
}
