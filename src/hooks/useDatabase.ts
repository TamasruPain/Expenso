import { useBudgetStore } from "@/stores/useBudgetStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useGoalStore } from "@/stores/useGoalStore";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { Budget, Category, Goal, Transaction } from "@/types";
import { useCallback } from "react";
import { useSupabase } from "./useSupabase";

/**
 * Unified hook for all database interactions.
 * Connects Supabase data layer with Zustand stores.
 */
export function useDatabase() {
  const supabase = useSupabase();

  // Stores
  const txStore = useTransactionStore();
  const budgetStore = useBudgetStore();
  const goalStore = useGoalStore();
  const categoryStore = useCategoryStore();

  // --- Transactions ---

  const fetchTransactions = useCallback(async () => {
    txStore.setLoading(true);
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });

    if (!error && data) {
      // Map DB snake_case to FE camelCase if needed,
      // but here we keep camelCase where possible.
      txStore.setTransactions(data as Transaction[]);
    }
    txStore.setLoading(false);
  }, [supabase]);

  const addTransaction = async (tx: Omit<Transaction, "id">) => {
    const dbTx = {
      ...tx,
      category_id: tx.categoryId, // Ensure mapping for insert
    };
    delete (dbTx as any).categoryId;

    const { data, error } = await supabase
      .from("transactions")
      .insert([dbTx])
      .select()
      .single();

    if (!error && data) {
      txStore.addTransaction(data as Transaction);
      return data;
    }
    return null;
  };

  const deleteTransaction = async (id: string) => {
    const { error } = await supabase.from("transactions").delete().eq("id", id);
    if (!error) {
      txStore.removeTransaction(id);
      return true;
    }
    return false;
  };

  // --- Budgets ---

  const fetchBudgets = useCallback(async () => {
    budgetStore.setLoading(true);
    const { data, error } = await supabase.from("budgets").select("*");

    if (!error && data) {
      budgetStore.setBudgets(data as Budget[]);
    }
    budgetStore.setLoading(false);
  }, [supabase]);

  const upsertBudget = async (budget: Omit<Budget, "id"> & { id?: string }) => {
    const { data, error } = await supabase
      .from("budgets")
      .upsert({
        ...budget,
        category_id: budget.categoryId,
      })
      .select()
      .single();

    if (!error && data) {
      fetchBudgets(); // Refresh all budgets to be safe
      return data;
    }
    return null;
  };

  // --- Goals ---

  const fetchGoals = useCallback(async () => {
    goalStore.setLoading(true);
    const { data, error } = await supabase.from("goals").select("*");

    if (!error && data) {
      goalStore.setGoals(data as Goal[]);
    }
    goalStore.setLoading(false);
  }, [supabase]);

  const addGoal = async (goal: Omit<Goal, "id">) => {
    const { data, error } = await supabase
      .from("goals")
      .insert([goal])
      .select()
      .single();

    if (!error && data) {
      fetchGoals();
      return data;
    }
    return null;
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    const { data, error } = await supabase
      .from("goals")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (!error && data) {
      fetchGoals();
      return data;
    }
    return null;
  };

  // --- Categories ---

  const fetchCategories = useCallback(async () => {
    categoryStore.setLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) {
      categoryStore.setCategories(data as Category[]);
    }
    categoryStore.setLoading(false);
  }, [supabase]);

  // --- Initial Data Loader ---

  const refreshAllData = useCallback(async () => {
    await Promise.all([
      fetchTransactions(),
      fetchBudgets(),
      fetchGoals(),
      fetchCategories(),
    ]);
  }, [fetchTransactions, fetchBudgets, fetchGoals, fetchCategories]);

  return {
    refreshAllData,
    fetchTransactions,
    addTransaction,
    deleteTransaction,
    fetchBudgets,
    upsertBudget,
    fetchGoals,
    addGoal,
    updateGoal,
    fetchCategories,
    isLoading:
      txStore.isLoading ||
      budgetStore.isLoading ||
      goalStore.isLoading ||
      categoryStore.isLoading,
  };
}
