<template>
  <div class="p-4 space-y-4">
    <!-- Portfolio Card -->
    <div class="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-6 backdrop-blur-sm">
      <p class="text-sm text-slate-300 mb-2">💵 Total Balance</p>
      <h2 class="text-4xl font-bold text-white mb-1">${{ portfolioBalance.toFixed(2) }}</h2>
      <div class="flex items-center gap-2">
        <span :class="dailyChange >= 0 ? 'text-green-400' : 'text-red-400'" class="font-semibold">
          {{ dailyChange >= 0 ? '📈' : '📉' }} {{ dailyChange >= 0 ? '+' : '' }}{{ dailyChange.toFixed(2) }}%
        </span>
        <span class="text-xs text-slate-400">24h Change</span>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="relative">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search coins..."
        class="w-full bg-slate-800 text-white px-4 py-2 pl-10 rounded-lg border border-slate-700 placeholder-slate-500"
      />
      <span class="absolute left-3 top-2.5 text-slate-400">🔍</span>
    </div>

    <!-- Sorting -->
    <div class="flex gap-2">
      <button
        v-for="sort in ['Price', 'Change', 'Volume']"
        :key="sort"
        @click="sortBy = sort"
        :class="[
          'px-3 py-1 rounded-lg text-xs font-medium transition-all',
          sortBy === sort
            ? 'bg-blue-600 text-white'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        ]"
      >
        {{ sort }}
      </button>
    </div>

    <!-- Coins List -->
    <div class="space-y-2">
      <div
        v-for="coin in filteredCoins"
        :key="coin.id"
        @click="selectCoin(coin)"
        class="bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:scale-102"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="text-3xl">{{ coin.icon }}</div>
            <div>
              <h3 class="font-semibold text-white">{{ coin.name }}</h3>
              <p class="text-xs text-slate-400">{{ coin.symbol }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-bold text-white">${{ coin.price.toFixed(2) }}</p>
            <p :class="coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'" class="text-xs font-medium">
              {{ coin.change24h >= 0 ? '↑' : '↓' }} {{ Math.abs(coin.change24h).toFixed(2) }}%
            </p>
          </div>
        </div>
        <div class="mt-2 flex justify-between text-xs text-slate-400">
          <span>Vol: ${{ (coin.volume24h / 1e9).toFixed(2) }}B</span>
          <span>Market Cap: ${{ (coin.marketCap / 1e9).toFixed(2) }}B</span>
        </div>
      </div>
    </div>

    <!-- Trading Modal -->
    <Teleport to="body" v-if="selectedCoin">
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" @click="selectedCoin = null"></div>
      <div class="fixed bottom-0 left-0 right-0 bg-slate-900 rounded-t-2xl border-t border-slate-700 z-50 max-w-md mx-auto p-6 space-y-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">{{ selectedCoin.icon }}</span>
            <div>
              <h3 class="font-bold text-white">{{ selectedCoin.name }}</h3>
              <p class="text-sm text-slate-400">{{ selectedCoin.symbol }}</p>
            </div>
          </div>
          <button @click="selectedCoin = null" class="text-slate-400 hover:text-white text-2xl">✕</button>
        </div>

        <div class="bg-slate-800/50 rounded-lg p-4">
          <p class="text-slate-400 text-sm mb-1">Current Price</p>
          <p class="text-3xl font-bold text-white">${{ selectedCoin.price.toFixed(2) }}</p>
        </div>

        <input
          v-model="tradeAmount"
          type="number"
          placeholder="Enter amount"
          class="w-full bg-slate-800 text-white px-4 py-3 rounded-lg border border-slate-700 placeholder-slate-500"
        />

        <div class="bg-slate-800/50 rounded-lg p-3">
          <p class="text-slate-400 text-sm">Total Value</p>
          <p class="text-2xl font-bold text-blue-400">${{ (parseFloat(tradeAmount || '0') * selectedCoin.price).toFixed(2) }}</p>
        </div>

        <div class="flex gap-3">
          <button
            @click="executeTrade('buy')"
            class="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 text-lg"
          >
            ✓ Buy
          </button>
          <button
            @click="executeTrade('sell')"
            class="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 text-lg"
          >
            ✕ Sell
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

interface Coin {
  id: string
  name: string
  symbol: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  icon: string
}

const searchQuery = ref('')
const sortBy = ref('Price')
const selectedCoin = ref<Coin | null>(null)
const tradeAmount = ref('')
const portfolioBalance = ref(10000)
const dailyChange = ref(2.45)

const topCoins = reactive<Coin[]>([
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 45230.50,
    change24h: 2.5,
    volume24h: 28500000000,
    marketCap: 890000000000,
    icon: '₿'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2450.75,
    change24h: 3.2,
    volume24h: 15200000000,
    marketCap: 294000000000,
    icon: 'Ξ'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 180.45,
    change24h: 5.1,
    volume24h: 2100000000,
    marketCap: 83000000000,
    icon: '◎'
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.98,
    change24h: -1.2,
    volume24h: 450000000,
    marketCap: 35000000000,
    icon: '₳'
  },
  {
    id: 'ripple',
    name: 'Ripple',
    symbol: 'XRP',
    price: 2.15,
    change24h: 1.8,
    volume24h: 2300000000,
    marketCap: 115000000000,
    icon: '✕'
  }
])

const filteredCoins = computed(() => {
  let filtered = topCoins.filter(coin =>
    coin.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

  if (sortBy.value === 'Change') {
    filtered.sort((a, b) => b.change24h - a.change24h)
  } else if (sortBy.value === 'Volume') {
    filtered.sort((a, b) => b.volume24h - a.volume24h)
  } else {
    filtered.sort((a, b) => b.price - a.price)
  }

  return filtered
})

const selectCoin = (coin: Coin) => {
  selectedCoin.value = coin
  tradeAmount.value = ''
}

const executeTrade = (type: 'buy' | 'sell') => {
  if (!selectedCoin.value || !tradeAmount.value) {
    alert('Please enter an amount')
    return
  }

  const amount = parseFloat(tradeAmount.value)
  const total = amount * selectedCoin.value.price

  if (type === 'buy') {
    if (total > portfolioBalance.value) {
      alert('❌ Insufficient balance')
      return
    }
    portfolioBalance.value -= total
    alert(`✅ Bought ${amount} ${selectedCoin.value.symbol}!`)
  } else {
    portfolioBalance.value += total
    alert(`✅ Sold ${amount} ${selectedCoin.value.symbol}!`)
  }

  selectedCoin.value = null
  tradeAmount.value = ''
}
</script>
