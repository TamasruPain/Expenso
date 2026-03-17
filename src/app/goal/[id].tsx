import { Button } from "@/components/ui/Button";
import { Theme } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getIoniconsName } from "@/lib/icons";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GoalDetailScreen() {
  const router = useRouter();
  useLocalSearchParams();
  const { colors } = useAppTheme();

  // Mock data for a single goal
  const goal = {
    id: "2",
    name: "Europe Trip",
    current: 120000,
    target: 300000,
    icon: "airplane",
    color: "#7C5CFC",
    startDate: "01 Jan 2026",
    estimatedEnd: "31 Aug 2026",
    monthlyAvg: 20000,
  };

  const percent = Math.min(100, (goal.current / goal.target) * 100);

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
          Goal Details
        </Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="ellipsis-vertical" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View
            style={[
              styles.iconLarge,
              { backgroundColor: colors.primarySurface },
            ]}
          >
            <Ionicons
              name={getIoniconsName(goal.icon)}
              size={48}
              color={colors.primary}
            />
          </View>
          <Text style={[styles.goalName, { color: colors.text }]}>
            {goal.name}
          </Text>
          <Text style={[styles.goalStatus, { color: colors.accent }]}>
            On Track ✨
          </Text>
        </View>

        <View style={[styles.detailCard, { backgroundColor: colors.card }]}>
          <View style={styles.progressHeader}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Progress
            </Text>
            <Text style={[styles.percentLarge, { color: colors.primary }]}>
              {percent.toFixed(0)}%
            </Text>
          </View>
          <View
            style={[
              styles.progressBg,
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

          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Saved
              </Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                ₹{goal.current.toLocaleString()}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
                Target
              </Text>
              <Text style={[styles.statValue, { color: colors.text }]}>
                ₹{goal.target.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Started
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {goal.startDate}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>
                Est. Completion
              </Text>
              <Text style={[styles.infoValue, { color: colors.text }]}>
                {goal.estimatedEnd}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.suggestionBox,
              { backgroundColor: colors.primarySurface },
            ]}
          >
            <Ionicons name="bulb-outline" size={20} color={colors.primary} />
            <Text style={[styles.suggestionText, { color: colors.text }]}>
              Saving ₹2,500 more per month will help you reach this goal 2
              months earlier!
            </Text>
          </View>
        </View>

        <Button
          title="Add Savings"
          onPress={() => {}}
          style={styles.actionButton}
        />
        <Button
          title="Withdraw"
          variant="outline"
          onPress={() => {}}
          style={styles.actionButton}
        />
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
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: Theme.typography.size.lg,
    fontWeight: "700",
  },
  editButton: {
    padding: 8,
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: Theme.spacing.xxl,
  },
  iconLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Theme.spacing.md,
  },
  goalName: {
    fontSize: Theme.typography.size.xxl,
    fontWeight: "700",
    marginBottom: 4,
  },
  goalStatus: {
    fontSize: Theme.typography.size.sm,
    fontWeight: "600",
  },
  detailCard: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.xl,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: Theme.spacing.sm,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  percentLarge: {
    fontSize: Theme.typography.size.xl,
    fontWeight: "700",
  },
  progressBg: {
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: Theme.spacing.lg,
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  infoSection: {
    marginBottom: Theme.spacing.xxl,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: Theme.spacing.lg,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  suggestionBox: {
    flexDirection: "row",
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.md,
    alignItems: "center",
    gap: Theme.spacing.md,
  },
  suggestionText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "500",
  },
  actionButton: {
    width: "100%",
    marginBottom: Theme.spacing.md,
  },
});
