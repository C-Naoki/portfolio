import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import type { SearchableEntry } from '@/pages/search'

import Highlight from '@/components/Uikit/Highlight'
import styles from '@/styles/search.module.css'

interface SearchResultItemProps {
  entry: SearchableEntry
  query: string
}

const getSnippet = (text: string, query: string, context = 20): string => {
  const strippedText = text.replace(/<link_[^>]+>(.*?)<\/link_[^>]+>/g, '$1').replace(/<link_[^>]+>/g, '')
  const lowerText = strippedText.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const idx = lowerText.indexOf(lowerQuery)

  if (idx === -1) {
    return strippedText.length > (context * 2) ? strippedText.slice(0, (context * 2) - 3) + '…' : strippedText
  }

  const start = Math.max(0, idx - context)
  const end = Math.min(strippedText.length, idx + query.length + context)

  let snippet = strippedText.slice(start, end)
  if (start > 0) snippet = '…' + snippet
  if (end < strippedText.length) snippet = snippet + '…'

  return snippet
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ entry, query }) => {
  const { t } = useTranslation('common')

  const getPageName = (entry: SearchableEntry): string => {
    const { category, key } = entry
    if (category.includes('Blog')) return t('search.pages.blog', 'Blog')
    if (category.includes('Book')) return t('search.pages.book', 'Book')
    if (key.startsWith('publications.')) return t('search.pages.publications', 'Publications')
    return t('search.pages.home', 'Home')
  }

  const getPageIcon = (entry: SearchableEntry): JSX.Element => {
    const { category, key } = entry
    if (category.includes('Blog') || category.includes('Book')) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
    } else if (key.startsWith('publications.')) {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="10" y2="9"/></svg>
    } else {
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    }
  }

  const snippet = getSnippet(entry.value, query)

  const content = (
    <div className={styles.searchResultItem}>
      <div style={{ marginTop: '-5px', marginBottom: '8px' }}>
        <span style={{ fontSize: '0.95rem', color: '#666', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {getPageIcon(entry)} {getPageName(entry)}
        </span>
      </div>
      <h3 style={{ fontSize: '1.1rem', margin: 0, wordBreak: 'break-all', fontWeight: 'normal' }}>
        <Highlight text={snippet} query={query} />
      </h3>
    </div>
  )

  return (typeof entry.url === 'string' && entry.url.trim() !== '')
    ? (
    <Link href={entry.url} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
      {content}
    </Link>
      )
    : content
}

export default SearchResultItem
