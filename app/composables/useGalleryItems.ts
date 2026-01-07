import type { GalleryItem, GalleryItemsResponse } from '~/model/gallery-item'

export const fetchGalleryItems = async (): Promise<GalleryItem[]> => {
  try {
    const res = await $fetch<GalleryItemsResponse>('/api/setting/gallery-items/landing', {
    })
    return res.data
  } catch {
    return []
  }
}

export const useGalleryItems = async () => {
  return useAsyncData('gallery-items', fetchGalleryItems)
}
