import ExternalLink from '../Uikit/ExternalLink'

import type { Book } from '@/types/blog.d'

import styles from '@/styles/blog.module.css'

interface Props {
  book: Book
}

const BookList = ({ book }: Props): JSX.Element => {
  const formatDate = (dateString: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(String(dateString)).toLocaleDateString('ja-JP', options).replace(/\//g, '-')
  }

  return (
    <div className='blog'>
      <h3><ExternalLink url={`https://zenn.dev/${book.user.username}/books/${book.slug}`} text={book.title} /></h3>
      <div className={styles.articleMeta}>
        <span className={styles.articleDate}>{formatDate(book.published_at)}</span>
      </div>
      <div className={styles.articleStats}>
        <span className={styles.likes}>❤️ {book.liked_count}</span>
      </div>
    </div>
  )
}

export default BookList