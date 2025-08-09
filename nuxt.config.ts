// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    runtimeConfig: {
    public: {
      extApiBase: 'https://jsonplaceholder.typicode.com', // Variable pública (cliente + servidor)
      intApiBase: '/api' // Ruta para la API interna (Nitro)
    }
  }
})
