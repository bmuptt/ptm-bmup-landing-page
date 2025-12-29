<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useCoreSetting } from '~/composables/useCoreSetting'
import { useLandingSections } from '~/composables/useLandingSections'
import { useLandingActivities } from '~/composables/useLandingActivities'

const { data: coreSetting } = await useCoreSetting()
await useLandingSections()
await useLandingActivities()
const theme = useTheme()

if (coreSetting.value) {
  // Update Vuetify theme
  if (theme.themes.value.light) {
    theme.themes.value.light.colors.primary = coreSetting.value.primary_color
    theme.themes.value.light.colors.secondary = coreSetting.value.secondary_color
  }
  
  // Update Head Meta
  useHead({
    titleTemplate: `%s - ${coreSetting.value.name}`,
    link: [
      { rel: 'icon', type: 'image/png', href: coreSetting.value.logo }
    ]
  })
}
</script>
