import { create } from "zustand";
import { persist } from "zustand/middleware";

const useExpenseStore = create(
  persist(
    (set, get) => ({
      transactions: [],
      budgets: {},

      getTotalIncome: () => {
        return get()
          .transactions.filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0);
      },

      getTotalExpense: () => {
        return get()
          .transactions.filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0);
      },

      getBalance: () => {
        return get().getTotalIncome() - get().getTotalExpense();
      },

      // actions
      // add transaction
      addTransaction: (transaction) => {
        const newTransaction = {
          id: Date.now(),
          ...transaction,
          date: transaction.date || new Date().toISOString(),
        };
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      // addbudget
      setBudget: (category, amount) => {
  set(state => ({
    budgets: { ...state.budgets, [category]: Number(amount) }
  }))
},

getBudgetStatus: () => {
  const { transactions, budgets } = get()
  
  const spent = {}
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      spent[t.category] = (spent[t.category] || 0) + t.amount
    })

  return Object.entries(budgets).map(([category, limit]) => ({
    category,
    limit,
    spent: spent[category] || 0,
    percentage: Math.round(((spent[category] || 0) / limit) * 100),
    isExceeded: (spent[category] || 0) > limit
  }))
},

      // delete transaction
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));

        return Object.entries(budgets).map(([category, limit]) => ({
          category,
          limit,
          spent: spent[category] || 0,
          percentage: Math.round(((spent[category] || 0) / limit) * 100),
          isExceeded: (spent[category] || 0) > limit,
        }));
      },

      // Edit transaction
      editTransaction: (id, updatedData) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedData } : t,
          ),
        }));
      },

      getByType: (type) => {
        if (type === "all") return get().transactions;
        return get().transactions.filter((t) => t.type === type);
      },
    }),

    {
      name: "expense-tracker-data", // localStorage key
    },
  ),
);

export default useExpenseStore;
