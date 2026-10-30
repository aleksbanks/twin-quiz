import type { KeyboardEvent } from 'react'
import type { Lang } from 'api'
import { cx } from 'utils/cx'
import styles from './LanguageSwitch.module.css'

const LANGS: Lang[] = ['en', 'ru']

type LanguageSwitchProps = {
  lang: Lang
  label: string
  onChange: (lang: Lang) => void
}

export function LanguageSwitch({ lang, label, onChange }: LanguageSwitchProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight' &&
      event.key !== 'ArrowUp' &&
      event.key !== 'ArrowDown'
    ) {
      return
    }
    event.preventDefault()
    const currentIndex = LANGS.indexOf(lang)
    const delta = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1
    const nextLang = LANGS[(currentIndex + delta + LANGS.length) % LANGS.length]
    onChange(nextLang)
    const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('button')
    buttons[LANGS.indexOf(nextLang)]?.focus()
  }

  return (
    <div className={styles.language} role='radiogroup' aria-label={label} onKeyDown={handleKeyDown}>
      {LANGS.map((option) => (
        <button
          key={option}
          type='button'
          role='radio'
          aria-checked={lang === option}
          tabIndex={lang === option ? 0 : -1}
          className={cx(styles.button, lang === option && styles.active)}
          onClick={() => onChange(option)}>
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
