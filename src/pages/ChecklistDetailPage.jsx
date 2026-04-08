import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { CheckSquare, Square, RotateCcw, ArrowLeft, Printer } from 'lucide-react'
import { useChecklist } from '../hooks/useChecklists'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'

export default function ChecklistDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { checklist, loading, error } = useChecklist(slug)
  const [checked, setChecked] = useState({})

  // Load saved state from localStorage
  useEffect(() => {
    if (!slug) return
    const saved = localStorage.getItem(`checklist_${slug}`)
    if (saved) {
      try { setChecked(JSON.parse(saved)) } catch {}
    }
  }, [slug])

  // Save to localStorage on change
  useEffect(() => {
    if (!slug || !checklist) return
    localStorage.setItem(`checklist_${slug}`, JSON.stringify(checked))
  }, [checked, slug, checklist])

  function toggle(id) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }))
  }

  function reset() {
    if (window.confirm('Reset all progress on this checklist?')) {
      setChecked({})
    }
  }

  if (loading) return <div className="max-w-2xl mx-auto px-4 py-10"><Spinner /></div>
  if (error || !checklist) return (
    <div className="max-w-2xl mx-auto px-4 py-10 text-center">
      <p className="text-red-500 mb-4">{error || 'Checklist not found'}</p>
      <Link to="/checklists" className="btn-primary inline-block">Back to Checklists</Link>
    </div>
  )

  const items = Array.isArray(checklist.items) ? checklist.items : []
  const completedCount = items.filter(item => checked[item.id]).length
  const progress = items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <Badge label={checklist.category} />
        <h1 className="text-3xl font-bold text-navy mt-3 leading-tight">{checklist.title}</h1>
        {checklist.description && (
          <p className="text-gray-500 mt-2">{checklist.description}</p>
        )}
      </div>

      {/* Progress */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {completedCount} of {items.length} completed
          </span>
          <span className="text-sm font-bold text-teal-600">{progress}%</span>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-teal-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <p className="text-sm text-green-600 font-medium mt-2 flex items-center gap-1.5">
            <CheckSquare className="h-4 w-4" />
            All done! Great work.
          </p>
        )}
      </div>

      {/* Checklist items */}
      <div className="space-y-2 mb-6">
        {items.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => toggle(item.id)}
            className={`w-full text-left flex items-start gap-3 p-4 rounded-xl border transition-all ${
              checked[item.id]
                ? 'bg-teal-50 border-teal-200'
                : 'bg-white border-gray-100 hover:border-teal-200'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {checked[item.id] ? (
                <CheckSquare className="h-5 w-5 text-teal-500" />
              ) : (
                <Square className="h-5 w-5 text-gray-300" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <span className="text-xs font-medium text-gray-400 shrink-0 mt-0.5">{idx + 1}.</span>
                <span className={`text-sm font-medium ${checked[item.id] ? 'text-teal-700 line-through' : 'text-navy'}`}>
                  {item.text}
                </span>
              </div>
              {item.note && (
                <p className="text-xs text-gray-400 mt-1 ml-5">{item.note}</p>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-red-300 hover:text-red-600 transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Reset progress
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:border-gray-300 transition-colors"
        >
          <Printer className="h-4 w-4" />
          Print
        </button>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>
    </div>
  )
}
