import {defineArrayMember, defineField, defineType} from 'sanity'
import {noEmDashString, noEmDashBlocks} from './utils/noEmDash'

/**
 * Problem-led landing page. Four docs at launch:
 * DIY epoxy peeling, garage floor moisture, garage floor cracks, general failures.
 * Drives /help/[slug] routes.
 */
export const problem = defineType({
  name: 'problem',
  title: 'Problem',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Problem name',
      type: 'string',
      validation: (rule) => rule.required().max(120).custom(noEmDashString),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'description',
      title: 'Problem description',
      type: 'blockContent',
      validation: (rule) => rule.required().custom(noEmDashBlocks),
    }),
    defineField({
      name: 'diagnosticIndicators',
      title: 'Diagnostic indicators',
      type: 'array',
      description: 'How a customer can tell this is what they have.',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (rule) => rule.custom(noEmDashString),
        }),
      ],
    }),
    defineField({
      name: 'recommendedTier',
      title: 'Recommended tier',
      type: 'string',
      options: {
        list: [
          {title: 'Tier 3 - Expert engagement', value: 'tier-3'},
          {title: 'Tier 4 - Premium commercial', value: 'tier-4'},
          {title: 'DIY rescue', value: 'diy-rescue'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relatedSuburbs',
      title: 'Related suburbs',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'suburb'}]})],
    }),
    defineField({
      name: 'relatedCaseStudies',
      title: 'Related case studies',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'caseStudy'}]})],
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
    select: {title: 'name', tier: 'recommendedTier', media: 'heroImage'},
    prepare({title, tier, media}: {title?: string; tier?: string; media?: unknown}) {
      return {
        title: title ?? 'Untitled problem',
        subtitle: tier ? `Recommended: ${tier}` : undefined,
        media: media as never,
      }
    },
  },
})
