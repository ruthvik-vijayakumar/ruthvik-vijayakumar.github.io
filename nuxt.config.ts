// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@nuxt/image', '@nuxt/content', 'nuxt-gtag'],
  gtag: {
    id: 'GTM-PMBS54GL'
  },
  app: {
    head: {
      title: "Ruthvik Vijaykaumar",
      bodyAttrs: {
        class: 'bg-slate-900 leading-relaxed text-slate-400 antialiased selection:bg-teal-300 selection:text-teal-900',
      },
    },
  }

})