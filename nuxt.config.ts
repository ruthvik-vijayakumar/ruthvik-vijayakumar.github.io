// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss,
      autoprefixer,
    },
  },
  runtimeConfig: {
    public: {
      /** Google Analytics 4 measurement ID (G-XXXXXXXXXX). Set NUXT_PUBLIC_GTAG_ID in .env */
      gtagId: process.env.NUXT_PUBLIC_GTAG_ID || "",
    },
  },
  nitro: {
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: ["/", "/portfolio", "/experience", "/blog"],
    },
  },
  modules: ["@nuxt/image", "@nuxt/content", "nuxt-gtag", "nuxt-studio"],
  studio: {
    // Studio admin route (default: '/_studio')
    route: '/_studio',
    
    // Git repository configuration (owner and repo are required)
    repository: {
      provider: 'github', // 'github' or 'gitlab'
      owner: 'ruthvik-vijayakumar', // your GitHub/GitLab username or organization
      repo: 'ruthvik-vijayakumar.github.io', // your repository name
      branch: 'main', // the branch to commit to (default: main)
    }
  },
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || "GTM-PMBS54GL",
  },
  app: {
    head: {
      title: "Ruthvik Vijayakumar",
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Yrsa:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap",
        },
      ],
      bodyAttrs: {
        class: "leading-relaxed antialiased",
      },
    },
  },
});