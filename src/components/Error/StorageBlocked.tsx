import styles from './Error.module.css'

type StorageBlockedProps = {
  message: string
}

export function StorageBlocked({ message }: StorageBlockedProps) {
  return (
    <div className={styles.error} role='alert'>
      {message}
    </div>
  )
}
