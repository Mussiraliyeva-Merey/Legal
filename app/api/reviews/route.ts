import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('id, rating, comment, name, created_at')
      .order('created_at', { ascending: false })
      .limit(100)

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

    return Response.json({ reviews, average, total })
  } catch (err) {
    console.error('[reviews] GET error:', (err as Error).message)
    return Response.json({ reviews: [], average: 0, total: 0 })
  }
}

export async function POST(req: Request) {
  try {
    const { rating, comment, name } = await req.json()

    if (!rating || rating < 1 || rating > 5) {
      return Response.json(
        { error: 'Оценка должна быть от 1 до 5 звёзд.' },
        { status: 400 },
      )
    }

    const trimmedComment = typeof comment === 'string' ? comment.trim().slice(0, 2000) : null
    const trimmedName = typeof name === 'string' ? name.trim().slice(0, 100) : null

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        rating: Math.round(rating),
        comment: trimmedComment || null,
        name: trimmedName || null,
      })
      .select('id, rating, comment, name, created_at')
      .single()

    if (error) {
      console.error('[reviews] POST error:', error.message)
      return Response.json(
        { error: 'Не удалось сохранить отзыв. Попробуйте ещё раз.' },
        { status: 500 },
      )
    }

    return Response.json({ review: data })
  } catch (err) {
    console.error('[reviews] POST error:', (err as Error).message)
    return Response.json(
      { error: 'Произошла ошибка. Попробуйте ещё раз.' },
      { status: 500 },
    )
  }
}
