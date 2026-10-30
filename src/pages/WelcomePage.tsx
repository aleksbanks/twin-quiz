import { useRef, type FormEvent } from 'react'
import Sparkles from '@gravity-ui/icons/Sparkles'
import { Button, Eyebrow, Icon, PhotoCard, Portrait } from 'components'
import type { Lang } from 'api'
import type { Copy } from 'common'
import { personMark } from 'common'
import { useFocusElement } from 'hooks/useFocusElement'
import { usePreferKeyboard } from 'hooks/usePreferKeyboard'
import styles from './WelcomePage.module.css'

type WelcomeProps = {
  texts: Copy
  lang: Lang
  name: string
  busy: boolean
  storageOk: boolean
  onNameChange: (value: string) => void
  onStart: (name: string) => void
}

export function Welcome({ texts, lang, name, busy, storageOk, onNameChange, onStart }: WelcomeProps) {
  const preferKeyboard = usePreferKeyboard()
  const nameInputRef = useRef<HTMLInputElement>(null)

  useFocusElement(preferKeyboard && storageOk && !busy, nameInputRef)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (name.trim()) onStart(name)
  }

  return (
    <section className={styles.welcome} aria-labelledby='welcome-title'>
      <div className={styles.intro}>
        <Eyebrow>
          <span className={styles.tinyStar}>
            <Icon data={Sparkles} size={18} />
          </span>{' '}
          {texts.edition}
        </Eyebrow>
        <h1 id='welcome-title'>{texts.title}</h1>
        <p className={styles.introCopy}>{texts.intro}</p>
        <form onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor='name'>
            {texts.name}
          </label>
          <div className={styles.nameRow}>
            <input
              ref={nameInputRef}
              className={styles.input}
              id='name'
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              maxLength={30}
              placeholder={texts.placeholder}
              autoComplete='given-name'
              required
              disabled={!storageOk || busy}
            />
            <Button type='submit' className={styles.startButton} disabled={!name.trim() || !storageOk || busy}>
              {texts.start}
            </Button>
          </div>
        </form>
        <p className={styles.micro}>{texts.note}</p>
      </div>
      <div className={styles.visual} aria-hidden='true'>
        <span className={styles.scribble}>
          <Icon data={Sparkles} size={64} />
        </span>
        <PhotoCard person='sasha' name={texts.sasha}>
          <Portrait person='sasha' label={texts.sasha} mark={personMark('sasha', lang)} />
        </PhotoCard>
        <PhotoCard person='lera' name={texts.lera}>
          <Portrait person='lera' label={texts.lera} mark={personMark('lera', lang)} />
        </PhotoCard>
        <span className={styles.sticker}>
          SAME SAME.
          <br />
          <b>BUT DIFFERENT.</b>
        </span>
        <span className={styles.visualNote}>{texts.tag}</span>
      </div>
    </section>
  )
}
