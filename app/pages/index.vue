<template>
  <div>
    <section class="position-relative">
      <ClientOnly>
        <v-img
          :src="data?.hero.image"
          height="500"
          cover
          class="align-center"
          gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.6)"
        >
          <div class="text-center text-white w-100 px-4">
            <h1 class="text-h2 font-weight-bold mb-4">{{ data?.hero.title }}</h1>
            <p class="text-h5 mb-6">{{ data?.hero.subtitle }}</p>
            <v-btn color="accent" size="large" rounded="pill" class="px-8 font-weight-bold">
              {{ data?.hero.cta }}
            </v-btn>
          </div>
        </v-img>
      </ClientOnly>
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
          <v-col v-for="activity in data?.activities" :key="activity.id" cols="12" md="4">
            <v-card class="h-100 text-center py-8 px-4" elevation="2" hover>
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
import { useLandingData } from '~/composables/useLandingData'

const { data } = await useAsyncData('landing', () => Promise.resolve(useLandingData()))

useSeoMeta({
  title: 'Home - PTM BMUP',
  description: 'Selamat datang di website resmi PTM BMUP.',
})
</script>

