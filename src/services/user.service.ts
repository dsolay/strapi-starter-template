import { map } from 'async'
import utils from '@strapi/utils'
import { AnyValue, Params, PaginationResponse, User } from '../types'
import { userRepository as repository } from '../repositories'
import { USER_UID } from '../constants'
import { i18n } from '../utils/parse-locales'

type Entity = Partial<User>

const { sanitize, errors } = utils
const { NotFoundError } = errors

let instance: UserService

export class UserService {
  public constructor() {}

  public static getInstance(): UserService {
    if (instance === undefined) instance = new UserService()

    return instance
  }

  public async fetchAll(
    auth: AnyValue,
    parameters?: Params,
  ): Promise<PaginationResponse<User>> {
    const response = await repository.find(parameters, true)

    response.data = await map<Entity, Entity, Error>(
      response.data,
      async (user: Entity) => await this.sanitizeOutput(user, auth),
    )

    return response
  }

  public async me(
    id: number,
    auth: AnyValue,
    parameters?: Params,
  ): Promise<Partial<User>> {
    const user = await repository.findById(id, parameters)

    if (!user) {
      const message = i18n('errors.user.notFound', id)
      throw new NotFoundError(message)
    }

    return this.sanitizeOutput(user, auth)
  }

  private async sanitizeOutput(
    user: Partial<User>,
    auth: AnyValue,
  ): Promise<Partial<User>> {
    const schema = strapi.getModel(USER_UID)
    return sanitize.contentAPI.output(user, schema, { auth })
  }
}
