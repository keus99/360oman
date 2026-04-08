import { useState, useEffect } from 'react'
import { Plus, Edit2, Eye, EyeOff, Trash2, X, Save } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import Spinner from '../ui/Spinner'

const CATEGORIES = [
  'Visas & residency', 'Driving & transport', 'Banking & money',
  'Healthcare', 'Housing & utilities', 'Government services',
  'Education', 'Work & labour', 'Lifestyle',
]

const EMPTY_GUIDE = { title: '', slug: '', category: CATEGORIES[0], summary: '', content: '', tags: '', is_published: true }

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function AdminGuides() {
  const [guides, setGuides] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // null = list, or guide object
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('guides').select('*').order('updated_at', { ascending: false })
    setGuides(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openNew() { setEditing({ ...EMPTY_GUIDE }) }
  function openEdit(g) { setEditing({ ...g, tags: (g.tags || []).join(', ') }) }
  function close() { setEditing(null); setError(null) }

  async function save() {
    setSaving(true)
    setError(null)
    const payload = {
      title: editing.title,
      slug: editing.slug || slugify(editing.title),
      category: editing.category,
      summary: editing.summary,
      content: editing.content,
      tags: editing.tags ? editing.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      is_published: editing.is_published,
      updated_at: new Date().toISOString(),
    }
    try {
      if (editing.id) {
        const { error: err } = await supabase.from('guides').update(payload).eq('id', editing.id)
        if (err) throw err
      } else {
        const { error: err } = await supabase.from('guides').insert(payload)
        if (err) throw err
      }
      await load()
      close()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  async function togglePublished(guide) {
    await supabase.from('guides').update({ is_published: !guide.is_published }).eq('id', guide.id)
    setGuides(gs => gs.map(g => g.id === guide.id ? { ...g, is_published: !g.is_published } : g))
  }

  async function deleteGuide(id) {
    if (!window.confirm('Delete this guide?')) return
    await supabase.from('guides').delete().eq('id', id)
    setGuides(gs => gs.filter(g => g.id !== id))
  }

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy">{editing.id ? 'Edit Guide' : 'New Guide'}</h2>
          <button onClick={close} className="p-2 text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>
        {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm mb-4">{error}</div>}
        <div className="space-y-4">
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Title *"
            value={editing.title}
            onChange={e => setEditing({ ...editing, title: e.target.value, slug: slugify(e.target.value) })}
          />
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-400"
            placeholder="Slug (auto-generated)"
            value={editing.slug}
            onChange={e => setEditing({ ...editing, slug: e.target.value })}
          />
          <select
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={editing.category}
            onChange={e => setEditing({ ...editing, category: e.target.value })}
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Summary (one-liner shown on cards)"
            rows={2}
            value={editing.summary}
            onChange={e => setEditing({ ...editing, summary: e.target.value })}
          />
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
            placeholder="Content (Markdown supported) *"
            rows={16}
            value={editing.content}
            onChange={e => setEditing({ ...editing, content: e.target.value })}
          />
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Tags (comma-separated)"
            value={editing.tags}
            onChange={e => setEditing({ ...editing, tags: e.target.value })}
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={editing.is_published}
              onChange={e => setEditing({ ...editing, is_published: e.target.checked })}
              className="rounded"
            />
            Published
          </label>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !editing.title || !editing.content} className="btn-primary flex items-center gap-2">
              <Save className="h-4 w-4" />
              {saving ? 'Saving…' : 'Save Guide'}
            </button>
            <button onClick={close} className="btn-outline">Cancel</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-navy">Guides ({guides.length})</h2>
        <button onClick={openNew} className="btn-primary flex items-center gap-2 text-sm py-2">
          <Plus className="h-4 w-4" /> New Guide
        </button>
      </div>
      {loading ? <Spinner /> : (
        <div className="space-y-2">
          {guides.map(guide => (
            <div key={guide.id} className="bg-white border border-gray-100 rounded-lg px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-navy truncate">{guide.title}</p>
                <p className="text-xs text-gray-400">{guide.category}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${guide.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {guide.is_published ? 'Published' : 'Draft'}
              </span>
              <button onClick={() => togglePublished(guide)} className="p-1.5 text-gray-400 hover:text-navy">
                {guide.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <button onClick={() => openEdit(guide)} className="p-1.5 text-gray-400 hover:text-teal-600">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => deleteGuide(guide.id)} className="p-1.5 text-gray-400 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {guides.length === 0 && <p className="text-gray-400 text-sm text-center py-8">No guides yet. Create your first one!</p>}
        </div>
      )}
    </div>
  )
}
