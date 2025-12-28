import type { CoreSettingResponse } from '~/model/core-setting'

export const useCoreSetting = async () => {
  const config = useRuntimeConfig()
  
  return useAsyncData('core-setting', () => 
    $fetch<CoreSettingResponse>('/api/setting/core', {
      baseURL: config.public.backendUrlSetting as string
    }).then(res => res.data).catch(() => null)
  )
}
