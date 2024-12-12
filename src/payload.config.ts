import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
// import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { plugins } from './services/plugins'
import { Categories } from '@/collections/Categories/config'
import { Media } from '@/collections/Media/config'
import { Orders } from '@/collections/Orders'
import { Pages } from '@/collections/Pages/config'
import { Products } from '@/collections/Products/config'
import { Users } from '@/collections/Users/config'
import { Footer } from '@/globals/Footer'
import { Header } from '@/globals/Header'
import { Posts } from './collections/Posts/config'
import { getServerSideURL } from './lib/utilities/getURL'
import { defaultLexical } from './services/editor/defaultLexical'
import { defaultEndpoints } from './services/endpoints'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  globals: [Header, Footer],
  collections: [
    Products,
    Orders,
    // Content
    Pages,
    Posts,
    Categories,
    Media,
    // Settings
    Users
  ],
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard']
    },
    importMap: {
      baseDir: path.resolve(dirname)
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900
        }
      ]
    }
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URI
    },
    migrationDir: './src/lib/migrations'
    // prodMigrations: migrations,
  }),
  editor: defaultLexical,
  email: nodemailerAdapter(),
  endpoints: defaultEndpoints,
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [...plugins],
  secret: process.env.PAYLOAD_SECRET,
  // TODO: Fix why this is not working
  // sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  }
})
