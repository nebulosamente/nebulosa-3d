import { ceuAsset } from './assets'
import type { CeuDecor, CeuMotionStyle } from './types'

type DecorKind = 'drift' | 'bob' | 'island' | 'drop' | 'plain' | 'float'

function decor(file: string, kind: DecorKind, style: CeuMotionStyle, mask?: 'rise' | 'solo'): CeuDecor {
  const motion = {
    drift: 'layer par bob-s',
    bob: 'layer par bob',
    island: 'layer par isl bob',
    drop: 'layer par drop bob',
    plain: 'layer par',
    float: 'layer bob',
  }[kind]
  const veil = mask === 'rise' ? ' ceu-mask-rise' : mask === 'solo' ? ' ceu-mask-solo' : ''
  return { src: ceuAsset(file), className: motion + veil, style }
}

export const CEU_HERO_BACK: CeuDecor[] = [
  decor('ambiente/nuvem-2.webp', 'drift', { left: '-8vw', top: '9%', width: '46vw', zIndex: 1, opacity: 0.95, '--dx': 22, '--dy': 8, '--sy': -90 }),
  decor('ambiente/nuvem-3.webp', 'drift', { right: '-10vw', top: '2%', width: '48vw', zIndex: 1, opacity: 0.9, animationDelay: '-9s', '--dx': -26, '--dy': 6, '--sy': -60 }),
  decor('ambiente/ilha-d.webp', 'island', { left: '3%', top: '46%', width: '15vw', zIndex: 2, opacity: 0.8, filter: 'blur(1.4px)', '--dx': -12, '--dy': -6, '--sy': -150 }),
  decor('ambiente/ilha-e.webp', 'island', { left: '31%', top: '15%', width: '6.5vw', zIndex: 2, opacity: 0.6, filter: 'blur(2px)', animationDelay: '-3s', '--dx': 8, '--dy': 6, '--sy': -40 }),
  decor('ambiente/ilha-a.webp', 'island', { left: '28%', top: '7%', width: '11vw', zIndex: 2, opacity: 0.85, filter: 'blur(0.8px)', animationDelay: '-5s', '--dx': 16, '--dy': -8, '--sy': -110 }),
  decor('ambiente/ilha-b.webp', 'island', { left: '82%', top: '54%', width: '12vw', zIndex: 2, opacity: 0.8, filter: 'blur(1px)', animationDelay: '-7s', '--dx': -14, '--dy': -6, '--sy': -170 }),
  decor('ambiente/ilha-c.webp', 'island', { left: '15%', top: '70%', width: '10vw', zIndex: 2, opacity: 0.7, filter: 'blur(2px)', animationDelay: '-2s', '--dx': -8, '--dy': 4, '--sy': -210 }),
  decor('ambiente/ilha-grande.webp', 'island', { right: '-2vw', top: '10%', width: '36vw', zIndex: 3, animationDuration: '12s', '--dx': -22, '--dy': -12, '--sy': -230 }),
]

export const CEU_HERO_FRONT: CeuDecor[] = [
  decor('ambiente/gota-3.webp', 'drop', { left: '31%', bottom: '22%', width: '7.5vw', '--dx': 30, '--dy': 22, '--sy': -280 }),
  decor('ambiente/gota-2.webp', 'drop', { left: '78%', bottom: '36%', width: '6vw', animationDelay: '-4s', '--dx': -34, '--dy': 20, '--sy': -330 }),
  decor('ambiente/gota-1.webp', 'drop', { left: '23%', bottom: '11%', width: '4.6vw', animationDelay: '-2s', '--dx': 24, '--dy': 14, '--sy': -240 }),
  decor('ambiente/gota-4.webp', 'drop', { left: '90%', bottom: '14%', width: '3.4vw', animationDelay: '-6s', '--dx': -22, '--dy': 12, '--sy': -200 }),
  decor('ambiente/gota-5.webp', 'drop', { left: '68%', bottom: '62%', width: '2.6vw', animationDelay: '-1s', '--dx': 18, '--dy': 16, '--sy': -300 }),
  decor('ambiente/nuvem-1.webp', 'drift', { left: '-8vw', bottom: '-3vw', width: '34vw', zIndex: 9, opacity: 0.95, animationDelay: '-12s', '--dx': 30, '--dy': 10, '--sy': -120 }),
  decor('ambiente/nuvem-4.webp', 'drift', { right: '-8vw', bottom: '-3vw', width: '32vw', zIndex: 9, opacity: 0.95, animationDelay: '-20s', '--dx': -34, '--dy': 10, '--sy': -100 }),
]

