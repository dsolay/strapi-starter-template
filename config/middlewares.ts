/* eslint-disable quotes */

import { AnyValue } from '../src/types'

module.exports = ({ env }: AnyValue) => {
  const cdn = env('SPACES_CDN')
  const endpoint = `${env('SPACES_BUCKET_NAME')}.${env('SPACES_ENDPOINT')}`
  const origins = env('ORIGINS') ?? 'http://localhost:1337'

  return [
    'strapi::errors',
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': ["'self'", 'data:', 'blob:', endpoint, cdn],
            'media-src': ["'self'", 'data:', 'blob:', endpoint, cdn],
            'script-src': [
              "'self'",
              "'unsafe-inline'",
              "'unsafe-eval'",
              'https:',
            ],
            'upgradeInsecureRequests': null,
          },
        },
      },
    },
    {
      name: 'strapi::cors',
      config: {
        origin: origins.split(','),
      },
    },
    'strapi::poweredBy',
    'strapi::logger',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ]
}
