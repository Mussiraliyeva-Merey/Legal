'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type StatItem = {
  type: string
  label: string
  count: number
  percentage: number
}

const BAR_COLORS: Record<string, string> = {
  counterfeit: 'bg-red-500',
  defective_product: 'bg-orange-500',
  wrong_description: 'bg-amber-500',
  refund_refused: 'bg-yellow-500',
  delivery_issue: 'bg-blue-500',
  warranty: 'bg-green-500',
  other: 'bg-gray-500',
}

export function StatisticsTab() {
  const [stats, setStats] = useState<StatItem[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/stats')
        const json = await res.json()
        setStats(json.stats || [])
        setTotal(json.total || 0)
      } catch (err) {
        console.error('[stats] load error:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <BarChart3 className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="text-xl font-bold text-foreground">Статистика проблем</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Реальная обезличенная статистика по типам проблем. Без личных данных — только тип
          проблемы, страна и маркетплейс.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
        </div>
      ) : total === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">
            Пока нет данных. Статистика появится, когда пользователи начнут создавать претензии.
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Всего обращений</h3>
              <span className="text-2xl font-bold text-primary">{total}</span>
            </div>

            <div className="flex flex-col gap-4">
              {stats.map((item) => (
                <div key={item.type}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        BAR_COLORS[item.type] || 'bg-primary',
                      )}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.type}
                className="rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {item.label}
                  </span>
                  <span className="text-lg font-bold text-foreground">{item.count}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="rounded-xl border border-border bg-secondary/30 p-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Статистика ведётся в обезличенном виде. Мы не сохраняем ФИО, телефон, email, адрес, номер
          заказа или текст претензии. Записывается только тип выбранной проблемы, страна и
          маркетплейс.
        </p>
      </div>
    </div>
  )
}
