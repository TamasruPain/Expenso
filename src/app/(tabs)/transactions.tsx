import { Colors } from "@/constants/colors";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock Data grouped by date
const TRANSACTION_SECTIONS = [
  {
    title: "Today",
    data: [
      {
        id: "1",
        name: "Starbucks",
        amount: -650,
        category: "Food",
        time: "10:30 AM",
        type: "expense",
        icon: "cafe",
      },
      {
        id: "5",
        name: "Uber",
        amount: -450,
        category: "Transport",
        time: "08:15 AM",
        type: "expense",
        icon: "car",
      },
    ],
  },
  {
    title: "Yesterday",
    data: [
      {
        id: "6",
        name: "Big Bazaar",
        amount: -2800,
        category: "Shopping",
        time: "07:30 PM",
        type: "expense",
        icon: "cart",
      },
      {
        id: "2",
        name: "Paycheck",
        amount: 85000,
        category: "Income",
        time: "09:00 AM",
        type: "income",
        icon: "wallet",
      },
    ],
  },
  {
    title: "March 05, 2026",
    data: [
      {
        id: "3",
        name: "Amazon",
        amount: -1200,
        category: "Shopping",
        time: "02:45 PM",
        type: "expense",
        icon: "cart",
      },
      {
        id: "7",
        name: "Netflix",
        amount: -199,
        category: "Entertainment",
        time: "11:00 AM",
        type: "expense",
        icon: "tv",
      },
    ],
  },
];

export default function TransactionsScreen() {
  const [filter, setFilter] = useState<"all" | "expense" | "income">("all");
  const [search, setSearch] = useState("");
  const colors = Colors.light;

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.transactionItem, { backgroundColor: colors.white }]}
    >
      <View style={styles.transactionLeft}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.primarySurface },
          ]}
        >
          <Ionicons name={item.icon as any} size={20} color={colors.primary} />
        </View>
        <View>
          <Text style={[styles.transactionName, { color: colors.text }]}>
            {item.name}
          </Text>
          <Text
            style={[styles.transactionSub, { color: colors.textSecondary }]}
          >
            {item.category} • {item.time}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.transactionAmount,
          { color: item.type === "income" ? colors.accent : colors.danger },
        ]}
      >
        {item.type === "income" ? "+" : "-"} ₹
        {Math.abs(item.amount).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }) => (
    <View
      style={[styles.sectionHeader, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
        {title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Transactions
          </Text>
          <TouchableOpacity
            style={[styles.filterIconButton, { backgroundColor: colors.white }]}
          >
            <Ionicons name="options-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: colors.primarySurface },
          ]}
        >
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            placeholder="Search transactions..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
            style={[styles.searchInput, { color: colors.text }]}
          />
        </View>

        {/* Filter Pills */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterPill,
              filter === "all" && { backgroundColor: colors.primary },
            ]}
            onPress={() => setFilter("all")}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color: filter === "all" ? colors.white : colors.textSecondary,
                },
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterPill,
              filter === "expense" && { backgroundColor: colors.primary },
            ]}
            onPress={() => setFilter("expense")}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color:
                    filter === "expense" ? colors.white : colors.textSecondary,
                },
              ]}
            >
              Expenses
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterPill,
              filter === "income" && { backgroundColor: colors.primary },
            ]}
            onPress={() => setFilter("income")}
          >
            <Text
              style={[
                styles.filterText,
                {
                  color:
                    filter === "income" ? colors.white : colors.textSecondary,
                },
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        <SectionList
          sections={TRANSACTION_SECTIONS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          stickySectionHeadersEnabled={false}
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
  filterIconButton: {
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderRadius: Theme.radius.md,
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: Theme.spacing.sm,
    fontSize: Theme.typography.size.md,
    fontWeight: "500",
  },
  filterContainer: {
    flexDirection: "row",
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.lg,
  },
  filterPill: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterText: {
    fontSize: Theme.typography.size.xs,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    paddingVertical: Theme.spacing.sm,
    marginBottom: Theme.spacing.xs,
  },
  sectionTitle: {
    fontSize: Theme.typography.size.xs,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.sm,
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
  transactionSub: {
    fontSize: 12,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
  },
});
