import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'
import useExpenseStore from '../stores/expenseStore'

const CATEGORIES = {
  expense: [
    { value: 'food', label: '🍔 Food' },
    { value: 'transport', label: '🚗 Transport' },
    { value: 'entertainment', label: '🎬 Entertainment' },
    { value: 'shopping', label: '🛍️ Shopping' },
    { value: 'health', label: '💊 Health' },
    { value: 'education', label: '📚 Education' },
    { value: 'bills', label: '🧾 Bills' },
    { value: 'other', label: '📦 Other' },
  ],
  income: [
    { value: 'salary', label: '💰 Salary' },
    { value: 'freelance', label: '💻 Freelance' },
    { value: 'other', label: '📦 Other' },
  ]
}

function AddTransaction() {
  const navigate = useNavigate()
  const { addTransaction } = useExpenseStore()

  const [type, setType] = useState('expense')
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0]
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleTypeChange = (newType) => {
    setType(newType)
    setFormData(prev => ({
      ...prev,
      category: newType === 'expense' ? 'food' : 'salary'
    }))
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      setError('Please enter a title')
      return
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    addTransaction({
      title: formData.title.trim(),
      amount: Number(formData.amount),
      category: formData.category,
      type,
      date: formData.date
    })

    setSuccess(true)
    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
    <div className="bg-white min-h-screen p-8 ">

      <div className="mb-8 flex flex-col justify-center items-center">
        <h1 className="text-black text-2xl font-bold">Add Transaction</h1>
        <p className="text-white-500 text-sm mt-1">Record your income or expense</p>
      </div>

      
        <div className=" flex flex-col  max-w-lg mx-auto bg-white border border-white-800 rounded-2xl p-6 ">

        {/* Type toggle */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => handleTypeChange('expense')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              type === 'expense'
                ? 'bg-red-400 text-black'
                : 'bg-white-800 text-white-400 hover:bg-white-700'
            }`}>
            − Expense
          </button>
          <button
            onClick={() => handleTypeChange('income')}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
              type === 'income'
                ? 'bg-green-400 text-black'
                : 'bg-gray-800 text-white hover:bg-white-700'
            }`}>
            + Income
          </button>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="text-white-400 text-xs font-medium mb-2 block uppercase tracking-wider">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Zomato Order"
            className="w-full bg-white-800 border border-white-700 text-black rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors placeholder-white-600"
          />
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="text-white-400 text-xs font-medium mb-2 block uppercase tracking-wider">
            Amount (₹)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="e.g. 450"
            className="w-full bg-white-800 border border-white-700 text-black rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors placeholder-white-600"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="text-white-400 text-xs font-medium mb-2 block uppercase tracking-wider">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-white-800 border border-white-700 text-black rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors">
            {CATEGORIES[type].map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="mb-6">
          <label className="text-white-400 text-xs font-medium mb-2 block uppercase tracking-wider">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full bg-white-800 border border-white-700 text-black rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-900/20 px-4 py-2 rounded-lg">
            {error}
          </p>
        )}

        {/* Success */}
        {success && (
          <p className="text-green-400 text-sm mb-4 bg-green-900/20 px-4 py-2 rounded-lg">
            ✅ Transaction added! Redirecting...
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full flex items-center justify-center gap-2 bg-indigo-400 hover:bg-indigo-700 active:scale-95 text-black py-3 rounded-xl text-sm font-medium transition-all">
          <PlusCircle size={16} />
          Add Transaction
        </button>

      </div>
      
    </div>
  )
}

export default AddTransaction