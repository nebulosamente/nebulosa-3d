import { ceuAsset } from './assets'
import type { CeuSlide, PieceId } from './types'

export const CEU_SLIDES: Record<PieceId, CeuSlide[]> = {
  jaqueta: [
    { src: ceuAsset('roupas/jaqueta/jaqueta-frontal.webp'), label: 'Frente', deg: '0°', alt: 'Jaqueta puffer, vista frontal' },
    { src: ceuAsset('roupas/jaqueta/jaqueta-esquerda.webp'), label: 'Perfil', deg: '90°', alt: 'Jaqueta puffer, perfil' },
    { src: ceuAsset('roupas/jaqueta/jaqueta-costas.webp'), label: 'Costas', deg: '180°', alt: 'Jaqueta puffer, costas' },
    { src: ceuAsset('roupas/jaqueta/jaqueta-direita.webp'), label: 'Perfil', deg: '270°', alt: 'Jaqueta puffer, outro perfil' },
    { src: ceuAsset('roupas/jaqueta/jaqueta-aberta.webp'), label: 'Aberta', deg: '0°', alt: 'Jaqueta puffer aberta' },
    { src: ceuAsset('roupas/jaqueta/jaqueta-aberta-2.webp'), label: 'Aberta ¾', deg: '20°', alt: 'Jaqueta puffer aberta, vista em três quartos' },
  ],
  calca: [
    { src: ceuAsset('roupas/calca/calca-frontal-2.webp'), label: 'Frente', deg: '0°', alt: 'Calça acolchoada wide, vista frontal' },
    { src: ceuAsset('roupas/calca/calca-6.webp'), label: 'Frente ¾', deg: '20°', alt: 'Calça acolchoada wide, três quartos de frente' },
    { src: ceuAsset('roupas/calca/calca-3.webp'), label: 'Frente ¾', deg: '30°', alt: 'Calça acolchoada wide, três quartos de frente' },
    { src: ceuAsset('roupas/calca/calca-4.webp'), label: 'Frente ¾', deg: '45°', alt: 'Calça acolchoada wide, três quartos de frente' },
    { src: ceuAsset('roupas/calca/calca-1.webp'), label: 'Perfil', deg: '90°', alt: 'Calça acolchoada wide, perfil' },
    { src: ceuAsset('roupas/calca/calca-8.webp'), label: 'Costas', deg: '180°', alt: 'Calça acolchoada wide, costas' },
    { src: ceuAsset('roupas/calca/calca-7.webp'), label: 'Costas ¾', deg: '215°', alt: 'Calça acolchoada wide, três quartos de costas' },
    { src: ceuAsset('roupas/calca/calca-2.webp'), label: 'Perfil ¾', deg: '250°', alt: 'Calça acolchoada wide, perfil quase de costas' },
    { src: ceuAsset('roupas/calca/calca-5.webp'), label: 'Perfil', deg: '270°', alt: 'Calça acolchoada wide, outro perfil' },
  ],
}

export const CEU_GALLERY = [
  { title: 'Névoa', src: ceuAsset('look-com-fundo/poses/pose-1.webp') },
  { title: 'Musgo', src: ceuAsset('look-com-fundo/poses/pose-2.webp') },
  { title: 'Orvalho', src: ceuAsset('look-com-fundo/poses/pose-3.webp') },
  { title: 'Vento', src: ceuAsset('look-com-fundo/poses/pose-4.webp') },
  { title: 'Horizonte', src: ceuAsset('look-com-fundo/poses/pose-5.webp') },
] as const
