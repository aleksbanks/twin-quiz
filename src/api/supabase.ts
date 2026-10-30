import { createClient } from '@supabase/supabase-js'
import type { Game, GameBackend, LeaderboardRow } from './types'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
if (!url || !key) throw new Error('Supabase is not configured')
const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
})

async function ensureAnonymousSession() {
  const {
    data: { session },
    error: sessionError
  } = await supabase.auth.getSession()
  if (sessionError) throw new Error(sessionError.message)
  if (session) return
  const { error } = await supabase.auth.signInAnonymously()
  if (error) throw new Error(error.message)
}

async function rpc<T>(name: string, args: Record<string, unknown>): Promise<T> {
  await ensureAnonymousSession()
  const { data, error } = await supabase.rpc(name, args)
  if (error) throw new Error(error.message)
  return data as T
}

export const supabaseBackend: GameBackend = {
  async request(action) {
    if (!action) return rpc<Game | null>('quiz_restore', {})
    if (action.action === 'start') return rpc<Game>('quiz_start', { p_name: action.name })
    if (action.action === 'answer')
      return rpc<Game>('quiz_answer', { p_question: action.question, p_choice: action.choice })
    return rpc<Game>('quiz_advance', { p_question: action.question })
  },
  leaderboard: () => rpc<LeaderboardRow[]>('quiz_leaderboard', {})
}
