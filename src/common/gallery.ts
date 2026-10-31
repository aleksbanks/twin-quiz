export type GalleryPhoto = {
  src: string
  alt: string
}

/** Files live in public/photos/gallery/ as 01.jpg … */
export const galleryPhotos: GalleryPhoto[] = Array.from({ length: 33 }, (_, i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    src: `/photos/gallery/${n}.jpg`,
    alt: `Twin gallery ${n}`
  }
})
