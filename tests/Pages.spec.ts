import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import AboutPage from '../app/pages/about.vue'
import SchedulePage from '../app/pages/schedule.vue'
import { useLandingData } from '../app/composables/useLandingData'
import ContactPage from '../app/pages/contact.vue'
import BlogIndexPage from '../app/pages/blog/index.vue'
import { sanitizeHtmlContent } from '../app/utils/render-markdown'

describe('New Static Pages', () => {
  it('AboutPage renders history and team sections', async () => {
    vi.stubGlobal('$fetch', vi.fn(async (url: unknown) => {
      const path = String(url)
      if (path.includes('/api/setting/about-timelines/landing')) {
        return {
          success: true,
          data: [
            {
              id: 1,
              year: 2010,
              title: 'Tahun 2010',
              description: 'Desc 2010',
              is_published: true,
              created_by: 0,
              updated_by: 0,
              created_at: '2026-01-01T00:00:00.000Z',
              updated_at: '2026-01-01T00:00:00.000Z',
            },
          ],
          message: 'About timelines retrieved successfully',
          count: 1,
        }
      }

      if (path.includes('/api/setting/about-team-members/landing')) {
        return {
          success: true,
          message: 'About team members retrieved successfully',
          count: 1,
          data: [
            {
              id: 2,
              member_id: 1002,
              member: {
                id: 1002,
                name: 'Member 1002',
                username: 'member1002',
                photo: null,
                active: true,
              },
              role: 'Ketua Umum',
              display_order: 1,
              is_published: true,
              created_by: 0,
              updated_by: 0,
              created_at: '2025-12-28T00:00:00.000Z',
              updated_at: '2025-12-28T00:00:00.000Z',
            },
          ],
        }
      }

      if (path.includes('/api/setting/training-schedules/landing')) {
        return {
          success: true,
          message: 'Training schedules retrieved successfully',
          count: 2,
          data: [
            {
              id: 1,
              day_of_week: 1,
              start_time: '09:00',
              end_time: '10:00',
              category: 'Latihan Umum',
              member_id: 12,
              display_order: 1,
              is_published: true,
              member: {
                id: 12,
                name: 'Pelatih A',
                username: 'pelatih_a',
                photo: null,
                active: true,
              },
              created_by: 0,
              updated_by: 0,
              created_at: '2026-01-02T00:00:00.000Z',
              updated_at: '2026-01-02T00:00:00.000Z',
            },
            {
              id: 2,
              day_of_week: 3,
              start_time: '19:00',
              end_time: '21:00',
              category: 'Junior',
              member_id: null,
              display_order: 2,
              is_published: true,
              created_by: 0,
              updated_by: 0,
              created_at: '2026-01-02T00:00:00.000Z',
              updated_at: '2026-01-02T00:00:00.000Z',
            },
          ],
        }
      }

      if (path.includes('/api/setting/core')) {
        return {
          success: true,
          data: {
            id: 1,
            name: 'PTM BMUP',
            logo: '',
            description: '',
            address: '',
            maps: '',
            primary_color: '#000000',
            secondary_color: '#ffffff',
            created_by: 0,
            updated_by: 0,
            created_at: '2026-01-01T00:00:00.000Z',
            updated_at: '2026-01-01T00:00:00.000Z',
          },
          message: 'OK',
        }
      }

      if (path.includes('/api/setting/landing/sections')) {
        return { success: true, data: [], message: 'OK' }
      }

      if (path.includes('/api/setting/landing/activities')) {
        return { success: true, data: [], message: 'OK', count: 0 }
      }

      throw new Error(`Unhandled $fetch URL: ${path}`)
    }))
    try {
      const component = await mountSuspended(AboutPage)
      expect(component.text()).toContain('Visi')
      expect(component.text()).toContain('Misi')
      expect(component.text()).toContain('Perjalanan Kami')
      expect(component.text()).toContain('Pengurus & Pelatih')
      expect(component.text()).toContain('2010')
      expect(component.text()).toContain('Member 1002')
      expect(component.text()).toContain('M1')
    } finally {
      vi.unstubAllGlobals()
    }
  })

  it('SchedulePage renders table and fees', async () => {
    vi.stubGlobal('$fetch', vi.fn(async (url: unknown) => {
      const path = String(url)

      if (path.includes('/api/setting/training-schedules/landing')) {
        return {
          success: true,
          message: 'Training schedules retrieved successfully',
          count: 2,
          data: [
            {
              id: 1,
              day_of_week: 1,
              start_time: '09:00',
              end_time: '10:00',
              category: 'Latihan Umum',
              member_id: 12,
              display_order: 1,
              is_published: true,
              member: {
                id: 12,
                name: 'Pelatih A',
                username: 'pelatih_a',
                photo: null,
                active: true,
              },
              created_by: 0,
              updated_by: 0,
              created_at: '2026-01-02T00:00:00.000Z',
              updated_at: '2026-01-02T00:00:00.000Z',
            },
            {
              id: 2,
              day_of_week: 3,
              start_time: '19:00',
              end_time: '21:00',
              category: 'Junior',
              member_id: null,
              display_order: 2,
              is_published: true,
              created_by: 0,
              updated_by: 0,
              created_at: '2026-01-02T00:00:00.000Z',
              updated_at: '2026-01-02T00:00:00.000Z',
            },
          ],
        }
      }

      if (path.includes('/api/setting/about-timelines/landing')) {
        return { success: true, data: [], message: 'OK', count: 0 }
      }

      if (path.includes('/api/setting/about-team-members/landing')) {
        return { success: true, data: [], message: 'OK', count: 0 }
      }

      if (path.includes('/api/setting/core')) {
        return { success: true, data: null, message: 'OK' }
      }

      if (path.includes('/api/setting/landing/sections')) {
        return { success: true, data: [], message: 'OK' }
      }

      if (path.includes('/api/setting/landing/activities')) {
        return { success: true, data: [], message: 'OK', count: 0 }
      }

      throw new Error(`Unhandled $fetch URL: ${path}`)
    }))

    try {
      const component = await mountSuspended(SchedulePage)
      expect(component.text()).toContain('Jadwal Latihan')
      expect(component.text()).toContain('Biaya Keanggotaan')
      expect(component.text()).toContain('Catatan Penting')
      expect(component.text()).toContain('Senin')
      expect(component.text()).toContain('09:00 - 10:00')
      expect(component.text()).toContain('Pelatih A')
      expect(component.text()).toContain('Rabu')
      expect(component.text()).toContain('19:00 - 21:00')
      expect(component.text()).toContain('-')
    } finally {
      vi.unstubAllGlobals()
    }
  })

  it('ContactPage renders contact info and form', async () => {
    const component = await mountSuspended(ContactPage)
    expect(component.text()).toContain('Hubungi Kami')
    expect(component.text()).toContain('Informasi Kontak')
    expect(component.text()).toContain('Kirim Pesan')
    // Check for form labels
    expect(component.text()).toContain('Nama Lengkap')
    expect(component.text()).toContain('Email / WhatsApp')
  })

  it('GalleryPage renders images with alt text from title', async () => {
    vi.stubGlobal('$fetch', vi.fn(async (url: unknown) => {
      const path = String(url)

      if (path.includes('/api/setting/gallery-items/landing')) {
        return {
          success: true,
          message: 'Gallery items retrieved successfully',
          count: 2,
          data: [
            {
              id: 2,
              image_url: 'https://example.com/b.jpg',
              title: 'B',
              display_order: 1,
              is_published: true,
              created_by: 0,
              updated_by: 0,
              created_at: '2026-01-02T00:00:00.000Z',
              updated_at: '2026-01-02T00:00:00.000Z',
            },
            {
              id: 1,
              image_url: 'https://example.com/a.jpg',
              title: 'A',
              display_order: 1,
              is_published: true,
              created_by: 0,
              updated_by: 0,
              created_at: '2026-01-02T00:00:00.000Z',
              updated_at: '2026-01-02T00:00:00.000Z',
            },
          ],
        }
      }

      if (path.includes('/api/setting/core')) {
        return { success: true, data: null, message: 'OK' }
      }

      if (path.includes('/api/setting/landing/sections')) {
        return { success: true, data: [], message: 'OK' }
      }

      if (path.includes('/api/setting/landing/activities')) {
        return { success: true, data: [], message: 'OK', count: 0 }
      }

      if (path.includes('/api/setting/about-timelines/landing')) {
        return { success: true, data: [], message: 'OK', count: 0 }
      }

      if (path.includes('/api/setting/about-team-members/landing')) {
        return { success: true, data: [], message: 'OK', count: 0 }
      }

      if (path.includes('/api/setting/training-schedules/landing')) {
        return { success: true, data: [], message: 'OK', count: 0 }
      }

      throw new Error(`Unhandled $fetch URL: ${path}`)
    }))

    try {
      const landingData = await useLandingData()
      expect(landingData.gallery).toEqual([
        { id: 2, src: 'https://example.com/b.jpg', title: 'B' },
        { id: 1, src: 'https://example.com/a.jpg', title: 'A' },
      ])

      const gallerySfcPath = resolve(process.cwd(), 'app/pages/gallery.vue')
      const gallerySfc = readFileSync(gallerySfcPath, 'utf8')
      expect(gallerySfc).toContain(':alt="item.title"')
    } finally {
      vi.unstubAllGlobals()
    }
  })

  it('BlogIndexPage renders highlight and article list', async () => {
    vi.stubGlobal('$fetch', vi.fn(async (url: unknown) => {
      const path = String(url)

      if (path.includes('/api/setting/blog-posts/landing/featured')) {
        return {
          success: true,
          message: 'Featured blog posts retrieved successfully',
          count: 1,
          data: [
            {
              id: 2,
              slug: 'featured-post',
              title: 'Featured Post',
              excerpt: null,
              content: '<p>Featured</p>',
              cover_image_url: null,
              status: 'published',
              published_at: '2026-01-02T00:00:00.000Z',
              is_featured: true,
              meta_title: null,
              meta_description: null,
              og_image_url: null,
              created_by: 0,
              updated_by: 0,
              created_at: '2026-01-02T00:00:00.000Z',
              updated_at: '2026-01-02T00:00:00.000Z',
            },
          ],
        }
      }

      if (path.includes('/api/setting/blog-posts/landing')) {
        return {
          success: true,
          message: 'Blog posts retrieved successfully',
          page: 1,
          limit: 9,
          total: 1,
          totalPages: 1,
          data: [
            {
              id: 1,
              slug: 'my-post',
              title: 'My Post',
              excerpt: null,
              content: '<p>Hello</p>',
              cover_image_url: null,
              status: 'published',
              published_at: '2026-01-02T00:00:00.000Z',
              is_featured: false,
              meta_title: null,
              meta_description: null,
              og_image_url: null,
              created_by: 0,
              updated_by: 0,
              created_at: '2026-01-02T00:00:00.000Z',
              updated_at: '2026-01-02T00:00:00.000Z',
            },
          ],
        }
      }

      throw new Error(`Unhandled $fetch URL: ${path}`)
    }))

    try {
      const component = await mountSuspended(BlogIndexPage)
      expect(component.text()).toContain('Berita & Artikel')
      expect(component.text()).toContain('Highlight')
      expect(component.text()).toContain('Featured Post')
      expect(component.text()).toContain('My Post')
      expect(component.text()).toContain('Baca Selengkapnya')
      expect(component.findAll('.excerpt-clamp').length).toBeGreaterThan(0)
    } finally {
      vi.unstubAllGlobals()
    }
  })

  it('BlogDetailPage renders sanitized HTML content by slug', async () => {
    const $fetchMock = vi.fn(async (url: unknown) => {
      const path = String(url)

      if (path.includes('/api/setting/blog-posts/landing/my-post')) {
        return {
          success: true,
          message: 'Blog post retrieved successfully',
          data: {
            id: 1,
            slug: 'my-post',
            title: 'My Post',
            excerpt: null,
            content: '<p>Hello</p><script>alert(1)</script>',
            cover_image_url: null,
            status: 'published',
            published_at: '2026-01-02T00:00:00.000Z',
            is_featured: false,
            meta_title: null,
            meta_description: null,
            og_image_url: null,
            created_by: 0,
            updated_by: 0,
            created_at: '2026-01-02T00:00:00.000Z',
            updated_at: '2026-01-02T00:00:00.000Z',
          },
        }
      }

      if (path.includes('/api/setting/core')) {
        return { success: true, data: null, message: 'OK' }
      }

      if (path.includes('/api/setting/landing/sections')) {
        return { success: true, data: [], message: 'OK' }
      }

      if (path.includes('/api/setting/landing/activities')) {
        return { success: true, data: [], message: 'OK', count: 0 }
      }

      throw new Error(`Unhandled $fetch URL: ${path}`)
    })
    vi.stubGlobal('$fetch', $fetchMock)

    try {
      vi.resetModules()
      vi.doMock('nuxt/app', async () => {
        const actual = await vi.importActual<typeof import('nuxt/app')>('nuxt/app')
        return {
          ...actual,
          useRoute: () => ({
            params: { id: 'my-post' },
            path: '/blog/my-post',
            fullPath: '/blog/my-post',
            query: {},
          }),
        }
      })

      const { default: BlogDetailPage } = await import('../app/pages/blog/[id].vue')
      const component = await mountSuspended(BlogDetailPage)
      await component.vm.$nextTick()
      await component.vm.$nextTick()

      expect($fetchMock).toHaveBeenCalled()
      expect(component.text()).toContain('My Post')
      expect(component.text()).toContain('Hello')
      expect(component.html()).not.toContain('<script')
    } finally {
      vi.doUnmock('nuxt/app')
      vi.resetModules()
      vi.unstubAllGlobals()
    }
  })

  it('sanitizeHtmlContent strips scripts', () => {
    const safe = sanitizeHtmlContent('<p>Hello</p><script>alert(1)</script>')
    expect(safe).toContain('<p>Hello</p>')
    expect(safe).not.toContain('<script')
  })
})
