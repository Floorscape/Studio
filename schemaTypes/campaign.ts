import {defineField, defineType} from 'sanity'
import {noEmDashString, noEmDashBlocks} from './utils/noEmDash'

/**
 * Paid-channel campaign landing page. Drives /c/[slug] routes.
 */
export const campaign = defineType({
  name: 'campaign',
  title: 'Campaign',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Campaign name',
      type: 'string',
      description: 'Internal-facing name, e.g. "Ring 3 newbuild 2026 Q2".',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paidChannelHook',
      title: 'Paid-channel hook',
      type: 'string',
      description: 'Short headline used in the ad creative and on the page H1.',
      validation: (rule) => rule.required().max(120).custom(noEmDashString),
    }),
    defineField({
      name: 'copy',
      title: 'Page copy',
      type: 'blockContent',
      validation: (rule) => rule.required().custom(noEmDashBlocks),
    }),
    defineField({
      name: 'targetTier',
      title: 'Target tier',
      type: 'string',
      options: {
        list: [
          {title: 'Tier 1 - Home Instant Quote', value: 'tier-1'},
          {title: 'Tier 3 - Expert engagement', value: 'tier-3'},
          {title: 'Tier 4 - Premium commercial', value: 'tier-4'},
          {title: 'Tier 5 - Trade supply', value: 'tier-5'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'expiryDate',
      title: 'Expiry date',
      type: 'datetime',
      description: 'After this date the page redirects to home.',
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
    defineField({
      name: 'noindex',
      title: 'No-index this page',
      type: 'boolean',
      description: 'Set true to keep search engines off the campaign page.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      tier: 'targetTier',
      media: 'heroImage',
      expiry: 'expiryDate',
    },
    prepare({
      title,
      tier,
      media,
      expiry,
    }: {
      title?: string
      tier?: string
      media?: unknown
      expiry?: string
    }) {
      const parts: string[] = []
      if (tier) parts.push(tier)
      if (expiry) parts.push(`expires ${new Date(expiry).toLocaleDateString()}`)
      return {
        title: title ?? 'Untitled campaign',
        subtitle: parts.join(' / ') || undefined,
        media: media as never,
      }
    },
  },
})
