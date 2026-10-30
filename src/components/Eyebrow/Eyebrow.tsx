import type { HTMLAttributes, ReactNode } from 'react'
import { cx } from 'utils/cx'
import styles from './Eyebrow.module.css'

type EyebrowProps = {
  children: ReactNode
  align?: 'start' | 'center'
  className?: string
} & Omit<HTMLAttributes<HTMLParagraphElement>, 'className' | 'children'>

export function Eyebrow({ children, align = 'start', className, ...props }: EyebrowProps) {
  return (
    <p className={cx(styles.eyebrow, align === 'center' && styles.center, className)} {...props}>
      {children}
    </p>
  )
}
