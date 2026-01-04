<template>
  <v-container class="py-16">
    <div v-if="pending" class="d-flex justify-center py-12">
      <v-progress-circular indeterminate color="primary" size="48" />
    </div>

    <div v-else-if="post">
      <v-btn
        variant="text"
        prepend-icon="mdi-arrow-left"
        to="/blog"
        class="mb-6"
      >
        Kembali ke Blog
      </v-btn>

      <article>
        <h1 class="text-h3 font-weight-bold text-primary mb-4">{{ post.title }}</h1>
        <div class="d-flex align-center text-medium-emphasis mb-8">
          <v-icon icon="mdi-calendar" class="mr-2" size="small"/>
          <span>{{ formatPublishedAt(post.published_at) }}</span>
        </div>

        <ClientOnly v-if="post.cover_image_url">
          <v-img
            :src="post.cover_image_url"
            height="400"
            cover
            class="rounded-lg mb-8 elevation-2"
          />
        </ClientOnly>

        <div class="text-body-1" style="line-height: 1.8; max-width: 800px; margin: 0 auto;">
          <div class="blog-content" v-html="sanitizedContent"/>
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
import { fetchLandingBlogPostBySlug } from '~/composables/useBlogPosts'
import { sanitizeHtmlContent, toPlainTextFromHtml } from '~/utils/render-markdown'
defineOptions({ name: 'BlogDetailPage' })

const route = useRoute()

const slug = computed(() => {
  const raw = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  const fromParams = String(raw || '').trim()
  if (fromParams) return fromParams

  const rawPath = String(route.path || route.fullPath || '')
  const [pathWithoutQuery = ''] = rawPath.split('?')
  const [normalizedPath = ''] = pathWithoutQuery.split('#')
  const parts = normalizedPath.split('/').filter(Boolean)
  if (parts[0] !== 'blog') return ''
  const segment = parts[1]
  if (!segment) return ''
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
})

const { data: post, pending } = await useAsyncData(
  () => `blog-post-landing-${slug.value}`,
  () => fetchLandingBlogPostBySlug(slug.value),
  { watch: [slug] },
)

if (!post.value && import.meta.server) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const formatPublishedAt = (publishedAt: string | null) => {
  if (!publishedAt) return ''
  const date = new Date(publishedAt)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(date)
}

const metaDescription = computed(() => {
  const explicit = String(post.value?.meta_description || '').trim()
  if (explicit) return explicit

  const excerpt = String(post.value?.excerpt || '').trim()
  if (excerpt) return excerpt

  const plain = toPlainTextFromHtml(post.value?.content || '')
  const max = 160
  if (!plain) return ''
  if (plain.length <= max) return plain
  return `${plain.slice(0, max).trim()}...`
})

const sanitizedContent = computed(() => sanitizeHtmlContent(post.value?.content || ''))

const seoTitle = computed(() => {
  return String(post.value?.meta_title || post.value?.title || '').trim() || 'Artikel Tidak Ditemukan'
})

const seoImage = computed(() => {
  return String(post.value?.og_image_url || post.value?.cover_image_url || '').trim()
})

useSeoMeta({
  title: seoTitle,
  description: metaDescription,
  ogTitle: seoTitle,
  ogDescription: metaDescription,
  ogImage: seoImage,
})
</script>

<style scoped>
.blog-content :deep(p) {
  margin: 0 0 1em;
}

.blog-content :deep(p:last-child) {
  margin-bottom: 0;
}

.blog-content :deep(p:empty) {
  min-height: 1em;
}

.blog-content :deep(p:empty)::before {
  content: '\00a0';
}
</style>
