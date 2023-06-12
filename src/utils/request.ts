import { parseMultipartData } from '@strapi/utils'
import { Context } from 'koa'
import { AnyObject, File } from '../types'

type Body<T, K> = {
  data: T
  files: AnyObject<string, K>
}

export const parseBody = <Entity = AnyObject, Media = File>(
  context: Context,
): Body<Entity, Media> => {
  if (context.is('multipart')) {
    const { data, files } = parseMultipartData(context)
    return { data: data.data ?? {}, files }
  }

  const data = (context.request.body ? context.request.body.data : {}) as Entity

  return { data, files: {} }
}
