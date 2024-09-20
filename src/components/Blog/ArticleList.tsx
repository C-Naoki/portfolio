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
      <a href={`https://zenn.dev/${article.user.username}/articles/${article.slug}`}>
        <h3 className='publication-heading'>{article.title}</h3>
      </a>
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
