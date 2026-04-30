# 💰 SpendSmart — Personal Expense Tracker

A production-level personal finance tracking app built with React.js, Zustand, and Recharts.

## 🚀 Live Demo

👉 https://useexpensestore.netlify.app/


## 📸 Screenshots

### Dashboard
<img width="1887" height="903" alt="image" src="https://github.com/user-attachments/assets/97529ad1-03dd-4487-9ec3-82c6460d87ea" />


### Budget Limits
<img width="1894" height="902" alt="image" src="https://github.com/user-attachments/assets/c2d7f5c0-9237-4c1a-81b9-a3a5b37674e4" />


### Transactions
<img width="1910" height="895" alt="image" src="https://github.com/user-attachments/assets/fa0fb424-5ad4-4b48-b57e-50f4db0cf8b5" />



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
