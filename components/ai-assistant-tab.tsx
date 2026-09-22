'use client'

import { useState, useRef, useEffect } from 'react'
import { Bot, User, Send, Loader2, ExternalLink, FileSignature, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang, type Lang } from '@/lib/lang'
import { LegalDictionary } from '@/components/legal-dictionary'
import { HowToUse } from '@/components/how-to-use'

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

const QUICK_BUTTONS: Record<Lang, string[]> = {
  ru: ['Вернуть товар', 'Мне отказали в возврате', 'Товар оказался бракованным', 'Похоже на подделку', 'Получил другой товар', 'Товар не пришёл', 'Продавец не отвечает', 'Не знаю, что делать'],
  kk: ['Тауарды қайтару', 'Қайтаруға бас тартты', 'Тауар ақаулы болды', 'Жалған сияқты', 'Басқа тауар келді', 'Тауар келмеді', 'Сатушы жауап бермейді', 'Не істеуімді білмеймін'],
  en: ['Return product', 'Return was refused', 'Product was defective', 'Looks like a fake', 'Got wrong item', 'Product did not arrive', 'Seller not responding', 'I don\'t know what to do'],
}

const HINT_BUTTONS: Record<Lang, string[]> = {
  ru: ['Что это означает?', 'Что делать дальше?', 'Какие доказательства нужны?', 'Куда обратиться?'],
  kk: ['Бұл нені білдіреді?', 'Одан әрі не істеу?', 'Қандай дәлелдер керек?', 'Қайда жүгіну?'],
  en: ['What does this mean?', 'What to do next?', 'What evidence is needed?', 'Where to go?'],
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
      if (!res.ok) throw new Error(json?.error || 'Не удалось получить ответ.')
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
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Bot className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-foreground">{t('ai.title')}</h2>
            <p className="text-sm text-muted-foreground">{t('ai.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Chat */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            <div
              ref={scrollRef}
              className="max-h-[32rem] min-h-[16rem] overflow-y-auto p-4 space-y-3"
            >
              {messages.length === 0 && (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <Bot className="h-12 w-12 text-muted-foreground/40" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground max-w-xs">
                    {lang === 'kk' ? 'Не болғанын жазыңыз немесе төмендегі нұсқаны таңдаңыз.' : lang === 'en' ? 'Write what happened or choose a quick option below.' : 'Напишите, что произошло, или выберите быстрый вариант ниже.'}
                  </p>
                </div>
              )}

              {messages.map((msg, i) => {
                const isUser = msg.role === 'user'
                const mp = !isUser ? detectMarketplace(msg.content) : null
                return (
                  <div key={i} className={cn('flex gap-2.5', isUser ? 'flex-row-reverse' : 'flex-row')}>
                    <span
                      className={cn(
                        'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                        isUser ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground',
                      )}
                    >
                      {isUser ? <User className="h-4 w-4" aria-hidden="true" /> : <Bot className="h-4 w-4" aria-hidden="true" />}
                    </span>
                    <div className="flex flex-col gap-2">
                      <div
                        className={cn(
                          'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                          isUser ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-secondary text-foreground rounded-tl-sm',
                        )}
                      >
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      </div>
                      {!isUser && (
                        <div className="flex flex-wrap gap-2">
                          {mp && MARKETPLACE_URLS[mp] && (
                            <a
                              href={MARKETPLACE_URLS[mp]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/50"
                            >
                              Перейти на {mp}
                              <ExternalLink className="h-3 w-3" aria-hidden="true" />
                            </a>
                          )}
                          <button
                            onClick={() => onGoToClaim(undefined, mp || undefined, undefined)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-primary bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition hover:bg-primary/10"
                          >
                            <FileSignature className="h-3 w-3" aria-hidden="true" />
                            Составить претензию
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
                <p className="rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">
                  {error}
                </p>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder={t('ai.placeholder')}
                  className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 max-h-32"
                />
                <button
                  type="button"
                  onClick={() => send(input)}
                  disabled={isLoading || !input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-50"
                  aria-label="Отправить"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick buttons */}
          <div className="flex gap-2 overflow-x-auto pb-1 lg:flex-wrap lg:overflow-visible">
            {QUICK_BUTTONS[lang].map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                disabled={isLoading}
                className="shrink-0 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground transition hover:border-primary/50 hover:bg-secondary disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Hint buttons */}
          {messages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {HINT_BUTTONS[lang].map((h) => (
                <button
                  key={h}
                  onClick={() => send(h)}
                  disabled={isLoading}
                  className="rounded-lg border border-dashed border-border bg-background px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary/50 hover:text-foreground disabled:opacity-50"
                >
                  {h}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => onGoToClaim()}
            className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
          >
            <FileSignature className="h-4 w-4" aria-hidden="true" />
            Составить претензию
          </button>

          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <button
              onClick={() => setShowDict(!showDict)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-sm font-semibold text-foreground">{t('dict.title')}</span>
              <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', showDict && 'rotate-180')} aria-hidden="true" />
            </button>
            {showDict && <div className="mt-4"><LegalDictionary /></div>}
          </div>

          <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <button
              onClick={() => setShowHowTo(!showHowTo)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-sm font-semibold text-foreground">{t('nav.howToUse')}</span>
              <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', showHowTo && 'rotate-180')} aria-hidden="true" />
            </button>
            {showHowTo && (
              <div className="mt-4">
                <HowToUse onStart={() => onGoToClaim()} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
