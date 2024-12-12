import type { InfoType } from '@/collections/Products/ui/types'

export const isValidInfo = (info: unknown): info is InfoType => {
  return typeof info === 'object' && info !== null
}
