'use client'

import { use, useState, useEffect } from 'react'
import { Scale, Loader2, FileDown, FileType, Copy, Check, ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

type ClaimData = {
  id: string
  claimText: string
  country: string | null
  marketplace: string | null
  problemType: string | null
  createdAt: string
}

export default function ClaimPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [claim, setClaim] = useState<ClaimData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState<'pdf' | 'docx' | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/claims/${id}`)
        const json = await res.json()
        if (!res.ok) {
          setError(json?.error || 'Претензия не найдена.')
        } else {
          setClaim(json)
        }
      } catch {
        setError('Не удалось загрузить претензию.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  async function handleCopy() {
    if (!claim) return
    await navigator.clipboard.writeText(claim.claimText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleDownloadPDF() {
    if (!claim) return
    setDownloading('pdf')
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ unit: 'mm', format: 'a4' })
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 20
      const maxWidth = pageWidth - margin * 2
      const lineHeight = 7

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(11)

      const lines = claim.claimText.split('\n')
      let y = margin

      for (const line of lines) {
        if (y > pageHeight - margin) {
          doc.addPage()
          y = margin
        }
        if (line.trim() === '') {
          y += lineHeight / 2
          continue
        }
        const splitLines = doc.splitTextToSize(line, maxWidth)
        for (const sl of splitLines) {
          if (y > pageHeight - margin) {
            doc.addPage()
            y = margin
          }
          doc.text(sl, margin, y)
          y += lineHeight
        }
      }
      doc.save(`pretenziya-${id}.pdf`)
    } catch (err) {
      console.error('PDF error:', err)
    } finally {
      setDownloading(null)
    }
  }

  async function handleDownloadDOCX() {
    if (!claim) return
    setDownloading('docx')
    try {
      const escaped = claim.claimText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

      const paragraphs = escaped
        .split('\n')
        .map((line) => {
          if (line.trim() === '') return '<w:p/>'
          return `<w:p><w:r><w:t xml:space="preserve">${line}</w:t></w:r></w:p>`
        })
        .join('')

      const docxXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<?mso-application progid="Word.Document"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
<w:body>
${paragraphs}
</w:body>
</w:document>`

      const blob = new Blob(['\ufeff', docxXml], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `pretenziya-${id}.docx`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('DOCX error:', err)
    } finally {
      setDownloading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden="true" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-background px-4">
        <Scale className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
        <p className="text-lg font-semibold text-foreground">{error}</p>
        <a
          href="/"
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition hover:bg-secondary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          На главную
        </a>
      </div>
    )
  }

  return (
    <main className="min-h-svh bg-background">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <Scale className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-base font-bold">Daryn Legal</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="mb-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            На главную
          </a>
        </div>

        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="border-b border-border bg-secondary/50 px-6 py-4">
            <h1 className="text-base font-semibold text-foreground">Претензия</h1>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Документ готов к отправке. Скачайте и используйте.
            </p>
          </div>
          <div className="p-6">
            <article className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-card-foreground">
              {claim?.claimText}
            </article>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={downloading !== null}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:translate-y-px disabled:opacity-50',
            )}
          >
            {downloading === 'pdf' ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            ) : (
              <FileDown className="h-5 w-5" aria-hidden="true" />
            )}
            Скачать PDF
          </button>
          <button
            type="button"
            onClick={handleDownloadDOCX}
            disabled={downloading !== null}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground shadow-sm transition hover:bg-secondary active:translate-y-px disabled:opacity-50"
          >
            {downloading === 'docx' ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            ) : (
              <FileType className="h-5 w-5" aria-hidden="true" />
            )}
            Скачать DOCX
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3.5 text-sm font-semibold text-foreground shadow-sm transition hover:bg-secondary active:translate-y-px"
          >
            {copied ? (
              <Check className="h-5 w-5 text-green-600" aria-hidden="true" />
            ) : (
              <Copy className="h-5 w-5" aria-hidden="true" />
            )}
            {copied ? 'Скопировано' : 'Скопировать'}
          </button>
        </div>
      </div>
    </main>
  )
}
