import type { PointerEvent } from 'react'
import { CEU_GIRO_LAYERS, CEU_LILIES, CEU_PAGE, CEU_SLIDES, pad, type PieceId } from '../../data/ceuPage'
import { slidePose } from '../../hooks/useCeuScroll'
import { CeuLayer } from './CeuLayer'

type CeuGiroProps = {
  piece: PieceId
  index: number
  playing: boolean
  onPiece: (piece: PieceId) => void
  onIndex: (index: number) => void
  onStep: (delta: number) => void
  onTogglePlay: () => void
  onPointerDown: (event: PointerEvent<HTMLDivElement>) => void
  onPointerUp: (event: PointerEvent<HTMLDivElement>) => void
}

export function CeuGiro({
  piece,
  index,
  playing,
  onPiece,
  onIndex,
  onStep,
  onTogglePlay,
  onPointerDown,
  onPointerUp,
}: CeuGiroProps) {
  const slides = CEU_SLIDES[piece]
  const current = slides[index] ?? slides[0]

  return (
    <section className="giro-track" id="giro" data-par data-giro aria-label="3D · Giro 360">
      <div className="giro-pin">
        {CEU_GIRO_LAYERS.map((layer) => (
          <CeuLayer key={`${layer.src}-${String(layer.style.left ?? layer.style.right)}`} layer={layer} />
        ))}
        <div className="numeral" aria-hidden="true">
          {CEU_PAGE.numeral}
        </div>
        <div className="head">
          <div>
            <div className="meta">{CEU_PAGE.giroIndex}</div>
            <h2 className="h2">
              {CEU_PAGE.giroTitle}
              <em className="mossy">{CEU_PAGE.giroEm}</em>
            </h2>
          </div>
          <div className="head-side" aria-hidden="true" />
        </div>
        <div
          className="stage"
          aria-roledescription="carrossel"
          aria-label="Vistas da peça"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <img className="frame-lilies" src={CEU_LILIES} alt="" aria-hidden="true" loading="lazy" />
          {slides.map((slide, i) => {
            const pose = slidePose(i, index, slides.length)
            return (
              <button
                key={`${piece}-${slide.src}`}
                className={pose.current ? 'slide on' : 'slide'}
                type="button"
                style={{
                  transform: pose.transform,
                  opacity: pose.opacity,
                  zIndex: pose.zIndex,
                  filter: pose.filter,
                  pointerEvents: pose.pointerEvents,
                }}
                onClick={() => onIndex(i)}
                aria-label={pose.current ? `${slide.label} ${slide.deg} (atual)` : `${slide.label} ${slide.deg}`}
              >
                <img src={slide.src} alt={slide.alt} draggable={false} loading="lazy" />
                <span className="slide-cap lg meta">
                  {pad(i + 1)} · {slide.label} · {slide.deg}
                </span>
              </button>
            )
          })}
          <span className="hint meta">{CEU_PAGE.hint}</span>
        </div>
        <div className="deck">
          <div className="deck-row lg">
            <button className="nbtn" type="button" onClick={() => onStep(-1)} aria-label={CEU_PAGE.prevView}>
              <span aria-hidden="true">←</span> {CEU_PAGE.prev}
            </button>
            <div className="tabs lg-ref">
              <button className="tab" type="button" aria-pressed={piece === 'jaqueta'} onClick={() => onPiece('jaqueta')}>
                {CEU_PAGE.jacket} <sup>{pad(CEU_SLIDES.jaqueta.length)}</sup>
              </button>
              <button className="tab" type="button" aria-pressed={piece === 'calca'} onClick={() => onPiece('calca')}>
                {CEU_PAGE.pants} <sup>{pad(CEU_SLIDES.calca.length)}</sup>
              </button>
            </div>
            <button className="nbtn" type="button" onClick={() => onStep(1)} aria-label={CEU_PAGE.nextView}>
              {CEU_PAGE.next} <span aria-hidden="true">→</span>
            </button>
          </div>
          <div className="meter">
            <div className="meter-row meta">
              <span>{CEU_PAGE.view}</span>
              <span>
                {pad(index + 1)} / {pad(slides.length)} · {current.label} · {current.deg}
              </span>
            </div>
            <div className="scrub">
              {slides.map((slide, i) => (
                <button
                  key={`${piece}-scrub-${slide.deg}-${i}`}
                  type="button"
                  aria-current={i === index ? 'true' : 'false'}
                  aria-label={`Ir para ${slide.label} ${slide.deg}`}
                  onClick={() => onIndex(i)}
                >
                  <span />
                </button>
              ))}
            </div>
          </div>
          <button className="textbtn meta" type="button" onClick={onTogglePlay}>
            {playing ? CEU_PAGE.pause : CEU_PAGE.play}
          </button>
        </div>
      </div>
    </section>
  )
}
