'use client'

import { useState } from 'react'
import { ClipboardList, Send, Clock, ShieldCheck, MailWarning as FileWarning, Gavel, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang'
import { WHAT_TO_DO_STEPS, TRANSBORDER_TIPS_I18N } from '@/lib/i18n-content'

const STEP_ICONS = [ClipboardList, FileWarning, Send, Clock, Gavel, ShieldCheck]

export function WhatToDoTab() {
  const { lang, t } = useLang()
  const [openStep, setOpenStep] = useState<number | null>(0)
  const [showTransborder, setShowTransborder] = useState(false)

  const steps = WHAT_TO_DO_STEPS[lang]
  const tips = TRANSBORDER_TIPS_I18N[lang]

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-foreground">{t('whatToDo.title')}</h2>
        <p className="text-sm text-muted-foreground">
          {t('whatToDo.subtitle')}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {steps.map((step, i) => {
          const Icon = STEP_ICONS[i] || ClipboardList
          const isOpen = openStep === i
          return (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenStep(isOpen ? null : i)}
                className="flex w-full items-start gap-4 p-5 text-left transition hover:bg-secondary/40"
              >
                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition',
                    isOpen ? 'bg-primary text-primary-foreground' : 'bg-accent/20 text-accent-foreground',
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 shrink-0 text-muted-foreground transition-transform',
                    isOpen && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div className="border-t border-border px-5 py-4">
                  <ul className="flex flex-col gap-2.5 pl-14">
                    {step.details.map((detail, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <button
          type="button"
          onClick={() => setShowTransborder(!showTransborder)}
          className="flex w-full items-center justify-between gap-3 text-left"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground">
              <Phone className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {t('whatToDo.transborder.title')}
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t('whatToDo.transborder.subtitle')}
              </p>
            </div>
          </div>
          <ChevronDown
            className={cn(
              'h-5 w-5 shrink-0 text-muted-foreground transition-transform',
              showTransborder && 'rotate-180',
            )}
            aria-hidden="true"
          />
        </button>

        {showTransborder && (
          <ul className="mt-4 flex flex-col gap-2.5 border-t border-border pt-4">
            {tips.map((tip, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          {t('whatToDo.note')}
        </p>
      </div>
    </div>
  )
}
