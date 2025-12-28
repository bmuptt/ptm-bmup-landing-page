<template>
  <div>
    <section class="position-relative bg-white overflow-hidden">
      <v-container fluid class="py-10 px-4 px-md-8">
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="6" style="position: relative; z-index: 2;">
            <ClientOnly>
              <h1 class="text-h2 font-weight-bold mb-4 text-primary typing">
                <span>{{ typedTitle }}</span><span class="caret"/>
              </h1>
              <template #fallback>
                <h1 class="text-h2 font-weight-bold mb-4 text-primary">{{ data?.hero.title }}</h1>
              </template>
            </ClientOnly>
            <p class="text-h5 mb-8 text-medium-emphasis" :style="{ opacity: showSubtitle ? 1 : 0, transition: 'opacity .6s ease .1s' }">{{ data?.hero.subtitle }}</p>
            <v-btn color="secondary" size="large" rounded="pill" class="px-8 font-weight-bold elevation-4">
              {{ data?.hero.cta }}
              <v-icon icon="mdi-arrow-right" class="ml-2" />
            </v-btn>
          </v-col>
          <v-col cols="12" md="5" class="mt-4 mt-md-0" style="position: relative; z-index: 1;">
             <Hero3D />
          </v-col>
        </v-row>
      </v-container>
      <!-- Background Shape Decoration removed for clean white hero -->
    </section>

    <v-container class="py-16">
      <v-row align="center">
        <v-col cols="12" md="6">
          <h2 class="text-h3 font-weight-bold text-primary mb-4">{{ data?.about.title }}</h2>
          <p class="text-body-1 text-medium-emphasis mb-6" style="line-height: 1.8;">
            {{ data?.about.description }}
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <ClientOnly>
            <v-img
              :src="data?.about.image"
              height="400"
              cover
              class="rounded-lg elevation-4"
            />
          </ClientOnly>
        </v-col>
      </v-row>
    </v-container>

    <div class="bg-white py-16">
      <v-container>
        <h2 class="text-h3 font-weight-bold text-center text-primary mb-12">Kegiatan Kami</h2>
        <v-row>
          <v-col v-for="activity in (data?.activities || [])" :key="activity.id" cols="12" md="4">
            <v-card class="h-100 text-center py-8 px-4 kegiatan-card" elevation="2">
              <v-icon :icon="activity.icon" size="64" color="secondary" class="mb-4"/>
              <v-card-title class="text-h5 font-weight-bold mb-2">{{ activity.title }}</v-card-title>
              <v-card-text class="text-body-1 text-medium-emphasis">
                {{ activity.description }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <v-container class="py-16">
      <v-card color="primary" class="rounded-xl overflow-hidden">
        <v-row no-gutters>
          <v-col cols="12" md="6" class="pa-8 pa-md-16 d-flex flex-column justify-center">
            <h2 class="text-h3 font-weight-bold mb-6">Hubungi Kami</h2>
            <div class="d-flex align-center mb-4">
              <v-icon icon="mdi-email" class="mr-4"/>
              <span class="text-h6">{{ data?.contact.email }}</span>
            </div>
            <div class="d-flex align-center mb-4">
              <v-icon icon="mdi-phone" class="mr-4"/>
              <span class="text-h6">{{ data?.contact.phone }}</span>
            </div>

            <div class="d-flex align-center">
              <v-icon icon="mdi-map-marker" class="mr-4"/>
              <span class="text-h6">{{ data?.contact.address }}</span>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="bg-white d-none d-md-block">
             <div class="h-100 d-flex align-center justify-center text-primary">
                <v-icon icon="mdi-message-text" size="128" color="primary" style="opacity: 0.2"/>
             </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useAsyncData, useSeoMeta } from 'nuxt/app'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useLandingData } from '~/composables/useLandingData'

const { data, error } = await useAsyncData('landing', useLandingData)

if (error.value && import.meta.server) {
  throw error.value
}

useSeoMeta({
  title: 'Home - PTM BMUP',
  description: 'Selamat datang di website resmi PTM BMUP.',
})

const typedTitle = ref('')
const showSubtitle = ref(false)
let timer: number | undefined

onMounted(() => {
  const full = String(data.value?.hero.title || '')
  let i = 0
  const step = () => {
    if (i <= full.length) {
      typedTitle.value = full.slice(0, i)
      i += 1
      timer = window.setTimeout(step, i < 6 ? 80 : 36)
    } else {
      showSubtitle.value = true
    }
  }
  step()
})

onBeforeUnmount(() => {
  if (timer) window.clearTimeout(timer)
})
</script>

<style scoped>
.typing {
  white-space: nowrap;
}
.typing .caret {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: currentColor;
  margin-left: 6px;
  animation: caretBlink 1s step-end infinite;
}
@keyframes caretBlink {
  50% { opacity: 0; }
}
@media (max-width: 960px) {
  .typing {
    white-space: normal;
  }
}

.kegiatan-card,
.kegiatan-card:hover {
  cursor: default;
}
</style>

