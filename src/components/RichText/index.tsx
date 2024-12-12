import { cn } from '@/lib/utilities/cn'
import React from 'react'

import { serializeLexical } from './serialize'

type Props = {
  className?: string
  content: any
  enableGutter?: boolean
  enableProse?: boolean
}

export const RichText: React.FC<Props> = ({
  className,
  content,
  enableGutter = true,
  enableProse = true
}) => {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'prose mx-auto dark:prose-invert ': enableProse
        },
        className
      )}
    >
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  )
}
