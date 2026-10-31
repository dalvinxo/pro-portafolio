export type Thought = {
  id: number
  text: string
  /** Who said it, for quotes ending in `- Author`. */
  author: string | null
  /** Words before an attributed quote, e.g. `The phrase that drives me is:`. */
  lead: string | null
}

const QUOTE_MARKS = /^[\s"'“”‘’«»]+|[\s"'“”‘’«»]+$/g
const OPENING_QUOTE = /["“«]/
// `…”. - Author` or `…."-Author`
const ATTRIBUTION = /^([\s\S]*["”»])\s*\.?\s*[-–—]\s*([^"“”«»\-–—]{2,80})$/

const stripQuotes = (value: string) => value.replace(QUOTE_MARKS, '')

/** Splits a free-text entry into its text, author and lead-in. */
export const toThought = (id: number, raw: string): Thought => {
  const text = raw.trim()
  const attribution = text.match(ATTRIBUTION)

  if (!attribution) {
    return { id, text: stripQuotes(text), author: null, lead: null }
  }

  const [, quote, author] = attribution
  const openingAt = quote.search(OPENING_QUOTE)
  const lead = openingAt > 0 ? quote.slice(0, openingAt).trim() : ''

  return {
    id,
    text: stripQuotes(lead ? quote.slice(openingAt) : quote),
    author: author.trim(),
    lead: lead || null,
  }
}

export type ThoughtKind = 'welcome' | 'thought' | 'quote'

export type ClassifiedThought = Thought & { kind: ThoughtKind }

// Accepted values for the optional `Category` select in Notion
const CATEGORY_KINDS: Record<string, ThoughtKind> = {
  welcome: 'welcome',
  bienvenida: 'welcome',
  thought: 'thought',
  pensamiento: 'thought',
  quote: 'quote',
  frase: 'quote',
  cita: 'quote',
}

const normalize = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

/**
 * Decides how each entry is shown. When any entry has a Notion category,
 * categories rule; otherwise the first entry is the welcome and attributed
 * quotes are featured.
 */
export const classifyThoughts = (
  entries: Array<{ thought: Thought; category: string | null }>
): ClassifiedThought[] => {
  const hasCategories = entries.some(({ category }) => category)

  return entries.map(({ thought, category }, index) => {
    const fallback: ThoughtKind = thought.author ? 'quote' : 'thought'

    if (hasCategories) {
      return {
        ...thought,
        kind: (category && CATEGORY_KINDS[normalize(category)]) || fallback,
      }
    }

    return { ...thought, kind: index === 0 ? 'welcome' : fallback }
  })
}
