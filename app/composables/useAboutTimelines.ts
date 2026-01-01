import type { AboutTimeline, AboutTimelinesResponse } from '~/model/about-timeline'

export const fetchAboutTimelines = async (): Promise<AboutTimeline[]> => {
  const baseURL = import.meta.server
    ? (process.env.NUXT_PUBLIC_BACKEND_URL_SETTING || 'http://localhost:3200')
    : (useRuntimeConfig().public.backendUrlSetting as string)

  try {
    const res = await $fetch<AboutTimelinesResponse>('/api/setting/about-timelines/landing', {
      baseURL,
    })
    return res.data
  } catch {
    return []
  }
}

export const useAboutTimelines = async () => {
  return useAsyncData('about-timelines', fetchAboutTimelines)
}

