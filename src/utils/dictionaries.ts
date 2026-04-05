import translate, {
  Locales,
  typeEsTranslate,
  typeEnTranslate,
} from 'src/constants/translate.config'

const dictionaries: Record<Locales, () => typeEnTranslate | typeEsTranslate> = {
  en: () => translate['en'],
  es: () => translate['es'],
}

export const getDictionary = (
  locale: Locales
): typeEnTranslate | typeEsTranslate =>
  dictionaries[locale]()
