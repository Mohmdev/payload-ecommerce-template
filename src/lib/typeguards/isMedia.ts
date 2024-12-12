import type { Media } from '@/payload-types'

export function isMedia(
  media: number | Media | null | undefined
): media is Media {
  return media != null && typeof media !== 'number'
}
