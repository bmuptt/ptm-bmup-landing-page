import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import DefaultLayout from '../app/layouts/default.vue'

describe('DefaultLayout', () => {
  it('renders desktop navigation buttons', async () => {
    const component = await mountSuspended(DefaultLayout, {
      slots: { default: '<div>content</div>' }
    })
    expect(component.text()).toContain('Home')
    expect(component.text()).toContain('Galeri')
  })

  it('renders mobile menu icon button', async () => {
    const component = await mountSuspended(DefaultLayout, {
      slots: { default: '<div>content</div>' }
    })
    const buttons = component.findAll('.d-md-none')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
