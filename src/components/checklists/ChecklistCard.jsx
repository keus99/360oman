import { Link } from 'react-router-dom'
import { CheckSquare, ArrowRight } from 'lucide-react'
import Badge from '../ui/Badge'

export default function ChecklistCard({ checklist }) {
  const itemCount = Array.isArray(checklist.items) ? checklist.items.length : 0
  return (
    <Link to={`/checklists/${checklist.slug}`} className="card p-5 block group">
      <Badge label={checklist.category} />
      <h3 className="mt-3 font-semibold text-navy group-hover:text-teal-600 transition-colors leading-snug">
        {checklist.title}
      </h3>
      {checklist.description && (
        <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{checklist.description}</p>
      )}
      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm text-gray-400">
          <CheckSquare className="h-3.5 w-3.5" />
          {itemCount} {itemCount === 1 ? 'step' : 'steps'}
        </span>
        <span className="flex items-center gap-1 text-teal-500 text-sm font-medium">
          Open <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  )
}
