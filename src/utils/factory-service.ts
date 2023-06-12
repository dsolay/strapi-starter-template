import camelCase from 'lodash.camelcase'
import { AnyObject, AnyValue, Params } from '../types'

export const createRelationServices = (
  baseEntity: string,
  relatedEntity: string,
  override?: AnyObject,
) => {
  const serviceName = `api::${relatedEntity}.${relatedEntity}`
  const entityName = camelCase(baseEntity)

  return {
    find(entityId: number, query: Params = {}) {
      if (!query.filters) query.filters = {}

      query.filters[entityName] = entityId

      return strapi.entityService.findMany(serviceName, query)
    },

    async findOne(
      entityId: number,
      relatedId: number,
      query: AnyObject = {},
    ): Promise<AnyObject> {
      const parameters = {
        ...query,
        filters: { id: relatedId, [entityName]: entityId },
      }

      const data = await strapi.service<AnyValue>(serviceName).find(parameters)

      return data.results[0]
    },

    add(entityId: number, parameters: Params) {
      if (parameters.data) parameters.data[entityName] = entityId

      return strapi.entityService.create(serviceName, parameters)
    },

    ...override,
  }
}
