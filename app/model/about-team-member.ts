export interface AboutTeamMemberProfile {
  id: number
  name: string
  username: string
  photo: string | null
  active: boolean
}

export interface AboutTeamMember {
  id: number
  member_id: number
  member: AboutTeamMemberProfile
  role: string
  display_order: number
  is_published: boolean
  created_by: number
  updated_by: number
  created_at: string
  updated_at: string
}

export interface AboutTeamMembersResponse {
  success: boolean
  message: string
  count: number
  data: AboutTeamMember[]
}

