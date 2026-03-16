import { Goal } from "@/types";
import { create } from "zustand";

interface GoalState {
  goals: Goal[];
  isLoading: boolean;
  setGoals: (goals: Goal[]) => void;
  setLoading: (loading: boolean) => void;
  addGoal: (goal: Omit<Goal, "id" | "current_amount">) => void;
  addSavings: (id: string, amount: number) => void;
  withdrawSavings: (id: string, amount: number) => void;
  removeGoal: (id: string) => void;
}

export const useGoalStore = create<GoalState>((set) => ({
  goals: [],
  isLoading: false,

  setLoading: (isLoading) => set({ isLoading }),

  setGoals: (goals) => set({ goals, isLoading: false }),

  addGoal: (goalData) => {
    const newGoal: Goal = {
      ...goalData,
      id: Math.random().toString(36).substring(2, 9),
      current_amount: 0,
    };
    set((state) => ({ goals: [...state.goals, newGoal] }));
  },

  addSavings: (id, amount) => {
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === id ? { ...g, current_amount: g.current_amount + amount } : g,
      ),
    }));
  },

  withdrawSavings: (id, amount) => {
    set((state) => ({
      goals: state.goals.map((g) =>
        g.id === id
          ? { ...g, current_amount: Math.max(0, g.current_amount - amount) }
          : g,
      ),
    }));
  },

  removeGoal: (id) => {
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== id),
    }));
  },
}));
