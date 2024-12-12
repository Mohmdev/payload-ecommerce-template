import type { CollectionConfig } from 'payload'

import { admins } from '@/services/access/admins'
import { adminsOrPublished } from '@/services/access/adminsOrPublished'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: admins,
    delete: admins,
    read: adminsOrPublished,
    update: admins
  },
  admin: {
    useAsTitle: 'title',
    group: 'Content'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true
    }
  ]
}
