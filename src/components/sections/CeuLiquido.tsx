import { useCallback, useRef, useState, type PointerEvent } from 'react'
import type { PieceId } from '../../data/ceu/types'
import { CEU_GALLERY, CEU_SLIDES } from '../../data/ceu/slides'
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock'
import { useCarouselAutoplay } from '../../hooks/useCarouselAutoplay'
import { useCeuScroll } from '../../hooks/useCeuScroll'
import { useGlassWarp } from '../../hooks/useGlassWarp'
import { DRAG_PX } from '../../lib/carousel'
import { CeuAbertura } from './CeuAbertura'
import { CeuFicha } from './CeuFicha'
import { CeuGiro } from './CeuGiro'
import { CeuLightbox } from './CeuLightbox'
import { CeuUniverso } from './CeuUniverso'
import { CeuVistas } from './CeuVistas'
import '../../styles/ceu.css'

export function CeuLiquido() {
  const rootRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const dragOrigin = useRef<number | null>(null)
  const [piece, setPiece] = useState<PieceId>('jaqueta')
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [lightbox, setLightbox] = useState(-1)

  const slides = CEU_SLIDES[piece]
  const closeLightbox = useCallback(() => setLightbox(-1), [])
  const stepLightbox = useCallback((delta: number) => {
    setLightbox((current) => (current + delta + CEU_GALLERY.length) % CEU_GALLERY.length)
  }, [])

  useCeuScroll(rootRef, setIndex, slides.length)

  useGlassWarp(rootRef)
  useCarouselAutoplay(playing, piece, dragging, setIndex)
  useBodyScrollLock(lightbox >= 0)

  const step = (delta: number) => {
    setIndex((current) => (current + delta + slides.length) % slides.length)
  }

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragOrigin.current = event.clientX
    dragging.current = true
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    const origin = dragOrigin.current
    dragOrigin.current = null
    if (origin == null) return
    const distance = event.clientX - origin
    if (distance < -DRAG_PX) step(1)
    else if (distance > DRAG_PX) step(-1)
  }

  return (
    <div
      ref={rootRef}
      className="ceu-page"
      onContextMenu={(event) => event.preventDefault()}
      onDragStart={(event) => event.preventDefault()}
    >
      <svg className="ceu-filters" aria-hidden="true" focusable="false">
        <filter id="lg-warp" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.02" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="22" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <main>
        <CeuAbertura />
        <CeuGiro
          piece={piece}
          index={index}
          playing={playing}
          onPiece={(next) => {
            setPiece(next)
            setIndex(0)
          }}
          onIndex={setIndex}
          onStep={step}
          onTogglePlay={() => setPlaying((value) => !value)}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        />
        <CeuVistas onOpen={setLightbox} />
        <CeuUniverso />
        <CeuFicha />
      </main>
      {lightbox >= 0 && <CeuLightbox index={lightbox} onClose={closeLightbox} onStep={stepLightbox} />}
    </div>
  )
}
