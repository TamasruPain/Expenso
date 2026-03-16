import { Colors } from "@/constants/colors";
import { Theme } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

interface BadgeProps {
  label: string;
  variant?: "primary" | "success" | "danger" | "warning" | "info";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "primary",
  style,
  textStyle,
}) => {
  const colors = Colors.light;

  const variantStyles: Record<string, ViewStyle> = {
    primary: { backgroundColor: colors.primarySurface },
    success: { backgroundColor: "#E6F9F4" }, // Light green
    danger: { backgroundColor: "#FFF0F0" }, // Light red
    warning: { backgroundColor: "#FFF8E1" }, // Light yellow
    info: { backgroundColor: "#E3F2FD" }, // Light blue
  };

  const textVariantStyles: Record<string, TextStyle> = {
    primary: { color: colors.primary },
    success: { color: colors.accent },
    danger: { color: colors.danger },
    warning: { color: "#FFB800" },
    info: { color: "#2196F3" },
  };

  return (
    <View style={[styles.container, variantStyles[variant], style]}>
      <Text style={[styles.text, textVariantStyles[variant], textStyle]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Theme.radius.full,
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
