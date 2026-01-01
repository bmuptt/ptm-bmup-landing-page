export interface AboutTimeline {
  id: number
  year: number
  title: string
  description: string
  is_published: boolean
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
}

export interface AboutTimelinesResponse {
  success: boolean
  data: AboutTimeline[]
  message: string
  count: number
}

