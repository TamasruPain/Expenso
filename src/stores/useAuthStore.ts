import { UserProfile } from "@/types";
import { create } from "zustand";

interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: UserProfile | null) => void;
  logout: () => void;
  updateCurrency: (currency: string, symbol: string) => void;
  updateOnboarding: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isLoading: false,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  updateCurrency: (currency, symbol) =>
    set((state) => ({
      user: state.user
        ? { ...state.user, currency, currency_symbol: symbol }
        : null,
    })),

  updateOnboarding: (status) =>
    set((state) => ({
      user: state.user ? { ...state.user, onboarding_completed: status } : null,
    })),
}));
