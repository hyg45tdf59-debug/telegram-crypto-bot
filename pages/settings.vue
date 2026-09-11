<template>
  <div class="p-4 space-y-4">
    <h1 class="text-2xl font-bold text-white mb-6">⚙️ Settings</h1>

    <!-- Account Section -->
    <div class="space-y-3">
      <h3 class="text-lg font-semibold text-white">Account</h3>
      <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-3">
        <div class="flex justify-between items-center py-2">
          <span class="text-slate-300">Username</span>
          <span class="text-white font-medium">{{ userInfo.username || '@trader' }}</span>
        </div>
        <div class="flex justify-between items-center py-2 border-t border-slate-700">
          <span class="text-slate-300">User ID</span>
          <span class="text-white font-medium text-sm">{{ userInfo.id || '---' }}</span>
        </div>
        <div class="flex justify-between items-center py-2 border-t border-slate-700">
          <span class="text-slate-300">Joined</span>
          <span class="text-white font-medium">Today</span>
        </div>
      </div>
    </div>

    <!-- Trading Preferences -->
    <div class="space-y-3">
      <h3 class="text-lg font-semibold text-white">Trading Preferences</h3>
      <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-slate-300">Default Order Type</span>
          <select class="bg-slate-700 text-white px-3 py-1 rounded text-sm border border-slate-600">
            <option>Market</option>
            <option>Limit</option>
            <option>Stop Loss</option>
          </select>
        </div>
        <div class="flex justify-between items-center pt-4 border-t border-slate-700">
          <span class="text-slate-300">Enable Notifications</span>
          <input type="checkbox" checked class="w-4 h-4" />
        </div>
        <div class="flex justify-between items-center pt-4 border-t border-slate-700">
          <span class="text-slate-300">Price Alerts</span>
          <input type="checkbox" checked class="w-4 h-4" />
        </div>
        <div class="flex justify-between items-center pt-4 border-t border-slate-700">
          <span class="text-slate-300">Dark Mode</span>
          <input type="checkbox" checked class="w-4 h-4" />
        </div>
      </div>
    </div>

    <!-- Security -->
    <div class="space-y-3">
      <h3 class="text-lg font-semibold text-white">Security</h3>
      <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-3">
        <button class="w-full text-left py-3 px-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all text-slate-300 hover:text-white">
          🔐 Enable Two-Factor Auth
        </button>
        <button class="w-full text-left py-3 px-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all text-slate-300 hover:text-white">
          🔑 Change Password
        </button>
      </div>
    </div>

    <!-- About -->
    <div class="space-y-3">
      <h3 class="text-lg font-semibold text-white">About</h3>
      <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-2 text-sm text-slate-400">
        <p>🤖 CryptoTrade Bot v1.0.0</p>
        <p>📱 Telegram Mini App</p>
        <p>🔗 Real-time crypto trading</p>
        <p class="pt-2 text-xs text-slate-500">© 2024 CryptoTrade. All rights reserved.</p>
      </div>
    </div>

    <!-- Danger Zone -->
    <div class="space-y-3">
      <h3 class="text-lg font-semibold text-red-500">Danger Zone</h3>
      <button class="w-full py-3 px-4 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg font-medium transition-all">
        🗑️ Clear All Data
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTelegram } from '~/composables/useTelegram'

const { getTelegramUser } = useTelegram()
const userInfo = computed(() => getTelegramUser() || {})
</script>
