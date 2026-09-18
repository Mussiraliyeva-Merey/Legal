'use client'

import { useState, useEffect } from 'react'
import { Star, Loader2, Send, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type Review = {
  id: string
  rating: number
  comment: string | null
  name: string | null
  created_at: string
}

const STAR_LABELS = ['', 'Плохо', 'Так себе', 'Нормально', 'Хорошо', 'Отлично']

export function FeedbackSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [average, setAverage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadReviews()
  }, [])

  async function loadReviews() {
    try {
      const res = await fetch('/api/reviews')
      const json = await res.json()
      setReviews(json.reviews || [])
      setAverage(json.average || 0)
      setTotal(json.total || 0)
    } catch (err) {
      console.error('[reviews] load error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function submit() {
    if (rating < 1 || rating > 5) {
      setError('Выберите оценку от 1 до 5 звёзд.')
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment, name }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json?.error || 'Не удалось сохранить отзыв.')
      }

      setSubmitted(true)
      setRating(0)
      setHoverRating(0)
      setComment('')
      setName('')
      loadReviews()
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      setError((err as Error).message || 'Произошла ошибка. Попробуйте ещё раз.')
    } finally {
      setSubmitting(false)
    }
  }

  const displayRating = hoverRating || rating

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-1 text-xl font-bold text-foreground">Отзывы</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Оцените сервис и оставьте отзыв. Ваше мнение помогает улучшить сервис.
        </p>

        {total > 0 && (
          <div className="mb-6 flex items-center gap-4 rounded-lg bg-secondary/50 px-4 py-3">
            <span className="text-3xl font-bold text-foreground">{average}</span>
            <div className="flex flex-col">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn(
                      'h-4 w-4',
                      s <= Math.round(average)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-muted-foreground/30',
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="mt-0.5 text-xs text-muted-foreground">
                {total} {pluralReview(total)}
              </span>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            Ваша оценка
          </label>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="rounded-md p-1 transition hover:scale-110 active:scale-95"
                  aria-label={`${star} ${STAR_LABELS[star]}`}
                >
                  <Star
                    className={cn(
                      'h-8 w-8 transition-colors',
                      star <= displayRating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-none text-muted-foreground/30',
                    )}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
            {displayRating > 0 && (
              <span className="text-sm font-medium text-foreground">
                {STAR_LABELS[displayRating]}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
            Ваш отзыв
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Расскажите о вашем опыте использования сервиса..."
            className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
            Как вас зовут (необязательно)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Аноним"
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2"
          />
        </div>

        {error && (
          <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={submit}
          disabled={submitting || rating < 1}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : submitted ? (
            <Check className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Send className="h-5 w-5" aria-hidden="true" />
          )}
          {submitting ? 'Отправляем...' : submitted ? 'Спасибо за отзыв!' : 'Отправить отзыв'}
        </button>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Отзывы пользователей
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
            <p className="text-sm text-muted-foreground">
              Пока нет отзывов. Будьте первым, кто оставит отзыв!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-foreground">
                      {(review.name || 'А')[0].toUpperCase()}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {review.name || 'Аноним'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(review.created_at)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          'h-4 w-4',
                          s <= review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-muted-foreground/30',
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                {review.comment && (
                  <p className="mt-3 text-sm leading-relaxed text-foreground">
                    {review.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function pluralReview(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'отзыв'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'отзыва'
  return 'отзывов'
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}
