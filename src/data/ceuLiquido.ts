export type PieceId = 'jaqueta' | 'calca'

export type CeuFrame = {
  id: string
  t: string
}

export type CeuStill = CeuFrame & {
  n: string
}

export type CeuMeta = {
  k: string
  v: string
}

/**
 * Paleta tirada da própria roupa: azul-cobalto da calça, roxo e amarelo do mármore, verde das manchas
 * e o branco leitoso das nuvens. As mesmas cores existem como variáveis CSS em `ceu.css`.
 */
export const PALETTE = {
  white: '#FBFBFB',
  cloud: '#F3F3FA',
  lavender: '#E6E8FB',
  navy: '#0B0E4D',
  cobalt: '#1D22C4',
  cobaltBright: '#2B2FD8',
  violet: '#5B2A9E',
  violetBright: '#7A3CC8',
  night: '#16093F',
  yellow: '#F5D33B',
  green: '#7BC142',
  ink: '#12143F',
} as const

/** Cinza mineral do estúdio onde as peças foram renderizadas: o fundo do carrossel precisa casar com as fotos. */
export const STUDIO = {
  top: '#8E959D',
  mid: '#7C838C',
  bot: '#6F767F',
  shade: '#2A2E35',
} as const

export const CEU_TAGS = [
  'Moda digital',
  'Modelagem 3D',
  'Estampa autoral',
  'Vinil brilhante',
  'Puffer cropped',
  'Calça wide',
  'Render',
  'Céu líquido 2025',
] as const

const frames = (rows: Array<[string, string]>): CeuFrame[] => rows.map(([id, t]) => ({ id, t }))

export const CEU_SPIN: Record<PieceId, CeuFrame[]> = {
  jaqueta: frames([
    ['jaqueta-frente', 'Frente'],
    ['jaqueta-aberta-34', 'Aberta 3/4'],
    ['jaqueta-lado-d', 'Perfil direito'],
    ['jaqueta-costas', 'Costas'],
    ['jaqueta-lado-e', 'Perfil esquerdo'],
    ['jaqueta-aberta', 'Aberta'],
  ]),
  calca: frames([
    ['calca-1', 'Vista 01'],
    ['calca-2', 'Vista 02'],
    ['calca-3', 'Vista 03'],
    ['calca-4', 'Vista 04'],
    ['calca-5', 'Vista 05'],
    ['calca-6', 'Vista 06'],
  ]),
}

export const CEU_PIECES: Array<{ id: PieceId; t: string }> = [
  { id: 'jaqueta', t: 'Jaqueta' },
  { id: 'calca', t: 'Calça' },
]

export const CEU_GALLERY: CeuStill[] = frames([
  ['look', 'Look completo'],
  ['jaqueta-frente', 'Jaqueta · frente'],
  ['jaqueta-aberta', 'Jaqueta · aberta'],
  ['jaqueta-costas', 'Jaqueta · costas'],
  ['jaqueta-lado-d', 'Jaqueta · perfil'],
  ['calca-1', 'Calça · 01'],
  ['calca-2', 'Calça · 02'],
  ['calca-3', 'Calça · 03'],
]).map((frame, i) => ({ ...frame, n: String(i + 1).padStart(2, '0') }))

export const CEU_META: CeuMeta[] = [
  { k: 'Peças', v: 'Puffer cropped de gola alta · Calça acolchoada wide' },
  { k: 'Papel', v: 'Design de estampa · Modelagem 3D · Direção de arte' },
  { k: 'Superfície', v: 'Vinil brilhante, gomos horizontais' },
  { k: 'Ano', v: '2025' },
]

export const CEU_COPY = {
  kicker: 'Projeto 01 / Moda digital · 3D',
  collection: 'Coleção Céu Líquido  2025',
  wordL: 'Céu',
  wordR: 'líquido',
  lead: 'Moda digital com estampa autoral de mármore líquido e nuvens  modelada, vestida e renderizada em 3D.',
  heroAlt: 'Look completo Céu Líquido',
  spinIndex: '(01) Giro 360°',
  spinTitleA: 'Gire a ',
  spinTitleB: 'peça.',
  spinBody: 'Cada peça foi construída em volume: gomos acolchoados, brilho vinílico e uma estampa que se deforma junto com o tecido.',
  dragHint: '↔ arraste o carrossel',
  viewLabel: 'Vista',
  autoOn: '❚❚ pausar troca automática',
  autoOff: '▶ trocar automaticamente',
  galIndex: '(02) Vistas',
  galTitleA: 'Todos os ',
  galTitleB: 'ângulos.',
  galBody: 'Incline as vistas com o cursor. Clique para ampliar com lupa.',
  fichaIndex: '(03) Ficha',
  fichaTitle: 'Céu Líquido',
  fichaBody: 'Uma coleção-cápsula pensada para existir primeiro no digital: duas peças acolchoadas que transformam o céu em superfície vestível.',
  back: '← Voltar ao portfólio',
  nextSoon: 'Próximo projeto  em breve',
  loupeSuffix: 'lupa 3×',
  close: 'Fechar ✕',
} as const
