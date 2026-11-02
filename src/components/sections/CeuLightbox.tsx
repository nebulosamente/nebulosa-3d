import { useEffect, useRef } from 'react'
import { CEU_GALLERY } from '../../data/ceu/slides'
import { CEU_PAGE } from '../../data/ceu/copy'
import { pad } from '../../lib/format'

type CeuLightboxProps = {
  index: number
  onClose: () => void
  onStep: (delta: number) => void
}

export function CeuLightbox({ index, onClose, onStep }: CeuLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const item = CEU_GALLERY[index]

  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onStep(-1)
      if (event.key === 'ArrowRight') onStep(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onStep])

  if (!item) return null

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={CEU_PAGE.lightbox}>
      <button type="button" className="lb-dismiss" aria-label={CEU_PAGE.close} onClick={onClose} />
      <div className="lb-card lg">
        <div className="lb-img">
          <img src={item.src} alt={item.title} />
        </div>
        <div className="lb-bar">
          <button className="nbtn" type="button" onClick={() => onStep(-1)} aria-label={CEU_PAGE.prevView}>
            ←
          </button>
          <span className="meta">
            {pad(index + 1)} / {pad(CEU_GALLERY.length)} · {item.title}
          </span>
          <button className="nbtn" type="button" onClick={() => onStep(1)} aria-label={CEU_PAGE.nextView}>
            →
          </button>
          <button ref={closeRef} className="nbtn" type="button" onClick={onClose} aria-label={CEU_PAGE.close}>
            {CEU_PAGE.close}
          </button>
        </div>
      </div>
    </div>
  )
}
