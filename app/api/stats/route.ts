import { supabase } from '@/lib/supabase'
import { STATS_PROBLEM_TYPES, PROBLEM_LABELS, type ProblemType } from '@/lib/constants'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('problem_events')
      .select('problem_type')

    if (error) {
      console.error('[stats] supabase error:', error.message)
      return Response.json({ stats: [], total: 0 })
    }

    if (!data || data.length === 0) {
      const empty = STATS_PROBLEM_TYPES.map((type) => ({
        type,
        label: PROBLEM_LABELS[type],
        count: 0,
        percentage: 0,
      }))
      return Response.json({ stats: empty, total: 0 })
    }

    const counts: Record<string, number> = {}
    for (const row of data) {
      const t = row.problem_type
      counts[t] = (counts[t] || 0) + 1
    }

    const total = data.length
    const stats = STATS_PROBLEM_TYPES.map((type: ProblemType) => {
      const count = counts[type] || 0
      return {
        type,
        label: PROBLEM_LABELS[type],
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }
    })

    return Response.json({ stats, total })
  } catch (err) {
    console.error('[stats] error:', (err as Error).message)
    return Response.json({ stats: [], total: 0 })
  }
}

export async function POST(req: Request) {
  try {
    const { problemType, country, marketplace } = await req.json()

    if (!problemType) {
      return Response.json({ error: 'problem_type required' }, { status: 400 })
    }

    const { error } = await supabase.from('problem_events').insert({
      problem_type: problemType,
      country: country || null,
      marketplace: marketplace || null,
    })

    if (error) {
      console.error('[stats] insert error:', error.message)
      return Response.json({ error: 'Failed to record event' }, { status: 500 })
    }

    return Response.json({ success: true })
  } catch (err) {
    console.error('[stats] POST error:', (err as Error).message)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
