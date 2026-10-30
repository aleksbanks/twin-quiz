import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from 'utils/cx'
import styles from './Panel.module.css'

type PanelProps = {
  children: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'>

export function Panel({ children, className, ...props }: PanelProps) {
  return (
    <section className={cx(styles.panel, className)} {...props}>
      {children}
    </section>
  )
}
