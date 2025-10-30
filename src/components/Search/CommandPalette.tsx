import { useEffect, useMemo, useRef, useState } from 'react'

import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { createPortal } from 'react-dom'
import { FaSearch } from 'react-icons/fa'

import type { SearchableEntry } from '@/types/search'

import Highlight from '@/components/Uikit/Highlight'
import { getEntryPageNameKey, isExternalUrl } from '@/lib/search/helpers'
import styles from '@/styles/commandPalette.module.css'

interface CommandPaletteProps {
  open: boolean
  entries: SearchableEntry[]
  loading?: boolean
  error?: string | null
  onClose: () => void
  onRefresh?: () => void
  onQuerySubmit?: (query: string) => void
}

const MAX_RESULTS = 12

const stripMarkup = (value: string): string =>
  value.replace(/<link_[^>]+>(.*?)<\/link_[^>]+>/g, '$1').replace(/<link_[^>]+>/g, '')

const buildSnippet = (text: string, query: string, context = 40, maxLength = 160): string => {
  const trimmedText = text.trim()
  if (trimmedText === '') return ''

  const normalizedQuery = query.trim().toLowerCase()
  const normalizedText = trimmedText.toLowerCase()

  if (normalizedQuery === '') {
    if (trimmedText.length <= maxLength) return trimmedText
    return `${trimmedText.slice(0, maxLength).trimEnd()}…`
  }

  const index = normalizedText.indexOf(normalizedQuery)
  if (index === -1) {
    if (trimmedText.length <= maxLength) return trimmedText
    return `${trimmedText.slice(0, maxLength).trimEnd()}…`
  }

  const start = Math.max(0, index - context)
  const end = Math.min(trimmedText.length, index + normalizedQuery.length + context)
  let snippet = trimmedText.slice(start, end)

  if (start > 0) snippet = `…${snippet}`
  if (end < trimmedText.length) snippet = `${snippet}…`

  if (snippet.length > maxLength) {
    snippet = snippet.slice(0, maxLength).trimEnd()
    if (!snippet.endsWith('…')) snippet += '…'
  }

  return snippet
}

