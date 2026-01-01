import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AboutPage from '../app/pages/about.vue'
import SchedulePage from '../app/pages/schedule.vue'
import ContactPage from '../app/pages/contact.vue'
import BlogIndexPage from '../app/pages/blog/index.vue'

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
    } finally {
      vi.unstubAllGlobals()
    }
  })

  it('SchedulePage renders table and fees', async () => {
    const component = await mountSuspended(SchedulePage)
    expect(component.text()).toContain('Jadwal Latihan')
    expect(component.text()).toContain('Biaya Keanggotaan')
    expect(component.text()).toContain('Catatan Penting')
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

  it('BlogIndexPage renders article list', async () => {
    const component = await mountSuspended(BlogIndexPage)
    expect(component.text()).toContain('Berita & Artikel')
    // Check if at least one read more button exists
    expect(component.text()).toContain('Baca Selengkapnya')
  })
})
