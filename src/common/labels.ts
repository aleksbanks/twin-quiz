import type { Lang, Person } from 'api'
import type { Copy } from './copy'

export function personLabel(person: Person, texts: Copy): string {
  return person === 'sasha' ? texts.sasha : texts.lera
}

export function personMark(person: Person, lang: Lang): string {
  if (person === 'sasha') return lang === 'ru' ? 'С' : 'S'
  return lang === 'ru' ? 'Л' : 'V'
}
