import type { BlogPost, BlogPostLandingResponse, BlogPostsFeaturedLandingResponse, BlogPostsLandingResponse } from '~/model/blog'

export interface FetchLandingBlogPostsParams {
  page?: number
  limit?: number
}

export interface LandingBlogPostsResult {
  page: number
  limit: number
  total: number
  totalPages: number
  data: BlogPost[]
}

export interface FetchLandingFeaturedBlogPostsParams {
  limit?: number
}

export const fetchLandingBlogPosts = async (
  params: FetchLandingBlogPostsParams = {},
): Promise<LandingBlogPostsResult> => {
  const page = Math.max(1, Math.floor(params.page ?? 1))
  const limit = Math.min(50, Math.max(1, Math.floor(params.limit ?? 10)))

  try {
    const res = await $fetch<BlogPostsLandingResponse>('/api/setting/blog-posts/landing', {
      params: { page, limit },
    })

    return {
      page: res.page,
      limit: res.limit,
      total: res.total,
      totalPages: res.totalPages,
      data: res.data,
    }
  } catch {
    return { page, limit, total: 0, totalPages: 0, data: [] }
  }
}

export const fetchLandingBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  const normalizedSlug = String(slug || '').trim()
  if (!normalizedSlug) return null

  try {
    const res = await $fetch<BlogPostLandingResponse>(`/api/setting/blog-posts/landing/${encodeURIComponent(normalizedSlug)}`, {
    })
    return res.data
  } catch {
    return null
  }
}

export const fetchLandingFeaturedBlogPosts = async (
  params: FetchLandingFeaturedBlogPostsParams = {},
): Promise<BlogPost[]> => {
  const limit = Math.min(50, Math.max(1, Math.floor(params.limit ?? 10)))

  try {
    const res = await $fetch<BlogPostsFeaturedLandingResponse>('/api/setting/blog-posts/landing/featured', {
      params: { limit },
    })
    return res.data
  } catch {
    return []
  }
}
