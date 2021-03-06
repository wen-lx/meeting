export default {
  // router
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'exception',
        path: '*',
        component: resolve(__dirname, 'pages/result_page/404.vue')
      })
    }
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'meeting-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/font-awesome/css/font-awesome.min.css',
    '~styles/vant-style.stylus',
    '~styles/init.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {
      src: '~plugins/vant.js', ssr: true
    }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios'
  ],
  // axios: {
  //   baseURL: 'http://hzhsdev.seetatech.com:8088'
  // },
  axios: {
    proxy: true,
    prefix: '/seeta/register'
  },
  proxy: {
    '/seeta/register': 'http://hzhsdev.seetatech.com:8088'
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
