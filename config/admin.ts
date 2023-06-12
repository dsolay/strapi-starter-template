import { AnyValue } from '../src/types'

export default ({ env }: AnyValue) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  watchIgnoreFiles: ['**/config/sync/**'],
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
})
