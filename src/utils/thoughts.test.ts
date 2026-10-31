import { describe, expect, it } from 'vitest'
import { classifyThoughts, toThought } from './thoughts'

describe('toThought', () => {
  it('keeps plain sentences untouched', () => {
    expect(
      toThought(1, 'Welcome to my portfolio, I am very excited, great!')
    ).toEqual({
      id: 1,
      text: 'Welcome to my portfolio, I am very excited, great!',
      author: null,
      lead: null,
    })
  })

  it('strips mixed quote marks and keeps the final period', () => {
    expect(
      toThought(
        2,
        '"Soy un entusiasta de la programación, siempre dispuesto a aprender.”'
      )
    ).toMatchObject({
      text: 'Soy un entusiasta de la programación, siempre dispuesto a aprender.',
      author: null,
    })
  })

  it('extracts the author of a cited quote', () => {
    expect(
      toThought(
        4,
        '“Nuestra recompensa está en el esfuerzo y no en el resultado. Un esfuerzo total es una victoria completa". - Mahatma Gandhi'
      )
    ).toEqual({
      id: 4,
      text: 'Nuestra recompensa está en el esfuerzo y no en el resultado. Un esfuerzo total es una victoria completa',
      author: 'Mahatma Gandhi',
      lead: null,
    })
  })

  it('separates the lead-in from an attributed quote', () => {
    expect(
      toThought(
        5,
        'The phrase that drives my life is: "Our reward is in the effort and not in the result."-Mahatma Gandhi'
      )
    ).toEqual({
      id: 5,
      text: 'Our reward is in the effort and not in the result.',
      author: 'Mahatma Gandhi',
      lead: 'The phrase that drives my life is:',
    })
  })

  it('does not treat hyphens inside a sentence as an author', () => {
    expect(toThought(6, 'Aprender - y enseñar - siempre')).toMatchObject({
      text: 'Aprender - y enseñar - siempre',
      author: null,
    })
  })
})

describe('classifyThoughts', () => {
  const plain = (id: number) => toThought(id, `Thought ${id}`)
  const cited = (id: number) => toThought(id, `"Quote ${id}" - Someone`)

  it('uses position and attribution when there are no categories', () => {
    const kinds = classifyThoughts([
      { thought: plain(1), category: null },
      { thought: plain(2), category: null },
      { thought: cited(3), category: null },
    ]).map((thought) => thought.kind)

    expect(kinds).toEqual(['welcome', 'thought', 'quote'])
  })

  it('follows Notion categories in English or Spanish', () => {
    const kinds = classifyThoughts([
      { thought: plain(1), category: 'Pensamiento' },
      { thought: plain(2), category: 'Bienvenida' },
      { thought: plain(3), category: 'Frase' },
      { thought: plain(4), category: 'QUOTE' },
    ]).map((thought) => thought.kind)

    expect(kinds).toEqual(['thought', 'welcome', 'quote', 'quote'])
  })

  it('does not force a welcome when categories are in use', () => {
    const kinds = classifyThoughts([
      { thought: plain(1), category: null },
      { thought: cited(2), category: null },
      { thought: plain(3), category: 'Thought' },
    ]).map((thought) => thought.kind)

    expect(kinds).toEqual(['thought', 'quote', 'thought'])
  })
})
