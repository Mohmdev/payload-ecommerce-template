import { postgresAdapter } from '@payloadcms/db-postgres'
// import { mongooseAdapter } from '@payloadcms/db-mongodb'

export const databaseAdapter = postgresAdapter({
  pool: {
    connectionString: process.env.POSTGRES_URI
  },
  // prodMigrations: migrations,
  migrationDir: '@/services/migrations'
})