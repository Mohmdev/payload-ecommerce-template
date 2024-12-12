import type { InfoType } from '@/collections/Products/ui/types'
import type { CartItems } from '@/payload-types'

import { Price } from '@/components/Price'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { isProduct } from '@/lib/typeguards/isProduct'
import { isMedia } from '@/lib/typeguards/isMedia'
import { isValidInfo } from '@/lib/typeguards/isValidInfo'

interface Props {
  items: CartItems
}

export const ItemsList: React.FC<Props> = ({ items }) => {
  return (
    <ul className="flex-grow overflow-auto py-4">
      {items?.map((item, i) => {
        if (typeof item.product === 'number' || !item)
          return <React.Fragment key={item.id} />

        const product = item.product
        let image =
          product?.meta?.image && typeof product?.meta?.image !== 'number'
            ? product.meta.image
            : undefined

        const isVariant = Boolean(item.variant)
        const variant = item.product?.variants?.variants?.length
          ? item.product.variants.variants.find((v) => v.id === item.variant)
          : undefined

        const info =
          isVariant && variant?.info && isValidInfo(variant.info)
            ? variant.info
            : product?.info && isValidInfo(product.info)
              ? product.info
              : undefined

        // Either regular product image OR variant image
        if (isVariant) {
          const variantImage = variant?.images?.[0]
          if (variantImage && isMedia(variantImage)) {
            image = variantImage
          }
        }

        const url = `/product/${product?.slug}${isVariant ? `?variant=${item.variant}` : ''}`

        return (
          <li
            className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
            key={item.id}
          >
            <div className="relative flex w-full flex-row justify-between px-1 py-4">
              <Link className="z-30 flex flex-row space-x-4" href={url}>
                <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                  {image?.url && (
                    <Image
                      alt={image.alt || product?.title || ''}
                      className="h-full w-full object-cover"
                      height={64}
                      src={image.url}
                      width={64}
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col text-base">
                  <span className="leading-tight">{product?.title}</span>
                  {isVariant && info?.options?.length ? (
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {info.options
                        .filter(
                          (option): option is InfoType['options'][number] =>
                            typeof option === 'object' &&
                            option !== null &&
                            'label' in option &&
                            'key' in option &&
                            'slug' in option
                        )
                        .map((option) => option.label)
                        .join(', ')}
                    </p>
                  ) : null}
                </div>
              </Link>
              <div className="flex h-16 flex-col justify-between">
                {info?.price && (
                  <Price
                    amount={info.price?.amount}
                    className="flex justify-end space-y-2 text-right text-sm"
                    currencyCode={info.price?.currency}
                  />
                )}
                <p>{item.quantity}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
