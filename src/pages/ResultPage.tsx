import { useRef } from 'react'
import ArrowUpRight from '@gravity-ui/icons/ArrowUpRight'
import { Button, DemoPill, Eyebrow, Icon, MutedText, Panel, Portrait } from 'components'
import type { Game, Lang } from 'api'
import type { Copy } from 'common'
import { personMark } from 'common'
import { useFocusElement } from 'hooks/useFocusElement'
import { usePreferKeyboard } from 'hooks/usePreferKeyboard'
import styles from './ResultPage.module.css'

type ResultProps = {
  texts: Copy
  lang: Lang
  game: Game
  onViewBoard: () => void
}

export function Result({ texts, lang, game, onViewBoard }: ResultProps) {
  const preferKeyboard = usePreferKeyboard()
  const ctaRef = useRef<HTMLButtonElement>(null)

  useFocusElement(preferKeyboard, ctaRef)

  return (
    <Panel className={styles.result} aria-labelledby='result-title'>
      <Eyebrow align='center'>{texts.result}</Eyebrow>
      <div className={styles.twinMini} aria-hidden='true'>
        <Portrait person='sasha' label={texts.sasha} mark={personMark('sasha', lang)} small />
        <Portrait person='lera' label={texts.lera} mark={personMark('lera', lang)} small />
      </div>
      <h1 id='result-title'>{texts.end}</h1>
      <p className={styles.resultName}>{game.name}</p>
      <div className={styles.bigScore} aria-label={`${game.score} / ${game.total}`}>
        {game.score}
        <span>/{game.total}</span>
      </div>
      <MutedText>
        {game.score} {texts.out} {game.total}
      </MutedText>
      <DemoPill text={texts.badge} />
      <Button
        ref={ctaRef}
        className={styles.cta}
        endIcon={<Icon data={ArrowUpRight} size={18} />}
        onClick={onViewBoard}>
        {texts.view}
      </Button>
    </Panel>
  )
}
