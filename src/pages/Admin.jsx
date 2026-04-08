import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, CheckSquare, Building2, LogOut, Globe } from 'lucide-react'
import AdminLogin from '../components/admin/AdminLogin'
import AdminGuides from '../components/admin/AdminGuides'
import AdminChecklists from '../components/admin/AdminChecklists'
import AdminBusinesses from '../components/admin/AdminBusinesses'

const TABS = [
  { id: 'guides', label: 'Guides', icon: BookOpen, component: AdminGuides },
  { id: 'checklists', label: 'Checklists', icon: CheckSquare, component: AdminChecklists },
  { id: 'businesses', label: 'Businesses', icon: Building2, component: AdminBusinesses },
]

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('guides')

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />
  }

  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component || AdminGuides

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-56 bg-navy flex flex-col shrink-0">
        <div className="p-5 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
              <Globe className="h-4 w-4 text-white" />
            </div>
            <span className="text-white font-bold">360Oman</span>
          </Link>
          <p className="text-gray-400 text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === id
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={() => setAuthenticated(false)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
          <Link
            to="/"
            className="mt-1 w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            ← View site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          <ActiveComponent />
        </div>
      </main>
    </div>
  )
}
