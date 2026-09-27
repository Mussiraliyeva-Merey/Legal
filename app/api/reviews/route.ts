import { supabase } from '@/lib/supabase'
const requests = new Map<string, number>()
const SOURCES = new Set(['complaint', 'ai_assistant'])

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('id, rating, comment, source, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[reviews] GET error:', error.message)
      return Response.json({ reviews: [], average: 0, total: 0 })
    }

    const reviews = data || []
    const total = reviews.length
    const average =
      total > 0
        ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / total) * 10) / 10
        : 0

    const distribution = Object.fromEntries([1,2,3,4,5].map(star => [star, reviews.filter(review => review.rating === star).length]))
    return Response.json({ reviews, average, total, distribution })
  } catch (err) {
    console.error('[reviews] GET error:', (err as Error).message)
    return Response.json({ reviews: [], average: 0, total: 0 })
  }
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const now = Date.now()
    if (now - (requests.get(ip) || 0) < 10_000) return Response.json({ error: 'Пожалуйста, подождите перед повторной отправкой.' }, { status: 429 })
    const { rating, comment, source, submissionKey } = await req.json()

    if (!rating || rating < 1 || rating > 5) {
      return Response.json(
        { error: 'Оценка должна быть от 1 до 5 звёзд.' },
        { status: 400 },
      )
    }

    if (!Number.isInteger(rating) || !SOURCES.has(source)) return Response.json({ error: 'Некорректные данные отзыва.' }, { status: 400 })
    const trimmedComment = typeof comment === 'string' ? comment.trim().slice(0, 500) : null
    const safeKey = typeof submissionKey === 'string' && /^[a-zA-Z0-9_-]{16,100}$/.test(submissionKey) ? submissionKey : null
    if (!safeKey) return Response.json({ error: 'Некорректный идентификатор действия.' }, { status: 400 })

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        rating: Math.round(rating),
        comment: trimmedComment || null,
        source,
        submission_key: safeKey,
      })
      .select('id, rating, comment, source, created_at')
      .single()

    if (error) {
      if (error.code === '23505') return Response.json({ success: true, duplicate: true })
      console.error('[reviews] POST error:', error.message)
      return Response.json(
        { error: 'Не удалось сохранить отзыв. Попробуйте ещё раз.' },
        { status: 500 },
      )
    }

    requests.set(ip, now)
    return Response.json({ review: data })
  } catch (err) {
    console.error('[reviews] POST error:', (err as Error).message)
    return Response.json(
      { error: 'Произошла ошибка. Попробуйте ещё раз.' },
      { status: 500 },
    )
  }
}
