'use client'

import { useState } from 'react'
import { Check, Copy, Download, FileText, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { T, type Jurisdiction, type Lang } from '@/lib/i18n'

type Props = {
  lang: Lang
  jurisdiction: Jurisdiction
  result: string
  isLoading: boolean
  error: string | null
}

export function ResultPanel({ lang, jurisdiction, result, isLoading, error }: Props) {
  const [copied, setCopied] = useState(false)
  const t = T[lang]

  async function handleCopy() {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleDownload() {
    const blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `claim-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const hasContent = result.trim().length > 0

  return (
    <section className="flex min-h-[24rem] flex-col rounded-lg border border-border bg-card shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            3
          </span>
          <h2 className="text-lg font-semibold text-foreground">{t.result.title}</h2>
        </div>
        {hasContent && !isLoading && (
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
              {copied ? t.result.copied : t.result.copy}
            </Button>
            <Button type="button" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4" aria-hidden="true" />
              {t.result.download}
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 p-6">
        {error && (
          <p className="rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        {!error && !hasContent && !isLoading && (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground">
            <FileText className="h-10 w-10 opacity-40" aria-hidden="true" />
            <p className="max-w-sm text-sm leading-relaxed">{t.result.empty}</p>
          </div>
        )}

        {isLoading && !hasContent && (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
            <p className="text-sm">
              {jurisdiction === 'cis' ? t.result.loadingCis : t.result.loadingKz}
            </p>
          </div>
        )}

        {hasContent && (
          <article className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-card-foreground">
            {result}
            {isLoading && (
              <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-primary align-middle" />
            )}
          </article>
        )}
      </div>
    </section>
  )
}
