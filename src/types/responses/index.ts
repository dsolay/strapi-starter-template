import { AnyObject } from '..'

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface Response<T = AnyObject> {
  data: T
}

export interface PaginationResponse<T = AnyObject> {
  data: Array<Partial<T>>
  meta: {
    pagination: Pagination
  }
}
