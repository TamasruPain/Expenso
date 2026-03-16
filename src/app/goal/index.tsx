import { Button } from "@/components/ui/Button";
import { Colors } from "@/constants/colors";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock Goals Data
const GOALS = [
  {
    id: "1",
    name: "New iPhone 17",
    current: 45000,
    target: 85000,
    icon: "logo-apple",
    color: "#1A1A2E",
  },
  {
    id: "2",
    name: "Europe Trip",
    current: 120000,
    target: 300000,
    icon: "airplane",
    color: "#7C5CFC",
  },
  {
    id: "3",
    name: "Emergency Fund",
    current: 50000,
    target: 200000,
    icon: "shield-checkmark",
    color: "#00D09E",
  },
];

export default function GoalsScreen() {
  const router = useRouter();
  const colors = Colors.light;

  const renderGoalItem = ({ item }: { item: (typeof GOALS)[0] }) => {
    const percent = Math.min(100, (item.current / item.target) * 100);

    return (
      <TouchableOpacity
        style={[styles.goalCard, { backgroundColor: colors.white }]}
        onPress={() => router.push(`/goal/${item.id}`)}
      >
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: colors.primarySurface },
            ]}
          >
            <Ionicons
              name={item.icon as any}
              size={24}
              color={colors.primary}
            />
          </View>
          <View style={styles.headerText}>
            <Text style={[styles.goalName, { color: colors.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.goalTarget, { color: colors.textSecondary }]}>
              Target: ₹{item.target.toLocaleString()}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textSecondary}
          />
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressLabels}>
            <Text style={[styles.progressText, { color: colors.text }]}>
              ₹{item.current.toLocaleString()}
            </Text>
            <Text style={[styles.percentText, { color: colors.primary }]}>
              {percent.toFixed(0)}%
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
                { backgroundColor: colors.primary, width: `${percent}%` },
              ]}
            />
          </View>
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Savings Goals
          </Text>
        </View>

        <View style={[styles.summaryCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.summaryLabel}>Total Savings</Text>
          <Text style={styles.summaryValue}>₹ 2,15,000</Text>
          <View style={styles.summaryFooter}>
            <Text style={styles.summaryStats}>
              Across {GOALS.length} active goals
            </Text>
          </View>
        </View>

        <FlatList
          data={GOALS}
          renderItem={renderGoalItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Active Goals
            </Text>
          }
        />

        <Button
          title="Create New Goal"
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
    alignItems: "center",
    paddingTop: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  backButton: {
    padding: 8,
    marginRight: Theme.spacing.sm,
  },
  headerTitle: {
    fontSize: Theme.typography.size.lg,
    fontWeight: "700",
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
    marginBottom: Theme.spacing.sm,
  },
  summaryFooter: {
    marginTop: 8,
  },
  summaryStats: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: Theme.typography.size.lg,
    fontWeight: "700",
    marginBottom: Theme.spacing.md,
  },
  listContent: {
    paddingBottom: 20,
  },
  goalCard: {
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.md,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Theme.spacing.md,
  },
  headerText: {
    flex: 1,
  },
  goalName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  goalTarget: {
    fontSize: 12,
  },
  progressSection: {
    marginTop: Theme.spacing.xs,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 6,
  },
  progressText: {
    fontSize: 15,
    fontWeight: "700",
  },
  percentText: {
    fontSize: 13,
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
  createButton: {
    marginVertical: Theme.spacing.md,
  },
});
