import utils from '@strapi/utils'
import { i18n } from '../utils/parse-locales'
import { ROLE_UID } from '../constants'
import { Role } from '../types'
import { BaseRepository } from './base-repository'

const { NotFoundError } = utils.errors

export class RoleRepository extends BaseRepository<Role> {
  public constructor() {
    super(ROLE_UID)
  }

  public async findByRole(role: string): Promise<Partial<Role>> {
    const _role = await this.findOne({
      fields: ['id', 'name'],
      filters: { type: { $eq: role } },
    })

    if (!_role) {
      const model = this.getEntityName()
      const message = i18n('errors.entityNotFound', model, `role ${role}`)
      throw new NotFoundError(message)
    }

    return _role
  }
}

export const roleRepository = new RoleRepository()
