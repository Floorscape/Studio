import {defineArrayMember, defineField, defineType} from 'sanity'
import {noEmDashString} from './utils/noEmDash'

/**
 * Curated gallery surfaced at /gallery?type=... filters.
 */
export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(120).custom(noEmDashString),
    }),
    defineField({
      name: 'finishType',
      title: 'Finish type',
      type: 'string',
      options: {
        list: [
          {title: 'Flake', value: 'flake'},
          {title: 'Metallic', value: 'metallic'},
          {title: '3D', value: '3d'},
          {title: 'Polyaspartic', value: 'polyaspartic'},
          {title: 'Polished', value: 'polished'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryImage',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              validation: (rule) => rule.max(180).custom(noEmDashString),
            }),
            defineField({
              name: 'suburb',
              title: 'Suburb',
              type: 'reference',
              to: [{type: 'suburb'}],
            }),
          ],
          preview: {
            select: {
              title: 'caption',
              media: 'image',
              subtitle: 'suburb.name',
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {title: 'title', finish: 'finishType', images: 'images'},
    prepare({
      title,
      finish,
      images,
    }: {
      title?: string
      finish?: string
      images?: unknown[]
    }) {
      const count = Array.isArray(images) ? images.length : 0
      const parts = [finish, count ? `${count} image${count === 1 ? '' : 's'}` : null]
        .filter(Boolean)
        .join(' / ')
      return {title: title ?? 'Gallery', subtitle: parts || undefined}
    },
  },
})