export const CEU_GIRO_LAYERS: CeuDecor[] = [
  decor('ambiente/nuvem-0.webp', 'drift', { left: '-8vw', top: '30%', width: '32vw', opacity: 0.7, zIndex: 1, animationDuration: '60s' }),
  decor('ambiente/nuvem-2.webp', 'drift', { right: '-10vw', top: '56%', width: '34vw', opacity: 0.7, zIndex: 1, animationDuration: '70s', animationDelay: '-20s' }),
  decor('ambiente/ilha-a.webp', 'float', { left: '6%', top: '56%', width: '11vw', opacity: 0.7, filter: 'blur(1.4px)', zIndex: 1 }),
  decor('ambiente/ilha-b.webp', 'float', { right: '7%', top: '18%', width: '9vw', opacity: 0.7, filter: 'blur(1.2px)', animationDelay: '-4s', zIndex: 1 }),
]

export const CEU_VISTAS_BACK: CeuDecor[] = [
  decor('ambiente/colina-vistas.webp', 'plain', { left: '-9vw', bottom: '20px', width: 'min(46vw, 700px)', zIndex: 1, opacity: 0.95, '--sy': -150 }),
  decor('ambiente/nuvem-0.webp', 'drift', { right: '-12vw', top: '90px', width: '44vw', opacity: 0.8, '--sy': 160, zIndex: 1 }),
  decor('ambiente/gota-3.webp', 'bob', { left: '46%', top: '5%', width: '6vw', zIndex: 4, '--sy': -240 }),
  decor('ambiente/gota-2.webp', 'bob', { left: '4%', top: '46%', width: '5vw', zIndex: 4, animationDelay: '-3s', '--sy': -300 }),
]

export const CEU_VISTAS_FRONT = decor('ambiente/amor-perfeito.webp', 'plain', {
  right: '-1vw',
  bottom: '30px',
  width: 'min(28vw, 420px)',
  zIndex: 4,
  '--sy': -90,
})

export const CEU_UNIVERSE: CeuDecor[] = [
  decor('ambiente/nuvem-3.webp', 'drift', { left: '-8vw', top: '6%', width: '42vw', opacity: 0.85, zIndex: 1, '--sy': 90 }),
  decor('ambiente/ilha-grande.webp', 'island', { right: '-4vw', top: '8%', width: '30vw', zIndex: 2, opacity: 0.95, '--sy': -260 }),
  decor('ambiente/ilha-c.webp', 'island', { left: '3%', bottom: '14%', width: '14vw', zIndex: 2, opacity: 0.8, filter: 'blur(1.4px)', animationDelay: '-3s', '--sy': -180 }),
  decor('ambiente/ilha-a.webp', 'island', { left: '58%', bottom: '20%', width: '11vw', zIndex: 2, opacity: 0.8, filter: 'blur(1px)', animationDelay: '-6s', '--sy': -330 }),
  decor('ambiente/colinas-nevoa.webp', 'plain', { left: '-8%', bottom: '-2%', width: '116%', zIndex: 3, '--sy': -90 }, 'rise'),
  decor('ambiente/gota-1.webp', 'drop', { left: '72%', top: '52%', width: '5vw', '--sy': -240 }),
  decor('ambiente/gota-4.webp', 'drop', { left: '8%', top: '22%', width: '3.6vw', animationDelay: '-4s', '--sy': -200 }),
]

export const CEU_FICHA_CLOUD = decor(
  'ambiente/nuvem-solo.webp',
  'drift',
  { left: '8vw', top: '-4vw', width: '84vw', zIndex: 2, opacity: 0.95, '--sy': 60 },
  'solo',
)

export const CEU_GARDEN_DROP = decor('ambiente/gota-3.webp', 'drop', {
  left: '52%',
  bottom: '40%',
  width: '5.4vw',
  zIndex: 5,
  '--sy': -200,
})
