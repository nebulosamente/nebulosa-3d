import { CEU_HERO_BG } from '../../data/ceu/assets'
import { CEU_HERO_BACK, CEU_HERO_FRONT } from '../../data/ceu/layers'
import { CEU_PAGE } from '../../data/ceu/copy'
import { CeuLayer } from './CeuLayer'

function setPointer(section: HTMLElement, x: number, y: number) {
  section.style.setProperty('--mx', x.toFixed(3))
  section.style.setProperty('--my', y.toFixed(3))
}

export function CeuAbertura() {
  return (
    <section
      className="hero"
      id="topo"
      data-par
      aria-label="3D · Abertura"
      onPointerMove={(event) => {
        const section = event.currentTarget
        const rect = section.getBoundingClientRect()
        setPointer(
          section,
          ((event.clientX - rect.left) / rect.width - 0.5) * 2,
          ((event.clientY - rect.top) / rect.height - 0.5) * 2,
        )
      }}
      onPointerLeave={(event) => setPointer(event.currentTarget, 0, 0)}
    >
      <div className="hero-photo">
        <img className="hero-bg" src={CEU_HERO_BG} alt="" aria-hidden="true" />
        <div className="hero-top meta">
          <span>{CEU_PAGE.kicker}</span>
          <span>{CEU_PAGE.collection}</span>
        </div>
        <h1 className="hero-title par">
          <span>{CEU_PAGE.titleLead}</span>
          <span className="mossy">{CEU_PAGE.titleEm}</span>
        </h1>
        <span className="hero-fig meta">{CEU_PAGE.figure}</span>
        <span className="hero-scroll cue meta">{CEU_PAGE.cue}</span>
      </div>
      <div className="hero-veil">
        {CEU_HERO_BACK.map((layer) => (
          <CeuLayer key={layer.src + String(layer.style.left ?? layer.style.right)} layer={layer} />
        ))}
        {CEU_HERO_FRONT.map((layer) => (
          <CeuLayer key={layer.src + String(layer.style.left ?? layer.style.right)} layer={layer} />
        ))}
        <div className="hero-foot lg rv" data-reveal>
          <p className="lede">{CEU_PAGE.lede}</p>
          <span className="cue meta">{CEU_PAGE.cue}</span>
        </div>
      </div>
    </section>
  )
}
