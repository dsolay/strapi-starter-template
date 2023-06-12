export function roundTwo(number: number) {
  return Math.round((number + Number.EPSILON) * 100) / 100
}

export function roundToNearestMultiple(number: number, multiple = 5) {
  return Math.ceil(number / multiple) * multiple
}
