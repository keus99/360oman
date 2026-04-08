import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useGuides({ category, search } = {}) {
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchGuides() {
      setLoading(true)
      setError(null)
      try {
        let query = supabase
          .from('guides')
          .select('id, title, slug, category, summary, tags, last_verified, created_at, updated_at')
          .eq('is_published', true)
          .order('updated_at', { ascending: false })

        if (category && category !== 'All') {
          query = query.eq('category', category)
        }

        const { data, error: err } = await query
        if (err) throw err

        let results = data || []
        if (search) {
          const q = search.toLowerCase()
          results = results.filter(
            g =>
              g.title.toLowerCase().includes(q) ||
              (g.summary && g.summary.toLowerCase().includes(q)) ||
              (g.tags && g.tags.some(t => t.toLowerCase().includes(q)))
          )
        }
        setGuides(results)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchGuides()
  }, [category, search])

  return { guides, loading, error }
}

export function useGuide(slug) {
  const [guide, setGuide] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    async function fetchGuide() {
      setLoading(true)
      setError(null)
      try {
        const { data, error: err } = await supabase
          .from('guides')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single()
        if (err) throw err
        setGuide(data)

        if (data?.category) {
          const { data: rel } = await supabase
            .from('guides')
            .select('id, title, slug, category, summary')
            .eq('category', data.category)
            .eq('is_published', true)
            .neq('slug', slug)
            .limit(3)
          setRelated(rel || [])
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchGuide()
  }, [slug])

  return { guide, related, loading, error }
}
