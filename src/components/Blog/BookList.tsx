import type { Book } from '@/types/blog.d'

import Highlight from '@/components/Uikit/Highlight'
import styles from '@/styles/blog.module.css'

interface Props {
  book: Book
  query?: string
}

const BookList = ({ book, query }: Props): JSX.Element => {
  const formatDate = (dateString: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(String(dateString)).toLocaleDateString('ja-JP', options).replace(/\//g, '-')
  }

  return (
    <div className='blog'>
      <a href={`https://zenn.dev/${book.user.username}/books/${book.slug}`}>
        <h3 className='publication-heading'>
          {query ? <Highlight text={book.title} query={query} /> : book.title}
        </h3>
      </a>
      <div className={styles.articleMeta}>
        <span className={styles.articleDate}>{formatDate(book.published_at)}</span>
      </div>
      <div className={styles.articleStats}>
        <span className={styles.likes}>🩵 Zenn: <span className={styles.zenn}>{book.liked_count}</span> Likes</span>
      </div>
    </div>
  )
}

export default BookList
