export interface TrainingScheduleMember {
  id: number
  name: string
  username: string
  photo: string | null
  active: boolean
}

export interface TrainingSchedule {
  id: number
  day_of_week: number
  start_time: string
  end_time: string
  category: string
  member_id: number | null
  display_order: number
  is_published: boolean
  member?: TrainingScheduleMember | null
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
}

export interface TrainingSchedulesResponse {
  success: boolean
  message: string
  count: number
  data: TrainingSchedule[]
}

