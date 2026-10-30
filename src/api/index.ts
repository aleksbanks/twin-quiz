import { supabaseBackend } from './supabase'
import type { GameAction } from './types'

export async function requestGame(action?: GameAction) {
  return supabaseBackend.request(action)
}

export async function getLeaderboard() {
  return supabaseBackend.leaderboard()
}

export type { Game, GameAction, Lang, LeaderboardRow, Person } from './types'
