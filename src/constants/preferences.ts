export const ACCENTS = ['sky', 'violet', 'emerald', 'rose', 'amber'] as const
export const FONT_SIZES = ['md', 'lg', 'xl'] as const

export type Accent = (typeof ACCENTS)[number]
export type FontSize = (typeof FONT_SIZES)[number]

export const PREFERENCES_STORAGE_KEYS = {
  accent: 'accent',
  fontSize: 'font-size',
} as const

/**
 * Inline script that applies stored preferences before the first paint,
 * avoiding a flash of the default accent / font size.
 * Only whitelisted values are applied.
 */
export const preferencesScript = `(function(){try{var d=document.documentElement;var a=localStorage.getItem('${
  PREFERENCES_STORAGE_KEYS.accent
}');var f=localStorage.getItem('${
  PREFERENCES_STORAGE_KEYS.fontSize
}');if(${JSON.stringify(
  ACCENTS
)}.indexOf(a)>-1)d.setAttribute('data-accent',a);if(${JSON.stringify(
  FONT_SIZES
)}.indexOf(f)>-1)d.setAttribute('data-font-size',f);}catch(e){}})()`
