import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Send, Bot, AlertCircle, Loader2 } from 'lucide-react'
import ChatMessage from '../components/ai/ChatMessage'
import { sendMessage } from '../lib/anthropic'

const SUGGESTED_QUESTIONS = [
  'How do I renew my iqama?',
  'What documents do I need to open a bank account?',
  'How does EOSB work in Oman?',
  "What's the best area to rent in Muscat?",
  'How do I convert my driving licence?',
]

export default function AskPage() {
  const [searchParams] = useSearchParams()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  // Pre-fill from URL param (e.g., from guide detail page)
  useEffect(() => {
    const q = searchParams.get('q')
    if (q) setInput(q)
  }, [searchParams])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function handleSend(text) {
    const question = (text || input).trim()
    if (!question || loading) return

    const userMsg = { role: 'user', content: question }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const apiMessages = nextMessages.map(m => ({ role: m.role, content: m.content }))
      const reply = await sendMessage(apiMessages)
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col" style={{ minHeight: 'calc(100vh - 64px - 280px)' }}>
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-3">
          <Bot className="h-7 w-7 text-teal-400" />
        </div>
        <h1 className="text-2xl font-bold text-navy">Ask 360Oman</h1>
        <p className="text-gray-500 text-sm mt-1">Ask anything about living, working, or settling in Oman.</p>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 flex items-start gap-2">
        <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700">
          360Oman AI provides general guidance. Always verify visa and legal information with official sources.
        </p>
      </div>

      {/* Suggested questions — shown when no messages */}
      {messages.length === 0 && (
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map(q => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-sm bg-white border border-gray-200 hover:border-teal-300 hover:text-teal-600 text-gray-600 px-3 py-2 rounded-full transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 space-y-4 mb-4">
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center shrink-0">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
              <Loader2 className="h-4 w-4 text-teal-500 animate-spin" />
            </div>
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600">
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="bg-white border border-gray-200 rounded-2xl flex items-end gap-2 p-3 shadow-sm focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-transparent">
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about life in Oman..."
          rows={1}
          className="flex-1 resize-none text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400 max-h-32"
          style={{ minHeight: '24px' }}
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="shrink-0 w-9 h-9 bg-teal-500 hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
          aria-label="Send"
        >
          <Send className="h-4 w-4 text-white" />
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">Press Enter to send · Shift+Enter for new line</p>
    </div>
  )
}
