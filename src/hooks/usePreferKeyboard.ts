import { useEffect, useState } from 'react'

/** True for mouse/trackpad environments where autofocus and keyboard hints help. */
export function usePreferKeyboard(): boolean {
  const [preferKeyboard, setPreferKeyboard] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    function sync() {
      setPreferKeyboard(media.matches)
    }
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return preferKeyboard
}
