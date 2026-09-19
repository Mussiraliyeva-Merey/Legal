'use client'

import { useState } from 'react'
import { ClipboardList, Send, Clock, ShieldCheck, FileWarning, Gavel, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { COUNTRIES } from '@/lib/constants'

type Step = {
  icon: typeof ClipboardList
  title: string
  description: string
  details: string[]
}

const STEPS: Step[] = [
  {
    icon: ClipboardList,
    title: '1. Соберите доказательства',
    description: 'Соберите все документы и материалы, подтверждающие вашу проблему.',
    details: [
      'Чек или подтверждение заказа (скриншот из личного кабинета маркетплейса)',
      'Фотографии товара — общий вид, дефекты, упаковка, бирки',
      'Видео распаковки (если есть) — особенно при повреждении или подделке',
      'Скриншоты переписки с продавцом и службой поддержки маркетплейса',
      'Трек-номер и информацию о доставке',
      'Заключение эксперта или сервисного центра (если есть)',
    ],
  },
  {
    icon: FileWarning,
    title: '2. Сформируйте претензию',
    description: 'Используйте вкладку «Создать претензию» — система сама определит законы и статьи.',
    details: [
      'Заполните данные о себе, заказе и опишите проблему',
      'AI определит применимое законодательство вашей страны',
      'Готовую претензию можно скачать в PDF или DOCX',
      'Проверьте все данные перед отправкой — особенно ФИО, адрес и реквизиты',
    ],
  },
  {
    icon: Send,
    title: '3. Отправьте претензию',
    description: 'Направьте претензию продавцу и/или маркетплейсу одним из способов:',
    details: [
      'Через форму обращений в личном кабинете маркетплейса (скриншот подтверждения)',
      'Заказным письмом с уведомлением о вручении на юридический адрес продавца',
      'Электронным письмом на официальную почту маркетплейса',
      'Через чат с продавцом в приложении маркетплейса (с сохранением переписки)',
      'Обязательно сохраните подтверждение отправки — номер заказа письма, скриншот, квитанцию',
    ],
  },
  {
    icon: Clock,
    title: '4. Дождитесь ответа',
    description: 'По закону у продавца есть срок на ответ. Сроки зависят от страны:',
    details: [
      'Казахстан — 10 дней (Закон РК «О защите прав потребителей»)',
      'Россия — 10 дней (Закон РФ «О защите прав потребителей», ст. 22)',
      'Узбекистан — 10 дней (Закон РУз «О защите прав потребителей»)',
      'Кыргызстан — 10 дней (Закон КР «О защите прав потребителей»)',
      'Беларусь — 14 дней (Закон РБ «О защите прав потребителей»)',
      'Армения — 10 дней (Закон РА «О защите прав потребителей»)',
      'Азербайджан — 10 дней (Закон АР «О защите прав потребителей»)',
      'Молдова — 14 дней (Закон РМ о защите прав потребителей)',
      'Таджикистан — 10 дней (Закон РТ «О защите прав потребителей»)',
      'Туркменистан — 10 дней (Закон ТМ о защите прав потребителей)',
    ],
  },
  {
    icon: Gavel,
    title: '5. Обратитесь в госорганы',
    description: 'Если продавец не ответил или отказал — подайте жалобу в государственный орган вашей страны.',
    details: [
      'Казахстан — Комитет по защите прав потребителей МНЭ РК, eGov.kz, eOtinish, звонок на 1506',
      'Россия — Роспотребнадзор (rospotrebnadzor.ru), суд по месту жительства',
      'Узбекистан — Комитет по защите прав потребителей при Минэкономики РУз',
      'Кыргызстан — Департамент защиты прав потребителей при Минэкономики КР',
      'Беларусь — Министерство антимонопольного регулирования и торговли РБ',
      'Армения — Комитет по защите прав потребителей Минэкономики РА',
      'Азербайджан — Министерство экономики АР, Департамент защиты прав потребителей',
      'Молдова — Национальный центр защиты прав потребителей',
      'Таджикистан — Антимонопольная служба при Правительстве РТ',
      'Туркменистан — Министерство торговли и внешнеэкономических связей ТМ',
    ],
  },
  {
    icon: ShieldCheck,
    title: '6. Обратитесь в суд',
    description: 'Если госорганы не решили проблему — последний шаг это обращение в суд.',
    details: [
      'Иск подаётся по месту жительства истца или по месту нахождения ответчика',
      'Госпошлина по делам о защите прав потребителей часто не взимается или минимальна',
      'Можно требовать не только возврат денег, но и компенсацию морального вреда',
      'Срок исковой давности — обычно 3 года с момента нарушения прав',
      'Рекомендуется приложить все доказательства: претензию, ответы, экспертизы',
    ],
  },
]

const TRANSBORDER_TIPS = [
  'Если маркетплейс зарегистрирован в другой стране — спор считается трансграничным',
  'В этом случае претензия направляется в представительство маркетплейса в вашей стране',
  'Если представительства нет — жалоба подаётся в госорган вашей страны с указанием иностранного продавца',
  'Для AliExpress, Temu, SHEIN и других зарубежных площадок — открывайте спор внутри платформы и параллельно пишите в госорган',
  'Возврат денег через банк: если платили картой — можно инициировать chargeback (возврат платежа) через банк',
]

export function WhatToDoTab() {
  const [openStep, setOpenStep] = useState<number | null>(0)
  const [showTransborder, setShowTransborder] = useState(false)

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-foreground">Что делать?</h2>
        <p className="text-sm text-muted-foreground">
          Пошаговое руководство: от сбора доказательств до обращения в суд. Следуйте шагам по порядку —
          каждый следующий этап начинается, если предыдущий не решил проблему.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {STEPS.map((step, i) => {
          const Icon = step.icon
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
                Трансграничные споры (зарубежные маркетплейсы)
              </h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Что делать, если маркетплейс находится в другой стране
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
            {TRANSBORDER_TIPS.map((tip, i) => (
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
          Сроки ответа и порядок обращения зависят от законодательства вашей страны.
          Точные статьи и нормы система определяет автоматически при формировании претензии.
        </p>
      </div>
    </div>
  )
}
