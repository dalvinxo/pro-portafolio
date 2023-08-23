import translate, {
  typeEsTranslate,
  typeEnTranslate,
} from 'src/constants/translate.config'

const dictionaries = {
  en: () => translate['en'],
  es: () => translate['es'],
}

export const getDictionary = (locale): typeEnTranslate | typeEsTranslate =>
  dictionaries[locale]()
