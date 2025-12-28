import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(({ vueApp }) => {
  const originalWarn = console.warn
  console.warn = (...args: unknown[]) => {
    const first = args[0]
    const text = typeof first === 'string' ? first : String(first)
    if (
      text.includes('provide() can only be used inside setup()') ||
      text.includes('inject() can only be used inside setup()') ||
      text.includes('onMounted is called when there is no active component instance')
    ) {
      return
    }
    Reflect.apply(originalWarn, console, args)
  }
  vueApp.config.warnHandler = (msg) => {
    const message = typeof msg === 'string' ? msg : String(msg)
    if (message.includes('provide() can only be used inside setup()')) return
    if (message.includes('inject() can only be used inside setup()')) return
    Reflect.apply(originalWarn, console, [message])
  }
})
