import type { ReactNode } from 'react'
import type { Lang } from 'api'

export type Copy = {
  edition: string
  tag: string
  title: ReactNode
  intro: string
  name: string
  placeholder: string
  start: string
  note: string
  demo: string
  sasha: string
  lera: string
  together: string
  established: string
  editionDate: string
  home: string
  question: string
  of: string
  score: string
  choose: string
  submit: string
  next: string
  finish: string
  right: string
  wrong: string
  its: string
  result: string
  end: string
  out: string
  board: string
  boardSub: string
  empty: string
  you: string
  back: string
  view: string
  loading: string
  retry: string
  error: string
  privacy: string
  creditsParents: string
  creditsSite: string
  blocked: string
  badge: string
  gallery: string
  galleryEyebrow: string
  gallerySub: string
  galleryOpen: string
  galleryBack: string
  galleryPrev: string
  galleryNext: string
  skip: string
  keys: string
  language: string
}

export const copy: Record<Lang, Copy> = {
  en: {
    edition: 'THE BIRTHDAY EDITION',
    tag: 'Same birthday. Different plot twists.',
    title: (
      <>
        Two sisters.
        <br />
        One wild <i>story.</i>
      </>
    ),
    intro: 'You know us! Or do you? Guess which twin each story belongs to — and discover a little more of our lore.',
    name: 'What should we call you?',
    placeholder: 'Your name',
    start: 'Let’s find out',
    note: '18 questions · One shot · A lot of lore',
    demo: 'THE BIRTHDAY EDITION · Real stories · Real photos',
    sasha: 'Sasha',
    lera: 'Val',
    together: 'SASHA & VAL',
    established: 'EST. TOGETHER · SINCE 01 NOV 1995',
    editionDate: '01.11.2026',
    home: 'Sasha or Val home',
    question: 'QUESTION',
    of: 'OF',
    score: 'SCORE',
    choose: 'Who was it?',
    submit: 'Lock it in',
    next: 'Next story',
    finish: 'See my results',
    right: 'You got it!',
    wrong: 'Plot twist!',
    its: 'It was',
    result: 'THE LORE IS NOW YOURS',
    end: 'You’ve met the twins.',
    out: 'correct answers out of',
    board: 'The leaderboard',
    boardSub: 'Peek at the table below — then open the gallery and see us through the years.',
    empty: 'The first spot is waiting for you.',
    you: 'YOU',
    back: 'Back to my result',
    view: 'View leaderboard',
    loading: 'Getting the stories ready…',
    retry: 'Try again',
    error: 'Something went wrong. Your progress is safe. Please try again.',
    privacy: 'Your progress stays with this browser. Close the tab and come back anytime.',
    creditsParents: 'Made by parents',
    creditsSite: 'Site made by Sasha',
    blocked: 'Browser storage is unavailable. Enable it to keep your attempt.',
    badge: 'True story',
    gallery: 'Twin gallery',
    galleryEyebrow: 'AFTER THE QUIZ',
    gallerySub: 'Swipe through a few favorite frames.',
    galleryOpen: 'Open gallery',
    galleryBack: 'Back to leaderboard',
    galleryPrev: 'Previous photo',
    galleryNext: 'Next photo',
    skip: 'Skip to content',
    keys: 'Keyboard: 1–2 to choose · Enter to lock in · arrows to move',
    language: 'Language'
  },
  ru: {
    edition: 'ВЕРСИЯ КО ДНЮ РОЖДЕНИЯ',
    tag: 'Один день рождения. Разные повороты сюжета.',
    title: (
      <>
        Две сестры.
        <br />
        Много <i>историй.</i>
      </>
    ),
    intro: 'Думаешь, что хорошо нас знаешь? Угадай, о какой двойняшке идет речь, и познакомься с нами поближе.',
    name: 'Как тебя зовут?',
    placeholder: 'Твое имя',
    start: 'Давай проверим',
    note: '18 вопросов · Одна попытка · Много лора',
    demo: 'BIRTHDAY EDITION · Настоящие истории · Настоящие фото',
    sasha: 'Саша',
    lera: 'Лера',
    together: 'САША & ЛЕРА',
    established: 'ВМЕСТЕ С 01 НОЯБ. 1995',
    editionDate: '01.11.2026',
    home: 'Саша или Лера — главная',
    question: 'ВОПРОС',
    of: 'ИЗ',
    score: 'СЧЕТ',
    choose: 'Кто из нас?',
    submit: 'Отправить ответ',
    next: 'Следующая история',
    finish: 'Мой результат',
    right: 'Точно, угадал(а)!',
    wrong: 'А вот и нет!',
    its: 'Это',
    result: 'ТЕПЕРЬ ТЫ ЗНАЕШЬ НАС ЛУЧШЕ',
    end: 'Теперь мы знакомы ближе.',
    out: 'правильных ответов из',
    board: 'Таблица знатоков',
    boardSub: 'Ниже — таблица. А дальше можно заглянуть в галерею и посмотреть на нас сквозь годы.',
    empty: 'Первое место пока свободно.',
    you: 'ТЫ',
    back: 'К моему результату',
    view: 'Посмотреть рейтинг',
    loading: 'Собираем истории…',
    retry: 'Попробовать снова',
    error: 'Не удалось связаться с сервером. Попробуй еще раз — прогресс сохранен.',
    privacy: 'Прогресс привязан к этому браузеру. Можно закрыть страницу и вернуться позже.',
    creditsParents: 'Сделано родителями',
    creditsSite: 'Сайт сделала Саша',
    blocked: 'Хранилище браузера недоступно. Разреши его, чтобы сохранить попытку.',
    badge: 'Правдивая история',
    gallery: 'Галерея двойняшек',
    galleryEyebrow: 'ПОСЛЕ КВИЗА',
    gallerySub: 'Посмотри на наши воспоминания',
    galleryOpen: 'Открыть галерею',
    galleryBack: 'К таблице',
    galleryPrev: 'Предыдущее фото',
    galleryNext: 'Следующее фото',
    skip: 'К содержимому',
    keys: 'Клавиатура: 1–2 — выбор · Enter — ответ · стрелки — переключение',
    language: 'Язык'
  }
}
