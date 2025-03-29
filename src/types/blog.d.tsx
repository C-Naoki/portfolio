export interface ZennArticle {
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

export interface QiitaArticle {
  rendered_body: string
  body: string
  coediting: boolean
  comments_count: number
  created_at: string
  group: null
  id: string
  likes_count: number
  private: boolean
  reactions_count: number
  stocks_count: number
  tags: any
  title: string
  updated_at: string
  url: string
  user: QiitaUser
  page_views_count: number
  team_membership: null
  organization_url_name: string
  slide: boolean
}

export interface QiitaUser {
  description: string
  facebook_id: string
  followees_count: number
  followers_count: number
  github_login_name: string
  id: string
  items_count: number
  linkedin_id: string
  location: string
  name: string
  organization: string
  permanent_id: number
  profile_image_url: string
  team_only: boolean
  twitter_screen_name: string
  website_url: string
}
