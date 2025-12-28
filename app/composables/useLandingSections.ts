import type { LandingSectionsResponse } from '~/model/landing-section'

export const useLandingSections = async () => {
  const config = useRuntimeConfig()
  
  return useAsyncData('landing-sections', () => 
    $fetch<LandingSectionsResponse>('/api/setting/landing/sections', {
      baseURL: config.public.backendUrlSetting as string
    }).then(res => res.data).catch(() => [])
  )
}
