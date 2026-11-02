import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { CEU_GALLERY, CEU_SLIDES, type PieceId } from '../../data/ceuPage'
import { AUTOPLAY_MS, DRAG_PX, useCeuScroll } from '../../hooks/useCeuScroll'
import type { Navigate } from '../../lib/links'
import { ProjectNav } from '../layout/ProjectNav'
import { CeuAbertura } from './CeuAbertura'
import { CeuFicha } from './CeuFicha'
import { CeuGiro } from './CeuGiro'
import { CeuLightbox } from './CeuLightbox'
import { CeuUniverso } from './CeuUniverso'
import { CeuVistas } from './CeuVistas'
import './ceu.css'

type CeuLiquidoProps = {
  onNavigate: Navigate
}

export function CeuLiquido({ onNavigate }: CeuLiquidoProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const dragOrigin = useRef<number | null>(null)
  const [piece, setPiece] = useState<PieceId>('jaqueta')
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [lightbox, setLightbox] = useState(-1)

  const slides = CEU_SLIDES[piece]
  const goHome = useCallback(() => onNavigate('home'), [onNavigate])
  const closeLightbox = useCallback(() => setLightbox(-1), [])
  const stepLightbox = useCallback((delta: number) => {
    setLightbox((current) => (current + delta + CEU_GALLERY.length) % CEU_GALLERY.length)
  }, [])

  useCeuScroll(rootRef, setIndex, slides.length)

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
  }, [])

  useEffect(() => {
    if (!playing) return
    const timer = window.setInterval(() => {
      if (dragging.current) return
      setIndex((current) => (current + 1) % CEU_SLIDES[piece].length)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [piece, playing])

  useEffect(() => {
    if (lightbox < 0) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [lightbox])

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
      <ProjectNav current="3d" onNavigate={onNavigate} />
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
        <CeuFicha onBack={goHome} />
      </main>
      {lightbox >= 0 && <CeuLightbox index={lightbox} onClose={closeLightbox} onStep={stepLightbox} />}
    </div>
  )
}
