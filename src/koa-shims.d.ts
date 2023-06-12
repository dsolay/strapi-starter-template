import * as koa from 'koa'

declare module 'koa' {
  export interface Request {
    params: Record<string, unknown>
    body: { data: Record<string, unknown> }
  }
}
