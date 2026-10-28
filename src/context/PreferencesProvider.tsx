'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  ACCENTS,
  Accent,
  FONT_SIZES,
  FontSize,
  PREFERENCES_STORAGE_KEYS,
} from 'src/constants/preferences'

type TypePreferencesContext = {
  accent: Accent
  fontSize: FontSize
  setAccent: (accent: Accent) => void
  setFontSize: (fontSize: FontSize) => void
}

const PreferencesContext = createContext<TypePreferencesContext>(null)

const persist = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value)
  } catch (error) {
    // Storage can be unavailable (private mode); preferences stay in memory
  }
}

const PreferencesProvider = ({ children }: { children: React.ReactNode }) => {
  const [accent, setAccentState] = useState<Accent>('sky')
  const [fontSize, setFontSizeState] = useState<FontSize>('md')

  useEffect(() => {
    const { dataset } = document.documentElement

    if (ACCENTS.includes(dataset.accent as Accent)) {
      setAccentState(dataset.accent as Accent)
    }

    if (FONT_SIZES.includes(dataset.fontSize as FontSize)) {
      setFontSizeState(dataset.fontSize as FontSize)
    }
  }, [])

  const setAccent = useCallback((value: Accent) => {
    document.documentElement.dataset.accent = value
    setAccentState(value)
    persist(PREFERENCES_STORAGE_KEYS.accent, value)
  }, [])

  const setFontSize = useCallback((value: FontSize) => {
    document.documentElement.dataset.fontSize = value
    setFontSizeState(value)
    persist(PREFERENCES_STORAGE_KEYS.fontSize, value)
  }, [])

  return (
    <PreferencesContext.Provider
      value={{ accent, fontSize, setAccent, setFontSize }}>
      {children}
    </PreferencesContext.Provider>
  )
}

export default PreferencesProvider
export const usePreferences = () => useContext(PreferencesContext)
