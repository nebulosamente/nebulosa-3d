import type { CSSProperties } from 'react'
import { CEU_EMPHASIS, CEU_FOG, CEU_PAGE, CEU_STORY, CEU_UNIVERSE } from '../../data/ceuPage'
import { CeuLayer } from './CeuLayer'

/** Palavras a mais no fim, para a última acender antes de sair da dobra. */
const WORD_TAIL = 3

const words = CEU_STORY.split(' ').map((word, index) => ({
  word,
  index,
  emphasis: CEU_EMPHASIS.includes(word.toLowerCase()),
}))

export function CeuUniverso() {
  return (
    <section className="mani" id="universo" data-par data-mani aria-label="3D · Universo">
      <img className="mani-fog" src={CEU_FOG} alt="" aria-hidden="true" loading="lazy" />
      {CEU_UNIVERSE.map((layer) => (
        <CeuLayer key={`${layer.src}-${String(layer.style.left)}-${String(layer.style.top ?? layer.style.bottom)}`} layer={layer} loading="lazy" />
      ))}
      <div className="mani-meta meta">
        <span>{CEU_PAGE.universeIndex}</span>
        <span>{CEU_PAGE.universeAside}</span>
      </div>
      <p className="mani-text" style={{ '--wn': words.length + WORD_TAIL } as CSSProperties}>
        {words.map((item) => (
          <span key={item.index} className={item.emphasis ? 'w em' : 'w'} style={{ '--i': item.index } as CSSProperties}>
            {item.word}{' '}
          </span>
        ))}
      </p>
    </section>
  )
}
