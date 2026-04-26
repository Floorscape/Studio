import {defineField, defineType} from 'sanity'
import {noEmDashString, noEmDashBlocks} from './utils/noEmDash'

/**
 * Singleton: global site settings. Editors update one document; create/delete
 * is disabled via __experimental_actions.
 */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton: editors can update + publish, but cannot create or delete.
  // The __experimental_actions key is still honoured by Studio at runtime
  // even though it's not part of the public typings in v5.
  // @ts-expect-error - __experimental_actions not in DocumentDefinition typings
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      validation: (rule) => rule.required().max(80).custom(noEmDashString),
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(280).custom(noEmDashString),
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default OG image',
      type: 'image',
      options: {hotspot: true},
      description: 'Fallback Open Graph image used when a page has none of its own.',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact phone',
      type: 'string',
      validation: (rule) => rule.required().custom(noEmDashString),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      validation: (rule) => rule.required().email().custom(noEmDashString),
    }),
    defineField({
      name: 'abn',
      title: 'ABN',
      type: 'string',
      validation: (rule) => rule.custom(noEmDashString),
    }),
    defineField({
      name: 'acn',
      title: 'ACN',
      type: 'string',
      validation: (rule) => rule.custom(noEmDashString),
    }),
    defineField({
      name: 'gbpProfileUrl',
      title: 'Google Business Profile URL',
      type: 'url',
      description: 'Public Google Business Profile link used in footer and schema.org markup.',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'object',
      fields: [
        defineField({name: 'instagram', title: 'Instagram URL', type: 'url'}),
        defineField({name: 'facebook', title: 'Facebook URL', type: 'url'}),
        defineField({name: 'youtube', title: 'YouTube URL', type: 'url'}),
        defineField({name: 'tiktok', title: 'TikTok URL', type: 'url'}),
        defineField({name: 'linkedin', title: 'LinkedIn URL', type: 'url'}),
      ],
    }),
    defineField({
      name: 'footerDisclaimer',
      title: 'Footer disclaimer',
      type: 'blockContent',
      description: 'Legal / company info shown at the foot of every page.',
      validation: (rule) => rule.custom(noEmDashBlocks),
    }),
  ],
  preview: {
    select: {title: 'siteTitle'},
    prepare({title}: {title?: string}) {
      return {title: title ?? 'Site Settings'}
    },
  },
})
