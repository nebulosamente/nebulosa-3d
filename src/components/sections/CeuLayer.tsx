import type { CeuDecor } from '../../data/ceuPage'

export function CeuLayer({ layer, loading }: { layer: CeuDecor; loading?: 'eager' | 'lazy' }) {
  return (
    <img className={layer.className} src={layer.src} alt="" aria-hidden="true" draggable={false} loading={loading} style={layer.style} />
  )
}
