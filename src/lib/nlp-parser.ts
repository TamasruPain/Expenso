/**
 * Simple NLP Parser for expense commands.
 * Examples: "Coffee 50", "Add 200 for lunch", "Spent 500 on groceries"
 */
export const parseExpenseCommand = (text: string) => {
  const amountMatch = text.match(/\d+(\.\d+)?/);
  if (!amountMatch) return null;

  const amount = parseFloat(amountMatch[0]);

  // Basic keyword extraction for categories (very simplified)
  const categories = ["food", "travel", "shopping", "bills", "rent"];
  const lowercaseText = text.toLowerCase();
  const category = categories.find((c) => lowercaseText.includes(c)) || "other";

  return {
    amount,
    category,
    note: text.replace(amountMatch[0], "").trim(),
    date: new Date().toISOString(),
  };
};
