# 💰 SpendSmart — Personal Expense Tracker

A production-level personal finance tracking app built with React.js, Zustand, and Recharts.

## 🚀 Live Demo

👉 [<img width="1899" height="911" alt="image" src="https://github.com/user-attachments/assets/f6632e28-9dec-41e9-a545-39c099988253" />](https://trackyourxpense.netlify.app/budget)


## 📸 Screenshots

### Dashboard
<img width="1896" height="901" alt="image" src="https://github.com/user-attachments/assets/fbb3608d-4416-4cc4-80ea-14de4d760b26" />

### Budget Limits
<img width="1893" height="897" alt="image" src="https://github.com/user-attachments/assets/90d709d6-d651-42a5-b58a-c6b62d95f90b" />

### Transactions
![Uploading image.png…]()


## ✨ Features

- 📊 **Interactive Charts** — Bar chart for monthly overview, Donut chart for category breakdown
- 💰 **Real-time Balance** — Automatically calculates income, expenses and savings percentage
- 🎯 **Budget Limits** — Set spending limits per category with visual progress bars and warnings
- 💳 **Transaction Management** — Add, filter and delete income/expense transactions
- 🏷️ **Category Filtering** — Filter transactions by type and category
- 📱 **Fully Responsive** — Works on mobile, tablet and desktop
- 💾 **Persistent Data** — All data saved to localStorage via Zustand persist middleware
- 💀 **Progress Indicators** — Visual savings progress bar on dashboard

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React.js | Frontend framework |
| Zustand | Global state management |
| Recharts | Data visualization (charts) |
| React Router v6 | Client side routing |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| Vite | Build tool |
| Netlify | Deployment |

## ⚡ Performance Optimizations

- `useMemo` — chart data only recalculates when transactions change
- `Zustand persist` — automatic localStorage sync without manual setItem/getItem
- Optimized re-renders — state separated into focused store actions
    

## 🔧 Run Locally

1. Clone the repo
```bash
git clone https://github.com/bathamlakshay/expense-tracker.git
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

*Why Zustand over Redux?**
Zustand provides the same global state management with significantly less boilerplate. The `persist` middleware automatically syncs state to localStorage — eliminating manual localStorage.setItem/getItem calls across components.

**Why Recharts?**
Recharts is built specifically for React — components integrate naturally with React state. Chart data updates automatically when transactions change via useMemo dependency tracking.
