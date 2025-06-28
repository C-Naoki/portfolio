import { useState } from 'react'

import { useTranslation } from 'next-i18next'

import enCommon from '../../public/locales/en/common.json'
import jaCommon from '../../public/locales/ja/common.json'

import type { FlattenedI18nEntry } from '@/lib/utils/flattenI18n'
import type { Book, QiitaArticle, ZennArticle } from '@/types/blog.d'
import type { GetServerSideProps } from 'next'

import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import SearchResultItem from '@/components/Search/SearchResultItem'
import { flattenI18n } from '@/lib/utils/flattenI18n'

export interface SearchableEntry extends FlattenedI18nEntry {
  url?: string
}

interface SearchProps {
  articles: Array<[ZennArticle, QiitaArticle]>
  books: Book[]
}

const getUrlForEntry = (entry: FlattenedI18nEntry): string => {
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
  const page = getPageSlug({ category, key, value: '' })
  return page === 'publications' ? '/publications' : page === 'blog' ? '/blog' : '/'
}

const getPageSlug = (entry: FlattenedI18nEntry): 'home' | 'publications' | 'blog' => {
  const { category, key } = entry
  if (category.includes('Blog') || category.includes('Book')) return 'blog'
  if (key.startsWith('publications.')) return 'publications'
  return 'home'
}

export default function Search ({ articles, books }: SearchProps): JSX.Element {
  const { t, i18n } = useTranslation()
  const [query, setQuery] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [wordMatch, setWordMatch] = useState(false)

  const blogEntries: SearchableEntry[] = articles.flatMap(([zenn, qiita]) => {
    const entries: SearchableEntry[] = []
    if (zenn?.title !== undefined && zenn.title !== '') entries.push({ category: 'Blog', key: `zenn.${zenn.id}.title`, value: zenn.title, url: `https://zenn.dev${zenn.path}` })
    if (qiita?.title !== undefined && qiita.title !== '') entries.push({ category: 'Blog', key: `qiita.${qiita.id}.title`, value: qiita.title, url: qiita.url })
    return entries
  })
  const bookEntries: SearchableEntry[] = books.map(book => ({ category: 'Book', key: `book.${book.id}.title`, value: book.title, url: `https://zenn.dev${book.path}` }))

  const i18nEntriesJa: SearchableEntry[] = flattenI18n(jaCommon).map(e => ({ ...e, url: getUrlForEntry(e) }))
  const i18nEntriesEn: SearchableEntry[] = flattenI18n(enCommon).map(e => ({ ...e, category: e.category + ' [en]', url: getUrlForEntry(e) }))

  const currentLanguage = i18n.language
  const i18nEntries = currentLanguage === 'ja' ? i18nEntriesJa : i18nEntriesEn

  const allEntries: SearchableEntry[] = [...i18nEntries, ...blogEntries, ...bookEntries]

  const filteredEntries = query.trim() === ''
    ? []
    : allEntries.filter(entry => {
      const text = caseSensitive ? entry.value : entry.value.toLowerCase()
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
            value={query}
            onChange={e => { setQuery(e.target.value) }}
            style={{
              width: '100%',
              padding: '10px 16px',
              paddingRight: '80px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '24px',
              outline: 'none',
              transition: 'border-color 0.2s'
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
                background: caseSensitive ? '#e0e0e0' : 'transparent',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
                background: wordMatch ? '#e0e0e0' : 'transparent',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
            <div style={{ color: '#888', fontSize: '1.1rem', padding: '32px 0', textAlign: 'center' }}>該当する結果がありません。</div>
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
  const { zennArticles, zennBooks }: { zennArticles: ZennArticle[], zennBooks: Book[] } = await zennRes.json()
  const { qiitaArticles }: { qiitaArticles: QiitaArticle[] } = await qiitaRes.json()
  const articles = zip(zennArticles, qiitaArticles)

  return {
    props: {
      articles,
      books: zennBooks,
      ...translations
    }
  }
}

function zip<T, U> (arr1: T[], arr2: U[]): Array<[T | undefined, U | undefined]> {
  const maxLength = Math.max(arr1.length, arr2.length)
  return Array.from({ length: maxLength }, (_, i) => [arr1[i], arr2[i]])
}
