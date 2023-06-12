import { AnyValue } from '../src/types'

export default ({ env }: AnyValue) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('BACKEND_URL', '0.0.0.0'),
})
