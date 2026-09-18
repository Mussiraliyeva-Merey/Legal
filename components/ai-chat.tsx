'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

type ChatContext = {
  country?: string
  marketplace?: string
  orderNumber?: string
  productName?: string
  problemType?: string
  claim?: string
}

type Props = {
  context: ChatContext
}

export function AiChat({ context }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  async function send() {
    if (!input.trim() || isLoading) return

    const userMsg: ChatMessage = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          context,
        }),
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error(json?.error || 'Не удалось получить ответ.')
      }

      setMessages([...newMessages, { role: 'assistant', content: json.reply }])
    } catch (err) {
      setError((err as Error).message || 'Произошла ошибка. Попробуйте ещё раз.')
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const suggestions = [
    'Что делать, если продавец не отвечает?',
    'Куда мне обратиться?',
    'Почему выбран именно этот закон?',
    'Что делать, если срок уже прошёл?',
  ]

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border bg-secondary/50 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-foreground">Вопрос AI</h3>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          AI помнит контекст вашей ситуации и может обновить претензию
        </p>
      </div>

      <div
        ref={scrollRef}
        className="max-h-[28rem] min-h-[12rem] overflow-y-auto p-4 space-y-3"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <Bot className="h-10 w-10 text-muted-foreground/40" aria-hidden="true" />
            <p className="text-sm text-muted-foreground max-w-xs">
              Задайте вопрос по вашей ситуации. AI помнит все данные о заказе и проблеме.
            </p>
            <div className="flex flex-col gap-2 w-full max-w-sm">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => setInput(s)}
                  className="rounded-lg border border-border bg-background px-3 py-2 text-xs text-left text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              'flex gap-2.5',
              msg.role === 'user' ? 'flex-row-reverse' : 'flex-row',
            )}
          >
            <span
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-accent text-accent-foreground',
              )}
            >
              {msg.role === 'user' ? (
                <User className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Bot className="h-4 w-4" aria-hidden="true" />
              )}
            </span>
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-secondary text-foreground rounded-tl-sm',
              )}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Bot className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="rounded-2xl rounded-tl-sm bg-secondary px-4 py-3">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" aria-hidden="true" />
            </div>
          </div>
        )}

        {error && (
          <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
            {error}
          </p>
        )}
      </div>

      <div className="border-t border-border p-3">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="Ваш вопрос..."
            className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 max-h-32"
          />
          <button
            type="button"
            onClick={send}
            disabled={isLoading || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
            aria-label="Отправить"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
