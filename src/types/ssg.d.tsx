export interface BlogIdContext {
  params: {
    blogId: string
  }
  locales: string[]
  locale: string
  defaultLocale: string
}

export interface LocaleOnlyContext {
  locales: string[]
  locale: string
  defaultLocale: string
}
