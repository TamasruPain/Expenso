import { Theme } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getIoniconsName } from "@/lib/icons";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Mock Categories
// Fallback categories if none are found in DB
export const FALLBACK_CATEGORIES = [
  { id: "1", name: "Food", icon: "cafe", color: "#FF6B6B" },
  { id: "2", name: "Transport", icon: "car", color: "#4ECDC4" },
  { id: "3", name: "Shopping", icon: "cart", color: "#45B7D1" },
  { id: "4", name: "Housing", icon: "home", color: "#96CEB4" },
  { id: "5", name: "Health", icon: "medkit", color: "#FF8A65" },
  { id: "6", name: "Entertainment", icon: "tv", color: "#AB47BC" },
  { id: "7", name: "Education", icon: "book", color: "#5C6BC0" },
  { id: "8", name: "Bills", icon: "flash", color: "#FFA726" },
  { id: "9", name: "Travel", icon: "airplane", color: "#26A69A" },
  { id: "10", name: "Other", icon: "ellipsis-horizontal", color: "#78909C" },
];

interface CategoryGridProps {
  selectedId?: string;
  onSelect: (id: string) => void;
  type: "expense" | "income";
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedId,
  onSelect,
  type,
}) => {
  const { colors } = useAppTheme();
  const { categories, isLoading } = useCategoryStore();

  const displayCategories =
    categories.length > 0 ? categories : FALLBACK_CATEGORIES;

  const renderItem = ({ item }: { item: any }) => {
    const isSelected = selectedId === item.id;

    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {
            backgroundColor: isSelected ? colors.primarySurface : colors.card,
            borderColor: isSelected ? colors.primary : colors.border,
            borderWidth: isSelected ? 2 : 1,
          },
        ]}
        onPress={() => onSelect(item.id)}
      >
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: isSelected ? colors.card : colors.primarySurface,
            },
          ]}
        >
          <Ionicons
            name={getIoniconsName(item.icon)}
            size={20}
            color={isSelected ? colors.primary : colors.textSecondary}
          />
        </View>
        <Text
          style={[
            styles.name,
            { color: isSelected ? colors.primary : colors.textSecondary },
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayCategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={4}
        scrollEnabled={false}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Theme.spacing.md,
  },
  row: {
    justifyContent: "flex-start",
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  itemContainer: {
    width: "23%",
    aspectRatio: 1,
    borderRadius: Theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    padding: Theme.spacing.xs,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 10,
    fontWeight: "600",
  },
  center: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
});
