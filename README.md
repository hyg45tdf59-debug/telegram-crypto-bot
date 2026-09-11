# 💰 CryptoTrade Bot - Telegram Mini App

![License: MIT](https://img.shields.io/badge/license-MIT-blue)
![Vue 3](https://img.shields.io/badge/vue-3-green)
![Nuxt 3](https://img.shields.io/badge/nuxt-3-green)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-3-blue)

A professional cryptocurrency trading bot built as a **Telegram Mini App** using Vue 3 and Nuxt 3. Trade crypto in real-time directly from Telegram with a sleek, modern interface.

## ✨ Features

- 📱 **Telegram Mini App Integration** - Seamless Telegram experience
- 💰 **Real-time Trading** - Buy and sell cryptocurrencies instantly
- 📊 **Market Data** - Live prices, charts, and market trends
- 💼 **Portfolio Management** - Track your holdings and gains
- 🔍 **Advanced Search** - Quickly find cryptocurrencies
- ⚡ **Market & Limit Orders** - Multiple order types
- 📈 **Price Tracking** - Monitor your watchlist
- 🌙 **Dark Theme** - Easy on the eyes
- 📱 **Mobile Optimized** - Perfect for phones
- 🔐 **Secure** - Your data stays private

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
crypto-trade-bot/
├── pages/              # App pages (Market, Portfolio, Trading, Settings)
├── composables/        # Vue composables (Telegram, Crypto API)
├── components/         # Reusable Vue components
├── assets/css/         # Global styles
├── app.vue             # Root component
├── nuxt.config.ts      # Nuxt configuration
└── README.md           # Documentation
```

## 🛣️ Routes

- `/` - Market view with all cryptocurrencies
- `/portfolio` - Your holdings and performance
- `/trading` - Advanced trading interface
- `/settings` - User preferences and account settings

## 🔑 Environment Variables

Create a `.env.local` file:

```env
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_CRYPTO_API_KEY=your_api_key
```

## 📚 Tech Stack

- **Frontend**: Vue 3 + TypeScript
- **Framework**: Nuxt 3
- **Styling**: Tailwind CSS
- **Mobile**: Telegram Web App SDK
- **APIs**: CoinGecko (free cryptocurrency data)

## 🎮 Features in Detail

### Market
- Browse top cryptocurrencies
- Real-time price updates
- 24h change indicators
- Quick buy/sell access
- Search and filter

### Portfolio
- View all your holdings
- Track gains/losses
- Calculate total balance
- Performance metrics

### Trading
- Market orders (instant execution)
- Limit orders (set your price)
- Order history
- Fee calculation

### Settings
- Account info
- Trading preferences
- Security settings
- Notification controls

## 🔗 Telegram Bot Setup

1. Create a bot with [@BotFather](https://t.me/botfather) on Telegram
2. Get your bot token
3. Set up Web App URL pointing to your deployed bot
4. Users can then tap the button in your bot to open the mini app

## 📡 API Integration

The bot uses **CoinGecko API** (free, no key required) for cryptocurrency data:
- Real-time prices
- Market capitalization
- 24h volume
- Price changes

## 🎨 UI/UX Highlights

- **Glass Morphism** design
- **Gradient backgrounds** for visual appeal
- **Smooth animations** and transitions
- **Responsive layout** for all screen sizes
- **Dark theme** optimized for Telegram
- **Safe area support** for notched phones

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📝 License

MIT © 2024

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, open an issue on GitHub or contact us via Telegram.

## 🎯 Roadmap

- [ ] Real wallet integration
- [ ] Advanced charting
- [ ] Stop-loss orders
- [ ] Price alerts
- [ ] Trading signals
- [ ] Social features
- [ ] Mobile app version

---

**Made with ❤️ for crypto traders**
