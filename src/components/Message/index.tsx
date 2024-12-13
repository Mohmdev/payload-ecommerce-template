import React from 'react'
import { cn } from '@/lib/utilities/cn'

export const Message: React.FC<{
  className?: string
  error?: React.ReactNode
  message?: React.ReactNode
  success?: React.ReactNode
  warning?: React.ReactNode
}> = ({ className, error, message, success, warning }) => {
  const messageToRender = message || error || success || warning

  if (messageToRender) {
    return (
      <div
        className={cn(
          'my-8 border border-solid border-border p-4',
          {
            'border-green-500 ': Boolean(success),
            'border-orange-500 ': Boolean(warning),
            'border-red-500 ': Boolean(error)
          },
          className
        )}
      >
        {messageToRender}
      </div>
    )
  }
  return null
}
