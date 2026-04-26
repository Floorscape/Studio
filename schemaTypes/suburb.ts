import {defineArrayMember, defineField, defineType} from 'sanity'
import {noEmDashString, noEmDashBlocks} from './utils/noEmDash'

/**
 * A suburb landing page. Six docs ship at launch (Doncaster, Balwyn, Kew East,
 * Clyde, Officer, Pakenham). Drives /garage/[suburb] routes.
 */
export const suburb = defineType({
  name: 'suburb',
  title: 'Suburb',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Suburb name',
      type: 'string',
      validation: (rule) => rule.required().max(80).custom(noEmDashString),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/—/g, '-')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
            .slice(0, 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'postcodes',
      title: 'Postcodes',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (rule) =>
            rule.regex(/^\d{4}$/, {name: 'postcode (4 digits)'}),
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'ring',
      title: 'Ring',
      type: 'number',
      description: 'Geographic ring (1, 2, or 3) used for routing and pricing.',
      options: {
        list: [
          {title: 'Ring 1', value: 1},
          {title: 'Ring 2', value: 2},
          {title: 'Ring 3', value: 3},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required().min(1).max(3).integer(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introCopy',
      title: 'Intro copy',
      type: 'blockContent',
      description: 'Local context shown above the fold.',
      validation: (rule) => rule.required().custom(noEmDashBlocks),
    }),
    defineField({
      name: 'caseStudies',
      title: 'Local case studies',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'caseStudy'}]})],
      description: 'Recent jobs in this suburb.',
    }),
    defineField({
      name: 'nearbySuburbs',
      title: 'Nearby suburbs',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'suburb'}]})],
    }),
    defineField({
      name: 'localQuoteCTA',
      title: 'Local quote CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
          validation: (rule) => rule.required().max(60).custom(noEmDashString),
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (rule) =>
            rule.required().uri({scheme: ['http', 'https'], allowRelative: true}),
        }),
      ],
    }),
    defineField({
      name: 'serviceArea',
      title: 'Service area (geo)',
      type: 'geopoint',
      description: 'Optional. Used for map embeds and proximity calculations.',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      validation: (rule) => rule.max(70).custom(noEmDashString),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(180).custom(noEmDashString),
    }),
  ],
  preview: {
    select: {title: 'name', ring: 'ring', media: 'heroImage'},
    prepare({
      title,
      ring,
      media,
    }: {
      title?: string
      ring?: number
      media?: unknown
    }) {
      return {
        title: title ?? 'Untitled suburb',
        subtitle: ring ? `Ring ${ring}` : undefined,
        media: media as never,
      }
    },
  },
})
