'use client'

import { useState } from 'react'
import { Search, Store, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang } from '@/lib/lang'
import { MARKETPLACES } from '@/lib/constants'
import { MARKETPLACE_COUNTRIES_I18N, MARKETPLACE_OTHER_I18N } from '@/lib/i18n-content'

const MARKETPLACE_INFO: Record<string, string> = {
  'Kaspi.kz': 'https://kaspi.kz',
  'Halyk Market': 'https://market.halykbank.kz',
  ForteMarket: 'https://forte.market',
  Wildberries: 'https://wildberries.ru',
  Ozon: 'https://ozon.ru',
  'Yandex Market': 'https://market.yandex.ru',
  AliExpress: 'https://aliexpress.com',
  ZoodMall: 'https://zoodmall.com',
  'Uzum Market': 'https://uzum.uz',
  Мегамаркет: 'https://megamarket.ru',
  'Магнит Маркет': 'https://magnit.ru',
  Avito: 'https://avito.ru',
  Pinduoduo: 'https://pinduoduo.com',
  Temu: 'https://temu.com',
  Taobao: 'https://taobao.com',
  '1688': 'https://1688.com',
  SHEIN: 'https://shein.com',
  Amazon: 'https://amazon.com',
  eBay: 'https://ebay.com',
  Alibaba: 'https://alibaba.com',
  'JD.com': 'https://jd.com',
  DHgate: 'https://dhgate.com',
}

export function MarketplacesTab() {
  const { lang, t } = useLang()
  const [query, setQuery] = useState('')

  const otherLabel = MARKETPLACE_OTHER_I18N[lang]
  const countries = MARKETPLACE_COUNTRIES_I18N[lang]
  const allMarketplaces = [...MARKETPLACES.filter(m => m !== 'Другой маркетплейс'), otherLabel]

  const filtered = allMarketplaces.filter((m) =>
    m.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Store className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="text-xl font-bold text-foreground">{t('marketplaces.title')}</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {t('marketplaces.subtitle')}
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('marketplaces.search')}
          className="w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2.5 text-sm text-foreground outline-none ring-ring/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((name) => {
          const url = MARKETPLACE_INFO[name]
          const countryLabel = countries[name]
          return (
            <div
              key={name}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition hover:border-primary/50"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
                <Store className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">{name}</h3>
                {countryLabel && (
                  <p className="text-xs text-muted-foreground">{countryLabel}</p>
                )}
              </div>
              {url && (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-primary"
                  aria-label={`${t('marketplaces.open')} ${name}`}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-8">
          {t('marketplaces.notFound')}
        </p>
      )}
    </div>
  )
}
