import { Strapi } from '@strapi/strapi'
import { AnyObject, BaseModel } from '.'

export interface StrapiContext {
  strapi: Strapi
}

export type File = {
  size: number
  path: string
  name: string
  type: string
  hash: string
  lastModifiedDate: Date
}

export type ID = string | number

export type AttributeOperators = {
  $not?: AnyObject
  $eq?: string | number | boolean
  $eqi?: string | number | boolean
  $ne?: string | number | boolean
  $in?: string[] | number[]
  $notIn?: string[] | number[]
  $lt?: number
  $lte?: number
  $gt?: number
  $gte?: number
  $between?: number[]
  $contains?: string
  $notContains?: string
  $containsi?: string
  $notContainsi?: string
  $startsWith?: string
  $endsWith?: string
  $null?: boolean
  $notNull?: boolean
}

export interface Filters {
  [key: string]: string | number | boolean | AttributeOperators | Filters
}

export type LogicalOperators = {
  $and?: (Filters | LogicalOperators)[]
  $or?: (Filters | LogicalOperators)[]
  $not?: Filters
}

export type Directions = 'asc' | 'desc'

export type Sort = AnyObject<string, Directions | AnyObject<string, Directions>>

export type Params<
  Entity = AnyObject,
  ExtraProperties = AnyObject,
> = ExtraProperties & {
  fields?: string[]
  filters?: Filters | LogicalOperators
  start?: number
  limit?: number
  sort?: string | Sort | Sort[]
  populate?: string[] | AnyObject<string, boolean | Params>
  data?: Partial<Entity>
  files?: File | File[]
  pagination?: {
    page?: number
    pageSize?: number
    start?: number
    limit?: number
    withCount?: boolean
  }
}

export type DBQueryParams<T = AnyObject> = AnyObject & {
  select?: string[]
  where?: Filters | LogicalOperators
  offset?: number
  limit?: number
  orderBy?: string | Sort | Sort[]
  populate?: string[] | AnyObject<string, boolean | Params>
  data?: Partial<T>
}

export type ExtendedService<T> = {
  find(parameters: Params): Promise<Partial<T>>
  findOne(id: ID, parameters: Params): Promise<Partial<T>>
  create(parameters: Params<T>): Promise<Partial<T>>
  update(id: ID, parameters: Params<T>): Promise<Partial<T>>
  delete(id: ID, parameters: Params): Promise<Partial<T>>
}

export type BulkService<T> = {
  bulkCreate(entries: T[], parameters: Params<T>): Promise<Partial<T>[]>
  bulkUpdate(entries: T[], parameters: Params<T>): Promise<Partial<T>[]>
}

export type EntityService<T extends BaseModel> = {
  findMany(uid: string, parameters: Params): Promise<Array<Partial<T>> | null>
  findOne(uid: string, id: ID, parameters: Params): Promise<Partial<T> | null>
  create(uid: string, parameters: Params<T>): Promise<Partial<T>>
  update(uid: string, id: ID, parameters: Params<T>): Promise<Partial<T>>
  delete(uid: string, id: ID, parameters: Params): Promise<Partial<T>>
}

export type LifecycleAction =
  | 'beforeCreate'
  | 'beforeCreateMany'
  | 'afterCreate'
  | 'afterCreateMany'
  | 'beforeUpdate'
  | 'beforeUpdateMany'
  | 'afterUpdate'
  | 'afterUpdateMany'
  | 'beforeDelete'
  | 'beforeDeleteMany'
  | 'afterDelete'
  | 'afterDeleteMany'
  | 'beforeCount'
  | 'beforeCount'
  | 'beforeFindOne'
  | 'beforeFindOne'
  | 'beforeFindMany'
  | 'beforeFindMany'

export type LifecycleEvent<Model = AnyObject, State = AnyObject> = {
  action: LifecycleAction
  model: AnyObject
  params: DBQueryParams<Model>
  result: Partial<Model>
  state: State
}
