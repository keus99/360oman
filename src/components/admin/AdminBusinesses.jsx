import { useState, useEffect } from 'react'
import { Plus, Edit2, Eye, EyeOff, Trash2, X, Save, Star } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import Spinner from '../ui/Spinner'

const CATEGORIES = ['Medical', 'Education', 'Legal & Finance', 'Home Services', 'Food & Grocery', 'Automotive', 'Hospitality', 'Fitness & Wellness']
const AREAS = ['Muscat', 'Barka', 'Sohar', 'Salalah', 'Nizwa', 'Seeb', 'Muttrah']

const EMPTY = { name: '', category: CATEGORIES[0], subcategory: '', description: '', address: '', area: AREAS[0], phone: '', email: '', website: '', google_maps_url: '', is_featured: false, is_published: true }

export default function AdminBusinesses() {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('businesses').select('*').order('name')
    setBusinesses(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openNew() { setEditing({ ...EMPTY }) }
  function openEdit(b) { setEditing({ ...b }) }
  function close() { setEditing(null); setError(null) }

  async function save() {
    setSaving(true); setError(null)
    const { id, ...payload } = editing
    try {
      if (id) {
        const { error: err } = await supabase.from('businesses').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id)
        if (err) throw err
      } else {
        const { error: err } = await supabase.from('businesses').insert(payload)
        if (err) throw err
      }
      await load(); close()
    } catch (err) { setError(err.message) } finally { setSaving(false) }
  }

  async function toggleField(biz, field) {
    await supabase.from('businesses').update({ [field]: !biz[field] }).eq('id', biz.id)
    setBusinesses(bs => bs.map(b => b.id === biz.id ? { ...b, [field]: !b[field] } : b))
  }

  async function deleteBiz(id) {
    if (!window.confirm('Delete this business?')) return
    await supabase.from('businesses').delete().eq('id', id)
    setBusinesses(bs => bs.filter(b => b.id !== id))
  }

  const field = (key, label, type = 'text') => (
    <input
      type={type}
      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      placeholder={label}
      value={editing[key]}
      onChange={e => setEditing({ ...editing, [key]: e.target.value })}
    />
  )

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy">{editing.id ? 'Edit Business' : 'New Business'}</h2>
          <button onClick={close} className="p-2 text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>
        {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm mb-4">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field('name', 'Business Name *')}
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={editing.category}
            onChange={e => setEditing({ ...editing, category: e.target.value })}
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          {field('subcategory', 'Subcategory')}
          <select
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={editing.area}
            onChange={e => setEditing({ ...editing, area: e.target.value })}
          >
            {AREAS.map(a => <option key={a}>{a}</option>)}
          </select>
          {field('phone', 'Phone (+968...)')}
          {field('email', 'Email', 'email')}
          {field('website', 'Website URL')}
          {field('address', 'Address')}
        </div>
        <textarea
          className="w-full mt-4 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Description"
          rows={3}
          value={editing.description}
          onChange={e => setEditing({ ...editing, description: e.target.value })}
        />
        <input
          className="w-full mt-3 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Google Maps URL"
          value={editing.google_maps_url}
          onChange={e => setEditing({ ...editing, google_maps_url: e.target.value })}
        />
        <div className="flex gap-6 mt-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={editing.is_featured} onChange={e => setEditing({ ...editing, is_featured: e.target.checked })} className="rounded" />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={editing.is_published} onChange={e => setEditing({ ...editing, is_published: e.target.checked })} className="rounded" />
            Published
          </label>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={save} disabled={saving || !editing.name} className="btn-primary flex items-center gap-2">
            <Save className="h-4 w-4" />
            {saving ? 'Saving…' : 'Save Business'}
          </button>
          <button onClick={close} className="btn-outline">Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-navy">Businesses ({businesses.length})</h2>
        <button onClick={openNew} className="btn-primary flex items-center gap-2 text-sm py-2">
          <Plus className="h-4 w-4" /> New Business
        </button>
      </div>
      {loading ? <Spinner /> : (
        <div className="space-y-2">
          {businesses.map(biz => (
            <div key={biz.id} className="bg-white border border-gray-100 rounded-lg px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm text-navy truncate">{biz.name}</p>
                  {biz.is_featured && <Star className="h-3.5 w-3.5 text-gold-500 fill-gold-500 shrink-0" />}
                </div>
                <p className="text-xs text-gray-400">{biz.category} · {biz.area}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${biz.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {biz.is_published ? 'Live' : 'Hidden'}
              </span>
              <button onClick={() => toggleField(biz, 'is_featured')} className="p-1.5 text-gray-400 hover:text-gold-500" title={biz.is_featured ? 'Unfeature' : 'Feature'}>
                <Star className={`h-4 w-4 ${biz.is_featured ? 'fill-gold-500 text-gold-500' : ''}`} />
              </button>
              <button onClick={() => toggleField(biz, 'is_published')} className="p-1.5 text-gray-400 hover:text-navy">
                {biz.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <button onClick={() => openEdit(biz)} className="p-1.5 text-gray-400 hover:text-teal-600">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => deleteBiz(biz.id)} className="p-1.5 text-gray-400 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {businesses.length === 0 && <p className="text-gray-400 text-sm text-center py-8">No businesses yet.</p>}
        </div>
      )}
    </div>
  )
}