const CommandPalette = ({
  open,
  entries,
  loading = false,
  error = null,
  onClose,
  onRefresh,
  onQuerySubmit
}: CommandPaletteProps): JSX.Element | null => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      const timer = window.setTimeout(() => {
        inputRef.current?.focus()
      }, 10)
      return () => { window.clearTimeout(timer) }
    }
    return undefined
  }, [open])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  const sanitizedEntries = useMemo(
    () =>
      entries.map((entry) => {
        const displayValue = stripMarkup(entry.value ?? '')
        const searchBase = entry.searchText ?? entry.value ?? ''
        const sanitizedSearchRaw = stripMarkup(searchBase)
        const sanitizedSearch = sanitizedSearchRaw.trim() !== '' ? sanitizedSearchRaw : displayValue
        return {
          ...entry,
          value: displayValue,
          searchText: sanitizedSearch
        }
      }),
    [entries]
  )

  const filteredEntries = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (normalized === '') {
      return sanitizedEntries.slice(0, MAX_RESULTS)
    }
    return sanitizedEntries
      .filter((entry) => entry.searchText?.toLowerCase().includes(normalized) ?? false)
      .slice(0, MAX_RESULTS)
  }, [query, sanitizedEntries])

  const handleClose = (): void => {
    onClose()
  }

  const handleSelect = (entry: SearchableEntry | undefined, openInNewTab = false): void => {
    if (entry?.url == null || entry.url.trim() === '') {
      return
    }
    const url = entry.url
    const navigate = (): void => {
      if (isExternalUrl(url)) {
        window.open(url, openInNewTab ? '_blank' : '_self', 'noopener,noreferrer')
      } else if (openInNewTab) {
        window.open(url, '_blank', 'noopener,noreferrer')
      } else {
        void router.push(url)
      }
    }

    handleClose()
    if (typeof onQuerySubmit === 'function' && query.trim() !== '') {
      onQuerySubmit(query.trim())
    }
    window.setTimeout(navigate, 0)
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    const nativeEvent = event.nativeEvent as KeyboardEvent & { isComposing?: boolean }
    if (nativeEvent.isComposing || nativeEvent.keyCode === 229) {
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (filteredEntries.length > 0) {
        const nextIndex = (activeIndex + 1) % filteredEntries.length
        setActiveIndex(nextIndex)
        scrollIntoView(nextIndex)
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (filteredEntries.length > 0) {
        const nextIndex = (activeIndex - 1 + filteredEntries.length) % filteredEntries.length
        setActiveIndex(nextIndex)
        scrollIntoView(nextIndex)
      }
    } else if (event.key === 'Enter') {
      event.preventDefault()
      handleSelect(filteredEntries[activeIndex], event.metaKey || event.ctrlKey)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      handleClose()
    } else if (event.key === 'r' && (event.metaKey || event.ctrlKey) && event.shiftKey) {
      if (typeof onRefresh === 'function') {
        event.preventDefault()
        onRefresh()
      }
    }
  }

  const scrollIntoView = (index: number): void => {
    const list = listRef.current
    if (list === null || list === undefined) return
    if (filteredEntries.length === 0) return
    const clampedIndex = ((index % filteredEntries.length) + filteredEntries.length) % filteredEntries.length
    const item = list.children[clampedIndex] as HTMLElement | undefined
    if (item !== null && item !== undefined) {
      const itemTop = item.offsetTop
      const itemBottom = itemTop + item.offsetHeight
      const viewTop = list.scrollTop
      const viewBottom = viewTop + list.clientHeight

      if (itemTop < viewTop) {
        list.scrollTop = itemTop
      } else if (itemBottom > viewBottom) {
        list.scrollTop = itemBottom - list.clientHeight
      }
    }
  }

  useEffect(() => {
    if (!open) return
    const handleGlobalKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => { window.removeEventListener('keydown', handleGlobalKeyDown) }
  }, [open, onClose])

  if (!open) {
    return null
  }

  const title = t('search.quick.title', 'Quick Search')
  const placeholder = t('search.quick.placeholder', 'Search…')
  const noResultsText =
    query.trim() === ''
      ? t('search.quick.hint', 'Start typing to search. Press Esc to close.')
      : t('search.quick.noResults', 'No matches found.')

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      handleClose()
    }
  }

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick} role="presentation">
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={styles.searchBar}>
          <span className={styles.searchIcon} aria-hidden="true">
            <FaSearch size={16} />
          </span>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={query}
            onChange={(event) => { setQuery(event.target.value) }}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            aria-label={placeholder}
            autoComplete="off"
          />
          {loading && (
            <span className={styles.spinner} aria-hidden="true" />
          )}
        </div>
        <div className={styles.resultsContainer}>
          {error !== null
            ? (
            <div className={styles.error}>
              {t('search.quick.error', { message: error })}
            </div>
              )
            : filteredEntries.length > 0
              ? (
            <ul className={styles.results} role="listbox" ref={listRef}>
              {filteredEntries.map((entry, index) => {
                const isActive = index === activeIndex
                const pageKey = getEntryPageNameKey(entry)
                const pageName =
                  pageKey === 'blog'
                    ? t('search.pages.blog', 'Blog')
                    : pageKey === 'book'
                      ? t('search.pages.book', 'Book')
                      : pageKey === 'publications'
                        ? t('search.pages.publications', 'Publications')
                        : t('search.pages.home', 'Home')
                const normalizedQuery = query.trim().toLowerCase()
                const lowerDisplay = entry.value?.toLowerCase() ?? ''
                const lowerSearch = entry.searchText?.toLowerCase() ?? ''
                const titleText =
                  normalizedQuery !== '' && !lowerDisplay.includes(normalizedQuery) && lowerSearch.includes(normalizedQuery)
                    ? entry.searchText ?? entry.value
                    : entry.value
                const snippet = buildSnippet(titleText ?? '', query)
                return (
                  <li
                    key={`${entry.key}-${index}`}
                    className={`${styles.resultItem} ${isActive ? styles.active : ''}`}
                    role="option"
                    aria-selected={isActive}
                    onMouseEnter={() => { setActiveIndex(index) }}
                    onMouseDown={(event) => {
                      event.preventDefault()
                      handleSelect(entry, event.metaKey || event.ctrlKey)
                    }}
                  >
                    <div className={styles.resultContent}>
                      <div className={styles.resultTitle}>
                        <Highlight text={snippet} query={query} />
                      </div>
                      <div className={styles.resultMeta}>
                        <span aria-hidden="true">{pageName}</span>
                        {isExternalUrl(entry.url) && (
                          <FontAwesomeIcon icon={faExternalLinkAlt} size="xs" className={styles.externalIcon} />
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
                )
              : (
            <div className={styles.empty}>{noResultsText}</div>
                )}
        </div>
        <div className={styles.footerHint}>
          <span>{t('search.quick.shortcut', 'Press Esc to close · ⌘⏎ to open in new tab · ⇧⌘R to refresh')}</span>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default CommandPalette
