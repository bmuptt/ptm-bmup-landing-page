import type { ActivitiesResponse } from '~/model/landing-activities'

export const fetchLandingActivities = async () => {
  const baseURL = import.meta.server
    ? (process.env.NUXT_PUBLIC_BACKEND_URL_SETTING || 'http://localhost:3200')
    : (useRuntimeConfig().public.backendUrlSetting as string)

  try {
    const res = await $fetch<ActivitiesResponse>('/api/setting/landing/activities/landing', {
      baseURL,
    })
    return res.data
  } catch {
    return []
  }
}

export const useLandingActivities = async () => {
  return useAsyncData('landing-activities', fetchLandingActivities)
}

