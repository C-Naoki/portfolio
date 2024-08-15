import ExternalLink from '../Uikit/ExternalLink'

import type { Article } from '@/types/blog.d'

import styles from '@/styles/blog.module.css'

interface Props {
  article: Article
}

const ArticleList = ({ article }: Props): JSX.Element => {
  const formatDate = (dateString: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(String(dateString)).toLocaleDateString('ja-JP', options).replace(/\//g, '-')
  }

  return (
    <div className='blog'>
      <h3><ExternalLink url={`https://zenn.dev${article.user.username}`} text={article.title} /></h3>
      <div className={styles.articleMeta}>
        <span className={styles.articleDate}>{formatDate(article.published_at)}</span>
        <span className={styles.articleEmoji}>{article.emoji}</span>
      </div>
      <div className={styles.articleStats}>
        <span className={styles.likes}>❤️ {article.liked_count}</span>
        <span className={styles.comments}>💬 {article.comments_count}</span>
      </div>
    </div>
  )
}

export default ArticleList
