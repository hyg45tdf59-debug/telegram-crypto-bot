<template>
  <div class="p-4 space-y-4">
    <h1 class="text-2xl font-bold text-white mb-6">⚡ Advanced Trading</h1>

    <!-- Trade Type Selector -->
    <div class="flex gap-2 mb-4">
      <button
        v-for="type in ['Market', 'Limit', 'Stop']"
        :key="type"
        @click="tradeType = type"
        :class="[
          'flex-1 py-2 px-4 rounded-lg font-medium transition-all',
          tradeType === type
            ? 'bg-blue-600 text-white'
            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
        ]"
      >
        {{ type }}
      </button>
    </div>

    <!-- Market Order -->
    <div v-if="tradeType === 'Market'" class="space-y-4">
      <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Select Coin</label>
          <select v-model="selectedCoinId" class="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600">
            <option value="">Choose a coin...</option>
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="ethereum">Ethereum (ETH)</option>
            <option value="solana">Solana (SOL)</option>
            <option value="cardano">Cardano (ADA)</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Side</label>
          <div class="flex gap-2">
            <button
              v-for="side in ['Buy', 'Sell']"
              :key="side"
              @click="side === 'Buy' ? isBuy = true : isBuy = false"
              :class="[
                'flex-1 py-2 rounded-lg font-medium transition-all',
                (side === 'Buy' && isBuy) || (side === 'Sell' && !isBuy)
                  ? side === 'Buy' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                  : 'bg-slate-700 text-slate-300'
              ]"
            >
              {{ side }}
            </button>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Amount</label>
          <input
            v-model="amount"
            type="number"
            placeholder="0.00"
            class="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
          />
        </div>

        <div class="bg-slate-700/50 rounded-lg p-3">
          <div class="flex justify-between mb-2 text-sm">
            <span class="text-slate-400">Estimated Total</span>
            <span class="text-white font-semibold">${{ estimatedTotal.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between text-xs text-slate-400">
            <span>Fee (0.5%)</span>
            <span>${{ (estimatedTotal * 0.005).toFixed(2) }}</span>
          </div>
        </div>

        <button @click="submitMarketOrder" class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all">
          Place Order
        </button>
      </div>
    </div>

    <!-- Limit Order -->
    <div v-if="tradeType === 'Limit'" class="space-y-4">
      <div class="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-4">
        <div class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
          <p class="text-sm text-blue-300">💡 Set the price at which you want to buy or sell</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Limit Price</label>
          <input
            v-model="limitPrice"
            type="number"
            placeholder="0.00"
            class="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-300 mb-2">Quantity</label>
          <input
            v-model="amount"
            type="number"
            placeholder="0.00"
            class="w-full bg-slate-700 text-white px-3 py-2 rounded-lg border border-slate-600"
          />
        </div>

        <button class="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 rounded-lg transition-all">
          Set Limit Order
        </button>
      </div>
    </div>

    <!-- Recent Trades -->
    <div class="mt-8">
      <h3 class="text-lg font-bold text-white mb-4">📋 Recent Trades</h3>
      <div v-if="recentTrades.length === 0" class="text-center py-8 text-slate-400">
        <p>No trades yet</p>
      </div>
      <div v-for="trade in recentTrades" :key="trade.id" class="bg-slate-800/50 border border-slate-700 rounded-lg p-3 flex justify-between mb-2">
        <div>
          <p class="font-medium text-white">{{ trade.action }} {{ trade.amount }} {{ trade.symbol }}</p>
          <p class="text-xs text-slate-400">{{ trade.time }}</p>
        </div>
        <div class="text-right">
          <p class="font-medium text-white">${{ trade.total.toFixed(2) }}</p>
          <p :class="trade.action === 'BUY' ? 'text-red-400' : 'text-green-400'" class="text-xs">{{ trade.action }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const tradeType = ref('Market')
const selectedCoinId = ref('')
const isBuy = ref(true)
const amount = ref('')
const limitPrice = ref('')

const estimatedTotal = computed(() => {
  // Mock price lookup
  const prices: Record<string, number> = {
    bitcoin: 45230.50,
    ethereum: 2450.75,
    solana: 180.45,
    cardano: 0.98
  }
  const price = prices[selectedCoinId.value] || 0
  return (parseFloat(amount.value || '0') * price)
})

const recentTrades = ref([
  { id: 1, action: 'BUY', amount: 0.05, symbol: 'BTC', total: 2261.53, time: '2 hours ago' },
  { id: 2, action: 'SELL', amount: 1, symbol: 'ETH', total: 2450.75, time: '5 hours ago' }
])

const submitMarketOrder = () => {
  if (!selectedCoinId.value || !amount.value) {
    alert('Please fill all fields')
    return
  }
  alert(`✅ ${isBuy.value ? 'Buy' : 'Sell'} order placed!`)
  amount.value = ''
}
</script>
