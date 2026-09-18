'use client'

import { useRef, useState } from 'react'
import { FileSignature, MessageCircleQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProblemForm } from '@/components/problem-form'
import { ResultPanel } from '@/components/result-panel'
import {
  ERROR_SENTINEL,
  MARKETPLACES,
  T,
  type Jurisdiction,
  type Lang,
  type ProblemType,
} from '@/lib/i18n'

type Props = {
  lang: Lang
  jurisdiction: Jurisdiction
}

export function ClaimBuilder({ lang, jurisdiction }: Props) {
  const t = T[lang]
  const [marketplace, setMarketplace] = useState(MARKETPLACES[jurisdiction][0])
  const [problemType, setProblemType] = useState<ProblemType | null>('defect')
  const [situation, setSituation] = useState('')
  const [country, setCountry] = useState('')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  async function generate(mode: 'claim' | 'consult') {
    if (isLoading) {
      abortRef.current?.abort()
    }
    setError(null)
    setResult('')
    setIsLoading(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          marketplace,
          problemType,
          situation,
          mode,
          lang,
          jurisdiction,
          country,
        }),
        signal: controller.signal,
      })

      if (!response.ok || !response.body) {
        let detail = ''
        try {
          const data = await response.json()
          detail = data?.error ? ` (${data.error})` : ''
        } catch {
          detail = ''
        }
        throw new Error(t.error + detail)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        const sentinelIndex = buffer.indexOf(ERROR_SENTINEL)
        if (sentinelIndex !== -1) {
          const kind = buffer.slice(sentinelIndex + ERROR_SENTINEL.length).trim()
          setResult('')
          setError(kind === 'billing' ? t.billingError : t.error)
          return
        }

        setResult(buffer)
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError((err as Error).message || t.error)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-6">
        <ProblemForm
          lang={lang}
          jurisdiction={jurisdiction}
          marketplace={marketplace}
          setMarketplace={setMarketplace}
          problemType={problemType}
          setProblemType={(v) => setProblemType(v)}
          country={country}
          setCountry={setCountry}
        />

        <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              2
            </span>
            <h2 className="text-lg font-semibold text-foreground">{t.step2.title}</h2>
          </div>

          <label htmlFor="situation" className="sr-only">
            {t.step2.srLabel}
          </label>
          <textarea
            id="situation"
            value={situation}
            onChange={(e) => setSituation(e.target.value)}
            rows={6}
            placeholder={t.step2.placeholder}
            className="w-full resize-y rounded-md border border-input bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none ring-ring/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2"
          />

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Button
              type="button"
              onClick={() => generate('claim')}
              disabled={isLoading}
              className="flex-1"
            >
              <FileSignature className="h-4 w-4" aria-hidden="true" />
              {t.buttons.claim}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => generate('consult')}
              disabled={isLoading}
              className="flex-1"
            >
              <MessageCircleQuestion className="h-4 w-4" aria-hidden="true" />
              {t.buttons.consult}
            </Button>
          </div>
        </section>
      </div>

      <ResultPanel
        lang={lang}
        jurisdiction={jurisdiction}
        result={result}
        isLoading={isLoading}
        error={error}
      />
    </div>
  )
}
