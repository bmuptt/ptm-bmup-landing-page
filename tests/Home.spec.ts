import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HomePage from '../app/pages/index.vue'

// Mock TresJS components and core functions
vi.mock('@tresjs/core', () => ({
  useLoop: () => ({ onLoop: vi.fn() })
}))

describe('HomePage', () => {
  it('renders static sections correctly', async () => {
    const component = await mountSuspended(HomePage, {
      global: {
        stubs: {
          Hero3D: true, // Stub the 3D component to avoid rendering issues in test
          TresCanvas: true,
          TresPerspectiveCamera: true,
          TresAmbientLight: true,
          TresDirectionalLight: true,
          TresMesh: true,
          TresSphereGeometry: true,
          TresMeshStandardMaterial: true
        }
      }
    })
    try {
      expect(component.text()).toContain('Kegiatan Kami')
      expect(component.text()).toContain('Hubungi Kami')
    } finally {
      component.unmount()
    }
  })
})
