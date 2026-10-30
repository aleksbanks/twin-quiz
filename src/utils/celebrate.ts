import confetti from 'canvas-confetti'

const COLORS = ['#ef623f', '#6b4e8c', '#acc0d3', '#5484a4', '#ebe4f2', '#eef2f5']

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Soft confetti burst for a correct answer. No-op when reduced motion is on. */
export function celebrateCorrect(): void {
  if (prefersReducedMotion()) return

  confetti({
    particleCount: 56,
    spread: 58,
    startVelocity: 28,
    gravity: 0.95,
    scalar: 0.85,
    ticks: 160,
    origin: { y: 0.72 },
    colors: COLORS,
    disableForReducedMotion: true
  })
}
