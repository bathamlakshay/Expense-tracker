import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, TrendingDown, Wallet, PlusCircle } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts'
import useExpenseStore from '../stores/expenseStore'
import { formatCurrency, getCategoryEmoji, getRelativeTime, getCategoryColor } from '../utils/helpers'

function Dashboard() {
  const navigate = useNavigate()
  const { transactions, getTotalIncome, getTotalExpense, getBalance } = useExpenseStore()

  const totalIncome = useMemo(() => getTotalIncome(), [transactions])
  const totalExpense = useMemo(() => getTotalExpense(), [transactions])
  const balance = useMemo(() => getBalance(), [transactions])
  const recentTransactions = useMemo(() => transactions.slice(0, 5), [transactions])

  // ── BAR CHART DATA — monthly expenses ──
  const barChartData = useMemo(() => {
    const months = ['Jan','Feb','Mar','Apr','May','Jun',
                    'Jul','Aug','Sep','Oct','Nov','Dec']
    
    const monthlyData = {}

    transactions.forEach(t => {
      const date = new Date(t.date)
      const month = months[date.getMonth()]
      
      if (!monthlyData[month]) {
        monthlyData[month] = { month, income: 0, expense: 0 }
      }
      
      if (t.type === 'income') {
        monthlyData[month].income += t.amount
      } else {
        monthlyData[month].expense += t.amount
      }
    })

    return Object.values(monthlyData)
  }, [transactions])

  // ── PIE CHART DATA — by category ──
  const pieChartData = useMemo(() => {
    const categoryData = {}

    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        if (!categoryData[t.category]) {
          categoryData[t.category] = { name: t.category, value: 0 }
        }
        categoryData[t.category].value += t.amount
      })

    return Object.values(categoryData)
  }, [transactions])

  return (
    <div className="bg-white min-h-screen p-4 lg:p-8">

      {/* ── HEADER ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-black text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Track your income and expenses</p>
        </div>
        <button
          onClick={() => navigate('/add')}
          className="flex items-center gap-2 hover:bg-indigo-700 text-black px-4 py-2.5 rounded-xl text-sm font-medium transition-colors w-full lg:w-auto justify-center">
          <PlusCircle size={16} />
          Add Transaction
        </button>
      </div>

      {/* ── STATS CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Balance */}
<div className="bg-green-200 rounded-2xl p-6">
  <div className="flex items-center gap-3 mb-3">
    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
      <Wallet size={20} className="text-black" />
    </div>
    <p className="text-indigo-500 text-sm font-medium">Total Balance</p>
  </div>
  <p className="text-black text-3xl font-bold">{formatCurrency(balance)}</p>
  
  {/* Savings percentage */}
  {totalIncome > 0 && (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1">
        <p className="text-green-800 text-xs">
          {balance >= 0 ? '🎉 Saving' : '⚠️ Overspending'}
        </p>
        <p className="text-black text-xs font-bold">
          {totalIncome > 0 
            ? `${Math.round((balance / totalIncome) * 100)}%`
            : '0%'
          }
        </p>
      </div>
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-blue-500 rounded-full h-1.5 transition-all"
          style={{
            width: `${Math.min(Math.max((balance / totalIncome) * 100, 0), 100)}%`
          }}
        />
      </div>
    </div>
  )}
</div>

        <div className="bg-green-300 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-green-400" />
            </div>
            <p className="text-blue-600 text-sm font-medium">Total Income</p>
          </div>
          <p className="text-black text-3xl font-bold">{formatCurrency(totalIncome)}</p>
          <p className="text-gray-800 text-xs mt-4">
            {transactions.filter(t => t.type === 'income').length} income transactions
          </p>
        </div>

        <div className="bg-gray-200 border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-300/50 rounded-xl flex items-center justify-center">
              <TrendingDown size={20} className="text-red-400" />
            </div>
            <p className="text-gray-400 text-sm font-medium">Total Expenses</p>
          </div>
          <p className="text-red-400 text-3xl font-bold">{formatCurrency(totalExpense)}</p>
          <p className="text-gray-600 text-xs mt-2">
            {transactions.filter(t => t.type === 'expense').length} expense transactions
          </p>
        </div>
      </div>

      {/* ── CHARTS ── */}
      {transactions.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Bar Chart */}
          <div className="bg-white border border-gray-800 rounded-2xl p-6">
            <h2 className="text-black text-base font-bold mb-6">
              Monthly Overview
            </h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barChartData}>
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    background: '#1f2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`₹${value}`, '']}
                />
                <Bar dataKey="income" fill="#4ade80" radius={[4, 4, 0, 0]} name="Income" />
                <Bar dataKey="expense" fill="#f87171" radius={[4, 4, 0, 0]} name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white border border-gray-800 rounded-2xl p-6">
            <h2 className="text-black text-base font-bold mb-6">
              Expenses by Category
            </h2>
            {pieChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value">
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={getCategoryColor(entry.name)}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value) => [`₹${value}`, '']}
                  />
                  <Legend
                    formatter={(value) => (
                      `${getCategoryEmoji(value)} ${value}`
                    )}
                    wrapperStyle={{ color: '#9ca3af', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-48">
                <p className="text-gray-600 text-sm">No expense data yet</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ── RECENT TRANSACTIONS ── */}
      <div className="bg-white border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-black text-lg font-bold">Recent Transactions</h2>
          <button
            onClick={() => navigate('/transactions')}
            className="text-indigo-400 text-sm hover:text-indigo-300 transition-colors">
            View all →
          </button>
        </div>

        {transactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <p className="text-4xl">💸</p>
            <p className="text-gray-400 text-lg">No transactions yet</p>
            <p className="text-gray-600 text-sm">Add your first transaction to get started</p>
            <button
              onClick={() => navigate('/add')}
              className="bg-indigo-600 text-black px-6 py-2 rounded-xl text-sm hover:bg-indigo-700 mt-2">
              Add Transaction
            </button>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {recentTransactions.map(transaction => (
            <div
              key={transaction.id}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-800/50 transition-colors">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                {getCategoryEmoji(transaction.category)}
              </div>
              <div className="flex-1">
                <p className="text-black text-sm font-medium">{transaction.title}</p>
                <p className="text-gray-500 text-xs capitalize">
                  {transaction.category} · {getRelativeTime(transaction.date)}
                </p>
              </div>
              <p className={`text-sm font-bold ${
                transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Dashboard