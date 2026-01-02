import type { AboutTeamMember, AboutTeamMembersResponse } from '~/model/about-team-member'

export const fetchAboutTeamMembers = async (): Promise<AboutTeamMember[]> => {
  const baseURL = import.meta.server
    ? (process.env.NUXT_PUBLIC_BACKEND_URL_SETTING || 'http://localhost:3200')
    : (useRuntimeConfig().public.backendUrlSetting as string)

  try {
    const res = await $fetch<AboutTeamMembersResponse>('/api/setting/about-team-members/landing', {
      baseURL,
    })
    return res.data
  } catch {
    return []
  }
}

export const useAboutTeamMembers = async () => {
  return useAsyncData('about-team-members', fetchAboutTeamMembers)
}

