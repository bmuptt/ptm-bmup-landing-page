<template>
  <v-container class="py-16">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold text-primary mb-4">{{ data?.about.title }}</h1>
      <p class="text-h6 text-medium-emphasis max-width-800 mx-auto">
        {{ data?.about.description }}
      </p>
    </div>

    <!-- Vision & Mission -->
    <v-row class="mb-16">
      <v-col cols="12" md="6">
        <v-card class="h-100 pa-6" color="primary" variant="tonal">
          <v-card-title class="text-h4 font-weight-bold mb-4">Visi</v-card-title>
          <v-card-text class="text-h6">
            "{{ data?.aboutPage.vision }}"
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="h-100 pa-6" border>
          <v-card-title class="text-h4 font-weight-bold mb-4 text-primary">Misi</v-card-title>
          <v-list density="comfortable">
            <v-list-item
              v-for="(mission, index) in data?.aboutPage.mission"
              :key="index"
              :title="mission"
            >
              <template #prepend>
                <v-icon color="secondary" icon="mdi-check-circle" class="mr-3"/>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>

    <!-- History Timeline -->
    <div class="mb-16">
      <h2 class="text-h4 font-weight-bold text-center mb-8">Perjalanan Kami</h2>
      <v-timeline align="start" side="end">
        <v-timeline-item
          v-for="(item, i) in data?.aboutPage.history"
          :key="i"
          :dot-color="i % 2 === 0 ? 'primary' : 'secondary'"
          size="small"
        >
          <template #opposite>
            <div class="pt-1 headline font-weight-bold text-primary">{{ item.year }}</div>
          </template>
          <div>
            <h3 class="text-h6 font-weight-bold mb-2">{{ item.title }}</h3>
            <div class="text-body-1 text-medium-emphasis">
              {{ item.description }}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>

    <!-- Team / Committee -->
    <div>
      <h2 class="text-h4 font-weight-bold text-center mb-12">Pengurus & Pelatih</h2>
      <v-row>
        <v-col
          v-for="(person, index) in data?.aboutPage.teams"
          :key="index"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card class="text-center pa-4" elevation="2">
            <ClientOnly>
              <v-avatar size="120" class="mb-4">
                <v-img :src="person.image" cover alt="Foto Profil"/>
              </v-avatar>
            </ClientOnly>
            <h3 class="text-h6 font-weight-bold">{{ person.name }}</h3>
            <p class="text-subtitle-1 text-primary">{{ person.role }}</p>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useAsyncData, useSeoMeta } from 'nuxt/app'
import { useLandingData } from '~/composables/useLandingData'
defineOptions({ name: 'AboutPage' })

const { data } = await useAsyncData('landing', () => Promise.resolve(useLandingData()))

useSeoMeta({
  title: 'Tentang Kami - PTM BMUP',
  description: 'Kenali lebih dekat sejarah, visi misi, dan pengurus PTM BMUP.',
})
</script>
