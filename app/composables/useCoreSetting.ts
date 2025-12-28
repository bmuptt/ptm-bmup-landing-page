import type { CoreSettingResponse } from '~/model/core-setting'

export const fetchCoreSetting = async () => {
  const baseURL = import.meta.server
    ? (process.env.NUXT_PUBLIC_BACKEND_URL_SETTING || 'http://localhost:3200')
    : (useRuntimeConfig().public.backendUrlSetting as string)
  try {
    const res = await $fetch<CoreSettingResponse>('/api/setting/core', {
      baseURL
    })
    return res.data
  } catch {
    return null
  }
}

export const useCoreSetting = async () => {
  return useAsyncData('core-setting', fetchCoreSetting)
}
