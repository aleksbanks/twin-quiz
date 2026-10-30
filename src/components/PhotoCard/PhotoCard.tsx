import type { ReactNode } from 'react'
import type { Person } from 'api'
import { cx } from 'utils/cx'
import styles from './PhotoCard.module.css'

type PhotoCardProps = {
  person: Person
  name: string
  children: ReactNode
}

export function PhotoCard({ person, name, children }: PhotoCardProps) {
  return (
    <div className={cx(styles.card, person === 'sasha' ? styles.sasha : styles.lera)}>
      {children}
      <div className={styles.caption}>{name}</div>
    </div>
  )
}
