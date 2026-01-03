import type { GalleryItem, GalleryItemsResponse } from '~/model/gallery-item'

export const fetchGalleryItems = async (): Promise<GalleryItem[]> => {
  const baseURL = import.meta.server
    ? (process.env.NUXT_PUBLIC_BACKEND_URL_SETTING || 'http://localhost:3200')
    : (useRuntimeConfig().public.backendUrlSetting as string)

  try {
    const res = await $fetch<GalleryItemsResponse>('/api/setting/gallery-items/landing', {
      baseURL,
    })
    return res.data
  } catch {
    return []
  }
}

export const useGalleryItems = async () => {
  return useAsyncData('gallery-items', fetchGalleryItems)
}

