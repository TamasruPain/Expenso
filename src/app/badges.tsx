import { Colors } from "@/constants/colors";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock Badges Data
const BADGES = [
  {
    id: "1",
    name: "Early Bird",
    description: "Added first transaction before 8 AM",
    icon: "sunny",
    color: "#FFB800",
    earned: true,
  },
  {
    id: "2",
    name: "Budget Master",
    description: "Stayed under budget for 3 consecutive months",
    icon: "trophy",
    color: "#7C5CFC",
    earned: true,
  },
  {
    id: "3",
    name: "Super Saver",
    description: "Saved 30% of monthly income",
    icon: "wallet",
    color: "#00D09E",
    earned: true,
  },
  {
    id: "4",
    name: "Night Owl",
    description: "Recorded an expense after midnight",
    icon: "moon",
    color: "#3F51B5",
    earned: true,
  },
  {
    id: "5",
    name: "Analyst",
    description: "Checked analytics 7 days in a row",
    icon: "trending-up",
    color: "#E91E63",
    earned: false,
  },
  {
    id: "6",
    name: "Planner",
    description: "Set 5 different category budgets",
    icon: "calendar",
    color: "#FF5722",
    earned: false,
  },
];

export default function BadgesScreen() {
  const router = useRouter();
  const colors = Colors.light;

  const renderBadge = ({ item }: { item: (typeof BADGES)[0] }) => (
    <View
      style={[
        styles.badgeCard,
        { backgroundColor: colors.white, opacity: item.earned ? 1 : 0.6 },
      ]}
    >
      <View
        style={[
          styles.badgeIconContainer,
          { backgroundColor: item.earned ? item.color : colors.primarySurface },
        ]}
      >
        <Ionicons
          name={item.icon as any}
          size={32}
          color={item.earned ? colors.white : colors.textSecondary}
        />
      </View>
      <Text style={[styles.badgeName, { color: colors.text }]}>
        {item.name}
      </Text>
      <Text style={[styles.badgeDesc, { color: colors.textSecondary }]}>
        {item.description}
      </Text>
      {!item.earned && (
        <View style={styles.lockedContainer}>
          <Ionicons name="lock-closed" size={14} color={colors.textSecondary} />
          <Text style={styles.lockedText}>Locked</Text>
        </View>
      )}
    </View>
  );

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
          Badges & Rewards
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.statsContainer, { backgroundColor: colors.primary }]}
        >
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8/24</Text>
            <Text style={styles.statLabel}>Badges</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>Gold</Text>
            <Text style={styles.statLabel}>Rank</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Your Achievements
        </Text>

        <View style={styles.badgesWrapper}>
          {BADGES.map((badge) => (
            <React.Fragment key={badge.id}>
              {renderBadge({ item: badge })}
            </React.Fragment>
          ))}
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
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  backButton: {
    padding: 8,
    marginRight: Theme.spacing.sm,
  },
  headerTitle: {
    fontSize: Theme.typography.size.lg,
    fontWeight: "700",
  },
  scrollContent: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  statsContainer: {
    flexDirection: "row",
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.xl,
    elevation: 4,
    shadowColor: "#7C5CFC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    color: "#FFF",
    fontSize: Theme.typography.size.xxl,
    fontWeight: "700",
  },
  statLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  sectionTitle: {
    fontSize: Theme.typography.size.lg,
    fontWeight: "700",
    marginBottom: Theme.spacing.md,
  },
  badgesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Theme.spacing.md,
    justifyContent: "space-between",
  },
  badgeCard: {
    width: "47%",
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    marginBottom: Theme.spacing.sm,
  },
  badgeIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Theme.spacing.sm,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  badgeDesc: {
    fontSize: 10,
    textAlign: "center",
    lineHeight: 14,
  },
  lockedContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
  lockedText: {
    fontSize: 10,
    fontWeight: "600",
  },
});
