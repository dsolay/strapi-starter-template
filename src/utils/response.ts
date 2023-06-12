import { AnyObject } from '../types'

export function paginate(array: AnyObject[], pageSize = 15, pageNumber = 1) {
  const data = array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)

  const pagination = {
    page: pageNumber,
    pageSize,
    pageCount: Math.ceil(array.length / pageSize),
    total: array.length,
  }

  return { data, pagination }
}
