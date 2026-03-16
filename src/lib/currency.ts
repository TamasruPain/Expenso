/**
 * Currency Utility Library.
 * Handles formatting amounts according to the user's localized currency settings.
 */
export const formatCurrency = (
  amount: number,
  locale: string = "en-IN",
  currency: string = "INR",
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const parseCurrencyString = (str: string) => {
  const cleaned = str.replace(/[^0-9.]/g, "");
  return parseFloat(cleaned) || 0;
};
