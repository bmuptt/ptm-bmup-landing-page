export interface LandingItem {
  id: number
  key: string
  type: string
  title: string | null
  content: string | null
  image_url: string | null
  button_label: string | null
  button_url: string | null
  published: boolean
  created_by: number
  updated_by: number
}

export interface LandingSection {
  id: number
  page_key: string
}

export interface LandingSectionData {
  section: LandingSection
  items: LandingItem[]
}

export interface LandingSectionsResponse {
  success: boolean
  data: LandingSectionData[]
  message: string
}
