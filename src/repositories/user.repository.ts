import { USER_UID } from '../constants'
import { RoleType, User } from '../types'
import { roleRepository } from '../repositories'
import { BaseRepository } from './base-repository'

type Entity = Partial<User>

export class UserRepository extends BaseRepository<User> {
  public constructor() {
    super(USER_UID)
  }

  public async createWithRole(data: Entity, role: RoleType): Promise<Entity> {
    const _role = await roleRepository.findByRole(role)

    return this.create({
      ...data,
      provider: 'local',
      confirmed: true,
      role: { id: _role.id },
    })
  }
}

export const userRepository = new UserRepository()
