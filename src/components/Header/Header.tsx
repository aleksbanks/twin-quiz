import ArrowRightArrowLeft from '@gravity-ui/icons/ArrowRightArrowLeft'
import Sparkles from '@gravity-ui/icons/Sparkles'
import type { Lang } from 'api'
import { Icon } from 'components/Icon/Icon'
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch'
import styles from './Header.module.css'

type HeaderProps = {
  lang: Lang
  homeLabel: string
  languageLabel: string
  onLanguageChange: (lang: Lang) => void
}

export function Header({ lang, homeLabel, languageLabel, onLanguageChange }: HeaderProps) {
  return (
    <header className={styles.header}>
      <a className={styles.wordmark} href='/' aria-label={homeLabel}>
        <p className={styles.letter}>{lang === 'en' ? 's' : 'с'}</p>
        <span className={styles.arrow}>
          <Icon data={ArrowRightArrowLeft} size={22} />
        </span>
        <p className={styles.letter}>{lang === 'en' ? 'v' : 'л'}</p>
        <span className={styles.dot}>
          <Icon data={Sparkles} size={24} />
        </span>
      </a>
      <LanguageSwitch lang={lang} label={languageLabel} onChange={onLanguageChange} />
    </header>
  )
}
