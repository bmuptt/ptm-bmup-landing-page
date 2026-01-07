import type { ActivitiesResponse } from '~/model/landing-activities'

export const fetchLandingActivities = async () => {
  try {
    const res = await $fetch<ActivitiesResponse>('/api/setting/landing/activities/landing', {
    })
    return res.data
  } catch {
    return []
  }
}

export const useLandingActivities = async () => {
  return useAsyncData('landing-activities', fetchLandingActivities)
}
