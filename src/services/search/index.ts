import { searchPlugin } from '@payloadcms/plugin-search'
import { beforeSyncWithSearch } from './hooks/beforeSync'
import { searchFields } from './fields/fieldOverrides'

export const searchPluginConfig = searchPlugin({
  collections: ['posts'],
  beforeSync: beforeSyncWithSearch,
  searchOverrides: {
    fields: ({ defaultFields }) => {
      return [...defaultFields, ...searchFields]
    },
    admin: {
      group: 'Settings'
    }
  }
})
