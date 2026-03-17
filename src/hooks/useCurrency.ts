import { getCurrencyByCode } from "@/constants/currencies";
import { useAuthStore } from "@/stores/useAuthStore";
import * as Localization from "expo-localization";
import { useCallback } from "react";

/**
 * Hook to manage app-wide currency settings.
 * Handles auto-detection and manual overrides.
 */
export const useCurrency = () => {
  const { user, updateCurrency } = useAuthStore();

  const detectRegionCurrency = useCallback(() => {
    const locales = Localization.getLocales();
    if (locales && locales.length > 0) {
      const regionCode = locales[0].regionCode;
      // Simple mapping
      if (regionCode === "IN") return "INR";
      if (regionCode === "US") return "USD";
      if (regionCode === "GB") return "GBP";
      // Default to USD if uncertain
      return "USD";
    }
    return "USD";
  }, []);

  const changeCurrency = (code: string) => {
    const currency = getCurrencyByCode(code);
    updateCurrency(code, currency.symbol);
  };

  const currentCurrency = getCurrencyByCode(
    user?.currency || detectRegionCurrency(),
  );

  return {
    currentCurrency,
    changeCurrency,
    detectRegionCurrency,
  };
};
