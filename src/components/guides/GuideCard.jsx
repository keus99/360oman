import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import Badge from '../ui/Badge'

export default function GuideCard({ guide }) {
  return (
    <Link to={`/guides/${guide.slug}`} className="card p-5 block group">
      <div className="flex items-start justify-between gap-3">
        <Badge label={guide.category} />
        {guide.last_verified && (
          <span className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
            <Calendar className="h-3 w-3" />
            {new Date(guide.last_verified).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
          </span>
        )}
      </div>
      <h3 className="mt-3 font-semibold text-navy group-hover:text-teal-600 transition-colors leading-snug">
        {guide.title}
      </h3>
      {guide.summary && (
        <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{guide.summary}</p>
      )}
      <div className="mt-3 flex items-center gap-1 text-teal-500 text-sm font-medium">
        Read guide <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  )
}
