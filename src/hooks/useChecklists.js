import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useChecklists({ category } = {}) {
  const [checklists, setChecklists] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchChecklists() {
      setLoading(true)
      setError(null)
      try {
        let query = supabase
          .from('checklists')
          .select('id, title, slug, category, description, items, created_at')
          .eq('is_published', true)
          .order('created_at', { ascending: true })

        if (category && category !== 'All') {
          query = query.eq('category', category)
        }

        const { data, error: err } = await query
        if (err) throw err
        setChecklists(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchChecklists()
  }, [category])

  return { checklists, loading, error }
}

export function useChecklist(slug) {
  const [checklist, setChecklist] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    async function fetchChecklist() {
      setLoading(true)
      setError(null)
      try {
        const { data, error: err } = await supabase
          .from('checklists')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single()
        if (err) throw err
        setChecklist(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchChecklist()
  }, [slug])

  return { checklist, loading, error }
}
