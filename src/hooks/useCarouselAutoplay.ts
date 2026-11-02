import { useEffect, type Dispatch, type RefObject, type SetStateAction } from 'react'
import { CEU_SLIDES } from '../data/ceu/slides'
import type { PieceId } from '../data/ceu/types'
import { AUTOPLAY_MS } from '../lib/carousel'

/** Avança o giro a cada AUTOPLAY_MS enquanto `playing`; pula o passo se o usuário estiver arrastando. */
export function useCarouselAutoplay(
  playing: boolean,
  piece: PieceId,
  dragging: RefObject<boolean>,
  setIndex: Dispatch<SetStateAction<number>>,
) {
  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      if (dragging.current) return
      setIndex((current) => (current + 1) % CEU_SLIDES[piece].length)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [piece, playing, dragging, setIndex])
}
