<template>
  <v-container class="py-16">
    <div class="text-center mb-12">
      <h1 class="text-h3 font-weight-bold text-primary mb-4">Berita & Artikel</h1>
      <p class="text-h6 text-medium-emphasis">Update terbaru seputar kegiatan dan tips tenis meja.</p>
    </div>

    <div v-if="pendingFeatured" class="d-flex justify-center py-6">
      <v-progress-circular indeterminate color="primary" size="36" />
    </div>

    <section v-else-if="featuredPosts.length > 0" class="mb-12">
      <div class="d-flex align-center justify-space-between mb-6">
        <h2 class="text-h5 font-weight-bold">Highlight</h2>
      </div>

      <v-row>
        <v-col
          v-for="post in featuredPosts"
          :key="post.id"
          cols="12"
          md="4"
        >
          <v-card class="h-100 d-flex flex-column" hover :to="`/blog/${post.slug}`">
            <ClientOnly>
              <template v-if="post.cover_image_url">
                <v-img
                  :src="post.cover_image_url"
                  height="200"
                  cover
                  class="align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                >
                  <v-card-title class="text-white text-subtitle-2">
                    {{ formatPublishedAt(post.published_at) }}
                  </v-card-title>
                </v-img>
              </template>
              <template v-else>
                <div class="bg-grey-lighten-3 d-flex align-end" style="height: 200px;">
                  <div class="pa-4 text-white" style="width: 100%; background: linear-gradient(to bottom, rgba(0,0,0,.05), rgba(0,0,0,.6));">
                    <div class="text-subtitle-2">{{ formatPublishedAt(post.published_at) }}</div>
                  </div>
                </div>
              </template>
            </ClientOnly>

            <v-card-item>
              <v-card-title class="font-weight-bold pt-4 mb-2" style="white-space: normal; line-height: 1.4;">
                {{ post.title }}
              </v-card-title>
            </v-card-item>

            <v-card-text class="flex-grow-1">
              <p class="text-body-2 text-medium-emphasis mb-4 excerpt-clamp">
                {{ getExcerpt(post) }}
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
    </section>

    <div v-if="pendingPosts" class="d-flex justify-center py-12">
      <v-progress-circular indeterminate color="primary" size="48" />
    </div>

    <v-row v-else>
      <v-col
        v-for="post in posts"
        :key="post.id"
        cols="12"
        md="4"
      >
        <v-card class="h-100 d-flex flex-column" hover :to="`/blog/${post.slug}`">
          <ClientOnly>
            <template v-if="post.cover_image_url">
              <v-img
                :src="post.cover_image_url"
                height="200"
                cover
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              >
                <v-card-title class="text-white text-subtitle-2">
                  {{ formatPublishedAt(post.published_at) }}
                </v-card-title>
              </v-img>
            </template>
            <template v-else>
              <div class="bg-grey-lighten-3 d-flex align-end" style="height: 200px;">
                <div class="pa-4 text-white" style="width: 100%; background: linear-gradient(to bottom, rgba(0,0,0,.05), rgba(0,0,0,.6));">
                  <div class="text-subtitle-2">{{ formatPublishedAt(post.published_at) }}</div>
                </div>
              </div>
            </template>
          </ClientOnly>
          
          <v-card-item>
            <v-card-title class="font-weight-bold pt-4 mb-2" style="white-space: normal; line-height: 1.4;">
              {{ post.title }}
            </v-card-title>
          </v-card-item>

          <v-card-text class="flex-grow-1">
            <p class="text-body-2 text-medium-emphasis mb-4 excerpt-clamp">
              {{ getExcerpt(post) }}
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

    <div v-if="!pendingPosts && posts.length === 0" class="text-center py-16">
      <h2 class="text-h5 text-medium-emphasis mb-4">Belum ada artikel</h2>
      <p class="text-body-2 text-medium-emphasis">Silakan kembali lagi nanti untuk update terbaru.</p>
    </div>

    <div v-if="totalPages > 1" class="d-flex justify-center mt-10">
      <v-pagination
        v-model="paginationPage"
        :length="totalPages"
        :total-visible="7"
        color="primary"
        variant="tonal"
        density="comfortable"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useAsyncData, useRoute, useRouter, useSeoMeta } from 'nuxt/app'
import { computed } from 'vue'
import { fetchLandingBlogPosts, fetchLandingFeaturedBlogPosts } from '~/composables/useBlogPosts'
import type { BlogPost } from '~/model/blog'
import { toPlainTextFromHtml } from '~/utils/render-markdown'

defineOptions({ name: 'BlogIndexPage' })

const route = useRoute()
const router = useRouter()

const page = computed(() => {
  const raw = Array.isArray(route.query.page) ? route.query.page[0] : route.query.page
  const parsed = Number(raw ?? 1)
  if (!Number.isFinite(parsed)) return 1
  return Math.max(1, Math.floor(parsed))
})

const limit = 9

const { data, pending: pendingPosts, error } = await useAsyncData(
  'blog-posts-landing',
  () => fetchLandingBlogPosts({ page: page.value, limit }),
  { watch: [page] },
)

if (error.value && import.meta.server) {
  throw error.value
}

const { data: featuredData, pending: pendingFeatured } = await useAsyncData(
  'blog-posts-featured-landing',
  () => fetchLandingFeaturedBlogPosts({ limit: 3 }),
)

const posts = computed(() => data.value?.data ?? [])
const featuredPosts = computed(() => featuredData.value ?? [])
const totalPages = computed(() => data.value?.totalPages ?? 0)

const paginationPage = computed({
  get: () => page.value,
  set: async (nextPage: number) => {
    const normalized = Math.max(1, Math.floor(nextPage || 1))
    await router.push({
      query: {
        ...route.query,
        page: normalized === 1 ? undefined : String(normalized),
      },
    })
  },
})

const formatPublishedAt = (publishedAt: string | null) => {
  if (!publishedAt) return ''
  const date = new Date(publishedAt)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(date)
}

const getExcerpt = (post: BlogPost) => {
  const explicit = String(post.excerpt || '').trim()
  if (explicit) return explicit

  const plain = toPlainTextFromHtml(post.content || '')
  if (!plain) return ''

  const max = 160
  if (plain.length <= max) return plain
  return `${plain.slice(0, max).trim()}...`
}

const seoTitle = computed(() => {
  const pageSuffix = page.value > 1 ? ` (Page ${page.value})` : ''
  return `Blog & Berita${pageSuffix} - PTM BMUP`
})

useSeoMeta({
  title: seoTitle,
  description: 'Baca berita terbaru turnamen, tips latihan, dan info kegiatan PTM BMUP.',
})
</script>

<style scoped>
.excerpt-clamp {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  line-height: 1.5;
  max-height: 4.5em;
  word-break: break-word;
  white-space: normal;
}
</style>
