import { ref } from 'vue'

export const useCryptoApi = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchTopCoins = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20'
      )

      if (!response.ok) throw new Error('Failed to fetch coins')

      const data = await response.json()
      return data.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol.toUpperCase(),
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h || 0,
        marketCap: coin.market_cap,
        volume24h: coin.total_volume
      }))
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      console.error('Crypto API Error:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  return { loading, error, fetchTopCoins }
}
