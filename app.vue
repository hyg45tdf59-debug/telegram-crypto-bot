<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    <!-- Header -->
    <div class="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-800">
      <div class="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold gradient-text">💰 CryptoTrade</h1>
          <p class="text-xs text-slate-400">Telegram Mini App</p>
        </div>
        <div class="text-right">
          <p class="text-sm font-semibold text-white">{{ userInfo.firstName || 'Trader' }}</p>
          <p class="text-xs text-slate-400">{{ formattedTime }}</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-md mx-auto pb-24">
      <NuxtPage />
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
      <div class="max-w-md mx-auto px-4 py-3 flex justify-around">
        <NuxtLink 
          to="/" 
          class="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all hover:bg-slate-800"
          :class="route.path === '/' ? 'text-blue-400' : 'text-slate-400'"
        >
          <span class="text-xl">📊</span>
          <span class="text-xs font-medium">Market</span>
        </NuxtLink>
        <NuxtLink 
          to="/portfolio" 
          class="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all hover:bg-slate-800"
          :class="route.path === '/portfolio' ? 'text-blue-400' : 'text-slate-400'"
        >
          <span class="text-xl">💼</span>
          <span class="text-xs font-medium">Portfolio</span>
        </NuxtLink>
        <NuxtLink 
          to="/trading" 
          class="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all hover:bg-slate-800"
          :class="route.path === '/trading' ? 'text-blue-400' : 'text-slate-400'"
        >
          <span class="text-xl">⚡</span>
          <span class="text-xs font-medium">Trade</span>
        </NuxtLink>
        <NuxtLink 
          to="/settings" 
          class="flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all hover:bg-slate-800"
          :class="route.path === '/settings' ? 'text-blue-400' : 'text-slate-400'"
        >
          <span class="text-xl">⚙️</span>
          <span class="text-xs font-medium">Settings</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useTelegram } from '~/composables/useTelegram'

const route = useRoute()
const { getTelegramUser } = useTelegram()
const currentTime = ref(new Date())

const userInfo = computed(() => getTelegramUser() || { firstName: 'Trader' })
const formattedTime = computed(() => 
  currentTime.value.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
)

onMounted(() => {
  // Initialize Telegram Mini App
  if ((window as any).Telegram?.WebApp) {
    const webapp = (window as any).Telegram.WebApp
    webapp.ready()
    webapp.expand()
    webapp.setHeaderColor('#1e293b')
    webapp.setBackgroundColor('#0f172a')
  }

  // Update time
  setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})
</script>
