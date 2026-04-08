import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronRight, Calendar, ThumbsUp, ThumbsDown, MessageCircle, ArrowLeft } from 'lucide-react'
import { useGuide } from '../hooks/useGuides'
import { supabase } from '../lib/supabase'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'
import GuideCard from '../components/guides/GuideCard'

function MarkdownContent({ content }) {
  // Simple markdown renderer — converts common markdown to HTML-safe JSX
  if (!content) return null
  const lines = content.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('# ')) {
      elements.push(<h1 key={i}>{line.slice(2)}</h1>)
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i}>{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={i}>{line.slice(4)}</h3>)
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const items = []
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        items.push(<li key={i}>{lines[i].slice(2)}</li>)
        i++
      }
      elements.push(<ul key={`ul-${i}`}>{items}</ul>)
      continue
    } else if (/^\d+\. /.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(<li key={i}>{lines[i].replace(/^\d+\. /, '')}</li>)
        i++
      }
      elements.push(<ol key={`ol-${i}`}>{items}</ol>)
      continue
    } else if (line.startsWith('> ')) {
      elements.push(<blockquote key={i}>{line.slice(2)}</blockquote>)
    } else if (line.trim() === '') {
      // skip blank lines between block elements
    } else {
      elements.push(<p key={i}>{line}</p>)
    }
    i++
  }

  return <div className="prose">{elements}</div>
}

export default function GuideDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { guide, related, loading, error } = useGuide(slug)
  const [voted, setVoted] = useState(null)
  const [votingLoading, setVotingLoading] = useState(false)

  async function handleVote(type) {
    if (voted || votingLoading) return
    setVotingLoading(true)
    try {
      const field = type === 'up' ? 'helpful_count' : 'not_helpful_count'
      await supabase.rpc('increment_guide_vote', { guide_id: guide.id, vote_field: field })
      setVoted(type)
    } catch {
      // Silently fail — votes are best-effort
      setVoted(type)
    } finally {
      setVotingLoading(false)
    }
  }

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-10"><Spinner /></div>
  if (error || !guide) return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-center">
      <p className="text-red-500 mb-4">{error || 'Guide not found'}</p>
      <Link to="/guides" className="btn-primary inline-block">Back to Guides</Link>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-sm text-gray-400 mb-6 flex-wrap">
            <Link to="/" className="hover:text-teal-500">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to="/guides" className="hover:text-teal-500">Guides</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link to={`/guides?category=${encodeURIComponent(guide.category)}`} className="hover:text-teal-500">
              {guide.category}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-600 truncate max-w-[200px]">{guide.title}</span>
          </nav>

          {/* Title block */}
          <div className="mb-6">
            <Badge label={guide.category} />
            <h1 className="text-3xl font-bold text-navy mt-3 leading-tight">{guide.title}</h1>
            {guide.last_verified && (
              <div className="flex items-center gap-1.5 mt-2 text-sm text-gray-400">
                <Calendar className="h-4 w-4" />
                Last verified: {new Date(guide.last_verified).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            )}
            {guide.summary && (
              <p className="mt-3 text-lg text-gray-600 border-l-4 border-teal-500 pl-4 italic">
                {guide.summary}
              </p>
            )}
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8">
            <MarkdownContent content={guide.content} />
          </div>

          {/* Tags */}
          {guide.tags && guide.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {guide.tags.map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-500 text-xs px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Helpfulness */}
          <div className="mt-8 bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-sm font-medium text-gray-700 mb-3">Was this guide helpful?</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleVote('up')}
                disabled={!!voted}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  voted === 'up'
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : voted
                    ? 'opacity-50 cursor-not-allowed border-gray-200 text-gray-400'
                    : 'border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-700'
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                Yes, helpful
              </button>
              <button
                onClick={() => handleVote('down')}
                disabled={!!voted}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  voted === 'down'
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : voted
                    ? 'opacity-50 cursor-not-allowed border-gray-200 text-gray-400'
                    : 'border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-700'
                }`}
              >
                <ThumbsDown className="h-4 w-4" />
                Needs improvement
              </button>
            </div>
            {voted && (
              <p className="text-sm text-gray-500 mt-2">Thank you for your feedback!</p>
            )}
          </div>

          {/* Ask AI CTA */}
          <Link
            to={`/ask?q=${encodeURIComponent(`Tell me more about: ${guide.title}`)}`}
            className="mt-4 flex items-center gap-3 bg-teal-50 border border-teal-100 rounded-xl p-4 hover:bg-teal-100 transition-colors group"
          >
            <MessageCircle className="h-5 w-5 text-teal-500 shrink-0" />
            <div>
              <p className="text-sm font-medium text-teal-700">Ask AI about this guide</p>
              <p className="text-xs text-teal-500">Get instant answers from 360Oman AI</p>
            </div>
            <ChevronRight className="h-4 w-4 text-teal-400 ml-auto group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 flex items-center gap-1.5 text-sm text-gray-500 hover:text-navy"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </main>

        {/* Sidebar */}
        {related.length > 0 && (
          <aside className="lg:w-72 shrink-0">
            <h3 className="font-semibold text-navy mb-4">Related Guides</h3>
            <div className="space-y-3">
              {related.map(g => (
                <GuideCard key={g.id} guide={g} />
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
