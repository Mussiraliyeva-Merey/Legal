'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, User, Send, Loader as Loader2, ExternalLink, Signature as FileSignature, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang'
import { LegalDictionary } from '@/components/legal-dictionary'
import { HowToUse } from '@/components/how-to-use'
import { ReviewPrompt } from '@/components/review-prompt'
import { QUICK_BUTTONS_I18N, HINT_BUTTONS_I18N } from '@/lib/i18n-content'

type ChatMessage = { role: 'user' | 'assistant'; content: string }

const MARKETPLACE_URLS: Record<string, string> = {
  'Kaspi.kz': 'https://kaspi.kz',
  'Halyk Market': 'https://market.halykbank.kz',
  ForteMarket: 'https://forte.market',
  Wildberries: 'https://wildberries.ru',
  Ozon: 'https://ozon.ru',
  'Yandex Market': 'https://market.yandex.ru',
  AliExpress: 'https://aliexpress.com',
  ZoodMall: 'https://zoodmall.com',
  'Uzum Market': 'https://uzum.uz',
  Мегамаркет: 'https://megamarket.ru',
  'Магнит Маркет': 'https://magnit.ru',
  Avito: 'https://avito.ru',
  Pinduoduo: 'https://pinduoduo.com',
  Temu: 'https://temu.com',
  Taobao: 'https://taobao.com',
  '1688': 'https://1688.com',
  SHEIN: 'https://shein.com',
  Amazon: 'https://amazon.com',
  eBay: 'https://ebay.com',
  Alibaba: 'https://alibaba.com',
  'JD.com': 'https://jd.com',
  DHgate: 'https://dhgate.com',
}

type Props = {
  onGoToClaim: (problemType?: string, marketplace?: string, description?: string) => void
}

export function AiAssistantTab({ onGoToClaim }: Props) {
  const { lang, t } = useLang()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDict, setShowDict] = useState(false)
  const [showHowTo, setShowHowTo] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const sessionRef = useRef<string>(crypto.randomUUID())
  const reviewKeyRef = useRef<string>(crypto.randomUUID())
  const recordedRef = useRef(new Set<string>())
  const [consultationDone, setConsultationDone] = useState(false)
  const [showReview, setShowReview] = useState(true)

  const quickButtons = QUICK_BUTTONS_I18N[lang]
  const hintButtons = HINT_BUTTONS_I18N[lang]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading])

  async function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    const userMsg: ChatMessage = { role: 'user', content: trimmed }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setError(null)
    setIsLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, lang }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || t('common.error'))
      setMessages([...newMessages, { role: 'assistant', content: json.reply }])
      if (json.problemType && !recordedRef.current.has(json.problemType)) {
        recordedRef.current.add(json.problemType)
        fetch('/api/stats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ problemType: json.problemType, sessionId: sessionRef.current }) }).catch(() => {})
      }
    } catch (err) {
      setError((err as Error).message || t('common.error'))
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  function detectMarketplace(text: string): string | null {
    const lower = text.toLowerCase()
    for (const [name, url] of Object.entries(MARKETPLACE_URLS)) {
      if (lower.includes(name.toLowerCase())) return name
    }
    return null
  }

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <div className="flex items-start gap-3 sm:items-center mb-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Bot className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-foreground sm:text-xl">{t('ai.title')}</h2>
            <p className="text-sm text-muted-foreground">{t('ai.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div ref={scrollRef} className="min-h-[17rem] max-h-[52svh] overflow-y-auto space-y-3 p-3 sm:min-h-[18rem] sm:max-h-[32rem] sm:p-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <Bot className="h-12 w-12 text-muted-foreground/40" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground max-w-xs">{t('ai.emptyState')}</p>
                </div>
              )}

              {messages.map((msg, i) => {
                const isUser = msg.role === 'user'
                const mp = !isUser ? detectMarketplace(msg.content) : null
                return (
                  <div key={i} className={cn('flex min-w-0 gap-2.5', isUser ? 'flex-row-reverse' : 'flex-row')}>
                    <span className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-full', isUser ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground')}>
                      {isUser ? <User className="h-4 w-4" aria-hidden="true" /> : <Bot className="h-4 w-4" aria-hidden="true" />}
                    </span>
                    <div className="min-w-0 flex flex-col gap-2">
                      <div className={cn('max-w-[calc(100vw-6.5rem)] break-words sm:max-w-[85%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed sm:px-4', isUser ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-secondary text-foreground rounded-tl-sm')}>
                        <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      </div>
                      {!isUser && (
                        <div className="flex flex-wrap gap-2">
                          {mp && MARKETPLACE_URLS[mp] && (
                            <a href={MARKETPLACE_URLS[mp]} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/50">
                              {t('ai.goToMarketplace')} {mp}
                              <ExternalLink className="h-3 w-3" aria-hidden="true" />
                            </a>
                          )}
                          <button onClick={() => onGoToClaim(undefined, mp || undefined, undefined)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-primary bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/10">
                            <FileSignature className="h-3 w-3" aria-hidden="true" />
                            {t('ai.createClaim')}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

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
                <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">{error}</p>
              )}
            </div>

            <div className="border-t border-border p-3 sm:p-4">
              <div className="flex gap-2">
                <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} rows={1}
                  placeholder={t('ai.placeholder')}
                  className="max-h-32 flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-base text-foreground outline-none ring-ring/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 sm:text-sm" />
                <button type="button" onClick={() => send(input)} disabled={isLoading || !input.trim()}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50 sm:h-10 sm:w-10"
                  aria-label={t('ai.send')}>
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
            {quickButtons.map((q) => (
              <button key={q} onClick={() => send(q)} disabled={isLoading}
                className="shrink-0 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground transition hover:border-primary/50 hover:bg-secondary disabled:opacity-50">
                {q}
              </button>
            ))}
          </div>

          {messages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hintButtons.map((h) => (
                <button key={h} onClick={() => send(h)} disabled={isLoading}
                  className="rounded-lg border border-dashed border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground disabled:opacity-50">
                  {h}
                </button>
              ))}
            </div>
          )}
          {messages.length >= 2 && !consultationDone && (
            <button type="button" onClick={() => setConsultationDone(true)} className="self-start rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary">{t('ai.finishConsultation')}</button>
          )}
          {consultationDone && showReview && <ReviewPrompt source="ai_assistant" submissionKey={reviewKeyRef.current} title={t('ai.reviewTitle')} onDone={() => setShowReview(false)} />}
        </div>

        <div className="flex flex-col gap-4">
          <button onClick={() => onGoToClaim()}
            className="sticky bottom-3 z-10 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:bg-primary/90 lg:static lg:min-h-0 lg:shadow-sm">
            <FileSignature className="h-4 w-4" aria-hidden="true" />
            {t('ai.createClaim')}
          </button>

          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <button onClick={() => setShowDict(!showDict)} className="flex w-full items-center justify-between text-left">
              <span className="text-sm font-semibold text-foreground">{t('dict.title')}</span>
              <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', showDict && 'rotate-180')} aria-hidden="true" />
            </button>
            {showDict && <div className="mt-4"><LegalDictionary /></div>}
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <button onClick={() => setShowHowTo(!showHowTo)} className="flex w-full items-center justify-between text-left">
              <span className="text-sm font-semibold text-foreground">{t('nav.howToUse')}</span>
              <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', showHowTo && 'rotate-180')} aria-hidden="true" />
            </button>
            {showHowTo && <div className="mt-4"><HowToUse onStart={() => onGoToClaim()} /></div>}
          </div>
        </div>
      </div>
    </div>
  )
}
