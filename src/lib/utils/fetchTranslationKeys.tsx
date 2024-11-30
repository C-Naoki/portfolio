import type { i18n } from 'i18next'

const fetchTranslationKeys = (i18n: i18n, root: string): string[] => {
  const translation = i18n.store.data[i18n.language].common as Record<string, string>
  const keys = Object.keys(translation[root])

  return keys
}

export default fetchTranslationKeys
