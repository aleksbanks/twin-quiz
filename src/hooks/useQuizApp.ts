import { useEffect, useState } from 'react'
import { getLeaderboard, requestGame } from 'api'
import type { Game, GameAction, Lang, LeaderboardRow, Person } from 'api'
import { copy } from 'common/copy'
import { canUseStorage, getStoredLang, setStoredLang } from 'utils/storage'

export type QuizError = '' | 'load' | 'save' | 'board'

export function useQuizApp() {
  const [lang, setLang] = useState<Lang>('en')
  const [game, setGame] = useState<Game | null>(null)
  const [name, setName] = useState('')
  const [choice, setChoice] = useState<Person | null>(null)
  const [busy, setBusy] = useState(true)
  const [error, setError] = useState<QuizError>('')
  const [storageOk, setStorageOk] = useState(true)
  const [showBoard, setShowBoard] = useState(false)
  const [rows, setRows] = useState<LeaderboardRow[]>([])

  const texts = copy[lang]

  async function restore() {
    setBusy(true)
    setError('')
    try {
      const storedLang = getStoredLang()
      if (storedLang) setLang(storedLang)
      setGame(await requestGame())
    } catch {
      setError('load')
    } finally {
      setBusy(false)
    }
  }

  // Persisted attempt is restored once on client mount.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (!canUseStorage()) {
        setStorageOk(false)
        setBusy(false)
        return
      }
      void restore()
    }, 0)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  function handleLanguageChange(next: Lang) {
    setLang(next)
    if (!setStoredLang(next)) setStorageOk(false)
  }

  async function handleGameAction(body: GameAction) {
    setBusy(true)
    setError('')
    try {
      setGame(await requestGame(body))
      setChoice(null)
    } catch {
      setError('save')
    } finally {
      setBusy(false)
    }
  }

  async function handleShowBoard() {
    setShowBoard(true)
    setBusy(true)
    setError('')
    try {
      setRows(await getLeaderboard())
    } catch {
      setError('board')
    } finally {
      setBusy(false)
    }
  }

  function handleHideBoard() {
    setShowBoard(false)
    setError('')
  }

  function handleChoice(person: Person) {
    setChoice(person)
  }

  function handleNameChange(value: string) {
    setName(value)
  }

  return {
    lang,
    texts,
    game,
    name,
    choice,
    busy,
    error,
    storageOk,
    showBoard,
    rows,
    restore,
    handleLanguageChange,
    handleGameAction,
    handleShowBoard,
    handleHideBoard,
    handleChoice,
    handleNameChange
  }
}
