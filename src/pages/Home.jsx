import { Link } from 'react-router-dom'
import { BookOpen, CheckSquare, Building2, MessageCircle, AlertCircle, ArrowRight, Star } from 'lucide-react'
import { useGuides } from '../hooks/useGuides'
import { useBusinesses } from '../hooks/useBusinesses'
import GuideCard from '../components/guides/GuideCard'
import BusinessCard from '../components/directory/BusinessCard'
import Spinner from '../components/ui/Spinner'

const quickLinks = [
  {
    to: '/guides',
    icon: BookOpen,
    title: 'Guides',
    desc: 'In-depth articles on every expat topic',
    color: 'bg-teal-500',
  },
  {
    to: '/checklists',
    icon: CheckSquare,
    title: 'Checklists',
    desc: 'Step-by-step interactive checklists',
    color: 'bg-indigo-500',
  },
  {
    to: '/directory',
    icon: Building2,
    title: 'Directory',
    desc: 'Trusted businesses across Oman',
    color: 'bg-gold-500',
  },
  {
    to: '/ask',
    icon: MessageCircle,
    title: 'Ask AI',
    desc: 'Instant answers from 360Oman AI',
    color: 'bg-purple-500',
  },
]

export default function Home() {
  const { guides, loading: guidesLoading } = useGuides()
  const { businesses, loading: bizLoading } = useBusinesses()

  const featuredGuides = guides.slice(0, 6)
  const featuredBusinesses = businesses.filter(b => b.is_featured).slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-navy via-[#1e2d4a] to-teal-700 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
            <Star className="h-3.5 w-3.5 text-gold-400" />
            <span>The #1 guide for expats in Oman</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5">
            Your complete guide to<br />
            <span className="text-teal-400">life in Oman</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Guides, checklists, trusted businesses — and an AI assistant that knows Oman.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/guides" className="btn-primary text-base">
              Explore Guides
            </Link>
            <Link
              to="/ask"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors text-base"
            >
              Ask 360Oman
            </Link>
          </div>
        </div>
      </section>

      {/* Trust badge */}
      <div className="bg-amber-50 border-b border-amber-100 py-2.5 px-4">
        <p className="max-w-7xl mx-auto text-center text-xs text-amber-700 flex items-center justify-center gap-1.5">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          Guide content is community-verified. Always check official sources for visa and legal matters.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Quick-access grid */}
        <section>
          <h2 className="text-2xl font-bold text-navy mb-6">What do you need?</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map(({ to, icon: Icon, title, desc, color }) => (
              <Link
                key={to}
                to={to}
                className="card p-6 flex flex-col items-start gap-3 group"
              >
                <div className={`${color} rounded-xl p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-navy group-hover:text-teal-600 transition-colors">{title}</p>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">{desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-teal-500 mt-auto group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </section>

        {/* Featured guides */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-navy">Latest Guides</h2>
            <Link to="/guides" className="text-teal-500 hover:text-teal-600 text-sm font-medium flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {guidesLoading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredGuides.map(guide => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          )}
          {!guidesLoading && featuredGuides.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <p>No guides yet. Add some through the admin panel.</p>
            </div>
          )}
        </section>

        {/* Featured businesses */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-navy">Featured Businesses</h2>
            <Link to="/directory" className="text-teal-500 hover:text-teal-600 text-sm font-medium flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {bizLoading ? (
            <Spinner />
          ) : featuredBusinesses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredBusinesses.map(business => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>No featured businesses yet. Mark businesses as featured in the admin panel.</p>
            </div>
          )}
        </section>

        {/* AI CTA */}
        <section className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 text-white text-center">
          <MessageCircle className="h-10 w-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-2xl font-bold mb-2">Have a question about Oman?</h2>
          <p className="text-teal-100 mb-6">
            Ask 360Oman anything — visas, banking, housing, driving, healthcare, and more.
          </p>
          <Link
            to="/ask"
            className="inline-block bg-white text-teal-600 font-semibold px-8 py-3 rounded-lg hover:bg-teal-50 transition-colors"
          >
            Start Asking
          </Link>
        </section>
      </div>
    </div>
  )
}
