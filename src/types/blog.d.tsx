export interface Article {
  id: number
  post_type: 'Article'
  title: string
  slug: string
  comments_count: number
  liked_count: number
  body_letters_count: number
  article_type: 'tech'
  emoji: string
  is_suspending_private: boolean
  published_at: Date
  body_updated_at: Date
  source_repo_updated_at: Date
  pinned: boolean
  path: string
  user: ZennUser
  publication: null
}

export interface Book {
  id: number
  post_type: 'Article'
  title: string
  slug: string
  published: boolean
  price: number
  is_suspending_private: boolean
  liked_count: number
  published_at: Date
  body_updated_at: Date
  source_repo_updated_at: Date
  cover_image_small_url: string
  path: string
  user: ZennUser
}

export interface ZennUser {
  id: number
  username: string
  name: string
  avatar_small_url: string
}
