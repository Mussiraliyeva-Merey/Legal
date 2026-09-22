'use client'

import { useState } from 'react'
import { Search, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang, type Lang } from '@/lib/lang'
import { TERMS, TERM_CATEGORIES } from '@/lib/terms'

export function LegalDictionary() {
  const { lang, t } = useLang()
  const [query, setQuery] = useState('')
  const [categoryIdx, setCategoryIdx] = useState(0)

  const categories = TERM_CATEGORIES[lang]
  const selectedCategory = categories[categoryIdx]

  const filtered = TERMS.filter((term) => {
    const word = term.word[lang].toLowerCase()
    const def = term.definition[lang].toLowerCase()
    const matchesQuery = word.includes(query.toLowerCase()) || def.includes(query.toLowerCase())
    const matchesCategory = categoryIdx === 0 || term.category[lang] === selectedCategory
    return matchesQuery && matchesCategory
  })

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />
        <h3 className="text-base font-semibold text-foreground">{t('dict.title')}</h3>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">{t('dict.subtitle')}</p>

      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('dict.search')}
          className="w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2.5 text-sm text-foreground outline-none ring-ring/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {categories.map((c, i) => (
          <button
            key={c}
            onClick={() => setCategoryIdx(i)}
            className={cn(
              'rounded-lg border px-3 py-1.5 text-xs font-medium transition',
              categoryIdx === i
                ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                : 'border-border bg-card text-muted-foreground hover:border-primary/50',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((term) => (
          <div
            key={term.word.ru}
            className="rounded-lg border border-border bg-background p-4 transition hover:border-primary/30"
          >
            <h4 className="text-sm font-semibold text-foreground">{term.word[lang]}</h4>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{term.definition[lang]}</p>
            <span className="mt-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">
              {term.category[lang]}
            </span>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-6 text-center text-sm text-muted-foreground">{t('dict.empty')}</p>
      )}
    </div>
  )
}
