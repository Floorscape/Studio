import {defineArrayMember, defineField, defineType} from 'sanity'
import {noEmDashString, noEmDashBlocks} from './utils/noEmDash'

/**
 * Singleton: the /garage/fuss-tax reference page. The 10-row escalator table
 * matches Floorscape_Fuss_Tax_UX.md.
 */
export const fussTaxPage = defineType({
  name: 'fussTaxPage',
  title: 'Fuss Tax Page',
  type: 'document',
  // Singleton: editors can update + publish, but cannot create or delete.
  // The __experimental_actions key is still honoured by Studio at runtime
  // even though it's not part of the public typings in v5.
  // @ts-expect-error - __experimental_actions not in DocumentDefinition typings
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero headline',
      type: 'string',
      initialValue: 'The Fuss Tax. Published. So nothing surprises you on the day.',
      validation: (rule) => rule.required().max(140).custom(noEmDashString),
    }),
    defineField({
      name: 'heroSubhead',
      title: 'Hero sub-head',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required().max(400).custom(noEmDashString),
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Primary CTA label',
      type: 'string',
      initialValue: 'Get my fixed price',
      validation: (rule) => rule.required().max(60).custom(noEmDashString),
    }),
    defineField({
      name: 'heroCtaUrl',
      title: 'Primary CTA URL',
      type: 'url',
      initialValue: '/quote',
      validation: (rule) =>
        rule.required().uri({scheme: ['http', 'https'], allowRelative: true}),
    }),
    defineField({
      name: 'escalatorTable',
      title: 'Escalator table',
      type: 'array',
      description: 'Ten rows lifted from the Pricebook.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'escalator',
          fields: [
            defineField({
              name: 'name',
              title: 'Escalator name',
              type: 'string',
              validation: (rule) =>
                rule.required().max(80).custom(noEmDashString),
            }),
            defineField({
              name: 'trigger',
              title: 'Trigger',
              type: 'text',
              rows: 2,
              validation: (rule) =>
                rule.required().max(280).custom(noEmDashString),
            }),
            defineField({
              name: 'surchargeBand',
              title: 'Surcharge band',
              type: 'string',
              description: 'Free-text price impact, e.g. "+$25 to $55 per m²".',
              validation: (rule) =>
                rule.required().max(120).custom(noEmDashString),
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'surchargeBand'},
          },
        }),
      ],
      validation: (rule) => rule.length(10).error('The Fuss Tax table has exactly 10 rows.'),
    }),
    defineField({
      name: 'workedExample',
      title: 'Worked example',
      type: 'blockContent',
      description: 'Fully-priced example with escalators in action.',
      validation: (rule) => rule.required().custom(noEmDashBlocks),
    }),
    defineField({
      name: 'whyWePublish',
      title: 'Why we publish them',
      type: 'blockContent',
      description: 'Four short paragraphs in warm-commanding voice.',
      validation: (rule) => rule.required().custom(noEmDashBlocks),
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      description: 'Five Q&A pairs, schema-marked on the page.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (rule) =>
                rule.required().max(200).custom(noEmDashString),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'blockContent',
              validation: (rule) => rule.required().custom(noEmDashBlocks),
            }),
          ],
          preview: {
            select: {title: 'question'},
          },
        }),
      ],
      validation: (rule) =>
        rule.length(5).error('The Fuss Tax FAQ has exactly 5 questions.'),
    }),
    defineField({
      name: 'cta',
      title: 'Footer CTA',
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
        defineField({
          name: 'secondaryLabel',
          title: 'Secondary label',
          type: 'string',
          validation: (rule) => rule.max(60).custom(noEmDashString),
        }),
        defineField({
          name: 'secondaryUrl',
          title: 'Secondary URL (e.g. Pricebook PDF)',
          type: 'url',
          validation: (rule) =>
            rule.uri({scheme: ['http', 'https'], allowRelative: true}),
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heroHeadline'},
    prepare({title}: {title?: string}) {
      return {title: title ?? 'Fuss Tax page'}
    },
  },
})
