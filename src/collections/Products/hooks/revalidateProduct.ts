import type { CollectionAfterChangeHook } from 'payload'
import type { Payload } from 'payload'

// Revalidate the page in the background, so the user doesn't have to wait
// Notice that the hook itself is not async and we are not awaiting `revalidate`
// Only revalidate existing docs that are published
// Don't scope to `operation` in order to purge static demo pages
export const revalidateProduct: CollectionAfterChangeHook = ({
  doc,
  req: { payload }
}) => {
  if (doc._status === 'published') {
    void revalidate({ slug: doc.slug, collection: 'products', payload })
  }

  return doc
}

const revalidate = async (args: {
  collection: string
  payload: Payload
  slug: string
}): Promise<void> => {
  const { slug, collection, payload } = args

  try {
    const res = await fetch(
      `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/next/revalidate?secret=${process.env.REVALIDATION_KEY}&collection=${collection}&slug=${slug}`
    )

    if (res.ok) {
      payload.logger.info(
        `Revalidated page '${slug}' in collection '${collection}'`
      )
    } else {
      payload.logger.error(
        `Error revalidating page '${slug}' in collection '${collection}': ${res}`
      )
    }
  } catch (err: unknown) {
    payload.logger.error(
      `Error hitting revalidate route for page '${slug}' in collection '${collection}': ${err}`
    )
  }
}
