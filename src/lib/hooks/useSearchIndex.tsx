import { useCallback, useEffect, useMemo, useState } from 'react'

import { useTranslation } from 'next-i18next'

import enCommon from '../../../public/locales/en/common.json'
import jaCommon from '../../../public/locales/ja/common.json'

import type { Book, QiitaArticle, ZennArticle } from '@/types/blog.d'
import type { SearchableEntry } from '@/types/search'

import { getUrlForEntry, mergeLocalizedEntries } from '@/lib/search/helpers'
import { flattenI18n } from '@/lib/utils/flattenI18n'

interface UseSearchIndexResult {
  entries: SearchableEntry[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export const useSearchIndex = (): UseSearchIndexResult => {
  const { i18n } = useTranslation()
  const [remoteEntries, setRemoteEntries] = useState<SearchableEntry[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const buildRemoteEntries = useCallback(
    ({
      zennArticles = [],
      qiitaArticles = [],
      zennBooks = []
    }: {
      zennArticles?: ZennArticle[]
      qiitaArticles?: QiitaArticle[]
      zennBooks?: Book[]
    }): SearchableEntry[] => {
      const articleEntries: SearchableEntry[] = (zennArticles ?? [])
        .filter((article) => typeof article?.title === 'string' && article.title.trim() !== '')
        .map((article) => ({
          category: 'Blog',
          key: `zenn.${article.id}.title`,
          value: article.title,
          url: `https://zenn.dev${article.path ?? ''}`,
          searchText: article.title
        }))

      const qiitaEntries: SearchableEntry[] = (qiitaArticles ?? [])
        .filter((article) => typeof article?.title === 'string' && article.title.trim() !== '')
        .map((article) => ({
          category: 'Blog',
          key: `qiita.${article.id}.title`,
          value: article.title,
          url: article.url,
          searchText: article.title
        }))

      const bookEntries: SearchableEntry[] = (zennBooks ?? [])
        .filter((book) => typeof book?.title === 'string' && book.title.trim() !== '')
        .map((book) => ({
          category: 'Book',
          key: `book.${book.id}.title`,
          value: book.title,
          url: `https://zenn.dev${book.path ?? ''}`,
          searchText: book.title
        }))

      return [...articleEntries, ...qiitaEntries, ...bookEntries]
    },
    []
  )

  const fetchRemoteEntries = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [zennRes, qiitaRes] = await Promise.all([fetch('/api/zenn'), fetch('/api/qiita')])

      if (!zennRes.ok) {
        throw new Error(`Zenn API error: ${zennRes.status}`)
      }
      if (!qiitaRes.ok) {
        throw new Error(`Qiita API error: ${qiitaRes.status}`)
      }

      const { zennArticles = [], zennBooks = [] }: { zennArticles?: ZennArticle[], zennBooks?: Book[] } = await zennRes.json()
      const { qiitaArticles = [] }: { qiitaArticles?: QiitaArticle[] } = await qiitaRes.json()

      setRemoteEntries(buildRemoteEntries({ zennArticles, qiitaArticles, zennBooks }))
    } catch (err) {
      setRemoteEntries([])
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [buildRemoteEntries])

  useEffect(() => {
    void fetchRemoteEntries()
  }, [fetchRemoteEntries])

  const jaEntries = useMemo(() => flattenI18n(jaCommon), [])
  const enEntries = useMemo(() => flattenI18n(enCommon), [])

  const i18nEntries = useMemo(() => {
    return mergeLocalizedEntries({
      jaEntries,
      enEntries,
      language: i18n.language
    }).map<SearchableEntry>((entry) => ({
      ...entry,
      url: getUrlForEntry(entry)
    }))
  }, [enEntries, i18n.language, jaEntries])

  const entries = useMemo(() => [...i18nEntries, ...remoteEntries], [i18nEntries, remoteEntries])

  return {
    entries,
    loading,
    error,
    refresh: fetchRemoteEntries
  }
}
