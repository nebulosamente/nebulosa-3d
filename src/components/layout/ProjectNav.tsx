import { PROJECT_NAV, PROJECT_NAV_COPY } from '../../data/projectNav'
import { useHideOnScroll } from '../../hooks/useHideOnScroll'
import { isPlainLeftClick, siteUrl, type Navigate, type SiteId } from '../../lib/links'

type ProjectNavProps = {
  current: SiteId
  onNavigate: Navigate
}

/** Barra fixa de vidro claro no topo: volta para a home e alterna entre os três projetos. */
export function ProjectNav({ current, onNavigate }: ProjectNavProps) {
  const hidden = useHideOnScroll()
  return (
    <nav
      aria-label="Projetos"
      className="pnav pnav--bt"
      data-hidden={hidden ? 'true' : undefined}
      style={{
        position: 'fixed',
        top: 16,
        left: 16,
        right: 16,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        pointerEvents: 'none',
      }}
    >
      <a
        href={siteUrl('home')}
        className="pnav-back"
        onClick={(e) => {
          if (!isPlainLeftClick(e)) return
          e.preventDefault()
          onNavigate('home')
        }}
        style={{ pointerEvents: 'auto' }}
      >
        {PROJECT_NAV_COPY.back}
      </a>
      <div className="pnav-group" style={{ pointerEvents: 'auto' }}>
        <span className="pnav-label">{PROJECT_NAV_COPY.group}</span>
        {PROJECT_NAV.map((item) => {
          const [num, ...rest] = item.t.split(/\s+/)
          return (
            <a
              key={item.id}
              className="pill"
              href={siteUrl(item.id)}
              aria-current={item.id === current ? 'page' : undefined}
              onClick={(e) => {
                if (!isPlainLeftClick(e)) return
                e.preventDefault()
                onNavigate(item.id)
              }}
            >
              <span className="n">{num}</span>
              {rest.join(' ')}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
