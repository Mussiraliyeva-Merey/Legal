'use client'

import { useState } from 'react'
import { ChevronRight, ClipboardList, FileSignature, Bot, FileDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const STEPS = [
  { icon: ClipboardList, title: 'Опишите проблему', text: 'Расскажите, что произошло с вашим заказом — своими словами.' },
  { icon: FileSignature, title: 'Укажите данные', text: 'Введите информацию о себе, заказе и маркетплейсе.' },
  { icon: Bot, title: 'Получите анализ', text: 'AI проанализирует ситуацию и объяснит возможные действия.' },
  { icon: FileSignature, title: 'Получите претензию', text: 'Система автоматически подготовит готовую претензию со ссылками на закон.' },
  { icon: FileDown, title: 'Скачайте и отправьте', text: 'Скачайте PDF/DOCX или используйте готовый текст для отправки продавцу, маркетплейсу или официальному сервису.' },
]

export function HowToUse({ onStart }: { onStart: () => void }) {
  const [step, setStep] = useState(0)
  const isLast = step === STEPS.length - 1

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-2 text-base font-semibold text-foreground">Как пользоваться сайтом?</h3>
      <p className="mb-6 text-sm text-muted-foreground">
        Пошаговая инструкция — 5 простых шагов от описания проблемы до готовой претензии.
      </p>

      <div className="flex flex-col gap-3">
        {STEPS.map((s, i) => {
          const Icon = s.icon
          const done = i < step
          const active = i === step
          return (
            <div
              key={i}
              className={cn(
                'flex items-start gap-4 rounded-lg border p-4 transition',
                active ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border bg-background',
              )}
            >
              <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                  done ? 'bg-green-600 text-white' : active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground',
                )}
              >
                {done ? <Check className="h-4 w-4" aria-hidden="true" /> : <Icon className="h-4 w-4" aria-hidden="true" />}
              </span>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">{s.title}</h4>
                <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            Назад
          </button>
        )}
        {!isLast ? (
          <button
            onClick={() => setStep(step + 1)}
            className="ml-auto flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Далее
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            onClick={onStart}
            className="ml-auto flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Начать
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
