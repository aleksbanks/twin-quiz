import Sparkles from '@gravity-ui/icons/Sparkles'
import { Icon } from 'components/Icon/Icon'
import styles from './Loading.module.css'

type LoadingProps = {
  text: string
}

export function Loading({ text }: LoadingProps) {
  return (
    <div className={styles.loading} role='status'>
      <Icon data={Sparkles} size={40} className={styles.mark} />
      <p className={styles.text}>{text}</p>
    </div>
  )
}
