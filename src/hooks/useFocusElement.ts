import { useEffect, type RefObject } from 'react'

/** Moves focus when `shouldFocus` becomes true (e.g. after a screen/step change). */
export function useFocusElement(shouldFocus: boolean, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!shouldFocus) return
    const node = ref.current
    if (!node) return
    const frame = window.requestAnimationFrame(() => node.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [shouldFocus, ref])
}
