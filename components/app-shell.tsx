'use client'

import { useState } from 'react'
import { Scale, Home, FileSignature, Globe2, Store, BarChart3, Menu, X, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ClaimForm } from '@/components/claim-form'
import { KazakhstanTab } from '@/components/kazakhstan-tab'
import { MarketplacesTab } from '@/components/marketplaces-tab'
import { StatisticsTab } from '@/components/statistics-tab'
import { FeedbackSection } from '@/components/feedback-section'

type TabId = 'home' | 'create' | 'kazakhstan' | 'marketplaces' | 'statistics' | 'feedback'

const NAV_ITEMS: { id: TabId; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Главная', icon: Home },
  { id: 'create', label: 'Создать претензию', icon: FileSignature },
  { id: 'kazakhstan', label: '🇰🇿 Казахстан', icon: Globe2 },
  { id: 'marketplaces', label: 'Маркетплейсы', icon: Store },
  { id: 'statistics', label: 'Статистика', icon: BarChart3 },
  { id: 'feedback', label: 'Отзывы', icon: Star },
]

export function AppShell() {
  const [tab, setTab] = useState<TabId>('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  function switchTab(id: TabId) {
    setTab(id)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="min-h-svh bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-primary text-primary-foreground shadow-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={() => switchTab('home')}
              className="flex items-center gap-2.5 transition hover:opacity-80"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Scale className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-lg font-bold tracking-tight">Daryn Legal</span>
            </button>

            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const active = tab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => switchTab(item.id)}
                    className={cn(
                      'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition',
                      active
                        ? 'bg-accent text-accent-foreground'
                        : 'text-primary-foreground/80 hover:bg-primary-foreground/10',
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </button>
                )
              })}
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-lg hover:bg-primary-foreground/10 transition"
              aria-label="Меню"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-primary-foreground/20 bg-primary">
            <div className="mx-auto max-w-6xl px-4 py-3">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const active = tab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => switchTab(item.id)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition',
                      active
                        ? 'bg-accent text-accent-foreground'
                        : 'text-primary-foreground/80 hover:bg-primary-foreground/10',
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </button>
                )
              })}
            </div>
          </nav>
        )}
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {tab === 'home' && <HomeView onStart={() => switchTab('create')} />}
        {tab === 'create' && <ClaimForm />}
        {tab === 'kazakhstan' && <KazakhstanTab />}
        {tab === 'marketplaces' && <MarketplacesTab />}
        {tab === 'statistics' && <StatisticsTab />}
        {tab === 'feedback' && <FeedbackSection />}
      </div>

      <footer className="border-t border-border bg-card mt-12">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-xs leading-relaxed text-muted-foreground">
            Сервис формирует шаблон документа на основе применимого законодательства и не заменяет
            консультацию квалифицированного юриста.
          </p>
        </div>
      </footer>
    </main>
  )
}

function HomeView({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-8 sm:py-16">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg mb-6">
        <Scale className="h-8 w-8" aria-hidden="true" />
      </span>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl max-w-2xl text-balance">
        Поможем составить претензию к маркетплейсу
      </h1>
      <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
        Введите только факты о себе, заказе и проблеме. Система сама сформирует полную готовую
        претензию со ссылками на закон — вам останется только скачать и отправить.
      </p>
      <button
        onClick={onStart}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 active:translate-y-px"
      >
        <FileSignature className="h-5 w-5" aria-hidden="true" />
        Составить претензию
      </button>

      <div className="mt-16 grid gap-4 sm:grid-cols-3 w-full max-w-3xl">
        <FeatureCard
          icon="📝"
          title="Только факты"
          description="Вы заполняете только данные о себе, заказе и описываете проблему"
        />
        <FeatureCard
          icon="⚖️"
          title="Автоматическая претензия"
          description="AI определяет законы, статьи и формирует готовый документ"
        />
        <FeatureCard
          icon="📄"
          title="Скачать и отправить"
          description="PDF и DOCX сразу под готовой претензией — без ручного заполнения"
        />
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 text-left shadow-sm">
      <span className="text-2xl">{icon}</span>
      <h3 className="mt-3 text-sm font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )
}
