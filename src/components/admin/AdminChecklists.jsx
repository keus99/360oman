import { useState, useEffect } from 'react'
import { Plus, Edit2, Eye, EyeOff, Trash2, X, Save, GripVertical, PlusCircle, MinusCircle } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import Spinner from '../ui/Spinner'

const CATEGORIES = ['Arrival', 'Visas', 'Driving', 'Banking', 'Housing', 'Education', 'Healthcare']
const EMPTY = { title: '', slug: '', category: CATEGORIES[0], description: '', items: [], is_published: true }

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function AdminChecklists() {
  const [checklists, setChecklists] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('checklists').select('*').order('created_at')
    setChecklists(data || [])
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  function openNew() { setEditing({ ...EMPTY, items: [{ id: '1', text: '', note: '' }] }) }
  function openEdit(cl) { setEditing({ ...cl, items: cl.items || [] }) }
  function close() { setEditing(null); setError(null) }

  function addItem() {
    const newId = String(Date.now())
    setEditing(e => ({ ...e, items: [...e.items, { id: newId, text: '', note: '' }] }))
  }
  function removeItem(id) {
    setEditing(e => ({ ...e, items: e.items.filter(i => i.id !== id) }))
  }
  function updateItem(id, field, value) {
    setEditing(e => ({ ...e, items: e.items.map(i => i.id === id ? { ...i, [field]: value } : i) }))
  }

  async function save() {
    setSaving(true); setError(null)
    const payload = {
      title: editing.title,
      slug: editing.slug || slugify(editing.title),
      category: editing.category,
      description: editing.description,
      items: editing.items.filter(i => i.text.trim()),
      is_published: editing.is_published,
      updated_at: new Date().toISOString(),
    }
    try {
      if (editing.id) {
        const { error: err } = await supabase.from('checklists').update(payload).eq('id', editing.id)
        if (err) throw err
      } else {
        const { error: err } = await supabase.from('checklists').insert(payload)
        if (err) throw err
      }
      await load(); close()
    } catch (err) { setError(err.message) } finally { setSaving(false) }
  }

  async function togglePublished(cl) {
    await supabase.from('checklists').update({ is_published: !cl.is_published }).eq('id', cl.id)
    setChecklists(cls => cls.map(c => c.id === cl.id ? { ...c, is_published: !c.is_published } : c))
  }
  async function deleteChecklist(id) {
    if (!window.confirm('Delete this checklist?')) return
    await supabase.from('checklists').delete().eq('id', id)
    setChecklists(cls => cls.filter(c => c.id !== id))
  }

  if (editing !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-navy">{editing.id ? 'Edit Checklist' : 'New Checklist'}</h2>
          <button onClick={close} className="p-2 text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>
        {error && <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm mb-4">{error}</div>}
        <div className="space-y-3">
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Title *"
            value={editing.title}
            onChange={e => setEditing({ ...editing, title: e.target.value, slug: slugify(e.target.value) })}
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
            placeholder="Description"
            rows={2}
            value={editing.description}
            onChange={e => setEditing({ ...editing, description: e.target.value })}
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">Checklist Items</p>
              <button onClick={addItem} className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700">
                <PlusCircle className="h-3.5 w-3.5" /> Add item
              </button>
            </div>
            <div className="space-y-2">
              {editing.items.map((item, idx) => (
                <div key={item.id} className="flex items-start gap-2">
                  <span className="text-xs text-gray-300 mt-2.5 w-5 text-right shrink-0">{idx + 1}.</span>
                  <div className="flex-1 space-y-1">
                    <input
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Step text *"
                      value={item.text}
                      onChange={e => updateItem(item.id, 'text', e.target.value)}
                    />
                    <input
                      className="w-full border border-gray-100 rounded-lg px-3 py-1.5 text-xs text-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-400 bg-gray-50"
                      placeholder="Optional note or detail"
                      value={item.note}
                      onChange={e => updateItem(item.id, 'note', e.target.value)}
                    />
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-1.5 text-gray-300 hover:text-red-400 mt-1">
                    <MinusCircle className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={editing.is_published} onChange={e => setEditing({ ...editing, is_published: e.target.checked })} className="rounded" />
            Published
          </label>
          <div className="flex gap-3 pt-2">
            <button onClick={save} disabled={saving || !editing.title} className="btn-primary flex items-center gap-2">
              <Save className="h-4 w-4" />
              {saving ? 'Saving…' : 'Save Checklist'}
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
        <h2 className="text-xl font-bold text-navy">Checklists ({checklists.length})</h2>
        <button onClick={openNew} className="btn-primary flex items-center gap-2 text-sm py-2">
          <Plus className="h-4 w-4" /> New Checklist
        </button>
      </div>
      {loading ? <Spinner /> : (
        <div className="space-y-2">
          {checklists.map(cl => (
            <div key={cl.id} className="bg-white border border-gray-100 rounded-lg px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-navy truncate">{cl.title}</p>
                <p className="text-xs text-gray-400">{cl.category} · {(cl.items || []).length} items</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${cl.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {cl.is_published ? 'Published' : 'Draft'}
              </span>
              <button onClick={() => togglePublished(cl)} className="p-1.5 text-gray-400 hover:text-navy">
                {cl.is_published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
              <button onClick={() => openEdit(cl)} className="p-1.5 text-gray-400 hover:text-teal-600">
                <Edit2 className="h-4 w-4" />
              </button>
              <button onClick={() => deleteChecklist(cl.id)} className="p-1.5 text-gray-400 hover:text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {checklists.length === 0 && <p className="text-gray-400 text-sm text-center py-8">No checklists yet.</p>}
        </div>
      )}
    </div>
  )
}
