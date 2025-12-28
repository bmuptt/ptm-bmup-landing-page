<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold text-primary mb-4">Galeri Kegiatan</h1>
      <p class="text-h6 text-medium-emphasis">Momen-momen seru bersama komunitas PTM BMUP</p>
    </div>

    <v-row>
      <v-col
        v-for="(image, index) in (data?.gallery || [])"
        :key="index"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card elevation="2" class="rounded-lg overflow-hidden">
          <ClientOnly>
            <v-img
              :src="image"
              aspect-ratio="1.5"
              cover
              class="bg-grey-lighten-2"
            >
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="primary" />
                </div>
              </template>
            </v-img>
          </ClientOnly>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAsyncData, useSeoMeta, createError } from 'nuxt/app'
import { useLandingData } from '~/composables/useLandingData'

const { data } = await useAsyncData('landing', () => Promise.resolve(useLandingData()))

if (!data.value && import.meta.server) {
  throw createError({ statusCode: 500, statusMessage: 'Failed to load landing data' })
}

useSeoMeta({
  title: 'Galeri - PTM BMUP',
  description: 'Lihat dokumentasi kegiatan dan keseruan di PTM BMUP.',
})
</script>
