import type { LandingSectionsResponse } from '~/model/landing-section'

export const fetchLandingSections = async () => {
  try {
    const res = await $fetch<LandingSectionsResponse>('/api/setting/landing/sections', {
    })
    return res.data
  } catch {
    return []
  }
}

export const useLandingSections = async () => {
  return useAsyncData('landing-sections', fetchLandingSections)
}
