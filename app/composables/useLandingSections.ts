import type { LandingSectionsResponse } from '~/model/landing-section'

export const fetchLandingSections = async () => {
  const baseURL = import.meta.server
    ? (process.env.NUXT_PUBLIC_BACKEND_URL_SETTING || 'http://localhost:3200')
    : (useRuntimeConfig().public.backendUrlSetting as string)
  try {
    const res = await $fetch<LandingSectionsResponse>('/api/setting/landing/sections', {
      baseURL
    })
    return res.data
  } catch {
    return []
  }
}

export const useLandingSections = async () => {
  return useAsyncData('landing-sections', fetchLandingSections)
}
