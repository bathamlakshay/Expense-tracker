import { useState, useMemo } from 'react'
import { PlusCircle, AlertTriangle, CheckCircle } from 'lucide-react'
import useExpenseStore from '../stores/expenseStore'
import { formatCurrency, getCategoryEmoji } from '../utils/helpers'

const EXPENSE_CATEGORIES = [
  'food', 'transport', 'entertainment',
  'shopping', 'health', 'education', 'bills', 'other'
]

function Budget() {
  const { budgets, setBudget, getBudgetStatus } = useExpenseStore()
  const [selectedCategory, setSelectedCategory] = useState('food')
  const [amount, setAmount] = useState('')
  const [success, setSuccess] = useState(false)

  const budgetStatus = useMemo(() => getBudgetStatus(), [budgets])

  const handleSetBudget = () => {
    if (!amount || Number(amount) <= 0) return
    setBudget(selectedCategory, amount)
    setAmount('')
    setSuccess(true)
    setTimeout(() => setSuccess(false), 2000)
  }

  return (
    <div className="bg-white min-h-screen p-4 lg:p-8">

      {/* ── HEADER ── */}
      <div className="mb-8 flex flex-col items-center justify-center">
        <h1 className="text-black text-2xl font-bold">Budget Limits</h1>
        <p className="text-gray-500 text-sm mt-1">
          Set spending limits for each category
        </p>
      </div>

      {/* ── SET BUDGET FORM ── */}
      <div className="bg-white border flex flex-col  border-gray-800 rounded-2xl p-6 mb-8 max-w-lg mx-auto">
        <h2 className="text-black text-base font-bold mb-4">Set Budget</h2>

        <div className="mb-4">
          <label className="text-gray-400 text-xs font-medium mb-2 block uppercase tracking-wider">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-white border border-gray-700 text-black rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500">
            {EXPENSE_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {getCategoryEmoji(cat)} {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-400 text-xs font-medium mb-2 block uppercase tracking-wider">
            Monthly Limit (₹)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 5000"
            className="w-full bg-white border border-gray-700 text-black rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 placeholder-gray-600"
          />
        </div>

        {success && (
          <p className="text-green-400 text-sm mb-4 bg-green-900/20 px-4 py-2 rounded-lg">
            ✅ Budget set successfully!
          </p>
        )}

        <button
          onClick={handleSetBudget}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-sm font-medium transition-all">
          <PlusCircle size={16} />
          Set Budget
        </button>
      </div>

      {/* ── BUDGET STATUS ── */}
      {budgetStatus.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <p className="text-4xl">💰</p>
          <p className="text-gray-400 text-lg">No budgets set yet</p>
          <p className="text-gray-600 text-sm">Set a budget limit for any category above</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-2xl max-w-lg mx-auto ">
          {budgetStatus.map(({ category, limit, spent, percentage, isExceeded }) => (
            <div
              key={category}
              className={`bg-white border rounded-2xl p-6 ${
                isExceeded ? 'border-red-800' : 'border-gray-800'
              }`}>

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCategoryEmoji(category)}</span>
                  <div>
                    <p className="text-white text-sm font-medium capitalize">
                      {category}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {formatCurrency(spent)} of {formatCurrency(limit)}
                    </p>
                  </div>
                </div>

                {/* Status icon */}
                {isExceeded ? (
                  <AlertTriangle size={20} className="text-red-400" />
                ) : (
                  <CheckCircle size={20} className="text-green-400" />
                )}
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    isExceeded ? 'bg-red-500' :
                    percentage > 80 ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>

              {/* Percentage */}
              <div className="flex items-center justify-between">
                <p className={`text-xs font-medium ${
                  isExceeded ? 'text-red-400' :
                  percentage > 80 ? 'text-yellow-400' :
                  'text-green-400'
                }`}>
                  {isExceeded
                    ? `⚠️ Exceeded by ${formatCurrency(spent - limit)}`
                    : `${percentage}% used`
                  }
                </p>
                <p className="text-gray-600 text-xs">
                  {formatCurrency(limit - spent > 0 ? limit - spent : 0)} left
                </p>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Budget