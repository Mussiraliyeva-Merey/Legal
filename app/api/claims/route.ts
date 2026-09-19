import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const { claimText, country, marketplace, problemType } = await req.json()

    if (!claimText || claimText.trim().length === 0) {
      return Response.json({ error: 'Текст претензии обязателен.' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('claims')
      .insert({
        claim_text: claimText.slice(0, 50000),
        country: country || null,
        marketplace: marketplace || null,
        problem_type: problemType || null,
      })
      .select('id')
      .single()

    if (error) {
      console.error('[claims] insert error:', error.message)
      return Response.json(
        { error: 'Не удалось сохранить претензию.' },
        { status: 500 },
      )
    }

    return Response.json({ id: data.id })
  } catch (err) {
    console.error('[claims] POST error:', (err as Error).message)
    return Response.json(
      { error: 'Произошла ошибка. Попробуйте ещё раз.' },
      { status: 500 },
    )
  }
}
