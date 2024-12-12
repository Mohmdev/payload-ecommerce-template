import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook
} from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

import type { Product } from '@/payload-types'

export const revalidateProduct: CollectionAfterChangeHook = ({
  doc,
  previousDoc,
  req: { payload, context }
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/product/${doc.slug}`

      payload.logger.info(`Revalidating post at path: ${path}`)

      revalidatePath(path)
      revalidateTag('product-sitemap')
    }

    // If the product was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/product/${previousDoc.slug}`

      payload.logger.info(`Revalidating old product at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('product-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Product> = ({
  doc,
  req: { context }
}) => {
  if (!context.disableRevalidate) {
    const path = `/product/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('product-sitemap')
  }

  return doc
}
