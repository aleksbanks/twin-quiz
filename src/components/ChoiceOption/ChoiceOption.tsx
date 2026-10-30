import { forwardRef, type ButtonHTMLAttributes } from 'react'
import Check from '@gravity-ui/icons/Check'
import { Icon } from 'components/Icon/Icon'
import { cx } from 'utils/cx'
import styles from './ChoiceOption.module.css'

type ChoiceOptionProps = {
  index: number
  label: string
  selected: boolean
  className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'type'>

export const ChoiceOption = forwardRef<HTMLButtonElement, ChoiceOptionProps>(function ChoiceOption(
  { index, label, selected, className, disabled, onClick, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type='button'
      role='radio'
      aria-checked={selected}
      aria-keyshortcuts={`${index}`}
      className={cx(styles.choice, selected && styles.selected, className)}
      disabled={disabled}
      onClick={onClick}
      {...props}>
      <span className={styles.label}>{label}</span>
      <span className={cx(styles.mark, selected && styles.markVisible)} aria-hidden={!selected}>
        <Icon data={Check} size={18} />
      </span>
    </button>
  )
})
