import type { CSSProperties } from 'react'

export type PieceId = 'jaqueta' | 'calca'

export type CeuSlide = {
  src: string
  label: string
  deg: string
  alt: string
}

export type CeuMotionStyle = CSSProperties & {
  '--dx'?: number
  '--dy'?: number
  '--sy'?: number
}

export type CeuDecor = {
  src: string
  className: string
  style: CeuMotionStyle
}
