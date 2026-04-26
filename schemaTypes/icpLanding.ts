import {defineArrayMember, defineField, defineType} from 'sanity'
import {noEmDashString, noEmDashBlocks} from './utils/noEmDash'

/**
 * ICP (Ideal Customer Profile) landing page. Nine variants at launch.
 * The icp slug values mirror website-scope/integration.md.
 */
export const icpLanding = defineType({
  name: 'icpLanding',
  title: 'ICP Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'icp',
      title: 'ICP slug',
      type: 'string',
      options: {
        list: [
          {title: 'Inner east homeowner (Camberwell, Hawthorn, Kew, Balwyn, Doncaster)', value: 'inner-east-homeowner'},
          {title: 'New build SE corridor (Clyde, Officer, Pakenham)', value: 'new-build-corridor'},
          {title: 'Premium lifestyle / showroom (car collectors)', value: 'premium-lifestyle-showroom'},
          {title: 'DIY rescue (failed kits)', value: 'diy-rescue'},
          {title: 'Fitout builder', value: 'fitout-builder'},
          {title: 'Architect / specifier', value: 'architect'},
          {title: 'Forensic report buyer', value: 'forensic-report'},
          {title: 'Recoat B2B (existing customer refresh)', value: 'recoat-b2b'},
          {title: 'Trade outsource', value: 'trade-outsource'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'icp', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'audienceDescription',
      title: 'Audience description',
      type: 'text',
      rows: 3,
      description: 'One-paragraph summary of who this page is for.',
      validation: (rule) => rule.required().max(400).custom(noEmDashString),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'trustSignals',
      title: 'Trust signals',
      type: 'array',
      description: 'Awards, accreditations, customer counts, patents, etc.',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (rule) => rule.custom(noEmDashString),
        }),
      ],
    }),
    defineField({
      name: 'valueProps',
      title: 'Value props',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'valueProp',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) =>
                rule.required().max(80).custom(noEmDashString),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 3,
              validation: (rule) =>
                rule.required().max(400).custom(noEmDashString),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'body'},
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'conversionTarget',
      title: 'Conversion target',
      type: 'object',
      description: 'Where the primary CTA points (typically a tier page).',
      fields: [
        defineField({
          name: 'label',
          title: 'CTA label',
          type: 'string',
          validation: (rule) => rule.required().max(60).custom(noEmDashString),
        }),
        defineField({
          name: 'url',
          title: 'CTA URL',
          type: 'url',
          validation: (rule) =>
            rule.required().uri({scheme: ['http', 'https'], allowRelative: true}),
        }),
      ],
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
    // Optional: long-form qualification copy.
    defineField({
      name: 'qualification',
      title: 'Qualification copy',
      type: 'blockContent',
      description: 'Optional "Are you the right fit?" section.',
      validation: (rule) => rule.custom(noEmDashBlocks),
    }),
  ],
  preview: {
    select: {title: 'icp', media: 'heroImage'},
    prepare({title, media}: {title?: string; media?: unknown}) {
      return {
        title: title ? `ICP: ${title}` : 'ICP landing page',
        media: media as never,
      }
    },
  },
})
