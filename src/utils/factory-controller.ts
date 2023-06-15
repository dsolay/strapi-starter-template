import { Context } from 'koa'
import utils from '@strapi/utils'
import camelCase from 'lodash.camelcase'
import { AnyObject, AnyValue } from '../types'
import { BaseError } from '../errors'
import { parseBody } from './request'
import { i18n } from './parse-locales'

type Override = {
  baseServiceName: string
  relatedServiceName: string
  methods: AnyObject
}

type Options = {
  useAuthenticatedUser: boolean
}

const { NotFoundError } = utils.errors

export const createRelationControllers = (
  baseEntity: string,
  relatedEntity: string,
  options?: Options,
  override?: Override,
) => {
  const baseServiceName =
    override?.baseServiceName ??
    `api::${baseEntity}.${baseEntity}-${relatedEntity}`

  const relatedServiceName =
    override?.relatedServiceName ?? `api::${relatedEntity}.${relatedEntity}`

  const relatedId = `${camelCase(relatedEntity)}Id`
  const baseId = `${camelCase(baseEntity)}Id`

  return {
    find(context: Context) {
      const {
        request: { query, params },
        state,
      } = context

      const entityId = options?.useAuthenticatedUser
        ? state.user.id
        : params[baseId]

      return strapi.service<AnyValue>(baseServiceName).find(entityId, query)
    },

    findOne(context: Context) {
      const {
        request: { query, params },
        state,
      } = context

      const entityId = options?.useAuthenticatedUser
        ? state.user.id
        : params[baseId]

      return strapi
        .service<AnyValue>(baseServiceName)
        .findOne(entityId, params[relatedId], query)
    },

    async create(context: Context) {
      const { query, params } = context.request

      const { data, files } = parseBody(context)

      const entityId = options?.useAuthenticatedUser
        ? context.state.user.id
        : params[baseId]

      try {
        const service = strapi.service(baseServiceName) as AnyValue

        if (!service) {
          const message = i18n('errors.serviceNotFound')
          throw new NotFoundError(message)
        }

        return service.add(entityId, { ...query, data, files })
      } catch (error) {
        if (error instanceof BaseError)
          return context[error.errorType](error.message, error.details)

        throw error
      }
    },

    update(context: Context) {
      const { query, params } = context.request

      const { data, files } = parseBody(context)

      const entityId = +(params[relatedId] as string)
      data.id = entityId

      try {
        return strapi
          .service<AnyValue>(relatedServiceName)
          .update(entityId, { ...query, data, files })
      } catch (error) {
        if (error instanceof BaseError)
          return context[error.errorType](error.message, error.details)

        throw error
      }
    },

    delete(context: Context) {
      const id = context.request.params[relatedId]
      const query = context.request.query

      return strapi.service<AnyValue>(relatedServiceName).delete(id, query)
    },

    ...override?.methods,
  }
}

export const createBulkController = (entity: string, override = {}) => {
  const { map } = require('async')

  const serviceName = `api::${entity}.${entity}`

  return {
    async createMany(context: Context) {
      const { body, query } = context.request

      const data = await map(body.data, async (data: AnyObject) => {
        return await strapi.entityService.create(serviceName, {
          ...query,
          data,
        })
      })

      return { data }
    },

    async updateMany(context: Context) {
      const { body, query } = context.request
      const service = strapi.entityService

      const data = await map(body.data, async (data: AnyObject) => {
        const parameters = { ...query, data }
        return await service.update(serviceName, data.id, parameters)
      })

      return { data }
    },

    deleteMany(context: Context) {
      const { query } = context.request

      const parameters = { ...query, where: { id: { $in: query.ids } } }

      return strapi.db.query(serviceName).deleteMany(parameters)
    },

    ...override,
  }
}
