import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase is not configured: set SUPABASE_URL and SUPABASE_ANON_KEY in Vercel.')
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export const supabase = {
  from(table: string) {
    return getSupabase().from(table)
  },
}
