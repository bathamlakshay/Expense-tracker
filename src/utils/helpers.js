// Format number to Indian currency
export const formatCurrency = (amount) =>
  `₹${Number(amount).toLocaleString('en-IN')}`

// Format date to readable format
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

// Get relative time like "Today", "Yesterday", "2 days ago"
export const getRelativeTime = (dateString) => {
  const date = new Date(dateString)
  const today = new Date()
  const diffTime = today - date
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return formatDate(dateString)
}

// Get category emoji
export const getCategoryEmoji = (category) => {
  const emojis = {
    food: '🍔',
    transport: '🚗',
    entertainment: '🎬',
    shopping: '🛍️',
    health: '💊',
    education: '📚',
    bills: '🧾',
    salary: '💰',
    freelance: '💻',
    other: '📦'
  }
  return emojis[category] || '📦'
}

// Get category color
export const getCategoryColor = (category) => {
  const colors = {
    food: '#f87171',
    transport: '#60a5fa',
    entertainment: '#a78bfa',
    shopping: '#fb923c',
    health: '#34d399',
    education: '#facc15',
    bills: '#f472b6',
    salary: '#4ade80',
    freelance: '#22d3ee',
    other: '#94a3b8'
  }
  return colors[category] || '#94a3b8'
}