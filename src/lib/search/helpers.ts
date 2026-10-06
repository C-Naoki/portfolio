import type { FlattenedI18nEntry } from '@/lib/utils/flattenI18n'
import type { SearchableEntry } from '@/types/search'

type PageSlug = 'home' | 'about' | 'publications' | 'blog'
type PageNameKey = PageSlug | 'book'

const aboutSectionPrefixes = [
  'affiliation',
  'education',
  'experiences',
  'awards',
  'grants',
  'fellowships',
  'misc'
]

const getAboutSectionId = (key: string): string | null => {
  if (key === 'profile-text' || key === 'cv' || key.startsWith('biography.')) return 'biography'

  for (const prefix of aboutSectionPrefixes) {
    if (key.startsWith(`${prefix}.`)) return prefix
  }

  return null
}

export const getPageSlug = (entry: FlattenedI18nEntry): PageSlug => {
  const { category, key } = entry
  const normalizedCategory = category.toLowerCase()
  if (normalizedCategory.includes('blog') || normalizedCategory.includes('book')) return 'blog'
  if (key.startsWith('publications.')) return 'publications'
  if (key.startsWith('about.') || getAboutSectionId(key) !== null) return 'about'
  return 'home'
}

export const getUrlForEntry = (entry: FlattenedI18nEntry): string => {
  const { category, key } = entry
  const normalizedCategory = category.toLowerCase()
  if (normalizedCategory.includes('blog') || normalizedCategory.includes('book')) return ''
  if (key.startsWith('publications.')) {
    const parts = key.split('.')
    return parts.length > 2 ? `/publications#${parts[2]}` : '/publications'
  }
  if (key.startsWith('about.')) return '/about'
  const aboutSectionId = getAboutSectionId(key)
  if (aboutSectionId !== null) return `/about#${aboutSectionId}`
  if (key.startsWith('home.')) {
    const parts = key.split('.')
    return parts.length > 1 ? `/#${parts[1]}` : '/'
  }
  const page = getPageSlug(entry)
  return page === 'publications' ? '/publications' : page === 'blog' ? '/blog' : page === 'about' ? '/about' : '/'
}

export const getEntryPageNameKey = (entry: SearchableEntry): PageNameKey => {
  const { category, key } = entry
  const normalizedCategory = category.toLowerCase()
  if (normalizedCategory.includes('blog')) return 'blog'
  if (normalizedCategory.includes('book')) return 'book'
  if (key.startsWith('publications.')) return 'publications'
  if (key.startsWith('about.') || getAboutSectionId(key) !== null) return 'about'
  return 'home'
}

export const isExternalUrl = (url?: string): boolean => {
  if (typeof url !== 'string') return false
  return /^https?:\/\//i.test(url)
}

const stripI18nMarkup = (value: string): string =>
  value.replace(/<([\w-]+)[^>]*>(.*?)<\/\1>/g, '$2').replace(/<[^>]+>/g, '')

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

    const displayValue = stripI18nMarkup(language === 'ja'
      ? (jaValue ?? enValue ?? '')
      : (enValue ?? jaValue ?? '')
    )

    const searchText = stripI18nMarkup(language === 'ja'
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
