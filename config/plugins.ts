import { Strapi } from '@strapi/strapi'
import { AnyObject } from '../src/types'

export default ({ env }) => ({
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
    },
  },

  io: {
    enabled: true,
    config: {
      contentTypes: {
        order: ['create'],
      },
      events: [
        {
          name: 'connection',
          handler: ({ strapi }: { strapi: Strapi }, socket: AnyObject) => {
            strapi.log.info(`[io] new connection with id ${socket.id}`)
          },
        },
      ],
    },
  },

  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        s3Options: {
          accessKeyId: env('SPACES_ACCESS_KEY_ID'),
          secretAccessKey: env('SPACES_ACCESS_SECRET'),
          region: env('AWS_REGION'),
          endpoint: `https://${env('SPACES_ENDPOINT')}`,
          params: {
            ACL: env('AWS_ACL', 'public-read'),
            signedUrlExpires: env('AWS_SIGNED_URL_EXPIRES', 15 * 60),
            Bucket: env('SPACES_BUCKET_NAME'),
          },
        },
      },
    },
  },
})
