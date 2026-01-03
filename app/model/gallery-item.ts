export interface GalleryItem {
  id: number
  image_url: string
  title: string
  display_order: number
  is_published: boolean
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
}

export interface GalleryItemsResponse {
  success: boolean
  message: string
  count: number
  data: GalleryItem[]
}

