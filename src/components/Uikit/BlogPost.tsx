import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from '../../styles/blogpost.module.css'

import type { Post } from '../../types/blog.d'

interface PostProps {
  post: Post
}

const BlogPost: React.FC<PostProps> = ({ post }) => {
  const router = useRouter()

  const handleClick = async (): Promise<void> => {
    await router.push(`/blog/${post.id}`)
  }

  return (
    <div className={styles.blogPost} onClick={() => { void handleClick() }}>
      <div className={styles.thumbnailContainer}>
        {post.thumbnail != null && (
          <Image src={post.thumbnail} alt='Thumbnail' className={styles.thumbnail} />
        )}
      </div>
      <div className={styles.content}>
        <h5 className={styles.title}>{post.title}</h5>
        <div className={styles.tags}>Tags: {post.tags.join(', ')}</div>
        <div className={styles.authors}>Authors: {post.authors.join(', ')}</div>
        <div className={styles.lastEdited}>Last Edited: {formatDate(post.last_edited_time)}</div>
      </div>
    </div>
  )
}

function formatDate (dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export default BlogPost
