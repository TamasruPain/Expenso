import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
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

export default function LoginScreen() {
  const router = useRouter();
  const isDark = false;
  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Welcome Back!
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Sign in to continue tracking your expenses
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email Address"
            placeholder="example@mail.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input label="Password" placeholder="••••••••" secureTextEntry />
          <TouchableOpacity style={styles.forgotPassword}>
            <Text
              style={[styles.forgotPasswordText, { color: colors.primary }]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Login"
          onPress={() => {}} // Integration later
          style={styles.loginButton}
        />

        <View style={styles.dividerContainer}>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Text style={[styles.dividerText, { color: colors.textSecondary }]}>
            OR
          </Text>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
        </View>

        <Button
          title="Continue with Google"
          variant="outline"
          onPress={() => {}}
          icon={<Ionicons name="logo-google" size={20} color={colors.text} />}
          style={styles.googleButton}
        />

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/register")}>
            <Text style={[styles.footerLink, { color: colors.primary }]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.white,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Theme.spacing.lg,
  },
  header: {
    marginBottom: Theme.spacing.xxl,
  },
  title: {
    fontSize: Theme.typography.size.h1 - 4,
    fontWeight: "700",
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    fontSize: Theme.typography.size.md,
    lineHeight: 22,
  },
  form: {
    marginBottom: Theme.spacing.lg,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  forgotPasswordText: {
    fontSize: Theme.typography.size.sm,
    fontWeight: "600",
  },
  loginButton: {
    width: "100%",
    marginBottom: Theme.spacing.lg,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Theme.spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: Theme.spacing.md,
    fontSize: Theme.typography.size.xs,
    fontWeight: "600",
  },
  googleButton: {
    width: "100%",
    marginBottom: Theme.spacing.xl,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontSize: Theme.typography.size.sm,
  },
  footerLink: {
    fontSize: Theme.typography.size.sm,
    fontWeight: "700",
  },
});
