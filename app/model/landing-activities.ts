export interface ActivityIcon {
  id: number
  name: string
  label: string
  is_active: boolean
}

export interface Activity {
  id: number
  icon_id: number
  title: string
  subtitle: string
  is_published: boolean
  sort_order: number
  created_at: string
  updated_at: string
  icon: ActivityIcon
}

export interface ActivitiesResponse {
  success: boolean
  data: Activity[]
  message: string
  count: number
}

export interface LandingActivityItem {
  id: number
  title: string
  description: string
  icon: string
}
