import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import AboutPage from '../app/pages/about.vue'
import SchedulePage from '../app/pages/schedule.vue'
import ContactPage from '../app/pages/contact.vue'
import BlogIndexPage from '../app/pages/blog/index.vue'

describe('New Static Pages', () => {
  it('AboutPage renders history and team sections', async () => {
    const component = await mountSuspended(AboutPage)
    expect(component.text()).toContain('Visi')
    expect(component.text()).toContain('Misi')
    expect(component.text()).toContain('Perjalanan Kami')
    expect(component.text()).toContain('Pengurus & Pelatih')
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
