export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  nitro: {
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    security: {
      nonce: true,
    },
  },
  app: {
    head: {
      title: 'Crypto Trade Bot',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Telegram Mini App Crypto Trading Bot' },
        { name: 'theme-color', content: '#1e293b' },
        // Security headers
        { 
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; script-src 'self' telegram.org; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; connect-src 'self' api.coingecko.com api.telegram.org; frame-ancestors 'none';"
        },
      ],
      script: [
        {
          src: 'https://telegram.org/js/telegram-web-app.js',
          async: true,
          defer: true,
          crossorigin: 'anonymous'
        }
      ]
    }
  }
})
