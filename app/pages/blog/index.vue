<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold text-primary mb-4">Berita & Artikel</h1>
      <p class="text-h6 text-medium-emphasis">Update terbaru seputar kegiatan dan tips tenis meja.</p>
    </div>

    <v-row>
      <v-col
        v-for="article in (data?.blogData || [])"
        :key="article.id"
        cols="12"
        md="4"
      >
        <v-card class="h-100 d-flex flex-column" hover :to="`/blog/${article.id}`">
          <ClientOnly>
            <v-img
              :src="article.image"
              height="200"
              cover
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="text-white text-subtitle-2">
                {{ article.date }}
              </v-card-title>
            </v-img>
          </ClientOnly>
          
          <v-card-item>
            <v-card-title class="font-weight-bold pt-4 mb-2" style="white-space: normal; line-height: 1.4;">
              {{ article.title }}
            </v-card-title>
          </v-card-item>

          <v-card-text class="flex-grow-1">
            <p class="text-body-2 text-medium-emphasis mb-4">
              {{ article.excerpt }}
            </p>
          </v-card-text>
          
          <v-card-actions class="pa-4 pt-0">
            <v-btn color="secondary" variant="text" append-icon="mdi-arrow-right">
              Baca Selengkapnya
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="!(data?.blogData && data.blogData.length)" class="text-center mt-8">
      <v-btn color="secondary" variant="text" append-icon="mdi-arrow-right">
        Baca Selengkapnya
      </v-btn>
    </div>
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
  title: 'Blog & Berita - PTM BMUP',
  description: 'Baca berita terbaru turnamen, tips latihan, dan info kegiatan PTM BMUP.',
})
</script>
