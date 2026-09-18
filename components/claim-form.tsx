'use client'

import { useState, useRef } from 'react'
import {
  ShieldAlert,
  Bug,
  FileWarning,
  PackageX,
  AlertTriangle,
  ListChecks,
  PackageSearch,
  Undo2,
  Ban,
  ShieldCheck,
  UserX,
  Truck,
  HelpCircle,
  Loader2,
  FileSignature,
  MessageCircleQuestion,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  COUNTRIES,
  MARKETPLACES,
  PROBLEM_CARDS,
  type ProblemType,
} from '@/lib/constants'
import { ResultPanel } from '@/components/result-panel'
import { AiChat } from '@/components/ai-chat'

const PROBLEM_ICONS: Record<string, LucideIcon> = {
  shield: ShieldAlert,
  bug: Bug,
  'file-warning': FileWarning,
  'package-x': PackageX,
  'alert-triangle': AlertTriangle,
  'list-checks': ListChecks,
  'truck-x': PackageSearch,
  undo: Undo2,
  ban: Ban,
  'shield-check': ShieldCheck,
  'user-x': UserX,
  truck: Truck,
  'help-circle': HelpCircle,
}

type ClaimData = {
  fullName: string
  phone: string
  email: string
  address: string
  country: string
  marketplace: string
  customMarketplace: string
  orderNumber: string
  orderDate: string
  receiveDate: string
  productName: string
  productPrice: string
  problemType: ProblemType | null
  description: string
}

const EMPTY: ClaimData = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  country: '',
  marketplace: '',
  customMarketplace: '',
  orderNumber: '',
  orderDate: '',
  receiveDate: '',
  productName: '',
  productPrice: '',
  problemType: null,
  description: '',
}

