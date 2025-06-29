import type { QiitaArticle, ZennArticle } from '@/types/blog.d'

import Highlight from '@/components/Uikit/Highlight'
import styles from '@/styles/blog.module.css'

const ArticleList = ({ zennArticle, qiitaArticle, query }: { zennArticle: ZennArticle, qiitaArticle: QiitaArticle, query?: string }): JSX.Element => {
  const formatDate = (dateString: Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
    return new Date(String(dateString)).toLocaleDateString('ja-JP', options).replace(/\//g, '-')
  }

  return (
    <div className='blog'>
      <a href={`https://zenn.dev/${zennArticle.user.username}/articles/${zennArticle.slug}`}>
        <h3 className='publication-heading'>
          {query != null ? <Highlight text={zennArticle.title} query={query} /> : zennArticle.title}
        </h3>
      </a>
      <div className={styles.articleMeta}>
        <span className={styles.articleDate}>{formatDate(zennArticle.published_at)}</span>
        <span className={styles.articleEmoji}>{zennArticle.emoji}</span>
      </div>
      <div className={styles.articleStats}>
        <span className={styles.likes}>🩵 Zenn: <span className={styles.zenn}>{zennArticle.liked_count}</span> Likes</span>
        <span className={styles.likes}>💚 Qiita: <span className={styles.qiita}>{qiitaArticle.likes_count}</span> Likes</span>
      </div>
    </div>
  )
}

export default ArticleList
