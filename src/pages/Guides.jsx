import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BookOpen } from 'lucide-react'
import { useGuides } from '../hooks/useGuides'
import GuideList from '../components/guides/GuideList'
import SearchBar from '../components/ui/SearchBar'

const CATEGORIES = [
  'All',
  'Visas & residency',
  'Driving & transport',
  'Banking & money',
  'Healthcare',
  'Housing & utilities',
  'Government services',
  'Education',
  'Work & labour',
  'Lifestyle',
]

export default function Guides() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')

  const { guides, loading, error } = useGuides({ category, search })

  useEffect(() => {
    const cat = searchParams.get('category')
    if (cat) setCategory(cat)
  }, [searchParams])

  function handleCategory(cat) {
    setCategory(cat)
    if (cat === 'All') {
      setSearchParams({})
    } else {
      setSearchParams({ category: cat })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="h-5 w-5 text-teal-500" />
          <span className="text-sm font-medium text-teal-500 uppercase tracking-wide">Knowledge Base</span>
        </div>
        <h1 className="text-3xl font-bold text-navy">Expat Guides</h1>
        <p className="text-gray-500 mt-1">Everything you need to know about living in Oman.</p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search guides..."
        />
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
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
      </div>

      <GuideList guides={guides} loading={loading} error={error} />
    </div>
  )
}
