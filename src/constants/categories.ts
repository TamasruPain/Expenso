import { Category } from "@/types";

export const CATEGORIES: Category[] = [
  // Expense Categories
  {
    id: "1",
    name: "Food",
    icon: "restaurant",
    color: "#FF6B6B",
    type: "expense",
  },
  {
    id: "2",
    name: "Transport",
    icon: "car",
    color: "#4ECDC4",
    type: "expense",
  },
  {
    id: "3",
    name: "Shopping",
    icon: "cart",
    color: "#45B7D1",
    type: "expense",
  },
  {
    id: "4",
    name: "Bills",
    icon: "receipt",
    color: "#FF9F43",
    type: "expense",
  },
  {
    id: "5",
    name: "Entertainment",
    icon: "tv",
    color: "#AB47BC",
    type: "expense",
  },
  {
    id: "6",
    name: "Health",
    icon: "medical",
    color: "#26DE81",
    type: "expense",
  },
  {
    id: "7",
    name: "Travel",
    icon: "airplane",
    color: "#54A0FF",
    type: "expense",
  },
  {
    id: "8",
    name: "Education",
    icon: "book",
    color: "#FD9644",
    type: "expense",
  },

  // Income Categories
  { id: "9", name: "Salary", icon: "cash", color: "#00D09E", type: "income" },
  {
    id: "10",
    name: "Freelance",
    icon: "laptop",
    color: "#7C5CFC",
    type: "income",
  },
  {
    id: "11",
    name: "Investment",
    icon: "trending-up",
    color: "#20BF6B",
    type: "income",
  },
  { id: "12", name: "Gift", icon: "gift", color: "#EB3B5A", type: "income" },
];

export const getCategoryById = (id: string) =>
  CATEGORIES.find((c) => c.id === id);
export const getExpenseCategories = () =>
  CATEGORIES.filter((c) => c.type === "expense");
export const getIncomeCategories = () =>
  CATEGORIES.filter((c) => c.type === "income");
