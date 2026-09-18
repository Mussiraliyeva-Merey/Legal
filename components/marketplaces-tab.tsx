'use client'

import { useState } from 'react'
import { Search, Store, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MARKETPLACES } from '@/lib/constants'

const MARKETPLACE_INFO: Record<string, { country: string; url: string }> = {
  'Kaspi.kz': { country: '🇰🇿 Казахстан', url: 'https://kaspi.kz' },
  'Halyk Market': { country: '🇰🇿 Казахстан', url: 'https://market.halykbank.kz' },
  ForteMarket: { country: '🇰🇿 Казахстан', url: 'https://forte.market' },
  Wildberries: { country: '🇷🇺 Россия', url: 'https://wildberries.ru' },
  Ozon: { country: '🇷🇺 Россия', url: 'https://ozon.ru' },
  'Yandex Market': { country: '🇷🇺 Россия', url: 'https://market.yandex.ru' },
  AliExpress: { country: '🇨🇳 Китай', url: 'https://aliexpress.com' },
  ZoodMall: { country: '🇰🇿 Казахстан', url: 'https://zoodmall.com' },
  'Uzum Market': { country: '🇺🇿 Узбекистан', url: 'https://uzum.uz' },
  Мегамаркет: { country: '🇷🇺 Россия', url: 'https://megamarket.ru' },
  'Магнит Маркет': { country: '🇷🇺 Россия', url: 'https://magnit.ru' },
  Avito: { country: '🇷🇺 Россия', url: 'https://avito.ru' },
  Pinduoduo: { country: '🇨🇳 Китай', url: 'https://pinduoduo.com' },
  Temu: { country: '🇨🇳 Китай', url: 'https://temu.com' },
  Taobao: { country: '🇨🇳 Китай', url: 'https://taobao.com' },
  '1688': { country: '🇨🇳 Китай', url: 'https://1688.com' },
  SHEIN: { country: '🇨🇳 Китай', url: 'https://shein.com' },
  Amazon: { country: '🇺🇸 США', url: 'https://amazon.com' },
  eBay: { country: '🇺🇸 США', url: 'https://ebay.com' },
  Alibaba: { country: '🇨🇳 Китай', url: 'https://alibaba.com' },
  'JD.com': { country: '🇨🇳 Китай', url: 'https://jd.com' },
  DHgate: { country: '🇨🇳 Китай', url: 'https://dhgate.com' },
}

export function MarketplacesTab() {
  const [query, setQuery] = useState('')

  const filtered = MARKETPLACES.filter((m) =>
    m.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Store className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="text-xl font-bold text-foreground">Маркетплейсы</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Большой список маркетплейсов. При создании претензии выберите нужный из списка или укажите
          свой.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск маркетплейса..."
          className="w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2.5 text-sm text-foreground outline-none ring-ring/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((name) => {
          const info = MARKETPLACE_INFO[name]
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
                {info && (
                  <p className="text-xs text-muted-foreground">{info.country}</p>
                )}
              </div>
              {info && (
                <a
                  href={info.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-primary"
                  aria-label={`Открыть ${name}`}
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
          Ничего не найдено
        </p>
      )}
    </div>
  )
}
