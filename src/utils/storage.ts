import type { Lang } from 'api'

const LANG_KEY = 'twins-lang'
const CHECK_KEY = 'twins-check'

export function canUseStorage(): boolean {
  try {
    localStorage.setItem(CHECK_KEY, '1')
    localStorage.removeItem(CHECK_KEY)
    return true
  } catch {
    return false
  }
}

export function getStoredLang(): Lang | null {
  try {
    const value = localStorage.getItem(LANG_KEY)
    return value === 'ru' || value === 'en' ? value : null
  } catch {
    return null
  }
}

export function setStoredLang(lang: Lang): boolean {
  try {
    localStorage.setItem(LANG_KEY, lang)
    return true
  } catch {
    return false
  }
}
