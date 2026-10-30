import type { QuizError } from 'hooks/useQuizApp'
import styles from './Error.module.css'

type ErrorAlertProps = {
  message: string
  retryLabel: string
  error: QuizError
  onRetryLoad: () => void
  onRetryBoard: () => void
}

export function ErrorAlert({ message, retryLabel, error, onRetryLoad, onRetryBoard }: ErrorAlertProps) {
  if (!error) return null

  return (
    <div className={styles.error} role='alert'>
      {message}{' '}
      {error === 'load' && (
        <button className={styles.retry} onClick={onRetryLoad}>
          {retryLabel}
        </button>
      )}
      {error === 'board' && (
        <button className={styles.retry} onClick={onRetryBoard}>
          {retryLabel}
        </button>
      )}
    </div>
  )
}
