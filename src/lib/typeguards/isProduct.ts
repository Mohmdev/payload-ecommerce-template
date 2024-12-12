import type { Product } from '@/payload-types'

export function isProduct(
  product: number | Product | null | undefined
): product is Product {
  return product != null && typeof product !== 'number'
}
