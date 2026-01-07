import type { CoreSettingResponse } from '~/model/core-setting'

export const fetchCoreSetting = async () => {
  try {
    const res = await $fetch<CoreSettingResponse>('/api/setting/core', {
    })
    return res.data
  } catch {
    return null
  }
}

export const useCoreSetting = async () => {
  return useAsyncData('core-setting', fetchCoreSetting)
}
