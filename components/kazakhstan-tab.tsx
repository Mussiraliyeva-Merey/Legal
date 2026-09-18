'use client'

import { useState } from 'react'
import { ExternalLink, Phone, Building2, ShieldCheck, Globe2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { KZ_OFFICIAL_SERVICES, KZ_TIMELINE, type ProblemType } from '@/lib/constants'

const CATEGORY_FILTERS: { id: string; label: string; problemTypes: ProblemType[] }[] = [
  { id: 'all', label: 'Все сервисы', problemTypes: [] },
  { id: 'consumer', label: 'Защита прав потребителей', problemTypes: ['defective_product', 'wrong_description', 'wrong_item', 'damaged', 'incomplete', 'return_refused', 'refund_refused', 'warranty', 'seller_issue'] },
  { id: 'counterfeit', label: 'Контрафакт', problemTypes: ['counterfeit'] },
  { id: 'general', label: 'Общие обращения', problemTypes: ['not_delivered', 'delivery_issue', 'other'] },
]

const CATEGORY_ICONS: Record<string, typeof Building2> = {
  general: Globe2,
  consumer: ShieldCheck,
  counterfeit: Building2,
}

export function KazakhstanTab() {
  const [filter, setFilter] = useState('all')

  const filteredServices = KZ_OFFICIAL_SERVICES.filter((s) => {
    if (filter === 'all') return true
    return s.category === filter
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🇰🇿</span>
          <h2 className="text-xl font-bold text-foreground">Казахстан</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Официальные государственные сервисы Республики Казахстан для защиты прав потребителей.
          Кнопки открывают официальные сайты в новой вкладке.
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Официальные сервисы</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {CATEGORY_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'rounded-lg border px-3 py-2 text-xs font-medium transition',
                filter === f.id
                  ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filteredServices.map((service) => {
            const Icon = CATEGORY_ICONS[service.category] || Globe2
            const isPhone = service.url.startsWith('tel:')
            return (
              <a
                key={service.title}
                href={service.url}
                target={isPhone ? undefined : '_blank'}
                rel={isPhone ? undefined : 'noopener noreferrer'}
                className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-foreground">{service.title}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  {isPhone ? (
                    <Phone className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  ) : (
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" aria-hidden="true" />
                  )}
                </div>
              </a>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-6 text-lg font-semibold text-foreground">
          Что делать после получения претензии?
        </h3>
        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-border sm:left-6" aria-hidden="true" />
          <div className="flex flex-col gap-6">
            {KZ_TIMELINE.map((item) => (
              <div key={item.step} className="relative flex gap-4 sm:gap-5">
                <span className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm sm:h-12 sm:w-12">
                  {item.step}
                </span>
                <div className="flex-1 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
                  <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
