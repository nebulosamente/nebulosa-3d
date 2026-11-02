import { useRef } from 'react'
import { CEU_GALLERY, CEU_PAGE, CEU_VISTAS_BACK, CEU_VISTAS_FRONT, pad } from '../../data/ceuPage'
import { CeuLayer } from './CeuLayer'

/** Fração da largura visível que os botões da trilha avançam. */
const RAIL_STEP = 0.6

type CeuVistasProps = {
  onOpen: (index: number) => void
}

export function CeuVistas({ onOpen }: CeuVistasProps) {
  const railRef = useRef<HTMLDivElement>(null)

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: direction * rail.clientWidth * RAIL_STEP, behavior: 'smooth' })
  }

  return (
    <section className="vistas" id="vistas" data-par aria-label="3D · Galeria">
      {CEU_VISTAS_BACK.map((layer) => (
        <CeuLayer key={`${layer.src}-${String(layer.style.top ?? layer.style.bottom)}`} layer={layer} />
      ))}
      <div className="head">
        <div className="rv" data-reveal>
          <div className="meta">{CEU_PAGE.vistasIndex}</div>
          <h2 className="h2">
            {CEU_PAGE.vistasTitle}
            <em className="mossy">{CEU_PAGE.vistasEm}</em>
          </h2>
        </div>
        <div className="head-side rv" data-reveal aria-hidden="true" />
      </div>
      <div className="rail-wrap">
        <div
          ref={railRef}
          className="rail"
          tabIndex={0}
          aria-label={CEU_PAGE.railLabel}
          onScroll={(event) => {
            const rail = event.currentTarget
            const span = rail.scrollWidth - rail.clientWidth
            rail.parentElement?.style.setProperty('--p', span > 0 ? (rail.scrollLeft / span).toFixed(3) : '0')
          }}
        >
          {CEU_GALLERY.map((item, i) => (
            <article className="pose" key={item.title}>
              <button
                className="pose-btn"
                type="button"
                onClick={() => onOpen(i)}
                aria-label={`${CEU_PAGE.enlarge}: ${item.title}`}
              >
                <span className="pose-img">
                  <img src={item.src} alt={item.title} loading="lazy" draggable={false} />
                  <span className="pose-num" aria-hidden="true">
                    {pad(i + 1)}
                  </span>
                  <span className="pose-tag lg meta">
                    {CEU_PAGE.scene} {pad(i + 1)}
                  </span>
                  <span className="fzoom" aria-hidden="true">
                    ↗
                  </span>
                </span>
                <span className="pose-cap">
                  <span className="cap-t">{item.title}</span>
                </span>
              </button>
            </article>
          ))}
        </div>
        <div className="rail-bar lg">
          <button className="nbtn" type="button" onClick={() => scrollRail(-1)} aria-label={CEU_PAGE.prev}>
            <span aria-hidden="true">←</span>
          </button>
          <div className="rail-prog">
            <span />
          </div>
          <span className="meta rail-count">
            {pad(CEU_GALLERY.length)} {CEU_PAGE.scenes}
          </span>
          <button className="nbtn" type="button" onClick={() => scrollRail(1)} aria-label={CEU_PAGE.next}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <CeuLayer layer={CEU_VISTAS_FRONT} />
    </section>
  )
}
