'use client'

import { useState, useEffect } from 'react'
import { Star, Loader as Loader2, Send, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLang, LANG_LOCALE, type Lang } from '@/lib/lang'

type Review = {
  id: string
  rating: number
  comment: string | null
  source: 'complaint' | 'ai_assistant'
  created_at: string
}

const STAR_LABELS_I18N: Record<Lang, string[]> = {
  ru: ['', 'Плохо', 'Так себе', 'Нормально', 'Хорошо', 'Отлично'],
  kk: ['', 'Жаман', 'Онша емес', 'Қалыпты', 'Жақсы', 'Тамаша'],
  en: ['', 'Poor', 'Fair', 'OK', 'Good', 'Excellent'],
}

const PLURAL_REVIEW_I18N: Record<Lang, (n: number) => string> = {
  ru: (n) => {
    const mod10 = n % 10
    const mod100 = n % 100
    if (mod10 === 1 && mod100 !== 11) return 'отзыв'
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'отзыва'
    return 'отзывов'
  },
  kk: (n) => {
    const mod10 = n % 10
    const mod100 = n % 100
    if (mod10 === 1 && mod100 !== 11) return 'пікір'
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'пікір'
    return 'пікір'
  },
  en: (n) => n === 1 ? 'review' : 'reviews',
}

export function FeedbackSection() {
  const { lang, t } = useLang()
  const [reviews, setReviews] = useState<Review[]>([])
  const [average, setAverage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [distribution, setDistribution] = useState<Record<string, number>>({})
  const [submissionKey] = useState(() => crypto.randomUUID())
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const starLabels = STAR_LABELS_I18N[lang]

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
      setDistribution(json.distribution || {})
    } catch (err) {
      console.error('[reviews] load error:', err)
    } finally {
      setLoading(false)
    }
  }

  async function submit() {
    if (rating < 1 || rating > 5) {
      setError(t('feedback.errorRating'))
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment, source: 'complaint', submissionKey }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json?.error || t('common.error'))
      }

      setSubmitted(true)
      setRating(0)
      setHoverRating(0)
      setComment('')
      loadReviews()
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      setError((err as Error).message || t('common.error'))
    } finally {
      setSubmitting(false)
    }
  }

  const displayRating = hoverRating || rating

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-1 text-xl font-bold text-foreground">{t('feedback.title')}</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          {t('feedback.subtitle')}
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
                {total} {PLURAL_REVIEW_I18N[lang](total)}
              </span>
            </div>
          </div>
        )}

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-muted-foreground">
            {t('feedback.yourRating')}
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
                  aria-label={`${star} ${starLabels[star]}`}
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
                {starLabels[displayRating]}
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-muted-foreground">
            {t('feedback.yourReview')}
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 500))}
            maxLength={500}
            rows={4}
            placeholder={t('feedback.reviewPh')}
            className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none ring-ring/40 transition placeholder:text-muted-foreground focus:border-primary focus:ring-2"
          />
        </div>

        {total > 0 && <div className="mb-5 space-y-2">{[5,4,3,2,1].map(star => <div key={star} className="flex items-center gap-3 text-sm"><span className="w-10">{star} ⭐</span><div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-amber-400" style={{width: `${total ? ((distribution[star] || 0) / total) * 100 : 0}%`}} /></div><span className="w-8 text-right text-muted-foreground">{distribution[star] || 0}</span></div>)}</div>}

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
          {submitting ? t('feedback.submitting') : submitted ? t('feedback.thanks') : t('feedback.submit')}
        </button>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          {t('feedback.userReviews')}
        </h3>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center shadow-sm">
            <p className="text-sm text-muted-foreground">
              {t('feedback.empty')}
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
                      А
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {t('feedback.anonymous')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(review.created_at, lang)}
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

function formatDate(iso: string, lang: Lang): string {
  try {
    return new Date(iso).toLocaleDateString(LANG_LOCALE[lang], {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}
