import type { FlattenedI18nEntry } from '@/lib/utils/flattenI18n'

export interface SearchableEntry extends FlattenedI18nEntry {
  url?: string
  searchText?: string
}
