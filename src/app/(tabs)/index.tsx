import { AddTransactionModal } from "@/components/transaction/AddTransactionModal";
import { Colors } from "@/constants/colors";
import { Theme } from "@/constants/theme";
import { useDatabase } from "@/hooks/useDatabase";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCategoryStore } from "@/stores/useCategoryStore";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { user } = useAuthStore();
  const {
    transactions,
    isLoading,
    getTotalIncome,
    getTotalExpense,
    getTotalBalance,
  } = useTransactionStore();
  const { categories } = useCategoryStore();
  const { refreshAllData } = useDatabase();

  const colors = Colors.light;

  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  const recentTransactions = transactions.slice(0, 5);

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.icon || "medical";
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.name || "Other";
  };

  const renderTransaction = (item: any) => (
    <View
      key={item.id}
      style={[styles.transactionItem, { backgroundColor: colors.white }]}
    >
      <View style={styles.transactionLeft}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.primarySurface },
          ]}
        >
          <Ionicons
            name={getCategoryIcon(item.categoryId) as any}
            size={20}
            color={colors.primary}
          />
        </View>
        <View>
          <Text style={[styles.transactionName, { color: colors.text }]}>
            {item.note || getCategoryName(item.categoryId)}
          </Text>
          <Text
            style={[styles.transactionDate, { color: colors.textSecondary }]}
          >
            {new Date(item.date).toLocaleDateString()} •{" "}
            {getCategoryName(item.categoryId)}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          { color: item.type === "income" ? colors.accent : colors.danger },
        ]}
      >
        {item.type === "income" ? "+" : "-"} {user?.currency_symbol || "₹"}
        {Math.abs(item.amount).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
              Good Morning 🇮🇳
            </Text>
            <Text style={[styles.userName, { color: colors.text }]}>
              {user?.fullName || "Guest"}
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.profileButton, { backgroundColor: colors.white }]}
          >
            <View
              style={[
                styles.profilePlaceholder,
                { backgroundColor: colors.border },
              ]}
            />
          </TouchableOpacity>
        </View>

        {/* Total Spent Card */}
        <LinearGradient
          colors={[colors.primary, "#6A4AD9"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.totalSpentCard}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardLabel}>Total spent</Text>
            <Text style={styles.cardMonth}>March 2026</Text>
          </View>
          <Text style={styles.totalAmount}>
            {user?.currency_symbol || "₹"} {getTotalExpense().toLocaleString()}
          </Text>

          <View style={styles.cardFooter}>
            <View style={styles.incomeSaveContainer}>
              <View
                style={[
                  styles.smallCard,
                  { backgroundColor: "rgba(255,255,255,0.2)" },
                ]}
              >
                <View style={styles.smallCardIconContainer}>
                  <Ionicons name="briefcase" size={14} color="#FFF" />
                </View>
                <View>
                  <Text style={styles.smallCardLabel}>Income</Text>
                  <Text style={styles.smallCardValue}>
                    {user?.currency_symbol || "₹"}{" "}
                    {getTotalIncome().toLocaleString()}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.smallCard,
                  { backgroundColor: "rgba(255,255,255,0.2)" },
                ]}
              >
                <View style={styles.smallCardIconContainer}>
                  <Ionicons name="save" size={14} color="#FFF" />
                </View>
                <View>
                  <Text style={styles.smallCardLabel}>Save</Text>
                  <Text style={styles.smallCardValue}>
                    {user?.currency_symbol || "₹"}{" "}
                    {getTotalBalance().toLocaleString()}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Monthly Budget Progress */}
        <View
          style={[styles.budgetContainer, { backgroundColor: colors.card }]}
        >
          <View style={styles.budgetHeader}>
            <Text style={[styles.budgetTitle, { color: colors.textSecondary }]}>
              March 2026
            </Text>
            <Text
              style={[styles.budgetPercent, { color: colors.textSecondary }]}
            >
              75%
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
                { backgroundColor: colors.primary, width: "75%" },
              ]}
            />
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View
            style={[
              styles.statItem,
              { backgroundColor: colors.primarySurface },
            ]}
          >
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {user?.currency_symbol || "₹"}{" "}
              {(getTotalExpense() / 30).toFixed(0)}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Daily Avg
            </Text>
          </View>
          <View
            style={[
              styles.statItem,
              { backgroundColor: colors.primarySurface },
            ]}
          >
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {transactions.length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Transactions
            </Text>
          </View>
          <View
            style={[
              styles.statItem,
              { backgroundColor: colors.primarySurface },
            ]}
          >
            <Text style={[styles.statValue, { color: colors.primary }]}>
              {categories.length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Categories
            </Text>
          </View>
        </View>

        {/* Recent Transactions Header */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Transactions
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={[styles.viewAll, { color: colors.primary }]}>
              View all
            </Text>
          </TouchableOpacity>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsList}>
          {isLoading ? (
            <ActivityIndicator
              color={colors.primary}
              style={{ marginTop: 20 }}
            />
          ) : recentTransactions.length > 0 ? (
            recentTransactions.map((item) => renderTransaction(item))
          ) : (
            <Text
              style={{
                textAlign: "center",
                color: colors.textSecondary,
                marginTop: 20,
              }}
            >
              No transactions yet.
            </Text>
          )}
        </View>
      </ScrollView>

      {/* Add Button FAB Overlay (The tab bar doesn't support center FAB easily without more work, 
          so I'll just add it to the dashboard for now like a Floating button) */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={32} color={colors.white} />
      </TouchableOpacity>

      <AddTransactionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: 110, // Extra space for tab bar and FAB
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },
  greeting: {
    fontSize: Theme.typography.size.sm,
    fontWeight: "500",
  },
  userName: {
    fontSize: Theme.typography.size.xl,
    fontWeight: "700",
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profilePlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  totalSpentCard: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.lg,
    elevation: 4,
    shadowColor: "#7C5CFC",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.xs,
  },
  cardLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: Theme.typography.size.sm,
    fontWeight: "500",
  },
  cardMonth: {
    color: "rgba(255,255,255,0.6)",
    fontSize: Theme.typography.size.xs,
  },
  totalAmount: {
    color: "#FFF",
    fontSize: Theme.typography.size.h1,
    fontWeight: "700",
    marginBottom: Theme.spacing.lg,
  },
  cardFooter: {
    marginTop: Theme.spacing.xs,
  },
  incomeSaveContainer: {
    flexDirection: "row",
    gap: Theme.spacing.md,
  },
  smallCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: Theme.spacing.sm,
    borderRadius: Theme.radius.md,
    gap: Theme.spacing.sm,
  },
  smallCardIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  smallCardLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    fontWeight: "600",
  },
  smallCardValue: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "700",
  },
  budgetContainer: {
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.lg,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  budgetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.sm,
  },
  budgetTitle: {
    fontSize: Theme.typography.size.xs,
    fontWeight: "600",
  },
  budgetPercent: {
    fontSize: Theme.typography.size.xs,
    fontWeight: "700",
  },
  progressBackground: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  statItem: {
    flex: 1,
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    alignItems: "center",
  },
  statValue: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: Theme.typography.size.lg,
    fontWeight: "700",
  },
  viewAll: {
    fontSize: Theme.typography.size.xs,
    fontWeight: "700",
  },
  transactionsList: {
    gap: Theme.spacing.sm,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  transactionLeft: {
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
  transactionName: {
    fontSize: 15,
    fontWeight: "600",
  },
  transactionDate: {
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
  fab: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 96 : 88, // Above the tab bar
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#7C5CFC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
