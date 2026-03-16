import { Colors } from "@/constants/colors";
import { Theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Mock Chart Data
const CATEGORY_BREAKDOWN = [
  { name: "Food", amount: 12500, color: "#7C5CFC", percent: 35 },
  { name: "Shopping", amount: 8400, color: "#00D09E", percent: 24 },
  { name: "Bills", amount: 6200, color: "#FFB800", percent: 18 },
  { name: "Travel", amount: 4500, color: "#FF5C5C", percent: 13 },
  { name: "Other", amount: 3600, color: "#B8A9FF", percent: 10 },
];

// Mock Heatmap Data (Days of month with intensity)
const HEATMAP_DATA = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  intensity: Math.floor(Math.random() * 5), // 0 to 4
}));

export default function AnalyticsScreen() {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "yearly">(
    "monthly",
  );
  const colors = Colors.light;

  const renderHeatmapCell = (item: (typeof HEATMAP_DATA)[0]) => {
    const opacity = item.intensity * 0.25;
    const backgroundColor =
      item.intensity === 0 ? colors.primarySurface : colors.primary;

    return (
      <View
        key={item.day}
        style={[
          styles.heatmapCell,
          {
            backgroundColor,
            opacity: item.intensity === 0 ? 1 : Math.max(0.2, opacity),
          },
        ]}
      >
        <Text
          style={[
            styles.heatmapText,
            { color: item.intensity > 2 ? colors.white : colors.textSecondary },
          ]}
        >
          {item.day}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Analytics</Text>
          <View
            style={[styles.tabBar, { backgroundColor: colors.primarySurface }]}
          >
            {(["weekly", "monthly", "yearly"] as const).map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tab,
                  activeTab === tab && {
                    backgroundColor: colors.white,
                    elevation: 2,
                  },
                ]}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        activeTab === tab
                          ? colors.primary
                          : colors.textSecondary,
                    },
                  ]}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Hero Chart Placeholder */}
        <View style={[styles.chartCard, { backgroundColor: colors.white }]}>
          <View style={styles.chartHeader}>
            <Text style={[styles.chartTitle, { color: colors.text }]}>
              Total Spending
            </Text>
            <Text style={[styles.chartValue, { color: colors.primary }]}>
              ₹ 45,200
            </Text>
          </View>
          {/* Line Chart placeholder using View blocks */}
          <View style={styles.chartPlaceholder}>
            <View
              style={[
                styles.chartBar,
                { height: "40%", backgroundColor: colors.primarySurface },
              ]}
            />
            <View
              style={[
                styles.chartBar,
                { height: "60%", backgroundColor: colors.primarySurface },
              ]}
            />
            <View
              style={[
                styles.chartBar,
                { height: "90%", backgroundColor: colors.primary },
              ]}
            />
            <View
              style={[
                styles.chartBar,
                { height: "70%", backgroundColor: colors.primarySurface },
              ]}
            />
            <View
              style={[
                styles.chartBar,
                { height: "50%", backgroundColor: colors.primarySurface },
              ]}
            />
            <View
              style={[
                styles.chartBar,
                { height: "80%", backgroundColor: colors.primarySurface },
              ]}
            />
          </View>
        </View>

        {/* Categories Breakdown */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Spending Categories
        </Text>
        <View
          style={[styles.categoriesCard, { backgroundColor: colors.white }]}
        >
          {CATEGORY_BREAKDOWN.map((item, index) => (
            <View key={item.name} style={styles.categoryRow}>
              <View style={styles.categoryInfo}>
                <View
                  style={[styles.colorDot, { backgroundColor: item.color }]}
                />
                <Text style={[styles.categoryName, { color: colors.text }]}>
                  {item.name}
                </Text>
              </View>
              <View style={styles.categoryStats}>
                <Text style={[styles.categoryAmount, { color: colors.text }]}>
                  ₹{item.amount.toLocaleString()}
                </Text>
                <Text
                  style={[
                    styles.categoryPercent,
                    { color: colors.textSecondary },
                  ]}
                >
                  {item.percent}%
                </Text>
              </View>
              <View
                style={[
                  styles.categoryProgressBg,
                  { backgroundColor: colors.primarySurface },
                ]}
              >
                <View
                  style={[
                    styles.categoryProgressFill,
                    { backgroundColor: item.color, width: `${item.percent}%` },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Spending Heatmap - Unique Feature */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Spending Heatmap
          </Text>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color={colors.textSecondary}
          />
        </View>
        <Text style={[styles.sectionSubtitle, { color: colors.textSecondary }]}>
          Visualize your spending intensity across the month
        </Text>

        <View style={[styles.heatmapCard, { backgroundColor: colors.white }]}>
          <View style={styles.heatmapGrid}>
            {HEATMAP_DATA.map(renderHeatmapCell)}
          </View>
          <View style={styles.heatmapLegend}>
            <Text style={styles.legendText}>Less</Text>
            {[0, 1, 2, 3, 4].map((i) => (
              <View
                key={i}
                style={[
                  styles.legendBox,
                  {
                    backgroundColor: colors.primary,
                    opacity: i === 0 ? 0.1 : i * 0.25,
                  },
                ]}
              />
            ))}
            <Text style={styles.legendText}>More</Text>
          </View>
        </View>
      </ScrollView>
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
    paddingBottom: 100,
  },
  header: {
    marginBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: Theme.typography.size.xxl,
    fontWeight: "700",
    marginBottom: Theme.spacing.md,
  },
  tabBar: {
    flexDirection: "row",
    padding: 4,
    borderRadius: Theme.radius.md,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: Theme.radius.sm,
  },
  tabText: {
    fontSize: Theme.typography.size.sm,
    fontWeight: "700",
  },
  chartCard: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Theme.spacing.xl,
  },
  chartTitle: {
    fontSize: Theme.typography.size.md,
    fontWeight: "600",
  },
  chartValue: {
    fontSize: Theme.typography.size.lg,
    fontWeight: "700",
  },
  chartPlaceholder: {
    height: 150,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  chartBar: {
    width: (width - 100) / 7,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: Theme.typography.size.lg,
    fontWeight: "700",
    marginBottom: Theme.spacing.md,
    marginTop: Theme.spacing.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: Theme.spacing.lg,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: Theme.typography.size.xs,
    marginBottom: Theme.spacing.md,
  },
  categoriesCard: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  categoryRow: {
    marginBottom: Theme.spacing.md,
  },
  categoryInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: Theme.spacing.sm,
  },
  categoryName: {
    fontSize: Theme.typography.size.sm,
    fontWeight: "600",
  },
  categoryStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  categoryAmount: {
    fontSize: Theme.typography.size.sm,
    fontWeight: "700",
  },
  categoryPercent: {
    fontSize: 10,
    fontWeight: "600",
  },
  categoryProgressBg: {
    height: 4,
    borderRadius: 2,
    overflow: "hidden",
  },
  categoryProgressFill: {
    height: "100%",
    borderRadius: 2,
  },
  heatmapCard: {
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.xl,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  heatmapGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  heatmapCell: {
    width: (width - 120) / 7,
    aspectRatio: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  heatmapText: {
    fontSize: 10,
    fontWeight: "600",
  },
  heatmapLegend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: Theme.spacing.md,
    gap: 4,
  },
  legendText: {
    fontSize: 10,
    color: Colors.light.textSecondary,
    marginHorizontal: 4,
  },
  legendBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
});
