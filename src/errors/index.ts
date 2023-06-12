import { AnyObject } from '../types'

export enum errorTypes {
  INTERNAL_SERVER_ERROR = 'internalServerError',
}

export class BaseError extends Error {
  details: AnyObject
  errorType: string = errorTypes.INTERNAL_SERVER_ERROR

  constructor(message: string, name: string, details: AnyObject) {
    super()
    this.name = name
    this.message = message
    this.details = details
  }
}
