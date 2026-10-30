import Sparkles from '@gravity-ui/icons/Sparkles'
import { Icon } from 'components/Icon/Icon'
import styles from './Footer.module.css'

type FooterProps = {
  together: string
  established: string
  editionDate: string
  privacy: string
}

export function Footer({ together, established, editionDate, privacy }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <span className={styles.meta}>
        {together}{' '}
        <span className={styles.star}>
          <Icon data={Sparkles} size={12} />
        </span>{' '}
        {established}
      </span>
      <p className={styles.privacy}>{privacy}</p>
      <span className={styles.date}>{editionDate}</span>
    </footer>
  )
}
