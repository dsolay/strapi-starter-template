import { AnyObject, File } from '../types'

export async function uploadFile(file: File): Promise<AnyObject> {
  const service = strapi.plugin('upload').service('upload')

  const uploadedFiles = await service.upload({
    data: { fileInfo: {} },
    files: file,
  })

  return uploadedFiles[0]
}

export async function removeFile(file: AnyObject): Promise<AnyObject> {
  const service = strapi.plugin('upload').service('upload')

  return service.remove(file)
}
