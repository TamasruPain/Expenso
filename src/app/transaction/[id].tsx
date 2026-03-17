import { Theme } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useDatabase } from "@/hooks/useDatabase";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { transactions } = useTransactionStore();
  const { categories } = useCategoryStore();
  const { deleteTransaction } = useDatabase();
  const { colors } = useAppTheme();

  const transaction = transactions.find((t) => t.id === id);
  const category = categories.find(
    (c) =>
      c.id === transaction?.categoryId || c.id === transaction?.category_id,
  );

  if (!transaction) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.textSecondary }]}>
            Transaction not found
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ color: colors.primary, marginTop: 10 }}>
              Go back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const success = await deleteTransaction(transaction.id);
            if (success) {
              router.back();
            } else {
              Alert.alert("Error", "Failed to delete transaction");
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          Details
        </Text>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={22} color={colors.danger} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.amountCard}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: category?.color || colors.primarySurface },
            ]}
          >
            <Ionicons
              name={(category?.icon as any) || "cash"}
              size={32}
              color={colors.white}
            />
          </View>
          <Text
            style={[
              styles.amount,
              {
                color:
                  transaction.type === "expense"
                    ? colors.danger
                    : colors.accent,
              },
            ]}
          >
            {transaction.type === "expense" ? "-" : "+"}₹
            {transaction.amount.toLocaleString()}
          </Text>
          <Text style={[styles.categoryName, { color: colors.text }]}>
            {category?.name || "Uncategorized"}
          </Text>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.white }]}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              Type
            </Text>
            <Text
              style={[
                styles.infoValue,
                { color: colors.text, textTransform: "capitalize" },
              ]}
            >
              {transaction.type}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
              Date
            </Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>
              {format(new Date(transaction.date), "dd MMMM yyyy, HH:mm")}
            </Text>
          </View>
          {transaction.note && (
            <>
              <View
                style={[styles.divider, { backgroundColor: colors.border }]}
              />
              <View style={styles.infoRowVertical}>
                <Text
                  style={[
                    styles.infoLabel,
                    { color: colors.textSecondary, marginBottom: 8 },
                  ]}
                >
                  Note
                </Text>
                <Text style={[styles.noteValue, { color: colors.text }]}>
                  {transaction.note}
                </Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: Theme.typography.size.lg,
    fontWeight: "700",
  },
  deleteButton: {
    padding: 8,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.xl,
  },
  amountCard: {
    alignItems: "center",
    marginBottom: Theme.spacing.xxl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Theme.spacing.md,
  },
  amount: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 4,
  },
  categoryName: {
    fontSize: Theme.typography.size.lg,
    fontWeight: "600",
    opacity: 0.8,
  },
  infoCard: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Theme.spacing.md,
  },
  infoRowVertical: {
    paddingVertical: Theme.spacing.md,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
  },
  noteValue: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    opacity: 0.5,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
