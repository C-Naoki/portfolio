import { useRouter } from 'next/router';
import React from 'react';
import { Post } from '../../types/blog.d';
import styles from "../../styles/BlogPost.module.css";

type Props = {
  post: Post;
};

const BlogPost: React.FC<Props> = ({ post }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/blog/${post.id}`);
  };

  return (
    <div className={styles.blogPost} onClick={handleClick}>
      {post.thumbnail && (
        <img src={post.thumbnail} alt="Thumbnail" className={styles.thumbnail} />
      )}
      <div className={styles.content}>
        <h2>{post.title}</h2>
        <div>Tags: {post.tags.join(', ')}</div>
        <div>Last Edited: {formatDate(post.last_edited_time)}</div>
      </div>
    </div>
  );
};

export default BlogPost;

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  };
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
