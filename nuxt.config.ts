// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  app: {
    head: {
      meta: [
        { name: 'p:domain_verify', content: '2012aca8232b82b17619e74facf7aaee' }
      ]
    }
  },

  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    // '@nuxtjs/google-fonts'
    // '@nuxt/eslint'
  ],
  ui: {
    fonts: false,
  
  },

  runtimeConfig: {
    // 私有配置，仅在服务器端可用
    // apiSecret: process.env.API_SECRET,
    
    // 公共配置，在客户端和服务器端都可用
    public: {
      kksBaseUrl: process.env.NUXT_KKSWEB_BASE_URL
    }
  },

  css: ['~/assets/css/main.css','~/assets/css/main-variables.css'],

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-11-27',
  
  nitro: {
    routeRules: {
      '/webview': {
        headers: {
          'Content-Security-Policy': "upgrade-insecure-requests;",
        }
      }
    }
  }
})
