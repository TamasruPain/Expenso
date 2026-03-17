import { Ionicons } from "@expo/vector-icons";

/**
 * Maps emoji or descriptive icon names to valid Ionicons names.
 * This helps resolve warnings when using icons from a database that might
 * contain emojis or invalid names.
 */
export function getIoniconsName(
  iconName: string,
): keyof typeof Ionicons.glyphMap {
  const mapping: Record<string, keyof typeof Ionicons.glyphMap> = {
    // Emojis from warnings
    "🍔": "restaurant",
    "💼": "briefcase",
    "💰": "cash",
    "🚗": "car",
    "📈": "trending-up",
    "🛒": "cart",
    "🎁": "gift",
    "🏠": "home",
    "⚡": "flash",
    "💊": "medical",
    "🎬": "videocam",
    "📚": "book",
    "💡": "bulb",
    "✈️": "airplane",

    // Additional potential emojis or descriptive names
    food: "restaurant",
    transport: "car",
    shopping: "cart",
    bills: "receipt",
    health: "medkit",
    education: "book",
    investment: "trending-up",
    entertainment: "tv",
  };

  if (iconName in mapping) {
    return mapping[iconName];
  }

  // Fallback if the iconName itself is a valid glyph
  if (iconName in Ionicons.glyphMap) {
    return iconName as keyof typeof Ionicons.glyphMap;
  }

  // Final fallback
  return "help-circle-outline";
}
