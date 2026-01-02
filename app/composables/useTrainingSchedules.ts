import type { TrainingSchedule, TrainingSchedulesResponse } from '~/model/training-schedule'

export const fetchTrainingSchedules = async (): Promise<TrainingSchedule[]> => {
  const baseURL = import.meta.server
    ? (process.env.NUXT_PUBLIC_BACKEND_URL_SETTING || 'http://localhost:3200')
    : (useRuntimeConfig().public.backendUrlSetting as string)

  try {
    const res = await $fetch<TrainingSchedulesResponse>('/api/setting/training-schedules/landing', {
      baseURL,
    })
    return res.data
  } catch {
    return []
  }
}

export const useTrainingSchedules = async () => {
  return useAsyncData('training-schedules', fetchTrainingSchedules)
}

