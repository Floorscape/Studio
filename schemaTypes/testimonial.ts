import {defineField, defineType} from 'sanity'
import {noEmDashString} from './utils/noEmDash'

/**
 * Customer testimonial. Sourced from Google reviews, Hipages, ProductReview,
 * or direct email.
 */
export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Customer name',
      type: 'string',
      description: 'Real name or anonymised label, e.g. "A Clyde homeowner".',
      validation: (rule) => rule.required().max(120).custom(noEmDashString),
    }),
    defineField({
      name: 'suburb',
      title: 'Suburb',
      type: 'string',
      description: 'Plain text, not a reference. Lets us record customers in suburbs we do not yet have a page for.',
      validation: (rule) => rule.required().max(120).custom(noEmDashString),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(600).custom(noEmDashString),
    }),
    defineField({
      name: 'photoOptional',
      title: 'Photo (optional)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'sourcePlatform',
      title: 'Source platform',
      type: 'string',
      options: {
        list: [
          {title: 'Google', value: 'google'},
          {title: 'Direct', value: 'direct'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      suburb: 'suburb',
      rating: 'rating',
      media: 'photoOptional',
    },
    prepare({
      title,
      suburb,
      rating,
      media,
    }: {
      title?: string
      suburb?: string
      rating?: number
      media?: unknown
    }) {
      const stars = typeof rating === 'number' ? '★'.repeat(rating) : ''
      const subtitle = [suburb, stars].filter(Boolean).join(' / ')
      return {
        title: title ?? 'Testimonial',
        subtitle: subtitle || undefined,
        media: media as never,
      }
    },
  },
})
