import { Transaction, TransactionType } from "@/types";
import { create } from "zustand";

interface TransactionState {
  transactions: Transaction[];
  isLoading: boolean;
  setTransactions: (transactions: Transaction[]) => void;
  setLoading: (loading: boolean) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  removeTransaction: (id: string) => void;
  getTransactionsByType: (type: TransactionType) => Transaction[];
  getTotalBalance: () => number;
  getTotalIncome: () => number;
  getTotalExpense: () => number;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  isLoading: false,

  setLoading: (isLoading) => set({ isLoading }),

  setTransactions: (transactions) => set({ transactions, isLoading: false }),

  addTransaction: (transactionData) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Math.random().toString(36).substring(2, 9),
    };
    set((state) => ({
      transactions: [newTransaction, ...state.transactions],
    }));
  },

  removeTransaction: (id) => {
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
  },

  getTransactionsByType: (type) => {
    return get().transactions.filter((t) => t.type === type);
  },

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

  getTotalBalance: () => {
    return get().getTotalIncome() - get().getTotalExpense();
  },
}));
