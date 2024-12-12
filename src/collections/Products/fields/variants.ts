import type { Field } from 'payload'
import type { ProductVariant } from '../ui/types'
interface VariantSiblingData {
  variants: ProductVariant[]
}

export const productVariants: Field[] = [
  {
    name: 'enableVariants',
    type: 'checkbox'
  },
  {
    name: 'variants',
    type: 'group',
    admin: {
      condition: (data, siblingData) => Boolean(siblingData.enableVariants)
    },
    fields: [
      {
        name: 'options',
        type: 'array',
        admin: {
          components: {
            RowLabel: '@/collections/Products/ui/RowLabels/KeyLabel#KeyLabel'
          },
          initCollapsed: true
        },
        fields: [
          {
            type: 'row',
            fields: [
              {
                name: 'label',
                type: 'text',
                required: true
              },
              {
                name: 'slug',
                type: 'text',
                required: true
              }
            ]
          },
          {
            name: 'values',
            type: 'array',
            admin: {
              components: {
                RowLabel:
                  '@/collections/Products/ui/RowLabels/OptionLabel#OptionLabel'
              },
              initCollapsed: true
            },
            fields: [
              {
                type: 'row',
                fields: [
                  {
                    name: 'label',
                    type: 'text',
                    required: true
                  },
                  {
                    name: 'slug',
                    type: 'text',
                    required: true
                  }
                ]
              }
            ]
          }
        ],
        label: 'Variant options',
        minRows: 1
      },
      {
        name: 'variants',
        type: 'array',
        admin: {
          components: {
            RowLabel:
              '@/collections/Products/ui/RowLabels/VariantLabel#VariantLabel'
          },
          condition: (data, siblingData) => {
            return Boolean(siblingData?.options?.length)
          }
        },
        fields: [
          {
            name: 'options',
            type: 'text',
            admin: {
              components: {
                Field: '@/collections/Products/ui/VariantSelect#VariantSelect'
              }
            },
            hasMany: true,
            required: true
          },
          {
            name: 'stripeProductID',
            type: 'text',
            admin: {
              components: {
                Field:
                  '@/collections/Products/ui/StripeProductSelect#StripeProductSelect'
              }
            },
            label: 'Stripe Product ID'
          },
          {
            type: 'row',
            fields: [
              {
                name: 'stock',
                type: 'number',
                admin: {
                  description:
                    'Define stock for this variant. A stock of 0 disables checkout for this variant.',
                  width: '50%'
                },
                defaultValue: 0,
                required: true
              }
            ]
          },
          {
            name: 'info',
            type: 'json',
            admin: {
              hidden: true,
              readOnly: true
            }
          },
          {
            name: 'images',
            type: 'upload',
            relationTo: 'media',
            hasMany: true
          }
        ],
        labels: {
          plural: 'Variants',
          singular: 'Variant'
        },
        minRows: 1,
        validate: (value, { siblingData }) => {
          // ensure siblingData has variants
          if (
            !siblingData ||
            !('variants' in siblingData) ||
            !Array.isArray(siblingData.variants)
          ) {
            return true
          }

          const typedSiblingData = siblingData as VariantSiblingData

          if (typedSiblingData.variants.length) {
            const hasDuplicate = typedSiblingData.variants.some(
              (variant: ProductVariant, index) => {
                // Check this against other variants
                const dedupedArray = [...typedSiblingData.variants].filter(
                  (_, i) => i !== index
                )

                // Join the arrays then compare the strings, note that we sort the array before it's saved in the custom component
                const test = dedupedArray.find(
                  (otherOption: ProductVariant) => {
                    const firstOption = otherOption?.options?.join('')
                    const secondOption = variant?.options?.join('')
                    return firstOption === secondOption
                  }
                )

                return Boolean(test)
              }
            )

            if (hasDuplicate) {
              return 'There is a duplicate variant'
            }
          }

          return true
        }
      }
    ],
    label: false
  },
  {
    name: 'stripeProductID',
    type: 'text',
    admin: {
      components: {
        Field:
          '@/collections/Products/ui/StripeProductSelect#StripeProductSelect'
      },
      condition: (data) => !data.enableVariants
    },
    label: 'Stripe Product'
  },
  {
    name: 'info',
    type: 'json',
    admin: {
      condition: (data) => !data.enableVariants,
      hidden: true
    }
  },
  {
    name: 'stock',

    type: 'number',
    admin: {
      condition: (data) => !data.enableVariants,
      description:
        'Define stock for this product. A stock of 0 disables checkout for this product.'
    },
    defaultValue: 0,
    required: true
  },
  {
    name: 'price',
    type: 'number',
    admin: {
      hidden: true
    }
  },
  {
    name: 'currency',
    type: 'text',
    admin: {
      hidden: true
    }
  }
]
