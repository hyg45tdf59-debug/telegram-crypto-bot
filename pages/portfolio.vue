<template>
  <div class="p-4 space-y-4">
    <!-- Summary Cards -->
    <div class="grid grid-cols-2 gap-3">
      <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <p class="text-xs text-slate-400 mb-1">Total Balance</p>
        <p class="text-2xl font-bold text-white">${{ totalBalance.toFixed(2) }}</p>
      </div>
      <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
        <p class="text-xs text-slate-400 mb-1">Total Gain/Loss</p>
        <p :class="totalGain >= 0 ? 'text-green-400' : 'text-red-400'" class="text-2xl font-bold">
          {{ totalGain >= 0 ? '+' : '' }}{{ totalGain.toFixed(2) }}%
        </p>
      </div>
    </div>

    <!-- Holdings -->
    <div class="space-y-2">
      <h3 class="text-lg font-bold text-white px-2">Your Holdings</h3>
      <div v-if="portfolio.length === 0" class="text-center py-12 text-slate-400">
        <p class="text-lg mb-2">📭 No assets yet</p>
        <p class="text-sm">Start trading to build your portfolio</p>
      </div>
      <div v-for="asset in portfolio" :key="asset.id" class="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-all">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ asset.icon }}</span>
            <div>
              <h4 class="font-semibold text-white">{{ asset.name }}</h4>
              <p class="text-xs text-slate-400">{{ asset.amount }} {{ asset.symbol }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-white">${{ (asset.amount * asset.price).toFixed(2) }}</p>
            <p :class="asset.gain >= 0 ? 'text-green-400' : 'text-red-400'" class="text-xs font-medium">
              {{ asset.gain >= 0 ? '+' : '' }}{{ asset.gain.toFixed(2) }}%
            </p>
          </div>
        </div>
        <div class="flex justify-between text-xs text-slate-400">
          <span>Avg Cost: ${{ asset.avgPrice.toFixed(2) }}</span>
          <span>Current: ${{ asset.price.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'

const portfolio = reactive([
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: 0.05,
    price: 45230.50,
    avgPrice: 42000,
    icon: '₿',
    gain: 7.68
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: 2.5,
    price: 2450.75,
    avgPrice: 2200,
    icon: 'Ξ',
    gain: 11.39
  }
])

const totalBalance = computed(() =>
  portfolio.reduce((sum, asset) => sum + asset.amount * asset.price, 0)
)

const totalGain = computed(() => {
  if (portfolio.length === 0) return 0
  const totalCost = portfolio.reduce((sum, asset) => sum + asset.amount * asset.avgPrice, 0)
  const totalValue = totalBalance.value
  return ((totalValue - totalCost) / totalCost) * 100
})
</script>
