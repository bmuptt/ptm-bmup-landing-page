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
      siteUrl: 'http://localhost:3101',
      apiBase: 'https://api.example.com',
      backendUrlSetting: 'http://localhost:3200',
      appName: 'PTM BMUP',
      nodeEnv: 'development'
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
