import { AnyValue } from '../src/types'

const config = ({ env }: AnyValue) => ({
  rest: {
    defaultLimit: +env('DEFAULT_LIMIT') || 15,
    maxLimit: +env('MAX_LIMIT') || 100,
    withCount: true,
  },
})

export default config
