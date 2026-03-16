import { Button } from "@/components/ui/Button";
import { Colors } from "@/constants/colors";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock Budget Data
const BUDGETS = [
  {
    id: "1",
    name: "Food & Dining",
    spent: 12500,
    limit: 15000,
    icon: "cafe",
    color: "#FF6B6B",
  },
  {
    id: "2",
    name: "Transport",
    spent: 4500,
    limit: 5000,
    icon: "car",
    color: "#4ECDC4",
  },
  {
    id: "3",
    name: "Shopping",
    spent: 8400,
    limit: 7000,
    icon: "cart",
    color: "#45B7D1",
  }, // Over budget
  {
    id: "4",
    name: "Entertainment",
    spent: 2200,
    limit: 4000,
    icon: "tv",
    color: "#AB47BC",
  },
];

export default function BudgetsScreen() {
  const colors = Colors.light;

  const renderBudgetItem = ({ item }: { item: (typeof BUDGETS)[0] }) => {
    const percent = Math.min(100, (item.spent / item.limit) * 100);
    const isOver = item.spent > item.limit;

    return (
      <TouchableOpacity
        style={[styles.budgetCard, { backgroundColor: colors.white }]}
      >
        <View style={styles.cardTop}>
          <View style={styles.cardHeaderLeft}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.primarySurface },
              ]}
            >
              <Ionicons
                name={item.icon as any}
                size={20}
                color={colors.primary}
              />
            </View>
            <View>
              <Text style={[styles.budgetName, { color: colors.text }]}>
                {item.name}
              </Text>
              <Text
                style={[styles.budgetLimit, { color: colors.textSecondary }]}
              >
                Limit: ₹{item.limit.toLocaleString()}
              </Text>
            </View>
          </View>
          <Text
            style={[
              styles.spentText,
              { color: isOver ? colors.danger : colors.text },
            ]}
          >
            ₹{item.spent.toLocaleString()}
          </Text>
        </View>

        <View
          style={[
            styles.progressBackground,
            { backgroundColor: colors.primarySurface },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                width: `${percent}%`,
                backgroundColor: isOver ? colors.danger : colors.primary,
              },
            ]}
          />
        </View>

        <View style={styles.cardFooter}>
          <Text style={[styles.remainingText, { color: colors.textSecondary }]}>
            {isOver ? "Over budget by" : "Remaining"}
          </Text>
          <Text
            style={[
              styles.remainingValue,
              { color: isOver ? colors.danger : colors.accent },
            ]}
          >
            ₹{Math.abs(item.limit - item.spent).toLocaleString()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Budgets</Text>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: colors.white }]}
          >
            <Ionicons name="add" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Total Budget Summary */}
        <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.summaryLabel}>Total Monthly Budget</Text>
          <Text style={styles.summaryValue}>₹ 45,000</Text>
          <View style={styles.summaryFooter}>
            <View>
              <Text style={styles.statLabel}>Spent</Text>
              <Text style={styles.statValue}>₹ 27,600</Text>
            </View>
            <View style={styles.divider} />
            <View>
              <Text style={styles.statLabel}>Remaining</Text>
              <Text style={styles.statValue}>₹ 17,400</Text>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Category Budgets
        </Text>

        <FlatList
          data={BUDGETS}
          renderItem={renderBudgetItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

        <Button
          title="Create New Budget"
          onPress={() => {}}
          style={styles.createButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.typography.size.xxl,
    fontWeight: "700",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryCard: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.xl,
    elevation: 4,
    shadowColor: "#7C5CFC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  summaryLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: Theme.typography.size.sm,
    fontWeight: "500",
    marginBottom: 4,
  },
  summaryValue: {
    color: "#FFF",
    fontSize: Theme.typography.size.h1 - 4,
    fontWeight: "700",
    marginBottom: Theme.spacing.lg,
  },
  summaryFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.xl,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  statLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  statValue: {
    color: "#FFF",
    fontSize: Theme.typography.size.md,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: Theme.typography.size.lg,
    fontWeight: "700",
    marginBottom: Theme.spacing.md,
  },
  listContent: {
    paddingBottom: 20,
  },
  budgetCard: {
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  budgetName: {
    fontSize: 15,
    fontWeight: "600",
  },
  budgetLimit: {
    fontSize: 12,
  },
  spentText: {
    fontSize: 16,
    fontWeight: "700",
  },
  progressBackground: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: Theme.spacing.sm,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  remainingText: {
    fontSize: 11,
    fontWeight: "600",
  },
  remainingValue: {
    fontSize: 12,
    fontWeight: "700",
  },
  createButton: {
    marginVertical: Theme.spacing.md,
    marginBottom: 100,
  },
});
