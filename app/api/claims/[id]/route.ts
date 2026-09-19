import { supabase } from '@/lib/supabase'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params

    if (!id) {
      return Response.json({ error: 'ID обязателен.' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('claims')
      .select('id, claim_text, country, marketplace, problem_type, created_at')
      .eq('id', id)
      .maybeSingle()

    if (error) {
      console.error('[claims] GET error:', error.message)
      return Response.json({ error: 'Не удалось найти претензию.' }, { status: 500 })
    }

    if (!data) {
      return Response.json({ error: 'Претензия не найдена.' }, { status: 404 })
    }

    return Response.json({
      id: data.id,
      claimText: data.claim_text,
      country: data.country,
      marketplace: data.marketplace,
      problemType: data.problem_type,
      createdAt: data.created_at,
    })
  } catch (err) {
    console.error('[claims] GET by id error:', (err as Error).message)
    return Response.json({ error: 'Произошла ошибка.' }, { status: 500 })
  }
}
