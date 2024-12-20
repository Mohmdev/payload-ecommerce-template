import type { BannerBlock as BannerBlockProps } from '@/payload-types'

import { cn } from '@/lib/utilities/cn'
import React from 'react'
import RichText from '@/components/RichText'

type Props = BannerBlockProps & {
  className?: string
}

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('mx-auto w-full', className)}>
      <div
        className={cn('flex items-center rounded border px-6 py-3', {
          'border-border bg-card': style === 'info',
          'border-error bg-error/30': style === 'error',
          'border-success bg-success/30': style === 'success',
          'border-warning bg-warning/30': style === 'warning'
        })}
      >
        <RichText
          className="classes.richText"
          data={content}
          enableGutter={false}
          enableProse={false}
        />
      </div>
    </div>
  )
}
