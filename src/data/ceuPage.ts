import type { CSSProperties } from 'react'

const files = import.meta.glob('../assets/ceu/**/*.{webp,png}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function ceuAsset(file: string) {
  const hit = Object.entries(files).find(([key]) => key.replaceAll('\\', '/').endsWith(`/${file}`))
  if (!hit) throw new Error(`Céu Líquido: arquivo ausente ${file}`)
  return hit[1]
}

export type PieceId = 'jaqueta' | 'calca'

export type CeuSlide = {
  src: string
  label: string
  deg: string
  alt: string
}

type CeuMotionStyle = CSSProperties & {
  '--dx'?: number
  '--dy'?: number
  '--sy'?: number
}

export type CeuDecor = {
  src: string
  className: string
  style: CeuMotionStyle
}

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

export function pad(value: number) {
  return value < 10 ? `0${value}` : String(value)
}

export const CEU_PAGE = {
  kicker: 'Projeto 01 / Moda digital · 3D',
  collection: 'Coleção Céu Líquido 2025',
  titleLead: 'Céu',
  titleEm: 'líquido',
  lede: 'Moda digital com estampa autoral de mármore líquido e nuvens, modelada, vestida e renderizada em 3D.',
  cue: 'Role para ver ↓',
  figure: 'Fig. 01 · Render 3D · Look 01',
  giroIndex: '(01) Giro 360°',
  giroTitle: 'Gire a ',
  giroEm: 'peça.',
  hint: 'Role para girar',
  prev: 'Anterior',
  next: 'Próxima',
  view: 'Vista',
  play: '▶ girar sozinho',
  pause: '❚❚ pausar giro automático',
  jacket: 'Jaqueta',
  pants: 'Calça',
  vistasIndex: '(02) Vistas',
  vistasTitle: 'Todos os ',
  vistasEm: 'ângulos.',
  railLabel: 'Ensaio fotográfico, role para o lado',
  scene: 'Cena',
  scenes: 'cenas',
  universeIndex: '(03) Universo',
  universeAside: 'Névoa · musgo · orvalho',
  fichaIndex: '(04) Ficha',
  fichaTitle: 'Céu',
  fichaEm: 'Líquido',
  fichaLede:
    'Uma coleção-cápsula pensada para existir primeiro no digital: duas peças acolchoadas que transformam o céu em superfície vestível.',
  back: '← Voltar ao portfólio',
  soon: 'Próximo projeto · em breve',
  wordmark: 'Céu Líquido',
  close: 'Fechar',
  lightbox: 'Vista ampliada',
  numeral: '01',
  prevView: 'Vista anterior',
  nextView: 'Próxima vista',
  enlarge: 'Ampliar',
} as const

export const CEU_HERO_BG = ceuAsset('look-com-fundo/frontal-distante.webp')
export const CEU_LILIES = ceuAsset('ambiente/lirios.webp')
export const CEU_FOG = ceuAsset('ambiente/nevoa.webp')
export const CEU_MOUND = ceuAsset('ambiente/colina-rodape.webp')
export const CEU_PANSY = ceuAsset('ambiente/amor-perfeito.webp')

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

