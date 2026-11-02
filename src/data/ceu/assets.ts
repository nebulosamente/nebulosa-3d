const files = import.meta.glob('../../assets/ceu/**/*.{webp,png}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export function ceuAsset(file: string) {
  const hit = Object.entries(files).find(([key]) => key.replaceAll('\\', '/').endsWith(`/${file}`))
  if (!hit) throw new Error(`Céu Líquido: arquivo ausente ${file}`)
  return hit[1]
}

export const CEU_HERO_BG = ceuAsset('look-com-fundo/frontal-distante.webp')

export const CEU_LILIES = ceuAsset('ambiente/lirios.webp')

export const CEU_FOG = ceuAsset('ambiente/nevoa.webp')

export const CEU_MOUND = ceuAsset('ambiente/colina-rodape.webp')

export const CEU_PANSY = ceuAsset('ambiente/amor-perfeito.webp')
