// Core Data Types

export type TransactionType = "income" | "expense";

export interface Category {
  id: string;
  user_id?: string;
  name: string;
  icon: string;
  color: string;
  type: TransactionType;
  is_default?: boolean;
  sort_order?: number;
  created_at?: string;
}

export interface Transaction {
  id: string;
  user_id?: string;
  amount: number;
  type: TransactionType;
  categoryId: string; // FE internal ref, mapped to category_id in DB
  category_id?: string; // DB field
  note?: string;
  date: string; // ISO String or DATE
  is_recurring?: boolean;
  recurring_interval?: "daily" | "weekly" | "monthly" | "yearly";
  created_at?: string;
  updated_at?: string;
}

export interface Budget {
  id: string;
  user_id?: string;
  categoryId: string; // FE internal ref
  category_id?: string; // DB field
  amount: number; // Renamed from 'limit'
  spent?: number; // Calculated field
  month: number;
  year: number;
  created_at?: string;
}

export interface Goal {
  id: string;
  user_id?: string;
  name: string;
  target_amount: number; // Aligned with DB target_amount
  current_amount: number; // Aligned with DB current_amount
  deadline?: string;
  icon?: string;
  color?: string;
  is_completed?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Badge {
  id: string;
  user_id?: string;
  badge_type: string; // Aligned with DB badge_type
  earned_at?: string;
}

export interface UserProfile {
  id: string;
  clerk_id: string;
  email: string;
  fullName: string;
  avatar_url?: string;
  currency: string;
  currency_symbol: string;
  locale?: string;
  onboarding_completed: boolean;
  created_at?: string;
  updated_at?: string;
}
