export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // publicRuntimeConfig: {},
  privateRuntimeConfig: {
    ADMIN_HOST_IP: process.env.ADMIN_HOST_IP,
    ADMIN_CONTENT_KEY: process.env.ADMIN_CONTENT_KEY,
    CLOUD_NAME: process.env.CLOUD_NAME,
    CLOUD_API_KEY: process.env.CLOUD_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'defite-nuxt-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
    // svg loader
    '@nuxtjs/svg',
    // https://image.nuxtjs.org/
    '@nuxt/image',
  ],

  image: {
    domains: ['http://31.135.64.110:2368', 'https://images.unsplash.com'],
    provider: 'cloudinary',
    cloudinary: {
      baseURL: 'https://res.cloudinary.com/webgrower/image/fetch/blog',
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-ghost',
  ],

  ghost: {
    /**
     * Your Ghost url
     */
    url: process.env.ADMIN_HOST_IP,

    /**
     * Your content api key
     */
    key: process.env.ADMIN_CONTENT_KEY,

    /**
     * Version
     * default: v4
     */
    version: 'v4',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-nord.css',
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Color Mode settings
  colorMode: {
    classSuffix: '',
  },

  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        const { text } = require('reading-time')(document.text)

        document.readingTime = text
      }
    },
  },
}
