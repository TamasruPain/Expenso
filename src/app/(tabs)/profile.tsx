import { Colors } from "@/constants/colors";
import { Theme } from "@/constants/theme";
import { useAuthStore } from "@/stores/useAuthStore";
import { useGamificationStore } from "@/stores/useGamificationStore";
import { useAuth } from "@clerk/clerk-expo";
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

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
  showChevron?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  title,
  onPress,
  showChevron = true,
}) => {
  const colors = Colors.light;
  return (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: colors.white }]}
      onPress={onPress}
    >
      <View style={styles.menuItemLeft}>
        <View
          style={[
            styles.menuIconContainer,
            { backgroundColor: colors.primarySurface },
          ]}
        >
          <Ionicons name={icon} size={20} color={colors.primary} />
        </View>
        <Text style={[styles.menuItemTitle, { color: colors.text }]}>
          {title}
        </Text>
      </View>
      {showChevron && (
        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.textSecondary}
        />
      )}
    </TouchableOpacity>
  );
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { streakCount } = useGamificationStore();
  const { signOut } = useAuth();
  const colors = Colors.light;

  const handleLogout = async () => {
    await signOut();
    router.replace("/(auth)/welcome");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={[styles.screenTitle, { color: colors.text }]}>
          Profile
        </Text>

        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: colors.white }]}>
          <View
            style={[styles.avatarContainer, { backgroundColor: colors.border }]}
          >
            <Ionicons name="person" size={40} color={colors.white} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.userName, { color: colors.text }]}>
              {user?.fullName || "User"}
            </Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
              {user?.email || "No email"}
            </Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="create-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Gamification Summary Card */}
        <TouchableOpacity
          style={[styles.gamificationCard, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/badges")}
        >
          <View style={styles.gamificationInfo}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Current Streak</Text>
              <View style={styles.statValueRow}>
                <Ionicons name="flame" size={20} color="#FFB800" />
                <Text style={styles.statValue}>{streakCount} Days</Text>
              </View>
            </View>
            <View style={styles.gamificationDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Badges Earned</Text>
              <View style={styles.statValueRow}>
                <Ionicons name="medal" size={20} color="#FFB800" />
                <Text style={styles.statValue}>0/24</Text>
              </View>
            </View>
          </View>
          <Ionicons
            name="chevron-forward"
            size={20}
            color="rgba(255,255,255,0.7)"
          />
        </TouchableOpacity>

        {/* Settings Menu */}
        <View style={styles.menuSection}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            Personal
          </Text>
          <MenuItem
            icon="person-outline"
            title="Personal Information"
            onPress={() => {}}
          />
          <MenuItem
            icon="cash-outline"
            title="Primary Currency"
            onPress={() => router.push("/(onboarding)/currency")}
          />
          <MenuItem
            icon="trophy-outline"
            title="Savings Goals"
            onPress={() => router.push("/goal")}
          />
        </View>

        <View style={styles.menuSection}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            Settings
          </Text>
          <MenuItem
            icon="shield-checkmark-outline"
            title="Security & Privacy"
            onPress={() => {}}
          />
          <MenuItem
            icon="notifications-outline"
            title="Notifications"
            onPress={() => {}}
          />
          <MenuItem
            icon="color-palette-outline"
            title="App Theme"
            onPress={() => {}}
          />
        </View>

        <View style={styles.menuSection}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>
            Account
          </Text>
          <MenuItem
            icon="log-out-outline"
            title="Logout"
            onPress={handleLogout}
            showChevron={false}
          />
        </View>

        {/* Info Box */}
        <View style={styles.footer}>
          <Text style={[styles.version, { color: colors.textSecondary }]}>
            Expenso v1.0.0
          </Text>
          <Text style={[styles.madeBy, { color: colors.textSecondary }]}>
            Made with ❤️ for better finance
          </Text>
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
  screenTitle: {
    fontSize: Theme.typography.size.xxl,
    fontWeight: "700",
    marginBottom: Theme.spacing.lg,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Theme.spacing.md,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: Theme.typography.size.lg,
    fontWeight: "700",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: Theme.typography.size.sm,
  },
  editButton: {
    padding: 8,
  },
  gamificationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Theme.spacing.lg,
    borderRadius: Theme.radius.xl,
    marginBottom: Theme.spacing.xl,
    elevation: 4,
    shadowColor: "#7C5CFC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  gamificationInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  statBox: {
    flex: 1,
  },
  statLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  statValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statValue: {
    color: "#FFF",
    fontSize: Theme.typography.size.md,
    fontWeight: "700",
  },
  gamificationDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    marginHorizontal: Theme.spacing.md,
  },
  menuSection: {
    marginBottom: Theme.spacing.lg,
  },
  sectionLabel: {
    fontSize: Theme.typography.size.xs,
    fontWeight: "700",
    textTransform: "uppercase",
    marginLeft: Theme.spacing.xs,
    marginBottom: Theme.spacing.sm,
    letterSpacing: 0.5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Theme.spacing.md,
    borderRadius: Theme.radius.lg,
    marginBottom: Theme.spacing.xs,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.md,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: Theme.radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    marginTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.xl,
  },
  version: {
    fontSize: Theme.typography.size.xs,
    fontWeight: "600",
    marginBottom: 4,
  },
  madeBy: {
    fontSize: 10,
  },
});
