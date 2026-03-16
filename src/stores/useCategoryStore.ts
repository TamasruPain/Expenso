import { CATEGORIES } from "@/constants/categories";
import { Category } from "@/types";
import { create } from "zustand";

interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  setCategories: (categories: Category[]) => void;
  setLoading: (loading: boolean) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  removeCategory: (id: string) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: CATEGORIES,
  isLoading: false,

  setLoading: (isLoading) => set({ isLoading }),

  setCategories: (categories) => set({ categories, isLoading: false }),

  addCategory: (categoryData) => {
    const newCategory: Category = {
      ...categoryData,
      id: Math.random().toString(36).substring(2, 9),
    };
    set((state) => ({ categories: [...state.categories, newCategory] }));
  },

  removeCategory: (id) => {
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    }));
  },
}));
