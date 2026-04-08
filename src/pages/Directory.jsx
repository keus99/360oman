import { useState } from 'react'
import { Building2 } from 'lucide-react'
import { useBusinesses } from '../hooks/useBusinesses'
import BusinessCard from '../components/directory/BusinessCard'
import SearchBar from '../components/ui/SearchBar'
import Spinner from '../components/ui/Spinner'

const CATEGORIES = ['All', 'Medical', 'Education', 'Legal & Finance', 'Home Services', 'Food & Grocery', 'Automotive', 'Hospitality', 'Fitness & Wellness']
const AREAS = ['All', 'Muscat', 'Barka', 'Sohar', 'Salalah', 'Nizwa']

export default function Directory() {
  const [category, setCategory] = useState('All')
  const [area, setArea] = useState('All')
  const [search, setSearch] = useState('')

  const { businesses, loading, error } = useBusinesses({ category, area, search })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Building2 className="h-5 w-5 text-teal-500" />
          <span className="text-sm font-medium text-teal-500 uppercase tracking-wide">Business Directory</span>
        </div>
        <h1 className="text-3xl font-bold text-navy">Trusted Businesses</h1>
        <p className="text-gray-500 mt-1">Find verified services for expats across Oman.</p>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by name or description..."
        />

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Category filter */}
          <div className="flex-1">
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Category</label>
            <div className="flex flex-wrap gap-2">
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
          </div>
        </div>

        {/* Area filter */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">Area</label>
          <div className="flex flex-wrap gap-2">
            {AREAS.map(a => (
              <button
                key={a}
                onClick={() => setArea(a)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  area === a
                    ? 'bg-navy text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-navy hover:text-navy'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-center py-8">{error}</p>
      ) : businesses.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Building2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No businesses found</p>
          <p className="text-sm mt-1">Try a different search or filter</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-400 mb-4">{businesses.length} result{businesses.length !== 1 ? 's' : ''}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.map(business => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
