import { Context } from 'koa'
import { UserService } from '../../../services'
import {
  AnyValue,
  PaginationResponse,
  Params,
  Response,
  User,
} from '../../../types'

export const userControllers = (controller: AnyValue) => {
  controller.user = {
    ...controller.user,

    async find(context: Context): Promise<PaginationResponse<User>> {
      const service = UserService.getInstance()

      const parammeters: Params = { ...context.request.query }
      const { auth } = context.state

      return service.fetchAll(auth, parammeters)
    },

    async me(context: Context): Promise<Response> {
      const service = UserService.getInstance()
      const user = context.state.user as User

      if (!user?.id) return context.unauthorized()

      const parammeters: Params = { ...context.request.query }
      const { auth } = context.state
      const data = await service.me(user.id, auth, parammeters)

      return { data }
    },
  }
}
