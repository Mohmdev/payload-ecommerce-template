import type { CollectionConfig } from 'payload'
import { generatePreviewPath } from '@/lib/utilities/generatePreviewPath'
import { admins } from '@/services/access/admins'
import { adminsOrPublished } from '@/services/access/adminsOrPublished'
import { beforeProductChange } from './hooks/beforeChange'
import { deleteProductFromCarts } from './hooks/deleteProductFromCarts'
import { revalidateDelete, revalidateProduct } from './hooks/revalidateProduct'
import { productFields } from './fields'

export const Products: CollectionConfig<'products'> = {
  slug: 'products',
  access: {
    create: admins,
    delete: admins,
    read: adminsOrPublished,
    update: admins
  },
  admin: {
    defaultColumns: ['title', 'stripeProductID', '_status', 'stock'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'products',
          req
        })

        return path
      }
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'products',
        req
      }),
    useAsTitle: 'title'
  },
  fields: [...productFields],
  hooks: {
    afterChange: [revalidateProduct],
    afterDelete: [deleteProductFromCarts],
    beforeChange: [beforeProductChange],
    beforeDelete: [revalidateDelete]
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100
      }
    },
    maxPerDoc: 50
  }
}
