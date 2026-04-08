import { useState } from 'react'
import { CheckSquare } from 'lucide-react'
import { useChecklists } from '../hooks/useChecklists'
import ChecklistCard from '../components/checklists/ChecklistCard'
import Spinner from '../components/ui/Spinner'

const CATEGORIES = ['All', 'Arrival', 'Visas', 'Driving', 'Banking', 'Housing', 'Education']

export default function Checklists() {
  const [category, setCategory] = useState('All')
  const { checklists, loading, error } = useChecklists({ category })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <CheckSquare className="h-5 w-5 text-teal-500" />
          <span className="text-sm font-medium text-teal-500 uppercase tracking-wide">Interactive</span>
        </div>
        <h1 className="text-3xl font-bold text-navy">Checklists</h1>
        <p className="text-gray-500 mt-1">Step-by-step guides you can tick off as you go. Progress is saved in your browser.</p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? 'bg-teal-500 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-teal-300 hover:text-teal-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-center py-8">{error}</p>
      ) : checklists.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <CheckSquare className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No checklists found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {checklists.map(cl => (
            <ChecklistCard key={cl.id} checklist={cl} />
          ))}
        </div>
      )}
    </div>
  )
}
