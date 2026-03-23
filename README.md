# BBC News Clone 📰

A fully responsive BBC News Clone built with **React + Vite** and live news from the **GNews API**.

## ✨ Features
- 🔴 BBC-style design (red accent, BBC logo, Inter typography)
- 🌙 Dark / Light mode toggle (persists in localStorage)
- 📰 Live news via GNews API (Top Headlines, Categories, Search)
- 🗂️ Category pages: World, Business, Tech, Sports, Entertainment, Science
- 🔍 Search functionality with real-time results
- 📱 Fully responsive (mobile, tablet, desktop)
- ⏳ Loading skeletons & spinner
- 📄 "Load More" pagination
- 🔥 Trending sidebar

## 🚀 Getting Started

### 1. Get a Free GNews API Key
Go to [https://gnews.io](https://gnews.io), sign up, and copy your API key.

### 2. Add Your API Key
Create a `.env` file in the root (copy from `.env.example`):
```
VITE_GNEWS_API_KEY=your_actual_api_key_here
```

### 3. Install & Run
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173)

### 4. Build for Production
```bash
npm run build
```

## 📦 Deployment on Vercel

1. Push this repo to GitHub (`.env` is gitignored — it's safe).
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your GitHub repo.
3. In Vercel's **Environment Variables** section, add:
   - Key: `VITE_GNEWS_API_KEY`
   - Value: your GNews API key
4. Click **Deploy**. Done! ✅

## 🗂️ Folder Structure
```
src/
├── components/    # Navbar, Footer, NewsCard, Sidebar, Loader
├── context/       # ThemeContext (dark/light mode)
├── hooks/         # useNews custom hook
├── pages/         # Home, Category, Search
├── services/      # api.js (axios + GNews)
├── App.jsx        # Root component + routing
└── index.css      # Global CSS variables & reset
```

## 🛠️ Tech Stack
- **React 18** + **Vite**
- **React Router v6** (client-side routing)
- **Axios** (API calls)
- **React Icons** (FiSearch, FiMoon etc.)
- **Vanilla CSS** (CSS variables, Flexbox, Grid)
- **GNews API** (free tier: 100 req/day)
