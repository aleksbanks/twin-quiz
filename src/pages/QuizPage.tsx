import { useEffect, useRef, type KeyboardEvent } from 'react'
import ArrowRight from '@gravity-ui/icons/ArrowRight'
import ArrowUturnCwRight from '@gravity-ui/icons/ArrowUturnCwRight'
import Check from '@gravity-ui/icons/Check'
import { Button, ChoiceOption, DemoPill, Eyebrow, Icon, Portrait, ProgressBar } from 'components'
import type { Game, Lang, Person } from 'api'
import type { Copy } from 'common'
import { personLabel, personMark } from 'common'
import { usePreferKeyboard } from 'hooks/usePreferKeyboard'
import { celebrateCorrect } from 'utils/celebrate'
import { cx } from 'utils/cx'
import styles from './QuizPage.module.css'

const PEOPLE: Person[] = ['sasha', 'lera']

type QuizProps = {
  texts: Copy
  lang: Lang
  game: Game
  choice: Person | null
  busy: boolean
  onChoice: (person: Person) => void
  onAnswer: (choice: Person) => void
  onNext: () => void
}

export function Quiz({ texts, lang, game, choice, busy, onChoice, onAnswer, onNext }: QuizProps) {
  const preferKeyboard = usePreferKeyboard()
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const choiceRefs = useRef<Array<HTMLButtonElement | null>>([])
  const progressValue = game.cursor + (game.reveal ? 1 : 0)
  const activeIndex = choice ? PEOPLE.indexOf(choice) : 0

  useEffect(() => {
    if (!preferKeyboard) return
    const frame = window.requestAnimationFrame(() => {
      if (game.reveal) {
        nextButtonRef.current?.focus()
        return
      }
      choiceRefs.current[activeIndex]?.focus()
    })
    return () => window.cancelAnimationFrame(frame)
    // Focus only when the quiz step changes, not on every choice tweak from arrows.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional: cursor/reveal only
  }, [game.cursor, game.reveal, preferKeyboard])

  useEffect(() => {
    if (!game.reveal?.correct) return
    celebrateCorrect()
  }, [game.cursor, game.reveal])

  function focusChoice(index: number) {
    choiceRefs.current[index]?.focus()
  }

  function handleChoicesKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (busy || game.reveal) return

    if (event.key === '1' || event.key === '2') {
      event.preventDefault()
      const index = Number(event.key) - 1
      onChoice(PEOPLE[index])
      focusChoice(index)
      return
    }

    if (
      event.key === 'ArrowRight' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowUp'
    ) {
      event.preventDefault()
      const delta = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1
      const nextIndex = (activeIndex + delta + PEOPLE.length) % PEOPLE.length
      onChoice(PEOPLE[nextIndex])
      focusChoice(nextIndex)
      return
    }

    if (event.key === 'Enter' && choice) {
      event.preventDefault()
      onAnswer(choice)
    }
  }

  return (
    <section className={styles.quiz} aria-labelledby='quiz-question' onKeyDown={handleChoicesKeyDown}>
      <div className={styles.meta}>
        <span>
          {texts.question} {String(game.cursor + 1).padStart(2, '0')} {texts.of} {game.total}
        </span>
        <span>
          {game.name}{' '}
          <b>
            · {game.score} / {game.total}
          </b>
        </span>
      </div>
      <ProgressBar label={texts.question} value={progressValue} max={game.total} />
      <div className={styles.content}>
        <Eyebrow id='quiz-choose'>{texts.choose}</Eyebrow>
        <h1 id='quiz-question'>{game.question?.text[lang]}</h1>
        {game.reveal ? (
          <div
            className={cx(styles.reveal, game.reveal.correct ? styles.revealCorrect : styles.revealWrong)}
            aria-live='polite'>
            <p className={cx(styles.verdict, Boolean(game.reveal.correct) && styles.correct)}>
              <Icon data={game.reveal.correct ? Check : ArrowUturnCwRight} size={16} />
              {game.reveal.correct ? texts.right : texts.wrong}
            </p>
            <div className={styles.revealStory}>
              <div className={styles.revealPortrait}>
                <Portrait
                  person={game.reveal.person}
                  label={personLabel(game.reveal.person, texts)}
                  mark={personMark(game.reveal.person, lang)}
                />
                <span className={styles.revealCaption}>{personLabel(game.reveal.person, texts)}</span>
              </div>
              <div className={styles.revealCopy}>
                <Eyebrow>{texts.its}</Eyebrow>
                <h2>{personLabel(game.reveal.person, texts)}!</h2>
                <p className={styles.story}>{game.reveal.story[lang]}</p>
                <DemoPill text={texts.badge} />
              </div>
            </div>
            <Button
              ref={nextButtonRef}
              className={styles.nextButton}
              disabled={busy}
              endIcon={<Icon data={ArrowRight} size={18} />}
              onClick={onNext}>
              {game.cursor === game.total - 1 ? texts.finish : texts.next}
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.choices} role='radiogroup' aria-labelledby='quiz-choose'>
              {PEOPLE.map((person, index) => (
                <ChoiceOption
                  key={person}
                  ref={(node) => {
                    choiceRefs.current[index] = node
                  }}
                  index={index + 1}
                  label={personLabel(person, texts)}
                  selected={choice === person}
                  tabIndex={activeIndex === index ? 0 : -1}
                  disabled={busy}
                  onClick={() => onChoice(person)}
                />
              ))}
            </div>
            {preferKeyboard && <p className={styles.keysHint}>{texts.keys}</p>}
            <Button
              className={styles.submit}
              disabled={!choice || busy}
              endIcon={<Icon data={ArrowRight} size={18} />}
              onClick={() => {
                if (choice) onAnswer(choice)
              }}>
              {busy ? '…' : texts.submit}
            </Button>
          </>
        )}
      </div>
    </section>
  )
}
