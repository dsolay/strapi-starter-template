import { parse } from 'pg-connection-string'
import { AnyValue } from '../src/types'

export default ({ env }: AnyValue) => {
  const connection = process.env.DATABASE_URL
    ? parse(process.env.DATABASE_URL)
    : {
        host: env('DATABASE_HOST'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME'),
        user: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD'),
        ssl: env.bool('DATABASE_SSL', false),
      }

  if (process.env.DATABASE_CA) connection.ssl = { ca: process.env.DATABASE_CA }

  return {
    connection: {
      client: env('DATABASE_CLIENT', 'postgres'),
      connection,
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 120_000),
      pool: {
        min: env.int('DATABASE_CONNECTION_POOL_MIN', 0),
        max: env.int('DATABASE_CONNECTION_POOL_MAX', 60),
      },
    },
  }
}
