export function removeAccent(text: string) {
  return text.normalize('NFD').replaceAll(/[\u0300-\u036F]/g, '')
}
