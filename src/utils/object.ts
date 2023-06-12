import { AnyObject } from '../types'

export const isObject = (value: unknown): boolean => {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function isEmptyObject<T>(object: T): boolean {
  if (!object) return true
  return Object.entries(object).length === 0
}

export const getObjectProperty = (object: AnyObject, path: string): unknown => {
  const parts = path.split('.')
  return parts.reduce((object, key) => object?.[key], object)
}
