const containsJapanese = (text: string): boolean => {
  const japaneseRegex = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF]/
  return japaneseRegex.test(text)
}

export default containsJapanese
