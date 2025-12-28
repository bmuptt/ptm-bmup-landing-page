export interface CoreSetting {
  id: number
  name: string
  logo: string
  description: string
  address: string
  maps: string
  primary_color: string
  secondary_color: string
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
}

export interface CoreSettingResponse {
  success: boolean
  data: CoreSetting
  message: string
}
