import { CEU_FICHA_CLOUD, CEU_GARDEN_DROP, CEU_LILIES, CEU_MOUND, CEU_PAGE, CEU_PANSY, CEU_TILES } from '../../data/ceuPage'
import { isPlainLeftClick, siteUrl } from '../../lib/links'
import { CeuLayer } from './CeuLayer'

type CeuFichaProps = {
  onBack: () => void
}

export function CeuFicha({ onBack }: CeuFichaProps) {
  return (
    <section className="ficha" id="ficha" data-par aria-label="3D · Ficha">
      <CeuLayer layer={CEU_FICHA_CLOUD} />
      <div className="ficha-head">
        <div className="meta rv" data-reveal>
          {CEU_PAGE.fichaIndex}
        </div>
        <h2 className="h2 rv" data-reveal>
          {CEU_PAGE.fichaTitle} <em className="mossy mossy-lt">{CEU_PAGE.fichaEm}</em>
        </h2>
        <p className="lede rv" data-reveal>
          {CEU_PAGE.fichaLede}
        </p>
      </div>
      <ul className="bento">
        {CEU_TILES.map((tile) => (
          <li key={tile.n} className={tile.className} data-reveal>
            <div className="tile-top meta">
              <span>{tile.n}</span>
              <span>{tile.label}</span>
            </div>
            <div className="tile-v">{tile.value}</div>
          </li>
        ))}
        <li className="tile lg t5 rv" data-reveal>
          <a
            className="cta"
            href={siteUrl('home')}
            onClick={(event) => {
              if (!isPlainLeftClick(event)) return
              event.preventDefault()
              onBack()
            }}
          >
            <span className="meta">{CEU_PAGE.back}</span>
            <span className="cta-arrow" aria-hidden="true">
              ↖
            </span>
          </a>
          <span className="meta soon">{CEU_PAGE.soon}</span>
        </li>
      </ul>
      <div className="garden">
        <div className="wordmark" aria-hidden="true">
          {CEU_PAGE.wordmark}
        </div>
        <img className="layer par g-mound" src={CEU_MOUND} alt="" aria-hidden="true" loading="lazy" />
        <img className="layer par g-lily" src={CEU_LILIES} alt="" aria-hidden="true" loading="lazy" />
        <img className="layer par g-pansy" src={CEU_PANSY} alt="" aria-hidden="true" loading="lazy" />
        <CeuLayer layer={CEU_GARDEN_DROP} loading="lazy" />
      </div>
    </section>
  )
}
