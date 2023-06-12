import { AnyValue } from '../../types'
import { userControllers } from './controllers'

export default (plugin: AnyValue) => {
  userControllers(plugin.controllers)

  return plugin
}
