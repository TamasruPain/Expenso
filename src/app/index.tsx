import { Logo } from "@/components/ui/Logo";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function SplashScreenUI() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useAuthStore();
  const { colors } = useAppTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    if (isLoaded) {
      const timer = setTimeout(() => {
        if (isSignedIn) {
          if (user && !user.onboarding_completed) {
            router.replace("/(onboarding)/currency");
          } else {
            router.replace("/(tabs)");
          }
        } else {
          router.replace("/(auth)/welcome");
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, isSignedIn, user, fadeAnim, router]);

  return (
    <View style={[styles.container, { backgroundColor: colors.white }]}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: "center" }}>
        <Logo size="lg" />
        <Text style={[styles.tagline, { color: colors.textSecondary }]}>
          Track . Save . Grow
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tagline: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1,
  },
});
