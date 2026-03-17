import { Colors } from "@/constants/colors";
import { useThemeStore } from "@/stores/useThemeStore";
import { useColorScheme } from "react-native";

/**
 * Hook to provide the current theme and colors.
 * Automatically handles system appearance if 'system' theme is selected.
 */
export function useAppTheme() {
  const { theme } = useThemeStore();
  const systemColorScheme = useColorScheme();

  const isDark =
    theme === "dark" || (theme === "system" && systemColorScheme === "dark");

  const colors = isDark ? Colors.dark : Colors.light;

  return {
    theme,
    isDark,
    colors,
  };
}
