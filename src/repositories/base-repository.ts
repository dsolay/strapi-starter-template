import { map } from 'async'
import utils from '@strapi/utils'
import {
  AnyObject,
  BaseModel,
  EntityService,
  ID,
  PaginationResponse,
  Params,
  DBQueryParams,
  Filters,
} from '../types'
import { i18n } from '../utils/parse-locales'

type NormalizedPaginationParameters = {
  limit: number
  page: number
  start: number
}

const { NotFoundError } = utils.errors

export class BaseRepository<T extends BaseModel> {
  private mapKeys: AnyObject<string, keyof DBQueryParams> = {
    fields: 'select',
    filters: 'where',
    start: 'offset',
    limit: 'limit',
    sort: 'orderBy',
    populate: 'populate',
    data: 'data',
  }

  public constructor(private uid: string) {}

  public get service() {
    return strapi.entityService as EntityService<T>
  }

  public get query() {
    return strapi.db.query(this.uid)
  }

  public async count(parameters: DBQueryParams = {}): Promise<number> {
    return this.query.count(parameters)
  }

  public async find(
    parameters: Params = {},
    paginate = false,
  ): Promise<PaginationResponse<T>> {
    const { limit, page, start } = this.getPaginationParams(parameters)
    const _parameters = { ...parameters, limit, start }

    const entities = await this.service.findMany(this.uid, _parameters)

    let count = 0
    if (paginate) count = await this.count(this.toQueryParams(_parameters))

    return {
      data: entities ?? [],
      meta: {
        pagination: {
          page,
          pageSize: limit,
          pageCount: Math.ceil(count / limit),
          total: count,
        },
      },
    }
  }

  public async findOne(parameters: Params = {}) {
    const entities = await this.service.findMany(this.uid, parameters)

    if (!entities || entities.length === 0) return null

    return entities[0]
  }

  async findOneOrFail(parameters: Params = {}) {
    const entity = await this.findOne(parameters)

    if (!entity) {
      const model = this.getEntityName()
      const message = i18n('errors.entityNotFound', model)
      throw new NotFoundError(message)
    }

    return entity
  }

  public async findById(id: ID, parameters: Params = {}) {
    const entity = await this.service.findOne(this.uid, id, parameters)

    if (!entity) {
      const model = this.getEntityName()
      const message = i18n('errors.entityWithIdNotFound', model, `id ${id}`)
      throw new NotFoundError(message)
    }

    return entity
  }

  public async create(model: Partial<T>, parameters?: Params<T>) {
    return this.service.create(this.uid, { ...parameters, data: model })
  }

  public async createMany(models: Array<Partial<T>>, parameters?: Params<T>) {
    return map<Partial<T>, Partial<T>, Error>(
      models,
      async (model: Partial<T>) => await this.create(model, parameters),
    )
  }

  public async update(id: ID, model: Partial<T>, parameters?: Params) {
    const _parameters: Params<T> = {
      ...parameters,
      data: { id, ...model },
    }

    return this.service.update(this.uid, id, _parameters)
  }

  public async updateMany(models: Array<Partial<T>>, parameters?: Params<T>) {
    return map<Partial<T>, Partial<T>, Error>(
      models,
      async (model: Partial<T>) =>
        await this.update(model.id ?? 0, model, parameters),
    )
  }

  async upsert(model: Partial<T>, parameters: Params<T> = {}) {
    return model.id
      ? this.update(model.id, model, parameters)
      : this.create(model, parameters)
  }

  public async rawUpdate(
    model: Partial<T>,
    parameters?: Params,
  ): Promise<Partial<T>> {
    const _parameters: Params<T> = {
      ...parameters,
      data: { ...model },
    }

    return this.query.update(this.toQueryParams(_parameters))
  }

  public async delete(id: ID, parameters: Params = {}) {
    return this.service.delete(this.uid, id, parameters)
  }

  public async deleteMany(ids: ID[], parameters?: Params<T>) {
    return map<ID, Partial<T>, Error>(ids, async (id: ID) =>
      this.delete(id, parameters),
    )
  }

  public async exists(filters: Filters): Promise<boolean> {
    const entity = await this.findOne({ filters, fields: ['id'] })

    return !!entity
  }

  public toQueryParams(parameters: Params): DBQueryParams {
    const _parameters: DBQueryParams = {}

    for (const [key, value] of Object.entries(parameters)) {
      const mapKey = this.mapKeys[key]
      if (mapKey) _parameters[mapKey] = value
    }

    return _parameters
  }

  public getPaginationParams({
    limit,
    start,
    pagination,
  }: Params): NormalizedPaginationParameters {
    let _limit = +(limit ?? '15')
    let _start = +(start || '0')
    let page = 1

    if (pagination) {
      _limit = +(pagination.pageSize || pagination.limit || '15')

      if (pagination.page) {
        page = +pagination.page
        _start = (page - 1) * _limit
      } else {
        page = Math.ceil((_start + 1) / _limit)
      }
    }

    return { limit: _limit, page, start: _start }
  }

  protected getEntityName(): string {
    const matchs = this.uid.match(/api::(\w+-?\w+)/)

    return matchs ? matchs[1] : 'ENTITY'
  }
}
