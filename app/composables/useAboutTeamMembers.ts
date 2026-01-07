import type { AboutTeamMember, AboutTeamMembersResponse } from '~/model/about-team-member'

export const fetchAboutTeamMembers = async (): Promise<AboutTeamMember[]> => {
  try {
    const res = await $fetch<AboutTeamMembersResponse>('/api/setting/about-team-members/landing', {
    })
    return res.data
  } catch {
    return []
  }
}

export const useAboutTeamMembers = async () => {
  return useAsyncData('about-team-members', fetchAboutTeamMembers)
}
