import { defineEventHandler, getQuery, createError } from 'h3'

const toJoinedPath = (value: unknown) => {
  if (Array.isArray(value)) return value.map((part) => String(part)).join('/')
  return String(value || '')
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const backendUrlSetting = String(config.public.backendUrlSetting || '').replace(/\/+$/, '')
  if (!backendUrlSetting) {
    throw createError({ statusCode: 500, statusMessage: 'Backend URL is not configured' })
  }

  const params = event.context.params as Record<string, unknown> | undefined
  const path = toJoinedPath(params?.path).replace(/^\/+/, '')
  const query = getQuery(event)
  const targetUrl = `${backendUrlSetting}/api/setting/${path}`

  return await $fetch(targetUrl, {
    method: 'GET',
    query,
  })
})

