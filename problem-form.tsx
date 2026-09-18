'use client'

import { PackageX, ShieldAlert, Clock, Undo2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  MARKETPLACES,
  T,
  type Jurisdiction,
  type Lang,
  type ProblemType,
} from '@/lib/i18n'

const ICONS: Record<ProblemType, LucideIcon> = {
  defect: PackageX,
  counterfeit: ShieldAlert,
  delay: Clock,
  refusal: Undo2,
}

const PROBLEM_ORDER: ProblemType[] = ['defect', 'counterfeit', 'delay', 'refusal']

type Props = {
  lang: Lang
  jurisdiction: Jurisdiction
  marketplace: string
  setMarketplace: (value: string) => void
  problemType: ProblemType | null
  setProblemType: (value: ProblemType) => void
  country: string
  setCountry: (value: string) => void
}

export function ProblemForm({
  lang,
  jurisdiction,
  marketplace,
  setMarketplace,
  problemType,
  setProblemType,
  country,
  setCountry,
}: Props) {
  const t = T[lang]

  return (
    <section className="rounded-lg border border-border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          1
        </span>
        <h2 className="text-lg font-semibold text-foreground">{t.step1.title}</h2>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="marketplace"
            className="mb-2 block text-sm font-medium text-muted-foreground"
          >
            {t.step1.marketplace}
          </label>
          <select
            id="marketplace"
            value={marketplace}
            onChange={(e) => setMarketplace(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring/40 transition focus:border-primary focus:ring-2"
          >
            {MARKETPLACES[jurisdiction].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {jurisdiction === 'cis' && (
          <div>
            <label
              htmlFor="country"
              className="mb-2 block text-sm font-medium text-muted-foreground"
            >
              {t.countryLabel}
            </label>
            <input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder={t.countryPlaceholder}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2"
            />
          </div>
        )}
      </div>

      <fieldset>
        <legend className="mb-3 block text-sm font-medium text-muted-foreground">
          {t.step1.problemLegend}
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {PROBLEM_ORDER.map((id) => {
            const Icon = ICONS[id]
            const copy = t.problems[id]
            const active = problemType === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setProblemType(id)}
                aria-pressed={active}
                className={`flex items-start gap-3 rounded-md border p-4 text-left transition ${
                  active
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-border bg-background hover:border-primary/50 hover:bg-secondary'
                }`}
              >
                <Icon
                  className={`mt-0.5 h-5 w-5 shrink-0 ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {copy.label}
                  </span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                    {copy.description}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </fieldset>
    </section>
  )
}
