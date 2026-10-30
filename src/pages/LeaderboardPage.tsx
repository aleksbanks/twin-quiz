import { useRef } from 'react'
import { Button, DemoPill, Eyebrow, MutedText, Panel } from 'components'
import type { LeaderboardRow } from 'api'
import type { Copy } from 'common'
import { useFocusElement } from 'hooks/useFocusElement'
import { usePreferKeyboard } from 'hooks/usePreferKeyboard'
import { formatRank, rankForScore } from 'utils/leaderboard'
import styles from './LeaderboardPage.module.css'

type LeaderboardProps = {
  texts: Copy
  busy: boolean
  rows: LeaderboardRow[]
  onBack: () => void
}

export function Leaderboard({ texts, busy, rows, onBack }: LeaderboardProps) {
  const preferKeyboard = usePreferKeyboard()
  const backButtonRef = useRef<HTMLButtonElement>(null)

  useFocusElement(preferKeyboard && !busy, backButtonRef)

  return (
    <Panel
      aria-labelledby='leaderboard-title'
      onKeyDown={(event) => {
        if (event.key === 'Escape') onBack()
      }}>
      <Eyebrow align='center'>THE TWINDEX / 2026</Eyebrow>
      <h1 id='leaderboard-title'>{texts.board}</h1>
      <MutedText>{texts.boardSub}</MutedText>
      <DemoPill text={texts.badge} />
      {busy ? (
        <p role='status'>{texts.loading}</p>
      ) : rows.length ? (
        <ol className={styles.ranking}>
          {rows.map((row, index) => (
            <li key={`${row.completed}-${index}`}>
              <span className={styles.rank}>{formatRank(rankForScore(rows, row.score))}</span>
              <span className={styles.name}>{row.name}</span>
              <strong>
                {row.score}
                <small> / 17</small>
              </strong>
            </li>
          ))}
        </ol>
      ) : (
        <p className={styles.empty}>{texts.empty}</p>
      )}
      <Button ref={backButtonRef} variant='secondary' onClick={onBack}>
        {texts.back}
      </Button>
    </Panel>
  )
}
