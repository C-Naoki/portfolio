import { useState } from 'react'

import { useTranslation } from 'next-i18next'

import enCommon from '../../public/locales/en/common.json'
import jaCommon from '../../public/locales/ja/common.json'

import type { FlattenedI18nEntry } from '@/lib/utils/flattenI18n'
import type { Book, QiitaArticle, ZennArticle } from '@/types/blog.d'
import type { GetServerSideProps } from 'next'

import Layout from '@/components/Layouts/Layout'
import Section from '@/components/Layouts/Section'
import Highlight from '@/components/Uikit/Highlight'
import HorizontalLine from '@/components/Uikit/HorizontalLine'
import { flattenI18n } from '@/lib/utils/flattenI18n'

interface SearchProps {
  articles: Array<[ZennArticle, QiitaArticle]>
  books: Book[]
}

export default function Search ({ articles, books }: SearchProps): JSX.Element {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [wordMatch, setWordMatch] = useState(false)

  // --- Blog/Bookデータもflattenして全文検索対象に追加 ---
  const blogEntries: FlattenedI18nEntry[] = articles.flatMap(([zenn, qiita], idx) => {
    const entries: FlattenedI18nEntry[] = []
    if (typeof zenn?.title === 'string' && zenn.title.trim() !== '') entries.push({ category: 'Blog', key: `zenn.${zenn.id}.title`, value: zenn.title })
    if (typeof qiita?.title === 'string' && qiita.title.trim() !== '') entries.push({ category: 'Blog', key: `qiita.${qiita.id}.title`, value: qiita.title })
    return entries
  })
  const bookEntries: FlattenedI18nEntry[] = books.map(book => ({ category: 'Book', key: `book.${book.id}.title`, value: book.title }))

  // --- i18nテキストのflatten & 検索（日本語＋英語） ---
  const i18nEntriesJa: FlattenedI18nEntry[] = flattenI18n(jaCommon)
  const i18nEntriesEn: FlattenedI18nEntry[] = flattenI18n(enCommon).map(e => ({ ...e, category: e.category + ' [en]' }))
  const i18nEntries: FlattenedI18nEntry[] = [...i18nEntriesJa, ...i18nEntriesEn, ...blogEntries, ...bookEntries]
  // 検索ロジック: caseSensitive, wordMatch対応
  const filteredI18nEntries = query.trim() === ''
    ? []
    : i18nEntries.filter(entry => {
      const text = caseSensitive ? entry.value : entry.value.toLowerCase()
      const q = caseSensitive ? query : query.toLowerCase()
      if (wordMatch) {
        // 単語単位: 正規表現で完全一致
        return new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(text)
      } else {
        // 部分一致
        return text.includes(q)
      }
    })

  // 検索結果をセクションごとにグループ化
  const groupedResults: Record<string, FlattenedI18nEntry[]> = {
    home: [],
    publications: [],
    blog: []
  }
  filteredI18nEntries.forEach(entry => {
    const section = getSectionLabel(entry, t)
    if (section === t('search.section.home', 'トップページ')) groupedResults.home.push(entry)
    else if (section === t('search.section.publications', '業績一覧')) groupedResults.publications.push(entry)
    else if (section === t('search.section.blog', 'ブログ')) groupedResults.blog.push(entry)
  })

  return (
    <Layout title={t('search.heading', 'Search')}>
      <Section id="search-bar" title={t('search.search', 'Search')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="text"
            placeholder="キーワードを入力"
            value={query}
            onChange={e => { setQuery(e.target.value) }}
            style={{ width: '100%', padding: '8px', fontSize: '1.1rem', marginBottom: '24px' }}
            autoFocus
          />
          <button
            type="button"
            aria-label="大文字小文字区別"
            onClick={() => { setCaseSensitive(v => !v) }}
            style={{
              minWidth: 44,
              padding: '6px 10px',
              fontWeight: 700,
              border: '1px solid #1976d2',
              background: caseSensitive ? '#1976d2' : '#fff',
              color: caseSensitive ? '#fff' : '#1976d2',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: '1em',
              marginBottom: '24px',
              textAlign: 'center'
            }}
          >Aa</button>
          <button
            type="button"
            aria-label="単語完全一致検索"
            onClick={() => { setWordMatch(v => !v) }}
            style={{
              minWidth: 44,
              padding: '6px 10px',
              fontWeight: 700,
              border: '1px solid #1976d2',
              background: wordMatch ? '#1976d2' : '#fff',
              color: wordMatch ? '#fff' : '#1976d2',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: '1em',
              marginBottom: '24px',
              textAlign: 'center',
              position: 'relative'
            }}
          >
            <span style={{
              display: 'inline-block',
              position: 'relative',
              lineHeight: 1
            }}>
              ab
              <span style={{
                position: 'absolute',
                left: -4,
                right: -4,
                bottom: -4,
                height: 7,
                display: 'flex',
                alignItems: 'flex-end',
                pointerEvents: 'none'
              }}>
                <span style={{
                  width: 2,
                  height: 7,
                  background: wordMatch ? '#fff' : '#1976d2',
                  borderRadius: 1,
                  marginRight: -1
                }} />
                <span style={{
                  flex: 1,
                  height: 2,
                  background: wordMatch ? '#fff' : '#1976d2',
                  borderRadius: 1,
                  marginRight: -1
                }} />
                <span style={{
                  width: 2,
                  height: 7,
                  background: wordMatch ? '#fff' : '#1976d2',
                  borderRadius: 1
                }} />
              </span>
            </span>
          </button>
        </div>
      </Section>
      {query.trim() !== '' && (
        <Section id="search-results" title={t('search.results', 'Results')}>
          <HorizontalLine />
          <div style={{ marginBottom: '16px', fontWeight: 500, fontSize: '1.1rem' }}>
            <span style={{ color: '#1976d2', fontWeight: 700 }}>{filteredI18nEntries.length}</span> results found
          </div>
          {filteredI18nEntries.length > 0
            ? (
            <div style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {groupedResults.home.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1em', color: '#1976d2', marginBottom: 8 }}>{t('search.section.home', 'トップページ')}</div>
                  {groupedResults.home.map((entry, i) => (
                    <div key={entry.key + i} style={{ margin: 0, marginBottom: 16 }}>
                      <div style={{ fontSize: '1.05em' }}>
                        <Highlight text={getSnippet(stripLinks(entry.value), query)} query={query} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {groupedResults.publications.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1em', color: '#1976d2', marginBottom: 8 }}>{t('search.section.publications', '業績一覧')}</div>
                  {groupedResults.publications.map((entry, i) => (
                    <div key={entry.key + i} style={{ margin: 0, marginBottom: 16 }}>
                      <div style={{ fontSize: '1.05em' }}>
                        <Highlight text={getSnippet(stripLinks(entry.value), query)} query={query} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {groupedResults.blog.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1em', color: '#1976d2', marginBottom: 8 }}>{t('search.section.blog', 'ブログ')}</div>
                  {groupedResults.blog.map((entry, i) => (
                    <div key={entry.key + i} style={{ margin: 0, marginBottom: 16 }}>
                      <div style={{ fontSize: '1.05em' }}>
                        <Highlight text={getSnippet(stripLinks(entry.value), query)} query={query} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
  // ...既存のデータ取得処理はそのまま...
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

// 言語に応じてセクション名を返す関数
function getSectionLabel (entry: FlattenedI18nEntry, t: (key: string, defaultValue: string) => string): string {
  const { category, key } = entry
  // Blog/Bookは「ブログ」or「Blog」
  if (category.includes('Blog') || category.includes('Book')) return t('search.section.blog', 'ブログ')
  // Publications系（keyがpublications.で始まるものは全て）
  if (key.startsWith('publications.')) return t('search.section.publications', '業績一覧')
  // それ以外は全てHome
  return t('search.section.home', 'トップページ')
}

function getSnippet (text: string, query: string, context = 20): string {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return text.length > 40 ? text.slice(0, 37) + '…' : text
  const start = Math.max(0, idx - context)
  const end = Math.min(text.length, idx + query.length + context)
  let snippet = text.slice(start, end)
  if (start > 0) snippet = '…' + snippet
  if (end < text.length) snippet = snippet + '…'
  return snippet
}

// <link_xxx>タグを除去するユーティリティ
function stripLinks (text: string): string {
  // <link_xxx>...</link_xxx> や <link_xxx> の両方を除去
  return text.replace(/<link_[^>]+>(.*?)<\/link_[^>]+>/g, '$1').replace(/<link_[^>]+>/g, '')
}
