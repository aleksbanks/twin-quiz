import type { LeaderboardRow } from 'api'

/** Dense rank: same score → same place (1-based). */
export function rankForScore(rows: LeaderboardRow[], score: number): number {
  return rows.findIndex((row) => row.score === score) + 1
}

export function formatRank(rank: number): string {
  return String(rank).padStart(2, '0')
}
