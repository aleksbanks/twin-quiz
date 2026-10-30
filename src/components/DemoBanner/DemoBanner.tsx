import styles from './DemoBanner.module.css'

type DemoBannerProps = {
  text: string
}

export function DemoBanner({ text }: DemoBannerProps) {
  return <div className={styles.banner}>{text}</div>
}
