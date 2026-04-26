import {defineField, defineType} from 'sanity'
import {noEmDashString} from './utils/noEmDash'

/**
 * Postcode-level service area. Used to gate quote eligibility on the website
 * and to compute travel surcharges.
 */
export const serviceArea = defineType({
  name: 'serviceArea',
  title: 'Service Area',
  type: 'document',
  fields: [
    defineField({
      name: 'postcode',
      title: 'Postcode',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .regex(/^\d{4}$/, {name: 'postcode (4 digits)'})
          .custom(noEmDashString),
    }),
    defineField({
      name: 'suburbName',
      title: 'Suburb name',
      type: 'string',
      validation: (rule) => rule.required().max(120).custom(noEmDashString),
    }),
    defineField({
      name: 'ring',
      title: 'Ring',
      type: 'number',
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
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'If false, the website refuses quotes for this postcode.',
      initialValue: true,
    }),
    defineField({
      name: 'travelSurcharge',
      title: 'Travel surcharge ($)',
      type: 'number',
      description: 'Flat travel surcharge in dollars added to quotes for this postcode.',
      initialValue: 0,
      validation: (rule) => rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'suburbName',
      postcode: 'postcode',
      ring: 'ring',
      active: 'active',
    },
    prepare({
      title,
      postcode,
      ring,
      active,
    }: {
      title?: string
      postcode?: string
      ring?: number
      active?: boolean
    }) {
      const parts = [
        postcode,
        ring ? `Ring ${ring}` : null,
        active === false ? 'inactive' : null,
      ].filter(Boolean) as string[]
      return {
        title: title ?? 'Service area',
        subtitle: parts.join(' / ') || undefined,
      }
    },
  },
})
