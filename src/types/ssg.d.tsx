export type BlogIdContext = {
  params: {
    blogId: string,
  },
  locales: string[],
  locale: string,
  defaultLocale: string,
}

export type LocaleOnlyContext = {
  locales: string[],
  locale: string,
  defaultLocale: string,
}
