import type { AboutTimeline, AboutTimelinesResponse } from '~/model/about-timeline'

export const fetchAboutTimelines = async (): Promise<AboutTimeline[]> => {
  try {
    const res = await $fetch<AboutTimelinesResponse>('/api/setting/about-timelines/landing', {
    })
    return res.data
  } catch {
    return []
  }
}

export const useAboutTimelines = async () => {
  return useAsyncData('about-timelines', fetchAboutTimelines)
}
