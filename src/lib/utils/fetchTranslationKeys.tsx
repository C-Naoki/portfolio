import type { i18n } from 'i18next'

const fetchTranslationKeys = (i18n: i18n, root: string): string[] => {
  const translation = i18n.store.data[i18n.language].common as Record<string, any>

  const target = root !== '' ? root.split('.').reduce((acc, key) => acc?.[key], translation) : translation

  if (typeof target === 'object' && target !== null) {
    return Object.keys(target)
  }

  return []
}

export default fetchTranslationKeys
