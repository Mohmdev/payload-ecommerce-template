import type { Product } from '@/payload-types'

import { Grid } from '@/components/grid'
import { GridTileImage } from '@/components/grid/tile'
import Link from 'next/link'
import React from 'react'
import { isMedia } from '@/lib/typeguards/isMedia'

export function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <React.Fragment>
      {products.map((product) => {
        const image =
          typeof product.meta?.image !== 'number' &&
          isMedia(product.meta?.image)
            ? product.meta.image
            : undefined

        if (!image) return null
        return (
          <Grid.Item className="animate-fadeIn" key={product.id}>
            <Link
              className="relative inline-block h-full w-full"
              href={`/product/${product.slug}`}
            >
              <GridTileImage
                label={{
                  amount: product.price!,
                  currencyCode: product.currency!,
                  title: product.title
                }}
                media={image}
              />
            </Link>
          </Grid.Item>
        )
      })}
    </React.Fragment>
  )
}
