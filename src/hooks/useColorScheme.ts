import { useColorScheme as _useColorScheme } from "react-native";

/**
 * Hook to manage app color scheme.
 * In a real app, this could be linked to a user setting in the Auth store.
 */
export const useColorScheme = () => {
  const colorScheme = _useColorScheme();

  // Custom logic for manual overrides can be added here
  const isDark = colorScheme === "dark";
  const colors = isDark ? "dark" : "light";

  return {
    colorScheme,
    isDark,
    colors,
  };
};
