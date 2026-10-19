'use client'

import { useState } from 'react'
import { ExternalLink, Phone, Building2, ShieldCheck, Globe as Globe2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang, type Lang } from '@/lib/lang'
import { KZ_SERVICES_I18N, KZ_TIMELINE_I18N } from '@/lib/i18n-content'

const CATEGORY_ICONS: Record<string, typeof Building2> = {
  general: Globe2,
  consumer: ShieldCheck,
  counterfeit: Building2,
}

export function KazakhstanTab() {
  const { lang, t } = useLang()
  const [filter, setFilter] = useState('all')

  const services = KZ_SERVICES_I18N[lang]
  const timeline = KZ_TIMELINE_I18N[lang]

  const filterLabels: Record<string, string> = {
    all: t('kz.filter.all'),
    consumer: t('kz.filter.consumer'),
    counterfeit: t('kz.filter.counterfeit'),
    general: t('kz.filter.general'),
  }

  const filteredServices = services.filter((s) => {
    if (filter === 'all') return true
    return s.category === filter
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">🇰🇿</span>
          <h2 className="text-xl font-bold text-foreground">{t('kz.title')}</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {t('kz.subtitle')}
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">{t('kz.services')}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {['all', 'consumer', 'counterfeit', 'general'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-lg border px-3 py-2 text-xs font-medium transition',
                filter === f
                  ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                  : 'border-border bg-card text-muted-foreground hover:border-primary/50',
              )}
            >
              {filterLabels[f]}
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
          {t('kz.timeline.title')}
        </h3>
        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-border sm:left-6" aria-hidden="true" />
          <div className="flex flex-col gap-6">
            {timeline.map((item) => (
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
