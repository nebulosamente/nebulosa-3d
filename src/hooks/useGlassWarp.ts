import { useEffect, type RefObject } from 'react'

/** Liga a classe `lg-warp` (vidro com deslocamento SVG) só onde ela é estável: Chrome com suporte ao filtro. */
export function useGlassWarp(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    // O deslocamento SVG do vidro só é estável no Chrome.
    try {
      if (CSS.supports('backdrop-filter', 'url(#lg-warp) blur(2px)') && /Chrome\//.test(navigator.userAgent)) {
        root.classList.add('lg-warp')
      }
    } catch {
      /* o vidro fosco comum continua valendo */
    }
  }, [rootRef])
}
