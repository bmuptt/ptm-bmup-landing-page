import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HomePage from '../app/pages/index.vue'

describe('HomePage', () => {
  it('renders static sections correctly', async () => {
    const component = await mountSuspended(HomePage)
    expect(component.text()).toContain('Kegiatan Kami')
    expect(component.text()).toContain('Hubungi Kami')
  })
})
