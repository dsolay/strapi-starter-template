import { Context, Next } from 'koa'
import utils from '@strapi/utils'
import { Strapi } from '@strapi/strapi'
import camelCase from 'lodash.camelcase'
import { i18n } from './parse-locales'

const { NotFoundError } = utils.errors

export const createCompanyOwnerMiddleware = (
  entity: string,
  relatedEntity: string,
  strapi: Strapi,
) => {
  return async (context: Context, next: Next) => {
    const uid = `api::${relatedEntity}.${relatedEntity}`
    const user = context.state.user
    const parameters = context.request.params

    if (user.role.type !== 'admin') {
      const relatedEntityName = relatedEntity.replace('-', ' ')
      const relatedId = parameters[`${camelCase(relatedEntity)}Id`] as string

      const foundEntity = await strapi.entityService.findOne(uid, relatedId, {})

      if (!foundEntity) {
        const message = i18n(
          'errors.notFound',
          relatedEntityName.toUpperCase(),
          relatedId,
        )

        throw new NotFoundError(message)
      }

      const entityId = parameters[`${camelCase(entity)}Id`]
      const service = strapi.service(uid)

      if (!service) {
        const message = i18n('errors.serviceNotFound')
        throw new NotFoundError(message)
      }

      const isOwner = await service.isOwner(entityId, relatedId)

      if (!isOwner) {
        const message = i18n('errors.notOwner', relatedEntityName)
        throw new NotFoundError(message)
      }
    }

    await next()
  }
}
