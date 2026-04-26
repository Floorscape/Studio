import {defineArrayMember, defineField, defineType} from 'sanity'
import {noEmDashString, noEmDashBlocks} from './utils/noEmDash'

const FINISH_TYPES = [
  {title: 'Flake', value: 'flake'},
  {title: 'Metallic', value: 'metallic'},
  {title: '3D', value: '3d'},
  {title: 'Polyaspartic', value: 'polyaspartic'},
  {title: 'Polished', value: 'polished'},
] as const

/**
 * A delivered job. Auto-populated nightly from ServiceM8.
 */
export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(140).custom(noEmDashString),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'suburb',
      title: 'Suburb',
      type: 'reference',
      to: [{type: 'suburb'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          {title: 'Tier 1 - Home Instant Quote', value: 'tier-1'},
          {title: 'Tier 3 - Expert engagement', value: 'tier-3'},
          {title: 'Tier 4 - Premium commercial', value: 'tier-4'},
          {title: 'Tier 5 - Trade supply', value: 'tier-5'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'finishType',
      title: 'Finish type',
      type: 'string',
      options: {list: [...FINISH_TYPES], layout: 'dropdown'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'afterImage',
      title: 'After image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
              validation: (rule) => rule.max(180).custom(noEmDashString),
            }),
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (rule) => rule.max(180).custom(noEmDashString),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'brief',
      title: 'Brief',
      type: 'blockContent',
      description: 'Challenge, approach, outcome.',
      validation: (rule) => rule.required().custom(noEmDashBlocks),
    }),
    defineField({
      name: 'customerQuote',
      title: 'Customer quote',
      type: 'blockContent',
      description: 'Optional. Customer testimonial inline with the case study.',
      validation: (rule) => rule.custom(noEmDashBlocks),
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'projectValue',
      title: 'Project value (range)',
      type: 'string',
      description: 'Optional, e.g. "$8k-$12k". Free text so editors can stay vague.',
      validation: (rule) => rule.max(40).custom(noEmDashString),
    }),
    defineField({
      name: 'warrantyYears',
      title: 'Warranty (years)',
      type: 'number',
      validation: (rule) => rule.min(0).max(25).integer(),
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
    select: {
      title: 'title',
      tier: 'tier',
      finish: 'finishType',
      media: 'afterImage',
    },
    prepare({
      title,
      tier,
      finish,
      media,
    }: {
      title?: string
      tier?: string
      finish?: string
      media?: unknown
    }) {
      const parts = [tier, finish].filter(Boolean) as string[]
      return {
        title: title ?? 'Untitled case study',
        subtitle: parts.join(' / ') || undefined,
        media: media as never,
      }
    },
  },
})
