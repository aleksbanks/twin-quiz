import styles from './SkipLink.module.css'

type SkipLinkProps = {
  label: string
  targetId?: string
}

export function SkipLink({ label, targetId = 'main-content' }: SkipLinkProps) {
  return (
    <a className={styles.skip} href={`#${targetId}`}>
      {label}
    </a>
  )
}
