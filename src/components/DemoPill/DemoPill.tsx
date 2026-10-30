import styles from './DemoPill.module.css'

type DemoPillProps = {
  text: string
}

export function DemoPill({ text }: DemoPillProps) {
  return <span className={styles.pill}>{text}</span>
}
