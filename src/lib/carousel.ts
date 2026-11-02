/** px. Arrastar menos que isso não troca a vista. */
export const DRAG_PX = 40
/** ms. Intervalo do giro automático. */
export const AUTOPLAY_MS = 3200

/** Fração de --ch entre uma vista e a vizinha. */
const SLIDE_SPREAD = 0.66
/** px. Profundidade de cada passo para trás. */
const SLIDE_DEPTH_PX = 170
/** deg. Giro em Y de cada passo. */
const SLIDE_YAW_DEG = 28
const SLIDE_SCALE_SIDE = 0.8
/** A partir desta distância a vista some. */
const SLIDE_HIDE_FROM = 3
const SLIDE_OPACITY_NEAR = 0.7
const SLIDE_OPACITY_FAR = 0.32
/** px. Desfoque por passo fora de foco. */
const SLIDE_BLUR_PX = 1.3
const SLIDE_SATURATE = 0.85

export function slidePose(index: number, active: number, count: number) {
  let delta = index - active
  if (delta > count / 2) delta -= count
  if (delta < -count / 2) delta += count
  const distance = Math.abs(delta)
  const current = delta === 0
  return {
    current,
    transform: `translateX(calc(var(--ch) * ${delta * SLIDE_SPREAD})) translateZ(${-distance * SLIDE_DEPTH_PX}px) rotateY(${-delta * SLIDE_YAW_DEG}deg) scale(${current ? 1 : SLIDE_SCALE_SIDE})`,
    opacity: distance >= SLIDE_HIDE_FROM ? 0 : current ? 1 : distance === 1 ? SLIDE_OPACITY_NEAR : SLIDE_OPACITY_FAR,
    zIndex: 10 - distance * 2,
    filter: current ? 'none' : `blur(${distance * SLIDE_BLUR_PX}px) saturate(${SLIDE_SATURATE})`,
    pointerEvents: distance >= SLIDE_HIDE_FROM ? ('none' as const) : ('auto' as const),
  }
}
