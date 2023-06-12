import { AnyObject, BaseModel } from '..'

export type RoleType = 'admin' | 'backoffice' | 'customer' | 'driver'

export interface Role extends BaseModel {
  name: string
  description: string
  type: RoleType
}

export interface User extends BaseModel {
  username: string
  email: string
  provider: string
  password: string
  resetPasswordToken: string
  confirmationToken: string
  confirmed: boolean
  blocked: boolean
  role: Partial<Role>
  driver: AnyObject
  customer: AnyObject
}
