import '@strapi/strapi'
import { Server } from 'socket.io'
import { AnyValue } from './types'

type IOOptions = { room: string }

declare module '@strapi/strapi' {
  export interface Strapi {
    $io: {
      emit: (event: string, data: AnyValue) => Promise<void>
      raw: (event: string, data: AnyValue, options?: IOOptions) => Promise<void>
      socket: Server
    }
  }
}
