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

  const snippet = getSnippet(entry.value, query)

  const content = (
    <div className={styles.searchResultItem}>
      <div style={{ marginTop: '-5px', marginBottom: '6px' }}>
        <span style={{ fontSize: '0.8rem', color: '#666' }}>
          {getPageName(entry)}
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
