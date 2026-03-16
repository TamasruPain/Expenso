import { Budget } from "@/types";
import { create } from "zustand";

interface BudgetState {
  budgets: Budget[];
  isLoading: boolean;
  setBudgets: (budgets: Budget[]) => void;
  setLoading: (loading: boolean) => void;
  addBudget: (budget: Omit<Budget, "id" | "spent">) => void;
  updateBudgetAmount: (id: string, amount: number) => void;
  updateSpentAmount: (categoryId: string, amount: number) => void;
  removeBudget: (id: string) => void;
}

export const useBudgetStore = create<BudgetState>((set) => ({
  budgets: [],
  isLoading: false,

  setLoading: (isLoading) => set({ isLoading }),

  setBudgets: (budgets) => set({ budgets, isLoading: false }),

  addBudget: (budgetData) => {
    const newBudget: Budget = {
      ...budgetData,
      id: Math.random().toString(36).substring(2, 9),
      spent: 0,
    };
    set((state) => ({ budgets: [...state.budgets, newBudget] }));
  },

  updateBudgetAmount: (id, amount) => {
    set((state) => ({
      budgets: state.budgets.map((b) => (b.id === id ? { ...b, amount } : b)),
    }));
  },

  updateSpentAmount: (categoryId, amount) => {
    set((state) => ({
      budgets: state.budgets.map((b) =>
        b.categoryId === categoryId
          ? { ...b, spent: (b.spent || 0) + amount }
          : b,
      ),
    }));
  },

  removeBudget: (id) => {
    set((state) => ({
      budgets: state.budgets.filter((b) => b.id !== id),
    }));
  },
}));
