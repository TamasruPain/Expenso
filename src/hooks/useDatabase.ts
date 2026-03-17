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

  // Store Selectors (Stable Actions)
  const setTransactions = useTransactionStore((state) => state.setTransactions);
  const setTxLoading = useTransactionStore((state) => state.setLoading);
  const addTxToStore = useTransactionStore((state) => state.addTransaction);
  const removeTxFromStore = useTransactionStore(
    (state) => state.removeTransaction,
  );
  const isTxLoading = useTransactionStore((state) => state.isLoading);

  const setBudgets = useBudgetStore((state) => state.setBudgets);
  const setBudgetLoading = useBudgetStore((state) => state.setLoading);
  const isBudgetLoading = useBudgetStore((state) => state.isLoading);

  const setGoals = useGoalStore((state) => state.setGoals);
  const setGoalLoading = useGoalStore((state) => state.setLoading);
  const isGoalLoading = useGoalStore((state) => state.isLoading);

  const setCategories = useCategoryStore((state) => state.setCategories);
  const setCategoryLoading = useCategoryStore((state) => state.setLoading);
  const isCategoryLoading = useCategoryStore((state) => state.isLoading);

  // --- Transactions ---

  const fetchTransactions = useCallback(async () => {
    setTxLoading(true);
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });

    if (!error && data) {
      // Map DB column names to FE field names
      const mapped = data.map((row: any) => ({
        ...row,
        categoryId: row.category_id || row.categoryId,
      }));
      setTransactions(mapped as Transaction[]);
    }
    setTxLoading(false);
  }, [supabase, setTransactions, setTxLoading]);

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
      addTxToStore(data as Transaction);
      return data;
    }
    return null;
  };

  const deleteTransaction = async (id: string) => {
    const { error } = await supabase.from("transactions").delete().eq("id", id);
    if (!error) {
      removeTxFromStore(id);
      return true;
    }
    return false;
  };

  const updateTransaction = async (
    id: string,
    updates: Partial<Omit<Transaction, "id">>,
  ) => {
    const dbUpdates: any = { ...updates };
    if (updates.categoryId) {
      dbUpdates.category_id = updates.categoryId;
      delete dbUpdates.categoryId;
    }
    const { data, error } = await supabase
      .from("transactions")
      .update(dbUpdates)
      .eq("id", id)
      .select()
      .single();

    if (!error && data) {
      // Refresh all transactions to get clean data
      await fetchTransactions();
      return data;
    }
    return null;
  };

  // --- Budgets ---

  const fetchBudgets = useCallback(async () => {
    setBudgetLoading(true);
    const { data, error } = await supabase.from("budgets").select("*");

    if (!error && data) {
      // Map DB column names to FE field names
      const mapped = data.map((row: any) => ({
        ...row,
        categoryId: row.category_id || row.categoryId,
      }));
      setBudgets(mapped as Budget[]);
    }
    setBudgetLoading(false);
  }, [supabase, setBudgets, setBudgetLoading]);

  const upsertBudget = async (budget: Omit<Budget, "id"> & { id?: string }) => {
    const dbBudget = {
      ...budget,
      category_id: budget.categoryId,
    };
    delete (dbBudget as any).categoryId;

    let result;

    if (dbBudget.id) {
      // Update existing budget
      const updatePayload = { ...dbBudget };
      delete updatePayload.id;

      result = await supabase
        .from("budgets")
        .update(updatePayload)
        .eq("id", dbBudget.id)
        .select()
        .single();
    } else {
      // Insert new budget
      result = await supabase
        .from("budgets")
        .insert([dbBudget])
        .select()
        .single();
    }

    const { data, error } = result;

    if (error) {
      console.error("Error saving budget:", error);
    }

    if (!error && data) {
      fetchBudgets(); // Refresh all budgets to be safe
      return data;
    }
    return null;
  };

  const deleteBudget = async (id: string) => {
    const { error } = await supabase.from("budgets").delete().eq("id", id);
    if (!error) {
      // Could also update the local store manually, but fetching is safer
      fetchBudgets();
      return true;
    }
    return false;
  };

  // --- Goals ---

  const fetchGoals = useCallback(async () => {
    setGoalLoading(true);
    const { data, error } = await supabase.from("goals").select("*");

    if (!error && data) {
      setGoals(data as Goal[]);
    }
    setGoalLoading(false);
  }, [supabase, setGoals, setGoalLoading]);

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
    setCategoryLoading(true);
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (!error && data) {
      setCategories(data as Category[]);
    }
    setCategoryLoading(false);
  }, [supabase, setCategories, setCategoryLoading]);

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
    updateTransaction,
    deleteTransaction,
    fetchBudgets,
    upsertBudget,
    deleteBudget,
    fetchGoals,
    addGoal,
    updateGoal,
    fetchCategories,
    isLoading:
      isTxLoading || isBudgetLoading || isGoalLoading || isCategoryLoading,
  };
}
