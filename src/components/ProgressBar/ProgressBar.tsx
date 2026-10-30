import styles from './ProgressBar.module.css'

type ProgressBarProps = {
  label: string
  value: number
  max: number
}

export function ProgressBar({ label, value, max }: ProgressBarProps) {
  const percent = max > 0 ? (value / max) * 100 : 0

  return (
    <div
      className={styles.progress}
      role='progressbar'
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}>
      <span className={styles.fill} style={{ width: `${percent}%` }} />
    </div>
  )
}
