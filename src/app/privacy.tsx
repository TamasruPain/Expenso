import { Theme } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useSecurityStore } from "@/stores/useSecurityStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacySecurityScreen() {
  const { colors, isDark } = useAppTheme();
  const router = useRouter();
  const { isBiometricsEnabled, setBiometricsEnabled } = useSecurityStore();

  const [pinEnabled, setPinEnabled] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you absolutely sure you want to delete your account? This action cannot be undone and all your financial data will be permanently erased.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete My Account",
          style: "destructive",
          onPress: () => {
            // Future link to Auth/Clerk deletion
            Alert.alert(
              "Notice",
              "Account deletion must be performed from the web dashboard currently.",
            );
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
        <Text style={[styles.title, { color: colors.text }]}>
          Privacy & Security
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Security Section */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          SECURITY
        </Text>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View
            style={[
              styles.row,
              styles.borderBottom,
              {
                borderColor: isDark ? "rgba(255,255,255,0.06)" : colors.border,
              },
            ]}
          >
            <View style={styles.rowLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.primarySurface },
                ]}
              >
                <Ionicons
                  name="finger-print"
                  size={20}
                  color={colors.primary}
                />
              </View>
              <Text style={[styles.rowText, { color: colors.text }]}>
                Biometric Lock
              </Text>
            </View>
            <Switch
              value={isBiometricsEnabled}
              onValueChange={setBiometricsEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>

          <View
            style={[
              styles.row,
              styles.borderBottom,
              {
                borderColor: isDark ? "rgba(255,255,255,0.06)" : colors.border,
              },
            ]}
          >
            <View style={styles.rowLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: colors.primarySurface },
                ]}
              >
                <Ionicons name="keypad" size={20} color={colors.primary} />
              </View>
              <Text style={[styles.rowText, { color: colors.text }]}>
                PIN Code
              </Text>
            </View>
            <Switch
              value={pinEnabled}
              onValueChange={setPinEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
            />
          </View>
        </View>

        {/* Data Section */}
        <Text
          style={[
            styles.sectionTitle,
            { color: colors.textSecondary, marginTop: Theme.spacing.xl },
          ]}
        >
          DATA MANAGEMENT
        </Text>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          

          <TouchableOpacity style={styles.row} onPress={handleDeleteAccount}>
            <View style={styles.rowLeft}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: "rgba(255,92,92,0.15)" },
                ]}
              >
                <Ionicons name="trash" size={20} color={colors.danger} />
              </View>
              <Text
                style={[
                  styles.rowText,
                  { color: colors.danger, fontWeight: "600" },
                ]}
              >
                Delete Account
              </Text>
            </View>
          </TouchableOpacity>
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
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  content: {
    padding: Theme.spacing.lg,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: Theme.spacing.sm,
    marginLeft: Theme.spacing.sm,
  },
  card: {
    borderRadius: Theme.radius.xl,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Theme.spacing.md,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Theme.spacing.md,
  },
  borderBottom: {
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  rowText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
