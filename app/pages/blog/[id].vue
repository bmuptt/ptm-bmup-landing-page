<template>
  <v-container class="py-16">
    <div v-if="article">
      <v-btn
        variant="text"
        prepend-icon="mdi-arrow-left"
        to="/blog"
        class="mb-6"
      >
        Kembali ke Blog
      </v-btn>

      <article>
        <h1 class="text-h3 font-weight-bold text-primary mb-4">{{ article.title }}</h1>
        <div class="d-flex align-center text-medium-emphasis mb-8">
          <v-icon icon="mdi-calendar" class="mr-2" size="small"/>
          <span>{{ article.date }}</span>
        </div>

        <ClientOnly>
          <v-img
            :src="article.image"
            height="400"
            cover
            class="rounded-lg mb-8 elevation-2"
          />
        </ClientOnly>

        <div class="text-body-1" style="line-height: 1.8; max-width: 800px; margin: 0 auto;">
          <div :innerHTML="sanitizedContent"/>
        </div>
      </article>
    </div>
    
    <div v-else class="text-center py-16">
      <h2 class="text-h4 text-medium-emphasis mb-4">Artikel tidak ditemukan</h2>
      <v-btn color="primary" to="/blog">Lihat Artikel Lain</v-btn>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute, useAsyncData, useSeoMeta, createError } from 'nuxt/app'
import { computed } from 'vue'
import { useLandingData } from '~/composables/useLandingData'
import type { BlogArticle } from '~/model/blog'
defineOptions({ name: 'BlogDetailPage' })

const route = useRoute()
const { data } = await useAsyncData('landing', () => Promise.resolve(useLandingData()))

const article = computed(() => {
  const id = Number(route.params.id)
  const list = (data.value?.blogData ?? []) as BlogArticle[]
  return list.find((item) => item.id === id)
})

if (!article.value && import.meta.server) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page Not Found'
  })
}

const sanitizedContent = computed(() => {
  const html = article.value?.content || ''
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/href="javascript:[^"]*"/gi, 'href="#"')
    .replace(/style="[^"]*"/gi, '')
})

useSeoMeta({
  title: article.value ? `${article.value.title} - Blog PTM BMUP` : 'Artikel Tidak Ditemukan',
  description: article.value?.excerpt,
})
</script>
