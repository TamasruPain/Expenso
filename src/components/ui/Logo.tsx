import { Colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, TextStyle, View } from "react-native";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
}

export const Logo: React.FC<LogoProps> = ({ size = "md" }) => {
  const isDark = false; // Mock for now
  const colors = isDark ? Colors.dark : Colors.light;

  const fontSizes = {
    sm: 24,
    md: 40,
    lg: 56,
    xl: 72,
  };

  const fontSize = fontSizes[size];

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { fontSize, color: colors.primary }]}>
        Expenso
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "700" as TextStyle["fontWeight"],
    letterSpacing: -1,
  },
});
