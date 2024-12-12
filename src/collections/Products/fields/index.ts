import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor
} from '@payloadcms/richtext-lexical'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { slugField } from '@/fields/slug/config'

import type { Field } from 'payload'
import { productVariants } from './variants'

export const productFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
    unique: true,
    index: true
  },
  {
    type: 'tabs',
    tabs: [
      {
        fields: [
          {
            name: 'description',
            type: 'richText',
            editor: lexicalEditor({
              features: ({ rootFeatures }) => {
                return [
                  ...rootFeatures,
                  HeadingFeature({
                    enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4']
                  }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  HorizontalRuleFeature()
                ]
              }
            }),
            label: false,
            required: false
          },
          {
            name: 'gallery',
            type: 'upload',
            relationTo: 'media',
            required: true,
            hasMany: true
          },
          {
            name: 'layout',
            type: 'blocks',
            blocks: [CallToAction, Content, MediaBlock]
          }
        ],
        label: 'Content'
      },
      {
        label: 'Product Details',
        fields: productVariants
      }
    ]
  },
  {
    name: 'relatedProducts',
    type: 'relationship',
    filterOptions: ({ id }) => {
      return {
        id: {
          not_in: [id]
        }
      }
    },
    hasMany: true,
    relationTo: 'products'
  },
  {
    name: 'publishedOn',
    type: 'date',
    admin: {
      date: {
        pickerAppearance: 'dayAndTime'
      },
      position: 'sidebar'
    },
    hooks: {
      beforeChange: [
        ({ siblingData, value }) => {
          if (siblingData._status === 'published' && !value) {
            return new Date()
          }
          return value
        }
      ]
    }
  },
  {
    name: 'categories',
    type: 'relationship',
    admin: {
      position: 'sidebar',
      sortOptions: 'title'
    },
    hasMany: true,
    relationTo: 'categories'
  },
  ...slugField(),
  {
    name: 'skipSync',
    type: 'checkbox',
    admin: {
      hidden: true,
      position: 'sidebar',
      readOnly: true
    },
    label: 'Skip Sync'
  }
]
