// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["vuetify/styles"],
  plugins: ["@/plugins/vuetify.ts"],
  build: {
    transpile: ["vuetify"],
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || "https://jsonplaceholder.typicode.com",
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
});
