import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cx } from 'utils/cx'
import styles from './Button.module.css'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  endIcon?: ReactNode
  className?: string
  children: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', endIcon, className, children, type = 'button', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(styles.button, variant === 'primary' ? styles.primary : styles.secondary, className)}
      {...props}>
      {children}
      {endIcon != null && (
        <span className={styles.icon} aria-hidden='true'>
          {endIcon}
        </span>
      )}
    </button>
  )
})
