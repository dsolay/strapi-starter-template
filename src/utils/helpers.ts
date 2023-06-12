/**
 * Await miliseconds
 *
 * @param ms - The amount of time in ms to wait
 *
 */
export function sleep(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function isDefined(value: unknown) {
  return value !== undefined && value !== null
}
