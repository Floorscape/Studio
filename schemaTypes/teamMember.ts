import {defineArrayMember, defineField, defineType} from 'sanity'
import {noEmDashString, noEmDashBlocks} from './utils/noEmDash'

/**
 * Team member. Bill, Charlene, Cy, Dave, plus crew.
 */
export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required().max(120).custom(noEmDashString),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      validation: (rule) => rule.required().max(120).custom(noEmDashString),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'blockContent',
      validation: (rule) => rule.custom(noEmDashBlocks),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'credentials',
      title: 'Credentials',
      type: 'array',
      description:
        'Patents, awards, qualifications, longevity claims. For Bill: EP0683121, US5758760, AU702719, "25 years on Melbourne floors", builder warm list.',
      of: [
        defineArrayMember({
          type: 'string',
          validation: (rule) => rule.custom(noEmDashString),
        }),
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      description: 'Lower numbers render first.',
      initialValue: 100,
      validation: (rule) => rule.integer(),
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'portrait'},
  },
})
