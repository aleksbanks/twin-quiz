export type Lang = 'ru' | 'en'
export type Person = 'sasha' | 'lera'
export type Game = {
  name: string
  cursor: number
  total: number
  score: number
  done: boolean
  question: { id: number; text: Record<Lang, string> } | null
  reveal: { choice: Person; correct: number; person: Person; story: Record<Lang, string> } | null
}
export type LeaderboardRow = { name: string; score: number; completed: string }
export type GameAction =
  | { action: 'start'; name: string }
  | { action: 'answer'; question: number; choice: Person }
  | { action: 'next'; question: number }
export interface GameBackend {
  request(action?: GameAction): Promise<Game | null>
  leaderboard(): Promise<LeaderboardRow[]>
}
