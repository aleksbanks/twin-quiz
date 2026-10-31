import Sparkles from '@gravity-ui/icons/Sparkles'
import { Icon } from 'components/Icon/Icon'
import styles from './Footer.module.css'

type FooterProps = {
  together: string
  established: string
  editionDate: string
  privacy: string
  creditsParents: string
  creditsSite: string
}

export function Footer({
  together,
  established,
  editionDate,
  privacy,
  creditsParents,
  creditsSite
}: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <span className={styles.meta}>
          {together}{' '}
          <span className={styles.star}>
            <Icon data={Sparkles} size={12} />
          </span>{' '}
          {established}
        </span>
      </div>
      <div className={styles.bottom}>
        <p className={styles.creditsParents}>{creditsParents}</p>
        <div className={styles.creditsRow}>
          <p className={styles.creditsSite}>{creditsSite}</p>
          <span className={styles.date}>{editionDate}</span>
        </div>
        <p className={styles.privacy}>{privacy}</p>
      </div>
    </footer>
  )
}
