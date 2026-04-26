import type {PortableTextBlock, PortableTextSpan} from 'sanity'

/**
 * Floorscape brand rule: never use em-dashes (U+2014) anywhere.
 * Surfaces a clear validation error so editors can fix it on save.
 *
 * Usage:
 *   validation: (rule) => rule.required().custom(noEmDashString)
 *   validation: (rule) => rule.custom(noEmDashBlocks)
 */
export const NO_EM_DASH_MESSAGE =
  'Em-dashes not allowed - use a hyphen, comma, or rewrite.'

const EM_DASH = '—'

/** Custom validator for `string` and `text` fields. */
export const noEmDashString = (
  value: string | undefined,
): true | string => {
  if (typeof value !== 'string') return true
  return value.includes(EM_DASH) ? NO_EM_DASH_MESSAGE : true
}

/** Custom validator for Portable Text block arrays (`blockContent`). */
export const noEmDashBlocks = (
  blocks: PortableTextBlock[] | undefined,
): true | string => {
  if (!Array.isArray(blocks)) return true
  for (const block of blocks) {
    if (!block || block._type !== 'block') continue
    const children = (block as PortableTextBlock).children
    if (!Array.isArray(children)) continue
    for (const child of children) {
      if (
        child &&
        (child as PortableTextSpan)._type === 'span' &&
        typeof (child as PortableTextSpan).text === 'string' &&
        (child as PortableTextSpan).text.includes(EM_DASH)
      ) {
        return NO_EM_DASH_MESSAGE
      }
    }
  }
  return true
}
