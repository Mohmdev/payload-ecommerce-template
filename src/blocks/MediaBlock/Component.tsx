import type { StaticImageData } from 'next/image'

import { cn } from '@/lib/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'
import { MediaComponent } from '@/components/MediaComponent'

import type { Page } from '@/payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'mediaBlock' }> & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  id?: string
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    position = 'default',
    staticImage
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        '',
        {
          container: position === 'default' && enableGutter
        },
        className
      )}
    >
      {position === 'fullscreen' && (
        <div className="relative">
          <MediaComponent resource={media} src={staticImage} />
        </div>
      )}
      {position === 'default' && (
        <MediaComponent
          imgClassName={cn('rounded', imgClassName)}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: position === 'fullscreen'
            },
            captionClassName
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