export function ClaimForm() {
  const [data, setData] = useState<ClaimData>(EMPTY)
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showChat, setShowChat] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  function update<K extends keyof ClaimData>(key: K, value: ClaimData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const effectiveMarketplace =
    data.marketplace === 'Другой маркетплейс' && data.customMarketplace
      ? data.customMarketplace
      : data.marketplace

  async function generate() {
    if (isLoading) {
      abortRef.current?.abort()
    }
    setError(null)
    setResult('')
    setIsLoading(true)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      if (data.problemType) {
        fetch('/api/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            problemType: data.problemType,
            country: data.country,
            marketplace: effectiveMarketplace,
          }),
        }).catch(() => {})
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          phone: data.phone,
          email: data.email,
          address: data.address,
          country: data.country,
          marketplace: effectiveMarketplace,
          orderNumber: data.orderNumber,
          orderDate: data.orderDate,
          receiveDate: data.receiveDate,
          productName: data.productName,
          productPrice: data.productPrice,
          problemType: data.problemType,
          description: data.description,
        }),
        signal: controller.signal,
      })

      const json = await response.json()

      if (!response.ok) {
        throw new Error(json?.error || 'Произошла ошибка при генерации.')
      }

      setResult(json.claim || '')
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError((err as Error).message || 'Произошла ошибка. Попробуйте ещё раз.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const canSubmit =
    data.fullName &&
    data.country &&
    data.marketplace &&
    data.problemType &&
    data.description.length > 0

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-1 text-xl font-bold text-foreground">Создание претензии</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Заполните только факты о себе, заказе и проблеме. Юридическую часть сформирует система.
        </p>

        <Section number={1} title="Личные данные">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="ФИО" required>
              <input
                type="text"
                value={data.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder="Иванов Иван Иванович"
                className={inputClass}
              />
            </Field>
            <Field label="Телефон">
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="+7 700 123 45 67"
                className={inputClass}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={data.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="example@mail.com"
                className={inputClass}
              />
            </Field>
            <Field label="Адрес">
              <input
                type="text"
                value={data.address}
                onChange={(e) => update('address', e.target.value)}
                placeholder="г. Алматы, ул. ... , д. ..."
                className={inputClass}
              />
            </Field>
          </div>
        </Section>

        <Section number={2} title="Данные заказа">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Страна" required>
              <select
                value={data.country}
                onChange={(e) => update('country', e.target.value)}
                className={inputClass}
              >
                <option value="">Выберите страну</option>
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Маркетплейс" required>
              <select
                value={data.marketplace}
                onChange={(e) => update('marketplace', e.target.value)}
                className={inputClass}
              >
                <option value="">Выберите маркетплейс</option>
                {MARKETPLACES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </Field>
            {data.marketplace === 'Другой маркетплейс' && (
              <Field label="Название маркетплейса">
                <input
                  type="text"
                  value={data.customMarketplace}
                  onChange={(e) => update('customMarketplace', e.target.value)}
                  placeholder="Введите название"
                  className={inputClass}
                />
              </Field>
            )}
            <Field label="Номер заказа">
              <input
                type="text"
                value={data.orderNumber}
                onChange={(e) => update('orderNumber', e.target.value)}
                placeholder="№12345678"
                className={inputClass}
              />
            </Field>
            <Field label="Дата заказа">
              <input
                type="date"
                value={data.orderDate}
                onChange={(e) => update('orderDate', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Дата получения">
              <input
                type="date"
                value={data.receiveDate}
                onChange={(e) => update('receiveDate', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Название товара">
              <input
                type="text"
                value={data.productName}
                onChange={(e) => update('productName', e.target.value)}
                placeholder="Смартфон Samsung Galaxy..."
                className={inputClass}
              />
            </Field>
            <Field label="Стоимость товара">
              <input
                type="text"
                value={data.productPrice}
                onChange={(e) => update('productPrice', e.target.value)}
                placeholder="250 000 ₸"
                className={inputClass}
              />
            </Field>
          </div>
        </Section>

        <Section number={3} title="Проблема">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEM_CARDS.map((card) => {
              const Icon = PROBLEM_ICONS[card.icon] || HelpCircle
              const active = data.problemType === card.id
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => update('problemType', card.id)}
                  aria-pressed={active}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border p-3.5 text-left transition',
                    active
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border bg-background hover:border-primary/50 hover:bg-secondary',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-5 w-5 shrink-0',
                      active ? 'text-primary' : 'text-muted-foreground',
                    )}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-foreground">{card.label}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-6">
            <Field label="Кратко опишите, что произошло" required>
              <textarea
                value={data.description}
                onChange={(e) => update('description', e.target.value)}
                rows={5}
                placeholder="Например: заказал телефон, при получении экран оказался с трещиной, продавец отказывается принимать возврат..."
                className={cn(inputClass, 'resize-y')}
              />
            </Field>
          </div>
        </Section>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={generate}
            disabled={isLoading || !canSubmit}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            ) : (
              <FileSignature className="h-5 w-5" aria-hidden="true" />
            )}
            {isLoading ? 'Формируем претензию...' : 'Сформировать претензию'}
          </button>
        </div>
        {!canSubmit && !isLoading && (
          <p className="mt-2 text-xs text-muted-foreground">
            Заполните ФИО, страну, маркетплейс, выберите проблему и опишите ситуацию.
          </p>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {result && (
        <ResultPanel result={result} isLoading={isLoading} />
      )}

      {result && !isLoading && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setShowChat(!showChat)}
            className="flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground shadow-sm transition hover:bg-secondary active:translate-y-px"
          >
            <MessageCircleQuestion className="h-5 w-5" aria-hidden="true" />
            {showChat ? 'Скрыть чат' : 'Задать вопрос AI'}
          </button>
        </div>
      )}

      {showChat && result && (
        <AiChat
          context={{
            country: data.country,
            marketplace: effectiveMarketplace,
            orderNumber: data.orderNumber,
            productName: data.productName,
            problemType: data.problemType
              ? PROBLEM_CARDS.find((c) => c.id === data.problemType)?.label || ''
              : '',
            claim: result,
          }}
        />
      )}
    </div>
  )
}

const inputClass =
  'w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2'

function Section({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
          {number}
        </span>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      {children}
    </div>
  )
}
