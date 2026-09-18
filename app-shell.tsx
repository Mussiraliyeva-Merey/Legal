'use client'

import { useState } from 'react'
import { Scale, MapPin, Globe2 } from 'lucide-react'
import { ClaimBuilder } from '@/components/claim-builder'
import { LANGS, T, type Jurisdiction, type Lang } from '@/lib/i18n'

export function AppShell() {
  const [lang, setLang] = useState<Lang>('ru')
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('kz')
  const t = T[lang]

  const tabs: { id: Jurisdiction; icon: typeof MapPin }[] = [
    { id: 'kz', icon: MapPin },
    { id: 'cis', icon: Globe2 },
  ]

  return (
    <main className="min-h-svh">
      <header className="border-b border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Scale className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h1 className="text-balance text-2xl font-bold leading-tight sm:text-3xl">
                  {t.header.title}
                </h1>
                <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-primary-foreground/80">
                  {t.header.subtitle}
                </p>
              </div>
            </div>

            <div
              className="flex shrink-0 overflow-hidden rounded-md border border-primary-foreground/25"
              role="group"
              aria-label="Language"
            >
              {LANGS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLang(l.id)}
                  aria-pressed={lang === l.id}
                  className={`px-3 py-1.5 text-xs font-semibold transition ${
                    lang === l.id
                      ? 'bg-accent text-accent-foreground'
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/10'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row" role="tablist" aria-label={t.jurisdiction.legend}>
            {tabs.map((tab) => {
              const Icon = tab.icon
              const active = jurisdiction === tab.id
              const copy = t.jurisdiction[tab.id]
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setJurisdiction(tab.id)}
                  className={`flex flex-1 items-start gap-3 rounded-md border p-4 text-left transition ${
                    active
                      ? 'border-accent bg-primary-foreground/10 ring-1 ring-accent'
                      : 'border-primary-foreground/20 hover:bg-primary-foreground/5'
                  }`}
                >
                  <Icon
                    className={`mt-0.5 h-5 w-5 shrink-0 ${active ? 'text-accent' : 'text-primary-foreground/70'}`}
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block text-sm font-semibold">{copy.label}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-primary-foreground/70">
                      {copy.description}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <ClaimBuilder key={jurisdiction} lang={lang} jurisdiction={jurisdiction} />

        <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
          {jurisdiction === 'cis' ? t.footerCis : t.footerKz}
        </p>
      </div>
    </main>
  )
}