export const CEU_SLIDES: Record<PieceId, CeuSlide[]> = {
  jaqueta: [
    { src: ceuAsset('roupas/jaqueta/jaqueta-frontal.png'), label: 'Frente', deg: '0°', alt: 'Jaqueta puffer, vista frontal' },
    { src: ceuAsset('roupas/jaqueta/jaqueta-esquerda.png'), label: 'Perfil', deg: '90°', alt: 'Jaqueta puffer, perfil' },
    { src: ceuAsset('roupas/jaqueta/jaqueta-costas.png'), label: 'Costas', deg: '180°', alt: 'Jaqueta puffer, costas' },
    { src: ceuAsset('roupas/jaqueta/jaqueta-direita.png'), label: 'Perfil', deg: '270°', alt: 'Jaqueta puffer, outro perfil' },
    { src: ceuAsset('roupas/jaqueta/jaqueta-aberta.png'), label: 'Aberta', deg: '0°', alt: 'Jaqueta puffer aberta' },
    { src: ceuAsset('roupas/jaqueta/jaqueta-aberta-2.png'), label: 'Aberta ¾', deg: '20°', alt: 'Jaqueta puffer aberta, vista em três quartos' },
  ],
  calca: [
    { src: ceuAsset('roupas/calca/calca-frontal-2.png'), label: 'Frente', deg: '0°', alt: 'Calça acolchoada wide, vista frontal' },
    { src: ceuAsset('roupas/calca/calca-6.png'), label: 'Frente ¾', deg: '20°', alt: 'Calça acolchoada wide, três quartos de frente' },
    { src: ceuAsset('roupas/calca/calca-3.png'), label: 'Frente ¾', deg: '30°', alt: 'Calça acolchoada wide, três quartos de frente' },
    { src: ceuAsset('roupas/calca/calca-4.png'), label: 'Frente ¾', deg: '45°', alt: 'Calça acolchoada wide, três quartos de frente' },
    { src: ceuAsset('roupas/calca/calca-1.png'), label: 'Perfil', deg: '90°', alt: 'Calça acolchoada wide, perfil' },
    { src: ceuAsset('roupas/calca/calca-8.png'), label: 'Costas', deg: '180°', alt: 'Calça acolchoada wide, costas' },
    { src: ceuAsset('roupas/calca/calca-7.png'), label: 'Costas ¾', deg: '215°', alt: 'Calça acolchoada wide, três quartos de costas' },
    { src: ceuAsset('roupas/calca/calca-2.png'), label: 'Perfil ¾', deg: '250°', alt: 'Calça acolchoada wide, perfil quase de costas' },
    { src: ceuAsset('roupas/calca/calca-5.png'), label: 'Perfil', deg: '270°', alt: 'Calça acolchoada wide, outro perfil' },
  ],
}

export const CEU_GALLERY = [
  { title: 'Névoa', src: ceuAsset('look-com-fundo/poses/pose-1.webp') },
  { title: 'Musgo', src: ceuAsset('look-com-fundo/poses/pose-2.webp') },
  { title: 'Orvalho', src: ceuAsset('look-com-fundo/poses/pose-3.webp') },
  { title: 'Vento', src: ceuAsset('look-com-fundo/poses/pose-4.webp') },
  { title: 'Horizonte', src: ceuAsset('look-com-fundo/poses/pose-5.webp') },
] as const

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

export const CEU_STORY =
  'Um céu que se veste. Duas peças acolchoadas, estampadas com mármore líquido e nuvens, pousam sobre musgo, névoa e orvalho — moda que nasce no digital e se deixa tocar pelo olhar.'

export const CEU_EMPHASIS = ['céu', 'veste.', 'mármore', 'líquido', 'nuvens,', 'musgo,', 'névoa', 'orvalho']

export const CEU_UNIVERSE: CeuDecor[] = [
  decor('ambiente/nuvem-3.webp', 'drift', { left: '-8vw', top: '6%', width: '42vw', opacity: 0.85, zIndex: 1, '--sy': 90 }),
  decor('ambiente/ilha-grande.webp', 'island', { right: '-4vw', top: '8%', width: '30vw', zIndex: 2, opacity: 0.95, '--sy': -260 }),
  decor('ambiente/ilha-c.webp', 'island', { left: '3%', bottom: '14%', width: '14vw', zIndex: 2, opacity: 0.8, filter: 'blur(1.4px)', animationDelay: '-3s', '--sy': -180 }),
  decor('ambiente/ilha-a.webp', 'island', { left: '58%', bottom: '20%', width: '11vw', zIndex: 2, opacity: 0.8, filter: 'blur(1px)', animationDelay: '-6s', '--sy': -330 }),
  decor('ambiente/colinas-nevoa.webp', 'plain', { left: '-8%', bottom: '-2%', width: '116%', zIndex: 3, '--sy': -90 }, 'rise'),
  decor('ambiente/gota-1.webp', 'drop', { left: '72%', top: '52%', width: '5vw', '--sy': -240 }),
  decor('ambiente/gota-4.webp', 'drop', { left: '8%', top: '22%', width: '3.6vw', animationDelay: '-4s', '--sy': -200 }),
]

export const CEU_TILES = [
  { n: '01', label: 'Peças', value: 'Puffer cropped de gola alta · Calça acolchoada wide', className: 'tile lg lg-dark t1 rv' },
  { n: '02', label: 'Papel', value: 'Design de estampa · Modelagem 3D · Direção de arte', className: 'tile lg lg-dark t2 rv' },
  { n: '03', label: 'Superfície', value: 'Gomos acolchoados horizontais, estampa de mármore e nuvens', className: 'tile lg lg-dark t3 rv' },
  { n: '04', label: 'Ano', value: '2025', className: 'tile lg lg-dark t4 rv' },
] as const

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
