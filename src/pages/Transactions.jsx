import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, PlusCircle } from 'lucide-react'
import useExpenseStore from '../stores/expenseStore'
import { formatCurrency, getCategoryEmoji, formatDate } from '../utils/helpers'

function Transactions() {
  const navigate = useNavigate()
  const { transactions, deleteTransaction } = useExpenseStore()
  const [filter, setFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Filter transactions based on selected filter
  const filteredTransactions = useMemo(() => {
    let result = transactions

    // Filter by type
    if (filter === 'income') {
      result = result.filter(t => t.type === 'income')
    } else if (filter === 'expense') {
      result = result.filter(t => t.type === 'expense')
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      result = result.filter(t => t.category === categoryFilter)
    }

    return result
  }, [transactions, filter, categoryFilter])

  // Get unique categories from transactions
  const categories = useMemo(() => {
    const cats = [...new Set(transactions.map(t => t.category))]
    return cats
  }, [transactions])

  // Total of filtered transactions
  const filteredTotal = useMemo(() => {
    return filteredTransactions.reduce((sum, t) => {
      return t.type === 'income' ? sum + t.amount : sum - t.amount
    }, 0)
  }, [filteredTransactions])

  return (
    <div className="bg-white min-h-screen p-8">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-black text-2xl font-bold">Transactions</h1>
          <p className="text-gray-500 text-sm mt-1">
            {filteredTransactions.length} transactions
          </p>
        </div>
        <button
          onClick={() => navigate('/add')}
          className="flex items-center gap-2 hover:bg-indigo-700 text-black px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
          <PlusCircle size={16} />
          Add New
        </button>
      </div>

      {/* ── FILTERS ── */}
      <div className="flex flex-wrap gap-3 mb-6">

        {/* Type filter */}
        <div className="flex gap-2">
          {['all', 'income', 'expense'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                filter === f
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-400 border border-gray-800 hover:bg-gray-800'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {/* Category filter */}
        {categories.length > 0 && (
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white border border-gray-800 text-gray-400 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500">
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {getCategoryEmoji(cat)} {cat}
              </option>
            ))}
          </select>
        )}

      </div>

      {/* ── FILTERED TOTAL ── */}
      {filteredTransactions.length > 0 && (
        <div className="bg-white border border-gray-800 rounded-xl px-6 py-4 mb-6 flex items-center justify-between">
          <p className="text-gray-400 text-sm">Total</p>
          <p className={`text-lg font-bold ${
            filteredTotal >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {filteredTotal >= 0 ? '+' : ''}{formatCurrency(filteredTotal)}
          </p>
        </div>
      )}

      {/* ── EMPTY STATE ── */}
      {filteredTransactions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-4xl">💸</p>
          <p className="text-gray-400 text-lg">No transactions found</p>
          <p className="text-gray-600 text-sm">
            {filter === 'all' ? 'Add your first transaction' : `No ${filter} transactions yet`}
          </p>
          <button
            onClick={() => navigate('/add')}
            className="bg-indigo-600 text-black px-6 py-2 rounded-xl text-sm hover:bg-indigo-700 mt-2">
            Add Transaction
          </button>
        </div>
      )}

      {/* ── TRANSACTIONS LIST ── */}
      <div className="flex flex-col gap-2">
        {filteredTransactions.map(transaction => (
          <div
            key={transaction.id}
            className="bg-white border border-gray-800 rounded-xl p-4 flex items-center gap-4 hover:border-gray-700 transition-colors">

            {/* Emoji */}
            <div className="w-12 h-12  rounded-xl flex items-center justify-center text-xl flex-shrink-0">
              {getCategoryEmoji(transaction.category)}
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="text-black text-sm font-medium">{transaction.title}</p>
              <p className="text-gray-500 text-xs capitalize mt-1">
                {transaction.category} · {formatDate(transaction.date)}
              </p>
            </div>

            {/* Amount */}
            <p className={`text-base font-bold flex-shrink-0 ${
              transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </p>

            {/* Delete button */}
            <button
              onClick={() => deleteTransaction(transaction.id)}
              className="text-gray-600 hover:text-red-400 transition-colors flex-shrink-0">
              <Trash2 size={16} />
            </button>

          </div>
        ))}
      </div>

    </div>
  )
}

export default Transactions