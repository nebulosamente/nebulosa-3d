import { useEffect, useRef, type RefObject } from 'react'

/**
 * data-par    seção cujo centro vira --o (fração da viewport). Os filhos .par herdam e deslocam.
 * data-reveal entra com a classe .in quando cruza a dobra.
 * data-mani   progresso 0–1 do manifesto, escrito em --wp.
 * data-giro   trilho alto: a rolagem escolhe o índice do carrossel.
 */

/** px. Altura usada se o viewport ainda não mediu. */
const VIEWPORT_FALLBACK_PX = 800
/** Fração da viewport. Abaixo disso o bloco já pode aparecer. */
const REVEAL_LINE = 0.94
/** Fração da viewport. Onde a primeira palavra começa a acender. */
const WORD_LEAD = 0.82
/** Fração da viewport. Rolagem que acende o parágrafo inteiro. */
const WORD_SPAN = 0.62
/** Evita o índice final antes de a trilha acabar. */
const GIRO_EDGE = 0.9999
/** ms. O giro preso em sticky não dispara scroll o tempo todo. */
const POLL_MS = 800
/** ms. A primeira medida espera o layout assentar. */
const BOOT_MS = 350

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

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

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

export function useCeuScroll(
  rootRef: RefObject<HTMLElement | null>,
  onGiro: (index: number) => void,
  giroCount: number,
) {
  const onGiroRef = useRef(onGiro)
  const countRef = useRef(giroCount)
  const lastIndex = useRef<number | null>(null)
  onGiroRef.current = onGiro
  countRef.current = giroCount

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let frame = 0

    const sync = () => {
      const viewport = window.innerHeight || VIEWPORT_FALLBACK_PX
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const pars = [...root.querySelectorAll<HTMLElement>('[data-par]')]
      const reveals = [...root.querySelectorAll<HTMLElement>('[data-reveal]:not(.in)')]
      const mani = root.querySelector<HTMLElement>('[data-mani]')
      const giro = root.querySelector<HTMLElement>('[data-giro]')
      const pin = giro?.firstElementChild instanceof HTMLElement ? giro.firstElementChild : null

      const parRects = pars.map((el) => el.getBoundingClientRect())
      const revealRects = reveals.map((el) => el.getBoundingClientRect())
      const maniRect = mani?.getBoundingClientRect()
      const giroRect = giro?.getBoundingClientRect()
      const pinRect = pin?.getBoundingClientRect()

      pars.forEach((el, i) => {
        const rect = parRects[i]
        const offset = (rect.top + rect.height / 2 - viewport / 2) / viewport
        el.style.setProperty('--o', offset.toFixed(3))
      })
      reveals.forEach((el, i) => {
        const rect = revealRects[i]
        if (reduced || (rect.top < viewport * REVEAL_LINE && rect.bottom > 0)) el.classList.add('in')
      })
      if (mani && maniRect) {
        const progress = clamp((viewport * WORD_LEAD - maniRect.top) / (viewport * WORD_SPAN), 0, 1)
        mani.style.setProperty('--wp', progress.toFixed(3))
      }
      if (giro && giroRect && pinRect) {
        const span = Math.max(1, giroRect.height - pinRect.height)
        const progress = clamp(-giroRect.top / span, 0, 1)
        const count = countRef.current
        const index = Math.min(count - 1, Math.floor(progress * count * GIRO_EDGE))
        if (lastIndex.current !== index) {
          lastIndex.current = index
          onGiroRef.current(index)
        }
      }
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        sync()
      })
    }

    window.addEventListener('scroll', schedule, true)
    window.addEventListener('resize', schedule)
    const poll = window.setInterval(schedule, POLL_MS)
    schedule()
    const boot = window.setTimeout(schedule, BOOT_MS)
    return () => {
      window.removeEventListener('scroll', schedule, true)
      window.removeEventListener('resize', schedule)
      window.clearInterval(poll)
      window.clearTimeout(boot)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [rootRef])
}
