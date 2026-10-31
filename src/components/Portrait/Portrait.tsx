import type { Person } from 'api'
import { cx } from 'utils/cx'
import styles from './Portrait.module.css'

const PHOTO_SRC: Record<Person, string> = {
  sasha: '/photos/Sasha.png',
  lera: '/photos/Val.png'
}

type PortraitProps = {
  person: Person
  label: string
  mark: string
  small?: boolean
}

export function Portrait({ person, label, mark, small = false }: PortraitProps) {
  return (
    <div className={cx(styles.portrait, styles[person], small && styles.small)}>
      <img className={styles.photo} src={PHOTO_SRC[person]} alt={label} />
      <span className={styles.mark} aria-hidden='true'>
        {mark}
      </span>
    </div>
  )
}
