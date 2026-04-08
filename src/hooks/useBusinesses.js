import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useBusinesses({ category, area, search } = {}) {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBusinesses() {
      setLoading(true)
      setError(null)
      try {
        let query = supabase
          .from('businesses')
          .select('*')
          .eq('is_published', true)
          .order('is_featured', { ascending: false })
          .order('name', { ascending: true })

        if (category && category !== 'All') {
          query = query.eq('category', category)
        }
        if (area && area !== 'All') {
          query = query.eq('area', area)
        }

        const { data, error: err } = await query
        if (err) throw err

        let results = data || []
        if (search) {
          const q = search.toLowerCase()
          results = results.filter(
            b =>
              b.name.toLowerCase().includes(q) ||
              (b.description && b.description.toLowerCase().includes(q))
          )
        }
        setBusinesses(results)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchBusinesses()
  }, [category, area, search])

  return { businesses, loading, error }
}
