import { format } from 'util'
import { AnyValue } from '../types'
import { Locales, locales } from '../locales'
import { getObjectProperty } from './object'

type Lang = keyof Locales

const locale: Lang = 'en'

export const i18n = (key: string, ...parameters: AnyValue[]): string => {
  const message = getObjectProperty(locales[locale], key) as string

  if (parameters.length > 0)
    return format(message, ...parameters).replaceAll('--', '')

  return message
}
