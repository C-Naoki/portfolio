// i18nのjsonを再帰的にフラット化し、カテゴリ・キー・値の配列に変換
export interface FlattenedI18nEntry {
  category: string
  key: string
  value: string
}

export function flattenI18n (obj: any, parentKey = '', category = '', result: FlattenedI18nEntry[] = []): FlattenedI18nEntry[] {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) continue
    const value = obj[key]
    const newKey = parentKey ? `${parentKey}.${key}` : key
    const newCategory = parentKey === '' ? key : category
    if (typeof value === 'object' && value !== null) {
      flattenI18n(value, newKey, newCategory, result)
    } else if (typeof value === 'string') {
      result.push({ category: newCategory, key: newKey, value })
    }
  }
  return result
}
