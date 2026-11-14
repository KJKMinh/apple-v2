import React from 'react'
import type { ResponsiveImageSet } from '../data/content'

interface TileImageProps {
  images: ResponsiveImageSet
  alt: string
  priority?: boolean
  position?: string
}

export const TileImage: React.FC<TileImageProps> = ({
  images,
  alt,
  priority = false,
  position = '50% 30%',
}) => {
  return (
    <picture>
      <source media="(max-width: 734px)" srcSet={images.sm} />
      <source media="(max-width: 1068px)" srcSet={images.md} />
      <img
        src={images.lg}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        draggable="false"
        style={{ objectPosition: position }}
        className="absolute inset-0 h-full w-full select-none object-cover"
      />
    </picture>
  )
}

export default TileImage
