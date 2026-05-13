// i18nのjsonを再帰的にフラット化し、カテゴリ・キー・値の配列に変換
export interface FlattenedI18nEntry {
  category: string
  key: string
  value: string
}

type I18nContainer = Record<string, unknown> | unknown[]

const isI18nContainer = (value: unknown): value is I18nContainer => {
  return typeof value === 'object' && value !== null
}

export function flattenI18n (obj: I18nContainer, parentKey = '', category = '', result: FlattenedI18nEntry[] = []): FlattenedI18nEntry[] {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = parentKey !== '' ? `${parentKey}.${key}` : key
    const newCategory = parentKey === '' ? key : category
    if (isI18nContainer(value)) {
      flattenI18n(value, newKey, newCategory, result)
    } else if (typeof value === 'string') {
      result.push({ category: newCategory, key: newKey, value })
    }
  }
  return result
}
