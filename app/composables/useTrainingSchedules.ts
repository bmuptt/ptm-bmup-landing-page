import type { TrainingSchedule, TrainingSchedulesResponse } from '~/model/training-schedule'

export const fetchTrainingSchedules = async (): Promise<TrainingSchedule[]> => {
  try {
    const res = await $fetch<TrainingSchedulesResponse>('/api/setting/training-schedules/landing', {
    })
    return res.data
  } catch {
    return []
  }
}

export const useTrainingSchedules = async () => {
  return useAsyncData('training-schedules', fetchTrainingSchedules)
}
