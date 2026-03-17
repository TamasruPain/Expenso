import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Theme } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useOAuthGoogle } from "@/hooks/useOAuthGoogle";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { onPress: onGooglePress } = useOAuthGoogle();

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { colors } = useAppTheme();

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName: fullName.split(" ")[0],
        lastName: fullName.split(" ").slice(1).join(" "),
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/(onboarding)/currency");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Join Expenso and start managing your money smarter
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChangeText={setFullName}
          />
          <Input
            label="Email Address"
            placeholder="example@mail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
          <Input
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <Button
          title="Register"
          onPress={onSignUpPress}
          loading={loading}
          style={styles.registerButton}
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
          onPress={onGooglePress}
          icon={<Ionicons name="logo-google" size={20} color={colors.text} />}
          style={styles.googleButton}
        />

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
            <Text style={[styles.footerLink, { color: colors.primary }]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>

        {/* Verification Modal */}
        <Modal visible={pendingVerification} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View
              style={[styles.modalContent, { backgroundColor: colors.card }]}
            >
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Verify Email
              </Text>
              <Text
                style={[styles.modalSubtitle, { color: colors.textSecondary }]}
              >
                We&apos;ve sent a verification code to {emailAddress}
              </Text>

              <Input
                label="Verification Code"
                placeholder="123456"
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
                containerStyle={styles.modalInput}
              />

              <Button
                title="Verify Account"
                onPress={onPressVerify}
                loading={loading}
                style={styles.modalButton}
              />

              <TouchableOpacity
                onPress={() => setPendingVerification(false)}
                disabled={loading}
              >
                <Text style={[styles.cancelText, { color: colors.danger }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  registerButton: {
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    padding: Theme.spacing.xl,
    borderTopLeftRadius: Theme.radius.xl,
    borderTopRightRadius: Theme.radius.xl,
    minHeight: 400,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: Theme.typography.size.xxl,
    fontWeight: "700",
    marginBottom: Theme.spacing.sm,
  },
  modalSubtitle: {
    fontSize: Theme.typography.size.md,
    textAlign: "center",
    marginBottom: Theme.spacing.xl,
    lineHeight: 22,
  },
  modalInput: {
    marginBottom: Theme.spacing.xl,
  },
  modalButton: {
    width: "100%",
    marginBottom: Theme.spacing.lg,
  },
  cancelText: {
    fontSize: Theme.typography.size.md,
    fontWeight: "600",
    padding: Theme.spacing.md,
  },
});
