import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
// import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  UnderlineFeature,
  lexicalEditor
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { plugins } from './services/plugins'
import { Categories } from '@/collections/Categories/config'
import { Media } from '@/collections/Media/config'
import { Orders } from '@/collections/Orders'
import { Pages } from '@/collections/Pages/config'
import { Products } from '@/collections/Products'
import { Users } from '@/collections/Users/config'
import { createPaymentIntent } from '@/services/endpoints/create-payment-intent'
import { productsProxy } from '@/services/endpoints/products'
import { Footer } from '@/globals/Footer'
import { Header } from '@/globals/Header'
import { Posts } from './collections/Posts/config'
import { getServerSideURL } from './lib/utilities/getURL'
import { defaultLexical } from './services/editor/defaultLexical'
import { defaultEndpoints } from './services/endpoints'

// import dotenv from 'dotenv'
// import { DocumentInfoContext } from '@payloadcms/ui'
// import { customersProxy } from '@/lib/endpoints/customers'
// import { paymentSucceeded } from '@/lib/stripe/webhooks/paymentSucceeded'
// import { productUpdated } from '@/lib/stripe/webhooks/productUpdated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export type GenerateTitle2<T = unknown> = (args: {
  doc: T
  locale?: string
}) => Promise<string> | string

const generateTitle: GenerateTitle = <Page>({ doc }) => {
  return `${doc?.title ?? ''} | My Store`
}

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
      beforeLogin: ['@/components/BeforeLogin#BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard#BeforeDashboard']
    },
    user: Users.slug
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
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts')
  }
})
