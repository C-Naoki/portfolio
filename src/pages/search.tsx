import { useMemo, useState } from 'react'

import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import enCommon from '../../public/locales/en/common.json'
import jaCommon from '../../public/locales/ja/common.json'

import type { Book, QiitaArticle, ZennArticle } from '@/types/blog.d'
import type { SearchableEntry } from '@/types/search'
import type { GetServerSideProps } from 'next'

import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import SearchResultItem from '@/components/Search/SearchResultItem'
import { getUrlForEntry, mergeLocalizedEntries } from '@/lib/search/helpers'
import { flattenI18n } from '@/lib/utils/flattenI18n'

interface SearchProps {
  articles: Array<[ZennArticle | null, QiitaArticle | null]>
  books: Book[]
}

export default function Search ({ articles, books }: SearchProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const initialQuery = typeof router.query.q === 'string' ? router.query.q : ''
  const [inputValue, setInputValue] = useState(initialQuery)
  const [query, setQuery] = useState(initialQuery)
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [wordMatch, setWordMatch] = useState(false)

  const blogEntries: SearchableEntry[] = articles.flatMap(([zenn, qiita]) => {
    const entries: SearchableEntry[] = []
    if (zenn?.title != null && zenn.title.trim() !== '') {
      entries.push({
        category: 'Blog',
        key: `zenn.${zenn.id}.title`,
        value: zenn.title,
        url: `https://zenn.dev${zenn.path}`,
        searchText: zenn.title
      })
    }
    if (qiita?.title?.trim() !== '') {
      const title = qiita?.title ?? ''
      entries.push({
        category: 'Blog',
        key: `qiita.${qiita?.id}.title`,
        value: title,
        url: qiita?.url ?? '',
        searchText: title
      })
    }
    return entries
  })
  const bookEntries: SearchableEntry[] = books.map(book => ({
    category: 'Book',
    key: `book.${book.id}.title`,
    value: book.title,
    url: `https://zenn.dev${book.path}`,
    searchText: book.title
  }))

  const currentLanguage = i18n.language
  const jaEntries = useMemo(() => flattenI18n(jaCommon), [])
  const enEntries = useMemo(() => flattenI18n(enCommon), [])
  const i18nEntries = useMemo(() => {
    return mergeLocalizedEntries({
      jaEntries,
      enEntries,
      language: currentLanguage
    }).map(entry => ({
      ...entry,
      url: getUrlForEntry(entry)
    }))
  }, [currentLanguage, enEntries, jaEntries])

  const allEntries: SearchableEntry[] = [...i18nEntries, ...blogEntries, ...bookEntries]

  const filteredEntries = query.trim() === ''
    ? []
    : allEntries.filter(entry => {
      const target = entry.searchText ?? entry.value ?? ''
      const text = caseSensitive ? target : target.toLowerCase()
      const q = caseSensitive ? query : query.toLowerCase()
      if (wordMatch) {
        return new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(text)
      } else {
        return text.includes(q)
      }
    })

  return (
    <Layout title={t('search.heading', 'Search')}>
      <Section id="search-bar" title={t('search.search', 'Search')}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8, marginTop: '22px', marginBottom: '8px' }}>
          <input
            type="text"
            placeholder={t('search.placeholder', 'Enter keywords')}
            value={inputValue}
            onChange={e => { setInputValue(e.target.value) }}
            onKeyDown={e => {
              const nativeEvent = e.nativeEvent as KeyboardEvent & { isComposing?: boolean }
              if (nativeEvent.isComposing || nativeEvent.keyCode === 229) {
                return
              }
              if (e.key === 'Enter') {
                setQuery(inputValue)
                const newQuery = inputValue.trim() === '' ? {} : { q: inputValue }
                void router.replace({ pathname: router.pathname, query: newQuery }, undefined, { shallow: true })
              }
            }}
            style={{
              width: '100%',
              padding: '10px 16px',
              paddingRight: '80px',
              fontSize: '1rem',
              border: '1px solid var(--input-border-color)',
              borderRadius: '24px',
              outline: 'none',
              transition: 'border-color 0.2s',
              backgroundColor: 'var(--container-color)',
              color: 'var(--text-color)'
            }}
            autoFocus
          />
          <div style={{ position: 'absolute', right: '12px', display: 'flex', gap: '4px' }}>
            <button
              type="button"
              aria-label="Toggle case sensitive search"
              onClick={() => { setCaseSensitive(v => !v) }}
              style={{
                padding: '6px',
                border: 'none',
                background: caseSensitive ? 'var(--input-border-color)' : 'transparent',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-color)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4v16"/><path d="M10 4v16"/><path d="M14 9h4"/><path d="M14 15h4"/><path d="M10 9H6"/></svg>
            </button>
            <button
              type="button"
              aria-label="Toggle whole word match"
              onClick={() => { setWordMatch(v => !v) }}
              style={{
                padding: '6px',
                border: 'none',
                background: wordMatch ? 'var(--input-border-color)' : 'transparent',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-color)'
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </Section>
      {query.trim() !== '' && (
        <Section id="search-results" title={t('search.resultsFound', { count: filteredEntries.length })}>
          {filteredEntries.length > 0
            ? (
            <div style={{ listStyle: 'none', padding: 0, marginTop: '24px', marginBottom: '-6px' }}>
              {filteredEntries.map((entry, i) => (
                <SearchResultItem key={entry.key + i} entry={entry} query={query} />
              ))}
            </div>
              )
            : (
            <div style={{ color: 'var(--text-color)', fontSize: '1.1rem', padding: '32px 0', textAlign: 'center' }}>該当する結果がありません。</div>
              )}
        </Section>
      )}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const host = context.req.headers.host
  const baseUrl = `${protocol}://${host}`
  const translations = await import('next-i18next/serverSideTranslations').then(async mod => await mod.serverSideTranslations(context.locale ?? 'ja', ['common']))

  const zennRes = await fetch(`${baseUrl}/api/zenn`)
  const qiitaRes = await fetch(`${baseUrl}/api/qiita`)
  const { zennArticles = [], zennBooks = [] }: { zennArticles?: ZennArticle[], zennBooks?: Book[] } = await zennRes.json()
  const { qiitaArticles = [] }: { qiitaArticles?: QiitaArticle[] } = await qiitaRes.json()
  const articles = zip(zennArticles, qiitaArticles)

  return {
    props: {
      articles,
      books: zennBooks,
      ...translations
    }
  }
}

function zip<T, U> (arr1: T[] | null | undefined, arr2: U[] | null | undefined): Array<[T | null, U | null]> {
  const safeArr1 = Array.isArray(arr1) ? arr1 : []
  const safeArr2 = Array.isArray(arr2) ? arr2 : []
  const maxLength = Math.max(safeArr1.length, safeArr2.length)
  return Array.from({ length: maxLength }, (_, i) => [
    safeArr1[i] ?? null,
    safeArr2[i] ?? null
  ])
}
