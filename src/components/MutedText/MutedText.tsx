import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from 'utils/cx'
import styles from './MutedText.module.css'

type MutedTextProps = {
  children: ReactNode
  className?: string
} & Omit<HTMLAttributes<HTMLParagraphElement>, 'className' | 'children'>

export function MutedText({ children, className, ...props }: MutedTextProps) {
  return (
    <p className={cx(styles.muted, className)} {...props}>
      {children}
    </p>
  )
}
