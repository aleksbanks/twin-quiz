import type { Person } from 'api'
import { cx } from 'utils/cx'
import styles from './Portrait.module.css'

type PortraitProps = {
  person: Person
  label: string
  mark: string
  small?: boolean
}

export function Portrait({ person, label, mark, small = false }: PortraitProps) {
  return (
    <div
      className={cx(styles.portrait, styles[person], small && styles.small)}
      aria-label={label}>
      <svg viewBox='0 0 180 210' aria-hidden='true'>
        <path className={styles.hair} d='M42 109C12 34 68 9 90 19c51-17 82 50 47 102l-11 47H46z' />
        <path className={styles.shirt} d='M12 210c0-62 32-82 77-82s79 20 79 82' />
        <path fill='#f5c2a0' d='M75 112h30v33c-8 13-22 13-30 0z' />
        <ellipse fill='#f8c9aa' cx='90' cy='79' rx='38' ry='49' />
        <path
          className={styles.hair}
          d='M48 64c-3-37 26-49 42-46 39-6 56 31 48 51-18-1-38-12-44-30-12 16-27 23-46 25'
        />
        <path d='M71 79h6m27 0h6' stroke='#342b2c' strokeWidth='3' strokeLinecap='round' />
        <path d='M80 105q10 8 20 0' stroke='#a35252' strokeWidth='3' fill='none' strokeLinecap='round' />
      </svg>
      <span className={styles.mark}>{mark}</span>
    </div>
  )
}
