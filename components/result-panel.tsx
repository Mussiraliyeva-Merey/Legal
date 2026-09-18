'use client'

import { useState } from 'react'
import { Check, Copy, FileDown, FileType, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  result: string
  isLoading: boolean
}

export function ResultPanel({ result, isLoading }: Props) {
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState<'pdf' | 'docx' | null>(null)

  async function handleCopy() {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleDownloadPDF() {
    setDownloading('pdf')
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({
        unit: 'mm',
        format: 'a4',
      })

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()
      const margin = 20
      const maxWidth = pageWidth - margin * 2
      const lineHeight = 7

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(11)

      const lines = result.split('\n')
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

      doc.save(`pretenziya-${new Date().toISOString().slice(0, 10)}.pdf`)
    } catch (err) {
      console.error('PDF error:', err)
    } finally {
      setDownloading(null)
    }
  }

  async function handleDownloadDOCX() {
    setDownloading('docx')
    try {
      const escaped = result
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
      link.download = `pretenziya-${new Date().toISOString().slice(0, 10)}.docx`
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

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
        <div className="border-b border-border bg-secondary/50 px-6 py-4">
          <h3 className="text-base font-semibold text-foreground">Готовая претензия</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Документ полностью готов к отправке. Проверьте данные и скачайте.
          </p>
        </div>

        <div className="p-6">
          <article className="whitespace-pre-wrap font-serif text-[15px] leading-relaxed text-card-foreground">
            {result}
            {isLoading && (
              <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-primary align-middle" />
            )}
          </article>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
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
  )
}
