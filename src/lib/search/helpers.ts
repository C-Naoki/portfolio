import type { FlattenedI18nEntry } from '@/lib/utils/flattenI18n'
import type { SearchableEntry } from '@/types/search'

export const getPageSlug = (entry: FlattenedI18nEntry): 'home' | 'publications' | 'blog' => {
  const { category, key } = entry
  if (category.includes('Blog') || category.includes('Book')) return 'blog'
  if (key.startsWith('publications.')) return 'publications'
  return 'home'
}

export const getUrlForEntry = (entry: FlattenedI18nEntry): string => {
  const { category, key } = entry
  if (category.includes('Blog') || category.includes('Book')) return ''
  if (key.startsWith('publications.')) {
    const parts = key.split('.')
    return parts.length > 2 ? `/publications#${parts[2]}` : '/publications'
  }
  if (key.startsWith('home.')) {
    const parts = key.split('.')
    return parts.length > 1 ? `/#${parts[1]}` : '/'
  }
  const page = getPageSlug(entry)
  return page === 'publications' ? '/publications' : page === 'blog' ? '/blog' : '/'
}

export const getEntryPageNameKey = (entry: SearchableEntry): 'blog' | 'book' | 'publications' | 'home' => {
  const { category, key } = entry
  if (category.includes('Blog')) return 'blog'
  if (category.includes('Book')) return 'book'
  if (key.startsWith('publications.')) return 'publications'
  return 'home'
}

export const isExternalUrl = (url?: string): boolean => {
  if (typeof url !== 'string') return false
  return /^https?:\/\//i.test(url)
}

interface LocalizedEntriesOptions {
  jaEntries: FlattenedI18nEntry[]
  enEntries: FlattenedI18nEntry[]
  language: string
}

export const mergeLocalizedEntries = ({ jaEntries, enEntries, language }: LocalizedEntriesOptions): SearchableEntry[] => {
  const map = new Map<string, { ja?: FlattenedI18nEntry, en?: FlattenedI18nEntry }>()

  for (const entry of jaEntries) {
    const stored = map.get(entry.key) ?? {}
    map.set(entry.key, { ...stored, ja: entry })
  }

  for (const entry of enEntries) {
    const stored = map.get(entry.key) ?? {}
    map.set(entry.key, { ...stored, en: entry })
  }

  const merged: SearchableEntry[] = []

  map.forEach(({ ja, en }) => {
    const base = language === 'ja' ? (ja ?? en) : (en ?? ja)
    if (base == null) return

    const jaValue = ja?.value?.trim()
    const enValue = en?.value?.trim()

    const displayValue = language === 'ja'
      ? (jaValue ?? enValue ?? '')
      : (enValue ?? jaValue ?? '')

    const searchText = (language === 'ja'
      ? (jaValue ?? enValue ?? '')
      : (enValue ?? jaValue ?? '')
    ).trim()

    const effectiveSearchText = searchText !== '' ? searchText : displayValue

    merged.push({
      category: base.category,
      key: base.key,
      value: displayValue,
      searchText: effectiveSearchText
    })
  })

  return merged
}
