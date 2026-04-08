import GuideCard from './GuideCard'
import Spinner from '../ui/Spinner'
import { BookOpen } from 'lucide-react'

export default function GuideList({ guides, loading, error }) {
  if (loading) return <Spinner />
  if (error) return (
    <div className="text-center py-12 text-red-500">
      <p>Failed to load guides: {error}</p>
    </div>
  )
  if (guides.length === 0) return (
    <div className="text-center py-16 text-gray-400">
      <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
      <p className="font-medium">No guides found</p>
      <p className="text-sm mt-1">Try a different search or category</p>
    </div>
  )
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {guides.map(guide => (
        <GuideCard key={guide.id} guide={guide} />
      ))}
    </div>
  )
}
