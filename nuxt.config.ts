// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  srcDir: 'app',
  devServer: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3101,
    host: 'localhost'
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3101',
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://api.example.com',
      backendUrlSetting: process.env.NUXT_PUBLIC_BACKEND_URL_SETTING || 'http://localhost:3200',
      appName: 'PTM BMUP',
      nodeEnv: process.env.NODE_ENV || 'development'
    }
  },

  modules: [
    '@nuxt/test-utils/module',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/fonts',
    'vuetify-nuxt-module',
    '@nuxtjs/seo',
    '@tresjs/nuxt'
  ],

  css: [
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  build: {
    transpile: ['vuetify'],
  },

  features: {
    devLogs: false,
  },

  vuetify: {
    moduleOptions: {
      ssrClientHints: {
        viewportSize: true,
        prefersColorScheme: true,
        reloadOnFirstRequest: true,
      },
    },
    vuetifyOptions: {
      theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {
              primary: '#2E7D32',
              secondary: '#1565C0',
              accent: '#FFC107',
              background: '#F5F5F5',
            },
          },
        },
      },
      ssr: {
        clientWidth: 1280,
        clientHeight: 800,
      },
    },
  },

  future: {
    compatibilityVersion: 4,
  },
})
