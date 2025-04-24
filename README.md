# 💹 Real-Time Crypto Price Tracker

A responsive React + Redux Toolkit app that simulates real-time crypto price tracking like CoinMarketCap. It displays a dynamic table of 5 popular cryptocurrencies and updates every 2 seconds using mocked WebSocket behavior.

## ⚙️ Tech Stack

- **React.js** – Frontend UI
- **Redux Toolkit** – State management
- **Tailwind CSS** – Styling
- **Mocked WebSocket** – Real-time simulation via `setInterval`

## 🚀 Features

- Responsive table showing:
  - Logo, Name, Symbol
  - Price, % changes (1h, 24h, 7d)
  - Market Cap, 24h Volume
  - Circulating Supply, Max Supply
  - Static 7D Chart
- Real-time updates every 2 seconds
- Color-coded % change (green for positive, red for negative)

## 📦 Setup Instructions

```bash
git clone https://github.com/your-username/crypto-price-tracker.git
cd crypto-price-tracker
npm install
npm run dev
```
