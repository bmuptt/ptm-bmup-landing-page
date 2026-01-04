export type BlogPostStatus = 'draft' | 'published' | 'not_published'

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string | null
  content: string
  cover_image_url: string | null
  status: BlogPostStatus
  published_at: string | null
  is_featured: boolean
  meta_title: string | null
  meta_description: string | null
  og_image_url: string | null
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
}

export interface BlogPostsLandingResponse {
  success: boolean
  message: string
  page: number
  limit: number
  total: number
  totalPages: number
  data: BlogPost[]
}

export interface BlogPostLandingResponse {
  success: boolean
  message: string
  data: BlogPost
}

export interface BlogPostsFeaturedLandingResponse {
  success: boolean
  message: string
  count: number
  data: BlogPost[]
}
