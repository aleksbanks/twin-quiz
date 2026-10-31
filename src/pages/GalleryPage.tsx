import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import ChevronLeft from '@gravity-ui/icons/ChevronLeft'
import ChevronRight from '@gravity-ui/icons/ChevronRight'
import { Button, Eyebrow, Icon } from 'components'
import type { Copy } from 'common'
import { galleryPhotos } from 'common/gallery'
import { useFocusElement } from 'hooks/useFocusElement'
import { usePreferKeyboard } from 'hooks/usePreferKeyboard'
import styles from './GalleryPage.module.css'

type GalleryProps = {
  texts: Copy
  backLabel: string
  onBack: () => void
}

export function Gallery({ texts, backLabel, onBack }: GalleryProps) {
  const preferKeyboard = usePreferKeyboard()
  const backButtonRef = useRef<HTMLButtonElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)
  const ignoreScrollRef = useRef(false)
  const settleTimerRef = useRef(0)
  const [index, setIndex] = useState(0)
  const total = galleryPhotos.length

  useFocusElement(preferKeyboard, backButtonRef)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    function handleScroll() {
      if (!track || ignoreScrollRef.current) return
      const width = track.clientWidth
      if (width <= 0) return
      const next = Math.min(Math.max(Math.round(track.scrollLeft / width), 0), total - 1)
      indexRef.current = next
      setIndex(next)
    }

    track.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', handleScroll)
      window.clearTimeout(settleTimerRef.current)
    }
  }, [total])

  function scrollToIndex(next: number) {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.min(Math.max(next, 0), total - 1)
    ignoreScrollRef.current = true
    indexRef.current = clamped
    setIndex(clamped)
    track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' })

    const release = () => {
      ignoreScrollRef.current = false
    }
    track.addEventListener('scrollend', release, { once: true })
    window.clearTimeout(settleTimerRef.current)
    settleTimerRef.current = window.setTimeout(release, 450)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      onBack()
      return
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollToIndex(indexRef.current - 1)
      return
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollToIndex(indexRef.current + 1)
    }
  }

  return (
    <section
      className={styles.gallery}
      aria-labelledby='gallery-title'
      onKeyDown={handleKeyDown}>
      <Eyebrow align='center'>{texts.galleryEyebrow}</Eyebrow>
      <h1 id='gallery-title'>{texts.gallery}</h1>
      <p className={styles.sub}>{texts.gallerySub}</p>

      <div className={styles.viewer}>
        <div
          ref={trackRef}
          className={styles.track}
          tabIndex={0}
          role='region'
          aria-roledescription='carousel'
          aria-label={texts.gallery}>
          {galleryPhotos.map((photo, photoIndex) => (
            <figure key={photo.src} className={styles.slide}>
              <img
                className={styles.image}
                src={photo.src}
                alt={photo.alt}
                loading={photoIndex === 0 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </figure>
          ))}
        </div>

        <div className={styles.controls}>
          <button
            type='button'
            className={styles.nav}
            aria-label={texts.galleryPrev}
            disabled={index === 0}
            onClick={() => scrollToIndex(indexRef.current - 1)}>
            <Icon data={ChevronLeft} size={22} />
          </button>
          <p className={styles.counter} aria-live='polite'>
            {index + 1} <span>/ {total}</span>
          </p>
          <button
            type='button'
            className={styles.nav}
            aria-label={texts.galleryNext}
            disabled={index === total - 1}
            onClick={() => scrollToIndex(indexRef.current + 1)}>
            <Icon data={ChevronRight} size={22} />
          </button>
        </div>
      </div>

      <Button ref={backButtonRef} variant='secondary' onClick={onBack}>
        {backLabel}
      </Button>
    </section>
  )
}
