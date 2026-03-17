import { Button } from "@/components/ui/Button";
import { Theme } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.content}>
        {/* Auth Image */}
        <View style={styles.ImageContainer}>
          <Image
            source={require("../../../assets/images/auth_image.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.textContainer}>
          <View style={styles.welcomeRow}>
            <Text style={[styles.welcomeText, { color: colors.text }]}>
              Welcome to{" "}
            </Text>
            <Text style={[styles.welcomeText, { color: colors.primary }]}>
              Expenso
            </Text>
          </View>

          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Take control of your finance.{"\n"}
            Track expenses, set budgets and achieve your savings goals
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            onPress={() => router.push("/(auth)/login")}
            style={styles.button}
          />
          <Button
            title="Register"
            variant="outline"
            onPress={() => router.push("/(auth)/register")}
            style={styles.button}
          />
        </View>
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
    alignItems: "center",
    justifyContent: "center",
  },
  ImageContainer: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Theme.spacing.xl,
  },
  image: {
    width: 200,
    height: 200,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: Theme.spacing.xxl,
  },
  welcomeRow: {
    flexDirection: "row",
    marginBottom: Theme.spacing.sm,
  },
  welcomeText: {
    fontSize: Theme.typography.size.h1 - 4,
    fontWeight: "700",
  },
  description: {
    fontSize: Theme.typography.size.md,
    textAlign: "center",
    lineHeight: 22,
    marginTop: Theme.spacing.sm,
  },
  buttonContainer: {
    width: "100%",
    gap: Theme.spacing.md,
  },
  button: {
    width: "100%",
  },
});
