export * from './strapi'

export * from './responses'

export * from './models'

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyValue = any

export type AnyObject<
  Key extends string | number | symbol = string,
  Value = unknown,
> = Record<Key, Value>

export type StringObject = AnyObject<string, string>
