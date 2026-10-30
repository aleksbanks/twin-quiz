import type { ComponentType, SVGProps } from 'react'
import { cx } from 'utils/cx'
import styles from './Icon.module.css'

type IconProps = {
  data: ComponentType<SVGProps<SVGSVGElement>>
  size?: number
  className?: string
} & Omit<SVGProps<SVGSVGElement>, 'width' | 'height' | 'className'>

/** Thin wrapper around `@gravity-ui/icons` glyphs (same `data` API as uikit Icon). */
export function Icon({ data: Data, size = 16, className, ...props }: IconProps) {
  return (
    <Data
      className={cx(styles.icon, className)}
      width={size}
      height={size}
      aria-hidden={props['aria-hidden'] ?? true}
      {...props}
    />
  )
}
